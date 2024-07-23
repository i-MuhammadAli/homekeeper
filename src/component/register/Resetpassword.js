import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import createApi from "../../utils/api";
import md5 from "md5";

function Resetpassword() {
  const api = createApi();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [matchpassworderror, setstateforerrorvalidation] = useState("");
  const [errorforpasswordcombination, seterrorforpasswordcombination] =
    useState("");
  const [errorforpasswordcombination1, seterrorforpasswordcombination1] =
    useState("");
  const [Errorforempty, setErrorforempty] = useState("");
  const [Errorforempty1, setErrorforempty1] = useState("");
  const [errorforconfirmpassowrd, setErrorforconfirmpassword] = useState("");
  const [viewpassword, setviewpassword] = useState(false);
  const [viewpassword1, setviewpassword1] = useState(false);
  const [error, setError] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendDetailsToServer = async () => {
    setError([]);
    let formdata = new FormData();
    formdata.append("password", md5(state.password));
    formdata.append("token", code);
    api
      .post("/api/homekeeperpasswordchanged", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status === "success") {
          // console.log("asdfsadfsdaf", response.data.data);
          navigate("/passwordchanged");
        } else {
          setError(response.data.errors);
          // console.log("under error", error);
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    let errors = [];
    const isEmpty = Object.values(state).every((x) => x === null || x === "");
    if (isEmpty == false) {
      if (state.password === state.confirmPassword) {
        // start here

        if (
          state.password &&
          state.password.length >= 7 &&
          state.password.length <= 18
        ) {
          setErrorforempty("");
          setErrorforconfirmpassword("");
          var passwordpattern = /^\w[a-zA-Z0-9.]*$/;
          if (passwordpattern.test(state.password)) {
            console.log("not match password");
          } else {
            console.log("match password");
            sendDetailsToServer();
          }
        }

        // end here
        sendDetailsToServer();
      } else {
        console.log("password mismatch");
        setstateforerrorvalidation("Password doesn't match");
        // errors.push('password mismatch');
      }
    }
    setError(errors);
  };

  // const togglePassword=()=>
  // {
  //     alert("tasfa");
  //     setviewpassword(true);
  // }

  const togglePassword = () => {
    setviewpassword(!viewpassword);
  };

  const togglePassword1 = () => {
    setviewpassword1(!viewpassword1);
  };
  return (
    <>
      <Header />
      <section
        className="verify setpass text-center"
        onSubmit={handleSubmitClick}
      >
        <div className="container login">
          {error.length > 0 ? (
            <div>
              {error.map((user, i) => (
                <span className="errormessageforalreadyuser">{user}</span>
              ))}
            </div>
          ) : (
            ""
          )}

          <form>
            <h1>Set New Password</h1>
            <p className="mb-3"></p>
            <div className="form-group">
              <label>New Password</label>
              <span className="password d-block">
                <input
                  type={viewpassword ? "text" : "password"}
                  id="inputPassword"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={state.password}
                  onChange={handleChange}
                />
                <i
                  className={viewpassword ? "far fa-eye" : "fa fa-eye-slash"}
                  aria-hidden="true"
                  onClick={togglePassword}
                ></i>
              </span>
              {Errorforempty && Errorforempty !== "" ? (
                <span className="errormessageforlogin w-100 text-start mt-1">
                  {Errorforempty}
                </span>
              ) : (
                ""
              )}

              {errorforpasswordcombination ? (
                <span className="errormessageforlogin w-100 text-start mt-1">
                  {errorforpasswordcombination}
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label>Re-Enter New Password</label>
              <span className="password d-block">
                <input
                  type={viewpassword1 ? "text" : "password"}
                  id="inputPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Enter Confirm Password"
                  value={state.confirmPassword}
                  onChange={handleChange}
                />
                <i
                  className={viewpassword1 ? "far fa-eye" : "fa fa-eye-slash"}
                  aria-hidden="true"
                  onClick={togglePassword1}
                ></i>
              </span>

              {errorforconfirmpassowrd && errorforconfirmpassowrd !== "" ? (
                <span className="errormessage">{errorforconfirmpassowrd}</span>
              ) : (
                ""
              )}

              {Errorforempty1 && Errorforempty1 !== "" ? (
                <span className="errormessageforlogin w-100 text-start mt-1">
                  {Errorforempty1}
                </span>
              ) : (
                ""
              )}

              {errorforpasswordcombination1 ? (
                <span className="errormessageforlogin w-100 text-start mt-1">
                  {errorforpasswordcombination1}
                </span>
              ) : (
                ""
              )}

              {matchpassworderror ? (
                <span className="errormessageforlogin w-100 text-start mt-1">
                  {matchpassworderror}
                </span>
              ) : (
                ""
              )}
            </div>
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Resetpassword;
