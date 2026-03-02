import React from "react";

function StepScoring({
	options,
	criteria,
	scores,
	handleScoreChange,
	evaluateDecision,
	loading,
	setStep,
}) {
	return (
		<div className="step-content">
			<h2>Step 4: Score Everything</h2>
			<p className="subtitle">
				Score each option against your criteria (1-10)
			</p>

			{options
				.filter((o) => o.trim() !== "")
				.map((opt) => (
					<div key={opt} className="scoring-group">
						<h3>Scoring: {opt}</h3>
						{criteria
							.filter((c) => c.name.trim() !== "")
							.map((crit) => (
								<div
									key={crit.name}
									className="form-row score-row"
								>
									<label>
										{crit.name}{" "}
										<span>(Weight: {crit.weight})</span>
									</label>
									<input
										type="number"
										min="1"
										max="10"
										placeholder="1-10"
										value={scores[opt]?.[crit.name] || ""}
										onChange={(e) =>
											handleScoreChange(
												opt,
												crit.name,
												e.target.value,
											)
										}
									/>
								</div>
							))}
					</div>
				))}

			<div className="actions">
				<button className="secondary-btn" onClick={() => setStep(3)}>
					Back
				</button>
				<button onClick={evaluateDecision} disabled={loading}>
					{loading ? "Calculating..." : "Calculate Results!"}
				</button>
			</div>
		</div>
	);
}

export default StepScoring;
