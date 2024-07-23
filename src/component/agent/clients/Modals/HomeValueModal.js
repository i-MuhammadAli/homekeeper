import Modal from "../../../common/Modal";
import ModalTitle from "../../../common/ModalTitle";
import HomeValue from "../HomeValue";

function HomeValueModal({ title, item, onClose }) {
  return (
    <>
      <Modal
        onClose={onClose}
        style={{
          top: "20%",
          left: "22%",
          width: "56%",
          height: "42%",
        }}
      >
        <div className="container mx-auto">
          <ModalTitle title={title} cancel onCancel={onClose} />
          <HomeValue item={item} onClose={onClose} />
        </div>
      </Modal>
    </>
  );
}

export default HomeValueModal;
