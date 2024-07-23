import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import $ from "jquery";
import Loader from "../common/Loader";
import { removeAuthUser } from "../../store";

function Header2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoading: profileLoading, data: profile } = useSelector((state) => {
    return state.profile;
  });

  const { agent } = useSelector((state) => {
    return state.myProperties;
  });

  useEffect(() => {
    const usertype = localStorage.getItem("token-type");

    checkstateforusernotification(usertype);
    $(".modal-backdrop").removeClass("modal-backdrop fade show");
  }, []);

  const [checkforusernotification, checkstateforusernotification] =
    useState("");

  if (profileLoading) {
    return <Loader />;
  }

  const logout = () => {
    localStorage.removeItem("token-info");
    localStorage.removeItem("token-type");
    localStorage.removeItem("user_name");
    dispatch(removeAuthUser());
    navigate("/login");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const userid = localStorage.getItem("token-info");

  return (
    <>
      <header className="bg-white flex justify-between items-center header-custom sm:pr-12 sm:pl-12 py-2 pr-2 pl-2 max-w-screen-xl mx-auto">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          {profile.type === "agent" ? (
            <img
              src={
                profile.agentlogo
                  ? profile.agentlogo
                  : "/../asset/images/logo.png"
              }
              className={`${
                profile.agentlogo ? "" : "sm:w-56 w-32 sm:h-11 h-7"
              }`}
              alt=""
            />
          ) : (
            <img
              src={
                agent.agentlogo ? agent.agentlogo : "/../asset/images/logo.png"
              }
              className={`${agent.agentlogo ? "" : "sm:w-56 w-32 sm:h-11 h-7"}`}
              alt=""
            />
          )}
        </div>
        <div className="flex items-center">
          <div className="sm:flex hidden mr-2">{profile.name}</div>
          <div className="relative cursor-pointer" onClick={toggleMenu}>
            <img
              src={
                profile.profileimg
                  ? profile.profileimg
                  : "/../asset/images/usr.png"
              }
              alt="User"
              className="sm:w-12 w-8 h-7 sm:h-11 rounded-full border-2 border-white mr-2"
            />
            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 sm:w-48 w-28 bg-white rounded shadow-lg"
                style={{ zIndex: 10 }}
              >
                {profile.type === "agent" && (
                  <div
                    className="block pl-1 sm:pl-4 pr-1 sm:pr-4 py-2 text-xs sm:text-base text-gray-600 hover:bg-gray-200 flex flex-row items-center"
                    onClick={() => navigate("/")}
                  >
                    <img
                      src="/../asset/images/Dashboard.png"
                      alt=""
                      className="w-4 h-4 mr-2"
                    />
                    Dashboard
                  </div>
                )}

                {profile.type === "agent" && (
                  <div
                    className="block pl-1 sm:pl-4 pr-1 sm:pr-4 py-2 text-xs sm:text-base text-gray-600 hover:bg-gray-200 flex flex-row items-center"
                    onClick={() => navigate("/sendinvite")}
                  >
                    <img
                      src="/../asset/images/ac6.png"
                      alt=""
                      className="w-4 h-4 mr-2"
                    />
                    Invited
                  </div>
                )}
                {profile.type === "agent" && (
                  <div
                    className="block pl-1 sm:pl-4 pr-1 sm:pr-4 py-2 text-xs sm:text-base text-gray-600 hover:bg-gray-200 flex flex-row items-center"
                    onClick={() => navigate("/accountsettings")}
                  >
                    <img
                      src="/../asset/images/ac3.png"
                      alt=""
                      className="w-4 h-4 mr-2"
                    />
                    Account
                  </div>
                )}
                <div
                  className="block pl-1 sm:pl-4 pr-1 sm:pr-4 py-2 text-xs sm:text-base text-gray-600 hover:bg-gray-200 flex flex-row items-center"
                  onClick={logout}
                >
                  <img
                    src="/../asset/images/ac8.png"
                    alt=""
                    className="w-4 h-4 mr-2"
                  />
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* <div className="bg-white"> */}
      {/* <header
          className={
            location.pathname === "/"
              ? "main-header main-header2"
              : "main-header main-header2 header2"
          }
        > */}

      {/* <div className="container">
            <div className="row">
              <div className="col-sm-3 col-md-2 logo">
                <Link to="/">
                  <img
                    src={
                      profile.agentlogo
                        ? profile.agentlogo
                        : "/../asset/images/logo.png"
                    }
                    alt=""
                  />
                </Link>
              </div>
              <div className="col-sm-9 col-md-10 head-right">
                <ul className="lginmain my_lginmain">
                  {checkforusernotification === "homeowner" ? (
                    <li className="dropdown">
                      <Link className="btn" to="/homeowner/myproperties">
                        My Properties
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {checkforusernotification === "homeowner" ? (
                    <li className="dropdown">
                      <Link className="btn" to="/freeregistration">
                        Add Property
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  <li className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span>
                        <img
                          src={
                            profile.profileimg
                              ? profile.profileimg
                              : "/../asset/images/usr.png"
                          }
                          align="img"
                          alt="profile_image"
                        />
                      </span>
                      {profile.name}
                    </button>

                    // {checkforusernotification === "agent" ? (
                    //   <ul
                    //     className="dropdown-menu uspro"
                    //     aria-labelledby="dropdownMenuButton1"
                    //   >
                    //     <li>
                    //       {" "}
                    //       <Link to="/" className="dropdown-item">
                    //         <img src="/../asset/images/Dashboard.png" alt="" />{" "}
                    //         Dashboard
                    //       </Link>
                    //     </li>
                    //     <li>
                    //       <Link to="/sendinvite" className="dropdown-item">
                    //         <img src="/../asset/images/ac6.png" alt="" />{" "}
                    //         Invited
                    //       </Link>
                    //     </li>
                    //     <li>
                    //       <Link
                    //         to={"/accountsettings/" + userid + "?accountinfo"}
                    //         className="dropdown-item"
                    //       >
                    //         <img src="/../asset/images/ac3.png" /> My Account
                    //       </Link>
                    //     </li>
                    //     <li>
                    //       <Link
                    //         to="/subscriptionplan"
                    //         className="dropdown-item"
                    //       >
                    //         <img src="/../asset/images/SubscriptionPlans.png" />{" "}
                    //         Subscription Plans
                    //       </Link>
                    //     </li>
                    //     <li>
                    //       {" "}
                    //       <Link
                    //         to={"/accountsettings/changepassword"}
                    //         onClick={functionhit()}
                    //         className="dropdown-item"
                    //       >
                    //         <img src="/../asset/images/ac7.png" /> Change
                    //         Password
                    //       </Link>
                    //     </li>
                    //     <li>
                    //       {" "}
                    //       <Link
                    //         to={"/accountsettings/" + userid + "?accountinfo"}
                    //         onClick={functionhit()}
                    //         className="dropdown-item"
                    //       >
                    //         <img src="/../asset/images/ac1.png" /> Profile
                    //         Settings
                    //       </Link>
                    //     </li>
                    //     <li>
                    //       <Link
                    //         to={"/login"}
                    //         className="dropdown-item logt"
                    //         onClickCapture={logout}
                    //       >
                    //         <img src="/../asset/images/ac8.png" alt="" /> Logout
                    //       </Link>
                    //     </li>
                    //   </ul>
                    // ) : (
                    //   ""
                    // )}

                    {checkforusernotification === "homeowner" ? (
                      <ul
                        className="dropdown-menu uspro"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          {" "}
                          <Link
                            to={"/accountsettings/" + userid}
                            className="dropdown-item"
                          >
                            <img src="/../asset/images/ac1.png" /> Profile
                            Settings
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="#" className="dropdown-item">
                            <img src="/../asset/images/ac2.png" /> My Alerts
                            Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/accountsettings/" + userid}
                            className="dropdown-item"
                          >
                            <img src="/../asset/images/ac3.png" /> My Account
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="/mylender" className="dropdown-item">
                            <img src="/../asset/images/ac4.png" /> My Lenders
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="/myinspector" className="dropdown-item">
                            <img src="/../asset/images/ac5.png" /> My Home
                            Inspectors
                          </Link>
                        </li>
                        <li>
                          <Link to="/sendinvite" className="dropdown-item">
                            <img src="/../asset/images/ac6.png" /> Invite
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link
                            to={"/accountsettings/" + userid}
                            className="dropdown-item"
                          >
                            <img src="/../asset/images/ac7.png" /> Change
                            Password
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/login"}
                            className="dropdown-item logt"
                            onClickCapture={logout}
                          >
                            <img src="/../asset/images/ac8.png" /> Logout
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
      {/* </header> */}
      {/* </div> */}
    </>
  );
}

export default Header2;
