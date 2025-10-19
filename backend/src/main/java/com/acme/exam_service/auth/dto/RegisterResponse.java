package com.acme.exam_service.auth.dto;

public record RegisterResponse(
        Integer userId,
        String fullName,
        String email,
        String role
) {}
