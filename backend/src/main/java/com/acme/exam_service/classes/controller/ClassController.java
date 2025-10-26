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
    public ApiResponse<?> list(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.ok(service.list(keyword, page, size));
    }

    @PostMapping
    public ApiResponse<?> create(@RequestBody ClassCreateRequest req) {
        return ApiResponse.ok("Class created", service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@PathVariable Integer id, @RequestBody ClassUpdateRequest req) {
        return ApiResponse.ok("Class updated", service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Integer id) {
        service.delete(id);
        return ApiResponse.ok("Class deleted", "DELETED");
    }

    @GetMapping("/{classId}/members")
    public ApiResponse<?> listMembers(@PathVariable Integer classId) {
        return ApiResponse.ok(service.listMembers(classId));
    }

    @PostMapping("/{classId}/members")
    public ApiResponse<?> addMember(@PathVariable Integer classId, @RequestBody AddMemberRequest req) {
        service.addMember(classId, req.userId());
        return ApiResponse.ok("Member added", "ADDED");
    }

    @PostMapping("/{classId}/members:bulk")
    public ApiResponse<?> addMembers(@PathVariable Integer classId, @RequestBody BulkAddMembersRequest req) {
        service.addMembers(classId, req.userIds());
        return ApiResponse.ok("Members added", "ADDED");
    }

    @DeleteMapping("/{classId}/members/{userId}")
    public ApiResponse<?> removeMember(@PathVariable Integer classId, @PathVariable Integer userId) {
        service.removeMember(classId, userId);
        return ApiResponse.ok("Member removed", "REMOVED");
    }

    @GetMapping("/students:search")
    public ApiResponse<?> searchStudents(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.ok(service.searchStudents(keyword, page, size));
    }
}
