import { HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { FieldError } from "react-hook-form";

import ErrorIcon from "../../../assets/icons/error-icon.svg";

import styles from "./ValidationTooltip.module.scss";

interface ValidationTooltipModel extends HTMLAttributes<HTMLElement> {
  portalTarget: HTMLDivElement | null;
  error: FieldError | undefined;
}

function ValidationTooltip({
  id,
  error,
  children,
  portalTarget,
}: ValidationTooltipModel) {
  return (
    <>
      {children}
      {error &&
        createPortal(
          <>
            <span
              id={id}
              role="tooltip"
              aria-live="assertive"
              className={styles.tooltipError}
            >
              {error.message}
            </span>
            <ErrorIcon
              role="img"
              aria-label="error icon"
              className={styles.errorIcon}
            />
          </>,
          portalTarget as Element
        )}
    </>
  );
}

export default ValidationTooltip;
