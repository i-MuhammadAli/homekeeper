import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchUserProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    const api = createApi();
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    formdata.append("usertype", localStorage.getItem("token-type"));
    try {
      const response = await api.post("/api/homekeeperviewprofile", formdata);

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

export { fetchUserProfile };
