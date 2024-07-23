import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import createApi from "../../../utils/api";
import Modal from "../../common/Modal";
import ModalTitle from "../../common/ModalTitle";
import {
  editPropertyMaintenanceTask,
  postPropertyMaintenanceTask,
} from "../../../store";
import "tailwindcss/tailwind.css";
import { changeDateFormat, localeDateString } from "../../../utils/helpers";
import axios from "axios";

const CustomMaintenanceTask = ({ task, onClose }) => {
  const api = createApi();
  const dispatch = useDispatch();

  const [type, setType] = useState("custom");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [alertFrequency, setAlertFrequency] = useState("date");
  const [repeatEvery, setRepeatEvery] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState(startDate);
  const [alertOption, setAlertOption] = useState("no");
  const [alertMessage, setAlertMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [editForm, setEditForm] = useState(false);
  const [disableField, setDisableField] = useState("");
  const [file, setFile] = useState();
  const [filename, setFilename] = useState();

  const propertyId = useSelector((state) => {
    return state.client.data.id;
  });

  const userId = useSelector((state) => {
    return state.profile.data.id; //check on this
  });

  const data = useSelector((state) => {
    return state.propertiesMainTasks.data[propertyId];
  });

  const draftId = useSelector((state) => {
    return state.clientForm.form.id;
  });

  const formattedDate = (date) => {
    // change mm-dd-yyyy to yyyy-mm-dd
    var parts = date.split("/");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
  };

  const fetchImage = async (url) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob", // Ensure response type is blob
      });

      let name = url.split("/").pop();
      // Convert blob to File object
      const file = new File([response.data], name, {
        type: response.headers["content-type"],
      });

      // Set file to state
      setFile(file);
      setFilename(file.name);
      console.log("filename set", filename);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (task) {
      setEditForm(true);
      setTaskName(task.taskname);
      setDescription(task.description);
      setAlertFrequency(task.alert_frequency);
      setRepeatEvery(task.repeat_every);
      setAlertOption(task.alert_option);
      setAlertMessage(task.alert_message);
      setFile(task.file);
      if (task.type === "default") {
        setDisableField("disabled");
      }
      setType(task.type);
      if (task.image) {
        setFilename(task.image.split("/").pop());
      }

      // console.log(task.start_date, task.due_date);
      // console.log(formattedDate(task.start_date));
      if (task.start_date) {
        setStartDate(formatDate(task.start_date));
      }
      if (task.due_date) {
        setDueDate(formatDate(task.due_date));
      }

      if (task.image) {
        fetchImage(task.image);
      }
    }
  }, []);

  function formatDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const getStartDate = () => {
    var newDate = new Date(startDate);

    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "taskname":
        if (formErrors.taskname) {
          delete formErrors.taskname;
          console.log("deleted");
        }
        setTaskName(event.target.value);
        break;
      case "taskdescription":
        if (formErrors.description) {
          delete formErrors.description;
        }
        setDescription(event.target.value);
        break;
      case "startDate":
        setStartDate(event.target.value);
        break;
      case "alertFrequency":
        setAlertFrequency(event.target.value.toLowerCase());
        break;
      case "repeatEvery":
        setRepeatEvery(event.target.value);
        break;
      case "alertMessage":
        setAlertMessage(event.target.value);
        break;
      case "dueDate":
        setDueDate(event.target.value);
        break;
      case "alertOption":
        setAlertOption(event.target.value);
        break;
      case "uploadImage":
        if (event.target.files) {
          setFile(event.target.files[0]);
          setFilename(event.target.files[0].name);
        }
        break;
    }
    // console.log(event.target.value.toLowerCase());
  };

  const validate = () => {
    const errors = {};
    if (!taskName) {
      errors.taskName = "Taskname is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    if (alertFrequency == "date" && !dueDate) {
      errors.dueDate = "Due date is required";
    }
    if (alertFrequency == "monthly" || alertFrequency == "yearly") {
      if (!repeatEvery) {
        errors.repeatEvery = "Repeat Every is required";
      }
      if (!startDate) errors.startDate = "Start Date is required";
    }
    if (alertOption === "yes") {
      if (!alertMessage) {
        errors.alertMessage = "AlertMessage is required";
      }
    }

    // console.log(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();

    // vlaidate
    const newErrors = validate();
    setFormErrors(newErrors);
    if (editForm) {
      formdata.append("id", task.id);
      formdata.append("task_id", task.task_id);
    }

    if (draftId) {
      formdata.append("property_id", draftId);
    } else {
      formdata.append("property_id", propertyId);
    }

    if (Object.keys(newErrors).length === 0) {
      formdata.append("type", type);
      formdata.append("created_by", userId);
      formdata.append("taskname", taskName);
      formdata.append("draft_property_id", draftId);
      formdata.append("description", description);
      formdata.append("alert_option", alertOption);
      formdata.append("alert_frequency", alertFrequency);
      formdata.append("repeat_every", repeatEvery);
      formdata.append("status", "pending");
      formdata.append("updated_by", userId);
      formdata.append("alert_message", alertMessage);
      formdata.append("name", filename);
      formdata.append("file", file);
      // console.log("draftId", draftId);
      let newDate = getStartDate(startDate);

      // console.log("OG startdate", typeof newDate);
      // console.log("newDate", newDate);

      if (
        (dueDate && alertFrequency) ||
        (startDate && alertFrequency && repeatEvery)
      ) {
        let due;
        let months;
        // console.log("alertFrequency", alertFrequency);

        if (alertFrequency === "date") {
          due = new Date(dueDate);
          due.setDate(due.getDate() + 1);
          setRepeatEvery(null);
        } else {
          due = newDate;
          due.setDate(due.getDate() + 1);
        }
        due = localeDateString(due);
        setDueDate(due);
        formdata.append("due_date", due);
      }

      if (startDate)
        formdata.append("start_date", localeDateString(new Date(startDate)));
      else formdata.append("start_date", "");

      // dispatch thunk.then
      if (editForm) {
        dispatch(editPropertyMaintenanceTask(formdata));
      } else {
        dispatch(postPropertyMaintenanceTask(formdata));
      }
      onClose();
    } else {
      e.preventDefault();
      console.log("errors seen");
    }
  };

  return (
    <>
      <Modal className="inset-y-10 inset-x-80">
        <div className="container mx-auto">
          <ModalTitle
            title="Add/Edit Maintenance Items"
            submit
            cancel
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
        {/* <div className=" bg-gray-100"> */}
        {/* <div className="mx-20 mt-6 pt-4 flex items-center">
            <div className="flex flex-row items-center">
              <FaArrowLeftLong
                onClick={backToMaintenancePage}
                className="w-8 h-8 cursor-pointer mr-4"
              />
              <div className="text-4xl font-extrabold text-black">
                Add/Edit Maintenance Items
              </div>
            </div>
          </div> */}
        <div className="flex w-100 flex-row  items-center bg-white">
          <form className="mx-3 pb-5">
            <input type="hidden" name="id" onChange={handleInputChange}></input>
            <div className="row ">
              <div className="col-14">
                <div className="row ">
                  <div className="col-sm-4">
                    <label>
                      <strong>Type: </strong>
                      <input
                        type="text"
                        className="form-control cursor-not-allowed"
                        name="type"
                        value={type}
                        placeholder="type"
                        readOnly
                        disabled="disabled"
                      ></input>
                    </label>
                  </div>
                  <div className="col-sm-8">
                    <label>
                      <strong>Name of Maintenance*</strong>
                    </label>
                    <input
                      className={`form-control ${
                        (formErrors.taskname ? "border-red-500" : "",
                        disableField === "disabled" ? "cursor-not-allowed" : "")
                      }`}
                      name="taskname"
                      onChange={handleInputChange}
                      value={taskName}
                      placeholder="Name of Maintenance"
                      disabled={disableField}
                    />
                    {formErrors.taskName && (
                      <p className="ml-2 text-red-500 text-xs italic">
                        {formErrors.taskName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-14 mt-3">
                <div className="row">
                  <div className="col-sm-4">
                    <label>
                      <strong>Alert Freq*</strong>
                    </label>

                    <select
                      required
                      className="form-control"
                      name="alertFrequency"
                      value={alertFrequency}
                      onChange={handleInputChange}
                    >
                      <option value="date">Date</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  {(alertFrequency === "monthly" ||
                    alertFrequency === "yearly") && (
                    <div className="col-md-4">
                      <label>
                        <strong>Starting Date*</strong>
                      </label>
                      <div className="form-group1">
                        <input
                          required
                          className={`form-control ${
                            formErrors.startDate ? "border-red-500" : ""
                          }`}
                          type="date"
                          dateFormat="MM/dd/yyyy"
                          name="startDate"
                          value={startDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.startDate && (
                        <p className="ml-2 text-red-500 text-xs italic">
                          {formErrors.startDate}
                        </p>
                      )}
                    </div>
                  )}
                  {alertFrequency === "date" && (
                    <div className="col-sm-4">
                      <label>
                        <strong>Due Date*</strong>
                      </label>
                      <div className="form-group1">
                        <input
                          required
                          className={`form-control ${
                            formErrors.dueDate ? "border-red-500" : ""
                          }`}
                          type="date"
                          name="dueDate"
                          value={dueDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.dueDate && (
                        <p className="ml-2 text-red-500 text-xs italic">
                          {formErrors.dueDate}
                        </p>
                      )}
                    </div>
                  )}
                  {(alertFrequency === "monthly" ||
                    alertFrequency === "yearly") && (
                    <div className="col-sm-4">
                      <label>
                        <strong>Repeat Every*</strong>
                      </label>
                      <select
                        required
                        className="form-control"
                        name="repeatEvery"
                        onChange={handleInputChange}
                        value={repeatEvery}
                      >
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-8 mt-3">
                <label>
                  <strong>Description*</strong>
                </label>
                <textarea
                  name="taskdescription"
                  className={`form-control ${
                    (formErrors.description ? "border-red-500" : "",
                    disableField === "disabled" ? "cursor-not-allowed" : "")
                  }`}
                  value={description}
                  onChange={handleInputChange}
                  disabled={disableField}
                ></textarea>
                {formErrors.description && (
                  <p className="ml-2 text-red-500 text-xs italic">
                    {formErrors.description}
                  </p>
                )}{" "}
              </div>

              <div className="col-4 mt-3">
                <label>
                  <strong>Image</strong>
                </label>

                <div className="imageup">
                  <h6>
                    Drag & Drop or <span> Upload</span> image
                  </h6>
                  <input
                    className={`form-control ${
                      disableField === "disabled" ? "cursor-not-allowed" : ""
                    }`}
                    type="file"
                    name="uploadImage"
                    onChange={handleInputChange}
                    disabled={disableField}
                  />
                  {file && (
                    <img
                      className="w-full h-40"
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                    />
                  )}
                  {/* <p>{file ? file.name : ""}</p> */}
                </div>
              </div>

              <div className="col-sm-6 mt-2 alt_Message p-2">
                <h6>
                  <strong>Do you want to send an alert email?*</strong>
                </h6>
                <p className=" w-100 mb-3 ">
                  <span>
                    <input
                      required
                      type="radio"
                      name="alertOption"
                      value="yes"
                      checked={alertOption === "yes"}
                      onChange={handleInputChange}
                    />{" "}
                    Yes
                  </span>
                  <span className="mx-3">
                    <input
                      type="radio"
                      name="alertOption"
                      value="no"
                      checked={alertOption === "no"}
                      onChange={handleInputChange}
                    />{" "}
                    No
                  </span>
                </p>
              </div>
            </div>

            {alertOption === "yes" && (
              <div className="col-12 pt-0">
                <label>
                  <strong>Alert Email Message*</strong>
                </label>
                <textarea
                  name="alertMessage"
                  className={`form-control ${
                    formErrors.alertMessage ? "border-red-500" : ""
                  }`}
                  value={alertMessage}
                  onChange={handleInputChange}
                ></textarea>
                {formErrors.alertMessage && (
                  <p className="ml-2 text-red-500 text-xs italic">
                    {formErrors.alertMessage}
                  </p>
                )}
              </div>
            )}

            {/* <div className="modal-footer mt-2 pb-3">
              <button
                type="button"
                className="btn btn-secondary mr-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div> */}
          </form>
        </div>
        {/* </div> */}
      </Modal>
    </>
  );
};

export default CustomMaintenanceTask;
