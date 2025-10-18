package com.acme.exam_service.question.repo;
import com.acme.exam_service.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
public interface QuestionRepository extends JpaRepository<Question, Integer> {}
