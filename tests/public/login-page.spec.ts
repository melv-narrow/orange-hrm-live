import {
  DASHBOARD_PATH,
  LOGIN_VERSION_PATTERN,
} from '../../src/config/orange-hrm-config';
import { applyAllureMetadata } from '../support/allure';
import { test, expect } from '../fixtures/test';

test.describe('Public login page', () => {
  test.beforeEach(async () => {
    await applyAllureMetadata({
      epic: 'Authentication',
      feature: 'Login',
      story: 'Open the OrangeHRM login experience',
      severity: 'normal',
      tags: ['public', 'ui'],
    });
  });

  test('@smoke renders the login page essentials and masks the password field', async ({
    loginPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Authentication',
      feature: 'Login',
      story: 'View the login page',
      severity: 'normal',
      tags: ['smoke', 'login-page', 'ux'],
    });

    await loginPage.goto();
    await loginPage.expectLoaded();

    await expect(loginPage.demoCredentialsPanel).toContainText(
      'Username : Admin',
    );
    await expect(loginPage.demoCredentialsPanel).toContainText(
      'Password : admin123',
    );
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(page.getByText(LOGIN_VERSION_PATTERN)).toBeVisible();
    await expect(page.getByAltText('company-branding')).toBeVisible();
  });

  test('@smoke shows required-field validation when the form is submitted empty', async ({
    loginPage,
  }) => {
    await applyAllureMetadata({
      epic: 'Authentication',
      feature: 'Login',
      story: 'Validate mandatory credentials',
      severity: 'critical',
      tags: ['smoke', 'validation', 'negative'],
    });

    await loginPage.goto();
    await loginPage.submitEmptyForm();

    await expect(loginPage.requiredMessages).toHaveCount(2);
  });

  test('@regression rejects an incorrect password with a clear error message', async ({
    credentials,
    loginPage,
  }) => {
    await applyAllureMetadata({
      epic: 'Authentication',
      feature: 'Login',
      story: 'Reject invalid credentials',
      severity: 'critical',
      tags: ['regression', 'negative', 'security'],
    });

    await loginPage.goto();
    await loginPage.login({
      username: credentials.username,
      password: `${credentials.password}-invalid`,
    });

    await expect(loginPage.invalidCredentialsAlert).toBeVisible();
  });

  test('@smoke allows a valid user to sign in successfully', async ({
    credentials,
    loginPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Authentication',
      feature: 'Login',
      story: 'Sign in with valid credentials',
      severity: 'blocker',
      tags: ['smoke', 'positive', 'critical-path'],
    });

    await loginPage.goto();
    await loginPage.login(credentials);

    await expect(page).toHaveURL(new RegExp(`${DASHBOARD_PATH}$`));
    await expect(
      page.getByRole('heading', { name: 'Dashboard' }),
    ).toBeVisible();
  });

  test('@smoke allows a signed-in user to log out cleanly', async ({
    appShellPage,
    credentials,
    loginPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Authentication',
      feature: 'Logout',
      story: 'End an authenticated session',
      severity: 'critical',
      tags: ['smoke', 'session-management'],
    });

    await loginPage.goto();
    await loginPage.login(credentials);

    await expect(page).toHaveURL(new RegExp(`${DASHBOARD_PATH}$`));

    await appShellPage.logout();
    await loginPage.expectLoaded();
  });
});
