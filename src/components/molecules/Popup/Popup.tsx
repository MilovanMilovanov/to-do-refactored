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
  if (!isOpen) return <>{children}</>;

  const handleConfirm = () => {
    action();
    setIsOpen(false);
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <section
      role={role}
      aria-modal="true"
      aria-labelledby="popup-title"
      className={styles.container}
    >
      <div className={`${styles.content} ${className}`}>
        <h3 id="popup-title" className={styles.title}>
          {message}
        </h3>
        <div className={styles.btnContainer}>
          <Button onClick={handleConfirm} aria-label="Confirm Deletion">
            Confirm
          </Button>
          <Button onClick={handleCancel} aria-label="Cancel Deletion">
            Cancel
          </Button>
        </div>
      </div>
      <div className={styles.children}>{children}</div>
    </section>
  );
}

export default Popup;
