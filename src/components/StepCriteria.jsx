import React from "react";

function StepCriteria({
	criteria,
	handleCriterionChange,
	addCriterion,
	removeCriterion,
	setStep,
}) {
	return (
		<div className="step-content">
			<h2>Step 3: Define & Weight Criteria</h2>
			<p className="subtitle">What factors matter to you? (Weight 1-5)</p>
			{criteria.map((crit, i) => (
				<div key={i} className="form-row criteria-row">
					<input
						type="text"
						placeholder={`Criterion ${i + 1} (e.g., Price)`}
						value={crit.name}
						onChange={(e) =>
							handleCriterionChange(i, "name", e.target.value)
						}
						style={{ flex: 1 }}
					/>
					<input
						type="number"
						min="1"
						max="5"
						title="Weight (1-5)"
						value={crit.weight}
						onChange={(e) =>
							handleCriterionChange(
								i,
								"weight",
								parseInt(e.target.value) || 1,
							)
						}
						style={{ width: "80px" }}
					/>
					{criteria.length > 2 && (
						<button
							className="icon-btn"
							onClick={() => removeCriterion(i)}
						>
							❌
						</button>
					)}
				</div>
			))}
			<button className="secondary-btn" onClick={addCriterion}>
				+ Add Another Criterion
			</button>
			<div className="actions">
				<button className="secondary-btn" onClick={() => setStep(2)}>
					Back
				</button>
				<button
					onClick={() => setStep(4)}
					disabled={
						criteria.filter((c) => c.name.trim() !== "").length < 2
					}
				>
					Next: Score Options
				</button>
			</div>
		</div>
	);
}

export default StepCriteria;
