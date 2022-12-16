## 1. Pupperteer là gì?
Nguyên văn
>> **Puppeteer** is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol. It can also be configured to use full (non-headless) Chrome or Chromium.
>> 
Tạm dịch là:

>> **Puppeteer** là một thư viện của Node cung cấp API cấp cao để kiểm soát Chrome hoặc Chromium sử dụng giao thức DevTools. Puppeteer mặc định chạy [headless](https://developers.google.com/web/updates/2017/04/headless-chrome), nhưng có thể được định cấu hình để chạy non-headless.
>> 

Mình sẽ giải thích một chút: Theo mình hiểu, `run headless` là việc bạn chạy browser mà không có giao diện. Việc chạy browser như vậy thường để crawl dữ liệu, chụp ảnh màn hình,... chứ không phải để duyệt web.

Một số việc khá hay ho mà bạn có thể làm với **Pupperteer** là:
- Chụp ảnh màn hình hoặc xuất file pdf của các trang.
- Crawl một SPA (Single-Page Application) và xuất ra nội dung pre-rendered (ví dụ như "SSR" (Server-Side Rendering)).
- Tự động gửi form, test giao diện và nhập dữ liệu từ bàn phím,...
- Tạo môi trường testing tự động cập nhật. Chạy bản thử nghiệm trong Chorme với  các tính năng mới nhất và phiên bản javascript mới nhất.
- Ghi lại timeline trace cho website của bạn giúp phát hiện sớm các vấn đề về hiệu năng.
- Test Chorme Extensions.

Trong bài viết này, mình sẽ cùng các bạn thử dùng puppeteer để chụp ảnh màn hình hoặc xuất file pdf nhé :) Các tính năng khác, mình hẹn nhau trong tương lai nhé :sweat_smile:

## 2. Một số hàm thông dụng
### 2.1 puppeteer.launch([options])
Hàm `launch([options])` sẽ trả về một instance của brower với options là các cấu hình tùy chọn cho trình duyệt

Một số options:

| Options | Descrption| Type | Default |
| -------- | -------- | -------- | -------- |
| product     | Tùy chọn browser, có thể là `chorme` hoặc `firefox` | String |      |
| ignoreHTTPSErrors     | Bỏ qua HTTPs errors trong quá trình điều hướng     | Boolean     | false     |
| headless     | Run browser ở chế độ headless | Boolean     | true  | 
| executablePath      | Text     | String     | Text     |
|slowMo| Làm chậm các thực thi của puppeteer theo milliseconds | Number ||
|defaultViewport |Đặt chế độ xem trang gồm: width, height, deviceScaleFactor , isMobie, hasTouch, isLandscape |Object||
|args |Đối số bổ sung để lựa chọn phiên bản trình duyệt|Array<String>||
|ignoreDefaultArgs |Bỏ qua `puppetter.defaultArgs()`. Đây là một option khá nguy hiểm, cần cẩn thận khi sử dụng|boolean\|array<string>|false|
|handleSIGINT | Đóng trình duyệt với `Ctrl + C`|boolean |true|
|handleSIGTERM | Close the browser process on SIGTERM |boolean|true|
|handleSIGHUP  | Close the browser process on SIGHUP |boolean|true|
|timoeout|Thời gian milliseconds tối đa để start browser. Đặt `0` nếu không muốn xét timeout|Number|30000|
|dumpio   |Whether to pipe the browser process stdout and stderr into process.stdout and process.stderr |boolean|false|
|userDataDir |Đường dẫn tới [Thư mục của người dùng](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md) |String||
|env|Thiết lập một số biến môi trường cho browser|Object|process.env|
|devtools |Tự động mở DevTools cho mỗi tab. Nếu options này là `true` thì headless phải là `false`|Boolean||
|pipe |Kết nối với browser thông qua `pipe` thay vì WebSocket|Boolean|false|
|extraPrefsFirefox |Một số tùy chọn bổ sung khi dùng `firefox` |Object||

<br> 

**Trả về:  <[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Browser](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#class-browser)>>**

Chi tiết xem tại [đây](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions).
    
### 2.2 page.goto(url[, options])
Hàm này sẽ điều hướng đến trang của browser đến website mà bạn muốn crawl dữ liệu hoặc chụp ảnh màn hình,...vv
    
Các tham số đầu vào:
- url: URL để điều hướng trang.
- options: Một số tùy chọn khi điều hướng



| Options | Description | Type |Default|
| ----------- | ---------- | -------- |-------|
| timeout | Thời gian timeout tối đa, tính bằng miliseconds khi điều hướng| String | 30000|
| waitUntil  |   Xem xét điều hướng thành công. Có 4 tùy chọn là `load`, `domcontentloaded `      `networkidle0 ` và `networkidle2 `| stringArray<string> | `load`|
| referer      | Cung cấp referer header| String     ||


<br>

**Trả về: <[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<?[Response](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#class-response)>>**
    
Lưu ý: Nếu có nhiều điều hướng, các xử lý sau sẽ được thực hiện ở điều hướng cuối cùng.
    
Chi tiết xem tại [đây](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pagegotourl-options).
### 2.3 page.pdf([options])
Hàm `page.pdf()` sẽ thực hiện render file pdf từ trang html với các tùy chọn yêu cầu.
    
Một số options:

| Options | Descrption| Type | Default |
| -------- | -------- | -------- | --------- |
| path      |  Đường dẫn lưu file. Nếu không có `path`, file sẽ không được lưu.    | String     ||
| scale     | Tỉ lệ của webpage. Nhận giá trị từ 0.1 đến 2 | Number  |1|
| displayHeaderFooter      | HIển thị header và footer     | Boolean     | false|
| headerTemplate      | HTML template cho header. Bao gồm: `date`, `title`, `url`, `pageNumber` và `totalPage` | Object ||
| footerTemplate      |  HTML template cho footer. Options tương tự header.     | Text     ||
| printBackground      | Tùy chọn in background     | Boolean     |false|
| landscape       | Hướng giấy     | Boolean     |false|
| pageRanges       | Phạm vi giấy để in, ví dụ: 1-5, 8, 11-13     | Text     ||
| format      | Định dạng, như  `Letter`, `A4`, ...     |String   |`Letter`|
| width      |  Chiều dài    | String|Number     ||
| height      |   Chiều cao   |  String|Number      ||
| margin  | Căn lề     |  Object      ||
| preferCSSPageSize | Ưu tiên định dạng CSS so với các khai báo tùy chọn  | Boolean     |false|

<br>
    
Trả về: <[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)>>
    
Chi tiết xem tại [đây](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pagepdfoptions).
## 3. Nghịch ngợm thôi nào

Đầu tiên, mình sẽ init một project Node trong folder `test`

```
mkdir test
cd test
npm init
```

Đừng quên cài `puppeteer` cho project nhé:
```
npm install pupperteer --save
```

Giờ thì mình sẽ viết file `index.js` để nghịch thử ahihi :grinning:.

### 3.1 Chụp ảnh màn hình cái nhỉ

```js:index.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://viblo.asia');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

Gõ lệnh run và chờ thành quả thôi nào:
```
node index.js
```

Kết quả:

![](https://images.viblo.asia/bf888ef9-f7e2-4562-8a68-a6a88c03437d.png)

<br>

### 3.2 Thử xuất một file pdf nha

```js:index.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://viblo.asia', {waitUntil: 'networkidle2'});
  await page.pdf({
      path: 'viblo.pdf',
      format: 'A4',
      printBackground: true,
    });

  await browser.close();
})();
```

Kết quả:

![](https://images.viblo.asia/ba0737f9-7d01-4d5f-a672-70bb6827e678.gif)

### 3.3 Chụp trang yêu cầu authenticate

Nếu bạn chụp một trang yêu cầu đăng nhập thì sẽ thế nào nhỉ. 

Ví dụ: Ở dây, mình muốn chụp màn hình trang [viết bài](https://viblo.asia/publish/post) của trang [Viblo](https://viblo.asia).

```js:index.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://viblo.asia/publish/post', {waitUntil: 'networkidle2'});
  await page.screenshot({ path: 'viblo-authenticate.png'})

  await browser.close();
})();
```

Kết quả:

![](https://images.viblo.asia/a222b0f9-b332-43ff-b768-ff1f8c311288.png)

Như trong trường hợp này, chúng ta sẽ chụp được trang [đăng nhập](https://accounts.viblo.asia/login?service=viblo). Vì khi brower run và truy cập tới trang [viết bài](https://viblo.asia/publish/post) thì router được điều hướng sang trang đăng nhập vì trang mà chúng ta muốn truy cập yêu cầu authenticate.

Cách xử lý là chúng ta sẽ phải xét cookie trước khi truy cập trang web đó. Thử lại lần nữa nào:

```js:index.js
const puppeteer = require('puppeteer');

(async () => {
    const cookie = {
        name: 'viblo_auth',
        value: '<your_cookie>', // replace this!
        domain: 'viblo.asia',
        url: 'https://viblo.asia',
        path: '/',
        httpOnly: true,
        secure: true,
      };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setCookie(cookie);
  
  await page.goto('https://viblo.asia/publish/post', {waitUntil: 'networkidle2'});
  await page.screenshot({ path: 'viblo-authenticate.png'})

  await browser.close();
})()
```

Kết quả bạn thu được sẽ như vầy nè

![](https://images.viblo.asia/2049ae45-0ff0-40d5-b4d5-b5188b065ef7.png)

Chúc các bạn thành công và hẹn gặp lại các bạn ở các bài viết tiếp theo.

Tài liệu tham khảo:

https://developers.google.com/web/tools/puppeteer/