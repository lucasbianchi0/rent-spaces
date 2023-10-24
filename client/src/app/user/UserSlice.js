import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: {
    email: null,
    uid: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
