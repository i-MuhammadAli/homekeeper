import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import InputBox from "../../common/InputBox";
import createApi from "../../../utils/api";
import { addPropertyDoc } from "../../../store";
import Loader from "../../loader_folder/Loader";
import { getext } from "../../../utils/helpers";

function DocumentInfoMobile({ onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const api = createApi();

  const client_id = useSelector((state) => {
    return state.client.data.id;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            dispatch(addPropertyDoc(response.data));
            onBack();
          }
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("File Upload Failed!");
          console.log(err);
        });
    }
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
      <div style={{ background: "#f2f7f9" }}>
        <div className="pt-9 mr-2 ml-2 flex flex-row items-center">
          <div className="flex flex-row items-center space-x-2">
            <div
              className="flex items-center w-6 h-6 bg-gray-500 cursor-pointer rounded-md hover:bg-gray-800"
              onClick={onBack}
            >
              <FaArrowLeftLong className="h-4 w-4 cursor-pointer ml-1 text-white" />
            </div>
            <div className="text-lg font-bold">Upload Document</div>
          </div>
        </div>

        <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3 mx-2 mb-4">
          <div className="flex items-center flex-row mx-3 my-4">
            <label className="block w-28 font-semibold">Name</label>
            <InputBox
              formText
              placeholder="Document Name"
              id="doc-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center flex-row m-3 h-full mb-12">
            <label className="block w-28 font-semibold" htmlFor="prop-date">
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
        </div>
      </div>
    </>
  );
}

export default DocumentInfoMobile;
