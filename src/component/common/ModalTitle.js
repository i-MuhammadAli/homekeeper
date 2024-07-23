import {
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdTrash,
  IoMdCreate,
} from "react-icons/io";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillXCircleFill,
  BsFillCheckCircleFill,
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsFillChatDotsFill,
  BsTrash,
  BsFillPencilFill,
  BsFillTrash3Fill,
  BsLink,
  BsDroplet,
} from "react-icons/bs";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { GoPencil, GoSync } from "react-icons/go";
import ToolTip from "./Tooltip";

function ModalTitle({
  title,
  back,
  submit,
  cancel,
  edit,
  trash,
  next,
  previous,
  onSubmit,
  onCancel,
  onEdit,
  onTrash,
  children,
  onBack,
  onNext,
  onPrevious,
  loadingState,
  disabledAll,
}) {
  return (
    <div className="sticky top-0 bg-white z-10 py-1">
      {back && (
        <div className="flex justify-between flex-row ">
          <IoReturnDownBackOutline
            data-tooltip-id="back"
            data-tooltip-content="Go Back"
            data-tooltip-place="top"
            className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={onBack}
          />
          <ToolTip id="back" />
        </div>
      )}
      <div className="flex flex-row justify-between mt-2 mb-1 -mx-1 items-center">
        <div className="flex flex-row items-center">
          <h1 className="font-bold text-xl text-gray-500 m-2 mr-5">{title}</h1>
        </div>
        <div className="flex justify-end items-center">
          {previous && (
            <>
              <BsFillArrowLeftCircleFill
                data-tooltip-id="previous"
                data-tooltip-content="Previous"
                data-tooltip-place="top"
                className=" w-7 h-7 focus:outline-none cursor-pointer text-gray-600 hover:text-black mr-2"
                onClick={onPrevious}
              />
              <ToolTip id="previous" />
            </>
          )}
          {next && (
            <>
              <BsFillArrowRightCircleFill
                data-tooltip-id="next"
                data-tooltip-content="Continue"
                data-tooltip-place="top"
                className=" w-7 h-7 focus:outline-none cursor-pointer text-gray-600 hover:text-black mr-2"
                onClick={onNext}
              />
              <ToolTip id="next" />
            </>
          )}
          {submit && (
            <>
              {loadingState ? (
                <div className="flex flex-row items-center">
                  <GoSync className="animate-spin w-6 h-6 mr-2" />
                </div>
              ) : (
                <>
                  <div
                    className="flex items-center w-7 h-7 bg-gray-600 rounded-md cursor-pointer hover:bg-black mr-1"
                    onClick={onSubmit}
                  >
                    <BsFillCheckCircleFill
                      data-tooltip-id="submit"
                      data-tooltip-content="Submit"
                      data-tooltip-place="top"
                      className=" w-5 h-4 focus:outline-none text-white ml-1"
                      // onClick={onSubmit}
                    />
                    <ToolTip id="submit" />{" "}
                  </div>
                </>
              )}
            </>
          )}
          {cancel && (
            <>
              <div
                className="flex items-center w-7 h-7 bg-gray-600 rounded-md cursor-pointer hover:bg-black"
                onClick={onCancel}
              >
                <BsFillXCircleFill
                  data-tooltip-id="cancel"
                  data-tooltip-content="Close"
                  data-tooltip-place="top"
                  className="w-5 h-4 focus:outline-none text-white ml-1"
                />
                <ToolTip id="cancel" />
              </div>
            </>
          )}
          {edit && (
            <>
              <IoMdCreate
                data-tooltip-id="edit"
                data-tooltip-content="Edit"
                data-tooltip-place="top"
                className={`w-7 h-7 focus:outline-none mr-px ${
                  disabledAll
                    ? "text-gray-500"
                    : "cursor-pointer text-green-500 hover:text-green-800"
                }`}
                onClick={onEdit}
              />
              {!disabledAll && <ToolTip id="edit" />}
            </>
          )}
          {trash && (
            <>
              <IoMdTrash
                data-tooltip-id="delete"
                data-tooltip-content="Delete"
                data-tooltip-place="top"
                className={`w-7 h-7 focus:outline-none ${
                  disabledAll
                    ? "text-gray-500"
                    : "cursor-pointer text-red-500 hover:text-red-800"
                }`}
                onClick={onTrash}
              />
              {!disabledAll && <ToolTip id="delete" />}
            </>
          )}
          {children}
        </div>
      </div>
      <div className="h-px bg-gray-300 w-full mb-4"></div>
    </div>
  );
}

export default ModalTitle;
