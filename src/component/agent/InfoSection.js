import { useSelector } from "react-redux";
import React from "react";
import { FiCalendar, FiMail, FiUser, FiPhone } from "react-icons/fi";
import { formatPrice, localeDateString } from "../../utils/helpers";

function InfoSection() {
  const { firstName, lastName, email, phone, dob } = useSelector((state) => {
    return state.clientForm.form.clientInfo;
  });

  const spouseInfo = useSelector((state) => {
    return state.clientForm.form.spouseInfo;
  });

  const { address, hasSpouse } = useSelector((state) => {
    return state.clientForm.form;
  });

  const { paymentType, cash, manualOption, manual, askLender, lender } =
    useSelector((state) => {
      return state.clientForm.form.lenderInfo;
    });

  const { dop, purchaseValue, homeValue } = useSelector((state) => {
    return state.clientForm.form.propertyInfo;
  });

  const lenders = useSelector((state) => {
    return state.lenders.data;
  });

  let lenderDetails = { name: "" };
  if (lender.id !== "") {
    lenderDetails = lenders.find((item) => String(item.id) === lender.id);
  }

  return (
    <>
      {/* <h5>Owner</h5> */}
      <div className="col-sm-4">
        <p>
          <FiUser className="w-4 h-4 text-black mr-2" />
          {firstName} {lastName}
        </p>
        <p>
          <FiCalendar className="w-4 h-4 text-black mr-2" />
          {dob ? localeDateString(new Date(dob)) : "-"}
        </p>
        <p>
          <FiMail className="w-4 h-4 text-black mr-2" />
          {email}
        </p>
        <p>
          <FiPhone className="w-4 h-4 text-black mr-2" />
          {phone}
        </p>
      </div>
      {hasSpouse ? (
        <>
          {/* <h5>Partner</h5> */}
          <div className="col-sm-4">
            <p>
              <FiUser className="w-4 h-4 text-black mr-2" />
              {spouseInfo.firstName} {spouseInfo.lastName}
            </p>
            <p>
              <FiCalendar className="w-4 h-4 text-black mr-2" />
              {spouseInfo.dob}
            </p>
            <p>
              <FiMail className="w-4 h-4 text-black mr-2" />
              {spouseInfo.email}
            </p>
            <p>
              <FiPhone className="w-4 h-4 text-black mr-2" />
              {spouseInfo.phone}
            </p>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="col-sm-4">
        {address && (
          <p>
            <span
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "x-small",
                marginRight: "12px",
                // marginRight: "18px",
              }}
            >
              ADDRESS
            </span>
            {address}
          </p>
        )}

        {dop && (
          <p>
            <span
              style={{
                color: "black",
                fontSize: "x-small",
                marginRight: "12px",
                fontWeight: "bold",
              }}
            >
              DATE OF PURCHASE
            </span>
            {dop}
          </p>
        )}

        {purchaseValue && (
          <p>
            <span
              style={{
                color: "black",
                fontSize: "x-small",
                marginRight: "12px",
                fontWeight: "bold",
              }}
            >
              PURCHASED PRICE
            </span>
            {formatPrice(purchaseValue)}
          </p>
        )}
        {homeValue && (
          <p>
            <span
              style={{
                color: "black",
                fontSize: "x-small",
                marginRight: "12px",
                fontWeight: "bold",
              }}
            >
              HOME VALUE
            </span>
            {formatPrice(homeValue)}
          </p>
        )}
        <p>
          {!askLender && manual.loanAmount && (
            <>
              <span
                style={{
                  color: "black",
                  fontSize: "x-small",
                  marginRight: "12px",
                  fontWeight: "bold",
                }}
              >
                LOAN AMOUNT
              </span>
              {manual.loanAmount && <>{formatPrice(manual.loanAmount)} </>}
              {manual.apr && <>@{manual.apr}% </>}
            </>
          )}
          {askLender && lender.id !== "" && (
            <>
              <span
                style={{
                  color: "black",
                  fontSize: "x-small",
                  marginRight: "12px",
                  fontWeight: "bold",
                }}
              >
                LENDER
              </span>
              {lenderDetails.name}
            </>
          )}
          {askLender && lender.id === "" && (
            <>
              <span
                style={{
                  color: "black",
                  fontSize: "x-small",
                  marginRight: "12px",
                  fontWeight: "bold",
                }}
              >
                LENDER
              </span>
              {lender.lendorData.name}
            </>
          )}
        </p>
      </div>
    </>
  );
}

export default InfoSection;
