import React from "react";

function StepResults({
	title,
	category,
	results,
	downloadDecision,
	setStep,
	setResults,
	setTitle,
	setCategory,
}) {
	return (
		<div className="step-content results-view">
			<div className="results-header">
				<h2>📊 Results: {title}</h2>
				<button
					className="small-btn"
					onClick={() =>
						downloadDecision({
							title,
							category,
							...results,
						})
					}
				>
					📥 Download Report
				</button>
			</div>

			<p className="insight">{results.insight}</p>
			<div className="winner-banner">
				✅ Recommended Choice: <strong>{results.winner}</strong>
			</div>

			{Object.entries(results.ranked_results).map(([option, data], i) => (
				<div key={option} className="result-card">
					<h3>
						#{i + 1} {option}{" "}
						<span>{data.final.toFixed(2)} / 10</span>
					</h3>
					<div className="breakdown">
						{data.breakdown.map((b) => (
							<div key={b.criterion} className="breakdown-row">
								<span>{b.criterion}</span>
								<span>Score: {b.score}</span>
								<span>Weight: {b.weight}</span>
								<strong>Total: {b.weighted_score}</strong>
							</div>
						))}
					</div>
				</div>
			))}

			<div className="actions">
				<button
					onClick={() => {
						setStep(1);
						setResults(null);
					}}
				>
					Start Over
				</button>
			</div>
		</div>
	);
}

export default StepResults;
