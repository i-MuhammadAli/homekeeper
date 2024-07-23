import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import md5 from "md5";
import { ifStrongPassword } from "../../utils/helpers";
import createApi from "../../utils/api";

function ChangePassword() {
  const api = createApi();
  const [Errorforpassword, setpassworderror] = useState("");
  const [SuccessPassword, setSuccessPassword] = useState("");
  const [FailurePassword, setFailurePassword] = useState("");
  const [getuserid, setstateuserid] = useState("");
  const [viewpassword, setviewpassword] = useState(false);
  const [viewpassword1, setviewpassword1] = useState(false);
  const [viewpassword2, setviewpassword2] = useState(false);
  const [changePassword, setChangePassword] = useState({
    userid: "",
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const [passwordcheck1, setstateforpassowrdcheck] = useState("");

  const agentId = useSelector((state) => {
    return state.profile.data.id;
  });

  const togglePassword = () => {
    setviewpassword(!viewpassword);
  };
  const togglePassword1 = () => {
    setviewpassword1(!viewpassword1);
  };
  const togglePassword2 = () => {
    setviewpassword2(!viewpassword2);
  };

  const sendDetailsToServer = async () => {
    let formdata = new FormData();
    formdata.append("userid", agentId);
    formdata.append("oldpassword", md5(changePassword.oldpassword));
    formdata.append("newpassword", md5(changePassword.newpassword));

    api
      .post("/api/homekeeperchangepassword", formdata)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          setSuccessPassword(response.data.message);
          setFailurePassword("");
        } else {
          // setError(response.data.errors);
          console.log("under error");
          setFailurePassword(response.data.message);
          setSuccessPassword("");
        }
      });
  };

  const inputsHandler = (e) => {
    const { name, value } = e.target;

    setChangePassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log("handleCancel clicked");
    setChangePassword({
      userid: "",
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    });
  };

  const handleChangePasswordSubmit = () => {
    if (changePassword.newpassword === changePassword.confirmpassword) {
      sendDetailsToServer();
      myFunction();
      setChangePassword({
        userid: "",
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
      });
    }
  };

  const myFunction = () => {
    setTimeout(alertFunc, 2000);
  };
  const alertFunc = () => {
    setSuccessPassword("");
    setFailurePassword("");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
      {SuccessPassword ? (
        <h4 className="successfullysubmissionforprofilesetting">
          {SuccessPassword}
        </h4>
      ) : (
        ""
      )}
      {FailurePassword ? (
        <h4 id="faillurepassword" className="errormessageforlogin">
          {FailurePassword}
        </h4>
      ) : (
        ""
      )}
      <div
        className={
          passwordcheck1 == "changepassword"
            ? " tab-pane fade show active"
            : "tab-pane fade"
        }
        id="tab3"
        role="tabpanel"
        aria-labelledby="tab3-tab"
      >
        <form id="profilesetting" className="forgetpass pt-3">
          <input type="hidden" name="userid" value={getuserid}></input>
          <div className="row  changepass ">
            <div className="col-sm-6 justify-center">
              <h5 className="mb-0">CHANGE PROFILE PASSWORD</h5>
              <div class="items-center ">
                <div className="col-sm-10 mt-3">
                  <div className="form-group">
                    <label>Current Password</label>
                    <div className="st">
                      <i
                        className={
                          viewpassword ? "far fa-eye" : "fa fa-eye-slash"
                        }
                        aria-hidden="true"
                        onClick={togglePassword}
                      ></i>

                      <input
                        className="form-control"
                        value={changePassword.oldpassword}
                        {...register("oldpassword", {
                          required: "Old Password Field is Required",
                          validate: (value) =>
                            ifStrongPassword(value) || "Password is weak",
                        })}
                        type={viewpassword ? "text" : "password"}
                        placeholder="Current Password"
                        name="oldpassword"
                        onChange={inputsHandler}
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name="oldpassword"
                      render={({ message }) => (
                        <span className="errormessageforlogin">{message}</span>
                      )}
                    />
                  </div>
                </div>
                <div className="col-sm-10 mt-3">
                  <div className="form-group">
                    <label>New Password</label>
                    <div className="st">
                      <i
                        className={
                          viewpassword1 ? "far fa-eye" : "fa fa-eye-slash"
                        }
                        aria-hidden="true"
                        onClick={togglePassword1}
                      ></i>
                      <input
                        className="form-control"
                        value={changePassword.newpassword}
                        {...register("newpassword", {
                          required: "New Password Field is Required",
                          validate: (value) =>
                            ifStrongPassword(value) || "Password is weak",
                        })}
                        name="newpassword"
                        onChange={inputsHandler}
                        type={viewpassword1 ? "text" : "password"}
                        placeholder="New Password"
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name="newpassword"
                      render={({ message }) => (
                        <span className="errormessageforlogin">{message}</span>
                      )}
                    />
                    {/* <span className='errormessageforlogin'>{Errorforpassword}</span> */}
                  </div>
                </div>
                <div className="col-sm-10 mt-3">
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <div className="st">
                      <i
                        className={
                          viewpassword2 ? "far fa-eye" : "fa fa-eye-slash"
                        }
                        aria-hidden="true"
                        onClick={togglePassword2}
                      ></i>
                      <input
                        className="form-control"
                        value={changePassword.confirmpassword}
                        {...register("confirmpassword", {
                          required: "Confirm Password Field is Required",
                          validate: (value) =>
                            value === changePassword.newpassword ||
                            "Passwords do not match",
                        })}
                        type={viewpassword2 ? "text" : "password"}
                        placeholder="Confirm New Password"
                        name="confirmpassword"
                        onChange={inputsHandler}
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name="confirmpassword"
                      render={({ message }) => (
                        <span className="errormessageforlogin">{message}</span>
                      )}
                    />
                    <span className="errormessageforlogin">
                      {Errorforpassword}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 ">
              <img src="../asset/images/change_pass.png" />
            </div>
            <div className="col-sm-8">
              <button className="Cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button
                type="submit"
                className="submit"
                onClick={handleSubmit(handleChangePasswordSubmit)}
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
