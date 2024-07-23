import { createSlice } from "@reduxjs/toolkit";
import { fetchProperties } from "../../thunks/homeowner/fetchProperties";
import { postPropertyMaintenanceTask } from "../../thunks/postPropertyMaintenanceTask";
import { deletePropertyMaintenanceTask } from "../../thunks/deletePropertyMaintenanceTask";
import { editPropertyMaintenanceTask } from "../../thunks/editPropertyMaintenanceTask";

const propertyMaintenanceSlice = createSlice({
  name: "homeOwnerMaintenanceTasks",
  initialState: {
    data: [],
    candidateMaintenanceTask: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.data = action.payload.maintenanceTasks;
      state.isLoading = false;
    });

    builder.addCase(postPropertyMaintenanceTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload.data);
    });

    builder.addCase(
      deletePropertyMaintenanceTask.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (item) => item["id"] !== action.payload.data.id
        );
      }
    );

    builder.addCase(editPropertyMaintenanceTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(
        (item) => item["id"] !== action.payload.data.id
      );
      state.data.push(action.payload.data); // checkout if direct update is possible without popping
    });
  },
});

export const homeOwnerMaintenanceTaskReducer = propertyMaintenanceSlice.reducer;
