import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Tooltip } from "react-tooltip";

import InputBox from "../../common/InputBox";
import Modal from "../../common/Modal";
import ModalTitle from "../../common/ModalTitle";
import createApi from "../../../utils/api";
import { addHomeOwnerDoc } from "../../../store";
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
    return state.myProperties.data.id;
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
            handleModalClose();
            dispatch(addHomeOwnerDoc(response.data));
          }
        })
        .catch((err) => console.log("Something went wrong!"));
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
      <Modal className="inset-y-10 inset-x-80">
        <div className="container mx-auto">
          <ModalTitle
            title="Upload Document"
            // submit
            cancel
            // onSubmit={handleDocumentSubmit}
            onCancel={handleModalClose}
          />
          <div className="flex items-center flex-row mx-1 h-full -my-1">
            <p className="text-orange-500 text-xs italic">* Required Fields</p>
          </div>
          <div className="flex items-center flex-row  mx-3 my-4">
            <label className="block w-48 font-semibold" htmlFor="prop-value">
              Document Name
            </label>
            <InputBox
              formText
              placeholder="Document Name"
              className={`w-60`}
              id="doc-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center flex-row m-3 h-full mb-12">
            <label className="block w-48 font-semibold" htmlFor="prop-date">
              <span className="text-orange-500">*</span> File
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
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-sky-500 border text-white px-2.5 py-2.5 text-sm rounded font-semibold flex items-center button_color"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DocumentInfo;
