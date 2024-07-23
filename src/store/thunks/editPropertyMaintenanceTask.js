import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const editPropertyMaintenanceTask = createAsyncThunk(
  "propertyMaintenanceTask/edit",
  async (formdata, { getState, rejectWithValue }) => {
    const api = createApi();

    const { profile } = getState();
    // add more params
    formdata.append("created_by", profile.data.id);

    try {
      const response = await api.post(
        "/api/editPropertyMaintenanceTask",
        formdata
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { editPropertyMaintenanceTask };
