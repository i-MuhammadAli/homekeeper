import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillXCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { getext, truncateText } from "../../../utils/helpers";
import { deleteHomeOwnerDoc } from "../../../store";
import createApi from "../../../utils/api";
// import { handleFileDownload } from "../../agent/property/PropertySection";

function DocumentSection() {
  const api = createApi();
  const dispatch = useDispatch();
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const documents = useSelector((state) => {
    return state.myProperties.documents;
  });

  const handleDocumentDelete = () => {
    let formdata = new FormData();
    formdata.append("id", documentToDelete);
    api.post("/api/delete_documents", formdata).then(function (response) {
      if (response.data.status === "success") {
        dispatch(
          deleteHomeOwnerDoc({
            uuid: documentToDelete,
          })
        );
        setDocumentToDelete(null);
        toast.success("Document Deleted!");
      } else {
        toast.error("Failed to delete the document!");
        console.log("Delete failed!");
      }
    });
  };

  const handleFileDownload = (id, docName, extension) => {
    // const extension = getext(id);
    const api = createApi();
    api
      .get(`/api/download/${id}`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${docName}.${extension}`);

        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const getDocImg = (extension) => {
    // var extension = getext(item.doc_id);
    var url =
      extension === "xlsx"
        ? "/../asset/images/doc.png"
        : extension === "html"
        ? "/../asset/images/doc.png"
        : extension === "png"
        ? "/../asset/images/smaple.png"
        : extension === "jpg"
        ? "/../asset/images/smaple.png"
        : extension === "jpeg"
        ? "/../asset/images/smaple.png"
        : extension === "gif"
        ? "/../asset/images/smaple.png"
        : extension === "docx"
        ? "/../asset/images/doc.png"
        : extension === "pdf"
        ? "/../asset/images/pdf1.png"
        : "";
    return url;
  };

  return (
    <div className="m-3">
      {!documents.length ? (
        // <div className="flex items-center flex-row my-2">
        <div className="flex flex-row items-center justify-center  info_style text-xs custom_italic mt-4">
          No Documents Added
        </div>
      ) : (
        // </div>
        <div className="overflow-hidden overflow-y-auto max-h-60">
          {documents.map((item) => (
            <div key={item.uuid}>
              <div className="flex items-center flex-row justify-between">
                <div className="flex flex-row items-center">
                  <img
                    className="w-5 h-5 mr-2"
                    src={getDocImg(item.extension)}
                    alt="docImg"
                  />
                  <div
                    className="text-sm info_style cursor-pointer hover:underline"
                    onClick={() =>
                      handleFileDownload(item.uuid, item.name, item.extension)
                    }
                  >
                    {truncateText(item.name, 24)}
                  </div>
                </div>
                {item.uuid === documentToDelete ? (
                  <div className="flex flex-row">
                    <span className="text-sm info_style">Sure?</span>
                    <div
                      className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                      onClick={handleDocumentDelete}
                    >
                      <BsFillCheckCircleFill className="w-4 h-3 focus:outline-none text-white ml-1" />
                    </div>
                    <div
                      className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                      onClick={() => setDocumentToDelete(null)}
                    >
                      <BsFillXCircleFill className="w-4 h-3 focus:outline-none text-white ml-1" />
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center w-6 h-6 bg-gray-500 rounded-md cursor-pointer hover:bg-black ml-1"
                    onClick={() => setDocumentToDelete(item.uuid)}
                  >
                    <FaTrashAlt className="w-4 h-3 text-white ml-1" />
                  </div>
                )}
              </div>
              <hr className="mx-4 border-gray-300 my-2.5" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentSection;
