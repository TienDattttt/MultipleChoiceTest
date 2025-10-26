package com.acme.exam_service.attempt.service;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

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
import com.acme.exam_service.auth.service.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // ===== Ownership helpers =====
    private void assertOwner(Attempt at) {
        Integer me = SecurityUtils.currentUserId();
        if (me == null || !at.getUser().getId().equals(me)) {
            throw new AccessDeniedException("Not your attempt");
        }
    }

    // ===== Start attempt (dùng user từ token) =====
    /**
     * - Nếu đã có attempt IN_PROGRESS (examId, currentUser) → trả lại
     * - Nếu đã SUBMITTED/AUTO_SUBMITTED → throw (giới hạn 1 lần)
     * - Nếu chưa có → tạo mới
     */
    @Transactional
    public StartAttemptResponse startAttempt(Integer examId, Integer currentUserId) {
        var exam = examRepo.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));

        Instant now = Instant.now();
        if (now.isBefore(exam.getStartAt())) {
            throw new IllegalStateException("Kỳ thi chưa bắt đầu.");
        }
        if (now.isAfter(exam.getEndAt())) {
            throw new IllegalStateException("Kỳ thi đã kết thúc.");
        }

        var existing = attemptRepo.findByExam_IdAndUser_Id(examId, currentUserId);
        if (existing.isPresent()) {
            var at = existing.get();
            if ("SUBMITTED".equalsIgnoreCase(at.getStatus()) || "AUTO_SUBMITTED".equalsIgnoreCase(at.getStatus())) {
                throw new IllegalStateException("Student has already submitted this exam.");
            }
            // assert owner (dù chắc chắn là của current user)
            assertOwner(at);
            return toDto(at);
        }

        var user = userRepo.findById(currentUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Attempt at = new Attempt();
        at.setExam(exam);
        at.setUser(user);
        at.setStatus("IN_PROGRESS");
        at.setStartedAt(Instant.now());
        at = attemptRepo.save(at);

        assertOwner(at);
        return toDto(at);
    }

    // ===== Detail (only owner) =====
    @Transactional
    public AttemptDetailResponse getAttemptDetailOwned(Integer attemptId) {
        Attempt at = attemptRepo.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));
        assertOwner(at);

        if (at.getPaper() == null) {
            List<ExamPaper> papers = examPaperRepo.findByExam_IdOrderByPaperNoAsc(at.getExam().getId());
            if (papers.isEmpty()) throw new IllegalStateException("No exam papers. Please generate papers first.");
            ExamPaper chosen = papers.get(Math.abs(at.getId()) % papers.size());
            at.setPaper(chosen);
            attemptRepo.save(at);
        }

        List<ExamPaperQuestion> lines = epqRepo.findByPaper_IdOrderBySortOrderAsc(at.getPaper().getId());
        List<Integer> qIds = lines.stream().map(l -> l.getQuestion().getId()).toList();

        Map<Integer, Question> qMap = questionRepo.findAllById(qIds).stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        List<Answer> allOptions = answerRepo.findByQuestion_IdIn(qIds);
        Map<Integer, List<Answer>> optionsByQ = new HashMap<>();
        for (Answer a : allOptions) {
            optionsByQ.computeIfAbsent(a.getQuestion().getId(), k -> new ArrayList<>()).add(a);
        }

        Map<Integer, Integer> selectedMap = new HashMap<>();
        attemptAnswerRepo.findByAttempt_Id(attemptId).forEach(aa -> {
            Integer qid = aa.getQuestion().getId();
            Integer sel = aa.getSelectedAnswer() == null ? null : aa.getSelectedAnswer().getId();
            selectedMap.put(qid, sel);
        });

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

        // === NEW: build thêm thông tin cho Flutter ===
        int total = items.size();
        long answered = items.stream().filter(x -> x.selectedAnswerId() != null).count();

        var remaining = computeRemaining(at);


        return new AttemptDetailResponse(
                at.getId(),
                at.getExam().getId(),
                at.getExam().getTitle(),
                at.getExam().getDurationMin(),
                total,
                (int) answered,
                remaining.secondsLeft(),
                at.getStartedAt(),
                items
        );
    }


    // ===== Remaining time (only owner) =====
    @Transactional(readOnly = true)
    public RemainingTimeDto getRemainingTimeOwned(Integer attemptId) {
        var at = attemptRepo.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));
        assertOwner(at);
        return computeRemaining(at);
    }

    private RemainingTimeDto computeRemaining(Attempt at) {
        var exam = at.getExam();
        Instant now = Instant.now();

        long untilExamEnd = Math.max(0, Duration.between(now, exam.getEndAt()).getSeconds());
        long durationSec = exam.getDurationMin() * 60L;
        long elapsed = Math.max(0, Duration.between(at.getStartedAt(), now).getSeconds());
        long untilDuration = Math.max(0, durationSec - elapsed);

        long left = Math.min(untilExamEnd, untilDuration);
        return new RemainingTimeDto(left, left <= 0);
    }

    // ===== Submit (only owner) =====
    /** Nếu đã hết giờ → set AUTO_SUBMITTED; nếu force=true → cho nộp; điểm sẽ tính khi controller gọi SP */
    @Transactional
    public void lockIfTimeOverAndSubmitOwned(Integer attemptId, boolean force) {
        var at = attemptRepo.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));
        assertOwner(at);

        if (!"IN_PROGRESS".equalsIgnoreCase(at.getStatus())) return;

        var rem = computeRemaining(at);
        if (force || rem.expired()) {
            at.setStatus("AUTO_SUBMITTED");
            at.setSubmittedAt(Instant.now());
            attemptRepo.save(at);
        }
    }

    // ===== Save answer (only owner & time check) =====
    @Transactional
    public void saveAnswerOwned(Integer attemptId, SaveAnswerRequest body) {
        var at = attemptRepo.findById(attemptId)
                .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));
        assertOwner(at);

        if (!"IN_PROGRESS".equalsIgnoreCase(at.getStatus())) {
            throw new IllegalStateException("Attempt is not editable.");
        }
        var rem = computeRemaining(at);
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

    // ===== helper =====
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
}