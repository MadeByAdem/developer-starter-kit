# ✅ Testing Checklist

> A simple checklist to run through before you push your code. No test framework needed — just common sense and a browser.

---

## 🚀 Before Every Push

Run through this list before you `git push`. It takes 2 minutes and saves hours of debugging.

### 1. Does it start?

- [ ] Backend starts without errors (`npm run dev` in `server/`)
- [ ] Frontend starts without errors (`npm run dev` in `frontend/`)
- [ ] No red text in the terminal

### 2. Does the happy path work?

The "happy path" is what happens when everything goes right. Test the feature you just built:

- [ ] Fill in valid data → does it work as expected?
- [ ] Does the response/page show the right information?
- [ ] If it saves to the database: check Supabase Dashboard → Table Editor — is the data there?

### 3. What happens with bad input?

Try the things a user might do wrong:

- [ ] Submit an empty form — does it show a clear error message?
- [ ] Enter text in a number field — does validation catch it?
- [ ] Use a very long string (500+ characters) — does it break the layout or the API?
- [ ] Send a request without logging in (if auth is required) — does it return 401?

### 4. Does the UI handle loading and errors?

- [ ] Is there a loading indicator while data is being fetched?
- [ ] If the API is down or slow, does the UI show an error instead of a blank screen?
- [ ] After an action (create, delete), does the UI update without a page refresh?

### 5. Check the browser console

Open your browser, press `F12`, and check the **Console** tab:

- [ ] No red errors in the console
- [ ] No failed network requests in the **Network** tab (look for red lines)

---

## 🏁 Before a Big Feature is "Done"

For larger features, also check:

### API endpoints

- [ ] `GET` returns the right data
- [ ] `POST` creates a new record and returns it
- [ ] `PUT`/`PATCH` updates the record correctly
- [ ] `DELETE` removes the record
- [ ] Requesting a non-existent ID returns 404 (not 500)
- [ ] Sending invalid JSON returns 400 with a clear message

### Authentication (if applicable)

- [ ] Protected routes reject requests without a token
- [ ] Protected routes reject requests with an expired/invalid token
- [ ] Users can only access their own data (not someone else's)

### Database

- [ ] New tables have RLS enabled (check Supabase Dashboard → Authentication → Policies)
- [ ] Data is stored in the expected format
- [ ] `created_at` and `updated_at` timestamps are correct

---

## 🧪 When to Add Real Tests

You don't need a test framework on day one. But consider adding one when:

- Your project has **more than 5 API endpoints**
- You have **business logic** that calculates things (prices, discounts, permissions)
- You're working with **other people** who might break your code
- You find yourself **testing the same thing manually** over and over

When you're ready, just ask Claude:

```
Set up Vitest for my project and write tests for the user service.
```

---

## 🛠️ Quick Reference: Testing Tools

| What | Tool | How |
| --- | --- | --- |
| Test API endpoints | Thunder Client (VS Code) or Postman | Send requests, check responses |
| Check frontend | Browser + F12 DevTools | Console for errors, Network for requests |
| Check database | Supabase Dashboard → Table Editor | See if data was saved correctly |
| Check RLS policies | Supabase Dashboard → Auth → Policies | See which policies are active |
