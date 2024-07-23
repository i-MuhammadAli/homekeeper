import { createSlice } from "@reduxjs/toolkit";
import { fetchLenders } from "../thunks/fetchLenders";

const lenderSlice = createSlice({
  name: "lenders",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLenders.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLenders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.mylenders;
    });
    builder.addCase(fetchLenders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const lenderReducer = lenderSlice.reducer;
