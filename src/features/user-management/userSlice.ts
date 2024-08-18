import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserModel {
  username: string;
  email: string;
  city: string;
  street: string;
  suite: string;
  id: string;
}

const initialUsersState: UserModel[] = [];

export const usersDataSlice = createSlice({
  name: "userManagement",
  initialState: initialUsersState,
  reducers: {
    setUsersData: (_state: UserModel[], action: PayloadAction<UserModel[]>) =>
      action.payload,

    updateUser: (state, action: PayloadAction<UserModel>) => {
      const { payload } = action;

      const index = state.findIndex((user) => user.id === payload.id);
      if (index !== -1) state[index] = { ...state[index], ...payload };
    },
  },
});

export const { setUsersData, updateUser } = usersDataSlice.actions;
export default usersDataSlice.reducer;
