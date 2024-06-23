import "../../css/modal.css";

const Modal = ({
  isOpen,
  onClose,
  message,
  primaryButton,
  secondaryButton,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop"></div>
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          {primaryButton && (
            <button
              className="modal-button"
              onClick={() => {
                primaryButton.onClick();
                onClose();
              }}
            >
              {primaryButton.text}
            </button>
          )}
          {secondaryButton && (
            <button
              className="modal-button"
              onClick={() => {
                secondaryButton.onClick();
                onClose();
              }}
            >
              {secondaryButton.text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
