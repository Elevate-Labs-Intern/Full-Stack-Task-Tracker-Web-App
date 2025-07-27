package com.projects.tasktrackerapp.domain.dto;

import com.projects.tasktrackerapp.domain.entities.TaskPriority;
import com.projects.tasktrackerapp.domain.entities.TaskStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(
        UUID id,
        @NotEmpty
        @Schema(description = "Task's title.")
        String title,
        @Schema(description = "Task's description.")
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status
) {
}
