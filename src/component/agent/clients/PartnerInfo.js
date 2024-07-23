import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputBox from "../../common/InputBox";
import {
  formatDateToYYYYMMDD,
  formatPhoneNumber,
  localeDateString,
} from "../../../utils/helpers";
import createApi from "../../../utils/api";
import { setUpdateProperty, setViewClientData } from "../../../store";
import Loader from "../../loader_folder/Loader";

function PartnerInfo({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const api = createApi();

  const propertyId = useSelector((state) => {
    return state.client.data.id;
  });

  const data = useSelector((state) => {
    return state.client.data.spouseInfo;
  });

  useEffect(() => {
    if (data) {
      if (data.dob) {
        setSelectedDate(formatDateToYYYYMMDD(data.dob));
      }

      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
    }
  }, []);

  const onFirstNameChange = (event) => {
    if ("firstName" in formErrors) {
      delete formErrors.firstName;
    }
    setFirstName(event.target.value);
  };

  const onLastNameChange = (event) => {
    if ("lastName" in formErrors) {
      delete formErrors.lastName;
    }
    setLastName(event.target.value);
  };

  const onEmailChange = (event) => {
    if ("email" in formErrors) {
      delete formErrors.email;
    }
    setEmail(event.target.value);
  };

  const onPhoneChange = (event) => {
    if ("phone" in formErrors) {
      delete formErrors.phone;
    }
    // const input = event.target.value.replace(/\D/g, "");
    const formattedInput = formatPhoneNumber(event.target.value);
    setPhone(formattedInput);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // setSelectedDate(date);
    // setInputValue(date ? localeDateString(date) : "");
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      let formdata = new FormData();

      formdata.append("fname", firstName);
      formdata.append("lname", lastName);
      formdata.append("email", email);
      formdata.append("phone", phone);
      if (selectedDate)
        // formdata.append("dob", localeDateString(selectedDate));
        formdata.append("dob", localeDateString(new Date(selectedDate)));
      else formdata.append("dob", "");
      formdata.append("id", propertyId);
      api
        .post("/api/agentpropertyeditpartnerdetails", formdata)
        .then(function (response) {
          setIsLoading(false);
          // console.log("response", response.data);
          if (response.data.status === "success") {
            dispatch(setViewClientData(response.data.data));
            dispatch(setUpdateProperty(response.data.data));
            onClose();
          } else {
            console.log("Something went wrong!");
          }
        });
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
    // console.log(errors);
    return errors;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* {error && (
        <div className="flex items-center flex-row m-3 h-full mb-6 -my-1">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )} */}
      <div className="flex items-center flex-row mx-3 my-4">
        <label className="block w-40 font-semibold" htmlFor="partner-fname1">
          First Name<span className="text-red-500">*</span>
        </label>
        <InputBox
          formText
          placeholder="First Name"
          className={`w-60 ${formErrors.firstName ? "border-red-500" : ""}`}
          id="partner-fname1"
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
        <label className="block w-40 font-semibold" htmlFor="partner-lname1">
          Last Name<span className="text-red-500">*</span>
        </label>
        <InputBox
          formText
          placeholder="Last Name"
          className={`w-60 ${formErrors.lastName ? "border-red-500" : ""}`}
          id="partner-lname1"
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
        <label className="block w-40 font-semibold" htmlFor="partner-phone1">
          Phone<span className="text-orange-500">*</span>
        </label>
        <InputBox
          formText
          placeholder="Phone"
          className={`w-60 ${formErrors.phone ? "border-red-500" : ""}`}
          id="partner-phone1"
          type="text"
          maxLength={12}
          value={phone}
          onChange={onPhoneChange}
        />
        {formErrors.phone && (
          <p className="ml-2 text-red-500 text-xs italic">{formErrors.phone}</p>
        )}
      </div>

      <div className="flex items-center flex-row m-3 h-full mb-6">
        <label className="block w-40 font-semibold" htmlFor="partner-email1">
          Email<span className="text-red-500">*</span>
        </label>
        <InputBox
          formText
          placeholder="Email"
          className={`w-60 ${formErrors.email ? "border-red-500" : ""}`}
          id="partner-email1"
          type="text"
          value={email}
          onChange={onEmailChange}
        />
        {formErrors.email && (
          <p className="ml-2 text-red-500 text-xs italic">{formErrors.email}</p>
        )}
      </div>

      <div className="flex items-center flex-row m-3 h-full mb-12">
        <label className="block w-40 font-semibold" htmlFor="partner-dob1">
          Date of Birth
        </label>
        <InputBox
          formText
          id="partner-dob1"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="flex justify-end mx-2 mb-8">
        <button
          onClick={handleSubmit}
          className="bg-sky-500 border text-white px-2.5 py-2.5 text-sm rounded font-semibold flex items-center button_color"
        >
          Save
        </button>
      </div>
    </>
  );
}

export default PartnerInfo;
