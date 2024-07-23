import Modal from "../../../common/Modal";
import ModalTitle from "../../../common/ModalTitle";
import DocumentInfo from "../DocumentInfo";

function DocumentInfoModal({ onClose }) {
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
          <ModalTitle title="Upload Document" cancel onCancel={onClose} />
          <DocumentInfo onClose={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default DocumentInfoModal;
