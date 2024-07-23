import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header2";
import {
  setClientPropertyDateOfPurchase,
  setClientPropertyPurchaseValue,
  setClientPropertyHomeValue,
} from "../../store";
import createApi from "../../utils/api";
import Loader from "../loader_folder/Loader";
import InfoSection from "./InfoSection";
import { formatPrice, localeDateString } from "../../utils/helpers";

function AddClientPropertyDetails({ onContinue, onBack }) {
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [homeValueDisplay, setHomeValueDisplay] = useState("$");
  // const [purchaseValueDisplay, setPurchaseValueDisplay] = useState("$");
  const dispatch = useDispatch();
  const api = createApi();

  const { firstName, lastName, email, phone, dob } = useSelector((state) => {
    return state.clientForm.form.clientInfo;
  });

  const { dop, purchaseValue, homeValue } = useSelector((state) => {
    return state.clientForm.form.propertyInfo;
  });

  const spouseInfo = useSelector((state) => {
    return state.clientForm.form.spouseInfo;
  });

  const { address, hasSpouse, id } = useSelector((state) => {
    return state.clientForm.form;
  });

  const onDopChange = (event) => {
    if ("dop" in formErrors) {
      delete formErrors.dop;
    }
    dispatch(setClientPropertyDateOfPurchase(event.target.value));
  };

  const onPurchaseValueChange = (event) => {
    if ("purchaseValue" in formErrors) {
      delete formErrors.purchaseValue;
    }
    const input = event.target.value.replace(/\D/g, "");
    // const input = event.target.value.replace(/[$,]/g, "");
    // console.log(input);

    // const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // dispatch(setClientPropertyPurchaseValue("$" + formattedInput));
    dispatch(setClientPropertyPurchaseValue(input));
    // setPurchaseValueDisplay(formatPrice(input));
  };

  const onHomeValueChange = (event) => {
    if ("homeValue" in formErrors) {
      delete formErrors.homeValue;
    }
    const input = event.target.value.replace(/\D/g, "");
    // const input = event.target.value.replace(/[$,]/g, "");

    // const formattedInput = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // dispatch(setClientPropertyHomeValue("$" + formattedInput));
    dispatch(setClientPropertyHomeValue(input));
    // setHomeValueDisplay(formatPrice(input));
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
    formdata.append("address", address);
    // formdata.append("whenbuy", new Date(dop).toLocaleDateString());
    formdata.append("whenbuy", localeDateString(new Date(dop)));
    formdata.append("saleprice", purchaseValue);
    formdata.append("homevalue", homeValue);
    formdata.append("clientid", id);
    api
      .post("/api/homekeeperupdatepropertylist", formdata)
      .then(function (response) {
        setIsLoading(false);
        if (response.data.status === "success") {
          onContinue();
        } else {
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
          <div className="strow">
            <div className="row">
              <InfoSection />
              {/* <h5>Owner</h5>
              <div className="col-sm-4">
                <p
                  style={{
                    color: "black",
                  }}
                >
                  {firstName} {lastName}
                </p>
                <p
                  style={{
                    color: "black",
                  }}
                >
                  {dob}
                </p>
                <p
                  style={{
                    color: "black",
                  }}
                >
                  <img src="/../asset/images/emailicon1.png" alt="pdf" />{" "}
                  {email}
                </p>
                <p
                  style={{
                    color: "black",
                  }}
                >
                  <img src="/../asset/images/emailicon2.png" alt="pdf" />{" "}
                  {phone}
                </p>
              </div> */}
              {/* {hasSpouse ? (
                <div className="col-sm-4">
                  <h5>Partner Information </h5>
                  <p>
                    {spouseInfo.firstName} {spouseInfo.lastName}
                  </p>
                  <p>{spouseInfo.dob}</p>
                  <p>
                    <img src="/../asset/images/emailicon1.png" alt="pdf" />{" "}
                    {spouseInfo.email}
                  </p>
                  <p>
                    <img src="/../asset/images/emailicon2.png" alt="pdf" />{" "}
                    {spouseInfo.phone}
                  </p>
                </div>
              ) : (
                ""
              )}
              <div className="col-sm-4">
                <p>
                  <span
                    style={{
                      color: "gray",
                      fontSize: "x-small",
                      marginRight: "80px",
                      fontWeight: "bold",
                    }}
                  >
                    ADDRESS
                  </span>
                  <span
                    style={{
                      color: "black",
                    }}
                  >
                    {address}
                  </span>
                </p>
                {dop && (
                  <p>
                    <span
                      style={{
                        color: "gray",
                        fontSize: "x-small",
                        marginRight: "26px",
                        fontWeight: "bold",
                      }}
                    >
                      DATE OF PURCHASE
                    </span>
                    <span
                      style={{
                        color: "black",
                      }}
                    >
                      {dop}
                    </span>
                  </p>
                )}
                {purchaseValue !== "$" && (
                  <p>
                    <span
                      style={{
                        color: "gray",
                        fontSize: "x-small",
                        marginRight: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      PURCHASED PRICE
                    </span>
                    <span
                      style={{
                        color: "black",
                      }}
                    >
                      {purchaseValue}
                    </span>
                  </p>
                )}
                {homeValue !== "$" && (
                  <p>
                    <span
                      style={{
                        color: "gray",
                        fontSize: "x-small",
                        marginRight: "60px",
                        fontWeight: "bold",
                      }}
                    >
                      HOME VALUE
                    </span>
                    <span
                      style={{
                        color: "black",
                      }}
                    >
                      {homeValue}
                    </span>
                  </p>
                )}
              </div> */}
              <form>
                <div className="col-sm-12 Propertydel mt-4">
                  <h5>Property Details</h5>

                  <div className="form-group">
                    <label>Date of Purchase</label>
                    <input
                      type="date"
                      name="whenbuy"
                      value={dop}
                      onChange={onDopChange}
                    />
                    {formErrors.dop ? (
                      <>
                        <span className="formerrorforvalidation">
                          {formErrors.dop}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label>Purchase Value</label>
                    <input
                      type="text"
                      name="saleprice"
                      autoComplete="off"
                      value={formatPrice(purchaseValue)}
                      onChange={onPurchaseValueChange}
                      placeholder="$10,000,000"
                    />
                    {formErrors.purchaseValue ? (
                      <>
                        <span className="formerrorforvalidation">
                          {formErrors.purchaseValue}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label>What is the home value ?</label>
                    <input
                      type="text"
                      name="homevalue"
                      autoComplete="off"
                      value={formatPrice(homeValue)}
                      onChange={onHomeValueChange}
                      placeholder="$10,000,000"
                    />
                    {formErrors.homeValue ? (
                      <>
                        <span className="formerrorforvalidation">
                          {formErrors.homeValue}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>
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
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}

export default AddClientPropertyDetails;
