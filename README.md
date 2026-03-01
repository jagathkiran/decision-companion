# Decision Companion System (DCS)

## Table of Contents

- [Overview](#overview)
- [Problem Statement & Understanding](#problem-statement--understanding)
- [Assumptions Made](#assumptions-made)
- [System Architecture & Design Decisions](#system-architecture--design-decisions)
    - [Why a CLI?](#why-a-cli)
    - [Structural Decisions](#structural-decisions)
    - [Trade-offs](#trade-offs)
- [Edge Cases Considered](#edge-cases-considered)
- [How to Run the Project](#how-to-run-the-project)
    - [Prerequisites](#prerequisites)
    - [Execution](#execution)
    - [Compiling Diagrams (Optional)](#compiling-diagrams-optional)
- [Future Improvements](#future-improvements)

## Overview

The Decision Companion System is a lightweight, human-centric CLI tool designed to help users evaluate multiple options using a dynamic, weighted scoring framework. Unlike complex, automated systems that attempt to make the decision for you, this companion assumes you know your options and the criteria that matter, and it provides a structured process to reach a rational conclusion.

## Problem Statement & Understanding

When faced with complex decisions (e.g., choosing a tech stack, selecting a job candidate, or buying a laptop), humans are prone to bias, emotional reasoning, or being overwhelmed by multiple variables.

The goal of this system is to assist a user in making better decisions by mathematically evaluating options against user-defined, weighted criteria. It acts as a rational mirror: it forces the user to articulate what is important and by how much, and then it calculates the objective winner based on those stated priorities.

## Assumptions Made

1. **Rational Actor**: The user already has a clear set of options they want to evaluate and understands the factors (criteria) that influence their decision.
2. **Subjective Objectivity**: While the weights and scores are subjective inputs from the user, applying them systematically creates an objective and explainable outcome.
3. **No Hardcoded Constraints**: Decisions are highly contextual. Therefore, the system assumes nothing about the domain, categories, criteria, or options beforehand. Everything is dynamic.

## System Architecture & Design Decisions

The system is built as an interactive **Command Line Interface (CLI)** application in Python.

### Why a CLI?

- **Focus**: A CLI offers a distraction-free environment, which is ideal for breaking down complex thoughts.
- **Portability**: It requires minimal setup and dependencies, running seamlessly on most developer machines.
- **Immediate Feedback**: The step-by-step interactive prompts keep the user engaged in the decision-making process.

### Structural Decisions

- **Guided Onboarding Flow**: The application walks the user logically through the setup: _Define the Decision -> Establish Criteria -> Weight Criteria -> Score Options_.
- **Weighted Scoring Engine**: A mathematical approach where each option is scored (1-10) against each criterion, then multiplied by the criterion's weight (1-5).
- **Explainability**: The final output isn't just a winner; it provides a complete breakdown of the weighted scores, showing exactly _why_ a particular option won.
- **Persistence Layer**: Decisions are saved to a local JSON file (`~/.decision_history.json`). This creates a personal audit trail for accountability and future reflection.

### Trade-offs

- **Simplicity vs. Advanced Features**: We opted for a simple, linear CLI flow over a web interface or GUI to maximize development speed and focus entirely on the core logic.
- **Manual Input vs. Data Integration**: The system relies entirely on manual user input rather than pulling external data (like pricing or reviews). This keeps the system universally applicable to any problem but places the burden of research on the user.

## Edge Cases Considered

- **Equal Weighting**: If a user gives all criteria the same weight, the system essentially defaults to an unweighted sum.
- **Missing Inputs**: The CLI validates inputs to ensure valid numeric ranges (1-5 for weights, 1-10 for scores) and prevents empty strings for critical names.
- **Zero Options or Criteria**: The system requires at least two criteria and two options to make a meaningful comparison.

## How to Run the Project

### Prerequisites

- Python 3.x

### Execution

1. Clone the repository and navigate to the project directory.
2. Run the main executable:

    ```bash
    ./decision_companion.py
    ```

    _Alternatively:_ `python3 decision_companion.py`
3. Follow the on-screen prompts to define, weight, and score your decision.

### Compiling Diagrams (Optional)

If you wish to view or modify the architecture diagrams:

- Ensure `plantuml` is installed.
- Navigate to the `diagrams/` directory and run `make`.

## Future Improvements

If given more time, I would consider adding:

1. **Insight Generation**: Basic AI integration (e.g., an LLM prompt) to review the final breakdown and provide qualitative feedback on the user's scoring (e.g., "You scored Option A highly on Cost but low on Quality. Is Cost genuinely your driving factor?").
2. **Import/Export**: The ability to export decision templates or share results via CSV or markdown.
3. **Advanced Matrix Models**: Options for AHP (Analytic Hierarchy Process) for pairwise comparisons when weighting criteria becomes too difficult for the user to estimate on a simple 1-5 scale.
