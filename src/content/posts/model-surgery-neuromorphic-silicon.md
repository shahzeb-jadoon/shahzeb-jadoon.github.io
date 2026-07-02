---
title: "Model Surgery: Getting High-Resolution Segmentation onto Neuromorphic Silicon"
description: "How I mapped a high-res UNet onto BrainChip's Akida 2.0 — by operating on the network itself."
pubDate: 2025-09-15
tags: ["Edge AI", "Neuromorphic Computing", "Quantization", "Computer Vision", "BrainChip"]
cover: /media/akida-model-surgery.webp
coverAlt: "High-resolution semantic segmentation output from the Akida-native model."
ogImage: /og/model-surgery.jpg
alsoOn: https://www.linkedin.com/pulse/model-surgery-getting-high-resolution-segmentation-onto-jadoon-8uflc/
---

Most computer-vision models are trained as if memory and power are free. They aren't — not on the edge, and definitely not on neuromorphic hardware.

During my internship at BrainChip I spent the term on a single, stubborn question: can you run **high-resolution semantic segmentation** on the Akida 2.0 neuromorphic processor — an 8-bit integer fabric with hard limits on memory, operations, and bit-width?

The short answer is yes. But not by taking a standard model and "deploying" it. You have to operate on the network itself.

## The constraint that changes everything

A modern segmentation network — a UNet on a strong backbone — quietly assumes 32-bit floats, batch-norm everywhere, and transposed convolutions for upsampling. A neuromorphic fabric like Akida assumes almost none of that.

So the gap isn't a *porting* problem; it's a *representational* one. Several of the operators that make these models train well either don't exist or aren't efficient on the chip. That reframes the entire task:

> The model that trains beautifully on an A6000 is **not** the model that runs on the chip. The job is to design the second model so it preserves the accuracy of the first.

## Model surgery: replacing what the hardware won't run

I built a set of model-surgery scripts (`akida_surgery.py`) whose only purpose is to strip and replace hardware-incompatible operators:

- **Batch-norm** → folded/removed so there are no standalone normalization ops at inference.
- **Transposed convolutions** (the usual decoder upsampler) → swapped for an **Akida-native decoder**: nearest-neighbor upsample + concat + double-conv. Same job (recover spatial resolution), built only from operators the fabric supports.

I paired **MobileNetV2 / MobileNetV4-small** backbones (via `segmentation-models-pytorch` and `timm`) with that custom decoder — so the encoder was lightweight from the start and the decoder was hardware-legal by construction.

There was also a quieter, finicky layer: exporting through ONNX (HF Optimum) and using `onnxscript`'s rewriter to **sanitize** operators the toolchain choked on — splitting a kernel-5/stride-2 depthwise convolution, fixing padding mismatches, and so on. This is the unglamorous 80% of edge deployment: getting two toolchains to agree on what a layer actually *is*.

## Quantization-aware, not quantization-hopeful

8-bit integer inference is non-negotiable on this hardware, so I leaned on **Quantization-Aware Training** (via the `cnn2snn` / `quantizeml` toolchains) rather than hoping a post-training INT8 pass would survive. QAT lets the network *learn around* the precision loss during training, then exports to Akida's `.fbz` format.

On a segmentation map, that difference tends to be visible to the naked eye — boundaries stay crisp instead of dissolving.

## High resolution vs. on-chip memory: halo-tiling

Segmentation wants resolution; the chip has a memory budget. My fix was a **"resize-for-training, tile-for-inference"** strategy with **halo-tiling** (overlap-tile stitching): the image is processed in tiles with overlapping borders, so once they're stitched there are no seams along the tile edges. You get high-resolution output without ever holding a full high-res activation map in on-chip memory at once.

## Did it actually work?

A lightweight Akida-native preset reached **~82% of SOTA accuracy at 7.5% of the parameters — 4.6M vs 61.3M.**

- **Cityscapes** (19-class): mIoU ≈ 0.55 at 384×384
- **Portrait128** (binary): IoU ≈ 0.97

The headline isn't "we beat SOTA." It's that an order-of-magnitude smaller, hardware-legal, 8-bit model kept the overwhelming majority of the accuracy.

## Why I care about this

This is the actual shape of edge-AI work. The intelligence isn't the bottleneck — the **fit** is. A model is only as good as its ability to survive the memory, power, and operator constraints of the silicon it lands on.

Model surgery, QAT, and tiling aren't tricks. They're the discipline of treating the network and the hardware as one co-designed system.

If you're working on neuromorphic, on-device, or otherwise power-constrained inference — or hiring for it — I'd love to compare notes.
