import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles["header__title"]}>STAEM</h1>
      <button className={styles["header__install"]} type="button">
        Install
      </button>
    </header>
  );
}
