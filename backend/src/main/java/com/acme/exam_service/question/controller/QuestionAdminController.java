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

    // LIST + FILTER + PAGING
    @GetMapping
    public ApiResponse<Page<QuestionListItem>> list(
            @RequestParam(required = false) Integer courseId,
            @RequestParam(required = false) Integer chapterId,
            @RequestParam(required = false) Integer sectionId,
            @RequestParam(required = false) Short difficulty,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return new ApiResponse<>(service.list(courseId, chapterId, sectionId, difficulty, keyword, page, size));
    }

    // GET DETAIL
    @GetMapping("/{id}")
    public ApiResponse<QuestionResponse> get(@PathVariable Integer id) {
        return new ApiResponse<>(service.get(id));
    }

    // CREATE
    @PostMapping
    public ApiResponse<QuestionResponse> create(@RequestBody QuestionCreateRequest req) {
        return new ApiResponse<>(service.create(req));
    }

    // UPDATE (replace answers)
    @PutMapping("/{id}")
    public ApiResponse<QuestionResponse> update(@PathVariable Integer id, @RequestBody QuestionUpdateRequest req) {
        return new ApiResponse<>(service.update(id, req));
    }

    // DELETE (safe)
    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Integer id) {
        service.delete(id);
        return new ApiResponse<>("DELETED");
    }
}
