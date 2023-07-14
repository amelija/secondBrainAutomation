const { Locator } = require('@playwright/test');

module.exports = {
  
  // This will return locator as a function 
  // emailInput: () => page.locator('#email') 
  
  // This will return locator as a string 
  //Login elements
  emailInput: '//input[@id="email"]',
  nextButton: '//input[@value="Next"]',
  passwordInput: '//input[@id="password"]',
  logInButton: '//input[@value="Log in"]', 

  // Search window elements
  searchInput: '//p[@data-placeholder="Search your second brain"]',
  recentDocsLabel: "//li[@id='downshift-full-item-0']",
  recentDocs: "//a[contains(@id, 'downshift-full-item')]",
  allHomePageCategories: "//li[contains(@id, 'downshift-full-item')]",
  mostUsedToday: "//li[contains(@id, 'downshift-full-item')][contains(text(), 'Most used today')]",
  mostUsedLastWeek: "//li[contains(@id, 'downshift-full-item')][contains(text(), 'Most used last week')]",

  searchingForMemories: "//h3[contains(text(), 'Searching for')]",

  // Documents searched
  lastSeenTime: "//a[@aria-selected='true']/small[@data-reveal='true']",

  // Filters
  filterResult: "//li[contains(@id, 'downshift-full-item')][contains(text(), 'Category')]//following-sibling::li[1]",

  // First document on the list
  firstDocument: "//a[@id='downshift-full-item-1']",
  firstDocDetailsBtn: "//a[@id='downshift-full-item-1']//button[contains(text(), 'Details')]",

  // Details 
  subscribersLabel: "//label[contains(text(), 'Subscriber')]",
  backlinksLabel: "//label[contains(text(), 'Backlinks')]",
  removeBtn: "//button[contains(text(), 'Remove')]"
};