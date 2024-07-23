import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../admin/Header";
import Sidebar from "../../admin/sidebar";
import DataTable from "react-data-table-component";

function Homeinspectioncompleted() {
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  const [persons, maintainencetemplateobj] = useState([]);

  const columns = [
    {
      name: "No",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "UserName",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Useronline",
      selector: (row) => row.usertype,
      sortable: true,
    },
    {
      name: "Homeownername",
      selector: (row) => row.homeownername,
      sortable: true,
    },
    {
      name: "Amount Paid",
      selector: (row) => row.amountpaid,
      sortable: true,
    },
    {
      name: "Service Type",
      selector: (row) => row.servicetype,
      sortable: true,
    },
    {
      name: "Date Requested",
      selector: (row) => row.daterequested,
      sortable: true,
    },
    {
      name: "Date Completed",
      selector: (row) => row.datecompleted,
      sortable: true,
    },
    {
      name: "Admin Name",
      selector: (row) => row.adminname,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
    },
  ];

  const [statemaintain, setmaintainState] = useState({
    maintenancename: "",
    alertfrequency: "",
    startingdate: "",
    repeatevery: "",
    description: "",
    image: "",
    alerttext: "",
    alertemail: "",
    textmessage: "",
    emailmessage: "",
  });

  const submittemplate = (event) => {
    event.preventDefault();
    updateDetailstoServer();
  };

  const submittemplatehomemaintain = (event) => {
    event.preventDefault();
    // console.log("rrrrrrrrrrrrrrrrrrrrrr",setmaintainState);

    addDetailstoServer();
  };

  const [stateforid, setState] = useState("");
  const [stateforname, setState0] = useState("");
  // const [statefordescription, setState1] = useState('');

  const inputsHandler = (e) => {
    const { name, value } = e.target;
    if (e.target.name == "id") {
      setState(e.target.value);
    }
    if (e.target.name == "maintenancename") {
      setState0(e.target.value);
    }
    setInputField({ [e.target.name]: e.target.value });

    setmaintainState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [inputField, setInputField] = useState({
    id: "",
    maintenancename: "",
    // templatename: "",
    // users: "",
  });

  const handleSubmitClick = (id, templatename) => {
    var id = id;
    var maintenancename = templatename;
    setState(id);
    setState0(maintenancename);
  };
  const handledeleteClick = (id, templatename) => {
    var id = id;
    //    alert(id);
    let formdata = new FormData();
    formdata.append("id", id);
    axios.post(
      "https://admin.myhomekeeper.co/api/homekeepertemplatedelete",
      formdata
    );
  };

  const sendDetailsToServer = async () => {
    axios
      .post("https://admin.myhomekeeper.co/api/homekeeperinspectionrequest")
      .then(function (response) {
        console.log("response", response.data.maintainencetemplate);
        // Setdata(response.data.getplans);
        // this.setState({data: data.conversations});
        if (response.data.status == "success") {
          const maintainencetemplate = response.data.maintainencetemplate;
          let data = [];
          for (let index = 0; index < maintainencetemplate.length; index++) {
            data.push({
              id: index + 1,
              username: "Test",
              usertype: "Agent",
              homeownername: "Homeowner",
              amountpaid: "$100",
              servicetype: "Inspection Report",
              daterequested: "12 Aug 2022",
              datecompleted: (
                <Link
                  to={"#" + maintainencetemplate[index].id}
                  className="datecompleted"
                >
                  Start Home Maintainenace plan
                </Link>
              ),
              admin: "",

              // templatename: maintainencetemplate[index].templatename,
              action: (
                <>
                  <i
                    className="fa-solid fa-eye"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      handleSubmitClick(
                        maintainencetemplate[index].id,
                        maintainencetemplate[index].templatename
                      );
                    }}
                  ></i>
                </>
              ),
            });
          }
          maintainencetemplateobj(data);
        } else {
          console.log("under error");
        }
      });
  };

  const addDetailstoServer = () => {
    alert("insert iniated");
    let formdata = new FormData();
    formdata.append("maintenancename", statemaintain.maintenancename);
    formdata.append("alertfrequency", statemaintain.alertfrequency);
    axios.post(
      "https://admin.myhomekeeper.co/api/homekeeperaddmaintainencetemplate",
      formdata
    );
    // formdata.append('startingdate', statemaintain.startingdate);
    // formdata.append('repeatevery', statemaintain.repeatevery);
    // formdata.append('description', statemaintain.description);
    console.log("formdata", statemaintain.maintenancename);
  };

  const updateDetailstoServer = () => {
    // event.preventDefault();
    let formdata = new FormData();
    console.log(formdata);
    formdata.append("id", stateforid);
    formdata.append("templatename", stateforname);
    // formdata.append('templatedescription', dtsa1);
    console.log("thisformdata", formdata);
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeepermaintainencetemplateupdate",
        formdata
      )
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          // const message1 = response.data.message;

          // setmessage(message1);
          sendDetailsToServer();
          // navigate('homemaintenance');
          // console.log("asdfsadfsdaf", response.data.data.usertype);
          // navigate('/Thankyou', { state: response.data.data.usertype })
        } else {
          // alert("error");
          // setError(response.data.errors);
          console.log("under error");
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  useEffect(() => {
    sendDetailsToServer();
  }, []);

  return (
    <>
      <Header />
      <section className="dashboard">
        <div className="container-fluid">
          <Sidebar />

          <div className="inspection_reques maintenance">
            <h2>
              <a className="filter" href="#">
                <i className="fa-solid fa-filter"></i>
                <i className="fa-solid fa-xmark"></i>
              </a>{" "}
              Home Inspection Request Completed
              {/* <span className="main_spn hh"><a className="add_new" data-bs-toggle="modal" data-bs-target="#exampleModal1"><i className="fa-light fa-plus"></i> Add New</a> <span className="show">Show : <select><option>10 Entries</option><option>20 Entries</option><option>15 Entries</option><option>30 Entries</option></select></span>
                        </span> */}
              <span className="main_spn hh">
                <span className="show">
                  Show : <label>entries</label>
                </span>
              </span>
            </h2>
            <div className="table-responsive w-100 ">
              <table className="table">
                <DataTable pagination columns={columns} data={persons} />
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal1122"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add/Edit Maintenance Item
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

              <form onSubmit={submittemplate}>
                <input
                  type="text"
                  name="id"
                  value={stateforid}
                  onChange={inputsHandler}
                ></input>
                <div className="row">
                  <div className="col-4">
                    <label>Name of Maintenance*</label>
                    <input
                      className="form-control"
                      type="text"
                      value={stateforname}
                      name="maintenancename"
                      onChange={inputsHandler}
                      placeholder="Name of Maintenance"
                    />
                  </div>
                  <div className="col-4">
                    <label>Alert Frequency*</label>
                    <input
                      className="form-control"
                      type="text"
                      name="alertfrequency"
                      placeholder="Alert Frequency"
                    />
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Starting Date*</label>
                        <input className="form-control" type="date" name="" />
                      </div>
                      <div className="col-sm-6">
                        <label>Repeat Every*</label>
                        <select>
                          <option>1 Month</option>
                          <option>2 Month</option>
                          <option>3 Month</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-8">
                    <label>Description*</label>
                    <textarea className="form-control"></textarea>
                  </div>

                  <div className="col-4">
                    <label>Image*</label>
                    <input className="form-control" type="text" name="" />
                  </div>

                  <div className="col-12 mt-3">
                    <h4>Alert Message</h4>
                    <p className="w-100 mb-3">
                      <span>
                        <input type="checkbox" name="vehicle1" /> Text
                      </span>
                      <span>
                        <input type="checkbox" name="vehicle1" /> Email
                      </span>
                    </p>
                  </div>
                  <div className="col-6">
                    <label>Text Message Alert*</label>
                    <textarea className="form-control"></textarea>
                  </div>

                  <div className="col-6">
                    <label>Email Message Alert*</label>
                    <textarea className="form-control"></textarea>
                  </div>
                </div>

                <div className="modal-footer access">
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
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* modal for add maintainenance */}

      <div
        className="modal fade"
        id="exampleModal11111"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl Edi_Pricing Item_madal">
          <div className="modal-content ">
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
              {/* <h4>Name of Maintenance</h4> */}

              <form onSubmit={submittemplatehomemaintain}>
                <input type="text" name="id" onChange={inputsHandler}></input>
                <div className="row">
                  <div className="col-4">
                    <label>Name of Maintenance*</label>
                    <input
                      className="form-control"
                      type="text"
                      value={statemaintain.maintenancename}
                      name="maintenancename"
                      onChange={inputsHandler}
                      placeholder="Name of Maintenance"
                    />
                  </div>
                  <div className="col-4">
                    <label>Alert Frequency*</label>
                    <input
                      className="form-control"
                      type="text"
                      value={statemaintain.alertfrequency}
                      name="alertfrequency"
                      onChange={inputsHandler}
                      placeholder="Alert Frequency"
                    />
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Starting Date*</label>
                        <input
                          className="form-control"
                          type="date"
                          name="startingdate"
                          value={statemaintain.startingdate}
                          onChange={inputsHandler}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label>Repeat Every*</label>
                        <select
                          name="repeatevery"
                          value={statemaintain.repeatevery}
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
                      name="description"
                      className="form-control"
                      value={statemaintain.description}
                      onChange={inputsHandler}
                    ></textarea>
                  </div>

                  <div className="col-4">
                    <label>Image*</label>
                    <input
                      className="form-control"
                      type="file"
                      name="image"
                      value={statemaintain.image}
                      onChange={inputsHandler}
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <h4>Alert Message</h4>maintenancename
                    <p className="w-100 mb-3">
                      <span>
                        <input
                          type="checkbox"
                          name="alerttext"
                          value={statemaintain.alerttext}
                          onChange={inputsHandler}
                        />{" "}
                        Text
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name="alertemail"
                          value={statemaintain.alertemail}
                          onChange={inputsHandler}
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
                      value={statemaintain.textmessage}
                      onChange={inputsHandler}
                    ></textarea>
                  </div>

                  <div className="col-6">
                    <label>Email Message Alert*</label>
                    <textarea
                      name="emailmessage"
                      className="form-control"
                      value={statemaintain.emailmessage}
                      onChange={inputsHandler}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer access">
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
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Homeinspectioncompleted;
