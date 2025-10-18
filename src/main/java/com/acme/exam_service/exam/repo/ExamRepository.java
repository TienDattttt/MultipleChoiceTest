package com.acme.exam_service.exam.repo;
import com.acme.exam_service.exam.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ExamRepository extends JpaRepository<Exam, Integer> {}