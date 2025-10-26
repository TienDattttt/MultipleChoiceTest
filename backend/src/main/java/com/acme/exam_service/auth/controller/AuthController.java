package com.acme.exam_service.auth.controller;

import com.acme.exam_service.auth.dto.*;
import com.acme.exam_service.auth.jwt.JwtUtil;
import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.users.repo.UserRepository;
import com.acme.exam_service.users.repo.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository users;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody RegisterRequest req) {

        if (req.fullName() == null || req.fullName().trim().isEmpty())
            return ApiResponse.error("fullName is required");

        if (req.email() == null || req.email().trim().isEmpty())
            return ApiResponse.error("email is required");

        if (req.password() == null || req.password().length() < 6)
            return ApiResponse.error("password must be at least 6 characters");

        String email = req.email().trim().toLowerCase();

        if (users.existsByEmail(email)) {
            return ApiResponse.error("Email already registered");
        }

        var role = roleRepository.findByName("STUDENT")
                .orElseThrow(() -> new IllegalStateException("Missing role STUDENT"));

        var u = new com.acme.exam_service.users.entity.User();
        u.setFullName(req.fullName().trim());
        u.setEmail(email);
        u.setPasswordHash(encoder.encode(req.password()));
        u.setRole(role);
        u.setIsActive(true);

        u = users.save(u);

        return ApiResponse.ok("Register success",
                new RegisterResponse(u.getId(), u.getFullName(), u.getEmail(), role.getName()));
    }

    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody LoginRequest req) {
        var u = users.findByEmailWithRole(req.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!encoder.matches(req.password(), u.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String roleName = u.getRole().getName(); // đã fetch
        String token = jwt.generate(u.getEmail(), Map.of("uid", u.getId(), "role", "ROLE_" + roleName));

        return ApiResponse.ok("Login success",
                new LoginResponse(token, jwt.getExpiresIn(), u.getId(), u.getFullName(), roleName, u.getEmail()));
    }

    @GetMapping("/me")
    public ApiResponse<?> me(@AuthenticationPrincipal org.springframework.security.core.userdetails.User principal) {
        var u = users.findByEmailWithRole(principal.getUsername()).orElseThrow();
        return ApiResponse.ok(Map.of(
                "id", u.getId(),
                "fullName", u.getFullName(),
                "email", u.getEmail(),
                "role", u.getRole().getName()
        ));
    }
}

