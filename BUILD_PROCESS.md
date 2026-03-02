# Build Process: Evolution of Thought

This document captures the developmental journey of the **Decision Companion System (DCS)**, tracing the logic from initial concept to the functional CLI tool and its eventual migration to a modern web application.

## Phase 1: Conceptualization & Logic (The CLI)

The project began by defining the "Decision Companion" as a human-centric framework. Unlike traditional Decision Support Systems (DSS), the DCS focuses on the **logic of the decision itself**, assuming the user is already informed but needs clarity.

### Core Assumptions
The system is built on a specific core assumption:
> **The user knows their options and weights clearly, and the system serves as a framework to help them make a rational decision among them.**

The original `decision_companion.py` was crafted as a **CLI, weighted scoring, guided onboarding system**.

## Phase 2: Web Application Migration (The "Cloud-First" Plan)

As the system matured, a critical limitation emerged: a local CLI is isolated. To make the tool accessible to the general public, the architecture evolved into a **Full-Stack Web Application**.

### The Supabase Strategy
The initial plan for persistence was to use **Supabase (PostgreSQL + Auth)**. 
- **Why?** It provided a managed database, user authentication (for private data isolation), and Row Level Security (RLS) out of the box. 
- **The Shift**: This was a move from local `~/.decision_history.json` files to a cloud-native database to allow users to access their history from any device.

### The Unified Engine (Vercel + FastAPI)
- **Intelligence Layer**: The core Python logic was refactored into a serverless function (`api/index.py`), creating a clean REST boundary.
- **Interface Layer**: CLI prompts were replaced with a modern, 5-step interactive wizard using React/Vite.

## Phase 3: The Persistence Pivot (From Cloud to Local-First)

During the implementation of Phase 2, a significant blocker was encountered: **Regional Network Restrictions.** ISP-level blocks and routing issues (confirmed via `curl` and `ping` diagnostics) made the Supabase cloud endpoint (`.supabase.co`) unreachable in the development environment (`ERR_CONNECTION_TIMED_OUT`).

### The Transition to `localStorage`
Instead of forcing a cloud dependency that might fail for users in restricted network environments, the decision was made to pivot from **Supabase to `localStorage`**.

| Technology | Role | Reason for Moving From/To |
| :--- | :--- | :--- |
| **JSON File** | Local CLI Storage | Moved to **Supabase** to support web accessibility and multi-device sync. |
| **Supabase** | Cloud Persistence | Moved to **localStorage** due to network reliability issues and regional ISP blocks. |
| **localStorage** | Browser Storage | **Final Choice**: Ensures 100% uptime, offline support, and absolute privacy without external service reliance. |

### Rationale for the Final Pivot:
1. **Network Independence**: The app works even if cloud providers are blocked or the user is offline.
2. **Privacy**: Decision data stays exclusively on the user's machine, fulfilling the "human-centric" and "private" nature of the companion.
3. **Reduced Friction**: No account creation or login required for basic persistence, lowering the barrier to entry while still providing an "audit trail."

### Conclusion: Accountability & UI
By persisting results in the browser and building a dedicated **"📜 History"** view, we maintained the core goal of a "traceable audit trail" while delivering a more robust and private user experience than the original cloud-based plan.
