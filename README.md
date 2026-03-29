# OrangeHRM Live Demo Test Suite

This repository contains a Playwright + TypeScript regression suite for the live OrangeHRM demo at `https://opensource-demo.orangehrmlive.com`.

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
```

## Environment variables

The suite defaults to the public demo credentials shown on the page:

- `ORANGE_HRM_USERNAME` defaults to `Admin`
- `ORANGE_HRM_PASSWORD` defaults to `admin123`

Override them if the demo credentials change.

## Notes

- The demo site is an external shared environment, so the config uses a single worker and retry support to reduce noise.
- Authenticated tests reuse a Playwright storage state created by `tests/setup/auth.setup.ts`.
