# Pazz Affiliate Portal - Agent System

This directory contains specialized AI agents for the Pazz Affiliate Portal development workflow.

## 🤖 Available Agents

### 1. pazz-codebase-auditor
**Purpose**: Analyzes codebase structure, quality, and identifies opportunities  
**Outputs**: CODEBASE_AUDIT.md, CODEBASE_AUDIT.json  
**Use When**: Starting new features, understanding existing code, identifying technical debt

### 2. pazz-planner
**Purpose**: Creates detailed implementation plans from requirements and audit findings  
**Outputs**: IMPLEMENTATION_PLAN.yaml, RUN_CONTROLS.md  
**Use When**: Planning features, breaking down complex work, defining acceptance criteria

### 3. pazz-coder
**Purpose**: Executes implementation plans with TDD approach and quality checks  
**Outputs**: PR_SUMMARY.md, STATUS.json, implementation diffs  
**Use When**: Implementing features, writing tests, applying fixes

### 4. pazz-reviewer
**Purpose**: Performs comprehensive code review and quality validation  
**Outputs**: VERIFICATION_REPORT.md with quality scores  
**Use When**: Reviewing changes, validating implementations, final quality checks

## 🚀 Usage

### Via Orchestrate Command
The primary way to use these agents is through the `/orchestrate` command:

```bash
/orchestrate "add CSV export to commission ledger"
/orchestrate "implement dark mode" --constraints="use existing tokens"
/orchestrate quick "fix typo in navigation"
```

### Direct Agent Invocation
You can also invoke agents directly using the Task tool:

```javascript
// For auditing
await Task({
  description: "Audit dashboard performance",
  subagent_type: "general-purpose",
  prompt: "[Contents of pazz-codebase-auditor.md with specific scope]"
});

// For planning
await Task({
  description: "Plan commission export feature",
  subagent_type: "general-purpose",
  prompt: "[Contents of pazz-planner.md with requirements]"
});

// For coding
await Task({
  description: "Implement commission export",
  subagent_type: "general-purpose",
  prompt: "[Contents of pazz-coder.md with plan]"
});

// For reviewing
await Task({
  description: "Review commission export implementation",
  subagent_type: "general-purpose",
  prompt: "[Contents of pazz-reviewer.md with changes]"
});
```

## 📋 Agent Workflow

```
1. AUDIT (pazz-codebase-auditor)
   ↓ HANDOFF_TO_PLANNER
2. PLAN (pazz-planner)
   ↓ HANDOFF_TO_CODER
3. IMPLEMENT (pazz-coder)
   ↓ HANDOFF_TO_REVIEWER
4. VERIFY (pazz-reviewer)
   ↓ VERIFICATION_COMPLETE
```

## 🎯 Key Features

Each agent:
- **Follows CLAUDE.md guidelines** strictly
- **Uses all quality shortcuts** (QNEW, QPLAN, QCODE, QCHECK, etc.)
- **Understands business domain** (commissions, affiliates, pipelines)
- **Maintains quality standards** (>93% test coverage, <6MB bundle)
- **Produces structured outputs** for review and documentation

## 📊 Quality Standards

All agents enforce:
- **Test Coverage**: >93%
- **Bundle Size**: <6MB gzipped
- **Type Safety**: TypeScript strict mode, no `any`
- **Performance**: No degradation from baseline
- **Security**: No exposed credentials or vulnerabilities
- **Accessibility**: WCAG AA compliance
- **Design System**: Consistent token usage
- **Mobile First**: Responsive on all devices

## 🔧 Customization

To modify agent behavior, edit the corresponding `.md` file in this directory. Each agent file contains:
- Mission statement
- Core competencies
- Detailed protocols
- Deliverable templates
- Handoff instructions
- Quality standards

## 📝 Notes

- Agents use `pnpm test:run` (not `pnpm test`) to avoid watch mode
- All agents apply QCHECK shortcuts for quality validation
- Deliverables are generated as actual files for documentation
- Each agent maintains clean handoffs with clear signals
- The reviewer agent is intentionally skeptical for quality assurance

## 🚨 Important

- **NO PRE-COMMIT HOOKS**: They cause data loss
- **Mock Backend**: All data operations use unifiedMockBackend
- **Commission Accuracy**: Business-critical, must be 100% accurate
- **Mobile First**: Test on all devices
- **Performance Budget**: Stay under 6MB bundle size

For more details, see the main documentation:
- `/docs/DEVELOPMENT-GUIDE.md`
- `/CLAUDE.md`
- `/.claude/commands/orchestrate.md`