package com.acme.exam_service.question.repo;

import com.acme.exam_service.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    @Query("""
select q from Question q
where (:courseId is null or q.course.id = :courseId)
  and (:chapterId is null or q.chapter.id = :chapterId)
  and (:sectionId is null or q.section.id = :sectionId)
  and (:difficulty is null or q.difficulty = :difficulty)
  and (:kw is null or q.content like concat('%', :kw, '%'))
""")


    Page<Question> search(Integer courseId,
                          Integer chapterId,
                          Integer sectionId,
                          Short difficulty,
                          String kw,
                          Pageable pageable);
}
