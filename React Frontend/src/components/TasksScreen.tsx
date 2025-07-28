import { parseDate } from "@internationalized/date";
import {
  Button,
  Checkbox,
  DateInput,
  Progress,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ArrowLeft, Edit, Minus, Plus, Trash } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../AppProvider";
import Task from "../domain/Task";
import { TaskStatus } from "../domain/TaskStatus";
import { TaskPriority } from "../domain/TaskPriority";

const priorityMap: Record<string, number> = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
};

const TaskListScreen: React.FC = () => {
  const { state, api } = useAppContext();
  const { listId } = useParams<{ listId: string }>();
  const [_, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("priority");
  const [filterPriority, setFilterPriority] = useState<TaskPriority | "all">("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const taskList = state.taskLists.find((tl) => listId === tl.id);

  useEffect(() => {
    const loadInitialData = async () => {
      if (!listId) return;

      setIsLoading(true);
      try {
        if (!taskList) {
          await api.getTaskList(listId);
        }

        try {
          await api.fetchTasks(listId);
        } catch (error) {
          console.log("Tasks not available yet");
        }
      } catch (error) {
        console.error("Error loading task list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [listId]);

  const completionPercentage = useMemo(() => {
    if (listId && state.tasks[listId]) {
      const tasks = state.tasks[listId];
      const closeTaskCount = tasks.filter(
        (task) => task.status === TaskStatus.CLOSED
      ).length;
      return tasks.length > 0 ? (closeTaskCount / tasks.length) * 100 : 0;
    }
    return 0;
  }, [state.tasks, listId]);

  const toggleStatus = (task: Task) => {
    if (listId) {
      const updatedTask = { ...task };
      updatedTask.status =
        task.status === TaskStatus.CLOSED ? TaskStatus.OPEN : TaskStatus.CLOSED;

      if (!task.id || !listId) return;
      //api.updateTask(listId, task.id, updatedTask).then(() => api.fetchTasks(listId)); -- leads to reordering of tasks at frontend
      api.updateTask(listId, task.id, updatedTask).then(() => {
        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? updatedTask : t))
        );
      });
    }
  };

  const deleteTask = (task: Task) => {
    if (!task.id || !listId) return;
    api.deleteTask(listId, task.id).then(() => {
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    });
  };

  const deleteTaskList = async () => {
    if (null != listId) {
      await api.deleteTaskList(listId);
      navigate("/");
    }
  };

    const filteredSortedPaginatedTasks = useMemo(() => {
    let taskData = listId && state.tasks[listId] ? [...state.tasks[listId]] : [];

    if (statusFilter !== "all") {
      taskData = taskData.filter((task) => task.status === statusFilter);
    }

    if (filterPriority !== "all") {
      taskData = taskData.filter((task) => task.priority === filterPriority);
    }

    taskData.sort((a, b) => {
      let aVal: number | string | Date = 0;
      let bVal: number | string | Date = 0;

      if (sortField === "priority") {
        aVal = priorityMap[a.priority as keyof typeof priorityMap] ?? 0;
        bVal = priorityMap[b.priority as keyof typeof priorityMap] ?? 0;
      } else if (sortField === "dueDate") {
        aVal = a.dueDate ? new Date(a.dueDate) : new Date(0);
        bVal = b.dueDate ? new Date(b.dueDate) : new Date(0);
      }

      if (aVal instanceof Date && bVal instanceof Date) {
        return sortOrder === "asc" ? aVal.getTime() - bVal.getTime() : bVal.getTime() - aVal.getTime();
      }

      return sortOrder === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    const start = (page - 1) * itemsPerPage;
    return taskData.slice(start, start + itemsPerPage);
  }, [state.tasks, listId, sortOrder, sortField, statusFilter, filterPriority, page]);

  const totalTasks = useMemo(() => {
    let taskData = listId && state.tasks[listId] ? [...state.tasks[listId]] : [];
    if (statusFilter !== "all") {
      taskData = taskData.filter((task) => task.status === statusFilter);
    }
    if (filterPriority !== "all") {
      taskData = taskData.filter((task) => task.priority === filterPriority);
    }
    return taskData.length;
  }, [state.tasks, listId, statusFilter, filterPriority]);

  const totalPages = Math.ceil(totalTasks / itemsPerPage);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex w-full items-center justify-between">
          <Button
            variant="ghost"
            aria-label="Go back to Task Lists"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <h1 className="text-2xl font-bold mx-4">
            {taskList ? taskList.title : "Unknown Task List"}
          </h1>

          <Button
            variant="ghost"
            aria-label="Edit task list"
            onClick={() => navigate(`/edit-task-list/${listId}`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Progress
        value={completionPercentage}
        className="mb-4"
        aria-label="Task completion progress"
      />

      <div className="flex gap-4 mb-4">
        <Select
          label="Sort by"
          selectedKeys={[sortField]}
          onChange={(e) => setSortField(e.target.value)}
        >
          <SelectItem key="priority" value="priority">Priority</SelectItem>
          <SelectItem key="dueDate" value="dueDate">Due Date</SelectItem>
        </Select>
      
        <Select
          label="Sort Order"
          selectedKeys={[sortOrder]}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <SelectItem key="asc" value="asc">Ascending</SelectItem>
          <SelectItem key="desc" value="desc">Descending</SelectItem>
        </Select>

        <Select
          label="Filter by Status"
          selectedKeys={[statusFilter]}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <SelectItem key="all" value="all">All</SelectItem>
          <SelectItem key="OPEN" value="OPEN">Open</SelectItem>
          <SelectItem key="CLOSED" value="CLOSED">Closed</SelectItem>
        </Select>

        <Select
          label="Filter by Priority"
          selectedKeys={[filterPriority?.toString() ?? "all"]}
          onChange={(e) => {
            const value = e.target.value;
            setFilterPriority(value === "all" ? "all" : value as TaskPriority);
          }}
        >
          <SelectItem key="all" value="all">All</SelectItem>
          <SelectItem key="LOW" value="LOW">Low</SelectItem>
          <SelectItem key="MEDIUM" value="MEDIUM">Medium</SelectItem>
          <SelectItem key="HIGH" value="HIGH">High</SelectItem>
        </Select>
      </div>

      <Button
        onClick={() => navigate(`/task-lists/${listId}/new-task`)}
        aria-label="Add new task"
        className="mb-4 w-full"
      >
        <Plus className="h-4 w-4" /> Add Task
      </Button>

      <div className="border rounded-lg overflow-hidden">
        <Table className="w-full" aria-label="Tasks list">
          <TableHeader>
            <TableColumn>Completed</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Priority</TableColumn>
            <TableColumn>Due Date</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredSortedPaginatedTasks.map((task) => (
              <TableRow key={task.id} className="border-t">
                <TableCell className="px-4 py-2">
                  <Checkbox
                    isSelected={TaskStatus.CLOSED === task.status}
                    onValueChange={() => toggleStatus(task)}
                    aria-label={`Mark task "${task.title}" as ${
                      TaskStatus.CLOSED === task.status ? "open" : "closed"
                    }`}
                  />
                </TableCell>
                <TableCell className="px-4 py-2">{task.title}</TableCell>
                <TableCell className="px-4 py-2">{task.priority}</TableCell>
                <TableCell className="px-4 py-2">
                  {task.dueDate && (
                    <DateInput
                      isDisabled
                      defaultValue={parseDate(
                        new Date(task.dueDate).toISOString().split("T")[0]
                      )}
                      aria-label={`Due date for task "${task.title}"`}
                    />
                  )}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      aria-label={`Edit task "${task.title}"`}
                      onClick={() =>
                        navigate(`/task-lists/${listId}/edit-task/${task.id}`)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => deleteTask(task)}
                      aria-label={`Delete task "${task.title}"`}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">
          Page {page} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button size="sm" isDisabled={page === 1} onClick={() => setPage(1)}>
            First
          </Button>
          <Button
            size="sm"
            isDisabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            size="sm"
            isDisabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
          <Button
            size="sm"
            isDisabled={page >= totalPages}
            onClick={() => setPage(totalPages)}
          >
            Last
          </Button>
        </div>
      </div>

      <Spacer y={4} />
      <div className="flex justify-end">
        <Button
          color="danger"
          startContent={<Minus size={20} />}
          onClick={deleteTaskList}
          aria-label="Delete current task list"
        >
          Delete TaskList
        </Button>
      </div>

      <Spacer y={4} />
    </div>
  );
};

export default TaskListScreen;
