#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
const docsDir = path.join(rootDir, "docs");

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

const getProjects = () => {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !ignoredDirs.has(name))
    .filter((name) => !name.startsWith("."))
    .filter((name) => isProjectDir(path.join(rootDir, name)))
    .sort((a, b) => a.localeCompare(b));
};

const loadPackageJson = (projectDir) => {
  const packageJsonPath = path.join(projectDir, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  } catch {
    return null;
  }
};

const getRepoName = () => {
  if (process.env.GITHUB_REPOSITORY?.includes("/")) {
    return process.env.GITHUB_REPOSITORY.split("/")[1];
  }
  try {
    const remoteUrl = execSync("git config --get remote.origin.url", {
      cwd: rootDir,
      encoding: "utf8",
    }).trim();
    const match = remoteUrl.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/i);
    if (match) return match[2];
  } catch {}
  return "ai-frontend-lab";
};

const run = (command, cwd, envOverrides = {}) => {
  execSync(command, {
    cwd,
    stdio: "inherit",
    env: {
      ...process.env,
      CI: "true",
      ...envOverrides,
    },
  });
};

const copyDirectory = (sourceDir, targetDir) => {
  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true });
};

const copyStaticProject = (sourceDir, targetDir) => {
  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(sourceDir, targetDir, {
    recursive: true,
    filter: (sourcePath) => {
      const name = path.basename(sourcePath);
      return name !== "node_modules" && name !== ".git";
    },
  });
};

const prepareDocsDirectory = () => {
  fs.rmSync(docsDir, { recursive: true, force: true });
  fs.mkdirSync(docsDir, { recursive: true });
};

const publishProjects = () => {
  prepareDocsDirectory();

  const projects = getProjects();
  const published = [];

  for (const project of projects) {
    const projectDir = path.join(rootDir, project);
    const projectOutputDir = path.join(docsDir, project);
    const packageJson = loadPackageJson(projectDir);

    if (packageJson?.scripts?.build) {
      console.log(`\n[${project}] Installing dependencies...`);
      run("npm ci --no-audit --no-fund", projectDir);

      console.log(`[${project}] Building project...`);
      const repoName = getRepoName();
      run("npm run build", projectDir, { SITE_BASE: `/${repoName}/${project}/` });

      const distDir = path.join(projectDir, "dist");
      if (!fs.existsSync(distDir)) {
        console.warn(`[${project}] Skipped: dist folder not found after build.`);
        continue;
      }

      copyDirectory(distDir, projectOutputDir);
      published.push(project);
      console.log(`[${project}] Published to docs/${project}.`);
      continue;
    }

    const staticIndex = path.join(projectDir, "index.html");
    if (fs.existsSync(staticIndex)) {
      copyStaticProject(projectDir, projectOutputDir);
      published.push(project);
      console.log(`[${project}] Published static folder to docs/${project}.`);
      continue;
    }

    console.warn(`[${project}] Skipped: no build script and no static index.html.`);
  }

  console.log(`\nPublished ${published.length} project(s): ${published.join(", ") || "none"}.`);
};

publishProjects();
