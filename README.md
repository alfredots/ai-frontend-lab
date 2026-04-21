# ai-frontend-lab
Repositório de estudos e experimentos com Frontend + Inteligência Artificial.   Aqui crio interfaces modernas, componentes e animações utilizando prompts, ferramentas de IA (como Claude, GPT, v0, Cursor etc) e as últimas tendências do ecossistema frontend.

## GitHub Pages automatico

Este repositorio agora possui um workflow que gera automaticamente a pagina de projetos do GitHub Pages.

- Workflow: `.github/workflows/projects-pages.yml`
- Publicador dos projetos: `scripts/publish-projects.mjs`
- Gerador da pagina: `scripts/generate-projects-page.mjs`
- Saida publicada: `docs/index.html`

Quando uma nova pasta de projeto e criada na raiz (exemplo: `cursor-frontend-automation`), o workflow:

1. Executa o build do projeto (quando existir `npm run build`).
2. Copia o resultado para `docs/<nome-do-projeto>/`.
3. Atualiza a lista em `docs/index.html`.

Assim, o link da pagina principal aponta para o app publicado em `https://<seu-user>.github.io/ai-frontend-lab/<nome-do-projeto>/` apos push na branch `main`.

Para funcionar no repositorio remoto, em Settings > Pages selecione Source = GitHub Actions.
