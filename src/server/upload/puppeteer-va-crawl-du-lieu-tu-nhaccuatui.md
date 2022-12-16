# 1. Giới thiệu 
> Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium

**Puppeteer** là 1 thư viện Node cung cấp API mức cao để kiểm soát Chrome hoặc chương trình chạy trên nhân Chromium bằng **DevTools Protocol**. Chrome DevTools Protocol cho phép việc sử dụng các công cụ như: instrument, inspect, debug, profile,...bạn có thể xem thêm về DevTools Protocol tại [đây](https://chromedevtools.github.io/devtools-protocol/). 

Puppeteer mặc định chạy headless, nhưng có thể config để chạy full (non-headless) Chrome hoặc Chromium. [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) được Google giới thiệu từ Chrome version 59 - là 1 cách để chạy trình duyệt Chrome trong môi trường headless. Nói cách khác đó là 1 cách thực hiện chạy Chrome mà k cần chrome như cách chúng ta thường mở trình duyệt và duyệt web. 

Vậy mình tự hỏi là mấy cái phía trên nó giúp ích được gì?

Headless browser là 1 tool cho việc test tự động và môi trường server khi mà bạn không cần biết đến UI của trang web. 

Hầu hết mọi việc bạn thực hiện trong trình duyệt đều có thể thực hiện với Puppeteer như: 

- Chụp ảnh và file PDF của trang web
- Crawl dữ liệu trang web
- Tự động submit form, testing UI, input bàn phím
- Automated testing trực tiếp trên phiên bản mới nhất của Chrome 
- Phân tích vấn đề hiệu năng 
- Test Chrome extension 

# 2. Sử dụng 

Để sử dụng Puppeteer trong ứng dụng, chạy câu lệnh 
```js
npm i puppeteer
# or "yarn add puppeteer"
```

## 2.1. Chụp ảnh

Tạo 1 file example.js

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

Chạy câu lệnh: 
```js
node example.js
```

Puppeteer truy cập trang khởi tạo với size 800x600px, và chụp lại màn hình trang web đó.

## 2.2. Tạo file [PDF](https://github.com/puppeteer/puppeteer/blob/v2.0.0/docs/api.md#pagepdfoptions)

Tạo file examplePdf.js
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});

  await browser.close();
})();
```

Chạy câu lệnh
```js
node examplePdf.js
```
Sau khi thực thi câu lệnh sẽ tạo ra 1 file pdf với format bằng với kích thước A4 
## 2.3. Evaluate 

Đây là chức năng hay nhất của Puppeteer.

Sau đây mình sẽ sử dụng chức năng này vào việc lấy dữ liệu trong top 20 bài hát trang web [NhacCuaTui](https://www.nhaccuatui.com/bai-hat/top-20.html)

Điều kiện tiên quyết:
Bạn đã cài đặt sẵn Nodejs.

- Tạo Project nodejs: 

Tạo 1 folder "example"
```
mkdir example
```
Trỏ vào foldel vừa tạo: 
```
cd example
```
Init project:
```
npm init
```
Bạn cứ enter cho đến hết nếu không thay đổi gì. 

Sau đó thực hiện cài đặt thư viện puppeteer:
```js
npm i puppeteer
# or "yarn add puppeteer"
```

Tạo 1 file app.js để code:
```js
touch app.js
```

- Bạn truy cập vào trang web https://www.nhaccuatui.com/bai-hat/top-20.html để xem danh sách 20 bài hát top tuần.
- Inspect tại một bài hát bất kỳ sẽ thấy tên bài hát, tên ca sĩ và link đến bài hát đó:
![](https://images.viblo.asia/67f34b1c-4dbf-4a9a-8a8f-a843f4a61526.png)

Cùng xem cấu trúc như nào nhé:
Chúng ta sẽ có title bài hát và đường link đến bài hát có trong class "name_song". Ok thử xem nào.

Mở lại file app.js vừa tạo.
```js
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.nhaccuatui.com/bai-hat/top-20.html");

  const songs = await page.evaluate(() => {
    let items = document.querySelectorAll(".name_song");
    let links = [];
    items.forEach(item => {
      links.push({
        title: item.innerText,
        url: item.getAttribute("href")
      });
    });
    return links;
  });
  console.log(songs);
  await browser.close();
})();
```
Run file lên và xem nào:
![](https://images.viblo.asia/82a29c56-da4d-4346-9c95-09dc5318aac2.png)
Vẫn còn một số bài hát phía dưới nhưng do máy cùi, màn hình bé nên mình chỉ chụp được mấy bài đầu này thôi :D

- Tiếp theo truy cập vào từng url đã get được và inspect vào phần lyric để xem lyric được họ tổ chức ra sao
![](https://images.viblo.asia/e10d59e8-d0a4-4e62-af0f-39bd97e609d7.png)
À thì ra họ để trong class "pd_lyric trans" trong thẻ p. Tiếp nào!
```js
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.nhaccuatui.com/bai-hat/top-20.html");

  const songs = await page.evaluate(() => {
    let items = document.querySelectorAll(".name_song");
    let links = [];
    items.forEach(item => {
      links.push({
        title: item.innerText,
        url: item.getAttribute("href")
      });
    });
    return links;
  });

  for (let song of songs) {
    await page.goto(song.url);
    let lyric = await page.evaluate(() => {
      let lyric = document
        .getElementsByClassName("pd_lyric trans")[0]
        .innerHTML.replace(/\<br\>/g, "");
      return lyric;
    });
    console.log(song.title);
    console.log("..............................");
    console.log(lyric);
  }

  await browser.close();
})();
```
Phía trên mình có sử dụng **replace(/\<br\>/g, "")** để loại bỏ đi các thẻ br 
![](https://images.viblo.asia/f75ab675-d8ab-4dbd-a42c-88d9e95a7b4c.png)

- Nếu bạn muốn lưu vào file thì có thể sửa lại như sau:
```js
const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.nhaccuatui.com/bai-hat/top-20.html");

  const songs = await page.evaluate(() => {
    let items = document.querySelectorAll(".name_song");
    let links = [];
    items.forEach(item => {
      links.push({
        title: item.innerText,
        url: item.getAttribute("href")
      });
    });
    return links;
  });

  for (let song of songs) {
    await page.goto(song.url);
    let lyric = await page.evaluate(() => {
      let lyric = document
        .getElementsByClassName("pd_lyric trans")[0]
        .innerHTML.replace(/\<br\>/g, "");
      return lyric;
    });
    await fs.writeFile(`${song.title}.txt`, lyric, function(err) {
      if (err) throw err;
      console.log("Saved:" + song.title);
    });
  }
  await browser.close();
})();
```
Và đây là thành quả. yeah 
![](https://images.viblo.asia/636d67ef-0490-49ba-a79a-bd11f7de7df9.png)

# 3. Note 

Default setting
- Headless mode:

Puppeteer chạy Chromium trong headless mode mặc định. Để xem full version Chromium, hãy set lại headless:
```js
const browser = await puppeteer.launch({headless: false}); // default is true
```
- Sử dụng phiên bản chỉ định sẵn của Chromium

Mặc định, Puppeteer sẽ download và sử dụng 1 phiên bản nhất định của Chromium để chắc rằng mọi thứ được chạy đảm bảo nhất. Để sử dụng 1 phiên bản Chrome hoặc Chromium khác với bản hiện có, truyền vào đường dẫn khi tạo instance Browser:
```
const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
```

Tham khảo

https://github.com/puppeteer/puppeteer

https://developers.google.com/web/tools/puppeteer