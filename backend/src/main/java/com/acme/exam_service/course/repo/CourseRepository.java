package com.acme.exam_service.course.repo;

import com.acme.exam_service.course.entity.Cours;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Cours, Integer> {
    Page<Cours> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
}
