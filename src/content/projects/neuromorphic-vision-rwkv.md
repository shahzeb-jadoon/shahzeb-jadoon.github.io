---
title: Neuromorphic-Vision-RWKV
blurb: RWKV-6 linear-attention controller for autonomous driving, built for O(1) constant-state inference on edge and neuromorphic hardware.
period: Jan–May 2026
org: RIT (MS Capstone, CMPE 792)
role: Solo
featured: true
order: 1
metrics:
  - { value: "6.88 ms", label: "median inference (RTX 3080)" }
  - { value: "13.4 M", label: "parameters / 51 MiB FP32" }
  - { value: "3.6 TB", label: "CARLA training corpus" }
tags: ["RWKV", "PyTorch", "CARLA", "Edge AI", "Imitation Learning", "Neuromorphic"]
repo: https://github.com/shahzeb-jadoon/neuromorphic-vision-rwkv
---

Investigated whether **RWKV** linear-complexity recurrence — a "third way" between Transformers and RNNs, with parallel training and **O(1) constant-state inference** structurally aligned to Leaky-Integrate-and-Fire spiking dynamics — can drive a car under edge-compute limits.

<details open>
<summary>Level 2 — Architecture</summary>

End-to-end imitation-learning prototype: 3-camera panoramic RGB (160×960) → patch embedding with **Q-Shift** locality recovery → pure-PyTorch **RWKV-6 (Finch)** temporal encoder → gated navigation-command fusion → policy heads for steering and merged acceleration, plus auxiliary heads (target speed, driving mode, future waypoints). Trained on a **3.6 TB CARLA corpus** (1,099 episodes / 3.6 M frames / 6 towns / 10 weathers) with 32-frame clips and 8-frame burn-in.

</details>

<details>
<summary>Level 3 — Evidence & honest results</summary>

- **13.43 M params**, 51.22 MiB FP32, **6.88 ms median latency**, 64.62 MiB peak CUDA memory on RTX 3080 — beats the proposal's stretch goals. Best open-loop steering MAE 0.054.
- Defined a custom neuromorphic-sparsity proxy (**Accumulate-and-Fire efficiency, η_AF**) and reported it honestly as a **negative result**: the model is not yet sparse. Measuring and disclosing this is the point — a variance budget you bound before shipping.
- Targeted edge/neuromorphic deployment: NVIDIA Jetson Orin Nano, BrainChip Akida; planned TensorRT INT8/FP16 + SNN conversion.
- Professional repo: `pyproject`, GitHub Actions CI, pre-commit (black/flake8/mypy), **100+ pytest tests** with a coverage gate, XeLaTeX thesis.

</details>
