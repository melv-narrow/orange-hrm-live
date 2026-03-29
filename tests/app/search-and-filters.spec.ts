import { applyAllureMetadata } from '../support/allure';
import { test, expect } from '../fixtures/test';

test.describe('Authenticated search and filter flows', () => {
  test('@regression keeps the selected admin username filter through search and clears it on reset', async ({
    adminPage,
  }) => {
    await applyAllureMetadata({
      epic: 'Administration',
      feature: 'System Users',
      story: 'Search and reset user filters',
      severity: 'normal',
      tags: ['regression', 'admin', 'search', 'filters'],
    });

    await adminPage.goto();
    await adminPage.expectLoaded();

    const reusableUsername = await adminPage.firstListedUsername();
    const initialRecordsText = await adminPage.recordsFoundLabel().innerText();

    await adminPage.usernameFilter().fill(reusableUsername);
    await adminPage.searchButton.click();

    await expect(adminPage.usernameFilter()).toHaveValue(reusableUsername);
    await expect(adminPage.firstDataRow()).toContainText(reusableUsername);

    await adminPage.resetButton.click();

    await expect(adminPage.usernameFilter()).toHaveValue('');
    await expect(adminPage.recordsFoundLabel()).toHaveText(initialRecordsText);
  });

  test('@regression finds an existing employee in Directory and restores the default list on reset', async ({
    directoryPage,
    page,
  }) => {
    await applyAllureMetadata({
      epic: 'Directory',
      feature: 'Employee Search',
      story: 'Search and reset directory filters',
      severity: 'normal',
      tags: ['regression', 'directory', 'search', 'filters'],
    });

    await directoryPage.goto();
    await directoryPage.expectLoaded();

    const existingEmployeeName = await directoryPage.firstVisibleEmployeeName();
    const initialRecordsText = await directoryPage
      .recordsFoundLabel()
      .innerText();

    await directoryPage.employeeNameFilter().fill(existingEmployeeName);
    await directoryPage.searchButton.click();

    await expect(directoryPage.employeeNameFilter()).toHaveValue(
      existingEmployeeName,
    );
    await expect(
      page.getByText(existingEmployeeName, { exact: true }).first(),
    ).toBeVisible();

    await directoryPage.resetButton.click();

    await expect(directoryPage.employeeNameFilter()).toHaveValue('');
    await expect(directoryPage.recordsFoundLabel()).toHaveText(
      initialRecordsText,
    );
  });
});
