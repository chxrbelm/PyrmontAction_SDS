import { test, expect } from '@playwright/test';

test('login page test without page object', async ({ page }) => {
  await page.goto('http://localhost:5173/login'); // replace with actual login page route

  await page.locator('#email').fill('1@gmail.com');
  await page.locator('#password').fill('1');

  await page.locator('#submitBtn').click();

  await expect(page).toHaveURL('http://localhost:5173/member');
  // await expect(page.locator('h1')).toContainText('Member Dashboard');
  // await expect(page.locator('p1')).toHaveText('First Name: dsfssfdfdsa');
  // await expect(page.locator('p2')).toHaveText('Last Name: sdfdsfsdf');
  // await expect(page.locator('p3')).toHaveText('Phone Number: 0411111111');
  // await expect(page.locator('p4')).toHaveText('Postcode: NSW');
});
