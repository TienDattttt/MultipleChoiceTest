package com.acme.exam_service.exam.repo;

import com.acme.exam_service.exam.entity.Exam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Integer> {
    @Query("""
      select e from Exam e
      where (:courseId is null or e.course.id = :courseId)
        and (:kw is null or lower(e.title) like lower(concat('%', :kw, '%')))
        and (:fromTs is null or e.startAt >= :fromTs)
        and (:toTs   is null or e.endAt   <= :toTs)
      """)
    Page<Exam> search(Integer courseId,
                      String kw,
                      java.time.Instant fromTs,
                      java.time.Instant toTs,
                      Pageable pageable);

    @Query("""
    select e from Exam e
    join ExamAssignment a on a.exam.id = e.id
    where a.id.classId = :classId
""")
    List<Exam> findExamsAssignedToClass(Integer classId);

}
