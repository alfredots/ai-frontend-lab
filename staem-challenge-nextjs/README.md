# STAEM Challenge - Next.js App Router (SSG)

Versao atualizada do desafio original de catalogo de jogos, implementada com Next.js moderno (App Router), foco em pre-renderizacao estatica (SSG), CSS BEM e testes unitarios.

## Objetivos desta versao

- Migrar de uma base antiga (Next 12 + Styled Components) para Next.js atual com App Router.
- Priorizar SSG para entrega rapida e previsivel.
- Organizar a logica com uma abordagem MVVM leve para facilitar manutencao.
- Garantir cobertura de testes unitarios para componentes principais.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS Modules com nomenclatura BEM
- Embla Carousel (slider)
- Vitest + React Testing Library

## Decisoes Arquiteturais

### 1) SSG como estrategia principal

Este projeto usa SSG por padrao e a pagina principal esta marcada como estatica via `dynamic = "force-static"`.

Por que SSG fez sentido aqui:

- Melhor performance inicial (HTML pre-renderizado no build).
- Menor custo de runtime.
- Conteudo base de catalogo pode ser entregue de forma deterministica.

### 2) Por que nao SSR/ISR como padrao

Uma alternativa valida seria usar ISR com Supabase para dados sempre atualizados. Nao foi adotada como padrao nesta versao pelos motivos abaixo:

- O desafio foca mais em arquitetura/front-end do que consistencia near real-time de dados.
- Dados estaticos melhoram reproducibilidade de testes e build.
- Menos dependencia de variaveis de ambiente/chaves externas para rodar local.

Se quiser evoluir para ISR:

- mover `src/data/games.ts` para uma camada de fetch remoto;
- usar `revalidate` em server components;
- manter a mesma ViewModel no cliente para busca/ordenacao/paginacao.

### 3) MVVM leve

A arquitetura adotada segue MVVM de forma pragmatica:

- Model: `src/domain`, `src/data`, `src/lib`
- ViewModel: `src/view-models/useGamesCatalogViewModel.ts`
- View: `src/components` + `src/app/page.tsx`

Beneficios:

- View desacoplada da regra de filtragem e paginacao.
- Testes de componentes mais simples.
- Evolucao da fonte de dados sem quebrar a UI.

## Estrutura Principal

```text
src/
	app/
		layout.tsx
		page.tsx
	components/
		Header/
		HeroCarousel/
		NewTrending/
		SearchBar/
		SortSelect/
		GameCard/
		GamesCatalog/
	data/
		games.ts
	domain/
		game.ts
	lib/
		gameRepository.ts
	view-models/
		useGamesCatalogViewModel.ts
	test/
		setup.ts
```

## CSS BEM

Os componentes usam CSS Modules com classes em padrao BEM (ex.: `catalog__controls`, `card__image`, `header__title`).

## Testes Unitarios

Cobertura implementada para:

- Header
- SearchBar
- SortSelect
- GameCard
- GamesCatalog (busca, ordenacao e load more)

## Como rodar

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run lint
npm run test
npm run test:watch
npm run build
```

## Proximos passos sugeridos

- Integrar fonte de dados externa (Supabase) com ISR.
- Adicionar testes do ViewModel isolado (hook tests).
- Incluir e2e para fluxo completo de catalogo.
