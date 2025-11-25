# 🚀 Quick Start Guide - Testing

## Installation

```bash
npm install
```

This will install all the new testing dependencies:
- vitest
- @testing-library/react
- @testing-library/jest-dom
- @vitest/ui
- jsdom

## Running Tests

### Watch Mode (Recommended for Development)
```bash
npm test
```
Tests will re-run automatically when files change.

### Single Run (CI/CD)
```bash
npm run test:run
```
Runs all tests once and exits.

### Interactive UI
```bash
npm run test:ui
```
Opens a browser-based test UI for interactive exploration.

### Coverage Report
```bash
npm run test:coverage
```
Generates HTML coverage report in `coverage/` directory.

## What's Being Tested?

### 1. Welcome Component (40+ tests)
The new interactive welcome section with GSAP animations.

**Key Features Tested:**
- Text rendering (character-by-character spans)
- Font weight animation on hover
- Mouse event handling
- Cleanup on unmount
- Accessibility
- Edge cases

### 2. Component Barrel Export (19 tests)
The new `src/components/index.js` file.

**Key Features Tested:**
- Named exports (Navbar, Welcome)
- Import resolution
- Destructuring support
- Re-export integrity
- No circular dependencies

### 3. App Component (21 tests)
The updated App.jsx with Welcome integration.

**Key Features Tested:**
- Component composition
- Correct rendering order
- Barrel export usage
- Semantic HTML
- Accessibility

## Expected Test Output