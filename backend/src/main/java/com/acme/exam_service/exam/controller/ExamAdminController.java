package com.acme.exam_service.exam.controller;

import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.exam.dto.*;
import com.acme.exam_service.exam.service.ExamAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamAdminController {

    private final ExamAdminService service;

    /* ========== GENERATE PAPERS (via SP) ========== */
    @PostMapping("/{examId}/papers:generate")
    public ApiResponse<String> generate(
            @PathVariable int examId,
            @RequestParam(defaultValue = "2") int count,
            @RequestParam(defaultValue = "true") boolean replace) {
        service.generatePapers(examId, count, replace);
        return new ApiResponse<>("OK");
    }

    /* ========== LIST / GET / CREATE / UPDATE / DELETE EXAM ========== */

    // list: trả ExamListItem, có filter thời gian (tùy chọn)
    @GetMapping
    public ApiResponse<Page<ExamListItem>> list(
            @RequestParam(required = false) Integer courseId,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Instant fromTs,
            @RequestParam(required = false) Instant toTs,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return new ApiResponse<>(service.list(courseId, keyword, fromTs, toTs, page, size));
    }

    @GetMapping("/{id}")
    public ApiResponse<ExamResponse> get(@PathVariable Integer id) {
        return new ApiResponse<>(service.get(id));
    }

    @PostMapping
    public ApiResponse<ExamResponse> create(@RequestBody ExamCreateRequest req) {
        return new ApiResponse<>(service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<ExamResponse> update(@PathVariable Integer id, @RequestBody ExamUpdateRequest req) {
        return new ApiResponse<>(service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Integer id) {
        service.delete(id);
        return new ApiResponse<>("DELETED");
    }

    /* ========== ASSIGN / UNASSIGN CLASSES ========== */

    @PostMapping("/{examId}/assign")
    public ApiResponse<String> assign(@PathVariable Integer examId, @RequestBody AssignClassesRequest req) {
        service.assignClasses(examId, req.classIds());
        return new ApiResponse<>("ASSIGNED");
    }

    // Trả về danh sách classId (service đang trả List<Integer>)
    @GetMapping("/{examId}/classes")
    public ApiResponse<List<Integer>> listAssigned(@PathVariable Integer examId) {
        return new ApiResponse<>(service.listAssignedClassIds(examId));
    }

    @DeleteMapping("/{examId}/classes/{classId}")
    public ApiResponse<String> unassign(@PathVariable Integer examId, @PathVariable Integer classId) {
        service.unassignClass(examId, classId);
        return new ApiResponse<>("UNASSIGNED");
    }

    /* ========== BLUEPRINT ========== */

    @GetMapping("/{id}/blueprint")
    public ApiResponse<List<BlueprintItemDto>> getBlueprint(@PathVariable Integer id) {
        return new ApiResponse<>(service.getBlueprint(id));
    }

    @PutMapping("/{id}/blueprint")
    public ApiResponse<String> saveBlueprint(@PathVariable Integer id,
                                             @RequestBody SaveBlueprintRequest req) {
        service.saveBlueprint(id, req);
        return new ApiResponse<>("SAVED");
    }
}
