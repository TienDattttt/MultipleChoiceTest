package com.acme.exam_service.exam.repo;

import com.acme.exam_service.exam.entity.ExamPaperQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamPaperQuestionRepository extends JpaRepository<ExamPaperQuestion, Integer> {
    List<ExamPaperQuestion> findByPaper_IdOrderBySortOrderAsc(Integer paperId);
}
