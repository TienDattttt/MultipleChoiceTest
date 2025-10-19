package com.acme.exam_service.course.service;

import com.acme.exam_service.course.dto.*;
import com.acme.exam_service.course.entity.Chapter;
import com.acme.exam_service.course.entity.Section;
import com.acme.exam_service.course.repo.SectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @RequiredArgsConstructor
public class SectionService {
    private final SectionRepository repo;

    @Transactional(readOnly = true)
    public List<SectionDto> listByChapter(Integer chapterId) {
        return repo.findByChapter_Id(chapterId).stream()
                .map(s -> new SectionDto(s.getId(), s.getChapter().getId(), s.getName()))
                .toList();
    }

    @Transactional public SectionDto create(SectionUpsertRequest req) {
        var s = new Section();
        var ch = new Chapter(); ch.setId(req.chapterId());
        s.setChapter(ch);
        s.setName(req.name());
        s = repo.save(s);
        return new SectionDto(s.getId(), s.getChapter().getId(), s.getName());
    }

    @Transactional public SectionDto update(Integer id, SectionUpsertRequest req) {
        var s = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Section not found"));
        if (req.chapterId()!=null) { var ch=new Chapter(); ch.setId(req.chapterId()); s.setChapter(ch); }
        s.setName(req.name());
        return new SectionDto(s.getId(), s.getChapter().getId(), s.getName());
    }

    @Transactional public void delete(Integer id) { repo.deleteById(id); }
}
