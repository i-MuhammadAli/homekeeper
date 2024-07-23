import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Tooltip } from "react-tooltip";
import { FaCalendarAlt } from "react-icons/fa";

import InputBox from "../../common/InputBox";
import DateInput from "../../common/DateInput";
import Modal from "../../common/Modal";
import ModalTitle from "../../common/ModalTitle";
import createApi from "../../../utils/api";
import {
  setAddHomeValue,
  setEditHomeValue,
  setViewClientData,
  setUpdateProperty,
} from "../../../store";
import { formatPrice, localeDateString } from "../../../utils/helpers";
import Loader from "../../loader_folder/Loader";

function RentalValue({ title, item, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [rentalDate, setRentalDate] = useState(new Date());
  const [inputRentalDate, setInputRentalDate] = useState("");
  const [rentalValue, setRentalValue] = useState("");

  const [airbnbDate, setAirbnbDate] = useState(new Date());
  const [inputAirbnbDate, setInputAirbnbDate] = useState("");
  const [airbnbValue, setAirbnbValue] = useState("");
  const dispatch = useDispatch();
  const api = createApi();

  const profile_id = useSelector((state) => {
    return state.profile.data.id;
  });

  const client = useSelector((state) => {
    return state.client.data;
  });

  useEffect(() => {
    if (item) {
      if (item === "airbnb") {
        if (client.propertyInfo.airbnbAmount) {
          const date = new Date(client.propertyInfo.airbnbDate);
          setAirbnbValue(client.propertyInfo.airbnbAmount);
          setAirbnbDate(date);
          // setInputAirbnbDate(date ? date.toLocaleDateString() : "");
          setInputAirbnbDate(date ? localeDateString(date) : "");
        }
      } else if (item === "rental") {
        if (client.propertyInfo.rentalAmount) {
          const date = new Date(client.propertyInfo.rentalDate);
          setRentalValue(client.propertyInfo.rentalAmount);
          setRentalDate(date);
          // setInputRentalDate(date ? date.toLocaleDateString() : "");
          setInputRentalDate(date ? localeDateString(date) : "");
        }
      }
      // console.log(item);
    }
  }, [client, item]);

  const onRentalValueChange = (event) => {
    if ("rentalValue" in formErrors) {
      delete formErrors.rentalValue;
    }
    const input = event.target.value.replace(/\D/g, "");

    // const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // setHomeValueDisplay("$" + formattedInput);
    setRentalValue(input);
  };

  const onAirbnbValueChange = (event) => {
    if ("airbnbValue" in formErrors) {
      delete formErrors.airbnbValue;
    }
    const input = event.target.value.replace(/\D/g, "");

    // const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // setHomeValueDisplay("$" + formattedInput);
    setAirbnbValue(input);
  };

  //   console.log(selectedDate);

  const formatDate = (e) => {
    let value = e.target.value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, "");

    let formattedDate = "";
    for (let i = 0; i < value.length; i++) {
      if (i === 2 || i === 4) {
        formattedDate += "/";
      }
      formattedDate += value[i];
    }
    return formattedDate;
  };

  const handleRentalDateInputChange = (e) => {
    const formattedDate = formatDate(e);
    setInputRentalDate(formattedDate);

    const [month, day, year] = formattedDate.split("/");
    const isValidDate = !isNaN(Date.parse(`${year}-${month}-${day}`));

    if (isValidDate) {
      const newDate = new Date(`${year}-${month}-${day}`);
      setRentalDate(newDate);
    } else {
      setRentalDate(null);
    }
  };

  const handleRentalDateChange = (date) => {
    setRentalDate(date);
    // setInputRentalDate(date ? date.toLocaleDateString() : "");
    setInputRentalDate(date ? localeDateString(date) : "");
  };

  const handleAirbnbDateInputChange = (e) => {
    const formattedDate = formatDate(e);
    setInputAirbnbDate(formattedDate);

    const [month, day, year] = formattedDate.split("/");
    const isValidDate = !isNaN(Date.parse(`${year}-${month}-${day}`));

    if (isValidDate) {
      const newDate = new Date(`${year}-${month}-${day}`);
      setAirbnbDate(newDate);
    } else {
      setAirbnbDate(null);
    }
  };

  const handleAirbnbDateChange = (date) => {
    setAirbnbDate(date);
    // setInputAirbnbDate(date ? date.toLocaleDateString() : "");
    setInputAirbnbDate(date ? localeDateString(date) : "");
  };

  const handleSubmit = () => {
    setIsLoading(true);
    let formdata = new FormData();

    formdata.append("airbnbValue", airbnbValue);
    // formdata.append("airbnbDate", airbnbDate.toLocaleDateString());
    formdata.append("airbnbDate", localeDateString(airbnbDate));
    formdata.append("rentalValue", rentalValue);
    // formdata.append("rentalDate", rentalDate.toLocaleDateString());
    formdata.append("rentalDate", localeDateString(rentalDate));
    formdata.append("id", client.id);
    if (item === "airbnb") {
      api
        .post("/api/agentpropertyeditairbnbvalue", formdata)
        .then(function (response) {
          // console.log("response", response.data);
          setIsLoading(false);
          if (response.data.status === "success") {
            dispatch(setViewClientData(response.data.data));
            dispatch(setUpdateProperty(response.data.data));
            handleClose();
          } else {
            setApiError("Something went wrong");
            console.log("Something went wrong!");
          }
        });
    } else if (item === "rental") {
      api
        .post("/api/agentpropertyeditrentalvalue", formdata)
        .then(function (response) {
          setIsLoading(false);
          // console.log("response", response.data);
          if (response.data.status === "success") {
            dispatch(setViewClientData(response.data.data));
            dispatch(setUpdateProperty(response.data.data));
            handleClose();
          } else {
            setApiError("Something went wrong");
            console.log("Something went wrong!");
          }
        });
    } else {
      const request1 = api.post("/api/agentpropertyeditairbnbvalue", formdata);
      const request2 = api.post("/api/agentpropertyeditrentalvalue", formdata);

      Promise.all([request1, request2])
        .then(function (responses) {
          const response1 = responses[0];
          const response2 = responses[1];
          setIsLoading(false);

          if (response1.data.status === "success") {
            dispatch(setViewClientData(response1.data.data));
            dispatch(setUpdateProperty(response1.data.data));
          } else {
            setApiError("Something went wrong with the first request");
            console.log("Something went wrong with the first request!");
          }

          if (response2.data.status === "success") {
            dispatch(setViewClientData(response2.data.data));
            dispatch(setUpdateProperty(response2.data.data));
            handleClose();
          } else {
            setApiError("Something went wrong with the second request");
            console.log("Something went wrong with the second request!");
          }
        })
        .catch((error) => {
          console.error("Error during API requests:", error);
          setApiError("Something went wrong during the API requests");
        });
    }
  };

  const handleClose = () => {
    // console.log("close");
    onClose();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* <Modal className="inset-y-10 inset-x-80"> */}
      <Modal
        onClose={handleClose}
        style={{
          top: "30%",
          left: "20%",
          width: "60%",
          height: "34%",
        }}
      >
        {" "}
        <div className="container mx-auto">
          <ModalTitle
            title={title}
            // submit
            cancel
            // onSubmit={handleSubmit}
            onCancel={handleClose}
            // loadingState={isDateUpdateLoading}
          />

          {item === "rental" && (
            <div className="flex items-center flex-row mx-3 mt-4 mb-12">
              <label className="block w-48 font-semibold" htmlFor="prop-value">
                Monthly Rental Value
              </label>
              <InputBox
                formText
                className={`w-48 mr-2 ${
                  formErrors.value ? "border-red-500" : ""
                }`}
                id="prop-value"
                type="text"
                value={formatPrice(rentalValue)}
                onChange={onRentalValueChange}
              />
              <InputBox
                formText
                disabled={!rentalValue}
                type="text"
                placeholder="MM/DD/YYYY"
                value={inputRentalDate}
                id="prop-date"
                className={`w-48`}
                onChange={handleRentalDateInputChange}
                maxLength={10}
              />
              <FaCalendarAlt
                className="ml-2 cursor-pointer"
                onClick={() => document.getElementById("date-picker").click()}
              />
              <DateInput
                form
                disabled={!rentalValue}
                id="date-picker"
                popperPlacement="bottom"
                selected={new Date(rentalDate)}
                onChange={handleRentalDateChange}
                dateFormat="MM/dd/yyyy"
                className="hidden"
                showYearDropdown
              />

              {formErrors.value && (
                <p className="ml-2 text-red-500 text-xs italic">
                  {formErrors.value}
                </p>
              )}
            </div>
          )}
          {/* <div className="flex items-center flex-row m-3 h-full mb-12">
            <label className="block w-48 font-semibold" htmlFor="prop-date">
              <span className="text-orange-500">*</span> Date
            </label>
            <div className="">
              <InputBox
                formText
                type="text"
                placeholder="MM/DD/YYYY"
                value={inputRentalDate}
                id="prop-date"
                className={`w-60`}
                onChange={handleRentalDateInputChange}
                maxLength={10}
              />
              <FaCalendarAlt
                className="ml-2 cursor-pointer"
                onClick={() => document.getElementById("date-picker").click()}
              />
              <DateInput
                form
                id="date-picker"
                popperPlacement="bottom"
                selected={new Date(rentalDate)}
                onChange={handleRentalDateChange}
                dateFormat="MM/dd/yyyy"
                className="hidden"
                showYearDropdown
              />
            </div>
          </div> */}
          {item === "airbnb" && (
            <div className="flex items-center flex-row mx-3 my-4">
              <label className="block w-48 font-semibold" htmlFor="prop-value">
                Monthly AirBnB Value
              </label>
              <InputBox
                formText
                className={`w-48 mr-2 ${
                  formErrors.value ? "border-red-500" : ""
                }`}
                id="prop-value"
                type="text"
                value={formatPrice(airbnbValue)}
                onChange={onAirbnbValueChange}
              />
              <InputBox
                formText
                disabled={!airbnbValue}
                type="text"
                placeholder="MM/DD/YYYY"
                value={inputAirbnbDate}
                id="prop-date"
                className={`w-48`}
                onChange={handleAirbnbDateInputChange}
                maxLength={10}
              />
              <FaCalendarAlt
                className="ml-2 cursor-pointer"
                onClick={() => document.getElementById("date-picker").click()}
              />
              <DateInput
                form
                disabled={!airbnbValue}
                id="date-picker"
                popperPlacement="bottom"
                selected={new Date(airbnbDate)}
                onChange={handleAirbnbDateChange}
                dateFormat="MM/dd/yyyy"
                className="hidden"
                showYearDropdown
              />

              {formErrors.value && (
                <p className="ml-2 text-red-500 text-xs italic">
                  {formErrors.value}
                </p>
              )}
            </div>
          )}
          {/* <div className="flex items-center flex-row m-3 h-full mb-12">
            <label className="block w-48 font-semibold" htmlFor="prop-date">
              <span className="text-orange-500">*</span> Date
            </label>
            <div className="">
              <InputBox
                formText
                type="text"
                placeholder="MM/DD/YYYY"
                value={inputAirbnbDate}
                id="prop-date"
                className={`w-60`}
                onChange={handleAirbnbDateInputChange}
                maxLength={10}
              />
              <FaCalendarAlt
                className="ml-2 cursor-pointer"
                onClick={() => document.getElementById("date-picker").click()}
              />
              <DateInput
                form
                id="date-picker"
                popperPlacement="bottom"
                selected={new Date(airbnbDate)}
                onChange={handleAirbnbDateChange}
                dateFormat="MM/dd/yyyy"
                className="hidden"
                showYearDropdown
              />
            </div>
          </div> */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-sky-500 border text-white px-2.5 py-2.5 text-sm rounded font-semibold flex items-center button_color"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default RentalValue;
