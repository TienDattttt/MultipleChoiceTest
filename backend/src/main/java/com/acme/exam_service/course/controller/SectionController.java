package com.acme.exam_service.course.controller;

import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.course.dto.*;
import com.acme.exam_service.course.service.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sections")
@RequiredArgsConstructor
public class SectionController {
    private final SectionService service;

    @GetMapping
    public ApiResponse<List<SectionDto>> listByChapter(@RequestParam Integer chapterId) {
        return new ApiResponse<>(service.listByChapter(chapterId));
    }

    @PostMapping
    public ApiResponse<SectionDto> create(@RequestBody SectionUpsertRequest req) {
        return new ApiResponse<>(service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<SectionDto> update(@PathVariable Integer id, @RequestBody SectionUpsertRequest req) {
        return new ApiResponse<>(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Integer id) {
        service.delete(id);
        return new ApiResponse<>("DELETED");
    }
}
