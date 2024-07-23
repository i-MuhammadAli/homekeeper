import Footer from "../footer/Footer";
import Header from "../header/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import $ from "jquery";
import createApi from "../../utils/api";
import Sendotp from "../homepage/sendotp";

function Registeragent() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
    cellnumber: "",
    confirmPassword: "",
    type: "",
    teamsize: "",
  });

  var md5 = require("md5");
  var CryptoJS = require("crypto-js");
  const [tryformeemail, Setstatefortryforme] = useState("");
  const [messageforname, setmessageforname] = useState("");
  const [messageforcompany, setmessageforcompanyname] = useState("");
  const [messageforcellnumber, setmessageforcellnumber] = useState("");
  const [messageforemail, setmessageforemail] = useState("");
  const [messageforpassword, setmessageforpassword] = useState("");
  const [messageforconfirmpassword, setmessageforconfirmpassword] =
    useState("");
  const [profilephoto, setFile] = useState();
  const [imagetrue, setimagetrue] = useState();
  const [eError, setEmailError] = useState("");
  const [Errorforempty, setErrorforempty] = useState("");
  const [Errorforempty1, setErrorforempty1] = useState("");
  const [errorforpasswordcombination, seterrorforpasswordcombination] =
    useState("");
  const [errorforpasswordcombination1, seterrorforpasswordcombination1] =
    useState("");
  const [usphone, setusphone] = useState("");
  const [errorforusphone, setstateforuserror] = useState("");

  const [ephoneerror, setPhoneError] = useState("");
  const [authid, setAuthId] = useState("");

  const [imageerrorforsize, setimageerrorforsize] = useState("");

  const [error, setError] = useState([]);

  const [checkedbox, setCheckedbox] = useState(false);
  const [otpstatus, setotptrue] = useState(0);

  const [errorforconfirmpassowrd, setErrorforconfirmpassword] = useState("");
  const api = createApi();

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function loadercall() {
    // alert("high")
    // $('.addclass').hide()
    // $('#buttonreplacement').show()
    // $('.addclass').hide();
    // $(this).show('< img src = "//www.willmaster.com/images/preload.gif" alt = "loading..." >')
    // < img src = "//www.willmaster.com/images/preload.gif" alt = "loading..." >
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "email" && value != "") {
      localStorage.removeItem("tryforfreeemail");
      Setstatefortryforme("");
    }
    if (name == "phone" && value.length > 12) {
      return;
    }

    if (name == "phone") {
      let newy = value;
      if (
        value == "123-456-7890" ||
        value == "000-000-0000" ||
        value == "111-111-1111" ||
        value == "222-222-2222" ||
        value == "333-333-3333" ||
        value == "444-444-4444" ||
        value == "555-555-5555" ||
        value == "666-666-6666" ||
        value == "777-777-7777" ||
        value == "888-888-8888" ||
        value == "999-999-9999"
      ) {
        // alert("wrong")
        setstateforuserror("Not Valid Mobile Number");
        return false;
      }

      var pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      if (pattern.test(value)) {
        setstateforuserror("");
      } else {
        setstateforuserror("Not Valid Mobile Number");
        console.log("test failed");
      }

      if (e.keyCode != 8 && e.keyCode != undefined) {
        if (value.length == 3 || value.length == 7) {
          let cs = "-";
          let ts = value;
          newy = ts + cs;
        }
      }
      if (name == "phone" && value.length == 10) {
        let isnum = /^[0-9]+$/.test(value);
        if (isnum == true) {
          newy = [
            value.slice(0, 3),
            value.slice(3, 6),
            value.slice(6, 10),
          ].join("-");
        }
        // setusphone(phone);
      }
      setusphone(newy);
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (e.target.files) {
      const image = e.target.files[0];
      setFile(image);
      // console.log("imagechange", image)

      if (!image) {
        // console.log('image is required');
        return false;
      }
      if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        // console.log("select valid image.");
        setimageerrorforsize("Please Select Valid Image");
        return false;
      }
      // console.log("image name with size",image.size)
      if (image.size > 5000000) {
        // console.log("image size greater than size")
        setimageerrorforsize("Image Not be greater than 5 Mb");
        setimagetrue("false");
      } else {
        setimagetrue("true");
        // console.log("please verify")
        setimageerrorforsize("");
      }
    }
  };
  const handleChangepassword = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [viewpassword, setviewpassword] = useState(false);
  const [viewpassword1, setviewpassword1] = useState(false);
  const [setnameerror, setstatenameerror] = useState("");

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setviewpassword(!viewpassword);
  };

  const checkboxclick = () => {
    setCheckedbox(!checkedbox);
  };

  const togglePassword1 = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown

    setviewpassword1(!viewpassword1);
  };

  //  const handleSubmitClick = (e) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //use in register
    if (data.password == data.confirmPassword) {
      if (data.password.length >= 7) {
        if (
          state.password &&
          state.password.length >= 7 &&
          state.password.length <= 18 &&
          data.phone.length == 12
        ) {
          var phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
          if (phone_pattern.test(data.phone)) {
            // console.log("testpass");
            setstateforuserror("");
          } else {
            setstateforuserror("Not Valid Mobile Number");
            return false;
          }

          setErrorforempty("");
          setErrorforconfirmpassword("");

          if (state.name && state.name != "") {
            var pattern = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
            if (pattern.test(state.name)) {
              if (state.name.length > 2) {
                setstatenameerror("");
                var passwordpattern = /^\w[a-zA-Z0-9.]*$/;

                if (passwordpattern.test(state.password)) {
                  // console.log("not");
                } else {
                  if (/[A-Z]/g.test(state.password) == false) {
                  } else {
                    if (/\d/g.test(state.password) == false) {
                    } else {
                      sendDetailsToServer();
                    }
                  }
                }
              }
            } else {
              setstatenameerror("Kindly Check your Name");
            }
          }
        } else {
          setstateforuserror("Not Valid Mobile Number");
        }
      }
    } else {
      setErrorforconfirmpassword("Confirm password not match");
    }
  };

  const sendDetailsToServer = async () => {
    // alert(state.teamsize)
    const hashedPassword = md5(state.password);
    var ciphertext = CryptoJS.AES.encrypt(
      state.phone,
      "secret key 1234"
    ).toString();

    // const userid=12;
    if ((profilephoto && imagetrue == "true") || !profilephoto) {
      // alert('hiii');
      //setError([]);
      let formdata = new FormData();
      if (tryformeemail) {
        formdata.append("email", tryformeemail);
      } else {
        formdata.append("email", state.email);
      }
      formdata.append("name", state.name);
      formdata.append("type", "agent");
      formdata.append("password", hashedPassword);
      formdata.append("company", state.company);
      formdata.append("agentId", "");
      // formdata.append('confirmPassword', state.confirmPassword);
      formdata.append("cellnumber", state.phone);
      // formdata.append("teamsize", state.teamsize);
      if (profilephoto) {
        formdata.append("profileimage", profilephoto);
      }
      $(".addclass").hide();
      $("#buttonreplacement").show();
      var otpobject = formdata;
      api
        // .post("http://127.0.0.1:8000/api/homekeeperregister", formdata)
        .post("/api/homekeeperregister", formdata)
        .then(function (response) {
          $("#buttonreplacement").hide();
          // console.log("response", response.data);
          if (response.data.status == "success") {
            localStorage.removeItem("tryforfreeemail");
            const lastinsertedid = response.data.insertedid;
            setAuthId(lastinsertedid);
            if (response.data.is_verify == 0) {
              setotptrue(1);
              // console.log("success");
            }
            localStorage.setItem("token-type", "agent");
            // localStorage.setItem("token-info", lastinsertedid);

            // navigate("../agent/dashboard");
            // window.location.reload();
            // alert(response.data.message);

            // navigate('/Thankyou');
            // setMessageforsuccess("Successfully Created Account")
            // setError("");
            // navigate('/accountsettings/' + lastinsertedid)

            // navigate('/Thankyouvalidate')
          } else {
            setError(response.data.errors);
            // console.log("under error", error);
          }
        })
        .catch(function (error) {
          // console.log("error", error);
        });
      $(".addclass").show();
    }
  };

  useEffect(() => {
    // myFunction();

    //   $('#staticBackdrop').show();

    if ((state.email && state.email != "") || tryformeemail != "") {
      setmessageforemail("");
      let email = ValidateEmail(state.email || tryformeemail);
      if (email == true) {
        setEmailError("");
      } else {
        setEmailError("Please enter valid email");
      }
    } else {
      setmessageforemail("Email Field is Required");
      setEmailError("");
    }
    if (state.phone && state.phone != "") {
      setmessageforcellnumber("");
    } else {
      setmessageforcellnumber("Phone Number is Required");
      setstateforuserror("");
    }
    // if (state.phone && state.phone != '') {
    //     if (state.phone.length > 10) {
    //         setPhoneError('Please enter valid Phone');
    //     }
    //     if (state.phone.length < 10) {
    //         setPhoneError('Please enter valid Phone');
    //     }
    //     var pattern = /^((?![0-5])[0-9]{10})$/;

    //     if (pattern.test(state.phone)) {
    //         // if ((state.phone.startsWith("0") !== true)) {
    //         console.log("correct")
    //         setPhoneError('');
    //     }
    //     else {
    //         console.log("not correct")
    //     }
    // }
    if (state.name && state.name != "") {
      setmessageforname("");
      var pattern = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
      if (pattern.test(state.name)) {
        if (state.name.length > 2) {
          // console.log("name is correct");
          setstatenameerror("");
        } else {
          setstatenameerror("Kindly Check your Name");
        }
      } else {
        // console.log("name is not correct");
        setstatenameerror("Kindly Check your Name");
      }
    } else {
      setstatenameerror("");
      setmessageforname("Name Field is Required");
    }

    if (state.company && state.company != "") {
      setmessageforcompanyname("");
    } else {
      setmessageforcompanyname("Password Field is Required");
    }

    if (
      state.password == state.confirmPassword &&
      state.confirmPassword != ""
    ) {
      setErrorforconfirmpassword("");
    } else {
      if (state.confirmPassword != "") {
        setErrorforconfirmpassword("confirm password not match");
      } else {
        setErrorforconfirmpassword("");
      }
    }

    if (state.password && state.password != "") {
      setmessageforpassword("");
    } else {
      setmessageforpassword("Password Field is Required");
      setErrorforempty("");
      seterrorforpasswordcombination("");
    }
    if (state.confirmPassword && state.confirmPassword != "") {
      setmessageforconfirmpassword("");
      seterrorforpasswordcombination1("");
    } else {
      setErrorforempty1("");
      setmessageforconfirmpassword("Password Field is Required");
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
      var passwordpattern = /^\w[a-zA-Z0-9.]*$/;

      if (passwordpattern.test(state.password)) {
        seterrorforpasswordcombination("Required Strong Password");
        setErrorforempty("");
      } else {
        if (/[A-Z]/g.test(state.password) == false) {
          seterrorforpasswordcombination("Required Strong Password");
          setErrorforempty("");
        } else {
          if (/\d/g.test(state.password) == false) {
            seterrorforpasswordcombination("Required Strong Password");
            setErrorforempty("");
          } else {
            setErrorforempty("");
            seterrorforpasswordcombination("");
          }
        }
      }
    }

    if (state.confirmPassword && state.confirmPassword.length <= 7) {
      setErrorforempty1("Password Should Greater than 7 characters");
    }
    if (state.confirmPassword && state.confirmPassword.length >= 18) {
      setErrorforempty1("Password Should less than 18 characters");
    }
    if (
      state.confirmPassword &&
      state.confirmPassword.length >= 7 &&
      state.confirmPassword.length <= 18
    ) {
      var passwordpattern = /^\w[a-zA-Z0-9.]*$/;

      if (passwordpattern.test(state.confirmPassword)) {
        seterrorforpasswordcombination1("Required Strong Password");
        setErrorforempty1("");
      } else {
        if (/[A-Z]/g.test(state.confirmPassword) == false) {
          seterrorforpasswordcombination1("Required Strong Password");
          setErrorforempty1("");
        } else {
          if (/\d/g.test(state.confirmPassword) == false) {
            seterrorforpasswordcombination1("Required Strong Password");
            setErrorforempty1("");
          } else {
            setErrorforempty1("");
            seterrorforpasswordcombination1("");
          }
        }
      }
    }

    if (localStorage.getItem("tryforfreeemail")) {
      // alert(localStorage.getItem('tryforfreeemail'))
      // console.log(
      //   "sessionfortryforme",
      //   localStorage.getItem("tryforfreeemail")
      // );
      Setstatefortryforme(localStorage.getItem("tryforfreeemail"));
    }
  });
  const showtextgpassword = () => {
    //     const [values, setValues] = React.useState({
    //         password: "",
    //         showPassword: false,
    //     });
  };
  //     const handleClickShowPassword = () => {
  //         setValues({ ...values, showPassword: !values.showPassword });
  //     };

  return (
    <>
      <Header />
      {otpstatus == 1 ? (
        <Sendotp
          authId={authid}
          emailId={state.email}
          setOtpStatus={setotptrue}
        />
      ) : (
        <section className="login register">
          <div className="container">
            <h1>Registeration</h1>
            <div className="row">
              <div className="col-sm-5">
                {error.length > 0 ? (
                  <div>
                    {error.map((user, i) => (
                      // <li className="user">{user}</li>
                      <span className="errormessageforalreadyuser">{user}</span>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                <form
                  className="form-signin text-start agentreg"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type="hidden"
                    name="type"
                    className="form-control"
                    value="agent"
                  />
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Full name"
                      {...register("name", {
                        required: "Name Field is Required",
                      })}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="name"
                      render={({ message }) => (
                        <>
                          {messageforname ? (
                            <span className="errormessage">
                              {messageforname}
                            </span>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    />
                    {/* {messageforname ? <span className='errormessage'>{messageforname}</span> : ""} */}

                    {setnameerror ? (
                      <>
                        <span className="errormessage">{setnameerror}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="company"
                      className="form-control"
                      placeholder="Company name"
                      {...register("company", {
                        required: "Company field is Required",
                      })}
                      value={state.company}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="company"
                      render={({ message }) => (
                        <>
                          {messageforcompany ? (
                            <span className="errormessage">
                              {messageforcompany}
                            </span>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    {/* <label className="st">Mobile Number<span>*</span>: </label> */}

                    <input
                      type="text"
                      className="form-control inputnumber"
                      placeholder="Cell number"
                      name="phone"
                      {...register("phone", {
                        required: "Phone Number is Required",
                      })}
                      value={usphone ? usphone : ""}
                      onKeyDown={handleChange}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="phone"
                      render={({ message }) => (
                        <>
                          {messageforcellnumber ? (
                            <span className="errormessage">
                              {messageforcellnumber}
                            </span>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    />
                    {ephoneerror && ephoneerror !== "" ? (
                      <span className="errormessage">{ephoneerror}</span>
                    ) : (
                      ""
                    )}
                    {errorforusphone ? (
                      <span className="errormessage">{errorforusphone}</span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={tryformeemail ? tryformeemail : state.email}
                      {...register("email", {
                        required: "Email field is Required",
                      })}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => (
                        <>
                          {messageforemail ? (
                            <span className="errormessage">
                              {messageforemail}
                            </span>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    />
                    {eError && eError !== "" ? (
                      <>
                        <span className="errormessage">{eError}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <span className="password d-block">
                      <input
                        type={viewpassword ? "text" : "password"}
                        id="password"
                        className="form-control mb-2"
                        placeholder="Password"
                        name="password"
                        {...register("password", {
                          required: "Password Field is required",
                        })}
                        value={state.password}
                        onChange={handleChange}
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
                  <div className="form-group mb-3">
                    <span className="password d-block">
                      <input
                        type={viewpassword1 ? "text" : "password"}
                        id="confirmPassword"
                        className="form-control mb-2"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        {...register("confirmPassword", {
                          required: "Confirm Password is Required",
                        })}
                        value={state.confirmPassword}
                        onChange={handleChange}
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
                      <span className="errormessage dddd">
                        {errorforconfirmpassowrd &&
                        errorforconfirmpassowrd !== ""
                          ? errorforconfirmpassowrd
                          : ""}
                      </span>
                    ) : (
                      ""
                    )}
                    {Errorforempty1 && Errorforempty1 !== "" ? (
                      <span className="errormessageforlogin sss">
                        {Errorforempty1}
                      </span>
                    ) : (
                      ""
                    )}
                    {errorforpasswordcombination1 ? (
                      <span className="errormessageforlogin sss">
                        {errorforpasswordcombination1}
                      </span>
                    ) : (
                      ""
                    )}
                    <p className="mb-0 mt-0">
                      Password must be atleast 7 characters
                    </p>
                  </div>
                  {/* <div className="form-group">
                  <select
                    name="teamsize"
                    className="form-control"
                    value={state.teamsize}
                    onChange={handleChange}
                  >
                    <option value="">
                      How many people will use Follow up Boss?
                    </option>
                    <option value="1-2">1-2 People</option>
                    <option value="3-5">3-5 People</option>
                    <option value="6-10">6-10 People</option>
                    <option value="11-20">11-20 People</option>
                    <option value="20+">20+ People</option>
                  </select>
                </div> */}

                  {/* <div className="form-group">
                                <label className="st">Profile Photo : </label>
                                <input type="file" className="form-control" placeholder="Cell number" onChange={handleChange} />
                                <span className="errormessageforlogin ddd">{imageerrorforsize}</span>
                                <p className="mb-0">*Optional to add your Profit & Upload up to 5 MB</p>
                            </div> */}

                  <button
                    className={checkedbox ? "btn addclass" : "btn addclass"}
                    type={checkedbox ? "submit" : "submit"}
                    onClick={loadercall}
                  >
                    Start My Free Trial
                  </button>
                  <div id="buttonreplacement" style={{ margin: "30px" }}>
                    <img
                      src="//www.willmaster.com/images/preload.gif"
                      alt="loading..."
                    />
                  </div>

                  {/* {otpstatus == 1 ? <Sendotp /> : ""} */}
                  <p className="text-center">
                    by clicking “Start My Free Trial” you agree to the{" "}
                    <a href="#">Terms & Condition</a> and{" "}
                    <a href="#">Privacy Policy</a>
                  </p>
                </form>
              </div>

              <div className="col-sm-7 left_set">
                <h1>Close more deal with:</h1>
                <ul className="Closemore">
                  <li>Full access to follow Up Boss team</li>
                  <li>Accounts for everyone on your team</li>
                  <li>Unlimited calling, texting and emailing</li>
                  <li>Integration with 200+ lead sources</li>
                  <li>iPhone & Android apps</li>
                  <li>7-day-a-week support</li>
                </ul>
                <p className="lin mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting,
                </p>

                <div className="usr">
                  <div className="img">
                    <img src="asset/images/user.jpg" alt="img" />
                  </div>
                  <h4>Betty Cooker</h4>
                  <p>Business Consultant</p>
                  <p>The Ashton Real Estate Group</p>
                  <p>#1RE?MAX team worldwide</p>
                </div>
                <h2>Trusted by top teams in North</h2>
                <h2 className="mb-3">America including:</h2>
                <ul className="upimg">
                  <li>
                    <img src="asset/images/web1.png" alt="img" />
                  </li>
                  <li>
                    <img src="asset/images/web2.png" alt="img" />
                  </li>
                  <li>
                    <img src="asset/images/web3.png" alt="img" />
                  </li>
                  <li>
                    <img src="asset/images/web4.png" alt="img" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Registeragent;
