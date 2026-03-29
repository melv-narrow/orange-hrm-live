import { DASHBOARD_PATH } from '../../src/config/orange-hrm-config';
import { test, expect } from '../fixtures/test';

test('redirects an unauthenticated visitor to login when opening the dashboard directly', async ({
  loginPage,
  page,
}) => {
  await page.goto(DASHBOARD_PATH);

  await loginPage.expectLoaded();
  await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
});
