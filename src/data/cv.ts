// Shared résumé data — feeds both the home Experience section and /cv.
// Facts only; keep in sync with the Master Career Database.

export const experience = [
  {
    role: 'Machine Learning Engineer Intern',
    org: 'BrainChip',
    period: 'May–Sep 2025 · Remote',
    note: 'End-to-end PyTorch→Akida pipeline for high-res semantic segmentation on Akida 2.0 neuromorphic silicon — ~82% of SOTA accuracy at 7.5% of the parameters. Hardware-aware model surgery; INT8 QAT; pioneered halo-tiling.',
  },
  {
    role: 'NSF AWARE-AI Graduate Research Trainee',
    org: 'RIT',
    period: 'Apr 2025–May 2026 · Rochester, NY',
    note: 'Monocular depth estimation as a low-cost LiDAR alternative; benchmarked MiDaS / Depth-Anything on abs-rel error and latency; developing a hybrid supervised + self-supervised method.',
  },
  {
    role: 'Graduate Researcher, Social Robotics',
    org: 'RIT',
    period: 'Sep 2025–May 2026 · Rochester, NY',
    note: 'Built the group’s production multi-agent robot-robot platform (RRI Orchestrator): async FastAPI, LiteLLM, PostgreSQL, Cloudflare Zero Trust + RBAC.',
  },
  {
    role: 'Teaching Assistant — Generative AI, Real-Time & Embedded, Classical Control',
    org: 'RIT',
    period: '2025–2026 · Rochester, NY',
    note: 'Developed the curriculum for RIT’s new Intro to Generative AI; mentored bare-metal/FreeRTOS firmware on STM32; guided HIL control on the Quanser Qube-Servo2.',
  },
];

export const education = [
  {
    school: 'Rochester Institute of Technology',
    degree: 'MS, Computer Engineering (Project Option)',
    period: 'Aug 2024 – May 2026',
  },
  {
    school: 'Wartburg College',
    degree: 'BA, Computer Science & Actuarial Science (double major) — minors: Data Analytics, Economics',
    period: 'Aug 2016 – May 2020',
  },
  {
    school: 'United World College Costa Rica',
    degree: 'International Baccalaureate Diploma · Davis UWC Scholar',
    period: '2014 – 2016',
  },
];

// Six groups (renders 3×2), titled with industry-standard names. Category
// labels don't repeat as items, and every item is interview-defensible.
export const skillGroups = [
  {
    label: 'Model Optimization & Edge Deployment',
    items: ['INT8/FP16 Quantization', 'Quantization-Aware Training', 'Pruning & Model Compression', 'Neuromorphic Hardware (BrainChip Akida)', 'ONNX', 'Edge Inference Optimization'],
  },
  {
    label: 'Machine Learning & Computer Vision',
    items: ['PyTorch', 'Semantic Segmentation', 'Depth Estimation', 'RWKV / Sequence Models', 'Imitation Learning', 'Reinforcement Learning'],
  },
  {
    label: 'GPU & Systems Programming',
    items: ['CUDA / cuBLAS', 'Nsight Compute', 'C / C++', 'Embedded (STM32 / FreeRTOS)', 'High-Performance Computing'],
  },
  {
    label: 'Autonomous Systems & Robotics',
    items: ['CARLA Simulator', 'ROS2', 'Sensor Fusion', 'Classical Control (Stanley / PID)', 'Large-Scale Data Pipelines (HDF5)'],
  },
  {
    label: 'LLM & Agent Systems',
    items: ['FastAPI', 'LiteLLM', 'LangGraph', 'MCP', 'RAG', 'PostgreSQL', 'Docker', 'Cloudflare Zero Trust'],
  },
  {
    label: 'Languages, Tooling & Quantum',
    items: ['Python', 'Anaconda', 'Git / GitHub Actions', 'pytest / CI', 'Linux / WSL2', 'PennyLane', 'Variational Quantum Circuits'],
  },
];
