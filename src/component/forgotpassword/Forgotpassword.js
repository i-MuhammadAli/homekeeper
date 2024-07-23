import React, { useState } from "react";
import { toast } from "react-toastify";
import createApi from "../../utils/api";
import "react-toastify/dist/ReactToastify.css";

function Forgotpassword() {
  const api = createApi();
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [message, setmessage] = useState("");
  const [error, setError] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleEmailChange = (event) => {
    if ("email" in formErrors) {
      delete formErrors.email;
    }
    setEmail(event.target.value);
  };

  const sendDetailsToServer = async (e) => {
    e.preventDefault();
    setError([]);
    const newErrors = validate();
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setDisableSubmit(true);
      let formdata = new FormData();
      formdata.append("email", email);
      formdata.append("type", "notadmin");
      api
        .post("/api/homekeeperforgotpassword", formdata)
        .then(function (response) {
          setDisableSubmit(false);
          console.log("response", response.data);
          if (response.data.status === "success") {
            const message1 = response.data.message;
            setmessage(message1);
            toast.success(response.data.message);
          } else {
            setError(response.data.errors);
            toast.warning(response.data.message);
          }
        })
        .catch(function (error) {
          setDisableSubmit(false);
          toast.warning("Something went wrong!");
        });
    }
  };

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "Required";
    }
    return errors;
  };

  return (
    <>
      <link rel="stylesheet" href="/../asset/css/style.css" />
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content forgetpass">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

            <div className="modal-body p-0">
              <div className="row">
                <div className="col-md-6 imgfo">
                  <img
                    className="w-100"
                    src="asset/images/pass.jpg"
                    alt="logo"
                  />
                </div>
                <div className="col-md-6">
                  <form>
                    {error.length > 0 ? (
                      <div className="mtd-3">
                        {error.map((user, i) => (
                          <span className="errormessageforlogin text-center">
                            {user}
                          </span>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                    <h1>Forgot Password</h1>
                    <p>
                      Enter the email address associated with your account and
                      we’ll send you a link to reset your password
                    </p>

                    <div className="form-group mb-3">
                      <input
                        type="text"
                        name="email"
                        className="form-control mb-2"
                        placeholder="Enter Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {formErrors.email ? (
                        <>
                          <span className="formerrorforvalidation">
                            {formErrors.email}
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    <button
                      className="btn "
                      disabled={disableSubmit}
                      onClick={sendDetailsToServer}
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgotpassword;
