import ReactDom from "react-dom";
import { useEffect } from "react";

function Modal({ onClose, className, style, children }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDom.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black opacity-80 z-1000"
      ></div>
      <div
        className={`fixed px-10 bg-white overflow-auto rounded ${className}`}
        style={style}
      >
        {children}
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
