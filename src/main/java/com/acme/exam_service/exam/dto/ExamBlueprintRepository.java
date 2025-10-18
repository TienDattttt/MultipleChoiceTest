package com.acme.exam_service.exam.dto;

import com.acme.exam_service.exam.entity.ExamBlueprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamBlueprintRepository extends JpaRepository<ExamBlueprint, Integer> {
    List<ExamBlueprint> findByExam_Id(Integer examId);
    void deleteByExam_Id(Integer examId);
    long countByExam_Id(Integer examId);
}
