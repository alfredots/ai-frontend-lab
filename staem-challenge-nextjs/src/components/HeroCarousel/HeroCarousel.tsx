"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect } from "react";
import type { Game } from "@/domain/game";
import styles from "./HeroCarousel.module.css";

type HeroCarouselProps = {
  games: Game[];
};

export function HeroCarousel({ games }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

  useEffect(() => {
    if (!emblaApi || games.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => window.clearInterval(timer);
  }, [emblaApi, games.length]);

  return (
    <section className={styles.carousel} aria-label="featured games">
      <div className={styles["carousel__viewport"]} ref={emblaRef}>
        <div className={styles["carousel__container"]}>
          {games.map((game) => (
            <article className={styles["carousel__slide"]} key={game.id}>
              <a href={game.link} target="_blank" rel="noreferrer">
                <Image
                  className={styles["carousel__image"]}
                  src={game.image}
                  alt={game.title}
                  width={616}
                  height={353}
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
