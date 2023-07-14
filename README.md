# UI automation

## Running tests 

### 1. Install Playwright

`npm init playwright@latest`

### 2. Run tests

All tests:

`npx playwright test`


Specific file with all tests inside: 

`npx playwright test test.js`


With browser running:

`npx playwright test --headed`


With specific browser: 

`npx playwright test --project=chromium`


One specific test case using test name:

`npx playwright test -g "Name of the test"` 


To show test report:

`npx playwright show-report`


To run record with tag:

`npx playwright test --grep @slow`

### 3. Debug tests

`npx playwright test --debug`
