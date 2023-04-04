import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loginMsg: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { payload } = action;
      state.isLoggedIn = payload.result;
      if (payload.message) state.loginMsg = payload.message;
    },
    logout: (state, action) => {
      const { payload } = action;
      state.isLoggedIn = false;
      if (payload.message) state.loginMsg = payload.message;
    },
  },
  extraReducers: (builder) => {},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
