import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchPropertyList = createAsyncThunk(
  "propertyList/fetch",
  async (_, { rejectWithValue }) => {
    const api = createApi();
    let formdata = new FormData();
    formdata.append("authid", localStorage.getItem("token-info"));
    try {
      const response = await api.post(
        "/api/homekeepergetallpropertylist",
        formdata
      );

      // DEV ONLY
      // await pause(10000);

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

export { fetchPropertyList };
