# Build Process: Evolution of Thought

This document captures the developmental journey of the **Decision Companion System (DCS)**, tracing the logic from initial concept to the functional CLI tool.

## Conceptualization & Logic

The project began by defining the "Decision Companion" as a human-centric framework. Unlike traditional Decision Support Systems (DSS), the DCS focuses on the **logic of the decision itself**, assuming the user is already informed but needs clarity.

### Core Assumptions

The system is built on a specific core assumption:

> **The user knows their options and weights clearly, and the system serves as a framework to help them make a rational decision among them.**

The DCS doesn't generate options; it provides the **structure** for the user to evaluate them objectively.

## Implementation (The CLI Companion)

The implementation of `decision_companion.py` was crafted as a **CLI, weighted scoring, guided onboarding system**.

### System Design

1. **Guided Onboarding**: The tool walks the user through defining the decision title, category, criteria, and options in a logical sequence.
2. **Weighted Scoring**: It employs a two-step evaluation process:
    - **Weighting**: Setting the relative importance of criteria (1–5).
    - **Scoring**: Judging each option against each criterion (1–10).
3. **Zero-Hardcoding**: Every element of the decision (categories, criteria, weights) is defined at runtime by the user, ensuring the tool is truly a general-purpose companion.

## Documentation & Accountability

To provide transparency, the system includes:

- **Weighted Breakdown**: Visualizing exactly how each final score was calculated.
- **Decision History**: Persisting results in `~/.decision_history.json` to create a traceable audit trail of the user's rational choices.
- **Architectural Traceability**: Using PlantUML diagrams to map the logic from the design phase to the final execution.

---

## Phase 2: Web Application Migration

As the system matured, a critical limitation emerged: a local CLI is isolated and makes it difficult to maintain persistent storage across different devices or for the general public. To address this, the architecture evolved into a **Cloud-Native Web Application**.

### The "Two-Platform" Evolution

Instead of relying on local JSON files, the architecture was split:

1. **Persistence & Identity (Supabase)**: Designed to use managed PostgreSQL with Row Level Security (RLS) to ensure users can safely store and isolate their decision history in the cloud.
2. **Engine & Interface (Vercel)**:
    - **Backend**: The core Python logic from `decision_companion.py` was refactored into a **FastAPI** serverless function (`api/index.py`), creating a clean REST boundary.
    - **Frontend**: The CLI prompts were replaced with a modern, 5-step guided **React/Vite** wizard, utilizing pure CSS to maintain a distraction-free environment while dramatically improving the UX.

### Refactoring Decisions & Trade-offs

- **Serverless vs. Always-On**: Migrating the Python backend to Vercel Serverless Functions introduced a minor "cold start" delay (~1-2 seconds) for inactive users. However, this trade-off was enthusiastically accepted because it allowed the Frontend and Backend to be unified in a single repository with zero hosting costs, rather than managing a separate, slower "always-on" free tier like Render.
- **Separation of Concerns**: By decoupling the interface (React) from the intelligence layer (FastAPI), the system became much easier to extend (e.g., adding AI insights in the future) without tangling the UI logic.
