"use client";

import { useMemo, useState } from "react";
import type { Game, SortOption } from "@/domain/game";
import { paginateGames, queryGames } from "@/lib/gameRepository";

type UseGamesCatalogViewModelParams = {
  allGames: Game[];
  pageSize: number;
};

export function useGamesCatalogViewModel({
  allGames,
  pageSize,
}: UseGamesCatalogViewModelParams) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGames = useMemo(
    () => queryGames(allGames, searchTerm, sortOption),
    [allGames, searchTerm, sortOption],
  );

  const visibleGames = useMemo(
    () => paginateGames(filteredGames, currentPage),
    [filteredGames, currentPage],
  );

  const canLoadMore = visibleGames.length < filteredGames.length;

  const handleSearchChange = (nextSearchTerm: string) => {
    setCurrentPage(1);
    setSearchTerm(nextSearchTerm);
  };

  const handleSortChange = (nextSortOption: SortOption) => {
    setCurrentPage(1);
    setSortOption(nextSortOption);
  };

  const loadMoreGames = () => {
    setCurrentPage((previous) => previous + 1);
  };

  return {
    pageSize,
    searchTerm,
    sortOption,
    visibleGames,
    totalGames: filteredGames.length,
    canLoadMore,
    handleSearchChange,
    handleSortChange,
    loadMoreGames,
  };
}
