package com.acme.exam_service.exam.dto;

import java.time.Instant;
import java.util.List;

public record ExamResponse(
        Integer id,
        Integer courseId,
        String title,
        Instant startAt,
        Instant endAt,
        Integer durationMin,
        Integer attemptsLimit,
        Integer createdById,
        java.util.List<Integer> assignedClassIds
) {}
