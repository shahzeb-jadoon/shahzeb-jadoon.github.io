---
title: RRI Orchestrator
blurb: Production multi-agent LLM platform that decouples the LLM "brain" from ROS2-ready robot "bodies", built for an RIT social-robotics research group.
period: Oct 2025 – present
org: RIT (Principles of Robotics, EEEE 685)
role: Solo
featured: true
order: 3
metrics:
  - { value: "Live", label: "deployed at rri.zylot.tech (access-controlled)" }
  - { value: "GPT-4o · Gemini · Claude", label: "multi-provider LLM routing via LiteLLM" }
  - { value: "RBAC + CI", label: "async FastAPI, PostgreSQL, Cloudflare Zero Trust" }
tags: ["FastAPI", "LiteLLM", "PostgreSQL", "Cloudflare Zero Trust", "Multi-Agent", "ROS2-ready"]
link: https://rri.zylot.tech
---

A production-deployed, full-stack research platform for studying autonomous LLM-driven robot-robot interaction. It decouples the LLM "brain" from the robot "body" (**ROS2-ready**), self-hosted on a personal Ubuntu server and exposed securely to the internet via Cloudflare Tunnel.

<details open>
<summary>Level 2 — Architecture</summary>

Async **FastAPI/Starlette** core with **LiteLLM** multi-provider routing (Gemini / OpenAI / Anthropic) featuring dynamic API-based model discovery + 24h cache, deprecated-model migration, tiktoken token/cost tracking, and context-window summarization. **PostgreSQL 16** (Tortoise ORM, Aerich migrations). Security via **Cloudflare Zero Trust SSO** through custom header-auth middleware, **RBAC** (admin/researcher), and an account-approval workflow. Background `BatchExecutor` for CSV/JSON batch experiments with concurrency control, retry/backoff, and pause/resume.

</details>

<details>
<summary>Level 3 — Evidence & honest caveats</summary>

- Engineering: Docker Compose, scheduled `pg_dump` backups, a systemd auto-start service, GitHub Actions CI/CD, a pytest suite, and `uv` dependency management; MVVM `@ui.refreshable` ViewModels for zero-flicker live batch monitoring.
- **Honest caveat:** a cyclic **LangGraph + MCP** refactor exists as a **tested scaffold on a branch** (10 tests + CI: supervisor↔tool loop, SQLite + PostgreSQL MCP servers, self-consistency variance gate, human-in-the-loop interrupt/resume) — it is **not yet wired into the live platform**.
- The live deployment is access-controlled; the link above reaches the login-gated platform.

</details>
