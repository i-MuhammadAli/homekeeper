import { createAsyncThunk } from "@reduxjs/toolkit";
import createApi from "../../utils/api";

const fetchInvitees = createAsyncThunk(
  "invitees/fetch",
  async (_, { getState, rejectWithValue }) => {
    const { profile } = getState();
    const api = createApi();
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    try {
      const response = await api.post(
        "/api/homekeepergetinvitationusers",
        formdata
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchInvitees };
