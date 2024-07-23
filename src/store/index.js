import { configureStore } from "@reduxjs/toolkit";
import {
  setProfileUserName,
  userProfileReducer,
} from "./slices/userProfileSlice";
import { lenderReducer } from "./slices/lenderSlice";
import { inspectorReducer } from "./slices/inspectorSlice";
import { titleReducer } from "./slices/titleSlice";
import {
  setClientPropertyId,
  addClientFormReducer,
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
  //   setClientLenderLoanOption,
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
  setClientHomeInspectorId,
  setClientAddHomeInspectorName,
  setClientAddHomeInspectorPhone,
  setClientAddHomeInspectorEmail,
  setClientAddHomeInspectorCompanyName,
  setClientHomeMaintenanceManualOption,
  setClientHomeMaintenanceInspectorOption,
  setClientHomeMaintenanceAutoOption,
  setClientHomeMaintenanceAutoValue,
  setShowClientInfoForm,
  setShowClientAddressForm,
  setShowClientPropertyForm,
  setShowClientLenderForm,
  setShowClientTitleForm,
  setShowClientHomeMaintenanceForm,
  setShowClientDocumentPage,
  setClientData,
  setShowClientDetails,
  setTempCandidateMaintenanceTask,
  addTempCandidateMaintenanceTask,
  removeTempCandidateMaintenanceTask,
  setTempPropertyMaintenanceTask,
} from "./slices/addClientFormSlice";

import {
  setViewClientData,
  setShowCientPreview,
  // setShowClientDetails,
  setShowMaintenanceTaskPage,
  viewClientReducer,
  setCandidateMaintenanceTask,
  removeCandidateMaintenanceTask,
  addCandidateMaintenanceTask,
  setViewClientAgentInfo,
  setShowDocumentUploadMobile,
  setShowMaintenanceTaskPageMobile,
  setShowClientDetailsEditPageMobile,
  setClientDetailsEditPageMobileData,
} from "./slices/viewClientSlice";
import {
  setShowCompletePropertyList,
  setUpdateProperty,
  addProperty,
  propertyListReducer,
} from "./slices/propertyListSlice";

import {
  setAddHomeValue,
  setEditHomeValue,
  setDeleteHomeValue,
  homeValueReducer,
} from "./slices/homeValueSlice";

import {
  setGraphLabels,
  setGraphHomeValue,
  setGraphLoanValue,
  setGraphEquityValue,
  setGraphFullData,
  setGraphAgentHomeValue,
  setGraphStartDate,
  setGraphEndDate,
  graphReducer,
} from "./slices/graphSlice";

import {
  setPropertyDocData,
  addPropertyDoc,
  deletePropertyDoc,
  documentReducer,
} from "./slices/propertyDocSlice";

import { genericReducer } from "./slices/genericDataSlice";
import { maintenanceTaskReducer } from "./slices/fetchMaintenanceTaskSlice";
import { propertiesMaintenanceTaskReducer } from "./slices/fetchPropertiesMaintenanceTaskSlice";
import { agentRequestReducer } from "./slices/agentRequestHistorySlice";
import {
  setShowAllProperties,
  addHomeOwnerDoc,
  deleteHomeOwnerDoc,
  homeOwnerPropertyListReducer,
} from "./slices/homeowner/propertyListSlice";
import {
  paginationReducer,
  setCurrentPage,
  setPageSize,
} from "./slices/paginationSlice";
import { addInvitee, inviteeListReducer } from "./slices/inviteeListSlice";
import { homeOwnerMaintenanceTaskReducer } from "./slices/homeowner/propertyMaintenanceSlice";
import {
  setAuthUser,
  removeAuthUser,
  setHomeOwnerUser,
  authReducer,
} from "./slices/authSlice";
import {
  setEditPropertyInviteStatus,
  setAddPropertyInvite,
  invitationPropertyReducer,
} from "./slices/invitationPropertyListSlice";

const store = configureStore({
  reducer: {
    profile: userProfileReducer,
    clientForm: addClientFormReducer,
    lenders: lenderReducer,
    titles: titleReducer,
    inspectors: inspectorReducer,
    client: viewClientReducer,
    propertyList: propertyListReducer,
    homeValue: homeValueReducer,
    graph: graphReducer,
    documents: documentReducer,
    generic: genericReducer,
    maintenanceTasks: maintenanceTaskReducer,
    propertiesMainTasks: propertiesMaintenanceTaskReducer,
    agentRequests: agentRequestReducer,
    myProperties: homeOwnerPropertyListReducer,
    pagination: paginationReducer,
    invitees: inviteeListReducer,
    homeOwnerMaintenanceTasks: homeOwnerMaintenanceTaskReducer,
    auth: authReducer,
    invitationProperties: invitationPropertyReducer,
    // auth: authSlice.reducer,
  },
});

export {
  store,
  setClientData,
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
  //   setClientLenderLoanOption,
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
  setClientHomeInspectorId,
  setClientAddHomeInspectorName,
  setClientAddHomeInspectorPhone,
  setClientAddHomeInspectorEmail,
  setClientAddHomeInspectorCompanyName,
  setClientHomeMaintenanceManualOption,
  setClientHomeMaintenanceInspectorOption,
  setClientHomeMaintenanceAutoOption,
  setClientHomeMaintenanceAutoValue,
  setShowClientInfoForm,
  setShowClientAddressForm,
  setShowClientPropertyForm,
  setShowClientLenderForm,
  setShowClientTitleForm,
  setShowClientHomeMaintenanceForm,
  setShowClientDocumentPage,
  setShowCompletePropertyList,
  setShowClientDetails,
  setViewClientData,
  setAddHomeValue,
  setEditHomeValue,
  setDeleteHomeValue,
  setUpdateProperty,
  addProperty,
  setShowCientPreview,
  setGraphLabels,
  setGraphHomeValue,
  setGraphLoanValue,
  setGraphEquityValue,
  setGraphFullData,
  setGraphAgentHomeValue,
  setGraphStartDate,
  setGraphEndDate,
  addPropertyDoc,
  deletePropertyDoc,
  setShowMaintenanceTaskPage,
  setCandidateMaintenanceTask,
  removeCandidateMaintenanceTask,
  addCandidateMaintenanceTask,
  setShowAllProperties,
  setPropertyDocData,
  setTempCandidateMaintenanceTask,
  addTempCandidateMaintenanceTask,
  removeTempCandidateMaintenanceTask,
  setTempPropertyMaintenanceTask,
  setCurrentPage,
  setPageSize,
  addInvitee,
  addHomeOwnerDoc,
  deleteHomeOwnerDoc,
  setViewClientAgentInfo,
  setAuthUser,
  removeAuthUser,
  setEditPropertyInviteStatus,
  setAddPropertyInvite,
  setHomeOwnerUser,
  setProfileUserName,
  setShowDocumentUploadMobile,
  setShowMaintenanceTaskPageMobile,
  setShowClientDetailsEditPageMobile,
  setClientDetailsEditPageMobileData,
};

export * from "./thunks/fetchProfile";
export * from "./thunks/fetchLenders";
export * from "./thunks/fetchTitles";
export * from "./thunks/fetchInspectors";
export * from "./thunks/fetchPropertyList";
export * from "./thunks/fetchHomeValueData";
export * from "./thunks/fetchPropertiesDocs";
export * from "./thunks/fetchPropertyApprRate";
export * from "./thunks/fetchMaintenanceTasks";
export * from "./thunks/fetchPropertiesMaintenanceTask";
export * from "./thunks/postPropertyMaintenanceTask";
export * from "./thunks/deletePropertyMaintenanceTask";
export * from "./thunks/editPropertyMaintenanceTask";
export * from "./thunks/fetchAgentRequestHistory";
export * from "./thunks/postAgentRequestHistory";
export * from "./thunks/editAgentRequestHistory";
export * from "./thunks/homeowner/fetchProperties";
export * from "./thunks/fetchInvitees";
export * from "./thunks/testSendEmail";
export * from "./thunks/fetchPropertyInvitationList";
