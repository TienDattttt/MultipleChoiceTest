package com.acme.exam_service.question.entity;

import com.acme.exam_service.attempt.entity.AttemptAnswer;
import com.acme.exam_service.exam.entity.ExamPaperQuestion;
import com.acme.exam_service.course.entity.Chapter;
import com.acme.exam_service.course.entity.Cours;
import com.acme.exam_service.course.entity.Section;
import com.acme.exam_service.users.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "questions", schema = "dbo")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Cours course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    private Section section;

    @NotNull
    @Nationalized
    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "difficulty", columnDefinition = "tinyint not null")
    private Short difficulty;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @NotNull
    @ColumnDefault("sysdatetime()")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @OneToMany(mappedBy = "question")
    private Set<Answer> answers = new LinkedHashSet<>();

    @OneToMany(mappedBy = "question")
    private Set<AttemptAnswer> attemptAnswers = new LinkedHashSet<>();

    @OneToMany(mappedBy = "question")
    private Set<ExamPaperQuestion> examPaperQuestions = new LinkedHashSet<>();

}