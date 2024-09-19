// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isSignedIn: false, // Change this to true once the user signs in
  },
  reducers: {
    setUser() {
      state, action;
    },
    signIn: (state) => {
      state.isSignedIn = true;
    },
    signOut: (state) => {
      state.isSignedIn = false;
    },
  },
});

export default authSlice;

export const authAction = authSlice.actions;
