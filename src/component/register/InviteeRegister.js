import Footer from "../footer/Footer";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";

import createApi from "../../utils/api";
import Header from "../header/Header";
import Loader from "../loader_folder/Loader";

import { setAuthUser } from "../../store";

function InviteeRegister() {
  const md5 = require("md5");
  const navigate = useNavigate();
  const api = createApi();
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agentId, setAgentId] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [Errorforempty, setErrorforempty] = useState("");
  const [Errorforempty1, setErrorforempty1] = useState("");
  const [errorforpasswordcombination, seterrorforpasswordcombination] =
    useState("");
  const [errorforpasswordcombination1, seterrorforpasswordcombination1] =
    useState("");
  const [error, setError] = useState("");
  const [checkedbox, setCheckedbox] = useState(false);
  const [errorforconfirmpassowrd, setErrorforconfirmpassword] = useState("");
  const [messageforpassword, setmessageforpassword] = useState("");
  const [messageforconfirmpassword, setmessageforconfirmpassword] =
    useState("");

  const [viewpassword, setviewpassword] = useState(false);
  const [viewpassword1, setviewpassword1] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (code) {
      api
        .get(`/api/invitee_registration?code=${code}`)
        .then(function (response) {
          //   console.log("response", response.data);
          if (response.data.status === "success") {
            setEmail(response.data.data.email);
            setName(response.data.data.fname + " " + response.data.data.lname);
            setPhone(response.data.data.cellphone);
            setAgentId(response.data.data.createdby_client_id);
            setLogo(response.data.logo);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  const togglePassword = () => {
    setviewpassword(!viewpassword);
  };

  const checkboxclick = () => {
    setCheckedbox(!checkedbox);
  };

  const togglePassword1 = () => {
    setviewpassword1(!viewpassword1);
  };

  const onSubmit = () => {
    if (password === confirmPassword) {
      setErrorforconfirmpassword("");
      sendDetailsToServer();
    } else {
      setErrorforconfirmpassword("Passwords do not match");
    }
  };

  const sendDetailsToServer = async () => {
    const hashedPassword = md5(password);
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("type", "homeowner");
    formdata.append("password", hashedPassword);
    formdata.append("cellnumber", phone);
    formdata.append("agentId", agentId);
    api
      .post("/api/home_owner_register", formdata)
      .then(function (response) {
        // console.log("response", response.data);
        if (response.data.status === "success") {
          localStorage.setItem("token-type", "homeowner");
          localStorage.setItem("token-info", response.data.insertedid);
          localStorage.setItem("user_name", response.data.user);
          dispatch(setAuthUser());
          navigate("/dashboard");
        } else {
          setError(response.data.message);
        }
      })
      .catch(function (error) {
        setError(error);
      });
  };

  return (
    <>
      <Header logo={logo} />

      <section className=" login register lenderReg registerhomeowner">
        <div className="container ">
          {email ? (
            <form className="text-start " onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-center">{name}, Welcome to Nest Keeper!</h1>
              <div className=" flex flex-col items-center justify-center form-signin ">
                <div className="form-group">
                  <label className="st">
                    Password<span>*</span>{" "}
                  </label>
                  <span className="password d-block">
                    <input
                      type={viewpassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      {...register("password", {
                        required: "Password Field is required",
                      })}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => (
                        <>
                          {messageforpassword ? (
                            <span className="errormessage">
                              {messageforpassword}
                            </span>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    />

                    <i
                      className={
                        viewpassword ? "far fa-eye" : "fa fa-eye-slash"
                      }
                      onClick={togglePassword}
                    ></i>
                  </span>
                  {/*<span className="errormessageforlogin">{Errorforempty}</span>*/}
                  {Errorforempty && Errorforempty !== "" ? (
                    <span className="errormessageforlogin">
                      {Errorforempty}
                    </span>
                  ) : (
                    ""
                  )}

                  {errorforpasswordcombination ? (
                    <span className="errormessageforlogin">
                      {errorforpasswordcombination}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label className="st">
                    Confirm Password <span>*</span>:{" "}
                  </label>
                  <span className="password d-block">
                    <input
                      type={viewpassword1 ? "text" : "password"}
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Password"
                      name="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Confirm Password is Required",
                      })}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />
                    <i
                      className={
                        viewpassword1 ? "far fa-eye" : "fa fa-eye-slash"
                      }
                      onClick={togglePassword1}
                    ></i>
                  </span>

                  <ErrorMessage
                    errors={errors}
                    name="confirmPassword"
                    render={({ message }) => (
                      <>
                        {messageforconfirmpassword ? (
                          <span className="errormessage">
                            {messageforconfirmpassword}
                          </span>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  />

                  {errorforconfirmpassowrd ? (
                    <span className="errormessage">
                      {errorforconfirmpassowrd && errorforconfirmpassowrd !== ""
                        ? errorforconfirmpassowrd
                        : ""}
                    </span>
                  ) : (
                    ""
                  )}
                  {Errorforempty1 && Errorforempty1 !== "" ? (
                    <span className="errormessageforlogin">
                      {Errorforempty1}
                    </span>
                  ) : (
                    ""
                  )}

                  {errorforpasswordcombination1 ? (
                    <span className="errormessageforlogin">
                      {errorforpasswordcombination1}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={checkedbox}
                        className="checkboxclick"
                        onClick={checkboxclick}
                        value="remember-me"
                      />
                      I agree to the{" "}
                      <Link className="tnc" to="/termsandcondition">
                        Terms of Service{" "}
                      </Link>
                      and{" "}
                      <Link className="privacy" to="/privacypolicy">
                        Privacy Policy{" "}
                      </Link>
                    </label>
                  </div>

                  <div className="googlerecaptcha"></div>
                  {/* <img src="asset/images/robot.jpg" className="img" /> */}
                  {/* <Googlerecaptcha /> */}
                </div>
                <div className="form-group pl-0">
                  {error ? (
                    <div>
                      <span className="errormessageforalreadyuser">
                        Registration Failed - {error}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* <h6 className={Messageforsuccess ? "successfullysubmission" : ""}>
                {Messageforsuccess}
              </h6> */}
              </div>
              {/* <div className="flex justify-center">
                <div id="buttonreplacement">
                  <img
                    src="//www.willmaster.com/images/preload.gif"
                    alt="loading..."
                    style={{ marginTop: "-80px" }}
                  />
                </div>
              </div> */}
              <div className="flex w-30 justify-center">
                <button
                  className={checkedbox ? "btn addclass " : "btn notactive "}
                  type={checkedbox ? "submit" : "button"}
                >
                  Create an Account
                </button>
              </div>
            </form>
          ) : (
            <>Page Not Found!</>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default InviteeRegister;
