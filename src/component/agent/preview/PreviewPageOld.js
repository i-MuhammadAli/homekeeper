import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Line } from "react-chartjs-2";
// import "chart.js/auto";
import "react-range-slider-input/dist/style.css";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsFillHouseFill } from "react-icons/bs";

import ClientMaintenanceTasks from "./ClientPageMaintenanceTask";

import "react-toastify/dist/ReactToastify.css";

import Loader from "../../loader_folder/Loader";
import Graph1 from "./Graph1";
import { formatPrice } from "../../../utils/helpers";
import {
  setGraphLabels,
  setGraphHomeValue,
  setGraphLoanValue,
  setGraphEquityValue,
  setGraphFullData,
  setGraphAgentHomeValue,
  setGraphStartDate,
  setGraphEndDate,
  addPropertyDoc,
  postAgentRequestHistory,
  setShowMaintenanceTaskPage,
  setCandidateMaintenanceTask,
  setShowCientPreview,
} from "../../../store";
import CountdownTimer from "./CountdownTimer";
import RefinanceNumber from "./RefinanceNumber";
import createApi from "../../../utils/api";
import { calculateCandidateTasks } from "../ViewClientList";
import DocumentInfo from "../clients/DocumentInfo";
import DocumentSection from "./DocumentSection";

function PreviewPage({ back }) {
  const dispatch = useDispatch();
  const api = createApi();
  const [selectedPeriod, setSelectedPeriod] = useState(1000);
  const [extraPayment, setExtraPayment] = useState(0);
  const [timeToPayoff, setTimeToPayoff] = useState(null);
  const [interestSavings, setInterestSavings] = useState(null);
  const [pmiRemovalDate, setPmiRemovalDate] = useState(null);

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileAdd, setShowFileAdd] = useState(false);

  // const [extraInterest15Year, setExtraInterest15Year] = useState(null);
  // const [newMonthlyPayment15Year, setNewMonthlyPayment15Year] = useState(null);
  // const [extraInterest30Year, setExtraInterest30Year] = useState(null);
  // const [newMonthlyPayment30Year, setNewMonthlyPayment30Year] = useState(null);

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

  // const [labels, setLabels] = useState([]);
  // const [homeValues, setHomeValues] = useState([]);

  const [showRentalAmount, setShowRentalAmount] = useState(false);
  const [showAirBnBAmount, setShowAirBnBAmount] = useState(false);

  const [loader, setloader] = useState(false);

  // const profile = useSelector((state) => {
  //   return state.profile.data;
  // });

  const lenders = useSelector((state) => {
    return state.lenders.data;
  });

  const inspectors = useSelector((state) => {
    return state.inspectors.data;
  });

  const titles = useSelector((state) => {
    return state.titles.data;
  });

  const client = useSelector((state) => {
    return state.client.data;
  });

  const documents = useSelector((state) => {
    return state.documents.data;
  });

  const propertyApprRate = useSelector((state) => {
    return state.generic.data.propertyApprRate;
  });

  const {
    homeValues,
    loanValues,
    equities,
    monthlyPayment,
    monthsElapsed,
    remainingLoanMonths,
    monthlyInterestRate,
    cashOutRefinance,
  } = useSelector((state) => {
    return state.graph.data.fullData;
  });

  let myLender = null;
  if (client.lenderInfo.askLender === "yes") {
    myLender = lenders.find((item) => item.id === client.lenderInfo.lender.id);
  }

  let myTitle = null;
  if (client.titleCompanyInfo.include === "yes") {
    myTitle = titles.find(
      (item) => item.id === parseInt(client.titleCompanyInfo.id)
    );
  }

  let myInspector = null;
  if (client.homeMaintenanceInfo.homeInspector === "yes") {
    myInspector = inspectors.find(
      (item) => item.id === client.homeMaintenanceInfo.inspector.id
    );
  }

  let myDocs = [];
  if (documents[client.id]) {
    myDocs = [...documents[client.id]].sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
  }

  const { fullData } = useSelector((state) => {
    return state.graph.data;
  });

  useEffect(() => {
    //reset clientform
    fetchDataForPeriod(1000);
    if (client.lenderInfo.manual.mortgageRemovalBasis === "never")
      calculateLoanEndReachingDate();
    if (client.lenderInfo.manual.mortgageRemovalBasis === "equity")
      calculateEquityReachingDate();
    if (client.lenderInfo.manual.mortgageRemovalBasis === "years")
      calculateYearsReachingDate();
    if (client.lenderInfo.manual.loanAmount) calculateRefinance();
    if (client.propertyInfo.rentalAmount) setShowRentalAmount(true);
    if (client.propertyInfo.airbnbAmount) setShowAirBnBAmount(true);
  }, [client]);

  const homeMaintenanceClickHandle = () => {
    console.log("clicked");
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
    const datePurchased = new Date(client.propertyInfo.dop);
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
        // labels.push(pointDate.toDateString());
        agentHomeValue.push(point.value);
      }
    });

    fullData.loanValues.forEach((point) => {
      const pointDate = new Date(point.date);
      if (pointDate >= startDate && pointDate <= endDate) {
        // labels.push(
        //   pointDate.toLocaleDateString("en-US", {
        //     month: "short",
        //     year: "2-digit",
        //   })
        // );
        loanValue.push(point.value);
      }
    });
    fullData.equities.forEach((point) => {
      const pointDate = new Date(point.date);
      if (pointDate >= startDate && pointDate <= endDate) {
        equityValue.push(point.value);
      }
    });

    // console.log(labels, homeValue);
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
    const interest = client.lenderInfo.manual.apr / 100 / 12;
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
      const interest =
        remainingBalance * (client.lenderInfo.manual.apr / 100 / 12);
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

  // const refinanceCash = () => {
  //   console.log((80 * parseInt(homeValues[homeValues.length - 1].value)) / 100);
  //   const val =
  //     (80 * parseInt(homeValues[homeValues.length - 1].value)) / 100 -
  //     parseInt(loanValues[loanValues.length - 1].value);

  //   return formatPrice(Math.ceil(val));
  // };

  const calculateEquityReachingDate = () => {
    // Convert APR to monthly interest rate
    const monthlyInterestRate = client.lenderInfo.manual.apr / 12 / 100;

    // Calculate monthly payment
    const numberOfPayments = client.lenderInfo.manual.years * 12;
    const monthlyPayment =
      (client.lenderInfo.manual.loanAmount * monthlyInterestRate) /
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
        (homeValues[0].value * client.lenderInfo.manual.mortgageEquity) / 100
      ) {
        // Return date when desired equity percentage is reached
        // console.log(
        //   currentDate.toLocaleDateString("en-US", {
        //     month: "short",
        //     year: "numeric",
        //   })
        // );
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
    const dateObj = new Date(client.propertyInfo.dop);
    dateObj.setFullYear(
      dateObj.getFullYear() + parseInt(client.lenderInfo.manual.mortgageYears)
    );
    // console.log(dateObj.toLocaleString());
    setPmiRemovalDate(dateObj.toLocaleString());
  };

  const calculateLoanEndReachingDate = () => {
    const dateObj = new Date(client.propertyInfo.dop);
    dateObj.setFullYear(
      dateObj.getFullYear() + parseInt(client.lenderInfo.manual.years)
    );
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

    // console.log(newTotalInterest);
    // console.log(extraInterest);
    // console.log(newMonthlyPayment);
    // setExtraInterest30Year(extraInterest);
    // setNewMonthlyPayment30Year(newMonthlyPayment);
    setRefinanceNumbers((prevState) => ({
      ...prevState,
      yearThirty: {
        monthlyPayment: newMonthlyPayment,
        extraInterest: extraInterest,
      },
    }));
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fileName);
    formData.append("file", selectedFile);
    formData.append("propertyid", client.id);

    api
      .post("/api/upload_documents", formData)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          setFileName("");
          setSelectedFile(null);
          dispatch(addPropertyDoc(res.data));
        }
      })
      .catch((err) => console.log("Something went wrong!"));
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
    // console.log(client);
    formData.append("requestType", type);
    formData.append("agent", client.agentInfo.id);
    formData.append("property", client.id);
    formData.append("date", new Date().toLocaleDateString());
    dispatch(postAgentRequestHistory(formData));
    toast.success("Notified the agent!"); // TODO: show the correct response by checking mail status.
  };

  const handleFileAdd = () => {
    setShowFileAdd(true);
  };

  const onFileUploadCancel = () => {
    setShowFileAdd(false);
  };

  const [publicrurl, setstateforpublicurl] = useState("");

  return (
    <>
      {loader === true ? <Loader></Loader> : ""}
      {/* <ToastContainer /> */}
      <section
        className="home_owner"
        style={{ minWidth: "1440px", maxWidth: "1440px" }}
        onScroll={() => alert("scroll")}
      >
        <div className="mx-20">
          <h2 className="flex items-center">
            {/* <FaArrowLeftLong
              onClick={back}
              className="w-7 h-7 cursor-pointer mr-4"
            /> */}
            <div
              className="flex items-center w-9 h-8 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800 mr-4"
              onClick={back}
            >
              <FaArrowLeftLong className="w-5 h-5 cursor-pointer ml-2 text-white" />
            </div>
            Welcome Back {client.clientInfo.firstName}!
          </h2>

          <div
            className="home_owner_in"
            style={{ minWidth: "1200px", maxWidth: "1400px" }}
          >
            <div className="center_owner">
              <div className="mt-3 rounded flex flex-row property_section">
                <div className="flex items-center flex-row py-2.5 px-3">
                  <BsFillHouseFill className="sm:w-7 sm:h-7 h-5 w-5 text-white" />
                  <div className="text-white font-semibold text-md ml-2">
                    {client.address}
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
                    {client.address}
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
                {client.lenderInfo.manual.loanAmount && (
                  <h3>
                    Home Value, Lone & Equity{" "}
                    <a
                      className="askloan"
                      onClick={() => handleAgentRequestClick("home value")}
                    >
                      + Ask Agent To Update My Home Value
                    </a>
                  </h3>
                )}

                <div className="row text-center">
                  <div className="col-sm-4">
                    <h1>
                      {/* {formatPrice(
                        myHomeValue
                          ? myHomeValue[myHomeValue.length - 1].homevalue
                          : "-"
                      )} */}
                      {formatPrice(
                        homeValues
                          ? parseInt(homeValues[homeValues.length - 1].value)
                          : "-"
                      )}
                    </h1>
                    <p>Home value estimate</p>
                  </div>
                  <div className="col-sm-4">
                    {/* <h1 style={{ color: "#00ab44" }}>${forremainingequitybalance}</h1> */}
                    <h1 style={{ color: "#00ab44" }}>
                      {/* ${separateAtThousands(newhome_value - currentloan)} */}
                      {formatPrice(
                        equities.length
                          ? parseInt(equities[equities.length - 1].value)
                          : "-"
                      )}
                    </h1>
                    <p>Equity</p>
                  </div>
                  <div className="col-sm-4">
                    {/* <h1 style={{ color: "#f4b243" }} >${forremainingloanbalance}</h1> */}
                    <h1 style={{ color: "#f4b243" }}>
                      {/* ${separateAtThousands1(currentloan)} */}
                      {formatPrice(
                        loanValues.length
                          ? parseInt(loanValues[loanValues.length - 1].value)
                          : "-"
                      )}
                    </h1>
                    <p>Loan Amount</p>
                  </div>

                  <div className="col-sm-9 leftgraph">
                    {/* <div className="App"> */}
                    <Graph1 />
                    {/* <Line
                      data={data}
                      options={options}
                      chartConfig={chartConfig}
                    /> */}
                    {/* </div> */}
                    <div className="text-righto"></div>
                  </div>
                  <div className="col-sm-3 rightgraph">
                    {/* <select
                      name="timeperiod"
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value={forallloantimeperiod}>
                        All Time Records
                      </option>

                      {forloantimeperiod.map((items, i) => {
                        return (
                          <option value={items}>{items} Year</option>
                          // <option value="11">11 Year</option>
                        );
                      })}
                    </select> */}
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

                    {/* <h6 className='bluegraph'>${homevaluelast || homevaluelast === 0 ?homevaluelast:forpropertylist.homevalue} (Home value)</h6> */}
                    <h6 className="bluegraph text-xs">
                      {formatPrice(
                        homeValues
                          ? parseInt(homeValues[homeValues.length - 1].value)
                          : "-"
                      )}{" "}
                      (Home value)
                    </h6>
                    <h6 className="greengraph text-xs">
                      {/* ${separateAtThousands(newhome_value - currentloan)}{" "} */}
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

              {client.lenderInfo.manual.loanAmount && (
                <div className="segn">
                  <h3>
                    Current Loan{" "}
                    {/* <a href="#">
                      <img src="/../asset/images/icon/q_icon.png" alt="icon" />{" "}
                      Ask Lender to call me about loan option
                    </a> */}
                    <a
                      className="ask hover:cursor-pointer"
                      onClick={() => handleAgentRequestClick("loan")}
                    >
                      <i className="fa-solid fa-phone-volume"></i> Ask Agent
                      About Loan Options!
                    </a>
                  </h3>

                  <div className="row text-center">
                    <div className="col-sm-3">
                      <div className="crnt_test">
                        <h4>
                          {/* ${currentloan ? separateAtThousands(currentloan) : ""} */}
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
                          {/* {forpropertylist.apr_rate
                          ? forpropertylist.apr_rate
                          : ""} */}
                          {client.lenderInfo.manual.apr
                            ? client.lenderInfo.manual.apr + "%"
                            : "-"}
                        </h4>
                        <p>Current APR</p>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="crnt_test">
                        <h4>
                          {/* ${isNaN(forcmp) ? "" : separateAtThousands1(forcmp)} */}
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
                          {/* $
                        {forpropertylist.monthly_Mortage_Insurance
                          ? separateAtThousands(
                              forpropertylist.monthly_Mortage_Insurance
                            )
                          : ""} */}
                          {client.lenderInfo.manual.monthlyMortgage
                            ? client.lenderInfo.manual.monthlyMortgage
                            : "NO"}
                        </h4>

                        <p>Monthly PMI</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {client.lenderInfo.manual.loanAmount && (
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

              {/* <div className="segn">
                <h3 className="apradmin" style={mystyle1}>
                  Refinance and save money{" "}
                  <span style={mystyle}>{admin_message}</span>
                </h3>

                <h5>
                  Refinance loan to <span>{rangeyear} Years</span>
                  Refinance loan to <span>{refinanceYearValue} Years</span>
                </h5>

                <h6>
                  <input
                    type="range"
                    min="1"
                    max={refinanceYearRangeMax}
                    // max={20}
                    className="w-100"
                    // selected="7"
                    value={rangeyear}
                    // onChange={handleChangeComplete}
                    onChange={handleRefinanceYearChange}
                    // onChange={(event) =>
                    //   handleChangeComplete(parseInt(event.target.value))
                    // }
                  />
                  1 Year
                  <span>{refinanceYearRangeMax} Year</span>
                </h6>
                <h5>
                  What could a refi save you in interest?
                  <span>${separateAtThousands(sixth_value)}</span> from loan
                  <span>$100,000</span> from loan
                </h5>

                <h5>
                  The monthly payment will be: $
                  {separateAtThousands(monthlypayment)} per month{" "}
                  1000 per month
                  <a className="akbtn" href="#">
                    ask lender
                  </a>
                </h5>
              </div> */}
              {client.lenderInfo.manual.loanAmount && (
                <RefinanceNumber data={refinanceNumbers} />
              )}

              {client.lenderInfo.manual.loanAmount && (
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
                      client.agentInfo.profileImg
                        ? client.agentInfo.profileImg
                        : "/../asset/images/usr.png"
                    }
                    align="img"
                    alt="agent"
                  />
                </div>

                <h4></h4>
                <h3>{client.agentInfo.name}</h3>
                <h6>{client.agentInfo.company}</h6>
                <br />
                <h6>{client.agentInfo.phone}</h6>
                <h6>{client.agentInfo.email}</h6>

                <a
                  className="callbtn"
                  onClick={() => handleAgentRequestClick("call")}
                >
                  <i className="fa-solid fa-phone-volume"></i> Ask Agent To Call
                  You!
                </a>
              </div>

              {/* <div className="set">
                <h4>Invite Family Members</h4>

                <p>
                  Create a strong sense of community by extending your
                  invitation to our website, where people come together at
                  HomeKeeper.
                </p>
                <a
                  className="invite"
                  data-bs-toggle="modal"
                  data-bs-target="#loan_modal"
                >
                  + Invite
                </a>
              </div> */}

              <div className="set">
                <h4>Document Center</h4>
                <DocumentSection
                  parentClass="m-2"
                  fileNameSize="text-sm"
                  fileNameTextLimit={20}
                />

                <a className="callbtn cursor-pointer" onClick={handleFileAdd}>
                  <i className="fa fa-upload"></i> Add Document (~30 Mb)
                </a>
              </div>

              {loanValues.length > 0 &&
                client.lenderInfo.manual.isMortgageInsurance === "yes" && (
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
                      {formatPrice(client.lenderInfo.manual.monthlyMortgage) ||
                        "-"}
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
                    <a
                      className="ask"
                      onClick={() => handleAgentRequestClick("pmi")}
                    >
                      <i className="fa-solid fa-phone-volume"></i> Ask Agent To
                      Explain PMI
                    </a>
                  </div>
                )}

              {myLender && (
                <div className="set">
                  <h4>Your Lender</h4>
                  <h3>{myLender ? myLender.name : ""}</h3>
                  <h6>{myLender ? myLender.companyname : ""}</h6>
                  <h6>{myLender ? myLender.cellnumber : ""}</h6>
                  <h6>{myLender ? myLender.email : ""}</h6>
                </div>
              )}

              {myInspector && (
                <div className="set">
                  <h4>Your Home Inspector</h4>
                  <h3>{myInspector ? myInspector.name : ""}</h3>
                  <h6>{myInspector ? myInspector.companyname : ""}</h6>
                  <h6>{myInspector ? myInspector.cellnumber : ""}</h6>
                  <h6>{myInspector ? myInspector.email : ""}</h6>
                </div>
              )}

              {myTitle && (
                <div className="set">
                  <h4>Your Title Company</h4>
                  <h3>{myTitle ? myTitle.name : ""}</h3>
                  <h6>{myTitle ? myTitle.companyname : ""}</h6>
                  <h6>{myTitle ? myTitle.cellnumber : ""}</h6>
                  <h6>{myTitle ? myTitle.email : ""}</h6>
                </div>
              )}

              <div className="set">
                <h4>Learn about rental values</h4>
                <h2 className={showRentalAmount ? "mo" : "blr"}>
                  {formatPrice(client.propertyInfo.rentalAmount)}
                  {/* {separateAtThousands1(forpropertylist.rental_value)}{" "} */}
                  <span>
                    {client.propertyInfo.rentalDate}
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
                  {formatPrice(client.propertyInfo.airbnbAmount)}
                  {/* ${separateAtThousands1(forpropertylist.Airbnb)}{" "} */}
                  <span>
                    {client.propertyInfo.airbnbDate}

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
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">UPLOAD DOCUMENT</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                method="post"
                className="form_modal"
                onSubmit={onFileUpload}
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <label htmlFor="Document Name">Document Name</label>
                  <input
                    type="text"
                    placeholder="Enter document name"
                    onChange={(e) => setFileName(e.target.value)}
                    className="form-control"
                    value={fileName}
                    name="Document Name"
                    id="Document Name"
                    required
                  />
                </div>
                <div className="modal_img">
                  <div className="modal_left">
                    <div className="img_box">
                      <p>{selectedFile ? selectedFile.name : ""}</p>
                      <p>
                        Drag and drop or <span>Browse</span> Document
                      </p>
                    </div>
                    <div className="file-upload mt-0">
                      <div className="file-select">
                        <input
                          type="file"
                          name="chooseFile"
                          id="chooseFile"
                          className="chooseFile"
                          required
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                          accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal_right">
                    <div className="file-upload">
                      <button
                        type="button"
                        className="btn btn-danger remove_img"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        style={{
                          color: "white",
                          background: "#3d9ddd",
                          border: "none",
                        }}
                      >
                        Upload Document
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default PreviewPage;
