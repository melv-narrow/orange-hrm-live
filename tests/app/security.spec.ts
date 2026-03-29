import type { Browser, BrowserContext, Page } from '@playwright/test';

import {
  ADMIN_USERS_PATH,
  BASE_URL,
  type Credentials,
  DASHBOARD_PATH,
} from '../../src/config/orange-hrm-config';
import { AppShellPage } from '../../src/pages/app-shell-page';
import { DashboardPage } from '../../src/pages/dashboard-page';
import { LoginPage } from '../../src/pages/login-page';
import { applyAllureMetadata } from '../support/allure';
import { test, expect } from '../fixtures/test';

test.describe('Authenticated session security', () => {
  test('@regression blocks protected routes after logout', async ({
    browser,
    credentials,
  }) => {
    await applyAllureMetadata({
      epic: 'Security',
      feature: 'Session Termination',
      story: 'Prevent access to protected routes after logout',
      severity: 'critical',
      tags: ['regression', 'security', 'logout'],
    });

    const { appShellPage, context, loginPage, page } =
      await createAuthenticatedSession(browser, credentials);

    try {
      await appShellPage.logout();
      await loginPage.expectLoaded();

      await page.goto(DASHBOARD_PATH);
      await loginPage.expectLoaded();

      await page.goto(ADMIN_USERS_PATH);
      await loginPage.expectLoaded();
    } finally {
      await context.close();
    }
  });

  test('@regression redirects to login when the authenticated browser state is cleared', async ({
    browser,
    credentials,
  }) => {
    await applyAllureMetadata({
      epic: 'Security',
      feature: 'Session Expiry',
      story: 'Handle expired or cleared authenticated state',
      severity: 'critical',
      tags: ['regression', 'security', 'session-expiry'],
    });

    const { context, loginPage, page } = await createAuthenticatedSession(
      browser,
      credentials,
    );

    try {
      await context.clearCookies();
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });

      await page.goto(DASHBOARD_PATH);

      await loginPage.expectLoaded();
      await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
    } finally {
      await context.close();
    }
  });
});

async function createAuthenticatedSession(
  browser: Browser,
  credentials: Credentials,
): Promise<{
  appShellPage: AppShellPage;
  context: BrowserContext;
  dashboardPage: DashboardPage;
  loginPage: LoginPage;
  page: Page;
}> {
  const context = await browser.newContext({
    baseURL: BASE_URL,
    ignoreHTTPSErrors: true,
    storageState: { cookies: [], origins: [] },
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const appShellPage = new AppShellPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login(credentials);
  await dashboardPage.expectLoaded();

  return {
    appShellPage,
    context,
    dashboardPage,
    loginPage,
    page,
  };
}
