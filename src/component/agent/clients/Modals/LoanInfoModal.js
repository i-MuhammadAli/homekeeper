import Modal from "../../../common/Modal";
import ModalTitle from "../../../common/ModalTitle";
import LoanInfo from "../LoanInfo";

function LoanInfoModal({ onClose }) {
  return (
    <>
      <Modal
        onClose={onClose}
        style={{
          top: "9%",
          left: "18%",
          width: "64%",
          height: "82%",
        }}
      >
        <div className="container mx-auto">
          <ModalTitle title="Loan Information" cancel onCancel={onClose} />
          <LoanInfo onClose={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default LoanInfoModal;
