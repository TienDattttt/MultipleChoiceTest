package com.acme.exam_service.exam.repo;

import com.acme.exam_service.exam.entity.ExamAssignment;
import com.acme.exam_service.exam.entity.ExamAssignmentId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamAssignmentRepository extends JpaRepository<ExamAssignment, ExamAssignmentId> {
    List<ExamAssignment> findById_ExamId(Integer examId);
    boolean existsById_ExamIdAndId_ClassId(Integer examId, Integer classId);
    void deleteById_ExamIdAndId_ClassId(Integer examId, Integer classId);
}
