import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: 1,
    pageSize: 10,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
  },
});

export const { setCurrentPage, setPageSize } = paginationSlice.actions;

export const paginationReducer = paginationSlice.reducer;
