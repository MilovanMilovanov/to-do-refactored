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
    <section className={styles.container}>
      <div
        role="button"
        tabIndex={0}
        className={styles.btnExpand}
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
    </section>
  );
}

export default Accordion;
