import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { GamesCatalog } from "./GamesCatalog";
import { GAMES } from "@/data/games";

describe("GamesCatalog", () => {
  it("filters games by search term", async () => {
    const user = userEvent.setup();

    render(<GamesCatalog allGames={GAMES} pageSize={6} />);

    await user.type(screen.getByRole("textbox"), "hades");

    expect(screen.getByRole("link", { name: "Hades" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });

  it("sorts games by title", async () => {
    const user = userEvent.setup();

    render(<GamesCatalog allGames={GAMES} pageSize={6} />);

    await user.selectOptions(screen.getByRole("combobox"), "title");

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Barton Lynch Pro Surfing 2022");
  });

  it("loads more games when sentinel becomes visible", () => {
    let observerCallback: IntersectionObserverCallback | null = null;

    class SpyIntersectionObserver {
      observe = vi.fn();
      disconnect = vi.fn();
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
    }

    vi.stubGlobal("IntersectionObserver", SpyIntersectionObserver);

    render(<GamesCatalog allGames={GAMES} pageSize={6} />);

    expect(screen.getAllByRole("article")).toHaveLength(6);

    act(() => {
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getAllByRole("article")).toHaveLength(12);

    vi.unstubAllGlobals();
  });
});
