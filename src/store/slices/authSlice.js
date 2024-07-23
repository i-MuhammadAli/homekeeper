import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    tokenInfo: null,
    tokenType: null,
    isLoading: true,
  },
  reducers: {
    setAuthUser(state, action) {
      state.tokenInfo = localStorage.getItem("token-info");
      state.tokenType = localStorage.getItem("token-type");
      state.user = localStorage.getItem("user_name");
      state.isLoading = false;
    },
    setHomeOwnerUser(state, action) {
      state.tokenInfo = localStorage.getItem("token-info");
      state.user = localStorage.getItem("user_name");
      state.tokenType = "homeowner";
      state.isLoading = false;
    },
    removeAuthUser(state) {
      state.tokenInfo = null;
      state.tokenType = null;
      state.user = null;
    },
  },
});

export const { setAuthUser, removeAuthUser, setHomeOwnerUser } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
