import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { BUZZ_PATH } from '../config/orange-hrm-config';

export class BuzzPage {
  readonly heading: Locator;
  readonly postComposer: Locator;
  readonly postButton: Locator;
  readonly sharePhotosButton: Locator;
  readonly shareVideoButton: Locator;
  readonly modalTitle: Locator;
  readonly closeModalButton: Locator;
  readonly modalShareButton: Locator;
  readonly videoUrlInput: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Buzz' });
    this.postComposer = page
      .getByRole('textbox', { name: "What's on your mind?" })
      .first();
    this.postButton = page.getByRole('button', { name: 'Post', exact: true });
    this.sharePhotosButton = page.getByRole('button', {
      name: 'Share Photos',
      exact: true,
    });
    this.shareVideoButton = page.getByRole('button', {
      name: 'Share Video',
      exact: true,
    });
    this.modalTitle = page.locator('.oxd-dialog-container-default p').first();
    this.closeModalButton = page.getByRole('button', { name: '×' });
    this.modalShareButton = page.getByRole('button', {
      name: 'Share',
      exact: true,
    });
    this.videoUrlInput = page.getByRole('textbox', { name: 'Paste Video URL' });
  }

  async goto(): Promise<void> {
    await this.page.goto(BUZZ_PATH);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${BUZZ_PATH}$`));
    await expect(this.heading).toBeVisible();
    await expect(this.postComposer).toBeVisible();
  }
}
