package com.acme.exam_service.course.controller;

import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.course.dto.*;
import com.acme.exam_service.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService service;

    @GetMapping
    public ApiResponse<Page<CourseDto>> list(@RequestParam(required=false) String keyword,
                                             @RequestParam(defaultValue="1") int page,
                                             @RequestParam(defaultValue="20") int size) {
        return new ApiResponse<>(service.list(keyword, page, size));
    }

    @PostMapping
    public ApiResponse<CourseDto> create(@RequestBody CourseUpsertRequest req) {
        return new ApiResponse<>(service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<CourseDto> update(@PathVariable Integer id, @RequestBody CourseUpsertRequest req) {
        return new ApiResponse<>(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Integer id) {
        service.delete(id);
        return new ApiResponse<>("DELETED");
    }
}
