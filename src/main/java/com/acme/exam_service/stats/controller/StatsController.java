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
    public ApiResponse<ExamStatsDto> basic(@PathVariable int examId) {
        return new ApiResponse<>(service.getBasic(examId));
    }

    @GetMapping("/exams/{examId}/candidates")
    public ApiResponse<java.util.List<java.util.Map<String,Object>>> list(
            @PathVariable int examId,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        var data = service.serviceListCandidates(examId, keyword, page, size);
        return new ApiResponse<>(data);
    }
}

