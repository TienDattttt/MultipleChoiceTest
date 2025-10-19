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
    public ApiResponse<StartAttemptResponse> start(@RequestBody StartAttemptRequest req) {
        Integer me = SecurityUtils.currentUserId();       // 👈 lấy user từ token
        var res = service.startAttempt(req.examId(), me); // bỏ userId từ body
        return new ApiResponse<>(res);
    }

    // Save one answer (autosave)
    @PreAuthorize("hasRole('STUDENT')")
    @PutMapping("/{attemptId}/answers")
    public ApiResponse<String> save(
            @PathVariable Integer attemptId,
            @RequestBody SaveAnswerRequest body) {
        service.saveAnswerOwned(attemptId, body);         // đã kiểm tra ownership trong service
        return new ApiResponse<>("SAVED");
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/{attemptId}")
    public ApiResponse<AttemptDetailResponse> detail(@PathVariable Integer attemptId) {
        return new ApiResponse<>(service.getAttemptDetailOwned(attemptId));
    }

    // 4) Nộp bài & chấm điểm (gọi SP)
    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{attemptId}/submit")
    public ApiResponse<String> submit(@PathVariable Integer attemptId) {
        service.lockIfTimeOverAndSubmitOwned(attemptId, false); // kiểm tra thời gian + quyền sở hữu
        sp.execSubmitAndGrade(attemptId);
        return new ApiResponse<>("SUBMITTED");
    }

    // thời gian còn lại
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/{attemptId}/remaining")
    public ApiResponse<RemainingTimeDto> remaining(@PathVariable Integer attemptId) {
        return new ApiResponse<>(service.getRemainingTimeOwned(attemptId));
    }
}
