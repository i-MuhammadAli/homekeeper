import React from "react";
import { formatPrice } from "../../../utils/helpers";

const EquityLoanChart = ({ home, equity, loan }) => {
  const total = equity + loan;
  const equityPercentage = (equity / total) * 100;
  const loanPercentage = (loan / total) * 100;

  return (
    <div className="h-64 space-y-1">
      <div
        className="flex items-center justify-center"
        style={{ background: "#4472c4", height: `15%` }}
      >
        <span className="text-white text-xs font-semibold">
          {formatPrice(home)} (Home Value)
        </span>
      </div>
      <div
        className="flex items-center justify-center"
        style={{ background: "#00ab44", height: `${equityPercentage}%` }}
      >
        <span className="text-white text-xs font-semibold">
          {formatPrice(equity)} (Equity)
        </span>
      </div>
      <div
        className="flex items-center justify-center"
        style={{ background: "#f4b243", height: `${loanPercentage}%` }}
      >
        <span className="text-white text-xs font-semibold">
          {formatPrice(loan)} (Loan)
        </span>
      </div>
    </div>
  );
};

export default EquityLoanChart;
