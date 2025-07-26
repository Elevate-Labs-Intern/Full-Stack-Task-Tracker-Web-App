package com.projects.tasktrackerapp.mappers;

import com.projects.tasktrackerapp.domain.dto.TaskDto;
import com.projects.tasktrackerapp.domain.entities.Task;

public interface TaskMapper {

    Task fromDto(TaskDto taskDto);

    TaskDto toDto(Task task);

}
