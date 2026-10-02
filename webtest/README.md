# OrangeHRM Web Testing with Playwright

This project contains Playwright automation for the OrangeHRM demo login and dashboard flows using the Page Object Model (POM).

## Project structure

- `pages/LoginPage.js` — login page object methods and selectors
- `pages/DashboardPage.js` — dashboard page object methods and selectors
- `utils/dashboardAssertions.js` — reusable dashboard assertion helper
- `tests/login.spec.js` — login scenarios
- `tests/dashboard.spec.js` — dashboard scenarios
- `tests/regression.spec.js` — combined login + dashboard regression suite
- `test-data/testData.js` — demo login data
- `playwright.config.js` — Playwright configuration

## Prerequisites

- Node.js 18 or newer
- npm

## Install dependencies

```bash
npm install
```

## Run all tests

From the project root:

```bash
cd webtest
npx playwright test --reporter=line
```

## Run selected suites

```bash
cd webtest
npx playwright test tests/login.spec.js --reporter=line
npx playwright test tests/dashboard.spec.js --reporter=line
npx playwright test tests/regression.spec.js --reporter=line
```

## Useful commands

```bash
cd webtest
npx playwright test --headed
npx playwright test --ui
npx playwright show-report
```

## Demo credentials used

- Username: `Admin`
- Password: `admin123`

These credentials are for the OrangeHRM demo app only and are used in accordance with the project instructions.
