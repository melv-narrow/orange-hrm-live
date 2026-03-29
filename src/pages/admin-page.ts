import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { ADMIN_USERS_PATH } from '../config/orange-hrm-config';

export class AdminPage {
  readonly heading: Locator;
  readonly resetButton: Locator;
  readonly searchButton: Locator;
  readonly addButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'System Users' });
    this.resetButton = page.getByRole('button', { name: 'Reset', exact: true });
    this.searchButton = page.getByRole('button', {
      name: 'Search',
      exact: true,
    });
    this.addButton = page.getByRole('button', { name: /Add/ });
  }

  private filterGroup(label: string): Locator {
    return this.page
      .locator('.oxd-input-group')
      .filter({ hasText: label })
      .first();
  }

  usernameFilter(): Locator {
    return this.filterGroup('Username').locator('input').first();
  }

  employeeNameFilter(): Locator {
    return this.filterGroup('Employee Name').locator('input').first();
  }

  recordsFoundLabel(): Locator {
    return this.page.getByText(/\(\d+\)\s+Records Found/).first();
  }

  firstDataRow(): Locator {
    return this.page.getByRole('row').nth(1);
  }

  async goto(): Promise<void> {
    await this.page.goto(ADMIN_USERS_PATH);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${ADMIN_USERS_PATH}$`));
    await expect(this.heading).toBeVisible();
    await expect(this.resetButton).toBeVisible();
    await expect(this.searchButton).toBeVisible();
  }

  async firstListedUsername(): Promise<string> {
    const usernameCell = this.firstDataRow().getByRole('cell').nth(1);
    return (await usernameCell.innerText()).trim();
  }
}
