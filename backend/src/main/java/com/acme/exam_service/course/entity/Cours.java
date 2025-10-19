package com.acme.exam_service.course.entity;

import com.acme.exam_service.exam.entity.Exam;
import com.acme.exam_service.question.entity.Question;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "courses", schema = "dbo")
public class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 150)
    @NotNull
    @Nationalized
    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @OneToMany(mappedBy = "course")
    private Set<Chapter> chapters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<Exam> exams = new LinkedHashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<Question> questions = new LinkedHashSet<>();

}