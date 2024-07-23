import { createSlice } from "@reduxjs/toolkit";
import { bool } from "yup";
import { postPropertyMaintenanceTask } from "../thunks/postPropertyMaintenanceTask";
import { deletePropertyMaintenanceTask } from "../thunks/deletePropertyMaintenanceTask";
import { editPropertyMaintenanceTask } from "../thunks/editPropertyMaintenanceTask";

const initialState = {
  form: {
    clientInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
    },
    spouseInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
    },
    propertyInfo: {
      dop: "",
      purchaseValue: "",
      homeValue: "",
    },
    lenderInfo: {
      loan: true,
      cash: false,
      paymentType: "loan",
      manualOption: true,
      manual: {
        loanAmount: "",
        years: "",
        apr: "",
        isMortgageInsurance: "yes",
        monthlyMortgage: "",
        mortgageRemovalBasis: "never",
        mortgageEquity: "",
        mortgageYears: "",
      },
      askLender: false,
      lender: {
        id: "",
        lendorData: {
          name: "",
          email: "",
          phone: "",
          companyName: "",
        },
      },
    },
    titleCompanyInfo: {
      include: "yes",
      id: "",
      titleData: {
        name: "",
        email: "",
        phone: "",
        companyName: "",
      },
    },
    homeMaintenanceInfo: {
      homeInspector: true,
      manual: false,
      auto: false,
      autoOption: "inspectionreport",
      inspector: {
        id: "",
        inspectorData: {
          name: "",
          email: "",
          phone: "",
          companyName: "",
        },
      },
    },
    address: "",
    hasSpouse: false,
    id: "",
    candidateMaintenanceTask: [],
    propertiesMainTasks: [],
  },
  showClientInfoForm: true,
  showClientAddressForm: false,
  showClientPropertyForm: false,
  showClientLenderForm: false,
  showClientTitleForm: false,
  showClientHomeMaintenanceForm: false,
  showClientDocumentPage: false,
  showClientDetails: false,
};

const addClientFormSlice = createSlice({
  name: "addClientForm",
  initialState,
  reducers: {
    // resetState(state, actions) {
    //   state.re;
    // },
    resetState: () => initialState,

    setClientData(state, action) {
      state.form.id = action.payload.id;
      state.form.clientInfo.firstName = action.payload.fname;
      state.form.clientInfo.lastName = action.payload.lname;
      state.form.clientInfo.email = action.payload.email;
      state.form.clientInfo.phone = action.payload.cellphone;
      state.form.clientInfo.dob = action.payload.dob || "";

      state.form.spouseInfo.firstName = action.payload.partnerfname || "";
      state.form.spouseInfo.lastName = action.payload.partnerlname || "";
      state.form.spouseInfo.email = action.payload.partneremail || "";
      state.form.spouseInfo.phone = action.payload.partnercellphone || "";
      state.form.spouseInfo.dob = action.payload.partnerdob || "";

      state.form.address = action.payload.address;

      state.form.propertyInfo.dop = action.payload.whenbuy;
      state.form.propertyInfo.purchaseValue = action.payload.saleprice;
      state.form.propertyInfo.homeValue = action.payload.homevalue;

      state.form.lenderInfo.paymentType = action.payload.paymenttype;
      state.form.lenderInfo.manual.loanAmount = action.payload.loanamount || "";
      state.form.lenderInfo.manual.years = action.payload.loanyear || "";
      state.form.lenderInfo.manual.apr = action.payload.loanpercentage || "";
      state.form.lenderInfo.manual.monthlyMortgage =
        action.payload.monthly_Mortage_Insurance || "";
      state.form.lenderInfo.manual.mortgageRemovalBasis =
        action.payload.Mortage_Insurance_removed || "";
      state.form.lenderInfo.manual.mortgageYears =
        action.payload.Mortage_Insurance_removed_value_years || "";
      state.form.lenderInfo.manual.mortgageEquity =
        action.payload.Mortage_Insurance_removed_value_equity || "";
    },
    setShowClientDetails(state, action) {
      state.showClientDetails = action.payload;
    },

    setClientPropertyId(state, action) {
      state.form.id = action.payload;
    },
    setClientFirstName(state, action) {
      state.form.clientInfo.firstName = action.payload;
    },
    setClientLastName(state, action) {
      state.form.clientInfo.lastName = action.payload;
    },
    setClientEmail(state, action) {
      state.form.clientInfo.email = action.payload;
    },
    setClientPhone(state, action) {
      state.form.clientInfo.phone = action.payload;
    },
    setClientDob(state, action) {
      state.form.clientInfo.dob = action.payload;
    },
    setSpouseFirstName(state, action) {
      state.form.spouseInfo.firstName = action.payload;
    },
    setSpouseLastName(state, action) {
      state.form.spouseInfo.lastName = action.payload;
    },
    setSpouseEmail(state, action) {
      state.form.spouseInfo.email = action.payload;
    },
    setSpousePhone(state, action) {
      state.form.spouseInfo.phone = action.payload;
    },
    setSpouseDob(state, action) {
      state.form.spouseInfo.dob = action.payload;
    },
    setClientAddress(state, action) {
      state.form.address = action.payload;
    },
    setHasSpouse(state, action) {
      state.form.hasSpouse = action.payload;
    },
    setClientPropertyDateOfPurchase(state, action) {
      state.form.propertyInfo.dop = action.payload;
    },
    setClientPropertyPurchaseValue(state, action) {
      state.form.propertyInfo.purchaseValue = action.payload;
    },
    setClientPropertyHomeValue(state, action) {
      state.form.propertyInfo.homeValue = action.payload;
    },
    setClientLenderType(state, action) {
      state.form.lenderInfo.paymentType = action.payload;
    },
    // setClientLenderCashOption(state, action) {
    //   state.form.lenderInfo.cash = action.payload;
    // },
    setClientLenderManualOption(state, action) {
      state.form.lenderInfo.manualOption = action.payload;
    },
    setClientLenderManualLoanAmount(state, action) {
      state.form.lenderInfo.manual.loanAmount = action.payload;
    },
    setClientLenderManualYears(state, action) {
      state.form.lenderInfo.manual.years = action.payload;
    },
    setClientLenderManualApr(state, action) {
      state.form.lenderInfo.manual.apr = action.payload;
    },
    setClientLenderManualIsMortgageInsurance(state, action) {
      state.form.lenderInfo.manual.isMortgageInsurance = action.payload;
    },
    setClientLenderManualMonthlyMortgage(state, action) {
      state.form.lenderInfo.manual.monthlyMortgage = action.payload;
    },
    setClientLenderManualMortgageRemovalBasis(state, action) {
      state.form.lenderInfo.manual.mortgageRemovalBasis = action.payload;
    },
    // setClientLenderManualMortgageEquity(state, action) {
    //   state.form.lenderInfo.manual.mortgageEquitySelected = action.payload;
    // },
    setClientLenderManualMortgageEquityValue(state, action) {
      state.form.lenderInfo.manual.mortgageEquity = action.payload;
    },
    // setClientLenderManualMortgageYears(state, action) {
    //   state.form.lenderInfo.manual.mortgageYearsSelected = action.payload;
    // },
    setClientLenderManualMortgageYearsValue(state, action) {
      state.form.lenderInfo.manual.mortgageYears = action.payload;
    },

    setClientLenderAskLender(state, action) {
      state.form.lenderInfo.askLender = action.payload;
    },
    setClientLenderId(state, action) {
      state.form.lenderInfo.lender.id = action.payload;
    },
    setClientAddLenderName(state, action) {
      state.form.lenderInfo.lender.lendorData.name = action.payload;
    },
    setClientAddLenderPhone(state, action) {
      state.form.lenderInfo.lender.lendorData.phone = action.payload;
    },
    setClientAddLenderEmail(state, action) {
      state.form.lenderInfo.lender.lendorData.email = action.payload;
    },
    setClientAddLenderCompanyName(state, action) {
      state.form.lenderInfo.lender.lendorData.companyName = action.payload;
    },

    setClientHomeMaintenanceManualOption(state, action) {
      state.form.homeMaintenanceInfo.manual = action.payload;
    },
    setClientHomeMaintenanceInspectorOption(state, action) {
      state.form.homeMaintenanceInfo.homeInspector = action.payload;
    },
    setClientHomeMaintenanceAutoOption(state, action) {
      state.form.homeMaintenanceInfo.auto = action.payload;
    },
    setClientHomeMaintenanceAutoValue(state, action) {
      state.form.homeMaintenanceInfo.autoOption = action.payload;
    },
    setClientHomeInspectorId(state, action) {
      state.form.homeMaintenanceInfo.inspector.id = action.payload;
    },
    setClientAddHomeInspectorName(state, action) {
      state.form.homeMaintenanceInfo.inspector.inspectorData.name =
        action.payload;
    },
    setClientAddHomeInspectorPhone(state, action) {
      state.form.homeMaintenanceInfo.inspector.inspectorData.phone =
        action.payload;
    },
    setClientAddHomeInspectorEmail(state, action) {
      state.form.homeMaintenanceInfo.inspector.inspectorData.email =
        action.payload;
    },
    setClientAddHomeInspectorCompanyName(state, action) {
      state.form.homeMaintenanceInfo.inspector.inspectorData.companyName =
        action.payload;
    },

    setClientTitleInclude(state, action) {
      state.form.titleCompanyInfo.include = action.payload;
    },
    setClientTitleId(state, action) {
      state.form.titleCompanyInfo.id = action.payload;
    },
    setClientAddTitleName(state, action) {
      state.form.titleCompanyInfo.titleData.name = action.payload;
    },
    setClientAddTitlePhone(state, action) {
      state.form.titleCompanyInfo.titleData.phone = action.payload;
    },
    setClientAddTitleEmail(state, action) {
      state.form.titleCompanyInfo.titleData.email = action.payload;
    },
    setClientAddTitleCompanyName(state, action) {
      state.form.titleCompanyInfo.titleData.companyName = action.payload;
    },

    setShowClientInfoForm(state, action) {
      state.showClientInfoForm = action.payload;
    },
    setShowClientAddressForm(state, action) {
      state.showClientAddressForm = action.payload;
    },
    setShowClientPropertyForm(state, action) {
      state.showClientPropertyForm = action.payload;
    },
    setShowClientLenderForm(state, action) {
      state.showClientLenderForm = action.payload;
    },
    setShowClientTitleForm(state, action) {
      state.showClientTitleForm = action.payload;
    },
    setShowClientHomeMaintenanceForm(state, action) {
      state.showClientHomeMaintenanceForm = action.payload;
    },
    setShowClientDocumentPage(state, action) {
      state.showClientDocumentPage = action.payload;
    },
    setTempCandidateMaintenanceTask(state, action) {
      state.form.candidateMaintenanceTask = action.payload;
    },
    removeTempCandidateMaintenanceTask(state, action) {
      state.form.candidateMaintenanceTask =
        state.form.candidateMaintenanceTask.filter(
          (item) => item["id"] !== action.payload.id
        );
    },
    addTempCandidateMaintenanceTask(state, action) {
      state.form.candidateMaintenanceTask.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(postPropertyMaintenanceTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const draftId = action.payload.data.draft_property_id;
      if (draftId) {
        if (state.form.propertiesMainTasks[draftId]) {
          console.log("true", draftId, state.form.propertiesMainTasks);
          state.form.propertiesMainTasks[draftId].push(action.payload.data);
        } else {
          console.log("false", draftId);
          state.form.propertiesMainTasks[draftId] = [action.payload.data];
        }
      }
    });
    builder.addCase(
      deletePropertyMaintenanceTask.fulfilled,
      (state, action) => {
        state.isLoading = false;
        const draftId = action.payload.data.draft_property_id;
        if (draftId) {
          if (state.form.propertiesMainTasks[draftId]) {
            state.form.propertiesMainTasks[draftId] =
              state.form.propertiesMainTasks[draftId].filter(
                (item) => item["id"] !== action.payload.data.id
              );
          }
        }
      }
    );
    builder.addCase(editPropertyMaintenanceTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const draftId = action.payload.data.draft_property_id;
      if (draftId) {
        state.form.propertiesMainTasks[draftId] =
          state.form.propertiesMainTasks[draftId].filter(
            (item) => item["id"] !== action.payload.data.id
          );
        state.form.propertiesMainTasks[draftId].push(action.payload.data); // checkout if direct update is possible without popping
      }
    });
  },
});

export const {
  setClientData,
  setShowClientDetails,
  setClientPropertyId,
  setClientFirstName,
  setClientLastName,
  setClientEmail,
  setClientPhone,
  setClientDob,
  setClientAddress,
  setSpousePhone,
  setSpouseFirstName,
  setSpouseLastName,
  setSpouseEmail,
  setSpouseDob,
  setHasSpouse,
  setClientPropertyDateOfPurchase,
  setClientPropertyPurchaseValue,
  setClientPropertyHomeValue,
  setClientLenderType,
  //   setClientLenderCashOption,
  setClientLenderManualOption,
  setClientLenderAskLender,
  setClientLenderId,
  setClientAddLenderName,
  setClientAddLenderPhone,
  setClientAddLenderEmail,
  setClientAddLenderCompanyName,
  setClientLenderManualLoanAmount,
  setClientLenderManualYears,
  setClientLenderManualApr,
  setClientLenderManualIsMortgageInsurance,
  setClientLenderManualMonthlyMortgage,
  //   setClientLenderManualMortgageNeverRemoved,
  setClientLenderManualMortgageRemovalBasis,
  //   setClientLenderManualMortgageEquity,
  //   setClientLenderManualMortgageYears,
  setClientLenderManualMortgageYearsValue,
  setClientLenderManualMortgageEquityValue,
  setClientTitleInclude,
  setClientTitleId,
  setClientAddTitleName,
  setClientAddTitlePhone,
  setClientAddTitleEmail,
  setClientAddTitleCompanyName,
  setClientHomeMaintenanceAutoValue,
  setClientHomeInspectorId,
  setClientAddHomeInspectorName,
  setClientAddHomeInspectorPhone,
  setClientAddHomeInspectorEmail,
  setClientAddHomeInspectorCompanyName,
  setClientHomeMaintenanceManualOption,
  setClientHomeMaintenanceInspectorOption,
  setClientHomeMaintenanceAutoOption,
  setShowClientInfoForm,
  setShowClientAddressForm,
  setShowClientPropertyForm,
  setShowClientLenderForm,
  setShowClientTitleForm,
  setShowClientHomeMaintenanceForm,
  setShowClientDocumentPage,
  setTempCandidateMaintenanceTask,
  removeTempCandidateMaintenanceTask,
  addTempCandidateMaintenanceTask,
  setTempPropertyMaintenanceTask,
  resetState,
} = addClientFormSlice.actions;

export const addClientFormReducer = addClientFormSlice.reducer;
