package com.acme.exam_service.stats.service;

import com.acme.exam_service.common.service.StoredProcExecutor;
import com.acme.exam_service.stats.dto.ExamStatsDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class StatsService {
    private final StoredProcExecutor sp;
    public StatsService(StoredProcExecutor sp) { this.sp = sp; }

    public ExamStatsDto getBasic(int examId) {
        Map<String,Object> m = sp.execExamStatsBasic(examId);
        int reg = ((Number)m.get("registered_count")).intValue();
        int att = ((Number)m.get("attended_count")).intValue();
        BigDecimal avg = m.get("avg_score")==null? null : new BigDecimal(m.get("avg_score").toString());
        return new ExamStatsDto(reg, att, avg);
    }

    public java.util.List<java.util.Map<String,Object>> serviceListCandidates(int examId, String keyword, int page, int size) {
        return sp.execExamListCandidates(examId, keyword, page, size);
    }

}

