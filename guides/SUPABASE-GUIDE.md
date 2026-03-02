# 🗄️ Supabase — A Beginner's Guide

This guide explains Supabase in plain English. No prior database knowledge needed.

---

## 💡 What is Supabase?

Supabase is a database that lives in the cloud (on the internet). Think of it like a Google Spreadsheet for your app — you store data in rows and columns, but it's much more powerful and designed for real applications. When your app needs to remember things (users, products, orders, messages), that data gets stored in Supabase.

Under the hood, Supabase uses **PostgreSQL** — one of the most popular and reliable databases in the world. But you don't need to worry about that. Supabase gives you a nice visual dashboard where you can see your data, edit it, manage users, and more — all without touching a server.

---

## 🔑 Creating an Account and Project

### Step 1: Create an account

1. Go to https://supabase.com
2. Click **Start your project** (or **Sign Up**)
3. Sign up with your **GitHub account** (easiest) or with email and password
4. Confirm your email if needed

### Step 2: Create a new project

1. After logging in, you'll see the Supabase Dashboard
2. Click **New Project**
3. Choose your **Organization** (one is created automatically for you)
4. Fill in the details:
   - **Name** — give your project a name (e.g. "my-bookshop")
   - **Database Password** — choose a strong password and **save it somewhere safe** (you'll need it later)
   - **Region** — pick the one closest to you or your users (e.g. "West EU (Ireland)" for Europe)
5. Click **Create new project**
6. Wait 1-2 minutes while Supabase sets everything up

Your project is now ready.

---

## 🔐 Finding Your API Keys

Your app needs a few pieces of information to connect to Supabase. Here's how to find them.

### Step 1: Go to your project settings

1. Open your project in the Supabase Dashboard
2. Click **Project Settings** (the gear icon in the sidebar, at the bottom)
3. Click **API** in the left menu

### Step 2: Copy your keys

You'll see three important values:

| Key | Where to find it | What is it? |
|-----|-------------------|-------------|
| **Project URL** | Under "Project URL" | The web address of your database. Your app uses this to know WHERE to connect. Looks like: `https://abcdefgh.supabase.co` |
| **anon (public) key** | Under "Project API keys" | A key that is safe to use in your frontend (browser). It can only do what your security rules (RLS policies) allow. Think of it as a "guest pass". |
| **service_role (secret) key** | Under "Project API keys" (click to reveal) | A key that can do EVERYTHING — bypass all security rules. **Never use this in frontend code.** Only use it on your server (backend). Treat it like a password. |

> ⚠️ **Important:** The `service_role` key is like a master key. Anyone who has it can read, change, and delete ALL your data. Keep it secret. Never put it in frontend code, never commit it to GitHub.

---

## 🖥️ Understanding the Dashboard

When you open your project, you'll see a sidebar with several sections. Here are the ones you'll use most:

### Table Editor

This is the visual way to see and edit your data — like a spreadsheet. You can:

- See all your tables
- Click a table to see all its rows
- Add new rows by clicking **Insert row**
- Edit a row by clicking on it
- Delete rows
- Filter and sort data

This is great for checking if your app is storing data correctly.

### SQL Editor

This is where you can type and run SQL commands directly. SQL is the language databases understand. You'll use this to:

- Run migration files (to create tables)
- Query data (e.g. "show me all users who signed up today")
- Fix data manually
- Test queries before putting them in your code

You can type a query and click **Run** (or press Ctrl+Enter) to execute it.

### Authentication

This section manages your app's users. Supabase has a built-in user system, so you don't need to build one from scratch. Here you can:

- See all registered users
- Create users manually
- Delete users
- See when someone last logged in
- Configure login methods (email/password, Google, GitHub, etc.)

### Storage

This is where you can store files — images, PDFs, videos, etc. Think of it like a cloud drive for your app. You can:

- Create **buckets** (folders) to organize files
- Upload files
- Set rules for who can access which files
- Get public URLs for files (so you can show images in your app)

---

## 📊 Your First Table

Let's create a simple `books` table with a title, author, and whether you've read the book.

### Option A: Via the Table Editor (visual, no code)

1. Go to **Table Editor** in the sidebar
2. Click **Create a new table**
3. Fill in:
   - **Name:** `books`
   - **Enable Row Level Security (RLS):** leave this ON (we'll explain later)
4. You'll see an `id` column already created. Leave it as is.
5. Add columns by clicking **Add column**:

   | Column name | Type | Default value | Other |
   |-------------|------|---------------|-------|
   | `title` | `text` | _(leave empty)_ | Uncheck "Is Nullable" |
   | `author` | `text` | _(leave empty)_ | Uncheck "Is Nullable" |
   | `is_read` | `bool` | `false` | |
   | `created_at` | `timestamptz` | `now()` | |

6. Click **Save**

Your table is ready. You can now add rows by clicking **Insert row**.

### Option B: Via SQL (code, more control)

1. Go to **SQL Editor** in the sidebar
2. Click **New query**
3. Paste this SQL and click **Run**:

```sql
-- Create a books table
CREATE TABLE IF NOT EXISTS public.books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Book info
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add a description to the table
COMMENT ON TABLE public.books IS 'A collection of books';

-- Enable security (RLS)
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Allow the server (service_role) full access
CREATE POLICY "service_role_all_access" ON public.books
    FOR ALL TO service_role
    USING (true) WITH CHECK (true);
```

4. You should see "Success. No rows returned" — that means it worked
5. Go to **Table Editor** and you'll see your new `books` table

---

## 🔒 Row Level Security (RLS) — Explained Simply

### What is RLS?

Think of RLS as a **lock on your table**. When RLS is turned on, nobody can see or change data unless you explicitly create a **policy** (a rule) that says they can.

Without RLS: anyone with your API key can read and change everything.
With RLS: you decide exactly who can see what.

It's like the difference between leaving your front door wide open versus having a lock and giving keys only to the right people.

### Why is it important?

Without RLS, anyone who knows your `anon` key (which is visible in your frontend code) could:

- Read ALL your data
- Change other people's data
- Delete everything

With RLS, even if someone has your `anon` key, they can only do what your policies allow.

**Supabase enables RLS by default on new tables.** This is a good thing. Don't turn it off.

### How to enable it

If you created a table without RLS (or turned it off), here's how to enable it:

**Via the Dashboard:**

1. Go to **Table Editor**
2. Click on your table
3. Click the **RLS** button (top right area)
4. Toggle it ON

**Via SQL:**

```sql
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
```

### Common Policies

A policy is a rule that says "who can do what". Here are the most common ones:

**1. Server (service_role) can do everything**

This is the most important policy. Your backend server uses the `service_role` key, so it needs full access:

```sql
CREATE POLICY "service_role_all_access" ON public.books
    FOR ALL TO service_role
    USING (true) WITH CHECK (true);
```

> ✅ **Good practice to add this policy.** If your backend uses the `service_role` key (which is the default in this kit), RLS is already bypassed automatically — so this policy isn't strictly required. But it's good practice to include it: it documents the intended access level and protects you if the client setup ever changes.

**2. Users can only see their own data**

If your table has a `user_id` column that links to the logged-in user:

```sql
-- Users can only read their own rows
CREATE POLICY "users_read_own_data" ON public.books
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Users can only insert rows for themselves
CREATE POLICY "users_insert_own_data" ON public.books
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can only update their own rows
CREATE POLICY "users_update_own_data" ON public.books
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid());

-- Users can only delete their own rows
CREATE POLICY "users_delete_own_data" ON public.books
    FOR DELETE TO authenticated
    USING (user_id = auth.uid());
```

**3. Everyone can read, but only logged-in users can write**

Useful for public content like blog posts or product listings:

```sql
-- Anyone can read
CREATE POLICY "public_read" ON public.books
    FOR SELECT TO anon, authenticated
    USING (true);

-- Only logged-in users can insert
CREATE POLICY "authenticated_insert" ON public.books
    FOR INSERT TO authenticated
    WITH CHECK (true);
```

### "I can't see my data!" — The Most Common Beginner Problem

You created a table, inserted data, but your app shows nothing. Sound familiar?

**The cause is almost always RLS.** Here's what's happening:

1. RLS is enabled on the table (good!)
2. But there is no policy that allows your app to read the data
3. So Supabase blocks everything — it returns an empty array `[]` instead of an error

**How to fix it:**

1. Go to **Authentication** → **Policies** in the Dashboard (or click **RLS** on your table)
2. Check if there is a policy that allows reading (`SELECT`)
3. If not, add one. The most common fix:

   **If your app uses the `service_role` key (backend/server):**
   ```sql
   CREATE POLICY "service_role_all_access" ON public.books
       FOR ALL TO service_role
       USING (true) WITH CHECK (true);
   ```

   **If your app uses the `anon` key (frontend) and data should be public:**
   ```sql
   CREATE POLICY "public_read" ON public.books
       FOR SELECT TO anon
       USING (true);
   ```

   **If your app uses Supabase Auth and users should only see their own data:**
   ```sql
   CREATE POLICY "users_read_own_data" ON public.books
       FOR SELECT TO authenticated
       USING (user_id = auth.uid());
   ```

4. Run the SQL in the **SQL Editor**
5. Try your app again — the data should show up now

> 🔍 **Quick debugging tip:** If you're not sure whether RLS is the problem, go to the **Table Editor** in the Dashboard. If you can see data there but your app shows nothing, it's definitely an RLS issue. The Dashboard bypasses RLS because it uses a special admin connection.

---

## 🔗 Connecting Supabase to Your Project

### Step 1: Add your keys to .env

Open the `.env` file in the root of your project (or in the `server/` folder if you have a separate backend). Add these lines:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Replace the values with the ones from your Dashboard (Project Settings → Data API).

> ⚠️ **Important:** Never commit your `.env` file to GitHub. Make sure `.env` is listed in your `.gitignore` file. If you see a `.env.example` file, that's the template — it shows which keys are needed but doesn't contain real values.

### Step 2: The Supabase client

Your project should have a file called `config/supabase.js` (or similar). This is the file that creates a connection to your database. It looks like this:

```javascript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = supabase;
```

This file:

1. Reads your URL and key from the `.env` file
2. Creates a "client" — a connection to your Supabase database
3. Exports it so other files can use it

> 📝 **Note:** On the backend, we use the `SUPABASE_SERVICE_ROLE_KEY` because the server needs full access. On the frontend, you would use the `SUPABASE_ANON_KEY` instead (so users can only do what your RLS policies allow).

### Step 3: Making your first query

Once the client is set up, you can use it anywhere in your project to read and write data.

**Fetch all books:**

```javascript
const supabase = require('../config/supabase');

async function getAllBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*');

  if (error) throw error;
  return data;
}
```

**Add a new book:**

```javascript
async function addBook(title, author) {
  const { data, error } = await supabase
    .from('books')
    .insert({ title, author })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

**Update a book (mark as read):**

```javascript
async function markAsRead(bookId) {
  const { data, error } = await supabase
    .from('books')
    .update({ is_read: true })
    .eq('id', bookId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

**Delete a book:**

```javascript
async function deleteBook(bookId) {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', bookId);

  if (error) throw error;
}
```

> 📝 **Pattern to remember:** Every Supabase query returns `{ data, error }`. Always check `error` before using `data`.

---

## 🔧 Common Problems and Solutions

| Problem | Cause | Solution |
|---------|-------|----------|
| "My data doesn't show up" (empty array `[]`) | RLS is blocking read access | Add a SELECT policy to your table. See the "I can't see my data!" section above. |
| "Permission denied for table" | No RLS policy for the role you're using | Add the correct policy. If you're using `service_role`, add the `service_role_all_access` policy. |
| "Invalid API key" | Your `.env` file doesn't match the Dashboard | Go to Project Settings → Data API in the Dashboard. Copy the keys again. Make sure there are no extra spaces. Restart your server after changing `.env`. |
| "relation does not exist" (table doesn't exist) | The migration hasn't been run yet | Go to SQL Editor in the Dashboard, paste your migration SQL, and run it. Check for typos in the table name. |
| "column not found" or "Could not find column" | The column name is wrong, or the migration is outdated | Check the exact column name in Table Editor. Check your migration file for typos. Column names are case-sensitive. |
| "new row violates row-level security policy" | RLS is blocking your insert/update | Add an INSERT or UPDATE policy for the role you're using. |
| "duplicate key value violates unique constraint" | You're trying to insert a row that already exists | Check if the row already exists before inserting, or use `.upsert()` instead of `.insert()`. |
| "JWT expired" | The user's login session has expired | Have the user log in again. You can also configure token refresh in your Supabase client. |
| "FetchError" or "TypeError: fetch failed" | Your server can't reach Supabase | Check your internet connection. Check that `SUPABASE_URL` in `.env` is correct. Make sure it starts with `https://`. |
| Changes to `.env` don't take effect | The server is still using old values | Stop your server (Ctrl+C) and start it again (`npm run dev`). Environment variables are only read when the server starts. |

---

## ⚙️ Local Development with the Supabase CLI (optional)

If you installed the Supabase CLI (see [SETUP-GUIDE.md](SETUP-GUIDE.md)), you can run a local copy of Supabase on your computer. This lets you test database changes safely before applying them to your real project.

### Setting up local Supabase

```bash
# In your project folder, initialize Supabase (one time only)
supabase init

# Start a local Supabase instance (requires Docker)
supabase start
```

After `supabase start`, you'll see local URLs and keys in the terminal. You can use these in your `.env` file for local development.

### Testing migrations locally

```bash
# Apply all migrations from database/migrations/ to your local database
supabase db push

# Reset local database to a clean state (re-applies all migrations)
supabase db reset
```

This is the safest way to test migrations: try them locally first, fix any issues, then run them on your production Supabase project via the Dashboard SQL Editor.

### When to use it

| Situation                             | Use the CLI?                 | Alternative                           |
| ------------------------------------- | ---------------------------- | ------------------------------------- |
| Testing a new migration               | Yes — safest option          | Run SQL in the Dashboard SQL Editor   |
| Quick data check                      | No                           | Use the Table Editor in the Dashboard |
| Developing offline                    | Yes — works without internet | Not possible without CLI              |
| Simple project, no complex migrations | No — keep it simple          | Dashboard is fine                     |

> 💡 **Tip:** You don't need the CLI to get started. Many developers use only the Dashboard and that's perfectly fine. The CLI becomes useful when your project grows and you want to test database changes before they go live.

---

## 💡 Tips

- **Check the Table Editor first** — when debugging, always look at the actual data in the Dashboard before checking code
- **Add the `service_role_all_access` policy as a safety net** — the `service_role` key already bypasses RLS, but this policy documents access intent and protects against misconfiguration
- **Restart your server after changing `.env`** — environment variables are loaded once at startup
- **Use `.select()` after `.insert()` and `.update()`** — without it, Supabase won't return the created/updated row
- **Use `.single()` when you expect one row** — it returns an object instead of an array
- **Keep migrations in `database/migrations/`** — this way you always have a record of your database structure
- **Test SQL in the Dashboard first** — before putting a query in your code, try it in the SQL Editor to make sure it works
- **Ask Claude** if you're stuck — say something like "I'm getting this error from Supabase: [paste error]" and Claude will help you fix it
- **Don't disable RLS** — it's tempting when things don't work, but the real fix is always to add the right policy
