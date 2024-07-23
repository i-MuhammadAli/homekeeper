import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import createApi from "../../utils/api";
import {
  setClientHomeInspectorId,
  setClientAddHomeInspectorName,
  setClientAddHomeInspectorPhone,
  setClientAddHomeInspectorEmail,
  setClientAddHomeInspectorCompanyName,
  setClientHomeMaintenanceManualOption,
  setClientHomeMaintenanceInspectorOption,
  setClientHomeMaintenanceAutoOption,
  setClientHomeMaintenanceAutoValue,
  fetchInspectors,
  fetchPropertiesMaintenanceTasks,
  setCandidateMaintenanceTask,
  fetchHomeValueData,
  setViewClientData,
  setViewClientAgentInfo,
  addProperty,
} from "../../store";
import Loader from "../loader_folder/Loader";
import InfoSection from "./InfoSection";
import { MaintenanceTaskSection } from "./maintenanceTasks/MaintenanceTasksPage";
import { calculateCandidateTasks } from "./ViewClientList";
import { resetState } from "../../store/slices/addClientFormSlice";

function AddClientHomeMaintenanceInfo({ onContinue, onBack }) {
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const api = createApi();

  const { inspector, autoOption, homeInspector } = useSelector((state) => {
    return state.clientForm.form.homeMaintenanceInfo;
  });

  const { id } = useSelector((state) => {
    return state.clientForm.form;
  });

  const agentId = useSelector((state) => {
    return state.profile.data.id;
  });

  const inspectors = useSelector((state) => {
    return state.inspectors.data;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      sendDetailsToServer();
    }
  };

  const selectManual = (event) => {
    setFormErrors({});
    dispatch(setClientHomeMaintenanceAutoOption(false));
    dispatch(setClientHomeMaintenanceInspectorOption(false));
    dispatch(setClientHomeMaintenanceManualOption(true));
  };

  const selectHomeInspector = (event) => {
    setFormErrors({});
    dispatch(setClientHomeMaintenanceAutoOption(false));
    dispatch(setClientHomeMaintenanceManualOption(false));
    dispatch(setClientHomeMaintenanceInspectorOption(true));
  };

  const selectAuto = (event) => {
    setFormErrors({});
    dispatch(setClientHomeMaintenanceAutoOption(true));
    dispatch(setClientHomeMaintenanceManualOption(false));
    dispatch(setClientHomeMaintenanceInspectorOption(false));
  };

  const onAutoOptionChange = (event) => {
    // console.log(event.target.value);
    dispatch(setClientHomeMaintenanceAutoValue(event.target.value));
  };

  const onInspectorSelect = (event) => {
    setFormErrors({});
    // console.log(event.target.value);
    if (event.target.value !== "Pick Your Home Lender") {
      dispatch(setClientHomeInspectorId(event.target.value));
      dispatch(setClientAddHomeInspectorName(""));
      dispatch(setClientAddHomeInspectorEmail(""));
      dispatch(setClientAddHomeInspectorPhone(""));
      dispatch(setClientAddHomeInspectorCompanyName(""));
    } else dispatch(setClientHomeInspectorId(""));
  };

  const onInspectorNameChange = (event) => {
    if ("inspectorName" in formErrors) {
      delete formErrors.inspectorName;
    }
    dispatch(setClientHomeInspectorId(""));
    dispatch(setClientAddHomeInspectorName(event.target.value));
  };

  const onInspectorEmailChange = (event) => {
    if ("inspectorEmail" in formErrors) {
      delete formErrors.inspectorEmail;
    }
    dispatch(setClientHomeInspectorId(""));
    dispatch(setClientAddHomeInspectorEmail(event.target.value));
  };

  const onInspectorPhoneChange = (event) => {
    if ("inspectorPhone" in formErrors) {
      delete formErrors.inspectorPhone;
    }
    const formattedInput = formatPhoneNumber(event.target.value);
    dispatch(setClientHomeInspectorId(""));
    dispatch(setClientAddHomeInspectorPhone(formattedInput));
  };

  const onInspectorCompanyChange = (event) => {
    if ("lenderCompany" in formErrors) {
      delete formErrors.lenderCompany;
    }
    dispatch(setClientHomeInspectorId(""));
    dispatch(setClientAddHomeInspectorCompanyName(event.target.value));
  };

  const formatPhoneNumber = (input) => {
    const numericInput = input.replace(/[^\d]/g, "");

    if (numericInput.length === 0) return "";
    if (numericInput.length > 10) {
      return input;
    }

    let formattedNumber = "";
    for (let i = 0; i < numericInput.length; i++) {
      if (i === 3 || i === 6) {
        formattedNumber += "-";
      }
      formattedNumber += numericInput[i];
    }

    return formattedNumber;
  };

  const handleBack = () => {
    onBack();
  };

  const validate = () => {
    const errors = {};
    if (homeInspector) {
      if (inspector.id === "") {
        if (!inspector.inspectorData.name) {
          errors.inspectorName = "Required";
        }
        if (!inspector.inspectorData.email) {
          errors.inspectorEmail = "Required";
        }
        if (!inspector.inspectorData.phone) {
          errors.inspectorPhone = "Required";
        }
      }
    }
    // console.log(errors);
    return errors;
  };
  // console.log(formErrors);

  const sendDetailsToServer = async () => {
    let formdata = new FormData();

    formdata.append("clientid", id);
    formdata.append("authid", agentId);
    formdata.append("homeinspectorselected", inspector.id);
    formdata.append("inspectorname", inspector.inspectorData.name);
    formdata.append("inspectoremail", inspector.inspectorData.email);
    formdata.append("inspectorcellphone", inspector.inspectorData.phone);
    formdata.append(
      "inspectorcompanyname",
      inspector.inspectorData.companyName
    );
    formdata.append("maintainid", "");
    formdata.append("homemaintainreport", file);

    api
      .post("/api/homekeeperaddmyhomeinspector", formdata)
      .then(function (response) {
        // console.log("response", response.data);
        if (response.data.status === "success") {
          dispatch(fetchInspectors());
          setIsLoading(false);
          completeProperty();
          // onContinue();
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

  const completeProperty = async () => {
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

  const [switchtabhomeinspector, setstateforswitchtabhomeinspector] =
    useState("");
  const [objectforedit, Setstateforedit] = useState("");
  const [objectupdateforcurrent, currentobjectupdate] = useState("");
  const [file, setFile] = useState();

  const [state, setState] = useState({
    inspectorname: "",
    inspectoremail: "",
    inspectorcellphone: "",
    inspectorcompanyname: "",
    homeinspectorselected: "",
  });

  const [data1, setdata1] = useState("");

  const [maintainrecord, setmaintainrecord] = useState([]);
  const [dataforHomeinspector, SetdataforHomeinspector] = useState([]);
  const [dataforHomemaintain, SetdataforHomemaintain] = useState([]);

  const [templatenameerror, settnameError] = useState("");
  const [templatedescription, settdError] = useState("");
  const [templatestatus, settemplatestatus] = useState("");
  const [inspectionreportvalue, setstateforinspectionreportvalue] = useState(
    []
  );
  const [onlinevalue, setstateforonlinevalue] = useState([]);

  const [homeinspectordatacheck, setstatefordatahomeinspector] = useState("");
  const [dataautodatacheck, setstatefordataauto] = useState("");
  const [ifdata, ifautodata] = useState("");
  const [previousmaintain, setstateforpreviousmaintain] = useState("");

  const [state1, setState1] = useState({
    templatename: "",
    templatedescription: "",
  });

  const [userdataprofile, setuserdata] = useState({ quality: "" });

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setState1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputsHandler1 = (e) => {
    const { name, value } = e.target;
    Setstateforedit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputsHandler = (e) => {
    const { name, value } = e.target;

    setuserdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (value !== "") {
      setstatefordataauto("data");

      ifautodata("somedata");
      $(".clearformbybutton").show();
    } else {
      setstatefordataauto("");
      // alert(dataautodatacheck)
      ifautodata("");
    }

    // console.log("name1", name);
    // console.log("value1", value);
    setFile(e.target.files[0]);
  };

  const handleSubmit1 = (e) => {
    // alert(state1.templatename)
    //     alert(state1.templatedescription)
    // return false;
    e.preventDefault();

    if (state1.templatename == "") {
      settnameError("Template Name Required");
    } else {
      settnameError("");
    }
    if (state1.templatedescription == "") {
      settdError("Template Description Required");
    } else {
      settdError("");
    }
    if (state1.templatename && state1.templatedescription !== "") {
      // alert("test");
      settemplatestatus("Submitted Successfully");
      setdetailsfortemplatenametoserver();
    }
  };

  const setdetailsfortemplatenametoserver = () => {
    if (maintainrecord.length == 0) {
      let formdata = new FormData();
      const userid = localStorage.getItem("token-info");
      formdata.append("maintenancename", state1.templatename);
      formdata.append("templatedescription", state1.templatedescription);
      formdata.append("userid", userid);
      api
        .post("/api/homekeeperaddmaintainencetemplate", formdata)
        .then(function (response) {
          // console.log("response", response.data);
          if (response.data.status == "success") {
            testing();
            // addmaintainitem();
            // var agentrecord = response.data.getclientrecord;
            // setdetailsfortemplate(agentrecord);
          } else {
            // setError(response.data.errors);
            // console.log("under error");
          }
        });
    } else {
      setstateforpreviousmaintain(
        "Please Remove Current Maintainenace Item to Add new Record"
      );
      setTimeout(myFunction, 4000);
    }
  };

  const myFunction = () => {
    setstateforpreviousmaintain("");
  };

  useEffect(() => {
    // console.log("testing", maintainrecord);
    $("#Inspector-tab").addClass("active");

    testing();
    // getlenderdetails();
  }, []);

  const alertmessage = () => {
    // alert("click")
    // console.log("switchtabhomeinspector", switchtabhomeinspector);
    // console.log("dataautodatacheck", dataautodatacheck);
    // { switchtabhomeinspector || dataautodatacheck ? "true" : "false" }
  };

  const testing = (e) => {
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    api
      .post("/api/homekeepermyhomeinspectorusers", formdata)
      .then(function (response) {
        // console.log("response", response.data);
        if (response.data.status == "success") {
          SetdataforHomeinspector(response.data.homeinspectorusers);
          // console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          // console.log("under error");
        }
      });
    const userid = localStorage.getItem("token-info");
    let formdata1 = new FormData();
    formdata1.append("userid", userid);
    api
      .post("/api/homekeepermaintainencetemplate", formdata1)
      .then(function (response) {
        if (response.data.status == "success") {
          // console.log(
          // "responseformaintain",
          // response.data.maintainencetemplate
          // );
          SetdataforHomemaintain(response.data.maintainencetemplate);

          // console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          // console.log("under error");
        }
      });
  };

  function submittemplate(event) {
    //  alert(objectforedit.maintaindex);
    // console.log("hiiii", objectforedit.maintaindex);
    // alert("test for edit")
    event.preventDefault();
    const userid = localStorage.getItem("token-info");
    let formdata = new FormData();
    // console.log(formdata);
    formdata.append("id", objectforedit.maintainid);
    formdata.append("templatename", objectforedit.maintainname);
    formdata.append("templatedescription", objectforedit.maintaindescription);
    formdata.append("userid", userid);

    api
      .post("/api/homekeepermaintainencetemplateupdate", formdata)
      .then(function (response) {
        // console.log("response", response.data);
        if (response.data.status == "success") {
          // console.log("$$$$$4", maintainrecord);
          currentobjectupdate({
            id: objectforedit.maintainid,
            templatename: objectforedit.maintainname,
            templatedescription: objectforedit.maintaindescription,
          });

          // console.log("keysssssss0", objectupdateforcurrent);
          // console.log("keysssssss", maintainrecord);

          maintainrecord[objectforedit.maintaindex].templatename =
            objectforedit.maintainname;
        } else {
          // console.log("under error");
        }
      });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* <Header /> */}
      <section className="agent_dashboard add_client">
        <div className="container">
          <form>
            <div className="strow">
              <div className="row">
                <InfoSection />
                <div className="col-sm-12">
                  <h6 className="did">Who is doing Home maintenance Plan?</h6>

                  <ul
                    className="nav nav-tabs"
                    id="myTab"
                    role="tablist"
                    onClick={alertmessage()}
                  >
                    <li className="nav-item" role="presentation">
                      <span>
                        <button
                          // disabled={
                          //   switchtabhomeinspector || dataautodatacheck
                          //     ? true
                          //     : false
                          // }
                          className={
                            dataautodatacheck || switchtabhomeinspector
                              ? "nav-link disabledd"
                              : "nav-link"
                          }
                          id="Inspector-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#Inspector-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="Inspector-tab-pane"
                          onClick={selectHomeInspector}
                          aria-selected="true"
                        >
                          <span></span> Home Inspector
                        </button>
                      </span>
                    </li>
                    <li className="nav-item" role="presentation">
                      <span>
                        <button
                          // disabled={
                          //   homeinspectordatacheck || dataautodatacheck
                          //     ? true
                          //     : false
                          // }
                          className={
                            homeinspectordatacheck || dataautodatacheck
                              ? "nav-link disabledd"
                              : "nav-link"
                          }
                          id="Manually-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#Manually-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="Manually-tab-pane"
                          aria-selected="false"
                          onClick={selectManual}
                        >
                          <span></span> Manually{" "}
                        </button>
                      </span>
                    </li>
                    <li className="nav-item" role="presentation">
                      <span>
                        <button
                          // disabled={
                          //   homeinspectordatacheck || switchtabhomeinspector
                          //     ? true
                          //     : false
                          // }
                          className={
                            homeinspectordatacheck || switchtabhomeinspector
                              ? "nav-link disabledd"
                              : "nav-link"
                          }
                          id="Auto-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#Auto-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="Auto-tab-pane"
                          aria-selected="false"
                          onClick={selectAuto}
                        >
                          <span></span> Auto
                        </button>
                      </span>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="Inspector-tab-pane"
                      role="tabpanel"
                      aria-labelledby="Inspector-tab"
                      tabindex="0"
                    >
                      <div className="row">
                        <div className="col-sm-4">
                          <label>Home Inspector</label>
                          <select
                            name="homeinspectorselected"
                            // value={inspector.id}
                            onChange={onInspectorSelect}
                            className="form-control"
                          >
                            <option value="" selected>
                              Pick Your Home Inspector
                            </option>
                            {inspectors.length > 0
                              ? inspectors.map((dataforHomeinspector) => (
                                  <option
                                    id={dataforHomeinspector.id}
                                    value={dataforHomeinspector.id}
                                    className="user"
                                  >
                                    {dataforHomeinspector.name}
                                  </option>
                                ))
                              : ""}
                          </select>
                          <h6>Or</h6>

                          <label>Add New Home Inspector</label>
                          <div className="form-group">
                            <input
                              type="text"
                              onChange={onInspectorNameChange}
                              value={inspector.inspectorData.name}
                              name="inspectorname"
                              placeholder="Home Inspector name"
                            />
                            {formErrors.inspectorName ? (
                              <>
                                <span className="formerrorforvalidation">
                                  {formErrors.inspectorName}
                                </span>
                              </>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-group">
                            <input
                              type="email"
                              onChange={onInspectorEmailChange}
                              value={inspector.inspectorData.email}
                              name="inspectoremail"
                              placeholder="Email*"
                            />
                            {formErrors.inspectorEmail ? (
                              <>
                                <span className="formerrorforvalidation">
                                  {formErrors.inspectorEmail}
                                </span>
                              </>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-group">
                            <input
                              type="text"
                              onChange={onInspectorPhoneChange}
                              value={inspector.inspectorData.phone}
                              name="inspectorcellphone"
                              placeholder="Phone"
                              maxLength={12}
                            />
                            {formErrors.inspectorPhone ? (
                              <>
                                <span className="formerrorforvalidation">
                                  {formErrors.inspectorPhone}
                                </span>
                              </>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-group">
                            <input
                              type="text"
                              onChange={onInspectorCompanyChange}
                              value={inspector.inspectorData.companyName}
                              name="inspectorcompanyname"
                              placeholder="Company name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {data1.deletetemplatename}
                    <div
                      className="tab-pane fade px-0"
                      id="Manually-tab-pane"
                      role="tabpanel"
                      aria-labelledby="Manually-tab"
                      tabindex="0"
                    >
                      <span className="formerrorforvalidation">
                        {previousmaintain ? previousmaintain : ""}
                      </span>
                      <MaintenanceTaskSection />
                    </div>

                    <div
                      className="tab-pane fade pb-0"
                      id="Auto-tab-pane"
                      role="tabpanel"
                      aria-labelledby="Auto-tab"
                      tabindex="0"
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <label className="text-uppercase">Auto Options</label>
                          {/* {ifdata ? (
                            <button
                              style={{ float: "right" }}
                              onClick={clearform}
                              className="btn clearformbybutton"
                            >
                              Clear Form
                            </button>
                          ) : (
                            ""
                          )} */}
                          <div className="st">
                            <span className="checkcontainer">
                              <input
                                type="radio"
                                name="quality"
                                className="quality radiobuttonclass"
                                onChange={onAutoOptionChange}
                                checked={autoOption === "inspectionreport"}
                                value="inspectionreport"
                              />
                              <span className="radiobtn"></span>
                            </span>
                            <h5>Home Inspection Report</h5>
                            <p>
                              Based on home inspection Nestly Homes will create
                              the home maintenance plan for a one fee of $
                              {inspectionreportvalue
                                ? inspectionreportvalue
                                : ""}
                              .
                            </p>
                            <h6>Upload Inspection Report</h6>

                            <div className="input-group custom-file-button">
                              <span
                                className="input-group-text"
                                htmlFor="inputGroupFile"
                              >
                                Choose File
                              </span>
                              <input
                                className="form-control"
                                name="uploadinspectionreport"
                                placeholder="Cell number"
                                onChange={inputsHandler}
                                type="file"
                              />
                            </div>
                          </div>

                          <div className="st">
                            <span className="checkcontainer">
                              <input
                                type="radio"
                                name="quality"
                                className="quality radiobuttonclass"
                                value="onlinephoto"
                                onChange={onAutoOptionChange}
                                checked={autoOption === "onlinephoto"}
                              />
                              <span className="radiobtn"></span>
                            </span>
                            <h5>Online Photos</h5>
                            <p>
                              Based on online photos Nestly Homes will create
                              the home maintenance plan for a one fee of $
                              {onlinevalue ? onlinevalue : ""}.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id="exampleModalformaintainitem"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Add Maintenance Item
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <input
                                type="hidden"
                                name="id"
                                onChange={handleChange1}
                              ></input>
                              <div className="row">
                                <div className="col-4">
                                  <label>Name of Maintenance*</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="templatename"
                                    onChange={handleChange1}
                                    value={state1.templatename}
                                    placeholder="Name of Maintenance"
                                  />
                                  <span className="errormessage">
                                    {templatenameerror}
                                  </span>
                                </div>
                                <div className="col-4">
                                  <label>Alert Frequency*</label>

                                  <select
                                    className="form-control"
                                    name="alertfrequency"
                                    onChange={handleChange1}
                                  >
                                    <option>Date</option>
                                    <option>Month</option>
                                    <option>Year</option>
                                  </select>
                                </div>
                                <div className="col-4">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label>Starting Date*</label>
                                      <div className="form-group1">
                                        <input
                                          className="form-control"
                                          type="date"
                                          name="startingdate"
                                          onChange={handleChange1}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <label>Repeat Every*</label>
                                      <select
                                        className="form-control"
                                        name="repeatevery"
                                        onChange={handleChange1}
                                      >
                                        <option>1 Month</option>
                                        <option>2 Month</option>
                                        <option>3 Month</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-8">
                                  <label>Description*</label>
                                  <textarea
                                    name="templatedescription"
                                    className="form-control"
                                    value={state.templatedescription}
                                    onChange={handleChange1}
                                  ></textarea>
                                  <span className="errormessage">
                                    {templatedescription}
                                  </span>
                                </div>

                                <div className="col-4">
                                  <label>Image*</label>

                                  <div className="imageup">
                                    <h6>
                                      Drag & Drop or <span> Upload</span> image
                                    </h6>
                                    <input
                                      className="form-control"
                                      type="file"
                                    />
                                  </div>
                                </div>

                                <div className="col-12 mt-3 alt_Message">
                                  <h4>Alert Message</h4>

                                  <p className="w-100 mb-3">
                                    <span>
                                      <input
                                        type="radio"
                                        name="alerttext"
                                        onChange={handleChange1}
                                      />{" "}
                                      Text
                                    </span>
                                    <span>
                                      <input
                                        type="radio"
                                        name="alerttext"
                                        onChange={handleChange1}
                                      />{" "}
                                      Email
                                    </span>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <label>Text Message Alert*</label>
                                  <textarea
                                    name="textmessage"
                                    className="form-control"
                                    onChange={handleChange1}
                                  ></textarea>
                                </div>

                                <div className="col-6">
                                  <label>Email Message Alert*</label>
                                  <textarea
                                    name="emailmessage"
                                    className="form-control"
                                    onChange={handleChange1}
                                  ></textarea>
                                </div>
                              </div>

                              <div className="modal-footer mt-3 p-0">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                  onClick={handleSubmit1}
                                >
                                  Save Changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id="exampleModalformaintainitemeditupdate"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal">
                        <div className="modal-content ">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Edit Maintenance Item
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            {/* <h4>Name of Maintenance</h4> */}

                            <form>
                              <input
                                type="hidden"
                                name="maintainid"
                                value={objectforedit.maintainid}
                              ></input>

                              <div className="row">
                                <div className="col-4">
                                  <label>Name of Maintenance*</label>
                                  <input
                                    className="form-control"
                                    value={objectforedit.maintainname}
                                    name="maintainname"
                                    onChange={inputsHandler1}
                                    placeholder="Name of Maintenance"
                                  />
                                  {/* <span className='errormessage'>{templatenameerror}</span> */}
                                </div>
                                <div className="col-4">
                                  <label>Alert Frequency*</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="maintainfrequency"
                                    value={objectforedit.maintainfrequency}
                                    onChange={inputsHandler1}
                                    placeholder="Alert Frequency"
                                  />
                                </div>
                                <div className="col-4">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label>Starting Date*</label>
                                      <div className="form-group1">
                                        <input
                                          className="form-control"
                                          value={
                                            objectforedit.maintainstarting_date
                                          }
                                          onChange={inputsHandler1}
                                          type="date"
                                          name="maintainstarting_date"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <label>Repeat Every*</label>
                                      <select
                                        className="form-control"
                                        name="maintainrepeat_every"
                                        value={
                                          objectforedit.maintainrepeat_every
                                        }
                                        onChange={inputsHandler1}
                                      >
                                        <option>1 Month</option>
                                        <option>2 Month</option>
                                        <option>3 Month</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-8">
                                  <label>Description*</label>
                                  <textarea
                                    name="maintaindescription"
                                    value={objectforedit.maintaindescription}
                                    onChange={inputsHandler1}
                                    className="form-control"
                                  ></textarea>
                                  {/* <span className='errormessage'>{templatedescription}</span> */}
                                </div>

                                <div className="col-4">
                                  <label>Image*</label>

                                  <div className="imageup">
                                    <h6>
                                      Drag & Drop or <span> Upload</span> image
                                    </h6>
                                    <input
                                      className="form-control"
                                      type="file"
                                    />
                                  </div>
                                </div>

                                <div className="col-12 mt-3 alt_Message">
                                  <h4>Alert Message</h4>

                                  <p className="w-100 mb-3">
                                    <span className="me-3">
                                      <input
                                        type="radio"
                                        name="maintainalert_message"
                                        onChange={inputsHandler1}
                                        checked={
                                          objectforedit.maintainalert_message ==
                                          "Text"
                                            ? true
                                            : ""
                                        }
                                      />{" "}
                                      Text
                                    </span>
                                    <span>
                                      <input
                                        type="radio"
                                        name="maintainalert_message"
                                        onChange={inputsHandler1}
                                        checked={
                                          objectforedit.maintainalert_message ==
                                          "Email"
                                            ? true
                                            : ""
                                        }
                                      />{" "}
                                      Email
                                    </span>
                                  </p>
                                </div>
                                <div className="col-6">
                                  <label>Text Message Alert*</label>
                                  <textarea
                                    name="maintaintext_message_alert"
                                    onChange={inputsHandler1}
                                    value={
                                      objectforedit.maintaintext_message_alert
                                    }
                                    className="form-control"
                                  ></textarea>
                                </div>

                                <div className="col-6">
                                  <label>Email Message Alert*</label>
                                  <textarea
                                    name="maintainemail_message_alert"
                                    onChange={inputsHandler1}
                                    value={
                                      objectforedit.maintainemail_message_alert
                                    }
                                    className="form-control"
                                  ></textarea>
                                </div>
                              </div>

                              <div className="modal-footer mt-3 p-0">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                  onClick={submittemplate}
                                >
                                  Save Changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* modal end for edit/update maintainencetemplate */}
                  </div>
                </div>

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
      {/* <Footer /> */}
    </>
  );
}

export default AddClientHomeMaintenanceInfo;
