package com.acme.exam_service.exam.repo;

import com.acme.exam_service.exam.entity.ExamPaper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamPaperRepository extends JpaRepository<ExamPaper, Integer> {
    List<ExamPaper> findByExam_IdOrderByPaperNoAsc(Integer examId);
}
