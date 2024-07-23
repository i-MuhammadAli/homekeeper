import Modal from "../../../common/Modal";
import ModalTitle from "../../../common/ModalTitle";
import PropertyInfo from "../PropertyInfo";

function PropertyInfoModal({ onClose }) {
  return (
    <>
      <Modal
        onClose={onClose}
        style={{
          top: "10%",
          left: "25%",
          width: "50%",
          height: "50%",
        }}
      >
        <div className="container mx-auto">
          <ModalTitle title="Property Information" cancel onCancel={onClose} />
          <PropertyInfo onClose={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default PropertyInfoModal;
