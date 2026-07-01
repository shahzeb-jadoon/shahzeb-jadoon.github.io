---
title: Quantum Policy Gradient for CartPole
blurb: A parameter-matched comparison of a variational quantum circuit against a classical policy on CartPole — is a VQC more expressive per parameter?
period: Oct–Dec 2025
org: RIT (Quantum Machine Learning, CSCI 739)
role: Solo
featured: true
order: 5
metrics:
  - { value: "Statistical parity", label: "at 18% fewer parameters" }
  - { value: "p = 0.81", label: "paired t-test (Cohen's d = 0.10)" }
  - { value: "9 seeds", label: "95% confidence intervals" }
tags: ["PennyLane", "VQC", "Parameter-Shift", "REINFORCE", "Reinforcement Learning"]
repo: https://github.com/shahzeb-jadoon/Quantum_Policy_Gradient_for_CartPole
---

Implemented a Quantum Policy Gradient agent — a 4-qubit variational quantum circuit (~42 params) with data re-uploading — and ran a rigorous **parameter-matched** comparison against a classical "Tiny MLP" (~51 params) on **CartPole-v1**, isolating whether quantum circuits offer superior expressivity *per parameter*.

<details open>
<summary>Level 2 — Method</summary>

Both agents trained identically with **REINFORCE** (γ=0.99, Adam, return normalization, gradient clipping). The quantum circuit used `AngleEmbedding` interleaved with `StronglyEntanglingLayers`, measuring ⟨Z₀⟩/⟨Z₁⟩ → a hybrid linear layer → softmax policy, built on PennyLane's `default.qubit` wrapped as a PyTorch `TorchLayer`. Trained with both backpropagation and the hardware-compatible **parameter-shift rule** to validate physical realizability on NISQ devices.

</details>

<details>
<summary>Level 3 — Result</summary>

- The quantum agent reached **statistical parity** with the classical baseline (275±59 vs 267±87 episodes to solve; paired t-test **p=0.81**, Cohen's d=0.10) using **18% fewer parameters**.
- **Barren-plateau monitoring** (gradient-norm tracking) confirmed trainability of the shallow 3-layer / 4-qubit circuit.
- Protocol: 9 random seeds, 95% CIs, paired t-tests + effect size, a 139-test pytest suite, Conda-reproducible environment, GIF demos. Graduate IEEE-style LaTeX report.

</details>
