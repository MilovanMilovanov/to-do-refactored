import { TableHTMLAttributes, useCallback } from "react";
import {
  TaskModel,
  updateTaskStatus,
} from "../../../features/user-tasks/tasksSlice";
import { useDispatch } from "react-redux";

import useApi from "../../../hooks/useApi/useApi";
import Button from "../../atoms/button/Button";
import Scrollable from "../../shared/scrollable/Scrollable";

import styles from "./TaskTable.module.scss";

interface TaskTableModel extends TableHTMLAttributes<HTMLTableElement> {
  tasks: TaskModel[];
  currentPage: number;
}
const NoFilterMatchMessage =
  "  There is no match for this filter search. Change the filter options";

export const PAGE_SIZE = 10;

function TaskTable({ tasks, currentPage }: TaskTableModel) {
  const { request } = useApi();
  const dispatch = useDispatch();

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

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

  return (
    <table className={`base-table ${styles.table}`}>
      <thead className={styles.tableHead}>
        <tr className={styles.row}>
          <th className={styles.userId}>ID</th>
          <th className={styles.title}>Title</th>
          <th className={styles.status}>Status</th>
          <th className={styles.actions}>Actions</th>
        </tr>
      </thead>
      <Scrollable
        tagName="tbody"
        isScrollingEnabled={Boolean(paginatedTasks.length)}
        className={styles.tableBody}
        scrollWidth={0.8}
      >
        {paginatedTasks.length ? (
          paginatedTasks.map(({ id, title, completed }: TaskModel) => {
            const buttonText = completed
              ? "Mark as Incomplete"
              : "Mark as Complete";
            return (
              <tr className={styles.row} key={id}>
                <td className={styles.userId}>{id}</td>
                <td className={styles.title}>{title}</td>
                <td className={styles.status}>
                  {completed ? "Completed" : "Not Completed"}
                </td>
                <td className={styles.actions}>
                  <Button
                    aria-label={buttonText}
                    className={styles.btnChangeTaskStatus}
                    onClick={() => handleTaskStatusChange(id, completed)}
                  >
                    {buttonText}
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr className={styles.noFilterMatchContainer}>
            <td>
              <span className={styles.noFilterMatchMessage}>
                {NoFilterMatchMessage}
              </span>
            </td>
          </tr>
        )}
      </Scrollable>
    </table>
  );
}

export default TaskTable;
