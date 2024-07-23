import { createSlice } from "@reduxjs/toolkit";

const viewClientSlice = createSlice({
  name: "viewClient",
  initialState: {
    data: {
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
        purchaseValue: "$",
        homeValue: "$",
        rentalAmount: "",
        airbnbAmount: "",
        rentalDate: "",
        airbnbDate: "",
      },
      lenderInfo: {
        loan: true,
        cash: false,
        paymentType: "loan",
        manualOption: true,
        manual: {
          loanAmount: "$",
          years: "",
          apr: "",
          isMortgageInsurance: "yes",
          monthlyMortgage: "$",
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
      agentInfo: {
        id: "",
        name: "",
        email: "",
        phone: "",
        profileImg: "",
        company: "",
      },
      address: "",
      hasSpouse: false,
      id: "",
    },
    candidateMaintenanceTask: [],
    isLoading: false,
    error: null,
    showClientDetails: false,
    showClientDetailsEditPageMobile: "null",
    clientDetailsEditPageMobileData: null,
    showClientPreview: false,
    showMaintenanceTaskPage: false,
    showMaintenanceTaskPageMobile: false,
    showDocumentUploadMobile: false,
  },
  reducers: {
    setViewClientData(state, action) {
      state.data.id = action.payload.id;
      state.data.clientInfo.firstName = action.payload.fname;
      state.data.clientInfo.lastName = action.payload.lname;
      state.data.clientInfo.email = action.payload.email;
      state.data.clientInfo.phone = action.payload.cellphone;
      state.data.clientInfo.dob = action.payload.dob || "";

      state.data.spouseInfo.firstName = action.payload.partnerfname || "";
      state.data.spouseInfo.lastName = action.payload.partnerlname || "";
      state.data.spouseInfo.email = action.payload.partneremail || "";
      state.data.spouseInfo.phone = action.payload.partnercellphone || "";
      state.data.spouseInfo.dob = action.payload.partnerdob || "";

      state.data.address = action.payload.address;

      state.data.propertyInfo.dop = action.payload.whenbuy;
      state.data.propertyInfo.purchaseValue = action.payload.saleprice;
      state.data.propertyInfo.homeValue = action.payload.homevalue;
      state.data.propertyInfo.rentalAmount = action.payload.rental_value || "";
      state.data.propertyInfo.airbnbAmount = action.payload.airbnb_value || "";
      state.data.propertyInfo.rentalDate = action.payload.rental_date || "";
      state.data.propertyInfo.airbnbDate = action.payload.airbnb_date || "";

      state.data.lenderInfo.paymentType = action.payload.paymenttype;
      state.data.lenderInfo.manual.loanAmount = action.payload.loanamount || "";
      state.data.lenderInfo.manual.years = action.payload.loanyear || "";
      state.data.lenderInfo.manual.apr = action.payload.apr_rate || "";
      state.data.lenderInfo.manual.isMortgageInsurance =
        action.payload.pmi || "yes";
      state.data.lenderInfo.manual.monthlyMortgage =
        action.payload.monthly_Mortage_Insurance || "";
      state.data.lenderInfo.manual.mortgageRemovalBasis =
        action.payload.Mortage_Insurance_removed || "";
      state.data.lenderInfo.manual.mortgageYears =
        action.payload.Mortage_Insurance_removed_value_years || "";
      state.data.lenderInfo.manual.mortgageEquity =
        action.payload.Mortage_Insurance_removed_value_equity || "";

      state.data.lenderInfo.lender.id = action.payload.lender_selected_id || "";
      state.data.lenderInfo.askLender = action.payload.lender_status
        ? "yes"
        : "no";

      state.data.titleCompanyInfo.id = action.payload.titlecompanyid || "";
      state.data.titleCompanyInfo.include = action.payload.titlecompanystatus
        ? "yes"
        : "no";

      state.data.homeMaintenanceInfo.homeInspector = action.payload
        .inspector_status
        ? "yes"
        : "no";
      state.data.homeMaintenanceInfo.inspector.id = action.payload.inspectorid;
      state.data.hasSpouse = action.payload.hasSpouse || false;
    },
    setShowClientDetailsEditPageMobile(state, action) {
      state.showClientDetailsEditPageMobile = action.payload;
    },
    setClientDetailsEditPageMobileData(state, action) {
      state.clientDetailsEditPageMobileData = action.payload;
    },
    setShowCientPreview(state, action) {
      state.showClientPreview = action.payload;
    },
    setShowDocumentUploadMobile(state, action) {
      state.showDocumentUploadMobile = action.payload;
    },
    setShowMaintenanceTaskPage(state, action) {
      state.showMaintenanceTaskPage = action.payload;
    },
    setShowMaintenanceTaskPageMobile(state, action) {
      state.showMaintenanceTaskPageMobile = action.payload;
    },
    setCandidateMaintenanceTask(state, action) {
      state.candidateMaintenanceTask = action.payload;
    },
    removeCandidateMaintenanceTask(state, action) {
      state.candidateMaintenanceTask = state.candidateMaintenanceTask.filter(
        (item) => item["id"] !== action.payload.id
      );
    },
    addCandidateMaintenanceTask(state, action) {
      state.candidateMaintenanceTask.push(action.payload);
    },
    setViewClientAgentInfo(state, action) {
      state.data.agentInfo.id = action.payload.agentId;
      state.data.agentInfo.name = action.payload.agentName;
      state.data.agentInfo.profileImg = action.payload.agentProfileImg;
      state.data.agentInfo.company = action.payload.company;
      state.data.agentInfo.email = action.payload.email;
      state.data.agentInfo.phone = action.payload.phone;
    },
  },
});

export const {
  setViewClientData,
  setShowCientPreview,
  setShowMaintenanceTaskPage,
  setCandidateMaintenanceTask,
  removeCandidateMaintenanceTask,
  addCandidateMaintenanceTask,
  setViewClientAgentInfo,
  setShowDocumentUploadMobile,
  setShowMaintenanceTaskPageMobile,
  setShowClientDetailsEditPageMobile,
  setClientDetailsEditPageMobileData,
} = viewClientSlice.actions;

export const viewClientReducer = viewClientSlice.reducer;
