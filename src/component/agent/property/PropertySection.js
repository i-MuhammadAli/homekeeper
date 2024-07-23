// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FaSackDollar,
  FaMoneyCheckDollar,
  FaScrewdriverWrench,
} from "react-icons/fa6";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdArrowDropDown,
  MdArrowDropUp,
  MdAddCircle,
} from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaUserPlus,
  FaPlus,
  FaMinus,
  FaUserMinus,
  FaBirthdayCake,
  FaPlusCircle,
} from "react-icons/fa";
import { BsEnvelopeArrowUpFill } from "react-icons/bs";
import { FaEnvelope, FaPhone, FaUserLarge, FaBuilding } from "react-icons/fa6";
import { calculateCandidateTasks } from "../ViewClientList";

import {
  BsFillXCircleFill,
  BsFillCheckCircleFill,
  BsFillHouseFill,
  BsFillCake2Fill,
} from "react-icons/bs";

import createApi from "../../../utils/api";
import { formatPrice } from "../../../utils/helpers";
// import "tailwindcss/tailwind.css";

import {
  setShowClientDetails,
  setViewClientData,
  setDeleteHomeValue,
  setUpdateProperty,
  setShowMaintenanceTaskPage,
  setCandidateMaintenanceTask,
} from "../../../store";
import OwnerInfo from "../clients/OwnerInfo";
import LenderInfoModal from "../clients/Modals/LenderInfoModal";
import LoanInfo from "../clients/LoanInfo";
import TitleInfo from "../clients/TitleInfo";
import InspectorInfo from "../clients/InspectorInfo";
import PartnerInfo from "../clients/PartnerInfo";
import PropertyInfo from "../clients/PropertyInfo";
import HomeValue from "../clients/HomeValue";
import RentalValue from "../clients/RentalValue";
import PersonRemovalConfirmation from "../common/PersonRemovalConfirmation";
import DocumentInfo from "../clients/DocumentInfo";
import DocumentSection from "../preview/DocumentSection";
import ToolTip from "../../common/Tooltip";
import InspectorInfoModal from "../clients/Modals/InspectorInfoModal";
import TitleInfoModal from "../clients/Modals/TitleInfoModal";
import DocumentInfoModal from "../clients/Modals/DocumentInfoModal";
import LoanInfoModal from "../clients/Modals/LoanInfoModal";
import PropertyInfoModal from "../clients/Modals/PropertyInfoModal";
import OwnerInfoModal from "../clients/Modals/OwnerInfoModal";
import PartnerInfoModal from "../clients/Modals/PartnerInfoModal";
import HomeValueModal from "../clients/Modals/HomeValueModal";

function PropertySection({ handleClientDetailsEditMobile }) {
  const [showPropertyDiv, setShowPropertyDiv] = useState(true);
  const [showOwnerEdit, setShowOwnerEdit] = useState(false);

  const [showPartnerEdit, setShowPartnerEdit] = useState(false);
  const [showPartnerDeleteForm, setShowPartnerDeleteForm] = useState(false);

  const [showPropertyEdit, setShowPropertyEdit] = useState(false);

  const [showHomeValueEdit, setShowHomeValueEdit] = useState(false);
  const [showHomeValueAdd, setShowHomeValueAdd] = useState(false);
  const [homeValueDelete, setHomeValueDelete] = useState(false);
  const [homeValueItemToDelete, setHomeValueItemToDelete] = useState(null);

  const [showLoanEdit, setShowLoanEdit] = useState(false);

  const [showRentalValueEdit, setShowRentalValueEdit] = useState(false);
  const [showRentalValueAdd, setShowRentalValueAdd] = useState(false);
  const [rentalValueSelectedEdit, setRentalValueSelectedEdit] = useState(null);
  const [rentalValueItemToDelete, setRentalValueItemToDelete] = useState(null);

  const [isLenderChecked, setIsLenderChecked] = useState(true);
  const [showLenderEdit, setShowLenderEdit] = useState(false);
  const [showLenderDeleteForm, setShowLenderDeleteForm] = useState(false);

  const [isTitleChecked, setIsTitleChecked] = useState(true);
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showTitleDeleteForm, setShowTitleDeleteForm] = useState(false);

  const [isInspectorChecked, setIsInspectorChecked] = useState(true);
  const [showInspectorEdit, setShowInspectorEdit] = useState(false);
  const [showInspectorDeleteForm, setShowInspectorDeleteForm] = useState(false);

  const [showFileAdd, setShowFileAdd] = useState(false);

  const [homeValueSelectedEdit, setHomeValueSelectedEdit] = useState(null);
  const [notifyButtonDisable, setNotifyButtonDisable] = useState(false);

  const api = createApi();
  const dispatch = useDispatch();

  const lenders = useSelector((state) => {
    return state.lenders.data;
  });

  const inspectors = useSelector((state) => {
    return state.inspectors.data;
  });

  const titles = useSelector((state) => {
    return state.titles.data;
  });

  const client = useSelector((state) => {
    return state.client.data;
  });

  const homeValue = useSelector((state) => {
    return state.homeValue.data;
  });

  const maintenanceTasks = useSelector((state) => {
    return state.maintenanceTasks.data;
  });

  const propertyId = useSelector((state) => {
    return state.client.data.id;
  });

  const agent = useSelector((state) => {
    return state.profile.data;
  });

  const propertyMaintenanceTasks = useSelector((state) => {
    if (state.propertiesMainTasks) {
      return state.propertiesMainTasks.data;
    }
    return [];
  });

  let myLender = null;
  if (client.lenderInfo.askLender === "yes") {
    myLender = lenders.find((item) => item.id === client.lenderInfo.lender.id);
  }

  let myTitle = null;
  if (client.titleCompanyInfo.include === "yes") {
    myTitle = titles.find(
      (item) => item.id === parseInt(client.titleCompanyInfo.id)
    );
  }

  let myInspector = null;
  if (client.homeMaintenanceInfo.homeInspector === "yes") {
    myInspector = inspectors.find(
      (item) => item.id === client.homeMaintenanceInfo.inspector.id
    );
  }

  let myHomeValue = [];
  if (homeValue[client.id]) {
    myHomeValue = [...homeValue[client.id]].sort((a, b) => {
      return new Date(b.date_from) - new Date(a.date_from);
    });
  }

  const handlePropertyDivChange = () => {
    setShowPropertyDiv(!showPropertyDiv);
  };

  const handleOwnerEdit = () => {
    setShowOwnerEdit(true);
  };

  const handleNotifyOwner = () => {
    setNotifyButtonDisable(true);
    let formData = new FormData();

    formData.append("id", client.id);
    formData.append("fname", client.clientInfo.firstName);
    formData.append("email", client.clientInfo.email);
    formData.append("agentName", agent.name);
    api
      .post("/api/notify_owner", formData)
      .then((response) => {
        setNotifyButtonDisable(false);
        if (response.data.status === "success") {
          toast.success("Notified through email");
        } else {
          toast.error("Could not notify the owner");
        }
      })
      .catch((err) => {
        setNotifyButtonDisable(false);
        toast.error("Could not notify the owner");
        console.log(err);
      });
  };

  const handleOwnerEditClose = () => {
    setShowOwnerEdit(false);
  };

  const handleParnterEdit = () => {
    setShowPartnerEdit(true);
  };

  const handleParnterDelete = () => {
    setShowPartnerDeleteForm(true);
  };

  const handlePartnerDeleteConfirmed = () => {
    let formdata = new FormData();

    formdata.append("fname", "");
    formdata.append("lname", "");
    formdata.append("email", "");
    formdata.append("phone", "");
    formdata.append("dob", "");
    formdata.append("id", client.id);
    api
      .post("/api/agentpropertyeditpartnerdetails", formdata)
      .then(function (response) {
        // console.log("response", response.data);
        if (response.data.status === "success") {
          dispatch(setViewClientData(response.data.data));
          dispatch(setUpdateProperty(response.data.data));
          handleParnterDeleteClose();
        } else {
          console.log("Something went wrong!");
        }
      });
  };

  const handleParnterDeleteClose = () => {
    setShowPartnerDeleteForm(false);
  };

  const handlePartnerEditClose = () => {
    setShowPartnerEdit(false);
  };

  const handlePropertyEdit = () => {
    setShowPropertyEdit(true);
  };

  const handlePropertyEditClose = () => {
    setShowPropertyEdit(false);
  };

  const handleHomeValueEdit = (item) => {
    // console.log(item);
    setHomeValueSelectedEdit(item);
    setShowHomeValueEdit(true);
  };

  const handleHomeValueEditClose = () => {
    setShowHomeValueEdit(false);
  };

  const handleHomeValueAdd = () => {
    setShowHomeValueAdd(true);
  };

  const handleHomeValueAddClose = () => {
    setShowHomeValueAdd(false);
  };

  const handleHomeValueDelete = () => {
    let formdata = new FormData();
    formdata.append("id", homeValueItemToDelete);
    api
      .post("/api/homekeeperdeletehomevalue", formdata)
      .then(function (response) {
        // console.log("response", response.data);
        if (response.data.status === "success") {
          dispatch(
            setDeleteHomeValue({
              id: homeValueItemToDelete,
              propertyId: client.id,
            })
          );
          setHomeValueDelete(false);
          setHomeValueItemToDelete(null);
        } else {
          console.log("Delete failed!");
        }
      });
  };

  const handleHomeValueDeleteClicked = (item) => {
    setHomeValueDelete(true);
    setHomeValueItemToDelete(item.id);
  };

  const handleHomeValueDeleteClosed = () => {
    setHomeValueDelete(false);
    setHomeValueItemToDelete(null);
  };

  const handleLoanEdit = () => {
    setShowLoanEdit(true);
  };

  const handleLoanEditClose = () => {
    setShowLoanEdit(false);
  };

  const handleRentalValueEdit = (item) => {
    // console.log(item);
    setRentalValueSelectedEdit(item);
    setShowRentalValueEdit(true);
  };

  const handleRentalValueEditClose = () => {
    setShowRentalValueEdit(false);
  };

  const handleRentalValueAddClose = () => {
    setShowRentalValueAdd(false);
  };

  const handleRentalValueDeleteClicked = (item) => {
    setRentalValueItemToDelete(item);
  };

  const handleRentalValueDeleteClosed = () => {
    setRentalValueItemToDelete(null);
  };

  const handleRentalValueDelete = () => {
    let formdata = new FormData();

    formdata.append("id", client.id);

    if (rentalValueItemToDelete === "airbnb") {
      formdata.append("airbnbValue", "");
      formdata.append("airbnbDate", "");
      api
        .post("/api/agentpropertyeditairbnbvalue", formdata)
        .then(function (response) {
          // console.log("response", response.data);
          if (response.data.status === "success") {
            dispatch(setViewClientData(response.data.data));
            dispatch(setUpdateProperty(response.data.data));
            setRentalValueItemToDelete(null);
          } else {
            console.log("Something went wrong!");
          }
        });
    } else {
      formdata.append("rentalValue", "");
      formdata.append("rentalDate", "");
      api
        .post("/api/agentpropertyeditrentalvalue", formdata)
        .then(function (response) {
          // console.log("response", response.data);
          if (response.data.status === "success") {
            dispatch(setViewClientData(response.data.data));
            dispatch(setUpdateProperty(response.data.data));
            setRentalValueItemToDelete(null);
          } else {
            console.log("Something went wrong!");
          }
        });
    }
  };

  const handleLenderEdit = () => {
    setShowLenderEdit(true);
  };

  const handleLenderEditClose = () => {
    setShowLenderEdit(false);
  };

  const handleLenderDelete = () => {
    setShowLenderDeleteForm(true);
  };

  const handleLenderDeleteConfirmed = () => {
    let formdata = new FormData();

    formdata.append("lenderid", "");
    formdata.append("id", client.id);
    api
      .post("/api/agentpropertyeditLender", formdata)
      .then(function (response) {
        // console.log("response", response.data);
        if (response.data.status === "success") {
          dispatch(setViewClientData(response.data.data));
          dispatch(setUpdateProperty(response.data.data));
          handleLenderDeleteClose();
        } else {
          console.log("Something went wrong!");
        }
      });
  };

  const handleLenderDeleteClose = () => {
    setShowLenderDeleteForm(false);
  };

  const handleTitleEdit = () => {
    setShowTitleEdit(true);
  };

  const handleTitleEditClose = () => {
    setShowTitleEdit(false);
  };

  const handleTitleDelete = () => {
    setShowTitleDeleteForm(true);
  };

  const handleTitleDeleteConfirmed = () => {
    let formdata = new FormData();

    formdata.append("titleid", "");
    formdata.append("id", client.id);
    api
      .post("/api/agentpropertyeditTitleCompany", formdata)
      .then(function (response) {
        // console.log("response", response.data);
        if (response.data.status === "success") {
          dispatch(setViewClientData(response.data.data));
          dispatch(setUpdateProperty(response.data.data));
          handleTitleDeleteClose();
        } else {
          console.log("Something went wrong!");
        }
      });
  };

  const handleTitleDeleteClose = () => {
    setShowTitleDeleteForm(false);
  };

  const handleInspectorEdit = () => {
    setShowInspectorEdit(true);
  };

  const handleInspectorEditClose = () => {
    setShowInspectorEdit(false);
  };

  const handleInspectorDelete = () => {
    setShowInspectorDeleteForm(true);
  };

  const handleInspectorDeleteConfirmed = () => {
    let formdata = new FormData();

    formdata.append("inspectorid", "");
    formdata.append("id", client.id);
    api
      .post("/api/agentpropertyeditHomeInspector", formdata)
      .then(function (response) {
        // console.log("response", response.data);
        if (response.data.status === "success") {
          dispatch(setViewClientData(response.data.data));
          dispatch(setUpdateProperty(response.data.data));
          handleInspectorDeleteClose();
        } else {
          console.log("Something went wrong!");
        }
      });
  };

  const handleInspectorDeleteClose = () => {
    setShowInspectorDeleteForm(false);
  };

  const handleFileAdd = () => {
    setShowFileAdd(true);
  };

  const onFileUploadCancel = () => {
    setShowFileAdd(false);
  };

  const handleTitleToggle = () => {
    setIsTitleChecked(!isTitleChecked);
  };

  const handleInspectorToggle = () => {
    setIsInspectorChecked(!isInspectorChecked);
  };

  const handleLenderToggle = () => {
    setIsLenderChecked(!isLenderChecked);
  };

  const handleShowMaintenanceTaskPage = () => {
    dispatch(setShowClientDetails(false));
    dispatch(setShowMaintenanceTaskPage(true));

    // console.log("propertyId", propertyId);
    // console.log("calculateCandidateTasks");

    let values = calculateCandidateTasks(
      propertyId,
      maintenanceTasks,
      propertyMaintenanceTasks
    );
    dispatch(setCandidateMaintenanceTask(values));
  };

  // console.log(notifyButtonDisable);

  return (
    <>
      {/* <ToastContainer /> */}
      <div
        onClick={handlePropertyDivChange}
        className="sm:mr-20 sm:ml-20 mr-2 ml-2 mt-3 rounded flex flex-row justify-between items-center hover:cursor-pointer property_section overflow-auto"
      >
        <div className="flex items-center flex-row py-2.5 px-3 whitespace-nowrap">
          <BsFillHouseFill className="sm:w-7 sm:h-7 h-5 w-5 text-white flex-shrink-0" />
          <div className="text-white font-semibold text-md ml-2">
            {client.address}
          </div>
        </div>
        <div className="mr-8">
          <MdArrowDropUp
            onClick={handlePropertyDivChange}
            className="w-7 h-7 hover:cursor-pointer text-white"
          />
        </div>
      </div>
      {showPropertyDiv && (
        <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 bg-white min-h-screen flex sm:flex-row flex-col border rounded">
          <div className="sm:w-3/5 bg-white flex flex-col mx-2 my-3 rounded">
            <div className="flex sm:flex-row flex-col">
              <div className="sm:mx-2 my-1 sm:w-1/2 overflow-auto bg-white border rounded-md shadow-md width-fixed">
                <div className="flex flex-row justify-between items-center bg-gray-100">
                  <div className="font-extrabold text-xs my-2.5 mx-3 text-black">
                    OWNER
                  </div>
                  <div className="flex flex-row mx-3 items-center">
                    <div
                      className="sm:flex hidden items-center w-6 h-5 bg-gray-500 rounded-md hover:bg-gray-700 cursor-pointer"
                      onClick={handleOwnerEdit}
                    >
                      <FaPencilAlt className="w-4 h-3 text-white cursor-pointer ml-1" />
                    </div>
                    <div
                      className="sm:hidden flex items-center w-6 h-5 bg-gray-500 rounded-md hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleClientDetailsEditMobile("owner")}
                    >
                      <FaPencilAlt className="w-4 h-3 text-white cursor-pointer ml-1" />
                    </div>
                  </div>
                </div>
                {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                <div className="m-3 overflow-auto">
                  <div className="flex items-center flex-row whitespace-nowrap my-2">
                    <FaUserLarge className="w-4 h-4 text-black mr-3 flex-shrink-0" />
                    {/* <FiUser className="w-4 h-4 text-black mr-3" /> */}
                    <div className="text-md info_style flex-shrink-0">
                      {client.clientInfo.firstName +
                        " " +
                        client.clientInfo.lastName}
                    </div>
                  </div>
                  <div className="flex items-center flex-row whitespace-nowrap my-2">
                    {/* <FiPhone className="w-4 h-4 text-black mr-3" /> */}
                    <FaPhone className="w-4 h-4 text-black mr-3 flex-shrink-0" />
                    <div className="info_style text-md flex-shrink-0">
                      {client.clientInfo.phone}
                    </div>
                  </div>
                  <div className="flex items-center flex-row whitespace-nowrap my-2">
                    <FaEnvelope className="w-4 h-4 text-black mr-3 flex-shrink-0" />
                    <div className="info_style text-md flex-shrink-0">
                      {client.clientInfo.email}
                    </div>
                  </div>
                  {client.clientInfo.dob && (
                    <div className="flex items-center flex-row whitespace-nowrap my-2">
                      <BsFillCake2Fill className="w-4 h-4 text-black mr-3 flex-shrink-0" />
                      <div className="info_style text-md flex-shrink-0">
                        {client.clientInfo.dob}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* </div> */}

              <div className="sm:mr-2 my-1 sm:w-1/2 overflow-auto bg-white border rounded-md shadow-md">
                {/* <div className="m-3"> */}
                <div className="flex flex-row justify-between items-center bg-gray-100">
                  <div className="flex flex-row items-center">
                    <div className="font-extrabold text-xs mx-3 my-2.5 text-black">
                      PARTNER
                    </div>
                  </div>
                  {client.spouseInfo.firstName !== "" && (
                    <div className="flex flex-row items-center mx-3">
                      <div
                        className="flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800 mr-1"
                        onClick={handleParnterDelete}
                      >
                        <FaUserMinus className="w-4 h-2.5 text-white cursor-pointer ml-1" />
                      </div>

                      <div
                        className="sm:flex hidden items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                        onClick={handleParnterEdit}
                      >
                        <FaPencilAlt className="w-4 h-3 text-white cursor-pointer hover:text-sky-800 ml-1" />
                      </div>
                      <div
                        className="sm:hidden flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                        onClick={() => handleClientDetailsEditMobile("partner")}
                      >
                        <FaPencilAlt className="w-4 h-3 text-white cursor-pointer hover:text-sky-800 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                <div className="m-3 overflow-auto">
                  {client.spouseInfo.firstName !== "" &&
                    !showPartnerDeleteForm && (
                      <>
                        <div className="flex items-center flex-row whitespace-nowrap my-2">
                          {/* <FiUser className="w-4 h-4 text-black mr-3" /> */}
                          <FaUserLarge className="w-4 h-4 text-black mr-3 flex-shrink-0" />
                          <div className="info_style text-md flex-shrink-0">
                            {client.spouseInfo.firstName +
                              " " +
                              client.spouseInfo.lastName}
                          </div>
                        </div>
                        <div className="flex items-center flex-row whitespace-nowrap my-2">
                          {/* <FiPhone className="w-4 h-4 text-black mr-3" /> */}
                          <FaPhone className="w-4 h-4 text-black mr-3 flex-shrink-0" />
                          <div className="info_style text-md flex-shrink-0">
                            {client.spouseInfo.phone}
                          </div>
                        </div>
                        <div className="flex items-center flex-row whitespace-nowrap my-2">
                          {/* <FiMail className="w-4 h-4 text-black mr-3" /> */}
                          <FaEnvelope className="w-4 h-4 text-black mr-3 flex-shrink-0" />
                          <div className="info_style text-md flex-shrink-0">
                            {client.spouseInfo.email}
                          </div>
                        </div>
                        {client.spouseInfo.dob && (
                          <div className="flex items-center flex-row whitespace-nowrap my-2">
                            <BsFillCake2Fill className="w-4 h-4 text-black mr-3 flex-shrink-0" />
                            <div className="info_style text-md flex-shrink-0">
                              {client.spouseInfo.dob}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  {showPartnerDeleteForm && (
                    <PersonRemovalConfirmation
                      text={"Are you sure you want to remove the partner?"}
                      confirmed={handlePartnerDeleteConfirmed}
                      cancelled={handleParnterDeleteClose}
                    />
                  )}
                  {client.spouseInfo.firstName === "" && (
                    <>
                      <FaUserPlus
                        onClick={handleParnterEdit}
                        className="sm:flex hidden w-10 h-8 text-gray-700 cursor-pointer hover:text-black"
                      />
                      <FaUserPlus
                        onClick={() => handleClientDetailsEditMobile("partner")}
                        className="sm:hidden flex w-10 h-8 text-gray-700 cursor-pointer hover:text-black"
                      />
                    </>
                  )}
                </div>
              </div>
              {/* </div> */}
            </div>

            <div className="sm:mx-2 my-1 rounded-md overflow-auto bg-white border rounded-md shadow-md">
              {/* <div className="m-3"> */}
              <div className="flex flex-row justify-between items-center bg-gray-100">
                <div className="font-extrabold text-xs my-2.5 mx-3 text-black">
                  PROPERTY
                </div>
                <div className="flex flex-row mx-3">
                  <div
                    className="sm:flex hidden items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                    onClick={handlePropertyEdit}
                  >
                    <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                  </div>
                  <div
                    className="sm:hidden flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                    onClick={() => handleClientDetailsEditMobile("property")}
                  >
                    <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                  </div>
                </div>
              </div>
              {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
              <div className="m-3 overflow-auto">
                <div className="flex items-center flex-row whitespace-nowrap my-2">
                  <div className="block w-40 font-bold text-xs flex-shrink-0">
                    Address
                  </div>
                  <div className="info_style text-md">{client.address}</div>
                </div>
                <div className="flex items-center flex-row whitespace-nowrap my-2">
                  <div className="block w-40 font-bold text-xs">
                    Date of Purchase
                  </div>
                  <div className="info_style text-md">
                    {client.propertyInfo.dop}
                  </div>
                </div>
                <div className="flex items-center flex-row whitespace-nowrap my-2">
                  <div className="block w-40 font-bold text-xs flex-shrink-0">
                    Sales Price
                  </div>
                  <div className="info_style text-md">
                    {formatPrice(client.propertyInfo.purchaseValue)}
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>

            <div className="sm:mx-2 my-1 sm:w-3/5 rounded-md overflow-hidden bg-white border rounded-md shadow-md">
              {/* <div className="m-3"> */}
              <div className="flex flex-row justify-between items-center bg-gray-100">
                <div className="font-extrabold text-xs mx-3 my-2.5 text-black">
                  HOME VALUE
                </div>
                <div className="flex flex-row mx-3">
                  <div
                    className="sm:flex hidden items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                    onClick={handleHomeValueAdd}
                  >
                    <FaPlus className="w-4 h-3 text-white ml-1" />
                  </div>
                  <div
                    className="sm:hidden flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                    onClick={() => handleClientDetailsEditMobile("homevalue")}
                  >
                    <FaPlus className="w-4 h-3 text-white ml-1" />
                  </div>
                </div>
              </div>
              {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
              <div className="m-3">
                {myHomeValue.length > 0 ? (
                  <div className="overflow-hidden overflow-y-auto max-h-80">
                    {myHomeValue.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex items-center flex-row">
                          <div className="flex flex-row items-center w-32 mr-1">
                            <GiMoneyStack className="w-4 h-4 text-black" />
                            <div className="block text-md info_style ml-1">
                              {formatPrice(item.homevalue)}
                            </div>
                          </div>
                          <div className="flex flex-row items-center w-32 mr-1">
                            <MdDateRange className="w-4 h-4 text-black" />
                            <div className="text-md info_style ml-1">
                              {item.date_from}
                            </div>
                          </div>
                          {item.id === homeValueItemToDelete ? (
                            <>
                              <span className="text-sm ml-10 info_style">
                                Sure?
                              </span>
                              <div
                                className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                                onClick={handleHomeValueDelete}
                              >
                                <BsFillCheckCircleFill className=" w-4 h-3 focus:outline-none text-white ml-1" />
                              </div>
                              <div
                                className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                                onClick={handleHomeValueDeleteClosed}
                              >
                                <BsFillXCircleFill className="w-4 h-3 focus:outline-none text-white ml-1" />
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="sm:flex hidden items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-20"
                                onClick={() => handleHomeValueEdit(item)}
                              >
                                <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                              </div>
                              <div
                                className="sm:hidden flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-20"
                                onClick={() =>
                                  handleClientDetailsEditMobile(
                                    "homevalue",
                                    item
                                  )
                                }
                              >
                                <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                              </div>
                              {index !== myHomeValue.length - 1 && (
                                <div
                                  className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                                  onClick={() =>
                                    handleHomeValueDeleteClicked(item)
                                  }
                                >
                                  <FaTrashAlt className="w-4 h-3 text-white ml-1" />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <hr className="mx-4 border-gray-300 my-2.5" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="info_style text-xs">No Data</div>
                )}
              </div>
              {/* </div> */}
            </div>

            <div className="sm:mx-2 my-1 bg-white overflow-hidden border rounded-md shadow-md">
              {/* <div className="m-3"> */}
              <div className="flex flex-row justify-between items-center bg-gray-100">
                <div className="font-bold text-xs mx-3 my-2.5 text-black">
                  LOAN INFORMATION
                </div>
                <div className="flex flex-row mx-3">
                  <div
                    className="sm:flex hidden items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                    onClick={handleLoanEdit}
                  >
                    <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                  </div>
                  <div
                    className="sm:hidden flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                    onClick={() => handleClientDetailsEditMobile("loan")}
                  >
                    <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                  </div>
                </div>
              </div>
              {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
              <div className="m-3 overflow-auto">
                {client.lenderInfo.paymentType === "cash" && (
                  <div className="info_style text-xs custom_italic">
                    Paid by Cash
                  </div>
                )}

                {client.lenderInfo.paymentType === "loan" &&
                  client.lenderInfo.manual.loanAmount === "" && (
                    <div className="info_style text-xs custom_italic">
                      No Information Provided. Asking Lender
                    </div>
                  )}

                {client.lenderInfo.paymentType === "loan" &&
                  client.lenderInfo.manual.loanAmount !== "" && (
                    <>
                      <div className="flex items-center flex-row whitespace-nowrap my-2">
                        <div className="block w-56 font-bold text-xs flex-shrink-0">
                          Loan Value
                        </div>
                        <div className="info_style text-md">
                          {`${formatPrice(
                            client.lenderInfo.manual.loanAmount
                          )} At ${client.lenderInfo.manual.apr}% For ${
                            client.lenderInfo.manual.years
                          } Years, started on ${client.propertyInfo.dop}`}
                          {/* $5,00,000 At 4% For 30 Years */}
                        </div>
                      </div>
                      <div className="flex items-center flex-row my-2">
                        <div className="block w-56 font-bold text-xs">
                          Mortage Insurance (PMI or MI)
                        </div>
                        <div className="info_style text-md">
                          {client.lenderInfo.manual.isMortgageInsurance ===
                          "yes"
                            ? "Yes"
                            : "No"}
                        </div>
                      </div>
                      {client.lenderInfo.manual.isMortgageInsurance ===
                        "yes" && (
                        <>
                          {" "}
                          <div className="flex items-center flex-row my-2">
                            <div className="block w-56 font-bold text-xs">
                              Monthly Mortgage Insurance
                            </div>
                            <div className="info_style text-md">
                              {formatPrice(
                                client.lenderInfo.manual.monthlyMortgage
                              )}
                            </div>
                          </div>
                          <div className="flex items-center flex-row whitespace-nowrap my-2">
                            <div className="block w-56 font-bold text-xs flex-shrink-0">
                              Monthly Mortgage Removal
                            </div>
                            {client.lenderInfo.manual.mortgageRemovalBasis ===
                              "years" && (
                              <div className="info_style text-md">
                                After {client.lenderInfo.manual.mortgageYears}{" "}
                                Years
                              </div>
                            )}
                            {client.lenderInfo.manual.mortgageRemovalBasis ===
                              "equity" && (
                              <div className="info_style text-md">
                                After {client.lenderInfo.manual.mortgageEquity}%
                                Equity is Reached
                              </div>
                            )}
                            {client.lenderInfo.manual.mortgageRemovalBasis ===
                              "never" && (
                              <div className="info_style text-md">
                                Never removed, its for the life of the loan
                              </div>
                            )}
                          </div>
                        </>
                      )}{" "}
                    </>
                  )}
              </div>
              {/* </div> */}
            </div>

            <div className="sm:mx-2 my-1 overflow-hidden bg-white border rounded-md shadow-md">
              {/* <div className="m-3"> */}
              <div className="flex flex-row justify-between items-center bg-gray-100">
                <div className="font-bold text-xs mx-3 my-2.5 text-black">
                  RENTAL INFORMATION
                </div>
                {/* <div>
                    {!client.propertyInfo.airbnbAmount ||
                      (!client.propertyInfo.rentalAmount && (
                        <FaPlus
                          onClick={handleRentalValueAdd}
                          className="w-4 h-4 text-green-500 cursor-pointer hover:text-green-800"
                        />
                      ))}
                  </div> */}
              </div>
              {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}

              <div className="m-3 overflow-auto">
                <div className="flex items-center flex-row whitespace-nowrap my-2">
                  <div className="flex flex-row items-center block sm:w-56 w-48 font-bold text-xs flex-shrink-0">
                    Monthly Rental Value
                    {!client.propertyInfo.rentalAmount && (
                      <div
                        className="flex items-center w-6 h-6 bg-gray-500 rounded-md hover:bg-black cursor-pointer ml-3"
                        onClick={() => handleRentalValueEdit("rental")}
                      >
                        <FaPlus className="w-4 h-3 text-white ml-1" />
                      </div>
                    )}
                  </div>

                  {client.propertyInfo.rentalAmount ? (
                    <>
                      <div className="flex flex-row items-center sm:w-24 w-20">
                        <div className="block sm:text-base text-xs info_style">
                          {formatPrice(client.propertyInfo.rentalAmount)}
                        </div>
                      </div>
                      <div className="flex flex-row items-center sm:w-32 w-24 ml-2">
                        <MdDateRange className="sm:w-4 sm:h-4 h-3 w-3 text-black flex-shrink-0" />
                        <div className="sm:text-base text-sm info_style sm:ml-1">
                          {client.propertyInfo.rentalDate}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="info_style custom_italic text-xs">
                      No Data Provided
                    </div>
                  )}
                  {rentalValueItemToDelete === "rental" ? (
                    <>
                      <span className="sm:text-sm text-xs info_style ml-2">
                        Sure?
                      </span>
                      <div
                        className="flex items-center sm:w-6 sm:h-6 w-6 h-5 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                        onClick={handleRentalValueDelete}
                      >
                        <BsFillCheckCircleFill className="w-4 h-3 text-white ml-1" />
                      </div>
                      <div
                        className="flex items-center sm:w-6 sm:h-6 w-6 h-5 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                        onClick={handleRentalValueDeleteClosed}
                      >
                        <BsFillXCircleFill className="w-4 h-3 text-white ml-1" />
                      </div>
                    </>
                  ) : client.propertyInfo.rentalAmount ? (
                    <>
                      <div
                        className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-10 mr-1"
                        onClick={() => handleRentalValueEdit("rental")}
                      >
                        <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                      </div>
                      <div
                        className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black"
                        onClick={() => handleRentalValueDeleteClicked("rental")}
                      >
                        <FaTrashAlt className="w-4 h-3 text-white ml-1" />
                      </div>
                    </>
                  ) : (
                    <></>
                    // <div className="hover:bg-green-700 flex items-center w-6 h-6 bg-green-200 rounded-md cursor-pointer ml-2">
                    //   <FaPlus
                    //     onClick={() => handleRentalValueEdit("rental")}
                    //     className="w-4 h-4 text-green-500 cursor-pointer ml-1"
                    //   />
                    // </div>
                  )}
                </div>

                <div className="flex items-center flex-row whitespace-nowrap my-2">
                  <div className="flex flex-row items-center block sm:w-56 w-48 font-bold text-xs flex-shrink-0">
                    Monthly AirBnB Value
                    {!client.propertyInfo.airbnbAmount && (
                      <div
                        className="flex items-center w-6 h-6 bg-gray-500 rounded-md hover:bg-black cursor-pointer ml-2"
                        onClick={() => handleRentalValueEdit("airbnb")}
                      >
                        <FaPlus className="w-4 h-3 text-white ml-1" />
                      </div>
                    )}
                  </div>
                  {client.propertyInfo.airbnbAmount ? (
                    <>
                      <div className="flex flex-row items-center sm:w-24 w-20">
                        <div className="block sm:text-base text-xs info_style">
                          {formatPrice(client.propertyInfo.airbnbAmount)}
                        </div>
                      </div>
                      <div className="flex flex-row items-center sm:w-32 w-24 ml-2">
                        <MdDateRange className="sm:w-4 sm:h-4 h-3 w-3 text-black flex-shrink-0" />
                        <div className="sm:text-base text-sm info_style sm:ml-1">
                          {client.propertyInfo.airbnbDate}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="info_style custom_italic text-xs">
                      No Data Provided
                    </div>
                  )}
                  {rentalValueItemToDelete === "airbnb" ? (
                    <>
                      <span className="text-sm info_style">Sure?</span>
                      <div
                        className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                        onClick={handleRentalValueDelete}
                      >
                        <BsFillCheckCircleFill className="w-4 h-3 text-white ml-1" />
                      </div>
                      <div
                        className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                        onClick={handleRentalValueDeleteClosed}
                      >
                        <BsFillXCircleFill className="w-4 h-3 text-white ml-1" />
                      </div>
                    </>
                  ) : client.propertyInfo.airbnbAmount ? (
                    <>
                      <div
                        className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-10 mr-1"
                        onClick={() => handleRentalValueEdit("airbnb")}
                      >
                        <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                      </div>
                      <div
                        className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black"
                        onClick={() => handleRentalValueDeleteClicked("airbnb")}
                      >
                        <FaTrashAlt className="w-4 h-3 text-white ml-1" />
                      </div>
                    </>
                  ) : (
                    <></>
                    // <div className="flex items-center w-6 h-6 bg-green-100 rounded-md cursor-pointer ml-4">
                    //   <FaPlus
                    //     onClick={() => handleRentalValueEdit("airbnb")}
                    //     className="w-4 h-3.5 text-green-700 hover:text-green-900 cursor-pointer ml-1"
                    //   />
                    // </div>
                  )}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>

          {/* Second Section */}
          <div className="sm:w-2/5 bg-white flex flex-col my-3 mx-2 rounded">
            <div className="sm:mx-2 my-1 rounded-md">
              <button
                onClick={handleShowMaintenanceTaskPage}
                className="bg-sky-500 border text-white px-2.5 py-2.5 text-sm rounded font-semibold flex items-center button_color"
              >
                {/* <img
                  className="w-4 h-3 mr-2"
                  src="/../asset/images/maintb_icon.png"
                  alt="icon"
                /> */}
                <FaScrewdriverWrench className="w-6 h-5 text-white mr-1" />
                Maintenance Items
              </button>
            </div>

            <div className="sm:mx-2 my-1 rounded-md overflow-hidden bg-white border shadow-md">
              {/* <div className="m-3"> */}
              <div className="flex flex-row justify-between items-center bg-gray-100">
                <div className="font-bold text-xs flex flex-row items-center mx-3 my-2.5 text-black">
                  {/* <img
                      className="w-4 h-3 mr-1"
                      src="/../asset/images/it1_old.png"
                      alt="icon"
                    /> */}
                  LENDER
                </div>
                {myLender && (
                  <div className="flex flex-row mx-3">
                    <div
                      className="flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800 mr-1"
                      onClick={handleLenderDelete}
                    >
                      <FaUserMinus className="w-4 h-2.5 text-white ml-1" />
                    </div>
                    <div
                      className="sm:flex hidden items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                      onClick={handleLenderEdit}
                    >
                      <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                    </div>
                    <div
                      className="sm:hidden flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                      onClick={() => handleClientDetailsEditMobile("lender")}
                    >
                      <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                    </div>
                  </div>
                )}

                {/* <div className="flex flex-row"> */}
                {/* <div className="flex items-center">
                      <input
                        id="toggleLender"
                        type="checkbox"
                        className="hidden"
                        checked={isLenderChecked}
                        onChange={handleLenderToggle}
                      />
                      <label
                        htmlFor="toggleLender"
                        className="flex items-center cursor-pointer"
                      >
                        <div className="relative">
                          <div
                            className={`w-8 h-4 rounded-md shadow-inner ${
                              isLenderChecked ? " bg-blue-500" : "bg-gray-500"
                            }`}
                          ></div>
                          <div
                            className={`dot absolute w-4 h-4 bg-white rounded-md shadow top-0 left-0 transition-transform ${
                              isLenderChecked ? "translate-x-full" : ""
                            }`}
                          ></div>
                        </div>
                      </label>
                    </div> */}
                {/* {myLender && (
                    <div className="hover:bg-sky-700 flex items-center w-6 h-6 bg-sky-100 rounded-md cursor-pointer">
                      <FaPencilAlt
                        onClick={handleLenderEdit}
                        className="w-4 h-4 text-sky-500 ml-1"
                      />
                    </div>
                  )} */}
                {/* </div> */}
              </div>
              <div className="m-3">
                {isLenderChecked && !myLender && (
                  <>
                    {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                    <FaUserPlus
                      onClick={handleLenderEdit}
                      className="sm:flex hidden w-8 h-8 text-gray-700 cursor-pointer hover:text-black"
                    />
                    <FaUserPlus
                      onClick={() => handleClientDetailsEditMobile("lender")}
                      className="sm:hidden flex w-8 h-8 text-gray-700 cursor-pointer hover:text-black"
                    />
                  </>
                )}

                {showLenderDeleteForm && (
                  <>
                    {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                    <PersonRemovalConfirmation
                      text={"Are you sure you want to remove the lender?"}
                      confirmed={handleLenderDeleteConfirmed}
                      cancelled={handleLenderDeleteClose}
                    />
                    {/* <div className="flex flex-col my-2">
                      <div className="text-sm info_style">
                        Are you sure you want to remove the lender?
                      </div>
                      <div className="flex flex-row mt-2">
                        <div
                          className="flex items-center w-7 h-7 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800 mr-1"
                          onClick={handleLenderDeleteConfirmed}
                        >
                          <BsFillCheckCircleFill className=" w-5 h-4 focus:outline-none text-white ml-1" />
                        </div>
                        <div
                          className="flex items-center w-7 h-7 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                          onClick={handleLenderDeleteClose}
                        >
                          <BsFillXCircleFill className="w-5 h-4 focus:outline-none text-white ml-1" />
                        </div>
                      </div>
                    </div> */}
                  </>
                )}

                {isLenderChecked && myLender && !showLenderDeleteForm && (
                  <>
                    {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                    <div className="flex items-center flex-row my-2">
                      <FaUserLarge className="w-4 h-3.5 text-black mr-3" />
                      <div className="info_style text-md">{myLender.name}</div>
                    </div>
                    <div className="flex items-center flex-row my-2">
                      <FaPhone className="w-4 h-3.5 text-black mr-3" />
                      <div className="info_style text-md">
                        {myLender.cellnumber}
                      </div>
                    </div>
                    <div className="flex items-center flex-row my-2">
                      <FaEnvelope className="w-4 h-3.5 text-black mr-3" />
                      <div className="info_style text-md">{myLender.email}</div>
                    </div>
                    <div className="flex items-center flex-row my-2">
                      <FaBuilding className="w-4 h-4 text-black mr-3" />
                      <div className="info_style text-md">
                        {myLender.companyname}
                      </div>
                    </div>
                  </>
                )}
                {/* </div> */}
              </div>
            </div>

            <div className="sm:mx-2 my-1 rounded-md overflow-hidden bg-white border shadow-md">
              {/* <div className="m-3 min-h-20"> */}
              <div className="flex flex-row justify-between items-center bg-gray-100">
                <div className="font-bold text-xs flex flex-row items-center mx-3 my-2.5 text-black">
                  {/* <div>
                      <img
                        className="w-3 h-3 mr-1"
                        src="/../asset/images/it2.png"
                        alt="icon"
                      />
                    </div> */}
                  HOME INSPECTOR
                </div>
                {myInspector && (
                  <div className="flex flex-row mx-3">
                    <div
                      className="flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800 mr-1"
                      onClick={handleInspectorDelete}
                    >
                      <FaUserMinus className="w-4 h-2.5 text-white ml-1" />
                    </div>
                    <div
                      className="sm:flex hidden items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                      onClick={handleInspectorEdit}
                    >
                      <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                    </div>
                    <div
                      className="sm:hidden flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                      onClick={() => handleClientDetailsEditMobile("inspector")}
                    >
                      <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                    </div>
                  </div>
                )}

                {/* <div className="flex flex-row">
                  {myInspector && (
                    <FaPencilAlt
                      onClick={handleInspectorEdit}
                      className="w-4 h-4 text-sky-600 cursor-pointer hover:text-sky-800 ml-2"
                    />
                  )}
                </div> */}
              </div>
              <div className="m-3">
                {isInspectorChecked && !myInspector && (
                  <>
                    {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                    <FaUserPlus
                      onClick={handleInspectorEdit}
                      className="sm:flex hidden w-8 h-8 text-gray-700 cursor-pointer hover:text-black"
                    />
                    <FaUserPlus
                      onClick={() => handleClientDetailsEditMobile("inspector")}
                      className="sm:hidden flex w-8 h-8 text-gray-700 cursor-pointer hover:text-black"
                    />
                  </>
                )}
                {showInspectorDeleteForm && (
                  <>
                    {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                    <PersonRemovalConfirmation
                      text={
                        "Are you sure you want to remove the home inspector?"
                      }
                      confirmed={handleInspectorDeleteConfirmed}
                      cancelled={handleInspectorDeleteClose}
                    />
                    {/* <div className="flex flex-col my-2">
                      <div className="text-sm info_style">
                        Are you sure you want to remove the home inspector?
                      </div>
                      <div className="flex flex-row mt-2">
                        <BsFillCheckCircleFill
                          className=" w-6 h-6 focus:outline-none cursor-pointer text-green-500 hover:text-green-800"
                          onClick={handleInspectorDeleteConfirmed}
                        />
                        <BsFillXCircleFill
                          className="w-6 h-6 focus:outline-none cursor-pointer text-red-500 hover:text-red-800 ml-1"
                          onClick={handleInspectorDeleteClose}
                        />
                      </div>
                    </div> */}
                  </>
                )}

                {isInspectorChecked &&
                  myInspector &&
                  !showInspectorDeleteForm && (
                    <>
                      {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                      <div className="flex items-center flex-row my-2">
                        {/* <FiUser className="w-4 h-3.5 text-black mr-3" /> */}
                        <FaUserLarge className="w-4 h-3.5 text-black mr-3" />
                        <div className="info_style text-md">
                          {myInspector.name}
                        </div>
                      </div>
                      <div className="flex items-center flex-row my-2">
                        <FaPhone className="w-4 h-3.5 text-black mr-3" />
                        <div className="info_style text-md">
                          {myInspector.cellnumber}
                        </div>
                      </div>
                      <div className="flex items-center flex-row my-2">
                        <FaEnvelope className="w-4 h-3.5 text-black mr-3" />
                        <div className="info_style text-md">
                          {myInspector.email}
                        </div>
                      </div>
                      {myInspector.companyname && (
                        <div className="flex items-center flex-row my-2">
                          <FaBuilding className="w-4 h-4 text-black mr-3" />
                          <div className="info_style text-md">
                            {myInspector.companyname}
                          </div>
                        </div>
                      )}
                    </>
                  )}
              </div>
              {/* </div> */}
            </div>

            <div className="sm:mx-2 my-1 rounded-md overflow-hidden bg-white border shadow-md">
              {/* <div className="m-3 min-h-20"> */}
              <div className="flex flex-row justify-between items-center bg-gray-100">
                <div className="font-bold text-xs flex flex-row items-center mx-3 my-2.5 text-black">
                  {/* <img
                      className="w-4 h-3 mr-1"
                      src="/../asset/images/it1.png"
                      alt="icon"
                    /> */}
                  TITLE COMPANY
                </div>
                {myTitle && (
                  <div className="flex flex-row mx-3">
                    <div
                      className="flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800 mr-1"
                      onClick={handleTitleDelete}
                    >
                      <FaUserMinus className="w-4 h-2.5 text-white ml-1" />
                    </div>
                    <div
                      className="sm:flex hidden items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                      onClick={handleTitleEdit}
                    >
                      <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                    </div>
                    <div
                      className="sm:hidden flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                      onClick={() => handleClientDetailsEditMobile("title")}
                    >
                      <FaPencilAlt className="w-4 h-3 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>
              <div className="m-3">
                {isTitleChecked && !myTitle && (
                  <>
                    {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                    <FaUserPlus
                      onClick={handleTitleEdit}
                      className="sm:flex hidden w-8 h-8 text-gray-700 cursor-pointer hover:text-black"
                    />
                    <FaUserPlus
                      onClick={() => handleClientDetailsEditMobile("title")}
                      className="sm:hidden flex w-8 h-8 text-gray-700 cursor-pointer hover:text-black"
                    />
                  </>
                )}

                {showTitleDeleteForm && (
                  <>
                    {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                    <PersonRemovalConfirmation
                      text={
                        "Are you sure you want to remove the title company?"
                      }
                      confirmed={handleTitleDeleteConfirmed}
                      cancelled={handleTitleDeleteClose}
                    />
                    {/* <div className="flex flex-col my-2">
                      <div className="text-sm info_style">
                        Are you sure you want to remove the title company?
                      </div>
                      <div className="flex flex-row mt-2">
                        <BsFillCheckCircleFill
                          className=" w-6 h-6 focus:outline-none cursor-pointer text-green-500 hover:text-green-800"
                          onClick={handleTitleDeleteConfirmed}
                        />
                        <BsFillXCircleFill
                          className="w-6 h-6 focus:outline-none cursor-pointer text-red-500 hover:text-red-800 ml-1"
                          onClick={handleTitleDeleteClose}
                        />
                      </div>
                    </div> */}
                  </>
                )}

                {isTitleChecked && myTitle && !showTitleDeleteForm && (
                  <>
                    {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
                    <div className="flex items-center flex-row my-2">
                      <FaUserLarge className="w-4 h-3.5 text-black mr-3" />
                      <div className="info_style text-md">{myTitle.name}</div>
                    </div>
                    <div className="flex items-center flex-row my-2">
                      <FaPhone className="w-4 h-3.5 text-black mr-3" />
                      <div className="info_style text-md">
                        {myTitle.cellnumber}
                      </div>
                    </div>
                    <div className="flex items-center flex-row my-2">
                      <FaEnvelope className="w-4 h-3.5 text-black mr-3" />
                      <div className="info_style text-md">{myTitle.email}</div>
                    </div>
                    {myTitle.companyname && (
                      <div className="flex items-center flex-row my-2">
                        <FaBuilding className="w-4 h-4 text-black mr-3" />
                        <div className="info_style text-md">
                          {myTitle.companyname}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* </div> */}
            </div>

            <div className="sm:mx-2 my-1 rounded-md overflow-hidden bg-white border shadow-md">
              {/* <div className="m-3"> */}
              <div className="flex flex-row justify-between items-center bg-gray-100">
                <div className="font-bold text-xs flex flex-row items-center mx-3 my-2.5 text-black">
                  {/* <img
                      className="w-3 h-3 mr-1"
                      src="/../asset/images/it3.png"
                      alt="icon"
                    /> */}
                  DOCUMENTS (~30 Mb)
                </div>
                <div className="flex flex-row mx-3">
                  <div
                    className="sm:flex hidden items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                    onClick={handleFileAdd}
                  >
                    <FaPlus className="w-4 h-3 text-white ml-1" />
                  </div>
                  <div
                    className="sm:hidden flex items-center w-6 h-5 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
                    onClick={() => handleClientDetailsEditMobile("doc")}
                  >
                    <FaPlus className="w-4 h-3 text-white ml-1" />
                  </div>
                </div>
              </div>
              {/* <hr className=" border-t-1 border-gray-600 mb-3" /> */}
              {/* <div className="m-3">
                {!myDocs.length ? (
                  <div className="flex items-center flex-row my-2">
                    <div className="info_style text-xs custom_italic">
                      No Documents Added
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden overflow-y-auto max-h-60">
                    {myDocs.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-center flex-row justify-between">
                          <div className="flex flex-row items-center">
                            <img
                              className="w-5 h-5 mr-2"
                              src={getDocImg(item.extension)}
                              alt="docImg"
                            />
                            <div
                              className="block text-md info_style cursor-pointer hover:underline"
                              onClick={() =>
                                handleFileDownload(
                                  item.uuid,
                                  item.name,
                                  item.extension
                                )
                              }
                            >
                              {item.name}
                            </div>
                          </div>
                          {item.id === documentToDelete ? (
                            <div className="flex flex-row">
                              <span className="text-sm info_style">Sure?</span>
                              <div
                                className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                                onClick={handleDocumentDelete}
                              >
                                <BsFillCheckCircleFill className="w-4 h-3 focus:outline-none text-white ml-1" />
                              </div>
                              <div
                                className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                                onClick={() => setDocumentToDelete(null)}
                              >
                                <BsFillXCircleFill className="w-4 h-3 focus:outline-none text-white ml-1" />
                              </div>
                            </div>
                          ) : (
                            <div
                              className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                              onClick={() => setDocumentToDelete(item.id)}
                            >
                              <FaTrashAlt className="w-4 h-3 text-white ml-1" />
                            </div>
                          )}
                        </div>
                        <hr className="mx-4 border-gray-300 my-2.5" />
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
              <DocumentSection
                parentClass="m-3"
                fileNameSize="text-md"
                fileNameTextLimit={30}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mb-3"></div>
      {showOwnerEdit && (
        <>
          <OwnerInfoModal onClose={handleOwnerEditClose} />
        </>
      )}

      {showPartnerEdit && (
        <>
          <PartnerInfoModal onClose={handlePartnerEditClose} />
        </>
      )}

      {showPropertyEdit && (
        <>
          <PropertyInfoModal onClose={handlePropertyEditClose} />
        </>
      )}

      {showHomeValueEdit && (
        <>
          <HomeValueModal
            title="Edit Home Value"
            item={homeValueSelectedEdit}
            onClose={handleHomeValueEditClose}
          />
        </>
      )}

      {showHomeValueAdd && (
        <>
          <HomeValueModal
            title="Add Home Value"
            item={null}
            // onSubmit={handleHomeValueAddSubmit}
            onClose={handleHomeValueAddClose}
          />
        </>
      )}

      {showLoanEdit && (
        <>
          <LoanInfoModal onClose={handleLoanEditClose} />
        </>
      )}

      {showRentalValueEdit && (
        <>
          <RentalValue
            title="Edit Rental Value"
            item={rentalValueSelectedEdit}
            onClose={handleRentalValueEditClose}
          />
        </>
      )}

      {showRentalValueAdd && (
        <>
          <RentalValue
            title="Add Rental Value"
            item={null}
            // onSubmit={handleHomeValueAddSubmit}
            onClose={handleRentalValueAddClose}
          />
        </>
      )}

      {showLenderEdit && (
        <>
          <LenderInfoModal onClose={handleLenderEditClose} />
        </>
      )}

      {showTitleEdit && (
        <>
          <TitleInfoModal onClose={handleTitleEditClose} />
        </>
      )}

      {showInspectorEdit && (
        <>
          <InspectorInfoModal onClose={handleInspectorEditClose} />
        </>
      )}

      {showFileAdd && (
        <>
          <DocumentInfoModal onClose={onFileUploadCancel} />
        </>
      )}
    </>
  );
}

export default PropertySection;
