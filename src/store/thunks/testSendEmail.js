import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const testSendEmail = createAsyncThunk(
  "testSendEmail/post",
  async (formdata, { getState, rejectWithValue }) => {
    const api = createApi();
    try {
      const response = await api.post("/api/testEmail", formdata);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { testSendEmail };
