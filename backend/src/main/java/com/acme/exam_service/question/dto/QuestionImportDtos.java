package com.acme.exam_service.question.dto;

import java.util.ArrayList;
import java.util.List;

public class QuestionImportDtos {

    public static class RowError {
        public int rowNumber;     // dòng dữ liệu (1-based, không tính header)
        public String message;
        public RowError(int rowNumber, String message) {
            this.rowNumber = rowNumber; this.message = message;
        }
    }

    public static class ImportReport {
        public int totalRows;
        public int imported;
        public int failed;
        public List<RowError> errors = new ArrayList<>();
    }
}
