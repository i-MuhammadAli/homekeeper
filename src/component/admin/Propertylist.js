import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../admin/Header";
import Sidebar from "../admin/sidebar";
import DataTable from "react-data-table-component";
import { PaginationControl } from "react-bootstrap-pagination-control";
import "bootstrap/dist/css/bootstrap.min.css";

function Propertylist() {
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  const [persons, maintainencetemplateobj] = useState([
    // agentname:"",
    //         lender: "",
    //         ownername: "",
    //         partnername: "",
    //         homeinspector: "",
    //         home_var: "",
  ]);

  const [persons1, setpersons] = useState([]);
  const [page, setPage] = useState(1);

  const [state, setState] = useState({
    agentname: "",
    lendername: "",
    ownername: "",
    partnername: "",
    homeinspector: "",
    homevalue: "",
  });

  const [insertmessage, setmessage] = useState([]);

  const columns = [
    {
      name: "No",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Agent Name",
      selector: (row) => row.agentname,
      sortable: true,
    },
    {
      name: "Lender",
      selector: (row) => row.lender,
      sortable: true,
    },
    {
      name: "Owner Name",
      selector: (row) => row.ownername,
      sortable: true,
    },
    {
      name: "Partner Name",
      selector: (row) => row.partnername,
      sortable: true,
    },
    {
      name: "Home Inspector",
      selector: (row) => row.homeinspector,
      sortable: true,
    },
    {
      name: "Purchased Date",
      selector: (row) => row.purchased_date,
      sortable: true,
    },
    {
      name: "Home value",
      selector: (row) => row.home_var,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      // sortable: true,
    },
  ];

  const submittemplate = (event) => {
    event.preventDefault();
    updateDetailstoServer();
  };

  const submittemplatehomemaintain = (event) => {
    event.preventDefault();
    addDetailstoServer();
  };

  // const [stateforid, setState] = useState('');
  // const [stateforname, setState0] = useState('');
  // const [statefordescription, setState1] = useState('');

  const inputsHandler = (e) => {
    // if (e.target.name == 'id') {
    //     setState(e.target.value);
    // }
    // if (e.target.name == 'maintenancename') {
    //     setState0(e.target.value);
    // }
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitClick = (
    id,
    agentname,
    lendername,
    ownername,
    partnername,
    homeinspector,
    homevalue
  ) => {
    var id = id;
    var agentname = agentname;
    var lendername = lendername;
    var ownername = ownername;
    var partnername = partnername;
    var homeinspector = homeinspector;
    var homevalue = homevalue;
    var globaldata = {
      id: id,
      agentname: agentname,
      lendername: lendername,
      ownername: ownername,
      partnername: partnername,
      homeinspector: homeinspector,
      homevalue: homevalue,
    };
    // setState(id);
    setState(globaldata);
  };

  const sendDetailsToServer = async () => {
    axios
      .post("https://admin.myhomekeeper.co/api/homekeeperpropertylistadmin")
      .then(function (response) {
        console.log("response", response.data.propertylist);
        // Setdata(response.data.getplans);
        // this.setState({data: data.conversations});
        if (response.data.status == "success") {
          const maintainencetemplate = response.data.propertylist;
          console.log("thismaintaintemplate", maintainencetemplate);
          let data = [];

          for (let index = 0; index < maintainencetemplate.length; index++) {
            data.push({
              id: index + 1,
              agentname: maintainencetemplate[index].agentname,
              lender: maintainencetemplate[index].lendername,
              ownername: maintainencetemplate[index].fname,
              partnername: maintainencetemplate[index].partnerfname,
              homeinspector: maintainencetemplate[index].inspectorname,
              purchased_date: maintainencetemplate[index].whenbuy,
              home_var: "$" + maintainencetemplate[index].homevalue,
              address: maintainencetemplate[index].address,

              action: (
                <Link
                  to={
                    "/admin/adminreviewclient/" +
                    maintainencetemplate[index].draftid
                  }
                  onClick={() => {
                    handleSubmitClick(
                      maintainencetemplate[index].id,
                      maintainencetemplate[index].agentname,
                      maintainencetemplate[index].lendername,
                      maintainencetemplate[index].fname,
                      maintainencetemplate[index].partnerfname,
                      maintainencetemplate[index].inspectorname,
                      maintainencetemplate[index].homevalue
                    );
                  }}
                  className="pen"
                >
                  <img src="/../adminasset/images/viewic.png" />
                </Link>
              ),
            });
          }
          maintainencetemplateobj(data);
        } else {
          console.log("under error");
        }
      });
  };

  const paginationfunction = (page) => {
    alert(page);
    let formdata = new FormData();
    formdata.append("pagenumber", page);
    // formdata.append('count_per_page', optionvalue);

    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeepergetalluserslistpaginate",
        formdata
      )
      .then((response) => {
        const personss = response.data.getuserlists;
        console.log("persondata", personss);
        let data = [];
        for (let index = 0; index < personss.length; index++) {
          data.push({
            id: index + 1,
            username: (
              <Link to={"/admin/usersingle/" + personss[index].id}>
                {personss[index].name}
              </Link>
            ),
            usertype: personss[index].usertype,
            pays: "08-07-2022",
            accountstatus: (
              <Link
                to={"/admin/usersingle/" + personss[index].id}
                className="regi"
              >
                Registered
              </Link>
            ),
            phone: personss[index].cellnumber,
            emailaddress: personss[index].email,
          });
        }

        setpersons(data);
        // setpersonscount(data.length)
        console.log("thisdataforadminlist", data);
      });
  };

  const addDetailstoServer = () => {
    console.log("insert iniated");
  };

  const updateDetailstoServer = () => {
    const userid = localStorage.getItem("token-info");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    // event.preventDefault();
    let formdata = new FormData();
    formdata.append("userid", state.id);
    formdata.append("agentname", state.agentname);
    formdata.append("lendername", state.lendername);
    formdata.append("ownername", state.ownername);
    formdata.append("partnername", state.partnername);
    formdata.append("homeinspector", state.homeinspector);
    formdata.append("homevalue", state.homevalue);
    formdata.append("insertedtime", today);

    // formdata.append('templatedescription', dtsa1);
    console.log("thisformdata", formdata);
    axios
      .post(
        "https://admin.myhomekeeper.co/api/homekeeperupdatepropertylistbyadmin",
        formdata
      )
      .then(function (response) {
        console.log("response", response.data);
        if (response.data.status == "success") {
          const message1 = response.data.message;

          setmessage(message1);
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

  const submitproperty = (e) => {
    e.preventDefault();

    // alert("hi");
    updateDetailstoServer();
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
            {insertmessage}
            <h2>
              <a className="filter" href="#">
                <i className="fa-solid fa-filter"></i>
                <i className="fa-solid fa-xmark"></i>
              </a>{" "}
              Property List
              <span className="main_spn hh">
                <span className="show">
                  Show : <label>10 entries</label>
                </span>
              </span>
            </h2>
            <div className="table-responsive">
              <table className="table pry_list">
                <DataTable
                  // pagination
                  columns={columns}
                  data={persons}
                />
              </table>

              <div className="row">
                <div className="col-sm-5">
                  <p className="pb-0 pt-2">{page ? page : 1} of 1</p>
                </div>
                <div className="col-sm-7">
                  <PaginationControl
                    page={page}
                    between={4}
                    total={1}
                    limit={10}
                    changePage={(page) => {
                      setPage(page);

                      console.log(page);
                    }}
                    ellipsis={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* modal start */}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg Edi_Pricing">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Property
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h4>Property/Client</h4>

              <form onSubmit={submitproperty}>
                <input
                  type="hidden"
                  name="userid"
                  onChange={inputsHandler}
                  value={state.id}
                />
                <div className="row">
                  <div className="col-6">
                    <label>Agent Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="agentname"
                      value={state.agentname}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="col-6">
                    <label>Lender Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lendername"
                      value={state.lendername}
                      onChange={inputsHandler}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label>Owner Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="ownername"
                      value={state.ownername}
                      onChange={inputsHandler}
                    />
                  </div>
                  <div className="col-6">
                    <label>Partner Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="partnername"
                      value={state.partnername}
                      onChange={inputsHandler}
                    />
                  </div>

                  <div className="col-6">
                    <label>homeinspector</label>
                    <input
                      className="form-control"
                      type="text"
                      name="homeinspector"
                      value={state.homeinspector}
                      onChange={inputsHandler}
                    />
                  </div>

                  <div className="col-6">
                    <label>Homevalue</label>
                    <input
                      className="form-control"
                      type="text"
                      name="homevalue"
                      value={state.homevalue}
                      onChange={inputsHandler}
                    />
                  </div>
                </div>

                <div className="modal-footer p-0 mt-3">
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
            {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Save Changes</button>
                    </div> */}
          </div>
        </div>
      </div>

      {/* modal end */}
    </>
  );
}
export default Propertylist;
