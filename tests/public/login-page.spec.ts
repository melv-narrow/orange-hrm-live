import {
  DASHBOARD_PATH,
  LOGIN_VERSION_PATTERN,
} from '../../src/config/orange-hrm-config';
import { test, expect } from '../fixtures/test';

test.describe('Public login page', () => {
  test('renders the login page essentials and masks the password field', async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.expectLoaded();

    await expect(loginPage.demoCredentialsPanel).toContainText('Username : Admin');
    await expect(loginPage.demoCredentialsPanel).toContainText('Password : admin123');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(page.getByText(LOGIN_VERSION_PATTERN)).toBeVisible();
    await expect(page.getByAltText('company-branding')).toBeVisible();
  });

  test('shows required-field validation when the form is submitted empty', async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.submitEmptyForm();

    await expect(loginPage.requiredMessages).toHaveCount(2);
  });

  test('rejects an incorrect password with a clear error message', async ({
    credentials,
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login({
      username: credentials.username,
      password: `${credentials.password}-invalid`,
    });

    await expect(loginPage.invalidCredentialsAlert).toBeVisible();
  });

  test('allows a valid user to sign in successfully', async ({
    credentials,
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(credentials);

    await expect(page).toHaveURL(new RegExp(`${DASHBOARD_PATH}$`));
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('allows a signed-in user to log out cleanly', async ({
    appShellPage,
    credentials,
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(credentials);

    await expect(page).toHaveURL(new RegExp(`${DASHBOARD_PATH}$`));

    await appShellPage.openUserMenu();
    await expect(appShellPage.userMenuItem('Logout')).toBeVisible();
    await appShellPage.userMenuItem('Logout').click();

    await loginPage.expectLoaded();
  });
});
