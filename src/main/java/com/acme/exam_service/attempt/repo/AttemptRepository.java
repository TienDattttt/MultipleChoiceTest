package com.acme.exam_service.attempt.repo;

import com.acme.exam_service.attempt.entity.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AttemptRepository extends JpaRepository<Attempt, Integer> {
    Optional<Attempt> findByExam_IdAndUser_Id(Integer examId, Integer userId);

    @Query("select aa from AttemptAnswer aa where aa.attempt.id = :attemptId")
    List<com.acme.exam_service.attempt.entity.AttemptAnswer> findAnswersByAttemptId(Integer attemptId);

    long countByExam_Id(Integer examId);
}
