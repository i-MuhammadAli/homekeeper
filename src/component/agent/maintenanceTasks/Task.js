import { useSelector, useDispatch } from "react-redux";

import { FaPencilAlt, FaTrashAlt, FaPlus } from "react-icons/fa";
import {
  postPropertyMaintenanceTask,
  removeCandidateMaintenanceTask,
  deletePropertyMaintenanceTask,
  addCandidateMaintenanceTask,
  removeTempCandidateMaintenanceTask,
  addTempCandidateMaintenanceTask,
} from "../../../store";
import { localeDateString } from "../../../utils/helpers";

const Task = ({ type, item, onTaskEdit, onTaskEditMobile }) => {
  const dispatch = useDispatch();

  const maintenanceTasks = useSelector((state) => {
    return state.maintenanceTasks.data;
  });

  const draftId = useSelector((state) => {
    return String(state.clientForm.form.id);
  });

  const createFormData = (task) => {
    let formdata = new FormData();
    let alertFrequency = task.alert_frequency;
    let repeatEvery = task.repeat_every;
    const start_date = new Date();
    start_date.setDate(start_date.getDate() + 1);

    formdata.append("type", "default");
    formdata.append("task_id", task.id);
    formdata.append("alert_frequency", task.alert_frequency);
    formdata.append("repeat_every", task.repeat_every);
    formdata.append("alert_option", "no"); // by default
    formdata.append("draft_property_id", draftId);

    if (start_date && alertFrequency && repeatEvery) {
      let due;
      // for tasks with preset dates
      console.log("task date", task.start_date);
      if (task.start_date) {
        console.log("task date exists");
        console.log(task.start_date);

        const today = new Date();
        due = new Date(task.start_date);
        due.setFullYear(today.getFullYear());

        console.log(due);

        if (due < today) {
          due.setFullYear(today.getFullYear() + 1);
        }
      } else {
        if (alertFrequency === "date") {
          due = new Date(task.due_date);
          due.setDate(due.getDate() + 1);
        } else {
          due = start_date;
          due.setDate(due.getDate() + 1);
        }
      }

      due = localeDateString(due);
      formdata.append("due_date", due);
      console.log(due);
    }

    formdata.append("start_date", localeDateString(start_date));
    console.log(localeDateString(start_date));
    return formdata;
  };

  const handleAddMaintenanceItem = () => {
    const formData = createFormData(item);
    dispatch(postPropertyMaintenanceTask(formData));
    draftId
      ? dispatch(removeTempCandidateMaintenanceTask(item))
      : dispatch(removeCandidateMaintenanceTask(item));
  };

  const handleDeleteMaintainenceItem = () => {
    const task = maintenanceTasks.find((task) => task.id == item.task_id);
    dispatch(deletePropertyMaintenanceTask(item));
    draftId
      ? dispatch(addTempCandidateMaintenanceTask(task))
      : dispatch(addCandidateMaintenanceTask(task));
  };

  const handleEditMaintainenceAlert = () => {
    onTaskEdit(item);
  };

  const handleEditMaintainenceAlertMobile = () => {
    onTaskEditMobile(item);
  };

  return (
    <>
      {type === "add" && (
        <div className="sm:mr-3 sm:ml-3 mr-2 ml-2 mb-2 border rounded bg-white">
          <div className="flex flex-row items-center m-2.5 justify-between">
            <div className="flex-grow w-4/5">
              <div className="sm:text-lg text-sm maintenance_item_name">
                {item.taskname}
              </div>
              <div className="sm:text-sm text-xs maintenance_item_desc my-1 whitespace-nowrap overflow-hidden text-ellipsis">
                {item.description}
              </div>
            </div>
            <div className="text-xs text-gray-400 flex-shrink-0 ml-2">
              <button
                className="flex items-center border text-white px-1 py-1 bg-gray-500 cursor-pointer rounded hover:bg-gray-800"
                onClick={handleAddMaintenanceItem}
              >
                <FaPlus className="sm:w-5 sm:h-4 w-4 h-3 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
      {type === "current" && (
        <div className="sm:mr-3 sm:ml-3 mr-2 ml-2 mb-2 border rounded bg-white">
          <div className="flex flex-row items-center mx-2.5 mt-2.5 justify-between">
            <div className="flex-grow w-2/4">
              <div className="sm:text-lg text-sm maintenance_item_name">
                {item.taskname}
              </div>
            </div>
            <div className="bg-gray-600 rounded items-center">
              <div className="sm:flex hidden p-1 text-white font-semibold text-xs">
                Due on: {item.due_date}
              </div>
              <div className="sm:hidden flex p-1 text-white font-semibold text-xs">
                {item.due_date}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center mx-2.5 mb-2.5 mt-2 justify-between">
            <div className="flex-grow w-4/5">
              <div className="sm:text-sm text-xs maintenance_item_desc whitespace-nowrap overflow-hidden text-ellipsis">
                {item.description}
              </div>
            </div>
            <div className="flex flex-row text-xs text-gray-400 flex-shrink-0 ml-2">
              <button
                className="sm:flex hidden items-center border text-white px-1 py-1 bg-gray-500 cursor-pointer rounded hover:bg-gray-800"
                onClick={handleEditMaintainenceAlert}
              >
                <FaPencilAlt className="w-4 h-3 text-white" />
              </button>
              <button
                className="sm:hidden flex items-center border text-white px-1 py-1 bg-gray-500 cursor-pointer rounded hover:bg-gray-800"
                onClick={handleEditMaintainenceAlertMobile}
              >
                <FaPencilAlt className="w-4 h-3 text-white" />
              </button>
              <button
                className="flex items-center border text-white px-1 py-1 bg-gray-500 cursor-pointer rounded hover:bg-gray-800 ml-1"
                onClick={handleDeleteMaintainenceItem}
              >
                <FaTrashAlt className="w-4 h-3 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
    // <li>
    //   <>
    //     <h6 className="flex col-sm-12">
    //       {item.taskname}
    //       {type !== "add" && (
    //         <div className=" col-sm-5 text-black">
    //           <p
    //             className="bg-green-200 w-fit flex rounded-full mb-2 ml-2 p-1 text-black"
    //             style={{ fontSize: "10px" }}
    //           >
    //             Due on: {item.due_date}
    //           </p>
    //         </div>
    //       )}
    //     </h6>
    //     <p className="trim_class_contain">{item.description}</p>

    //     <div>
    //       {type === "add" ? (
    //         <FaPlus
    //           onClick={handleAddMaintenanceItem}
    //           className="w-4 h-4 text-green-500 cursor-pointer hover:text-sky-800 btns"
    //         />
    //       ) : (
    //         <div className="btns">
    //           <FaPencilAlt
    //             onClick={handleEditMaintainenceAlert}
    //             className="w-4 h-4 text-sky-600 cursor-pointer hover:text-sky-800 mr-2"
    //           />
    //           <FaTrashAlt
    //             onClick={handleDeleteMaintainenceItem}
    //             className="w-4 h-4 text-red-600 cursor-pointer hover:text-red-800"
    //           />
    //         </div>
    //       )}
    //     </div>
    //   </>
    // </li>
  );
};

export default Task;
