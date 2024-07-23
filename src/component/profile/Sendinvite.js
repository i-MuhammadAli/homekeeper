import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HiHome } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../footer/Footer";
import Header from "../header/Header2";
import InputBox from "../common/InputBox";
import { formatPhoneNumber } from "../../utils/helpers";
import createApi from "../../utils/api";
import { addInvitee } from "../../store";

import "react-toastify/dist/ReactToastify.css";
import HomeButton from "../common/HomeButton";

function Sendinvite() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const navigate = useNavigate();
  const api = createApi();
  const dispatch = useDispatch();

  const profile = useSelector((state) => {
    return state.profile.data;
  });

  const { data } = useSelector((state) => {
    return state.invitees;
  });

  const handleNameChange = (e) => {
    if ("name" in formErrors) {
      delete formErrors.name;
    }
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    if ("phone" in formErrors) {
      delete formErrors.phone;
    }
    const formattedInput = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedInput);
  };

  const handleEmailChange = (e) => {
    if ("email" in formErrors) {
      delete formErrors.email;
    }
    setApiError("");
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setDisableSubmit(true);
      let formdata = new FormData();
      formdata.append("userid", profile.id);
      formdata.append("name", name);
      formdata.append("phone", phoneNumber);
      formdata.append("email", email);
      formdata.append("type", "agent");

      api
        .post("/api/homekeepersendinvites", formdata)
        .then(function (response) {
          console.log("response", response.data);
          if (response.data.status === "success") {
            dispatch(addInvitee(response.data.data));
            setName("");
            setEmail("");
            setPhoneNumber("");
            toast.success("Invite sent!");
          } else {
            setApiError(response.data.message);
            toast.error(response.data.message);
          }
          setDisableSubmit(false);
        })
        .catch(function (error) {
          console.error("API request failed:", error);
          setApiError("Error: API request failed");
        });
    }
  };

  const validate = () => {
    const errors = {};
    if (!name) {
      errors.name = "Required";
    }
    if (!phoneNumber) {
      errors.phone = "Required";
    }
    if (!email) {
      errors.email = "Required";
    }
    // console.log(errors);
    return errors;
  };

  return (
    <>
      <Header />
      <div style={{ background: "#f2f7f9" }} className="pb-10">
        <div className="flex flex-row justify-between sm:mr-20 sm:ml-20 mr-2 ml-2 pt-9 items-center">
          <div className="sm:text-3xl text-lg font-bold">Invite Agents</div>
          <HomeButton />
        </div>
        <div className="mt-2 sm:mr-20 sm:ml-20 mr-2 ml-2">
          <div className="bg-white sm:p-3 rounded border">
            <div className="flex sm:flex-row flex-col justify-center sm:h-16">
              <div className="flex flex-col sm:mr-6 sm:ml-0 mt-2 ml-2 mr-2">
                <InputBox
                  formText
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Full Name"
                />
                {formErrors.name && (
                  <div className="ml-2 mt-1 text-red-500 text-xs italic">
                    {formErrors.name}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:mr-6 sm:ml-0 mt-2 ml-2 mr-2">
                <InputBox
                  formText
                  type="text"
                  name="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Phone Number"
                  maxLength={12}
                />
                {formErrors.phone && (
                  <div className="ml-2 mt-1 text-red-500 text-xs italic">
                    {formErrors.phone}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:mr-6 sm:ml-0 mt-2 ml-2 mr-2">
                <InputBox
                  formText
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                />
                {formErrors.email && (
                  <div className="ml-2 mt-1 text-red-500 text-xs italic">
                    {formErrors.email}
                  </div>
                )}
              </div>

              <div className="mt-2 sm:ml-0 ml-4">
                <button
                  disabled={disableSubmit}
                  className="border text-white px-2.5 py-2.5 text-sm rounded font-semibold button_color"
                  onClick={handleSubmit}
                >
                  Send Invite
                </button>
              </div>
            </div>
            {apiError && (
              <div className="flex flex-row items-center justify-center">
                <div className="flex sm:h-7 h-6 px-3 bg-red-400 rounded items-center">
                  <div className="text-sm font-semibold text-white">
                    Failed to send invite - {apiError}
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-row text-md info_style sm:justify-center mt-3 mx-3">
              Each friend that joins with your link will get here are many
              variations of passages of Lorem Ipsum available.
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between sm:mr-20 sm:ml-20 mr-2 ml-2 pt-9 items-center">
          <div className="sm:text-3xl text-lg font-bold">
            Invitees ({data.length})
          </div>
        </div>

        <div className="mt-2 sm:mr-20 sm:ml-20 mr-2 ml-2">
          <div className="flex flex-col bg-white border rounded">
            <div className="flex flex-col sm:mr-3 sm:ml-3 sm:mt-3 sm:mb-3 mr-1 ml-1 overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-2 sm:text-sm text-xs font-medium text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 sm:text-sm text-xs font-medium text-gray-500"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 sm:text-sm text-xs font-medium text-gray-500"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 sm:text-sm text-xs font-medium text-gray-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 sm:text-sm text-xs font-medium text-gray-500"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => {
                    return (
                      <tr key={item.id} className="sm:text-sm text-xs">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.cellnumber}</td>
                        <td className="px-4 py-2">{item.email}</td>
                        <td className="px-4 py-2">{item.date}</td>
                        <td className="px-4 py-2">{item.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Sendinvite;
