package com.chunkingz.todo.backend.repository;

import com.chunkingz.todo.backend.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByCompletedOrderByDtCreatedDesc(boolean completed);
    Page<Task> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
