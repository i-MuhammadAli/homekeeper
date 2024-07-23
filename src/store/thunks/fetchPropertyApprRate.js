import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchPropertyApprRate = createAsyncThunk(
  "PropertyApprRate/fetch",
  async (_, { rejectWithValue }) => {
    const api = createApi();
    // let formdata = new FormData();
    try {
      const response = await api.get("/api/getpropertyapprrate");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchPropertyApprRate };
