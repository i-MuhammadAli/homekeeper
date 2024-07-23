import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { HiHome } from "react-icons/hi";
import { TbReload } from "react-icons/tb";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import ClientRequestList from "./ClientRequestList";
import Pagination1 from "../common/Pagination";
import HomeButton from "../common/HomeButton";

function ViewClientRequests() {
  // const navigate = useNavigate();
  const { data: agentRequests } = useSelector((state) => {
    return state.agentRequests;
  });
  const { pageSize, currentPage } = useSelector((state) => {
    return state.pagination;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = agentRequests.slice(startIndex, endIndex);

  return (
    <>
      <Header />
      <div
        style={{ background: "#f2f7f9" }}
        className="pb-10 max-w-screen-xl mx-auto"
      >
        <div className="sm:mr-20 sm:ml-20 pt-9 mr-2 ml-2 flex flex-row justify-between items-center">
          <div className="sm:text-3xl text-lg font-bold">
            Client Requests ({agentRequests.length})
          </div>
          <div className="flex flex-row space-x-1">
            <button
              // onClick={handleShowClientPreview}
              className="bg-gray-500 border text-white px-1 py-1 rounded flex items-center hover:bg-gray-800"
            >
              <TbReload className="sm:w-8 sm:h-6 w-6 h-5 text-white cursor-pointer" />
            </button>
            {/* <button
              onClick={() => navigate("/")}
              className="bg-gray-500 border text-white px-1 py-1 rounded flex items-center hover:bg-gray-800"
            >
              <HiHome className="sm:w-8 sm:h-6 w-6 h-5 text-white cursor-pointer" />
            </button> */}
            <HomeButton />
          </div>
        </div>
        <ClientRequestList data={paginatedData} />
        {agentRequests.length > pageSize && (
          <Pagination1 totalItems={agentRequests.length} />
        )}
      </div>
      <Footer />
    </>
  );
}
export default ViewClientRequests;
