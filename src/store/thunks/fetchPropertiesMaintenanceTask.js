import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchPropertiesMaintenanceTasks = createAsyncThunk(
  "propertiesMaintenanceTask/fetch",
  async (_, { getState, rejectWithValue }) => {
    const { propertyList } = getState();
    const ids = [];
    for (const property of propertyList.data) {
      ids.push(property.id);
    }
    const api = createApi();
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    formdata.append("propertyIdList", ids);
    // formdata.append("addedby", localStorage.getItem("token-info"));
    try {
      const response = await api.post(
        "/api/getPropertiesMaintenanceTasks",
        formdata
      );

      // DEV ONLY
      //   await pause(10000);

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

export { fetchPropertiesMaintenanceTasks };
