import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { BsEnvelopeArrowUpFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import "tailwindcss/tailwind.css";

import {
  setShowClientDetails,
  setShowCientPreview,
  setGraphFullData,
  setAddPropertyInvite,
} from "../../../store";
import PropertySection from "../property/PropertySection";
import CommunicationSection from "../property/CommunicationSection";
import ReqAndHistorySection from "../property/ReqAndHistorySection";
import Alerts from "../property/Alerts";
import createApi from "../../../utils/api";
import ToolTip from "../../common/Tooltip";
import HomeButton from "../../common/HomeButton";

function ViewClient({ back, handleClientDetailsEditMobile }) {
  const api = createApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notifyButtonDisable, setNotifyButtonDisable] = useState(false);

  const owner = useSelector((state) => {
    return state.client.data.clientInfo;
  });

  const partner = useSelector((state) => {
    return state.client.data.spouseInfo;
  });

  const loan = useSelector((state) => {
    return state.client.data.lenderInfo.manual;
  });

  const clientId = useSelector((state) => {
    return state.client.data.id;
  });

  const homeValue = useSelector((state) => {
    return state.homeValue.data;
  });

  const propertyApprRate = useSelector((state) => {
    return state.generic.data.propertyApprRate;
  });

  const agent = useSelector((state) => {
    return state.profile.data;
  });

  const invitationProperties = useSelector((state) => {
    return state.invitationProperties.data;
  });

  const propertyInviteObj = invitationProperties.find(
    (item) => item.property_id === clientId
  );
  // console.log(propertyInviteObj);

  let myHomeValue = [];
  if (homeValue[clientId]) {
    myHomeValue = [...homeValue[clientId]].sort((a, b) => {
      return new Date(a.date_from) - new Date(b.date_from);
    });
  }

  const handleShowClientPreview = () => {
    dispatch(
      setGraphFullData({
        loanAmount: loan.loanAmount,
        purchaseDate: myHomeValue[0].date_from,
        homeValue: myHomeValue[0].homevalue,
        loanTerm: loan.years,
        interestRate: loan.apr,
        agentUpdatedHomeValues: myHomeValue,
        propertyApprRate,
      })
    );
    dispatch(setShowClientDetails(false));
    dispatch(setShowCientPreview(true));
  };

  const handleNotifyOwner = () => {
    setNotifyButtonDisable(true);
    let formData = new FormData();

    formData.append("id", clientId);
    formData.append("fname", owner.firstName);
    formData.append("email", owner.email);
    formData.append("agentName", agent.name);
    formData.append("agentId", agent.id);
    api
      .post("/api/notify_owner", formData)
      .then((response) => {
        setNotifyButtonDisable(false);
        if (response.data.status === "success") {
          toast.success("Notified through email");
          dispatch(setAddPropertyInvite(response.data));
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

  const getName = () => {
    let name = owner.firstName + " " + owner.lastName;
    if (partner.firstName) {
      name = name + " & " + partner.firstName + " " + partner.lastName;
    }
    return name;
  };

  return (
    <>
      <div style={{ background: "#f2f7f9" }}>
        {/* <button
          onClick={back}
          className="mx-20 mt-8 bg-sky-500 border text-white px-1.5 py-1.5 text-xs font-bold rounded"
        >
          {"<"} Back To Properties
        </button> */}
        <div className="sm:mr-20 sm:ml-20 pt-9 mr-2 ml-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center sm:w-auto w-3/4">
            <div
              className="flex items-center sm:w-9 sm:h-8 w-6 h-6 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800 sm:mr-4 mr-2"
              onClick={back}
            >
              <FaArrowLeftLong className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer sm:ml-2 ml-1 text-white" />
            </div>
            <div className="flex sm:text-3xl text-lg font-bold mr-2 overflow-auto sm:w-auto w-4/5">
              <div className="whitespace-nowrap">{getName()}</div>
            </div>
            {propertyInviteObj && propertyInviteObj.status === "invited" && (
              <>
                {/* <div className="sm:flex hidden items-center justify-center sm:h-6 h-6 px-3 bg-sky-200 sm:space-y-2 rounded">
                  <div className="text-xs font-extrabold text-gray-800">
                    Account Invitation Sent!
                  </div>
                </div> */}
                <MdVerified
                  data-tooltip-id="notified-owner"
                  data-tooltip-content="Account Invitation Sent!"
                  data-tooltip-place="top"
                  className="w-6 h-7 text-gray-500 sm:mr-2"
                />
                <ToolTip id="notified-owner" />
                <BsEnvelopeArrowUpFill
                  data-tooltip-id="notify-owner1"
                  data-tooltip-content="Notify Again!"
                  data-tooltip-place="top"
                  onClick={!notifyButtonDisable ? handleNotifyOwner : undefined}
                  className={`w-6 h-6 ${
                    notifyButtonDisable
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-500 cursor-pointer"
                  } hover:text-green-700`}
                />
                <ToolTip id="notify-owner1" />
              </>
            )}

            {propertyInviteObj && propertyInviteObj.status === "accepted" && (
              <>
                <MdVerified
                  data-tooltip-id="verfied-owner"
                  data-tooltip-content="Account Invitation Accepted!"
                  data-tooltip-place="top"
                  className="w-6 h-7 text-green-500"
                />
                <ToolTip id="verfied-owner" />
              </>
            )}

            {!propertyInviteObj && (
              <>
                <BsEnvelopeArrowUpFill
                  data-tooltip-id="notify-owner2"
                  data-tooltip-content="Send Account Invite!"
                  data-tooltip-place="top"
                  onClick={!notifyButtonDisable ? handleNotifyOwner : undefined}
                  className={`w-6 h-6 ${
                    notifyButtonDisable
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-500 cursor-pointer"
                  } mr-2`}
                />
                <ToolTip id="notify-owner2" />
              </>
            )}
          </div>

          <div className="sm:hidden flex flex-row items-center">
            <button
              onClick={handleShowClientPreview}
              className="bg-sky-500 border text-white px-1 py-1 text-sm rounded font-semibold flex items-center button_color"
            >
              <IoMdEye className="w-6 h-5 text-white" />
            </button>
            {/* <div className="flex items-center w-8 h-7 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800">
              <HiHome
                className="w-6 h-5 text-white cursor-pointer ml-1"
                onClick={() => navigate("/")}
              />
            </div> */}
            <HomeButton />
          </div>

          <div className="sm:flex hidden flex-row space-x-1">
            <button
              onClick={handleShowClientPreview}
              className="bg-sky-500 border text-white px-2 py-2 text-sm rounded font-semibold flex items-center button_color"
            >
              <IoMdEye className="w-6 h-5 text-white mr-1" />
              Preview Client Side
            </button>
            <HomeButton />

            {/* <div className="flex items-center w-10 h-9 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800">
              <HiHome
                className="w-8 h-6 text-white cursor-pointer ml-1"
                onClick={() => navigate("/")}
              />
            </div> */}
            {/* <button
            // onClick={back}
            className="bg-sky-500 border text-white px-2 py-2 text-sm font-semibold rounded flex items-center"
          >
            <FaScrewdriverWrench className="w-6 h-5 text-white mr-1" />
            Maintenance
          </button> */}
          </div>
        </div>
        <Alerts />
        <PropertySection
          handleClientDetailsEditMobile={handleClientDetailsEditMobile}
        />
        <CommunicationSection />
        <ReqAndHistorySection />
      </div>
    </>
  );
}

export default ViewClient;
