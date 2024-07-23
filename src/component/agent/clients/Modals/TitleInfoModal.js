import Modal from "../../../common/Modal";
import ModalTitle from "../../../common/ModalTitle";
import TitleInfo from "../TitleInfo";

function TitleInfoModal({ onClose }) {
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
          <ModalTitle title="Title Company" cancel onCancel={onClose} />
          <TitleInfo onClose={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default TitleInfoModal;
