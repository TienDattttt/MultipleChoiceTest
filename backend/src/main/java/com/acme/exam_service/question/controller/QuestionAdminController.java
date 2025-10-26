package com.acme.exam_service.question.controller;

import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.question.dto.*;
import com.acme.exam_service.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionAdminController {

    private final QuestionService service;

    @GetMapping
    public ApiResponse<?> list(
            @RequestParam(required = false) Integer courseId,
            @RequestParam(required = false) Integer chapterId,
            @RequestParam(required = false) Integer sectionId,
            @RequestParam(required = false) Short difficulty,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.list(courseId, chapterId, sectionId, difficulty, keyword, page, size));
    }

    @GetMapping("/{id}")
    public ApiResponse<?> get(@PathVariable Integer id) {
        return ApiResponse.ok(service.get(id));
    }

    @PostMapping
    public ApiResponse<?> create(@RequestBody QuestionCreateRequest req) {
        return ApiResponse.ok("Question created", service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@PathVariable Integer id, @RequestBody QuestionUpdateRequest req) {
        return ApiResponse.ok("Question updated", service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Integer id) {
        service.delete(id);
        return ApiResponse.ok("Question deleted", "DELETED");
    }
}