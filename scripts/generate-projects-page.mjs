#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
const docsDir = path.join(rootDir, "docs");
const outputFile = path.join(docsDir, "index.html");
const noJekyllFile = path.join(docsDir, ".nojekyll");

const ignoredDirs = new Set([
  ".git",
  ".github",
  ".vscode",
  "node_modules",
  "docs",
  "scripts",
]);

const isProjectDir = (absolutePath) => {
  const requiredSignals = ["package.json", "README.md", "index.html"];
  return requiredSignals.some((item) =>
    fs.existsSync(path.join(absolutePath, item)),
  );
};

const getProjectsFromRoot = () => {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !ignoredDirs.has(name))
    .filter((name) => !name.startsWith("."))
    .filter((name) => isProjectDir(path.join(rootDir, name)))
    .sort((a, b) => a.localeCompare(b));
};

const getProjectsFromDocs = () => {
  if (!fs.existsSync(docsDir)) {
    return [];
  }

  const entries = fs.readdirSync(docsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith("."))
    .sort((a, b) => a.localeCompare(b));
};

const getProjects = () => {
  const publishedProjects = getProjectsFromDocs();
  if (publishedProjects.length > 0) {
    return publishedProjects;
  }

  return getProjectsFromRoot();
};

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderPage = ({ owner, repo, projects }) => {
  const listItems =
    projects.length === 0
      ? '<li class="empty">No projects found in repository root.</li>'
      : projects
          .map((project) => {
            const safeProject = escapeHtml(project);
            const pagesPath = `/${repo}/${project}/`;
            const sourceLink = `https://github.com/${owner}/${repo}/tree/main/${project}`;
            return `
              <li class="card">
                <h2>${safeProject}</h2>
                <p><strong>Path:</strong> <code>${pagesPath}</code></p>
                <div class="actions">
                  <a href="./${safeProject}/" target="_blank" rel="noreferrer">Open path</a>
                  <a href="${sourceLink}" target="_blank" rel="noreferrer">Source</a>
                </div>
              </li>
            `;
          })
          .join("\n");

  const now = new Date().toISOString();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${repo} Projects</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f7f5ef;
        --card: #ffffff;
        --ink: #1f1f1f;
        --muted: #555;
        --accent: #0d9488;
        --border: #e5dfd0;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Avenir Next", "Segoe UI", sans-serif;
        background: radial-gradient(circle at top right, #f4efe1, var(--bg));
        color: var(--ink);
      }
      main {
        max-width: 960px;
        margin: 0 auto;
        padding: 3rem 1.2rem;
      }
      h1 {
        margin: 0;
        font-size: clamp(2rem, 3vw, 2.8rem);
      }
      .subtitle {
        margin-top: 0.8rem;
        color: var(--muted);
      }
      ul {
        list-style: none;
        margin: 2rem 0 0;
        padding: 0;
        display: grid;
        gap: 1rem;
      }
      .card {
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 1rem;
        background: var(--card);
      }
      .card h2 {
        margin: 0;
        font-size: 1.25rem;
      }
      .card p {
        margin: 0.8rem 0;
      }
      .actions {
        display: flex;
        gap: 0.8rem;
        flex-wrap: wrap;
      }
      .actions a {
        border: 1px solid var(--accent);
        color: var(--accent);
        text-decoration: none;
        border-radius: 999px;
        padding: 0.35rem 0.8rem;
        font-weight: 600;
      }
      .actions a:hover {
        background: var(--accent);
        color: #fff;
      }
      .empty {
        color: var(--muted);
        border: 1px dashed var(--border);
        padding: 1rem;
        border-radius: 12px;
      }
      footer {
        margin-top: 2rem;
        color: var(--muted);
        font-size: 0.9rem;
      }
      code {
        background: #f3f3f3;
        padding: 0.08rem 0.3rem;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${repo} Projects</h1>
      <p class="subtitle">Auto-generated list from repository folders.</p>
      <ul>${listItems}</ul>
      <footer>Last update: ${now}</footer>
    </main>
  </body>
</html>`;
};

const getRepositoryInfo = () => {
  if (process.env.GITHUB_REPOSITORY?.includes("/")) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    return { owner, repo };
  }

  try {
    const remoteUrl = execSync("git config --get remote.origin.url", {
      cwd: rootDir,
      encoding: "utf8",
    }).trim();

    const match = remoteUrl.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/i);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
  } catch {
    // Keep fallback when git remote is not available.
  }

  return { owner: "local", repo: "ai-frontend-lab" };
};

const { owner, repo } = getRepositoryInfo();
const projects = getProjects();
const html = renderPage({ owner, repo, projects });

fs.mkdirSync(docsDir, { recursive: true });
fs.writeFileSync(outputFile, html, "utf8");
fs.writeFileSync(noJekyllFile, "", "utf8");

console.log(`Generated ${outputFile} with ${projects.length} project(s).`);
