package com.acme.exam_service.course.service;

import com.acme.exam_service.course.dto.*;
import com.acme.exam_service.course.entity.Chapter;
import com.acme.exam_service.course.entity.Cours;
import com.acme.exam_service.course.repo.ChapterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @RequiredArgsConstructor
public class ChapterService {
    private final ChapterRepository repo;

    @Transactional(readOnly = true)
    public List<ChapterDto> listByCourse(Integer courseId) {
        return repo.findByCourse_Id(courseId).stream()
                .map(c -> new ChapterDto(c.getId(), c.getCourse().getId(), c.getName()))
                .toList();
    }

    @Transactional public ChapterDto create(ChapterUpsertRequest req) {
        var ch = new Chapter();
        var c = new Cours(); c.setId(req.courseId());
        ch.setCourse(c);
        ch.setName(req.name());
        ch = repo.save(ch);
        return new ChapterDto(ch.getId(), ch.getCourse().getId(), ch.getName());
    }

    @Transactional public ChapterDto update(Integer id, ChapterUpsertRequest req) {
        var ch = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Chapter not found"));
        if (req.courseId()!=null) { var c=new Cours(); c.setId(req.courseId()); ch.setCourse(c); }
        ch.setName(req.name());
        return new ChapterDto(ch.getId(), ch.getCourse().getId(), ch.getName());
    }

    @Transactional public void delete(Integer id) { repo.deleteById(id); }
}
