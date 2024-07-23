import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputBox from "../../common/InputBox";
import createApi from "../../../utils/api";
import { setUpdateProperty, setViewClientData } from "../../../store";
import { formatPrice } from "../../../utils/helpers";
import Loader from "../../loader_folder/Loader";

function LoanInfo({ onClose }) {
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [paymentType, setPaymentType] = useState("loan");
  const [amount, setAmount] = useState("");
  // const [amountDisplay, setAmountDisplay] = useState("$");
  const [years, setYears] = useState("");
  const [apr, setApr] = useState("");
  const [monthlyMortgageValue, setMonthlyMortgageValue] = useState("");
  const [mortgageInsuranceRemoval, setMortgageInsuranceRemoval] =
    useState("never");
  const [mortgageInsurance, setMortgageInsurance] = useState("yes");
  const [equity, setEquity] = useState("");
  const [mortgageYears, setMortgageYears] = useState("");
  const dispatch = useDispatch();
  const api = createApi();

  const propertyId = useSelector((state) => {
    return state.client.data.id;
  });

  const data = useSelector((state) => {
    return state.client.data.lenderInfo;
  });

  useEffect(() => {
    if (data) {
      setPaymentType(data.paymentType || "loan");
      setAmount(data.manual.loanAmount);
      // setAmountDisplay(formatPrice(data.manual.loanAmount));
      setYears(data.manual.years || "");
      setApr(data.manual.apr || "");
      setMonthlyMortgageValue(data.manual.monthlyMortgage || "");
      setMortgageInsuranceRemoval(data.manual.mortgageRemovalBasis || "never");
      setMortgageInsurance(data.manual.isMortgageInsurance || "yes");
      setEquity(data.manual.mortgageEquity || "");
      setMortgageYears(data.manual.mortgageYears || "");
    }
  }, []);

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const onAmountChange = (event) => {
    if ("amount" in formErrors) {
      delete formErrors.amount;
    }
    const input = event.target.value.replace(/\D/g, "");

    // const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setAmount(input);
    // setAmountDisplay(formatPrice(input));
  };

  const onYearsChange = (event) => {
    if ("years" in formErrors) {
      delete formErrors.years;
    }
    setYears(event.target.value);
  };

  const onAprChange = (event) => {
    if ("apr" in formErrors) {
      delete formErrors.apr;
    }
    setApr(event.target.value);
  };

  const onMonthlyMortgageChange = (event) => {
    if ("mrtgValue" in formErrors) {
      delete formErrors.mrtgValue;
    }
    const input = event.target.value.replace(/\D/g, "");

    // const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setMonthlyMortgageValue(input);
  };

  const onEquityChange = (event) => {
    if ("equity" in formErrors) {
      delete formErrors.equity;
    }
    setEquity(event.target.value);
  };

  const onMortgageYearsChange = (event) => {
    if ("mrtgYears" in formErrors) {
      delete formErrors.mrtgYears;
    }
    setMortgageYears(event.target.value);
  };

  const handleMortgageInsuranceChange = (event) => {
    setMortgageInsurance(event.target.value);
  };

  const handleMortgageInsuranceRemovalChange = (event) => {
    // console.log(event.target.value);
    if (event.target.value === "equity") setMortgageYears("");
    else if (event.target.value === "years") setEquity("");
    else {
      setMortgageYears("");
      setEquity("");
    }
    setMortgageInsuranceRemoval(event.target.value);
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      let formdata = new FormData();

      formdata.append("monthlyMortgage", monthlyMortgageValue);
      formdata.append("mortgageRemoved", mortgageInsuranceRemoval);
      formdata.append("mortgageYears", mortgageYears);
      formdata.append("mortgageEquity", equity);
      formdata.append("amount", amount);
      formdata.append("years", years);
      formdata.append("apr", apr);
      formdata.append("pmi", mortgageInsurance);
      formdata.append("paymentType", paymentType);
      formdata.append("id", propertyId);
      api
        .post("/api/agentpropertyeditLoandetails", formdata)
        .then(function (response) {
          // console.log("response", response.data);
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
    if (paymentType === "loan") {
      if (!amount) {
        errors.amount = "Required";
      }
      if (!years) {
        errors.years = "Required";
      }
      if (!apr) {
        errors.apr = "Required";
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

      <div className="flex items-center flex-row mx-3 my-4">
        <label className="block w-80 font-semibold">Payment Type</label>
        <label className="flex items-center ml-10">
          <InputBox
            radioForm
            type="radio"
            className="w-4 h-4"
            value="loan"
            checked={paymentType === "loan"}
            onChange={handlePaymentTypeChange}
          />
          <span className="ml-1 text-gray-500 cursor-pointer">Loan</span>
        </label>
        <label className="flex items-center">
          <InputBox
            radioForm
            type="radio"
            className="ml-5 w-4 h-4"
            value="cash"
            checked={paymentType === "cash"}
            onChange={handlePaymentTypeChange}
          />
          <span className="ml-1 text-gray-500 cursor-pointer">Cash</span>
        </label>
      </div>

      {paymentType === "loan" && (
        <>
          <div className="flex items-center flex-row mx-3 my-4">
            <label className="block w-80 font-semibold" htmlFor="loan-amt">
              <span className="text-orange-500">*</span> What is the Loan Amount
            </label>
            <InputBox
              formText
              placeholder="what is the loan Amount?"
              autoComplete="off"
              className={`w-80 ${formErrors.amount ? "border-red-500" : ""}`}
              id="loan-amt"
              type="text"
              value={formatPrice(amount)}
              onChange={onAmountChange}
            />
            {formErrors.amount && (
              <p className="ml-2 text-red-500 text-xs italic">
                {formErrors.amount}
              </p>
            )}
          </div>

          <div className="flex items-center flex-row mx-3 my-4">
            <label className="block w-80 font-semibold" htmlFor="loan-years">
              <span className="text-orange-500">*</span> How many years of the
              Loan
            </label>
            <InputBox
              formText
              //   placeholder="How many years of the loan?"
              className={`w-80 ${formErrors.years ? "border-red-500" : ""}`}
              id="loan-years"
              type="number"
              value={years}
              onChange={onYearsChange}
            />

            {formErrors.years && (
              <p className="ml-2 text-red-500 text-xs italic">
                {formErrors.years}
              </p>
            )}
          </div>

          <div className="flex items-center flex-row mx-3 my-4">
            <label className="block w-80 font-semibold" htmlFor="loan-apr">
              <span className="text-orange-500">*</span> Whats is APR
            </label>
            <InputBox
              formText
              //   placeholder="What is the APR?"
              className={`w-80 ${formErrors.apr ? "border-red-500" : ""}`}
              id="loan-apr"
              type="number"
              value={apr}
              onChange={onAprChange}
            />
            %
            {formErrors.apr && (
              <p className="ml-2 text-red-500 text-xs italic">
                {formErrors.apr}
              </p>
            )}
          </div>

          <div className="flex items-center flex-row mx-3 my-4">
            <label className="block w-80 font-semibold">
              Is there Mortage Insurance (PMI or MI)
            </label>
            <label className="flex items-center ml-10">
              <InputBox
                radioForm
                type="radio"
                className="w-4 h-4"
                value="yes"
                checked={mortgageInsurance === "yes"}
                onChange={handleMortgageInsuranceChange}
              />
              <span className="ml-1 text-gray-500 cursor-pointer">Yes</span>
            </label>
            <label className="flex items-center">
              <InputBox
                radioForm
                type="radio"
                className="ml-5 w-4 h-4"
                value="no"
                checked={mortgageInsurance === "no"}
                onChange={handleMortgageInsuranceChange}
              />
              <span className="ml-1 text-gray-500 cursor-pointer">No</span>
            </label>
          </div>

          {mortgageInsurance === "yes" && (
            <>
              <div className="flex items-center flex-row mx-3 my-4">
                <label className="block w-80 font-semibold" htmlFor="loan-mrtg">
                  <span className="text-orange-500">*</span> What is the monthly
                  Mortage Insurance
                </label>
                <InputBox
                  formText
                  //   placeholder="Monthly Mortgage Insurance?"
                  autoComplete="off"
                  className={`w-80 ${formErrors.value ? "border-red-500" : ""}`}
                  id="loan-mrtg"
                  type="text"
                  value={formatPrice(monthlyMortgageValue)}
                  onChange={onMonthlyMortgageChange}
                />
                {formErrors.value && (
                  <p className="ml-2 text-red-500 text-xs italic">
                    {formErrors.value}
                  </p>
                )}
              </div>

              <div className="flex items-center flex-row mx-3 my-4">
                <label className="block w-80 font-semibold">
                  When is the Mortage Insurance removed?
                </label>
                <div className="ml-10">
                  <label className="flex items-center mb-2">
                    <InputBox
                      radioForm
                      type="radio"
                      className="w-4 h-4"
                      value="never"
                      checked={mortgageInsuranceRemoval === "never"}
                      onChange={handleMortgageInsuranceRemovalChange}
                    />
                    <span className="ml-1 text-gray-500 cursor-pointer">
                      Never removed, its for the life of the loan
                    </span>
                  </label>
                  <label className="flex items-center mb-2">
                    <InputBox
                      radioForm
                      type="radio"
                      className="w-4 h-4"
                      value="equity"
                      checked={mortgageInsuranceRemoval === "equity"}
                      onChange={handleMortgageInsuranceRemovalChange}
                    />
                    <span className="ml-1 text-gray-500 cursor-pointer">
                      After
                    </span>
                    <InputBox
                      smallText
                      autoComplete="off"
                      className={`ml-1 w-16 ${
                        formErrors.equity ? "border-red-500" : ""
                      }`}
                      id="mrtg-equity"
                      type="number"
                      value={equity}
                      onChange={onEquityChange}
                    />
                    <span className="ml-1 text-gray-500 cursor-pointer">
                      % Equity is reached
                    </span>
                  </label>
                  <label className="flex items-center mb-2">
                    <InputBox
                      radioForm
                      type="radio"
                      className="w-4 h-4"
                      value="years"
                      checked={mortgageInsuranceRemoval === "years"}
                      onChange={handleMortgageInsuranceRemovalChange}
                    />
                    <span className="ml-1 text-gray-500 cursor-pointer">
                      After
                    </span>
                    <InputBox
                      smallText
                      autoComplete="off"
                      className={`ml-1 w-16 ${
                        formErrors.mrtgYears ? "border-red-500" : ""
                      }`}
                      id="mrtg-years"
                      type="number"
                      value={mortgageYears}
                      onChange={onMortgageYearsChange}
                    />
                    <span className="ml-1 text-gray-500 cursor-pointer">
                      Years
                    </span>
                  </label>
                </div>
              </div>
            </>
          )}
        </>
      )}
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

export default LoanInfo;
