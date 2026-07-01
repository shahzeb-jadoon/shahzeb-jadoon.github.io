---
title: BrainChip Akida — Neuromorphic Segmentation
blurb: High-resolution semantic segmentation mapped onto BrainChip Akida 2.0 neuromorphic silicon via hardware-aware model surgery and INT8 quantization-aware training.
period: May–Sep 2025
org: BrainChip (ML Engineer Intern)
role: Solo (internship project)
featured: true
order: 2
metrics:
  - { value: "~82%", label: "of SOTA accuracy at 7.5% of the params (4.6M vs 61.3M)" }
  - { value: "0.55 mIoU", label: "Cityscapes @ 384²" }
  - { value: "0.97 IoU", label: "Portrait128" }
tags: ["Akida 2.0", "INT8 QAT", "Model Surgery", "Halo-Tiling", "PyTorch", "Semantic Segmentation"]
---

Built an end-to-end PyTorch→Akida pipeline for high-resolution semantic segmentation on the **BrainChip Akida 2.0** neuromorphic processor (8-bit integer inference) — bridging standard high-res CV workflows with the chip's strict memory, operation, and bit-width constraints.

<details open>
<summary>Level 2 — Architecture</summary>

Designed an **Akida-native UNet** (custom decoder: nearest-neighbor upsample + concat + double-conv) via dedicated **model-surgery scripts (`akida_surgery.py`)** that strip and replace hardware-incompatible ops — standard batch-norm and transposed convolutions — so the network maps cleanly onto the Akida fabric. Used **MobileNetV2 / MobileNetV4-small** backbones through `segmentation-models-pytorch` + `timm`. A lightweight Akida-native preset reached **~82% of SOTA accuracy at 7.5% of the parameters**.

</details>

<details>
<summary>Level 3 — Evidence & method</summary>

- Trained on **Cityscapes** (19-class, mIoU ≈ 0.55 @ 384²) and **Portrait128** (binary, ≈ 0.97 IoU) — multi-GPU (RTX A6000), Albumentations augmentation (incl. simulated rain/fog), AdamW, BCE / DiceFocal loss, `ReduceLROnPlateau`, resumable checkpoints, torchmetrics IoU.
- Integrated **Quantization-Aware Training** with BrainChip's `quantizeml` + `cnn2snn` toolchain to convert float32 → INT8 deployable `.fbz` Akida models while recovering the mIoU lost to 8-bit precision.
- Solved high-res edge inference with a **"resize-for-training, tile-for-inference"** strategy and pioneered **"halo-tiling"** (overlapping patch margins) to eliminate tile-boundary artifacts during full-resolution reconstruction.
- Write-up: *"Model Surgery: Getting High-Resolution Segmentation onto Neuromorphic Silicon"* (see [Writing](/writing)). *The internship codebase is proprietary to BrainChip — no public repo.*

</details>
