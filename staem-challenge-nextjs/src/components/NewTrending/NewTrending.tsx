import styles from "./NewTrending.module.css";

export function NewTrending() {
  return (
    <section className={styles.trending} aria-label="new and trending">
      <span className={styles["trending__line"]} />
      <h2 className={styles["trending__title"]}>New &amp; Trending</h2>
      <span className={styles["trending__line"]} />
    </section>
  );
}
