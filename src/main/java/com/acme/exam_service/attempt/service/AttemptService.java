package com.acme.exam_service.attempt.service;
import java.time.Duration;
import java.time.Instant;

import com.acme.exam_service.attempt.dto.*;
import com.acme.exam_service.attempt.entity.Attempt;
import com.acme.exam_service.attempt.entity.AttemptAnswer;
import com.acme.exam_service.attempt.repo.AttemptAnswerRepository;
import com.acme.exam_service.attempt.repo.AttemptRepository;
import com.acme.exam_service.exam.entity.ExamPaper;
import com.acme.exam_service.exam.entity.ExamPaperQuestion;
import com.acme.exam_service.exam.repo.ExamPaperQuestionRepository;
import com.acme.exam_service.exam.repo.ExamPaperRepository;
import com.acme.exam_service.exam.repo.ExamRepository;
import com.acme.exam_service.question.entity.Answer;
import com.acme.exam_service.question.entity.Question;
import com.acme.exam_service.question.repo.AnswerRepository;
import com.acme.exam_service.question.repo.QuestionRepository;
import com.acme.exam_service.users.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttemptService {

    private final AttemptRepository attemptRepo;
    private final AttemptAnswerRepository attemptAnswerRepo;
    private final ExamRepository examRepo;
    private final UserRepository userRepo;
    private final QuestionRepository questionRepo;
    private final AnswerRepository answerRepo;
    private final ExamPaperRepository examPaperRepo;
    private final ExamPaperQuestionRepository epqRepo;

    /** Start attempt:
     * - Nếu đã có attempt IN_PROGRESS cho (examId,userId) → trả lại.
     * - Nếu đã SUBMITTED/AUTO_SUBMITTED → throw (giới hạn 1 lần).
     * - Nếu chưa có → tạo mới (set quan hệ Exam, User).
     */
    @Transactional
    public StartAttemptResponse startAttempt(StartAttemptRequest req) {
        var existing = attemptRepo.findByExam_IdAndUser_Id(req.examId(), req.userId());
        if (existing.isPresent()) {
            var at = existing.get();
            if ("SUBMITTED".equalsIgnoreCase(at.getStatus()) || "AUTO_SUBMITTED".equalsIgnoreCase(at.getStatus())) {
                throw new IllegalStateException("Student has already submitted this exam.");
            }
            return toDto(at);
        }

        var exam = examRepo.findById(req.examId())
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));
        var user = userRepo.findById(req.userId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Attempt at = new Attempt();
        at.setExam(exam);                       // ✅ set quan hệ
        at.setUser(user);                       // ✅ set quan hệ
        at.setStatus("IN_PROGRESS");
        at.setStartedAt(Instant.now());         // ✅ Instant
        at = attemptRepo.save(at);

        return toDto(at);
    }

    @Transactional
    public AttemptDetailResponse getAttemptDetail(Integer attemptId) {
        Attempt at = attemptRepo.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));

        if (at.getPaper() == null) {
            // lấy danh sách paper của exam (theo exam_id)
            List<ExamPaper> papers = examPaperRepo.findByExam_IdOrderByPaperNoAsc(at.getExam().getId());
            if (papers.isEmpty()) {
                throw new IllegalStateException("No exam papers. Please generate papers first.");
            }
            // chọn paper ổn định theo attemptId
            ExamPaper chosen = papers.get(Math.abs(at.getId()) % papers.size());
            at.setPaper(chosen);                   // ✅ set quan hệ
            attemptRepo.save(at);
        }

        // Lấy line trong paper (đúng thứ tự)
        List<ExamPaperQuestion> lines = epqRepo.findByPaper_IdOrderBySortOrderAsc(at.getPaper().getId());
        List<Integer> qIds = lines.stream().map(l -> l.getQuestion().getId()).toList();

        // Lấy câu hỏi
        Map<Integer, Question> qMap = questionRepo.findAllById(qIds).stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        // Lấy phương án của các câu
        List<Answer> allOptions = answerRepo.findByQuestion_IdIn(qIds);
        Map<Integer, List<Answer>> optionsByQ = new HashMap<>();
        for (Answer a : allOptions) {
            optionsByQ.computeIfAbsent(a.getQuestion().getId(), k -> new ArrayList<>()).add(a);
        }

        // Lấy các lựa chọn đã lưu (nếu có)
        Map<Integer, Integer> selectedMap = new HashMap<>();
        attemptAnswerRepo.findByAttempt_Id(attemptId).forEach(aa -> {
            Integer qid = aa.getQuestion().getId();
            Integer sel = aa.getSelectedAnswer() == null ? null : aa.getSelectedAnswer().getId();
            selectedMap.put(qid, sel);
        });

        // Build DTO theo đúng sort_order trong paper
        List<AttemptQuestionDto> items = new ArrayList<>();
        for (ExamPaperQuestion row : lines) {
            Question q = qMap.get(row.getQuestion().getId());
            var opts = optionsByQ.getOrDefault(q.getId(), List.of());
            var optDtos = opts.stream()
                    .map(o -> new AttemptQuestionDto.OptionDto(o.getId(), o.getContent()))
                    .toList();

            items.add(new AttemptQuestionDto(
                    q.getId(),
                    q.getContent(),
                    optDtos,
                    selectedMap.get(q.getId())
            ));
        }

        return new AttemptDetailResponse(
                at.getId(),
                at.getExam().getId(),
                at.getPaper().getId(),
                at.getStatus(),
                at.getStartedAt(),
                items
        );
    }

    // helper
    private StartAttemptResponse toDto(Attempt at) {
        return new StartAttemptResponse(
                at.getId(),
                at.getExam().getId(),
                at.getUser().getId(),
                at.getStatus(),
                at.getStartedAt(),
                at.getSubmittedAt(),
                at.getScore()
        );
    }

    @Transactional(readOnly = true)
    public RemainingTimeDto getRemainingTime(Integer attemptId) {
        var at = attemptRepo.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));

        var exam = at.getExam();
        Instant now = Instant.now();

        // 1) không được vượt ngoài cửa sổ kỳ thi
        long untilExamEnd = Math.max(0, Duration.between(now, exam.getEndAt()).getSeconds());

        // 2) không được vượt duration kể từ started_at
        long durationSec = exam.getDurationMin() * 60L;
        long elapsed = Math.max(0, Duration.between(at.getStartedAt(), now).getSeconds());
        long untilDuration = Math.max(0, durationSec - elapsed);

        long left = Math.min(untilExamEnd, untilDuration);
        return new RemainingTimeDto(left, left <= 0);
    }

    /** Nếu đã hết giờ → gọi SP submit & chấm; nếu chưa, chỉ return */
    @Transactional
    public void lockIfTimeOverAndSubmit(Integer attemptId, boolean force) {
        var at = attemptRepo.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));
        if (!"IN_PROGRESS".equalsIgnoreCase(at.getStatus())) return;

        var rem = getRemainingTime(attemptId);
        if (force || rem.expired()) {
            // chấm điểm bằng SP
            // gọi StoredProcExecutor ở Controller để giữ Service thuần domain
            // (nếu muốn gọi tại đây thì inject StoredProcExecutor và gọi trực tiếp)
            at.setStatus("AUTO_SUBMITTED");
            at.setSubmittedAt(Instant.now());
            attemptRepo.save(at);
            // lưu ý: điểm sẽ set khi Controller gọi sp.execSubmitAndGrade(attemptId)
        }
    }

    // sửa saveAnswer để chặn lưu khi hết giờ
    @Transactional
    public void saveAnswer(Integer attemptId, SaveAnswerRequest body) {
        var at = attemptRepo.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));

        // chặn khi không còn quyền sửa
        if (!"IN_PROGRESS".equalsIgnoreCase(at.getStatus())) {
            throw new IllegalStateException("Attempt is not editable.");
        }
        // chặn khi hết giờ
        var rem = getRemainingTime(attemptId);
        if (rem.expired()) {
            throw new IllegalStateException("Time is over.");
        }

        var question = questionRepo.findById(body.questionId())
                .orElseThrow(() -> new IllegalArgumentException("Question not found"));

        com.acme.exam_service.question.entity.Answer selected = null;
        if (body.selectedAnswerId() != null) {
            selected = answerRepo.findById(body.selectedAnswerId())
                    .orElseThrow(() -> new IllegalArgumentException("Selected answer not found"));
            if (!selected.getQuestion().getId().equals(question.getId())) {
                throw new IllegalArgumentException("Selected answer does not belong to the question.");
            }
        }

        var aa = attemptAnswerRepo.findByAttempt_IdAndQuestion_Id(attemptId, body.questionId())
                .orElseGet(com.acme.exam_service.attempt.entity.AttemptAnswer::new);

        aa.setAttempt(at);
        aa.setQuestion(question);
        aa.setSelectedAnswer(selected);
        attemptAnswerRepo.save(aa);
    }
}
