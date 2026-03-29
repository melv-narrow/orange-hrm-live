import { applyAllureMetadata } from '../support/allure';
import { test, expect } from '../fixtures/test';

test.describe('Authenticated Buzz interactions', () => {
  test('@regression opens the Share Photos modal with the Share action disabled until media is selected', async ({
    buzzPage,
  }) => {
    await applyAllureMetadata({
      epic: 'Buzz',
      feature: 'Composer',
      story: 'Validate the photo sharing modal',
      severity: 'normal',
      tags: ['regression', 'buzz', 'media'],
    });

    await buzzPage.goto();
    await buzzPage.expectLoaded();
    await buzzPage.sharePhotosButton.click();

    await expect(buzzPage.modalTitle).toHaveText('Share Photos');
    await expect(buzzPage.modalShareButton).toBeDisabled();

    await buzzPage.closeModalButton.click();
    await expect(buzzPage.modalTitle).toBeHidden();
  });

  test('@regression requires a video URL before sharing a Buzz video post', async ({
    buzzPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Buzz',
      feature: 'Composer',
      story: 'Validate required fields for a video post',
      severity: 'normal',
      tags: ['regression', 'buzz', 'validation'],
    });

    await buzzPage.goto();
    await buzzPage.expectLoaded();
    await buzzPage.shareVideoButton.click();

    await expect(buzzPage.modalTitle).toHaveText('Share Video');
    await buzzPage.modalShareButton.click();

    await expect(page.getByText('Required', { exact: true })).toBeVisible();
    await expect(buzzPage.videoUrlInput).toHaveValue('');
  });
});
