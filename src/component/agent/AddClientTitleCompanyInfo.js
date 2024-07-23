import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header2";
import createApi from "../../utils/api";
import Loader from "../loader_folder/Loader";

import {
  setClientTitleInclude,
  setClientTitleId,
  setClientAddTitleName,
  setClientAddTitlePhone,
  setClientAddTitleEmail,
  setClientAddTitleCompanyName,
  fetchTitles,
} from "../../store";
import InfoSection from "./InfoSection";

function AddClientTitleCompanyInfo({ onContinue, onBack }) {
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const api = createApi();

  const { firstName, lastName, email, phone, dob } = useSelector((state) => {
    return state.clientForm.form.clientInfo;
  });

  const { dop, purchaseValue, homeValue } = useSelector((state) => {
    return state.clientForm.form.propertyInfo;
  });

  const { manual, askLender, lender } = useSelector((state) => {
    return state.clientForm.form.lenderInfo;
  });

  const { include, titleData } = useSelector((state) => {
    return state.clientForm.form.titleCompanyInfo;
  });

  const titleId = useSelector((state) => {
    return state.clientForm.form.titleCompanyInfo.id;
  });

  const spouseInfo = useSelector((state) => {
    return state.clientForm.form.spouseInfo;
  });

  const { address, hasSpouse, id } = useSelector((state) => {
    return state.clientForm.form;
  });

  const agentId = useSelector((state) => {
    return state.profile.data.id;
  });

  const titles = useSelector((state) => {
    return state.titles.data;
  });

  const lenders = useSelector((state) => {
    return state.lenders.data;
  });

  let lenderDetails = null;
  if (lender.id) {
    lenderDetails = lenders.find((item) => String(item.id) === lender.id);
    // console.log(lenderDetails);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      sendDetailsToServer();
    }
  };

  const onTitleSelect = (event) => {
    console.log(event.target.value);
    if (event.target.value !== "Pick Your Home Lender")
      dispatch(setClientTitleId(event.target.value));
    else dispatch(setClientTitleId(""));
  };

  const onTitleNameIncludeChange = (event) => {
    dispatch(setClientTitleInclude(event.target.value));
  };

  const onTitleNameChange = (event) => {
    if ("lenderName" in formErrors) {
      delete formErrors.lenderName;
    }
    dispatch(setClientAddTitleName(event.target.value));
  };

  const onTitleEmailChange = (event) => {
    if ("lenderEmail" in formErrors) {
      delete formErrors.lenderEmail;
    }
    dispatch(setClientAddTitleEmail(event.target.value));
  };

  const onTitlePhoneChange = (event) => {
    if ("lenderPhone" in formErrors) {
      delete formErrors.lenderPhone;
    }
    const formattedInput = formatPhoneNumber(event.target.value);
    dispatch(setClientAddTitlePhone(formattedInput));
  };

  const onTitleCompanyChange = (event) => {
    if ("lenderCompany" in formErrors) {
      delete formErrors.lenderCompany;
    }
    dispatch(setClientAddTitleCompanyName(event.target.value));
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
    if (!dop) {
      errors.dop = "Required";
    }
    if (!purchaseValue) {
      errors.purchaseValue = "Required";
    }
    if (!homeValue) {
      errors.homeValue = "Required";
    }
    // console.log(errors);
    return errors;
  };

  const sendDetailsToServer = async () => {
    let formdata = new FormData();

    formdata.append("clientid", id);
    formdata.append("authid", agentId);
    formdata.append("lendername", titleData.name);
    formdata.append("lenderemail", titleData.email);
    formdata.append("lendercellphone", titleData.phone);
    formdata.append("lendercompanyname", titleData.companyName);
    formdata.append("lendernamefromoption", titleId);

    api
      .post("/api/homekeeperaddmytitlecompany", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status === "success") {
          dispatch(fetchTitles());
          setIsLoading(false);
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
                  <h6 className="did">
                    <b>Do you want to included Title Company?</b>{" "}
                    <span>
                      <input
                        className="inputchecked"
                        type="radio"
                        value="yes"
                        checked={include === "yes"}
                        onChange={onTitleNameIncludeChange}
                        name="paymenttype"
                      />{" "}
                      Yes
                    </span>{" "}
                    <span>
                      <input
                        type="radio"
                        name="paymenttype"
                        value="no"
                        checked={include === "no"}
                        onChange={onTitleNameIncludeChange}
                      />{" "}
                      No
                    </span>
                  </h6>

                  {include === "yes" && (
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="Ask_Lender-tab-pane"
                        role="tabpanel"
                        aria-labelledby="Ask_Lender-tab"
                        tabIndex="0"
                      >
                        <div className="row">
                          <div className="col-sm-4">
                            <select
                              onChange={onTitleSelect}
                              name="lendernamefromoption"
                              className="form-control"
                            >
                              <option selected>Pick Your Title Company</option>
                              {titles.length > 0
                                ? titles.map((dataforTitle) => (
                                    <option
                                      id={dataforTitle.id}
                                      value={dataforTitle.id}
                                      className="user"
                                    >
                                      {dataforTitle.name}
                                    </option>
                                  ))
                                : ""}
                            </select>
                            <h6>Or</h6>
                            <label>Add New Title Company</label>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Title name"
                                name="titlename"
                                value={titleData.name}
                                onChange={onTitleNameChange}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Email*"
                                name="titleemail"
                                value={titleData.email}
                                onChange={onTitleEmailChange}
                              />
                            </div>

                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Phone"
                                name="titlecellphone"
                                value={titleData.phone}
                                onChange={onTitlePhoneChange}
                                maxLength={12}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Company name"
                                name="titlecompany"
                                value={titleData.companyName}
                                onChange={onTitleCompanyChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                    Next
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

export default AddClientTitleCompanyInfo;
