console.log("Starting authentication");

const { expect, chromium } = require('@playwright/test');
const locators = require('./page-locators/locators');

module.exports = async config => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(process.env.PROD);

// Login data
  
  await page.click(locators.emailInput);
  await page.fill(locators.emailInput, process.env.EMAIL);
  await page.click(locators.nextButton);
  await page.click(locators.passwordInput)
  await page.fill(locators.passwordInput, process.env.PASSWORD);
  await page.click(locators.logInButton);

/*
One possible way to get locators
  await page.locator('#email').click();
  await page.locator('#email').fill('marija@memory.ai');
  await page.locator('#email').press('Enter');
  await page.locator('#password').click();
  await page.locator('#password').fill('kameleon87');
  await page.locator('#password').press('Enter');

Another way to do the same
  await page.locator("//input[@id='email']").fill('marija@memory.ai');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator("//input[@id='password']").fill('kameleon87');
  await page.getByText('Log in', { exact: true }).click();
*/

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });

  //await browser.close();
};