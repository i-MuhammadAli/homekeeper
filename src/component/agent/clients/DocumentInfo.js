import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

import InputBox from "../../common/InputBox";
import createApi from "../../../utils/api";
import { addPropertyDoc } from "../../../store";
import Loader from "../../loader_folder/Loader";
import { getext } from "../../../utils/helpers";

function DocumentInfo({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const api = createApi();

  const client_id = useSelector((state) => {
    return state.client.data.id;
  });

  const handleSubmit = () => {
    const newErrors = validate();
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", selectedFile);
      formData.append("propertyid", client_id);
      formData.append("extension", getext(selectedFile.name));

      api
        .post("/api/upload_documents", formData)
        .then((response) => {
          setIsLoading(false);
          if (response.data.status === "success") {
            toast.success("File Uploaded!");
            handleModalClose();
            dispatch(addPropertyDoc(response.data));
          }
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("File Upload Failed!");
          console.log(err);
        });
    }
  };

  const handleModalClose = () => {
    // console.log("close");
    onClose();
  };

  const validate = () => {
    const errors = {};
    if (!selectedFile) {
      errors.file = "Required";
    }
    // console.log(errors);
    return errors;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center flex-row mx-3 my-4">
        <label className="block w-28 font-semibold" htmlFor="doc-name-info">
          Name
        </label>
        <InputBox
          formText
          placeholder="Document Name"
          // className={`w-60`}
          id="doc-name-info"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex items-center flex-row m-3 h-full mb-12">
        <label className="block w-28 font-semibold">
          File<span className="text-red-500">*</span>
        </label>
        <div className="modal_left">
          <div className="img_box">
            <p>{selectedFile ? selectedFile.name : ""}</p>
            <p>
              Drag and drop or <span>Browse</span> Document
            </p>
          </div>
          <div className="file-upload mt-0">
            <div className="file-select">
              <input
                type="file"
                name="chooseFile"
                id="chooseFile"
                className="chooseFile"
                required
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
            </div>
          </div>
        </div>

        <div className="ml-2">
          {formErrors.file && (
            <p className="formerrorforvalidation">{formErrors.file}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end m-2">
        <button
          onClick={handleSubmit}
          className="bg-sky-500 border text-white px-2.5 py-2.5 text-sm rounded font-semibold flex items-center button_color"
        >
          Save
        </button>
      </div>
    </>
  );
}

export default DocumentInfo;
