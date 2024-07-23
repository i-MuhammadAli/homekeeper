import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchInvitationPropertyList = createAsyncThunk(
  "propertyInvitation/fetch",
  async (_, { rejectWithValue }) => {
    const api = createApi();
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    try {
      const response = await api.post("/api/get_invitation_list", formdata);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchInvitationPropertyList };
