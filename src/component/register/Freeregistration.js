import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header2";
import Mainfooter from "../footer/Footer";
import $ from "jquery";
import createApi from "../../utils/api";

function Freeregistration() {
  const navigate = useNavigate();
  const [dataforAgents, Setdataforagents] = useState([]);
  const [setvisible, setstatevisible] = useState("false");
  const [forerrormessage, Setstateforerrormessage] = useState("");
  const [forsuccessmessage, Setstateforsuccessmessage] = useState("");
  const [fixedstatus, setfixedstatus] = useState(0);
  const [clearEvent, setEvent] = useState(0);
  const api = createApi();
  let text = {
    id: "",
    name: "",
    email: "",
    profileimg: "",
  };
  const [fixedlender, setstateforfixedlender] = useState(text);

  // useEffect(() => {

  // }, [fixedlender])

  const onCloseModal = async () => {
    setstateforfixedlender(text);
  };

  const [state, setState] = useState({
    lendername: "",
    // email: "",
    // password: "",
    // company: "",
    // phone: "",
    // cellnumber: "",
    // confirmPassword: "",
    // type: "",
    // teamsize: "",
  });
  const [agentrequest, setStateforagentrequest] = useState({
    agentname: "",
    // email: "",
    // password: "",
    // company: "",
    // phone: "",
    // cellnumber: "",
    // confirmPassword: "",
    // type: "",
    // teamsize: "",
  });

  console.log("sessionfortryforme", localStorage.getItem("tryforfreeemail"));
  const [arraylender1, setstateforarraylender1] = useState([]);
  const [publicrurl, setstateforurl] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    //   alert(value)

    setStateforagentrequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const greetUser8 = (e) => {
    // function greetUser8() {
    // console.log("arraylender1new", arraylender1)
    setstateforfixedlender("");

    setstatevisible("");
    Setdataforagents("");

    if (arraylender1.length > 0) {
      setstateforarraylender1([]);
    }
  };

  function addlender(id, name, i, email, profileimg) {
    setstateforfixedlender({
      name: name,
      id: id,
      email: email,
      profileimg: profileimg,
    });
    let test = [];

    const obje1 = { lendername: name, id: id };
    test = arraylender1;
    test.push(obje1);
    if (dataforAgents[i].id == id) {
      dataforAgents.splice(i, 1);
    }
    setstatevisible("false");

    setstateforarraylender1(test);
    // setmodal(true);
    // myFunction();
  }
  const SetStateforagent = (e) => {
    const { name, value } = e.target;

    // alert(value)
    // if (value.length > 0) {

    setstateforfixedlender((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (value.length == 0) {
      Setdataforagents("");
      return;
    }

    if (value.length > 0) {
      console.log(value);
      setstatevisible("true");
      setfixedstatus(0);

      clearTimeout(clearEvent);
      let id = setTimeout(() => apicall(value), 500);

      setEvent(id);

      // const handleChange = (e) => {
      //     const { name, value } = e.target
    }
  };

  const apicall = async (value) => {
    let formdata = new FormData();
    formdata.append("userid", localStorage.getItem("token-info"));
    formdata.append("suggest", value);
    api
      .post("/api/homekeepertotalagents", formdata)

      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          Setdataforagents(response.data.totalagents);
          setstateforurl(response.data.publicurl);
        } else {
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };

  // function sendrequesttoagent(){
  //     alert("test")
  // }
  const sendrequesttoagent = async (e) => {
    e.preventDefault();
    onCloseModal();
    let formdata = new FormData();
    formdata.append("lenderid", fixedlender.id);
    formdata.append("lendername", fixedlender.name);
    formdata.append("userid", localStorage.getItem("token-info"));
    axios
      .post("/homekeeperinvitetoaddproperty", formdata)

      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          // Setdataforagents(response.data.totalagents);
          // setstateforurl(response.data.publicurl)
          Setstateforsuccessmessage(response.data.message);
          $("#toast-containersuccess")
            .fadeIn("slow")
            .delay(3000)
            .fadeOut("slow");
          setTimeout(Setstatefornavigate, 1500);
        } else {
          Setstateforerrormessage(response.data.message);
          // setTimeout(Setstateforerrormessage, 3000);
          $("#toast-containererror").fadeIn("slow").delay(3000).fadeOut("slow");
          // setError(response.data.errors);
          console.log("under error");
        }
      });
  };

  const sendrequest = async (e) => {
    e.preventDefault();
    setfixedstatus(1);
    setstateforfixedlender({
      id: fixedlender.id,
      name: fixedlender.name,
      email: fixedlender.email,
      profileimg: fixedlender.profileimg,
    });
  };

  function deleterequestagent(id, name) {
    let arraydata = {
      id: fixedlender.id,
      name: fixedlender.name,
    };
    setfixedstatus(0);

    dataforAgents.push(arraydata);
  }

  const sendinvitetoagent = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("agentemail", agentrequest.agentname);
    formdata.append("authid", localStorage.getItem("token-info"));
    api
      .post("/api/homekeeperaddmyagent", formdata)

      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          Setstateforsuccessmessage(response.data.message);
          $("#toast-containersuccess")
            .fadeIn("slow")
            .delay(3000)
            .fadeOut("slow");
          setTimeout(Setstatefornavigate, 1500);
        } else {
          Setstateforerrormessage(response.data.message);
          $("#toast-containererror").fadeIn("slow").delay(3000).fadeOut("slow");
          console.log("under error");
        }
      });
    // alert("test")
  };

  function Setstatefornavigate() {
    navigate("/homeowner/myproperties");
  }
  // red-#bd362f
  // image-errortoastr

  //green- #51a351
  //image- toastr

  return (
    <>
      <Header />

      <div
        id="toast-containererror"
        style={{
          backgroundImage: "url(./asset/images/errortoastr.png)",
          backgroundColor: "#bd362f",
        }}
        className={forerrormessage ? "toast-container" : ""}
      >
        {forerrormessage ? forerrormessage : ""}
      </div>
      <div
        id="toast-containersuccess"
        style={{
          backgroundImage: "url(./asset/images/toastr.png)",
          backgroundColor: "#51a351",
        }}
        className={forsuccessmessage ? "toast-container" : ""}
      >
        {forsuccessmessage ? forsuccessmessage : ""}
      </div>
      <section className="login register lenderReg">
        <div className="container">
          <div className="text-start">
            <h1>Home owner Free Registration</h1>
            <div className="form-signin addprip">
              <p>
                Please tell us if you have an agent you already work with or{" "}
                <br />
                should we provide one for you?
              </p>
              <h6>
                <a href="#">Yes</a>, Here is my agents email :
                <form>
                  <input
                    type="email"
                    name="agentname"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your agent email"
                  />
                  {/* <button type="submit" className="btn">Get Started</button> */}
                  <button
                    type="button"
                    onClick={sendinvitetoagent}
                    className="btn"
                  >
                    Get Started
                  </button>
                </form>
              </h6>
              <h6>
                <a href="#">No</a>, Please connect me with a local agent who can
                help me with home value and setting up my account perfectly.{" "}
                <a
                  onClick={greetUser8}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="btn"
                >
                  Find Local Agent
                </a>
              </h6>
              <h6>
                Do you want to own Maintenance?{" "}
                <Link to={"/subscriptionplan"} className="btn">
                  Purchase Membership
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </section>

      {/*<label data-bs-toggle="modal" data-bs-target="#exampleModalRequest">Request Agent</label>*/}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered  modal-xl">
          <div className="modal-content agentdiv">
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6">
                  <form onSubmit={sendrequest}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Find Agent
                      </h5>
                      <button
                        type="button"
                        onClick={() => onCloseModal()}
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <input
                      type="hidden"
                      name="lenderid"
                      value={fixedlender.id}
                    ></input>
                    <input
                      type="text"
                      name="name"
                      value={fixedlender.name}
                      onChange={SetStateforagent}
                      placeholder="Name, email and city"
                      autoComplete="off"
                    />
                    <ul
                      name="agentnamefromoption"
                      className="showdiv myagentsul"
                    >
                      {/* <li value="" selected><div className="img"><img src="/asset/images/usr.png" align="img"/></div> Pick Your Home Lender <a href='#'>Add</a></li> */}
                      {
                        // picklenders
                        dataforAgents &&
                        dataforAgents.length > 0 &&
                        setvisible == "true"
                          ? dataforAgents.map((dataforAgents, i) => (
                              <li
                                id={dataforAgents.id}
                                value={dataforAgents.id}
                                className="user"
                              >
                                <div className="img">
                                  <img
                                    src={
                                      dataforAgents.profileimg
                                        ? publicrurl + dataforAgents.profileimg
                                        : "/asset/images/usr.png"
                                    }
                                    align="img"
                                  />
                                </div>{" "}
                                <a
                                  onClick={(e) => {
                                    addlender(
                                      dataforAgents.id,
                                      dataforAgents.name,
                                      i,
                                      dataforAgents.email,
                                      dataforAgents.profileimg
                                    );
                                  }}
                                  href="#"
                                >
                                  Add
                                </a>{" "}
                                {dataforAgents.name}
                                <br />
                                <span>{dataforAgents.email}</span>
                              </li>
                            ))
                          : ""
                      }
                    </ul>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => onCloseModal()}
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-sm-6">
                  <form onSubmit={sendrequesttoagent}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Request Agent
                      </h5>
                      <button
                        type="button"
                        onClick={() => onCloseModal()}
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="ust">
                      <div className="img">
                        <img
                          src={
                            fixedlender.profileimg && fixedstatus == 1
                              ? "https://digittrix-staging.com/staging/crmapply/homekeeper/" +
                                fixedlender.profileimg
                              : "/asset/images/usr.png"
                          }
                          alt="img"
                        ></img>
                      </div>
                      <h5>
                        {fixedlender.name && fixedstatus == 1
                          ? fixedlender.name
                          : ""}
                      </h5>
                      <p>
                        {fixedlender.email && fixedstatus == 1
                          ? fixedlender.email
                          : ""}
                      </p>
                      <a
                        href="#"
                        className=""
                        onClick={(e) => {
                          deleterequestagent(fixedlender.id, fixedlender.name);
                        }}
                      >
                        Remove
                      </a>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        onClick={() => onCloseModal()}
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="btn btn-primary"
                      >
                        Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="modal fade" id="exampleModalRequest" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content agentdiv">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Request Agent</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="set">
                            <h5><span className="img"><img src="images/user.jpg" align="img "/></span>Juan Russell</h5>
                            <p>Christoking@gmail.com</p><a href="#">Change</a>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Request</button>
                    </div>
                </div>
            </div>
        </div> */}
      <Mainfooter />
    </>
  );
}

export default Freeregistration;
