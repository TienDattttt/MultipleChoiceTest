package com.acme.exam_service.attempt.controller;

import com.acme.exam_service.attempt.dto.*;
import com.acme.exam_service.attempt.service.AttemptService;
import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.common.service.StoredProcExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
public class AttemptController {

    private final AttemptService service;
    private final StoredProcExecutor sp;

    // Start attempt
    @PostMapping("/start")
    public ApiResponse<StartAttemptResponse> start(@RequestBody StartAttemptRequest req) {
        return new ApiResponse<>(service.startAttempt(req));
    }

    // Save one answer (autosave)
    @PutMapping("/{attemptId}/answers")
    public ApiResponse<String> save(
            @PathVariable Integer attemptId,
            @RequestBody SaveAnswerRequest body) {
        service.saveAnswer(attemptId, body);
        return new ApiResponse<>("SAVED");
    }

    @GetMapping("/{attemptId}")
    public ApiResponse<AttemptDetailResponse> detail(@PathVariable Integer attemptId) {
        return new ApiResponse<>(service.getAttemptDetail(attemptId));
    }

    // 4) Nộp bài & chấm điểm (gọi SP)
    @PostMapping("/{attemptId}/submit")
    public ApiResponse<String> submit(@PathVariable Integer attemptId) {
        service.lockIfTimeOverAndSubmit(attemptId, false); // kiểm tra thời gian trước khi submit
        sp.execSubmitAndGrade(attemptId);
        return new ApiResponse<>("SUBMITTED");
    }

    // (tiện ích) thời gian còn lại để FE hiển thị
    @GetMapping("/{attemptId}/remaining")
    public ApiResponse<RemainingTimeDto> remaining(@PathVariable Integer attemptId) {
        return new ApiResponse<>(service.getRemainingTime(attemptId));
    }
}
