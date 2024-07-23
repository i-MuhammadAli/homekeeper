import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { formatPrice } from "../../../utils/helpers";

function RefinanceNumber({ data }) {
  const [format, setFormat] = useState({
    interestFifteen: null,
    interestFifteenPos: true,
    interestThirty: null,
    interestThirtyPos: true,
    monthlyPaymentFifteenPos: true,
    monthlyPaymentFifteenDiff: null,
    monthlyPaymentThirtyPos: true,
    monthlyPaymentThirtyDiff: null,
  });
  const { monthlyPayment } = useSelector((state) => {
    return state.graph.data.fullData;
  });

  useEffect(() => {
    if (data.yearFifteen.extraInterest < 0) {
      setFormat((prevState) => ({
        ...prevState,
        interestFifteenPos: false,
        interestFifteen:
          "-" + formatPrice(-1 * Math.ceil(data.yearFifteen.extraInterest)),
      }));
    }

    if (data.yearFifteen.extraInterest >= 0) {
      setFormat((prevState) => ({
        ...prevState,
        interestFifteenPos: true,
        interestFifteen: formatPrice(Math.ceil(data.yearFifteen.extraInterest)),
      }));
    }

    // console.log(data.yearFifteen.monthlyPayment - monthlyPayment);
    if (data.yearFifteen.monthlyPayment - monthlyPayment > 0) {
      setFormat((prevState) => ({
        ...prevState,
        monthlyPaymentFifteenPos: false,
        monthlyPaymentFifteenDiff: formatPrice(
          Math.ceil(data.yearFifteen.monthlyPayment - monthlyPayment)
        ),
      }));
    }
    if (data.yearFifteen.monthlyPayment - monthlyPayment <= 0) {
      setFormat((prevState) => ({
        ...prevState,
        monthlyPaymentFifteenPos: true,
        monthlyPaymentFifteenDiff: formatPrice(
          Math.ceil(monthlyPayment - data.yearFifteen.monthlyPayment)
        ),
      }));
    }

    if (data.yearThirty.extraInterest < 0) {
      setFormat((prevState) => ({
        ...prevState,
        interestThirtyPos: false,
        interestThirty:
          "-" + formatPrice(-1 * Math.ceil(data.yearThirty.extraInterest)),
      }));
    }

    if (data.yearThirty.extraInterest >= 0) {
      setFormat((prevState) => ({
        ...prevState,
        interestThirtyPos: true,
        interestThirty: formatPrice(Math.ceil(data.yearThirty.extraInterest)),
      }));
    }

    if (data.yearThirty.monthlyPayment - monthlyPayment > 0) {
      setFormat((prevState) => ({
        ...prevState,
        monthlyPaymentThirtyPos: false,
        monthlyPaymentThirtyDiff: formatPrice(
          Math.ceil(data.yearThirty.monthlyPayment - monthlyPayment)
        ),
      }));
    }
    if (data.yearThirty.monthlyPayment - monthlyPayment <= 0) {
      setFormat((prevState) => ({
        ...prevState,
        monthlyPaymentThirtyPos: true,
        monthlyPaymentThirtyDiff: formatPrice(
          Math.ceil(monthlyPayment - data.yearThirty.monthlyPayment)
        ),
      }));
    }
  }, [data, monthlyPayment]);

  const mystyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  //   console.log(data, format);
  return (
    <>
      <div className="overflow-auto bg-white rounded-sm shadow-sm mt-3">
        <div className="sm:flex hidden font-bold text-md mt-4 sm:ml-4 sm:mr-4 ml-2 mr-2 mb-1 text-black">
          REFINANCE NUMBERS
        </div>
        <div className="sm:hidden flex font-bold text-md mt-4 mb-1 text-black items-center justify-center">
          REFINANCE NUMBERS
        </div>
        <hr className="sm:flex hidden border-t-2 border-sky-600 mt-0 w-8 ml-4" />
        <hr className="sm:hidden flex border-t-2 border-sky-600 mt-0 w-8 ml-44" />

        <div className="sm:mb-4 mb-4 mt-6">
          <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-8">
            <div className="sm:w-1/2">
              <div className="font-bold sm:text-3xl text-2xl label_color mb-2 flex items-center justify-center underline">
                15 Year Refinance
              </div>

              <div className="flex flex-col items-center mb-2 items-center justify-center">
                <div className="sm:text-3xl text-2xl font-bold numbers_color">
                  5.8%
                </div>
                <div className="label_color" style={{ fontSize: "14px" }}>
                  Current Rate
                </div>
              </div>

              <div className="flex flex-col items-center mb-2 items-center justify-center">
                <div className={`flex flex-row items-center space-x-2 `}>
                  <div
                    className={`sm:text-3xl text-2xl font-bold ${
                      format.interestFifteenPos
                        ? "numbers_color_pos"
                        : "numbers_color_neg"
                    }`}
                  >
                    {format.interestFifteen}
                  </div>
                  <div
                    className={`text-md font-bold ${
                      format.interestFifteenPos
                        ? "numbers_color_pos"
                        : "numbers_color_neg"
                    }`}
                  >
                    (Loan of Life)
                  </div>
                </div>
                <div className="label_color" style={{ fontSize: "14px" }}>
                  Interest Saved
                </div>
              </div>

              <div className="flex flex-col items-center mb-2 items-center justify-center">
                <div className="flex flex-row items-center numbers_color space-x-2">
                  <div className="sm:text-3xl text-2xl font-bold">
                    {formatPrice(Math.ceil(data.yearFifteen.monthlyPayment))}{" "}
                  </div>
                  <div
                    className={`text-md font-bold ${
                      format.monthlyPaymentFifteenPos
                        ? "numbers_color_pos"
                        : "numbers_color_neg"
                    }`}
                  >
                    (
                    {`${
                      format.monthlyPaymentFifteenPos ? "Pay Less" : "Pay Extra"
                    }`}{" "}
                    {formatPrice(
                      Math.ceil(
                        data.yearFifteen.monthlyPayment - monthlyPayment
                      )
                    )}
                    )
                  </div>
                </div>
                <div className="label_color" style={{ fontSize: "14px" }}>
                  Monthly Payment
                </div>
              </div>
            </div>

            <div className="sm:w-1/2">
              <div className="font-bold sm:text-3xl text-2xl label_color mb-2 flex items-center justify-center underline">
                30 Year Refinance
              </div>

              <div className="flex flex-col items-center mb-2 items-center justify-center">
                <div className="sm:text-3xl text-2xl font-bold numbers_color">
                  6.9%
                </div>
                <div className="label_color" style={{ fontSize: "14px" }}>
                  Current Rate
                </div>
              </div>

              <div className="flex flex-col items-center mb-2 items-center justify-center">
                <div className="flex flex-row items-center space-x-2">
                  <div
                    className={`sm:text-3xl text-2xl font-bold ${
                      format.interestThirtyPos
                        ? "numbers_color_pos"
                        : "numbers_color_neg"
                    }`}
                  >
                    {format.interestThirty}
                  </div>
                  <div
                    className={`text-md font-bold ${
                      format.interestThirtyPos
                        ? "numbers_color_pos"
                        : "numbers_color_neg"
                    }`}
                  >
                    (Loan of Life)
                  </div>
                </div>
                <div className="label_color" style={{ fontSize: "14px" }}>
                  Interest Saved
                </div>
              </div>

              <div className="flex flex-col items-center mb-2 items-center justify-center">
                <div className="flex flex-row items-center numbers_color space-x-2">
                  <div className="sm:text-3xl text-2xl font-bold">
                    {formatPrice(Math.ceil(data.yearThirty.monthlyPayment))}
                  </div>

                  <div
                    className={`text-md font-bold ${
                      format.monthlyPaymentThirtyPos
                        ? "numbers_color_pos"
                        : "numbers_color_neg"
                    }`}
                  >
                    (
                    {`${
                      format.monthlyPaymentThirtyPos ? "Pay Less" : "Pay Extra"
                    }`}{" "}
                    {format.monthlyPaymentThirtyDiff})
                  </div>
                </div>
                <div className="label_color" style={{ fontSize: "14px" }}>
                  Monthly Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="segn">
        <h3 className="apradmin" style={mystyle}>
          Refinance Numbers
        </h3>
        <div className="flex flex-row">
          <div className="w-1/2 ml-4">
            <div className="font-bold text-3xl numbers_color mb-4">
              15 Year Refinance
            </div>
            <div className="flex flex-row items-center space-x-2 ml-4 mb-2">
              <div className="text-sm font-semibold label_color">
                Current Rate
              </div>
              <div className="text-2xl font-bold numbers_color">5.8%</div>
            </div>
            <div className="flex flex-row items-center space-x-2 ml-4 mb-2">
              <div className="text-sm font-semibold label_color">
                Interest Saved
              </div>
              <div className={`flex flex-row items-center space-x-2 `}>
                <div
                  className={`text-2xl font-bold ${
                    format.interestFifteenPos
                      ? "numbers_color_pos"
                      : "numbers_color_neg"
                  }`}
                >
                  {format.interestFifteen}{" "}
                </div>
                <div
                  className={`text-md font-bold ${
                    format.interestFifteenPos
                      ? "numbers_color_pos"
                      : "numbers_color_neg"
                  }`}
                >
                  (Loan of Life)
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2 ml-4 mb-2">
              <div className="text-sm font-semibold label_color">
                Monthly Payment
              </div>
              <div className="flex flex-row items-center text-md font-bold numbers_color space-x-2 ">
                <div className="text-2xl">
                  {formatPrice(Math.ceil(data.yearFifteen.monthlyPayment))}{" "}
                </div>
                <div
                  className={`${
                    format.monthlyPaymentFifteenPos
                      ? "numbers_color_pos"
                      : "numbers_color_neg"
                  }`}
                >
                  (
                  {`${
                    format.monthlyPaymentFifteenPos ? "Pay Less" : "Pay Extra"
                  }`}{" "}
                  {formatPrice(
                    Math.ceil(data.yearFifteen.monthlyPayment - monthlyPayment)
                  )}
                  )
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="font-bold text-3xl numbers_color mb-4">
              30 Year Refinance
            </div>
            <div className="flex flex-row items-center space-x-2 ml-4 mb-2">
              <div className="text-sm font-semibold label_color">
                Current Rate
              </div>
              <div className="text-2xl font-bold numbers_color">6.9%</div>
            </div>
            <div className="flex flex-row items-center space-x-2 ml-4 mb-2">
              <div className="text-sm font-semibold label_color">
                Interest Saved
              </div>
              <div className="flex flex-row items-center space-x-2">
                <div
                  className={`text-2xl font-bold ${
                    format.interestThirtyPos
                      ? "numbers_color_pos"
                      : "numbers_color_neg"
                  }`}
                >
                  {format.interestThirty}
                </div>
                <div
                  className={`text-md font-bold ${
                    format.interestThirtyPos
                      ? "numbers_color_pos"
                      : "numbers_color_neg"
                  }`}
                >
                  (Loan of Life)
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-2 ml-4 mb-2">
              <div className="text-sm font-semibold label_color">
                Monthly Payment
              </div>
              <div className="flex flex-row items-center text-md font-bold numbers_color space-x-2 ">
                <div className="text-2xl">
                  {formatPrice(Math.ceil(data.yearThirty.monthlyPayment))}
                </div>

                <div
                  className={`${
                    format.monthlyPaymentThirtyPos
                      ? "numbers_color_pos"
                      : "numbers_color_neg"
                  }`}
                >
                  (
                  {`${
                    format.monthlyPaymentThirtyPos ? "Pay Less" : "Pay Extra"
                  }`}{" "}
                  {format.monthlyPaymentThirtyDiff})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default RefinanceNumber;
