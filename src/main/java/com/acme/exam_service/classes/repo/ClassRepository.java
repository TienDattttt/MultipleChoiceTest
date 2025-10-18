package com.acme.exam_service.classes.repo;

import com.acme.exam_service.classes.entity.Class;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<Class, Integer> {
    Page<Class> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
}
