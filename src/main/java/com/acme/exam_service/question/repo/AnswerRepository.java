package com.acme.exam_service.question.repo;

import com.acme.exam_service.question.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    @Query("select a.question.id from Answer a where a.id = :answerId")
    Optional<Integer> findQuestionIdByAnswerId(Integer answerId);

    List<Answer> findByQuestion_IdIn(Collection<Integer> questionIds);
}
