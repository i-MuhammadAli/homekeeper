import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Forgotpassword from "../forgotpassword/Forgotpassword";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createApi from "../../utils/api";
import Sendotp from "../homepage/sendotp";
import { setAuthUser } from "../../store";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Errorforempty, setErrorforempty] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [eError, setEmailError] = useState("");
  const [optPage, setOptPage] = useState(0);
  const [authid, setAuthId] = useState("");

  const api = createApi();
  const dispatch = useDispatch();

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function containsOnlyNumbers(str) {
    if (/^[0-9]+$/.test(str)) {
      return true;
    }
    return false;
  }

  const loginstart = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    const userData = {
      name,
      email,
      password,
    };
    localStorage.setItem("token-info", JSON.stringify(userData));
    setIsLoggedin(true);
    setName("");
    setEmail("");
    setPassword("");
  };

  const logout = () => {
    localStorage.removeItem("token-info");
    setIsLoggedin(false);
  };

  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [viewpassword, setviewpassword] = useState(false);
  const [error, setError] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  var md5 = require("md5");

  const sendDetailsToServer = async () => {
    const hashedPassword = md5(state.password);
    setError([]);
    let formdata = new FormData();
    formdata.append("email", state.email);
    formdata.append("password", hashedPassword);
    api
      .post("/api/homekeeperlogin", formdata)
      .then(function (response) {
        if (response.data.status === "success") {
          // alert("sf")

          localStorage.setItem("token-info", response.data.data.id);
          localStorage.setItem("token-type", response.data.data.usertype);
          localStorage.setItem("user_name", response.data.data.name);
          setAuthId(response.data.data.id);
          dispatch(setAuthUser());

          if (response.data.data.usertype === "agent") {
            navigate("/dashboard");
            window.location.reload();
            return;
          }
          if (response.data.data.usertype === "homeowner") {
            navigate("/dashboard");
            window.location.reload();
            return;
          }
        } else {
          setError(response.data.errors);
          console.log("under error", error);
          if (response.data.is_verify == 0) {
            // set otp to true
            setAuthId(response.data.userid);
            setOptPage(1);
          }
          // navigate("/", { state: response.data.usertype });
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (state.email && state.email != "") {
      let email = ValidateEmail(state.email);
      const checkemail = containsOnlyNumbers(state.email);

      if (checkemail == true && state.email.length == 10) {
        setEmailError("");
      } else if (email == true) {
        setEmailError("");
      } else {
        setEmailError("Please enter valid Email");
      }
    }

    if (state.password && state.password.length <= 7) {
      setErrorforempty("Password Should Greater than 7 characters");
    }
    if (state.password && state.password.length >= 18) {
      setErrorforempty("Password Should less than 18 characters");
    }
    if (
      state.password &&
      state.password.length >= 7 &&
      state.password.length <= 18
    ) {
      setErrorforempty("");
    }
  });

  const handleSubmitClick = (e) => {
    e.preventDefault();

    let errors = [];
    const isEmpty = Object.values(state).every((x) => x === null || x === "");
    if (isEmpty == false) {
      if (
        state.password &&
        state.password.length >= 7 &&
        state.password.length <= 18
      ) {
        setErrorforempty("");
        let email = ValidateEmail(state.email);
        const checkemail = containsOnlyNumbers(state.email);
        if (checkemail == true && state.email.length == 10) {
          sendDetailsToServer("");
        }
        if (email == true) {
          sendDetailsToServer("");
        }
      }

      // if (state.password === state.confirmPassword) {
      //
      // } else {
      //     errors.push('password mismatch');
      // }
    }
    setError(errors);
    if (state.password == "" && state.email == "") {
      setErrorforempty("Fields can't be Empty");
    }

    // if (state.password && state.password.length < 7) {
    //     setErrorforempty("Password Should Greater than 7 characters");
    // }
    // if (state.password && state.password.length > 18) {
    //     setErrorforempty("Password Should less than 18 characters");
    // }
  };

  // const togglePassword=()=>
  // {
  //     alert("tasfa");
  //     setviewpassword(true);
  // }

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setviewpassword(!viewpassword);
  };
  return (
    <div>
      {/* <ToastContainer /> */}

      {optPage === 1 ? (
        <Sendotp
          authId={authid}
          emailId={state.email}
          setOtpStatus={setOptPage}
        />
      ) : (
        <>
          {error ? <span className="errormessage">{error}</span> : ""}

          <link rel="stylesheet" href="/../asset/css/style.css" />
          <section className="login text-center" onSubmit={handleSubmitClick}>
            <div className="container">
              <div className="in_login">
                <Link to="/">
                  <img src="/../asset/images/logo.png" alt="logo" />
                </Link>
                <form className="form-signin text-start mt-4">
                  <h1>Sign In</h1>
                  <br />

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      id="inputEmail"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={state.email}
                      onChange={handleChange}
                    />
                    {error.length > 0 ? (
                      <div className="mtd-3">
                        {error.map((user, i) => (
                          <span className="errormessageforlogin">{user}</span>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                    {eError && eError !== "" ? (
                      <span className="errormessage">{eError}</span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <label>Password</label>
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
                        className={
                          viewpassword ? "far fa-eye" : "fa fa-eye-slash"
                        }
                        aria-hidden="true"
                        onClick={togglePassword}
                      ></i>
                    </span>
                    <span className="errormessageforlogin">
                      {Errorforempty}
                    </span>
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="remember-me" /> Remember
                          me
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <a
                        className="forg"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Forgot Password
                      </a>
                    </div>
                  </div>
                  <button className="btn" type="submit">
                    Log In Account
                  </button>
                  <p className="text-center">
                    Don’t have an account? <Link to="/register">Sign Up</Link>
                  </p>
                </form>
              </div>
            </div>
          </section>
          <Forgotpassword />
        </>
      )}
    </div>
  );
}

export default Login;
