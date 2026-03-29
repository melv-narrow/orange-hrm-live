# OrangeHRM Live Demo Test Suite

This repository contains a Playwright + TypeScript regression suite for the live OrangeHRM demo at `https://opensource-demo.orangehrmlive.com`.

[GitHub Actions](https://github.com/melv-narrow/orange-hrm-live/actions) runs the suite on every push and manual dispatch, and the trend-enabled Allure report is published to [GitHub Pages](https://melv-narrow.github.io/orange-hrm-live/).

## Coverage strategy

The suite follows a lightweight ISTQB-aligned structure:

- Smoke coverage for the most business-critical flows.
- Positive and negative checks for login and password recovery.
- Basic access-control coverage for protected routes.
- Authenticated navigation checks for stable, high-value modules.
- Assertions focused on deterministic UI behavior instead of brittle demo data.

## Test areas

- Public login page rendering and validation.
- Successful and unsuccessful authentication.
- Password reset navigation and validation.
- Dashboard readiness after login.
- Side-menu filtering.
- Logout.
- Admin, PIM, Leave, Directory, and Buzz landing-page smoke checks.

## Run the suite

```bash
npm install
npx playwright install chromium
npm test
```

Helpful variants:

```bash
npm run test:headed
npm run test:public
npm run test:app
npm run report
npm run allure:open
```

What happens automatically:

- `npm test` clears old local artifacts before each run.
- Playwright HTML results are always generated in `playwright-report/`.
- Allure raw results are always generated in `allure-results/`.
- `npm run allure:open` generates and opens the Allure HTML report locally.

Note: local Allure HTML generation uses the Allure CLI and requires Java on the machine. The hosted GitHub Pages report does not require any local setup beyond `npm test`.

## Environment variables

The suite defaults to the public demo credentials shown on the page:

- `ORANGE_HRM_USERNAME` defaults to `Admin`
- `ORANGE_HRM_PASSWORD` defaults to `admin123`

Override them if the demo credentials change.

## Notes

- The demo site is an external shared environment, so the config uses a single worker and retry support to reduce noise.
- Authenticated tests reuse a Playwright storage state created by `tests/setup/auth.setup.ts`.
- The GitHub Actions workflow publishes Allure history to `gh-pages`, so trends persist across successful and failed CI runs.
