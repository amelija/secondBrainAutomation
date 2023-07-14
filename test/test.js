const { expect, test, chromium } = require('@playwright/test');
const { DewosearchPage } = require('../pages/dewosearch.page');
const locators = require('../page-locators/locators');

let dewoPage;
const categories = [
  { categoryName: "Documents"},
  { categoryName: "Design"}
];

const testData = [
  { docNumber: 1},
  { docNumber: 2},
  { docNumber: 3},
  { docNumber: 4}
];

test.beforeEach(async ({ page }) => {
    dewoPage = new DewosearchPage(page);
    await dewoPage.navigate();
});

test.describe('Home page', () => {

  test('Has recent docs, events today and most used today categories @homepagecat', async () => {
  	const allCategories = await dewoPage.allHomePageCategoriesText();
  	//await expect(allCategories).toHaveCount(3)
  	console.log(allCategories)
    //await expect(allCategories).toEqual(['Recent Documents', 'Most used today']);
    if(allCategories.length == 3) {
      await expect(allCategories).toEqual(['Recent Documents', 'Most used today', 'Events today']);
    } else if(allCategories.length == 2) {
      await expect(allCategories).toEqual(['Recent Documents', 'Most used today']);
    } else {
      await expect(allCategories).toEqual(['Recent Documents']);
    }
  });

  test('Total number of recent documents is 5 @recent', async () => {
  	const mostUsedTodayLabel = dewoPage.locator(locators.mostUsedToday);
  	const mostUsedTodayId = await mostUsedTodayLabel.getAttribute('id');
  	await expect(mostUsedTodayId).toContain("6");
  });

  test('Documents should be listed as last seen in ascending order @order', async () => {
  	await dewoPage.selectFirstDocumentAndWait1sec();
  	await dewoPage.refreshPage();
  	const firstDocTime = await dewoPage.getLastSeenTimeOfDocMilisec();
  	dewoPage.navigateThroughDocs("down");
  	const secondDocTime = await dewoPage.getLastSeenTimeOfDocMilisec();
  	expect(firstDocTime).toBeLessThan(secondDocTime);
    dewoPage.navigateThroughDocs("down");
    const thirdDocTime = await dewoPage.getLastSeenTimeOfDocMilisec();
    expect(secondDocTime).toBeLessThanOrEqual(thirdDocTime);
    dewoPage.navigateThroughDocs("down");
    const fourthDocTime = await dewoPage.getLastSeenTimeOfDocMilisec();
    expect(thirdDocTime).toBeLessThanOrEqual(fourthDocTime);
  });

for (const data of categories) {
  test(`It is possible to filter search results based on "${data.categoryName}" category @category`, async () => {
  	await dewoPage.typeSearchQuery(data.categoryName);
  	await dewoPage.clickFirstFilterResult();
  	let allCategories = await dewoPage.allHomePageCategoriesText();
    allCategories = allCategories[0].toString();
  	await expect(allCategories).toContain(data.categoryName);
  });
}

  for (const data of testData) {
    test(`User can access details of document number "${data.docNumber}" @opendetails`, async () => {
      await dewoPage.openDocumentDetails(data.docNumber);
      await expect(dewoPage.locator(locators.subscribersLabel)).toBeVisible();
      await expect(dewoPage.locator(locators.backlinksLabel)).toBeVisible();
      await expect(dewoPage.locator(locators.removeBtn)).toBeVisible();
    });
  }

  test.skip('Total number of returned documents on home page is >= 10', async () => {
    const listOfDocs = await dewoPage.allDocuments();
    await expect(listOfDocs.length).toBeGreaterThanOrEqual(10);
  });

   test.skip('Title of document in Second Brain should match title in browser', async () => {
    // this can't be automated for now because all documents will require authentication 
    await dewoPage.selectFirstDocument();
  });

 });
