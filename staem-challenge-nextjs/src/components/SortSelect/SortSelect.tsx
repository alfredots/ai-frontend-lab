import type { SortOption } from "@/domain/game";
import styles from "./SortSelect.module.css";

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className={styles.sort}>
      <span className={styles["sort__label"]}>Sort by:</span>
      <select
        className={styles["sort__select"]}
        aria-label="Sort by"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/arrow-down.svg')` }}
      >
        <option value="default">Default</option>
        <option value="price">Price</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}
