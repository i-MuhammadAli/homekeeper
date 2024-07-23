import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Tooltip } from "react-tooltip";
// import { FaCalendarAlt } from "react-icons/fa";

import InputBox from "../../common/InputBox";
// import DateInput from "../../common/DateInput";
// import Modal from "../../common/Modal";
// import ModalTitle from "../../common/ModalTitle";
import createApi from "../../../utils/api";
import { setAddHomeValue, setEditHomeValue } from "../../../store";
import {
  formatDateToYYYYMMDD,
  formatPrice,
  localeDateString,
} from "../../../utils/helpers";
import Loader from "../../loader_folder/Loader";

function HomeValue({ item, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [inputValue, setInputValue] = useState("");
  const [homeValueDisplay, setHomeValueDisplay] = useState("$");
  const [homeValue, setHomeValue] = useState("");
  const dispatch = useDispatch();
  const api = createApi();

  const profile_id = useSelector((state) => {
    return state.profile.data.id;
  });

  const client_id = useSelector((state) => {
    return state.client.data.id;
  });

  useEffect(() => {
    if (item) {
      // const date = new Date(item.date_from);
      // console.log(item);
      setHomeValue(item.homevalue);
      setHomeValueDisplay(formatPrice(item.homevalue));
      setSelectedDate(formatDateToYYYYMMDD(item.date_from));
      // setSelectedDate(date);
      // setInputValue(date ? localeDateString(date) : "");
    }
  }, []);

  const onHomeValueChange = (event) => {
    if ("purchaseValue" in formErrors) {
      delete formErrors.purchaseValue;
    }
    const input = event.target.value.replace(/\D/g, "");
    // const input = event.target.value.replace(/[$,]/g, "");
    // console.log(input);

    const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setHomeValueDisplay("$" + formattedInput);
    setHomeValue(input);
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

      if (item) {
        formdata.append("homevalue", homeValue);
        // formdata.append("date", localeDateString(selectedDate));
        formdata.append("date", localeDateString(new Date(selectedDate)));
        formdata.append("id", item.id);
        api
          .post("/api/homekeeperedithomevalue", formdata)
          .then(function (response) {
            setIsLoading(false);
            // console.log("response", response.data);
            if (response.data.status === "success") {
              dispatch(setEditHomeValue(response.data));
              handleHomeValueClose();
            } else {
              console.log("Something went wrong!");
            }
          });
      } else {
        // console.log(localeDateString(selectedDate));
        formdata.append("homevalue", homeValue);
        // formdata.append("date", localeDateString(selectedDate));
        formdata.append("date", localeDateString(new Date(selectedDate)));
        formdata.append("addedby", profile_id);
        formdata.append("propertyid", client_id);
        api
          .post("/api/homekeeper_addhomevalueanddate", formdata)
          .then(function (response) {
            setIsLoading(false);
            // console.log("response", response.data);
            if (response.data.status === "success") {
              dispatch(setAddHomeValue(response.data));
              handleHomeValueClose();
            } else {
              console.log("Something went wrong!");
            }
          });
      }
    }
  };

  const validate = () => {
    const errors = {};
    if (!homeValue) {
      errors.homeValue = "Required";
    }
    if (!selectedDate) {
      errors.selectedDate = "Required";
    }
    return errors;
  };

  const handleHomeValueClose = () => {
    // console.log("close");
    onClose();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center flex-row  mx-3 my-4">
        <label className="block w-40 font-semibold" htmlFor="home-value-value1">
          Home Value<span className="text-red-500">*</span>
        </label>
        <InputBox
          formText
          placeholder="Last Name"
          className={`w-60 ${formErrors.value ? "border-red-500" : ""}`}
          id="home-value-value1"
          type="text"
          value={homeValueDisplay}
          onChange={onHomeValueChange}
        />
        {formErrors.value && (
          <p className="ml-2 text-red-500 text-xs italic">{formErrors.value}</p>
        )}
      </div>
      <div className="flex items-center flex-row m-3 h-full mb-12">
        <label className="block w-40 font-semibold" htmlFor="home-value-date1">
          Date<span className="text-red-500">*</span>
        </label>
        <InputBox
          formText
          id="home-value-date1"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        {/* <div className="">
              <InputBox
                formText
                type="text"
                placeholder="MM/DD/YYYY"
                value={inputValue}
                id="prop-date"
                className={`w-60`}
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
                popperPlacement="right"
                selected={new Date(selectedDate)}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy"
                className="hidden"
                showYearDropdown
              />
            </div> */}
        {formErrors.selectedDate && (
          <div className="ml-2 text-red-500 text-xs italic">
            {formErrors.selectedDate}
          </div>
        )}
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

export default HomeValue;
