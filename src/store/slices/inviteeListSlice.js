import { createSlice } from "@reduxjs/toolkit";
import { fetchInvitees } from "../thunks/fetchInvitees";

const inviteeListSlice = createSlice({
  name: "invitees",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addInvitee(state, action) {
      if (!state.data.some((item) => item.id === action.payload.id))
        state.data.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchInvitees.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchInvitees.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchInvitees.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { addInvitee } = inviteeListSlice.actions;

export const inviteeListReducer = inviteeListSlice.reducer;
