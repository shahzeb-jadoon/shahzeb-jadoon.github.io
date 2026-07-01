// Single source of truth for identity + JSON-LD. Keep this factual and non-fabricated.
export const site = {
  name: 'Shahzeb Jadoon',
  // One-line positioning — the "variance budget" framing from the LinkedIn About.
  role: 'AI/ML Engineer — Edge AI & Hardware-Software Co-Design',
  tagline:
    'Getting deep models to run efficiently on small, power-constrained hardware.',
  location: 'Rochester, NY, USA',
  email: 'shahzeb.jadoon.sj@gmail.com',
  url: 'https://shahzeb-jadoon.github.io',
  github: 'https://github.com/shahzeb-jadoon',
  linkedin: 'https://www.linkedin.com/in/shahzebkjadoon',
  // knowsAbout drives the JSON-LD entity graph — concrete tools/terms, not vague copy.
  knowsAbout: [
    'Edge AI',
    'Hardware-Software Co-Design',
    'Model Quantization (INT8/FP16)',
    'Quantization-Aware Training',
    'CUDA / cuBLAS',
    'Neuromorphic Computing',
    'BrainChip Akida',
    'Semantic Segmentation',
    'Autonomous Vehicles',
    'RWKV / Sequence Modeling',
    'PyTorch',
    'Multi-Agent LLM Systems',
    'High Performance Computing',
  ],
  alumniOf: [
    { name: 'Rochester Institute of Technology', degree: 'MS, Computer Engineering' },
    { name: 'Wartburg College', degree: 'BA, Computer Science & Actuarial Science' },
  ],
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
];
