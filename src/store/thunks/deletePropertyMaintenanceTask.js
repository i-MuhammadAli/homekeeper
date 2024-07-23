import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const deletePropertyMaintenanceTask = createAsyncThunk(
  "propertyMaintenanceTask/delete",
  async (task, { rejectWithValue }) => {
    const api = createApi();
    let formdata = new FormData();
    formdata.append("id", task.id);
    formdata.append("draftPropertyId", task.draft_property_id);

    try {
      const response = await api.post(
        "/api/deletePropertyMaintenanceTask",
        formdata
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { deletePropertyMaintenanceTask };
