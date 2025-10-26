package com.acme.exam_service.attempt.dto;

import java.time.Instant;
import java.util.List;

public record AttemptDetailResponse(
        Integer attemptId,
        Integer examId,
        String examTitle,
        Integer durationMinutes,
        Integer totalQuestions,
        Integer answeredCount,
        long remainingSeconds,
        Instant startedAt,
        List<AttemptQuestionDto> questions
) {}
