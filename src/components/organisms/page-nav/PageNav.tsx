import { NavLink } from "react-router";
import styles from "./PageNav.module.scss";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink className="cta" to="/">
            home
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink className="cta" to="/tasks">
            tasks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
