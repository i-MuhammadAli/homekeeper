import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { editAgentRequestHistory } from "../../../store";

function ReqAndHistorySection() {
  const dispatch = useDispatch();
  const [showDiv, setShowDiv] = useState(false);

  const { propertyLevel: agentRequests } = useSelector((state) => {
    return state.agentRequests;
  });

  const { id } = useSelector((state) => {
    return state.client.data;
  });

  const handlePropertyDivChange = () => {
    setShowDiv(!showDiv);
  };

  const handleCheckRequest = (item) => {
    // console.log(item);
    const formData = new FormData();
    formData.append("id", item.id);
    formData.append("completed", !item.completed ? 1 : 0);
    dispatch(editAgentRequestHistory(formData));
  };

  return (
    <>
      <div
        onClick={handlePropertyDivChange}
        className="sm:mr-20 sm:ml-20 mr-2 ml-2 rounded flex flex-row justify-between items-center hover:cursor-pointer property_section"
      >
        <div className="flex items-center flex-row px-3 py-2.5">
          <div className="text-white font-semibold text-md ml-2">
            REQUEST AND HISTORY
          </div>
        </div>
        <div className="mr-8">
          <MdArrowDropUp
            onClick={handlePropertyDivChange}
            className="w-7 h-7 hover:cursor-pointer text-white"
          />
        </div>
      </div>
      <div className="mb-3">
        {showDiv && (
          <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 bg-white flex sm:flex-row flex-col border rounded">
            <div className="sm:w-1/2 flex flex-col overflow-hidden sm:ml-4 my-3 border rounded sm:mr-2">
              <div className="flex flex-row bg-gray-100">
                <div className="font-extrabold text-xs my-2.5 mx-3 text-black">
                  REQUESTS & HISTORY
                </div>
              </div>
              <div className="mx-3 mt-3 mb-2 text-sm label_color">
                Client requests your action!
              </div>

              {agentRequests[id] ? (
                agentRequests[id].map((item) => {
                  return (
                    <div
                      className="mx-3 mb-1 border rounded-sm info_style"
                      key={item.id}
                    >
                      <div className="flex flex-row items-center m-2.5 justify-between">
                        <div className="flex flex-row items-center">
                          <input
                            className="h-4 w-4 rounded"
                            id=""
                            type="checkbox"
                            value={item.completed}
                            checked={item.completed}
                            onChange={() => handleCheckRequest(item)}
                          />
                          <div className="ml-2 sm:text-sm text-xs">
                            {item.fname + " " + item.request_text}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">{item.date}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="mx-3 mb-4 mt-2 info_style text-xs custom_italic">
                  No requests!
                </div>
              )}
              {/* <div className="mx-3 mt-1 border rounded-sm label_color">
                <div className="flex flex-row items-center m-2.5 justify-between">
                  <div className="flex flex-row items-center">
                    <input
                      className="h-4 w-4 rounded"
                      id=""
                      type="checkbox"
                      value={false}
                      checked={false}
                    />
                    <div className="ml-2 text-sm">Mark Request Shit!</div>
                  </div>
                  <div className="text-xs text-gray-400">Nov 1, 2023</div>
                </div>
              </div>
              <div className="mx-3 mt-1 border rounded-sm">
                <div className="flex flex-row items-center m-2.5 justify-between">
                  <div className="flex flex-row items-center">
                    <input
                      className="h-4 w-4"
                      id=""
                      type="checkbox"
                      value={false}
                      checked={false}
                      onChange={() => console.log("")}
                    />
                    <div className="ml-2 text-sm">Mark Request Shit!</div>
                  </div>
                  <div className="text-xs text-gray-500">Nov 1, 2023</div>
                </div>
              </div> */}
            </div>

            <div className="sm:w-1/2 flex flex-col overflow-hidden my-3 border rounded sm:mr-4">
              <div className="flex flex-row bg-gray-100">
                <div className="font-extrabold text-xs my-2.5 mx-3 text-black">
                  CLIENT ACTIONS
                </div>
              </div>
              <div className="mx-3 mt-3 mb-2 text-sm label_color">
                See what your client is doing!
              </div>
              {/* <div className="mx-3 mt-1 border rounded-sm">
                <div className="flex flex-row items-center m-2.5 justify-between">
                  <div className="flex flex-row items-center">
                    <div className="ml-2 text-sm">Mark logged in!</div>
                  </div>
                  <div className="text-xs text-gray-500">Nov 1, 2023</div>
                </div>
              </div>
              <div className="mx-3 mt-1 border rounded-sm">
                <div className="flex flex-row items-center m-2.5 justify-between">
                  <div className="flex flex-row items-center">
                    <div className="ml-2 text-sm">Mark updated maintenance items!</div>
                  </div>
                  <div className="text-xs text-gray-500">Nov 1, 2023</div>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ReqAndHistorySection;
