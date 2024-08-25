import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

import {
  setTasks,
  TaskModel,
  updateTaskStatus,
} from "../../../features/user-tasks/tasksSlice";

import useApi from "../../../hooks/useApi/useApi";
import TaskTable from "../../molecules/task-table/TaskTable";
import TaskFilters from "../../molecules/filter-tasks/TaskFilters";
import Pagination from "../../molecules/pagination/Pagination";

import styles from "./TaskList.module.scss";

const PAGE_SIZE = 10;

const statusFilterOptions: string[] = ["completed", "uncompleted", "all"];

function TaskList() {
  const { request } = useApi();
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.userTasks);
  const usersData = useSelector((state: RootState) => state.userManagement);
  const userIds = usersData.map((user) => String(user.id));

  const [filteredTasks, setFilteredTasks] = useState<TaskModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await request({ endpoint: "todos" });
        dispatch(setTasks(data));
        setFilteredTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }
    if (tasks.length === 0) fetchTasks();
    else setFilteredTasks(tasks);
  }, [request, dispatch, tasks]);

  const handleTaskStatusChange = useCallback(
    async (taskId: number, completed: boolean) => {
      try {
        await request({
          method: "PATCH",
          endpoint: `todos/${taskId}`,
          body: JSON.stringify({ completed: !completed }),
        });

        dispatch(updateTaskStatus({ taskId, status: !completed }));
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    },
    [request, dispatch]
  );

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <section className={styles.taskList}>
      <TaskFilters
        tasks={tasks}
        userIds={userIds}
        statusFilterOptions={statusFilterOptions}
        setFilteredTasks={setFilteredTasks}
      />
      <TaskTable
        paginatedTasks={paginatedTasks}
        handleTaskStatusChange={handleTaskStatusChange}
      />
      <Pagination
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        tasks={filteredTasks}
      />
    </section>
  );
}

export default TaskList;
