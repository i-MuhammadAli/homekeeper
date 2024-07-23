import { createSlice } from "@reduxjs/toolkit";
import { fetchInvitationPropertyList } from "../thunks/fetchPropertyInvitationList";

const invitationPropertySlice = createSlice({
  name: "invitationProperty",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setEditPropertyInviteStatus(state, action) {
      const id = action.payload.data.id;
      const index = state.data.findIndex((obj) => obj.id === id);
      state.data[index] = action.payload.data;
    },
    setAddPropertyInvite(state, action) {
      state.data.push(action.payload.data);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchInvitationPropertyList.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchInvitationPropertyList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.properties;
    });
    builder.addCase(fetchInvitationPropertyList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setEditPropertyInviteStatus, setAddPropertyInvite } =
  invitationPropertySlice.actions;

export const invitationPropertyReducer = invitationPropertySlice.reducer;
