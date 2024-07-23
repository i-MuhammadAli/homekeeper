import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { FaBell } from "react-icons/fa";

import { editAgentRequestHistory } from "../../../store";

function Alerts() {
  const dispatch = useDispatch();
  const [showDiv, setShowDiv] = useState(true);
  const [oscillating, setOscillating] = useState(false);
  const [requests, setRequests] = useState([]);

  const { propertyLevel: agentRequests } = useSelector((state) => {
    return state.agentRequests;
  });

  const { id } = useSelector((state) => {
    return state.client.data;
  });

  useEffect(() => {
    if (agentRequests.hasOwnProperty(id)) {
      const req = agentRequests[id].filter((item) => item.completed === 0);
      setRequests(req);
    }

    const oscillateInterval = setInterval(() => {
      setOscillating((prevOscillating) => !prevOscillating);
    }, 500); // Adjust the interval for the oscillating effect

    return () => clearInterval(oscillateInterval);
  }, [agentRequests, id]);

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
      {requests.length > 0 && (
        <>
          <div
            onClick={handlePropertyDivChange}
            className="sm:mr-20 sm:ml-20 mr-2 ml-2 mt-3 rounded flex flex-row justify-between items-center hover:cursor-pointer bg-red-700 sm:w-2/5"
          >
            <div className="flex items-center flex-row py-2 px-2">
              <div className="flex flex-row text-white font-semibold text-sm ml-2 items-center">
                NOTIFICATIONS
                <div className="oscillating-bell ml-2">
                  <FaBell className={oscillating ? "oscillate" : ""} />
                </div>
              </div>
            </div>
            <div className="sm:mr-8 mr-4">
              <MdArrowDropUp
                onClick={handlePropertyDivChange}
                className="w-7 h-7 hover:cursor-pointer text-white"
              />
            </div>
          </div>

          <div className="sm:mr-20 sm:ml-20 mr-2 ml-2 mb-3 sm:w-2/5">
            {showDiv && (
              <div className="bg-white border rounded">
                <div className="flex flex-col overflow-hidden ml-4 my-3 mr-2">
                  {requests.map((item) => {
                    return (
                      <div
                        className="mb-1 border rounded-sm info_style"
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
                          <div className="text-xs text-gray-400">
                            {item.date}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Alerts;
