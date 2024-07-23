import Modal from "../../../common/Modal";
import ModalTitle from "../../../common/ModalTitle";
import InspectorInfo from "../InspectorInfo";

function InspectorInfoModal({ onClose }) {
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
          <ModalTitle title="Home Inspector" cancel onCancel={onClose} />
          <InspectorInfo onClose={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default InspectorInfoModal;
