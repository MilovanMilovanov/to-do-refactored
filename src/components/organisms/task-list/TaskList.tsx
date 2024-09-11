import { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { RootState } from "../../../store";

import { setTasks, TaskModel } from "../../../features/user-tasks/tasksSlice";
import { selectFilteredTasks } from "../../../features/user-tasks/tasksSelectors";

import useApi from "../../../hooks/useApi/useApi";
import TaskTable, { PAGE_SIZE } from "../../molecules/task-table/TaskTable";
import TaskFilters from "../../molecules/filter-tasks/TaskFilters";
import Pagination from "../../molecules/pagination/Pagination";

import styles from "./TaskList.module.scss";

interface TaskListModel {
  tasks: TaskModel[];
}

const getFilteredTasks = (state: RootState) => ({
  tasks: selectFilteredTasks(state),
});

function TaskList({ tasks }: TaskListModel) {
  const { request } = useApi();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (tasks.length === 0) {
      async function fetchTasks() {
        try {
          const data = await request({ endpoint: "todos" });
          dispatch(setTasks(data));
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      }
      fetchTasks();
    }
  }, [dispatch, request, tasks]);

  return (
    <section className={styles.taskList}>
      <TaskFilters />
      <TaskTable tasks={tasks} currentPage={currentPage} />
      <Pagination
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        tasks={tasks}
      />
    </section>
  );
}

const TaskListConected = connect(getFilteredTasks)(TaskList);
export default TaskListConected;
