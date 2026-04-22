import { describe, expect, it } from "vitest";
import Index from "../../pages/index.astro";
import { renderAstro } from "../renderAstro";

describe("Pagina / (landing)", () => {
  it("monta o container principal com o borrao decorativo", async () => {
    const { container } = await renderAstro(Index);
    expect(container.querySelector(".page")).not.toBeNull();
    expect(container.querySelector(".page__blur")).not.toBeNull();
    expect(container.querySelector(".page__image")).not.toBeNull();
  });

  it("inclui Header e Hero no HTML final", async () => {
    const { container } = await renderAstro(Index);
    expect(container.querySelector(".header")).not.toBeNull();
    expect(container.querySelector(".hero")).not.toBeNull();
  });

  it("renderiza a imagem do app com alt correto", async () => {
    const { container } = await renderAstro(Index);
    const img = container.querySelector<HTMLImageElement>(".page__image img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("alt")).toBe("imagem do app");
    expect(img?.getAttribute("src")).toContain("app-image.png");
    expect(img?.getAttribute("width")).toBe("1024");
    expect(img?.getAttribute("height")).toBe("418");
  });

  it("contem todos os textos fixos da UI conforme design original", async () => {
    const { container } = await renderAstro(Index);
    const text = container.textContent ?? "";
    for (const expected of [
      "UNX",
      "Products",
      "About",
      "Resources",
      "Contact",
      "Dashboard",
      "The Best Way to",
      "Track your Daily Progress",
      "Try this app",
      "UNX Allows you to track all your daily task progress",
    ]) {
      expect(text).toContain(expected);
    }
  });
});
