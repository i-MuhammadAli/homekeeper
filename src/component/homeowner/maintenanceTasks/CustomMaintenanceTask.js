import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import ModalTitle from "../../common/ModalTitle";
import {
  editPropertyMaintenanceTask,
  postPropertyMaintenanceTask,
} from "../../../store";
import "tailwindcss/tailwind.css";
import { localeDateString } from "../../../utils/helpers";
import InputBox from "../../common/InputBox";

const CustomMaintenanceTask = ({ task, onClose }) => {
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

  const { data: property } = useSelector((state) => {
    return state.myProperties;
  });

  // const userId = useSelector((state) => {
  //   return state.profile.data.id; //check on this
  // });

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

      // if (task.image) {
      //   fetchImage(task.image);
      // }
    }
  }, []);

  function formatDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // console.log(startDate);
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
          // console.log("deleted");
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
        // console.log(event.target.value);
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
      default:
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

    formdata.append("property_id", property.id);

    if (Object.keys(newErrors).length === 0) {
      formdata.append("type", type);
      formdata.append("created_by", property.id);
      formdata.append("taskname", taskName);
      formdata.append("description", description);
      formdata.append("alert_option", alertOption);
      formdata.append("alert_frequency", alertFrequency);
      formdata.append("repeat_every", repeatEvery);
      formdata.append("status", "pending");
      formdata.append("updated_by", property.id);
      formdata.append("alert_message", alertMessage);
      formdata.append("name", filename);
      formdata.append("file", file);
      let newDate = getStartDate(startDate);

      // console.log("OG startdate", typeof newDate);
      // console.log("newDate", newDate);

      if (
        (dueDate && alertFrequency) ||
        (startDate && alertFrequency && repeatEvery)
      ) {
        let due;
        if (alertFrequency === "date") {
          due = new Date(dueDate);
          due.setDate(due.getDate() + 1);
          setRepeatEvery(null);
        } else {
          due = newDate;
          due.setDate(due.getDate() + 1);
        }
        due = localeDateString(due);
        // console.log(due);
        setDueDate(due);
        formdata.append("due_date", due);
      }

      // console.log(startDate);
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
      <Modal
        onClose={onClose}
        style={{
          top: "15%",
          left: "20%",
          width: "60%",
          height: "70%",
        }}
      >
        <div className="container mx-auto">
          <ModalTitle
            title="Add/Edit Maintenance Items"
            cancel
            onCancel={onClose}
          />
        </div>
        <div className="flex items-center flex-row mx-3">
          <div className="flex flex-col w-1/4 mr-8">
            <label className="font-bold text-sm">Type</label>
            <InputBox
              formText
              disabled
              placeholder="Address"
              className={`cursor-not-allowed`}
              type="text"
              value={type}
              readOnly
            />
          </div>
          <div className="flex flex-col w-3/4">
            <label className="font-bold text-sm">
              Name of Maintenance<span className="text-red-500">*</span>
            </label>
            <InputBox
              formText
              name="taskname"
              onChange={handleInputChange}
              value={taskName}
              placeholder="Name of Maintenance"
              disabled={disableField}
              className={`${
                (formErrors.taskname ? "border-red-500" : "",
                disableField === "disabled" ? "cursor-not-allowed" : "")
              }`}
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center flex-row mx-3 mt-4">
          <div className="flex flex-col w-1/4 mr-8">
            <label className="font-bold text-sm">
              Alert Frequency<span className="text-red-500">*</span>
            </label>
            <select
              required
              className="shadow-sm border rounded-md text-sm leading-5 py-2.5 px-3 form_input_style"
              name="alertFrequency"
              value={alertFrequency}
              onChange={handleInputChange}
            >
              <option value="date">Date</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {(alertFrequency === "monthly" || alertFrequency === "yearly") && (
            <div className="flex flex-col w-1/3 mr-8">
              <label className="font-bold text-sm">
                Starting Date<span className="text-red-500">*</span>
              </label>
              <input
                required
                className={`shadow-sm border rounded-md text-sm leading-5 py-2.5 px-3 form_input_style ${
                  formErrors.startDate ? "border-red-500" : ""
                }`}
                type="date"
                dateFormat="MM/dd/yyyy"
                name="startDate"
                value={startDate}
                onChange={handleInputChange}
              />
              {formErrors.startDate && (
                <p className="ml-2 text-red-500 text-xs italic">
                  {formErrors.startDate}
                </p>
              )}
            </div>
          )}

          {alertFrequency === "date" && (
            <div className="flex flex-col w-1/3 mr-8">
              <label className="font-bold text-sm">
                Due Date<span className="text-red-500">*</span>
              </label>
              <input
                required
                className={`shadow-sm border rounded-md text-sm leading-5 py-2.5 px-3 form_input_style ${
                  formErrors.dueDate ? "border-red-500" : ""
                }`}
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={handleInputChange}
              />
              {formErrors.dueDate && (
                <p className="ml-2 text-red-500 text-xs italic">
                  {formErrors.dueDate}
                </p>
              )}
            </div>
          )}

          {(alertFrequency === "monthly" || alertFrequency === "yearly") && (
            <div className="flex flex-col w-1/4">
              <label className="font-bold text-sm">
                Repeat Every<span className="text-red-500">*</span>
              </label>
              <select
                required
                className="shadow-sm border rounded-md text-sm leading-5 py-2.5 px-3 form_input_style"
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

        <div className="flex flex-row mx-3 mt-4">
          <div className="flex flex-col w-2/3 mr-8">
            <label className="font-bold text-sm">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="taskdescription"
              className={`shadow-sm border rounded-md text-sm h-20 px-3 form_input_style ${
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
          <div className="flex flex-col w-1/3">
            <label className="font-bold text-sm">Image</label>
            <div className="maintenance_image_box text-xs">
              Drag & Drop or Upload image
            </div>
            <input
              className={`shadow-sm border rounded-md text-sm leading-5 py-2 px-3 form_input_style mt-1 ${
                disableField === "disabled" ? "cursor-not-allowed" : ""
              }`}
              type="file"
              name="uploadImage"
              onChange={handleInputChange}
              disabled={disableField}
            />
            {file && (
              <img
                className="h-40"
                src={URL.createObjectURL(file)}
                alt="Preview"
              />
            )}
          </div>
        </div>

        <div className="flex items-center flex-row mx-3 mt-4">
          <div className="flex flex-col w-3/4 mr-8">
            <label className="font-bold text-sm">
              Do you want to send an alert email?
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-row mt-1">
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
              </span>{" "}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-sky-500 border text-white px-2.5 py-2.5 text-sm rounded font-semibold flex items-center button_color"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CustomMaintenanceTask;
