import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OtpInput from "react-otp-input";
import createApi from "../../utils/api";
import { setAuthUser } from "../../store";

function Sendotp({ authId, emailId, setOtpStatus }) {
  const navigate = useNavigate();
  const api = createApi();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpSentStatus, setotpSentStatus] = useState(true);

  const closeotpdiv = (e) => {
    e.preventDefault();
    setOtpStatus(0);
    console.log("optstatus set to true");
    navigate("/login");
    // let formdata = new FormData();
    // formdata.append("authid", localStorage.getItem("token-info"));
    // api
    //   .post("/api/homekeeperrejectconfirm", formdata)
    //   .then(function (response) {
    //     console.log("response", response);
    //     if (response.data.status == "success") {
    //       setErrorMessage(response.message);
    //     } else {
    //       setErrorMessage(response.message);
    //     }
    //   });
  };

  const submitotp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrorMessage("Please enter an otp");
    } else {
      let formdata = new FormData();
      formdata.append("otp", otp);
      formdata.append("authid", authId);

      api.post("/api/homekeeperconfirmotp", formdata).then(function (response) {
        console.log("response", response);

        if (response.data.status === "success") {
          setErrorMessage("");
          setSuccessMessage(response.data.message);
          localStorage.setItem("token-info", authId);
          localStorage.setItem("user_name", response.data.user.name);
          dispatch(setAuthUser());

          navigatelink(response.data.usertype);
        } else {
          setErrorMessage(response.data.message);
          // $("#toast-containererror").fadeIn("slow").delay(3000).fadeOut("slow");
          console.log("under error");
          setOtp("");
        }
      });
    }
  };

  const navigatelink = (usertype) => {
    navigate("/dashboard");
    window.location.reload();
  };

  return (
    <>
      <section className=" login register">
        <div>
          <div className="flex justify-center">
            {successMessage && (
              <h6 className={successMessage ? "successfullysubmission" : ""}>
                {successMessage}
              </h6>
            )}
            {errorMessage && (
              <div
                id="toast-containererror"
                style={{
                  backgroundImage: "url(./asset/images/errortoastr.png)",
                  backgroundColor: "#bd362f",
                  margin: "0px 560px 5px",
                  position: "relative",
                }}
                className=" toast-container"
              >
                {errorMessage ? errorMessage : ""}
              </div>
            )}
          </div>

          <div className=" flex flex-col bg-white w-1/2 p-10 mx-auto mt-10 justify-center text-center">
            <div className="mx-auto">
              <button
                type="button"
                className="btn-close justify-center"
                onClick={closeotpdiv}
                aria-label="Close"
              ></button>

              <img
                className="verifylogo mx-auto body"
                src="asset/images/verifylogo.png"
                alt="img"
              />
              <h4>Enter Verification Code</h4>
              <div className="flex flex-wrap justify-center">
                {otpSentStatus ? (
                  <p>
                    An email with verification code was sent to{" "}
                    <strong>{emailId}</strong>
                  </p>
                ) : (
                  <p>
                    Sorry Email with verification code could not been sent to{" "}
                    <strong>{emailId}</strong>
                  </p>
                )}
              </div>
              <form>
                <div className="flex-col">
                  <div className="col-md-12 flex p-3 justify-center">
                    <OtpInput
                      className="mx-24"
                      value={otp}
                      onChange={setOtp}
                      numInputs={5}
                      renderInput={(props) => <input {...props} />}
                      separator={<span style={{ width: "10px" }}></span>}
                      inputStyle={{
                        border: "1px solid transparent",
                        borderRadius: "8px",
                        backgroundColor: "#eee",
                        width: "60px",
                        height: "60px",
                        fontSize: "12px",
                        color: "#000",
                        fontWeight: "400",
                        caretColor: "blue",
                        margin: "5px",
                      }}
                      focusStyle={{
                        border: "1px solid blue",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="col-12 mt-3 ">
                    <button
                      type="submit"
                      onClick={submitotp}
                      className="btn btn-primary w-2/3 justify-center"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <Forgotpassword /> */}
    </>
  );
}

export default Sendotp;
