import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editAgentRequestHistory,
  setShowCompletePropertyList,
  setShowClientDetails,
  setViewClientData,
  setCandidateMaintenanceTask,
  setViewClientAgentInfo,
} from "../../store";
import { calculateCandidateTasks } from "./ViewClientList";

function ClientRequestList({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const propertyList = useSelector((state) => {
    return state.propertyList;
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
    dispatch(setShowClientDetails(true));
    navigate("/myclientlist");
  };

  return (
    <div className="mt-4 sm:mr-20 sm:ml-20 mr-2 ml-2">
      <div className="bg-white border rounded pb-4 pt-4">
        {data.map((item) => {
          return (
            <div
              className="mx-3 border rounded-sm info_style bg-white mb-2"
              key={item.id}
            >
              <div className="flex flex-row items-center m-3 justify-between">
                <div className="flex flex-row items-center">
                  <input
                    className="h-5 w-5 rounded hover:cursor-pointer"
                    type="checkbox"
                    value={item.completed}
                    checked={item.completed}
                    onChange={() => handleCheckRequest(item)}
                  />
                  <div className="ml-2 text-md">
                    <span
                      className="mr-1 hover:cursor-pointer"
                      style={{ color: "#419fdd", fontWeight: 500 }}
                      onClick={() => handlePropertyClick(item.property_id)}
                    >
                      {item.fname}
                    </span>
                    {item.request_text}
                  </div>
                </div>
                <div className="text-sm text-gray-400">{item.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClientRequestList;
