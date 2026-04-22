import Image from "next/image";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles["header__title"]}>STAEM</h1>
      <button className={styles["header__install"]} type="button">
        <Image
          src="/img/install-icon.svg"
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
        />
        Install
      </button>
    </header>
  );
}
