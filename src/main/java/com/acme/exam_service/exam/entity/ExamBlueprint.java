package com.acme.exam_service.exam.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "exam_blueprints", schema = "dbo")
public class ExamBlueprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(name = "chapter_id")
    private Integer chapterId;

    @Column(name = "section_id")
    private Integer sectionId;

    @Column(name = "difficulty", columnDefinition = "tinyint")
    private Short difficulty;

    @NotNull
    @Column(name = "num_questions", nullable = false)
    private Integer numQuestions;

}