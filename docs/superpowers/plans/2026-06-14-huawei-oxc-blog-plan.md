# Huawei OXC Blog Post Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write a detailed technical blog post explaining the C++ greedy solver vs C# stochastic local search approaches for the Huawei 2025 OXC Ports Arrangement problem.

**Architecture:** A single markdown file following the project's format requirements, split into clear, engaging analytical sections.

**Tech Stack:** Markdown, Markdown math blocks.

---

### Task 1: Draft the Blog Post

**Files:**
- Create: `content/posts/huawei-oxc-ports-2025.md`

- [ ] **Step 1: Write the Frontmatter and Introduction**

```markdown
---
title: "Huawei 2025 OXC Ports Arrangement: A Technical Deep-Dive"
date: 2026-06-14
slug: huawei-oxc-ports-2025-deep-dive
summary: Breaking down the algorithms that secured rank 64 out of 3176 in the Huawei 2025 competition, contrasting Greedy with Stochastic Local Search.
author: me
tags:
  - Competitive Programming
  - Huawei
  - Algorithms
  - Local Search
featured: true
---

# The Huawei 2025 OXC Ports Arrangement

Participating in the Huawei 2025 competition "OXC Ports Arrangement" on Codeforces was a grueling yet rewarding experience. Out of 3176 participants, I managed to secure Rank 64. 

The problem itself is a beast of a constraint satisfaction challenge: you are given $N$ groups, each containing $S$ spines and $L$ leaves. There are $M$ Optical Cross-Connects (OXCs) connecting them. The objective is to efficiently route $Q$ cross-group flows across $P$ planes. The catch? You must minimize the maximum port usage per component while heavily prioritizing connection reuse (minimizing the delta of connection changes between successive states).

With an immense search space and a brutally strict 5-second time limit per test on the server, the problem forced a difficult compromise: do you prioritize algorithmic thoroughness, or do you build a lightning-fast heuristic engine that can brute-force tens of thousands of iterations?
```

- [ ] **Step 2: Write Section 2 (My Approach)**

```markdown
## My Approach: The Highly Optimized Greedy Solver

I opted for the latter. My solution was a highly optimized, two-phase greedy solver wrapped in a massive randomized shuffling loop. 

### The Architecture
1. **Plane Assignment:** For each query, I greedily locked in which plane would handle a given flow.
2. **OXC & Spine Assignment:** Once a plane was selected, the algorithm greedily searched for the best available ports on the OXCs and spines.

The core heuristic relied on sorting the queries based on leaf occurrences. By prioritizing flows that involved heavily saturated leaves, the greedy assignments were less likely to bottleneck later. A custom scoring function evaluated candidate assignments to balance the "maximum port conflict" against the "connection delta."

### Micro-Optimizations (The "Brute-Force" Engine)
To make this approach viable within the 5-second limit, the C++ implementation needed extreme micro-optimizations. 
- **Compiler Directives:** I heavily relied on `#pragma GCC optimize("O3,unroll-loops")` to squeeze every bit of performance out of the compiler.
- **Fast Randomization:** `std::mt19937` is great, but `splitmix64` is faster. I used a custom `splitmix64` pseudo-random number generator to rapidly shuffle queries.
- **Data Structures:** Instead of clean, object-oriented structures or nested `std::vector`s, the state was tracked using flattened 1D arrays and bitwise operations. 

This engine allowed me to run up to 25,000 iterations per test. It was fast, it was ruthless, and it secured my rank.

### The Wall
However, pure greedy approaches have theoretical limits. The algorithm fundamentally failed to achieve optimal scores on Test 04. This test is an exactly saturated case ($Q = 7680$, with maximum possible capacity perfectly matching the queries). 

Because my greedy approach processes flows in order and commits to them immediately without the ability to backtrack, by the time it reaches the 5000th flow, all the optimal planes are blocked by suboptimal early commitments. The result was a deadlock at `max_conflict=2`.
```

- [ ] **Step 3: Write Section 3 (Post-Contest Analysis)**

```markdown
## Post-Contest Analysis: The Top-10 Stochastic Local Search Paradigm

After the contest, analyzing a Top-10 C# solution revealed the exact flaw in my greedy logic. The breakthrough was a shift in paradigm to **Stochastic Local Search with Container-based Constraint Satisfaction**.

### The Paradigm Shift
The core insight from the top competitors was profound yet simple: *"For a task, it's mostly important from which group to which other group it shall be transferred. The exact leaf is a minor detail."*

My approach was trying to find the perfect assignment on the first pass. Their approach assigned everything randomly and then fixed the mistakes.

### Container-Based Constraint Satisfaction
The C# solution utilized a `SolveContainers` algorithm that can be simplified into this pseudo-code:

```text
1. Randomly assign all tasks to containers (planes/OXCs).
2. While any container has constraints violations (capacity overshoots):
   a. Pick a random task from a violating container.
   b. Find a target container where this task can fit better.
   c. Move the task.
3. Repeat until solved or max iterations reached.
```

### Why It Beats Greedy
The magic of Stochastic Local Search (SLS) is its ability to "undo" bad decisions. In the saturated Test 04 scenario where my greedy algorithm deadlocks at `max_conflict=2`, SLS easily identifies the bottleneck, extracts the offending tasks, and shifts them into different containers. The constraints naturally repair themselves, reaching `max_conflict=1` effortlessly.

For test cases where the convergence ratio was greater than 1 (like 1:3 or 1:7), the SLS approach elegantly adapted by temporarily reducing the task pool, solving the perfectly balanced 1:1 problem, and then restoring the remaining tasks.
```

- [ ] **Step 4: Write Conclusion and Finalize**

```markdown
## Takeaways

Getting Rank 64 out of 3176 is an achievement I'm proud of, largely driven by raw C++ execution speed and micro-optimizations. However, analyzing the SLS solution was a humbling reminder of the balance in algorithm design. 

Sometimes, running a "dumb" algorithm 25,000 times a second isn't enough. True algorithmic elegance comes from building systems that can recognize their own mistakes, backtrack, and dynamically repair constraints.
```

- [ ] **Step 5: Verify content structure**

Run: `cat content/posts/huawei-oxc-ports-2025.md`
Expected: The file exists and contains the full drafted post.