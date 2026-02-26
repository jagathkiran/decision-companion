# Refined Architecture & Design (Post-Research)

This architecture reflects the "Decision Companion" philosophy: a system that provides not just math, but **clarity** and **confidence**.

> **Note:** The diagrams below are authored in **PlantUML** (UML 2.5 and Gane-Sarson DFD). Sources are located in `diagrams/`.

## 1. Architecture Diagram (UML Class Diagram)
This refined model introduces an **InsightGenerator** and an **AnalysisModel** to handle the qualitative aspects mentioned in the research.

```plantuml
@startuml
skinparam classAttributeIconSize 0
skinparam monochrome true
skinparam shadowing false

package "Interface Layer" {
    class UserInterface <<Boundary>> {
        +captureDecisionContext(): DecisionObject
        +renderVisualRankings(rankings: List): void
        +displayInsight(explanation: String): void
    }
}

package "Intelligence Layer" {
    class DecisionEngine <<Service>> {
        +applyWeightedLogic(data: DecisionObject): Result
        +performSensitivityAnalysis(): AnalysisReport
    }

    class InsightGenerator <<Logic>> {
        +generateRationale(results: Result): String
        +identifyBias(scores: List): String
    }
}

package "Data Layer" {
    class PersistenceLayer <<Repository>> {
        +archiveDecision(record: DecisionObject): void
        +fetchAuditTrail(): List<DecisionObject>
    }

    class DecisionObject <<Entity>> {
        +metadata: Map
        +evaluationGrid: Matrix
        +weightProfile: Map
    }
}

UserInterface ..> DecisionEngine : uses
DecisionEngine --> DecisionObject : manages
DecisionEngine --> InsightGenerator : delegates
DecisionEngine --> PersistenceLayer : persists

@enduml
```

## 2. Data Flow Diagram (Gane-Sarson)
Focuses on the transformation from **Context** to **Confidence** using standard DFD notation.

```plantuml
@startuml
!define GaneSarson
skinparam monochrome true
skinparam shadowing false

skinparam rectangle {
    BackgroundColor<<Entity>> white
    BackgroundColor<<Process>> white
    BackgroundColor<<Store>> white
}

' External Entities (Squares)
rectangle "User" as user <<Entity>>

' Processes (Rounded Rectangles)
rectangle "1.0\nDefine Evaluation\nFramework" as P1 <<Process>>
rectangle "2.0\nAssign Criteria\n& Weights" as P2 <<Process>>
rectangle "3.0\nScore & Rank\nOptions" as P3 <<Process>>
rectangle "4.0\nGenerate Insights\n& Rationale" as P4 <<Process>>

' Data Stores (Open-ended Rectangles)
rectangle "D1 Decision History" as DS1 <<Store>>

' Data Flows (Labeled Arrows)
user --> P1 : Context &\nMetadata
P1 --> P2 : Framework\nSchema
P2 --> P3 : Weight\nProfiles
P1 --> P3 : Option\nMatrix
P3 --> P4 : Ranked\nResults
P4 --> user : Final Recommendation\n+ Why?
P4 --> DS1 : Audit Record

@enduml
```

## 3. Control Flow Diagram (UML Activity Diagram)
Includes a "Review & Refine" loop to ensure the "Consistency" and "Clarity" goals are met before saving.

```plantuml
@startuml
skinparam monochrome true
skinparam shadowing false

title Decision Companion Control Flow

start

:Define Decision Scope;
:Build Evaluation Framework;

repeat
  :Assign Importance/Weights;
  :Score Options;
  :Generate Preliminary Results;
  :Generate Rationale & Insights;
  
  backward:Refine Weights/Scores;
repeat while (Review Results?) is (Refine)
-> Confirm;

:Save to Audit Trail;

stop

@enduml
```

## 4. Component Diagram (UML)
Separates the **Execution** from the **Intelligence**.

```plantuml
@startuml
skinparam monochrome true
skinparam shadowing false

package "Interface Layer" {
  [Interactive CLI] as CLI
}

package "Intelligence Layer" {
  [Weighted Scoring Engine] as WSE
  [Insight & Rationale Engine] as IRE
}

package "Data Layer" {
  database "Audit Log (JSON)" as JSON
  [Dynamic Schema Handler] as SCHEMA
}

() "IUserInterface" as I_UI
() "IDecisionLogic" as I_DL
() "IInsight" as I_INS
() "IPersistence" as I_PER

CLI --( I_UI
I_UI -- WSE

WSE --( I_INS
I_INS -- IRE

WSE --( I_DL
I_DL -- SCHEMA

SCHEMA --( I_PER
I_PER -- JSON

@enduml
```

## Key Design Principles (Post-Research)
- **Traceability (Accountability):** Every decision must have a rationale ("Why did this win?").
- **Sensitivity Analysis:** The architecture supports tweaking weights to see how "stable" a decision is.
- **Abstraction:** The engine doesn't care if it's scoring a "Car" or a "Career Path"—it only sees the weighted matrix.
