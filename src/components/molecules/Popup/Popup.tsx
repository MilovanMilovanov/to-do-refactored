import { Dispatch, HTMLAttributes, SetStateAction } from "react";
import Button from "../../atoms/button/Button";
import styles from "./Popup.module.scss";

interface PopupModel extends HTMLAttributes<HTMLElement> {
  message: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  action: () => void;
}

function Popup({
  role = "dialog",
  className = "",
  message,
  isOpen,
  children,
  setIsOpen,
  action,
}: PopupModel) {
  const handleConfirmation = () => {
    action();
    setIsOpen(false);
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <section className={styles.container}>
      {isOpen && (
        <div
          className={`${styles.confirmationPopup} ${className}`}
          role={role}
          aria-labelledby="popup-title"
          aria-modal="true"
        >
          <h3 id="popup-title" className={styles.popupMessage}>
            {message}
          </h3>
          <div className={styles.btnContainer}>
            <Button onClick={handleConfirmation} aria-label="Confirm Deletion">
              Delete
            </Button>
            <Button onClick={handleCancel} aria-label="Cancel Deletion">
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}

export default Popup;
