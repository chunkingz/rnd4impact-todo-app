package com.chunkingz.todo.backend.controller;

import com.chunkingz.todo.backend.entity.Task;
import com.chunkingz.todo.backend.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public Page<Task> getAllTasks(
            @RequestParam(required = false) String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") String direction
    ){
        return taskService.getAllTasks(title, page, size, sortBy, direction);
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable Integer id){
        return taskService.getTask(id);
    }

    @PostMapping
    public Task createTask(@RequestBody Task todo){
        return taskService.createTask(todo);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Integer id, @RequestBody Task updatedTask){
        return taskService.updateTask(id, updatedTask);
    }

    @PatchMapping("/{id}")
    public Task toggleTaskCompletion(@PathVariable Integer id){
        return taskService.toggleTaskCompletion(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id){
        taskService.deleteTask(id);
    }
}
