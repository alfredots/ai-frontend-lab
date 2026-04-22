/**
 * Helper de teste — renderiza um componente .astro e retorna um
 * DOM fragment pronto para queries via Testing Library.
 *
 * Usa a API oficial `astro/container`: https://docs.astro.build/en/reference/container-reference/
 */
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getQueriesForElement } from "@testing-library/dom";

export async function renderAstro(
  Component: AstroComponentFactory,
  props: Record<string, unknown> = {},
) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Component, { props });

  const host = document.createElement("div");
  host.innerHTML = html;

  return {
    html,
    container: host,
    ...getQueriesForElement(host),
  };
}
