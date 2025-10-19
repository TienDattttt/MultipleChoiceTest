package com.acme.exam_service.question.controller;

import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.question.dto.QuestionImportDtos.ImportReport;
import com.acme.exam_service.question.service.QuestionImportService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/questions")
public class QuestionImportController {

    private final QuestionImportService importService;

    public QuestionImportController(QuestionImportService importService) {
        this.importService = importService;
    }

    /**
     * Import NHCH từ CSV.
     * Form-data key: file (type=File)
     * Optional: createdByUserId (nếu bạn muốn ghi nhận GV tạo)
     */
    @PostMapping(path = "/import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ImportReport> importCsv(
            @RequestPart("file") MultipartFile file,
            @RequestParam(value="createdByUserId", required=false) Integer createdByUserId
    ) {
        var report = importService.importCsv(file, createdByUserId);
        return new ApiResponse<>(report);
    }
}
