package com.projects.tasktrackerapp.domain.dto;

public record ErrorResponse(
        int status,
        String message,
        String details
) {
}
