import { useSelector, useDispatch } from "react-redux";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  setShowCompletePropertyList,
  setShowClientDetails,
  setViewClientData,
  setCandidateMaintenanceTask,
  setViewClientAgentInfo,
} from "../../store";
import { useState } from "react";
import InputBox from "../common/InputBox";
import HomeButton from "../common/HomeButton";

export const calculateCandidateTasks = (
  propertyId,
  maintenanceTasks,
  propertyMaintenanceTasks
) => {
  // console.log(propertyId, maintenanceTasks, propertyMaintenanceTasks);

  if (
    !propertyMaintenanceTasks.hasOwnProperty(propertyId) ||
    (propertyMaintenanceTasks.hasOwnProperty(propertyId) &&
      propertyMaintenanceTasks[propertyId].length === 0)
  ) {
    return maintenanceTasks;
  } else {
    const valuesArr2 = propertyMaintenanceTasks[propertyId].map(
      (obj) => obj["task_id"]
    );
    const result = maintenanceTasks.filter(
      (obj) => !valuesArr2.includes(obj["id"])
    );
    return result;
  }
};

function ViewClientList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const agent = useSelector((state) => {
    return state.profile.data;
  });

  const { data } = useSelector((state) => {
    return state.propertyList;
  });

  const lenders = useSelector((state) => {
    return state.lenders;
  });

  const inspectors = useSelector((state) => {
    return state.inspectors;
  });

  const titles = useSelector((state) => {
    return state.titles;
  });

  const maintenanceTasks = useSelector((state) => {
    return state.maintenanceTasks.data;
  });

  const propertyMaintenanceTasks = useSelector((state) => {
    return state.propertiesMainTasks.data;
  });

  const columns = [
    {
      name: "OWNER NAME",
      selector: (row) => row.fname + " " + row.lname,
      sortable: true,
    },
    {
      name: "PARTNER NAME",
      selector: (row) =>
        row.partnerfname ? row.partnerfname + " " + row.partnerlname : "-",
      sortable: true,
    },
    {
      name: "PURCHASED DATE",
      selector: (row) => row.whenbuy,
      sortable: true,
    },
    {
      name: "LENDER",
      selector: (row) =>
        row.lender_selected_id
          ? lenders.data.find((item) => item.id === row.lender_selected_id)
              ?.name
          : "-",
      sortable: true,
    },
    {
      name: "HOME INSPECTOR",
      selector: (row) =>
        row.inspectorid
          ? inspectors.data.find((item) => item.id === row.inspectorid)?.name
          : "-",
      sortable: true,
    },

    {
      name: "TITLE",
      selector: (row) =>
        row.titlecompanyid
          ? titles.data.find((item) => item.id === parseInt(row.titlecompanyid))
              ?.name
          : "-",
      sortable: true,
    },
  ];

  const handleRowClick = (rowData) => {
    // console.log(rowData);
    // rowData["agentName"] = agent.name;
    // rowData["agentProfileImg"] = agent.profileimg;
    dispatch(setViewClientData(rowData));
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

    dispatch(setShowCompletePropertyList(false));
    dispatch(setShowClientDetails(true));
    dispatch(
      setCandidateMaintenanceTask(
        calculateCandidateTasks(
          rowData.id,
          maintenanceTasks,
          propertyMaintenanceTasks
        )
      )
    );
  };

  const searchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredData = [];
  if (searchTerm) {
    const data1 = data.filter((item) =>
      item.fname.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    const data2 = data.filter((item) =>
      item.lname.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    filteredData = data1.concat(data2);
  } else filteredData = data;

  return (
    <>
      <div style={{ background: "#f2f7f9" }}>
        <div className="flex flex-row justify-between sm:mr-20 sm:ml-20 mr-2 ml-2 pt-9 items-center">
          <div className="sm:text-3xl text-lg font-bold">
            Client List ({data.length})
          </div>
          <div className="flex flex-row items-center">
            <InputBox
              searchText
              className="mr-1"
              placeholder="Search Keyword"
              value={searchTerm}
              onChange={searchTermChange}
            />
            {/* <div className="flex items-center w-10 h-9 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800">
              <HiHome
                className="w-8 h-6 text-white cursor-pointer ml-1"
                onClick={() => navigate("/")}
              />
            </div> */}
            <HomeButton />
          </div>
        </div>
        <div className="mt-4 sm:mr-20 sm:ml-20 mr-2 ml-2 pb-10">
          <DataTable
            className="testingg"
            pagination
            columns={columns}
            data={filteredData}
            noHeader={true}
            highlightOnHover
            onRowClicked={handleRowClick}
          />
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
export default ViewClientList;
