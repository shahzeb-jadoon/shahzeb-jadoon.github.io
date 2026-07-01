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
    role: 'Graduate Research Trainee, NSF AWARE-AI NRT',
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

export const skillGroups = [
  { label: 'Edge AI & Co-Design', items: ['Edge AI', 'Hardware-Software Co-Design', 'INT8/FP16 Quantization', 'Quantization-Aware Training', 'Model Surgery', 'Neuromorphic (BrainChip Akida)', 'Pruning'] },
  { label: 'HPC & Systems', items: ['CUDA / cuBLAS', 'Nsight Compute', 'C / C++', 'HPC', 'Embedded (STM32 / FreeRTOS)'] },
  { label: 'ML / AI', items: ['PyTorch', 'Computer Vision', 'Semantic Segmentation', 'RWKV / Sequence Models', 'Imitation Learning', 'Reinforcement Learning', 'ONNX'] },
  { label: 'Autonomy', items: ['CARLA', 'Sensor Fusion', 'Depth Estimation', 'ROS2', 'Classical Control (Stanley / PID)'] },
  { label: 'LLM Infrastructure', items: ['FastAPI', 'LiteLLM', 'LangGraph', 'MCP', 'PostgreSQL', 'Docker', 'Cloudflare Zero Trust'] },
  { label: 'Quantum', items: ['PennyLane', 'Variational Quantum Circuits'] },
];
