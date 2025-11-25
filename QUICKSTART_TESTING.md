# Quick Start - Testing Setup

## 1-Minute Setup

### Step 1: Install Dependencies (30 seconds)

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @testing-library/dom @vitest/ui jsdom @vitest/coverage-v8
```

### Step 2: Add Scripts to package.json (30 seconds)

Open `package.json` and add these to the `"scripts"` section:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest run --coverage"
```

### Step 3: Run Tests!

```bash
npm test
```

## What You Get

✅ **264+ Comprehensive Unit Tests**
- 23 utility function tests
- 113 component tests
- 128 application tests

✅ **Complete Test Infrastructure**
- Vitest configuration
- Testing Library setup
- Global test utilities
- Mock helpers

✅ **Full Documentation**
- TEST_README.md - Complete testing guide
- TESTING_SUMMARY.md - Implementation details
- QUICKSTART_TESTING.md - This file

## Quick Commands

```bash
# Run all tests once
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# Visual UI interface
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run specific test file
npx vitest src/utils/__tests__/timeUtils.test.js

# Run tests matching a pattern
npx vitest --grep "Window"
```

## Test Files Location