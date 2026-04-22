import styles from "./SearchBar.module.css";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className={styles.search}>
      <span className={styles["search__label"]}>Search</span>
      <input
        className={styles["search__input"]}
        type="text"
        value={value}
        placeholder="Type a game title"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
