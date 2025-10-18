package com.acme.exam_service.classes.repo;

import com.acme.exam_service.classes.entity.ClassMember;
import com.acme.exam_service.classes.entity.ClassMemberId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassMemberRepository extends JpaRepository<ClassMember, ClassMemberId> {
    List<ClassMember> findById_ClassId(Integer classId);
    boolean existsById_ClassIdAndId_UserId(Integer classId, Integer userId);
    void deleteById_ClassIdAndId_UserId(Integer classId, Integer userId);
}
