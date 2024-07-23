import { createSlice } from "@reduxjs/toolkit";
import { fetchInspectors } from "../thunks/fetchInspectors";

const inspectorSlice = createSlice({
  name: "inspectors",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchInspectors.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchInspectors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.homeinspectorusers;
    });
    builder.addCase(fetchInspectors.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const inspectorReducer = inspectorSlice.reducer;
