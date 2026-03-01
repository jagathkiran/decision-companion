from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()


class Criterion(BaseModel):
    name: str
    weight: int


class EvaluateRequest(BaseModel):
    options: List[str]
    criteria: List[Criterion]
    scores: Dict[str, Dict[str, int]]  # {"Option A": {"Cost": 8, "Speed": 5}}


@app.get("/api/health")
def read_root():
    return {"status": "Decision Companion API is running"}


@app.post("/api/evaluate")
def evaluate_decision(req: EvaluateRequest):
    results = {}
    criteria_names = [c.name for c in req.criteria]
    weights = {c.name: c.weight for c in req.criteria}

    total_weight = sum(weights.values())

    for option in req.options:
        weighted_sum = 0
        breakdown = []

        for c_name in criteria_names:
            score = req.scores.get(option, {}).get(c_name, 0)
            weight = weights[c_name]
            weighted_sum += score * weight

            breakdown.append(
                {
                    "criterion": c_name,
                    "score": score,
                    "weight": weight,
                    "weighted_score": score * weight,
                }
            )

        final_score = weighted_sum / total_weight if total_weight > 0 else 0

        results[option] = {"final": final_score, "breakdown": breakdown}

    # Sort results by final score descending
    ranked = dict(
        sorted(results.items(), key=lambda item: item[1]["final"], reverse=True)
    )

    winner = list(ranked.keys())[0] if ranked else None
    winner_score = ranked[winner]["final"] if winner else 0

    if winner_score >= 8:
        insight = "Strong choice — high confidence across weighted criteria."
    elif winner_score >= 6:
        insight = "Solid option, though worth revisiting lower-scored criteria."
    else:
        insight = "No standout option. Consider redefining your criteria or gathering more info."

    return {"ranked_results": ranked, "winner": winner, "insight": insight}
