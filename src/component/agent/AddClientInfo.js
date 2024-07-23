import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import createApi from "../../utils/api";
import Loader from "../loader_folder/Loader";

import {
  setClientFirstName,
  setClientLastName,
  setClientEmail,
  setClientPhone,
  setClientDob,
  setSpousePhone,
  setSpouseFirstName,
  setSpouseLastName,
  setSpouseEmail,
  setSpouseDob,
  setHasSpouse,
  setClientPropertyId,
} from "../../store";
import InputBox from "../common/InputBox";
import { FaUserMinus, FaUserPlus } from "react-icons/fa6";
import { localeDateString } from "../../utils/helpers";
import HomeButton from "../common/HomeButton";

function AddClientInfo({ onContinue }) {
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const api = createApi();

  const { firstName, lastName, email, phone, dob } = useSelector((state) => {
    return state.clientForm.form.clientInfo;
  });

  const spouseInfo = useSelector((state) => {
    return state.clientForm.form.spouseInfo;
  });

  const { hasSpouse, id } = useSelector((state) => {
    return state.clientForm.form;
  });

  const agentId = useSelector((state) => {
    return state.profile.data.id;
  });

  const onFirstNameChange = (event) => {
    if ("firstName" in formErrors) {
      delete formErrors.firstName;
    }
    dispatch(setClientFirstName(event.target.value));
  };

  const onLastNameChange = (event) => {
    if ("lastName" in formErrors) {
      delete formErrors.lastName;
    }
    dispatch(setClientLastName(event.target.value));
  };

  const onEmailChange = (event) => {
    if ("email" in formErrors) {
      delete formErrors.email;
    }
    dispatch(setClientEmail(event.target.value));
  };

  const onPhoneChange = (event) => {
    if ("phone" in formErrors) {
      delete formErrors.phone;
    }
    // const input = event.target.value.replace(/\D/g, "");
    const formattedInput = formatPhoneNumber(event.target.value);
    dispatch(setClientPhone(formattedInput));
  };

  const onDobChange = (event) => {
    // console.log(typeof event.target.value);
    dispatch(setClientDob(event.target.value));
  };

  const onSpouseFirstNameChange = (event) => {
    if ("firstNameSpouse" in formErrors) {
      delete formErrors.firstNameSpouse;
    }
    dispatch(setSpouseFirstName(event.target.value));
  };

  const onSpouseLastNameChange = (event) => {
    if ("lastNameSpouse" in formErrors) {
      delete formErrors.lastNameSpouse;
    }
    dispatch(setSpouseLastName(event.target.value));
  };

  const onSpouseEmailChange = (event) => {
    if ("emailSpouse" in formErrors) {
      delete formErrors.emailSpouse;
    }
    dispatch(setSpouseEmail(event.target.value));
  };

  const onSpousePhoneChange = (event) => {
    if ("phoneSpouse" in formErrors) {
      delete formErrors.phoneSpouse;
    }
    // const input = event.target.value.replace(/\D/g, "");
    const formattedInput = formatPhoneNumber(event.target.value);
    dispatch(setSpousePhone(formattedInput));
  };

  const onSpouseDobChange = (event) => {
    // if ("dob" in formErrors) {
    //   delete formErrors.name;
    // }
    dispatch(setSpouseDob(event.target.value));
  };

  const onSpouseClick = () => {
    dispatch(setHasSpouse(true));
  };

  const onSpouseCancelClick = () => {
    dispatch(setHasSpouse(false));
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      sendDetailsToServer();
    }
  };

  const validate = () => {
    const errors = {};
    if (!firstName) {
      errors.firstName = "Required";
    }
    if (!lastName) {
      errors.lastName = "Required";
    }
    if (!email) {
      errors.email = "Required";
    }
    if (!phone) {
      errors.phone = "Required";
    }
    if (hasSpouse) {
      if (!spouseInfo.firstName) {
        errors.firstNameSpouse = "Required";
      }
      if (!spouseInfo.lastName) {
        errors.lastNameSpouse = "Required";
      }
      if (!spouseInfo.email) {
        errors.emailSpouse = "Required";
      }
      if (!spouseInfo.phone) {
        errors.phoneSpouse = "Required";
      }
    }
    // console.log(errors);
    return errors;
  };

  const sendDetailsToServer = async () => {
    let formdata = new FormData();
    formdata.append("email", email);

    formdata.append("fname", firstName);

    formdata.append("lname", lastName);

    formdata.append("cellphone", phone);

    // formdata.append("dob", new Date(dob).toLocaleDateString());
    console.log(dob);
    console.log(localeDateString(new Date(dob)));
    if (dob) formdata.append("dob", localeDateString(new Date(dob)));
    else formdata.append("dob", "");

    if (id) formdata.append("propertyid", id);

    formdata.append("createdby_client_id", agentId);
    if (hasSpouse) {
      formdata.append("partnerfname", spouseInfo.firstName);
      formdata.append("partnerlname", spouseInfo.lastName);
      formdata.append("partneremail", spouseInfo.email);
      if (spouseInfo.dob) {
        formdata.append(
          "partnerdob",
          localeDateString(new Date(spouseInfo.dob))
        );
      }

      formdata.append("partnercellphone", spouseInfo.phone);
    }
    formdata.append("typepartner", "");
    // formdata.append("userid", userid);
    api
      .post("/api/homekeeperaddpropertylist", formdata)
      .then(function (response) {
        if (response.data.status === "success") {
          var lastinsertedid = response.data.lastinsertedid;
          dispatch(setClientPropertyId(lastinsertedid));
          setIsLoading(false);
          onContinue();
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
          setApiError(response.data.message);
        }
      })
      .catch(function (error) {
        // console.log(error.message);
        // console.error("API request failed:", error);
        setIsLoading(false);
        toast.error("Something went wrong!");
        setApiError("Error: API request failed");
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* <Header /> */}
      <div className="sm:mr-20 sm:ml-20 pt-9 mr-2 ml-2 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center sm:space-x-4 space-x-2">
          <div className="sm:text-3xl text-lg font-bold">Add Client</div>
        </div>
        <HomeButton />
      </div>
      <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 pb-10">
        <div className="flex sm:flex-row flex-col justify-center mb-10 mt-6">
          <div className="sm:mx-2 my-1 sm:w-1/2 sm:overflow-hidden bg-white border rounded-md shadow-md">
            <div className="flex flex-row justify-between items-center bg-gray-600">
              <div className="font-extrabold text-sm my-3 mx-3 text-white">
                OWNER INFORMATION
              </div>
              <div className="flex flex-row mx-3"></div>
            </div>
            <div className="m-3">
              <div className="flex items-center flex-row my-2">
                <div className="flex flex-row items-center">
                  <label
                    className="block w-32 font-semibold text-sm align-center"
                    htmlFor="owner-fname"
                  >
                    <span className="text-orange-500">*</span> First Name
                  </label>
                  <InputBox
                    formText
                    placeholder="First Name"
                    className="text-md info_style w-60"
                    id="owner-fname"
                    type="text"
                    value={firstName}
                    onChange={onFirstNameChange}
                  />
                  {formErrors.firstName && (
                    <p className="ml-2 text-red-500 text-xs italic">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center flex-row my-2">
                <div className="flex flex-row items-center">
                  <label
                    className="block w-32 text-sm font-semibold"
                    htmlFor="owner-lname"
                  >
                    <span className="text-orange-500">*</span> Last Name
                  </label>
                  <InputBox
                    formText
                    placeholder="Last Name"
                    className={`text-md info_style  w-60`}
                    id="owner-lname"
                    type="text"
                    value={lastName}
                    onChange={onLastNameChange}
                  />
                  {formErrors.lastName && (
                    <p className="ml-2 text-red-500 text-xs italic">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center flex-row my-2">
                <div className="flex flex-row items-center">
                  <label
                    className="block w-32 text-sm font-semibold"
                    htmlFor="owner-phone"
                  >
                    <span className="text-orange-500">*</span> Phone
                  </label>
                  <InputBox
                    formText
                    placeholder="Phone"
                    className={`info_style text-md w-60`}
                    id="owner-phone"
                    type="text"
                    maxLength={12}
                    value={phone}
                    onChange={onPhoneChange}
                  />
                  {formErrors.phone && (
                    <p className="ml-2 text-red-500 text-xs italic">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center flex-row my-2">
                <div className="flex flex-row items-center">
                  <label
                    className="block w-32 text-sm font-semibold"
                    htmlFor="owner-email"
                  >
                    <span className="text-orange-500">*</span> Email
                  </label>
                  <InputBox
                    formText
                    placeholder="Email"
                    className={`info_style text-md w-60`}
                    id="owner-email"
                    type="text"
                    value={email}
                    onChange={onEmailChange}
                  />
                  {formErrors.email && (
                    <p className="ml-2 text-red-500 text-xs italic">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center flex-row my-2">
                <div className="flex flex-row items-center">
                  <label
                    className="block w-32 text-sm font-semibold"
                    htmlFor="cutoff-time"
                  >
                    Date of Birth
                  </label>
                  <InputBox
                    formText
                    type="date"
                    placeholder="MM/DD/YYYY"
                    value={dob}
                    className={`info_style text-md w-60`}
                    onChange={onDobChange}
                    maxLength={10}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mr-2 my-1 sm:w-1/2 overflow-hidden bg-white border rounded-md shadow-md">
            <div className="flex flex-row justify-between items-center bg-gray-100">
              <div className="flex flex-row items-center">
                <div className="font-extrabold text-sm mx-3 my-3 text-black">
                  PARTNER INFO
                </div>
              </div>
              {hasSpouse && (
                <div className="flex flex-row items-center mx-3">
                  <div
                    className="flex items-center w-8 h-7 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-700 mr-1"
                    onClick={onSpouseCancelClick}
                  >
                    <FaUserMinus className="w-6 h-4 text-white cursor-pointer ml-1" />
                  </div>
                </div>
              )}
            </div>
            <div className="m-3">
              {hasSpouse && (
                <>
                  <div className="flex items-center flex-row my-2">
                    <div className="info_style text-md">
                      <InputBox
                        formText
                        placeholder="First Name"
                        className={`w-60 ${
                          formErrors.firstName ? "border-red-500" : ""
                        }`}
                        id="partner-fname"
                        type="text"
                        value={spouseInfo.firstName}
                        onChange={onSpouseFirstNameChange}
                      />
                      {formErrors.firstName && (
                        <p className="ml-2 text-red-500 text-xs italic">
                          {formErrors.firstName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center flex-row my-2">
                    <div className="info_style text-md">
                      <InputBox
                        formText
                        placeholder="Last Name"
                        className={`w-60 ${
                          formErrors.lastName ? "border-red-500" : ""
                        }`}
                        id="partner-lname"
                        type="text"
                        value={spouseInfo.lastName}
                        onChange={onSpouseLastNameChange}
                      />
                      {formErrors.lastName && (
                        <p className="ml-2 text-red-500 text-xs italic">
                          {formErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center flex-row my-2">
                    <div className="info_style text-md">
                      <InputBox
                        formText
                        placeholder="Phone"
                        className={`w-60 ${
                          formErrors.phone ? "border-red-500" : ""
                        }`}
                        id="partner-phone"
                        type="text"
                        maxLength={12}
                        value={spouseInfo.phone}
                        onChange={onSpousePhoneChange}
                      />
                      {formErrors.phone && (
                        <p className="ml-2 text-red-500 text-xs italic">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center flex-row my-2">
                    <div className="info_style text-md">
                      <InputBox
                        formText
                        placeholder="Email"
                        className={`w-60 ${
                          formErrors.email ? "border-red-500" : ""
                        }`}
                        id="partner-email"
                        type="text"
                        value={spouseInfo.email}
                        onChange={onSpouseEmailChange}
                      />
                      {formErrors.email && (
                        <p className="ml-2 text-red-500 text-xs italic">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center flex-row my-2">
                    <div className="info_style text-md">
                      <InputBox
                        formText
                        type="date"
                        placeholder="MM/DD/YYYY"
                        value={spouseInfo.dob}
                        className={`w-60`}
                        onChange={onSpouseDobChange}
                        maxLength={10}
                      />
                    </div>
                  </div>
                </>
              )}
              {!hasSpouse && (
                <FaUserPlus
                  onClick={onSpouseClick}
                  className="w-10 h-8 text-gray-700 cursor-pointer hover:text-black"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-end">
          <button
            className="bg-sky-500 border text-white px-5 py-2.5 text-sm rounded font-semibold flex items-center button_color"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>

      {/* <div className="mx-10">
        <div className="flex items-center flex-row mx-1 h-full -my-1">
          <p className="text-orange-500 text-xs italic">* Required Fields</p>
        </div>
        <div className="flex items-center flex-row mx-3 my-4">
          <label className="block w-48 font-semibold" htmlFor="owner-fname">
            <span className="text-orange-500">*</span> First Name
          </label>
          <InputBox
            formText
            placeholder="First Name"
            className="w-60"
            id="owner-fname"
            type="text"
            value={firstName}
            onChange={onFirstNameChange}
          />
          {formErrors.firstName && (
            <p className="ml-2 text-red-500 text-xs italic">
              {formErrors.firstName}
            </p>
          )}
        </div>

        <div className="flex items-center flex-row  mx-3 my-4">
          <label className="block w-48 font-semibold" htmlFor="owner-lname">
            <span className="text-orange-500">*</span> Last Name
          </label>
          <InputBox
            formText
            placeholder="Last Name"
            className={`w-60 ${formErrors.lastName ? "border-red-500" : ""}`}
            id="owner-lname"
            type="text"
            value={lastName}
            onChange={onLastNameChange}
          />
          {formErrors.lastName && (
            <p className="ml-2 text-red-500 text-xs italic">
              {formErrors.lastName}
            </p>
          )}
        </div>

        <div className="flex items-center flex-row m-3 h-full mb-6">
          <label className="block w-48 font-semibold" htmlFor="owner-phone">
            <span className="text-orange-500">*</span> Phone
          </label>
          <InputBox
            formText
            placeholder="Phone"
            className={`w-60 ${formErrors.phone ? "border-red-500" : ""}`}
            id="owner-phone"
            type="text"
            maxLength={12}
            value={phone}
            onChange={onPhoneChange}
          />
          {formErrors.phone && (
            <p className="ml-2 text-red-500 text-xs italic">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="flex items-center flex-row m-3 h-full mb-6">
          <label className="block w-48 font-semibold" htmlFor="owner-email">
            <span className="text-orange-500">*</span> Email
          </label>
          <InputBox
            formText
            placeholder="Email"
            className={`w-60 ${formErrors.email ? "border-red-500" : ""}`}
            id="owner-email"
            type="text"
            value={email}
            onChange={onEmailChange}
          />
          {formErrors.email && (
            <p className="ml-2 text-red-500 text-xs italic">
              {formErrors.email}
            </p>
          )}
        </div>

        <div className="flex items-center flex-row m-3 h-full mb-12">
          <label className="block w-48 font-semibold" htmlFor="cutoff-time">
            Date of Birth
          </label>
          <div className="">
            <InputBox
              formText
              type="date"
              placeholder="MM/DD/YYYY"
              value={dob}
              className={`w-60`}
              onChange={onDobChange}
              maxLength={10}
            />
          </div>
        </div>
      </div> */}
      {/* <section className="agent_dashboard add_client">
        <div className="container">
          <h3>Add Client</h3>
          <div className="strow">
            <form>
              <input type="hidden" name="typepartner" value=""></input>
              <div className="row">
                <div className="col-sm-5">
                  <div className="form-group">
                    <label>
                      First Name <span>*</span> :
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="fname"
                      value={firstName}
                      onChange={onFirstNameChange}
                    />
                    {formErrors.firstName ? (
                      <>
                        <span className="formerrorforvalidation">
                          {formErrors.firstName}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      Last Name <span>*</span> :
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      name="lname"
                      placeholder="Last Name"
                      onChange={onLastNameChange}
                    />
                    {formErrors.lastName ? (
                      <>
                        <span className="formerrorforvalidation">
                          {formErrors.lastName}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      Email <span>*</span> :
                    </label>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={onEmailChange}
                    />
                    {formErrors.email ? (
                      <>
                        <span className="formerrorforvalidation">
                          {formErrors.email}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      Phone <span>*</span> :
                    </label>
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      value={phone}
                      onChange={onPhoneChange}
                      maxLength={12}
                    />

                    {formErrors.phone ? (
                      <span className="formerrorforvalidation">
                        {formErrors.phone}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <label className="st">Date of Birth :</label>
                    <input
                      className="form-control"
                      type="date"
                      value={dob}
                      placeholder="Enter Dob"
                      name="dob"
                      onChange={onDobChange}
                    />
                  </div>
                </div>
                {!hasSpouse && (
                  <div className="col-sm-2">
                    <button
                      className="submit"
                      onClick={onSpouseClick}
                      style={{
                        fontSize: "12px",
                        padding: "8px 2px",
                        width: "100px",
                      }}
                    >
                      + Add Person
                    </button>
                  </div>
                )}

                {hasSpouse && (
                  <>
                    <div className="col-sm-5">
                      <div className="form-group">
                        <label>
                          First Name <span>*</span> :
                        </label>
                        <input
                          type="text"
                          placeholder="First Name"
                          name="fname"
                          value={spouseInfo.firstName}
                          onChange={onSpouseFirstNameChange}
                        />
                        {formErrors.firstNameSpouse ? (
                          <>
                            <span className="formerrorforvalidation">
                              {formErrors.firstNameSpouse}
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group">
                        <label>
                          Last Name <span>*</span> :
                        </label>
                        <input
                          type="text"
                          value={spouseInfo.lastName}
                          name="lname"
                          placeholder="Last Name"
                          onChange={onSpouseLastNameChange}
                        />
                        {formErrors.lastNameSpouse ? (
                          <>
                            <span className="formerrorforvalidation">
                              {formErrors.lastNameSpouse}
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group">
                        <label>
                          Email <span>*</span> :
                        </label>
                        <input
                          type="text"
                          placeholder="Email"
                          name="email"
                          value={spouseInfo.email}
                          onChange={onSpouseEmailChange}
                        />
                        {formErrors.emailSpouse ? (
                          <>
                            <span className="formerrorforvalidation">
                              {formErrors.emailSpouse}
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="form-group">
                        <label>
                          Phone <span>*</span> :
                        </label>
                        <input
                          type="text"
                          placeholder="Phone"
                          name="phone"
                          value={spouseInfo.phone}
                          onChange={onSpousePhoneChange}
                          maxLength={12}
                        />

                        {formErrors.phoneSpouse ? (
                          <span className="formerrorforvalidation">
                            {formErrors.phoneSpouse}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="form-group">
                        <label className="st">Date of Birth :</label>
                        <input
                          className="form-control"
                          type="date"
                          value={spouseInfo.dob}
                          placeholder="Enter Dob"
                          name="dob"
                          onChange={onSpouseDobChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-1">
                      <button
                        className="submit"
                        onClick={onSpouseCancelClick}
                        style={{
                          fontSize: "12px",
                          padding: "8px 2px",
                          width: "60px",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
                {apiError && (
                  <div className="col-sm-12 mt-4" style={{ color: "red" }}>
                    {apiError}
                  </div>
                )}
                <div className="col-sm-12 mt-4">
                  <button className="submit" onClick={handleSubmit}>
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section> */}
      {/* <Footer /> */}
    </>
  );
}

export default AddClientInfo;
