# Data Cleanup & Retention Strategies

Reference file for choosing the right cleanup pattern when designing database tables.

## Patterns

| Pattern | When to use | How |
|---------|-------------|-----|
| **Soft delete** | User-facing data that might need restoring | Add `deleted_at TIMESTAMPTZ` column, filter with `WHERE deleted_at IS NULL` |
| **Hard delete** | Temporary/transient data (sessions, tokens, OTPs) | Delete rows directly after expiration |
| **TTL / Expiration** | Time-limited records (codes, invites, cache) | Add `expires_at TIMESTAMPTZ` column, cleanup via cron job |
| **Archiving** | Historical data needed for reporting but not daily use | Move old rows to `_archive` table or separate schema |

## Example SQL

### Soft delete column

```sql
-- Add to any table that needs soft delete
ALTER TABLE public.my_table ADD COLUMN deleted_at TIMESTAMPTZ;

-- Always filter on deleted_at in your queries
SELECT * FROM public.my_table WHERE deleted_at IS NULL;
```

### TTL / Expiration column

```sql
-- Add to tables with time-limited records
ALTER TABLE public.my_table ADD COLUMN expires_at TIMESTAMPTZ NOT NULL;

-- Delete expired records (run periodically)
DELETE FROM public.my_table WHERE expires_at < NOW();
```

## How to Run Cleanup Jobs

Cleanup jobs need to run periodically. Choose one of these approaches:

| Method | When to use | How |
|--------|-------------|-----|
| **Supabase pg_cron** | Supabase projects with Pro plan | Enable the `pg_cron` extension in Supabase Dashboard, then schedule SQL |
| **Supabase Edge Function + cron** | Any Supabase project | Create an Edge Function and trigger it via an external cron (e.g. cron-job.org) |
| **Node.js cron** | Express backend projects | Use `node-cron` package in your server to schedule cleanup |

### pg_cron example (Supabase Pro)

```sql
-- Enable the extension (once)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule cleanup: delete soft-deleted records older than 90 days, every day at 3 AM
SELECT cron.schedule(
  'cleanup-soft-deletes',
  '0 3 * * *',
  $$DELETE FROM public.my_table WHERE deleted_at < NOW() - INTERVAL '90 days'$$
);
```

### Node.js cron example

```javascript
const cron = require('node-cron');
const { supabase } = require('./config/supabase');

// Run every day at 3 AM
cron.schedule('0 3 * * *', async () => {
  const { error } = await supabase
    .from('my_table')
    .delete()
    .lt('deleted_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString());

  if (error) console.error('Cleanup failed:', error.message);
});
```

## Rules

- Tables with `deleted_at` — include periodic hard-delete of records soft-deleted longer than the retention period (e.g. 90 days)
- Tables with `expires_at` — include a cleanup cron job or scheduled function to remove expired rows
- Session/token tables — always have an expiration and cleanup mechanism
- Log/audit tables — define a retention period (e.g. 30, 60, 90 days) and clean up old entries
- **Always document the cleanup strategy** in `COMMENT ON TABLE` when creating the table
- **Never store data indefinitely without a reason** — every table should have a clear answer to "when does this data get cleaned up?"
