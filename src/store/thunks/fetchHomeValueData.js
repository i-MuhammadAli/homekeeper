import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchHomeValueData = createAsyncThunk(
  "homeValue/fetch",
  async (_, { rejectWithValue }) => {
    const api = createApi();
    let formdata = new FormData();
    formdata.append("addedby", localStorage.getItem("token-info"));
    try {
      const response = await api.post(
        "/api/homekeeper_gethomevalueanddate",
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

export { fetchHomeValueData };
