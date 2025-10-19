package com.acme.exam_service.question.dto;

import java.util.List;

/** Tạo câu hỏi mới + danh sách đáp án */
public record QuestionCreateRequest(
        Integer courseId,
        Integer chapterId,     // nullable
        Integer sectionId,     // nullable
        String content,
        Short difficulty,      // 1..3
        Integer createdById,   // giáo viên tạo
        List<AnswerCreateDto> answers
) {}
