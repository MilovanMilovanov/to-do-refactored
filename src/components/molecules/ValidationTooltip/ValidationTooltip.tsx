import { HTMLAttributes } from "react";
import { createPortal } from "react-dom";

import styles from "./ValidationTooltip.module.scss";
import { FieldError } from "react-hook-form";

interface ValidationTooltipModel extends HTMLAttributes<HTMLElement> {
    portalTarget: HTMLDivElement | null;
    error: FieldError | undefined;
};

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
                    <span
                        id={id}
                        role="tooltip"
                        aria-live="assertive"
                        className={styles.tooltipError}>{error.message}</span>,
                    portalTarget as Element
                )}
        </>
    );
}

export default ValidationTooltip;
