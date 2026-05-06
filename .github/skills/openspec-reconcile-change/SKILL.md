---
name: openspec-reconcile-change
description: Reconcile implementation changes back into an active OpenSpec change before sync or archive. Use when apply work uncovered new behavior, flow changes, task adjustments, or design updates that should be written back into the change artifacts.
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: openspec
  version: '1.0'
  generatedBy: '1.2.0'
---

Reconcile implementation changes back into an active OpenSpec change before syncing specs or archiving.

Use this after apply work when implementation uncovered new edge cases, flow changes, task adjustments, or design decisions that are not yet reflected in the change artifacts.

**Goal**: Update the active change artifacts so they match the implemented behavior.

**Primary outputs:**

- Updated delta specs under `openspec/changes/<name>/specs/`
- Updated `tasks.md` to reflect actual completed or newly discovered work
- Updated `design.md` when implementation changed architecture, constraints, or flow
- Updated `proposal.md` only if the change scope or intent materially shifted

**Non-goals:**

- Do not archive the change
- Do not update main specs at `openspec/specs/` unless the user explicitly asks to run sync afterward
- Do not invent new requirements without evidence from the implementation, tests, or explicit user guidance

**Input**: Optionally specify a change name. If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:

   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `openspec list --json` to get available changes and use the **AskUserQuestion tool** to let the user select

   Always announce: "Using change: <name>" and how to override.

2. **Read current change context**

   Run:

   ```bash
   openspec status --change "<name>" --json
   ```

   Read all relevant change artifacts that exist:

   - `proposal.md`
   - `design.md`
   - `tasks.md`
   - delta specs under `openspec/changes/<name>/specs/*/spec.md`

3. **Inspect implementation evidence**

   Gather the implemented reality from available evidence, including:

   - current working tree changes relevant to the change
   - files touched by the implementation
   - tests added or updated
   - user-described adjustments made during apply

   Focus on behavior, flows, constraints, error handling, and task-level scope changes.

4. **Detect artifact drift**

   Compare the implementation evidence against the change artifacts and identify mismatches such as:

   - implemented behavior missing from delta specs
   - changed user or system flows not reflected in scenarios
   - error handling or fallback behavior added in code but absent from specs or design
   - completed work not reflected in `tasks.md`
   - new work discovered during implementation but not tracked in `tasks.md`
   - design assumptions invalidated by the final implementation
   - proposal scope or intent no longer matching what was actually built

5. **Update the change artifacts**

   Apply the smallest coherent set of changes needed.

   **Delta specs:**

   - Add or modify scenarios to reflect final implemented behavior
   - Update requirement wording when the implemented behavior materially differs
   - Add edge cases and failure paths that are now part of the intended behavior
   - Remove or adjust requirement text that no longer matches implementation

   **tasks.md:**

   - Mark completed tasks accurately
   - Add newly discovered implementation tasks if they were necessary to complete the change
   - Avoid turning `tasks.md` into a changelog; keep it as actionable work history for the change

   **design.md:**

   - Update architecture notes, tradeoffs, constraints, or data or control flow when implementation changed them

   **proposal.md:**

   - Only update if the change's scope, motivation, or expected outcome materially changed

6. **Handle ambiguity explicitly**

   If a discrepancy could mean a temporary workaround, an accidental implementation detail, or a true behavior change, stop and ask the user before writing it into specs.

7. **Show reconciliation summary**

   Summarize:

   - which artifacts were updated
   - what drift was resolved
   - anything still ambiguous or intentionally left unchanged

   If the change now looks ready to land, suggest sync and archive next.

**Guardrails**

- Prefer updating change artifacts before touching main specs
- Reconcile behavior, not low-level code structure
- Do not treat every implementation detail as spec-worthy
- Preserve artifact sections that are still accurate
- Keep changes idempotent where practical
- If evidence is weak or contradictory, ask instead of guessing
