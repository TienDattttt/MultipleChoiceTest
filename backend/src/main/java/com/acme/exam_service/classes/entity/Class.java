package com.acme.exam_service.classes.entity;

import com.acme.exam_service.exam.entity.Exam;
import com.acme.exam_service.users.entity.User;
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
@Table(name = "classes", schema = "dbo")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 120)
    @NotNull
    @Nationalized
    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @ManyToMany
    private Set<User> users = new LinkedHashSet<>();

    @ManyToMany
    private Set<Exam> exams = new LinkedHashSet<>();

}