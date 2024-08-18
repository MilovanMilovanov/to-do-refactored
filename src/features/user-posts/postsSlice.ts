import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserPostsState {
  [userId: number]: PostModel[];
}

const initialUserPostsState: UserPostsState = {};

export const postsSlice = createSlice({
  name: "userPosts",
  initialState: initialUserPostsState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostModel[]>) => {
      const posts = action.payload;
      if (posts.length === 0) return;

      const { userId } = posts[0];

      if (userId == null) return;

      state[userId] = posts;
    },

    updatePost: (state, action: PayloadAction<PostModel>) => {
      const { userId, id } = action.payload;

      if (state[userId]) {
        const index = state[userId].findIndex((post) => post.id === id);
        if (index !== -1) {
          state[userId][index] = { ...state[userId][index], ...action.payload };
        }
      }
    },

    addPost: (state, action: PayloadAction<PostModel>) => {
      const { userId, ...postDetails } = action.payload;

      const userPosts = state[userId] || [];

      const newPostId = userPosts.length
        ? Math.max(...userPosts.map((post) => post.id)) + 1
        : 1;

      const newPost = { ...postDetails, id: newPostId, userId };

      state[userId] = [...userPosts, newPost];
    },

    deletePost: (
      state,
      action: PayloadAction<{ userId: number; postId: number }>
    ) => {
      const { userId, postId } = action.payload;

      if (!state[userId]) return;

      state[userId] = state[userId].filter((post) => post.id !== postId);
    },
  },
});

export const { setPosts, updatePost, addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
