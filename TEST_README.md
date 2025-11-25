# Testing Guide

This document provides comprehensive information about running and maintaining tests for this project.

## Setup

### Install Testing Dependencies

Run the following command to install all required testing dependencies:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom @testing-library/dom
```

### Dependencies Overview

- **vitest**: Fast unit test framework that works seamlessly with Vite
- **@testing-library/react**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **@testing-library/user-event**: Simulates user interactions
- **@vitest/ui**: Visual UI for test results
- **jsdom**: JavaScript implementation of web standards for Node.js

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with UI

```bash
npm run test:ui
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Specific Test File

```bash
npx vitest src/utils/__tests__/timeUtils.test.js
```

### Run Tests Matching Pattern

```bash
npx vitest --grep "Window Component"
```

## Test Structure

### Test Organization