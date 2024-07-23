import { createSlice } from "@reduxjs/toolkit";
import { fetchHomeValueData } from "../thunks/fetchHomeValueData";

const homeValueSlice = createSlice({
  name: "homeValue",
  initialState: {
    data: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setAddHomeValue(state, action) {
      const propertyId = action.payload.data.propertyid;
      if (!state.data[propertyId])
        state.data[propertyId] = [action.payload.data];
      else state.data[propertyId].push(action.payload.data);
    },
    setEditHomeValue(state, action) {
      const propertyId = action.payload.data.propertyid;
      const id = action.payload.data.id;
      const index = state.data[propertyId].findIndex((obj) => obj.id === id);
      state.data[propertyId][index] = action.payload.data;
    },
    setDeleteHomeValue(state, action) {
      const propertyId = action.payload.propertyId;
      const id = action.payload.id;
      state.data[propertyId] = state.data[propertyId].filter(
        (item) => item.id !== id
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchHomeValueData.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchHomeValueData.fulfilled, (state, action) => {
      state.isLoading = false;
      const objectByPropertyId = {};

      action.payload.data.forEach((item) => {
        const propertyId = item.propertyid;
        if (!objectByPropertyId[propertyId]) {
          objectByPropertyId[propertyId] = [];
        }
        objectByPropertyId[propertyId].push(item);
      });

      state.data = objectByPropertyId;
    });
    builder.addCase(fetchHomeValueData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setAddHomeValue, setEditHomeValue, setDeleteHomeValue } =
  homeValueSlice.actions;

export const homeValueReducer = homeValueSlice.reducer;
