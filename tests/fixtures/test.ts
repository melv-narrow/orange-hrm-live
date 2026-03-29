import { test as base, expect } from '@playwright/test';

import {
  APP_CREDENTIALS,
  type Credentials,
} from '../../src/config/orange-hrm-config';
import { AdminPage } from '../../src/pages/admin-page';
import { AppShellPage } from '../../src/pages/app-shell-page';
import { BuzzPage } from '../../src/pages/buzz-page';
import { DashboardPage } from '../../src/pages/dashboard-page';
import { DirectoryPage } from '../../src/pages/directory-page';
import { LoginPage } from '../../src/pages/login-page';

interface PageFixtures {
  adminPage: AdminPage;
  appShellPage: AppShellPage;
  buzzPage: BuzzPage;
  credentials: Credentials;
  dashboardPage: DashboardPage;
  directoryPage: DirectoryPage;
  loginPage: LoginPage;
}

export const test = base.extend<PageFixtures>({
  credentials: async ({ browserName }, use) => {
    void browserName;
    await use(APP_CREDENTIALS);
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  directoryPage: async ({ page }, use) => {
    await use(new DirectoryPage(page));
  },
  buzzPage: async ({ page }, use) => {
    await use(new BuzzPage(page));
  },
  appShellPage: async ({ page }, use) => {
    await use(new AppShellPage(page));
  },
});

export { expect };
