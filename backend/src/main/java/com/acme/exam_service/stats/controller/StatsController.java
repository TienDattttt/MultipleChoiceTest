package com.acme.exam_service.stats.controller;

import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.stats.dto.ExamStatsDto;
import com.acme.exam_service.stats.service.StatsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final StatsService service;
    public StatsController(StatsService service) { this.service = service; }

    @GetMapping("/exams/{examId}/basic")
    public ApiResponse<?> basic(@PathVariable int examId) {
        return ApiResponse.ok(service.getBasic(examId));
    }

    @GetMapping("/exams/{examId}/candidates")
    public ApiResponse<?> list(
            @PathVariable int examId,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.ok(service.serviceListCandidates(examId, keyword, page, size));
    }
}

