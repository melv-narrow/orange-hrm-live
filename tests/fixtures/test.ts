import { test as base, expect } from '@playwright/test';
import type { BrowserContext } from '@playwright/test';

import {
  APP_CREDENTIALS,
  AUTH_STATE_PATH,
  type Credentials,
  DASHBOARD_PATH,
  LOGIN_PATH,
} from '../../src/config/orange-hrm-config';
import { AdminPage } from '../../src/pages/admin-page';
import { AppShellPage } from '../../src/pages/app-shell-page';
import { BuzzPage } from '../../src/pages/buzz-page';
import { DashboardPage } from '../../src/pages/dashboard-page';
import { DirectoryPage } from '../../src/pages/directory-page';
import { LoginPage } from '../../src/pages/login-page';

interface PageFixtures {
  ensureSession: void;
  adminPage: AdminPage;
  appShellPage: AppShellPage;
  buzzPage: BuzzPage;
  credentials: Credentials;
  dashboardPage: DashboardPage;
  directoryPage: DirectoryPage;
  loginPage: LoginPage;
}

async function isSessionExpired(context: BrowserContext): Promise<boolean> {
  const response = await context.request.get(DASHBOARD_PATH);
  return new URL(response.url()).pathname.endsWith(LOGIN_PATH);
}

async function relogin(
  context: BrowserContext,
  credentials: Credentials,
): Promise<void> {
  const page = await context.newPage();

  try {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.login(credentials);
    await expect(page).toHaveURL(new RegExp(`${DASHBOARD_PATH}$`));

    // Refresh the shared state so later tests and retries start signed in.
    await context.storageState({ path: AUTH_STATE_PATH });
  } finally {
    await page.close();
  }
}

export const test = base.extend<PageFixtures>({
  // The shared live demo can drop the saved session mid-run, which would
  // otherwise send every remaining authenticated test to the login page.
  ensureSession: [
    async ({ context, credentials }, use, testInfo) => {
      if (
        testInfo.project.use.storageState &&
        (await isSessionExpired(context))
      ) {
        await relogin(context, credentials);
      }

      await use();
    },
    { auto: true },
  ],
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
