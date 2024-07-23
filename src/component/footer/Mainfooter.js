import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

function Mainfooter() {
  return (
    <>
      <footer className="main-footer  footer1">
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-12">
                        <div className="try_follow">
                            <h4>Try Follow Up Boss Free For 14 Days</h4>
                            <form>
                                <input className="form-control" type="text" placeholder="Enter your email"/>
                                <Link className="btn btn-outline-success" type='submit' to="/tryforme">Try for Free</Link>
                            </form>
                            <h6>Or Give Us A Call <a href="tel:(855) 622-5311">(855) 622-5311</a></h6>

                        </div>
                    </div> */}

            <div className="col-md-4 col-lg-2">
              <a className="logo_footer " href="#">
                <img src="asset/images/logo_footer.png" alt="logo" />
              </a>
              <p className="mt-4">Phone and email support</p>
              <p>8am - Bpm EST</p>
              <p>7 days a week</p>
              <p>
                <a href="tel:(855) 622-5311">(855) 622-5311</a>
              </p>
              <p>
                <a href="mailto:supportefollommhoss.com">
                  supportefollommhoss.com
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-2">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press Kit</a>
                </li>
                <li>
                  <a href="#">COVID-19</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-lg-2">
              <h3>Resources</h3>
              <ul>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Customer Results</a>
                </li>
                <li>
                  <a href="#">Get a Demo</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Updates</a>
                </li>
                <li>
                  <a href="#">Status</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-lg-2">
              <h3>Product</h3>
              <ul>
                <li>
                  <a href="#">For Solo Agents</a>
                </li>
                <li>
                  <a href="#">For Team Leaders</a>
                </li>
                <li>
                  <a href="#">For ISAs</a>
                </li>
                <li>
                  <a href="#">Large Teams</a>
                </li>
                <li>
                  <a href="#">Small Teams</a>
                </li>
                <li>
                  <Link to="/subscriptionplan">Pricing</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 col-lg-2">
              <h3>Compare</h3>
              <ul>
                <li>
                  <a href="#">Open System Vs</a>
                </li>
                <li>
                  <a href="#">All-in-ones</a>
                </li>
                <li>
                  <a href="#">Top Producer</a>
                </li>
                <li>
                  <a href="#">Wise Agents</a>
                </li>
                <li>
                  <a href="#">Boomtown</a>
                </li>
                <li>
                  <a href="#">CINC</a>
                </li>
                <li>
                  <a href="#">LonDisk</a>
                </li>
                <li>
                  <a href="#">Contactually</a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 col-lg-2">
              <h3>Legal</h3>
              <ul>
                <li>
                  <a href="#">Security</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="end_footer">
            <div className="row">
              <div className="col-sm-6">
                <p>&copy; 2022 House Keeper . All right reserved</p>
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
      </footer>
    </>
  );
}

export default Mainfooter;
