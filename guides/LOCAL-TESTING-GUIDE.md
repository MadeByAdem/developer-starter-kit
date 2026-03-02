# 🧪 Local Testing — For Beginners

This guide explains in simple terms how to run and test your project locally.

---

## 💻 What is "running locally"?

Your project runs on your own computer, not on the internet. Only you can see it. This is how you test whether everything works before putting it online.

---

## 🚀 Starting Your Project

### If you have a server (Express/Node.js)

Open a terminal in your project folder and type:

```bash
# If your server is in the root:
npm run dev

# If your server is in a subfolder:
cd server
npm run dev
```

You'll see: `Server running on http://localhost:3000`

**That means:** your server is running! Open http://localhost:3000/api/health in your browser to check.

### If you have a frontend (Vue/Nuxt)

Open a **second terminal** (the server must keep running!) and type:

```bash
# If your frontend is in the root:
npm run dev

# If your frontend is in a subfolder:
cd frontend
npm run dev
```

You'll see something like: `Local: http://localhost:5173/`

**Open that URL in your browser** — there's your app!

### Running both at the same time

You need **two terminals**:
- Terminal 1: `cd server && npm run dev` (backend)
- Terminal 2: `cd frontend && npm run dev` (frontend)

Both must stay open. If you close one, that part stops.

> 💡 **To stop a running server:** Press `Ctrl+C` in the terminal where it's running. This safely shuts it down. You can then restart it with `npm run dev`.

---

## 🔌 Testing if Your API Works

### Method 1: Browser (only for GET requests)

Type the URL directly in your browser:
- http://localhost:3000/api/health
- http://localhost:3000/api/users

You'll see JSON data if it works.

### Method 2: Thunder Client (quick & simple)

This is a VS Code extension that lets you make API requests without leaving your editor:

1. Install "Thunder Client" in VS Code (Extensions → search "Thunder Client")
2. Click the lightning bolt icon in the sidebar
3. Click **New Request**
4. Fill in:
   - **URL:** `http://localhost:3000/api/users`
   - **Method:** GET, POST, PUT, or DELETE
5. For POST/PUT: click **Body** → choose **JSON** → fill in data:
   ```json
   {
     "name": "John",
     "email": "john@test.com"
   }
   ```
6. Click **Send**

**Best for:** quick one-off requests while you're coding in VS Code.

### Method 3: Postman (recommended for serious API testing)

Postman is a standalone app with more features than Thunder Client — collections, environments, team sharing, automated testing, and more.

**Installation:**

1. Download from https://www.postman.com/downloads/
2. Install and create a free account (or skip sign-in for local use)

**Basic usage:**

1. Click **New** → **HTTP Request**
2. Fill in:
   - **URL:** `http://localhost:3000/api/users`
   - **Method:** GET, POST, PUT, DELETE, etc.
3. For POST/PUT: click **Body** → select **raw** → choose **JSON** → fill in data:
   ```json
   {
     "name": "John",
     "email": "john@test.com"
   }
   ```
4. Click **Send**

**Useful features:**

- **Collections** — Save and organize your requests into folders (e.g. "Users", "Products", "Auth")
- **Environments** — Switch between local (`localhost:3000`) and production URLs with one click
- **Variables** — Store your API URL, tokens, etc. as variables: `{{base_url}}/api/users`
- **Auth tab** — Easily add Bearer tokens, API keys, or Basic Auth to requests
- **Tests** — Write simple tests that run after each request (e.g. "status should be 200")
- **History** — See all your previous requests

**Setting up an environment:**

1. Click the eye icon (top right) → **Add** a new environment (e.g. "Local")
2. Add variables:
   - `base_url` = `http://localhost:3000`
   - `token` = your JWT token (if needed)
3. Select the environment from the dropdown (top right)
4. Use `{{base_url}}` in your request URLs instead of hardcoding

**Best for:** projects with many endpoints, team collaboration, and when you want to save and reuse requests.

### Method 4: Terminal (curl)

```bash
# Fetch data
curl http://localhost:3000/api/users

# Send data
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@test.com"}'
```

---

## 🖥️ Testing if Your Frontend Works

### Auto-refresh

When you run `npm run dev`, your page is **automatically refreshed** when you change code. You don't need to restart anything.

### Browser Developer Tools (F12)

This is your best friend for finding problems:

1. Open your app in the browser
2. Press **F12** (or right-click → Inspect)
3. Important tabs:
   - **Console** — Here you'll see error messages (red text = problem)
   - **Network** — Here you'll see all API calls your app makes
   - **Elements** — Here you'll see the HTML structure of your page

### Vue DevTools (optional but useful)

1. Install the browser extension "Vue.js devtools" (Chrome or Firefox)
2. Open your app → F12 → click on the **Vue** tab
3. You can now:
   - View all components and their data
   - Inspect Pinia stores (the "state" of your app)

---

## 🗄️ Checking the Database (Supabase)

### Via the Dashboard

1. Go to https://supabase.com/dashboard
2. Open your project
3. **Table Editor** — here you see your tables and data
4. **SQL Editor** — here you can run SQL queries

### Common Checks

- "Is my data in there?" → Table Editor → click on the table
- "Does my migration work?" → SQL Editor → run the SQL
- "What are my keys?" → Settings → API → copy Project URL and keys

---

## 🔧 Common Problems and Solutions

### "npm install" doesn't work

```bash
# Step 1: Clear cache
npm cache clean --force

# Step 2: Delete node_modules and try again
# Mac/Linux:
rm -rf node_modules package-lock.json
# Windows (PowerShell):
Remove-Item -Recurse -Force node_modules, package-lock.json

# Step 3: Reinstall
npm install
```

### "Port is already in use"

Something is already running on that port. Solutions:

```bash
# Use a different port
# Mac/Linux:
PORT=3001 npm run dev
# Windows (PowerShell):
$env:PORT=3001; npm run dev

# Or find what's using the port:
# Mac/Linux:
lsof -i :3000
# Windows:
netstat -ano | findstr :3000

# Then kill the process (replace PID with the number from the last column):
# Mac/Linux:
kill -9 PID
# Windows:
taskkill /PID PID /F
```

### "CORS error" in the browser

Your frontend can't reach the server. Ask Claude:

```
I'm getting a CORS error. My frontend runs on localhost:5173 and my server on localhost:3000.
```

### "Cannot find module"

```bash
# Install the missing module
npm install module-name

# Or reinstall everything
npm install
```

### "ECONNREFUSED" or "Network Error"

- Check if your server is running (do you see `Server running on...` in the terminal?)
- Check if the URL is correct (port number!)
- Check if your `.env` file has the correct URL

### Server doesn't restart after code changes

Ask Claude:
```
My server doesn't restart automatically when I change code. Fix this.
```

(They'll probably install `nodemon`)

### Page is blank

1. Open F12 → Console
2. Copy the error message
3. Give it to Claude:
```
My page is blank. In the console I see: [paste the error]
```

---

## 📋 Useful Commands

| What do you want to do? | Command | Where to type? |
|------------------------|---------|----------------|
| Start server | `npm run dev` | In the server folder |
| Start frontend | `npm run dev` | In the frontend folder |
| Install a package | `npm install packagename` | In the correct folder |
| Reinstall everything | Delete `node_modules/` folder, then `npm install` | In the correct folder |
| Git status | `git status` | Project root |
| Save changes | `git add . && git commit -m "description"` | Project root |
| Push to GitHub | `git push` | Project root |

---

## 🔄 Workflow: From Idea to Working Project

```
 1. Describe to Claude what you want to build
    ↓
 2. Claude sets up the project (project-starter)
    ↓
 3. Start your project: npm run dev
    ↓
 4. Check if the base project works (health endpoint / start page)
    ↓
 5. Ask Claude to add features
    ↓
 6. Test each feature:
    • API → Thunder Client, Postman, or browser
    • Frontend → view in browser + F12
    • Database → Supabase dashboard
    ↓
 7. Does it work? → Commit and push
    ↓
 8. Doesn't work? → Give the error to Claude
    ↓
 9. Repeat 5-8 until your app is done
```

---

## 💡 Tips

- **Don't close your terminal** when your server/frontend is running — it will stop
- **Two terminals** if you have both server and frontend
- **F12 is your friend** — always check there first when something doesn't work
- **Copy error messages** verbatim when giving them to Claude
- **Commit regularly** — then you can always go back to a working version
- **Ask Claude** if you don't understand something — it will explain in simple terms
