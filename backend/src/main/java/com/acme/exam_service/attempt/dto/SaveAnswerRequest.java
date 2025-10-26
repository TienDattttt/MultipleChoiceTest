package com.acme.exam_service.attempt.dto;

public record SaveAnswerRequest(
        Integer questionId,
        Integer selectedAnswerId
) {}
