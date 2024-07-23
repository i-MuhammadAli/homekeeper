import { createSlice } from "@reduxjs/toolkit";
import { fetchPropertyApprRate } from "../thunks/fetchPropertyApprRate";

const genericDataSlice = createSlice({
  name: "generic_data",
  initialState: {
    data: {
      propertyApprRate: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPropertyApprRate.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPropertyApprRate.fulfilled, (state, action) => {
      state.isLoading = false;
      //   state.data.propertyApprRate = action.payload.data;
      const ratesByMonth = {};

      action.payload.data.forEach((item) => {
        const fromDateParts = item.date_from.split("/");
        const toDateParts = item.date_to.split("/");
        const fromDate = new Date(
          fromDateParts[2],
          parseInt(fromDateParts[0]) - 1,
          fromDateParts[1]
        );
        const toDate = new Date(
          toDateParts[2],
          parseInt(toDateParts[0]) - 1,
          toDateParts[1]
        );

        const startYear = fromDate.getFullYear();
        const startMonth = fromDate.getMonth();
        const endYear = toDate.getFullYear();
        const endMonth = toDate.getMonth();

        for (let year = startYear; year <= endYear; year++) {
          const start = year === startYear ? startMonth : 0;
          const end = year === endYear ? endMonth : 11;

          for (let month = start; month <= end; month++) {
            const key = `${year}-${month + 1}`;
            ratesByMonth[key] = parseFloat(item.rate);
          }
        }
      });
      state.data.propertyApprRate = ratesByMonth;
    });
    builder.addCase(fetchPropertyApprRate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const genericReducer = genericDataSlice.reducer;
