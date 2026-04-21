# Copilot Instructions - Project Context (Bugdet Sign-In)

## Project Goal
Build and maintain a visual-only sign-in page for the Bugdet app using Astro + TypeScript + pure CSS with BEM naming.

## Current Implementation Context
- Main page is `src/pages/index.astro`
- This page is the canonical sign-in screen for route `/`
- No real authentication logic should be added by default
- No submit, backend calls, or validation flow unless explicitly requested

## Design Source of Truth
- UI was developed based on a screenshot reference plus iterative prompt-driven generation in VS Code with Copilot
- Preserve the same visual direction:
  - kraft/paper background with subtle texture
  - centered two-column card
  - left side form, right side decorative image
  - earthy palette and elegant serif + readable sans typography
  - responsive behavior with image hidden on mobile
  - dark mode support via `prefers-color-scheme`

## Technical Conventions
- Keep Astro frontmatter typed with TypeScript where needed
- Keep CSS in pure BEM style (`block__element--modifier`)
- Keep design tokens as CSS custom properties when evolving styles
- Avoid introducing CSS frameworks unless explicitly requested

## Safe Editing Rules
- Prefer minimal, targeted edits
- Do not reintroduce deleted starter/demo files unless requested
- Keep index as the default entry point for sign-in
- Update README if visual structure or development approach changes
