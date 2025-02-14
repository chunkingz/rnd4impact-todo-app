package com.chunkingz.todo.backend.service;

import com.chunkingz.todo.backend.entity.Task;
import com.chunkingz.todo.backend.repository.TaskRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Page<Task> getAllTasks(String title, int page, int size, String sortBy, String direction) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        if(title != null && !title.isEmpty()) {
            return taskRepository.findByTitleContainingIgnoreCase(title, pageable);
        } else {
            return taskRepository.findAll(pageable);
        }
    }

    public Task getTask(Integer id){
        return taskRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Task not found"));
    }

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Task updateTask(Integer id,Task updatedTask){
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    task.setCompleted(updatedTask.isCompleted());
                    return taskRepository.save(task);
                }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task toggleTaskCompletion(Integer id){
        return taskRepository.findById(id)
                .map(task -> {
                    task.setCompleted(!task.isCompleted());
                    return taskRepository.save(task);
                }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Integer id){
        taskRepository.deleteById(id);
    }

}
