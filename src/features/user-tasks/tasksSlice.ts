import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIltersFormModel } from "../../components/molecules/filter-tasks/TaskFilters";

export interface TaskModel {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TasksState {
  originalTasks: TaskModel[];
  filterCriteria: FIltersFormModel;
}

const initialState: TasksState = {
  originalTasks: [],
  filterCriteria: {
    title: "",
    status: "all",
    userId: null,
  },
};

const tasksSlice = createSlice({
  name: "userTasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskModel[]>) => {
      state.originalTasks = action.payload;
    },
    updateTaskStatus(
      { originalTasks },
      action: PayloadAction<{ taskId: number; status: boolean }>
    ) {
      const { taskId, status } = action.payload;

      const taskToUpdate = originalTasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.completed = status;
      }
    },
    applyFilterCriteria: (state, action: PayloadAction<FIltersFormModel>) => {
      state.filterCriteria = action.payload;
    },
  },
});

export const { setTasks, updateTaskStatus, applyFilterCriteria } =
  tasksSlice.actions;
export default tasksSlice.reducer;
