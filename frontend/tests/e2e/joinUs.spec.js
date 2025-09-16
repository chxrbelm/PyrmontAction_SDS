import { test, expect } from '@playwright/test';
// import { LoginPage } from "../../pages/login/loginPage";

test('registration test without page object', async ({ page }) => {
  await page.goto('http://localhost:5173/joinus'); // replace with actual join us page route

  // Fill Login Details
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  await page.locator('#email').fill(uniqueEmail);
  await page.locator('#password').fill('Password123!');

  // Fill Personal Details
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('#mobile-phone').fill('0412345678');
  await page.locator('#areaOfInterestTextArea').fill('Community Engagement');

  // Fill Address Details
  await page.locator('#street-name').fill('123 Example Street');
  await page.locator('#city').fill('Sydney');
  await page.locator('#state').selectOption('NSW'); 
  await page.locator('#postcode').fill('2000');

  // Submit the form
  await page.locator('#submitBtn').click();

  // Assert successful redirect to login page
  await expect(page).toHaveURL(/.*\/login/);
  // await page.goto('http://localhost:5173/login'); // replace with actual login page route
  // await expect(page.locator('#welcome-heading')).toHaveText('Welcome back');
});

// http://localhost:5173/member
// 