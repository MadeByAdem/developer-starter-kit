# 🔧 Troubleshooting

> Quick fixes for the most common problems. If your issue isn't listed here, describe it to Claude — include the error message and what you were doing when it happened.

---

## 🔟 Top 10 Problems & Fixes

### 1. "I ran `npm run dev` but nothing happens" / command not found

**Cause:** You're in the wrong folder, or dependencies aren't installed.

**Fix:**
```bash
# Make sure you're in the right folder
cd server        # for backend
cd frontend      # for frontend

# Install dependencies first
npm install

# Then start
npm run dev
```

---

### 2. "EADDRINUSE: port already in use"

**Cause:** Another process is already using that port (usually 3000 or 5173).

**Fix:**
```bash
# Kill the process on that port
npx kill-port 3000

# Or change the port in your .env file
PORT=3001
```

---

### 3. "MODULE_NOT_FOUND: Cannot find module '...'"

**Cause:** A dependency is missing. Either you forgot `npm install` or a package wasn't added.

**Fix:**
```bash
# Install all dependencies
npm install

# If a specific package is missing
npm install package-name
```

If that doesn't work, delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

---

### 4. CORS error in the browser console

**What it looks like:**
```
Access to fetch at 'http://localhost:3000/api/...' from origin 'http://localhost:5173'
has been blocked by CORS policy
```

**Cause:** Your backend doesn't allow requests from your frontend URL.

**Fix:** Check the `CORS_ORIGIN` value in your backend `.env` file:
```env
# This must match EXACTLY where your frontend runs
CORS_ORIGIN=http://localhost:5173
```

Make sure there's no trailing slash and the port is correct. Restart your backend after changing `.env`.

Also check that your frontend is pointing to the correct backend URL:

- **Vue (Vite):** Check `VITE_API_URL` in your frontend `.env`
- **Nuxt:** Check `NUXT_PUBLIC_API_URL` in your `nuxt.config.ts` runtime config

---

### 5. "I can't see my data in the app" (but it's in Supabase)

**Cause:** Row Level Security (RLS) is blocking access. This is the #1 issue for beginners.

**Fix:**
1. Go to Supabase Dashboard → Authentication → Policies
2. Check if your table has policies that allow reading
3. If you're using the `service_role` key in the backend, it bypasses RLS — make sure your `.env` has `SUPABASE_SERVICE_ROLE_KEY` set
4. If you need public read access, add a policy:
```sql
CREATE POLICY "Allow public read" ON public.your_table
  FOR SELECT USING (true);
```

See `guides/SUPABASE-GUIDE.md` for more on RLS.

---

### 6. "401 Unauthorized" on API calls

**Cause:** Missing or invalid authentication token.

**Fix:**
- Check if the endpoint requires authentication (uses `requireAuth` middleware)
- Make sure you're sending the token in the `Authorization` header: `Bearer your-token-here`
- Check if the token is expired — log in again to get a fresh one
- Make sure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct in your `.env`

---

### 7. ".env file not working" / environment variables are undefined

**Cause:** The `.env` file is missing, misnamed, or not loaded.

**Fix:**
1. Make sure the file is named `.env` (not `.env.example`, not `env`, not `.env.txt`)
2. Make sure it's in the right folder (project root for single projects, `server/` for the backend in split projects)
3. Restart the server after changing `.env` — changes are NOT picked up automatically
4. For frontend (Vite): variables must start with `VITE_` to be accessible
5. For frontend (Nuxt): variables must start with `NUXT_PUBLIC_` to be accessible

```bash
# Copy the template if you don't have .env yet
cp .env.example .env
# Then fill in your real values
```

---

### 8. Blank page in the browser (frontend)

**Cause:** JavaScript error preventing the app from rendering.

**Fix:**
1. Open the browser, press `F12` → Console tab
2. Look for red error messages — they usually point to the problem
3. Common causes:
   - API URL is wrong or backend isn't running
   - Import path is wrong (typo in file name)
   - Missing dependency (`npm install`)

---

### 9. "I accidentally committed my .env file"

**Cause:** `.env` wasn't in `.gitignore` or was added before `.gitignore` was created.

**Fix:**
```bash
# Remove .env from Git tracking (keeps the file locally)
git rm --cached .env
git commit -m "remove .env from tracking"
git push
```

Then check that `.env` is listed in your `.gitignore` file. If your secrets were pushed to a public repo, **rotate them immediately** in Supabase Dashboard → Settings → API → Regenerate keys.

---

### 10. "500 Internal Server Error" with no useful message

**Cause:** An unhandled error in your backend code.

**Fix:**
1. Check your terminal where the server is running — the full error is usually logged there
2. If you see a database error, check:
   - Is Supabase running and reachable?
   - Are your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` correct?
   - Does the table exist? (Check Supabase Dashboard → Table Editor)
3. If you see a code error, look at the file and line number in the stack trace
4. Ask Claude: paste the full error message and which endpoint you called

---

## 🆘 Still Stuck?

Describe your problem to Claude with as much detail as possible:

```
I get this error when I call POST /api/users:

[paste the full error message here]

I expected it to create a new user. Here's the request body I'm sending:

{ "email": "test@test.com", "name": "Test" }

I'm using Node.js [version] on [Windows/Mac/Linux].
I'm running the terminal in [VS Code / PowerShell / Terminal].
```

The more context you give, the faster Claude can help.
