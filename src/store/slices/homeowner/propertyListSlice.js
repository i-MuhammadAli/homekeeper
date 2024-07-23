import { createSlice } from "@reduxjs/toolkit";
import { fetchProperties } from "../../thunks/homeowner/fetchProperties";
// import { postPropertyMaintenanceTask } from "../../thunks/postPropertyMaintenanceTask";
// import { deletePropertyMaintenanceTask } from "../../thunks/deletePropertyMaintenanceTask";
// import { editPropertyMaintenanceTask } from "../../thunks/editPropertyMaintenanceTask";

const propertyListSlice = createSlice({
  name: "homeOwnerProperties",
  initialState: {
    data: {},
    homeValue: [],
    agent: {},
    documents: [],
    lender: {},
    inspector: {},
    title: {},
    // maintenanceTasks: [],
    candidateMaintenanceTask: [],
    isLoading: false,
    error: null,
    showAllProperties: true,
  },
  reducers: {
    setShowAllProperties(state, action) {
      state.showAllProperties = action.payload;
    },
    addHomeOwnerDoc(state, action) {
      state.documents.push(action.payload.data);
    },
    deleteHomeOwnerDoc(state, action) {
      const id = action.payload.id;
      state.documents = state.documents.filter((item) => item.id !== id);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProperties.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      // console.log(action.payload.property);
      state.data = action.payload.property;
      state.agent = action.payload.agentData;
      state.lender = action.payload.lenderData;
      state.inspector = action.payload.inspectorData;
      state.title = action.payload.titleData;
      // state.maintenanceTasks = action.payload.maintenanceTasks;
      state.documents = action.payload.documentData;
      // const homeValueData = action.payload.homeValueData;

      state.homeValue = [...action.payload.homeValueData].sort((a, b) => {
        return new Date(a.date_from) - new Date(b.date_from);
      });
      // for (const key in homeValueData) {
      //   if (Object.hasOwnProperty.call(homeValueData, key)) {
      //     const value = homeValueData[key];

      //     const sortedValue = [...value].sort((a, b) => {
      //       return new Date(a.date_from) - new Date(b.date_from);
      //     });
      //     // console.log(sortedValue);
      //     homeValueData[key] = sortedValue;
      //   }
      // }
      // state.homeValue = homeValueData;
      state.isLoading = false;
    });
    builder.addCase(fetchProperties.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // builder.addCase(postPropertyMaintenanceTask.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.maintenanceTasks.push(action.payload.data);
    // });

    // builder.addCase(
    //   deletePropertyMaintenanceTask.fulfilled,
    //   (state, action) => {
    //     state.isLoading = false;
    //     state.maintenanceTasks = state.maintenanceTasks.filter(
    //       (item) => item["id"] !== action.payload.data.id
    //     );
    //   }
    // );

    // builder.addCase(editPropertyMaintenanceTask.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.maintenanceTasks = state.maintenanceTasks.filter(
    //     (item) => item["id"] !== action.payload.data.id
    //   );
    //   state.maintenanceTasks.push(action.payload.data); // checkout if direct update is possible without popping
    // });
  },
});

export const { setShowAllProperties, addHomeOwnerDoc, deleteHomeOwnerDoc } =
  propertyListSlice.actions;

export const homeOwnerPropertyListReducer = propertyListSlice.reducer;
