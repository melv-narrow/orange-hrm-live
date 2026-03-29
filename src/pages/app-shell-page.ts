import type { Locator, Page } from '@playwright/test';

export class AppShellPage {
  readonly sidePanel: Locator;
  readonly sidePanelSearch: Locator;
  readonly userDropdown: Locator;

  constructor(private readonly page: Page) {
    this.sidePanel = page.getByRole('navigation', { name: 'Sidepanel' });
    this.sidePanelSearch = this.sidePanel.getByRole('textbox', { name: 'Search' });
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
  }

  menuItem(name: string): Locator {
    return this.sidePanel.getByRole('link', { name, exact: true });
  }

  userMenuItem(name: string): Locator {
    return this.page.getByRole('menuitem', { name, exact: true });
  }

  async filterMenu(searchTerm: string): Promise<void> {
    await this.sidePanelSearch.fill(searchTerm);
  }

  async openUserMenu(): Promise<void> {
    await this.userDropdown.click();
  }
}
