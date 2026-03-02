# Task Routing & Agent Workflows

Reference file for understanding how to pick the right agent and workflow for a task.

## How big is the task?

| Size | Signals | Approach |
|------|---------|----------|
| **Small** | 1-3 files, simple and clear | Do it directly |
| **Medium** | 4-8 files, multiple layers | Run `codebase-mapper` first, briefly explain the plan |
| **Large** | 8+ files, database+API+frontend | Research → present plan → build after approval |

## Agent Workflow

Use these agents in the right order depending on the task:

```
Small task:
  → just do it → code-reviewer → done

Medium task:
  → codebase-mapper → brief plan → build → code-reviewer → test-impact → docs-impact → done

Large task:
  → codebase-mapper → planner → user approval → implementer → code-reviewer → test-impact → docs-impact → done

New feature (unfamiliar territory):
  → web-researcher → pattern-finder → planner → user approval → implementer → code-reviewer → done

Bug fix:
  → debugger → test-impact → done

Refactoring:
  → codebase-mapper → pattern-finder → refactorer → code-reviewer → done

Database change:
  → planner → migration-risk → user approval → implementer → done

Performance issue:
  → performance-checker → plan fixes → implementer → done
```

**Why this order matters (error cascade principle):** Mistakes in early phases multiply exponentially. A bad line of research leads to a bad plan, which leads to hundreds of bad lines of code. That's why research and planning come first, and human review is most valuable on research and plans — not just on code.

## Available Agents

| Agent | What it does | When to use |
|-------|-------------|-------------|
| `project-starter` | Scaffolds new projects from scratch | Starting a brand new project |
| `codebase-mapper` | Maps which files are affected by a task | Before medium/large tasks |
| `pattern-finder` | Finds existing patterns and conventions in the codebase | Before building features, to ensure consistency |
| `web-researcher` | Researches docs, best practices, and packages from the web | Before technology decisions or when current info is needed |
| `planner` | Creates step-by-step implementation plans | For complex features |
| `implementer` | Executes approved plans step-by-step | After a plan is approved |
| `debugger` | Finds root causes and fixes bugs | When errors occur |
| `code-reviewer` | Checks quality, security, conventions | After writing code, before commits |
| `refactorer` | Improves code structure without changing behavior | When code needs cleanup |
| `performance-checker` | Finds bottlenecks and suggests optimizations | When the app feels slow |
| `test-impact` | Lists what needs testing after changes | After implementing features |
| `migration-risk` | Assesses database migration safety | Before applying schema changes |
| `docs-impact` | Flags documentation that needs updating | After code changes |

## When in Doubt

- **Multiple approaches possible?** → Present 2-3 options with pros/cons in simple terms
- **Scope unclear?** → Ask specifically what the user means
- **Database changes?** → Create the migration, explain what it does, let the user decide
- **Something could break?** → Warn BEFORE doing it
