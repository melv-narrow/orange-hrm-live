import { PASSWORD_RESET_PATH } from '../../src/config/orange-hrm-config';
import { applyAllureMetadata } from '../support/allure';
import { test, expect } from '../fixtures/test';

test.describe('Password recovery', () => {
  test.beforeEach(async () => {
    await applyAllureMetadata({
      epic: 'Authentication',
      feature: 'Password Recovery',
      story: 'Recover access from the public login page',
      severity: 'normal',
      tags: ['public', 'password-recovery'],
    });
  });

  test('@smoke opens the reset password page and returns to login on cancel', async ({
    loginPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Authentication',
      feature: 'Password Recovery',
      story: 'Navigate to and from password reset',
      severity: 'normal',
      tags: ['smoke', 'navigation'],
    });

    await loginPage.goto();
    await loginPage.openPasswordReset();

    await expect(
      page.getByRole('heading', { name: 'Reset Password' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await loginPage.expectLoaded();
  });

  test('@regression requires a username before sending a reset request', async ({
    loginPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Authentication',
      feature: 'Password Recovery',
      story: 'Validate reset form requirements',
      severity: 'critical',
      tags: ['regression', 'negative', 'validation'],
    });

    await loginPage.goto();
    await loginPage.openPasswordReset();

    await page.getByRole('button', { name: 'Reset Password' }).click();

    await expect(page).toHaveURL(new RegExp(`${PASSWORD_RESET_PATH}$`));
    await expect(page.getByText('Required', { exact: true })).toHaveCount(1);
  });
});
