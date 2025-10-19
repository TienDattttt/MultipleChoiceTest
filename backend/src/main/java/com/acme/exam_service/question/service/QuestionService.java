package com.acme.exam_service.question.service;

import com.acme.exam_service.attempt.repo.AttemptAnswerRepository;
import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.course.entity.Chapter;
import com.acme.exam_service.course.entity.Cours;
import com.acme.exam_service.course.entity.Section;
import com.acme.exam_service.exam.repo.ExamPaperQuestionRepository;
import com.acme.exam_service.question.dto.*;
import com.acme.exam_service.question.entity.Answer;
import com.acme.exam_service.question.entity.Question;
import com.acme.exam_service.question.repo.AnswerRepository;
import com.acme.exam_service.question.repo.QuestionRepository;
import com.acme.exam_service.users.entity.User;
import com.acme.exam_service.users.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepo;
    private final AnswerRepository answerRepo;
    private final UserRepository userRepo;

    private final ExamPaperQuestionRepository epqRepo;
    private final AttemptAnswerRepository attemptAnswerRepo;

    /* ========== LIST + FILTER ========== */
    @Transactional(readOnly = true)
    public Page<QuestionListItem> list(Integer courseId, Integer chapterId, Integer sectionId,
                                       Short difficulty, String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page-1,0), Math.max(size,1), Sort.by(Sort.Direction.DESC, "id"));
        var p = questionRepo.search(courseId, chapterId, sectionId, difficulty,
                (keyword==null || keyword.isBlank()) ? null : keyword, pageable);
        return p.map(q -> new QuestionListItem(
                q.getId(),
                q.getCourse()==null?null:q.getCourse().getId(),
                q.getChapter()==null?null:q.getChapter().getId(),
                q.getSection()==null?null:q.getSection().getId(),
                q.getContent(),
                q.getDifficulty(),
                q.getCreatedAt()
        ));
    }

    /* ========== GET DETAIL ========== */
    @Transactional(readOnly = true)
    public QuestionResponse get(Integer id) {
        var q = questionRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Question not found"));
        var answers = answerRepo.findByQuestion_IdIn(java.util.List.of(id)).stream()
                .filter(a -> a.getQuestion().getId().equals(id)) // phòng trường hợp có nhiều id
                .map(a -> new AnswerResponseDto(a.getId(), a.getContent(), a.getIsCorrect()))
                .toList();
        return new QuestionResponse(
                q.getId(),
                q.getCourse()==null?null:q.getCourse().getId(),
                q.getChapter()==null?null:q.getChapter().getId(),
                q.getSection()==null?null:q.getSection().getId(),
                q.getContent(),
                q.getDifficulty(),
                q.getCreatedBy()==null?null:q.getCreatedBy().getId(),
                q.getCreatedAt(),
                answers
        );
    }

    /* ========== CREATE ========== */
    @Transactional
    public QuestionResponse create(QuestionCreateRequest req) {
        validateDifficulty(req.difficulty());
        validateAnswers(req.answers());

        // load relations
        Cours course = req.courseId()==null ? null :
                new Cours() {{ setId(req.courseId()); }}; // gọn: set id (không cần fetch)
        Chapter chapter = req.chapterId()==null ? null :
                new Chapter() {{ setId(req.chapterId()); }};
        Section section = req.sectionId()==null ? null :
                new Section() {{ setId(req.sectionId()); }};
        User creator = userRepo.findById(req.createdById())
                .orElseThrow(() -> new IllegalArgumentException("createdBy not found"));

        // create question
        Question q = new Question();
        q.setCourse(course);
        q.setChapter(chapter);
        q.setSection(section);
        q.setContent(req.content());
        q.setDifficulty(req.difficulty());
        q.setCreatedBy(creator);
        q.setCreatedAt(Instant.now());
        q = questionRepo.save(q);

        // create answers
        for (var a : req.answers()) {
            Answer ans = new Answer();
            ans.setQuestion(q);
            ans.setContent(a.content());
            ans.setIsCorrect(Boolean.TRUE.equals(a.isCorrect()));
            answerRepo.save(ans);
        }

        return get(q.getId());
    }

    /* ========== UPDATE (replace all answers) ========== */
    @Transactional
    public QuestionResponse update(Integer id, QuestionUpdateRequest req) {
        validateDifficulty(req.difficulty());
        validateAnswers(req.answers());

        var q = questionRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Question not found"));

        // cập nhật quan hệ (gọn bằng set id)
        Cours course = req.courseId()==null ? null : new Cours(){{
            setId(req.courseId());
        }};
        Chapter chapter = req.chapterId()==null ? null : new Chapter(){{
            setId(req.chapterId());
        }};
        Section section = req.sectionId()==null ? null : new Section(){{
            setId(req.sectionId());
        }};

        q.setCourse(course);
        q.setChapter(chapter);
        q.setSection(section);
        q.setContent(req.content());
        q.setDifficulty(req.difficulty());

        // replace all answers: xóa cũ → thêm mới
        answerRepo.deleteByQuestion_Id(id);
        questionRepo.save(q);

        for (var a : req.answers()) {
            Answer ans = new Answer();
            ans.setQuestion(q);
            ans.setContent(a.content());
            ans.setIsCorrect(Boolean.TRUE.equals(a.isCorrect()));
            answerRepo.save(ans);
        }
        return get(id);
    }

    /* ========== DELETE (an toàn) ========== */
    @Transactional
    public void delete(Integer id) {
        // chặn xoá nếu đã tham chiếu ở đề thi hoặc attempt
        long refPapers = epqRepo.countByQuestion_Id(id);
        long refAttempts = attemptAnswerRepo.countByQuestion_Id(id);
        if (refPapers > 0 || refAttempts > 0) {
            throw new IllegalStateException("Cannot delete: question is already used in exams/attempts.");
        }
        // xóa đáp án trước (dù có cascade, rõ ràng vẫn tốt)
        answerRepo.deleteByQuestion_Id(id);
        questionRepo.deleteById(id);
    }

    /* ========== helpers ========== */
    private void validateDifficulty(Short d) {
        if (d == null || d < 1 || d > 3) {
            throw new IllegalArgumentException("difficulty must be 1..3");
        }
    }

    private void validateAnswers(List<AnswerCreateDto> answers) {
        if (answers == null || answers.size() < 2) {
            throw new IllegalArgumentException("At least 2 answers required.");
        }
        long correct = answers.stream().filter(a -> Boolean.TRUE.equals(a.isCorrect())).count();
        if (correct != 1) {
            throw new IllegalArgumentException("Exactly 1 answer must be correct.");
        }
        if (answers.stream().anyMatch(a -> a.content()==null || a.content().isBlank())) {
            throw new IllegalArgumentException("Answer content cannot be blank.");
        }
    }
}
