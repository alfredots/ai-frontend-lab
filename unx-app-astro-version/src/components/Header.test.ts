import { describe, expect, it } from "vitest";
import Header from "./Header.astro";
import { renderAstro } from "../test/renderAstro";

describe("Header (Astro)", () => {
  it("renderiza o logo UNX", async () => {
    const { container } = await renderAstro(Header);
    const logo = container.querySelector(".header__logo");
    expect(logo).not.toBeNull();
    expect(logo).toHaveTextContent("UNX");
  });

  it("possui todos os links de navegacao do design original", async () => {
    const { container } = await renderAstro(Header);
    const links = Array.from(
      container.querySelectorAll<HTMLAnchorElement>(".header__nav-link"),
    ).map((anchor) => anchor.textContent?.trim());

    expect(links).toEqual(["Products", "About", "Resources", "Contact"]);
  });

  it("tem o botao Dashboard", async () => {
    const { container } = await renderAstro(Header);
    const button = container.querySelector(".header__dashboard-button");
    expect(button).not.toBeNull();
    expect(button).toHaveTextContent("Dashboard");
  });

  it("inclui o icone hamburguer com classe BEM correta", async () => {
    const { container } = await renderAstro(Header);
    const menuIcon = container.querySelector(".header__menu-icon");
    expect(menuIcon).not.toBeNull();
    expect(menuIcon?.querySelector("svg")).not.toBeNull();
  });

  it("usa apenas classes do bloco .header (respeitando BEM)", async () => {
    const { container } = await renderAstro(Header);
    const allClasses = Array.from(container.querySelectorAll("[class]"))
      .flatMap((el) => Array.from(el.classList))
      .filter((cls) => cls.length > 0);

    // Classes devem comecar com "header" ou ser de outros blocos reconhecidos
    const allowedPrefixes = ["header"];
    const offenders = allClasses.filter(
      (cls) => !allowedPrefixes.some((prefix) => cls.startsWith(prefix)),
    );

    expect(offenders).toEqual([]);
  });
});
