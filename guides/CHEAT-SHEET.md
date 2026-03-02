# ⚡ Developer Starter Kit — Cheat Sheet

## 🚀 1. Starting Your Project

| Action | Command |
|---|---|
| Start backend | `npm run dev` (from `server/`) |
| Start frontend | `npm run dev` (from `frontend/`) |
| Start both | Run each in a **separate terminal** |

## 💬 2. Talking to Claude

| Goal | Example prompt |
|---|---|
| **Request a feature** | `"Add a POST /api/users endpoint that creates a user in Supabase"` |
| | `"Create a login page with email and password fields using Vue"` |
| | `"Add pagination to the GET /api/products endpoint"` |
| **Report a bug** | `"I get a 500 error when calling GET /api/items — fix it"` |
| | `"The login form submits but nothing happens, check the auth flow"` |
| **Ask for explanation** | `"Explain what the middleware in auth.js does"` |
| | `"What does this Supabase query in userRepository.js do?"` |
| | `"Why is my component not re-rendering when state changes?"` |

💡 **Tip:** Be specific. Include file names, error messages, and what you expected vs. what happened.

## 🐙 3. Git Commands

| Action | Command |
|---|---|
| Check status | `git status` |
| Stage all changes | `git add .` |
| Commit | `git commit -m "your message"` |
| Push | `git push` |
| Undo last commit (keep files) | `git reset --soft HEAD~1` |
| Create & switch branch | `git checkout -b feature/my-feature` |
| Switch branch | `git checkout main` |

## 📦 4. npm Commands

| Action | Command |
|---|---|
| Install dependencies | `npm install` |
| Add a package | `npm install package-name` |
| Clean reinstall | Delete `node_modules/` folder, then `npm install` |
| Run dev server | `npm run dev` |
| Security audit | `npm audit` |

## 🧪 5. Testing

**API Testing (Thunder Client / Postman)**

1. Open Thunder Client (VS Code sidebar) or Postman
2. Set method (`GET`, `POST`, etc.) and URL (`http://localhost:3000/api/...`)
3. Add `Content-Type: application/json` header for POST/PUT
4. Add JSON body if needed → click **Send**
5. Check status code and response body

**Frontend Testing (Browser DevTools)**

Press `F12` then check:

| Tab | What to look for |
|---|---|
| **Console** | JavaScript errors, failed API calls |
| **Network** | Request status codes, response data, slow requests |
| **Elements** | Missing DOM elements, wrong CSS |

## 🔎 6. Where to Find Things

| What | Where |
|---|---|
| API keys | Supabase Dashboard → Settings → API |
| Logs | Terminal where server is running |
| Database tables | Supabase Dashboard → Table Editor |
| Environment variables | `.env` file in project root |
| API docs | `DOCUMENTATION/api.md` and `routes/` folder |

## 🔧 7. Common Errors Quick Fix

| Error | Fix |
|---|---|
| **CORS error** | Check `CORS_ORIGIN` in your backend `.env` — must match your frontend URL exactly |
| **MODULE_NOT_FOUND** | Run `npm install` — you're missing a dependency |
| **Port already in use** | Kill the process: `npx kill-port 3000` or change port in `.env` |
| **401 Unauthorized** | Check your API key / auth token — it's missing or expired |
| **403 Forbidden** | Check Supabase RLS policies — your user lacks permission |
| **Blank page (frontend)** | Open `F12` → Console for errors; check if API is running |
| **ECONNREFUSED** | Backend isn't running — start it with `npm run dev` |
| **Invalid JSON** | Check request body syntax — missing comma, bracket, or quote |

## 📁 8. File Structure Quick Reference

| Folder | What goes here |
|---|---|
| `routes/` | URL definitions and HTTP methods |
| `controllers/` | Request handling — validate input, call service, send response |
| `services/` | Business logic — rules, calculations, orchestration |
| `repositories/` | Database queries (Supabase calls) |
| `views/` | Page-level Vue components |
| `components/` | Reusable UI components |
| `stores/` | Pinia state management |
| `composables/` | Reusable Vue composition functions |

**Rule of thumb:** Routes → Controllers → Services → Repositories → Database

## ⌨️ 9. Keyboard Shortcuts (VS Code)

| Action | Shortcut |
|---|---|
| Open terminal | `` Ctrl + ` `` |
| Command palette | `Ctrl + Shift + P` |
| Search files by name | `Ctrl + P` |
| Search in all files | `Ctrl + Shift + F` |
| Format document | `Shift + Alt + F` |
| Toggle sidebar | `Ctrl + B` |
| Multi-cursor | `Alt + Click` |
| Duplicate line | `Shift + Alt + Down` |

## ✨ 10. Useful Slash Commands

| Command | What it does |
|---|---|
| `/commit` | Create a git commit with a good message |
| `/review-pr` | Review a pull request |
| `/help` | Show available commands |
