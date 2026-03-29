import { test as base, expect } from '@playwright/test';

import {
  APP_CREDENTIALS,
  type Credentials,
} from '../../src/config/orange-hrm-config';
import { AppShellPage } from '../../src/pages/app-shell-page';
import { DashboardPage } from '../../src/pages/dashboard-page';
import { LoginPage } from '../../src/pages/login-page';

interface PageFixtures {
  appShellPage: AppShellPage;
  credentials: Credentials;
  dashboardPage: DashboardPage;
  loginPage: LoginPage;
}

export const test = base.extend<PageFixtures>({
  credentials: async ({}, use) => {
    await use(APP_CREDENTIALS);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  appShellPage: async ({ page }, use) => {
    await use(new AppShellPage(page));
  },
});

export { expect };
