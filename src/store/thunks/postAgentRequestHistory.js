import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const postAgentRequestHistory = createAsyncThunk(
  "AgentRequestHistory/post",
  async (formdata, { rejectWithValue }) => {
    const api = createApi();
    // let formdata = new FormData();
    // formdata.append("agentId", localStorage.getItem("token-info"));
    try {
      const response = await api.post("/api/createagentrequest", formdata);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { postAgentRequestHistory };
