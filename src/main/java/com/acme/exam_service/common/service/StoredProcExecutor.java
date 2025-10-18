package com.acme.exam_service.common.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class StoredProcExecutor {
    private final JdbcTemplate jdbc;
    public StoredProcExecutor(JdbcTemplate jdbc) {this.jdbc = jdbc;}

    public void execGeneratePapers(int examId, int paperCount, boolean replace) {
        jdbc.update("EXEC sp_Exam_GeneratePapers ?, ?, ?", examId, paperCount, replace ? 1 : 0);
    }

    public void execSubmitAndGrade(int attemptId) {
        jdbc.update("EXEC sp_Attempt_SubmitAndGrade ?", attemptId);
    }

    public Map<String, Object> execExamStatsBasic(int examId) {
        return jdbc.queryForMap("EXEC sp_Exam_StatsBasic ?", examId);
    }

    public List<Map<String, Object>> execExamListCandidates(int examId, String keyword, int page, int size) {
        return jdbc.queryForList("EXEC sp_Exam_ListCandidates ?, ?, ?, ?", examId,
                keyword == null ? "" : keyword, page, size);
    }
}
