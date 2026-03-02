# How to Use This? — Step by Step

This starter kit makes it possible to build professional web projects with Claude Code as your "senior developer". You describe what you want in plain English, Claude Code builds it for you following professional standards.

---

## ⚡ 15-Minute Quick Start

Already have Node.js and VS Code? Skip straight to step 3.

**Step 1 — Install Node.js** (2 min)

Download the **LTS** version from [nodejs.org](https://nodejs.org) and install it.

**Step 2 — Install VS Code + Claude Code** (3 min)

1. Download [VS Code](https://code.visualstudio.com) and install it
2. Open VS Code, click the Extensions icon (blocks icon on the left)
3. Search for **Claude Code** (by Anthropic) and install it

**Step 3 — Create your project** (2 min)

1. Create a new empty folder (e.g. `my-first-app`)
2. Copy `CLAUDE.md` and the `.claude/` folder from this starter kit into it
3. Open the folder in VS Code (File → Open Folder)

**Step 4 — Build something** (5 min)

Open the Claude Code chat panel and type:

```
I want to build a simple app to keep track of my favorite movies.
I want to add movies with a title and rating, and see them in a list.
```

Claude will ask a few questions, then set up everything for you.

**Step 5 — See it work** (3 min)

When Claude is done, open the terminal (`Ctrl+``) and run:

```bash
npm run dev
```

Open the URL that appears (usually `http://localhost:5173` or `http://localhost:3000`) in your browser. You should see your app running.

**That's it — you built your first app.** Read the rest of this guide when you're ready to learn about Git, databases, and deployment.

---

## 🎨 What is Vibe Coding?

Vibe coding is a new way of building software: **you describe what you want, and AI writes the code for you**. Instead of typing every line yourself, you explain your ideas in plain English and let Claude Code turn them into working code.

### When it works great

- Standard web apps (CRUD: create, read, update, delete)
- Forms, dashboards, landing pages
- REST APIs with database operations
- Common patterns (authentication, search, file upload)

### When to slow down

- Complex business logic (calculations, financial rules, workflows)
- Security-critical features (payment processing, auth flows)
- Performance-sensitive code (real-time, large datasets)

For these, ask Claude to **explain the plan first** before writing code. Review what it builds more carefully.

### The golden rule: Trust but verify

Claude Code writes professional code, but you should still:
1. **Test everything** — run the app, click through features, check edge cases
2. **Read error messages** — copy them to Claude when something breaks
3. **Commit often** — so you can always go back to a working version
4. **Ask questions** — if you don't understand something, ask Claude to explain it

Vibe coding doesn't mean you stop thinking. It means you focus on **what** to build instead of **how** to write the code.

---

## 📦 What's included?

```
developer-starter-kit/
├── CLAUDE.md                ← The "brain" — tells Claude how your project should work
├── .claude/agents/          ← Specialized AI helpers
│   ├── project-starter      ← Sets up a new project from scratch
│   ├── codebase-mapper      ← Analyzes which files are affected
│   ├── pattern-finder       ← Finds existing patterns in your codebase
│   ├── web-researcher       ← Researches docs and best practices from the web
│   ├── planner              ← Creates a plan for complex features
│   ├── implementer          ← Builds the plan
│   ├── debugger             ← Finds and fixes bugs
│   ├── code-reviewer        ← Checks code quality
│   ├── refactorer           ← Cleans up and improves code structure
│   ├── performance-checker  ← Finds bottlenecks
│   ├── migration-risk       ← Assesses database changes
│   ├── test-impact          ← Tells you what to test
│   └── docs-impact          ← Flags what needs to be documented
├── .env.example             ← Template for environment variables
├── README.md                ← Project overview and quick start
└── guides/                    ← All guides for beginners
    ├── SETUP-GUIDE.md         ← This file
    ├── LOCAL-TESTING-GUIDE.md ← How to test locally
    ├── SUPABASE-GUIDE.md      ← How to set up and use Supabase
    ├── GITHUB-GUIDE.md        ← Git and GitHub basics
    ├── DEPLOYMENT-GUIDE.md    ← How to put your project online
    ├── CHEAT-SHEET.md         ← Quick reference for common commands
    ├── TESTING-CHECKLIST.md   ← What to check before pushing
    └── TROUBLESHOOTING.md     ← Quick fixes for common problems
```

---

## 🔧 One-Time Installation

### 1. Install Node.js

1. Go to https://nodejs.org
2. Download the **LTS** version (green button on the left)
3. Install it (double-click, follow the steps)
4. Check if it works — open a terminal and type:

```bash
node --version
# Should show something like: v20.11.0
```

### 2. Install Git

**Windows:** Download from https://git-scm.com/download/win and install
**Mac:** Open a terminal and type `git --version` — if it doesn't work, install Xcode Command Line Tools

### 3. Install VS Code

1. Download from https://code.visualstudio.com
2. Install it
3. Open VS Code and install these extensions (via the blocks icon on the left):

   **Install these now:**
   - **Claude Code** (by Anthropic) — AI coding assistant
   - **Vue - Official** — Vue.js language support
   - **Tailwind CSS IntelliSense** — Tailwind autocomplete and previews

   **Install these later** (nice to have, but not needed to get started):
   - **Prettier - Code formatter** — auto-format your code on save
   - **DotENV** (official) — syntax highlighting for `.env` files
   - **Babel JavaScript** — improved JavaScript/ES6+ syntax highlighting
   - **Bash Beautify** — format shell scripts
   - **GitHub Pull Requests** — manage PRs directly from VS Code
   - **GitHub Actions** — view and manage GitHub Actions workflows
   - **Live Preview** (by Microsoft) — preview HTML pages inside VS Code
   - **Reload** — adds a reload button to the status bar (handy for restarting VS Code)
   - **Remote - SSH** — connect to remote servers from VS Code
   - **VSCode Icons** — file/folder icons for easier navigation

### 4. Install Claude Code CLI (optional)

If you prefer working in the terminal:

```bash
npm install -g @anthropic-ai/claude-code
```

### 5. Install Supabase CLI (optional)

If your project uses a database, the Supabase CLI lets you test database changes locally before pushing them to production. This is not required — you can also run SQL manually in the Supabase Dashboard — but it makes working with migrations much easier.

**Mac:**

```bash
brew install supabase/tap/supabase
```

**Windows (via npm):**

```bash
npm install -g supabase
```

Check if it works:

```bash
supabase --version
# Should show something like: 1.x.x
```

> 📝 **Note:** The Supabase CLI uses Docker to run a local copy of Supabase. Make sure Docker Desktop is installed and running if you want to use `supabase start`.

---

## 🚀 Starting a New Project

### Step 1: Create an empty folder

```bash
mkdir my-project
cd my-project
```

### Step 2: Copy the starter kit files

**The easiest way:** open the `developer-starter-kit` folder and your new project folder side by side in File Explorer (Windows) or Finder (Mac). Then drag and drop:

1. Copy the file `CLAUDE.md` to your empty project folder
2. Copy the entire `.claude/` folder (with agents/) to your project folder

**Or via terminal:**

```bash
# Mac/Linux:
cp /path/to/developer-starter-kit/CLAUDE.md .
cp -r /path/to/developer-starter-kit/.claude .

# Windows (PowerShell):
Copy-Item \path\to\developer-starter-kit\CLAUDE.md .
Copy-Item -Recurse \path\to\developer-starter-kit\.claude .
```

> 💡 **Tip:** On Windows you might not see `.claude/` (it starts with a dot). Turn on "Show hidden files" in File Explorer.

### Step 3: Open Claude Code

There are two ways to use Claude Code:

**Option A: In the VS Code chat panel (recommended for beginners)**

1. Open your project folder in VS Code (File → Open Folder)
2. Open the chat panel: click the **Claude Code icon** in the sidebar (or press `Ctrl+Shift+P` → search "Claude Code")
3. You can now type messages to Claude directly in the chat panel
4. Claude can see your project files, edit code, run commands — all from within VS Code
5. You can select code in the editor, then ask Claude about it in the chat — it will see your selection

> 💡 **Tip:** The chat panel is the easiest way to work with Claude. You type what you want, Claude does it. No terminal needed.

**Option B: In the terminal (for advanced users)**

```bash
cd my-project
claude
```

This opens Claude Code as a CLI tool in your terminal. Same capabilities, different interface.

### Step 4: Tell Claude what you want to build

Type something like:

```
I want to build an app to keep track of my book collection.
I want to be able to add books, search, and mark them as read.
```

Claude will:
1. Ask questions to understand what you need
2. Choose the right project type (API only? With frontend?)
3. Set up everything: folder structure, dependencies, configuration
4. Create a working starting point
5. Explain how to start the project

### Step 5: Build features

After setup you can request features:

```
Create a page where I can add books with title, author, and genre.
```

```
Add a search function so I can search by title.
```

```
I want to be able to mark books as 'read' with a date.
```

Claude builds each feature following the professional standards from CLAUDE.md.

---

## 💬 Daily Usage

### How do you talk to Claude?

Just plain English. Be specific:

| Vague (less good) | Specific (better) |
|-------------------|-------------------|
| "Make a login" | "Create a login page with email and password that checks against Supabase Auth" |
| "Add products" | "Create a form where I can add products with name, price, and a photo" |
| "There's a bug" | "When I click 'Save' nothing happens. In the console I see: [error]" |

### Useful things to say

```
# New feature
I want users to be able to register with email and password.

# Fix a bug
I'm getting this error when I [action]: [paste the error message]

# Explanation
Explain what the file server/services/userService.js does.

# Make a plan
I want [complex feature]. Make a plan first before you start.

# Code review
Review the code you just wrote.

# Database
I want a table for orders with: customer name, products, total amount, status.
```

### What Claude does NOT do (and why)

| What | Why |
|------|-----|
| Hardcode secrets | Insecure — always uses .env files |
| Run database migrations | You must review and approve |
| Build more than asked | Keeps things simple and focused |
| Push to production | You decide when code goes live |

---

## 💾 Saving Your Project (Git)

### First time (linking project to GitHub)

1. Create a repository at https://github.com/new
2. Ask Claude:

```
Link this project to my GitHub repo: https://github.com/your-name/your-repo
```

### Saving changes

Ask Claude:

```
Commit and push my changes.
```

Or manually:
```bash
git add .
git commit -m "description of what changed"
git push
```

---

## 🔁 Multiple Projects

This package works for any project. Simply repeat:

1. Create a new empty folder
2. Copy `CLAUDE.md` and `.claude/` into it
3. Open Claude Code
4. Describe your next project

Each project gets its own structure based on what you're building.

---

## 🌐 Global Agents — One Setup, Every Project

Tired of copying the `.claude/agents/` folder into every new project? You can install agents **globally** so they're available everywhere automatically.

### How it works

Claude Code looks for agents in **two** places:

| Location | Scope | When to use |
|----------|-------|-------------|
| `.claude/agents/` (in your project) | **This project only** | Agents specific to one project |
| `~/.claude/agents/` (your home folder) | **All projects** | Agents you want everywhere |

> 📝 **What is `~`?** That's your home folder. On Windows: `C:\Users\your-name\`. On Mac: `/Users/your-name/`.

### Setting up global agents

**Step 1:** Create the global folders and copy agents, boilerplates, and references:

**Mac/Linux:**

```bash
mkdir -p ~/.claude/agents ~/.claude/boilerplates ~/.claude/references
cp /path/to/developer-starter-kit/.claude/agents/*.md ~/.claude/agents/
cp -r /path/to/developer-starter-kit/.claude/boilerplates/* ~/.claude/boilerplates/
cp /path/to/developer-starter-kit/.claude/references/* ~/.claude/references/
```

**Windows (PowerShell):**

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\boilerplates"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\references"
Copy-Item \path\to\developer-starter-kit\.claude\agents\*.md "$env:USERPROFILE\.claude\agents\"
Copy-Item -Recurse \path\to\developer-starter-kit\.claude\boilerplates\* "$env:USERPROFILE\.claude\boilerplates\"
Copy-Item \path\to\developer-starter-kit\.claude\references\* "$env:USERPROFILE\.claude\references\"
```

**Or manually:** open `~/.claude/` (create it if it doesn't exist) and copy the `agents/`, `boilerplates/`, and `references/` folders from this kit into it.

**Why all three?** Agents need the boilerplate code templates and reference files to scaffold projects correctly. Without them, the `project-starter` agent can't find the templates it copies into your new project.

**Step 2:** That's it! Now every project you open in Claude Code will have access to these agents and templates — without copying anything.

### What if I have agents in both places?

If the **same agent name** exists in both your project and globally, the **project version wins**. This means:

- Global agents = your personal defaults
- Project agents = overrides for specific projects

This is useful: you can keep the standard agents globally, but customize one for a specific project.

### Recommended setup

For most junior developers, the easiest approach is:

1. **Install agents, boilerplates, and references globally** (follow the steps above) — so every new project has them
2. **Only copy `CLAUDE.md`** into new projects — this is the only file you must have per project
3. **Customize agents per project** only when needed — by adding a `.claude/agents/` folder to that project

Your new project setup becomes:

1. Create a new folder for your project
2. Copy `CLAUDE.md` into it
3. Open it in Claude Code — agents are already available globally

### Checking which agents are available

In Claude Code, you can see all available agents. If an agent isn't showing up, check:
- Is the `.md` file in `~/.claude/agents/` (global) or `.claude/agents/` (project)?
- Does the file have the `.md` extension?
- Is the folder name exactly `agents` (not `agent`)?

---

## ⚙️ Global CLAUDE.md — Personal Defaults

Just like agents, you can also have a **global CLAUDE.md** that applies to all your projects. This is useful for personal preferences.

### How it works

Claude Code reads CLAUDE.md files from **two** places:

| Location | Scope | Example use |
|----------|-------|-------------|
| `CLAUDE.md` (in your project) | **This project only** | Project structure, tech stack, conventions |
| `~/.claude/CLAUDE.md` (your home folder) | **All projects** | Personal preferences, language, style |

The project CLAUDE.md is **always required** — it tells Claude what the project is. The global one is **optional** — it adds your personal preferences on top.

### Setting it up

Create a file at `~/.claude/CLAUDE.md` with your personal preferences:

```markdown
# Personal Preferences

- Explain things in Dutch when I ask questions
- Always use 2 spaces for indentation
- When generating commit messages, keep them short and in English
- I prefer Prettier for formatting
```

This gets applied to every project automatically. The project CLAUDE.md always takes priority if there's a conflict.

---

## ❓ Problems?

| Problem | Solution |
|---------|----------|
| "Claude doesn't see CLAUDE.md" | Check that CLAUDE.md is in the ROOT of your project (not in a subfolder) |
| "Agents don't work" | Check that `.claude/agents/` exists with the `.md` files |
| "npm command not found" | Reinstall Node.js and restart the terminal |
| "git command not found" | Install Git and restart the terminal |
| Claude doesn't do what you want | Be more specific in your description, or say "Stop. Let me explain what I mean first." |
