package com.acme.exam_service.auth.controller;

import com.acme.exam_service.auth.dto.*;
import com.acme.exam_service.auth.jwt.JwtUtil;
import com.acme.exam_service.common.dto.ApiResponse;
import com.acme.exam_service.users.repo.UserRepository;
import com.acme.exam_service.users.repo.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
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

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest req) {
        var u = users.findByEmail(req.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        if (!Boolean.TRUE.equals(u.getIsActive())) {
            throw new BadCredentialsException("Inactive user");
        }
        if (!encoder.matches(req.password(), u.getPasswordHash())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        String token = jwt.generate(u.getEmail(), Map.of(
                "uid", u.getId(),
                "role", "ROLE_" + u.getRole().getName()
        ));
        return new ApiResponse<>(new LoginResponse(
                token, jwt.getExpiresIn(), u.getId(), u.getFullName(), u.getRole().getName()
        ));
    }

    @GetMapping("/me")
    public ApiResponse<Map<String,Object>> me(
            @org.springframework.security.core.annotation.AuthenticationPrincipal
            org.springframework.security.core.userdetails.User principal
    ) {
        var u = users.findByEmail(principal.getUsername()).orElseThrow();
        return new ApiResponse<>(Map.of(
                "id", u.getId(),
                "fullName", u.getFullName(),
                "email", u.getEmail(),
                "role", u.getRole().getName()
        ));
    }

    @PostMapping("/register")
    public ApiResponse<RegisterResponse> register(@RequestBody RegisterRequest req) {
        // 1) validate cơ bản
        if (req.fullName() == null || req.fullName().trim().isEmpty())
            throw new IllegalArgumentException("fullName is required");
        if (req.email() == null || req.email().trim().isEmpty())
            throw new IllegalArgumentException("email is required");
        if (req.password() == null || req.password().length() < 6)
            throw new IllegalArgumentException("password must be at least 6 chars");

        String email = req.email().trim().toLowerCase();

        // 2) chặn trùng email
        if (users.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        // 3) lấy ROLE_STUDENT
        var role = roleRepository.findByName("STUDENT")
                .orElseThrow(() -> new IllegalStateException("Missing role STUDENT in database"));

        // 4) tạo user
        var u = new com.acme.exam_service.users.entity.User();
        u.setFullName(req.fullName().trim());
        u.setEmail(email);
        u.setPasswordHash(encoder.encode(req.password())); // băm BCrypt
        u.setRole(role);
        u.setIsActive(true);

        u = users.save(u);

        return new ApiResponse<>(new RegisterResponse(
                u.getId(), u.getFullName(), u.getEmail(), u.getRole().getName()
        ));
    }
}
