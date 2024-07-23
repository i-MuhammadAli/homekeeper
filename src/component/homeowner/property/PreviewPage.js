import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-range-slider-input/dist/style.css";
import { ToastContainer, toast } from "react-toastify";
import { BsFillHouseFill } from "react-icons/bs";
import {
  FaArrowLeftLong,
  FaScrewdriverWrench,
  FaEnvelope,
  FaPhone,
  FaBuilding,
} from "react-icons/fa6";

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
import EquityLoanChart from "./EquityLoanChart";

function PreviewPage({ handleDocumentUploadMobile }) {
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
      formData.append("requestText", "requested Monthly AirBnB value");
    }
    if (type === "monthly rental") {
      formData.append("requestText", "requested Monthly Rental value");
    }
    if (type === "pmi") {
      formData.append("requestText", "requested PMI explanation");
    }
    if (type === "home value") {
      formData.append("requestText", "requested Home Value updation");
    }
    if (type === "loan") {
      formData.append("requestText", "requested Loan Options");
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
      <div style={{ background: "#f2f7f9" }}>
        <div className="sm:mr-20 sm:ml-20 pt-9 mr-2 ml-2 flex flex-row items-center">
          <div className="flex flex-row items-center sm:space-x-4 space-x-2">
            <div className="sm:text-3xl text-lg font-bold">
              Welcome Back {property.fname}!
            </div>
          </div>
        </div>
        <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 mt-3 rounded flex flex-row items-center property_section">
          <div className="flex items-center flex-row py-2.5 px-3">
            <BsFillHouseFill className="sm:w-7 sm:h-7 h-5 w-5 text-white" />
            <div className="text-white font-semibold text-md ml-2">
              {property.address}
            </div>
          </div>
        </div>

        <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 min-h-screen flex sm:flex-row flex-col rounded sm:space-x-3">
          <div className="sm:w-4/5 flex flex-col sm:mb-10">
            <div className="overflow-auto bg-white rounded-sm shadow-sm mt-2">
              <div className="sm:flex hidden flex-row justify-between font-bold text-md mt-4 ml-4 mr-4 text-black mb-1">
                HOME MAINTENANCE
                <button
                  onClick={homeMaintenanceClickHandle}
                  className="bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold sm:flex hidden items-center button_color"
                >
                  <FaScrewdriverWrench className="w-4 h-4 text-white mr-1" />
                  Maintenance Items
                </button>
              </div>
              <div className="sm:hidden flex flex-row font-bold text-md mt-4 mb-1 text-black items-center justify-center">
                HOME MAINTENANCE
              </div>
              <hr className="sm:flex hidden border-t-2 border-sky-600 -mt-1 w-8 ml-4" />
              <hr className="sm:hidden flex border-t-2 border-sky-600 mt-0 w-8 ml-44" />

              <div className="sm:mr-4 sm:ml-4 sm:mb-4 ml-2 mr-2 mb-4 mt-4">
                <ClientMaintenanceTasks />
              </div>

              <div className="sm:hidden flex items-center justify-center mb-4">
                <button
                  onClick={homeMaintenanceClickHandle}
                  className="bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold items-center button_color"
                >
                  <FaScrewdriverWrench className="w-4 h-4 text-white mr-1" />
                  Maintenance Items
                </button>
              </div>
            </div>

            <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
              <div className="sm:flex hidden flex-row justify-between font-bold text-md mt-4 ml-4 mr-4 text-black mb-1">
                HOME VALUE, LOAN & EQUITY
                <button
                  onClick={() => handleAgentRequestClick("home value")}
                  className="bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold sm:flex hidden items-center button_color"
                >
                  Request Agent For Home Value Update!
                </button>
              </div>
              <div className="sm:hidden flex flex-row font-bold text-md mt-4 mb-1 text-black items-center justify-center">
                HOME VALUE, LOAN & EQUITY
              </div>
              <hr className="sm:flex hidden border-t-2 border-sky-600 -mt-1 w-8 ml-4" />
              <hr className="sm:hidden flex border-t-2 border-sky-600 mt-0 w-8 ml-44" />

              <div className="sm:flex hidden sm:mr-12 sm:ml-12 sm:mb-4 ml-2 mr-2 mb-4 mt-8">
                <div className="flex flex-row sm:ml-4 sm:mr-4 sm:space-x-20">
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className="font-extrabold text-4xl"
                      style={{ color: "#4472c4" }}
                    >
                      {formatPrice(
                        homeValues
                          ? parseInt(homeValues[homeValues.length - 1].value)
                          : "-"
                      )}
                    </div>
                    <div className="text-sm font-semibold">Home Value</div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className="font-extrabold text-4xl"
                      style={{ color: "#00ab44" }}
                    >
                      {formatPrice(
                        equities.length
                          ? parseInt(equities[equities.length - 1].value)
                          : "-"
                      )}
                    </div>
                    <div className="text-sm font-semibold">Equity</div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className="font-extrabold text-4xl"
                      style={{ color: "#f4b243" }}
                    >
                      {formatPrice(
                        loanValues.length
                          ? parseInt(loanValues[loanValues.length - 1].value)
                          : "-"
                      )}
                    </div>
                    <div className="text-sm font-semibold">Loan</div>
                  </div>
                </div>
              </div>

              <div className="sm:flex hidden sm:mr-4 sm:ml-4 flex flex-row space-x-2 mb-4">
                <div className="w-3/4">
                  <Graph1 />
                </div>
                <div className="w-1/4 flex flex-col">
                  <div>
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
                  </div>
                  {property.loanamount && (
                    <div className="mt-3">
                      <EquityLoanChart
                        home={parseInt(homeValues[homeValues.length - 1].value)}
                        equity={parseInt(equities[equities.length - 1].value)}
                        loan={parseInt(loanValues[loanValues.length - 1].value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:hidden flex flex-col mb-4 space-y-5 ml-2 mr-2 mt-4">
                <div>
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
                </div>

                <div>
                  <Graph1 />
                </div>

                <div className="flex flex-row ml-2 mr-2 space-x-6">
                  <div className="flex flex-col items-center">
                    <div
                      className="font-extrabold text-lg"
                      style={{ color: "#4472c4" }}
                    >
                      {formatPrice(
                        homeValues
                          ? parseInt(homeValues[homeValues.length - 1].value)
                          : "-"
                      )}
                    </div>
                    <div className="text-sm font-semibold">Home Value</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="font-extrabold text-lg"
                      style={{ color: "#00ab44" }}
                    >
                      {formatPrice(
                        equities.length
                          ? parseInt(equities[equities.length - 1].value)
                          : "-"
                      )}
                    </div>
                    <div className="text-sm font-semibold">Equity</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div
                      className="font-extrabold text-lg"
                      style={{ color: "#f4b243" }}
                    >
                      {formatPrice(
                        loanValues.length
                          ? parseInt(loanValues[loanValues.length - 1].value)
                          : "-"
                      )}
                    </div>
                    <div className="text-sm font-semibold">Loan</div>
                  </div>
                </div>

                <button
                  onClick={() => handleAgentRequestClick("home value")}
                  className="bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold items-center button_color"
                >
                  Request Agent For Home Value Update!
                </button>
              </div>
            </div>

            {property.loanamount && (
              <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
                <div className="sm:flex hidden flex-row justify-between font-bold text-md mt-4 ml-4 mr-4 mb-1 text-black">
                  CURRENT LOAN
                  <button
                    onClick={() => handleAgentRequestClick("loan")}
                    className="bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold sm:flex hidden items-center button_color"
                  >
                    Request Agent For Loan Options!
                  </button>
                </div>
                <div className="sm:hidden flex flex-row font-bold text-md mt-4 mb-1 text-black items-center justify-center">
                  CURRENT LOAN
                </div>
                <hr className="sm:flex hidden border-t-2 border-sky-600 -mt-1 w-8 ml-4" />
                <hr className="sm:hidden flex border-t-2 border-sky-600 mt-0 w-8 ml-44" />

                <div className="sm:ml-4 sm:mr-4 ml-2 mr-2 sm:mb-4 mb-4 mt-8">
                  <div className="flex sm:flex-row flex-col sm:space-x-6 sm:space-y-0 space-y-3">
                    <div className="flex flex-col items-center justify-center sm:h-28 h-20 sm:w-48 bg-gray-100 sm:space-y-2">
                      <div className="text-2xl font-bold">
                        {formatPrice(
                          loanValues.length
                            ? parseInt(loanValues[loanValues.length - 1].value)
                            : "-"
                        )}
                      </div>
                      <div className="text-sm font-semibold">
                        Current loan amount
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center sm:h-28 h-20 sm:w-48 bg-gray-100 sm:space-y-2">
                      <div className="text-2xl font-bold">
                        {property.apr_rate ? property.apr_rate + "%" : "-"}
                      </div>
                      <div className="text-sm font-semibold">Current APR</div>
                    </div>

                    <div className="flex flex-col items-center justify-center sm:h-28 h-20 sm:w-48 bg-gray-100 sm:space-y-2">
                      <div className="text-2xl font-bold">
                        {monthlyPayment
                          ? formatPrice(Math.ceil(monthlyPayment))
                          : "-"}
                      </div>
                      <div className="text-sm font-semibold">
                        Current Monthly Payment
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center sm:h-28 h-20 sm:w-48 bg-gray-100 sm:space-y-2">
                      <div className="text-2xl font-bold">
                        {property.monthly_Mortage_Insurance
                          ? property.monthly_Mortage_Insurance
                          : "NO"}
                      </div>
                      <div className="text-sm font-semibold">Monthly PMI</div>
                    </div>

                    <button
                      onClick={() => handleAgentRequestClick("loan")}
                      className="bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold sm:hidden items-center button_color mt-4"
                    >
                      Request Agent For Loan Options!
                    </button>
                  </div>
                </div>
              </div>
            )}

            {property.loanamount && (
              <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
                <div className="sm:flex hidden flex-row font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black">
                  CASH OUT REFINANCE
                </div>
                <div className="sm:hidden flex flex-row font-bold text-md mt-4 mb-1 text-black items-center justify-center">
                  CASH OUT REFINANCE
                </div>
                <hr className="sm:flex hidden border-t-2 border-sky-600 mt-0 w-8 ml-4" />
                <hr className="sm:hidden flex border-t-2 border-sky-600 mt-0 w-8 ml-44" />

                <div className="flex sm:ml-4 sm:mr-4 ml-2 mr-2 sm:mb-4 mb-4 mt-6 items-center justify-center">
                  <div className="flex sm:flex-row flex-col sm:space-x-1 sm:space-y-0 space-y-3 items-center">
                    <div className="label_color" style={{ fontSize: "20px" }}>
                      Estimated cash you can take out{" "}
                    </div>
                    <div className="numbers_color font-bold sm:text-5xl text-3xl">
                      {cashOutRefinance ? formatPrice(cashOutRefinance) : "$-"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {property.loanamount && <RefinanceNumber data={refinanceNumbers} />}

            {property.loanamount && (
              <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
                <div className="sm:flex hidden flex-row font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black">
                  PAY EXTRA MONTHLY
                </div>
                <div className="sm:hidden flex flex-row font-bold text-md mt-4 mb-1 text-black items-center justify-center">
                  PAY EXTRA MONTHLY
                </div>
                <hr className="sm:flex hidden border-t-2 border-sky-600 mt-0 w-8 ml-4" />
                <hr className="sm:hidden flex border-t-2 border-sky-600 mt-0 w-8 ml-44" />

                <div className="flex flex-col sm:ml-4 sm:mr-4 ml-2 mr-2 sm:mb-4 mb-4 mt-6 items-center justify-center space-y-2">
                  <div className="flex sm:flex-row flex-col items-center justify-center sm:space-x-1 sm:space-y-0 space-y-2 items-baseline">
                    <div
                      className="flex items-center justify-center label_color"
                      style={{ fontSize: "20px" }}
                    >
                      If you pay ${" "}
                      <input
                        disabled={loanValues.length === 0}
                        type="number"
                        value={extraPayment || ""}
                        name="extramonth"
                        onChange={handleCalculate}
                        className="custom_input"
                      ></input>{" "}
                    </div>
                    <div
                      className="flex items-center justify-center label_color"
                      style={{ fontSize: "20px" }}
                    >
                      more each month you will save
                    </div>
                    <div className="flex items-center justify-center numbers_color font-bold sm:text-4xl text-xl">
                      {interestSavings
                        ? `${formatPrice(interestSavings)}`
                        : "$0"}
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center space-x-1 items-baseline">
                    <div className="label_color" style={{ fontSize: "20px" }}>
                      and pay off loan{" "}
                    </div>
                    <div className="numbers_color font-bold sm:text-4xl text-xl">
                      {timeToPayoff
                        ? timeToPayoff > 1
                          ? `${timeToPayoff} months`
                          : `${timeToPayoff} month`
                        : "0 month"}{" "}
                    </div>
                    <div className="label_color" style={{ fontSize: "20px" }}>
                      earlier
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Second Section */}
          <div className="sm:w-1/3 flex flex-col">
            <div className="overflow-auto bg-white rounded-sm shadow-sm mt-2">
              <div className="flex font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black items-center justify-center">
                YOUR AGENT
              </div>
              <hr className="flex border-t-2 border-sky-600 -mt-0 w-8 ml-44" />
              <div className="flex flex-col items-center justify-center mb-4 space-y-2">
                <img
                  src={
                    agent.profileimg
                      ? agent.profileimg
                      : "/../asset/images/usr.png"
                  }
                  className="w-24 h-24 rounded-full border-2 border-white"
                  alt="agent"
                />
                <div className="font-bold text-2xl text-center">
                  {agent.name}
                </div>
                <div className="flex items-center flex-row">
                  <FaPhone className="w-4 h-3.5 text-black mr-2" />
                  <div className="info_style text-md">{agent.cellnumber}</div>
                </div>
                <div className="flex items-center flex-row">
                  <FaEnvelope className="w-4 h-3.5 text-black mr-2" />
                  <div className="info_style text-md">{agent.email}</div>
                </div>
                {agent.companyname && (
                  <div className="flex items-center flex-row">
                    <FaBuilding className="w-4 h-4 text-black mr-2" />
                    <div className="info_style text-md">
                      {agent.companyname}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
              <div className="flex font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black items-center justify-center">
                DOCUMENT CENTER
              </div>
              <hr className="flex border-t-2 border-sky-600 -mt-0 w-8 ml-44" />
              <DocumentSection
                parentClass="m-3"
                fileNameSize="text-sm"
                fileNameTextLimit={24}
              />
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={handleFileAdd}
                  className="sm:flex hidden bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold items-center button_color"
                >
                  <i className="fa fa-upload"></i> Add Document (~30 Mb)
                </button>
                <button
                  onClick={handleDocumentUploadMobile}
                  className="sm:hidden bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold flex items-center button_color"
                >
                  <i className="fa fa-upload"></i> Add Document (~30 Mb)
                </button>
              </div>
            </div>

            {loanValues.length > 0 && property.pmi === "yes" && (
              <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
                <div className="flex font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black items-center justify-center">
                  PMI REMOVAL COUNTDOWN
                </div>
                <hr className="flex border-t-2 border-sky-600 -mt-0 w-8 ml-44" />
                <div className="flex flex-col items-center justify-center space-y-0">
                  <CountdownTimer targetDate={pmiRemovalDate} />
                  <div className="label_color " style={{ fontSize: "14px" }}>
                    Estimated Countdown
                  </div>

                  <div className="numbers_color font-bold sm:text-3xl text-2xl mt-3">
                    {formatPrice(property.monthly_Mortage_Insurance) || "-"}
                  </div>
                  <div className="label_color " style={{ fontSize: "14px" }}>
                    Current Monthly PMI
                  </div>

                  <div className="numbers_color font-bold sm:text-3xl text-2xl mt-3">
                    {new Date(pmiRemovalDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="label_color " style={{ fontSize: "14px" }}>
                    Estimated Removal Date
                  </div>

                  <button
                    onClick={() => handleAgentRequestClick("pmi")}
                    className="bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold items-center button_color mt-4 mb-4"
                  >
                    Request Agent For PMI Explanation!
                  </button>
                </div>
              </div>
            )}

            {lender.id && (
              <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
                <div className="flex font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black items-center justify-center">
                  YOUR LENDER
                </div>
                <hr className="flex border-t-2 border-sky-600 -mt-0 w-8 ml-44" />
                <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                  <div className="font-bold text-2xl text-center">
                    {lender.name}
                  </div>
                  <div className="flex items-center flex-row">
                    <FaPhone className="w-4 h-3.5 text-black mr-2 flex-shrink-0" />
                    <div className="info_style text-md">
                      {lender.cellnumber}
                    </div>
                  </div>
                  <div className="flex items-center flex-row text-center">
                    <FaEnvelope className="w-4 h-3.5 text-black mr-2 flex-shrink-0" />
                    <div className="info_style text-md">{lender.email}</div>
                  </div>
                  {lender.companyname && (
                    <div className="flex items-center flex-row text-center">
                      <FaBuilding className="w-4 h-4 text-black mr-2 flex-shrink-0" />
                      <div className="info_style text-md">
                        {lender.companyname}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {inspector.id && (
              <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
                <div className="flex font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black items-center justify-center">
                  YOUR HOME INSPECTOR
                </div>
                <hr className="flex border-t-2 border-sky-600 -mt-0 w-8 ml-44" />
                <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                  <div className="font-bold text-2xl text-center">
                    {inspector.name}
                  </div>
                  <div className="flex items-center flex-row">
                    <FaPhone className="w-4 h-3.5 text-black mr-2" />
                    <div className="info_style text-md">
                      {inspector.cellnumber}
                    </div>
                  </div>
                  <div className="flex items-center flex-row text-center">
                    <FaEnvelope className="w-4 h-3.5 text-black mr-2" />
                    <div className="info_style text-md">{inspector.email}</div>
                  </div>
                  {inspector.companyname && (
                    <div className="flex items-center flex-row text-center">
                      <FaBuilding className="w-4 h-4 text-black mr-2" />
                      <div className="info_style text-md">
                        {inspector.companyname}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {title.id && (
              <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
                <div className="flex font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black items-center justify-center">
                  YOUR TITLE COMPANY
                </div>
                <hr className="flex border-t-2 border-sky-600 -mt-0 w-8 ml-44" />
                <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                  <div className="font-bold text-2xl text-center">
                    {title.name}
                  </div>
                  <div className="flex items-center flex-row">
                    <FaPhone className="w-4 h-3.5 text-black mr-2" />
                    <div className="info_style text-md">{title.cellnumber}</div>
                  </div>
                  <div className="flex items-center flex-row text-center">
                    <FaEnvelope className="w-4 h-3.5 text-black mr-2" />
                    <div className="info_style text-md">{title.email}</div>
                  </div>
                  {title.companyname && (
                    <div className="flex items-center flex-row text-center">
                      <FaBuilding className="w-4 h-4 text-black mr-2" />
                      <div className="info_style text-md">
                        {title.companyname}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3 mb-10">
              <div className="flex font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black items-center justify-center">
                LEARN ABOUT RENTAL VALUES
              </div>
              <hr className="flex border-t-2 border-sky-600 -mt-0 w-8 ml-44" />
              <div className="flex flex-col items-center justify-center space-y-0">
                <div
                  className={`flex flex-row items-baseline space-x-2 ${
                    showRentalAmount ? "" : "blur"
                  }`}
                >
                  <div className="numbers_color font-bold sm:text-3xl text-2xl">
                    {formatPrice(property.rental_value)}
                  </div>
                  <div className="font-bold text-sm text-gray-400">
                    {property.rental_date}
                  </div>
                </div>
                <div className="label_color " style={{ fontSize: "14px" }}>
                  Monthly Rental Amount
                </div>

                <button
                  onClick={() => handleAgentRequestClick("monthly rental")}
                  className="bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold items-center button_color mt-2 mb-2"
                >
                  Ask agent to Update Rental!
                </button>

                <div
                  className={`flex flex-row items-baseline space-x-2 mt-3 ${
                    showAirBnBAmount ? "" : "blur"
                  }`}
                >
                  <div className="numbers_color font-bold sm:text-3xl text-2xl">
                    {formatPrice(property.airbnb_value)}
                  </div>
                  <div className="font-bold text-sm text-gray-400">
                    {property.airbnb_date}
                  </div>
                </div>
                <div className="label_color " style={{ fontSize: "14px" }}>
                  Monthly AIRBNB Amount
                </div>

                <button
                  onClick={() => handleAgentRequestClick("monthly airbnb")}
                  className="bg-sky-500 border text-white px-1.5 py-1.5 text-xs rounded-md font-semibold items-center button_color mt-2 mb-4"
                >
                  Ask agent to Update AirBnB!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFileAdd && (
        <>
          <DocumentInfo onClose={onFileUploadCancel} />
        </>
      )}
    </>
  );
}

export default PreviewPage;
