import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GamesCatalog } from "./GamesCatalog";
import { GAMES } from "@/data/games";

describe("GamesCatalog", () => {
  it("filters games by search term", async () => {
    const user = userEvent.setup();

    render(<GamesCatalog allGames={GAMES} pageSize={6} />);

    await user.type(screen.getByRole("textbox"), "hades");

    expect(screen.getByRole("link", { name: "Hades" })).toBeInTheDocument();
    expect(screen.getByText("1 game(s) found")).toBeInTheDocument();
  });

  it("sorts games by title", async () => {
    const user = userEvent.setup();

    render(<GamesCatalog allGames={GAMES} pageSize={6} />);

    await user.selectOptions(screen.getByRole("combobox"), "title");

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Barton Lynch Pro Surfing 2022");
  });

  it("loads more games when button is clicked", async () => {
    const user = userEvent.setup();

    render(<GamesCatalog allGames={GAMES} pageSize={6} />);

    expect(screen.getAllByRole("article")).toHaveLength(6);

    await user.click(screen.getByRole("button", { name: "Load more games" }));

    expect(screen.getAllByRole("article")).toHaveLength(12);
  });
});
