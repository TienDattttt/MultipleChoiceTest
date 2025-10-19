package com.acme.exam_service.attempt.dto;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;

public record AttemptDetailResponse(
        Integer attemptId,
        Integer examId,
        Integer paperId,
        String status,
        Instant startedAt,
        List<AttemptQuestionDto> questions
) {}
