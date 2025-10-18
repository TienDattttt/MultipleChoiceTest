package com.acme.exam_service.attempt.repo;

import com.acme.exam_service.attempt.entity.AttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AttemptAnswerRepository extends JpaRepository<AttemptAnswer, Integer> {
    Optional<AttemptAnswer> findByAttempt_IdAndQuestion_Id(Integer attemptId, Integer questionId);
    List<AttemptAnswer> findByAttempt_Id(Integer attemptId);

    long countByQuestion_Id(Integer questionId);
    long countBySelectedAnswer_Id(Integer answerId);
}
