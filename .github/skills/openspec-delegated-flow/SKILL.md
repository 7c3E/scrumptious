---
name: openspec-delegated-flow
description: 'Use when the user wants one GitHub Copilot entry point for OpenSpec explore, propose, and apply with context isolation. Prefer the orra-opsx-flow-orchestrator agent or the /orra-opsx-flow command instead of doing the full workflow inline.'
argument-hint: 'Goal, feature, or change to take through explore, propose, and apply'
---

# OpenSpec Delegated Flow

Use this skill when the user wants the OpenSpec workflow to feel like one operation but still wants isolation between exploration, proposal creation, and implementation.

## Purpose

The goal is not just convenience. The goal is to avoid one shared context collapsing the three stages into a muddled blend of planning and implementation.

## Preferred Entry Points

Prefer one of these in order:

1. The `orra-opsx-flow-orchestrator` custom agent.
2. The `/orra-opsx-flow` prompt command.
3. Manual stage commands only if custom agents are unavailable.

## Procedure

1. Route the request to the orchestrator entry point instead of doing the work inline.
2. Keep exploration, proposal generation, and implementation in separate subagent contexts.
3. Continue automatically from one stage to the next only when the previous stage reports ready.
4. Stop early and summarize blockers when a stage is not ready.

## Guardrails

- Do not use this skill to bypass the stage boundaries.
- Do not treat a skill alone as enforcement. The custom agent is the enforcement mechanism.
- Do not fall back to a single shared-context workflow unless the environment cannot run custom agents.
