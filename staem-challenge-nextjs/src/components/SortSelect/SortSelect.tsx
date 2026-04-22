import type { SortOption } from "@/domain/game";
import styles from "./SortSelect.module.css";

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className={styles.sort}>
      <span className={styles["sort__label"]}>Sort by</span>
      <select
        className={styles["sort__select"]}
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        <option value="default">Default</option>
        <option value="price">Price</option>
        <option value="title">Title</option>
      </select>
    </label>
  );
}
