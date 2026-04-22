"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Game } from "@/domain/game";
import styles from "./HeroCarousel.module.css";

type HeroCarouselProps = {
  games: Game[];
};

export function HeroCarousel({ games }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

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
          {games.map((game, index) => (
            <article
              className={`${styles["carousel__slide"]} ${
                index === selectedIndex ? styles["carousel__slide--active"] : ""
              }`}
              key={game.id}
            >
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

      <div className={styles["carousel__dots"]} aria-label="carousel navigation">
        {games.map((game, index) => (
          <button
            key={game.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex}
            className={`${styles["carousel__dot"]} ${
              index === selectedIndex ? styles["carousel__dot--active"] : ""
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
