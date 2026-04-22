import Image from "next/image";
import type { Game } from "@/domain/game";
import styles from "./GameCard.module.css";

type GameCardProps = {
  game: Game;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <article className={styles.card}>
      <Image
        className={styles["card__image"]}
        src={game.image}
        alt={game.title}
        width={616}
        height={353}
      />
      <div className={styles["card__content"]}>
        <a
          className={styles["card__title"]}
          href={game.link}
          target="_blank"
          rel="noreferrer"
        >
          {game.title}
        </a>
        <p className={styles["card__tags"]}>{game.tags.join(", ")}</p>
        <footer className={styles["card__footer"]}>
          <span className={styles["card__platform"]}>{game.platforms.join(" /")}</span>
          <strong className={styles["card__price"]}>${game.price}</strong>
        </footer>
      </div>
    </article>
  );
}
