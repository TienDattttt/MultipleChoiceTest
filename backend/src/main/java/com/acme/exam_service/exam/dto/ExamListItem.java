package com.acme.exam_service.exam.dto;

import java.time.Instant;

public record ExamListItem(
        Integer id,
        Integer courseId,
        String title,
        Instant startAt,
        Instant endAt,
        Integer durationMin,
        Integer attemptsLimit
) {}
