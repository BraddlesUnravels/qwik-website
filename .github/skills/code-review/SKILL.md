---
name: code-review
description: Review proposed repository changes for concrete regressions and defects without modifying files.
---

# Code review

Use for reviewing a diff, pull request, or proposed change. This is a read-only review, not an implementation task or a general security audit.

1. Establish the exact review target and base. Inspect the worktree and diff; do not include unrelated or pre-existing changes in the review.
2. Read the full relevant diff, then inspect surrounding code, callers, tests, and task-specific guidance. Trace changed behavior through its actual entry points and data flow.
3. Check for defects introduced by the change: incorrect behavior, broken contracts, unsafe input/data handling, security boundary regressions, error-path failures, accessibility regressions, and missing tests for changed behavior. Consider realistic edge cases; avoid speculative concerns and style-only preferences.
4. Verify each potential finding against the code and, when practical, run the narrowest relevant check from [docs/testing.md](../../../docs/testing.md). Do not change files. If validation is unavailable or too broad, state what was not checked.
5. Report only actionable defects caused by the reviewed change. For each, include severity, exact file and line, the triggering condition and impact, and a concise fix direction. Order findings from highest to lowest severity; do not duplicate them or bury them in a general summary.
6. If no qualifying defects remain, say `No findings.` Briefly note material validation limits separately; do not imply that unrun checks passed.

Use the repository's existing review format when one is specified. Otherwise use P1 for high-impact breakage or a serious security/data-integrity issue, P2 for a normal functional defect, and P3 only for a lower-impact defect that still has a concrete user or operational consequence. Do not raise a finding solely to suggest a refactor, preference, or hypothetical improvement.

For an explicitly security-focused review or request to find exploitable vulnerabilities, follow the dedicated security-review workflow first rather than treating this skill as a substitute.
