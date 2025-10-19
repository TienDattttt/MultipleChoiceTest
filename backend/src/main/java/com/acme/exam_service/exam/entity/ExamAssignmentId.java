package com.acme.exam_service.exam.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class ExamAssignmentId implements Serializable {
    private static final long serialVersionUID = -6545032069799589346L;
    @NotNull
    @Column(name = "exam_id", nullable = false)
    private Integer examId;

    @NotNull
    @Column(name = "class_id", nullable = false)
    private Integer classId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ExamAssignmentId entity = (ExamAssignmentId) o;
        return Objects.equals(this.classId, entity.classId) &&
                Objects.equals(this.examId, entity.examId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(classId, examId);
    }

}