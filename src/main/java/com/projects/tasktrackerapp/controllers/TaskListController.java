package com.projects.tasktrackerapp.controllers;

import com.projects.tasktrackerapp.domain.dto.TaskListDto;
import com.projects.tasktrackerapp.domain.entities.TaskList;
import com.projects.tasktrackerapp.mappers.TaskListMapper;
import com.projects.tasktrackerapp.services.TaskListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/task-lists")
@Tag(name = "TaskList APIs", description = "Listing Task Lists and CRUD operations for them.")
public class TaskListController {

    private final TaskListService taskListService;
    private final TaskListMapper taskListMapper;

    public TaskListController(TaskListService taskListService, TaskListMapper taskListMapper) {
        this.taskListService = taskListService;
        this.taskListMapper = taskListMapper;
    }

    @Operation(summary = "Get all task lists")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully fetched all task lists")
    })
    @GetMapping
    public List<TaskListDto> listTaskLists() {
        return taskListService.listTaskLists()
                .stream()
                .map(taskListMapper::toDto)
                .toList();
    }

    @Operation(summary = "Create a new task list")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Task list created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request body")
    })
    @PostMapping
    public TaskListDto createTaskList(@RequestBody TaskListDto taskListDto) {
        TaskList createdTaskList = taskListService.createTaskList(
                taskListMapper.fromDto(taskListDto)
        );
        return taskListMapper.toDto(createdTaskList);
    }

    @Operation(summary = "Get a task list by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Task list found"),
            @ApiResponse(responseCode = "404", description = "Task list not found")
    })
    @GetMapping(path = "/{task_list_id}")
    public Optional<TaskListDto> getTaskList(@PathVariable("task_list_id") UUID taskListId){
        return taskListService.getTaskList(taskListId).map(taskListMapper::toDto);
    }

    @Operation(summary = "Update a task list by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Task list updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Task list not found")
    })
    @PutMapping(path = "/{task_list_id}")
    public TaskListDto updateTaskList(
            @PathVariable("task_list_id") UUID taskListId,
            @RequestBody TaskListDto taskListDto
    ) {
        TaskList updatedTaskList = taskListService.updateTaskList(
                taskListId,
                taskListMapper.fromDto(taskListDto)
        );

        return taskListMapper.toDto(updatedTaskList);
    }

    @Operation(summary = "Delete a task list by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Task list deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Task list not found")
    })
    @DeleteMapping(path = "/{task_list_id}")
    public void deleteTaskList(@PathVariable("task_list_id") UUID taskListId) {
        taskListService.deleteTaskList(taskListId);
    }

}
