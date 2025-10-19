package com.acme.exam_service.auth.dto;

public record LoginResponse(
        String accessToken,
        long expiresIn,
        Integer userId,
        String fullName,
        String role
) {}
