import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TaskModel } from "./tasksSlice";

const selectOriginalTasks = ({ userTasks }: RootState) =>
  userTasks.originalTasks;
const selectFilterCriteria = ({ userTasks }: RootState) =>
  userTasks.filterCriteria;

export const selectFilteredTasks = createSelector(
  [selectOriginalTasks, selectFilterCriteria],
  (tasks: TaskModel[], filterCriteria) => {
    const { title, status, userId } = filterCriteria;

    return tasks.filter((task) => {
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
  }
);
