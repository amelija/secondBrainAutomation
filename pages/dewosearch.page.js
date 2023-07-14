// @ts-check

const {  test, expect, Page } = require('@playwright/test');
const locators = require('../page-locators/locators');
const { Keyboard } = require('@playwright/test');

class DewosearchPage {
  constructor(page) {
    this.page = page;
  }

  locator(selector) {
    return this.page.locator(selector);
  }

  async getByRole(role) {
    return await this.page.locator(`[role="${role}"]`);
  }

  async navigate(){
  	await this.page.waitForLoadState();
  	await this.page.goto('https://app.dewo.io/api/auth/login?token=ekDYy7toaxMpryDjartYuNXyJlXGp6ZQTQUmT2X5Qe0');
  	//await this.page.goto('https://app.dewo.io/search/home');
  	await this.page.waitForLoadState();
    await expect(this.page).toHaveTitle(/Dewo/);
    await this.page.locator(locators.searchingForMemories).waitFor({state: 'hidden'}); //wait until documents are loaded
    //await this.page.waitForTimeout(2000);
  }

  async recentDocumentsLabel() {
    return await this.page.locator(locators.recentDocsLabel);
  }

  async mostUsedTodayLabel() {
  	return await this.page.locator(locators.mostUsedToday);
  }

  async allDocuments(){
  	return await this.page.$$(locators.recentDocs);
  }

  async getTitle() {
  	console.log(await this.page.title());
  	return await this.page.title();
  }

  async getUrl() {
  	console.log(await this.page.url());
  	return await this.page.url();
  }

  async allHomePageCategoriesText() {
  	const allCategories = await this.page.$$(locators.allHomePageCategories);

  	//This takes an array of locators called allCategories, maps each locator to its inner text value, and returns a 
  	//Promise that resolves with an array of all the inner text values once all the promises for each element have resolved. 
  	//Essentially, it waits for all the elements to be located and their inner text values to be extracted before returning the array of those values.
  	const innerTextOfCategories = await Promise.all(allCategories.map(element => element.innerText()));
  	
  	return innerTextOfCategories
  }

  async typeSearchQuery(searchQuery){
  	await this.page.locator(locators.searchInput).fill(searchQuery);
  	//await this.page.waitForTimeout(2000);
  }

  async clickFirstFilterResult() {
  	await this.page.locator(locators.filterResult).click();
  	await this.page.waitForTimeout(1000);
  }

  async selectFirstDocumentAndWait1sec() {
  	/*const keyboard = this.page.keyboard;
  	keyboard.press('Enter');*/
  	await this.page.locator(locators.firstDocument).click();
  	await this.page.waitForTimeout(1000);
  }

  async openDocumentDetails(doc_number) {
  	await this.page.locator(`//a[@id='downshift-full-item-${doc_number}']`).hover();
  	await this.page.locator(`//a[@id='downshift-full-item-${doc_number}']//button[contains(text(), 'Details')]`).click();
  }

  navigateThroughDocs(direction) {
  	const keyboard = this.page.keyboard;
  	switch (direction) {
  	  case 'up':
    	keyboard.press('ArrowUp');
    	break;
  	  case 'down':
    	keyboard.press('ArrowDown');
    	break;
      // return to home page
  	  case 'left':
    	keyboard.press('ArrowLeft');
    	break;
      //open more details
      case 'right':
    	keyboard.press('ArrowRight');
    	break;
  	  default:
    	throw new Error(`Unsupported command: ${direction}`);
	}
  }

  parseTimeDuration(durationString) {
  	const unitMap = {
      's': 1000,
      'm': 60 * 1000,
      'h': 60 * 60 * 1000
    };
    const durationParts = durationString.match(/^(\d+)(ms|s|m|h|d)$/);
    const value = parseInt(durationParts[1]);
    const unit = unitMap[durationParts[2]];
    return value * unit;
  }

  async refreshPage() {
  	await this.page.reload();
  }

  async extractTimeFromString(string) {
  	let time;
  	if(string.startsWith("~")){
  		time = string.split("~")[1].split(" ")[0];
  	} else if(string.startsWith("<")){
  		time = string.split("<")[1].split(" ")[0];
  	} else {
  		time = string.split(" ")[0];
  	}
  	return time;
  }

  async lastSeenDocString() {
  	const element = await this.page.locator(locators.lastSeenTime);
  	const text = await element.innerText();
  	console.log("text: "+text);
  	return text;
  }

  async getLastSeenTimeOfDocMilisec() {
  	const lastSeenTime = await this.lastSeenDocString().then(text => this.extractTimeFromString(text));
  	const parsedTime = this.parseTimeDuration(lastSeenTime);
  	console.log("Parsed time: "+parsedTime);
  	return parsedTime;
  }

  /*async compareOrderOfDocs() {
  	//by default first document is always highlighted
  	const lastSeenFirstDoc = await this.lastSeenDocString().then(text => this.extractTimeFromString(text));
  	console.log("After extracting: "+lastSeenFirstDoc);
  	
  	this.navigateThroughDocs('down');
  	const lastSeenSecondDoc = await this.lastSeenDocString().then(text => this.extractTimeFromString(text));
 
  	await expect(this.parseTimeDuration(lastSeenFirstDoc)).toBeLessThan(this.parseTimeDuration(lastSeenSecondDoc));
  }*/

}
//this is needed to export values; making it available for use in other modules that imports this module, like test.js file
//or we can just say at the top exports.DewosearchPage = class DewosearchPage
module.exports = { DewosearchPage }; 
