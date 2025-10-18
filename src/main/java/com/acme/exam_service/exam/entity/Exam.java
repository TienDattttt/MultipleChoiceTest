package com.acme.exam_service.exam.entity;

import com.acme.exam_service.attempt.entity.Attempt;
import com.acme.exam_service.classes.entity.Class;
import com.acme.exam_service.course.entity.Cours;
import com.acme.exam_service.users.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "exams", schema = "dbo")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Cours course;

    @Size(max = 200)
    @NotNull
    @Nationalized
    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @NotNull
    @Column(name = "start_at", nullable = false)
    private Instant startAt;

    @NotNull
    @Column(name = "end_at", nullable = false)
    private Instant endAt;

    @NotNull
    @Column(name = "duration_min", nullable = false)
    private Integer durationMin;

    @NotNull
    @ColumnDefault("1")
    @Column(name = "attempts_limit", nullable = false)
    private Integer attemptsLimit;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @OneToMany(mappedBy = "exam")
    private Set<Attempt> attempts = new LinkedHashSet<>();

    @ManyToMany
    private Set<Class> classes = new LinkedHashSet<>();

    @OneToMany(mappedBy = "exam")
    private Set<ExamBlueprint> examBlueprints = new LinkedHashSet<>();

    @OneToMany(mappedBy = "exam")
    private Set<ExamPaper> examPapers = new LinkedHashSet<>();

}