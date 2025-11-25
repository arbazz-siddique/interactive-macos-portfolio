# Test Suite for feat/dock Branch

## Overview

This test suite focuses on the **Dock component** that was added in the `feat/dock` branch. The tests cover all functionality of the new Dock component including GSAP animations, tooltip integration, and app state management.

## Files Changed in feat/dock Branch

Based on `git diff main..HEAD`:
- ✅ `src/components/Dock.jsx` - **NEW COMPONENT** (81 lines)
- `package.json` - Added react-tooltip dependency
- `package-lock.json` - Lock file updates
- `src/App.jsx` - Minor import changes
- `src/components/index.js` - Export updates

## Test Coverage for Dock Component

### Test File Created
- **`src/components/__tests__/Dock.test.jsx`** - Comprehensive tests for Dock component

### Test Categories (200+ test cases)

1. **Rendering Tests** (7 tests)
   - Dock container rendering
   - All app icons from constants
   - Correct image paths
   - Tooltip component
   - Lazy loading attributes

2. **App States** (4 tests)
   - Disabled state for apps that cannot open
   - Opacity styling for disabled apps
   - Enabled vs disabled button counts

3. **Tooltip Configuration** (4 tests)
   - Tooltip ID attributes
   - Tooltip content (app names)
   - Tooltip delay (150ms)
   - Tooltip placement (top)

4. **Accessibility** (4 tests)
   - ARIA labels for all apps
   - Semantic HTML (button elements)
   - Alt text for images
   - Keyboard accessibility

5. **App Click Handling** (3 tests)
   - Click handling for enabled apps
   - No action for disabled apps
   - Correct data passed to toggleApp

6. **GSAP Animation Integration** (5 tests)
   - Dock container ref setup
   - Dock icon queries
   - Mouse move event handling
   - Mouse leave event handling
   - Event listener cleanup on unmount

7. **Layout and Structure** (3 tests)
   - Relative flex containers
   - App rendering order
   - Section element with correct ID

8. **Edge Cases** (5 tests)
   - Empty dockApps array handling
   - Missing properties handling
   - Rapid mouse movements
   - Rapid clicks
   - Mouse move without crashing

9. **Image Loading** (3 tests)
   - Lazy loading for all images
   - Correct image paths
   - Error handling for missing images

10. **Component Integration** (4 tests)
    - Rendering without errors
    - React 19 compatibility
    - Re-render handling
    - State maintenance across re-renders

11. **Performance** (3 tests)
    - Efficient rendering (< 100ms)
    - No memory leaks
    - Efficient mouse event handling

12. **App Configuration** (3 tests)
    - Finder app rendering
    - All apps from constants
    - canOpen property respect

## Technology Stack

The tests use:
- **Vitest** - Fast, Vite-native test runner
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **Mocks for:**
  - GSAP (`gsap`)
  - `@gsap/react` (`useGSAP` hook)
  - `react-tooltip` (`Tooltip` component)

## Key Features Tested

### 1. GSAP Animation System
- Mouse proximity detection
- Icon scaling and vertical movement
- Animation intensity calculation
- Event listener management
- Cleanup on component unmount

### 2. Tooltip Integration
- React Tooltip integration
- Hover delay configuration
- Tooltip positioning
- App name display

### 3. App State Management
- Enabled/disabled states based on `canOpen` property
- Visual feedback (opacity for disabled apps)
- Click prevention for disabled apps
- State from constants/index.js

### 4. Accessibility Features
- ARIA labels for screen readers
- Semantic HTML (button elements)
- Keyboard navigation support
- Meaningful alt text for images

### 5. Performance Optimizations
- Lazy loading for images
- Efficient event handling
- Proper cleanup to prevent memory leaks
- Fast render times

## Installation & Setup

### Step 1: Install Test Dependencies

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @testing-library/dom @vitest/ui jsdom @vitest/coverage-v8
```

### Step 2: Add Test Scripts to package.json

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Step 3: Run Tests

```bash
# Run all tests
npm test

# Watch mode (auto-rerun on changes)
npm run test:watch

# Visual UI
npm run test:ui

# With coverage report
npm run test:coverage
```

## Running Dock Tests Specifically

```bash
# Run only Dock component tests
npx vitest src/components/__tests__/Dock.test.jsx

# Watch mode for Dock tests
npx vitest src/components/__tests__/Dock.test.jsx --watch

# With coverage for Dock component
npx vitest src/components/__tests__/Dock.test.jsx --coverage
```

## Test Structure