import { test as setup, expect } from '@playwright/test';

import {
  APP_CREDENTIALS,
  AUTH_STATE_PATH,
  DASHBOARD_PATH,
} from '../../src/config/orange-hrm-config';
import { LoginPage } from '../../src/pages/login-page';

setup('authenticate admin user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.login(APP_CREDENTIALS);

  await expect(page).toHaveURL(new RegExp(`${DASHBOARD_PATH}$`));
  await page.context().storageState({ path: AUTH_STATE_PATH });
});
