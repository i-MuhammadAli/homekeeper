import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import createApi from "../../utils/api";

function Sidebar() {
  const [isActive0, setActive0] = useState(false);
  const [isActive, setActive] = useState(false);

  const [admindata, setadmindata] = useState("");
  const [subheading, setstateforsubheading] = useState("");
  const [mainheading, setstateforheading] = useState("");
  const api = createApi();

  useEffect(() => {
    const queryString = window.location.href;
    const myarray = queryString.split("/");
    // console.log("myarray", myarray);
    const heading = myarray[4];
    const subhead = myarray[5];
    setstateforsubheading(subhead);
    setstateforheading(heading);
    console.log("heading1", myarray[4]);
    console.log("subheading", myarray[5]);
    sendDetailsToServer();
  }, []);

  const sendDetailsToServer = async () => {
    // setError([]);

    let formdata = new FormData();
    const userid = localStorage.getItem("token-info");
    formdata.append("userid", userid);
    // formdata.append('password', state.password);
    api
      // .post("http://127.0.0.1:8000/api/homekeeperviewprofile", formdata)
      .post("/api/homekeeperviewprofile", formdata)
      .then(function (response) {
        if (response.data.status == "success") {
          console.log("responseforadminprofile", response.data.viewprofile);
          setadmindata(response.data.viewprofile);
          // navigate('/admin/homeinspection')
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
    // .catch(function (error) {
    //     console.log('error', error);
    // });
  };

  const thisclick0 = (item) => {
    console.log("clicked", item);
    setActive0(true);
  };
  const thisclick = (item) => {
    // item.preventDefault();
    // console.log("clicked",item)
    //  alert(item)
    // setActive(item);
  };

  return (
    <>
      <div className="sidebar">
        <div className="userimg">
          <img
            className="h-100"
            src="/../adminasset/images/user.jpg"
            alt="img"
          />
        </div>
        <h5>{admindata.name}</h5>
        <p>{admindata.email}</p>

        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <span className="accordion-header" id="headingOne">
              <button
                className={
                  mainheading == "homeinspection"
                    ? "accordion-button"
                    : "accordion-button collapsed"
                }
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded={
                  mainheading == "homeinspection" ? "true" : "false"
                }
                aria-controls="collapseOne"
              >
                Home Inspection
              </button>
            </span>
            <div
              id="collapseOne"
              className={
                mainheading == "homeinspection"
                  ? "accordion-collapse collapse show"
                  : "accordion-collapse collapse"
              }
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <ul>
                <li>
                  <Link
                    onClick={() => {
                      thisclick("hir");
                    }}
                    className={
                      subheading == "homeinspection"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/homeinspection/homeinspection"
                  >
                    Home Inspection Request
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      thisclick("hirc");
                    }}
                    className={
                      subheading == "homeinspectioncompleted"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/homeinspection/homeinspectioncompleted"
                  >
                    Home Inspection Request Completed
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      thisclick("hmpt");
                    }}
                    className={
                      subheading == "homemaintenance"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/homeinspection/homemaintenance"
                  >
                    Home Maintenance Preset Templates
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="accordion-item">
            <span className="accordion-header" id="headingTwo">
              <button
                className={
                  mainheading == "accounting"
                    ? "accordion-button"
                    : "accordion-button collapsed"
                }
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded={mainheading == "accounting" ? "true" : "false"}
                aria-controls="collapseTwo"
              >
                Accounting
              </button>
            </span>
            <div
              id="collapseTwo"
              className={
                mainheading == "accounting"
                  ? "accordion-collapse collapse show"
                  : "accordion-collapse collapse"
              }
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <ul>
                <li>
                  {" "}
                  <Link
                    onClick={() => {
                      thisclick("Users");
                    }}
                    className={
                      subheading == "users"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/accounting/users"
                  >
                    Users
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    onClick={() => {
                      thisclick("Pricing");
                    }}
                    className={
                      subheading == "pricing"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/accounting/pricing"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="accordion-item">
            <span className="accordion-header" id="headingThree">
              <button
                className={
                  mainheading == "superadmin"
                    ? "accordion-button"
                    : "accordion-button collapsed"
                }
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded={mainheading == "superadmin" ? "true" : "false"}
                aria-controls="collapseThree"
              >
                Super Admin
              </button>
            </span>
            <div
              id="collapseThree"
              className={
                mainheading == "superadmin"
                  ? "accordion-collapse collapse show"
                  : "accordion-collapse collapse"
              }
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <ul>
                <li>
                  {" "}
                  <Link
                    className={
                      subheading == "globalpropertyvalues"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/superadmin/globalpropertyvalues"
                  >
                    Global Property Values
                  </Link>
                </li>

                <li>
                  {" "}
                  <Link
                    className={
                      subheading == "globalaprvalues"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/superadmin/globalaprvalues"
                  >
                    Global APR Values
                  </Link>
                </li>

                <li>
                  {" "}
                  <Link
                    className={
                      subheading == "superadmin"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/superadmin/superadmin"
                  >
                    Admin User
                  </Link>
                </li>
                {/*     <li> <Link className="dropdown-item" to="/admin/homemaintenance">Maintainence Template</Link></li>
                        <li><a className="dropdown-item" href="#">Global Property Values</a></li>*/}
              </ul>
            </div>
          </div>

          <div className="accordion-item">
            <span className="accordion-header" id="headingfour">
              <button
                onClick={() => {
                  thisclick("cms");
                }}
                className={
                  mainheading == "cms"
                    ? "accordion-button"
                    : "accordion-button collapsed"
                }
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded={mainheading == "cms" ? "true" : "false"}
                aria-controls="collapseFour"
              >
                CMS
              </button>
            </span>
            <div
              id="collapseFour"
              className={
                mainheading == "cms"
                  ? "accordion-collapse collapse show"
                  : "accordion-collapse collapse"
              }
              aria-labelledby="headingfour"
              data-bs-parent="#accordionExample"
            >
              <ul>
                <li>
                  <Link
                    className={
                      subheading == "topnavbar"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/cms/topnavbar"
                  >
                    Top Nav Bar Button & Pages
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      subheading == "Blogsnpages"
                        ? "dropdown-item dropnav"
                        : "dropdown-item"
                    }
                    to="/admin/cms/Blogsnpages"
                  >
                    Blog and Other Pages
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div id="propertylist" className="accordion-item">
            <Link
              onClick={() => {
                thisclick("property_list");
              }}
              className={
                mainheading == "property_list"
                  ? "nav-link accordion-button"
                  : "nav-link"
              }
              to="/admin/property_list"
            >
              Property List
            </Link>
          </div>
          <div className="accordion-item">
            {/* <a className="nav-link" href="#">Notifications</a> */}
            <Link
              onClick={() => {
                thisclick("notifications");
              }}
              className={
                mainheading == "notifications"
                  ? "nav-link accordion-button"
                  : "nav-link"
              }
              to="/admin/notifications"
            >
              Notifications
            </Link>
          </div>
          <div className="accordion-item">
            <a className="nav-link" href="#">
              Help & Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
