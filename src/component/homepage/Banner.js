import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

function Banner() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  //     useEffect(() => {

  // alert(state.email)

  //     })

  const tryforme = (e) => {
    if (tryformeemail != "") {
      // alert(tryformeemail)
      localStorage.setItem("tryforfreeemail", tryformeemail);
      console.log("token-info", localStorage.getItem("tryforfreeemail"));
      // return false;
    }
    if (tryformeemail == "") {
      localStorage.removeItem("tryforfreeemail");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "email") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        console.log("true");
        setEmailError("");
        // alert(value)
        setstatetryforme(value);
        // localStorage.setItem('token-info', response.data.data.id);
      } else {
        console.log("false");
        setEmailError("Please Check your Email");
      }
    } else {
      console.log("empty");
    }
  };

  const [eError, setEmailError] = useState("");
  const [tryformeemail, setstatetryforme] = useState("");

  const sendDetailsToServer = async () => {
    // setError([]);
    let formdata = new FormData();
    formdata.append("email", state.email);
    formdata.append("password", state.password);
    axios
      .post("https://connectbiz.in/api/login", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          console.log("asdfsadfsdaf", response.data.data.usertype);
          navigate("/Thankyou", { state: response.data.data.usertype });
        }
      });
    // .catch(function (error) {
    //     console.log('error', error);
    // });
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    let errors = [];
    const isEmpty = Object.values(state).every((x) => x === null || x === "");
    if (isEmpty == false) {
      sendDetailsToServer();
      // if (state.password === state.confirmPassword) {
      //
      // } else {
      //     errors.push('password mismatch');
      // }
    }
    // setError(errors);
  };

  // const togglePassword=()=>
  // {
  //     alert("tasfa");
  //     setviewpassword(true);
  // }

  return (
    <>
      <section
        className="banner"
        style={{ backgroundImage: "url(./asset/images/banner_bg.png)" }}
      >
        <div className="container">
          <div
            id="myCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-sm-6">
                    <h1>
                      Stay in touch and provide
                      <br />
                      Value to your client
                    </h1>
                    <h5>Try this amazing software for free!</h5>
                    {/* <form className="form-inline login">
                                        <input className="form-control" type="text" name='email'  onChange={handleChange} placeholder="Enter your email" aria-label="Search" />
                                        {eError && eError !== '' ? <span className='errormessage formerrorforvalidation'>{eError}</span> : ""}
                                        <Link className="btn btn-outline-success" onClick={tryforme} type='submit' to="/tryforme">Try for Free</Link>
                                        <h6>100% free to get started. No cradit card needed</h6>
                                    </form> */}
                  </div>
                  <div className="col-sm-6">
                    <img
                      className="w-100"
                      src="asset/images/video_banner.jpg"
                      alt="banner"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Forgotpassword /> */}
    </>
  );
}

export default Banner;
