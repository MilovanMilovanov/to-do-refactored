import { SetStateAction, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TaskModel } from "../../../features/user-tasks/tasksSlice";

import Select from "../../atoms/select/Select";
import Input from "../../atoms/input/Input";
import Form from "../form/Form";

import styles from "./TaskFilters.module.scss";

interface FiltersModel {
  userIds: string[];
  tasks: TaskModel[];
  statusFilterOptions: string[];
  setFilteredTasks: React.Dispatch<SetStateAction<TaskModel[]>>;
}

interface FIltersFormModel {
  title: string;
  status: string;
  userId: number | null;
}

const initialFormData = {
  title: "",
  status: "",
  userId: null,
};

function TaskFilters({
  tasks,
  userIds,
  statusFilterOptions,
  setFilteredTasks,
}: FiltersModel) {
  const { register, watch } = useForm<FIltersFormModel>({
    values: initialFormData,
    mode: "onChange",
  });

  const { userId, title, status } = watch();

  const filterTasks = useCallback(() => {
    return tasks.filter((task: TaskModel) => {
      const statusMatches =
        !status ||
        status === "all" ||
        (status === "completed" && task.completed) ||
        (status === "uncompleted" && !task.completed);

      const titleMatches =
        !title || task.title.toLowerCase().includes(title.toLowerCase());

      const userIdMatches = !userId || task.userId === Number(userId);

      return statusMatches && titleMatches && userIdMatches;
    });
  }, [status, title, userId, tasks]);

  useEffect(() => {
    setFilteredTasks(filterTasks());
  }, [filterTasks, setFilteredTasks]);

  return (
    <section className={styles.container}>
      <Form className={styles.filtersForm} title="Task Filter">
        <Input
          {...register("title")}
          placeholder="Filter by title"
          className={`${styles.filter} ${styles["filter--byTitle"]}`}
        />
        <Select
          {...register("userId")}
          options={userIds}
          className={styles.filter}
          filterDefaultText="Filter by user id"
        />
        <Select
          {...register("status")}
          options={statusFilterOptions}
          className={styles.filter}
          filterDefaultText="Filter by status"
        />
      </Form>
    </section>
  );
}

export default TaskFilters;
