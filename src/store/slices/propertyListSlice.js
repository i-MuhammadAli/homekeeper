import { createSlice } from "@reduxjs/toolkit";
import { fetchPropertyList } from "../thunks/fetchPropertyList";

const propertyListSlice = createSlice({
  name: "properties",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    showCompleteList: true,
  },
  reducers: {
    setShowCompletePropertyList(state, action) {
      state.showCompleteList = action.payload;
    },
    setUpdateProperty(state, action) {
      const id = action.payload.id;
      const index = state.data.findIndex((obj) => obj.id === id);
      state.data[index] = action.payload;
    },
    addProperty(state, action) {
      state.data.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPropertyList.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPropertyList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.getpropertylist;
    });
    builder.addCase(fetchPropertyList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setShowCompletePropertyList, setUpdateProperty, addProperty } =
  propertyListSlice.actions;

export const propertyListReducer = propertyListSlice.reducer;
