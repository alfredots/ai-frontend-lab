---
name: bugdet-ui-evolution
description: "Use when: evolving Bugdet sign-in UI, refining layout from screenshot references, preserving BEM CSS structure, maintaining earthy visual identity, or extending Astro page styles in this project."
---

# Bugdet UI Evolution Skill

## Purpose

Keep future UI changes consistent with the visual and technical baseline already implemented in this repository.

## Scope

Apply this skill when working on:

- Sign-in screen visual refinements
- Prompt-to-UI translation from screenshot references
- Style consistency across typography, spacing, and colors
- Responsive and dark mode adjustments
- Structural changes in the Astro page while preserving BEM

## Project Baseline

- Main screen is in src/pages/index.astro
- Screen is visual-only by default
- No real auth flow, no submit flow, no backend integration unless explicitly requested
- CSS uses BEM naming conventions
- Design uses earthy palette and paper-like background texture
- Google Fonts currently used: Lora and DM Sans

## Required Conventions

1. Keep Astro + TypeScript frontmatter patterns
2. Keep CSS as pure CSS (no Tailwind/Bootstrap unless requested)
3. Keep BEM naming stable
4. Keep design tokens as CSS custom properties for maintainability
5. Keep responsive behavior:
- mobile layout under 768px
- decorative image hidden in mobile
6. Keep dark mode support with prefers-color-scheme

## Workflow

1. Read current implementation in src/pages/index.astro
2. Compare requested change against screenshot/prompt intent
3. Modify only what is needed
4. Preserve semantic structure and accessibility labels
5. Validate with npm run build
6. If structure changed meaningfully, update README.md summary

## Safety Rules

- Do not reintroduce deleted Astro starter files unless user requests
- Do not add JS behavior by default in this project
- Do not change route ownership: index is the canonical sign-in page

## Output Checklist

- Visual goal implemented
- BEM structure preserved
- Mobile and dark mode still valid
- Build passes
- Documentation updated when relevant
