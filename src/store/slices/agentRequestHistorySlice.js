import { createSlice } from "@reduxjs/toolkit";
import { fetchAgentRequestHistory } from "../thunks/fetchAgentRequestHistory";
import { postAgentRequestHistory } from "../thunks/postAgentRequestHistory";
import { editAgentRequestHistory } from "../thunks/editAgentRequestHistory";

const agentRequestHistorySlice = createSlice({
  name: "agent_requests",
  initialState: {
    data: [],
    propertyLevel: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAgentRequestHistory.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAgentRequestHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.data = action.payload.data.sort((a, b) => {
      //   return new Date(b.date) - new Date(a.date);
      // });

      state.data = action.payload.data.sort((a, b) => {
        const booleanComparison = a.completed - b.completed;

        if (booleanComparison === 0) {
          return new Date(b.date) - new Date(a.date);
        }

        return booleanComparison;
      });

      const objectByPropertyId = {};

      action.payload.data.forEach((item) => {
        const propertyId = item.property_id;
        if (!objectByPropertyId[propertyId]) {
          objectByPropertyId[propertyId] = [];
        }
        objectByPropertyId[propertyId].push(item);
      });
      state.propertyLevel = objectByPropertyId;
    });
    builder.addCase(fetchAgentRequestHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(postAgentRequestHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!state.data.find((item) => item.id === action.payload.data.id)) {
        state.data.push(action.payload.data);
        if (!state.propertyLevel[action.payload.data.property_id]) {
          state.propertyLevel[action.payload.data.property_id] = [];
        }
        state.propertyLevel[action.payload.data.property_id].push(
          action.payload.data
        );
      }
    });
    builder.addCase(postAgentRequestHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(editAgentRequestHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      let index = state.data.findIndex(
        (item) => item.id === action.payload.data.id
      );
      state.data[index].completed = action.payload.data.completed;

      index = state.propertyLevel[action.payload.data.property_id].findIndex(
        (item) => item.id === action.payload.data.id
      );
      state.propertyLevel[action.payload.data.property_id][index].completed =
        action.payload.data.completed;
    });
  },
});

export const agentRequestReducer = agentRequestHistorySlice.reducer;
