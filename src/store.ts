import { configureStore } from "@reduxjs/toolkit";
import userManagementReducer from "./features/user-management/userSlice";
import userPostsReducer from "./features/user-posts/postsSlice";
import userTasksReducer from "./features/user-tasks/tasksSlice";

const store = configureStore({
  reducer: {
    userManagement: userManagementReducer,
    userPosts: userPostsReducer,
    userTasks: userTasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
