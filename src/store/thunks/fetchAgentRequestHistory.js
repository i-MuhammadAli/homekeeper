import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchAgentRequestHistory = createAsyncThunk(
  "AgentRequestHistory/fetch",
  async (_, { rejectWithValue }) => {
    const api = createApi();
    let formdata = new FormData();
    formdata.append("agentId", localStorage.getItem("token-info"));
    try {
      const response = await api.post("/api/getagentrequesthistory", formdata);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchAgentRequestHistory };
