import { FEATURED_GAME_TITLES, GAMES } from "@/data/games";
import type { Game, SortOption } from "@/domain/game";

const PAGE_SIZE = 6;

const sortByTitle = (a: Game, b: Game) => a.title.localeCompare(b.title);

const sortByPrice = (a: Game, b: Game) => Number(a.price) - Number(b.price);

export function getAllGames(): Game[] {
  return [...GAMES];
}

export function getFeaturedGames(): Game[] {
  return GAMES.filter((game) => FEATURED_GAME_TITLES.includes(game.title));
}

export function getPageSize(): number {
  return PAGE_SIZE;
}

export function queryGames(
  games: Game[],
  searchTerm: string,
  sortOption: SortOption,
): Game[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredGames = normalizedSearch
    ? games.filter((game) => game.title.toLowerCase().includes(normalizedSearch))
    : [...games];

  if (sortOption === "title") {
    return filteredGames.sort(sortByTitle);
  }

  if (sortOption === "price") {
    return filteredGames.sort(sortByPrice);
  }

  return filteredGames;
}

export function paginateGames(games: Game[], page: number): Game[] {
  return games.slice(0, page * PAGE_SIZE);
}
