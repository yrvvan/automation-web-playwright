// @ts-check
const { test, expect } = require('@playwright/test');

test('Valid Login User', async ({ page }) => {
  await page.goto('https://dev.ralali.xyz/login');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Masuk / Login | Ralali.com');
  await page.locator('data-testid=input-username').fill('bigmart3@yopmail.com');
  await page.locator('data-testid=input-password').fill('Test1234!');
  await page.locator('data-testid=button-submit').click();

  await expect(page).toHaveTitle('Wholesale Marketplace - Pusat Grosir Online Indonesia');
  await page.locator('data-testid=store-name-wrapper').isVisible();
});
