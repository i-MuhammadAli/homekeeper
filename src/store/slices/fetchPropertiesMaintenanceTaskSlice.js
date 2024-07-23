import { createSlice } from "@reduxjs/toolkit";
import { fetchPropertiesMaintenanceTasks } from "../thunks/fetchPropertiesMaintenanceTask";
import { postPropertyMaintenanceTask } from "../thunks/postPropertyMaintenanceTask";
import { deletePropertyMaintenanceTask } from "../thunks/deletePropertyMaintenanceTask";
import { editPropertyMaintenanceTask } from "../thunks/editPropertyMaintenanceTask";

const fetchPropertiesMaintenanceTaskSlice = createSlice({
  name: "propertiesMaintenanceTasks",
  initialState: {
    data: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchPropertiesMaintenanceTasks.pending,
      (state, action) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    builder.addCase(
      fetchPropertiesMaintenanceTasks.fulfilled,
      (state, action) => {
        state.isLoading = false;

        state.data = action.payload.data;
      }
    );
    builder.addCase(
      fetchPropertiesMaintenanceTasks.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      }
    );
    builder.addCase(postPropertyMaintenanceTask.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(postPropertyMaintenanceTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const draftId = action.payload.data.draft_property_id;
      if (!draftId) {
        const propertyId = action.payload.data.property_id;
        if (state.data[propertyId]) {
          state.data[propertyId].push(action.payload.data);
        } else {
          state.data[propertyId] = [action.payload.data];
        }
      }
    });
    builder.addCase(postPropertyMaintenanceTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(
      deletePropertyMaintenanceTask.fulfilled,
      (state, action) => {
        state.isLoading = false;
        const draftId = action.payload.data.draft_property_id;
        if (!draftId) {
          const propertyId = action.payload.data.property_id;
          if (state.data[propertyId]) {
            state.data[propertyId] = state.data[propertyId].filter(
              (item) => item["id"] !== action.payload.data.id
            );
          }
        }
      }
    );
    builder.addCase(editPropertyMaintenanceTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const draftId = action.payload.data.draft_property_id;
      if (!draftId) {
        const propertyId = action.payload.data.property_id;
        if (state.data[propertyId]) {
          state.data[propertyId] = state.data[propertyId].filter(
            (item) => item["id"] !== action.payload.data.id
          );
          state.data[propertyId].push(action.payload.data); // checkout if direct update is possible without popping
        }
      }
    });
  },
});

export const propertiesMaintenanceTaskReducer =
  fetchPropertiesMaintenanceTaskSlice.reducer;
