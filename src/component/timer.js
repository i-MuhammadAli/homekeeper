import React from 'react';
import { useState, useEffect } from 'react';

const Timer = () => {
    const [state, setstate] = useState([]);
    useEffect(() => {
        const startDate = new Date();
        const endDate = new Date('2024-09-12 15:30:30');
        // const difference = calculateDateDifference(startDate, endDate);
        var ddd=calculateDateDifference(startDate,endDate);
        setstate(ddd)
        console.log("sunil",ddd)
        
    });
    function calculateDateDifference(startDate, endDate) {
        // Calculate the difference in milliseconds
        const timeDifference = endDate - startDate;

        // Convert milliseconds to various units
        const millisecondsInSecond = 1000;
        const millisecondsInMinute = millisecondsInSecond * 60;
        const millisecondsInHour = millisecondsInMinute * 60;
        const millisecondsInDay = millisecondsInHour * 24;
        const millisecondsInMonth = millisecondsInDay * 30.44; // Average days in a month
        const millisecondsInYear = millisecondsInMonth * 12; // Average months in a year

        // Calculate the differences
        const years = Math.floor(timeDifference / millisecondsInYear);
        const months = Math.floor((timeDifference % millisecondsInYear) / millisecondsInMonth);
        const days = Math.floor((timeDifference % millisecondsInMonth) / millisecondsInDay);
        const hours = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
        const minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);
        const seconds = Math.floor((timeDifference % millisecondsInMinute) / millisecondsInSecond);
        return { years, months, days, hours, minutes, seconds };
    }


    return (
        <div className="app">
            <span>{state.years} Year</span> 
            <span>{state.months} months</span> 
            <span>{state.days} days</span> 
            <span>{state.hours} hours</span> 
            <span>{state.minutes} minutes</span> 
            <span>{state.seconds} seconds</span> 
        </div>
        
    );
};

export default Timer;