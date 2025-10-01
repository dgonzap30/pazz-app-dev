# Pazz Portal - Development Guide

## 🎯 Project Overview

**Product Name:** Pazz Portal

**Design Philosophy:** Professional, transparent, and trustworthy.

**Development Philosophy:** Maximum value for minimum complexity - choose proven patterns over clever solutions.

**Documentation Hub:**
All documentation is organized in the `/docs` folder:
- Design principles: `docs/DESIGN-PRINCIPLES.md`
- TypeScript guidelines: `docs/TYPESCRIPT-GUIDELINES.md`

---

## 🏗️ Architecture & Tech Stack

### Core Principles
1. **Simplicity First** - Choose boring technology that works
2. **Performance Budget** - Target under 6MB gzipped (reasonable for enterprise applications while maintaining optimization focus)
3. **Developer Velocity** - Optimize for fast iteration
4. **Type Safety** - Catch errors at compile time
5. **Design Excellence** - Professional UI following established design system
6. **User Experience** - Every interaction should feel polished and intentional

| Layer        | Choice                                                           | Reason                                     |
| ------------ | ---------------------------------------------------------------- | ------------------------------------------ |
| **Frontend** | React 18 + Vite + TypeScript (strict)                            | Fast, lean build, tree‑shake friendly      |
| **Styling**  | Tailwind CSS + Radix UI primitives                               | Dead‑simple theming, accessible components |
| **State**    | React Context (local) + TanStack Query (server)                  | Minimal boilerplate, no Redux              |
| **Backend**  | Stub Auth (Enterprise Backend Ready)                             | Minimal stub for backend integration       |
| **Testing**  | Vitest + Testing Library                                         | Works in Vite, fast watch mode             |
| **CI**       | GitHub Action: `pnpm install → build → lint → type‑check → test → size-limit` | Catch breakages pre‑merge                  |
| **Deploy**   | Vercel (web)                                                     | One‑click preview deployments              |

### Project Structure (Simple Vite)

```plaintext
src/
├── types/           # TypeScript type definitions
├── ui/              # Reusable UI components (primitives)
├── core/            # Business logic, hooks, utilities
├── pages/           # Page-level components (routes)
├── components/      # App-specific components (features)
├── styles/          # Global styles and design tokens
├── main.tsx         # Application entry point
└── App.tsx          # Root component & routing

docs/                # Comprehensive documentation
```

*Simple, flat structure optimized for development speed and maintainability.*

---

## 📂 Source‑Code Conventions

### Directory Structure

```
src/
  types/           # TypeScript type definitions
  ui/              # Reusable UI components (primitives)
  core/            # Business logic, hooks, utilities
  pages/           # Page-level components (route handlers)
  components/      # App-specific components (feature components)
  styles/          # Global styles and design tokens
  main.tsx         # Application entry point
  App.tsx          # Root component & routing
```

### Architectural Layers

1. **UI Layer (`/ui/`)**: Pure presentational primitives
   - No business logic, just props and styling
   - Follows design system tokens from DESIGN-PRINCIPLES.md
   - Examples: Button, Card, Modal, Input, Badge, Spinner
   - Uses CVA (class-variance-authority) for variant management

2. **Component Layer (`/components/`)**: Feature-specific compositions
   - Composed from UI primitives
   - Accept typed props, minimal state
   - Implements experience pillars: transparency, momentum, control

3. **Page Layer (`/pages/`)**: Route orchestration
   - Data fetching via React Query with proper caching
   - Error/loading state handling with skeletons
   - Compose feature components into user journeys

* Import path alias: `@/*` (e.g., `@/core/hooks`)
* **Error UX:** Use `@/ui/toast` for API error surfaces; avoid `alert()`

### Business Logic Rules

1. **Pure functions** in `src/core/utils`; unit‑test each edge case
2. **State transitions** are explicit and validated
3. Keep logic simple and testable

---

## 🧪 Testing Checklist

* Unit tests co‑located next to source (`*.test.ts`)
* Integration test for critical user journeys
* Current coverage target: **>93%**
* E2E tests for critical user journeys (Playwright/Cypress)

---

## 🚀 Dev Workflow

```bash
pnpm install      # fresh install
pnpm dev          # Vite dev server @ localhost:5173
pnpm test         # Vitest in watch mode
pnpm test:run     # Run tests once and exit
pnpm lint         # ESLint check
pnpm type-check   # TypeScript validation
pnpm build        # Production build
pnpm size-limit   # Bundle size check
```

**CI Pipeline:** `pnpm install → lint → type-check → test:run → build → size-limit` (enforces 6MB bundle limit).

---

## 📋 Implementation Guidelines

### 0 — Purpose & Domain Context

These rules ensure maintainability and developer velocity for a **professional web application**.

**MUST** rules are critical; **SHOULD** rules are recommendations.

**Design North Star:** Professional, transparent, trustworthy.

**Experience Pillars:**
1. **Transparency** - Clear, obvious user flows
2. **Momentum** - Actions feel rewarding
3. **Control** - Users manage their experience
4. **Credibility** - Feels like a real professional platform
5. **Simplicity** - Focus on core features, no clutter

---

### 1 — Before Coding

- **BP-1 (MUST)** Keep it simple - if unsure, choose the simpler approach.
- **BP-2 (SHOULD)** Ask clarifying questions to understand requirements fully.
- **BP-3 (SHOULD)** Confirm approach for any feature beyond basic CRUD.
- **BP-4 (SHOULD)** If ≥ 2 approaches exist, list clear pros and cons.

---

### 2 — While Coding

- **C-1 (MUST)** Write minimal, working code first - optimize later if needed.
- **C-2 (SHOULD)** Follow TDD when practical: scaffold stub → write failing test → implement.
- **C-3 (MUST)** Use consistent vocabulary throughout the codebase.
- **C-4 (SHOULD NOT)** Over-engineer - no classes, patterns, or abstractions unless essential.
- **C-5 (SHOULD)** Keep functions pure and testable where possible.
- **C-6 (SHOULD NOT)** Extract new functions unless reused elsewhere, needed for unit testing, or drastically improves readability.
- **C-7 (MUST)** Use TypeScript strict mode - catch errors early.
- **C-8 (MUST)** Use `import type { … }` for type-only imports.
- **C-9 (SHOULD NOT)** Add real-time features initially - keep it request/response.
- **C-10 (SHOULD NOT)** Add comments unless absolutely critical - prefer self-explanatory code.
- **C-11 (MUST)** Follow design system tokens for all styling.
- **C-12 (MUST)** Implement proper loading, error, and empty states.

---

### 3 — Testing Strategy

- **T-1 (MUST)** Write at least one test for business logic functions.
- **T-2 (SHOULD)** Colocate tests in `*.test.ts` files next to source files.
- **T-3 (MUST)** Test critical business logic thoroughly with edge cases.
- **T-4 (SHOULD)** Separate pure-logic unit tests from integration tests.
- **T-5 (SHOULD)** Test the entire structure in one assertion when possible:
  ```ts
  expect(result).toEqual({ value: 15 }) // ✅ Good

  expect(result.value).toBe(15);        // ❌ Avoid multiple assertions
  ```
- **T-6 (SHOULD NOT)** Add tests that can't fail for real defects - every test must catch bugs.
- **T-7 (SHOULD)** Parameterize test inputs - avoid unexplained literals like 42 or "foo".

---

### 4 — Data Management Patterns

- **D-1 (MUST)** Keep data operations simple and predictable.
- **D-2 (SHOULD)** Use React Query for caching and state management.
- **D-3 (MUST)** Handle errors gracefully - show user-friendly messages.

---

### 5 — Code Organization

- **O-1 (MUST)** Use the flat structure: `src/{types,ui,core,pages,components,styles}`
- **O-2 (MUST)** Keep all business logic in `src/core`
- **O-3 (SHOULD)** Export through barrel exports (`index.ts`)
- **O-4 (MUST)** Use `@/*` import aliases instead of relative paths
- **O-5 (MUST)** Follow component architecture: UI → Components → Pages
- **O-6 (SHOULD)** Co-locate tests with source files (`*.test.ts`)

---

### 6 — Performance

- **P-1 (MUST)** Show loading states for all async operations.
- **P-2 (SHOULD)** Use React Query for server state caching.
- **P-3 (SHOULD NOT)** Optimize prematurely - get it working first.
- **P-4 (MUST)** Keep bundle size under 6MB gzipped (optimize for <5MB when possible).
- **P-5 (SHOULD)** Use skeleton screens for perceived performance.
- **P-6 (SHOULD)** Implement code splitting at route level.
- **P-7 (MUST)** Optimize images (WebP with fallbacks).

---

### 7 — Tooling

- **G-1 (MUST)** TypeScript must compile with no errors.
- **G-2 (SHOULD)** Keep build time under 30 seconds.
- **G-3 (MUST)** Use `pnpm` for package management.

---

### 8 — Git & Deployment

- **GH-1 (MUST)** Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`
- **GH-2 (SHOULD)** Deploy to Vercel for automatic previews
- **GH-3 (MUST)** Never commit `.env` files
- **GH-4 (MUST)** NO PRE-COMMIT HOOKS - they cause data loss and session resets
- **GH-5 (MUST)** Tag releases with `vMAJOR.MINOR.PATCH`
- **GH-6 (SHOULD)** Write meaningful commit messages that explain the "why"

---

## 📋 Writing Functions Best Practices

When evaluating whether a function is good, use this checklist:

1. **Can you read the function and HONESTLY understand it immediately?** If yes, ship it.
2. **Is it doing one thing?** If not, split it.
3. **Is it testable?** If not, remove side effects.
4. **Is the name clear?** If not, rename it.
5. **Are the types explicit?** If not, add proper TypeScript types.
6. **Does it have high cyclomatic complexity?** Too many nested if/else = refactor.
7. **Are there unused parameters?** Remove them.
8. **Are there unnecessary type casts?** Move to function arguments.
9. **Any hidden dependencies?** Factor them into arguments.

**IMPORTANT**: Don't over-engineer. Simple > Clever.

**Example of good function:**
```typescript
export const formatCurrency = (amount: number, currency: string = 'MXN'): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
  }).format(amount);
};
```

**When to extract a function:**
- It's used in more than one place
- It's the only way to unit test untestable logic
- The original function is extremely hard to follow

---

## 🧪 Writing Tests Best Practices

When evaluating test quality, use this checklist:

1. **Test business logic** - Core functionality must be correct
2. **Test happy paths** - Basic flows should work
3. **Test edge cases** - Boundaries, unexpected input, realistic scenarios
4. **One logical assertion per test** - Keep tests focused
5. **Test behavior, not implementation** - Focus on outcomes
6. **Parameterize inputs** - Never embed unexplained literals like 42 or "foo"
7. **Use strong assertions** - `toEqual(1)` not `toBeGreaterThanOrEqual(1)`
8. **Group by function** - Use `describe(functionName, () => ...)`
9. **No trivial tests** - Every test must catch real defects

**Example test structure:**
```typescript
describe('formatCurrency', () => {
  test('formats MXN correctly', () => {
    const amount = 1000;
    expect(formatCurrency(amount)).toBe('$1,000.00');
  });

  test('handles zero amount', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
```

---

## 🚀 Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev                    # Start web app at localhost:5173

# Quality checks
pnpm lint                  # Run linting
pnpm type-check           # Check types
pnpm test                 # Run tests (watch mode)
pnpm test:run             # Run tests once and exit
```

### Production Commands

```bash
# Build for production
pnpm build

# Check bundle size (must be under 6MB gzipped, target <5MB)
pnpm size-limit

# Run specific test
pnpm test <test-name>
pnpm test:run <test-name>  # Run specific test once and exit

# Pre-deployment checks
pnpm ci                   # Run all checks (lint, type-check, test, build)
```

---

## 📖 Important Reminders

### Technical Excellence
- **Keep it simple** - Maximum value for minimum complexity
- **Type safety is mandatory** - No `any` types, explicit interfaces
- **Performance matters** - Stay under 6MB bundle size (optimize for <5MB when feasible)
- **NO PRE-COMMIT HOOKS** - They cause session resets and data loss
- **Design system adherence** - Every component follows established patterns
- **Mobile-first approach** - Test BottomNavBar and viewport detection
- **Test coverage target** - Maintain >93% coverage

### Development Philosophy
- **Test critical paths** - Focus on business logic and user journeys
- **Ship working features** - Polish comes through iteration
- **User experience first** - Every interaction should feel polished
- **Design consistency** - Follow the design system religiously
- **Progressive enhancement** - Mobile first, enhance for desktop
- **Accessibility matters** - WCAG AA compliance is non-negotiable
- **Clean up as you go** - Remove console.warn statements before committing
- **Performance monitoring** - Add React.memo to frequently re-rendered components

### Design Implementation
- **Follow experience pillars** - Transparency, momentum, control, credibility, simplicity
- **Use design tokens** - Colors, spacing, typography from design system
- **Implement all states** - Loading (skeletons), empty (helpful CTAs), error (retry options)
- **Motion with purpose** - Subtle transitions that enhance UX
- **Responsive patterns** - Stack → Grid, horizontal scroll → Grid, collapsed → Full

---

## 🚀 Remember Shortcuts

The following shortcuts can be invoked at any time during development:

### QNEW
When typed, this means:
```
Understand all BEST PRACTICES listed in CLAUDE.md.
Your code SHOULD ALWAYS follow these best practices.
Check /docs folder for latest documentation updates.
```

### QPLAN
When typed, this means:
```
Analyze similar parts of the codebase and determine whether your plan:
- is consistent with rest of codebase
- introduces minimal changes
- reuses existing code
```

### QCODE
When typed, this means:
```
Implement your plan with minimal code.
Run tests to verify functionality.
Run `pnpm type-check` to ensure no TypeScript errors.
```

### QCHECK
When typed, this means:
```
You are a SKEPTICAL senior software engineer. Perform comprehensive quality checks on the major code just written against best practices.

1. Code Quality (C-1 to C-12):
   - Minimal working code? (C-1)
   - Consistent vocabulary used? (C-3)
   - No over-engineering? (C-4)
   - Functions pure and testable? (C-5)
   - No unnecessary function extraction? (C-6)
   - TypeScript strict mode? (C-7)
   - import type used correctly? (C-8)
   - No unnecessary comments? (C-10)
   - Design system tokens followed? (C-11)
   - Loading/error/empty states implemented? (C-12)

2. Testing Quality (T-1 to T-7):
   - Business logic tested? (T-1)
   - Tests colocated in *.test.ts? (T-2)
   - Critical logic tested thoroughly? (T-3)
   - Unit/integration tests separated? (T-4)
   - Single assertion pattern used? (T-5)
   - No trivial tests? (T-6)
   - Inputs parameterized? (T-7)

3. Function Quality Checklist:
   - Readable immediately?
   - Single responsibility?
   - Testable without side effects?
   - Clear naming?
   - Explicit types, no 'any'?
   - Low cyclomatic complexity?
   - No unused parameters?
   - No unnecessary type casts?
   - No hidden dependencies?

4. Test Quality Checklist:
   - Business logic tested correctly?
   - Happy paths covered?
   - Edge cases tested?
   - One logical assertion per test?
   - Testing behavior not implementation?
   - Inputs parameterized?
   - Strong assertions used?
   - Tests grouped by function?
   - No trivial tests?

5. Implementation Verification:
   - Data patterns followed? (D-1 to D-3)
   - Code organization correct? (O-1 to O-6)
   - Performance guidelines met? (P-1 to P-7)
   - TypeScript compiles? (pnpm type-check)
   - Tests pass? (pnpm test)
```

### QDESIGN
When typed, this means:
```
Apply the Pazz Design System from DESIGN-PRINCIPLES.md:

1. Experience Pillars Check:
   - Transparency: Are statuses clear?
   - Momentum: Do actions feel rewarding?
   - Control: Can users self-service?
   - Credibility: Does it feel like a real professional platform?
   - Simplicity: Is the interface minimal and focused?

2. Visual Design Tokens:
   - Colors: Vivid saturated palette - primary #FF7A00, success #00E676, warning #FFB020, danger #FF5252
   - Additional vivid accents: purple #9C27B0, blue #2196F3, teal #00BCD4
   - Typography: 8pt vertical rhythm, slate text scale
   - Spacing: 8pt grid (4px, 8px, 16px, 24px, 32px)
   - Elevation: rounded-lg cards, shadow-sm default
   - Focus states: 3px orange ring with 0.4 opacity

3. Component Patterns:
   - Cards: rounded-lg, p-4, shadow-sm, white bg, hover lift
   - Buttons: 40px height, 16px padding, clear hierarchy (primary/secondary/ghost)
   - Forms: labels above, 8px gap, inline validation, error messages below
   - Tables: right-align numbers, left-align text, zebra striping, mobile cards
   - Modals: overlay 50% black, white content, max 90vh height

4. States & Feedback:
   - Loading: skeleton screens matching content shape
   - Empty: helpful message + primary CTA
   - Error: user-friendly message + retry option
   - Success: subtle toast with checkmark

5. Motion Guidelines:
   - Hover states: 150ms ease-out
   - Transitions: 250ms for modals/pages
   - Micro-interactions: translateY(-2px) on hover

Remember: Professional, transparent, trustworthy
```

### QPERF
When typed, this means:
```
Performance checklist:
1. Bundle size under 6MB? (run: pnpm size-limit, target <5MB)
2. Images optimized? (WebP with fallbacks)
3. Code splitting at route level?
4. Unnecessary re-renders avoided?
5. Heavy operations memoized?
```

### QUX
When typed, this means:
```
Test user journeys:

1. Critical User Flows
   - Can user complete key actions?
   - Mobile experience smooth?
   - Error recovery possible?

2. Edge Cases
   - Empty states helpful?
   - Error recovery possible?
   - Loading states present?
```

### QREVIEW
When typed, this means:
```
Pre-PR Checklist:
1. [ ] Tests passing (pnpm test:run)
2. [ ] Types valid (pnpm type-check)
3. [ ] Lint clean (pnpm lint)
4. [ ] Bundle size OK (pnpm size-limit)
5. [ ] Design consistent (QDESIGN)
6. [ ] Performance checked (QPERF)
7. [ ] User flows tested (QUX)
8. [ ] Commit messages semantic
9. [ ] No console.logs or debug code
```

### QGIT
When typed, this means:
```
Add all changes to staging, create a commit, and push to remote.

Follow this checklist for writing your commit message:
- MUST use Conventional Commits format: https://www.conventionalcommits.org/en/v1.0.0
- SHOULD structure commit message as follows:
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
- commit SHOULD contain the following structural elements:
  - fix: patches a bug in your codebase (correlates with PATCH in Semantic Versioning).
  - feat: introduces a new feature to the codebase (correlates with MINOR in Semantic Versioning).
  - BREAKING CHANGE: introduces a breaking API change (correlates with MAJOR in Semantic Versioning).
  - Other types: build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
```

### QCHECKF
When typed, this means:
```
You are a SKEPTICAL senior software engineer.
Perform this analysis for every MAJOR function you added or edited (skip minor changes):

Apply CLAUDE.md checklist: Writing Functions Best Practices
1. Can you read the function and HONESTLY understand it immediately?
2. Is it doing one thing?
3. Is it testable?
4. Is the name clear?
5. Are the types explicit?
6. Does it have high cyclomatic complexity?
7. Are there unused parameters?
8. Are there unnecessary type casts?
9. Any hidden dependencies?
```

### QCHECKT
When typed, this means:
```
You are a SKEPTICAL senior software engineer.
Perform this analysis for every MAJOR test you added or edited (skip minor changes):

Apply CLAUDE.md checklist: Writing Tests Best Practices
1. Tests business logic correctly?
2. Tests happy paths?
3. Tests edge cases?
4. One logical assertion per test?
5. Tests behavior, not implementation?
6. Parameterizes inputs properly?
7. Uses strong assertions?
8. Groups by function name?
9. No trivial tests?
```

### Recommended Shortcut Workflow

Optimal order for using shortcuts during development:

1. **QNEW** → Start of each session (load best practices + check docs)
2. **QPLAN** → Before any implementation (ensure consistency)
3. **QCODE** → During implementation (minimal code + tests)
4. **QDESIGN** → After creating UI components (verify design system)
5. **QCHECKF** → Check specific functions for quality
6. **QCHECKT** → Check specific tests for quality
7. **QCHECK** → After completing features (comprehensive quality assurance)
8. **QPERF** → Before committing (performance validation)
9. **QUX** → Final user journey testing (including mobile)
10. **QREVIEW** → Pre-PR comprehensive check
11. **QGIT** → Commit and push changes

**💡 Pro Tip:** Always check bundle size with `pnpm size-limit` before QGIT

---

### Change Logging

Follow the format: `YYYY-MM-DD | [Component/Module] | Short description`

Recent changes:
- `2025-10-01 | [Cleanup] | Removed affiliate business logic, created clean template`
- `2025-10-01 | [Navigation] | Fixed routing from /dashboard/resumen to /dashboard`

---

## 📌 Important Instruction Reminders

- **Do what has been asked; nothing more, nothing less.**
- **NEVER create files unless they're absolutely necessary for achieving the goal.**
- **ALWAYS prefer editing an existing file to creating a new one.**
- **NEVER proactively create documentation files (*.md) or README files. Only create documentation if explicitly requested.**
- **NO PRE-COMMIT HOOKS EVER** - They cause data loss and session resets
- **ALWAYS run quality checks manually** - Use QREVIEW shortcut before committing
- **Review the consolidated docs** - Check `/docs` folder for comprehensive guides

---

### Reminder: **Do what's asked, nothing extra.**

*This guide is specific to professional web application development. Always prioritize simplicity, working code, and fast iteration while maintaining professional standards.*
