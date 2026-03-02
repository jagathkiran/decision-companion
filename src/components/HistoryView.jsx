import React from "react";

function HistoryView({
	history,
	setTitle,
	setCategory,
	setResults,
	setViewingHistory,
	setStep,
	downloadDecision,
}) {
	return (
		<div className="step-content history-view">
			<h2>📜 Decision History</h2>
			{history.length === 0 ? (
				<p className="subtitle">
					No saved decisions yet. Start your first one!
				</p>
			) : (
				<div className="history-list">
					{history.map((item) => (
						<div key={item.id} className="history-item">
							<div className="history-header">
								<strong>{item.title}</strong>
								<span>{item.date}</span>
							</div>
							<p>
								Result: <strong>{item.winner}</strong>
							</p>
							<div className="history-actions">
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
								<button
									className="small-btn secondary-btn"
									onClick={() => downloadDecision(item)}
								>
									📥 Download
								</button>
							</div>
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
	);
}

export default HistoryView;
