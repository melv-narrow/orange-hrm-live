import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { DASHBOARD_PATH } from '../config/orange-hrm-config';

export class DashboardPage {
  readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
  }

  widgetHeading(name: string): Locator {
    return this.page.getByText(name, { exact: true }).first();
  }

  quickLaunchButton(name: string): Locator {
    return this.page.getByRole('button', { name, exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto(DASHBOARD_PATH);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${DASHBOARD_PATH}$`));
    await expect(this.heading).toBeVisible();
  }
}
