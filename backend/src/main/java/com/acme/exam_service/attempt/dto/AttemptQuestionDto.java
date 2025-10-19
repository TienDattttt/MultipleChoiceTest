package com.acme.exam_service.attempt.dto;

import java.util.List;

public record AttemptQuestionDto(
        Integer questionId,
        String content,
        List<OptionDto> options,
        Integer selectedAnswerId // null nếu chưa chọn
) {
    public record OptionDto(Integer answerId, String content) {}
}
