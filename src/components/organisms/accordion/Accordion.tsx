import { HTMLAttributes, ReactNode } from "react";

import styles from "./Accordion.module.scss";

interface AccordionModel extends HTMLAttributes<HTMLElement> {
  title: string;
  isCollapsed: boolean;
  id: string;
  children: ReactNode;
  toggleElement: (id: string) => void;
}

function Accordion({
  id,
  title,
  isCollapsed,
  children,
  toggleElement,
}: AccordionModel) {
  return (
    <div className={styles.container}>
      <div
        role="button"
        tabIndex={0}
        className={`${styles.toggleSection} ${isCollapsed?styles['toggleSection--closed'] :styles['toggleSection--expanded'] }`}
        aria-expanded={!isCollapsed}
        aria-controls={id}
        onClick={() => toggleElement(id)}
      >
        <span className={`${styles.title}`}>{title}</span>
        <span className={isCollapsed ? styles.arrowDown : styles.arrowUp}>
          {isCollapsed ? "▼" : "▲"}
        </span>
      </div>

      {!isCollapsed && children}
    </div>
  );
}

export default Accordion;
