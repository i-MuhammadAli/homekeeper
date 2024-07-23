import { createSlice } from "@reduxjs/toolkit";
import { fetchMaintenanceTasks } from "../thunks/fetchMaintenanceTasks";

const fetchMaintenanceTaskSlice = createSlice({
  name: "maintenanceTasks",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMaintenanceTasks.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMaintenanceTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchMaintenanceTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const maintenanceTaskReducer = fetchMaintenanceTaskSlice.reducer;
