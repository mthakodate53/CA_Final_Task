const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  primaryButton,
  secondaryButton,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          {primaryButton && (
            <button
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
