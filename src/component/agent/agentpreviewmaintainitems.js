import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header2";
import Mainfooter from "../footer/Footer";

function Agentpreventmaintainitems() {
  const navigate = useNavigate();

  const [statemaintain, setmaintainState] = useState({
    maintenancename: "",
    maintaindescription: "",
  });
  const [state1, setState1] = useState({
    templatename: "",
    templatedescription: "",
  });
  const [templatestatus, settemplatestatus] = useState("");
  const [templatedescription, settdError] = useState("");
  const [dummy11, dummy1] = useState("");
  const [dataforinspector, Setdataforinspector] = useState("");
  const [data1, setdata1] = useState("");
  const [dataforHomemaintain, SetdataforHomemaintain] = useState([]);
  const [dataforHomemaintaincurrent, SetdataforHomemaintaincurrent] = useState(
    []
  );
  const [successmessage, Setstatusforsuccess] = useState("");
  const [maintainrecord, setmaintainrecord] = useState([]);
  const [switchtabhomeinspector, setstateforswitchtabhomeinspector] =
    useState("");
  const [forcurrentmaintain, setstateforcurrentmaintain] = useState([]);
  const [objectforedit, Setstateforedit] = useState("");
  const [propertyidd, setstateforoldpropertyid] = useState("");
  const [publicrurl, setstateforurl] = useState("");
  const [templatenameerror, settnameError] = useState("");

  // console.log('sessionfortryforme', localStorage.getItem('tryforfreeemail'));

  const submittemplatehomemaintain = (event) => {
    event.preventDefault();
    // console.log("rrrrrrrrrrrrrrrrrrrrrr",setmaintainState);
    // alert("form call")
    // api hit below
    // homekeeperaddmaintainencetemplate

    addDetailstoServer();
  };
  const [state, setState] = useState({
    inspectorname: "",
    inspectoremail: "",
    inspectorcellphone: "",
    inspectorcompanyname: "",
    homeinspectorselected: "",
  });

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setState1((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitClick = (
    i,
    id,
    templatename,
    templatedescription,
    alert_frequency,
    starting_date,
    repeat_every,
    alert_message,
    text_message_alert,
    email_message_alert
  ) => {
    var id = id;
    var maintenancename = templatename;
    var maintaindesc = templatedescription;
    // alert(maintenancename)
    // alert(maintaindesc)
    Setstateforedit({
      maintaindex: i,
      maintainid: id,
      maintainname: templatename,
      maintaindescription: templatedescription,
      maintainfrequency: alert_frequency,
      maintainstarting_date: starting_date,
      maintainrepeat_every: repeat_every,
      maintainalert_message: alert_message,
      maintaintext_message_alert: text_message_alert,
      maintainemail_message_alert: email_message_alert,
    });
    // setState(id);
    // setState0(maintenancename);
  };

  const updatemaintainitems = (e) => {
    e.preventDefault();
    const queryString = window.location.href;
    const myarray = queryString.split("/");
    console.log("myarray", myarray[5]);
    const propertyid = myarray[5];
    let getid = dataforHomemaintaincurrent.map((a) => a.id);
    getid = getid.toString();
    let formdata = new FormData();
    const authid = localStorage.getItem("token-info");
    formdata.append("userid", authid);
    formdata.append("propertyid", propertyid);
    formdata.append("getmaintainid", getid);
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeeperupdatedmaintainencetemplatebyclient",
        formdata
      )
      .then(function (response) {
        if (response.data.status == "success") {
          console.log(
            "responseformaintain",
            response.data.maintainencetemplate
          );
          Setstatusforsuccess("Maintainenance Updated Successfully");
          // console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };

  const handleSubmit1 = (e) => {
    // alert(state1.templatename)
    //     alert(state1.templatedescription)
    // return false;
    e.preventDefault();

    if (state1.templatename == "") {
      settnameError("Template Name Required");
    } else {
      settnameError("");
    }
    if (state1.templatedescription == "") {
      settdError("Template Description Required");
    } else {
      settdError("");
    }
    if (state1.templatename && state1.templatedescription !== "") {
      // alert("test");
      settemplatestatus("Submitted Successfully");
      setdetailsfortemplatenametoserver();
    }
  };

  const setdetailsfortemplatenametoserver = () => {
    // alert(maintainrecord.length)
    const queryString = window.location.href;
    const myarray = queryString.split("/");
    const propertyid = myarray[5]; //pagename
    let formdata = new FormData();
    const userid = localStorage.getItem("token-info");
    formdata.append("maintenancename", state1.templatename);
    formdata.append("templatedescription", state1.templatedescription);
    formdata.append("userid", userid);
    // formdata.append('propertyid', propertyid);
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeeperaddmaintainencetemplate",
        formdata
      )
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          testing();
          // addmaintainitem();
          // var agentrecord = response.data.getclientrecord;
          // setdetailsfortemplate(agentrecord);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };

  function submittemplate(event) {
    // alert(objectforedit.maintaindex);
    event.preventDefault();
    const userid = localStorage.getItem("token-info");
    let formdata = new FormData();
    console.log(formdata);
    formdata.append("id", objectforedit.maintainid);
    formdata.append("templatename", objectforedit.maintainname);
    formdata.append("templatedescription", objectforedit.maintaindescription);
    formdata.append("userid", userid);

    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeepermaintainencetemplateupdate",
        formdata
      )
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          // window.location.reload();
          // testing();
          // setsuccessforupdate('Home Maintenance Updated Successfully')
          // sendDetailsToServer();
          dataforHomemaintaincurrent[objectforedit.maintaindex].templatename =
            objectforedit.maintainname;
        } else {
          console.log("under error");
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }

  const addDetailstoServer = (e) => {
    let formdata = new FormData();
    const authid = localStorage.getItem("token-info");
    formdata.append("userid", authid);
    formdata.append("maintenancename", statemaintain.maintenancename);
    formdata.append("templatedescription", statemaintain.maintaindescription);
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeeperaddmaintainencetemplate",
        formdata
      )
      .then(function (response) {
        if (response.data.status == "success") {
          console.log(
            "responseformaintain",
            response.data.maintainencetemplate
          );
          testing();
          Setstatusforsuccess("Maintainenance Added Successfully");
          // console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };

  function addmaintainitem(e, i) {
    console.log("gggggg", e);

    getdetailsfrommaintain(e, i);
    // alert(maintainrecord.length)
    if (maintainrecord.length > 0) {
      setstateforswitchtabhomeinspector(maintainrecord.length);
      // alert("length greater than 0")
    }
    if (maintainrecord.length == 0) {
      // alert("length 0")
      setstateforswitchtabhomeinspector(0);
    }
  }

  const getdetailsfrommaintain = async (e, i) => {
    //  alert("reached")
    let test = [];
    //  test = maintainrecord;
    test = dataforHomemaintaincurrent;
    test.push(dataforHomemaintain[i]);
    //test.push(dataforHomemaintaincurrent[i]);

    // dataforHomemaintaincurrent
    test = [...new Map(test.map((item) => [item.templatename, item])).values()];
    setstateforcurrentmaintain(test);
    dataforHomemaintain.splice(i, 1);
    console.log("finaltesting", dataforHomemaintain);
    // setmaintainrecord(test);
    SetdataforHomemaintaincurrent(test);
  };

  function removeElement(i, templatename, templatedescription, itemid) {
    // alert(i)
    // alert(templatename)
    // alert(templatedescription)
    // alert(itemid)

    console.log("remove");
    let deletetemplatename = templatename;
    let deletetemplatedescription = templatedescription;
    // function testing() {
    var arrylength = dummy11.length;
    // alert(arrylength)
    var arrylengthincremented = dummy11.length + 0;

    console.log("arraylength", arrylengthincremented);
    let arraydata = {
      id: itemid,
      templatename: deletetemplatename,
      templatedescription: deletetemplatedescription,
    };
    // console.log("arraydata", arraydata.deletetemplatename)
    console.log("insidemaintainrecord", dummy11);
    setdata1(arraydata);
    console.log("insidemaintainrecordarray", arraydata);
    // now push data to setdataforhomemaintain
    //SetdataforHomemaintain(arraydata)
    // let dummy=[];
    // dummy = dummy11
    dataforHomemaintain.push(arraydata);

    // const numbersCombined = [...dataforHomemaintain, ...arraydata];

    // setstateforpusharray(numbersCombined)
    console.log("nowcheck", dataforHomemaintain);

    // let allgetid = forcurrentmaintain.map(a => a.id);

    // console.log("nowcheckarraydata", maintainrecord)

    //let test = maintainrecord;
    let test = dataforHomemaintaincurrent;
    test.splice(i, 1);
    // setmaintainrecord(test);
    SetdataforHomemaintaincurrent(test);

    // setVisible(!visible);
    if (maintainrecord.length == 0) {
      setstateforswitchtabhomeinspector("");
    }
  }

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    // if (e.target.name == 'id') {
    //     setState(e.target.value);
    // }
    // if (e.target.name == 'maintenancename') {
    //     setState0(e.target.value);
    // }
    // setInputField({ [e.target.name]: e.target.value })

    setmaintainState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    Setstateforedit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // console.log("testing", maintainrecord);
    // $("#Inspector-tab").addClass("active");
    const queryString = window.location.href;
    const myarray = queryString.split("/");
    console.log("myarray", myarray[5]);
    const propertyid = myarray[5];
    testing();

    getdetailsfromserver(propertyid);
    getdetailsfrominspector(propertyid);
    setstateforoldpropertyid(propertyid);
    // getdetailsfrompartner();
    // getlenderdetails();
  }, []);

  const getdetailsfrominspector = (propertyid) => {
    // alert(propertyid)
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    formdata.append("propertyid", propertyid);
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeepercurrentmaintainenceofinspector",
        formdata
      )
      .then(function (response) {
        if (response.data.status == "success") {
          setstateforurl(response.data.publicurl);
          console.log(
            "responseformaintaininspector",
            response.data.inspectordetails
          );
          // testing();
          Setdataforinspector(response.data.inspectordetails);
          // console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };

  const testing = (e) => {
    const queryString = window.location.href;
    const myarray = queryString.split("/");
    console.log("myarray", myarray[5]);
    const propertyid = myarray[5];

    let formdata = new FormData();
    const userid = localStorage.getItem("token-info");

    formdata.append("userid", userid);
    formdata.append("propertyid", propertyid);
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeepermaintainencetemplate",
        formdata
      )
      .then(function (response) {
        if (response.data.status == "success") {
          console.log(
            "responseformaintainnnn",
            response.data.maintainencetemplate
          );
          // testing();
          SetdataforHomemaintain(response.data.maintainencetemplate);
          // console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
    // getdetailsfromserver()
  };
  const goBack = () => {
    //    alert("test")
    navigate(-1);
  };

  const getdetailsfromserver = (propertyid) => {
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    formdata.append("propertyid", propertyid);
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeepercurrentmaintainencetemplateforagent",
        formdata
      )
      .then(function (response) {
        if (response.data.status == "success") {
          console.log("responseformaintain", response);
          // testing();
          SetdataforHomemaintaincurrent(response.data.maintainencetemplate);
          // console.log("mylenders", dataforLenders);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };

  return (
    <>
      <Header />
      <div className="add_client add_clientmaintainitems">
        <div className="container">
          <br />
          {successmessage ? successmessage : ""}

          <h3>
            <Link onClick={goBack}>
              <i className="fa-solid fa-arrow-left"></i>
            </Link>{" "}
            <b>Home Maintainace</b>
          </h3>
          <div className="plan_section">
            <form onSubmit={updatemaintainitems}>
              <div className="row">
                <div className="col-sm-5">
                  <h5>Update maintenance Items</h5>
                  <ul>
                    {dataforHomemaintain.map((items, i) => {
                      return (
                        <li>
                          <>
                            <h6>{items.templatename}</h6>
                            <p>{items.templatedescription}</p>
                            <div value={items.id} className="btns">
                              <a
                                value={items.id}
                                onClick={(e) => {
                                  addmaintainitem(items.id, i);
                                }}
                              >
                                Add
                              </a>
                            </div>
                          </>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="col-sm-2">
                  <div className="adremove">
                    <a href="javascript:void(0)" className="bt">
                      Add -&gt;
                    </a>
                    <a href="javascript:void(0)" className="bt">
                      &lt;- Remove
                    </a>
                  </div>
                </div>
                <div className="col-sm-5">
                  <h5>Current maintenance Items</h5>
                  <ul>
                    {dataforHomemaintaincurrent
                      ? dataforHomemaintaincurrent.map((items, i) => {
                          return (
                            <li>
                              <>
                                <h6>{items.templatename}</h6>
                                <p>{items.templatedescription}</p>
                                <div value={items.id} className="btns">
                                  <a
                                    href="javascript:void(0)"
                                    className="penbtn"
                                  >
                                    <i
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModalformaintainitemeditupdate"
                                      onClick={() => {
                                        handleSubmitClick(
                                          i,
                                          items.id,
                                          items.templatename,
                                          items.templatedescription,
                                          items.alert_frequency,
                                          items.starting_date,
                                          items.text_message_alert,
                                          items.email_message_alert
                                        );
                                      }}
                                      className="fa-solid fa-pen"
                                    ></i>
                                  </a>
                                  <a href="javascript:void(0)" className="bdlt">
                                    <i
                                      onClick={() =>
                                        removeElement(
                                          i,
                                          items.templatename,
                                          items.templatedescription,
                                          items.id
                                        )
                                      }
                                      templatename={items.templatename}
                                      templatedescription={
                                        items.templatedescription
                                      }
                                      className="fa-regular fa-trash-can"
                                    ></i>
                                  </a>
                                </div>
                              </>
                            </li>
                          );
                        })
                      : ""}

                    {/* {
                                    maintainrecord.map((items, i) => {
                                        return (
                                            <li>
                                                 
                                                    <><h6>{items.templatename}</h6>
                                                        <p>{items.templatedescription}</p>
                                                    <div value={items.id} className="btns"> <a href="#" className="penbtn"><i className="fa-solid fa-pen"></i></a><a href="javascript:void(0)" className="bdlt">

                                                            <i onClick={() => removeElement(i, items.templatename, items.templatedescription, items.id)} templatename={items.templatename} templatedescription={items.templatedescription} className="fa-regular fa-trash-can"></i>


                                                        </a></div>
                                                        <input type="hidden" name="currentmaintainitems[]" value={items.id}></input>

                                                    </>
                                                

                                            </li>
                                        )
                                    })
                                } */}
                  </ul>
                </div>

                <div className="col-sm-12">
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalformaintainitem"
                    className="add_main add_main2"
                  >
                    <i className="fa-light fa-plus"></i> Create own Item
                  </a>
                  <p>
                    You Can create your own maintenance item which in not
                    available it this list.
                  </p>
                </div>
                <div className="col-sm-12 text-end">
                  <button className="btn"> Update</button>
                </div>
                {dataforinspector.name ? (
                  <div className="col-sm-12">
                    <div className="askdiv">
                      <span className="image">
                        <img
                          align="img"
                          style={{ width: "100px" }}
                          src={
                            dataforinspector.profileimg
                              ? publicrurl + dataforinspector.profileimg
                              : "/../asset/images/usr.png"
                          }
                        ></img>
                      </span>

                      <h4>Ask any question</h4>
                      <p>
                        {dataforinspector.name ? dataforinspector.name : ""}
                      </p>
                      <h6>
                        {dataforinspector.cellphone
                          ? dataforinspector.cellphone
                          : ""}{" "}
                        {dataforinspector.email ? dataforinspector.email : ""}
                      </h6>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* modal start */}

                {/* <div className="modal fade" id="exampleModalformaintainitem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal" >
                                    <div className="modal-content ">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add Maintenance Item</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            

                                            <form onSubmit={submittemplatehomemaintain}>
                                                <input type="hidden" name='id' onChange={inputsHandler}></input>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <label>Name of Maintenance*</label>
                                                        <input className="form-control" type="text" name="maintenancename" onChange={inputsHandler} value={statemaintain.maintenancename} placeholder='Name of Maintenance' />
                                                    </div>
                                                    <div className="col-4">
                                                        <label>Alert Frequency*</label>
                                                        <input className="form-control" type="text" name="alertfrequency" onChange={inputsHandler} placeholder='Alert Frequency' />
                                                    </div>
                                                    <div className="col-4">
                                                        <div className='row'>
                                                            <div className='col-sm-6'>
                                                                <label>Starting Date*</label>
                                                                <input className="form-control" type="date" name="startingdate" onChange={inputsHandler} />
                                                            </div>
                                                            <div className='col-sm-6'>
                                                                <label>Repeat Every*</label>
                                                                <select className="form-control" name='repeatevery' onChange={inputsHandler}>

                                                                    <option>1 Month</option>
                                                                    <option>2 Month</option>
                                                                    <option>3 Month</option>
                                                                </select>

                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="col-8">
                                                        <label>Description*</label>
                                                        <textarea name="maintaindescription" className="form-control" value={statemaintain.maintaindescription} onChange={inputsHandler}>

                                                        </textarea>
                                                    </div>

                                                    <div className="col-4">
                                                        <label>Image*</label>

                                                        <div className="imageup">
                                                            <h6>Drag & Drop or <span> Upload</span> image</h6>
                                                            <input className="form-control" type="file" />
                                                        </div>
                                                    </div>


                                                    <div className="col-12 mt-3 alt_Message">
                                                        <h4>Alert Message</h4>

                                                        <p className="w-100 mb-3">
                                                            <span><input type="checkbox" name="alerttext" onChange={inputsHandler} /> Text</span>
                                                            <span><input type="checkbox" name="alertemail" onChange={inputsHandler} /> Email</span>
                                                        </p>
                                                    </div>
                                                    <div className="col-6">
                                                        <label>Text Message Alert*</label>
                                                        <textarea name="textmessage" className="form-control" onChange={inputsHandler}>

                                                        </textarea>
                                                    </div>

                                                    <div className="col-6">
                                                        <label>Email Message Alert*</label>
                                                        <textarea name="emailmessage" className="form-control" onChange={inputsHandler}>

                                                        </textarea>
                                                    </div>
                                                </div>


                                                <div className="modal-footer mt-3 p-0">

                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>

                                                </div>

                                            </form>

                                        </div>

                                    </div>
                                </div>
                            </div> */}

                <div
                  className="modal fade"
                  id="exampleModalformaintainitem"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Maintenance Item
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <input
                            type="hidden"
                            name="id"
                            onChange={handleChange1}
                          ></input>
                          <div className="row">
                            <div className="col-12">
                              <label>Name of Maintenance*</label>
                              <input
                                className="form-control"
                                type="text"
                                name="templatename"
                                onChange={handleChange1}
                                value={state1.templatename}
                                placeholder="Name of Maintenance"
                              />
                              <span className="errormessage">
                                {templatenameerror}
                              </span>
                            </div>

                            <div className="col-12">
                              <div className="row">
                                <div className="col-sm-3 mt-3 alt_Message">
                                  <h4>Alert</h4>
                                  <p className="w-100 mb-3">
                                    <span>
                                      <input type="radio" name="alerttext" />{" "}
                                      Yes
                                    </span>
                                    <span>
                                      <input type="radio" name="alerttext" /> No
                                    </span>
                                  </p>
                                </div>

                                <div className="col-sm-2">
                                  <label>Starting Date*</label>
                                  <div className="form-group1">
                                    <input
                                      className="form-control"
                                      type="date"
                                      name="startingdate"
                                      onChange={handleChange1}
                                    />
                                  </div>
                                </div>

                                <div className="col-sm-2">
                                  <label>Due Date*</label>
                                  <div className="form-group1">
                                    <input
                                      className="form-control"
                                      type="date"
                                      name="startingdate"
                                      onChange={handleChange1}
                                    />
                                  </div>
                                </div>

                                <div className="col-sm-2">
                                  <label>Repeat Every*</label>
                                  <select
                                    className="form-control"
                                    name="repeatevery"
                                    onChange={handleChange1}
                                  >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                  </select>
                                </div>

                                <div className="col-sm-2">
                                  <label>Alert Freq*</label>

                                  <select
                                    className="form-control"
                                    name="alertfrequency"
                                    onChange={handleChange1}
                                  >
                                    <option>Date</option>
                                    <option>Month</option>
                                    <option>Year</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-8">
                              <label>Description*</label>
                              <textarea
                                name="templatedescription"
                                className="form-control"
                                value={state.templatedescription}
                                onChange={handleChange1}
                              ></textarea>
                              <span className="errormessage">
                                {templatedescription}
                              </span>
                            </div>

                            <div className="col-4">
                              <label>Image*</label>

                              <div className="imageup">
                                <h6>
                                  Drag & Drop or <span> Upload</span> image
                                </h6>
                                <input className="form-control" type="file" />
                              </div>
                            </div>

                            <div className="col-12 mt-3 alt_Message">
                              <h4>Alert Message</h4>

                              <p className="w-100 mb-3">
                                <span>
                                  <input
                                    type="radio"
                                    name="alerttext"
                                    onChange={handleChange1}
                                  />{" "}
                                  Text
                                </span>
                                <span>
                                  <input
                                    type="radio"
                                    name="alerttext"
                                    onChange={handleChange1}
                                  />{" "}
                                  Email
                                </span>
                              </p>
                            </div>
                            <div className="col-6">
                              <label>Text Message Alert*</label>
                              <textarea
                                name="textmessage"
                                className="form-control"
                                onChange={handleChange1}
                              ></textarea>
                            </div>

                            <div className="col-6">
                              <label>Email Message Alert*</label>
                              <textarea
                                name="emailmessage"
                                className="form-control"
                                onChange={handleChange1}
                              ></textarea>
                            </div>
                          </div>

                          <div className="modal-footer mt-3 p-0">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={handleSubmit1}
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* modal end */}

                {/* modal start for edit/update maintainencetemplate */}

                <div
                  className="modal fade"
                  id="exampleModalformaintainitemeditupdate"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal">
                    <div className="modal-content ">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Edit Maintenance Item
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {/* <h4>Name of Maintenance</h4> */}

                        <form>
                          <input
                            type="hidden"
                            name="maintainid"
                            value={objectforedit.maintainid}
                          ></input>
                          <div className="row">
                            <div className="col-4">
                              <label>Name of Maintenance*</label>
                              <input
                                className="form-control"
                                value={objectforedit.maintainname}
                                name="maintainname"
                                onChange={inputsHandler}
                                placeholder="Name of Maintenance"
                              />
                              {/* <span className='errormessage'>{templatenameerror}</span> */}
                            </div>
                            <div className="col-4">
                              <label>Alert Frequency*</label>
                              <input
                                className="form-control"
                                type="text"
                                name="maintainfrequency"
                                value={objectforedit.maintainfrequency}
                                onChange={inputsHandler}
                                placeholder="Alert Frequency"
                              />
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col-sm-6">
                                  <label>Starting Date*</label>
                                  <div className="form-group1">
                                    <input
                                      className="form-control"
                                      value={
                                        objectforedit.maintainstarting_date
                                      }
                                      onChange={inputsHandler}
                                      type="date"
                                      name="maintainstarting_date"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <label>Repeat Every*</label>
                                  <select
                                    className="form-control"
                                    name="maintainrepeat_every"
                                    value={objectforedit.maintainrepeat_every}
                                    onChange={inputsHandler}
                                  >
                                    <option>1 Month</option>
                                    <option>2 Month</option>
                                    <option>3 Month</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-8">
                              <label>Description*</label>
                              <textarea
                                name="maintaindescription"
                                value={objectforedit.maintaindescription}
                                onChange={inputsHandler}
                                className="form-control"
                              ></textarea>
                              {/* <span className='errormessage'>{templatedescription}</span> */}
                            </div>

                            <div className="col-4">
                              <label>Image*</label>

                              <div className="imageup">
                                <h6>
                                  Drag & Drop or <span> Upload</span> image
                                </h6>
                                <input className="form-control" type="file" />
                              </div>
                            </div>

                            <div className="col-12 mt-3 alt_Message">
                              <h4>Alert Message</h4>

                              <p className="w-100 mb-3">
                                <span className="me-3">
                                  <input
                                    type="radio"
                                    name="maintainalert_message"
                                    onChange={inputsHandler}
                                    checked={
                                      objectforedit.maintainalert_message ==
                                      "Text"
                                        ? true
                                        : ""
                                    }
                                  />{" "}
                                  Text
                                </span>
                                <span>
                                  <input
                                    type="radio"
                                    name="maintainalert_message"
                                    onChange={inputsHandler}
                                    checked={
                                      objectforedit.maintainalert_message ==
                                      "Email"
                                        ? true
                                        : ""
                                    }
                                  />{" "}
                                  Email
                                </span>
                              </p>
                            </div>
                            <div className="col-6">
                              <label>Text Message Alert*</label>
                              <textarea
                                name="maintaintext_message_alert"
                                onChange={inputsHandler}
                                value={objectforedit.maintaintext_message_alert}
                                className="form-control"
                              ></textarea>
                            </div>

                            <div className="col-6">
                              <label>Email Message Alert*</label>
                              <textarea
                                name="maintainemail_message_alert"
                                onChange={inputsHandler}
                                value={
                                  objectforedit.maintainemail_message_alert
                                }
                                className="form-control"
                              ></textarea>
                            </div>
                          </div>

                          <div className="modal-footer mt-3 p-0">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={submittemplate}
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* modal end for edit/update maintainencetemplate */}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Mainfooter />
    </>
  );
}
export default Agentpreventmaintainitems;
