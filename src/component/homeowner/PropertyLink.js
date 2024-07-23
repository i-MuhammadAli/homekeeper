import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../loader_folder/Loader";
import createApi from "../../utils/api";
import { setHomeOwnerUser, setProfileUserName } from "../../store";
import Header from "../header/Header";
import HomeOwnerDashboard from "./Dashboard";

function PropertyLink() {
  const navigate = useNavigate();
  const api = createApi();
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (code) {
      api
        .get(`/api/invitee_registration?code=${code}`)
        .then(function (response) {
          //   console.log("response", response.data);
          setLoading(false);
          if (response.data.status === "success") {
            localStorage.setItem("token-info", response.data.data.id);
            localStorage.setItem("token-type", "homeowner");
            localStorage.setItem(
              "user_name",
              response.data.data.fname + " " + response.data.data.lname
            );
            dispatch(setHomeOwnerUser(response.data.data));
            dispatch(
              setProfileUserName(
                response.data.data.fname + " " + response.data.data.lname
              )
            );
            // setEmail(response.data.data.email);
            // setName(response.data.data.fname + " " + response.data.data.lname);
            // setPhone(response.data.data.cellphone);
            // setAgentId(response.data.data.createdby_client_id);
            // setLogo(response.data.logo);
            navigate("/dashboard");
          } else {
            setError("Property Not Found!");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setError(
        "Please enter the unique property id in the URL to access your property"
      );
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header logo={logo} />
      {error && <div className="mt-10 mx-6 info_style"> {error}</div>}
    </>
  );
}

export default PropertyLink;
