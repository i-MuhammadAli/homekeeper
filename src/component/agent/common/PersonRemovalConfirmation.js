import { BsFillXCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

function PersonRemovalConfirmation({ text, confirmed, cancelled }) {
  return (
    <div className="flex flex-col my-2">
      <div className="text-sm info_style">{text}</div>
      <div className="flex flex-row mt-2">
        <div
          className="flex items-center w-7 h-7 bg-gray-600 cursor-pointer rounded-md hover:bg-black mr-1"
          onClick={confirmed}
        >
          <BsFillCheckCircleFill className=" w-5 h-4 focus:outline-none text-white ml-1" />
        </div>
        <div
          className="flex items-center w-7 h-7 bg-gray-600 cursor-pointer rounded-md hover:bg-black"
          onClick={cancelled}
        >
          <BsFillXCircleFill className="w-5 h-4 focus:outline-none text-white ml-1" />
        </div>
      </div>
    </div>
  );
}

export default PersonRemovalConfirmation;
