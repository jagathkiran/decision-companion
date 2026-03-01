# Web Setup Guide: Supabase & Vercel

## Phase 1: Supabase Setup (Storage & Identity)

1.  **Create Project**: Sign in to [supabase.com](https://supabase.com/) and create a project named `decision-companion`.
2.  **Get Credentials**: Navigate to **Project Settings > API**. Copy the `Project URL` and `anon public` key.
3.  **Database Schema**: Execute the following SQL in the **SQL Editor**:

```sql
-- Create a table for decisions
create table decisions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  summary text,
  raw_data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table decisions enable row level security;

-- Create a policy for user isolation
create policy "Users can only access their own decisions"
on decisions for all
using (auth.uid() = user_id);
```

## Phase 2: Vercel Setup (Hosting & Engine)

### Project Structure
```text
/
├── api/                <-- FastAPI Backend (Python)
│   ├── index.py
│   └── requirements.txt
├── src/                <-- React Frontend
├── package.json
└── vercel.json         <-- Routing Configuration
```

### Configuration (`vercel.json`)
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.py" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Deployment
1.  Push code to GitHub and import to [vercel.com](https://vercel.com/).
2.  **Add Environment Variables**:
    - Go to **Settings > Environment Variables** in the Vercel project dashboard.
    - You need to add variables for *both* the Frontend (React) and Backend (FastAPI):
      - **Frontend (Vite)** requires the `VITE_` prefix to make them accessible in the browser:
        - `VITE_SUPABASE_URL` (Your Project URL)
        - `VITE_SUPABASE_ANON_KEY` (Your anon public key)
      - **Backend (FastAPI)** does not use the prefix:
        - `SUPABASE_URL` (Your Project URL)
        - `SUPABASE_ANON_KEY` (Your anon public key)
3.  **Configure Build Settings**:
    - Go to **Settings > General > Build & Development Settings**.
    - For **Vite**: Set Build Command to `npm run build` and Output Directory to `dist`.
    - For **CRA**: Set Build Command to `npm run build` and Output Directory to `build`.
    - Vercel handles the Python `api/` folder automatically.

## Phase 3: Local Development

Install the Vercel CLI to run both frontend and backend locally:
```bash
npm i -g vercel
vercel dev
```
