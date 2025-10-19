package com.acme.exam_service.attempt.entity;

import com.acme.exam_service.exam.entity.Exam;
import com.acme.exam_service.exam.entity.ExamPaper;
import com.acme.exam_service.users.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "attempts", schema = "dbo")
public class Attempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @ColumnDefault("sysdatetime()")
    @Column(name = "started_at", nullable = false)
    private Instant startedAt;

    @Column(name = "submitted_at")
    private Instant submittedAt;

    @Size(max = 20)
    @NotNull
    @ColumnDefault("'IN_PROGRESS'")
    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "score", precision = 5, scale = 2)
    private BigDecimal score;

    @OneToMany(mappedBy = "attempt")
    private Set<AttemptAnswer> attemptAnswers = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paper_id")
    private ExamPaper paper;

}