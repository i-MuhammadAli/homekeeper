import { useSelector, useDispatch } from "react-redux";
import Footer from "../footer/Footer";
import Header from "../header/Header2";
import React, { useEffect, useState } from "react";
import {
  setShowCientPreview,
  setShowMaintenanceTaskPage,
  setGraphFullData,
  setCandidateMaintenanceTask,
  setShowDocumentUploadMobile,
  setShowMaintenanceTaskPageMobile,
} from "../../store";
import PreviewPage from "./property/PreviewPage";
import MaintenanceTasksPage from "./maintenanceTasks/MaintenanceTasksPage";
import Loader from "../loader_folder/Loader";
import DocumentInfoMobile from "./property/DocumentInfoMobile";
import CustomMaintenanceTaskMobile from "./maintenanceTasks/CustomMaintenanceTaskMobile";

function HomeOwnerDashboard() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState(null);

  const {
    showClientPreview,
    showMaintenanceTaskPage,
    showDocumentUploadMobile,
    showMaintenanceTaskPageMobile,
  } = useSelector((state) => {
    return state.client;
  });

  const { data: property, homeValue } = useSelector((state) => {
    return state.myProperties;
  });

  const propertyApprRate = useSelector((state) => {
    return state.generic.data.propertyApprRate;
  });

  const maintenanceTasks = useSelector((state) => {
    return state.maintenanceTasks.data;
  });

  const myMaintenanceTasks = useSelector((state) => {
    return state.homeOwnerMaintenanceTasks.data;
  });

  const calculateCandidateTasks = (
    maintenanceTasks,
    propertyMaintenanceTasks
  ) => {
    // console.log(maintenanceTasks, propertyMaintenanceTasks);

    const valuesArr2 = propertyMaintenanceTasks.map((obj) => obj["task_id"]);
    const result = maintenanceTasks.filter(
      (obj) => !valuesArr2.includes(obj["id"])
    );
    return result;
  };

  useEffect(() => {
    // console.log(myProperties);
    // console.log("useeffect");
    dispatch(
      setGraphFullData({
        loanAmount: property.loanamount,
        purchaseDate: homeValue[0].date_from,
        homeValue: homeValue[0].homevalue,
        loanTerm: property.loanyear,
        interestRate: property.apr_rate,
        agentUpdatedHomeValues: homeValue,
        propertyApprRate,
      })
    );
    dispatch(
      setCandidateMaintenanceTask(
        calculateCandidateTasks(maintenanceTasks, myMaintenanceTasks)
      )
    );

    dispatch(setShowCientPreview(true));
    setIsLoading(false);
  }, []);

  const toProperty = () => {
    dispatch(setShowMaintenanceTaskPage(false));
    dispatch(setShowCientPreview(true));
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto">
        {showClientPreview && (
          <PreviewPage
            handleDocumentUploadMobile={handleDocumentUploadMobile}
          />
        )}
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
        {showDocumentUploadMobile && (
          <DocumentInfoMobile onBack={backFromDocumentUpload} />
        )}
      </div>
      <Footer />
    </>
  );
}
export default HomeOwnerDashboard;
