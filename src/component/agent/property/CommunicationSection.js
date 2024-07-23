import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { BsFillCake2Fill } from "react-icons/bs";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

import createApi from "../../../utils/api";
import { formatDate } from "../../../utils/helpers";
// import "tailwindcss/tailwind.css";

import {
  setViewClientData,
  setDeleteHomeValue,
  setUpdateProperty,
} from "../../../store";

function CommunicationSection() {
  const [expandSection, setExpandSection] = useState(false);
  const [commMethodOwner, setCommMethodOwner] = useState("email");
  const [bdayTextOwner, setBdayTextOwner] = useState(false);
  const [commMethodPartner, setCommMethodPartner] = useState("email");
  const [bdayTextPartner, setBdayTextPartner] = useState(false);

  const api = createApi();
  const dispatch = useDispatch();

  const profile = useSelector((state) => {
    return state.profile.data;
  });

  const owner = useSelector((state) => {
    return state.client.data.clientInfo;
  });

  const partner = useSelector((state) => {
    return state.client.data.spouseInfo;
  });

  const ownerBday = owner.dob ? formatDate(new Date(owner.dob)) : null;
  const partnerBday = partner.dob ? formatDate(new Date(partner.dob)) : null;

  const handleExpandSection = () => {
    setExpandSection(!expandSection);
  };

  const handleOwnerCommMethodChange = (event) => {
    setCommMethodOwner(event.target.value);
  };

  const handleOwnerBdayTextChange = (event) => {
    // console.log(event.target.checked);
    setBdayTextOwner(event.target.checked);
  };

  const handlePartnerCommMethodChange = (event) => {
    setCommMethodPartner(event.target.value);
  };

  const handlePartnerBdayTextChange = (event) => {
    // console.log(event.target.checked);
    setBdayTextPartner(event.target.checked);
  };

  return (
    <>
      <div
        onClick={handleExpandSection}
        className="sm:mr-20 sm:ml-20 mr-2 ml-2 rounded flex flex-row justify-between items-center hover:cursor-pointer property_section"
      >
        <div className="flex items-center flex-row py-2.5 px-3">
          {/* <BsFillHouseFill className="w-7 h-7 text-sky-400" /> */}
          <div className="text-white font-semibold text-md ml-2">
            COMMUNICATION
          </div>
        </div>
        <div className="mr-8">
          <MdArrowDropUp className="w-7 h-7 hover:cursor-pointer text-white" />
        </div>
      </div>
      <div className="mb-3">
        {expandSection && (
          <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 bg-white flex sm:flex-row flex-col border rounded">
            <div className="sm:w-1/4 bg-stone-100 flex flex-col sm:ml-4 my-3 border rounded sm:mr-2">
              <div className="m-3">
                <div className="flex items-center flex-row my-2">
                  {/* <FiUser className="w-4 h-4 text-black mr-3" /> */}
                  <div className="text-black text-md font-semibold">
                    {owner.firstName + " " + owner.lastName}
                  </div>
                </div>
                {partnerBday && !ownerBday && (
                  <div className="flex items-center flex-row my-2 min-h-5"></div>
                )}

                {ownerBday && (
                  <div className="flex items-center flex-row my-2">
                    <BsFillCake2Fill className="w-4 h-4 text-black mr-3" />
                    <div className="info_style text-sm">{ownerBday}</div>
                  </div>
                )}
                <div className="flex items-center flex-row my-2">
                  <FaPhone className="w-4 h-4 text-black mr-3" />
                  <div className="info_style text-sm">{owner.phone}</div>
                </div>
                <div className="flex items-center flex-row my-2">
                  <FaEnvelope className="w-4 h-4 text-black mr-3" />
                  <div className="info_style text-sm">{owner.email}</div>
                </div>
                {/* <div className="flex items-center flex-row my-2 mt-4">
                  <label className="flex items-center">
                    <input
                      //   radioForm
                      type="radio"
                      className="w-5 h-5"
                      value="email"
                      checked={commMethodOwner === "email"}
                      onChange={handleOwnerCommMethodChange}
                    />
                    <span className="ml-2 info_style cursor-pointer">
                      Email
                    </span>
                  </label>
                  <label className="flex items-center ml-4">
                    <input
                      //   radioForm
                      type="radio"
                      className="ml-5 w-5 h-5"
                      value="text"
                      checked={commMethodOwner === "text"}
                      onChange={handleOwnerCommMethodChange}
                    />
                    <span className="ml-2 info_style cursor-pointer">Text</span>
                  </label>
                  <label className="flex items-center ml-4">
                    <input
                      //   radioForm
                      type="radio"
                      className="ml-5 w-5 h-5"
                      value="both"
                      checked={commMethodOwner === "both"}
                      onChange={handleOwnerCommMethodChange}
                    />
                    <span className="ml-2 info_style cursor-pointer">Both</span>
                  </label>
                </div> */}

                <div className="flex items-center flex-row my-2 mt-3">
                  <input
                    // checkBox
                    className="h-5 w-5"
                    id="text_bday"
                    type="checkbox"
                    value={bdayTextOwner}
                    checked={bdayTextOwner}
                    onChange={handleOwnerBdayTextChange}
                  />
                  <label className="ml-2 info_style" htmlFor="text_bday">
                    Email On Birthday
                  </label>
                </div>
              </div>
            </div>

            {/* Second Section */}
            {partner.firstName && (
              <div className="sm:w-1/4 bg-stone-100 flex flex-col my-3 sm:mx-2 border rounded">
                <div className="m-3">
                  <div className="flex items-center flex-row my-2">
                    {/* <FiUser className="w-4 h-4 text-black mr-3" /> */}
                    <div className="text-black text-md font-semibold">
                      {partner.firstName + " " + partner.lastName}
                    </div>
                  </div>
                  {!partnerBday && ownerBday && (
                    <div className="flex items-center flex-row my-2 min-h-5"></div>
                  )}
                  {partnerBday && (
                    <div className="flex items-center flex-row my-2">
                      <BsFillCake2Fill className="w-4 h-4 text-black mr-3" />
                      <div className="info_style text-sm">{partnerBday}</div>
                    </div>
                  )}
                  <div className="flex items-center flex-row my-2">
                    <FaPhone className="w-4 h-4 text-black mr-3" />
                    <div className="info_style text-sm">{partner.phone}</div>
                  </div>
                  <div className="flex items-center flex-row my-2">
                    <FaEnvelope className="w-4 h-4 text-black mr-3" />
                    <div className="info_style text-sm">{partner.email}</div>
                  </div>
                  {/* <div className="flex items-center flex-row my-2 mt-4">
                    <label className="flex items-center">
                      <input
                        //   radioForm
                        type="radio"
                        className="w-5 h-5"
                        value="email"
                        checked={commMethodPartner === "email"}
                        onChange={handlePartnerCommMethodChange}
                      />
                      <span className="ml-2 info_style cursor-pointer">
                        Email
                      </span>
                    </label>
                    <label className="flex items-center ml-4">
                      <input
                        //   radioForm
                        type="radio"
                        className="ml-5 w-5 h-5"
                        value="text"
                        checked={commMethodPartner === "text"}
                        onChange={handlePartnerCommMethodChange}
                      />
                      <span className="ml-2 info_style cursor-pointer">
                        Text
                      </span>
                    </label>
                    <label className="flex items-center ml-4">
                      <input
                        //   radioForm
                        type="radio"
                        className="ml-5 w-5 h-5"
                        value="both"
                        checked={commMethodPartner === "both"}
                        onChange={handlePartnerCommMethodChange}
                      />
                      <span className="ml-2 info_style cursor-pointer">
                        Both
                      </span>
                    </label>
                  </div> */}

                  <div className="flex items-center flex-row my-2 mt-3">
                    <input
                      // checkBox
                      className="h-5 w-5 rounded"
                      id="text_bday"
                      type="checkbox"
                      value={bdayTextPartner}
                      checked={bdayTextPartner}
                      onChange={handlePartnerBdayTextChange}
                    />
                    <label className="ml-2 info_style" htmlFor="text_bday">
                      Email On Birthday
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CommunicationSection;
