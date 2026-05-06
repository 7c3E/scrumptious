---
description: Reconcile implementation changes back into an active OpenSpec change before sync or archive
---

Reconcile implementation changes back into an active OpenSpec change before syncing specs or archiving.

Use this after `/opsx:apply` when implementation uncovered new edge cases, flow changes, task adjustments, or design decisions that are not yet reflected in the change artifacts.

**Goal**: Update the active change artifacts so they match the implemented behavior.

**Primary outputs:**

- Updated delta specs under `openspec/changes/<name>/specs/`
- Updated `tasks.md` to reflect actual completed or newly discovered work
- Updated `design.md` when implementation changed architecture, constraints, or flow
- Updated `proposal.md` only if the change scope or intent materially shifted

**Non-goals:**

- Do not archive the change
- Do not update main specs at `openspec/specs/` unless the user explicitly asks to run `/opsx:sync` afterward
- Do not invent new requirements without evidence from the implementation, tests, or explicit user guidance

**Input**: Optionally specify a change name after `/opsx:reconcile` (e.g., `/opsx:reconcile add-auth`). If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:

   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `openspec list --json` to get available changes and use the **AskUserQuestion tool** to let the user select

   Always announce: "Using change: <name>" and how to override (e.g., `/opsx:reconcile <other>`).

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

   Focus on behavior, flows, constraints, error handling, edge cases, and task-level scope changes.

4. **Detect artifact drift**

   Compare the implementation evidence against the change artifacts and identify mismatches such as:

   - implemented behavior missing from delta specs
   - changed user/system flows not reflected in scenarios
   - error handling or fallback behavior added in code but absent from specs/design
   - completed work not reflected in `tasks.md`
   - new work discovered during implementation but not tracked in `tasks.md`
   - design assumptions invalidated by the final implementation
   - proposal scope or intent no longer matching what was actually built

5. **Update the change artifacts**

   Apply the smallest coherent set of changes needed:

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

   - Update architecture notes, tradeoffs, constraints, or data/control flow when implementation changed them

   **proposal.md:**

   - Only update if the change's scope, motivation, or expected outcome materially changed

6. **Handle ambiguity explicitly**

   If a discrepancy could mean either:

   - a temporary workaround,
   - an accidental implementation detail, or
   - a true behavior change,

   stop and ask the user before writing it into specs.

7. **Show reconciliation summary**

   Summarize:

   - which artifacts were updated
   - what drift was resolved
   - anything still ambiguous or intentionally left unchanged

   If the change now looks ready to land, suggest:

   - `/opsx:sync <name>` to update main specs
   - `/opsx:archive <name>` after sync/review

**Output On Success**

```markdown
## Change Reconciled: <change-name>

Updated artifacts:

- specs/<capability>/spec.md: added 2 scenarios for retry and fallback behavior
- tasks.md: marked 3 tasks complete, added 1 follow-up task discovered during implementation
- design.md: updated flow notes for approval handoff

Resolved drift:

- Final implementation includes fallback behavior that was not captured in the original spec
- Error handling path now documented in the change artifacts

Next steps:

- Run `/opsx:sync <change-name>` to update main specs
- Run `/opsx:archive <change-name>` when ready
```

**Guardrails**

- Prefer updating change artifacts before touching main specs
- Reconcile behavior, not low-level code structure
- Do not treat every implementation detail as spec-worthy
- Preserve artifact sections that are still accurate
- Keep changes idempotent where practical
- If evidence is weak or contradictory, ask instead of guessing
