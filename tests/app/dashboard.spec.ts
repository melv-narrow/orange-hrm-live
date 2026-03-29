import {
  ASSIGN_LEAVE_PATH,
  CORE_DASHBOARD_WIDGETS,
  CRITICAL_MENU_ITEMS,
  DASHBOARD_PATH,
  MY_TIMESHEET_PATH,
} from '../../src/config/orange-hrm-config';
import { applyAllureMetadata } from '../support/allure';
import { test, expect } from '../fixtures/test';

test.describe('Authenticated dashboard coverage', () => {
  test.beforeEach(async () => {
    await applyAllureMetadata({
      epic: 'Dashboard',
      feature: 'Home Experience',
      story: 'Use the landing dashboard after login',
      severity: 'normal',
      tags: ['authenticated', 'dashboard'],
    });
  });

  test('@smoke shows the expected dashboard widgets and critical navigation items', async ({
    appShellPage,
    dashboardPage,
  }) => {
    await applyAllureMetadata({
      epic: 'Dashboard',
      feature: 'Home Experience',
      story: 'Verify dashboard readiness',
      severity: 'critical',
      tags: ['smoke', 'navigation', 'widgets'],
    });

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

  test('@regression filters the side menu using the search field', async ({
    appShellPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Dashboard',
      feature: 'Navigation',
      story: 'Filter the side menu',
      severity: 'normal',
      tags: ['regression', 'navigation', 'search'],
    });

    await page.goto(DASHBOARD_PATH);

    await appShellPage.filterMenu('Buzz');

    await expect(appShellPage.menuItem('Buzz')).toBeVisible();
    await expect(appShellPage.menuItem('Admin')).toHaveCount(0);
  });

  test('@regression opens Assign Leave from Quick Launch', async ({
    dashboardPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Dashboard',
      feature: 'Quick Launch',
      story: 'Open Assign Leave from the dashboard',
      severity: 'normal',
      tags: ['regression', 'quick-launch', 'leave'],
    });

    await dashboardPage.goto();
    await dashboardPage.quickLaunchButton('Assign Leave').click();

    await expect(page).toHaveURL(new RegExp(`${ASSIGN_LEAVE_PATH}$`));
    await expect(
      page.getByRole('heading', { name: 'Assign Leave' }),
    ).toBeVisible();
  });

  test('@regression opens My Timesheet from Quick Launch', async ({
    dashboardPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Dashboard',
      feature: 'Quick Launch',
      story: 'Open My Timesheet from the dashboard',
      severity: 'normal',
      tags: ['regression', 'quick-launch', 'time'],
    });

    await dashboardPage.goto();
    await dashboardPage.quickLaunchButton('My Timesheet').click();

    await expect(page).toHaveURL(new RegExp(`${MY_TIMESHEET_PATH}$`));
    await expect(
      page.getByRole('heading', { name: 'Time', exact: true }),
    ).toBeVisible();
  });

  test('@regression keeps the dashboard accessible after a browser refresh', async ({
    dashboardPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Security',
      feature: 'Session Persistence',
      story: 'Stay authenticated after refresh',
      severity: 'critical',
      tags: ['regression', 'session-management', 'refresh'],
    });

    await dashboardPage.goto();
    await dashboardPage.expectLoaded();

    await page.reload();

    await dashboardPage.expectLoaded();
  });
});
