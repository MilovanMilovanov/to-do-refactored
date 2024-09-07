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
  isOpen,
  message,
  children,
  action,
  setIsOpen,
}: PopupModel) {
  const handleConfirmation = () => {
    action();
    setIsOpen(false);
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <>
      {isOpen ? (
        <section className={styles.container}>
          <div
            role={role}
            aria-labelledby="popup-title"
            aria-modal="true"
            className={`${styles.modal} ${className}`}
          >
            <div className={styles.content}>
              <h3 id="popup-title" className={styles.title}>
                {message}
              </h3>
              <div className={styles.btnContainer}>
                <Button
                  onClick={handleConfirmation}
                  aria-label="Confirm Deletion"
                >
                  Confirm
                </Button>
                <Button onClick={handleCancel} aria-label="Cancel Deletion">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          {children}
        </section>
      ) : (
        children
      )}
    </>
  );
}

export default Popup;
