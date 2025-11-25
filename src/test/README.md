# Test Suite Documentation

## Overview
This test suite provides comprehensive coverage for the interactive macOS portfolio application, focusing on the newly added Welcome component and App component integration.

## Test Structure

### Component Tests
- **App.test.jsx**: Tests for the main App component
  - Rendering tests
  - Component integration (Navbar + Welcome)
  - Structure and hierarchy validation
  - Accessibility compliance
  - Edge cases

- **Welcome.test.jsx**: Comprehensive tests for the Welcome component
  - Text rendering with individual character spans
  - GSAP animation setup and integration
  - Mouse interaction handlers (mousemove, mouseleave)
  - Font variation settings
  - CSS class application
  - Edge cases (extreme coordinates, rapid movements)
  - Accessibility features
  - Component lifecycle (mount/unmount)

- **index.test.js**: Tests for component exports
  - Named exports verification
  - Component type validation
  - Import integrity

## Running Tests

```bash
# Install dependencies first
npm install

# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch
```

## Test Coverage Areas

### App Component (src/App.test.jsx)
✓ Component rendering
✓ Navbar and Welcome integration
✓ Proper DOM structure
✓ Component hierarchy
✓ Multiple render handling
✓ Accessibility (semantic HTML)

### Welcome Component (src/components/Welcome.test.jsx)
✓ Section with correct ID
✓ Subtitle and title rendering
✓ Individual character span rendering
✓ Non-breaking space handling
✓ Font variation settings (100 for subtitle, 400 for title)
✓ CSS classes (text-3xl, text-9xl, italic, font-georama, mt-7)
✓ Mouse event handling (mousemove, mouseleave)
✓ GSAP animation integration
✓ Edge cases (extreme coordinates, rapid movements)
✓ Event listener cleanup on unmount
✓ Semantic HTML structure
✓ Small-screen warning message

### Component Exports (src/components/index.test.js)
✓ Named exports (Navbar, Welcome)
✓ Component types (functions)
✓ Import integrity
✓ Module structure

## Key Testing Patterns

### Mocking GSAP
```javascript
vi.mock('gsap', () => ({
  default: {
    to: vi.fn(() => ({ kill: vi.fn() }))
  }
}))
```

### Mocking useGSAP Hook
```javascript
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((callback) => {
    const cleanup = callback()
    return { context: { kill: vi.fn(), revert: cleanup } }
  })
}))
```

### Testing Interactive Elements
```javascript
fireEvent.mouseMove(element, { clientX: 100, clientY: 100 })
fireEvent.mouseLeave(element)
```

### Testing DOM Structure
```javascript
const { container } = render(<Component />)
const element = container.querySelector('selector')
expect(element).toBeInTheDocument()
```

## Pure Functions Tested

### renderText Function
- Converts strings to arrays of span elements
- Handles spaces as non-breaking spaces (\u00A0)
- Applies consistent styling to all characters
- Handles special characters (apostrophes, commas, exclamation marks)

### setUpTextHover Function
- Sets up mouse event listeners
- Calculates font weight based on mouse proximity
- Uses exponential decay for smooth transitions
- Properly cleans up event listeners

### FONT_WEIGHT Configuration
- Subtitle: min=100, max=400, default=100
- Title: min=400, max=900, default=400

## Best Practices

1. **Isolation**: Each test is independent and can run in any order
2. **Cleanup**: Automatic cleanup after each test via setup.js
3. **Mocking**: External dependencies (GSAP, components) are mocked
4. **Coverage**: Tests cover happy paths, edge cases, and error conditions
5. **Descriptive Names**: Test names clearly describe what they validate
6. **Performance**: Tests are optimized to run quickly

## Dependencies

- **vitest**: Test runner and framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom DOM matchers
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM implementation for Node.js

## Configuration

Test configuration is in `vitest.config.js`:
- Environment: jsdom
- Setup file: src/test/setup.js
- Coverage provider: v8
- Global test APIs enabled
- Aliases match project structure

## Adding New Tests

When adding new tests:
1. Follow the existing describe/it structure
2. Use descriptive test names that explain the behavior
3. Mock external dependencies appropriately
4. Test both happy paths and edge cases
5. Ensure proper cleanup in afterEach hooks
6. Maintain test isolation
7. Use async/await for dynamic imports

## Coverage Goals

The test suite aims for:
- 80%+ statement coverage
- 80%+ branch coverage
- 80%+ function coverage
- 80%+ line coverage

Focus areas:
- User interactions (mouse events, clicks)
- Component lifecycle (mount, update, unmount)
- Edge cases and error conditions
- Accessibility compliance
- Integration between components