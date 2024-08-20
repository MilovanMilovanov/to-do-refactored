import { TableHTMLAttributes } from "react";
import { TaskModel } from "../../../features/user-tasks/tasksSlice";
import Button from "../../atoms/button/Button";

import styles from "./TaskTable.module.scss";

interface TaskTableModel extends TableHTMLAttributes<HTMLTableElement> {
  tabIndex?: number;
  paginatedTasks: TaskModel[];
  handleTaskStatusChange: (id: number, completed: boolean) => void;
}

function TaskTable(props: TaskTableModel) {
  const { paginatedTasks, handleTaskStatusChange } = props;
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr className={styles.row}>
          <th className={styles.userId}>ID</th>
          <th className={styles.title}>Title</th>
          <th className={styles.status}>Status</th>
          <th className={styles.actions}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
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
      </tbody>
    </table>
  );
}

export default TaskTable;
