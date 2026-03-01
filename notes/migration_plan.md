# Web Migration Plan: CLI to Cloud-Native Webapp

## Objective
Transition the Decision Companion System (DCS) from a local CLI tool to a publicly accessible web application while maintaining data persistence and user isolation.

## Target Architecture

### 1. Persistence & Auth (Supabase)
- **Database**: PostgreSQL hosted on Supabase to replace `~/.decision_history.json`.
- **Authentication**: Supabase Auth (Email/Social) to provide unique `user_id` for data isolation.
- **Security**: Row Level Security (RLS) policies to ensure users only access their own decisions.

### 2. Backend Engine (FastAPI)
- **Logic**: Refactor the existing Python scoring logic into a RESTful API.
- **Endpoints**:
    - `POST /api/evaluate`: Takes options/criteria and returns ranked results.
    - `GET /api/history`: Retrieves previous decisions for the authenticated user.
- **Environment**: Python 3.x with `fastapi` and `pydantic` for data validation.

### 3. Frontend Interface (React)
- **UX**: A multi-step guided onboarding flow (wizard style).
- **Styling**: Vanilla CSS for a clean, modern aesthetic.
- **Integration**: Uses Supabase Client SDK for Auth/DB and `fetch` for the FastAPI engine.

## Deployment Strategy (The "Two-Platform" Approach)

| Component | Platform | Role |
| :--- | :--- | :--- |
| **Frontend + Backend** | **Vercel** | Hosts the React UI and runs FastAPI via Serverless Functions. |
| **Auth + Database** | **Supabase** | Managed PostgreSQL and Identity management. |

### Why this setup?
- **Unified Hosting**: Vercel allows both Frontend and Python Backend to live in a single repository.
- **Minimal Cold Starts**: Vercel Serverless Functions wake up in ~1-3 seconds, significantly faster than Render's free tier (~30s).
- **Zero Cost**: Both platforms offer generous, permanent free tiers suitable for this prototype.

## Migration Steps

1.  **Database Schema**: Define tables for `decisions`, `criteria`, and `options` in Supabase.
2.  **API Refactor**: Extract core logic from `decision_companion.py` into a FastAPI-compatible structure.
3.  **Frontend Scaffold**: Create a React application with a step-by-step form.
4.  **Auth Integration**: Implement login/signup flow using Supabase Auth.
5.  **Deployment**: Configure `vercel.json` to route `/api/*` requests to the FastAPI backend.
