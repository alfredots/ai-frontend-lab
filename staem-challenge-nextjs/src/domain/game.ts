export type Game = {
  id: number;
  title: string;
  link: string;
  image: string;
  price: string;
  tags: string[];
  platforms: string[];
  genre: string;
};

export type SortOption = "default" | "price" | "title";
