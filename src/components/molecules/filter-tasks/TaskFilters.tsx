import { SetStateAction, useEffect } from "react";
import { TaskModel } from "../../../features/user-tasks/tasksSlice";

import Select from "../../atoms/select/Select";
import Input from "../../atoms/input/Input";
import Form from "../form/Form";

import styles from "./TaskFilters.module.scss";
import useForm from "../../../hooks/useApi/useForm/useForm";

interface FiltersModel {
  userIds: string[];
  tasks: TaskModel[];
  statusFilterOptions: string[];
  setFilteredTasks: React.Dispatch<SetStateAction<TaskModel[]>>;
}

interface FIltersFormModel {
  title: string;
  status: string;
  userId: number;
}

const initialFormData = {
  title: "",
  status: "",
  userId: 0,
};

function TaskFilters({
  tasks,
  userIds,
  statusFilterOptions,
  setFilteredTasks
}: FiltersModel) {
  const { formData: {status, title, userId}, handleInputChange } = useForm<FIltersFormModel>(initialFormData);

  useEffect(() => {
    const filteredData = tasks.filter((task: TaskModel) => {
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

    setFilteredTasks(filteredData);
  }, [status, title, userId, tasks, setFilteredTasks]);

  return (
    <section className={styles.container}>
      <Form className={styles.filtersForm} title="Task Filter">
        <Input
          name="title"
          value={title}
          placeholder="Filter by title"
          className={`${styles.filter} ${styles['filter--byTitle']}`}
          onChange={handleInputChange}
        />
        <Select
          name="userId"
          value={userId}
          options={userIds}
          className={styles.filter}
          filterDefaultText="Filter by user id"
          onChange={handleInputChange}
        />
        <Select
          name="status"
          value={status}
          options={statusFilterOptions}
          className={styles.filter}
          filterDefaultText="Filter by status"
          onChange={handleInputChange}
        />
      </Form>
    </section>
  );
}

export default TaskFilters;
