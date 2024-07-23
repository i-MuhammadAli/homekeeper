import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useParams } from "react-router-dom";
import Switch from "react-switch";
import { HmacSHA256 } from "crypto-js";

function AdminReviewclient() {
  const searchParams = useParams();
  const [lastinsertedid, setlastinsertedid] = useState("");
  const clientid = searchParams.clientid;
  const [agentrecord, setagentrecord] = useState("");
  const [lenderrecord, setstateforlenderrecord] = useState("");
  const [inspectorrecord, setstateforinspectorrecord] = useState("");
  const [dataforuploaddata, setdataforuploaddata] = useState("");
  const [successmessage, setsuccessmessage] = useState("");
  const [successmessage1, setsuccessmessage1] = useState("");
  const [successmessage2, setsuccessmessage2] = useState("");
  const [successmessage3, setsuccessmessage3] = useState("");
  const [successmessage4, setsuccessmessage4] = useState("");
  const [successmessage5, setsuccessmessage5] = useState("");
  const [successmessage6, setsuccessmessage6] = useState("");
  const [successmessage7, setsuccessmessage7] = useState("");
  const [successmessage8, setsuccessmessage8] = useState("");
  const [successmessage9, setsuccessmessage9] = useState("");
  const [successmessage10, setsuccessmessage10] = useState("");

  const [lenderdata, lenderstate] = useState({
    lendername: "",
    lenderemail: "",
  });
  const [inspectordata, inspectorstate] = useState({
    name: "",
    email: "",
    cellnumber: "",
    companyname: "",
  });
  const [titlecompanydata, titlecompanystate] = useState({
    titlename: "",
    titleemail: "",
    titlephone: "",
    titlecompany: "",
  });

  const [checkedpartner, setCheckedpartner] = useState(false);
  const [checkedlender, setCheckedlender] = useState(true);
  const [checkedinspector, setCheckedinspector] = useState(true);
  const [checkedcompany, setCheckedtitlecompany] = useState(true);
  useEffect(() => {
    // myFunction();
    getdetailsfromserver();
  }, []);

  const updatestatusapi = async (type, status) => {
    console.log("thistype", type);
    console.log("thistype1", status);
    let formdata = new FormData();
    formdata.append("clientid", clientid);
    if (type == "partner") {
      formdata.append("checkedpartner", status);
    }
    if (type == "lender") {
      formdata.append("checkedlender", status);
    }
    if (type == "inspector") {
      formdata.append("checkedinspector", status);
    }
    if (type == "titlecompany") {
      formdata.append("checkedcompany", status);
    }
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeeperupdatestatus",
        formdata
      )
      .then(function (response) {
        console.log("response", response.data);
      });

    // let formdata = new FormData();
    // formdata.append('clientid', clientid);
    // formdata.append('checkedpartner', checkedpartner);
    // formdata.append('checkedinspector', checkedinspector);
    // formdata.append('checkedcompany', checkedcompany);
    // formdata.append('checkedlender', checkedlender);
    // axios.post("https://admin.myhomekeeper.co/api/homekeeperupdatestatus", formdata)
    //     .then(function (response) {
    //         console.log('response', response.data);
    //     })
  };

  const getdetailsfromserver = async () => {
    // alert('hiii');
    //setError([]);
    let formdata = new FormData();
    formdata.append("clientid", clientid);
    // alert(clientid)
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeepergetclientreview",
        formdata
      )
      .then(function (response) {
        console.log(
          "responseallpartner",
          response.data.clientdata.partnerfname
        );
        if (response.data.status == "success") {
          // alert("success")
          var agentrecord = response.data.clientdata;
          var lenderrecorddata = response.data.lenderdetails;
          var inspectorrecorddata = response.data.inspectordetails;
          console.log("hiiiiiiiii", response.data.clientdata.uploaddocument);
          // const myuploaddata='';
          if (response.data.clientdata.uploaddocument) {
            const myuploaddata =
              response.data.clientdata.uploaddocument.split("|");
            setdataforuploaddata(myuploaddata);
          }

          // console.log("myuploaddata",myuploaddata)
          if (lenderrecorddata) {
            setstateforlenderrecord(lenderrecorddata);
          }

          console.log("pariiii", inspectorrecorddata);
          if (inspectorrecorddata) {
            setstateforinspectorrecord(inspectorrecorddata);
          }

          // var partnerrecord=response.data.partnerdata;
          var partnerrecord = {
            partnerfname: response.data.clientdata.partnerfname,
            partnerlname: response.data.clientdata.partnerlname,
            partneremail: response.data.clientdata.partneremail,
            partnercellphone: response.data.clientdata.partnercellphone,
            partnerdob: response.data.clientdata.partnerdob,
          };
          setagentrecord(agentrecord);

          if (
            agentrecord.partnerstatus &&
            agentrecord.partnerstatus == "true"
          ) {
            setCheckedpartner(true);
          }
          if (
            agentrecord.lender_status &&
            agentrecord.lender_status == "true"
          ) {
            setCheckedlender(true);
          }
          if (
            agentrecord.inspector_status &&
            agentrecord.inspector_status == "true"
          ) {
            setCheckedinspector(true);
          }
          if (agentrecord.lender_status) setState1(agentrecord.address);
          SetDummystate(agentrecord);
          SetDummystate1(partnerrecord);
          // alert(response.data.message);
          // alert("success")
          // alert(response.data.lastinsertedid)
          // var lastinsertedid = response.data.lastinsertedid;
          // alert(lastinsertedid)
          // navigate('/agent/addclient2/' + lastinsertedid);
          // navigate('/Thankyouvalidate')
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };
  const [setvalue, Setstatevalue] = useState("");
  function greetUser() {
    //    alert("this")
    if (setvalue == "" || setvalue == 0) {
      Setstatevalue(1);
    } else {
      Setstatevalue(0);
    }
  }

  const [setvalue1, Setstatevalue1] = useState("");
  function greetUser1() {
    // console.log("Hi there, user!");
    if (setvalue1 == "" || setvalue1 == 0) {
      Setstatevalue1(1);
    } else {
      Setstatevalue1(0);
    }
  }
  const [setvalue2, Setstatevalue2] = useState("");
  function greetUser2() {
    // console.log("Hi there, user!");
    if (setvalue2 == "" || setvalue2 == 0) {
      Setstatevalue2(1);
    } else {
      Setstatevalue2(0);
    }
  }
  const [setvalue3, Setstatevalue3] = useState("");
  function greetUser3() {
    // console.log("Hi there, user!");
    if (setvalue3 == "" || setvalue3 == 0) {
      Setstatevalue3(1);
    } else {
      Setstatevalue3(0);
    }
  }

  const [setvalue4, Setstatevalue4] = useState("");
  function greetUser4() {
    // console.log("Hi there, user!");
    if (setvalue4 == "" || setvalue4 == 0) {
      Setstatevalue4(1);
    } else {
      Setstatevalue4(0);
    }
  }

  const [setvalue5, Setstatevalue5] = useState("");
  function greetUser5() {
    // console.log("Hi there, user!");
    if (setvalue5 == "" || setvalue5 == 0) {
      Setstatevalue5(1);
    } else {
      Setstatevalue5(0);
    }
  }

  const [setvalue6, Setstatevalue6] = useState("");
  function greetUser6() {
    // console.log("Hi there, user!");
    if (setvalue6 == "" || setvalue6 == 0) {
      Setstatevalue6(1);
    } else {
      Setstatevalue6(0);
    }
  }

  const [setvalue7, Setstatevalue7] = useState("");
  function greetUser7() {
    // console.log("Hi there, user!");
    if (setvalue7 == "" || setvalue7 == 0) {
      Setstatevalue7(1);
    } else {
      Setstatevalue7(0);
    }
  }
  const handleChangepartner = (nextChecked) => {
    setCheckedpartner(nextChecked);
    updatestatusapi("partner", nextChecked);
  };

  const handleChangelender = (nextChecked) => {
    setCheckedlender(nextChecked);
    updatestatusapi("lender", nextChecked);
  };
  const handleChangeinspector = (nextChecked) => {
    setCheckedinspector(nextChecked);
    updatestatusapi("inspector", nextChecked);
  };
  const handleChangetitlecompany = (nextChecked) => {
    setCheckedtitlecompany(nextChecked);
    updatestatusapi("titlecompany", nextChecked);
  };

  const [setvalue8, Setstatevalue8] = useState("");
  function greetUser8() {
    // console.log("Hi there, user!");
    if (setvalue8 == "" || setvalue8 == 0) {
      Setstatevalue8(1);
    } else {
      Setstatevalue8(0);
    }
  }
  const [setvalue9, Setstatevalue9] = useState("");
  function greetUser9() {
    // console.log("Hi there, user!");
    if (setvalue9 == "" || setvalue9 == 0) {
      Setstatevalue9(1);
    } else {
      Setstatevalue9(0);
    }
  }
  const [setvalue10, Setstatevalue10] = useState("");
  function greetUser10() {
    // console.log("Hi there, user!");
    if (setvalue10 == "" || setvalue10 == 0) {
      Setstatevalue10(1);
    } else {
      Setstatevalue10(0);
    }
  }
  const [setvalue11, Setstatevalue11] = useState("");
  function greetUser11() {
    // console.log("Hi there, user!");
    if (setvalue11 == "" || setvalue11 == 0) {
      Setstatevalue11(1);
    } else {
      Setstatevalue11(0);
    }
  }

  const [state1, setState1] = useState();
  const [dummystate, SetDummystate] = useState({
    fname: "",
    lname: "",
    dob: "",
    email: "",
    cellphone: "",
    address: "",
    purchased: "",
    saleprice: "",
    homevalue: "",
    rentalvalue: "",
    Airbnb: "",
    loanamount: "",
  });
  const [dummystate1, SetDummystate1] = useState({
    partnerfname: "",
    partnerlname: "",
    partnerdob: "",
    partneremail: "",
    partnercellphone: "",
  });
  // console.log("dummystate", dummystate);

  const handleClick = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    // SetDummystate(value);
    SetDummystate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const lenderclick = (e) => {
    const { name, value } = e.target;

    lenderstate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const inspectorclick = (e) => {
    const { name, value } = e.target;

    inspectorstate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const titlecompanyclick = (e) => {
    const { name, value } = e.target;

    titlecompanystate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick1 = (e) => {
    const { name, value } = e.target;

    SetDummystate1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [AccountInformation, SetOwnerInformation] = useState({
    fname: "",
  });

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    SetOwnerInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const form1 = (e) => {
    // e.preventDefault();
    //  alert("hi");
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage("Updated Successfully");
    senddetailstoform1();
  };
  const Removeclassfunction = () => {
    setsuccessmessage("");
    setsuccessmessage1("");
    setsuccessmessage2("");
    setsuccessmessage3("");
    setsuccessmessage4("");
    setsuccessmessage5("");
    setsuccessmessage6("");
    setsuccessmessage7("");
    setsuccessmessage8("");
  };

  const form2 = (e) => {
    e.preventDefault();
    // setsuccessmessage('Updated Successfully')
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage1("Updated Successfully");
    senddetailstoform1();
  };
  const form3 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage2("Updated Successfully");
    senddetailstoform1();
  };
  const form4 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage3("Updated Successfully");
    senddetailstoform1();
  };
  const form5 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage4("Updated Successfully");
    // senddetailstoform1();
  };
  const form6 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage5("Updated Successfully");
    // senddetailstoform1();
  };
  const form7 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage6("Updated Successfully");
    // senddetailstoform1();
  };
  const form8 = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage7("Updated Successfully");
    // senddetailstoform1();
  };

  const lenderdetails = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage8("Updated Successfully");
    senddetailstoform2();
  };

  const homeinspectordetails = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage9("Updated Successfully");
    senddetailstoform3();
  };
  const titlecompany = (e) => {
    e.preventDefault();
    setTimeout(Removeclassfunction, 3000);
    setsuccessmessage10("Updated Successfully");
    senddetailstoform4();
  };
  const uploaddocument = (e) => {
    e.preventDefault();
    senddetailstoform5();
  };

  const senddetailstoform5 = async () => {
    // alert("reach upload document")
    let formdata = new FormData();
    formdata.append("clientid", clientid);
  };
  const senddetailstoform4 = async () => {
    // alert("reach titlecompany point")
    let formdata = new FormData();
    formdata.append("clientid", clientid);
  };

  const senddetailstoform3 = async () => {
    // alert("reach inspector point")
    let formdata = new FormData();
    formdata.append("clientid", clientid);
  };
  const senddetailstoform2 = async () => {
    // alert("reach lender point")
    let formdata = new FormData();
    formdata.append("clientid", clientid);
  };

  const senddetailstoform1 = async () => {
    // setError([]);
    let formdata = new FormData();
    formdata.append("clientid", clientid);
    formdata.append("fname", dummystate.fname);
    formdata.append("lname", dummystate.lname);
    formdata.append("email", dummystate.email);
    formdata.append("cellphone", dummystate.cellphone);
    formdata.append("dob", dummystate.dob);
    formdata.append("partnerfname", dummystate1.partnerfname);
    formdata.append("partnerlname", dummystate1.partnerlname);
    formdata.append("partneremail", dummystate1.partneremail);
    formdata.append("partnercellphone", dummystate1.partnercellphone);
    formdata.append("partnerdob", dummystate1.partnerdob);
    formdata.append("partnerfname", dummystate1.partnerfname);
    formdata.append("partnerlname", dummystate1.partnerlname);
    formdata.append("partneremail", dummystate1.partneremail);
    formdata.append("partnercellphone", dummystate1.partnercellphone);
    formdata.append("partnerdob", dummystate1.partnerdob);
    formdata.append("address", dummystate.address);
    formdata.append("whenbuy", dummystate.whenbuy);
    formdata.append("saleprice", dummystate.saleprice);
    formdata.append("homevalue", dummystate.homevalue);
    formdata.append("Airbnb", dummystate.Airbnb);

    formdata.append("lendername", lenderstate.name);
    formdata.append("lenderemail", lenderstate.email);

    formdata.append("inspectorname", inspectorstate.name);
    formdata.append("inspectoremail", inspectorstate.email);
    formdata.append("inspectorphone", inspectorstate.phone);
    formdata.append("inspectorcompany", inspectorstate.company);

    formdata.append("titlecompanyname", titlecompanystate.name);
    formdata.append("titlecompanyemail", titlecompanystate.email);
    formdata.append("titlecompanyphone", titlecompanystate.phone);
    formdata.append("titlecompanycompany", titlecompanystate.company);

    // formdata.append("rentalvalue", dummystate.homevalue);

    //not come below
    // formdata.append("saleprice", dummystate1.saleprice);
    // formdata.append("whenbuy", dummystate1.whenbuy);
    // formdata.append("homevalue", dummystate1.homevalue);
    // formdata.append("loanamount", dummystate1.loanamount);
    // formdata.append("getmaintainid", dummystate1.getmaintainid);
    // formdata.append("lender_selected_id", dummystate1.lender_selected_id);
    // formdata.append("Airbnb", dummystate1.Airbnb);
    // formdata.append("apr_rate", dummystate1.apr_rate);
    // formdata.append("pmi", dummystate1.pmi);
    // formdata.append("homeinspectionreport", dummystate1.homeinspectionreport);

    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeeperupdatepropertylistreviewclient1",
        formdata
      )
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          console.log("success");
          // var agentrecord = response.data.clientdata;
          // setagentrecord(agentrecord);
          // setState1(agentrecord.address);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };

  function updateaddress(type, name) {
    // alert(`${type}`);
    // alert(`${name}`);
    // console.log(f)
    console.log("test", type);
    console.log("name", name);
    //  const { name, value } = e.target
    // // console.log("name is",name)
    // console.log("value is", e.currentTarget.value)
    // console.log("value is ttt", e.target.value)
    // setState1(value);
  }

  function updateaddressforlender() {
    // alert("test")
  }

  return (
    <>
      <Header />
      {/* <div>
            <p>Click this text to see the event bubbling</p>
            <button value="test" onClick={greetUser}>Click me</button>
        </div> */}
      <section className="review_client">
        <div className="container">
          <h3>Review Client Detail & Proceed</h3>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h6 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <b>Property : </b> {agentrecord.address}{" "}
                  <img src="/../asset/images/aro_a.png" alt="icon" />
                </button>
              </h6>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="strow">
                    <div className="row">
                      <div className="col-sm-8">
                        <div className="stdiv">
                          <form onSubmit={handleSubmit(form1)}>
                            <div className="row reviewclientform">
                              <div className="col-sm-6">
                                <h5>OWNER Information</h5>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {agentrecord.fname} {agentrecord.lname}
                                </p>
                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="fname"
                                    value={dummystate.fname}
                                    onChange={handleClick}
                                  ></input>
                                </div>
                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="lname"
                                    value={dummystate.lname}
                                    onChange={handleClick}
                                  ></input>
                                </div>

                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="dob"
                                    value={dummystate.dob}
                                    onChange={handleClick}
                                  ></input>
                                </div>
                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="email"
                                    value={dummystate.email}
                                    onChange={handleClick}
                                  ></input>
                                </div>
                                <div className="form-group">
                                  <input
                                    className={
                                      "setvaluee" +
                                      (setvalue == 0 ? "hidden" : "show")
                                    }
                                    type="text"
                                    name="cellphone"
                                    value={dummystate.cellphone}
                                    onChange={handleClick}
                                  ></input>
                                </div>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {agentrecord.dob}
                                </p>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {agentrecord.email}
                                </p>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {agentrecord.cellphone}
                                </p>
                              </div>
                              <div className="col-sm-6">
                                <h5>
                                  Partner Information
                                  <a href="#">
                                    <i
                                      onClick={greetUser}
                                      className="fa-solid fa-pen"
                                    ></i>
                                  </a>
                                  <div className="form-check form-switch me-2">
                                    {/* <Switch onColor="#3d9ddd"
                                                                        onHandleColor="#fff" height={20}
                                                                        width={48} onChange={handleChangepartner} className="react-switch" checked={checkedpartner} /> */}
                                    {/* <Switch onChange={handleChangepartner} className="react-switch" checked={agentrecord.partnerstatus == 'true' ? "checked" : checkedpartner} /> */}
                                  </div>
                                </h5>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {dummystate1.partnerfname}{" "}
                                  {dummystate1.partnerlname}
                                </p>
                                <div className="form-group">
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partnerfname"
                                      value={dummystate1.partnerfname}
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partnerlname"
                                      value={dummystate1.partnerlname}
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partnerdob"
                                      value={dummystate1.partnerdob}
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partneremail"
                                      value={dummystate1.partneremail}
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      className={
                                        "setvaluee" +
                                        (setvalue == 0 ? "hidden" : "show")
                                      }
                                      type="text"
                                      name="partnercellphone"
                                      value={dummystate1.partnercellphone}
                                      onChange={handleClick1}
                                    ></input>
                                  </div>
                                </div>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {dummystate1.partnerdob}
                                </p>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {dummystate1.partneremail}
                                </p>
                                <p
                                  className={
                                    "setvaluee" +
                                    (setvalue == 1 ? "hidden" : "show")
                                  }
                                >
                                  {dummystate1.partnercellphone}
                                </p>
                              </div>
                            </div>

                            {successmessage ? (
                              <h6 className="profilesettingreview ps-3">
                                {successmessage}
                              </h6>
                            ) : (
                              ""
                            )}
                            <button
                              className={
                                "btn setvaluee" +
                                (setvalue == 0 ? "hidden" : "show")
                              }
                            >
                              Submit
                            </button>
                          </form>
                          <ul className="ads">
                            <li>
                              <b>Address : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue1 == 1 ? "hidden" : "show")
                                }
                              >
                                {dummystate.address}
                              </span>{" "}
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue1 == 0 ? "hidden" : "show")
                                }
                              >
                                {/* input section start for address */}
                                <form onSubmit={form2}>
                                  <input
                                    type="text"
                                    placeholder="Enter Address"
                                    name="address"
                                    onChange={(e) => handleClick(e)}
                                    value={dummystate.address}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "address",
                                        dummystate.address
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>
                              {successmessage1 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage1}
                                </span>
                              ) : (
                                ""
                              )}
                              <a href="#">
                                <img
                                  onClick={greetUser1}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                            </li>

                            {/* <input className="form-control" type="text" placeholder="full name" name="name" value={userdataprofile.name} onChange={inputsHandler} */}

                            <li>
                              <b>Purchased : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue2 == 1 ? "hidden" : "show")
                                }
                              >
                                {dummystate.whenbuy}{" "}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue2 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form3}>
                                  <input
                                    type="text"
                                    value={dummystate.whenbuy}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "whenbuy",
                                        dummystate.whenbuy
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>
                              {successmessage2 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage2}
                                </span>
                              ) : (
                                ""
                              )}
                              <a href="#">
                                <img
                                  onClick={greetUser2}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                            </li>

                            <li>
                              <b>Sale Price : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue3 == 1 ? "hidden" : "show")
                                }
                              >
                                {dummystate.saleprice}{" "}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue3 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form4}>
                                  <input
                                    type="text"
                                    value={dummystate.saleprice}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "saleprice",
                                        dummystate.saleprice
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>

                              {successmessage3 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage3}
                                </span>
                              ) : (
                                ""
                              )}
                              <a href="#">
                                <img
                                  onClick={greetUser3}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                            </li>
                          </ul>
                          <div className="adsvalue">
                            <h5>Home Value</h5>
                            <ul>
                              <li>
                                <span
                                  className={
                                    "setvaluee" +
                                    (setvalue7 == 1 ? "hidden" : "show")
                                  }
                                >
                                  ${dummystate.homevalue}{" "}
                                </span>
                                <span
                                  className={
                                    "setvaluee" +
                                    (setvalue7 == 0 ? "hidden" : "show")
                                  }
                                >
                                  <form onSubmit={form5}>
                                    <input
                                      type="text"
                                      value={dummystate.homevalue}
                                    ></input>
                                    <button
                                      onClick={() =>
                                        updateaddress("homevalue", "homevalue")
                                      }
                                      type="submit"
                                      className="btn"
                                      value={dummystate.homevalue}
                                    >
                                      Submit
                                    </button>
                                  </form>
                                </span>
                                {successmessage4 ? (
                                  <span className="profilesettingreview ps-3">
                                    {successmessage4}
                                  </span>
                                ) : (
                                  ""
                                )}
                                <a href="#">
                                  <img
                                    onClick={greetUser7}
                                    src="/../asset/images/penet.png"
                                  />{" "}
                                  Edit
                                </a>
                              </li>
                              {/* <li>$850,000 8-12-19 <a href="#"><i className="fa-solid fa-pen"></i> Edit</a></li>
                                                        <li>$850,000 8-12-19 <a href="#"><i className="fa-solid fa-pen"></i> Edit</a></li>
                                                        <li>$850,000 8-12-19 <a href="#"><i className="fa-solid fa-pen"></i> Edit</a></li> */}
                            </ul>
                            {/* <a className="addnew" href="#">Add New</a> */}
                          </div>
                          <ul className="ads">
                            <li>
                              <b>Rental Value : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue4 == 1 ? "hidden" : "show")
                                }
                              >
                                ${" "}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue4 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form6}>
                                  <input type="text" value="$"></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "rentalvalue",
                                        "agentrecordrentalvalue"
                                      )
                                    }
                                    type="submit"
                                    value={dummystate.rentalvalue}
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>
                              {successmessage5 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage5}
                                </span>
                              ) : (
                                ""
                              )}
                              <a href="#">
                                <img
                                  onClick={greetUser4}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                            </li>

                            <li>
                              <b>Airbnb Value : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue5 == 1 ? "hidden" : "show")
                                }
                              >
                                ${dummystate.Airbnb}{" "}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue5 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form7}>
                                  <input
                                    type="text"
                                    value={dummystate.Airbnb}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "airbnbvalue",
                                        "agentrecordairbnbvalue"
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>
                              {successmessage6 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage6}
                                </span>
                              ) : (
                                ""
                              )}
                              <img
                                style={{ float: "right" }}
                                onClick={greetUser5}
                                src="/../asset/images/addmore1.png"
                              ></img>
                              {/* <a href="#"><i onClick={greetUser5} className="fa-solid fa-pen"></i></a> */}
                            </li>

                            <li>
                              <b>Loan Amount : </b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue6 == 1 ? "hidden" : "show")
                                }
                              >
                                {dummystate.downpaymentvalue} $
                                {dummystate.loanamount} At {dummystate.apr_rate}
                                % APR ${dummystate.monthly_Mortage_Insurance}{" "}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue6 == 0 ? "hidden" : "show")
                                }
                              >
                                <form onSubmit={form8}>
                                  <input
                                    type="text"
                                    value={dummystate.loanamount}
                                  ></input>
                                  <button
                                    onClick={() =>
                                      updateaddress(
                                        "loanamount",
                                        "agentrecordloanvalue"
                                      )
                                    }
                                    type="submit"
                                    className="btn"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </span>
                              {successmessage7 ? (
                                <span className="profilesettingreview ps-3">
                                  {successmessage7}
                                </span>
                              ) : (
                                ""
                              )}
                              <a href="#">
                                <img
                                  onClick={greetUser6}
                                  src="/../asset/images/penet.png"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <a className="mainbtn" href="#">
                          <img
                            src="/../asset/images/maintb_icon.png"
                            alt="icon"
                          />{" "}
                          Maintenance Items
                        </a>
                        <div className="maindiv">
                          <h5>
                            <img src="/../asset/images/it1.png" alt="icon" />{" "}
                            Lender Details{" "}
                            <div className="form-check form-switch">
                              <Switch
                                onColor="#3d9ddd"
                                onHandleColor="#fff"
                                height={20}
                                width={48}
                                onChange={handleChangelender}
                                className="react-switch"
                                checked={checkedlender}
                              />
                              {/* <Switch onChange={handleChangelender} className="react-switch" checked={agentrecord.lender_status == 'true' ? agentrecord.lender_status : checkedlender}  /> */}
                            </div>
                            <a href="#">
                              <img
                                onClick={greetUser8}
                                src="/../asset/images/penet.png"
                              />
                            </a>
                          </h5>
                          <form onSubmit={lenderdetails}>
                            <p>
                              <b>Name :</b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue8 == 1 ? "hidden" : "show")
                                }
                              >
                                {lenderrecord.name}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue8 == 0 ? "hidden" : "show")
                                }
                              >
                                <input
                                  type="text"
                                  name="lendername"
                                  onChange={lenderclick}
                                  value={lenderrecord.name}
                                ></input>
                              </span>
                            </p>
                            <p>
                              <b>Email :</b>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue8 == 1 ? "hidden" : "show")
                                }
                              >
                                {lenderrecord.email}
                              </span>
                              <span
                                className={
                                  "setvaluee" +
                                  (setvalue8 == 0 ? "hidden" : "show")
                                }
                              >
                                <input
                                  type="text"
                                  name="lenderemail"
                                  onChange={lenderclick}
                                  value={lenderrecord.email}
                                ></input>
                              </span>
                            </p>
                            <button
                              className={
                                "btn setvaluee" +
                                (setvalue8 == 0 ? "hidden" : "show")
                              }
                            >
                              Submit
                            </button>
                          </form>
                          {successmessage8 ? (
                            <span className="profilesettingreview ps-3">
                              {successmessage8}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="maindiv">
                          <h5>
                            <img src="/../asset/images/it2.png" alt="icon" />{" "}
                            Homeinspector Details
                            <div className="form-check form-switch">
                              <Switch
                                onColor="#3d9ddd"
                                onHandleColor="#fff"
                                height={20}
                                width={48}
                                onChange={handleChangeinspector}
                                className="react-switch"
                                checked={checkedinspector}
                              />

                              {/* <Switch onChange={handleChangeinspector} className="react-switch" checked={agentrecord.inspector_status == 'true' ? agentrecord.inspector_status : checkedinspector} /> */}
                            </div>
                            <a href="#">
                              <img
                                onClick={greetUser9}
                                src="/../asset/images/penet.png"
                              />
                            </a>
                          </h5>
                          <p>
                            <b>Name :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 1 ? "hidden" : "show")
                              }
                            >
                              {inspectorrecord.name &&
                              inspectorrecord.name != ""
                                ? inspectorrecord.name
                                : ""}{" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="name"
                                onChange={inspectorclick}
                                value={
                                  inspectorrecord.name
                                    ? inspectorrecord.name
                                    : ""
                                }
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Phone :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 1 ? "hidden" : "show")
                              }
                            >
                              {inspectorrecord.cellnumber
                                ? inspectorrecord.cellnumber
                                : ""}{" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="cellnumber"
                                onChange={inspectorclick}
                                value={
                                  inspectorrecord.cellnumber
                                    ? inspectorrecord.cellnumber
                                    : ""
                                }
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Email :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 1 ? "hidden" : "show")
                              }
                            >
                              {inspectorrecord.email
                                ? inspectorrecord.email
                                : ""}{" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="email"
                                onChange={inspectorclick}
                                value={
                                  inspectorrecord.email
                                    ? inspectorrecord.email
                                    : ""
                                }
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Business :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 1 ? "hidden" : "show")
                              }
                            >
                              {" "}
                              {inspectorrecord.companyname
                                ? inspectorrecord.companyname
                                : ""}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue9 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="companyname"
                                onChange={inspectorclick}
                                value={
                                  inspectorrecord.companyname
                                    ? inspectorrecord.companyname
                                    : ""
                                }
                              ></input>
                            </span>
                          </p>

                          <button
                            className={
                              "btn setvaluee" +
                              (setvalue9 == 0 ? "hidden" : "show")
                            }
                          >
                            Submit
                          </button>
                        </div>

                        <div className="maindiv">
                          <h5>
                            <img src="/../asset/images/it2.png" alt="icon" />{" "}
                            Title Company Details
                            <div className="form-check form-switch">
                              <Switch
                                onColor="#3d9ddd"
                                onHandleColor="#fff"
                                height={20}
                                width={48}
                                onChange={handleChangetitlecompany}
                                className="react-switch"
                                checked={checkedcompany}
                              />
                            </div>
                            <a href="#">
                              <img
                                onClick={greetUser10}
                                src="/../asset/images/penet.png"
                              />
                            </a>
                          </h5>
                          <p>
                            <b>Name :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 1 ? "hidden" : "show")
                              }
                            >
                              {" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                onChange={titlecompanyclick}
                                type="text"
                                name="titlename"
                                value={titlecompanydata.titlename}
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Phone :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 1 ? "hidden" : "show")
                              }
                            >
                              {" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="titlephone"
                                onChange={titlecompanyclick}
                                value={titlecompanydata.titlephone}
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Email :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 1 ? "hidden" : "show")
                              }
                            >
                              {" "}
                            </span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                type="text"
                                name="titleemail"
                                onChange={titlecompanyclick}
                                value={titlecompanydata.titleemail}
                              ></input>
                            </span>
                          </p>
                          <p>
                            <b>Business :</b>{" "}
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 1 ? "hidden" : "show")
                              }
                            ></span>
                            <span
                              className={
                                "setvaluee" +
                                (setvalue10 == 0 ? "hidden" : "show")
                              }
                            >
                              <input
                                onChange={titlecompanyclick}
                                name="titlecompany"
                                type="text"
                                value={titlecompanydata.titlecompany}
                              ></input>
                            </span>
                          </p>
                          <button
                            className={
                              "btn setvaluee" +
                              (setvalue10 == 0 ? "hidden" : "show")
                            }
                          >
                            Submit
                          </button>
                        </div>

                        <div className="maindiv">
                          <h5>
                            <img src="/../asset/images/it3.png" alt="icon" />{" "}
                            Documents
                            {/* <a href="#"><i onClick={greetUser11} className="fa-solid fa-pen"></i></a> */}
                            <img
                              style={{ float: "right", height: "auto" }}
                              onClick={greetUser11}
                              src="/../asset/images/addmore1.png"
                            ></img>
                          </h5>
                          {dataforuploaddata.length > 0
                            ? dataforuploaddata.map((items, i) => {
                                return (
                                  <p className="p-0">
                                    <span
                                      className={
                                        "setvaluee" +
                                        (setvalue11 == 1 ? "hidden" : "show")
                                      }
                                    >
                                      {items}
                                    </span>
                                    <span
                                      className={
                                        "setvaluee" +
                                        (setvalue11 == 0 ? "hidden" : "show")
                                      }
                                    >
                                      <input
                                        type="file"
                                        name="document1"
                                      ></input>
                                    </span>
                                  </p>
                                );
                              })
                            : ""}
                          <button
                            className={
                              "btn setvaluee" +
                              (setvalue11 == 0 ? "hidden" : "show")
                            }
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h6 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <b>Communication</b>{" "}
                  <img src="/../asset/images/aro_a.png" alt="icon" />
                </button>
              </h6>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-sm-4 col-lg-3">
                      <div className="commun">
                        <h5>
                          {agentrecord.fname} {agentrecord.lname}
                        </h5>
                        <p>{agentrecord.dob}</p>
                        <p>
                          <img src="/../asset/images/eemml.png" alt="icon" />{" "}
                          {agentrecord.email}
                        </p>
                        <p>
                          <img src="/../asset/images/eemml2.png" alt="icon" />{" "}
                          {agentrecord.cellphone}
                        </p>
                        <ul>
                          <li>
                            <input type="radio" name="name" /> Email
                          </li>
                          <li>
                            <input type="radio" name="name" /> Text
                          </li>
                          <li>
                            <input type="radio" name="name" /> Both
                          </li>
                        </ul>
                        <p className="send">Send me text for birthday</p>
                      </div>
                    </div>
                    {/* <div className="col-sm-4 col-lg-3">
                                        <div className="commun">
                                            <h5>Punkaj Tripathi</h5>
                                            <p>07 March 1976</p>
                                            <p><img src="/../asset/images/eemml.png" alt="icon" /> punkajtripathi@gmail.com</p>
                                            <p><img src="/../asset/images/eemml2.png" alt="icon" /> +18765432100</p>
                                            <ul>
                                                <li><input type="radio" name="name"/> Email</li>
                                                <li><input type="radio" name="name"/> Text</li>
                                                <li><input type="radio" name="name"/> Both</li>
                                            </ul>
                                            <p className="send">Send me text for birthday</p>
                                        </div>
                                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h6 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <b>Alerts Settings</b>{" "}
                  <img src="/../asset/images/aro_a.png" alt="icon" />
                </button>
              </h6>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <table className="tables">
                    <tr>
                      <th>Mail</th>
                      <th>Text</th>
                      <th>
                        <span>All alert setting lorem ipusum</span>
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Apply all for text / email</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h6 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  <b>Request and history</b>{" "}
                  <img src="/../asset/images/aro_a.png" alt="icon" />
                </button>
              </h6>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="request_set">
                        <h5>
                          <img src="/../asset/images/Request1.png" alt="icon" />{" "}
                          Request & History
                        </h5>
                        <h6>Chients requested your action</h6>
                        <ul>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested CMA for 123 Maple{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="request_set">
                        <h5>
                          <img src="/../asset/images/Request2.png" alt="icon" />{" "}
                          See what your clients are doing
                        </h5>
                        <h6>See what your clients are doing</h6>
                        <ul>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                          <li>
                            Mark requested lemder for quote{" "}
                            <span>Nov 1, 2021</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* modal end */}
      <Footer />
    </>
  );
}

export default AdminReviewclient;
