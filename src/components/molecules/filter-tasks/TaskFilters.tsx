import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { useForm } from "react-hook-form";
import { applyFilterCriteria } from "../../../features/user-tasks/tasksSlice";

import Select from "../../atoms/select/Select";
import Input from "../../atoms/input/Input";
import Form from "../form/Form";

import styles from "./TaskFilters.module.scss";

interface FiltersModel {
  userIds: string[];
}

export interface FIltersFormModel {
  title: string;
  status: string;
  userId: number | null;
}

const initialFormData = {
  title: "",
  status: "",
  userId: null,
};

const taskStatusOptions: string[] = ["completed", "uncompleted", "all"];

const getUserIds = (state: RootState) => {
  const userIds = state.userManagement.map((user) => user.id);
  return { userIds };
};

function TaskFilters({ userIds }: FiltersModel) {
  const dispatch = useDispatch();
  const { register, watch } = useForm<FIltersFormModel>({
    values: initialFormData,
    mode: "onChange",
  });

  const { userId, title, status } = watch();

  useEffect(() => {
    dispatch(applyFilterCriteria({ title, status, userId }));
  }, [title, status, userId, dispatch]);

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
          options={taskStatusOptions}
          className={styles.filter}
          filterDefaultText="Filter by status"
        />
      </Form>
    </section>
  );
}

const TaskFiltersConnected = connect(getUserIds)(TaskFilters);
export default TaskFiltersConnected;
