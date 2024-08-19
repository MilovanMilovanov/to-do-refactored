import { Dispatch } from "react";
import { TaskModel } from "../../../features/user-tasks/tasksSlice";
import Button from "../../atoms/button/Button";

import styles from "./Pagination.module.scss";

interface PaginationModel {
  pageSize: number;
  currentPage: number;
  tasks: TaskModel[];
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

function Pagination({
  currentPage,
  setCurrentPage,
  tasks,
  pageSize,
}: PaginationModel) {
  const incrementPage = () => {
    setCurrentPage((prev) =>
      Math.max(1, Math.min(prev + 1, Math.ceil(tasks.length / pageSize)))
    );
  };

  const decrementPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  return (
      <section className={styles.navigation}>
        <Button
          className={styles.prevBtn}
          onClick={decrementPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button
          className={styles.nextBtn}
          onClick={incrementPage}
          disabled={currentPage === Math.ceil(tasks.length / pageSize)}
        >
          Next
        </Button>
      </section>
  );
}

export default Pagination;
