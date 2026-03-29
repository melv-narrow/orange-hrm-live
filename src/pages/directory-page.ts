import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { DIRECTORY_PATH } from '../config/orange-hrm-config';

export class DirectoryPage {
  readonly heading: Locator;
  readonly employeeCards: Locator;
  readonly resetButton: Locator;
  readonly searchButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page
      .getByRole('heading', { name: 'Directory', exact: true })
      .last();
    this.employeeCards = page.locator('.orangehrm-directory-card');
    this.resetButton = page.getByRole('button', { name: 'Reset', exact: true });
    this.searchButton = page.getByRole('button', {
      name: 'Search',
      exact: true,
    });
  }

  employeeNameFilter(): Locator {
    return this.page
      .getByRole('textbox', { name: 'Type for hints...' })
      .first();
  }

  recordsFoundLabel(): Locator {
    return this.page.getByText(/\(\d+\)\s+Records Found/).first();
  }

  async goto(): Promise<void> {
    await this.page.goto(DIRECTORY_PATH);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${DIRECTORY_PATH}$`));
    await expect(this.heading).toBeVisible();
    await expect(this.employeeCards.first()).toBeVisible();
  }

  async firstVisibleEmployeeName(): Promise<string> {
    const visibleCardCount = await this.employeeCards.count();

    for (let index = 0; index < visibleCardCount; index += 1) {
      const candidateTexts = await this.employeeCards
        .nth(index)
        .locator('.oxd-text')
        .allInnerTexts();
      const employeeName = candidateTexts
        .map((text) => text.trim())
        .find(
          (text) =>
            Boolean(text) &&
            text.includes(' ') &&
            !text.includes('Records Found'),
        );

      if (employeeName) {
        return employeeName;
      }
    }

    if (!visibleCardCount) {
      throw new Error(
        'No directory employee cards were visible to capture a reusable search target.',
      );
    }

    throw new Error(
      'Directory employee cards were present, but no reusable employee name was found.',
    );
  }
}
