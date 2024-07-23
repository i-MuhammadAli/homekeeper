import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-range-slider-input/dist/style.css";
import { ToastContainer, toast } from "react-toastify";
import { BsFillHouseFill } from "react-icons/bs";

import ClientMaintenanceTasks from "./ClientPageMaintenanceTask";

import "react-toastify/dist/ReactToastify.css";

import Graph1 from "./Graph1";
import { formatPrice } from "../../../utils/helpers";
import {
  setGraphLabels,
  setGraphHomeValue,
  setGraphLoanValue,
  setGraphEquityValue,
  setGraphAgentHomeValue,
  setGraphStartDate,
  setGraphEndDate,
  postAgentRequestHistory,
  setShowMaintenanceTaskPage,
  setShowCientPreview,
} from "../../../store";
import CountdownTimer from "./CountdownTimer";
import RefinanceNumber from "./RefinanceNumber";
import DocumentInfo from "./DocumentInfo";
import DocumentSection from "./DocumentSection";

function PreviewPage() {
  const dispatch = useDispatch();
  const [selectedPeriod, setSelectedPeriod] = useState(1000);
  const [extraPayment, setExtraPayment] = useState(0);
  const [timeToPayoff, setTimeToPayoff] = useState(null);
  const [interestSavings, setInterestSavings] = useState(null);
  const [pmiRemovalDate, setPmiRemovalDate] = useState(null);

  const [showFileAdd, setShowFileAdd] = useState(false);

  const [refinanceNumbers, setRefinanceNumbers] = useState({
    yearFifteen: {
      extraInterest: null,
      monthlyPayment: null,
    },
    yearThirty: {
      extraInterest: null,
      monthlyPayment: null,
    },
  });

  const [showRentalAmount, setShowRentalAmount] = useState(false);
  const [showAirBnBAmount, setShowAirBnBAmount] = useState(false);

  const {
    data: property,
    agent,
    lender,
    inspector,
    title,
  } = useSelector((state) => {
    return state.myProperties;
  });

  // const homeValue = useSelector((state) => {
  //   return state.myProperties.homeValue;
  // });

  const propertyApprRate = useSelector((state) => {
    return state.generic.data.propertyApprRate;
  });

  const {
    homeValues,
    loanValues,
    equities,
    monthlyPayment,
    remainingLoanMonths,
    cashOutRefinance,
  } = useSelector((state) => {
    return state.graph.data.fullData;
  });

  const { fullData } = useSelector((state) => {
    return state.graph.data;
  });

  useEffect(() => {
    fetchDataForPeriod(1000);
    if (property.Mortage_Insurance_removed === "never")
      calculateLoanEndReachingDate();
    if (property.Mortage_Insurance_removed === "equity")
      calculateEquityReachingDate();
    if (property.Mortage_Insurance_removed === "years")
      calculateYearsReachingDate();
    if (property.loanamount) calculateRefinance();
    if (property.rental_value) setShowRentalAmount(true);
    if (property.airbnb_value) setShowAirBnBAmount(true);
  }, []);

  const homeMaintenanceClickHandle = () => {
    // console.log("clicked");
    dispatch(setShowCientPreview(false));
    dispatch(setShowMaintenanceTaskPage(true));
  };

  const fetchDataForPeriod = (months) => {
    const labels = [];
    const homeValue = [];
    const agentHomeValue = [];

    const loanValue = [];
    const equityValue = [];
    const currentDate = new Date();
    const datePurchased = new Date(property.whenbuy);
    let startDate;
    if (!months || months === 1000) {
      startDate = new Date(
        datePurchased.getFullYear(),
        datePurchased.getMonth(),
        1
      );
    } else {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - months + 1,
        1
      );
    }
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    fullData.homeValues.forEach((point) => {
      const pointDate = new Date(point.date);
      if (pointDate >= startDate && pointDate <= endDate) {
        labels.push(
          pointDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        );

        homeValue.push(point.value);
      }
    });
    fullData.agentHomeValues.forEach((point) => {
      const pointDate = new Date(point.date);
      if (pointDate >= startDate && pointDate <= endDate) {
        agentHomeValue.push(point.value);
      }
    });

    fullData.loanValues.forEach((point) => {
      const pointDate = new Date(point.date);
      if (pointDate >= startDate && pointDate <= endDate) {
        loanValue.push(point.value);
      }
    });
    fullData.equities.forEach((point) => {
      const pointDate = new Date(point.date);
      if (pointDate >= startDate && pointDate <= endDate) {
        equityValue.push(point.value);
      }
    });

    dispatch(setGraphStartDate(startDate.toLocaleDateString()));
    dispatch(setGraphEndDate(endDate.toLocaleDateString()));
    dispatch(setGraphLabels(labels));
    dispatch(setGraphHomeValue(homeValue));
    dispatch(setGraphLoanValue(loanValue));
    dispatch(setGraphEquityValue(equityValue));
    dispatch(setGraphAgentHomeValue(agentHomeValue));
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(parseInt(e.target.value));
    fetchDataForPeriod(parseInt(e.target.value));
  };

  const calculateTimeToPayoff = (val) => {
    const interest = property.apr_rate / 100 / 12;
    // const totalMonths = client.lenderInfo.manual.years * 12;
    const totalMonths = remainingLoanMonths;
    // const loanAmount = client.lenderInfo.manual.loanAmount
    const loanAmount = loanValues[loanValues.length - 1].value;

    // console.log(interest, totalMonths, val);

    const monthlyPaymentWithoutExtra =
      (loanAmount * interest * Math.pow(1 + interest, totalMonths)) /
      (Math.pow(1 + interest, totalMonths) - 1);

    const totalInterestWithoutExtraPayment =
      monthlyPaymentWithoutExtra * totalMonths - loanAmount;

    // console.log(monthlyPaymentWithoutExtra, totalInterestWithoutExtraPayment);

    const monthlyPaymentWithExtra = monthlyPaymentWithoutExtra + parseInt(val);

    // console.log(monthlyPaymentWithExtra);

    let totalInterestWithExtraPayment = 0;
    let remainingBalance = loanAmount;
    let months = 0;

    while (remainingBalance > 0) {
      const interest = remainingBalance * (property.apr_rate / 100 / 12);
      const principal =
        monthlyPaymentWithExtra > remainingBalance
          ? remainingBalance
          : monthlyPaymentWithExtra - interest;
      totalInterestWithExtraPayment += interest;
      remainingBalance -= principal;
      months++;
    }
    // console.log(totalInterestWithExtraPayment);

    const totalSavings =
      totalInterestWithoutExtraPayment - totalInterestWithExtraPayment;
    setInterestSavings(Math.ceil(totalSavings));
    setTimeToPayoff(totalMonths - months);
  };

  const handleCalculate = (event) => {
    setExtraPayment(event.target.value);
    // calculateTimeToPayoff(event.target.value);
    if (event.target.value) calculateTimeToPayoff(event.target.value);
    else {
      setInterestSavings(null);
      setTimeToPayoff(null);
    }
  };

  const calculateEquityReachingDate = () => {
    // Convert APR to monthly interest rate
    const monthlyInterestRate = property.apr_rate / 12 / 100;

    // Calculate monthly payment
    const numberOfPayments = property.loanyear * 12;
    const monthlyPayment =
      (property.loanamount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    // Calculate equity each month
    let equity = 0;
    let currentBalance = loanValues[loanValues.length - 1].value;
    let currentDate = new Date();
    const currentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const key = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}`;
    const monthlyAppreciationRate = propertyApprRate[key] / (12 * 100);

    for (let month = 1; month <= remainingLoanMonths; month++) {
      const currentPropertyValue =
        homeValues[0].value * Math.pow(1 + monthlyAppreciationRate, month);

      // Calculate equity
      equity = currentPropertyValue - currentBalance;

      // Check if equity exceeds desired percentage
      if (
        equity >=
        (homeValues[0].value *
          property.Mortage_Insurance_removed_value_equity) /
          100
      ) {
        setPmiRemovalDate(currentDate.toLocaleString());
        return;
        // return currentDate;
      }

      // Update current balance
      currentBalance -= monthlyPayment - currentBalance * monthlyInterestRate;

      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // If desired equity percentage is not reached within the loan term, return null
    return null;
  };

  const calculateYearsReachingDate = () => {
    const dateObj = new Date(property.whenbuy);
    dateObj.setFullYear(
      dateObj.getFullYear() +
        parseInt(property.Mortage_Insurance_removed_value_years)
    );
    // console.log(dateObj.toLocaleString());
    setPmiRemovalDate(dateObj.toLocaleString());
  };

  const calculateLoanEndReachingDate = () => {
    const dateObj = new Date(property.whenbuy);
    dateObj.setFullYear(dateObj.getFullYear() + parseInt(property.loanyear));
    // console.log(dateObj.toLocaleString());
    setPmiRemovalDate(dateObj.toLocaleString());
  };

  const calculateRefinance = () => {
    const totalRemainingInterest =
      monthlyPayment * remainingLoanMonths -
      loanValues[loanValues.length - 1].value;

    // console.log(monthlyPayment);
    // console.log(totalRemainingInterest);

    let newMonthlyInterestRate,
      newTotalMonths,
      newMonthlyPayment,
      newTotalInterest,
      extraInterest;

    // Calculate total interest for new loan for 15 years
    newMonthlyInterestRate = 5.8 / 100 / 12;
    newTotalMonths = 15 * 12;
    const newMonthlyPayment15 =
      loanValues[loanValues.length - 1].value *
      (newMonthlyInterestRate /
        (1 - Math.pow(1 + newMonthlyInterestRate, -newTotalMonths)));
    newTotalInterest =
      newMonthlyPayment15 * newTotalMonths -
      loanValues[loanValues.length - 1].value;

    const extraInterest15 = totalRemainingInterest - newTotalInterest;

    // console.log(newTotalInterest);
    // console.log(extraInterest);
    // console.log(newMonthlyPayment);

    // setExtraInterest15Year(extraInterest);
    // setNewMonthlyPayment15Year(newMonthlyPayment);

    setRefinanceNumbers((prevState) => ({
      ...prevState,
      yearFifteen: {
        monthlyPayment: newMonthlyPayment15,
        extraInterest: extraInterest15,
      },
    }));

    // Calculate total interest for new loan for 30 years
    newMonthlyInterestRate = 6.9 / 100 / 12;
    newTotalMonths = 30 * 12;
    newMonthlyPayment =
      loanValues[loanValues.length - 1].value *
      (newMonthlyInterestRate /
        (1 - Math.pow(1 + newMonthlyInterestRate, -newTotalMonths)));
    newTotalInterest =
      newMonthlyPayment * newTotalMonths -
      loanValues[loanValues.length - 1].value;

    extraInterest = totalRemainingInterest - newTotalInterest;

    setRefinanceNumbers((prevState) => ({
      ...prevState,
      yearThirty: {
        monthlyPayment: newMonthlyPayment,
        extraInterest: extraInterest,
      },
    }));
  };

  const handleAgentRequestClick = (type) => {
    const formData = new FormData();
    if (type === "call") {
      formData.append("requestText", "requested a call");
    }
    if (type === "visit") {
      formData.append("requestText", "wants you to stop by");
    }
    if (type === "monthly airbnb") {
      formData.append("requestText", "requested monthly AirBnB value");
    }
    if (type === "monthly rental") {
      formData.append("requestText", "requested monthly rental value");
    }
    formData.append("requestType", type);
    formData.append("agent", agent.id);
    formData.append("property", property.id);
    formData.append("date", new Date().toLocaleDateString());
    dispatch(postAgentRequestHistory(formData));
    toast.success("Notified the agent!");
  };

  const handleFileAdd = () => {
    setShowFileAdd(true);
  };

  const onFileUploadCancel = () => {
    setShowFileAdd(false);
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <section
        className="home_owner"
        style={{ minWidth: "1440px", maxWidth: "1440px" }}
        onScroll={() => alert("scroll")}
      >
        <div className="mx-20">
          <h2 className="flex items-center">Welcome Back {property.fname}!</h2>

          <div
            className="home_owner_in"
            style={{ minWidth: "1200px", maxWidth: "1400px" }}
          >
            <div className="center_owner">
              <div className="mt-3 rounded flex flex-row property_section">
                <div className="flex items-center flex-row py-2.5 px-3">
                  <BsFillHouseFill className="sm:w-7 sm:h-7 h-5 w-5 text-white" />
                  <div className="text-white font-semibold text-md ml-2">
                    {property.address}
                  </div>
                </div>
              </div>
              {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="Maple-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Maple"
                    type="button"
                    role="tab"
                    aria-controls="Maple"
                    aria-selected="true"
                  >
                    <BsFillHouseFill className="w-5 h-5 text-white mr-1 mb-1" />
                    {myProperties.data.address}
                  </button>
                </li>
              </ul> */}
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="Maple"
                  role="tabpanel"
                  aria-labelledby="Maple-tab"
                >
                  <h3>
                    Home Maintenance
                    <a
                      className="hover:cursor-pointer"
                      onClick={homeMaintenanceClickHandle}
                    >
                      Add Home Maintenance
                    </a>
                    {/* <a href="javascript:void(0)" onClick={Edithm}>
                      Edit Home Maintenance
                    </a> */}
                  </h3>
                  <ClientMaintenanceTasks />
                  {/* {showMaintenanceTaskPage && (
                    <MaintenanceTasksPage back={toProperty} />
                  )} */}
                </div>
              </div>

              <div className="segn">
                {property.loanamount && (
                  <h3>
                    Home Value, Lone & Equity{" "}
                    <a className="askloan">
                      + Ask agent name to call me about loan option
                    </a>
                  </h3>
                )}

                <div className="row text-center">
                  <div className="col-sm-4">
                    <h1>
                      {formatPrice(
                        homeValues
                          ? parseInt(homeValues[homeValues.length - 1].value)
                          : "-"
                      )}
                    </h1>
                    <p>Home value estimate</p>
                  </div>
                  <div className="col-sm-4">
                    <h1 style={{ color: "#00ab44" }}>
                      {formatPrice(
                        equities.length
                          ? parseInt(equities[equities.length - 1].value)
                          : "-"
                      )}
                    </h1>
                    <p>Equity</p>
                  </div>
                  <div className="col-sm-4">
                    <h1 style={{ color: "#f4b243" }}>
                      {formatPrice(
                        loanValues.length
                          ? parseInt(loanValues[loanValues.length - 1].value)
                          : "-"
                      )}
                    </h1>
                    <p>Loan Amount</p>
                  </div>

                  <div className="col-sm-9 leftgraph">
                    <Graph1 />
                    <div className="text-righto"></div>
                  </div>
                  <div className="col-sm-3 rightgraph">
                    <select
                      name="timeperiod"
                      id="period"
                      value={selectedPeriod}
                      onChange={handlePeriodChange}
                      className="form-control"
                    >
                      <option value={1000}>All time records</option>
                      <option value={6}>6 Month</option>
                      <option value={12}>1 Year</option>
                      <option value={24}>2 Years</option>
                      <option value={60}>5 Years</option>
                      <option value={120}>10 Years</option>
                    </select>

                    <h6 className="bluegraph text-xs">
                      {formatPrice(
                        homeValues
                          ? parseInt(homeValues[homeValues.length - 1].value)
                          : "-"
                      )}{" "}
                      (Home value)
                    </h6>
                    <h6 className="greengraph text-xs">
                      {formatPrice(
                        equities.length
                          ? parseInt(equities[equities.length - 1].value)
                          : "-"
                      )}{" "}
                      (Equity)
                    </h6>
                    <h6 className="orangegraph text-xs">
                      {formatPrice(
                        loanValues.length
                          ? parseInt(loanValues[loanValues.length - 1].value)
                          : "-"
                      )}{" "}
                      (Loan)
                    </h6>
                    <p>
                      <img src="/../asset/images/icon/i_icon.png" alt="icon" />
                      Learn about tax-baseline
                    </p>
                  </div>
                </div>
              </div>

              {property.loanamount && (
                <div className="segn">
                  <h3>
                    Current Loan{" "}
                    <a href="#">
                      <img src="/../asset/images/icon/q_icon.png" alt="icon" />{" "}
                      Ask Lender to call me about loan option
                    </a>
                  </h3>

                  <div className="row text-center">
                    <div className="col-sm-3">
                      <div className="crnt_test">
                        <h4>
                          {formatPrice(
                            loanValues.length
                              ? parseInt(
                                  loanValues[loanValues.length - 1].value
                                )
                              : "-"
                          )}
                        </h4>
                        <p>Current loan amount</p>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="crnt_test">
                        <h4>
                          {property.apr_rate ? property.apr_rate + "%" : "-"}
                        </h4>
                        <p>Current APR</p>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="crnt_test">
                        <h4>
                          {monthlyPayment
                            ? formatPrice(Math.ceil(monthlyPayment))
                            : "-"}
                        </h4>
                        <p> Current Monthly Payment</p>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="crnt_test">
                        <h4>
                          {property.monthly_Mortage_Insurance
                            ? property.monthly_Mortage_Insurance
                            : "NO"}
                        </h4>

                        <p>Monthly PMI</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {property.loanamount && (
                <div className="segn">
                  <h3>Cash out Refinance</h3>
                  <h5>
                    Estimated cash you can take out{" "}
                    {/* <span>${separateAtThousands(cashrefine)}</span> */}
                    <span>
                      {cashOutRefinance ? formatPrice(cashOutRefinance) : "$-"}
                    </span>
                    <a className="akbtn" href="#">
                      Ask lender
                    </a>
                  </h5>
                </div>
              )}

              {property.loanamount && (
                <RefinanceNumber data={refinanceNumbers} />
              )}

              {property.loanamount && (
                <div className="segn">
                  <h3>Pay Extra Monthly</h3>
                  <h5>
                    If you pay $
                    <input
                      disabled={loanValues.length === 0}
                      type="number"
                      value={extraPayment || ""}
                      name="extramonth"
                      onChange={handleCalculate}
                    ></input>{" "}
                    more each month you will save
                    <span>
                      {interestSavings
                        ? `${formatPrice(interestSavings)}`
                        : "$0"}
                      {/* {saveextra ? saveextra : "$" + defaultvalue["xs"]} */}
                    </span>{" "}
                    and <br />
                    pay off loan{" "}
                    {/* <span>{savemonth ? savemonth : defaultvalue["x"]}</span>{" "} */}
                    <span>
                      {timeToPayoff
                        ? timeToPayoff > 1
                          ? `${timeToPayoff} months`
                          : `${timeToPayoff} month`
                        : "0 month"}
                    </span>{" "}
                    earlier
                  </h5>
                </div>
              )}
            </div>

            <div className="sidbr">
              <div className="set">
                <h4>Your Agent</h4>
                <div className="img">
                  <img
                    src={
                      agent.profileimg
                        ? agent.profileimg
                        : "/../asset/images/usr.png"
                    }
                    align="img"
                    alt="agent"
                  />
                </div>

                <h4></h4>
                <h3>{agent.name}</h3>
                <h6>{agent.companyname}</h6>
                <br />
                <h6>{agent.cellnumber}</h6>
                <h6>{agent.email}</h6>

                <a
                  className="callbtn"
                  onClick={() => handleAgentRequestClick("call")}
                >
                  <i className="fa-solid fa-phone-volume"></i> Ask Agent Call
                  you!
                </a>
              </div>

              <div className="set">
                <h4>Document Center</h4>
                <DocumentSection />

                <a className="callbtn cursor-pointer" onClick={handleFileAdd}>
                  <i className="fa fa-upload"></i> Add Document (~30 Mb)
                </a>
              </div>

              {loanValues.length > 0 && property.pmi === "yes" && (
                <div className="set">
                  <h4>PMI Removal Countdown</h4>
                  <CountdownTimer
                    targetDate={pmiRemovalDate}
                    // dop={client.propertyInfo.dop}
                    // years={client.lenderInfo.manual.mortgageYears}
                  />

                  <h6>Estimated PMI Remove Count</h6>
                  <h2>
                    {/* $
                  {forpropertylist.monthly_Mortage_Insurance
                    ? separateAtThousands(
                        forpropertylist.monthly_Mortage_Insurance
                      )
                    : ""} */}
                    {formatPrice(property.monthly_Mortage_Insurance) || "-"}
                  </h2>

                  <h6>Current Monthly PMI</h6>
                  {/* <h2>{endequitydate ? endequitydate : specificloantime}</h2> */}
                  <h2>
                    {new Date(pmiRemovalDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </h2>

                  <h6>
                    Estimated Date Base
                    <br />
                    Potential Home values
                  </h6>
                  <a className="ask" href="#">
                    <i className="fa-solid fa-phone-volume"></i> Ask Lender to
                    explain
                  </a>
                </div>
              )}

              {lender.id && (
                <div className="set">
                  <h4>Your Lender</h4>
                  <h3>{lender.name}</h3>
                  <h6>{lender.companyname}</h6>
                  <h6>{lender.cellnumber}</h6>
                  <h6>{lender.email}</h6>
                </div>
              )}

              {inspector.id && (
                <div className="set">
                  <h4>Your Home Inspector</h4>
                  <h3>{inspector.name}</h3>
                  <h6>{inspector.companyname}</h6>
                  <h6>{inspector.cellnumber}</h6>
                  <h6>{inspector.email}</h6>
                </div>
              )}

              {title.id && (
                <div className="set">
                  <h4>Your Title Company</h4>
                  <h3>{title.name}</h3>
                  <h6>{title.companyname}</h6>
                  <h6>{title.cellnumber}</h6>
                  <h6>{title.email}</h6>
                </div>
              )}

              <div className="set">
                <h4>Learn about rental values</h4>
                <h2 className={showRentalAmount ? "mo" : "blr"}>
                  {formatPrice(property.rental_value)}
                  {/* {separateAtThousands1(forpropertylist.rental_value)}{" "} */}
                  <span>
                    {property.rental_date}
                    {/* Rental value at {formatDate(forpropertylist.updated_at)} */}
                  </span>
                </h2>

                {/* <h2 className={forpropertylist.rental_value ? "mo" : "blr"}>
                  $ {separateAtThousands1(forpropertylist.rental_value)}{" "}
                  <span>
                    Rental value at {formatDate(forpropertylist.updated_at)}
                  </span>
                </h2> */}
                <h5>Monthly Rental Amount</h5>
                <a
                  className="ask"
                  onClick={() => handleAgentRequestClick("monthly rental")}
                >
                  Ask agent to Update Rental
                </a>

                <h2 className={showAirBnBAmount ? "mo" : "blr"}>
                  {formatPrice(property.airbnb_value)}
                  {/* ${separateAtThousands1(forpropertylist.Airbnb)}{" "} */}
                  <span>
                    {property.airbnb_date}

                    {/* AIRBNB value at {formatDate(forpropertylist.updated_at)} */}
                  </span>
                </h2>
                {/* <h2 className={forpropertylist.Airbnb ? "mo" : "blr"}>
                  ${separateAtThousands1(forpropertylist.Airbnb)}{" "}
                  <span>
                    AIRBNB value at {formatDate(forpropertylist.updated_at)}
                  </span>
                </h2> */}
                <h5>Monthly AIRBNB Amount</h5>
                <a
                  className="ask"
                  onClick={() => handleAgentRequestClick("monthly airbnb")}
                >
                  Ask agent to Update AirBnB
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showFileAdd && (
        <>
          <DocumentInfo onClose={onFileUploadCancel} />
        </>
      )}
    </>
  );
}

export default PreviewPage;
