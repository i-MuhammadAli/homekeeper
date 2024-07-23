import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header2";
import {
  editAgentRequestHistory,
  setShowCompletePropertyList,
  setShowClientDetails,
  setShowCientPreview,
  setViewClientData,
  setCandidateMaintenanceTask,
  setShowMaintenanceTaskPage,
  testSendEmail,
  setViewClientAgentInfo,
} from "../../store";
import { calculateCandidateTasks } from "./ViewClientList";
import Loader from "../loader_folder/Loader";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const propertyList = useSelector((state) => {
    return state.propertyList;
  });

  const { data: agentRequests, propertyLevel } = useSelector((state) => {
    return state.agentRequests;
  });

  const agent = useSelector((state) => {
    return state.profile.data;
  });

  const maintenanceTasks = useSelector((state) => {
    return state.maintenanceTasks.data;
  });

  const propertyMaintenanceTasks = useSelector((state) => {
    return state.propertiesMainTasks.data;
  });

  const handleCheckRequest = (item) => {
    // console.log(item);
    const formData = new FormData();
    formData.append("id", item.id);
    formData.append("completed", !item.completed ? 1 : 0);
    dispatch(editAgentRequestHistory(formData));
  };

  const handlePropertyClick = (id) => {
    const property = propertyList.data.find((item) => item.id === id);
    // console.log(property);
    dispatch(setViewClientData(property));
    dispatch(
      setViewClientAgentInfo({
        agentName: agent.name,
        agentProfileImg: agent.profileimg,
        agentId: agent.id,
        company: agent.company,
        email: agent.email,
        phone: agent.phone,
      })
    );
    dispatch(
      setCandidateMaintenanceTask(
        calculateCandidateTasks(id, maintenanceTasks, propertyMaintenanceTasks)
      )
    );

    dispatch(setShowCompletePropertyList(false));
    dispatch(setShowCientPreview(false));
    dispatch(setShowMaintenanceTaskPage(false));
    dispatch(setShowClientDetails(true));
    navigate("/myclientlist");
  };

  const handleAllClientsClick = () => {
    dispatch(setShowCientPreview(false));
    dispatch(setShowClientDetails(false));
    dispatch(setShowMaintenanceTaskPage(false));
    dispatch(setShowCompletePropertyList(true));
    navigate("/myclientlist");
  };

  const handleTestEmail = () => {
    dispatch(testSendEmail());
  };

  const lastRequest = (id) => {
    if (propertyLevel.hasOwnProperty(id)) return propertyLevel[id][0].date;
    return "-";
  };

  if (propertyList.isLoading) {
    // console.log("loading .....");
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div
        style={{ background: "#f2f7f9" }}
        className="max-w-screen-xl mx-auto"
      >
        <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 pt-10 pb-10">
          <div className="sm:hidden flex flex-col space-y-1">
            <div className="flex justify-center font-semibold text-4xl mb-4 info_style">
              {agent.name}
            </div>
            <button
              onClick={() => navigate("/addclient/")}
              className="bg-sky-500 border text-white px-3 py-3 text-md rounded font-bold flex items-center button_color"
            >
              <i className="fa-solid fa-user-plus mr-1"></i> ADD CLIENT
            </button>
            <button
              onClick={() => navigate("/sendinvite")}
              className="bg-sky-500 border text-white px-2 py-2 text-md rounded font-semibold flex items-center button_color mb-2"
            >
              + Invite People (Receive Credit)
            </button>
          </div>

          <div className="flex sm:flex-row flex-col sm:space-x-6">
            <div className="flex flex-col overflow-hidden lg:w-1/2 bg-white border rounded">
              <div className="flex flex-row bg-gray-600 mb-3">
                <div className="font-bold text-sm my-2.5 mx-2.5 text-white">
                  CLIENT REQUESTS ({agentRequests.length})
                </div>
              </div>
              <div>
                {agentRequests.length > 0 &&
                  agentRequests.slice(0, 7).map((item) => {
                    return (
                      <div
                        className="mx-3 mb-1 border rounded-sm info_style bg-white"
                        key={item.id}
                      >
                        <div className="flex flex-row items-center m-2.5 justify-between">
                          <div className="flex flex-row items-center">
                            <input
                              className="h-4 w-4 rounded hover:cursor-pointer"
                              type="checkbox"
                              value={item.completed}
                              checked={item.completed}
                              onChange={() => handleCheckRequest(item)}
                            />
                            <div className="ml-2 text-sm">
                              <span
                                className="mr-1 hover:cursor-pointer"
                                style={{ color: "#419fdd", fontWeight: 500 }}
                                onClick={() =>
                                  handlePropertyClick(item.property_id)
                                }
                              >
                                {item.fname}
                              </span>
                              {item.request_text}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.date}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {(!agentRequests || agentRequests.length === 0) && (
                  <div className="mx-3 mb-1 bg-white info_style custom_italic">
                    You have no requests!
                  </div>
                )}

                {agentRequests.length > 0 && (
                  <div className="flex flex-row mt-3 mx-3 mb-2 justify-end">
                    <button
                      className="bg-sky-500 border text-white px-2 py-2 text-sm rounded flex items-center button_color"
                      onClick={() => navigate("/requests")}
                    >
                      See All Requests
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/2 sm:flex hidden">
              <div className="ml-6 mt-10">
                <button
                  onClick={() => navigate("/addclient/")}
                  className="bg-sky-500 border text-white px-3 py-3 text-md rounded font-bold flex items-center button_color"
                >
                  <i className="fa-solid fa-user-plus mr-1"></i> ADD CLIENT
                </button>
                <button
                  onClick={() => navigate("/sendinvite")}
                  className="bg-sky-500 border text-white px-2 py-2 text-md rounded font-semibold flex items-center button_color mt-2"
                >
                  + Invite People (Receive Credit)
                </button>
                {/* <button
                  onClick={handleTestEmail}
                  className="bg-sky-500 border text-white px-2 py-2 text-md rounded font-semibold flex items-center button_color"
                >
                  Test Email
                </button> */}
              </div>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col mt-4 sm:space-x-6">
            <div className="flex flex-col overflow-hidden sm:w-1/2 bg-white border rounded max-h-24">
              <div className="flex flex-row bg-gray-600 mb-3">
                <div className="font-bold text-sm my-2.5 mx-2.5 text-white">
                  REFINANCE OPTIONS
                </div>
              </div>
              <div>
                <div className="flex flex-row mx-3 text-blue-500">
                  In The Works...Coming Soon!
                </div>
              </div>
            </div>
            <div className="sm:hidden mt-4"></div>
            <div className="flex flex-col overflow-hidden sm:w-1/2 bg-white border rounded">
              <div className="flex flex-row bg-gray-600 mb-3">
                <div className="font-bold text-sm my-2.5 mx-2.5 text-white">
                  CLIENT LIST ({propertyList.data.length})
                </div>
              </div>
              <div className="flex flex-col sm:mx-3">
                {propertyList.data.length > 0 && (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-2 text-sm font-medium text-gray-500"
                        >
                          Client
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-sm font-medium text-gray-500"
                        >
                          Partner
                        </th>
                        {/* <th
                          scope="col"
                          className="px-4 py-2 text-sm font-medium text-gray-500"
                        >
                          Last Login
                        </th> */}
                        <th
                          scope="col"
                          className="px-4 py-2 text-sm font-medium text-gray-500"
                        >
                          Last Request
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {propertyList.data.slice(0, 7).map((item) => {
                        return (
                          <tr key={item.id} className="text-sm">
                            <td className="px-4 py-2">
                              <span
                                className="hover:cursor-pointer"
                                style={{ color: "#419fdd", fontWeight: 500 }}
                                onClick={() => handlePropertyClick(item.id)}
                              >
                                {item.fname} {item.lname}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              {item.partnerfname && item.partnerfname !== "null"
                                ? item.partnerfname
                                : "-"}
                            </td>
                            {/* <td className="px-4 py-2">25 Oct</td> */}
                            <td className="px-4 py-2">
                              {lastRequest(item.id)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                {(!propertyList || propertyList.data.length === 0) && (
                  <div className="mx-1 mb-3 bg-white info_style custom_italic">
                    You have no clients! Click on Add Client button to add one!
                  </div>
                )}
                {propertyList.data.length > 0 && (
                  <div className="flex flex-row mt-3 mb-2 justify-end">
                    <button
                      className="bg-sky-500 border text-white px-2 py-2 text-sm rounded button_color"
                      onClick={handleAllClientsClick}
                    >
                      See All Clients
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col mt-4 sm:space-x-6">
            <div className="flex flex-col overflow-hidden sm:w-1/2 bg-white border rounded">
              <div className="flex flex-row bg-gray-600 mb-3">
                <div className="font-bold text-sm my-2.5 mx-2.5 text-white">
                  SEE WHAT YOUR CLIENTS ARE DOING
                </div>
              </div>
              <div>
                <div className="flex flex-row mx-3 mb-3 text-blue-500">
                  In The Works...Coming Soon!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <section className="agent_dashboard">
          <div className="container">
            <div className="flex flex-row bg-gray-600 rounded col-sm-5 mb-3">
              <div className="font-extrabold text-md my-2.5 mx-3 text-white">
                CLIENT REQUESTS
              </div>
            </div>
            <div className="row strow">
              <div className="col-sm-5">
                {agentRequests.slice(0, 7).map((item) => {
                  return (
                    <div
                      className="mb-1 border rounded-sm info_style bg-white"
                      key={item.id}
                    >
                      <div className="flex flex-row items-center m-2.5 justify-between">
                        <div className="flex flex-row items-center">
                          <input
                            className="h-4 w-4 rounded"
                            id=""
                            type="checkbox"
                            value={item.completed}
                            checked={item.completed}
                            onChange={() => handleCheckRequest(item)}
                          />
                          <div className="ml-2 text-sm">
                            <span
                              className="mr-1 hover:cursor-pointer"
                              style={{ color: "#419fdd", fontWeight: 500 }}
                              onClick={() =>
                                handlePropertyClick(item.property_id)
                              }
                            >
                              {item.fname}
                            </span>
                            {item.request_text}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">{item.date}</div>
                      </div>
                    </div>
                  );
                })}
                <div className="row mb-4">
                  <div className="col-sm-12 mt-4">
                    <a className="seeall" href="#">
                      See All Requests
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-7">
                <ul className="adlist">
                  <li>
                    <Link className="ad" to={"/agent/addclient/"}>
                      {" "}
                      <i className="fa-solid fa-user-plus"></i> Add Client
                    </Link>
                  </li>
                  <li>
                    <Link to={"/sendinvite"}>
                      + Invite People (Receive Credit)
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-sm-5">
                <h3>
                  Refinance Options <a href="#">Edit Display Options</a>
                </h3>
                <div className="table-responsive mb-4">
                  <table className="table">
                    <tr>
                      <td>Amy Jhones</td>
                      <td>23% Equity </td>
                      <td>PIM $123</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="col-sm-7">
                <h3>
                  Client List ({propertyList.data.length})
                  <form>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search Keyword"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </form>
                </h3>
                <div className="table-responsive mb-4">
                  <table className="table">
                    <tr>
                      <th className="text-sm">Client Name</th>
                      <th className="text-sm">Partner Name</th>
                      <th className="text-sm">Last Login</th>
                      <th className="text-sm">Last Requested</th>
                    </tr>
                    {propertyList.data.slice(0, 5).map((item, i) => {
                      return (
                        <>
                          <tr key={item.id} className="text-sm">
                            <td>
                              <span
                                className="hover:cursor-pointer"
                                style={{ color: "#419fdd", fontWeight: 500 }}
                                onClick={() => handlePropertyClick(item.id)}
                              >
                                {item.fname} {item.lname}
                              </span>
                            </td>
                            <td>
                              {item.partnerfname && item.partnerfname !== "null"
                                ? item.partnerfname
                                : "-"}
                            </td>
                            <td>25 Oct</td>
                            <td>{lastRequest(item.id)}</td>

                          </tr>
                        </>
                      );
                    })}
                  </table>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <Link className="seeall" to={"/myclientlist"}>
                      {" "}
                      See All Client List
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-5">
                <h3>See what your clients are doing</h3>
                <ul className="list list2">
                  <li>
                    <span className="rc" style={{ background: "#5ad7c8" }}>
                      <i className="fa-solid fa-arrow-up"></i>
                    </span>{" "}
                    <b>Mark</b> Requested lender for quote{" "}
                    <span>Now 1, 2021</span>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-sm-12">
                    <a className="seeall" href="#">
                      See All Client List
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
