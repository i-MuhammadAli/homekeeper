import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header2";

import { setClientAddress } from "../../store";
import createApi from "../../utils/api";
import Loader from "../loader_folder/Loader";
import InfoSection from "./InfoSection";

function AddClientAddress({ onContinue, onBack }) {
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const api = createApi();

  const { firstName, lastName, email, phone, dob } = useSelector((state) => {
    return state.clientForm.form.clientInfo;
  });

  const spouseInfo = useSelector((state) => {
    return state.clientForm.form.spouseInfo;
  });

  const { address, hasSpouse, id } = useSelector((state) => {
    return state.clientForm.form;
  });

  const onAddressChange = (event) => {
    if ("address" in formErrors) {
      delete formErrors.address;
    }
    dispatch(setClientAddress(event.target.value));
  };

  const handleSubmit = () => {
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
    if (!address) {
      errors.address = "Required";
    }
    // console.log(errors);
    return errors;
  };

  const sendDetailsToServer = async () => {
    let formdata = new FormData();
    formdata.append("address", address);
    formdata.append("clientid", id);
    api
      .post("/api/homekeeperupdatepropertylist", formdata)
      .then(function (response) {
        if (response.data.status === "success") {
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
          {/* <h3>
            <a href="#">
              <i className="fa-solid fa-arrow-left"></i>
            </a>
            Add/Edit Client
          </h3> */}
          <div className="strow">
            <div className="row ">
              <InfoSection />

              <div className="col-sm-4"></div>

              <form>
                <div className="col-sm-12">
                  <div className="form-group ads mb-0">
                    <label className="text-start">Address</label>

                    <input
                      type="text"
                      name="address"
                      value={address}
                      placeholder="Address"
                      onChange={onAddressChange}
                    />
                  </div>
                  <div className="col-sm-3">
                    {formErrors.address ? (
                      <p className="formerrorforvalidation">
                        {formErrors.address}
                      </p>
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

export default AddClientAddress;
