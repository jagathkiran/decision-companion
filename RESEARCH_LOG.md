# Research Log

## Legend

- **G:** Google Search
- **L:** Link/Resource
- **P:** AI Prompt
- **F:** AI Follow-up Prompt
- **A:** AI Response

---

## Research & Discovery

G: Decision Companion System
L: [YouTube - Decision Support System](https://www.youtube.com/watch?v=114DipNd1n8)
L: [Decision Support System - GeeksForGeeks](https://www.geeksforgeeks.org/business-studies/decision-support-system/)
L: [II Year - DKR25 - Decision Support System.pdf](https://www.msuniv.ac.in/images/distance%20education/learning%20materials/ug%20pg/pg/msc_general/II%20Year%20-%20DKR25%20-%20Decision%20Support%20System.pdf)

> **P: Are decision companion system the same as decision support system?**
>
> **A:** No, decision companion systems are not the same as decision support systems (DSS), though they share similarities in aiding decision-making.

> **F: what is a decision companion system**
>
> **A:** A Decision Companion System is an AI-powered tool designed to assist humans in making better decisions by providing analysis, recommendations, and insights based on data, context, and predefined criteria — without replacing the human's final judgment.

> **F: What if there was no ai in place?**
>
> **A:** If you remove AI from a DCS, what fills that role is human expertise encoded into structured logic — rules, criteria, and frameworks built in advance by domain experts.

> **F: What does it achieves**
>
> **A:** A Decision Companion System achieves one core thing: Helping humans make better, more informed decisions. More specifically it achieves:
>
> - clarity — breaks down complex choices into understandable options
> - consistency — applies the same logic every time, removing human bias or emotional interference
> - speed — reduces the time it takes to evaluate options
> - accountability — creates a traceable record of why a decision was made
> - confidence — gives the decision-maker backing and justification for their choice

> **F: Why does it works?**
>
> **A:** It works because of one fundamental principle: Decision-making fails when information is incomplete, disorganized, or emotionally influenced.

---

## Design & Architecture

> **F: What are the options that i have in designing the system? eg: how the system makes decisions, which type of system to build (cli, web app, api. etc.), What the user is supposed to enter, etc.**
>
> **A:** Outlined options for interfaces (CLI, Web, API, Bot), decision logic (Weighted Scoring, Cost-Benefit, Game Theory), and input models.

> **F: Your task is to design a decision companion system that:**
>
> 1. Help me make a wide variety of decisions
> 2. Has a weighted process for decision making
> 3. There should not be any hard coded values for decision making
>
> **Deliverables:**
>
> 1. Architecture Diagram (UML)
> 2. Data flow diagram
> 3. Control flow diagram
> 4. Component diagrams
>
> _Make the diagram in PlantUML for UML 2.5 and Gane-Sarson DFD compliance._
>
> **A:** Designed a system architecture including a Weighted Scoring Engine and Persistence Layer, delivered via standard-compliant PlantUML diagrams.

---

## Documentation & Tooling

> **P: add all the prompts along with a descriptive output into the RESEARCH_LOG.md**
>
> **A:** Established a mandatory logging protocol to track all significant project-related prompts, search queries, and AI responses to ensure transparency and traceability in the decision-making process.

> **F: can you go through all the prompts and give me output in the notes folder for me(such as options.md)**
>
> **A:** Generated structured documentation in the `/notes` folder: `definition.md`, `options.md`, `architecture.md`, and `comparison.md`.

> **P: Read the hidden TODO.md file.**
>
> **A:** Discovered the core assignment requirements in `TODO.md`. It outlines the problem statement, core expectations (dynamic, explainable), constraints, and required deliverables:
>
> 1. Source Code (Clean, meaningful commits)
> 2. README.md (Detailed design decisions, assumptions)
> 3. Design Diagram (Architecture/Flow)
> 4. BUILD_PROCESS.md (Evolution of thought)
> 5. RESEARCH_LOG.md (AI prompts and references)

> **F: Add the system specifications and core assumptions to BUILD_PROCESS.md, specifically defining it as a CLI-based guided onboarding system that helps users make rational decisions.**
>
> **A:** Updated `BUILD_PROCESS.md` to reflect that the system helps users make rational decisions by assuming they know their options and weights clearly and providing a structure for evaluation.

---

## Core Requirement & Logic

> **P: build a desion companion system in python with the following specifications: A CLI, weighted scoring, guided onboarding system that assumes the user knows their options and weights clearly and helps them make a rational decision among them.**
>
> **A: Understood. The system will be designed as a dynamic CLI tool that facilitates weighted decision-making through a guided onboarding process, prioritizing user-defined criteria and rational quantification.**

> **F: update readme.md and add the todo.md as whole into the gemini.md**
>
> **A:** Appended the contents of `TODO.md` to `GEMINI.md` to maintain context, and comprehensively updated `README.md` to address all assignment deliverables, including problem understanding, assumptions, design decisions, edge cases, and future improvements.

> **F: for the readme add an index for headings**
>
> **A:** Generated and inserted a Table of Contents (index) into the `README.md` to improve navigation across the project documentation.

---

## Web Application Migration

> **P: For the general public to be able to access this system, we are going to be changing the cli to a webapp. but there is a problem; if you want to keep the storage of the previous decisions, how do i do that, when most of the free hosting services doesnt run for indefinitely and they have all the storage to the ram which doesnt retain across sessions? You would need a login system too. first give me the plan, then i will give you the confirmation whether to go with the webapp idea.**
>
> **A:** Proposed a cloud-native architecture utilizing Database-as-a-Service (Supabase) for persistent storage and identity management, decoupled from a serverless backend (FastAPI on Vercel) and React frontend.

> **F: can we use both supabase for both Database and Auth?**
>
> **A:** Confirmed Supabase is ideal for both Auth and Database, highlighting Row Level Security (RLS) as the key mechanism to ensure users can only access their own decision history.

> **F: I am confused with the deployment strat, do i need 3 different platform to deploy all of these?**
>
> **A:** Simplified the deployment strategy to a "Two-Platform" approach: Supabase for Storage & Identity, and Vercel for Hosting & Engine (both Frontend and Backend).

> **F: what about the fastapi backend then?**
>
> **A:** Explained that Vercel natively supports running Python/FastAPI via Serverless Functions, allowing both the React frontend and Python backend to exist in a single repository and deploy together.

> **F: doest railway and render also have the serverless nature? doesnt that too need time to start on free tier?**
>
> **A:** Compared the "cold start" behaviors of Render (~30s+), Railway (credit-based, complete shutoff), and Vercel (~1-3s), concluding Vercel's fast serverless wake-up is the best trade-off for a free-tier decision tool.

> **F: add the migration_plan to notes**
>
> **A:** Documented the full architectural transition strategy, including objectives, target architecture (Supabase + Vercel + FastAPI + React), and migration steps in `notes/migration_plan.md`.

> **F: i need help setting up supabase and vercel as well.**
>
> **A:** Provided a step-by-step setup guide for creating the Supabase project with necessary SQL schema (RLS policies) and configuring the Vercel project structure (`vercel.json`), saved to `notes/setup_guide.md`.

> **F: are you saying about the project url under project api section in the project overview and publishable api key from the same**
>
> **A:** Clarified that the `Project URL` and `anon public` key are the correct credentials to use, emphasizing the avoidance of the `service_role` key for security.

> **F: where do i add the environment variables in vercel? and how do you define the build and output settings?**
>
> **A:** Provided detailed instructions for adding environment variables and configuring framework-specific (Vite/CRA) build settings in the Vercel dashboard, and updated `notes/setup_guide.md` with these details.

> **F: why does your .env has VITE prefix, whereas the setup docs doesnt?**
>
> **A:** Explained the distinction between frontend (`VITE_` prefixed, exposed to browser) and backend environment variables, and updated `notes/setup_guide.md` to reflect the need for both.

> **F: what should i select in "setup and develop" in vercel dev**
>
> **A:** Provided step-by-step answers for the `vercel dev` CLI setup prompts to properly initialize the local development environment.

> **F: what if i dont want to add it to my project**
>
> **A:** Outlined the alternative of running the Vite frontend and Uvicorn backend manually on separate ports, noting the necessity of configuring CORS for them to communicate locally.

> **F: will vercel dev push to the repo?**
>
> **A:** Assured that `vercel dev` only creates local cloud references and development servers without altering or pushing to the Git repository.

> **F: I already have my project set up in vercel. i should add all the env (4) into vercel as well right? also, we didnt configure fastapi in vercel right? How do i test manually, without creating a new project**
>
> **A:** Confirmed all 4 environment variables are needed in Vercel. Clarified Vercel's "Zero-Config" deployment handles the `api/` folder automatically. Provided instructions on running two separate servers for manual testing.

> **F: do we need to add the cors if you commit and push to the git repo that vercel is accessing the project from?**
>
> **A:** Clarified that CORS is not needed when deployed via Vercel or using `vercel dev`, as both frontend and backend are served from the same unified origin.

> **P: add python related temporary files and files to ignore to @.gitignore**
>
> **A:** Updated the `.gitignore` file to include standard Python artifacts (`__pycache__`, `.venv`, etc.) and the `.vercel` directory to prevent tracking temporary files.

> **P: migrate to webapp**
>
> **A:** Ported the `IntelligenceLayer` mathematical scoring logic from `decision_companion.py` into a new FastAPI backend (`api/index.py`). Rewrote the Vite React frontend (`src/App.jsx` and `src/App.css`) to create an interactive 5-step guided onboarding flow, styled with a modern vanilla CSS design. Successfully verified the React build to finalize the web application structure.

> **F: is it finalized? can i push and except an output? should i worry about the lsp error for import fastapi could not be resolved and import pydantic could not be resolved?**
>
> **A:** Confirmed the project is finalized for pushing. Explained that local LSP errors occur because dependencies are missing locally, but Vercel manages its own environment successfully via `api/requirements.txt`. Provided optional instructions for setting up a local virtual environment.

> **P: update @README.md and @BUILD_PROCESS.md to include the migration to webapp which aligns with the TODO**
>
> **A:** Updated `README.md` to reflect the new React/FastAPI/Vercel architecture and updated `BUILD_PROCESS.md` with a "Phase 2" section detailing the rationale and trade-offs of the web migration.

> **F: what does the note in readme mean? do the user have to manually configure the cors to run the project and or will the two terminal still work? also we can now remove the @decision_companion.py right? why did you remove the compilation of diagrams from the readme?**
>
> **A:** Clarified local dev methods, restored the missing diagram compilation section, and permanently removed the obsolete `decision_companion.py` script.

> **F: how do you configure cors?**
>
> **A:** Provided the exact code block to add FastAPI `CORSMiddleware` in `api/index.py` for manual dual-terminal local testing.

> **F: Help me understand vercel cli. when i run vercel dev, will it create a project in my account where i have logged in to vercel cli or will it just run locally like you do with npm run dev?**
>
> **A:** Clarified that `vercel dev` does both: it creates a blank "shell" project in the cloud to manage variables, and then runs local servers on a unified port that mimics production routing.

> **F: can you make vercel cli not create a project in your account by any chance?**
>
> **A:** Explained that Vercel CLI forces project creation. Proposed an offline alternative: configuring Vite's built-in `server.proxy` to route `/api` requests to the local Python backend on port 8000, avoiding CORS without needing Vercel CLI.

> **F: will this work on vercel production?**
>
> **A:** Clarified that the Vite proxy is ignored in production, but the `vercel.json` file seamlessly takes over the routing when deployed to the cloud.

> **F: so you can keep this and push to repo and the production and dev in will work fine?**
>
> **A:** Confirmed that keeping the Vite proxy locally and relying on `vercel.json` in production is the best practice. Added the proxy to `vite.config.js` and updated the `README.md` to show that the dual-terminal method no longer requires CORS.
