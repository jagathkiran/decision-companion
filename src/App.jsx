import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [step, setStep] = useState(1);
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [options, setOptions] = useState(["", ""]);
	const [criteria, setCriteria] = useState([
		{ name: "", weight: 3 },
		{ name: "", weight: 3 },
	]);
	const [scores, setScores] = useState({});
	const [results, setResults] = useState(null);
	const [loading, setLoading] = useState(false);
	const [history, setHistory] = useState([]);
	const [viewingHistory, setViewingHistory] = useState(false);

	// Load history on mount
	useEffect(() => {
		const saved = localStorage.getItem("dcs_history");
		if (saved) {
			try {
				setHistory(JSON.parse(saved));
			} catch (e) {
				console.error("Failed to parse history", e);
			}
		}
	}, []);

	// Save to history
	const saveToHistory = (decisionResult) => {
		const newEntry = {
			id: Date.now(),
			date: new Date().toLocaleString(),
			title: title || "Untitled Decision",
			category: category || "General",
			...decisionResult,
		};
		const updatedHistory = [newEntry, ...history];
		setHistory(updatedHistory);
		localStorage.setItem("dcs_history", JSON.stringify(updatedHistory));
	};

	// Handlers for Options
	const handleOptionChange = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};
	const addOption = () => setOptions([...options, ""]);
	const removeOption = (index) =>
		setOptions(options.filter((_, i) => i !== index));

	// Handlers for Criteria
	const handleCriterionChange = (index, field, value) => {
		const newCriteria = [...criteria];
		newCriteria[index][field] = value;
		setCriteria(newCriteria);
	};
	const addCriterion = () =>
		setCriteria([...criteria, { name: "", weight: 3 }]);
	const removeCriterion = (index) =>
		setCriteria(criteria.filter((_, i) => i !== index));

	// Handlers for Scores
	const handleScoreChange = (option, criterionName, value) => {
		setScores((prev) => ({
			...prev,
			[option]: {
				...(prev[option] || {}),
				[criterionName]: parseInt(value, 10) || 0,
			},
		}));
	};

	// Submission
	const evaluateDecision = async () => {
		setLoading(true);
		try {
			const validOptions = options.filter((o) => o.trim() !== "");
			const validCriteria = criteria.filter((c) => c.name.trim() !== "");

			const response = await fetch("/api/evaluate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					options: validOptions,
					criteria: validCriteria,
					scores: scores,
				}),
			});

			const data = await response.json();
			setResults(data);
			saveToHistory(data);
			setStep(5);
		} catch (error) {
			console.error("Error evaluating decision:", error);
			alert("Failed to evaluate decision. Check console for details.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<header className="header">
				<h1>🧭 Decision Companion</h1>
				<p>Weighted decisions. Clearer choices.</p>
				<button 
					className="history-toggle"
					onClick={() => setViewingHistory(!viewingHistory)}
				>
					{viewingHistory ? "Back to App" : "📜 History"}
				</button>
			</header>

			<main className="card">
				{viewingHistory ? (
					<div className="step-content history-view">
						<h2>📜 Decision History</h2>
						{history.length === 0 ? (
							<p className="subtitle">No saved decisions yet. Start your first one!</p>
						) : (
							<div className="history-list">
								{history.map((item) => (
									<div key={item.id} className="history-item">
										<div className="history-header">
											<strong>{item.title}</strong>
											<span>{item.date}</span>
										</div>
										<p>Result: <strong>{item.winner}</strong></p>
										<button 
											className="small-btn"
											onClick={() => {
												setTitle(item.title);
												setCategory(item.category);
												setResults(item);
												setViewingHistory(false);
												setStep(5);
											}}
										>
											View Details
										</button>
									</div>
								))}
							</div>
						)}
						<div className="actions">
							<button 
								className="secondary-btn" 
								onClick={() => setViewingHistory(false)}
							>
								Close History
							</button>
						</div>
					</div>
				) : (
					<>
						{step === 1 && (
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
								<button
									onClick={() => setStep(2)}
									disabled={!title.trim()}
								>
									Next: Add Options
								</button>
							</div>
						)}

						{step === 2 && (
							<div className="step-content">
								<h2>Step 2: Enter Options</h2>
								<p className="subtitle">
									What are you deciding between?
								</p>
								{options.map((opt, i) => (
									<div key={i} className="form-row">
										<input
											type="text"
											placeholder={`Option ${i + 1}`}
											value={opt}
											onChange={(e) =>
												handleOptionChange(i, e.target.value)
											}
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
									<button
										className="secondary-btn"
										onClick={() => setStep(1)}
									>
										Back
									</button>
									<button
										onClick={() => setStep(3)}
										disabled={
											options.filter((o) => o.trim() !== "")
												.length < 2
										}
									>
										Next: Add Criteria
									</button>
								</div>
							</div>
						)}

						{step === 3 && (
							<div className="step-content">
								<h2>Step 3: Define & Weight Criteria</h2>
								<p className="subtitle">
									What factors matter to you? (Weight 1-5)
								</p>
								{criteria.map((crit, i) => (
									<div key={i} className="form-row criteria-row">
										<input
											type="text"
											placeholder={`Criterion ${i + 1} (e.g., Price)`}
											value={crit.name}
											onChange={(e) =>
												handleCriterionChange(
													i,
													"name",
													e.target.value,
												)
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
								<button
									className="secondary-btn"
									onClick={addCriterion}
								>
									+ Add Another Criterion
								</button>
								<div className="actions">
									<button
										className="secondary-btn"
										onClick={() => setStep(2)}
									>
										Back
									</button>
									<button
										onClick={() => setStep(4)}
										disabled={
											criteria.filter((c) => c.name.trim() !== "")
												.length < 2
										}
									>
										Next: Score Options
									</button>
								</div>
							</div>
						)}

						{step === 4 && (
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
															<span>
																(Weight: {crit.weight})
															</span>
														</label>
														<input
															type="number"
															min="1"
															max="10"
															placeholder="1-10"
															value={
																scores[opt]?.[
																	crit.name
																] || ""
															}
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
									<button
										className="secondary-btn"
										onClick={() => setStep(3)}
									>
										Back
									</button>
									<button
										onClick={evaluateDecision}
										disabled={loading}
									>
										{loading
											? "Calculating..."
											: "Calculate Results!"}
									</button>
								</div>
							</div>
						)}

						{step === 5 && results && (
							<div className="step-content results-view">
								<h2>📊 Results: {title}</h2>
								<p className="insight">{results.insight}</p>
								<div className="winner-banner">
									✅ Recommended Choice:{" "}
									<strong>{results.winner}</strong>
								</div>

								{Object.entries(results.ranked_results).map(
									([option, data], i) => (
										<div key={option} className="result-card">
											<h3>
												#{i + 1} {option}{" "}
												<span>
													{data.final.toFixed(2)} / 10
												</span>
											</h3>
											<div className="breakdown">
												{data.breakdown.map((b) => (
													<div
														key={b.criterion}
														className="breakdown-row"
													>
														<span>{b.criterion}</span>
														<span>Score: {b.score}</span>
														<span>Weight: {b.weight}</span>
														<strong>
															Total: {b.weighted_score}
														</strong>
													</div>
												))}
											</div>
										</div>
									),
								)}

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
						)}
					</>
				)}
			</main>
		</div>
	);
}

export default App;
