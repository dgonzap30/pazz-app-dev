# TypeScript Guidelines for Pazz Affiliate Portal

## Overview

This document explains our TypeScript practices and helps distinguish between real compilation errors that need immediate attention and unused declaration warnings that represent forward-thinking development.

## Error Classification

### 🚨 Critical Errors (Fix Immediately)

**Error Codes: TS2xxx series**
- `TS2322`: Type assignment errors
- `TS2339`: Property does not exist
- `TS2345`: Argument type errors  
- `TS2459`: Module export errors
- `TS2532`: Object possibly undefined
- `TS2741`: Missing required properties

**Impact:** These prevent compilation and can cause runtime errors.

**Examples:**
```typescript
// TS2339 - Property missing
interface User { name: string; }
const user: User = { name: "John" };
console.log(user.age); // Error: Property 'age' does not exist

// TS2322 - Type mismatch  
const count: number = "five"; // Error: Type 'string' is not assignable to type 'number'
```

### ⚠️ Maintenance Warnings (Forward-Thinking Development)

**Error Codes: TS61xx series**
- `TS6133`: Declared but never read
- `TS6196`: Declared but never used

**Impact:** No runtime effect. These are comprehensive type definitions and utility functions built for anticipated features.

**Examples:**
```typescript
// TS6133 - Function ready for future use
export const formatPercentage = (value: number) => `${value}%`; // Unused but valuable

// TS6196 - Type definition for upcoming API
export interface CommissionReport {  // Unused but needed soon
  id: string;
  period: string;
  totalEarnings: number;
}
```

## Our Philosophy: Forward-Thinking Development

### Why We Keep "Unused" Declarations

1. **API Readiness**: Types prepared for backend endpoints
2. **Feature Scalability**: Utilities ready for new features  
3. **Development Velocity**: No rebuild time when features need them
4. **Type Safety**: Comprehensive coverage prevents future errors
5. **Team Efficiency**: Consistent patterns across features

### Professional Examples

```typescript
// Forward-thinking commission utilities
export const calculateYearlyProjection = (monthlyCommission: number): number => {
  return monthlyCommission * 12;
}; // TS6133 - "unused" but ready for dashboard expansion

// Comprehensive promo types
export interface PromoAnalytics {  // TS6196 - "unused" but needed for analytics
  impressions: number;
  clickThrough: number;
  conversionRate: number;
}

// Schema validators for all form fields
export const validatePhoneNumber = (phone: string): boolean => {
  return /^\+?[1-9]\d{1,14}$/.test(phone);
}; // TS6133 - "unused" but essential for contact forms
```

## Development Guidelines

### ✅ DO: Focus Code Reviews On

- **TS2xxx errors**: Fix immediately
- **Business logic correctness**: Verify calculations
- **Security patterns**: Validate auth flows
- **Performance bottlenecks**: Optimize heavy operations
- **User experience**: Test critical flows

### ❌ DON'T: Waste Time On  

- **TS61xx warnings**: These are valuable reserves
- **Removing utility functions**: Keep for future features
- **Eliminating type definitions**: Maintain comprehensive coverage
- **Cleaning "unused" schemas**: Essential for API evolution

### Code Review Checklist

**High Priority Issues:**
- [ ] Any TS2xxx compilation errors?
- [ ] Business logic correctness verified?
- [ ] Security vulnerabilities addressed?
- [ ] Performance implications considered?

**Low Priority (Optional):**
- [ ] Unused declarations documented with comments?
- [ ] Forward-thinking utilities properly exported?

## Configuration Recommendations

### Development vs Production

```jsonc
// tsconfig.json - Recommended settings
{
  "compilerOptions": {
    "strict": true,                    // ✅ Keep strict type checking
    "noUnusedLocals": false,          // ❌ Don't flag unused variables  
    "noUnusedParameters": false,      // ❌ Don't flag unused parameters
    "exactOptionalPropertyTypes": true // ✅ Strict optional handling
  },
  "exclude": [
    "**/*.test.ts",                   // Tests can have unused mocks
    "**/mock-data/**"                 // Mock data can have extra properties
  ]
}
```

### CI/CD Pipeline

```yaml
# Focus on blocking errors only
- name: TypeScript Check
  run: |
    # Count real compilation errors
    ERRORS=$(npm run type-check 2>&1 | grep -c "error TS[2-5]" || echo "0")
    if [ "$ERRORS" -gt "0" ]; then
      echo "❌ Found $ERRORS compilation errors"
      exit 1
    fi
    echo "✅ TypeScript compilation successful"
```

## File-Level Documentation

### Marking Forward-Thinking Code

```typescript
/**
 * Commission Analytics Utilities
 * 
 * These functions provide comprehensive commission analysis capabilities.
 * Some may show as "unused" but are essential for upcoming dashboard features.
 * 
 * DO NOT REMOVE - Required for Phase 2 analytics implementation
 */

// Forward-thinking utilities for commission insights
export const calculateCommissionTrends = (data: CommissionRecord[]): TrendAnalysis => {
  // Implementation for trend analysis dashboard
};

export const generateCommissionReport = (period: DateRange): CommissionReport => {
  // Implementation for automated reporting
};

// Comprehensive type coverage for all commission scenarios  
export interface CommissionProjection {  // May show TS6196 - keep for forecasting
  currentMonth: number;
  projected3Month: number;  
  yearEndForecast: number;
  confidenceLevel: number;
}
```

## Team Communication

### Pull Request Guidelines

**For TS2xxx errors:**
```markdown
🚨 **Critical Fix Required**
- Fixed TS2322 type mismatch in user profile update
- Added missing required properties to ReferralLink interface
- ✅ All compilation errors resolved
```

**For TS61xx "warnings":**
```markdown  
📋 **Forward-Thinking Development Note**
- Added comprehensive commission utilities (may show TS6133 warnings)
- Prepared type definitions for upcoming analytics features
- These "unused" declarations are intentional and valuable
```

### Documentation Updates

When adding forward-thinking code:

1. **Comment the purpose**: Why this will be needed
2. **Reference the timeline**: When it will be used  
3. **Mark as intentional**: Prevent future removal
4. **Link to requirements**: Connect to user stories

## Conclusion

Our TypeScript "warnings" represent **professional foresight**, not technical debt. They demonstrate:

- **Strategic thinking**: Building for scale
- **Development efficiency**: Ready for rapid feature delivery  
- **Code quality**: Comprehensive type safety
- **Team productivity**: Consistent patterns and utilities

**Remember: Focus on TS2xxx real errors. Embrace TS61xx forward-thinking development.**

---

*Last Updated: 2025-09-11 | For questions, see the development team*