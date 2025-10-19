package com.acme.exam_service.exam.dto;

public record BlueprintItemDto(
        Integer chapterId,    // nullable
        Integer sectionId,    // nullable
        Short difficulty,     // nullable (null = mọi mức)
        Integer numQuestions  // >0
) {}
