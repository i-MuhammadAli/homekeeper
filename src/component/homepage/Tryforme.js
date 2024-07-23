import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Mainfooter from "../footer/Mainfooter";

function Tryforme() {
  const navigate = useNavigate();
  console.log("sessionfortryforme", localStorage.getItem("tryforfreeemail"));

  return (
    <>
      <Header />
      <section className="tryforme">
        <div className="container">
          <h2>Free Registration</h2>
          <div className="set">
            <p>Please tell us who you are so we can setup you correctly.</p>

            <ul>
              <li>
                <Link to="/registerhomeowner">I am a Homeowner</Link>
              </li>
              <li>
                <Link to="/registeragent">I am a Real Estate Agent</Link>
              </li>
              {/* <li><Link to="/register">I am a Mortgage Lender</Link></li>
                        <li><Link to="/registertitlecompany">I am a Title Company</Link></li>
                        <li><Link to="/registerhomeinspector">I am a Home Inspector</Link></li> */}
            </ul>
          </div>
        </div>
      </section>
      {/* <Mainfooter /> */}

      {/* <section className="follows">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>" Follow Up Boss is a big reason why we <br />have been able to souble our sales every <br />year year since 2015 ”</h3>
                        <div className="usr">
                            <span><img src="asset/images/user.jpg" alt="user" /></span>
                            <h5>Preston Guyton</h5>
                            <p>Founder, <a href="#">EZHomesearch.com</a></p>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="usimg">
                            <img src="asset/images/follow_user.jpg" alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

      {/* <Forgotpassword /> */}
    </>
  );
}

export default Tryforme;
