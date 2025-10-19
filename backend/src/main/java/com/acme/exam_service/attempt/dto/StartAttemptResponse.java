package com.acme.exam_service.attempt.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record StartAttemptResponse(
        Integer attemptId,
        Integer examId,
        Integer userId,
        String status,
        java.time.Instant startedAt,
        java.time.Instant submittedAt,
        java.math.BigDecimal score
) {}
