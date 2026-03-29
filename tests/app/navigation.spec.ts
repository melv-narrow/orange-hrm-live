import { MODULE_EXPECTATIONS } from '../../src/config/orange-hrm-config';
import { applyAllureMetadata } from '../support/allure';
import { test, expect } from '../fixtures/test';

test.describe('Authenticated module navigation smoke', () => {
  test.beforeEach(async () => {
    await applyAllureMetadata({
      epic: 'Navigation',
      feature: 'Core Modules',
      story: 'Open the major application modules after login',
      severity: 'normal',
      tags: ['authenticated', 'navigation'],
    });
  });

  for (const moduleExpectation of MODULE_EXPECTATIONS) {
    test(`@regression opens ${moduleExpectation.menuItem} and shows its core controls`, async ({
      appShellPage,
      dashboardPage,
      page,
    }) => {
      await applyAllureMetadata({
        epic: 'Navigation',
        feature: moduleExpectation.menuItem,
        story: `Open ${moduleExpectation.menuItem} from the side menu`,
        severity: 'normal',
        tags: [
          'regression',
          moduleExpectation.menuItem.toLowerCase(),
          'module-smoke',
        ],
      });

      await dashboardPage.goto();
      await appShellPage.menuItem(moduleExpectation.menuItem).click();

      await expect(page).toHaveURL(moduleExpectation.expectedUrl);
      await expect(
        page
          .getByRole('heading', {
            name: moduleExpectation.heading,
            exact: true,
          })
          .first(),
      ).toBeVisible();

      for (const button of moduleExpectation.buttons) {
        await expect(
          page.getByRole('button', { name: button, exact: true }),
        ).toBeVisible();
      }

      for (const label of moduleExpectation.labels) {
        await expect(
          page.getByText(label, { exact: true }).first(),
        ).toBeVisible();
      }
    });
  }
});
