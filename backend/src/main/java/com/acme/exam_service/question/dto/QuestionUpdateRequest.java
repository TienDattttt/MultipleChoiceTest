package com.acme.exam_service.question.dto;

import java.util.List;

/** Cập nhật câu hỏi (thay thế toàn bộ danh sách đáp án để đơn giản) */
public record QuestionUpdateRequest(
        Integer courseId,
        Integer chapterId,     // nullable
        Integer sectionId,     // nullable
        String content,
        Short difficulty,      // 1..3
        List<AnswerCreateDto> answers
) {}
