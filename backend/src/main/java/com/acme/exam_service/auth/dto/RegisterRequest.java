package com.acme.exam_service.auth.dto;

public record RegisterRequest(
        String fullName,
        String email,
        String password
) {}
