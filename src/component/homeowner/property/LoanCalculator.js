import React, { useState } from "react";

function LoanCalculator() {
  const [purchaseDate, setPurchaseDate] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(4);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayments, setMonthlyPayments] = useState([]);
  const [homeValues, setHomeValues] = useState([]);
  const [loanValues, setLoanValues] = useState([]);
  const [equities, setEquities] = useState([]);

  const handleCalculate = () => {
    // Calculate number of months since purchase date
    const currentDate = new Date();
    const purchaseDateObj = new Date(purchaseDate);
    const monthsElapsed =
      (currentDate.getFullYear() - purchaseDateObj.getFullYear()) * 12 +
      (currentDate.getMonth() - purchaseDateObj.getMonth());

    // Initialize arrays to store monthly data points
    const monthlyPaymentsArray = [];
    const homeValuesArray = [];
    const loanValuesArray = [];
    const equitiesArray = [];

    // Calculate monthly payment
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    const monthlyPaymentValue =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      denominator;

    // Set initial home value and equity
    let currentHomeValue = loanAmount;
    let remainingLoanBalance = loanAmount;

    // Calculate home value appreciation and remaining loan balance for each month
    const monthlyAppreciationRate = 0.03 / 12; // Assuming 3% annual appreciation rate
    for (let i = 0; i <= monthsElapsed; i++) {
      currentHomeValue *= 1 + monthlyAppreciationRate;
      const currentMonth = new Date(
        purchaseDateObj.getFullYear(),
        purchaseDateObj.getMonth() + i
      );
      const currentEquity = currentHomeValue - loanAmount;

      // Calculate remaining loan balance
      const monthlyInterest = remainingLoanBalance * monthlyInterestRate;
      const principalPayment = monthlyPaymentValue - monthlyInterest;
      remainingLoanBalance -= principalPayment;

      // Push data to arrays
      monthlyPaymentsArray.push({
        date: currentMonth,
        value: monthlyPaymentValue.toFixed(2),
      });
      homeValuesArray.push({
        date: currentMonth,
        value: currentHomeValue.toFixed(2),
      });
      loanValuesArray.push({
        date: currentMonth,
        value: remainingLoanBalance.toFixed(2),
      });
      equitiesArray.push({
        date: currentMonth,
        value: currentEquity.toFixed(2),
      });
    }

    // Update state
    setMonthlyPayments(monthlyPaymentsArray);
    setHomeValues(homeValuesArray);
    setLoanValues(loanValuesArray);
    setEquities(equitiesArray);
  };

  return (
    <div>
      <h2>Loan Calculator</h2>
      <label>
        Purchase Date:
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Loan Amount ($):
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Interest Rate (%):
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Loan Term (years):
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleCalculate}>Calculate</button>
      <br />
      <h3>Results:</h3>
      {/* <h4>Monthly Payments:</h4>
      <ul>
        {monthlyPayments.map((payment, index) => (
          <li key={index}>
            {payment.date.toLocaleDateString()}: ${payment.value}
          </li>
        ))}
      </ul> */}
      <h4>Home Values:</h4>
      <ul>
        {homeValues.map((value, index) => (
          <li key={index}>
            {value.date.toLocaleDateString()}: ${value.value}
          </li>
        ))}
      </ul>
      <h4>Equity Values:</h4>
      <ul>
        {equities.map((value, index) => (
          <li key={index}>
            {value.date.toLocaleDateString()}: ${value.value}
          </li>
        ))}
      </ul>
      <h4>Remaining Loan Balance:</h4>
      <ul>
        {loanValues.map((equity, index) => (
          <li key={index}>
            {equity.date.toLocaleDateString()}: ${equity.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoanCalculator;
