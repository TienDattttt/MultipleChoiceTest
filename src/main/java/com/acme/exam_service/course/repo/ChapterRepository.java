package com.acme.exam_service.course.repo;

import com.acme.exam_service.course.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Integer> {
    List<Chapter> findByCourse_Id(Integer courseId);
}
