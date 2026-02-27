#!/usr/bin/env python3
"""
Decision Companion — Weighted decision-making CLI tool.
Fully dynamic: no hardcoded categories, criteria, options, or weights.
"""

import os
import json
from datetime import datetime

# ─── ANSI Colors ─────────────────────────────────────────────────────────────
R = "\033[0m"
B = "\033[1m"
C = "\033[36m"
G = "\033[32m"
Y = "\033[33m"
M = "\033[35m"
RE = "\033[31m"
DIM = "\033[2m"

HISTORY_FILE = os.path.expanduser("~/.decision_history.json")


# ─── Helpers ──────────────────────────────────────────────────────────────────
def clear():
    os.system("cls" if os.name == "nt" else "clear")


def banner():
    print(f"""
{C}{B}╔══════════════════════════════════════════════╗
║       🧭  Decision Companion  v1.0           ║
║   Weighted decisions. Clearer choices.       ║
╚══════════════════════════════════════════════╝{R}
""")


def separator(char="─", width=52):
    print(f"{DIM}{char * width}{R}")


def prompt(text, default=None):
    hint = f" {DIM}[{default}]{R}" if default else ""
    val = input(f"{Y}▶ {text}{hint}: {R}").strip()
    return val if val else default


def prompt_int(text, lo, hi):
    while True:
        try:
            val = int(input(f"{Y}▶ {text} ({lo}–{hi}): {R}").strip())
            if lo <= val <= hi:
                return val
            print(f"{RE}  Enter a number between {lo} and {hi}.{R}")
        except ValueError:
            print(f"{RE}  Please enter a valid number.{R}")


def bar(score, max_score=10, width=20):
    filled = round((score / max_score) * width)
    return f"{G}{'█' * filled}{DIM}{'░' * (width - filled)}{R}"


def color_score(s):
    if s >= 7.5:
        return f"{G}{B}{s:.2f}{R}"
    if s >= 5.0:
        return f"{Y}{B}{s:.2f}{R}"
    return f"{RE}{B}{s:.2f}{R}"


def load_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE) as f:
                return json.load(f)
        except Exception:
            return []
    return []


def save_history(record):
    history = load_history()
    history.append(record)
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)


# ─── Dynamic Input Collection ─────────────────────────────────────────────────
def get_decision_title():
    print()
    separator()
    return prompt("Describe your decision in one line", "My Decision")


def get_category():
    print(f"\n{B}What type of decision is this?{R}")
    print(f"{DIM}e.g. Career, Financial, Personal, Health, Technical...{R}\n")
    while True:
        cat = input(f"{Y}▶ Decision category: {R}").strip()
        if cat:
            return cat
        print(f"{RE}  Please enter a category name.{R}")


def get_criteria():
    print(f"\n{B}Define your evaluation criteria{R}")
    print(f"{DIM}These are the factors you'll judge each option on.")
    print(
        f"Enter each criterion name, then press Enter on an empty line to finish.{R}\n"
    )
    criteria = []
    i = 1
    while True:
        name = input(f"{Y}  Criterion {i}: {R}").strip()
        if not name:
            if len(criteria) < 2:
                print(f"{RE}  Please enter at least 2 criteria.{R}")
                continue
            break
        criteria.append(name)
        i += 1
    return criteria


def get_options():
    print(f"\n{B}Enter the options you are deciding between{R}")
    print(f"{DIM}Press Enter on an empty line to finish.{R}\n")
    options = []
    i = 1
    while True:
        name = input(f"{Y}  Option {i}: {R}").strip()
        if not name:
            if len(options) < 2:
                print(f"{RE}  Please enter at least 2 options.{R}")
                continue
            break
        options.append(name)
        i += 1
    return options


def set_weights(criteria):
    print(f"\n{B}Set importance weight for each criterion{R}")
    print(f"{DIM}1 = least important  →  5 = most important{R}\n")
    weights = {}
    for crit in criteria:
        print(f"  {C}{crit}{R}")
        w = prompt_int("  Weight", 1, 5)
        weights[crit] = w
        print()
    return weights


def score_options(options, criteria):
    scores = {}
    for option in options:
        print(f'\n{M}{B}  Scoring: "{option}"{R}\n')
        scores[option] = {}
        for crit in criteria:
            print(f"  {C}{crit}{R}")
            s = prompt_int("  Score", 1, 10)
            scores[option][crit] = s
            print()
    return scores


# ─── Computation ──────────────────────────────────────────────────────────────
def compute_results(options, criteria, weights, scores):
    results = {}
    total_weight = sum(weights[c] for c in criteria)
    for option in options:
        weighted_sum = sum(scores[option][c] * weights[c] for c in criteria)
        final = weighted_sum / total_weight if total_weight else 0
        results[option] = {
            "final": final,
            "breakdown": [(c, scores[option][c], weights[c]) for c in criteria],
        }
    return results


# ─── Display Results ──────────────────────────────────────────────────────────
def show_results(results, title, category):
    clear()
    banner()
    separator("═")
    print(f'{B}  📊 Results for: "{title}"{R}')
    print(f"  {DIM}Category: {category}{R}")
    separator("═")

    ranked = sorted(results.items(), key=lambda x: x[1]["final"], reverse=True)

    for rank, (option, data) in enumerate(ranked, 1):
        medal = ["🥇", "🥈", "🥉"][rank - 1] if rank <= 3 else f"#{rank}"
        print(
            f"\n  {medal}  {B}{option}{R}   {bar(data['final'])}  {color_score(data['final'])} / 10"
        )
        print(
            f"  {DIM}{'Criterion':<28} {'Score':>6}  {'Weight':>7}  {'Weighted':>9}{R}"
        )
        separator("·", 58)
        for crit, score, weight in data["breakdown"]:
            print(f"  {crit:<28} {score:>6}/10  {weight:>7}  {score * weight:>9.1f}")

    separator()
    winner = ranked[0][0]
    winner_score = ranked[0][1]["final"]
    print(f"\n{G}{B}  ✅ Recommended Choice: {winner}{R}")

    if winner_score >= 8:
        insight = "Strong choice — high confidence across weighted criteria."
    elif winner_score >= 6:
        insight = "Solid option, though worth revisiting lower-scored criteria."
    else:
        insight = "No standout option. Consider redefining your criteria or gathering more info."
    print(f"  {DIM}{insight}{R}\n")
    separator("═")

    return ranked


# ─── History ──────────────────────────────────────────────────────────────────
def view_history():
    history = load_history()
    if not history:
        print(f"\n{DIM}  No past decisions found.{R}\n")
        return
    print(f"\n{B}  📁 Past Decisions ({len(history)} total):{R}\n")
    for i, record in enumerate(reversed(history[-10:]), 1):
        print(
            f"  {C}{i}.{R} [{record.get('timestamp', '?')}]  {B}{record.get('title', '?')}{R}  ({record.get('category', '?')})"
        )
        print(f"     {G}→ Winner: {record.get('winner', '?')}{R}\n")


# ─── Main Loop ────────────────────────────────────────────────────────────────
def main():
    clear()
    banner()

    while True:
        print(f"{B}What would you like to do?{R}\n")
        print(f"  {C}1.{R} Make a new decision")
        print(f"  {C}2.{R} View past decisions")
        print(f"  {C}3.{R} Exit\n")

        choice = input(f"{Y}▶ Choose (1–3): {R}").strip()

        if choice == "3":
            print(f"\n{G}  Goodbye. Choose wisely. 🧭{R}\n")
            break

        elif choice == "2":
            view_history()
            input(f"{DIM}  Press Enter to continue...{R}")
            clear()
            banner()

        elif choice == "1":
            title = get_decision_title()
            category = get_category()
            criteria = get_criteria()
            options = get_options()

            print(f"\n{B}Step 1 of 2 — Weight your criteria{R}")
            separator()
            weights = set_weights(criteria)

            print(f"\n{B}Step 2 of 2 — Score each option{R}")
            separator()
            scores = score_options(options, criteria)

            results = compute_results(options, criteria, weights, scores)
            ranked = show_results(results, title, category)

            save_history(
                {
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M"),
                    "title": title,
                    "category": category,
                    "winner": ranked[0][0],
                    "scores": {k: round(v["final"], 2) for k, v in results.items()},
                }
            )
            print(f"  {DIM}Decision saved to history.{R}\n")

            again = input(f"{Y}▶ Make another decision? (y/n): {R}").strip().lower()
            if again != "y":
                print(f"\n{G}  Goodbye. Choose wisely. 🧭{R}\n")
                break
            clear()
            banner()

        else:
            print(f"{RE}  Invalid option.{R}\n")


if __name__ == "__main__":
    main()
