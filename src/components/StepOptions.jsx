import React from "react";

function StepOptions({
	options,
	handleOptionChange,
	addOption,
	removeOption,
	setStep,
}) {
	return (
		<div className="step-content">
			<h2>Step 2: Enter Options</h2>
			<p className="subtitle">What are you deciding between?</p>
			{options.map((opt, i) => (
				<div key={i} className="form-row">
					<input
						type="text"
						placeholder={`Option ${i + 1}`}
						value={opt}
						onChange={(e) => handleOptionChange(i, e.target.value)}
					/>
					{options.length > 2 && (
						<button
							className="icon-btn"
							onClick={() => removeOption(i)}
						>
							❌
						</button>
					)}
				</div>
			))}
			<button className="secondary-btn" onClick={addOption}>
				+ Add Another Option
			</button>
			<div className="actions">
				<button className="secondary-btn" onClick={() => setStep(1)}>
					Back
				</button>
				<button
					onClick={() => setStep(3)}
					disabled={options.filter((o) => o.trim() !== "").length < 2}
				>
					Next: Add Criteria
				</button>
			</div>
		</div>
	);
}

export default StepOptions;
