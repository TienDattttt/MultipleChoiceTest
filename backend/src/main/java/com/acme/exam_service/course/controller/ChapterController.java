package com.acme.exam_service.course.controller;

import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.course.dto.*;
import com.acme.exam_service.course.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chapters")
@RequiredArgsConstructor
public class ChapterController {
    private final ChapterService service;

    @GetMapping
    public ApiResponse<?> listByCourse(@RequestParam Integer courseId) {
        return ApiResponse.ok(service.listByCourse(courseId));
    }

    @PostMapping
    public ApiResponse<?> create(@RequestBody ChapterUpsertRequest req) {
        return ApiResponse.ok("Chapter created", service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@PathVariable Integer id, @RequestBody ChapterUpsertRequest req) {
        return ApiResponse.ok("Chapter updated", service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Integer id) {
        service.delete(id);
        return ApiResponse.ok("Chapter deleted", "DELETED");
    }
}

