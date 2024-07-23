import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchLenders = createAsyncThunk(
  "lenders/fetch",
  async (_, { getState, rejectWithValue }) => {
    const { profile } = getState();
    const api = createApi();
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    // formdata.append("userid", profile.id);
    try {
      const response = await api.post("/api/homekeepermylenders", formdata);

      // DEV ONLY
      // await pause(3000);

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

export { fetchLenders };
