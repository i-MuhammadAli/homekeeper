import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import MaintainenceTaskList from "./MaintenanceTaskList";
import CustomMaintenanceTask from "./CustomMaintenanceTask";

export const MaintenancePageHeader = ({ back, onCustomMobile }) => {
  const [showCustomMaintenancePage, setShowCustomMaintenancePage] =
    useState(false);

  const [task, setTask] = useState(null);

  const handleCustomAddClick = () => {
    setShowCustomMaintenancePage(true);
  };

  const handleCustomMaintenancePageClose = () => {
    setShowCustomMaintenancePage(false);
    setTask("");
  };

  return (
    <>
      <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 pt-9 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div
            className="flex items-center sm:w-9 sm:h-8 w-6 h-6 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800 sm:mr-4 mr-2"
            onClick={back}
          >
            <FaArrowLeftLong className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer sm:ml-2 ml-1 text-white" />
          </div>
          <div className="sm:text-3xl text-lg font-bold text-black">
            Maintenance Items
          </div>
        </div>

        <div className="sm:hidden flex flex-row items-center">
          <button
            onClick={onCustomMobile}
            className="bg-sky-500 border text-white px-1 py-1 text-sm rounded font-semibold flex items-center button_color"
          >
            <FaPlus className="h-3 mr-1" />
            Create custom Item
          </button>
        </div>

        <div className="sm:flex hidden flex-row space-x-1">
          <button
            onClick={handleCustomAddClick}
            className="bg-sky-500 border text-white px-2 py-2 text-sm rounded font-semibold flex items-center button_color"
          >
            <FaPlus className="h-3 mr-1" />
            Create custom Item
          </button>
        </div>
      </div>

      {showCustomMaintenancePage && (
        <>
          <CustomMaintenanceTask
            task={task}
            onClose={handleCustomMaintenancePageClose}
          />
        </>
      )}
    </>
  );
};

export const MaintenanceTaskSection = ({ onCustomMobile }) => {
  const [showCustomMaintenancePage, setShowCustomMaintenancePage] =
    useState(false);
  const [task, setTask] = useState(null);

  const handleCustomClick = (task) => {
    setTask(task);
    setShowCustomMaintenancePage(true);
  };

  const handleCustomMaintenancePageClose = () => {
    setShowCustomMaintenancePage(false);
    setTask("");
  };
  return (
    <>
      <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 mt-3 mb-6 bg-white flex sm:flex-row flex-col border rounded">
        <MaintainenceTaskList title="Add Maintenance Items" type="add" />
        <MaintainenceTaskList
          title="Current Maintenance Items"
          type="current"
          onEdit={handleCustomClick}
          onEditMobile={onCustomMobile}
          onClose={handleCustomMaintenancePageClose}
        />
      </div>
      {showCustomMaintenancePage && (
        <>
          <CustomMaintenanceTask
            task={task}
            onClose={handleCustomMaintenancePageClose}
          />
        </>
      )}
    </>
  );
};

const MaintenanceTasksPage = ({ back, onCustomMobile }) => {
  return (
    <div style={{ background: "#f2f7f9" }}>
      <MaintenancePageHeader back={back} onCustomMobile={onCustomMobile} />
      <MaintenanceTaskSection onCustomMobile={onCustomMobile} />
    </div>
  );
};

export default MaintenanceTasksPage;
