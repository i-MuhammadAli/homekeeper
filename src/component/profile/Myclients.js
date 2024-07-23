import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../footer/Footer";
import Header from "../header/Header2";
import React from "react";
import ViewClient from "../agent/clients/ViewClient";
import ViewClientList from "../agent/ViewClientList";
import {
  setShowCompletePropertyList,
  setShowClientDetails,
  setShowCientPreview,
  setShowMaintenanceTaskPage,
  setShowDocumentUploadMobile,
  setShowMaintenanceTaskPageMobile,
  setShowClientDetailsEditPageMobile,
  setClientDetailsEditPageMobileData,
} from "../../store";
import PreviewPage from "../agent/preview/PreviewPage";
import Graph from "../agent/preview/Graph";
import MaintenanceTasksPage from "../agent/maintenanceTasks/MaintenanceTasksPage";
import DocumentInfoMobile from "../agent/preview/DocumentInfoMobile";
import CustomMaintenanceTaskMobile from "../agent/maintenanceTasks/CustomMaintenanceTaskMobile";
import LenderInfoPageMobile from "../agent/clients/Pages/LenderInfoPageMobile";
import InspectorInfoPageMobile from "../agent/clients/Pages/InspectorInfoPageMobile";
import TitleInfoPageMobile from "../agent/clients/Pages/TitleInfoPageMobile";
import DocumentInfoPageMobile from "../agent/clients/Pages/DocumentInfoPageMobile";
import LoanInfoPageMobile from "../agent/clients/Pages/LoanInfoPageMobile";
import PropertyInfoPageMobile from "../agent/clients/Pages/PropertyInfoPageMobile";
import OwnerInfoPageMobile from "../agent/clients/Pages/OwnerInfoPageMobile";
import PartnerInfoPageMobile from "../agent/clients/Pages/PartnerInfoPageMobile";
import HomeValuePageMobile from "../agent/clients/Pages/HomeValuePageMobile";

function Myclients() {
  const dispatch = useDispatch();
  const [task, setTask] = useState(null);
  const { showCompleteList } = useSelector((state) => {
    return state.propertyList;
  });

  const { showClientDetails } = useSelector((state) => {
    return state.clientForm;
  });

  const {
    showClientPreview,
    showMaintenanceTaskPage,
    showDocumentUploadMobile,
    showMaintenanceTaskPageMobile,
    showClientDetailsEditPageMobile,
  } = useSelector((state) => {
    return state.client;
  });

  const toProperties = () => {
    dispatch(setShowClientDetails(false));
    dispatch(setShowCompletePropertyList(true));
  };

  const toProperty = () => {
    dispatch(setShowMaintenanceTaskPage(false));
    dispatch(setShowCientPreview(false));
    dispatch(setShowClientDetails(true));
  };

  const handleDocumentUploadMobile = () => {
    dispatch(setShowCientPreview(false));
    dispatch(setShowDocumentUploadMobile(true));
  };

  const backFromDocumentUpload = () => {
    dispatch(setShowDocumentUploadMobile(false));
    dispatch(setShowCientPreview(true));
  };

  const handleCustomMaintenanceMobile = (task) => {
    setTask(task);
    dispatch(setShowMaintenanceTaskPage(false));
    dispatch(setShowMaintenanceTaskPageMobile(true));
  };

  const backFromCustomMaintenanceMobile = () => {
    dispatch(setShowMaintenanceTaskPageMobile(false));
    dispatch(setShowMaintenanceTaskPage(true));
  };

  const handleClientDetailsEditMobile = (type, data) => {
    dispatch(setShowClientDetails(false));
    dispatch(setShowClientDetailsEditPageMobile(type));
    dispatch(setClientDetailsEditPageMobileData(data));
  };

  const backFromClientDetailsEditMobile = () => {
    dispatch(setShowClientDetailsEditPageMobile("null"));
    dispatch(setClientDetailsEditPageMobileData(null));
    dispatch(setShowClientDetails(true));
  };

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto">
        {showCompleteList && <ViewClientList />}
        {showClientDetails && (
          <ViewClient
            back={toProperties}
            handleClientDetailsEditMobile={handleClientDetailsEditMobile}
          />
        )}
        {showClientPreview && (
          <PreviewPage
            back={toProperty}
            handleDocumentUploadMobile={handleDocumentUploadMobile}
          />
        )}
        {showDocumentUploadMobile && (
          <DocumentInfoMobile onBack={backFromDocumentUpload} />
        )}
        {/* {showClientPreview && <Graph back={toProperty} />} */}
        {/* {showClientPreview && <Graph1 back={toProperty} />} */}
        {/* {showClientPreview && <LoanCalculator back={toProperty} />} */}
        {showMaintenanceTaskPage && (
          <MaintenanceTasksPage
            back={toProperty}
            onCustomMobile={handleCustomMaintenanceMobile}
          />
        )}
        {showMaintenanceTaskPageMobile && (
          <CustomMaintenanceTaskMobile
            task={task}
            onBack={backFromCustomMaintenanceMobile}
          />
        )}
        {showClientDetailsEditPageMobile === "lender" && (
          <LenderInfoPageMobile onBack={backFromClientDetailsEditMobile} />
        )}

        {showClientDetailsEditPageMobile === "inspector" && (
          <InspectorInfoPageMobile onBack={backFromClientDetailsEditMobile} />
        )}
        {showClientDetailsEditPageMobile === "title" && (
          <TitleInfoPageMobile onBack={backFromClientDetailsEditMobile} />
        )}
        {showClientDetailsEditPageMobile === "doc" && (
          <DocumentInfoPageMobile onBack={backFromClientDetailsEditMobile} />
        )}
        {showClientDetailsEditPageMobile === "loan" && (
          <LoanInfoPageMobile onBack={backFromClientDetailsEditMobile} />
        )}
        {showClientDetailsEditPageMobile === "property" && (
          <PropertyInfoPageMobile onBack={backFromClientDetailsEditMobile} />
        )}
        {showClientDetailsEditPageMobile === "owner" && (
          <OwnerInfoPageMobile onBack={backFromClientDetailsEditMobile} />
        )}
        {showClientDetailsEditPageMobile === "partner" && (
          <PartnerInfoPageMobile onBack={backFromClientDetailsEditMobile} />
        )}
        {showClientDetailsEditPageMobile === "homevalue" && (
          <HomeValuePageMobile onBack={backFromClientDetailsEditMobile} />
        )}
      </div>
      <Footer />
    </>
  );
}
export default Myclients;
