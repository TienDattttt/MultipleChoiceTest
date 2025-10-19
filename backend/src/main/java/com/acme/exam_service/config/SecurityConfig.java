package com.acme.exam_service.config;

import com.acme.exam_service.auth.jwt.JwtAuthFilter;
import com.acme.exam_service.auth.jwt.JwtUtil;
import com.acme.exam_service.auth.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService uds;
    private final JwtUtil jwtUtil;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
        http.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.authorizeHttpRequests(auth -> auth
                // public
                .requestMatchers(
                        "/api/auth/**",
                        "/api/ping", "/api/db-ping",
                        "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html"
                ).permitAll()

                // student
                .requestMatchers("/api/attempts/**").hasRole("STUDENT")

                // teacher/admin
                .requestMatchers(
                        "/api/questions/**",
                        "/api/exams/**",
                        "/api/chapters/**",
                        "/api/sections/**",
                        "/api/classes/**",
                        "/api/stats/**"
                ).hasAnyRole("TEACHER","ADMIN")

                // everything else
                .anyRequest().authenticated()
        );
        http.addFilterBefore(new JwtAuthFilter(jwtUtil, uds), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
