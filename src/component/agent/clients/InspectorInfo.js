import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Tooltip } from "react-tooltip";

import InputBox from "../../common/InputBox";
import { formatPhoneNumber } from "../../../utils/helpers";
import createApi from "../../../utils/api";
import {
  setUpdateProperty,
  setViewClientData,
  fetchInspectors,
} from "../../../store";
import Loader from "../../loader_folder/Loader";

function InspectorInfo({ onClose }) {
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [inspectorSelect, setInspectorSelect] = useState(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const api = createApi();

  const inspectors = useSelector((state) => {
    return state.inspectors.data;
  });

  const propertyId = useSelector((state) => {
    return state.client.data.id;
  });

  const data = useSelector((state) => {
    return state.client.data.homeMaintenanceInfo.inspector;
  });

  const myInspector = inspectors.find((item) => item.id === data.id);

  useEffect(() => {
    if (myInspector) {
      setInspectorSelect(myInspector.id);
    }
  }, []);

  const onNameChange = (event) => {
    setInspectorSelect(null);
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setInspectorSelect(null);
    setEmail(event.target.value);
  };

  const onCompanyNameChange = (event) => {
    setInspectorSelect(null);
    setCompanyName(event.target.value);
  };

  const onPhoneChange = (event) => {
    if ("phone" in formErrors) {
      delete formErrors.phone;
    }
    const formattedInput = formatPhoneNumber(event.target.value);
    setInspectorSelect(null);
    setPhone(formattedInput);
  };

  const handleInspectorSelect = (event) => {
    // console.log(event.target.value);
    setInspectorSelect(event.target.value);
    setName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setFormErrors(newErrors);
    if (inspectorSelect && myInspector && inspectorSelect === myInspector.id) {
      onClose();
      return;
    }
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      let formdata = new FormData();

      formdata.append("id", propertyId);
      if (inspectorSelect) {
        formdata.append("inspectorid", inspectorSelect);
      } else {
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("phone", phone);
        formdata.append("companyname", companyName);
      }
      api
        .post("/api/agentpropertyeditHomeInspector", formdata)
        .then(function (response) {
          // console.log("response", response.data);
          setIsLoading(false);
          if (response.data.status === "success") {
            if (!inspectorSelect) dispatch(fetchInspectors());

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
    if (!inspectorSelect) {
      if (!name) {
        errors.name = "Required";
      }
      if (!email) {
        errors.email = "Required";
      }
      if (!phone) {
        errors.phone = "Required";
      }
      if (!companyName) {
        errors.compName = "Required";
      }
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
      <div className="flex items-center justify-center flex-row h-full mb-2 mx-3 text-xs font-bold">
        SELECT HOME INSPECTOR
      </div>
      <div className="flex items-center justify-center flex-row mx-3">
        <select
          onChange={handleInspectorSelect}
          className="w-64 shadow-sm border rounded-md text-sm py-2.5 px-3 form_input_style"
          value={inspectorSelect || ""}
        >
          <option value="" disabled>
            Select lender...
          </option>
          {inspectors.length > 0
            ? inspectors.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))
            : ""}
        </select>
        {/* <Dropdown
          options={inspectors}
          value={inspectorSelect?.name || "Select inspector..."}
          onChange={handleInspectorSelect}
          className={`px-3 py-2.5 ${
            inspectorSelect ? " text-gray-700 text-sm" : "text-gray-400 text-sm"
          }`}
          parentDivClasses="w-1/2 ml-2"
          dropDownDivClasses="text-xs p-2"
        ></Dropdown> */}
      </div>
      <div className="flex text-lg text-black justify-center mt-10 mx-3 font-bold">
        OR
      </div>

      <div className="flex items-center justify-center flex-row h-full mt-8 mx-3 text-xs font-bold">
        ADD NEW HOME INSPECTOR
      </div>
      <div className="flex justify-center flex-row h-full mt-2 mx-3">
        <InputBox
          formText
          placeholder="Name"
          className={`w-80 ${formErrors.name ? "border-red-500" : ""}`}
          id="insp-name"
          type="text"
          value={name}
          onChange={onNameChange}
        />
        {formErrors.name && (
          <p className="ml-2 text-red-500 text-xs italic">{formErrors.name}</p>
        )}
        <span className="text-red-500 ml-1">*</span>
      </div>

      <div className="flex justify-center flex-row m-3 h-full">
        <InputBox
          formText
          placeholder="Phone"
          className={`w-80 ${formErrors.phone ? "border-red-500" : ""}`}
          id="insp-phone"
          type="text"
          maxLength={12}
          value={phone}
          onChange={onPhoneChange}
        />
        {formErrors.phone && (
          <p className="ml-2 text-red-500 text-xs italic">{formErrors.phone}</p>
        )}
        <span className="text-red-500 ml-1">*</span>
      </div>

      <div className="flex justify-center flex-row m-3 h-full">
        <InputBox
          formText
          placeholder="Email"
          className={`w-80 ${formErrors.email ? "border-red-500" : ""}`}
          id="insp-email"
          type="text"
          value={email}
          onChange={onEmailChange}
        />
        {formErrors.email && (
          <p className="ml-2 text-red-500 text-xs italic">{formErrors.email}</p>
        )}
        <span className="text-red-500 ml-1">*</span>
      </div>

      <div className="flex justify-center flex-row m-3 h-full">
        <InputBox
          formText
          placeholder="Company Name"
          className={`w-80 ${formErrors.compName ? "border-red-500" : ""}`}
          id="insp-cname"
          type="text"
          value={companyName}
          onChange={onCompanyNameChange}
        />
        {formErrors.compName && (
          <p className="ml-2 text-red-500 text-xs italic">
            {formErrors.compName}
          </p>
        )}
        <span className="text-red-500 ml-1">*</span>
      </div>
      <div className="flex justify-end m-2">
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

export default InspectorInfo;
