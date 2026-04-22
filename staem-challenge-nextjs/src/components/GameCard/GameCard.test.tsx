import { render, screen } from "@testing-library/react";
import { GameCard } from "./GameCard";

const game = {
  id: 99,
  title: "Test Game",
  link: "https://example.com/game",
  image: "https://example.com/image.jpg",
  price: "10.00",
  tags: ["Action", "Indie"],
  platforms: ["Windows"],
  genre: "Action",
};

describe("GameCard", () => {
  it("renders game information", () => {
    render(<GameCard game={game} />);

    expect(screen.getByRole("link", { name: "Test Game" })).toHaveAttribute(
      "href",
      "https://example.com/game",
    );
    expect(screen.getByText("Action, Indie")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });
});
