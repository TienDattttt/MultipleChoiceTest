package com.acme.exam_service.common.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {
    private final JdbcTemplate jdbc;
    public HealthController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/ping")
    public Map<String, Object> ping() {
        return Map.of("message", "pong");
    }

    @GetMapping("/db-ping")
    public Map<String, Object> dbPing() {
        Integer one = jdbc.queryForObject("SELECT 1", Integer.class);
        return Map.of("db", one);
    }
}
