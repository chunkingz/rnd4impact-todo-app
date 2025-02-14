package com.chunkingz.todo.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;
    private boolean completed;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime dtCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime dtUpdated;
}
