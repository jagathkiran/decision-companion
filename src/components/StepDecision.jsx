import React from "react";

function StepDecision({ title, setTitle, category, setCategory, setStep }) {
	return (
		<div className="step-content">
			<h2>Step 1: The Decision</h2>
			<div className="form-group">
				<label>Describe your decision in one line:</label>
				<input
					type="text"
					placeholder="e.g., Which laptop should I buy?"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label>Decision category:</label>
				<input
					type="text"
					placeholder="e.g., Tech, Career, Personal..."
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>
			</div>
			<button onClick={() => setStep(2)} disabled={!title.trim()}>
				Next: Add Options
			</button>
		</div>
	);
}

export default StepDecision;
