import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const postPropertyMaintenanceTask = createAsyncThunk(
  "propertyMaintenanceTask/post",
  async (formdata, { getState, rejectWithValue }) => {
    const api = createApi();
    const { client, profile, clientForm } = getState();

    if (clientForm.form.id) {
      formdata.append("property_id", clientForm.form.id);
    } else {
      if (client.data.id) formdata.append("property_id", client.data.id);
    }
    if (profile.data.id) formdata.append("updated_by", profile.data.id);

    try {
      const response = await api.post(
        "/api/postPropertyMaintenanceTask",
        formdata
      );

      // DEV ONLY
      //   await pause(10000);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// DEV ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { postPropertyMaintenanceTask };
