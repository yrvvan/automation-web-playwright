# automation-web-playwright

### Requirements
- Node [https://go.dev/doc/install](https://nodejs.org/en)
  ```sh
  $ brew install node
  ```

### Getting started
#### Step 1 - Install dependencies
- Go to `automation-web-playwright` by running `cd automation-web-playwright`
- Install dependencies inside the directory by running:
  ```sh
  $ npm i
  ```
- Install playwright dependencies if you're using various browser compatibility(Chromium, Firefox, Webkit) by running:
  ```sh
  $ npx playwright install
  ```

#### Step 2 - Run the test
Run the test in the directory to run the steps you have defined
```sh
$ npm run test
```

### Directory Structure
        .
        ├── test 
        │  ├── test.spec.js
        │  └── ...
        │
        ├── helpers
        │  └── ..._helper.js
        │
        ├── playwright-report
        │  └── test-result.json
        │
        ├── package.json
        ├── env_sample
        └── playwright.config.js
