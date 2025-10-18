package com.acme.exam_service.course.service;

import com.acme.exam_service.course.dto.*;
import com.acme.exam_service.course.entity.Cours;
import com.acme.exam_service.course.repo.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor
public class CourseService {
    private final CourseRepository repo;

    @Transactional(readOnly = true)
    public Page<CourseDto> list(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page-1,0), Math.max(size,1), Sort.by("name").ascending());
        var p = (keyword==null || keyword.isBlank())
                ? repo.findAll(pageable)
                : repo.findByNameContainingIgnoreCase(keyword, pageable);
        return p.map(c -> new CourseDto(c.getId(), c.getName()));
    }

    @Transactional public CourseDto create(CourseUpsertRequest req) {
        var c = new Cours(); c.setName(req.name()); c = repo.save(c);
        return new CourseDto(c.getId(), c.getName());
    }

    @Transactional public CourseDto update(Integer id, CourseUpsertRequest req) {
        var c = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Course not found"));
        c.setName(req.name());
        return new CourseDto(c.getId(), c.getName());
    }

    @Transactional public void delete(Integer id) { repo.deleteById(id); }
}
