import { Navigate, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Registerverify = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    token: "",
    userid: "",
  });

  console.log("+++++++++++++++++++++++++++++++++++++++++");

  const [type, setType] = useState("");
  console.log("hi", type);
  const searchParams = useParams();
  // const urldata=searchParams.get("token")
  const token = searchParams.token;
  console.log("token", token);
  const userid = searchParams.userid;
  console.log("userid", userid);
  // var type="";

  //  const statee = useLocation();
  //  console.log("firstapiresult", statee);

  const sendDetailsToServer = async () => {
    // setError([]);

    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("userid", userid);
    // let params = {
    //     token: token,
    //     userid: userid,
    // }
    // console.log("sher",params)

    // const res = await axios.get('https://httpbin.org/get', { token });

    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeeperregisterverifylink",
        formdata
      )
      .then(function (response) {
        console.log("response", response.data.message);

        const type1 = response.data.message;
        if (response.data.status == "success") {
          if (response.data.usertype == "agent") {
            navigate("/agent/dashboard1");
          } else {
            setType(type1);
          }

          // console.log("Responseget", response.data.data.message);
          // navigate('/Thankyou', { state: response.data.data })
        } else if (response.data.status == "failure") {
          setType(type1);
          console.log("under error");
        }
      });
  };

  useEffect(() => {
    sendDetailsToServer();
  }, []);

  console.log("token", token);
  console.log("token", userid);
  return (
    <h3>
      <span>{type}</span>
    </h3>
  );
};

export default Registerverify;
