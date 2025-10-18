package com.acme.exam_service.exam.controller;

import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.exam.service.ExamAdminService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exams")
public class ExamAdminController {

    private final ExamAdminService service;
    public ExamAdminController(ExamAdminService service) { this.service = service; }

    @PostMapping("/{examId}/papers:generate")
    public ApiResponse<String> generate(
            @PathVariable int examId,
            @RequestParam(defaultValue = "2") int count,
            @RequestParam(defaultValue = "true") boolean replace) {
        service.generatePapers(examId, count, replace);
        return new ApiResponse<>("OK");
    }
}
