import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProperties, fetchSingleProperty } from "../thunks/fetchProperties";

const myPropertiesSlice = createSlice({
  name: "myProperties",
  initialState: {
    allProperties: [],
    singleProperty: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    //All Properties
    builder.addCase(fetchAllProperties.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProperties.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProperties = action.payload;
    });
    builder.addCase(fetchAllProperties.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //Single Property
    builder.addCase(fetchSingleProperty.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleProperty.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProperty = action.payload
    });
    builder.addCase(fetchSingleProperty.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default myPropertiesSlice.reducer;