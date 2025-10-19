package com.acme.exam_service.classes.entity;

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
public class ClassMemberId implements Serializable {
    private static final long serialVersionUID = 4814833505263647033L;
    @NotNull
    @Column(name = "class_id", nullable = false)
    private Integer classId;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ClassMemberId entity = (ClassMemberId) o;
        return Objects.equals(this.classId, entity.classId) &&
                Objects.equals(this.userId, entity.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(classId, userId);
    }

}