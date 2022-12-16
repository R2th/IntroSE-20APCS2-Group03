Bài viết này mình sẽ giới thiệu cho các bạn craw dữ liệu của web site sử dụng nodejs và Puppeteer. 


## Pupperteer là gì?
> Puppeteer là một thư viện của Node cung cấp API cấp cao để kiểm soát Chrome hoặc Chromium sử dụng giao thức DevTools. Puppeteer mặc định chạy headless, nhưng có thể được định cấu hình để chạy non-headless.

Các bạn có thể tham khảo chi tiết ở đây: https://viblo.asia/p/nghich-ngom-voi-puppeteer-Qbq5Q3j4ZD8

### Một số lệnh hay dùng nhất của Puppeteer

Dưới đây mình sẽ giới thiệu một số lệnh hay dùng nhất khi sử dụng Puppeteer để crawler dữ liệu. Những lệnh này là những lệnh hữu dụng và hay dùng nhất trong crawl data. bạn cần ghi nhớ để có thể đọc hiểu được code những phần tiếp theo nhé.

#### page.newPage()

mở một tab mới của trình duyệt
```js
let page = await browser.newPage();
```

#### page.goto

đi đến một trang web

```js
await page.goto('https://viblo.asia/');
```


#### page.setExtraHTTPHeaders 

set header cho trình duyệt:

```js
await page.setExtraHTTPHeaders({
                'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
            });
```


#### page.setUserAgent

set agent cho trình duyệt

```js
 await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
```


#### page.setViewport

set độ rộng cho browser
```
 await page.setViewport({width: 1500, height: 1500});
```


#### page.type

tự enter dữ liệu vào một ô input

```js
await page.type("input[name='email']", 'viblo@gmail.com', {delay: 100});
```


#### page.click

Click vào 1 chỗ bất kỳ (buton, link, input ...)

```js
page.click("input[type='submit']");
await page.click('span[data-hook="ryp-review-submit-button"]');
```


#### page.waitFor
để trình duyệt load hoặc chờ đợi một khoảng thời gian
```
 page.waitFor(7000);
```


####  page.waitForSelecto
Đợi một element xuất hiện, ví dự bạn muốn đợi có button login xuất hiện 

```js
 await page.waitForSelector('#continue');
```


#### page.evaluate

cho phép bạn thực hiện những câu lệnh js trên browser

```js
 let captcha = await page.evaluate(() => {
          return document.getElementById('auth-captcha-image-container');
});
```


#### page.$eval
Mình thấy nó khá giống với lệnh evaluate ở trên
```js
const stockAvailable = await newPage.$eval('.instock.availability', text => {
                // Strip new line and tab spaces
                text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
                // Get the number of stock available
                let regexp = /^.*\((.*)\).*$/i;
                let stockAvailable = regexp.exec(text)[1].split(' ')[0];
                return stockAvailable;
            });
```

kiểm tra xem có id là `auth-captcha-image-container` không

```js
await page.evaluate(() => {
                const reviewLists = document.querySelectorAll(".ryp__star__button");
                reviewLists.forEach(async (review, i) => {
                    let j = i + 1;
                    if (j % 5 === 0) {
                        reviewLists[i].click();
                    }
                });
            });
```

hay là sử dụng forEach lấy dữ liệu browser rồi đặt tất cả và một list


#### browser.close();

đóng browser khi đã hoàn thành xong tất cả các task, bạn chú ý đừng quên lệnh này, nếu không browser sẽ luôn được mở mới, sẽ cực kỳ tốn ram của hệ thống nhé bạn.

```
   await browser.close();
```


## Chuẩn bị

Giả sử bạn đã cài đặt nodejs trên máy tính của bạn

### Setup project

Tạo một folder project:

```sh
mkdir book-scraper
cd book-scraper
```

Khởi tạo `npm init` trong project của bạn để điền một số thành phần như tên, version ...

Sau khi khởi tạo bạn sẽ có 1 file `package.json` có nội dung kiểu thế này, bạn có thể tùy chỉnh name, desciption ...
```json
{
  "name": "sammy_scraper",
  "version": "1.0.0",
  "description": "a web scraper",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "sammy the shark",
  "license": "ISC"
}
```

Tiếp theo chúng ta cần cài đặt `puppeteer`:

```
npm install --save puppeteer
```

sau khi lệnh này chạy xong chúng ta thêm dòng code `"start": "node index.js"` vào trong `package.json`

```
nano package.json
```

```
{
  . . .
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js" ## thêm vào đây
  },
  . . .
  "dependencies": {
    "puppeteer": "^5.2.1"
  }
}
```
 từ h trở đi bạn cần chạy lệnh `npm run start` là có thể start app của bạn lên, nó tương đương với bạn chạy lệnh `node index.js` :D
 
 ### Setup Browser
 
 Như chúng ta biết puppeteer chính là một headless browser like  Chromium, cho phép chúng ta chạy browser mà ko cần ` user interface.`, trong bước này chúng ta sẽ tạo ra file `browser.js` để khởi chạy một `headless browser`
 
 ```
 nano browser.js
 ```
 
```js
// ./book-scraper/browser.js
const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};
```

File này khá đơn giản, nhiệm vụ của nó chỉ là khởi tạo một browser lên để cho chúng ta dùng sau này mà thôi, bạn cần chú ý một chỗ là `headless: false`, có nghĩ là bạn đang khởi tạo một browser có giao diện người dùng, bật có giao diện lên trong quá trình dev để chúng ta biết được nó chạy như thế nào thôi, còn khi deploy lên server bạn phải ẩn nó đi, nếu không ẩn khi chạy nó sẽ báo lỗi. có lẽ vì server thường ko cài giao diện :v: 


Tiếp theo chúng ta cần file index.js là file chạy chính và file pageController.js để điều hướng bot của bạn

```js
// ./book-scraper/index.js

const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)
```

```js
// ./book-scraper/pageController.js
const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        await pageScraper.scraper(browser);

    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
```

Tiếp theo chúng ta tạo 1 file `pageScraper.js`, file này sẽ có nhiệm vụ chính là đọc dữ liệu của trang web

```js
const scraperObject = {
    url: 'http://books.toscrape.com',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

    }
}

module.exports = scraperObject;
```

cuối cùng project của chúng ta sẽ có cấu trúc flle như sau:

```
.
├── browser.js
├── index.js
├── node_modules
├── package-lock.json
├── package.json
├── pageController.js
└── pageScraper.js
```

Đến đây khi bạn chạy `npm run start` thì nó sẽ tự mở một browser lên, bật 1 tab mới và tự động vào trang web `books.toscrape.com`

![](https://images.viblo.asia/6fdb2f1f-15de-4b03-b071-8edd3ffcc282.png)

đến đây là project của bạn đã setup trong toàn bộ rồi, chỉ cần code thôi. bài viết này cũng khá dài rồi, mình sẽ tách phần bóc tách dữ liệu và deploy server sang một bài tiếp nhé.

### Tham khảo
- https://viblo.asia/p/nghich-ngom-voi-puppeteer-Qbq5Q3j4ZD8
- https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer