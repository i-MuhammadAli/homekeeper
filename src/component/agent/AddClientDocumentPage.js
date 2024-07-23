import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import createApi from "../../utils/api";
import Loader from "../loader_folder/Loader";
import {
  setViewClientData,
  addProperty,
  fetchHomeValueData,
  fetchPropertiesMaintenanceTasks,
  setCandidateMaintenanceTask,
  setViewClientAgentInfo,
} from "../../store";
import InfoSection from "./InfoSection";
import { calculateCandidateTasks } from "./ViewClientList";
import { resetState } from "../../store/slices/addClientFormSlice";

function AddClientDocumentPage({ onContinue, onBack }) {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const api = createApi();

  const { id } = useSelector((state) => {
    return state.clientForm.form;
  });

  const agent = useSelector((state) => {
    return state.profile.data;
  });

  const propertyId = useSelector((state) => {
    return state.client.data.id;
  });

  const maintenanceTasks = useSelector((state) => {
    return state.maintenanceTasks.data;
  });

  const propertyMaintenanceTasks = useSelector((state) => {
    return state.propertiesMainTasks.data;
  });

  const handleBack = () => {
    onBack();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    sendDetailsToServer();
  };

  const fetchData = async () => {
    try {
      // Dispatch the first thunk and wait for it to complete
      console.log("calling fetchData");
      await dispatch(fetchPropertiesMaintenanceTasks());

      // Once the first thunk completes, dispatch the second thunk
      dispatch(
        setCandidateMaintenanceTask(
          calculateCandidateTasks(
            propertyId,
            maintenanceTasks,
            propertyMaintenanceTasks
          )
        )
      );
    } catch (error) {
      // Handle errors if needed
      console.error("Error fetching data:", error);
    }
  };

  const sendDetailsToServer = async () => {
    var today = new Date();
    var deadlinedate = "";
    var dd = String(today.getDate()).padStart(2, "0");
    var ad = String(today.getDate() + 2).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    deadlinedate = ad + "/" + mm + "/" + yyyy;
    let formdata = new FormData();
    formdata.append("clientid", id);
    formdata.append("property_added_date", today);
    formdata.append("deadline_date", deadlinedate);
    api
      .post("/api/homekeeperpropertylistcompleted", formdata)
      .then(function (response) {
        console.log("response", response.data);
        setIsLoading(false);
        if (response.data.status === "success") {
          // dispatch(setClientData(response.data));
          dispatch(fetchHomeValueData());
          dispatch(setViewClientData(response.data.data));
          dispatch(
            setViewClientAgentInfo({
              agentName: agent.name,
              agentProfileImg: agent.profileimg,
              agentId: agent.id,
              company: agent.company,
              email: agent.email,
              phone: agent.phone,
            })
          );
          dispatch(addProperty(response.data.data));
          dispatch(fetchPropertiesMaintenanceTasks);
          fetchData();
          dispatch(resetState());

          onContinue();
        } else {
          setIsLoading(false);
          if (
            response.hasOwnProperty("data") &&
            response.data.hasOwnProperty("message")
          )
            setApiError(response.data.message);
        }
      })
      .catch(function (error) {
        console.error("API request failed:", error);
        setIsLoading(false);
        setApiError("Error: API request failed");
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="agent_dashboard add_client">
        <div className="container">
          <form>
            <div className="strow">
              <div className="row">
                <InfoSection />
                {/* <div className="col-sm-12 Insurance_div">
                  <h6 className="did">Upload Documents</h6>
                  <div className="row ">
                    {oldfilename.length > 0
                      ? oldfilename.map((items, i) => {
                          return (
                            <div className="col-lg-3">
                              <div className="listpdf">
                                <p>
                                  <div className="image">
                                    <img
                                      style={{ width: "100px" }}
                                      src={
                                        "https://digittrix-staging.com/staging/crmapply/homekeeper/public/image/homekeeper/" +
                                        items
                                      }
                                      alt="doc"
                                    />
                                  </div>
                                </p>
                              </div>
                            </div>
                          );
                        })
                      : ""}
                    {filename.length > 0
                      ? filename.map((items, i) => {
                          return (
                            <div className="col-lg-3">
                              <div className="listpdf">
                                <img
                                  src="/../asset/images/pdf1.png"
                                  alt="pdf"
                                />
                                <p>{items}</p>
                                <div className="progress">
                                  {progressbar}
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-valuenow="70"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{
                                      width: progressbar + "%",
                                      backgroundColor: "#3d9ddd;",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      : ""}
                    <div className="col-lg-3">
                      <div
                        className="listpdf upt"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <img src="/../asset/images/down.png" alt="pdf" />
                        <p>Add Document</p>
                      </div>
                    </div>
                  </div>
                </div> */}
                {apiError && (
                  <div className="col-sm-12 mt-4" style={{ color: "red" }}>
                    {apiError}
                  </div>
                )}
                <div className="col-sm-6 mt-4">
                  <button className="goback" onClick={handleBack}>
                    Back
                  </button>
                </div>
                <div className="col-sm-6 mt-4">
                  <button className="submit" onClick={handleSubmit}>
                    Save Details
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddClientDocumentPage;
