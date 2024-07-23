import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillXCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import {
  editPropertyMaintenanceTask,
  postPropertyMaintenanceTask,
  deletePropertyMaintenanceTask,
} from "../../../store";
import { localeDateString, truncateText } from "../../../utils/helpers";

const ClientMaintenanceTasks = () => {
  const dispatch = useDispatch();
  // const { maintenanceTasks } = useSelector((state) => {
  //   return state.myProperties;
  // });

  const propertyMainTasks = useSelector((state) => {
    return state.homeOwnerMaintenanceTasks.data;
  });

  const propertyId = useSelector((state) => {
    return state.myProperties.data.id;
  });

  let maintenanceTasks = [];
  if (propertyMainTasks) {
    maintenanceTasks = [...propertyMainTasks].sort((a, b) => {
      return new Date(a.due_date) - new Date(b.due_date);
    });
  }

  const [checkedItems, setCheckedItems] = useState({});
  const [ehm, setehm] = useState(0);

  const [currentTask, setCurrentTask] = useState({
    name:
      maintenanceTasks && maintenanceTasks.length > 0
        ? maintenanceTasks[0].taskname
        : "",
    description:
      maintenanceTasks && maintenanceTasks.length > 0
        ? maintenanceTasks[0].description
        : "",
    img:
      maintenanceTasks && maintenanceTasks.length > 0
        ? maintenanceTasks[0].image
        : "",
  });
  const [clickedItem, setClickedItem] = useState(null);

  function customformatDate(date) {
    date = new Date(date);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" }); // Get month name

    // Pad the day with leading zero if it's a single digit
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${month} ${formattedDay}, ${year}`;
  }

  function findItem(item) {
    // console.log(item.taskname, item.id);
    if (maintenanceTasks) {
      for (const task of maintenanceTasks) {
        if (item.taskname === task.taskname && item.id !== task.id) {
          // console.log(task.id, item.id);
          return task;
        }
      }
    }
  }

  function formatTask(formData) {
    let data = formData;
    const alertFrequency = formData.get("alert_frequency");
    const repeatEvery = parseInt(formData.get("repeat_every"));
    const start_date = new Date();
    // start_date.setDate(start_date.getDate());
    let due = new Date(formData.get("due_date"));
    let months = "";

    // console.log(alertFrequency, repeatEvery);

    if (alertFrequency === "monthly") {
      months = due.getMonth() + repeatEvery;
      due.setMonth(months % 12);
      if (months / 12 > 0) {
        due.setFullYear(due.getFullYear() + months / 12);
      }
    } else if (alertFrequency === "yearly") {
      due.setFullYear(due.getFullYear() + repeatEvery);
    }

    data.delete("id");
    data.set("due_date", localeDateString(due));
    data.set("start_date", localeDateString(start_date));
    data.set("status", "pending");
    data.set("draft_property_id", "");
    data.set("property_id", propertyId);
    // console.log(localeDateString(start_date));
    // console.log(localeDateString(due));

    return data;
  }

  const handleCheckboxInputChange = (item) => {
    const formData = new FormData();
    const action = { add: false, delete: false, task: item };
    console.log(item);

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        if (key === "status" && item[key] === "done") {
          formData.append(key, "pending");
          setCheckedItems({ ...checkedItems, [item.id]: false });
          action.delete = true;
          toast.warning("Task reverted to pending!"); //
        } else if (key === "status" && item[key] === "pending") {
          formData.append(key, "done");
          setCheckedItems({ ...checkedItems, [item.id]: true });
          action.add = true;
          toast.success("Task successfully completed!"); //
        } else if (key === "draft_property_id") {
          continue;
        } else if (key === "image") {
          formData.append("name", item[key].split("/").pop());
        } else {
          formData.append(key, item[key]);
        }
      }
    }
    console.log(formData);

    // call edit api with status = completed
    dispatch(editPropertyMaintenanceTask(formData));
    if (action.add && item && item.alert_frequency !== "date") {
      const data = formatTask(formData);
      dispatch(postPropertyMaintenanceTask(data));
    } else if (action.delete && item) {
      dispatch(deletePropertyMaintenanceTask(findItem(item)));
    }
    setClickedItem(null);
  };

  // useEffect to load data once on component mount
  useEffect(() => {
    const setCheckboxState = async () => {
      let array = [];
      if (maintenanceTasks && maintenanceTasks.length > 0) {
        maintenanceTasks.map(
          (item) => (array[item.id] = item.status === "pending" ? false : true)
        );
        setCheckedItems(array);
        // console.log(array);
      }
    };
    setCheckboxState(checkedItems);
  }, [propertyMainTasks]); // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      {(!maintenanceTasks || maintenanceTasks.length === 0) && (
        <div className="overflow-auto info_style text-xs custom_italic">
          No Maintenance tasks set for the property! Add maintenance items using
          the button.
        </div>
      )}
      {maintenanceTasks && maintenanceTasks.length > 0 && (
        <div className="flex sm:flex-row flex-col sm:space-x-3 max-h-96">
          <div className="sm:w-3/5 sm:flex hidden flex-col">
            <div>
              <img
                className="pt-2 h-60 w-60"
                src={currentTask.img}
                alt="img"
                style={{ maxWidth: "-webkit-fill-available" }}
              />
            </div>
            <div className="text-sm mt-2">{currentTask.description}</div>
          </div>

          <div className="overflow-auto sm:w-4/5 flex flex-col">
            <div className="">
              <div className="border rounded-sm">
                {maintenanceTasks.map((item, i) => {
                  const divclass = checkedItems[item.id] ? "line-through" : "";
                  return (
                    <React.Fragment key={item.id}>
                      {item.id !== clickedItem && item.status === "pending" && (
                        <div
                          className="mx-2.5 my-2.5 border rounded-sm info_style bg-gray-50 hover:bg-sky-500 hover:cursor-pointer hover:text-white"
                          key={item.id}
                          onMouseOver={(e) =>
                            setCurrentTask({
                              name: item.taskname,
                              description: item.description,
                              img: item.image,
                            })
                          }
                          onClick={() => {
                            setClickedItem(item.id);
                          }}
                        >
                          <div className="flex flex-row items-center mt-2.5 mx-2.5 justify-between overflow-hidden">
                            <div className="flex flex-row items-center sm:w-4/5 w-3/4">
                              <input
                                className="sm:h-5 sm:w-5 h-4 w-4 rounded hover:cursor-pointer flex-shrink-0"
                                type="checkbox"
                                value={item.id}
                                checked={checkedItems[item.id] || false}
                                onChange={() => {}}
                              />
                              <div className="ml-2 sm:text-lg text-md font-semibold  truncate">
                                <span className="truncate">
                                  {item.taskname}
                                </span>
                              </div>
                            </div>
                            <div className="sm:text-xs text-xs">
                              {item.due_date && customformatDate(item.due_date)}
                            </div>
                          </div>
                          <div className="flex flex-row items-center mb-1 overflow-hidden">
                            <div className="mr-2.5 sm:ml-10 ml-9 sm:text-sm text-xs truncate">
                              <div className="flex flex-row items-center">
                                <span className="truncate">
                                  {truncateText(item.description, 50)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {item.id === clickedItem && (
                        <div
                          className="mx-2.5 my-2.5 border rounded-sm info_style bg-gray-50 hover:bg-sky-500 hover:text-white h-16"
                          key={item.id}
                          onMouseOver={(e) =>
                            setCurrentTask({
                              name: item.taskname,
                              description: item.description,
                              img: item.image,
                            })
                          }
                        >
                          <div className="flex flex-row items-center mt-2 mx-2.5 sm:text-base text-xs overflow-auto whitespace-nowrap">
                            Are you sure you want to mark this item completed?
                          </div>
                          <div className="flex flex-row item-center mx-2.5">
                            <div
                              className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                              onClick={() => handleCheckboxInputChange(item)}
                            >
                              <BsFillCheckCircleFill className=" w-4 h-3 focus:outline-none text-white ml-1" />
                            </div>
                            <div
                              className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                              onClick={() => setClickedItem(null)}
                            >
                              <BsFillXCircleFill className="w-4 h-3 focus:outline-none text-white ml-1" />
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>

    // <div className="row">
    //   {maintenanceTasks && maintenanceTasks.length > 0 ? (
    //     <div className="col-sm-5">
    //       <div className="st1">
    //         <img className="w-150 pt-2" src={currentTask.img} alt="img" />
    //         <h4>{currentTask.taskname}</h4>
    //         <p className=" text-sm">{currentTask.description}</p>
    //       </div>
    //     </div>
    //   ) : (
    //     ""
    //   )}

    //   {!maintenanceTasks ||
    //   (!maintenanceTasks && maintenanceTasks.length === 0) ? (
    //     <h6 className="text-center">
    //       {" "}
    //       No Maintenance tasks set for the property! Click on the link{" "}
    //       <strong>Add Home Maintenance</strong> to get started!
    //     </h6>
    //   ) : (
    //     <div className="col-sm-7">
    //       <div className="st2">
    //         {maintenanceTasks.map((item, i) => {
    //           const divclass = checkedItems[item.id] ? "line-through" : "";
    //           return (
    //             <div key={item.id}>
    //               <div className={`text-sm ${divclass}`}>
    //                 <div
    //                   onMouseOver={(e) =>
    //                     setCurrentTask({
    //                       name: item.taskname,
    //                       description: item.description,
    //                       img: item.image,
    //                     })
    //                   }
    //                   className="one set checkcontainer1"
    //                 >
    //                   <input
    //                     type="checkbox"
    //                     checked={checkedItems[item.id] || false}
    //                     name="taskcheckbox"
    //                     id="taskcheckbox"
    //                     className="quality"
    //                     value={item.id}
    //                     onChange={() => {
    //                       handleCheckboxInputChange(item);
    //                     }}
    //                   />
    //                   <span className="radiobtn"></span>
    //                   <h5>
    //                     {item.taskname}{" "}
    //                     <span>
    //                       {ehm ? (
    //                         <section className="">
    //                           <a href="javascript:void(0)">
    //                             <i
    //                               // onClick={(e) => delete_maintain(items.id)}
    //                               className="fa fa-trash me-1"
    //                             ></i>
    //                             <i
    //                               className="fa fa-pencil me-1"
    //                               data-bs-toggle="modal"
    //                               // onClick={(e) => edit_maintain(items.id)}
    //                               data-bs-target="#editmaintain"
    //                             ></i>
    //                           </a>
    //                         </section>
    //                       ) : (
    //                         ""
    //                       )}
    //                       {item.due_date && customformatDate(item.due_date)}
    //                     </span>
    //                   </h5>
    //                   <p className="trim_class_contain">{item.description}</p>
    //                 </div>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default ClientMaintenanceTasks;
