package com.acme.exam_service.exam.dto;

import java.time.Instant;

public record ExamCreateRequest(
        Integer courseId,
        String title,
        Instant startAt,
        Instant endAt,
        Integer durationMin,
        Integer attemptsLimit,
        Integer createdById
) {}
