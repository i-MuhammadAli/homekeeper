import { createSlice } from "@reduxjs/toolkit";
import { fetchPropertiesDocs } from "../thunks/fetchPropertiesDocs";

const propertyDocSlice = createSlice({
  name: "propertyDoc",
  initialState: {
    data: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setPropertyDocData(state, action) {
      state.data = action.payload;
    },
    addPropertyDoc(state, action) {
      const propertyId = action.payload.data.property_id;
      if (!state.data[propertyId])
        state.data[propertyId] = [action.payload.data];
      else state.data[propertyId].push(action.payload.data);
    },
    deletePropertyDoc(state, action) {
      const propertyId = action.payload.propertyId;
      const uuid = action.payload.uuid;
      state.data[propertyId] = state.data[propertyId].filter(
        (item) => item.uuid !== uuid
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPropertiesDocs.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPropertiesDocs.fulfilled, (state, action) => {
      state.isLoading = false;
      const objectByPropertyId = {};

      action.payload.data.forEach((item) => {
        const propertyId = item.property_id;
        if (!objectByPropertyId[propertyId]) {
          objectByPropertyId[propertyId] = [];
        }
        objectByPropertyId[propertyId].push(item);
      });

      state.data = objectByPropertyId;
    });
    builder.addCase(fetchPropertiesDocs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setPropertyDocData, addPropertyDoc, deletePropertyDoc } =
  propertyDocSlice.actions;

export const documentReducer = propertyDocSlice.reducer;
