# Bugdet Sign-In (Astro + TypeScript)

Este projeto implementa uma tela de sign-in para o app ficticio **Bugdet**, criada a partir de uma referencia visual (screenshot) e refinada por meio de prompt no VS Code com GitHub Copilot.

## Objetivo

Construir uma pagina de login **somente visual** (sem autenticacao real), com:

- Astro
- TypeScript no frontmatter
- CSS puro com metodologia BEM
- Design inspirado em screenshot de referencia

## Abordagem Utilizada

O desenvolvimento seguiu um fluxo de design orientado por IA:

1. Captura visual de referencia (screenshot)
2. Prompt detalhado no VS Code para guiar o layout, tipografia, cores e responsividade
3. Geracao iterativa com GitHub Copilot
4. Ajustes manuais de estrutura e limpeza de arquivos duplicados/nao usados

Resultado: a tela final ficou consolidada na rota principal `/`.

## Stack

- `astro`
- `typescript`
- `@astrojs/check` (type-check)
- CSS puro (sem framework)

## Funcionalidades da Tela

- Fundo em tom kraft com textura/noise sutil
- Card central com duas colunas (formulario + imagem decorativa)
- Tipografia via Google Fonts (`Lora` e `DM Sans`)
- Estrutura BEM para classes CSS
- Layout responsivo (imagem oculta em mobile)
- Suporte a dark mode com `prefers-color-scheme`

## Estrutura Atual

```text
evergreen-ledger-login/
├── src/
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## Scripts

Comandos disponiveis no projeto:

- `npm run dev` inicia o servidor local
- `npm run build` gera build de producao
- `npm run preview` executa preview do build
- `npm run check` executa checagem de tipos Astro/TypeScript

## Como Rodar

```bash
npm install
npm run dev
```

Depois, abra:

```text
http://localhost:4321/
```

## Observacoes

- Projeto propositalmente sem submit real, validacao ou autenticacao.
- Foco em fidelidade visual e organizacao de estilos.

## Prompt Utilizado (Resumo)

O desenvolvimento foi guiado por um prompt no VS Code com GitHub Copilot, com foco em reproduzir a referencia visual da screenshot.

Diretrizes principais passadas no prompt:

- Criar tela de sign-in para o app "Bugdet" em Astro + TypeScript
- Implementar tudo em um unico arquivo de pagina
- Usar CSS puro com metodologia BEM
- Reproduzir visual com fundo kraft texturizado e card central em duas colunas
- Coluna esquerda com formulario estatico (sem submit real)
- Coluna direita com imagem decorativa placeholder
- Usar Google Fonts (Lora/DM Sans) e paleta terrosa
- Garantir responsividade (ocultar imagem no mobile)
- Incluir dark mode com `prefers-color-scheme`

Processo aplicado:

1. Scaffold inicial do Astro
2. Implementacao visual guiada por prompt + screenshot
3. Refino incremental via Copilot
4. Consolidacao da tela em `src/pages/index.astro`
5. Remocao de arquivos duplicados e assets nao utilizados
