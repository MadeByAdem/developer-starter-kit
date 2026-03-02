# 🐙 GitHub & Git — For Beginners

This guide explains Git and GitHub in simple terms. No prior experience needed.

---

## 💡 What is Git? What is GitHub?

**Git** is a tool that saves snapshots of your code. Think of it like "undo history" for your entire project — you can always go back to any previous snapshot.

**GitHub** is a website where you store your Git snapshots online. It's like Google Drive, but for code. It also lets you share your project with others and collaborate.

**In short:**
- Git = the tool on your computer that tracks changes
- GitHub = the website where you store and share your project

---

## 🔧 One-Time Setup

### 1. Create a GitHub account

Go to https://github.com and sign up (it's free).

### 2. Configure Git on your computer

Open a terminal and type:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Use the **same email** as your GitHub account.

### 3. Set up authentication

GitHub needs to know it's really you when you push code.

**Via VS Code (recommended — easiest way)**

If you use VS Code with the **GitHub Pull Requests** extension (see [SETUP-GUIDE.md](SETUP-GUIDE.md)):

1. Open VS Code
2. Open the terminal (`Ctrl+`` `) and type `git push`
3. VS Code will show a popup: **"Allow an extension to sign in with GitHub?"**
4. Click **Allow** — your browser opens
5. Log in to GitHub and click **Authorize**
6. Done! VS Code remembers your login. You never have to do this again.

If the popup doesn't appear, you can also:
1. Press `Ctrl+Shift+P` → search **"GitHub: Sign In"**
2. Follow the browser login flow

**Via terminal (if you don't use VS Code)**

The first time you `git push`, Git will ask for your username and password. For the password, you need a **Personal Access Token** (GitHub doesn't accept regular passwords):

1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Give it a name (e.g. "My laptop"), check the **repo** scope
4. Click **Generate token** and **copy it**
5. Use this token as your "password" when Git asks

Your computer will remember it after the first time.

---

## 📚 Key Concepts

### Repository (repo)

A repository is your project on GitHub. It contains all your code and the full history of changes.

### Commit

A commit is a **snapshot** of your code at a specific moment. Like saving a game — you can always load a previous save.

Each commit has:
- A **message** describing what changed (e.g. "add login page")
- A **timestamp** (when it was saved)
- The **changes** (what files were added, modified, or deleted)

### Branch

A branch is a **parallel version** of your project. Think of it like a copy where you can experiment without breaking the original.

```
main ────●────●────●────●────●  (your stable code)
              \              /
feature ───────●────●────●──── (your experiment — merged back when done)
```

- `main` — the primary branch. This is your "official" code.
- Feature branches — temporary branches for new features or experiments.

### Push & Pull

- **Push** — upload your commits from your computer to GitHub
- **Pull** — download the latest changes from GitHub to your computer

---

## 🔄 Daily Workflow

### The basics: save → push

This is what you'll do every day:

```bash
# 1. Check what changed
git status

# 2. Add your changes (stage them for a commit)
git add .

# 3. Save a snapshot with a description
git commit -m "add search feature to product page"

# 4. Upload to GitHub
git push
```

Or just ask Claude:

```
Commit and push my changes.
```

### Step by step explained

#### `git status` — What changed?

Shows which files were modified, added, or deleted since the last commit.

```bash
git status
```

You'll see something like:
```
Changes not staged for commit:
  modified:   server/services/userService.js
  modified:   frontend/src/views/HomeView.vue

Untracked files:
  server/services/productService.js
```

- **Modified** = existing file was changed
- **Untracked** = new file that Git doesn't know about yet

#### `git add` — Select what to save

Tell Git which changes to include in the next snapshot.

```bash
# Add everything
git add .

# Or add specific files
git add server/services/userService.js
git add frontend/src/views/HomeView.vue
```

#### `git commit` — Save the snapshot

Create a commit with a message describing what you did.

```bash
git commit -m "add user search by email"
```

**Good commit messages:**
- `add user registration endpoint`
- `fix cart total calculation`
- `update product list styling`
- `remove unused helper functions`

**Bad commit messages:**
- `update` (update what?)
- `fix` (fix what?)
- `stuff` (what stuff?)
- `asdfgh` (not helpful)

**Pattern:** start with a verb: `add`, `fix`, `update`, `remove`, `refactor`

#### `git push` — Upload to GitHub

Send your commits to GitHub so they're saved online.

```bash
git push
```

If it's your first push on a new branch:
```bash
git push -u origin main
```

#### `git pull` — Download latest changes

Get the latest code from GitHub (useful if you work on multiple computers or with a team).

```bash
git pull
```

---

## 🆕 Setting Up a New Project on GitHub

The easiest way is to do everything from VS Code — no need to create a repo on GitHub first.

### Via VS Code (recommended)

1. Open your project folder in VS Code
2. Click the **Source Control** icon in the sidebar (the branch icon, or press `Ctrl+Shift+G`)
3. Click **Initialize Repository** — this creates a local Git repo
4. Type a commit message (e.g. "initial project setup") and click **Commit** (the checkmark)
5. If VS Code asks to stage all changes, click **Yes**
6. Click **Publish Branch** — VS Code asks where to publish
7. Choose **Publish to GitHub** — your browser opens to authorize (if needed)
8. Choose **Public** or **Private** repo
9. Done! Your project is now on GitHub

From now on, every time you commit in VS Code, you can click **Sync Changes** to push to GitHub.

### Via the terminal (alternative)

```bash
# 1. Initialize Git and make your first commit
git init
git add .
git commit -m "initial project setup"

# 2. Create a repo on GitHub: go to https://github.com/new
#    Give it a name, do NOT check "Add a README"

# 3. Connect and push
git branch -M main
git remote add origin https://github.com/your-name/your-repo.git
git push -u origin main
```

### Via Claude

You can also just ask:

```
Initialize git and publish this project to GitHub.
```

Claude will walk you through the steps.

---

## 🌿 Working with Branches

Branches let you work on a feature without affecting the main code.

### Create a new branch

```bash
# Create and switch to a new branch
git checkout -b feature/user-login
```

### Work on your branch

Make changes, commit as usual:

```bash
git add .
git commit -m "add login form"
git push -u origin feature/user-login
```

### Merge back to main

When your feature is ready:

```bash
# Switch back to main
git checkout main

# Get the latest version of main
git pull

# Merge your feature branch into main
git merge feature/user-login

# Push the updated main
git push
```

### Delete the branch (optional, cleanup)

```bash
# Delete locally
git branch -d feature/user-login

# Delete on GitHub
git push origin --delete feature/user-login
```

---

## 🤝 Sharing Your Project

### Make it public

Your repo visibility (public/private) can be changed:
1. Go to your repo on GitHub
2. **Settings** → scroll down to **Danger Zone**
3. Click **Change visibility**

### Invite collaborators

1. Go to your repo on GitHub
2. **Settings** → **Collaborators** → **Add people**
3. Enter their GitHub username or email
4. They'll get an invitation

### Share the link

Your project URL is: `https://github.com/your-name/your-repo`

Anyone can see it (if public) or only invited people (if private).

---

## ✨ Useful GitHub Features

### Issues

Issues are like a to-do list for your project.

1. Go to your repo → **Issues** → **New issue**
2. Describe a bug, feature request, or task
3. Assign it to yourself or someone else
4. Close it when it's done

### Pull Requests (PRs)

A pull request says "I made changes on a branch, please review and merge them into main."

1. Push your branch to GitHub
2. Go to your repo → you'll see a **Compare & pull request** button
3. Click it, describe your changes
4. Click **Create pull request**

This is especially useful when working with others — they can review your code before it goes into main.

### GitHub Pages (free hosting for simple sites)

If your project is a static website (HTML/CSS/JS only), GitHub can host it for free:

1. Go to your repo → **Settings** → **Pages**
2. Select the branch and folder
3. Your site will be live at `https://your-name.github.io/your-repo`

> For full apps with a backend, use the [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) instead.

---

## ↩️ Undoing Mistakes

### "I committed something I shouldn't have"

> ⚠️ **Important:** This only works for commits you **haven't pushed yet**. If you already pushed, ask Claude for help instead of running this command — otherwise your local branch and GitHub will be out of sync.

```bash
# Undo the last commit but keep the changes
git reset --soft HEAD~1
```

Your changes are back in the staging area — you can modify them and commit again.

### "I want to discard my uncommitted changes to one file"

```bash
git checkout -- path/to/file.js
```

This throws away your changes to that file and restores the last committed version.

### "I pushed a secret (.env file) to GitHub"

1. Add it to `.gitignore` immediately
2. Remove it from Git tracking:

```bash
echo ".env" >> .gitignore
git rm --cached .env
git commit -m "remove .env from tracking"
git push
```

3. **Change your secrets** — even after removing the file, the old version is still in Git history. Rotate your API keys and passwords.

---

## 🔧 Common Problems

| Problem | Solution |
|---------|----------|
| "Permission denied (publickey)" | Set up authentication — see the One-Time Setup section |
| "Failed to push — rejected" | Run `git pull` first, then `git push` again |
| "Merge conflict" | Ask Claude: "I have a merge conflict in [file]. Help me resolve it." |
| "Detached HEAD" | Run `git checkout main` to go back to normal |
| "Fatal: not a git repository" | You're not in a project folder, or run `git init` first |
| Can't see `.git` folder | It's hidden — turn on "Show hidden files" in your file explorer |
| "Everything up-to-date" but changes aren't on GitHub | Did you `git add` and `git commit` first? |

---

## 📋 Git Commands Cheat Sheet

| What you want to do | Command |
|---------------------|---------|
| Check what changed | `git status` |
| See detailed changes | `git diff` |
| Add all changes | `git add .` |
| Add one file | `git add path/to/file` |
| Save a snapshot | `git commit -m "description"` |
| Upload to GitHub | `git push` |
| Download from GitHub | `git pull` |
| See commit history | `git log --oneline` |
| Create a new branch | `git checkout -b branch-name` |
| Switch branches | `git checkout branch-name` |
| Merge a branch into current | `git merge branch-name` |
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |
| See all branches | `git branch` |
| See remote URL | `git remote -v` |

---

## 💡 Tips

- **Commit often** — small, frequent commits are better than one big commit at the end of the day
- **Write clear messages** — future you will thank present you
- **Pull before you push** — especially when working with others
- **Never commit `.env` files** — they contain secrets. Always check `.gitignore`
- **Use branches for experiments** — if it doesn't work out, just delete the branch
- **Ask Claude for help** — "I accidentally did [X] in Git. How do I fix it?" works great
- **Don't panic** — Git almost never truly deletes anything. There's usually a way to recover
