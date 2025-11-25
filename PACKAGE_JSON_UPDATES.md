# Package.json Updates Required

## Add Test Scripts

Add the following scripts to your `package.json` file in the `"scripts"` section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Install Dev Dependencies

Run the following command to install all required testing dependencies:

```bash
npm install --save-dev \
  vitest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  @testing-library/dom \
  @vitest/ui \
  jsdom \
  @vitest/coverage-v8
```

This will add the following to your `devDependencies`:

```json
{
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "@vitest/coverage-v8": "^2.1.8",
    "@vitest/ui": "^2.1.8",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "jsdom": "^25.0.1",
    "vite": "^7.2.4",
    "vitest": "^2.1.8"
  }
}
```

## Verification

After installation, verify the setup:

1. Check that all dependencies are installed:
   ```bash
   npm list vitest @testing-library/react
   ```

2. Run the tests:
   ```bash
   npm test
   ```

3. You should see output indicating all 264+ tests are running.