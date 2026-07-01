---
title: VGG-16 CUDA Optimization
blurb: Custom CUDA C++ kernels for VGG-16 inference on an RTX 3080, with Nsight Compute profiling that pins the FC layers as memory-bound.
period: Mar–May 2025
org: RIT (High Performance Architectures, CMPE 755)
role: 6-person team
featured: true
order: 4
metrics:
  - { value: "~41.5 GFLOPS", label: "FC layer @ batch=16 (~16.4× over batch=1)" }
  - { value: "CGMA ~2.0", label: "vs ~156.7 needed → FC memory-bound" }
tags: ["CUDA C++", "cuBLAS", "cuDNN", "Nsight Compute", "HPC"]
---

Optimized VGG-16 convolution and fully-connected layers for the RTX 3080 (CC 8.6) using custom CUDA kernels alongside cuDNN (conv) and cuBLAS (FC), then profiled with **NVIDIA Nsight Compute** to locate the true bottleneck.

<details open>
<summary>Level 2 — Approach</summary>

Built tiled and vectorized kernel variants (shared-memory tiling, memory coalescing) and benchmarked FC-layer throughput across batch sizes — near-linear scaling to **~41.5 GFLOPS at batch=16**. A **CGMA (compute-to-global-memory-access) analysis** showed the FC layers sit at CGMA ≈ 2.0 versus the ≈ 156.7 needed to be compute-bound, identifying them as **memory-bound** rather than compute-bound. A 6-person team split across three sub-teams (conv/shared-memory tiling, memory coalescing, and kernel-fusion/FC + integration).

</details>

<details>
<summary>Level 3 — Evidence</summary>

- Roofline / CGMA analysis, per-batch GFLOPS curves, and Nsight Compute profiles.
- *Repository is public; Nsight screenshots to be added as captioned evidence.*

</details>
