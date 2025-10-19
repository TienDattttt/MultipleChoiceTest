package com.acme.exam_service.question.dto;

import java.time.Instant;

public record QuestionListItem(
        Integer id,
        Integer courseId,
        Integer chapterId,
        Integer sectionId,
        String content,
        Short difficulty,
        Instant createdAt
) {}
