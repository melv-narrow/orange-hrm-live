import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { LOGIN_PATH, PASSWORD_RESET_PATH } from '../config/orange-hrm-config';
import type { Credentials } from '../config/orange-hrm-config';

export class LoginPage {
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly demoCredentialsPanel: Locator;
  readonly invalidCredentialsAlert: Locator;
  readonly requiredMessages: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Login' });
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByText('Forgot your password?', { exact: true });
    this.demoCredentialsPanel = page.locator('.orangehrm-demo-credentials');
    this.invalidCredentialsAlert = page.getByText('Invalid credentials', { exact: true });
    this.requiredMessages = page.getByText('Required', { exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto(LOGIN_PATH);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${LOGIN_PATH}$`));
    await expect(this.heading).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(credentials: Credentials): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  async submitEmptyForm(): Promise<void> {
    await this.loginButton.click();
  }

  async openPasswordReset(): Promise<void> {
    await this.forgotPasswordLink.click();
    await expect(this.page).toHaveURL(new RegExp(`${PASSWORD_RESET_PATH}$`));
  }
}
