"use client";

import { useEffect, useRef } from "react";
import type { Game } from "@/domain/game";
import { GameCard } from "@/components/GameCard/GameCard";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { SortSelect } from "@/components/SortSelect/SortSelect";
import { useGamesCatalogViewModel } from "@/view-models/useGamesCatalogViewModel";
import styles from "./GamesCatalog.module.css";

type GamesCatalogProps = {
  allGames: Game[];
  pageSize: number;
};

export function GamesCatalog({ allGames, pageSize }: GamesCatalogProps) {
  const {
    searchTerm,
    sortOption,
    visibleGames,
    canLoadMore,
    handleSearchChange,
    handleSortChange,
    loadMoreGames,
  } = useGamesCatalogViewModel({ allGames, pageSize });

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMoreGames();
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMoreGames]);

  return (
    <section className={styles.catalog} aria-label="games catalog">
      <div className={styles["catalog__controls"]}>
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <SortSelect value={sortOption} onChange={handleSortChange} />
      </div>

      <div className={styles["catalog__list"]}>
        {visibleGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {canLoadMore && <div ref={sentinelRef} />}
    </section>
  );
}
