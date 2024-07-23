import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <a className="logo_footer" href="!#">
                <img src="/../asset/images/logo.png" alt="logo" />
              </a>
            </div>

            <div className="col-lg-3">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="!#">Home</a>
                </li>
                <li>
                  <a href="!#">About Us</a>
                </li>
                <li>
                  <a href="!#">Partnership Opportunities</a>
                </li>
                <li>
                  <a href="!#">Pricing</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h3>Register</h3>
              <ul>
                <li>
                  <Link to="/registerhomeowner">Register as Home Owner</Link>
                </li>
                <li>
                  <Link to="/registeragent">Register as Agent</Link>
                </li>
                <li>
                  <Link to="/register">Register as Lender</Link>
                </li>
                <li>
                  <Link to="/registertitlecompany">
                    Register as Title Company
                  </Link>
                </li>
                <li>
                  <Link to="/registerhomeinspector">
                    Register as Home Inspector
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h3>Further Information</h3>
              <ul>
                <li>
                  <a href="!#">Privacy Policy</a>
                </li>
                <li>
                  <a href="!#">Term & Condition</a>
                </li>
                <li>
                  <a href="!#">Support</a>
                </li>
                <li>
                  <a href="!#">Contact US</a>
                </li>
              </ul>
            </div>

            <div className="end_footer">
              <div className="row">
                <div className="col-sm-6">
                  <p>&copy; 2024 Nest Keeper . All right reserved</p>
                </div>
                <div className="col-sm-6">
                  <ul className="social">
                    <li>
                      <a href="!#">
                        <img src="/../asset/images/fb1.png" alt="icon" />
                      </a>
                    </li>
                    <li>
                      <a href="!#">
                        <img src="/../asset/images/fb2.png" alt="icon" />
                      </a>
                    </li>
                    <li>
                      <a href="!#">
                        <img src="/../asset/images/fb3.png" alt="icon" />
                      </a>
                    </li>
                    <li>
                      <a href="!#">
                        <img src="/../asset/images/fb4.png" alt="icon" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
