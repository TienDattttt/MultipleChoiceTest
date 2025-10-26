package com.acme.exam_service.exam.service;

import com.acme.exam_service.common.service.StoredProcExecutor;
import com.acme.exam_service.exam.dto.BlueprintItemDto;
import com.acme.exam_service.exam.dto.SaveBlueprintRequest;
import com.acme.exam_service.exam.entity.ExamBlueprint;
import com.acme.exam_service.exam.repo.ExamBlueprintRepository;
import com.acme.exam_service.exam.dto.ExamCreateRequest;
import com.acme.exam_service.exam.dto.ExamListItem;
import com.acme.exam_service.exam.dto.ExamResponse;
import com.acme.exam_service.exam.dto.ExamUpdateRequest;
import com.acme.exam_service.exam.entity.Exam;
import com.acme.exam_service.exam.entity.ExamAssignment;
import com.acme.exam_service.exam.entity.ExamAssignmentId;
import com.acme.exam_service.exam.repo.ExamAssignmentRepository;
import com.acme.exam_service.exam.repo.ExamRepository;
import com.acme.exam_service.classes.entity.Class;
import com.acme.exam_service.classes.repo.ClassRepository;
import com.acme.exam_service.users.entity.User;
import com.acme.exam_service.users.repo.UserRepository;
import com.acme.exam_service.attempt.repo.AttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

/**
 * Exam admin use-cases:
 * - Generate papers (giữ nguyên cách gọi SP).
 * - CRUD kỳ thi (list/filter/get/create/update/delete).
 * - Gán/Bỏ gán lớp cho kỳ thi.
 *
 * LƯU Ý:
 * - Service giữ nguyên constructor chỉ nhận StoredProcExecutor.
 * - Các repository khác dùng field-injection @Autowired để không đổi signature.
 * - Xoá kỳ thi an toàn: cần AttemptRepository có method countByExam_Id(Integer examId).
 */
@Service
public class ExamAdminService {

    private final StoredProcExecutor sp;

    public ExamAdminService(StoredProcExecutor sp) {
        this.sp = sp;
    }

    /* ===========================
       Field injection (BỔ SUNG)
       =========================== */
    @Autowired private ExamRepository examRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ClassRepository classRepo;
    @Autowired private ExamAssignmentRepository assignRepo;
    @Autowired private AttemptRepository attemptRepo;
    @Autowired private ExamBlueprintRepository blueprintRepo;

    /* ===========================
       Tạo/generate đề (GIỮ NGUYÊN)
       =========================== */
    public void generatePapers(int examId, int count, boolean replace) {
        sp.execGeneratePapers(examId, count, replace);
    }

    /* ===========================
       LIST + FILTER kỳ thi
       =========================== */
    @Transactional(readOnly = true)
    public Page<ExamListItem> list(Integer courseId,
                                   String keyword,
                                   Instant fromTs,
                                   Instant toTs,
                                   int page,
                                   int size) {
        Pageable pageable = PageRequest.of(Math.max(page - 1, 0), Math.max(size, 1),
                Sort.by(Sort.Direction.DESC, "id"));
        String kw = (keyword == null || keyword.isBlank()) ? null : keyword;
        Page<Exam> p = examRepo.search(courseId, kw, fromTs, toTs, pageable);
        return p.map(e -> new ExamListItem(
                e.getId(),
                e.getCourse() == null ? null : e.getCourse().getId(),
                e.getTitle(),
                e.getStartAt(),
                e.getEndAt(),
                e.getDurationMin(),
                e.getAttemptsLimit(),
                null
        ));
    }

    /* ===========================
       GET detail kỳ thi
       =========================== */
    @Transactional(readOnly = true)
    public ExamResponse get(Integer id) {
        Exam e = examRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));
        List<Integer> assignedClassIds = assignRepo.findById_ExamId(id).stream()
                .map(a -> a.getId().getClassId())
                .toList();
        return new ExamResponse(
                e.getId(),
                e.getCourse() == null ? null : e.getCourse().getId(),
                e.getTitle(),
                e.getStartAt(),
                e.getEndAt(),
                e.getDurationMin(),
                e.getAttemptsLimit(),
                e.getCreatedBy() == null ? null : e.getCreatedBy().getId(),
                assignedClassIds
        );
    }

    /* ===========================
       CREATE kỳ thi
       =========================== */
    @Transactional
    public ExamResponse create(ExamCreateRequest req) {
        if (req.startAt() == null || req.endAt() == null || !req.endAt().isAfter(req.startAt())) {
            throw new IllegalArgumentException("endAt must be after startAt");
        }
        if (req.durationMin() == null || req.durationMin() < 5) {
            throw new IllegalArgumentException("durationMin >= 5");
        }

        var course = new com.acme.exam_service.course.entity.Cours();
        course.setId(req.courseId());

        User creator = userRepo.findById(req.createdById())
                .orElseThrow(() -> new IllegalArgumentException("createdBy not found"));

        Exam e = new Exam();
        e.setCourse(course);
        e.setTitle(req.title());
        e.setStartAt(req.startAt());
        e.setEndAt(req.endAt());
        e.setDurationMin(req.durationMin());
        e.setAttemptsLimit(req.attemptsLimit() == null ? 1 : req.attemptsLimit());
        e.setCreatedBy(creator);
        examRepo.save(e);

        return get(e.getId());
    }

    /* ===========================
       UPDATE kỳ thi
       =========================== */
    @Transactional
    public ExamResponse update(Integer id, ExamUpdateRequest req) {
        Exam e = examRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));

        if (req.startAt() != null && req.endAt() != null && !req.endAt().isAfter(req.startAt())) {
            throw new IllegalArgumentException("endAt must be after startAt");
        }

        if (req.courseId() != null) {
            var c = new com.acme.exam_service.course.entity.Cours();
            c.setId(req.courseId());
            e.setCourse(c);
        }
        if (req.title() != null) e.setTitle(req.title());
        if (req.startAt() != null) e.setStartAt(req.startAt());
        if (req.endAt() != null) e.setEndAt(req.endAt());
        if (req.durationMin() != null) e.setDurationMin(req.durationMin());
        if (req.attemptsLimit() != null) e.setAttemptsLimit(req.attemptsLimit());

        examRepo.save(e);
        return get(id);
    }

    /* ===========================
       DELETE kỳ thi (an toàn)
       =========================== */
    @Transactional
    public void delete(Integer id) {
        long cnt = attemptRepo.countByExam_Id(id); // cần method này trong AttemptRepository
        if (cnt > 0) {
            throw new IllegalStateException("Cannot delete: exam already has attempts.");
        }
        examRepo.deleteById(id);
    }

    /* ===========================
       GÁN/BỎ GÁN lớp cho kỳ thi
       =========================== */

    @Transactional
    public void assignClasses(Integer examId, List<Integer> classIds) {
        // kiểm tra exam tồn tại
        examRepo.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));

        for (Integer cid : classIds) {
            classRepo.findById(cid)
                    .orElseThrow(() -> new IllegalArgumentException("Class not found: " + cid));

            // idempotent
            if (assignRepo.existsById_ExamIdAndId_ClassId(examId, cid)) continue;

            ExamAssignment a = new ExamAssignment();
            ExamAssignmentId aid = new ExamAssignmentId();
            aid.setExamId(examId);
            aid.setClassId(cid);
            a.setId(aid);

            // set quan hệ tối thiểu (không fetch thật)
            Exam e = new Exam(); e.setId(examId); a.setExam(e);
            Class c = new Class(); c.setId(cid); a.setClassField(c);

            assignRepo.save(a);
        }
    }

    @Transactional
    public void unassignClass(Integer examId, Integer classId) {
        assignRepo.deleteById_ExamIdAndId_ClassId(examId, classId);
    }

    @Transactional(readOnly = true)
    public List<Integer> listAssignedClassIds(Integer examId) {
        return assignRepo.findById_ExamId(examId).stream()
                .map(a -> a.getId().getClassId())
                .toList();
    }

    @Transactional(readOnly = true)
    public java.util.List<BlueprintItemDto> getBlueprint(Integer examId) {
        examRepo.findById(examId).orElseThrow(() -> new IllegalArgumentException("Exam not found"));
        return blueprintRepo.findByExam_Id(examId).stream()
                .map(b -> new BlueprintItemDto(
                        b.getChapterId(),                 // ✅ lấy id thô
                        b.getSectionId(),                 // ✅ lấy id thô
                        b.getDifficulty(),                // tinyint -> Short đã khớp
                        b.getNumQuestions()
                ))
                .toList();
    }


    /** Lưu blueprint (thay thế toàn bộ)
     *  - Validate: numQuestions > 0 ; difficulty ∈ {1,2,3} hoặc null
     *  - (khuyến nghị) Kiểm tra chapter/section thuộc đúng course của exam (đồ án: optional)
     */
    @Transactional
    public void saveBlueprint(Integer examId, SaveBlueprintRequest req) {
        var exam = examRepo.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));

        // Xoá cũ -> thêm mới
        blueprintRepo.deleteByExam_Id(examId);

        if (req.items() == null || req.items().isEmpty()) return;

        for (BlueprintItemDto it : req.items()) {
            if (it.numQuestions() == null || it.numQuestions() <= 0)
                throw new IllegalArgumentException("numQuestions must be > 0");
            if (it.difficulty() != null && (it.difficulty() < 1 || it.difficulty() > 3))
                throw new IllegalArgumentException("difficulty must be 1..3 or null");

            var bp = new ExamBlueprint();
            bp.setExam(exam);
            bp.setChapterId(it.chapterId());                 // ✅ set id thô
            bp.setSectionId(it.sectionId());                 // ✅ set id thô
            bp.setDifficulty(it.difficulty());               // giữ nguyên Short
            bp.setNumQuestions(it.numQuestions());

            blueprintRepo.save(bp);
        }
    }

}
