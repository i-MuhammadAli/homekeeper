import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import HomeValue from "../HomeValue";

function HomeValuePageMobile({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = useSelector((state) => {
    return state.client.clientDetailsEditPageMobileData;
  });

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
            <div className="text-lg font-bold">Home Value</div>
          </div>
        </div>
        <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3 mx-2 mb-4">
          <div className="mb-3"></div>
          <HomeValue item={data} onClose={onBack} />
          <div className="mb-3"></div>
        </div>
      </div>
    </>
  );
}

export default HomeValuePageMobile;