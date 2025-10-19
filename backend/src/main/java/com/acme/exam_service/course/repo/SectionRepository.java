package com.acme.exam_service.course.repo;

import com.acme.exam_service.course.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SectionRepository extends JpaRepository<Section, Integer> {
    List<Section> findByChapter_Id(Integer chapterId);
}
