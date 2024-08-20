import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
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

const initialFormData = {
  title: "",
  status: "",
  userId: 0,
};

function TaskFilters(props: FiltersModel) {
  const [formData, setFormData] = useState(initialFormData);
  const { tasks, userIds, statusFilterOptions, setFilteredTasks } = props;
  const { status, title, userId } = formData;

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

  const handleFilterChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className={styles.container}>
      <Form className={styles.filtersForm} title="Task Filter">
        <Input
          name="title"
          value={title}
          placeholder="Filter by title"
          className={`${styles.filter} ${styles['filter--byTitle']}`}
          onChange={handleFilterChange}
        />
        <Select
          name="userId"
          value={userId}
          options={userIds}
          className={styles.filter}
          filterDefaultText="Filter By Id"
          onChange={handleFilterChange}
        />
        <Select
          name="status"
          value={status}
          options={statusFilterOptions}
          className={styles.filter}
          filterDefaultText="Filter By Status"
          onChange={handleFilterChange}
        />
      </Form>
    </section>
  );
}

export default TaskFilters;
