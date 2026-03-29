import { PASSWORD_RESET_PATH } from '../../src/config/orange-hrm-config';
import { test, expect } from '../fixtures/test';

test.describe('Password recovery', () => {
  test('opens the reset password page and returns to login on cancel', async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.openPasswordReset();

    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await loginPage.expectLoaded();
  });

  test('requires a username before sending a reset request', async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.openPasswordReset();

    await page.getByRole('button', { name: 'Reset Password' }).click();

    await expect(page).toHaveURL(new RegExp(`${PASSWORD_RESET_PATH}$`));
    await expect(page.getByText('Required', { exact: true })).toHaveCount(1);
  });
});
