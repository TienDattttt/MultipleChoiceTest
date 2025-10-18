package com.acme.exam_service.stats.dto;


import java.math.BigDecimal;

public record ExamStatsDto(int registeredCount, int attendedCount, BigDecimal avgScore) {}

