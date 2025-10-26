package com.acme.exam_service.attempt.controller;

import com.acme.exam_service.attempt.dto.*;
import com.acme.exam_service.attempt.service.AttemptService;
import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.common.service.StoredProcExecutor;
import com.acme.exam_service.auth.service.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class AttemptController {

    private final AttemptService service;
    private final StoredProcExecutor sp;

    // Start attempt
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/start")
    public ApiResponse<?> start(@RequestBody StartAttemptRequest req) {
        Integer me = SecurityUtils.currentUserId();       // 👈 lấy user từ token
        var res = service.startAttempt(req.examId(), me); // không nhận userId từ body nữa
        return ApiResponse.ok("Attempt started", res);
    }

    // Save one answer (autosave)
    @PreAuthorize("hasRole('STUDENT')")
    @PutMapping("/{attemptId}/answers")
    public ApiResponse<?> save(
            @PathVariable Integer attemptId,
            @RequestBody SaveAnswerRequest body) {
        try {
            service.saveAnswerOwned(attemptId, body);
            return ApiResponse.ok("Answer saved", "SAVED");
        } catch (IllegalArgumentException e) {
            return ApiResponse.error(e.getMessage());
        }

    }

    // Get attempt detail
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/{attemptId}")
    public ApiResponse<?> detail(@PathVariable Integer attemptId) {
        return ApiResponse.ok(service.getAttemptDetailOwned(attemptId));
    }

    // Submit and grade
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{attemptId}/submit")
    public ApiResponse<?> submit(@PathVariable Integer attemptId) {
        service.lockIfTimeOverAndSubmitOwned(attemptId, false);
        sp.execSubmitAndGrade(attemptId);
        return ApiResponse.ok("Submitted", "SUBMITTED");
    }

    // Remaining time
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/{attemptId}/remaining")
    public ApiResponse<?> remaining(@PathVariable Integer attemptId) {
        return ApiResponse.ok(service.getRemainingTimeOwned(attemptId));
    }
}

