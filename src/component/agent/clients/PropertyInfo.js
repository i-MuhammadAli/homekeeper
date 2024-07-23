import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Tooltip } from "react-tooltip";
// import { FaCalendarAlt } from "react-icons/fa";

import InputBox from "../../common/InputBox";
// import DateInput from "../../common/DateInput";
import createApi from "../../../utils/api";
import { setUpdateProperty, setViewClientData } from "../../../store";
import {
  formatDateToYYYYMMDD,
  formatPrice,
  localeDateString,
} from "../../../utils/helpers";
import Loader from "../../loader_folder/Loader";

function PropertyInfo({ onClose }) {
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [purchaseValue, setPurchaseValue] = useState("");
  const [purchaseValueDisplay, setPurchaseValueDisplay] = useState("$");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const api = createApi();

  const propertyId = useSelector((state) => {
    return state.client.data.id;
  });

  const propertyAddress = useSelector((state) => {
    return state.client.data.address;
  });

  const data = useSelector((state) => {
    return state.client.data.propertyInfo;
  });

  useEffect(() => {
    if (data && propertyAddress) {
      if (data.dop) {
        // const date = new Date(data.dop);
        // setSelectedDate(date);
        setSelectedDate(formatDateToYYYYMMDD(data.dop));
        // setInputValue(date ? date.toLocaleDateString() : "");
        // setInputValue(date ? localeDateString(date) : "");
      }

      setPurchaseValue(data.purchaseValue);
      setPurchaseValueDisplay(formatPrice(data.purchaseValue));
      setAddress(propertyAddress || "");
    }
  }, []);

  const onAddressChange = (event) => {
    if ("address" in formErrors) {
      delete formErrors.address;
    }
    setAddress(event.target.value);
  };

  const onPurchaseValueChange = (event) => {
    if ("value" in formErrors) {
      delete formErrors.value;
    }
    const input = event.target.value.replace(/\D/g, "");

    setPurchaseValue(input);
    setPurchaseValueDisplay(formatPrice(input));
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

      formdata.append("address", address);
      formdata.append("sale_value", purchaseValue);
      // formdata.append("dop", localeDateString(selectedDate));
      formdata.append("dop", localeDateString(new Date(selectedDate)));
      formdata.append("id", propertyId);
      api
        .post("/api/agentpropertyeditpropertydetails", formdata)
        .then(function (response) {
          setIsLoading(false);
          if (response.data.status === "success") {
            dispatch(setViewClientData(response.data.data));
            dispatch(setUpdateProperty(response.data.data));
            onClose();
          } else {
            setApiError("Something went wrong");
            console.log("Something went wrong!");
          }
        });
    }
  };

  const validate = () => {
    const errors = {};
    if (!address) {
      errors.address = "Required";
    }
    if (!selectedDate) {
      errors.selectedDate = "Required";
    }
    // if (!inputValue) {
    //   errors.inputValue = "Required";
    // }
    if (!purchaseValue) {
      errors.value = "Required";
    }
    // console.log(errors);
    return errors;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {apiError && (
        <div className="flex items-center flex-row m-3 h-full mb-6 -my-1">
          <p className="text-red-500 text-sm">{apiError}</p>
        </div>
      )}
      <div className="flex items-center flex-row mx-3 my-4">
        <label className="block w-40 font-semibold" htmlFor="prop-add1">
          Address<span className="text-red-500">*</span>
        </label>
        <InputBox
          formText
          placeholder="Address"
          className={`w-80 ${formErrors.address ? "border-red-500" : ""}`}
          id="prop-add1"
          type="text"
          value={address}
          onChange={onAddressChange}
        />
        {formErrors.address && (
          <p className="ml-2 text-red-500 text-xs italic">
            {formErrors.address}
          </p>
        )}
      </div>

      <div className="flex items-center flex-row  mx-3 my-4">
        <label className="block w-40 font-semibold" htmlFor="prop-value1">
          Sales Price<span className="text-red-500">*</span>
        </label>
        <InputBox
          formText
          placeholder="Last Name"
          className={`w-80 ${formErrors.value ? "border-red-500" : ""}`}
          id="prop-value1"
          type="text"
          value={purchaseValueDisplay}
          onChange={onPurchaseValueChange}
        />
        {formErrors.value && (
          <p className="ml-2 text-red-500 text-xs italic">{formErrors.value}</p>
        )}
      </div>

      <div className="flex items-center flex-row m-3 h-full mb-12">
        <label className="block w-40 font-semibold" htmlFor="prop-date1">
          Date Of Purchase<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-row items-center">
          <InputBox
            formText
            id="prop-date1"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          {/* <InputBox
            formText
            type="text"
            placeholder="MM/DD/YYYY"
            value={inputValue}
            // className={`w-80`}
            onChange={handleInputChange}
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
            selected={new Date(selectedDate)}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            className="hidden"
            showYearDropdown
          /> */}
          {formErrors.selectedDate && (
            <div className="ml-2 text-red-500 text-xs italic">
              {formErrors.selectedDate}
            </div>
          )}
        </div>
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

export default PropertyInfo;
