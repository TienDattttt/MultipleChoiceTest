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
    public ApiResponse<List<ChapterDto>> listByCourse(@RequestParam Integer courseId) {
        return new ApiResponse<>(service.listByCourse(courseId));
    }

    @PostMapping
    public ApiResponse<ChapterDto> create(@RequestBody ChapterUpsertRequest req) {
        return new ApiResponse<>(service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<ChapterDto> update(@PathVariable Integer id, @RequestBody ChapterUpsertRequest req) {
        return new ApiResponse<>(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Integer id) {
        service.delete(id);
        return new ApiResponse<>("DELETED");
    }
}
