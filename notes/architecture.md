# Decision Companion System: Layered Architecture

The Decision Companion System (DCS) follows a modern, decoupled layered architecture to ensure separation of concerns, scalability, and robust performance in varied network environments.

## 1. Interface Layer (React/Vite)
The top layer provides an interactive "Wizard" style UI that guides users through the complex decision-making process.

- **Component Wizard**: Breaks down input into five logical steps (Context, Options, Criteria, Weighting, Scoring).
- **History Manager**: Interfaces directly with the browser's `localStorage` to persist past decisions.
- **State Management**: Orchestrates complex UI states (e.g., dynamic criteria lists) before submitting them for evaluation.

## 2. Intelligence Layer (FastAPI)
The core "brain" of the system. It is written in Python to leverage its strong mathematical capabilities and is exposed via a high-performance REST API.

- **Weighted Scoring Engine**: Applies user-defined weights to option scores using a weighted-sum normalization algorithm.
- **Insight Generator**: Translates raw numeric rankings into human-readable insights based on score thresholds.
- **Pydantic Validation**: Ensures all data received from the interface layer is type-safe and within valid ranges.

## 3. Data & Persistence Layer (localStorage)
Designed for maximum reliability and privacy.

- **Storage Method**: Browser-native `localStorage` (Web Storage API).
- **Data Format**: JSON-serialized records containing full decision context, scores, and calculated results.
- **Audit Trail**: Provides a persistent history of decisions that is immune to server outages or regional network/ISP-level blocks.

---

## Technical Flow
1.  **Input**: User enters decision criteria and scores in the **React Frontend**.
2.  **Processing**: The data is sent via `fetch` to the **FastAPI Backend** (`/api/evaluate`).
3.  **Calculation**: The backend calculates the final weighted rankings and returns a result payload.
4.  **Persistence**: The frontend visualizes the results and immediately archives the entire decision to **localStorage**.
5.  **Review**: User can toggle the "History" view at any time to retrieve and inspect past decisions from the local store.
