package com.acme.exam_service.exam.service;
import com.acme.exam_service.common.service.StoredProcExecutor;
import org.springframework.stereotype.Service;

@Service
public class ExamAdminService   {
    private final StoredProcExecutor sp;
    public ExamAdminService(StoredProcExecutor sp) {
        this.sp = sp;
    }
    public void generatePapers(int examId, int count, boolean replace) {
        sp.execGeneratePapers(examId, count, replace);
    }
}
