import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import createApi from "../../utils/api";

// Admin

function Header() {
  const navigate = useNavigate();

  const [admindata, setadmindata] = useState("");
  const [personname, setpersonname] = useState("");
  const [usernameid, setusernameid] = useState("");
  const [abovenot, setstateforabovenot] = useState([]);
  const [publicurl, stpublicurl] = useState("");
  const api = createApi();

  useEffect(() => {
    $(".modal-backdrop").removeClass("modal-backdrop fade show");
    checkuserloggedin();
    sendDetailsToServer();
    function1();

    const queryString = window.location.href;
    const myarray = queryString.split("/");
    const breadcrum1 = myarray[5]; //pagename
    if (breadcrum1) {
      setusernameid(breadcrum1);
    }
    // myFunction(breadcrum1);
  }, []);

  const myFunction = (userid) => {
    let formdata = new FormData();
    formdata.append("userid", userid);
    axios
      .post("https://admin.myhomekeeper.co/api/homekeeperDetail", formdata)
      .then((response) => {
        const personss = response.data.getdetails;
        console.log("persondata", personss);
        let data = personss;
        setpersonname(data.name);
      });
  };

  const searchParams = useParams();
  const queryString = window.location.href;
  const myarray = queryString.split("/");

  // console.log("myarrayrr",myarray[5])

  const breadcrum = myarray[4]; //headername
  const breadcrum1 = myarray[5]; //pagename

  let breadcrumb = "";
  let breadcrumb1 = "";

  if (breadcrum1 != "" && breadcrum1 != undefined) {
    breadcrumb = breadcrum1.charAt(0).toUpperCase() + breadcrum1.slice(1);
  }

  if (breadcrum != "" && breadcrum != undefined) {
    breadcrumb1 = breadcrum.charAt(0).toUpperCase() + breadcrum.slice(1);
  }

  if (breadcrum1 == "globalpropertyvalues") {
    breadcrumb = "Global Property Values";
  }
  if (breadcrum1 == "homeinspection") {
    breadcrumb = "Home Inspection Request";
  }
  if (breadcrum1 == "homeinspectioncompleted") {
    breadcrumb = "Home Inspection Request Completed";
  }
  if (breadcrum1 == "homemaintenance") {
    breadcrumb = "Home Maintenance Preset Templates";
  }
  if (breadcrum1 == "property_list") {
    breadcrumb = "Property List";
  }

  if (breadcrum == "property_list") {
    breadcrumb1 = "Property List";
  }
  if (breadcrum == "usersingle") {
    breadcrumb = "Users";
    breadcrumb1 = "Accounting";
    // breadcrum='Accounting';
  }

  // const urlParams = new URLSearchParams(queryString);
  console.log("searchparams", queryString);
  // const token = searchParams.globalpropertyvalues;
  // console.log("token",token)

  const checkuserloggedin = () => {
    // localStorage.setToken('token-type', admin);
    if (
      localStorage.getItem("token-info") &&
      localStorage.getItem("token-type")
    ) {
      console.log("session set");
    } else {
      navigate("/adminlogin");
    }
  };

  const function1 = async () => {
    // alert("fun1")
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeepernotificationsforproperty"
      )
      .then(function (response) {
        if (response.data.status == "success") {
          const notificationlist = response.data.notificationlist;
          setstateforabovenot(notificationlist);
          stpublicurl(response.data.publicurl);
        } else {
          console.log("under error");
        }
      });
  };
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

  const loginstartheader = (e) => {
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

  console.log("getbysession", localStorage.getItem("token-info"));
  const logout = () => {
    localStorage.removeItem("token-info");
    navigate("/adminlogin");
  };

  return (
    <>
      <link rel="stylesheet" href="/../adminasset/css/style.css" />
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 col-md-12 col-lg-4">
              {breadcrum == "usersingle" ? (
                <h6 className="mb-0">
                  <b>
                    {breadcrumb ? breadcrumb1 + " > " : breadcrumb1} {}
                  </b>{" "}
                  {breadcrumb == "globalpropertyvalues"
                    ? "Global Property Values"
                    : breadcrumb + " > " + personname}
                </h6>
              ) : (
                <h6 className="mb-0">
                  <b>
                    {breadcrumb ? breadcrumb1 + " > " : breadcrumb1} {}
                  </b>{" "}
                  {breadcrumb == "globalpropertyvalues"
                    ? "Global Property Values"
                    : breadcrumb}
                </h6>
              )}
            </div>
            <div className="col-sm-8 col-md-12 col-lg-8">
              <ul>
                <li>
                  <form>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search a Keyword"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </form>
                </li>
                {/* <li><a href="#"><i className="fa-regular fa-bell"></i></a></li> */}

                <li className="dropdown notif">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img className="noti" src="/../asset/images/noti.png" />
                  </button>
                  <div
                    className="dropdown-menu notificationbell"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <h6>Notification</h6>

                    <ul>
                      {abovenot.map((items, i) => {
                        return (
                          <li>
                            <Link
                              to={"/admin/notifications"}
                              className="dropdown-item"
                            >
                              <img
                                src={
                                  items.ownerprofileimg
                                    ? publicurl + items.ownerprofileimg
                                    : "/../adminasset/images/usr.png"
                                }
                              />{" "}
                              Home owner {items.ownername} requested to agent{" "}
                              {items.agentname} to add property{" "}
                              <span>{items.created_at}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    <Link to={"/admin/notifications"} className="viewall">
                      View All
                    </Link>
                  </div>
                </li>

                <li>
                  <a href="javascript:void(0)" onClickCapture={logout}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
