import Modal from "../../../common/Modal";
import ModalTitle from "../../../common/ModalTitle";
import OwnerInfo from "../OwnerInfo";

function OwnerInfoModal({ onClose }) {
  return (
    <>
      <Modal
        onClose={onClose}
        style={{
          top: "18%",
          left: "25%",
          width: "50%",
          height: "64%",
        }}
      >
        <div className="container mx-auto">
          <ModalTitle title="Owner Information" cancel onCancel={onClose} />
          <OwnerInfo onClose={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default OwnerInfoModal;
