package com.acme.exam_service.question.dto;

import java.time.Instant;
import java.util.List;

public record QuestionResponse(
        Integer id,
        Integer courseId,
        Integer chapterId,
        Integer sectionId,
        String content,
        Short difficulty,
        Integer createdById,
        Instant createdAt,
        List<AnswerResponseDto> answers
) {}
