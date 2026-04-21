# 🤖 Estudos — IA no Desenvolvimento Frontend

> Cronograma de estudos focado no uso de Inteligência Artificial no desenvolvimento frontend, com ferramentas, canais e roteiro prático.

---

## 🎯 Objetivo

Dominar o uso de ferramentas de IA aplicadas ao frontend, indo além do uso superficial das ferramentas — entendendo engenharia de contexto, integração de APIs de LLM e orquestração de agentes.

---

## 🗺️ Visão Geral do Cronograma

| Fase | Foco | Duração sugerida |
|------|------|-----------------|
| 1 | Ferramentas de geração de UI | 2–3 semanas |
| 2 | Assistentes de código no editor | 2–3 semanas |
| 3 | Prompt Engineering para devs | 2–3 semanas |
| 4 | Integração de APIs de LLM no frontend | 3–4 semanas |
| 5 | Agentes, MCP e orquestração | 4+ semanas |

---

## 📦 Fase 1 — Ferramentas de Geração de UI

**Meta:** Entender o que cada ferramenta faz de melhor e quando usar cada uma.

### Ferramentas para explorar

- [ ] **v0 (Vercel)** — geração de componentes React com Tailwind a partir de prompts
- [ ] **Figma Make** — geração de código a partir de designs no Figma
- [ ] **Bolt.new** — apps full-stack rodando direto no browser, sem setup local
- [ ] **Lovable** — apps React com backend integrado a partir de prompts
- [ ] **Uizard** — conversão de esboços e screenshots em código HTML/CSS
- [ ] **UX Pilot** — wireframes e protótipos gerados por IA com plugin para Figma

### Exercícios práticos

- [ ] Gerar o mesmo componente (ex: card de produto) em pelo menos 3 ferramentas e comparar o resultado
- [ ] Usar o Bolt.new para criar um mini-projeto do zero com um único prompt
- [ ] Testar o fluxo design → código com Figma Make ou Kombai

---

## 🖥️ Fase 2 — Assistentes de Código no Editor

**Meta:** Integrar IA ao fluxo de trabalho diário no editor de código.

### Ferramentas para explorar

- [ ] **Cursor** — editor completo baseado no VS Code, com agente nativo de IA
- [ ] **GitHub Copilot** — extensão para VS Code, JetBrains e outros
- [ ] **Windsurf** — alternativa ao Cursor com agente integrado
- [ ] **Kombai** — converte designs Figma em código React sustentável

### Exercícios práticos

- [ ] Configurar o Cursor e usar o modo "Composer" para refatorar um componente real
- [ ] Usar o Copilot para gerar testes unitários para um componente existente
- [ ] Praticar o uso de comentários como instruções para o assistente gerar código

---

## ✍️ Fase 3 — Prompt Engineering para Devs

**Meta:** Aprender a "falar com a IA" de forma eficiente para obter código de qualidade.

### Conceitos-chave

- [ ] **Engenharia de contexto** — o que enviar, o que omitir, como reutilizar contexto
- [ ] **Specs bem estruturadas** — descrever problema, restrições, formato de saída esperado
- [ ] **Iteração guiada** — como fazer follow-ups para refinar o resultado
- [ ] **System prompts** — como configurar o comportamento do modelo para projetos recorrentes

### Exercícios práticos

- [ ] Escrever uma spec técnica para um componente e ver a diferença no output gerado
- [ ] Comparar a qualidade do código gerado com um prompt vago vs. um prompt detalhado
- [ ] Criar um "template de prompt" reutilizável para o tipo de componente que você mais desenvolve

---

## 🔌 Fase 4 — Integração de APIs de LLM no Frontend

**Meta:** Construir features reais usando APIs de IA (OpenAI, Anthropic, etc.) no frontend.

### Conceitos-chave

- [ ] Chamadas à API (fetch / SDK) e gerenciamento de tokens
- [ ] Streaming de respostas com `ReadableStream`
- [ ] Gerenciamento de histórico de conversa (contexto entre turnos)
- [ ] Tratamento de erros e fallback
- [ ] Segurança: nunca expor chaves de API no client

### Projetos sugeridos

- [ ] **Chat simples** — interface de chat que consome uma API de LLM
- [ ] **Assistente de formulário** — sugestões em tempo real enquanto o usuário preenche
- [ ] **Gerador de conteúdo** — gera texto/código a partir de input do usuário com streaming
- [ ] **Busca semântica** — pesquisa em conteúdo local usando embeddings

---

## 🤖 Fase 5 — Agentes, MCP e Orquestração

**Meta:** Entender e construir sistemas de IA compostos por múltiplos modelos e ferramentas.

### Conceitos-chave

- [ ] **Agentes de IA** — modelos que tomam decisões e executam ações em sequência
- [ ] **MCP (Model Context Protocol)** — padrão para conectar modelos a ferramentas externas
- [ ] **Tool use / Function calling** — como dar "ferramentas" para o modelo usar
- [ ] **Orquestração** — montar pipelines com múltiplos modelos ou chamadas encadeadas

### Projetos sugeridos

- [ ] Criar um agente simples que usa function calling para buscar dados de uma API real
- [ ] Integrar um servidor MCP no Cursor e usar no seu projeto
- [ ] Construir um fluxo com pelo menos 2 etapas de LLM (ex: gerar → revisar → refinar)

---

## 📺 Canais no YouTube

### IA e ferramentas (acompanhar tendências)

| Canal | Tipo de conteúdo | Idioma |
|-------|-----------------|--------|
| [Fireship](https://youtube.com/@Fireship) | Explainers rápidos sobre tools e frameworks | 🇺🇸 |
| [Matt Wolfe](https://youtube.com/@mreflow) | Lançamentos e reviews de ferramentas de IA | 🇺🇸 |
| [Corbin Brown](https://youtube.com/@Corbin_Brown_) | Tutoriais de coding com Claude e Cursor | 🇺🇸 |
| [Theo (t3.gg)](https://youtube.com/@t3dotgg) | Opinões e análises do ecossistema frontend/IA | 🇺🇸 |

### Frontend (base técnica)

| Canal | Tipo de conteúdo | Idioma |
|-------|-----------------|--------|
| [Traversy Media](https://youtube.com/@TraversyMedia) | Crash-courses práticos de toda a stack web | 🇺🇸 |
| [Web Dev Simplified](https://youtube.com/@WebDevSimplified) | JS, CSS e frameworks modernos | 🇺🇸 |
| [Rocketseat](https://youtube.com/@rocketseat) | Conteúdo técnico de qualidade em português | 🇧🇷 |

---

## 📖 Outros recursos

- [felipefialho.com/blog](https://felipefialho.com/blog) — análises do mercado frontend em PT-BR
- [docs.anthropic.com](https://docs.anthropic.com) — documentação da API Claude
- [platform.openai.com/docs](https://platform.openai.com/docs) — documentação da API OpenAI
- [v0.dev](https://v0.dev) — experimentar geração de componentes
- [bolt.new](https://bolt.new) — prototipar apps rapidamente

---

## 💡 Princípios que guiam esses estudos

1. **Inglês como fonte primária** — o conteúdo mais atualizado sobre IA está em inglês. Use o ecossistema brasileiro para discussão e networking.
2. **Prática > consumo passivo** — para cada conteúdo assistido, fazer ao menos um exercício prático.
3. **IA como copiloto, não como piloto** — entender o código gerado antes de usar em produção.
4. **Especialização > generalização** — dominar bem as ferramentas do seu fluxo de trabalho vale mais do que conhecer todas superficialmente.

---

## ✅ Progresso

- [ ] Fase 1 — Ferramentas de geração de UI
- [ ] Fase 2 — Assistentes de código no editor
- [ ] Fase 3 — Prompt Engineering para devs
- [ ] Fase 4 — Integração de APIs de LLM no frontend
- [ ] Fase 5 — Agentes, MCP e orquestração

---

> **Última atualização:** Abril 2026
