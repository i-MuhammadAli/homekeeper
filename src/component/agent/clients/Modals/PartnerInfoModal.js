import Modal from "../../../common/Modal";
import ModalTitle from "../../../common/ModalTitle";
import PartnerInfo from "../PartnerInfo";

function PartnerInfoModal({ onClose }) {
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
          <ModalTitle title="Partner Information" cancel onCancel={onClose} />
          <PartnerInfo onClose={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default PartnerInfoModal;
