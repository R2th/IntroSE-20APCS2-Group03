> Bài viết gốc https://medium.com/@bmshamsnahid/automated-testing-with-selenium-webdriver-and-node-js-f99f64720352

# Giới thiệu

Selenium là một công cụ test tự động mã nguồn mở và hỗ trợ nhiều nền tảng. Nó có thể được sử dụng trong tất cả các trình duyệt phổ biến (Chrome, Firefox, Opera, IE và Edge) bằng hầu hết các ngôn ngữ lập trình. Ngoài ra, nó có thể được tích hợp với các công cụ và thư viện thử nghiệm khác nhau. Trong bài viết này, tôi sẽ trình bày một quy trình test trên trang tìm kiếm google với selenium web-driver và Node.js.

# Thực hiện

Ở đây chúng ta sẽ thử chạy test tự động trên https://www.google.com/ LOL

1. Đầu tiên, chúng ta kiểm tra xem trang có hộp input và nút để gửi hay không.
2. Sau đó, chúng ta đặt một tên ngẫu nhiên vào hộp input và nhấn gửi. Chúng ta sẽ kiểm tra xem kết quả tìm kiếm có xuất hiện hay không.

Tất cả những hoạt động này sẽ được thực hiện bởi selenium web-driver.
Với testing framework, chúng ta sẽ sử dụng mocha & chai để viết test.

# Cài đặt Project

[Clone hoặc fork repo chứa mã nguồn](https://github.com/bmshamsnahid/Automation-With-Selenium-And-Node.js)

Project của chúng ta sẽ có cấu trúc thư mục như sau:

```
├── ...
│
├── lib                         # Helper methods
│   ├── basePage.js             # Generic functionality for tests
│   └── homePage.js             # Home page testing functionality
│
├── test                        # Test suite
│   └── homePage.test.js        # Testing in home page
│
├── utils                       # Utility files for testing
│   ├── fakeData.js             # Generating random keyword for searching
│   └── locator.js              # HTML and CSS identifier for elements to test
│
├── package.json                # Project dependency
├── ...
```

Đây là file package.json: 

```
{
  "name": "googlesearch",
  "version": "1.0.0",
  "description": "Google home page automated test ",
  "main": "index.js",
  "scripts": {
    "test": "mocha test --reporter mochawesome --reporter-options autoOpen=true"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/bmshamsnahid/Automation-With-Selenium-And-Node.js.git"
  },
  "author": "B M Shams Nahid",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/bmshamsnahid/Automation-With-Selenium-And-Node.js/issues"
  },
  "homepage": "https://github.com/bmshamsnahid/Automation-With-Selenium-And-Node.js#readme",
  "devDependencies": {
    "chai": "^4.1.2",
    "chai-as-promised": "^7.1.1",
    "chromedriver": "^2.41.0",
    "faker": "^4.1.0",
    "mocha": "^5.2.0",
    "mochawesome": "^3.0.3",
    "selenium-webdriver": "^4.0.0-alpha.1"
  }
}
```

# Các hàm chính

Chúng ta có 2 hàm chính đặt trong thư mục `util`:
1. fakeData.js
2. locator.js

Trong `utils/fakeData.js`, chúng ta sẽ viết code để tạo một cái tên ngẫu nhiên và dùng để tìm nó trên google.

```js
const faker = require('faker');

module.exports = {
  nameKeyword: faker.name.findName()
};
```

Trong `utils/locator.js` chúng ta quy định một số  HTML elements selector sẽ sử dụng.

```js
module.exports = {
  searchInputSelectorId: 'lst-ib',
  searchButtonSelectorName: 'btnK',
  resultConfirmationId: 'resultStats'
};
```

Ở đây chúng ta có 3 selectors:

1. Google search input box là “searchInputSelectorId”,
2. Google search button key là “searchButtonSelectorName”
3. Không tìm thấy kết quả nào phù hợp trên trang kết quả tìm kiếm là “resultStats”

# Các hàm hỗ trợ
Chúng ta đặt các hàm chung của mình trong `lib/basePage.js`:

```js
const {Builder, By, until} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
// o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });

var Page = function() {
  this.driver = new Builder()
    .setChromeOptions(o)
    .forBrowser('chrome')
    .build();

  // visit a webpage
  this.visit = async function(theUrl) {
    return await this.driver.get(theUrl);
  };

  // quit current session
  this.quit = async function() {
    return await this.driver.quit();
  };

  // wait and find a specific element with it's id
  this.findById = async function(id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
    return await this.driver.findElement(By.id(id));
  };

  // wait and find a specific element with it's name
  this.findByName = async function(name) {
    await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
    return await this.driver.findElement(By.name(name));
  };

  // fill input web elements
  this.write = async function (el, txt) {
    return await el.sendKeys(txt);
  };
};

module.exports = Page;
```

Đối với mục đích thử nghiệm, các hàm chính được đưa vào `utils/homePage.js`:

```js
let Page = require('./basePage');
const locator = require('../utils/locator');
const fake = require('../utils/fakeData');

const searchInputSelectorId = locator.searchInputSelectorId;
const searchButtonSelectorName = locator.searchButtonSelectorName;
const resultConfirmationSelectorId = locator.resultConfirmationId;

const fakeNameKeyword = fake.nameKeyword;

let searchInput, searchButton, resultStat;

Page.prototype.findInputAndButton = async function () {
  searchInput = await this.findById(searchInputSelectorId);
  searchButton = await this.findByName(searchButtonSelectorName);

  const result = await this.driver.wait(async function () {
    const searchButtonText = await searchButton.getAttribute('value');
    const searchInputEnableFlag = await searchInput.isEnabled();

    return {
        inputEnabled: searchInputEnableFlag,
        buttonText: searchButtonText
    }
  }, 5000);
  return result;
};

Page.prototype.submitKeywordAndGetResult = async function() {
  await this.findInputAndButton();
  await this.write(searchInput, fakeNameKeyword);
  await searchButton.click();
  resultStat = await this.findById(resultConfirmationSelectorId);
  return await this.driver.wait(async function () {
    return await resultStat.getText();
  }, 5000);
};

module.exports = Page;
```

Chúng ta có 2 hàm ở đây.

Hàm đầu tiên tìm nút gửi và hộp input. Kiểm tra nó có hoạt động hay không.

Hàm thứ hai đặt một tên ngẫu nhiên (sinh ra từ `fake.js`) vào hộp input và xác nhận kết quả tìm kiếm.

# Viết Test

Giờ chúng ta sẽ viết test suite đầu tiên ở file `test/homePage.test.js`:

```js
const { describe, it, after, before } = require('mocha');
const Page = require('../lib/homePage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
  try {
    describe ('Google search automated testing', async function () {
      this.timeout(50000);
      let driver, page;

      beforeEach (async () => {
        page = new Page();
        driver = page.driver;
        await page.visit('https://www.google.com/');
      });

      afterEach (async () => {
        await page.quit();
      });

      it ('find the input box and google search button', async () => {
        const result = await page.findInputAndButton();
        expect(result.inputEnabled).to.equal(true);
        expect(result.buttonText).to.include('Google');
      });

      it ('put keyword in search box and click search button', async () => {
        const result = await page.submitKeywordAndGetResult();
        expect(result.length).to.be.above(10);
      });
    });
  } catch (ex) {
    console.log (new Error(ex.message));
  } finally {

  }
})();
```

Ở đây chúng ta đang chạy hai test case, một kiểm tra sự tồn tại của hộp input và nút tìm kiếm.
Cái còn lại để kiểm tra kết quả tìm kiếm, sau khi chúng ta đặt từ khóa mong muốn vào hộp tìm kiếm và nhấn nút tìm kiếm.

# Run Test

Giờ chúng ta đã sẵn sàng để chạy test đầu tiên. Đảm bảo rằng trong tệp `package.json` của bạn, câu lệnh `test` được viết chính xác. Để xác nhận, bạn có thể kiểm tra tệp `package.json` của tôi. Tôi đã chia sẻ ở phía trên của bài viết.

Run

```
npm test
```

Bây giờ bài kiểm tra sẽ chạy và cả hai đều sẽ pass.

# Tinh chỉnh cấu hình

Để chạy test trong các trình duyệt không có giao diện người dùng (the headless browser), hãy truy cập `lib/basePage.js` và bỏ comment tùy chọn 'headless' cho chrome.

Trong trường hợp bạn muốn sử dụng trình duyệt Firefox, IE, Edge hoặc Opera, hãy kiểm tra [tài liệu hướng dẫn](https://www.selenium.dev/selenium/docs/api/javascript/index.html).