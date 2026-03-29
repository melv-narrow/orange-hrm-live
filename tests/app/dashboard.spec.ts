import {
  CORE_DASHBOARD_WIDGETS,
  CRITICAL_MENU_ITEMS,
  DASHBOARD_PATH,
} from '../../src/config/orange-hrm-config';
import { test, expect } from '../fixtures/test';

test.describe('Authenticated dashboard smoke', () => {
  test('shows the expected dashboard widgets and critical navigation items', async ({
    appShellPage,
    dashboardPage,
  }) => {
    await dashboardPage.goto();
    await dashboardPage.expectLoaded();

    for (const menuItem of CRITICAL_MENU_ITEMS) {
      await expect(appShellPage.menuItem(menuItem)).toBeVisible();
    }

    for (const widget of CORE_DASHBOARD_WIDGETS) {
      await expect(dashboardPage.widgetHeading(widget)).toBeVisible();
    }

    await expect(dashboardPage.quickLaunchButton('Assign Leave')).toBeVisible();
    await expect(dashboardPage.quickLaunchButton('My Timesheet')).toBeVisible();
  });

  test('filters the side menu using the search field', async ({ appShellPage, page }) => {
    await page.goto(DASHBOARD_PATH);

    await appShellPage.filterMenu('Buzz');

    await expect(appShellPage.menuItem('Buzz')).toBeVisible();
    await expect(appShellPage.menuItem('Admin')).toHaveCount(0);
  });
});
