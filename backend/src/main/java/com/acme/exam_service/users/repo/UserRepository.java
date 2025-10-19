package com.acme.exam_service.users.repo;

import com.acme.exam_service.users.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Page<User> findByRole_NameAndFullNameContainingIgnoreCase(String roleName, String keyword, Pageable pageable);
    Page<User> findByRole_NameAndEmailContainingIgnoreCase(String roleName, String keyword, Pageable pageable);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
