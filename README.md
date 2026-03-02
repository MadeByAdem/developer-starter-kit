# 🚀 Developer Starter Kit

> **Describe what you want. Claude Code builds it.**

A complete toolkit for junior developers who want to build professional web apps using **vibe coding** with [Claude Code](https://claude.ai/claude-code).

You describe what you want in plain English. Claude Code builds it for you — with professional structure, security, and best practices baked in.

[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org) [![Python](https://img.shields.io/badge/Python-3-3776AB?logo=python&logoColor=white)](https://python.org) [![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org) [![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com) [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com) [![Claude Code](https://img.shields.io/badge/Claude_Code-AI-D97757?logo=anthropic&logoColor=white)](https://claude.ai/claude-code)

---

## 📦 What's in the box?

### 🧠 The Brain

| File             | What it does                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLAUDE.md`    | The project blueprint — tells Claude how to structure code, which conventions to follow, and how to handle security. Copy this into every new project. |
| `.env.example` | Template for environment variables with comments explaining where to find each value.                                                                   |

### 🤖 13 Specialized AI Agents

Agents are AI helpers that handle specific tasks. They live in `.claude/agents/` and activate automatically when needed. You don't need to call them by name — just describe what you want and Claude picks the right agent.

| Agent                             | What it does                                               | Example prompt                                            |
| --------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| 🏗️**project-starter**     | Scaffolds a new project from scratch (JS or TS)            | *"I want to build a book tracker app with a database"*  |
| 🗺️**codebase-mapper**     | Maps which files a task will affect                        | *(used automatically for medium/large tasks)*           |
| 🔎**pattern-finder**        | Finds existing patterns and conventions in the codebase    | *"How are other endpoints structured in this project?"* |
| 🌐**web-researcher**        | Researches docs, best practices, and packages from the web | *"What's the best library for image uploads in Node?"*  |
| 📋**planner**               | Creates step-by-step implementation plans                  | *"Plan a user authentication system"*                   |
| ⚡**implementer**           | Builds features following approved plans                   | *"Build the plan we just made"*                         |
| 🐛**debugger**              | Finds root causes and fixes bugs                           | *"I get a 500 error when I call POST /api/users"*       |
| 🔍**code-reviewer**         | Checks quality, security, and conventions                  | *"Review the code you just wrote"*                      |
| ♻️**refactorer**          | Cleans up code without changing behavior                   | *"Clean up the userService, it's getting messy"*        |
| 🏎️**performance-checker** | Finds bottlenecks and suggests fixes                       | *"My app feels slow, check for performance issues"*     |
| 🗃️**migration-risk**      | Assesses database migration safety                         | *(used automatically before database changes)*          |
| 🧪**test-impact**           | Lists what needs testing after changes                     | *"What should I test after these changes?"*             |
| 📝**docs-impact**           | Flags documentation that needs updating                    | *(used automatically after code changes)*               |

### 📁 Boilerplate Templates

Reusable code templates in `.claude/boilerplates/` — used by the `project-starter` agent when scaffolding new projects. Available in both **JavaScript** and **TypeScript**.

**Backend:** Express server setup, error handling, validation middleware, authentication middleware (Supabase Auth), logging (Winston), Supabase config, and base repository.

**Frontend:** Vue 3 app entry point, API client (Axios for Vue, `$fetch` for Nuxt), example service, Pinia store template, and `useLoading` composable.

### 📚 8 Guides

| Guide                                                  | For when you need to...                                       |
| ------------------------------------------------------ | ------------------------------------------------------------- |
| 📖[SETUP-GUIDE.md](guides/SETUP-GUIDE.md)                 | Install tools, create your first project, learn the basics    |
| 🧪[LOCAL-TESTING-GUIDE.md](guides/LOCAL-TESTING-GUIDE.md) | Run and test your project on your own computer                |
| 🗄️[SUPABASE-GUIDE.md](guides/SUPABASE-GUIDE.md)         | Set up your database (Supabase)                               |
| 🐙[GITHUB-GUIDE.md](guides/GITHUB-GUIDE.md)               | Learn Git and GitHub basics — saving, sharing, collaborating |
| 🌐[DEPLOYMENT-GUIDE.md](guides/DEPLOYMENT-GUIDE.md)       | Put your project online (per project type)                    |
| ⚡[CHEAT-SHEET.md](guides/CHEAT-SHEET.md)                 | Quick reference for common commands and patterns              |
| ✅[TESTING-CHECKLIST.md](guides/TESTING-CHECKLIST.md)     | What to check before you push your code                       |
| 🔧[TROUBLESHOOTING.md](guides/TROUBLESHOOTING.md)         | Quick fixes for the 10 most common problems                   |

---

## 🏁 Quick Start

### Option A: Global setup

Install agents, boilerplates, and references once — use them in every project.

**Mac/Linux:**

```bash
# One-time setup: copy agents, boilerplates, and references globally
mkdir -p ~/.claude/agents ~/.claude/boilerplates ~/.claude/references
cp .claude/agents/*.md ~/.claude/agents/
cp -r .claude/boilerplates/* ~/.claude/boilerplates/
cp .claude/references/* ~/.claude/references/

# For each new project:
mkdir my-project && cd my-project
cp /path/to/developer-starter-kit/CLAUDE.md .
```

**Windows (PowerShell):**

```powershell
# One-time setup: copy agents, boilerplates, and references globally
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\boilerplates"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\references"
Copy-Item .claude\agents\*.md "$env:USERPROFILE\.claude\agents\"
Copy-Item -Recurse .claude\boilerplates\* "$env:USERPROFILE\.claude\boilerplates\"
Copy-Item .claude\references\* "$env:USERPROFILE\.claude\references\"

# For each new project:
mkdir my-project; cd my-project
Copy-Item \path\to\developer-starter-kit\CLAUDE.md .
```

Then open Claude Code and describe what you want to build.

### Option B: Per-project setup

Copy everything into each new project. The easiest way is to open both folders side by side and drag `CLAUDE.md` and the `.claude/` folder into your new project. Or via terminal:

**Mac/Linux:**

```bash
mkdir my-project && cd my-project
cp /path/to/developer-starter-kit/CLAUDE.md .
cp -r /path/to/developer-starter-kit/.claude .
```

**Windows (PowerShell):**

```powershell
mkdir my-project; cd my-project
Copy-Item \path\to\developer-starter-kit\CLAUDE.md .
Copy-Item -Recurse \path\to\developer-starter-kit\.claude .
```

Then open Claude Code and describe what you want to build.

---

## 🧩 Supported Project Types

| Type             | When                              | Stack                        |
| ---------------- | --------------------------------- | ---------------------------- |
| `api-only`       | Backend/API only                  | Express + Supabase           |
| `vue-only`       | Frontend only                     | Vue 3 + Vite + Tailwind      |
| `nuxt-only`      | Fullstack with SSR                | Nuxt 3 + Tailwind            |
| `express-vue`    | Separate backend + frontend       | Express + Vue 3 + Supabase   |
| `express-nuxt`   | Separate backend + Nuxt           | Express + Nuxt 3 + Supabase  |
| `python-script`  | Python script for automation/data | Python + pip                 |

Node.js types available in **JavaScript** (default) or **TypeScript**.

---

## ⚙️ How It Works

```
💬 You: "I want to build a book tracker app with a database"
   │
   ▼
🧠 Claude Code reads CLAUDE.md → understands your project conventions
   │
   ▼
🏗️ project-starter agent → scaffolds the project with security defaults
   │
   ▼
💬 You: "Add a page to search books by title"
   │
   ▼
🗺️ mapper → 📋 planner → ⚡ implementer → 🔍 reviewer → 🧪 tester → 📝 docs
   │
   ▼
✅ Working feature, tested and documented
```

---

## 🛡️ What's Built In

### 🔒 Security (automatic, no configuration needed)

- Helmet, CORS, rate limiting on every Express server
- Input validation (Joi) on all endpoints
- Row Level Security on all database tables
- No hardcoded secrets — always `.env` files
- Custom error classes that don't leak internals

### ✨ Code Quality

- Backend chain: Route → Controller → Service → Repository
- Consistent API response format: `{ success, data, error }`
- Frontend: services for API calls, Pinia for state, composables for logic
- async/await everywhere, English code and comments

### 📄 Documentation

- Auto-generated README, API docs, and project docs
- Implementation plans saved as project history
- `docs-impact` agent flags when docs need updating

---

## 🎯 What's Deliberately Left Out

This kit is built for **junior developers and vibe coders** who want to get building quickly. To keep things approachable and not overwhelming, we deliberately left out some advanced topics:

| Topic                              | Why it's not included                                                                          |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| Test frameworks (Jest, Vitest)     | Adds complexity before you've built something to test. Focus on building first.                |
| CI/CD pipelines (GitHub Actions)   | Powerful but overwhelming for beginners. Manual deployment is simpler to understand.           |
| Multiple deployment platforms      | We picked one solid option per project type (Cloudflare Pages + Docker) instead of many.       |
| Error tracking (Sentry, LogRocket) | Nice to have, but not needed until your app has real users in production.                      |

**These aren't missing — they're postponed.** When your project grows and you need them, just ask Claude:

```text
Set up Jest testing for my project.
Add a GitHub Actions pipeline that runs my tests on every push.
Add Sentry error tracking to my app.
```

Claude will handle the setup for you. This kit gives you a strong foundation — you can add advanced tooling whenever you're ready.

---

## 📖 Reading Order

If you're brand new, read the guides in this order:

| # | Guide                                                            | What you'll learn                           |
| - | ---------------------------------------------------------------- | ------------------------------------------- |
| 1 | 📖**[SETUP-GUIDE.md](guides/SETUP-GUIDE.md)**                 | Install tools and create your first project |
| 2 | 🗄️**[SUPABASE-GUIDE.md](guides/SUPABASE-GUIDE.md)**               | Set up your database                        |
| 3 | 🧪**[LOCAL-TESTING-GUIDE.md](guides/LOCAL-TESTING-GUIDE.md)** | Test that everything works                  |
| 4 | ✅**[TESTING-CHECKLIST.md](guides/TESTING-CHECKLIST.md)**     | Know what to check before pushing           |
| 5 | 🐙**[GITHUB-GUIDE.md](guides/GITHUB-GUIDE.md)**               | Save your work and share it                 |
| 6 | 🌐**[DEPLOYMENT-GUIDE.md](guides/DEPLOYMENT-GUIDE.md)**       | Put it online (per project type)            |
| 7 | ⚡**[CHEAT-SHEET.md](guides/CHEAT-SHEET.md)**                 | Keep this open as a quick reference         |
| 8 | 🔧**[TROUBLESHOOTING.md](guides/TROUBLESHOOTING.md)**         | When something goes wrong                   |

---

## 📋 Requirements

| Tool                            | Link                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| Node.js (LTS)                   | [nodejs.org](https://nodejs.org)                                                         |
| Python 3 (for python-script)    | [python.org](https://python.org)                                                         |
| Git                             | [git-scm.com](https://git-scm.com)                                                       |
| VS Code + Claude Code extension | [marketplace](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) |
| Supabase account (free)         | [supabase.com](https://supabase.com)                                                     |
| Supabase CLI (optional)         | [supabase.com/docs/guides/cli](https://supabase.com/docs/guides/cli/getting-started)     |
| GitHub account                  | [github.com](https://github.com)                                                         |

---

## 📚 References & Inspiration

The agent design and workflow in this kit were inspired by:

- [HumanLayer&#39;s Claude Code Agents](https://github.com/humanlayer/humanlayer/tree/main/.claude/agents) — agent boundary patterns, "documentarian not critic" philosophy, pattern-finder concept
- [Advanced Context Engineering for Coding Agents (ACE)](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md) — context window management, error cascade principle, sub-agents as context tools, research-first workflow

---

**MadeByAdem** — Free to use for personal and commercial projects.
