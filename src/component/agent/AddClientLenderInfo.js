import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header2";
import {
  //   setClientLenderLoanOption,
  //   setClientLenderCashOption,
  setClientLenderType,
  setClientLenderManualOption,
  setClientLenderAskLender,
  setClientLenderId,
  setClientAddLenderName,
  setClientAddLenderPhone,
  setClientAddLenderEmail,
  setClientAddLenderCompanyName,
  setClientLenderManualLoanAmount,
  setClientLenderManualYears,
  setClientLenderManualApr,
  setClientLenderManualIsMortgageInsurance,
  setClientLenderManualMonthlyMortgage,
  setClientLenderManualMortgageRemovalBasis,
  //   setClientLenderManualMortgageEquity,
  //   setClientLenderManualMortgageYears,
  setClientLenderManualMortgageYearsValue,
  setClientLenderManualMortgageEquityValue,
  fetchLenders,
} from "../../store";
import createApi from "../../utils/api";
import Loader from "../loader_folder/Loader";
import InfoSection from "./InfoSection";
import { formatPrice } from "../../utils/helpers";

function AddClientLenderInfo({ onContinue, onBack }) {
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [loanAmountDisplay, setLoanAmountDisplay] = useState("$");
  const dispatch = useDispatch();
  const api = createApi();

  const { paymentType, cash, manualOption, manual, askLender, lender } =
    useSelector((state) => {
      return state.clientForm.form.lenderInfo;
    });

  const { id } = useSelector((state) => {
    return state.clientForm.form;
  });

  const agentId = useSelector((state) => {
    return state.profile.data.id;
  });

  const lenders = useSelector((state) => {
    return state.lenders.data;
  });

  let lenderDetails = { name: "" };
  if (lender.id !== "") {
    lenderDetails = lenders.find((item) => String(item.id) === lender.id);
    // console.log(lenderDetails);
  }

  // console.log(lenders);

  const onLoanSelect = (event) => {
    // console.log(event.target.value);
    // setFormErrors({});
    dispatch(setClientLenderType(event.target.value));
    // dispatch(setClientLenderCashOption(false));
    // dispatch(setClientLenderLoanOption(true));
  };

  //   const onCashSelect = (event) => {
  //     dispatch(setClientLenderLoanOption(false));
  //     dispatch(setClientLenderCashOption(true));
  //   };

  const selectManual = (event) => {
    setFormErrors({});
    dispatch(setClientLenderAskLender(false));
    dispatch(setClientLenderManualOption(true));
  };

  const selectLender = (event) => {
    setFormErrors({});
    dispatch(setClientLenderManualOption(false));
    dispatch(setClientLenderAskLender(true));
  };

  const onLoanAmountChange = (event) => {
    if ("loanAmount" in formErrors) {
      delete formErrors.loanAmount;
    }
    // const input = event.target.value.replace(/[$,]/g, "");
    const input = event.target.value.replace(/\D/g, "");

    // const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // dispatch(setClientLenderManualLoanAmount("$" + formattedInput));
    dispatch(setClientLenderManualLoanAmount(input));
    // setLoanAmountDisplay(formatPrice(input));
  };

  const onLoanYearsChange = (event) => {
    if ("years" in formErrors) {
      delete formErrors.years;
    }
    dispatch(setClientLenderManualYears(event.target.value));
  };

  const onLoanAprChange = (event) => {
    if ("apr" in formErrors) {
      delete formErrors.apr;
    }
    dispatch(setClientLenderManualApr(event.target.value));
  };

  const onIsMortgageInsuranceChange = (event) => {
    if ("monthlyMortgage" in formErrors) {
      delete formErrors.monthlyMortgage;
    }
    if ("mortgageEquity" in formErrors) {
      delete formErrors.mortgageEquity;
    }
    if ("mortgageYears" in formErrors) {
      delete formErrors.mortgageYears;
    }

    dispatch(setClientLenderManualIsMortgageInsurance(event.target.value));
  };

  const onMonthlyMortgageChange = (event) => {
    if ("monthlyMortgage" in formErrors) {
      delete formErrors.monthlyMortgage;
    }
    // const input = event.target.value.replace(/[$,]/g, "");
    const input = event.target.value.replace(/\D/g, "");

    // const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    dispatch(setClientLenderManualMonthlyMortgage(input));
  };

  const onWhenMortgageRemovedChange = (event) => {
    // console.log(event.target.value);
    if ("mortgageEquity" in formErrors) {
      delete formErrors.mortgageEquity;
    }
    if ("mortgageYears" in formErrors) {
      delete formErrors.mortgageYears;
    }
    dispatch(setClientLenderManualMortgageYearsValue(""));
    dispatch(setClientLenderManualMortgageEquityValue(""));
    dispatch(setClientLenderManualMortgageRemovalBasis(event.target.value));
  };

  const onMortgageEquityChange = (event) => {
    if ("mortgageEquity" in formErrors) {
      delete formErrors.mortgageEquity;
    }
    dispatch(setClientLenderManualMortgageEquityValue(event.target.value));
  };

  const onMortgageYearsChange = (event) => {
    if ("mortgageYears" in formErrors) {
      delete formErrors.mortgageYears;
    }
    dispatch(setClientLenderManualMortgageYearsValue(event.target.value));
  };

  const onLenderSelect = (event) => {
    console.log(event.target.value);
    if (event.target.value !== "Pick Your Home Lender")
      dispatch(setClientLenderId(event.target.value));
    else dispatch(setClientLenderId(""));
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

  const onLenderNameChange = (event) => {
    if ("lenderName" in formErrors) {
      delete formErrors.lenderName;
    }
    dispatch(setClientAddLenderName(event.target.value));
  };

  const onLenderEmailChange = (event) => {
    if ("lenderEmail" in formErrors) {
      delete formErrors.lenderEmail;
    }
    dispatch(setClientAddLenderEmail(event.target.value));
  };

  const onLenderPhoneChange = (event) => {
    if ("lenderPhone" in formErrors) {
      delete formErrors.lenderPhone;
    }
    const formattedInput = formatPhoneNumber(event.target.value);
    dispatch(setClientAddLenderPhone(formattedInput));
  };

  const onLenderCompanyChange = (event) => {
    if ("lenderCompany" in formErrors) {
      delete formErrors.lenderCompany;
    }
    dispatch(setClientAddLenderCompanyName(event.target.value));
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
    if (paymentType === "loan") {
      if (manualOption) {
        if (manual.loanAmount === "$") {
          errors.loanAmount = "Required";
        }
        if (!manual.years) {
          errors.years = "Required";
        }
        if (!manual.apr) {
          errors.apr = "Required";
        }

        if (manual.isMortgageInsurance === "yes") {
          if (manual.monthlyMortgage === "$") {
            errors.monthlyMortgage = "Required";
          }

          if (manual.mortgageRemovalBasis === "equity") {
            if (!manual.mortgageEquity) {
              errors.mortgageEquity = "Required";
            }
          }
          if (manual.mortgageRemovalBasis === "years") {
            if (!manual.mortgageYears) {
              errors.mortgageYears = "Required";
            }
          }
        }
      }
    }
    // console.log(errors);
    return errors;
  };

  const sendDetailsToServer = async () => {
    let formdata = new FormData();

    formdata.append("clientid", id);
    formdata.append("authid", agentId);
    formdata.append("lendername", lender.lendorData.name);
    formdata.append("lenderemail", lender.lendorData.email);
    formdata.append("lendercellphone", lender.lendorData.phone);
    formdata.append("lendercompanyname", lender.lendorData.companyName);
    formdata.append("lendernamefromoption", lender.id);

    formdata.append("paymenttype", paymentType);

    formdata.append("loanapr", manual.apr);
    formdata.append("loanpmi", manual.isMortgageInsurance);
    formdata.append("loanamount", manual.loanAmount);
    formdata.append("loanyear", manual.years);

    formdata.append("monthlymortageinsurance", manual.monthlyMortgage);

    formdata.append("mortageinsuranceremoved", manual.mortgageRemovalBasis);
    formdata.append("mortagepercentageequity", manual.mortgageEquity);
    formdata.append("moretageyearsremoved", manual.mortgageYears);
    formdata.append("downpaymentkey", "");
    formdata.append("downpaymentvalue", "");

    api
      .post("/api/homekeeperaddmylender", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status === "success") {
          dispatch(fetchLenders());
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
  // console.log(formErrors);

  // const [forloanvalidation, setstateforloanvalidation] = useState("");
  // const [fillmanually, setstateforfillmanually] = useState("");
  // const [forreadonly, setstateforreadonly] = useState("");
  // const [forreadonly1, setstateforreadonly1] = useState("");
  // const [forreadonly2, setstateforreadonly2] = useState("");

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
                    <b>Did you pay with</b>{" "}
                    <span>
                      <input
                        className="inputchecked"
                        type="radio"
                        value="loan"
                        checked={paymentType === "loan"}
                        onChange={onLoanSelect}
                        name="paymenttype"
                      />{" "}
                      Loan
                    </span>{" "}
                    <span>
                      <input
                        type="radio"
                        name="paymenttype"
                        value="cash"
                        checked={paymentType === "cash"}
                        onChange={onLoanSelect}
                      />{" "}
                      Cash
                    </span>
                  </h6>

                  {paymentType === "loan" && (
                    <>
                      <ul
                        className="nav nav-tabs thisdivremove"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <span>
                            <button
                              name="asklender"
                              //   disabled={askLender ? true : false}
                              className={"nav-link"}
                              id="home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#home-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="Fill_Out_Manually-tab-pane"
                              aria-selected="true"
                              onClick={selectManual}
                            >
                              <span></span> Fill Out Manually
                            </button>
                          </span>
                        </li>

                        <li className="nav-item" role="presentation">
                          <span>
                            <button
                              name="fillmanually"
                              //   disabled={askLender ? false : true}
                              className={"nav-link"}
                              id="Ask_Lender-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#Ask_Lender-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="Ask_Lender-tab-pane"
                              aria-selected="false"
                              onClick={selectLender}
                            >
                              <span></span> Ask Lender
                            </button>
                          </span>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        {!askLender && (
                          <div
                            className="tab-pane fade show active"
                            id="home-tab-pane"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                            tabIndex="0"
                          >
                            <div className="row Ask_Lender">
                              <div className="col-sm-12">
                                <label className="lb">
                                  Fill Loan Information Manually
                                </label>

                                <div className="set form-group">
                                  <label>What is the Loan Amount:</label>

                                  <input
                                    type="text"
                                    name="loanamount"
                                    value={formatPrice(manual.loanAmount)}
                                    onChange={onLoanAmountChange}
                                  />
                                  {formErrors.loanAmount ? (
                                    <>
                                      <span className="formerrorforvalidation">
                                        {formErrors.loanAmount}
                                      </span>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="set form-group">
                                  <label>How many years of the Loan:</label>
                                  <input
                                    type="number"
                                    name="loanyear"
                                    value={manual.years}
                                    onChange={onLoanYearsChange}
                                  />
                                  {formErrors.years ? (
                                    <>
                                      <span className="formerrorforvalidation">
                                        {formErrors.years}
                                      </span>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="set form-group">
                                  <label>Whats is APR:</label>
                                  <input
                                    type="number"
                                    name="apr_rate"
                                    value={manual.apr}
                                    onChange={onLoanAprChange}
                                  />
                                  {formErrors.apr ? (
                                    <>
                                      <span className="formerrorforvalidation">
                                        {formErrors.apr}
                                      </span>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="set form-group">
                                  <label>
                                    Is there Mortage Insurance (PMI or MI):
                                  </label>
                                  <input
                                    type="radio"
                                    name="loanpmi"
                                    id="mortageinsurance"
                                    value="yes"
                                    checked={
                                      manual.isMortgageInsurance === "yes"
                                    }
                                    className="qualitypmi clearformhide"
                                    onChange={onIsMortgageInsuranceChange}
                                  />
                                  <span className="radiobtn">
                                    <span>Yes</span>
                                  </span>
                                  <input
                                    type="radio"
                                    value="no"
                                    name="loanpmi"
                                    checked={
                                      manual.isMortgageInsurance === "no"
                                    }
                                    className="qualitypmi clearformhide"
                                    onChange={onIsMortgageInsuranceChange}
                                  />
                                  <span className="radiobtn">
                                    <span>No</span>
                                  </span>
                                </div>
                                {manual.isMortgageInsurance === "yes" && (
                                  <>
                                    <div className="showhide">
                                      <div className="set form-group">
                                        <label>
                                          What is the monthly Mortage Insurance:
                                        </label>
                                        <input
                                          type="text"
                                          name="monthly_Mortage_Insurance"
                                          className="clearformhide"
                                          value={formatPrice(
                                            manual.monthlyMortgage
                                          )}
                                          onChange={onMonthlyMortgageChange}
                                        />
                                        {formErrors.monthlyMortgage ? (
                                          <>
                                            <span className="formerrorforvalidation">
                                              {formErrors.monthlyMortgage}
                                            </span>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </div>

                                      <div className="set form-group">
                                        <label>
                                          When is the Mortage Insurance removed?
                                        </label>
                                        <input
                                          type="radio"
                                          name="mortageinsuranceremoved"
                                          className="qualitypmi clearformhide"
                                          onChange={onWhenMortgageRemovedChange}
                                          value="never"
                                          checked={
                                            manual.mortgageRemovalBasis ===
                                            "never"
                                          }
                                        />
                                        <span className="radiobtn">
                                          <span>
                                            Never removed, its for the life of
                                            the loan
                                          </span>
                                        </span>
                                        <br />
                                        <input
                                          type="radio"
                                          name="mortageinsuranceremoved"
                                          className="qualitypmi clearformhide"
                                          value="equity"
                                          checked={
                                            manual.mortgageRemovalBasis ===
                                            "equity"
                                          }
                                          onChange={onWhenMortgageRemovedChange}
                                        />

                                        <span className="radiobtn">
                                          <span>
                                            After{"  "}
                                            <input
                                              onChange={onMortgageEquityChange}
                                              disabled={
                                                manual.mortgageRemovalBasis !==
                                                "equity"
                                              }
                                              style={{
                                                width: "60px",
                                                height: "34px",
                                              }}
                                              type="text"
                                              name="equity"
                                              value={manual.mortgageEquity}
                                            ></input>{" "}
                                            % Equity is reached
                                          </span>
                                          {formErrors.mortgageEquity ? (
                                            <>
                                              <span className="formerrorforvalidation">
                                                {formErrors.mortgageEquity}
                                              </span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </span>
                                        <br />
                                        <input
                                          type="radio"
                                          name="mortageinsuranceremoved"
                                          className="qualitypmi clearformhide"
                                          value="years"
                                          checked={
                                            manual.mortgageRemovalBasis ===
                                            "years"
                                          }
                                          onChange={onWhenMortgageRemovedChange}
                                        />

                                        <span className="radiobtn ">
                                          <span>
                                            After{"  "}
                                            <input
                                              style={{
                                                width: "60px",
                                                height: "34px",
                                              }}
                                              type="text"
                                              disabled={
                                                manual.mortgageRemovalBasis !==
                                                "years"
                                              }
                                              name="mortgageYears"
                                              value={manual.mortgageYears}
                                              onChange={onMortgageYearsChange}
                                              className="clearformhide"
                                            ></input>{" "}
                                            Years
                                          </span>
                                          {formErrors.mortgageYears ? (
                                            <>
                                              <span className="formerrorforvalidation">
                                                {formErrors.mortgageYears}
                                              </span>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        <div
                          className="tab-pane fade "
                          id="Ask_Lender-tab-pane"
                          role="tabpanel"
                          aria-labelledby="Ask_Lender-tab"
                          tabIndex="0"
                        >
                          <div className="row">
                            <div className="col-sm-4">
                              <select
                                onChange={onLenderSelect}
                                name="lendernamefromoption"
                                className="form-control"
                              >
                                <option selected>Pick Your Home Lender</option>
                                {lenders.length > 0
                                  ? lenders.map((dataforLenders) => (
                                      <option
                                        id={dataforLenders.id}
                                        value={dataforLenders.id}
                                        className="user"
                                      >
                                        {dataforLenders.name}
                                      </option>
                                    ))
                                  : ""}
                              </select>
                              <h6>Or</h6>
                              <label>Add New Lender</label>
                              <div className="form-group">
                                <input
                                  type="text"
                                  placeholder="Lender name"
                                  name="lender.lendername"
                                  value={lender.lendorData.name}
                                  onChange={onLenderNameChange}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  placeholder="Email*"
                                  name="lender.lenderemail"
                                  value={lender.lendorData.email}
                                  onChange={onLenderEmailChange}
                                />
                              </div>

                              <div className="form-group">
                                <input
                                  type="text"
                                  placeholder="Cell phone"
                                  name="lender.lendercellphone"
                                  value={lender.lendorData.phone}
                                  onChange={onLenderPhoneChange}
                                  maxLength={12}
                                />
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  placeholder="Company name"
                                  name="lender.lendercompany"
                                  value={lender.lendorData.companyName}
                                  onChange={onLenderCompanyChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
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

export default AddClientLenderInfo;
