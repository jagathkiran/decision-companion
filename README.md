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

- **Frontend (React/Vite)**: Provides a polished, 5-step interactive wizard that guides the user smoothly through the decision-making process.
- **Backend (Python/FastAPI)**: The core mathematical scoring engine remains written in Python, refactored into a fast, type-safe REST API (`/api/evaluate`) using Pydantic.
- **Unified Hosting (Vercel)**: Vercel hosts the React UI and automatically manages the FastAPI backend via serverless functions, keeping the codebase unified in a single repository.
- **Persistence (localStorage)**: To ensure 100% reliability and privacy, the system utilizes the browser's `localStorage`. This creates a permanent "Decision History" that works offline and is immune to network/ISP-level blocks.

### Structural Decisions

- **Guided Onboarding Flow**: The application walks the user logically through the setup: _Define the Decision -> Establish Criteria -> Weight Criteria -> Score Options -> View Results_.
- **Weighted Scoring Engine**: A mathematical approach where each option is scored (1-10) against each criterion, then multiplied by the criterion's weight (1-5).
- **Decision Report Export**: Users can download a formatted `.txt` report of their results at the end of the pipeline or from their history, ensuring their rational process can be shared or archived.
- **Audit Trail (History)**: Users can revisit past decisions at any time via the "📜 History" view, allowing for long-term accountability and review of previous rationales.

### Trade-offs

- **Privacy vs. Portability**: By using `localStorage`, the data is stored exclusively on the user's device. This maximizes privacy and network reliability but means decisions aren't automatically synced between different browsers or computers.
- **Serverless Cold Starts**: Using Vercel for the Python backend introduces a minor (1-2s) "cold start" delay, which is an acceptable trade-off for a zero-maintenance, unified deployment strategy.

## Edge Cases Considered

- **Equal Weighting**: If a user gives all criteria the same weight, the system defaults to an unweighted sum.
- **Missing Inputs**: The UI validates inputs and prevents advancing if critical fields are empty.
- **Network Blocks**: The switch from Supabase to `localStorage` was specifically made to ensure the app remains functional even in regions where specific cloud providers are restricted.

## How to Run the Project

### Prerequisites

- Node.js (v18+)
- Python 3.x
- Vercel CLI (optional, for unified local testing)

### Local Development

There are two ways to run the project locally:

**Method 1: Unified (Recommended)**
```bash
npm i -g vercel
vercel dev
```

**Method 2: Manual Split (Offline)**
```bash
# Terminal 1: React Frontend (localhost:5173)
npm install && npm run dev

# Terminal 2: FastAPI Backend (localhost:8000)
python3 -m venv .venv
source .venv/bin/activate
pip install -r api/requirements.txt
uvicorn api.index:app --reload
```

### Deployment

The project is configured for "Zero-Config" deployment on Vercel. Simply push the repository to GitHub and link it to Vercel.

### Compiling Diagrams (Optional)

Navigate to the `diagrams/` directory and run `make` (requires `plantuml`).

## Future Improvements

If given more time, I would consider adding:

1. **Insight Generation**: Basic AI integration to provide qualitative feedback on the user's scoring.
2. **Export to PDF/JSON**: Allow users to download their decision reports in more versatile formats (PDF/JSON).
3. **Advanced Matrix Models**: Options for AHP (Analytic Hierarchy Process) for complex pairwise comparisons.
