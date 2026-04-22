import { describe, expect, it } from "vitest";
import Hero from "./Hero.astro";
import { renderAstro } from "../test/renderAstro";

describe("Hero (Astro)", () => {
  it("renderiza o titulo em duas linhas com o texto exato do design", async () => {
    const { container } = await renderAstro(Hero);
    const titles = container.querySelectorAll(".hero__title");
    expect(titles.length).toBe(2);
    expect(titles[0]).toHaveTextContent("The Best Way to");
    expect(titles[1]).toHaveTextContent("Track your Daily Progress");
  });

  it("aplica o modifier --gradient apenas na segunda linha do titulo", async () => {
    const { container } = await renderAstro(Hero);
    const titles = container.querySelectorAll(".hero__title");
    expect(titles[0].classList.contains("hero__title--gradient")).toBe(false);
    expect(titles[1].classList.contains("hero__title--gradient")).toBe(true);
  });

  it("tem o subtitulo descrevendo o produto", async () => {
    const { container } = await renderAstro(Hero);
    const subtitle = container.querySelector(".hero__subtitle");
    expect(subtitle).not.toBeNull();
    expect(subtitle).toHaveTextContent(
      /UNX Allows you to track all your daily task progress using gamification methods and earn rewards for specific coupons/,
    );
  });

  it("expoe o CTA Try this app", async () => {
    const { container } = await renderAstro(Hero);
    const cta = container.querySelector(".hero__cta");
    expect(cta).not.toBeNull();
    expect(cta).toHaveTextContent("Try this app");
    expect(cta?.tagName).toBe("BUTTON");
  });
});
