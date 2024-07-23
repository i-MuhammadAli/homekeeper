import React from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { formatPrice } from "../../../utils/helpers";

const Graph1 = () => {
  const { labels, homeValue, loanValue, equityValue, agentHomeValue } =
    useSelector((state) => {
      return state.graph.data;
    });

  const customPointSVG =
    '<svg fill="#000000" width="64px" height="64px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"></path></g></svg>';

  return (
    <div>
      <div
        id="custom-tooltip"
        className="custom-tooltip"
        style={{ position: "absolute", display: "none" }}
      ></div>
      {homeValue.length > 0 ? (
        <>
          <Line
            id="line-graph"
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Home Value",
                  data: homeValue,
                  fill: true,
                  borderColor: "#4472c4",
                  pointRadius: 0,
                  tension: 0.1,
                },
                {
                  label: "Agent Home Value",
                  data: agentHomeValue,
                  fill: false,
                  borderColor: "#4472c4",
                  pointStyle: "circle",
                  backgroundColor: "#74a2f2",
                  pointRadius: 7,
                  tension: 0.1,
                  pointHoverRadius: 9,
                  pointBorderColor: "#4472c4",
                },
                {
                  label: "Equity",
                  data: equityValue,
                  fill: false,
                  borderColor: "#00ab44",
                  pointRadius: 0,
                  tension: 0.1,
                },
                {
                  label: "Loan",
                  data: loanValue,
                  fill: false,
                  borderColor: "rgb(244, 178, 67)",
                  pointRadius: 0,
                  tension: 0.1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  ticks: {
                    stepSize: 200000,
                    callback: function (value, index, values) {
                      return formatPrice(value);
                    },
                  },
                },
                x: {
                  display: true, // Display x-axis
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
              elements: {
                point: {
                  radius: 0, // Set radius to 0 to use custom SVG points
                  pointStyle: customPointSVG, // Use custom SVG for points
                  backgroundColor: "transparent", // Set background color to transparent
                },
              },
            }}
          />
          <div className="flex items-center justify-end sm:mt-4 mt-2">
            <div className="flex items-center">
              <div className="mr-1 font-semibold">
                <svg
                  width="12px"
                  height="12px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4472c4"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    //   stroke="#CCCCCC"
                    strokeWidth="2"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M3 16.5L9 10L13 16L21 6.5"
                      // stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "#4472c4" }}
              >
                Home Value
              </span>
            </div>
            <div className="flex items-center ml-4">
              <div className="mr-1">
                <svg
                  width="12px"
                  height="12px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00ab44"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    //   stroke="#CCCCCC"
                    strokeWidth="0.528"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M3 16.5L9 10L13 16L21 6.5"
                      // stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>

              <span
                className="text-sm font-semibold"
                style={{ color: "#00ab44" }}
              >
                Equity
              </span>
            </div>
            <div className="flex items-center ml-4">
              <div className="mr-1">
                <svg
                  width="12px"
                  height="12px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(244, 178, 67)"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0)"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    //   stroke="#CCCCCC"
                    strokeWidth="0.528"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M3 16.5L9 10L13 16L21 6.5"
                      // stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>

              <span
                className="text-sm font-semibold"
                style={{ color: "rgb(244, 178, 67)" }}
              >
                Loan
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-40 text-gray-500">No Data</div>
      )}
      {/* <div className="flex items-center mt-4"> */}
    </div>
  );
};

export default Graph1;
