import Footer from "../footer/Footer";
import Header from "../header/Header2";
import ChangePassword from "../profile/Changepassword";
import React, { useEffect, useState } from "react";
import createApi from "../../utils/api";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../store";
import { formatPhoneNumber } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { VscOpenPreview } from "react-icons/vsc";
import Modal from "../common/Modal";
import ModalTitle from "../common/ModalTitle";
// import { FaItalic } from "react-icons/fa";
// import InputBox from "../common/InputBox";
// import { updateNullValues } from "../../utils/helpers";

function Accountsettings() {
  const api = createApi();
  const dispatch = useDispatch();
  const [profileImgFile, setprofileImgFile] = useState();
  const [signatureFile, setSignatureFile] = useState();
  const [logofile, setLogoFile] = useState();
  const [logoImg, setLogoImg] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [errors, setErrors] = useState({});
  const [signatureImg, setSignatureImg] = useState("");
  const [SignatureFileName, setSignatureFileName] = useState("");

  const [getflashmessage, setflashmessage] = useState("");
  const [userdataprofile, setuserdata] = useState({});
  const [publicrurl, setstateforurl] = useState("");

  const [passwordcheck1, setstateforpassowrdcheck] = useState("accountinfo");
  const [usstate, setstatesforusstate] = useState([]);
  const [preview, setPreview] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [officePhone, setOfficePhone] = useState("");

  // const userid = useSelector((state) => {
  //   return state.profile.data.id;
  // });

  const agentName = useSelector((state) => {
    return state.profile.data.name;
  });

  const { isLoading: profileLoading, data: profile } = useSelector((state) => {
    return state.profile;
  });

  const handlePreviewToggle = () => {
    setPreview(!preview);
  };

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setCompanyName(profile.company);
      setPhone(profile.phone);
      setWebsite(profile.website);
      setAddress(profile.address);
      setSuite(profile.suite);
      setCity(profile.city);
      setZip(profile.zip);
      setState(profile.state);
      setOfficePhone(profile.officePhone);
    }
  }, [profile]);

  const myFunction = () => {
    setTimeout(alertFunc, 2000);
  };

  const alertFunc = () => {
    setflashmessage("");
  };

  // const validateEmail = (email) => {
  //   const result =
  //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (!result.test(String(email).toLowerCase())) {
  //     return false;
  //   }
  //   return true;
  // };

  // const validateName = (name, value) => {
  //   if (value) {
  //     console.log(value);
  //     if (value.length < 3) {
  //       setErrors({
  //         ...errors,
  //         [name]: "Name cannot be less than 3 characters",
  //       });
  //       console.log(errors);
  //       return false;
  //     }

  //     var pattern = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
  //     if (!pattern.test(value)) {
  //       setErrors({
  //         ...errors,
  //         [name]: "Invalid name",
  //       });
  //       return false;
  //     }
  //     setErrors({
  //       ...errors,
  //       [name]: "",
  //     });
  //     return true;
  //   }
  //   setErrors({
  //     ...errors,
  //     [name]: "Name cannot be empty",
  //   });
  //   return false;
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendDetailsToServer();
    myFunction();
  };

  const resetLogo = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("userid", profile.id);
    formdata.append("resetLogo", "y");
    api
      .post("/api/homekeeperupdateprofile", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status === "success") {
          setflashmessage("Profile Updated Successfully");
          dispatch(fetchUserProfile());
        } else {
          console.log("under error");
        }
      });
  };

  const sendDetailsToServer = async () => {
    // console.log("onsubmit clicked");
    // const authid = localStorage.getItem("token-info");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    let formdata = new FormData();
    formdata.append("userid", profile.id);
    // formdata.append("companyname", userdataprofile.companyname);
    // formdata.append("email", userdataprofile.email);
    // formdata.append("mobile", userdataprofile.cellnumber);
    // formdata.append("country", userdataprofile.country);
    // formdata.append("state", userdataprofile.state);
    // formdata.append("city", userdataprofile.city);
    // formdata.append("address1", userdataprofile.address1);
    // formdata.append("website", userdataprofile.website);
    // formdata.append("office_phone_no", userdataprofile.office_phone_no);
    // formdata.append("zip", userdataprofile.zip);
    // formdata.append("insertedtime", today);
    // formdata.append("suite", userdataprofile.suite);

    formdata.append("name", name);
    formdata.append("companyname", companyName);
    formdata.append("mobile", phone);
    formdata.append("state", state);
    formdata.append("city", city);
    formdata.append("address1", address);
    formdata.append("website", website);
    formdata.append("office_phone_no", officePhone);
    formdata.append("zip", zip);
    formdata.append("suite", suite);

    formdata.append("insertedtime", today);
    formdata.append("signature", signatureFile);
    formdata.append("agentlogo", logofile);
    formdata.append("profileimage", profileImgFile);

    formdata.forEach((value, key) => {
      console.log(key, value);
    });

    api
      .post("/api/homekeeperupdateprofile", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status === "success") {
          setflashmessage("Profile Updated Successfully");
          dispatch(fetchUserProfile());
        } else {
          console.log("under error");
        }
      });
  };

  // const validatePhoneNumber = (name, value) => {
  //   console.log("validation invoked");
  //   if (name == "cellnumber" && value == "") {
  //     setErrors({ ...errors, [name]: "Invalid Phone number" });
  //     return false;
  //   }
  //   if (
  //     value == "123-456-7890" ||
  //     value == "000-000-0000" ||
  //     value == "111-111-1111" ||
  //     value == "222-222-2222" ||
  //     value == "333-333-3333" ||
  //     value == "444-444-4444" ||
  //     value == "555-555-5555" ||
  //     value == "666-666-6666" ||
  //     value == "777-777-7777" ||
  //     value == "888-888-8888" ||
  //     value == "999-999-9999"
  //   ) {
  //     setErrors({ ...errors, [name]: "Invalid Phone number" });
  //     return false;
  //   }

  //   var pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  //   if (!pattern.test(value)) {
  //     setErrors({ ...errors, [name]: "Invalid Phone number" });
  //     return false;
  //   }
  //   setErrors({ ...errors, [name]: "" });
  //   return true;
  // };

  // const validateWebsite = (website) => {
  //   if (website) {
  //     const websitePattern =
  //       /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
  //     if (!websitePattern.test(website)) {
  //       console.log("Invalid website");
  //       setErrors({ ...errors, ["website"]: "Invalid website" });
  //       return false;
  //     }
  //   }
  //   setErrors({ ...errors, ["website"]: "" });

  //   return true;
  // };

  // const inputsHandler = (e) => {
  //   e.preventDefault();
  //   let { name, value } = e.target;

  //   switch (name) {
  //     case "name":
  //     case "companyname":
  //       validateName(name, value);
  //       break;
  //     case "cellnumber":
  //     case "office_phone_no":
  //       validatePhoneNumber(name, value);
  //       value = formatPhoneNumber(value);
  //       break;

  //     case "email":
  //       validateEmail(value);
  //       break;
  //     case "website":
  //       validateWebsite(value);
  //       break;
  //   }

  //   setuserdata({
  //     ...userdataprofile,
  //     [name]: value,
  //   });

  //   console.log(name, value);
  // };

  const validateImage = (image) => {
    if (image) {
      console.log("validating image");
      if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        return false;
      }
      if (image.size > 5000000) {
        return false;
      }
      return true;
    }
    return false;
  };

  const imageHandler = (e) => {
    const { name } = e.target;
    let value = e.target.files[0];
    var res = validateImage(value);
    // console.log("imageHandler");
    // console.log(res);
    if (!res) {
      setErrors({
        ...errors,
        [name]:
          "Image should be <5MB and accepted formats are jpg|jpeg|png|gif",
      });
    }

    if (name == "signature" && value != "") {
      var test = URL.createObjectURL(value);
      setSignatureImg(test);
      setSignatureFile(value);
      setSignatureFileName(value.name);
      console.log(signatureImg);
    }

    if (name == "profileimage" && value != "") {
      console.log("setting the profile image");
      var test = URL.createObjectURL(value);
      setProfileImg(test);
      setprofileImgFile(value);
      console.log(profileImgFile);
    }

    if (name === "logo" && value !== "") {
      var testlogo = URL.createObjectURL(value);
      setLogoImg(testlogo);
      setLogoFile(value);
    }
  };
  const onNameChange = (event) => {
    if ("name" in errors) {
      delete errors.name;
    }
    setName(event.target.value);
  };

  const onPhoneChange = (event) => {
    if ("phone" in errors) {
      delete errors.phone;
    }
    const formattedInput = formatPhoneNumber(event.target.value);
    setPhone(formattedInput);
  };

  const onCompanyNameChange = (event) => {
    if ("companyName" in errors) {
      delete errors.companyName;
    }
    setCompanyName(event.target.value);
  };

  return (
    <>
      <Header />
      <section className="account_setting">
        <div className="container">
          <h2>Account Settings</h2>
          <div className="setting">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={
                    passwordcheck1 === "accountinfo" ||
                    passwordcheck1 == undefined
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="tab1-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#tab1"
                  type="button"
                  role="tab"
                  aria-controls="tab1"
                  aria-selected="true"
                >
                  Account Information
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={
                    passwordcheck1 === "changepassword"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="tab3-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#tab3"
                  type="button"
                  role="tab"
                  aria-controls="tab3"
                  aria-selected="false"
                >
                  Change Password
                </button>
              </li>
            </ul>
            <br />
            {getflashmessage ? (
              <h4 className="successfullysubmissionforprofilesetting">
                {getflashmessage}
              </h4>
            ) : (
              ""
            )}
            <div className="tab-content" id="myTabContent">
              <div
                className={
                  passwordcheck1 === "accountinfo" ||
                  passwordcheck1 == undefined
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="tab1"
                role="tabpanel"
                aria-labelledby="tab1-tab"
              >
                <form id="agentprofilesetting">
                  <h5 className="text-uppercase">Personal Information</h5>
                  {profile.type === "agent" && (
                    <div className="row mb-2">
                      <div className="col">
                        <div className="user">
                          <div className="mb-2">
                            {logofile ? (
                              <img
                                src={logoImg}
                                // className="sm:w-56 w-32 sm:h-11 h-8"
                                alt="logo"
                              />
                            ) : (
                              <img
                                src={
                                  profile.agentlogo
                                    ? profile.agentlogo
                                    : "/../asset/images/logo.png"
                                }
                                className={`${
                                  profile.agentlogo
                                    ? ""
                                    : "sm:w-56 w-32 sm:h-11 h-8"
                                }`}
                                alt="logo"
                              />
                            )}
                          </div>
                          <span className="btn">
                            <i className="fa-solid fa-image"></i>{" "}
                            <input
                              type="file"
                              name="logo"
                              onChange={imageHandler}
                            />
                            Change Logo
                          </span>
                          <button className="btn ml-2" onClick={resetLogo}>
                            Reset
                          </button>
                        </div>

                        {errors.agentlogo ? (
                          <span className="errormessage formerrorforvalidation">
                            {errors.agentlogo}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="user">
                        <div className="img">
                          {profileImgFile ? (
                            <img className="uploadingimg" src={profileImg} />
                          ) : (
                            ""
                          )}
                          <img
                            id="profimg"
                            src={
                              profile.profileimg
                                ? profile.profileimg
                                : "/../asset/images/usr.png"
                            }
                            align="img"
                            alt="Profile"
                          />
                        </div>
                        <span className="btn">
                          <i className="fa-solid fa-camera"></i>{" "}
                          <input
                            type="file"
                            name="profileimage"
                            onChange={imageHandler}
                          />
                          Change photo
                        </span>
                      </div>

                      {errors.profileimage ? (
                        <span className="errormessage formerrorforvalidation">
                          {errors.profileimage}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-sm-8">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group mt-2">
                            <label>
                              Full name<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Name"
                              name="user-name"
                              value={name}
                              onChange={onNameChange}
                            />
                            {errors.name ? (
                              <span className="errormessage formerrorforvalidation">
                                {errors.name}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {profile.type === "agent" && (
                          <div className="col-sm-6">
                            <div className="form-group mt-2">
                              <label>
                                Company Name<span>*</span>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Company Name"
                                name="companyname"
                                value={companyName}
                                onChange={onCompanyNameChange}
                              />

                              {errors.companyname ? (
                                <span className="errormessage formerrorforvalidation w-100">
                                  {errors.companyname}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        )}

                        <div className="col-sm-6 ">
                          <div className="form-group mt-2">
                            <label>
                              Mobile Number<span>*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={phone}
                              maxLength={12}
                              placeholder="Mobile Number"
                              name="cellnumber"
                              onChange={onPhoneChange}
                            />
                          </div>
                          {errors.phone && (
                            <span className="errormessage formerrorforvalidation w-100">
                              {errors.phone}
                            </span>
                          )}
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group mt-2">
                            <label>
                              Email<span>*</span>
                            </label>
                            <input
                              className="form-control hover:cursor-not-allowed"
                              type="text"
                              placeholder="Email"
                              name="email"
                              value={profile.email}
                              disabled="disabled"
                            />
                          </div>
                        </div>
                        {profile.type === "agent" && (
                          <div className="col-sm-6">
                            <div className="form-group mt-2">
                              <label>Website</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Website"
                                name="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                        {profile.type === "agent" && (
                          <div className="col-sm-5">
                            <div className="form-group mt-2">
                              <label>Signature</label>
                              <div className="input-group custom-file-button">
                                <span
                                  className="input-group-text"
                                  htmlFor="inputGroupFile"
                                >
                                  Choose
                                </span>
                                <input
                                  className="form-control"
                                  type="file"
                                  name="signature"
                                  onChange={imageHandler}
                                  // style={{
                                  //   opacity: 0,
                                  //   position: "absolute",
                                  //   zIndex: -1,
                                  // }}
                                />
                                {/* <label for="file" className="mt-2 pl-3 font-thin">
                                {userdataprofile.signature
                                  ? userdataprofile.signature.split("/").pop()
                                  : ""}
                              </label> */}
                                {/* {signatureFile ? (
                                <img
                                  className="uploadingimg"
                                  src={signatureImg}
                                />
                              ) : (
                                ""
                              )} */}
                                {/* (
                                <img
                                  id="signimg"
                                  src={
                                    userdataprofile.signature
                                      ? publicrurl + userdataprofile.signature
                                      : ""
                                  }
                                  className=" pt-20 w-44 h-40"
                                  align="img"
                                />
                              )} */}
                              </div>
                            </div>

                            {errors.signature ? (
                              <span className="errormessage formerrorforvalidation">
                                {errors.signature}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                        {profile.type === "agent" && (
                          <div className="col-sm-1">
                            <VscOpenPreview
                              className="bg-black text-white w-8 h-8 mt-10 hover:cursor-pointer  border-r-2"
                              data-tooltip-target="tooltip-hover"
                              data-tooltip-trigger="hover"
                              onClick={handlePreviewToggle}
                            />
                            <div
                              id="tooltip-hover"
                              role="tooltip"
                              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                            >
                              Tooltip content
                              <div
                                className="tooltip-arrow"
                                data-popper-arrow
                              ></div>
                            </div>
                          </div>
                        )}
                        {profile.type === "agent" && (
                          <div className="col-sm-126 mt-2">
                            <p className="sublime">
                              Upload photo upto 5MB, this would be considered to
                              be a signature of the user and will be used in all
                              email forwarded by this user
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {profile.type === "agent" && (
                    <>
                      <h5 className="text-uppercase offs5">Office Address</h5>
                      <div className="row office_address">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter your address"
                              name="address1"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Suite</label>
                            <input
                              className="form-control"
                              type="text"
                              value={suite}
                              placeholder="Enter your suite"
                              name="suite"
                              onChange={(e) => setSuite(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>City</label>
                              <input
                                className="form-control"
                                type="text"
                                value={city}
                                placeholder="Enter City"
                                name="city"
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 p-0">
                            <div className="form-group">
                              <label>State</label>
                              <select
                                className="form-control"
                                name="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                              >
                                <option>Select State</option>

                                {usstate?.map((items, i) => {
                                  return <option>{items.name}</option>;
                                })}
                              </select>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group ">
                              <label>Zip</label>
                              <input
                                className="form-control"
                                type="number"
                                value={zip}
                                placeholder="Enter your Zip Code"
                                name="zip"
                                onChange={(e) => setZip(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 p-0">
                            <div className="form-group">
                              <label>Office Phone Number</label>
                              <input
                                className="form-control"
                                type="text"
                                maxLength={12}
                                value={officePhone}
                                placeholder="Enter your office phone number"
                                name="office_phone_no"
                                onChange={(e) => setOfficePhone(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-sm-126">
                    <button className="submit" onClick={handleFormSubmit}>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="tab2"
                role="tabpanel"
                aria-labelledby="tab2-tab"
              >
                <form>
                  <h5>Alert Setting</h5>
                  <div className="row">
                    <div className="col-sm-12">
                      <ul className="alert_setting">
                        <li>
                          Text Message Alert lorem ipsum dolor at reader{" "}
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </li>
                        <li>
                          Email Alert It is a long established fact that a
                          reader will be distracted{" "}
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-12">
                      <button className="Cancel">Cancel</button>
                      <button type="submit" className="submit">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <ChangePassword />
            </div>
          </div>
        </div>
        {preview && (
          <Modal className="inset-y-10 inset-x-80">
            <div className="container mx-auto">
              <ModalTitle
                title="Email Signature Preview"
                cancel
                onCancel={handlePreviewToggle}
              />
              <p>
                <strong>To: homeowner@gmail.com</strong>
              </p>
              <p>
                <strong>Subject:</strong> Sample Email Signature Preview
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex flex-col">
                Thanks & Regards,
                <strong>
                  <i> {agentName}</i>
                </strong>
                <img
                  src={
                    signatureFile
                      ? signatureImg
                      : profile.signature
                      ? profile.signature
                      : "/../asset/images/logo.png"
                  }
                  alt="Signature"
                />
              </div>
            </div>
          </Modal>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Accountsettings;
