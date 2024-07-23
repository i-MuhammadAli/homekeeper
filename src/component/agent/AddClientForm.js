import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  setShowClientInfoForm,
  setShowClientAddressForm,
  setShowClientPropertyForm,
  setShowClientLenderForm,
  setShowClientTitleForm,
  setShowClientHomeMaintenanceForm,
  setShowClientDocumentPage,
  setShowClientDetails,
  setShowCompletePropertyList,
  setTempCandidateMaintenanceTask,
  setCandidateMaintenanceTask,
} from "../../store";
import AddClientInfo from "./AddClientInfo";
import AddClientAddress from "./AddClientAddress";
import AddClientPropertyDetails from "./AddClientPropertyDetails";
import AddClientLenderInfo from "./AddClientLenderInfo";
import AddClientTitleCompanyInfo from "./AddClientTitleCompanyInfo";
import AddClientHomeMaintenanceInfo from "./AddClientHomeMaintenanceInfo";
import AddClientDocumentPage from "./AddClientDocumentPage";
import { calculateCandidateTasks } from "./ViewClientList";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import { HiHome } from "react-icons/hi";
import HomeButton from "../common/HomeButton";

function AddClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    showClientInfoForm,
    showClientAddressForm,
    showClientPropertyForm,
    showClientLenderForm,
    showClientTitleForm,
    showClientHomeMaintenanceForm,
    showClientDocumentPage,
  } = useSelector((state) => {
    return state.clientForm;
  });

  const maintenanceTasks = useSelector((state) => {
    return state.maintenanceTasks.data;
  });

  const draftId = useSelector((state) => {
    return state.clientForm.form.id;
  });

  const tempPropertyMaintenanceTasks = useSelector((state) => {
    if (state.clientForm.form.propertiesMainTasks) {
      return state.clientForm.form.propertiesMainTasks;
    }
    return [];
  });

  const handleSubmit = (event) => {
    dispatch(setShowClientHomeMaintenanceForm(false));
    dispatch(setShowClientDocumentPage(false));
    dispatch(setShowCompletePropertyList(false));
    dispatch(setShowClientDetails(true));
    navigate("/myclientlist");
  };

  const toDocumentPage = () => {
    dispatch(setShowClientHomeMaintenanceForm(false));
    dispatch(setShowClientDocumentPage(true));
  };

  const toHomeMaintenanceForm = () => {
    dispatch(setShowClientTitleForm(false));
    dispatch(setShowClientDocumentPage(false));
    dispatch(setShowClientHomeMaintenanceForm(true));
    // console.log("toHomeMaintenanceForm");

    let values = calculateCandidateTasks(
      draftId || null,
      maintenanceTasks,
      tempPropertyMaintenanceTasks
    );
    dispatch(setTempCandidateMaintenanceTask(values));
    // dispatch(setTempPropertyMaintenanceTask(propertyMaintenanceTasks));
  };

  const toTitleForm = () => {
    dispatch(setShowClientLenderForm(false));
    dispatch(setShowClientHomeMaintenanceForm(false));
    dispatch(setShowClientTitleForm(true));
  };

  const toLenderForm = () => {
    dispatch(setShowClientPropertyForm(false));
    dispatch(setShowClientTitleForm(false));
    dispatch(setShowClientLenderForm(true));
  };

  const toPropertyForm = () => {
    dispatch(setShowClientLenderForm(false));
    dispatch(setShowClientAddressForm(false));
    dispatch(setShowClientPropertyForm(true));
  };

  const toAddressForm = () => {
    dispatch(setShowClientPropertyForm(false));
    dispatch(setShowClientInfoForm(false));
    dispatch(setShowClientAddressForm(true));
  };

  const toInfoForm = () => {
    dispatch(setShowClientAddressForm(false));
    dispatch(setShowClientInfoForm(true));
  };

  return (
    <>
      <Header />
      <div
        style={{ background: "#f2f7f9" }}
        className="max-w-screen-xl mx-auto"
      >
        {showClientInfoForm && <AddClientInfo onContinue={toAddressForm} />}
        {showClientAddressForm && (
          <AddClientAddress onContinue={toPropertyForm} onBack={toInfoForm} />
        )}
        {showClientPropertyForm && (
          <AddClientPropertyDetails
            onContinue={toLenderForm}
            onBack={toAddressForm}
          />
        )}
        {showClientLenderForm && (
          <AddClientLenderInfo
            onContinue={toTitleForm}
            onBack={toPropertyForm}
          />
        )}
        {showClientTitleForm && (
          <AddClientTitleCompanyInfo
            onContinue={toHomeMaintenanceForm}
            onBack={toLenderForm}
          />
        )}
        {showClientHomeMaintenanceForm && (
          <AddClientHomeMaintenanceInfo
            // onContinue={toDocumentPage}
            onContinue={handleSubmit}
            onBack={toTitleForm}
          />
        )}
        {/* {showClientDocumentPage && (
          <AddClientDocumentPage
            onContinue={handleSubmit}
            onBack={toHomeMaintenanceForm}
          />
        )} */}
        {/* {showClientInfoForm && (
        <AddClientInfo onContinue={toAddressForm} />
      )} */}
      </div>
      <Footer />
    </>
  );
}

export default AddClientForm;
