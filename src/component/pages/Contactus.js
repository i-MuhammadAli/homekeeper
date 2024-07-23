import Mainfooter from "../footer/Mainfooter";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Headerlogin from "../header/Header2";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Contactus() {
  useEffect(() => {
    sendDetailsToServer();
  }, []);

  const [pagecontent, setpagecontent] = useState("");

  const sendDetailsToServer = async () => {
    let formdata = new FormData();
    formdata.append("pagename", "contactus");
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeeperpagescontent",
        formdata
      )
      .then(function (response) {
        if (response.data.status == "success") {
          setpagecontent(response.data.getpagecontent);
          console.log("responseeee", response.data.getpagecontent);
        } else {
          console.log("under error");
        }
      });
  };

  return (
    <>
      {localStorage.getItem("token-type") &&
      localStorage.getItem("token-info") ? (
        <>
          <Headerlogin />
        </>
      ) : (
        <Header />
      )}

      <h2>{pagecontent.page_title}</h2>

      <p>{pagecontent.page_description}</p>

      {localStorage.getItem("token-type") &&
      localStorage.getItem("token-info") ? (
        <>
          <Mainfooter />
        </>
      ) : (
        <Footer />
      )}
    </>
  );
}

export default Contactus;
