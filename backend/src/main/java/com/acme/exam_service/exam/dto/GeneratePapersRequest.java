package com.acme.exam_service.exam.dto;

public record GeneratePapersRequest(
        Integer numPapers,            // >=1
        Integer shuffleSeed           // nullable
) {}
