import Modal from "../../../common/Modal";
import ModalTitle from "../../../common/ModalTitle";
import LenderInfo from "../LenderInfo";

function LenderInfoModal({ onClose }) {
  return (
    <>
      <Modal
        onClose={onClose}
        style={{
          top: "10%",
          left: "30%",
          width: "40%",
          height: "74%",
        }}
      >
        <div className="container mx-auto">
          <ModalTitle title="Lender" cancel onCancel={onClose} />

          <LenderInfo onClose={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default LenderInfoModal;
