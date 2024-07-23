import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const editAgentRequestHistory = createAsyncThunk(
  "AgentRequestHistory/edit",
  async (formdata, { rejectWithValue }) => {
    const api = createApi();
    // let formdata = new FormData();
    // formdata.append("agentId", localStorage.getItem("token-info"));
    try {
      const response = await api.post("/api/editagentrequest", formdata);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { editAgentRequestHistory };
