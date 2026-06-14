# Blog Post Design: Huawei 2025 OXC Ports Arrangement

**Topic:** Technical deep-dive into the Huawei 2025 OXC Ports Arrangement competition on Codeforces.
**Date:** 2026-06-14
**Target Path:** `content/posts/huawei-oxc-ports-2025.md`

## Overview
This blog post will be written in a technical, rigid, yet engaging narrative style (similar to a competitive programming tutorial) to share the experience of achieving Rank 64 out of 3176 in the Huawei 2025 competition. It contrasts a highly-optimized C++ greedy solver (the author's approach) with a more elegant C# Stochastic Local Search solver (a top-10 post-contest study).

## Content Structure

### Section 1: Introduction & Problem Formalization
- **The Hook:** Acknowledge the Rank 64 achievement. Establish the scale and competitiveness of the contest.
- **Problem Abstraction:** Define the puzzle. We are given $N$ groups, each with $S$ spines and $L$ leaves. There are $M$ total OXCs. The objective is to route $Q$ cross-group flows effectively across planes ($P$).
- **Scoring/Goals:** Minimize the maximum port usage per component while maximizing connection reuse (minimizing connection delta from the previous query).
- **The Difficulty:** The search space is combinatorial, and the stringent 5-second time limit forces compromises between algorithmic thoroughness and iteration count.

### Section 2: My Approach – The Highly Optimized Greedy Solver
- **Architecture:** Explain the two-phase greedy approach:
  1. *Plane Assignment:* Greedily locking in which plane handles a flow.
  2. *OXC & Spine Assignment:* Greedily locking in specific ports.
- **The Core Heuristic:** Sort queries based on leaf occurrences to prioritize saturated leaves. A custom scoring function checks candidate assignments to balance conflict vs. delta.
- **Micro-Optimizations (The "Brute-Force" Engine):** Detail the C++ tricks used to hit up to 25,000 iterations in 5 seconds.
  - Using `#pragma GCC optimize("O3,unroll-loops")`.
  - Replacing standard random utilities with `splitmix64` for blisteringly fast pseudo-random number generation.
  - Using flattened 1D arrays and bitwise operations instead of object-oriented structures or nested vectors.
- **The Wall:** Discuss the theoretical limit of the greedy approach. Explain why it fundamentally fails on Test 04 (an exactly saturated case with $Q = 7680$). Because the greedy approach commits too early, by the time it reaches the 5000th flow, all valid optimal planes are blocked by suboptimal early commitments.

### Section 3: Post-Contest Analysis – The Top-10 Stochastic Local Search Paradigm
- **The Paradigm Shift:** Transition to analyzing the Top-10 C# solution. The core insight: "For a task, it's mostly important from which group to which other group it shall be transferred. The exact leaf is a minor detail."
- **Container-Based Constraint Satisfaction:** Break down the `SolveContainers` algorithm via pseudo-code:
  1. Randomly assign all tasks to planes/OXCs (Containers).
  2. Iteratively identify constraint violations (overshoots).
  3. Pick a random violating task and move it to a better container.
- **Why It Beats Greedy:** Explain how Stochastic Local Search (SLS) effectively "undoes" bad decisions. In saturated cases where greedy deadlocks at `max_conflict=2`, SLS seamlessly shifts assignments around to reach `max_conflict=1`.
- **Convergence Handling:** Briefly detail how the C# solution handles convergence ratios >1 (e.g., 1:3 or 1:7) by temporarily reducing tasks, solving the 1:1 problem, and then restoring.

### Section 4: Takeaways
- Reflect on the delicate balance in competitive programming between raw execution speed (C++ micro-optimizations) and algorithmic elegance (SLS).
- Concluding thoughts on problem-solving heuristics.

## Formatting Requirements
- Frontmatter with title, date, slug, summary, author, tags.
- Markdown headings (`#`, `##`, `###`).
- Code blocks (`cpp`, `text`) for pseudo-code or specific implementations.
- Latex math blocks or inline math (`$N$`, `$Q$`) for variable definitions.