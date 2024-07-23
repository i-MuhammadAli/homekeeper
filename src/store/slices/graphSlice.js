import { createSlice } from "@reduxjs/toolkit";

const graphSlice = createSlice({
  name: "graph",
  initialState: {
    data: {
      labels: [],
      homeValue: [],
      loanValue: [],
      equityValue: [],
      agentHomeValue: [],
      startDate: "",
      endDate: "",
      fullData: {
        monthlyPayment: null,
        homeValues: [],
        agentHomeValues: [],
        loanValues: [],
        equities: [],
        monthsElapsed: null,
        remainingLoanMonths: null,
        monthlyInterestRate: null,
        cashOutRefinance: null,
      },
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setGraphLabels(state, action) {
      state.data.labels = action.payload;
    },
    setGraphHomeValue(state, action) {
      state.data.homeValue = action.payload;
    },
    setGraphAgentHomeValue(state, action) {
      state.data.agentHomeValue = action.payload;
    },
    setGraphLoanValue(state, action) {
      state.data.loanValue = action.payload;
    },
    setGraphEquityValue(state, action) {
      state.data.equityValue = action.payload;
    },
    setGraphStartDate(state, action) {
      state.data.startDate = action.payload;
    },
    setGraphEndDate(state, action) {
      state.data.endDate = action.payload;
    },

    resetGraphData(state) {
      state.data.fullData.monthlyInterestRate = null;
      state.data.fullData.monthlyPayment = null;
      state.data.fullData.remainingLoanMonths = null;
      state.data.fullData.cashOutRefinance = null;
    },

    setGraphFullData(state, action) {
      state.data.fullData.monthlyInterestRate = null;
      state.data.fullData.monthlyPayment = null;
      state.data.fullData.remainingLoanMonths = null;
      state.data.fullData.cashOutRefinance = null;

      const currentDate = new Date();
      const purchaseDateObj = new Date(action.payload.purchaseDate);
      const monthsElapsed =
        (currentDate.getFullYear() - purchaseDateObj.getFullYear()) * 12 +
        (currentDate.getMonth() - purchaseDateObj.getMonth());

      state.data.fullData.monthsElapsed = monthsElapsed;

      const homeValuesArray = [];
      const loanValuesArray = [];
      const equitiesArray = [];
      const AgentHomeValuesArray = [];

      let monthlyInterestRate = null;
      let numberOfPayments = null;
      let monthlyPaymentValue = null;

      // Calculate monthly payment
      if (action.payload.loanAmount) {
        monthlyInterestRate = action.payload.interestRate / 100 / 12;
        state.data.fullData.monthlyInterestRate = monthlyInterestRate;

        numberOfPayments = action.payload.loanTerm * 12;

        state.data.fullData.remainingLoanMonths =
          numberOfPayments - monthsElapsed;

        const denominator =
          Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

        monthlyPaymentValue =
          (action.payload.loanAmount *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          denominator;

        state.data.fullData.monthlyPayment = monthlyPaymentValue;
      }

      let currentHomeValue = action.payload.homeValue * 1;
      let remainingLoanBalance = action.payload.loanAmount;

      // Calculate home value appreciation and remaining loan balance for each month
      // const monthlyAppreciationRate = 0.03 / 12; // Assuming 3% annual appreciation rate
      const agentUpdatedHomeValues = action.payload.agentUpdatedHomeValues;

      homeValuesArray.push({
        date: agentUpdatedHomeValues[0].date_from,
        value: (agentUpdatedHomeValues[0].homevalue * 1).toFixed(2),
        agent: true,
      });

      AgentHomeValuesArray.push({
        date: agentUpdatedHomeValues[0].date_from,
        value: (agentUpdatedHomeValues[0].homevalue * 1).toFixed(2),
      });

      if (action.payload.loanAmount)
        equitiesArray.push({
          date: agentUpdatedHomeValues[0].date_from,
          value: (
            agentUpdatedHomeValues[0].homevalue * 1 -
            remainingLoanBalance * 1
          ).toFixed(2),
        });

      if (action.payload.loanAmount)
        loanValuesArray.push({
          date: agentUpdatedHomeValues[0].date_from,
          value: (remainingLoanBalance * 1).toFixed(2),
        });

      let nextAgentUpdateIndex = 1;
      let i = 1,
        rate,
        key,
        monthlyAppreciationRate;

      while (i <= monthsElapsed) {
        if (nextAgentUpdateIndex < agentUpdatedHomeValues.length) {
          const nextDate = new Date(
            agentUpdatedHomeValues[nextAgentUpdateIndex].date_from
          );
          const curDate = new Date(
            agentUpdatedHomeValues[nextAgentUpdateIndex - 1].date_from
          );

          // console.log(nextDate, curDate);

          let diffMonths =
            (nextDate.getFullYear() - curDate.getFullYear()) * 12;
          diffMonths += nextDate.getMonth() - curDate.getMonth();

          const diffValue =
            (agentUpdatedHomeValues[nextAgentUpdateIndex].homevalue -
              agentUpdatedHomeValues[nextAgentUpdateIndex - 1].homevalue) /
            diffMonths;
          // console.log(diffMonths, diffValue);
          let j = 0;
          let currentMonth;

          while (j < diffMonths - 1) {
            currentMonth = new Date(
              purchaseDateObj.getFullYear(),
              purchaseDateObj.getMonth() + i + j
            );

            // console.log(currentHomeValue);
            currentHomeValue += diffValue;

            // console.log(currentHomeValue);
            homeValuesArray.push({
              date: currentMonth.toLocaleDateString(),
              value: currentHomeValue.toFixed(2),
              agent: false,
            });
            AgentHomeValuesArray.push({
              date: currentMonth.toLocaleDateString(),
              value: null,
            });

            j++;
          }

          currentMonth = new Date(
            purchaseDateObj.getFullYear(),
            purchaseDateObj.getMonth() + i + j
          );

          currentHomeValue =
            agentUpdatedHomeValues[nextAgentUpdateIndex].homevalue * 1;

          homeValuesArray.push({
            date: currentMonth.toLocaleDateString(),
            value: currentHomeValue.toFixed(2),
            agent: true,
          });

          AgentHomeValuesArray.push({
            date: currentMonth.toLocaleDateString(),
            value: currentHomeValue.toFixed(2),
          });

          nextAgentUpdateIndex++;
          i += j;
          // console.log(i);
        } else {
          const currentMonth = new Date(
            purchaseDateObj.getFullYear(),
            purchaseDateObj.getMonth() + i
          );

          key = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`;
          rate = action.payload.propertyApprRate[key];
          monthlyAppreciationRate = rate / (12 * 100);
          // console.log(key, rate, monthlyAppreciationRate);

          currentHomeValue *= 1 + monthlyAppreciationRate;
          homeValuesArray.push({
            date: currentMonth.toLocaleDateString(),
            value: currentHomeValue.toFixed(2),
            agent: false,
          });
          AgentHomeValuesArray.push({
            date: currentMonth.toLocaleDateString(),
            value: null,
          });
        }
        i++;
      }

      let currentEquity;

      if (action.payload.loanAmount) {
        for (let i = 1; i <= monthsElapsed; i++) {
          const currentMonth = new Date(
            purchaseDateObj.getFullYear(),
            purchaseDateObj.getMonth() + i
          );

          currentEquity = homeValuesArray[i].value - remainingLoanBalance;

          // Calculate remaining loan balance
          const monthlyInterest = remainingLoanBalance * monthlyInterestRate;
          const principalPayment = monthlyPaymentValue - monthlyInterest;
          remainingLoanBalance -= principalPayment;

          equitiesArray.push({
            date: currentMonth.toLocaleDateString(),
            value: currentEquity.toFixed(2),
          });

          loanValuesArray.push({
            date: currentMonth.toLocaleDateString(),
            value: remainingLoanBalance.toFixed(2),
          });
        }
      }

      state.data.fullData.homeValues = homeValuesArray;
      state.data.fullData.loanValues = loanValuesArray;
      state.data.fullData.equities = equitiesArray;
      state.data.fullData.agentHomeValues = AgentHomeValuesArray;

      if (action.payload.loanAmount)
        state.data.fullData.cashOutRefinance = Math.ceil(
          (80 * parseInt(homeValuesArray[homeValuesArray.length - 1].value)) /
            100 -
            parseInt(loanValuesArray[loanValuesArray.length - 1].value)
        );
    },
  },
});

export const {
  setGraphLabels,
  setGraphHomeValue,
  setGraphLoanValue,
  setGraphEquityValue,
  setGraphFullData,
  setGraphAgentHomeValue,
  setGraphStartDate,
  setGraphEndDate,
} = graphSlice.actions;

export const graphReducer = graphSlice.reducer;
