# 🌐 Deployment Guide — For Beginners

This guide explains step by step how to put your project online so anyone can use it. No prior deployment experience needed.

---

## 🗺️ Find Your Deployment Path

Not every project type deploys the same way. Find your project type and follow the sections listed:

| Project type    | What to deploy                       | Sections to follow            |
| --------------- | ------------------------------------ | ----------------------------- |
| `vue-only`      | Frontend only                        | 1, 2, 3                       |
| `nuxt-only`     | App (static or SSR)                  | 1, 2, 3                       |
| `api-only`      | API server only                      | 1, 4, 5, 6                    |
| `express-vue`   | Frontend + API server                | 1, 2, 3, 4, 5, 6, 7           |
| `express-nuxt`  | Frontend + API server                | 1, 2, 3, 4, 5, 6, 7           |
| `python-script` | Usually not deployed (see section 8) | 8                              |

---

## 💡 How Deployment Works

Depending on your project type, your code goes to different places:

```text
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR GITHUB REPO                         │
│                  (one repo, all your code)                       │
│                                                                 │
│   ┌──────────────┐              ┌──────────────┐                │
│   │   frontend/   │              │   server/     │                │
│   │  (Vue/Nuxt)  │              │  (Express)   │                │
│   └──────┬───────┘              └──────┬───────┘                │
│          │                              │                        │
└──────────┼──────────────────────────────┼────────────────────────┘
           │                              │
           ▼                              ▼
┌──────────────────┐          ┌──────────────────────┐
│ Cloudflare Pages │          │   Your Server (VPS)  │
│                  │          │                      │
│  Hosts your      │          │  Docker runs your    │
│  frontend        │          │  API (Express)       │
│                  │          │                      │
│  yourapp.pages   │          │  Cloudflare Tunnel   │
│  .dev            │          │  exposes it to the   │
│                  │          │  internet securely    │
└──────────────────┘          └──────────┬───────────┘
           │                              │
           │         ┌────────────┐       │
           └────────►│  Supabase  │◄──────┘
                     │ (database) │
                     │ already in │
                     │ the cloud  │
                     └────────────┘
```

**Not every project uses all three parts:**

| Part                          | Who needs it                                    | Where it runs          |
| ----------------------------- | ----------------------------------------------- | ---------------------- |
| **Frontend** (Vue/Nuxt)       | `vue-only`, `nuxt-only`, `express-vue/nuxt`     | Cloudflare Pages       |
| **API server** (Express)      | `api-only`, `express-vue`, `express-nuxt`        | Your server via Docker |
| **Database** (Supabase)       | Any project that uses a database                 | Supabase cloud (already online) |

---

## 1️⃣ Prerequisites

Before you start, check what you need for **your** project type:

| What                                  | Needed for                                      | Where to get it                            |
| ------------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| A **GitHub account**                  | All project types                               | https://github.com                         |
| A **Cloudflare account** (free)       | `vue-only`, `nuxt-only`, `express-vue/nuxt`     | https://dash.cloudflare.com/sign-up        |
| A **server** (VPS)                    | `api-only`, `express-vue`, `express-nuxt`        | Hetzner, DigitalOcean, or any VPS provider |
| **Docker** installed on your server   | Any project with a VPS                          | See section 4 below                        |
| A **domain name** (optional)          | For a nice URL like `api.yourapp.com`            | Cloudflare, Namecheap, etc.                |

> 📝 **What is a VPS?** A Virtual Private Server — basically a computer in a data center that is always on and always connected to the internet. You rent one for a few euros per month.

> 💡 **Don't need a VPS?** If your project is `vue-only` or `nuxt-only` (static), you only need GitHub and Cloudflare — both free. Skip sections 4, 5, 6, and 7.

---

## 2️⃣ Preparing Your Project for Deployment

Before deploying, your project needs a few things set up correctly.

### Environment variables

Your project uses `.env` files to store settings (database URL, API keys, etc.). These are **different** for local development and production.

> ⚠️ **Important:** Never commit `.env` files to GitHub. They contain secrets. Make sure `.env` is in your `.gitignore` file.

**Choose the example for your project type:**

#### vue-only

```bash
# .env (root of your project)
VITE_API_URL=https://your-api-url.com
```

#### nuxt-only

```bash
# .env (root of your project)
NUXT_PUBLIC_API_URL=https://your-api-url.com
```

#### api-only

```bash
# .env (root of your project)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=10002
NODE_ENV=production
CORS_ORIGIN=https://yourapp.pages.dev
```

#### express-vue or express-nuxt

**Frontend** (`frontend/.env`):

```bash
# Vue projects use VITE_API_URL
VITE_API_URL=https://api.yourapp.com

# Nuxt projects use NUXT_PUBLIC_API_URL
NUXT_PUBLIC_API_URL=https://api.yourapp.com
```

**Server** (`server/.env`):

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=10002
NODE_ENV=production
CORS_ORIGIN=https://your-app-name.pages.dev
```

### Build command for the frontend

Your frontend needs to be **built** before it can be served. Check that your `package.json` (in the frontend folder) has a build command:

**Vue (Vite):**

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

**Nuxt:**

```json
{
  "scripts": {
    "build": "nuxt build",
    "generate": "nuxt generate"
  }
}
```

> 📝 **`build` vs `generate` (Nuxt only):** `generate` creates static HTML files — faster and cheaper to host, works great for most sites. `build` creates a full server-side rendered app — needed if you use server routes or real-time data. When in doubt, use `generate`.

---

## 3️⃣ Deploying the Frontend via Cloudflare Pages

**Applies to:** `vue-only`, `nuxt-only`, `express-vue`, `express-nuxt`

Cloudflare Pages hosts your frontend for free. It automatically rebuilds and deploys every time you push to GitHub.

### Step 1: Push your project to GitHub

If you haven't already:

```bash
git add .
git commit -m "ready for deployment"
git push
```

### Step 2: Connect your repo to Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** in the left sidebar
3. Click **Create** (blue button)
4. Click the **Pages** tab
5. Click **Connect to Git**
6. Select **GitHub** and authorize Cloudflare to access your repos
7. Choose your repository from the list
8. Click **Begin setup**

### Step 3: Configure the build settings

Fill in the settings based on your project type:

**Vue projects** (`vue-only` or `express-vue`):

| Setting                    | Value                                                                      |
| -------------------------- | -------------------------------------------------------------------------- |
| **Project name**           | `your-app-name` (this becomes `your-app-name.pages.dev`)                  |
| **Production branch**      | `main`                                                                     |
| **Framework preset**       | None (or leave empty)                                                      |
| **Build command**          | `npm run build`                                                            |
| **Build output directory** | `dist`                                                                     |
| **Root directory**         | `frontend` (for `express-vue`) or leave empty (for `vue-only`)             |

**Nuxt projects** (`nuxt-only` or `express-nuxt`):

| Setting                    | Value                                                                      |
| -------------------------- | -------------------------------------------------------------------------- |
| **Project name**           | `your-app-name` (this becomes `your-app-name.pages.dev`)                  |
| **Production branch**      | `main`                                                                     |
| **Framework preset**       | Select **Nuxt.js** from the dropdown                                       |
| **Build command**          | `npm run generate` (static) or `npm run build` (SSR)                       |
| **Build output directory** | `.output/public` (for `generate`) or `.output` (for `build`)              |
| **Root directory**         | `frontend` (for `express-nuxt`) or leave empty (for `nuxt-only`)           |

### Step 4: Add environment variables

Still on the same page, scroll down to **Environment variables** and add:

**Vue projects:**

| Variable name    | Value                                                                    |
| ---------------- | ------------------------------------------------------------------------ |
| `VITE_API_URL`   | `https://api.yourapp.com` (your API URL — you'll set this up later)      |
| `NODE_VERSION`   | `20`                                                                     |

**Nuxt projects:**

| Variable name           | Value                                                                    |
| ----------------------- | ------------------------------------------------------------------------ |
| `NUXT_PUBLIC_API_URL`   | `https://api.yourapp.com` (your API URL — you'll set this up later)      |
| `NODE_VERSION`          | `20`                                                                     |

> 💡 **Tip:** You can change environment variables later under **Settings → Environment variables** in your Pages project.

### Step 5: Deploy

Click **Save and Deploy**. Cloudflare will:

1. Pull your code from GitHub
2. Run `npm install`
3. Run your build command
4. Deploy the result

This takes 1-3 minutes. When done, you'll get a URL like: `https://your-app-name.pages.dev`

**Open that URL in your browser** — you should see your frontend!

### Step 6: Custom domain (optional)

If you want `www.yourapp.com` instead of `your-app-name.pages.dev`:

1. Go to your Pages project in Cloudflare
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `www.yourapp.com`)
5. Follow the DNS instructions Cloudflare provides

### From now on: automatic deploys

Every time you `git push` to your main branch, Cloudflare Pages automatically rebuilds and deploys your frontend. You don't have to do anything.

> 📝 **`vue-only` and `nuxt-only` projects:** You're done! Skip to section 9 (Common Problems) if you run into issues.

---

## 4️⃣ Setting Up the API Server with Docker

**Applies to:** `api-only`, `express-vue`, `express-nuxt`

**Docker** runs your server in an isolated box so it works the same everywhere — on your computer, on a VPS, on any machine.

### Step 1: Install Docker on your server

Connect to your server via SSH, then install Docker:

```bash
# Update package list
sudo apt update

# Install Docker
sudo apt install -y docker.io docker-compose-plugin

# Let your user run Docker without sudo
sudo usermod -aG docker $USER

# Log out and back in for this to take effect
exit
```

Log back in and check that Docker works:

```bash
docker --version
# Should show something like: Docker version 24.x.x
```

### Step 2: Clone your project on the server

```bash
# Go to a folder where you keep your projects
cd /opt

# Clone your repo
git clone https://github.com/your-name/your-repo.git
cd your-repo
```

### Step 3: Create the docker-compose.yml file

Choose the right `docker-compose.yml` for your project type:

#### api-only

Create `docker-compose.yml` in the root of your project:

```yaml
services:
  server:
    container_name: my-app-server
    image: node:20-slim
    restart: always
    working_dir: /app
    ports:
      - '127.0.0.1:10002:10002'
    volumes:
      - .:/app
    env_file:
      - .env
    command: node server.js
```

#### express-vue or express-nuxt

Create `docker-compose.yml` in the root of your project (not inside `server/`):

```yaml
services:
  server:
    container_name: my-app-server
    image: node:20-slim
    restart: always
    working_dir: /app/server
    ports:
      - '127.0.0.1:10002:10002'
    volumes:
      - .:/app
    env_file:
      - ./server/.env
    command: node server.js
```

> 📝 **Note:** `working_dir: /app/server` tells Docker to run inside the `server/` subfolder. The `.env` file path also points to `server/.env`.

**What does each line mean?**

| Line                                    | What it does                                                                       |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| `image: node:20-slim`                   | Use Node.js 20 (slim version, smaller download)                                   |
| `restart: always`                       | If the server crashes, Docker restarts it automatically                            |
| `working_dir: /app`                     | Inside the container, work from the `/app` folder                                  |
| `ports: '127.0.0.1:10002:10002'`        | Make port 10002 available, but **only** on localhost (not publicly visible)         |
| `volumes: .:/app`                       | Map your project folder into the container so it can see your files                |
| `env_file: .env`                        | Load environment variables from the `.env` file                                    |
| `command: node server.js`               | The command to start your server                                                   |

> 📝 **Why `127.0.0.1:10002:10002` instead of just `10002:10002`?** This makes the port only accessible from the server itself, not from the internet. Cloudflare Tunnel will handle the public access securely (see next section).

### Step 4: Create the .env file on the server

```bash
# On your server, in the project folder:
nano .env
# (or nano server/.env for express-vue/express-nuxt)
```

Add your production environment variables:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=10002
NODE_ENV=production
CORS_ORIGIN=https://your-app-name.pages.dev
```

Save and exit (`Ctrl+X`, then `Y`, then `Enter`).

### Step 5: Install dependencies and start

```bash
# For api-only:
docker compose run --rm server npm install

# For express-vue / express-nuxt (install inside server/):
docker compose run --rm server npm install

# Start the server
docker compose up -d
```

The `-d` flag means "detached" — it runs in the background.

### Step 6: Check if it's running

```bash
# See running containers
docker compose ps

# See the logs (what your server is printing)
docker compose logs -f server

# Press Ctrl+C to stop watching logs (the server keeps running)
```

You should see something like: `Server running on port 10002`

---

## 5️⃣ Exposing the API via Cloudflare Tunnel

**Applies to:** `api-only`, `express-vue`, `express-nuxt`

**Cloudflare Tunnel** creates a secure connection from your server to the internet, without opening ports or dealing with firewalls. Think of it as a private bridge between your server and Cloudflare.

The easiest way is to run the tunnel as a separate Docker container. We keep it in its own folder so it's completely independent from your app.

### Step 1: Create a tunnel in the Cloudflare Dashboard

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Zero Trust** in the left sidebar
3. Go to **Networks** → **Tunnels**
4. Click **Create a tunnel**
5. Choose **Cloudflared** as the connector type
6. Give it a name (e.g. `my-api-tunnel`)
7. Click **Save tunnel**
8. Cloudflare shows you a **token** — **copy it** (it's a long string starting with `ey...`)

> ⚠️ **Keep this token safe!** It's like a password that lets the tunnel connect to your Cloudflare account.

### Step 2: Configure the public hostname

Still in the tunnel setup screen:

1. Click the **Public Hostname** tab
2. Click **Add a public hostname**
3. Fill in:

| Setting       | Value                                |
| ------------- | ------------------------------------ |
| **Subdomain** | `api` (or whatever you want)         |
| **Domain**    | Select your domain from the dropdown |
| **Type**      | `HTTP`                               |
| **URL**       | `localhost:10002`                    |

4. Click **Save hostname**

This tells Cloudflare: "When someone visits `api.yourapp.com`, send the request to port 10002 on the server."

> 📝 **Why `localhost:10002`?** Because the tunnel runs with `network_mode: host`, it shares the server's network. So `localhost` points directly to the machine where your API is running.

### Step 3: Create a cloudflare folder on your server

The tunnel runs separately from your app. Create a dedicated folder for it:

```bash
# On your server
mkdir -p /opt/cloudflare
cd /opt/cloudflare
```

### Step 4: Create the docker-compose.yml

```bash
nano docker-compose.yml
```

Add this:

```yaml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run --token ${CF_TOKEN}
    env_file:
      - .env
    network_mode: host
    restart: unless-stopped
```

Save and exit (`Ctrl+X`, then `Y`, then `Enter`).

### Step 5: Create the .env file with your token

```bash
nano .env
```

Add this one line (paste your real token):

```bash
CF_TOKEN=eyJhIjoiYWJjZGVm...your-real-token-here
```

Save and exit.

### Step 6: Start the tunnel

```bash
docker compose up -d
```

Check if it's running:

```bash
docker compose ps
```

You should see one container running: `cloudflared`.

### Step 7: Test it

Open `https://api.yourapp.com/api/health` in your browser. If you see a JSON response, it works!

> 💡 **Tip:** If it doesn't work immediately, wait 30 seconds — the tunnel needs a moment to connect. Check the logs with `docker compose logs -f cloudflared`.

---

## 6️⃣ Your Server Layout

**Applies to:** `api-only`, `express-vue`, `express-nuxt`

After setting up Docker and Cloudflare Tunnel, your server looks like this:

### api-only

```text
/opt/
├── your-repo/                ← Your app
│   ├── docker-compose.yml    ← Runs the API server
│   ├── .env                  ← App secrets (Supabase, PORT, etc.)
│   ├── server.js
│   └── ...
│
└── cloudflare/               ← The tunnel (separate)
    ├── docker-compose.yml    ← Runs cloudflared
    └── .env                  ← Just CF_TOKEN
```

### express-vue or express-nuxt

```text
/opt/
├── your-repo/                ← Your app (monorepo)
│   ├── docker-compose.yml    ← Runs the API server
│   ├── server/               ← Backend code
│   │   ├── .env              ← Server secrets
│   │   ├── server.js
│   │   └── ...
│   ├── frontend/             ← Frontend code (deployed via Cloudflare Pages)
│   │   └── ...
│   └── ...
│
└── cloudflare/               ← The tunnel (separate)
    ├── docker-compose.yml    ← Runs cloudflared
    └── .env                  ← Just CF_TOKEN
```

The app and the tunnel are independent — you can restart your app without touching the tunnel, and vice versa.

---

## 7️⃣ Connecting Frontend and API

**Applies to:** `express-vue`, `express-nuxt`

Now you have:

- Frontend at `https://your-app-name.pages.dev`
- API at `https://api.yourapp.com`
- Database at Supabase (already connected)

### Update the frontend environment variable

In Cloudflare Pages:

1. Go to your Pages project
2. Click **Settings** → **Environment variables**
3. Set your API URL variable:
   - Vue: `VITE_API_URL` = `https://api.yourapp.com`
   - Nuxt: `NUXT_PUBLIC_API_URL` = `https://api.yourapp.com`
4. Click **Save**
5. Go to **Deployments** and click **Retry deployment** on the latest deploy (so it picks up the new variable)

### Update CORS on the server

In your server's `.env` file (on the VPS), make sure CORS allows your frontend:

```bash
CORS_ORIGIN=https://your-app-name.pages.dev
```

If you also want to allow your custom domain:

```bash
CORS_ORIGIN=https://your-app-name.pages.dev,https://www.yourapp.com
```

Then restart the server:

```bash
cd /opt/your-repo
docker compose restart
```

### Test the connection

1. Open your frontend URL in the browser
2. Press F12 → **Network** tab
3. Do something that calls the API (e.g., load data)
4. You should see requests going to `https://api.yourapp.com/api/...` with status `200`

If you see red errors, check the **Common Problems** section below.

---

## 8️⃣ Python Scripts

**Applies to:** `python-script`

Python scripts are typically **not deployed** — they run on your own computer or on a server when you need them. But if you want to run a script on a schedule (e.g., every night), you have two options:

### Option A: Run on your own computer

Just run the script manually whenever you need it:

```bash
cd my-project
# Mac/Linux:
source .venv/bin/activate
# Windows:
# .venv\Scripts\activate

python main.py
```

### Option B: Run on a VPS

If you need the script to run automatically on a schedule, put it on a VPS and use a cron job:

```bash
# On your server
cd /opt
git clone https://github.com/your-name/your-repo.git
cd your-repo

# Set up Python
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Create .env with your variables
nano .env

# Test it
python main.py
```

To run it automatically (e.g., every day at 3 AM):

```bash
# Open the cron editor
crontab -e

# Add this line (runs every day at 3:00 AM):
0 3 * * * cd /opt/your-repo && /opt/your-repo/.venv/bin/python main.py >> /opt/your-repo/logs/cron.log 2>&1
```

> 💡 **Tip:** Ask Claude to help you set up the cron schedule. Say: "I want to run my script every [frequency]."

---

## 9️⃣ Updating After Changes

### Updating the frontend (automatic)

**Applies to:** `vue-only`, `nuxt-only`, `express-vue`, `express-nuxt`

```bash
# On your local computer
git add .
git commit -m "updated homepage design"
git push
```

That's it. Cloudflare Pages detects the push and rebuilds automatically. Your site updates in 1-3 minutes.

### Updating the API server (manual)

**Applies to:** `api-only`, `express-vue`, `express-nuxt`

```bash
# SSH into your server
ssh user@your-server-ip

# Go to your project
cd /opt/your-repo

# Pull the latest code
git pull

# If you changed package.json (added new packages):
docker compose run --rm server npm install

# Restart the server
docker compose restart

# Check if it's running
docker compose logs -f server
```

> 💡 **Tip:** Ask Claude to help you set up a simple deployment script so you can do all of this with one command.

---

## 🔧 Common Problems and Solutions

| Problem                                      | Cause                                         | Solution                                                                                                              |
| -------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Frontend shows blank page after deploy        | Build failed or wrong build directory          | Check Cloudflare Pages → **Deployments** → click the failed deploy to see the error log                               |
| API returns "502 Bad Gateway"                 | Docker container is not running                | SSH into server, run `docker compose ps` to check, then `docker compose up -d` to start                               |
| CORS error in browser console                 | Frontend and API URLs don't match CORS config  | Check `CORS_ORIGIN` in your server `.env` — it must match your frontend URL exactly (including `https://`)             |
| "Tunnel connection failed"                    | Cloudflare Tunnel container is not running     | SSH into server, run `cd /opt/cloudflare && docker compose ps` — if stopped, run `docker compose up -d`                |
| "Cannot find module" on server                | Missing npm packages after code update         | Run `docker compose run --rm server npm install` then `docker compose restart`                                         |
| Environment variable not working on frontend  | Didn't redeploy after changing the variable    | Go to Cloudflare Pages → **Deployments** → **Retry deployment**                                                       |
| Vue env var not loading                        | Wrong prefix — must start with `VITE_`         | Rename to `VITE_API_URL` (not `API_URL`). Vite only exposes variables starting with `VITE_`                           |
| Nuxt env var not loading                       | Wrong prefix — must start with `NUXT_PUBLIC_`  | Rename to `NUXT_PUBLIC_API_URL` (not `API_URL`). Nuxt only exposes variables starting with `NUXT_PUBLIC_`             |
| API works locally but not on server            | Different `.env` values                        | Compare your local `.env` with the one on the server — same keys, possibly different values                            |
| "Permission denied" on the server              | File ownership issues                          | Run `sudo chown -R $USER:$USER /opt/your-repo`                                                                        |
| Docker won't start                             | Docker service is stopped                      | Run `sudo systemctl start docker`                                                                                     |
| `git pull` fails on server                     | Uncommitted changes on server                  | Run `git stash` to save changes, then `git pull`, then `git stash pop`                                                |
| Supabase connection fails on server            | Wrong Supabase URL or key in `.env`            | Double-check the values in **Supabase Dashboard → Project Settings → Data API**                                        |
| Site shows old version after push              | Cloudflare cache                               | Go to Cloudflare → your domain → **Caching** → **Purge Everything**                                                   |

---

## 💡 Tips

- **Deploy early, deploy often** — don't wait until your whole app is done. Deploy as soon as you have something working, even if it's just a "Hello World". This way you catch deployment problems early, not when your project is due.
- **Test locally first** — always make sure your project works on your own computer before deploying. See the [LOCAL-TESTING-GUIDE.md](LOCAL-TESTING-GUIDE.md) for how to do this.
- **Keep your `.env` files separate** — your local `.env` and your server `.env` will have different values. That's normal. Never copy one over the other blindly.
- **Check the logs** — when something doesn't work on the server, the answer is almost always in the logs:

  ```bash
  # API logs
  docker compose logs -f server

  # Tunnel logs (from the cloudflare folder)
  cd /opt/cloudflare && docker compose logs -f cloudflared
  ```

- **Bookmark your URLs** — keep a note somewhere with:

  - Frontend URL: `https://your-app-name.pages.dev`
  - API URL: `https://api.yourapp.com`
  - Supabase Dashboard: `https://supabase.com/dashboard`
  - Cloudflare Dashboard: `https://dash.cloudflare.com`
  - Your server IP: `xxx.xxx.xxx.xxx`

- **Ask Claude for help** — if you get stuck, give Claude the error message and say:

  ```text
  I'm trying to deploy my project. I get this error: [paste the error].
  My project type is [api-only / vue-only / express-vue / etc.].
  My frontend is on Cloudflare Pages, my API runs in Docker on a VPS
  with Cloudflare Tunnel.
  ```

- **Don't edit files directly on the server** — always make changes locally, push to GitHub, then pull on the server. This keeps your code in sync.
- **Restart after `.env` changes** — if you change environment variables on the server, always restart:

  ```bash
  docker compose restart
  ```
