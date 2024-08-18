import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskModel {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const initialTasksState: TaskModel[] = [];

const tasksSlice = createSlice({
  name: "userTasks",
  initialState: initialTasksState,
  reducers: {
    setTasks: (_state, action: PayloadAction<TaskModel[]>) => action.payload,
    updateTaskStatus(
      state,
      action: PayloadAction<{ taskId: number; status: boolean }>
    ) {
      const { taskId, status } = action.payload;

      const taskToUpdate = state.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.completed = status;
      }
    },
  },
});

export const { setTasks, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
