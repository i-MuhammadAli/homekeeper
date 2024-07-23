import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../../utils/api";

const fetchProperties = createAsyncThunk(
  "homeOwnerPropertyList/fetch",
  async (_, { rejectWithValue }) => {
    const api = createApi();
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    try {
      const response = await api.post(
        "/api/homekeeperviewmypropertylists",
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

export { fetchProperties };
