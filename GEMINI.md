# Decision Companion System (DCS) Context

## Project Overview
The **Decision Companion System** is a human-centric, AI-inspired decision-making framework and CLI tool. Unlike traditional Decision Support Systems (DSS) that focus on data visualization, the DCS focuses on the **logic and framework** of the decision itself, helping users reduce bias and increase clarity through a weighted scoring process.

### Core Technologies
- **Python 3**: Main application logic (`decision_companion.py`).
- **PlantUML**: Used for architectural, DFD, and flow diagrams (UML 2.5 compliant).
- **Make**: Automates diagram compilation.
- **JSON**: Used for persistent decision history (`~/.decision_history.json`).

### Architecture
The project follows a layered architecture (Refined in `notes/architecture.md`):
1.  **Interface Layer**: Interactive CLI for user input and results display.
2.  **Intelligence Layer**: Weighted scoring engine and (planned) insight generation.
3.  **Data Layer**: Persistence via JSON and schema-less data handling for dynamic criteria.

## Building and Running

### Prerequisites
- Python 3.x
- `plantuml` - Required for diagram compilation.
- `graphviz` - Required for certain PlantUML diagram types.

### Running the Application
To start the decision companion:
```bash
./decision_companion.py
```
Or:
```bash
python3 decision_companion.py
```

### Compiling Diagrams
Diagrams are stored in `diagrams/`. To compile them into PNGs in the `diagrams/` folder:
```bash
cd diagrams
make
```

## Project Structure
- `decision_companion.py`: The main executable CLI tool.
- `RESEARCH_LOG.md`: A structured log of project research, AI prompts, and design decisions.
- `notes/`: Detailed documentation on definitions, architecture, and design options.
- `diagrams/`: Contains compiled diagrams and source files.
  - `*.puml`: PlantUML source files.
  - `Makefile`: Automation for diagram generation.
- `BUILD_PROCESS.md`: (Currently empty) Intended for build-specific documentation.

## Logging & Documentation Mandate
- **Mandatory Research Logging**: Every significant *project-related* prompt, design discussion, and follow-up must be logged in `RESEARCH_LOG.md`.
- **Exclude Meta-Discussion**: Do not log prompts related to tool usage, agent behavior, or meta-instructions (e.g., "update memory", "use cat instead of read_file"). Focus strictly on the *content* and *decisions* of the project.
- **Formatting**: Use blockquotes for prompts/follow-ups (`> **P:**` or `> **F:**`) and the established legend codes (G, L, P, F, A).
- **Organization**: Log entries should be grouped by the relevant project phase (e.g., Phase 3: Documentation & Tooling).
- **Notes Consolidation**: Substantive research outcomes or detailed design options should be consolidated into individual Markdown files within the `notes/` directory.

## Development Conventions
- **Dynamic Logic**: The system must never use hardcoded categories, criteria, or weights. Everything is user-defined at runtime.
- **Traceability**: Decisions should be saved to an audit trail (history) to ensure accountability.
- **Documentation**: All significant prompts and research findings must be logged in `RESEARCH_LOG.md` following the established Legend (G, L, P, F, A).
- **Architecture First**: Significant changes to the decision logic should be reflected in the PlantUML diagrams and documentation within the `notes/` directory.

## Current Session Status (2026-02-25)
- **Accomplishments**:
    - Discovered core assignment in `TODO.md` and appended to context.
    - Refined architecture in `notes/architecture.md`.
    - Created PlantUML diagrams and automated build with `Makefile`.
    - Established strict logging conventions and chronological ordering in `RESEARCH_LOG.md`.
    - Drafted `README.md` comprehensively covering all assignment deliverables.
    - Created and refined `BUILD_PROCESS.md` detailing the evolution of thought.
- **Next Steps**:
    1.  **Refine Implementation**: Update `decision_companion.py` to meet "Explainability" requirements.

---

## Assignment Details (TODO.md)

# TODO

This assignment is designed to evaluate:

- How clearly you document your thinking
- How you approach ambiguous problems
- Your system design and architectural decisions
- How you leverage tools (including AI)
- Your transparency in the build process

## PROBLEM STATEMENT

Design and build a “Decision Companion System” that helps a user make better decisions.
The system should assist a user in evaluating options for a real-world decision of their choice.
Your system must work without relying entirely on an AI model. If AI is used, clearly justify its role and limitations.

Examples (you are NOT limited to these):

- Choosing a laptop under a budget
- Selecting the best candidate for a job role
- Deciding where to travel within constraints
- Picking an investment strategy
- Choosing a tech stack for a startup

## CORE EXPECTATIONS

Your system must:

- Accept multiple options
- Accept criteria (which may have different weights or importance)
- Process and evaluate options against criteria
- Provide a ranked recommendation
- Explain why a particular recommendation was made

Beyond this, the design is up to you.
You may choose:

- CLI / Web App / API / Desktop tool
- Any programming language
- Any framework
- Simple or advanced logic

## CONSTRAINTS

- The system should not be a static hard coded comparison.
- The user should be able to change inputs and get different outcomes.
- Your logic should be explainable (not a black box).

## DELIVERABLES

Please submit a Git repository containing:

1. Source Code
    - Clean, readable, and structured
    - Meaningful commit history

2. README.md
   Include:
    - Your understanding of the problem
    - Assumptions made
    - Why you structured the solution the way you did
    - Design decisions and trade-offs
    - Edge cases considered
    - How to run the project
    - What you would improve with more time

3. Design Diagram
   Provide at least one:
    - Architecture diagram
    - Data flow diagram
    - Component diagram
    - Or decision logic diagram

4. BUILD_PROCESS.md
   Explain:
    - How you started
    - How your thinking evolved
    - Alternative approaches considered
    - Refactoring decisions
    - Mistakes and corrections
    - What changed during development and why

5. RESEARCH_LOG.md
   Include:
    - All AI prompts used
    - All search queries (including Google searches)
    - References that influenced your approach
    - What you accepted, rejected, or modified from AI outputs
    - We are not judging you for using AI.
    - We are evaluating how effectively and responsibly you use it.

## Evaluation Criteria

You will be evaluated on:

- Clarity of thinking
- Problem structuring ability
- Quality of documentation
- Transparency in build process
- Design maturity
- Practical reasoning
- Code quality

## Timeline

Submission deadline: On or before 02 March, 2026.