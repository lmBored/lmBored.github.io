---
title: "Huawei 2025 OXC Ports Arrangement: A Technical Deep-Dive"
date: 2026-06-14
slug: huawei-oxc-ports-2025-deep-dive
summary: Breaking down the algorithms that secured rank 64 out of 3176 in the Huawei 2025 competition, contrasting Greedy with Stochastic Local Search.
author: me
tags:
  - Competitive Programming
  - Algorithms
  - Local Search
featured: true
---

# The Huawei 2025 OXC Ports Arrangement

Participating in the Huawei 2025 competition "OXC Ports Arrangement" on Codeforces was a grueling yet rewarding experience. Out of *3176 participants*, I managed to secure **Rank 64**. 

The problem itself is a beast of a constraint satisfaction challenge: you are given $N$ groups, each containing $S$ spines and $L$ leaves. There are $M$ Optical Cross-Connects (OXCs) connecting them. The objective is to efficiently route $Q$ cross-group flows across $P$ planes. The catch? You must minimize the maximum port usage per component while heavily prioritizing connection reuse (minimizing the delta of connection changes between successive states). With a "heuristic problem" search space and a strict 5-second time limit per test on the server, the problem forced a difficult compromise: do you prioritize algorithmic thoroughness, or do you build a lightning-fast heuristic engine that can brute-force tens of thousands of iterations?

## My Approach (Fast and Greedy)

I opted for the latter. My solution was a highly optimized, two-phase greedy solver wrapped in a massive randomized shuffling loop. 

### Architecture
1. **Plane Assignment:** For each query, I greedily locked in which plane would handle a given flow.
2. **OXC & Spine Assignment:** Once a plane was selected, the algorithm greedily searched for the best available ports on the OXCs and spines.

The core heuristic relied on sorting the queries based on leaf occurrences. By prioritizing flows that involved heavily saturated leaves, the greedy assignments were less likely to bottleneck later. A custom scoring function evaluated candidate assignments to balance the "maximum port conflict" against the "connection delta."

### Micro-Optimizations
To make this approach viable within the 5-second limit, the C++ implementation needed extreme micro-optimizations. 
- **Compiler:** I heavily relied on `#pragma GCC optimize("O3,unroll-loops")` to squeeze every bit of performance out of the compiler.
- **Fast Randomization:** `std::mt19937` is great, but `splitmix64` is faster. I used a custom `splitmix64` pseudo-random number generator to rapidly shuffle queries.
- **Data Structures:** Instead of clean, object-oriented structures or nested `std::vector`s, the state was tracked using flattened 1D arrays and bitwise operations. 

This backend allowed me to run up to 25,000 iterations per test. It was fast, and part of how I could perform well.

### The Wall
However, pure greedy approaches have theoretical limits. The algorithm fundamentally failed to achieve optimal scores on Test 04. This test is an exactly saturated case ($Q = 7680$, with maximum possible capacity perfectly matching the queries). Because my greedy approach processes flows in order and commits to them immediately without the ability to backtrack, by the time it reaches the 5000th flow, all the optimal planes are blocked by suboptimal early commitments. The result was a deadlock at `max_conflict=2`.

## Post-Contest Analysis

After the contest, I reached out to a Top-10 C# solution (which used Stochastic Local Search with Container-based Constraint Satisfaction). The core insight from this solution was quite simple but interesting, that is *"For a task, it's mostly important from which group to which other group it shall be transferred. The exact leaf is a minor detail."*. My approach was trying to find the perfect assignment on the first pass, while their approach assigned everything randomly and then fixed the mistakes. The result indeed surprised me a lot. Here's an overview of their solution:

### Container-Based Constraint Satisfaction
Their solution utilized a `SolveContainers` algorithm that can be simplified into this pseudo-code:

```text
1. Randomly assign all tasks to containers (planes/OXCs).
2. While any container has constraints violations (capacity overshoots):
   a. Pick a random task from a violating container.
   b. Find a target container where this task can fit better.
   c. Move the task.
3. Repeat until solved or max iterations reached.
```

After a bunch of research, I figured this solution performs well mainly because of the logic of Stochastic Local Search (SLS), specifically its ability to "undo" bad decisions. In the saturated Test 04 scenario where my greedy algorithm deadlocks at `max_conflict=2`, SLS easily identifies the bottleneck, extracts the offending tasks, and shifts them into different containers. The constraints naturally repair themselves, reaching `max_conflict=1` effortlessly.

For test cases where the convergence ratio was greater than 1 (like 1:3 or 1:7), the SLS approach adapted by temporarily reducing the task pool, solving the perfectly balanced 1:1 problem, and then restoring the remaining tasks, quite easily.

## Takeaways

Getting Rank 64 out of 3176 is an achievement I'm proud of, largely driven by raw C++ execution speed and micro-optimizations. However, analyzing the SLS solution was a good reminder of the balance in algorithm design, and the importance of problem formulation - in this case whether we should choose SLS or greedy or something else.

I believe greedy approach can perform on par with this, but my solution is not well-formulated enough and greedy approach needs more careful tuning than SLS on this dataset/problem.

## Resources

Here is the link to my solution: [oxc_ports_arrangement](https://github.com/lmBored/oxc_ports_arrangement_adhoc)