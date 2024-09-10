import { TableHTMLAttributes } from "react";
import { TaskModel } from "../../../features/user-tasks/tasksSlice";

import Button from "../../atoms/button/Button";
import Scrollable from "../../shared/scrollable/Scrollable";

import styles from "./TaskTable.module.scss";

interface TaskTableModel extends TableHTMLAttributes<HTMLTableElement> {
  tabIndex?: number;
  paginatedTasks: TaskModel[];
  handleTaskStatusChange: (id: number, completed: boolean) => void;
}

function TaskTable({ paginatedTasks, handleTaskStatusChange }: TaskTableModel) {
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
          paginatedTasks.map(({ id, title, completed }: TaskModel) => (
            <tr className={styles.row} key={id}>
              <td className={styles.userId}>{id}</td>
              <td className={styles.title}>{title}</td>
              <td className={styles.status}>
                {completed ? "Completed" : "Not Completed"}
              </td>
              <td className={styles.actions}>
                <Button
                  aria-label={
                    completed
                      ? "Mark task as incomplete"
                      : "Mark task as complete"
                  }
                  className={styles.btnChangeTaskStatus}
                  onClick={() => handleTaskStatusChange(id, completed)}
                >
                  {completed ? "Mark as Incomplete" : "Mark as Complete"}
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr className={styles.noFilterMatchContainer}>
            <td>
              <span className={styles.noFilterMatchMessage}>
                There is no match for this filter search. Change the filter
                options
              </span>
            </td>
          </tr>
        )}
      </Scrollable>
    </table>
  );
}

export default TaskTable;
