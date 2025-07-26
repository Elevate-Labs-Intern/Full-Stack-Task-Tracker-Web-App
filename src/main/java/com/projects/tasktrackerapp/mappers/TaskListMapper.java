package com.projects.tasktrackerapp.mappers;

import com.projects.tasktrackerapp.domain.dto.TaskListDto;
import com.projects.tasktrackerapp.domain.entities.TaskList;

public interface TaskListMapper {

    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskList taskList);
}
