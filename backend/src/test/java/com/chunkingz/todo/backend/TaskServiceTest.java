package com.chunkingz.todo.backend;

import com.chunkingz.todo.backend.entity.Task;
import com.chunkingz.todo.backend.repository.TaskRepository;
import com.chunkingz.todo.backend.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {
    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task sampleTask;

    @BeforeEach
    void setUp() {
        sampleTask = new Task(1, "Test task", "Test description", false,
                LocalDateTime.now(), LocalDateTime.now());
    }

//    @Test
//    void testGetAllTasks() {
//        List<Task> tasks = Arrays.asList(sampleTask);
//        when(taskRepository.findAll()).thenReturn(tasks);
//        List<Task> result = taskService.getAllTasks();
//        assertEquals(1, result.size());
//        assertEquals("Test task", result.get(0).getTitle());
//        verify(taskRepository, times(1)).findAll();
//    }

    @Test
    void testGetTaskById_Success() {
        when(taskRepository.findById(1)).thenReturn(Optional.of(sampleTask));
        Task result = taskService.getTask(1);
        assertNotNull(result);
        assertEquals("Test task", result.getTitle());
        verify(taskRepository, times(1)).findById(1);
    }

    @Test
    void testGetTaskById_NotFound() {
        when(taskRepository.findById(1)).thenReturn(Optional.empty());
        Exception exception = assertThrows(RuntimeException.class, () -> taskService.getTask(1));
        assertEquals("Task not found", exception.getMessage());
    }

    @Test
    void testCreateTask() {
        when(taskRepository.save(sampleTask)).thenReturn(sampleTask);
        Task result = taskService.createTask(sampleTask);
        assertNotNull(result);
        assertEquals("Test task", result.getTitle());
        verify(taskRepository, times(1)).save(sampleTask);
    }

    @Test
    void testUpdateTask() {
        Task updatedTask = new Task(1, "Updated task", "Updated description", true,
                sampleTask.getDtCreated(), LocalDateTime.now());

        when(taskRepository.findById(1)).thenReturn(Optional.of(sampleTask));
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

        Task result = taskService.updateTask(1, updatedTask);
        assertEquals("Updated task", result.getTitle());
        assertTrue(result.isCompleted());
        verify(taskRepository, times(1)).findById(1);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void testDeleteTask() {
        doNothing().when(taskRepository).deleteById(1);
        taskService.deleteTask(1);
        verify(taskRepository, times(1)).deleteById(1);
    }
}
