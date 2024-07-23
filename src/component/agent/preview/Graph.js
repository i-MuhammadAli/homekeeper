// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// const Graph = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     // Data for the line graph
//     const data = {
//       labels: ["Aug 2022", "Jan 2023", "Jun 2023", "Dec 2023", "Jun 2024"],
//       datasets: [
//         {
//           label: "Price",
//           data: [200, 300, 400, 600, 550], // Prices in 100k increments
//           fill: false,
//           borderColor: "rgb(75, 192, 192)",
//           pointStyle: "img/point.png", // Path to custom image
//           pointRadius: 8, // Adjust the size of the points
//           tension: 0.1,
//         },
//       ],
//     };

//     // Configuration options
//     const config = {
//       type: "line",
//       data: data,
//       options: {
//         scales: {
//           y: {
//             ticks: {
//               stepSize: 100, // Increment of 100k
//               callback: function (value, index, values) {
//                 return value + "k";
//               },
//             },
//           },
//           x: {
//             display: false, // Hide x-axis
//           },
//         },
//         plugins: {
//           legend: {
//             display: false,
//           },
//         },
//         custom: {
//           legend: {
//             display: true,
//             labels: {
//               usePointStyle: true, // Use point style for legend items
//               font: {
//                 size: 10, // Change legend font size
//                 family: "Arial", // Change legend font family
//                 weight: "bold", // Change legend font weight
//               },
//               color: "yellow", // Change legend font color
//               padding: 2, // Add padding between legend items
//             },
//             onClick: () => {}, // Disable legend click events
//           },
//         },
//       },
//     };

//     // Create the chart
//     const ctx = chartRef.current.getContext("2d");
//     const chartInstance = new Chart(ctx, config);

//     // Create custom legend shape (zigzag horizontal line)
//     const legend = document.getElementById("custom-legend");
//     const svg = `
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" fill="none" stroke="blue" stroke-width="4">
//         <path d="M0 5h20l10-5 10 5 10-5 10 5 10-5" />
//       </svg>
//     `;
//     legend.innerHTML = svg;

//     return () => {
//       // Cleanup: Destroy the chart instance
//       chartInstance.destroy();
//     };
//   }, []); // Run once on component mount

//   return (
//     <div className="max-w-lg mx-auto">
//       <canvas ref={chartRef}></canvas>
//       <div className="flex items-center justify-end">
//         <div id="custom-legend" className="w-8 h-12 mt-4"></div>
//         <span className="text-blue-700 text-xs">Price</span>
//       </div>
//     </div>
//   );
// };

// export default Graph;

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Graph = () => {
  const chartRef = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState(6); // Default to 6 months
  const [chartInstance, setChartInstance] = useState(null); // Track Chart instance

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data based on the selected time period
      const data = await fetchDataForPeriod(selectedPeriod);
      console.log(data);

      // Data for the line graph
      const chartData = {
        labels: data.labels,
        datasets: [
          {
            label: "Price",
            data: data.values, // Prices in 100k increments
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            // pointStyle: "img/point.png", // Path to custom image
            pointRadius: 8, // Adjust the size of the points
            tension: 0.1,
          },
        ],
      };

      // Configuration options
      const config = {
        type: "line",
        data: chartData,
        options: {
          scales: {
            y: {
              ticks: {
                stepSize: 100, // Increment of 100k
                callback: function (value, index, values) {
                  return value + "k";
                },
              },
            },
            x: {
              display: false, // Hide x-axis
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          custom: {
            legend: {
              display: true,
              labels: {
                usePointStyle: true, // Use point style for legend items
                font: {
                  size: 10, // Change legend font size
                  family: "Arial", // Change legend font family
                  weight: "bold", // Change legend font weight
                },
                color: "yellow", // Change legend font color
                padding: 2, // Add padding between legend items
              },
              onClick: () => {}, // Disable legend click events
            },
          },
        },
      };

      // Destroy previous Chart instance if exists
      if (!chartInstance) {
        const ctx = chartRef.current.getContext("2d");
        const newChartInstance = new Chart(ctx, config);
        setChartInstance(newChartInstance);
      } else {
        // Update chart data if chart instance exists
        chartInstance.data.labels = chartData.labels;
        chartInstance.data.datasets[0].data = chartData.datasets[0].data;
        chartInstance.update();
      }
    };

    const legend = document.getElementById("custom-legend");
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" fill="none" stroke="blue" stroke-width="4">
        <path d="M0 5h20l10-5 10 5 10-5 10 5 10-5" />
      </svg>
    `;
    legend.innerHTML = svg;

    fetchData();
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [selectedPeriod]); // Fetch data whenever selected period changes

  const fetchDataForPeriod = async (months) => {
    // Mock function to fetch data for a given time period (replace with actual API call)
    const labels = [];
    const values = [];
    const currentDate = new Date();
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      labels.push(
        `${date.toLocaleString("default", {
          month: "short",
        })} ${date.getFullYear()}`
      );
      values.push(Math.floor(Math.random() * 1000));
    }
    return { labels, values };
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(parseInt(e.target.value));
  };

  return (
    <>
      <div className="max-w-lg mx-auto">
        <canvas ref={chartRef}></canvas>
        <div className="flex items-center justify-end">
          <div id="custom-legend" className="w-8 h-12 mr-2 mt-4"></div>
          <span className="text-blue-700 text-xs">Price</span>
        </div>
      </div>
      <div>
        <label htmlFor="period" className="mr-2">
          Select Period:
        </label>
        <select
          id="period"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value={1}>1 Month</option>
          <option value={3}>3 Months</option>
          <option value={6}>6 Months</option>
          <option value={12}>1 Year</option>
        </select>
      </div>
    </>
  );
};

export default Graph;
