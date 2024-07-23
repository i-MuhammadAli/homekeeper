import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    // const dateObj = new Date(dop);
    // dateObj.setFullYear(dateObj.getFullYear() + parseInt(years));
    const difference = new Date(targetDate) - new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
        months: Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 365)) /
            (1000 * 60 * 60 * 24 * 30)
        ),
        days: Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      {timerComponents.length ? (
        <>
          <div className="flex flex-col items-center">
            <div
              className=""
              style={{ color: "#f55e55", fontWeight: "600", fontSize: "30px" }}
            >
              {timeLeft.years}
            </div>
            <div
              style={{ color: "#f55e55", fontWeight: "400", fontSize: "13px" }}
            >
              Year
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className=""
              style={{ color: "#f55e55", fontWeight: "600", fontSize: "30px" }}
            >
              {timeLeft.months}
            </div>
            <div
              style={{ color: "#f55e55", fontWeight: "400", fontSize: "13px" }}
            >
              Month
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className=""
              style={{ color: "#f55e55", fontWeight: "600", fontSize: "30px" }}
            >
              {timeLeft.days}
            </div>
            <div
              style={{ color: "#f55e55", fontWeight: "400", fontSize: "13px" }}
            >
              Day
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className=""
              style={{ color: "#f55e55", fontWeight: "600", fontSize: "30px" }}
            >
              {timeLeft.hours}
            </div>
            <div
              style={{ color: "#f55e55", fontWeight: "400", fontSize: "13px" }}
            >
              Hour
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className=""
              style={{ color: "#f55e55", fontWeight: "600", fontSize: "30px" }}
            >
              {timeLeft.minutes}
            </div>
            <div
              style={{ color: "#f55e55", fontWeight: "400", fontSize: "13px" }}
            >
              Minute
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className=""
              style={{ color: "#f55e55", fontWeight: "600", fontSize: "30px" }}
            >
              {timeLeft.seconds}
            </div>
            <div
              style={{ color: "#f55e55", fontWeight: "400", fontSize: "13px" }}
            >
              Second
            </div>
          </div>
        </>
      ) : (
        // <ul className="pmi">
        //   <li>
        //     {timeLeft.years}
        //     <span>Year</span>
        //   </li>
        //   <li>
        //     {timeLeft.months}
        //     <span>Month</span>
        //   </li>
        //   <li>
        //     {timeLeft.days}
        //     <span>Day</span>
        //   </li>
        //   <li>
        //     {timeLeft.hours}
        //     <span>Hour</span>
        //   </li>
        //   <li>
        //     {timeLeft.minutes}
        //     <span>Minute</span>
        //   </li>
        //   <li>
        //     {timeLeft.seconds}
        //     <span>Second</span>
        //   </li>
        // </ul>
        <span>Time's up!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
