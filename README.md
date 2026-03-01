# Decision Companion System (DCS)

## Table of Contents

- [Overview](#overview)
- [Problem Statement & Understanding](#problem-statement--understanding)
- [Assumptions Made](#assumptions-made)
- [System Architecture & Design Decisions](#system-architecture--design-decisions)
  - [The Shift to a Web Application](#the-shift-to-a-web-application)
  - [Structural Decisions](#structural-decisions)
  - [Trade-offs](#trade-offs)
- [Edge Cases Considered](#edge-cases-considered)
- [How to Run the Project](#how-to-run-the-project)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Deployment](#deployment)
- [Future Improvements](#future-improvements)

## Overview

The Decision Companion System is a lightweight, human-centric web application designed to help users evaluate multiple options using a dynamic, weighted scoring framework. Unlike complex, automated systems that attempt to make the decision for you, this companion assumes you know your options and the criteria that matter, and it provides a structured process to reach a rational conclusion.

## Problem Statement & Understanding

When faced with complex decisions (e.g., choosing a tech stack, selecting a job candidate, or buying a laptop), humans are prone to bias, emotional reasoning, or being overwhelmed by multiple variables.

The goal of this system is to assist a user in making better decisions by mathematically evaluating options against user-defined, weighted criteria. It acts as a rational mirror: it forces the user to articulate what is important and by how much, and then it calculates the objective winner based on those stated priorities.

## Assumptions Made

1. **Rational Actor**: The user already has a clear set of options they want to evaluate and understands the factors (criteria) that influence their decision.
2. **Subjective Objectivity**: While the weights and scores are subjective inputs from the user, applying them systematically creates an objective and explainable outcome.
3. **No Hardcoded Constraints**: Decisions are highly contextual. Therefore, the system assumes nothing about the domain, categories, criteria, or options beforehand. Everything is dynamic.

## System Architecture & Design Decisions

The system was initially built as a CLI but has been migrated to a modern **Full-Stack Web Application** to increase accessibility and provide persistent, isolated decision storage.

### The Shift to a Web Application

- **Frontend (React/Vite)**: Provides a polished, 5-step interactive wizard that guides the user smoothly through the decision-making process without the rigidity of terminal prompts.
- **Backend (Python/FastAPI)**: The core mathematical scoring engine remains written in Python, refactored into a fast, type-safe REST API (`/api/evaluate`) using Pydantic.
- **Unified Hosting (Vercel)**: The "Two-Platform" approach. Vercel hosts the React UI and automatically manages the FastAPI backend via serverless functions, keeping the codebase unified in a single repository.
- **Future Persistence (Supabase)**: Designed to integrate with Supabase (PostgreSQL + Auth) for storing decision histories securely via Row Level Security (RLS).

### Structural Decisions

- **Guided Onboarding Flow**: The application walks the user logically through the setup: _Define the Decision -> Establish Criteria -> Weight Criteria -> Score Options -> View Results_.
- **Weighted Scoring Engine**: A mathematical approach where each option is scored (1-10) against each criterion, then multiplied by the criterion's weight (1-5).
- **Explainability**: The final output isn't just a winner; it provides a complete breakdown of the weighted scores, showing exactly _why_ a particular option won.

### Trade-offs

- **Serverless Cold Starts vs. Always-on**: By choosing Vercel for the Python backend, we accept a minor (1-2s) "cold start" delay on the first request in exchange for a free, zero-maintenance, unified deployment strategy over platforms like Render.
- **Manual Input vs. Data Integration**: The system relies entirely on manual user input rather than pulling external data (like pricing or reviews). This keeps the system universally applicable to any problem but places the burden of research on the user.

## Edge Cases Considered

- **Equal Weighting**: If a user gives all criteria the same weight, the system essentially defaults to an unweighted sum.
- **Missing Inputs**: The UI validates inputs to ensure valid numeric ranges (1-5 for weights, 1-10 for scores) and prevents advancing if critical fields are empty.
- **Zero Options or Criteria**: The system requires at least two criteria and two options to proceed to the scoring phase, ensuring a meaningful comparison.

## How to Run the Project

### Prerequisites

- Node.js (v18+)
- Python 3.x
- Vercel CLI (optional, for unified local testing)

### Local Development

There are two ways to run the project locally:

**Method 1: Unified (Recommended)**
Install the Vercel CLI to run both frontend and backend on a single port (`localhost:3000`). This perfectly mimics production, meaning **no CORS configuration is required**.

```bash
npm i -g vercel
vercel dev
```

**Method 2: Manual Split (Offline)**
If you prefer not to use the Vercel CLI, you can run the React frontend and Python backend in two separate terminals.
\*Note: Thanks to the Vite proxy configured in `vite.config.js`, your frontend will automatically route `/api` requests to your local Python server. **No CORS configuration is required.\***

```bash
# Terminal 1: React Frontend (Runs on localhost:5173)
npm install
npm run dev

# Terminal 2: FastAPI Backend (Runs on localhost:8000)
python3 -m venv .venv
source .venv/bin/activate
pip install -r api/requirements.txt
uvicorn api.index:app --reload
```

### Deployment

The project is configured for "Zero-Config" deployment on Vercel.
Simply push the repository to GitHub, link it to Vercel, and Vercel will automatically build the Vite frontend and host the Python backend as Serverless Functions via the `vercel.json` routing rules. **(No CORS configuration is needed for production).**

### Compiling Diagrams (Optional)

If you wish to view or modify the architecture diagrams mapped during the design phase:

- Ensure `plantuml` is installed on your system.
- Navigate to the `diagrams/` directory and run `make`.

## Future Improvements

If given more time, I would consider adding:

1. **Insight Generation**: Basic AI integration (e.g., an LLM prompt) to review the final breakdown and provide qualitative feedback on the user's scoring (e.g., "You scored Option A highly on Cost but low on Quality. Is Cost genuinely your driving factor?").
2. **Supabase Integration**: Finalize the connection to Supabase Auth and PostgreSQL to allow users to save, revisit, and share their decision history.
3. **Advanced Matrix Models**: Options for AHP (Analytic Hierarchy Process) for pairwise comparisons when weighting criteria becomes too difficult for the user to estimate on a simple 1-5 scale.
