# unx-app-astro-version

Port da landing page **UNX** — originalmente feita em **Next.js 13 + Tailwind** —
para **Astro 4 + TypeScript + CSS puro (BEM)**.

O projeto original vive em `../original/unx-app` e foi usado como referência
de pixel a pixel: mesmas cores, mesmas fontes, mesmo gradiente no título,
mesmos textos, mesma hierarquia visual. A versão aqui reescrita entrega a
**mesma interface** produzindo um site **100% estático, sem JS no cliente,
sem framework CSS**, com testes de componente rodando diretamente em
memória via `astro/container`.

---

## Proposta

A pergunta que guiou o projeto foi: *“é possível manter exatamente a mesma
experiência visual do UNX, mas com um stack mais leve, mais explícito e mais
fácil de manter a longo prazo?”*

A resposta é esta pasta. Em particular:

- **Astro no lugar de Next.js** — a landing não precisa de SSR, roteamento
  dinâmico ou client-side routing. Astro gera HTML estático puro; o bundle
  JS enviado ao navegador é **zero** (exceto fontes externas). Isso melhora
  LCP, simplifica o deploy (qualquer CDN estática serve) e elimina o runtime
  do React da página.
- **CSS puro em BEM no lugar de Tailwind** — em vez de acumular utilitários
  no JSX, o estilo vira uma API semântica (`hero__title--gradient`,
  `header__dashboard-button`). Cada bloco mora num arquivo próprio em
  `src/styles/blocks/`, os tokens de design ficam em `tokens.css` como CSS
  custom properties. É mais código do que Tailwind, mas é código que se lê
  sozinho, funciona sem build-tool de CSS e não depende de nenhum plugin.
- **TypeScript strict** em toda a superfície — `.astro`, helpers de teste,
  tipagem de props. O `tsconfig.json` estende `astro/tsconfigs/strict`.
- **Testes de componente via `astro/container`** — em vez de testar só o
  HTML gerado pelo build, cada componente `.astro` é renderizado em memória
  pela API oficial do Astro e inspecionado com `@testing-library/dom`.
  Assim dá para asserir texto exato, classes BEM e estrutura do DOM sem
  precisar de browser nem de build.
- **Deploy estático alinhado ao ai-frontend-lab** — `astro.config.mjs` lê a
  env var `SITE_BASE` para montar o subpath correto (`/ai-frontend-lab/unx-app-astro-version/`),
  exatamente como o `scripts/publish-projects.mjs` do repositório espera.
  Nada de configuração especial no workflow de Pages.

---

## Stack

- [Astro 4](https://astro.build) — saída estática, zero JS no cliente
- TypeScript strict
- CSS puro em **BEM** (Block, Element, Modifier) + design tokens em CSS custom properties
- [Vitest](https://vitest.dev) + [@testing-library/dom](https://testing-library.com) + [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) + [happy-dom](https://github.com/capricorn86/happy-dom)
- [`astro/container`](https://docs.astro.build/en/reference/container-reference/) para renderizar componentes `.astro` em memória nos testes
- Fontes Inter e Poppins via Google Fonts (preconnect)

---

## Estrutura

```
unx-app-astro-version/
├─ public/
│  ├─ app-image.png         # imagem do app (copiada do original)
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ Header.astro       # logo UNX + nav + Dashboard + icone mobile
│  │  ├─ Header.test.ts
│  │  ├─ Hero.astro         # titulo em duas linhas + subtitulo + CTA
│  │  ├─ Hero.test.ts
│  │  └─ MenuIcon.astro     # hamburguer em SVG
│  ├─ layouts/
│  │  └─ BaseLayout.astro   # <html>, <head>, fontes, import global.css
│  ├─ pages/
│  │  ├─ index.astro        # landing (/)
│  │  └─ index.test.ts      # teste de integracao da pagina
│  ├─ styles/
│  │  ├─ tokens.css         # cores, fontes, gradiente
│  │  ├─ reset.css          # reset minimo
│  │  ├─ blocks/
│  │  │  ├─ page.css        # .page + blur decorativo + area da imagem
│  │  │  ├─ header.css      # .header + __logo / __nav / __nav-link / ...
│  │  │  └─ hero.css        # .hero + __title (--gradient) / __subtitle / __cta
│  │  └─ global.css         # entry point que importa todos os arquivos acima
│  └─ test/
│     ├─ setup.ts           # importa @testing-library/jest-dom/vitest
│     └─ renderAstro.ts     # helper que usa astro/container
├─ astro.config.mjs
├─ vitest.config.ts
├─ tsconfig.json
└─ package.json
```

---

## Design tokens

Todos os valores do design do UNX moram em `src/styles/tokens.css` como CSS
custom properties, expostos no `:root`:

| Token                          | Valor                                                    | Uso                              |
|--------------------------------|----------------------------------------------------------|----------------------------------|
| `--unx-color-cursed-black`     | `#131313`                                                | fundo da página                  |
| `--unx-color-palladium`        | `#b0b0b0`                                                | subtítulo                        |
| `--unx-color-nero`             | `#242424`                                                | botão Dashboard                  |
| `--unx-color-ultramarine`      | `#2104d8`                                                | CTA principal                    |
| `--unx-color-warm-blue`        | `#3747d7`                                                | blur decorativo                  |
| `--unx-color-white`            | `#ffffff`                                                | texto padrão                     |
| `--unx-gradient-text`          | `linear-gradient(270deg, #a5d9ff 7.6%, #7399fb 94.15%)`  | segunda linha do título do hero  |
| `--unx-font-inter`             | `"Inter", system-ui, ...`                                | corpo                            |
| `--unx-font-poppins`           | `"Poppins", var(--unx-font-inter)`                       | subtítulo do hero                |
| `--unx-breakpoint-sm`          | `640px`                                                  | breakpoint responsivo            |

Quando o design mudar, o ponto único de alteração é `tokens.css`.

---

## Convenção BEM

| Bloco     | Responsabilidade                                         |
|-----------|----------------------------------------------------------|
| `.page`   | shell da rota `/` — fundo, viewport, blur decorativo     |
| `.header` | cabeçalho: logo UNX, nav, botão Dashboard, menu mobile   |
| `.hero`   | título em 2 linhas, subtítulo e CTA principal            |

Cada bloco vive num arquivo próprio em `src/styles/blocks/`. **Elements**
usam `__` (`.hero__title`, `.header__nav-link`). **Modifiers** usam `--`
(`.hero__title--gradient`). Nenhum estilo escapa desses três blocos — não
há CSS global fora de `tokens.css` e `reset.css`.

---

## Testes

Os testes usam a API oficial `astro/container` para renderizar componentes
`.astro` diretamente em memória, sem build e sem browser. O helper
`src/test/renderAstro.ts` encapsula isso e devolve um `container` com as
queries do `@testing-library/dom` já vinculadas:

```ts
const { container, getByText } = await renderAstro(Hero);
expect(getByText("Try this app")).toBeInTheDocument();
```

O `vitest.config.ts` usa `getViteConfig` do `astro/config` para que o Vitest
rode dentro do mesmo pipeline do Astro — é isso que permite `import Hero from "./Hero.astro"`
funcionar nativamente em testes.

A suíte cobre:

- **Textos exatos** — logo, itens de navegação, títulos, subtítulo, CTA
- **Classes BEM** — cada elemento tem a classe esperada
- **Modifier `hero__title--gradient`** aplicado **apenas** na segunda linha
- **Imagem do app** com `alt`, `src`, `width` e `height` corretos
- **Integração da página** — `.page`, `.page__blur`, `Header` e `Hero` presentes

---

## Como rodar

### Pré-requisitos

- Node.js 18.17+ (ou 20+)
- npm

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
# http://localhost:4321
```

### Testes

```bash
npm test              # rodada única
npm run test:watch    # modo watch
```

### Typecheck

```bash
npm run typecheck
```

### Build estático

```bash
npm run build
# saida em dist/
```

---

## Deploy no GitHub Pages

Este projeto segue o padrão do repositório **ai-frontend-lab**:

1. `scripts/publish-projects.mjs` detecta a pasta na raiz do repositório e
   roda `npm ci && npm run build` injetando
   `SITE_BASE=/ai-frontend-lab/unx-app-astro-version/`.
2. `astro.config.mjs` lê `process.env.SITE_BASE` e usa como `base`, então
   todos os assets gerados já apontam para o subpath correto do GitHub Pages.
3. O conteúdo de `dist/` é copiado para `docs/unx-app-astro-version/`.

Para simular produção localmente:

```bash
SITE_BASE=/ai-frontend-lab/unx-app-astro-version/ npm run build
```

Sem `SITE_BASE`, o build usa `base="/"` — útil para abrir o HTML direto do
`dist/` em desenvolvimento.

---

## O que mudou em relação ao original

| Aspecto               | Original (Next.js)                  | Esta versão (Astro)                       |
|-----------------------|-------------------------------------|-------------------------------------------|
| Framework             | Next.js 13 (pages router)           | Astro 4 (output estático)                 |
| JS no cliente         | React runtime + hidratação          | **Zero** — só HTML e CSS                  |
| Estilo                | Tailwind + classes utilitárias      | CSS puro em BEM + design tokens           |
| Fontes                | `next/font`                         | `<link rel="preconnect"/>` + Google Fonts |
| Imagens               | `next/image`                        | `<img>` nativo em `public/`               |
| Testes                | Nenhum                              | Vitest + astro/container + TL             |
| Deploy                | Vercel (SSR opcional)               | Qualquer CDN estática / GitHub Pages      |

O que foi mantido: **toda a interface**. Textos, cores, gradiente, fontes,
espaçamentos, responsividade em 640px, hamburger icon no mobile, botão
Dashboard aparecendo apenas em desktop. O objetivo era provar que o stack
pode mudar sem que o usuário final perceba qualquer diferença visual.

---

## Possíveis evoluções

- Adicionar uma rota `/dashboard` real quando o botão Dashboard passar a ter
  destino — hoje é puramente decorativo
- Abrir o menu mobile ao clicar no hamburger (hoje é um ícone sem
  comportamento, igual ao original)
- View Transitions API do Astro para navegação entre rotas futuras
- Testes visuais com Playwright para pegar regressões de layout que os
  testes de DOM não capturam
