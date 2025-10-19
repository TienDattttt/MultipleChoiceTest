package com.acme.exam_service.classes.service;

import com.acme.exam_service.classes.dto.*;
import com.acme.exam_service.classes.entity.Class;
import com.acme.exam_service.classes.entity.ClassMember;
import com.acme.exam_service.classes.entity.ClassMemberId;
import com.acme.exam_service.classes.repo.ClassMemberRepository;
import com.acme.exam_service.classes.repo.ClassRepository;
import com.acme.exam_service.users.entity.User;
import com.acme.exam_service.users.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final ClassRepository classRepo;
    private final ClassMemberRepository classMemberRepo;
    private final UserRepository userRepo;

    /* ---------- CRUD LỚP ---------- */

    public Page<ClassResponse> list(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page-1,0), Math.max(size,1), Sort.by("name").ascending());
        Page<Class> p = (keyword==null || keyword.isBlank())
                ? classRepo.findAll(pageable)
                : classRepo.findByNameContainingIgnoreCase(keyword, pageable);
        return p.map(c -> new ClassResponse(c.getId(), c.getName()));
    }

    @Transactional
    public ClassResponse create(ClassCreateRequest req) {
        Class c = new Class();
        c.setName(req.name());
        c = classRepo.save(c);
        return new ClassResponse(c.getId(), c.getName());
    }

    @Transactional
    public ClassResponse update(Integer id, ClassUpdateRequest req) {
        Class c = classRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Class not found"));
        c.setName(req.name());
        return new ClassResponse(c.getId(), c.getName());
    }

    @Transactional
    public void delete(Integer id) {
        classRepo.deleteById(id);
    }

    /* ---------- QUẢN LÝ THÀNH VIÊN ---------- */

    @Transactional
    public void addMember(Integer classId, Integer userId) {
        var clazz = classRepo.findById(classId).orElseThrow(() -> new IllegalArgumentException("Class not found"));
        User user = userRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        // chỉ cho phép thêm user có role STUDENT (đơn giản hoá)
        if (!"STUDENT".equalsIgnoreCase(user.getRole().getName())) {
            throw new IllegalArgumentException("Only STUDENT can be added to a class.");
        }

        if (classMemberRepo.existsById_ClassIdAndId_UserId(classId, userId)) return; // idempotent

        ClassMember cm = new ClassMember();

        // ✅ ClassMemberId là @Embeddable KHÔNG có constructor tham số
        ClassMemberId id = new ClassMemberId();
        id.setClassId(classId);
        id.setUserId(userId);
        cm.setId(id);

        cm.setUser(user);
        cm.setClassField(clazz); // ✅ entity của bạn dùng field tên 'classField'
        classMemberRepo.save(cm);
    }

    @Transactional
    public void addMembers(Integer classId, List<Integer> userIds) {
        for (Integer uid : userIds) addMember(classId, uid);
    }

    @Transactional(readOnly = true)
    public List<ClassMemberResponse> listMembers(Integer classId) {
        classRepo.findById(classId).orElseThrow(() -> new IllegalArgumentException("Class not found"));
        return classMemberRepo.findById_ClassId(classId).stream()
                .map(cm -> new ClassMemberResponse(
                        cm.getUser().getId(),
                        cm.getUser().getFullName(),
                        cm.getUser().getEmail()))
                .toList();
    }

    @Transactional
    public void removeMember(Integer classId, Integer userId) {
        classMemberRepo.deleteById_ClassIdAndId_UserId(classId, userId);
    }

    /* ---------- TÌM KIẾM SINH VIÊN ---------- */

    public Page<ClassMemberResponse> searchStudents(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page-1,0), Math.max(size,1), Sort.by("fullName").ascending());
        var key = (keyword==null) ? "" : keyword;
        var p1 = userRepo.findByRole_NameAndFullNameContainingIgnoreCase("STUDENT", key, pageable);
        if (!p1.hasContent() && !key.isBlank()) {
            var p2 = userRepo.findByRole_NameAndEmailContainingIgnoreCase("STUDENT", key, pageable);
            return p2.map(u -> new ClassMemberResponse(u.getId(), u.getFullName(), u.getEmail()));
        }
        return p1.map(u -> new ClassMemberResponse(u.getId(), u.getFullName(), u.getEmail()));
    }
}
