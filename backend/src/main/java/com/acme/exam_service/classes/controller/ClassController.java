package com.acme.exam_service.classes.controller;

import com.acme.exam_service.classes.dto.*;
import com.acme.exam_service.classes.service.ClassService;
import com.acme.exam_service.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService service;

    @GetMapping
    public ApiResponse<Page<ClassResponse>> list(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        return new ApiResponse<>(service.list(keyword, page, size));
    }

    @PostMapping
    public ApiResponse<ClassResponse> create(@RequestBody ClassCreateRequest req) {
        return new ApiResponse<>(service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<ClassResponse> update(@PathVariable Integer id, @RequestBody ClassUpdateRequest req) {
        return new ApiResponse<>(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Integer id) {
        service.delete(id);
        return new ApiResponse<>("DELETED");
    }

    @GetMapping("/{classId}/members")
    public ApiResponse<List<ClassMemberResponse>> listMembers(@PathVariable Integer classId) {
        return new ApiResponse<>(service.listMembers(classId));
    }

    @PostMapping("/{classId}/members")
    public ApiResponse<String> addMember(@PathVariable Integer classId, @RequestBody AddMemberRequest req) {
        service.addMember(classId, req.userId());
        return new ApiResponse<>("ADDED");
    }

    @PostMapping("/{classId}/members:bulk")
    public ApiResponse<String> addMembers(@PathVariable Integer classId, @RequestBody BulkAddMembersRequest req) {
        service.addMembers(classId, req.userIds());
        return new ApiResponse<>("ADDED");
    }

    @DeleteMapping("/{classId}/members/{userId}")
    public ApiResponse<String> removeMember(@PathVariable Integer classId, @PathVariable Integer userId) {
        service.removeMember(classId, userId);
        return new ApiResponse<>("REMOVED");
    }

    @GetMapping("/students:search")
    public ApiResponse<org.springframework.data.domain.Page<ClassMemberResponse>> searchStudents(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        return new ApiResponse<>(service.searchStudents(keyword, page, size));
    }
}
