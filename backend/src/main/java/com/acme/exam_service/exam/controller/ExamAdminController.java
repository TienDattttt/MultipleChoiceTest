package com.acme.exam_service.exam.controller;

import com.acme.exam_service.attempt.entity.Attempt;
import com.acme.exam_service.attempt.repo.AttemptRepository;
import com.acme.exam_service.auth.service.SecurityUtils;
import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.exam.dto.*;
import com.acme.exam_service.exam.repo.ExamRepository;
import com.acme.exam_service.exam.service.ExamAdminService;
import com.acme.exam_service.users.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
public class ExamAdminController {

    private final ExamAdminService service;
    private final UserRepository userRepository;
    private final ExamRepository examRepository;
    private final AttemptRepository attemptRepo;


    @PostMapping("/{examId}/papers:generate")
    public ApiResponse<?> generate(
            @PathVariable int examId,
            @RequestParam(defaultValue = "2") int count,
            @RequestParam(defaultValue = "true") boolean replace) {
        service.generatePapers(examId, count, replace);
        return ApiResponse.ok("Generate success", "OK");
    }

    @GetMapping
    public ApiResponse<?> list(
            @RequestParam(required = false) Integer courseId,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Instant fromTs,
            @RequestParam(required = false) Instant toTs,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok(service.list(courseId, keyword, fromTs, toTs, page, size));
    }

    @GetMapping("/{id}")
    public ApiResponse<?> get(@PathVariable Integer id) {
        return ApiResponse.ok(service.get(id));
    }

    @PostMapping
    public ApiResponse<?> create(@RequestBody ExamCreateRequest req) {
        return ApiResponse.ok("Exam created", service.create(req));
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@PathVariable Integer id, @RequestBody ExamUpdateRequest req) {
        return ApiResponse.ok("Exam updated", service.update(id, req));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Integer id) {
        service.delete(id);
        return ApiResponse.ok("Exam deleted", "DELETED");
    }

    @PostMapping("/{examId}/assign")
    public ApiResponse<?> assign(@PathVariable Integer examId, @RequestBody AssignClassesRequest req) {
        service.assignClasses(examId, req.classIds());
        return ApiResponse.ok("Assigned", "ASSIGNED");
    }

    @GetMapping("/{examId}/classes")
    public ApiResponse<?> listAssigned(@PathVariable Integer examId) {
        return ApiResponse.ok(service.listAssignedClassIds(examId));
    }

    @DeleteMapping("/{examId}/classes/{classId}")
    public ApiResponse<?> unassign(@PathVariable Integer examId, @PathVariable Integer classId) {
        service.unassignClass(examId, classId);
        return ApiResponse.ok("Unassigned", "UNASSIGNED");
    }

    @GetMapping("/{id}/blueprint")
    public ApiResponse<?> getBlueprint(@PathVariable Integer id) {
        return ApiResponse.ok(service.getBlueprint(id));
    }

    @PutMapping("/{id}/blueprint")
    public ApiResponse<?> saveBlueprint(@PathVariable Integer id, @RequestBody SaveBlueprintRequest req) {
        service.saveBlueprint(id, req);
        return ApiResponse.ok("Blueprint saved", "SAVED");
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<List<ExamListItem>> myExams() {
        Integer uid = SecurityUtils.currentUserId();
        var user = userRepository.findWithClasses(uid).orElseThrow();

        var classes = user.getClasses();
        if (classes == null || classes.isEmpty()) {
            return ApiResponse.ok(List.of()); // student chưa thuộc lớp nào
        }

        Integer classId = classes.iterator().next().getId(); // lấy class đầu tiên
        var exams = examRepository.findExamsAssignedToClass(classId);

        List<ExamListItem> items = exams.stream()
                .map( e -> {
                    BigDecimal score = attemptRepo
                            .findByExam_IdAndUser_Id(e.getId(), uid)
                            .map(Attempt::getScore)
                            .orElse(null);

                    return new ExamListItem(
                            e.getId(),
                            e.getCourse().getId(),
                            e.getTitle(),
                            e.getStartAt(),
                            e.getEndAt(),
                            e.getDurationMin(),
                            e.getAttemptsLimit(),
                            score
                    );
                })
                .toList();

        return ApiResponse.ok(items);
    }


}
