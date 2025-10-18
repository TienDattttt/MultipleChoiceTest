package com.acme.exam_service.users.repo;
import com.acme.exam_service.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User, Integer> {}
