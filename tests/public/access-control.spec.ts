import {
  ADMIN_USERS_PATH,
  DASHBOARD_PATH,
} from '../../src/config/orange-hrm-config';
import { applyAllureMetadata } from '../support/allure';
import { test, expect } from '../fixtures/test';

test.describe('Public access control', () => {
  test.beforeEach(async () => {
    await applyAllureMetadata({
      epic: 'Security',
      feature: 'Access Control',
      story: 'Protect authenticated routes from anonymous users',
      severity: 'critical',
      tags: ['public', 'security'],
    });
  });

  test('@smoke redirects an unauthenticated visitor to login when opening the dashboard directly', async ({
    loginPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Security',
      feature: 'Access Control',
      story: 'Block dashboard access before login',
      severity: 'critical',
      tags: ['smoke', 'routing'],
    });

    await page.goto(DASHBOARD_PATH);

    await loginPage.expectLoaded();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  });

  test('@regression redirects an unauthenticated visitor away from the admin area', async ({
    loginPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Security',
      feature: 'Access Control',
      story: 'Block admin access before login',
      severity: 'critical',
      tags: ['regression', 'routing', 'admin'],
    });

    await page.goto(ADMIN_USERS_PATH);

    await loginPage.expectLoaded();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  });
});
