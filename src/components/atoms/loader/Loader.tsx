import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div
      className={styles.spinnerContainer}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Loader;
