# /orchestrate

Coordinates a multi-agent workflow for feature implementation using pazz-codebase-auditor → pazz-planner → pazz-coder → verification.

## Usage

```
/orchestrate "<scope>" [options]
```

## Arguments

- `<scope>` (required): The feature or change to implement, enclosed in quotes

## Options

- `--mode=<mode>`: Execution mode
  - `full` (default): Complete audit → plan → implement → verify cycle
  - `quick`: Skip initial audit for small changes
  - `plan`: Stop after planning phase for review
  
- `--constraints="<constraints>"`: Limitations and boundaries (comma-separated)
  - Default: "no breaking changes"
  
- `--context="<path>"`: Specific path or module to focus on
  - Default: "." (entire project)

## Examples

```bash
# Full workflow for new feature
/orchestrate "add CSV export to commission ledger"

# Quick fix without initial audit
/orchestrate "fix typo in dashboard" --mode=quick

# Plan only for review
/orchestrate "refactor client pipeline" --mode=plan

# With specific constraints
/orchestrate "add dark mode" --constraints="use existing tokens, no new dependencies"

# Focus on specific module
/orchestrate "optimize performance" --context="src/pages/Dashboard"

# Multiple constraints and context
/orchestrate "add notifications" --constraints="email only, use existing templates" --context="src/core/notifications"
```

## Workflow Phases

### Phase 1: AUDIT (pazz-codebase-auditor)
- Analyzes codebase structure and quality
- Identifies risks and opportunities
- Outputs: CODEBASE_AUDIT.md, CODEBASE_AUDIT.json
- Agent file: `.claude/agents/pazz-codebase-auditor.md`

### Phase 2: PLAN (pazz-planner)
- Creates detailed implementation plan
- Defines tasks, acceptance criteria, and test plans
- Outputs: IMPLEMENTATION_PLAN.yaml, RUN_CONTROLS.md
- Agent file: `.claude/agents/pazz-planner.md`

### Phase 3: IMPLEMENT (pazz-coder)
- Executes plan with TDD approach
- Writes tests first, then minimal code
- **IMPORTANT**: Uses `pnpm test:run` (not `pnpm test`) to run tests once and exit
- Outputs: PR_SUMMARY.md, STATUS.json
- Agent file: `.claude/agents/pazz-coder.md`

### Phase 4: VERIFY (pazz-reviewer)
- Performs delta audit on changes
- Checks for regressions and quality issues
- Outputs: VERIFICATION_REPORT.md
- Agent file: `.claude/agents/pazz-reviewer.md`

## Command Behavior

When this command is invoked, I will:

1. Parse your command to extract scope, mode, constraints, and context
2. Launch the appropriate sequence of specialized agents using the Task tool
3. Each agent will produce specific deliverables
4. Monitor progress and handle handoffs between agents
5. Provide a final summary with next steps

## Notes

- The command follows the Pazz Development Guide principles
- All changes adhere to the project's coding standards
- Tests are written before implementation (TDD)
- **Test Execution**: All agents must use `pnpm test:run` (not `pnpm test`) to avoid leaving Vitest processes running
  - `pnpm test:run` - Runs tests once and exits properly
  - `pnpm test` - Runs in watch mode and stays open (not for CI/automation)
- Each phase produces documented outputs for review
- You can interrupt at any phase if needed

## Related Commands

- Use individual agents directly if you only need one phase:
  - `pazz-codebase-auditor` for analysis only (`.claude/agents/pazz-codebase-auditor.md`)
  - `pazz-planner` for planning only (`.claude/agents/pazz-planner.md`)
  - `pazz-coder` for implementation only (`.claude/agents/pazz-coder.md`)
  - `pazz-reviewer` for code review (`.claude/agents/pazz-reviewer.md`)