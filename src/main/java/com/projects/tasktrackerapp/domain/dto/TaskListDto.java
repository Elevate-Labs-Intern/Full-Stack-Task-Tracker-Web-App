package com.projects.tasktrackerapp.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.UUID;

public record TaskListDto(
        UUID id,
        @NotEmpty
        @Schema(description = "Task List's title.")
        String title,
        @Schema(description = "Task List's description.")
        String description,
        Integer count,
        Double progress,
        List<TaskDto> tasks
) {
}
