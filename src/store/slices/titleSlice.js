import { createSlice } from "@reduxjs/toolkit";
import { fetchTitles } from "../thunks/fetchTitles";

const titleSlice = createSlice({
  name: "titles",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTitles.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTitles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.mytitlecompany;
    });
    builder.addCase(fetchTitles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const titleReducer = titleSlice.reducer;
