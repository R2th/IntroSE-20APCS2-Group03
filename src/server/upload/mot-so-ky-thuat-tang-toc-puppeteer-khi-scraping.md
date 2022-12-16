Puppeteer là thư viện phổ biến được sử dụng để scraping, chắc mọi người đã khá quen thuộc với việc sử dụng nó. Hôm nay mình sẽ trình bày 1 vài tip để giúp quá trình scraping dữ liệu được diễn ra nhanh hơn, đặc biệt trong điều kiện mạng không ổn định.

![img](https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png)

1 bức ảnh hơn ngàn lời nói

Puppeteer (người múa rối) - thư viện để điều khiển Chrome or Chromium ở dạng headless hoặc non-headless

Repo chính thức của dự án tại đây: https://github.com/puppeteer/puppeteer

Puppeteer xuất phát là 1 Node library, sau đó có cung  cấp library cho Typescript. Các ví dụ dưới đây mình sẽ dùng cách viết của NodeJS



## 1. Sử dụng cấu hình tối thiểu

Trước khi bắt đầu sử dụng thì việc đầu tiên là khởi tạo puppeteer. Có rất nhiều config liên quan đến các module cho bước khởi tạo, bạn có thể xem chi tiết tại đây

https://peter.sh/experiments/chromium-command-line-switches/

Việc lựa chọn config phù hợp sẽ giúp giảm lượng tài nguyên sử dụng và tăng tốc độ xử lý. 

Như các bạn thấy dưới đây, mỗi config --disable-* được đưa vào sẽ giúp puppeteer chạy nhẹ hơn.

```js
const puppeteer = require('puppeteer');

const minimal_args = [
  '--disable-speech-api', // 	Disables the Web Speech API (both speech recognition and synthesis)
  '--disable-background-networking', // Disable several subsystems which run network requests in the background. This is for use 									  // when doing network performance testing to avoid noise in the measurements. ↪
  '--disable-background-timer-throttling', // Disable task throttling of timer tasks from background pages. ↪
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];

const browser = await puppeteer.launch({
  headless: true, // Không có giao diện UI => nhẹ hơn
  args: minimal_args
})
```



## 2. Cache tài nguyên tĩnh

Theo mặc định, puppeteer không tái sử dụng các tài nguyên như js, css, image ... trong các session cũ. 

Trong 1 số trường hợp, chúng ta không phải lúc nào cũng cần tải các tài nguyên đó bản mới nhất. Khi đó, chúng ta sẽ cho phép puppeteer cache các tài nguyên đó trên đĩa cứng như sau:

```js
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch({
  userDataDir: './path/to/cache/resource'
})
```



## 3. Disable tài nguyên không cần thiết

Nguyên tắc chung là disable tài nguyên thông qua block (abort) request. Lệnh block request cần được set sau khi khởi tạo page và trước khi goto tới 1 trang web cụ thể

```js
const page = await browser.newPage();

await page.setRequestInterception(true); // Câu lệnh này cần gọi 1 lần trước khi gọi page.on('request' ...

page.on('request', request => {
  // =====================  
  // Block request tại đây
    if (shouldBlock(request)){ // check điều kiện logic của bạn
        request.abort(); // block request
    }else{
        request.continue(); // tiếp tục request
    }
  // =====================
});

await page.goto('https://example.com');
```



- Trường hợp web không cần script, block script

```js
page.on('request', request => {
  if (request.resourceType() === 'script'){
      request.abort();
  }else{
      request.continue();
  }
});
```

- Trường hợp scraping dữ liệu không cần tài nguyên dạng ảnh, media.

```js
page.on('request', request => {
  if ( (request.resourceType() === 'image') || (request.resourceType() === 'media')  ){
      request.abort();
  }else{
      request.continue();
  }
});
```

Ngoài ra, có nhiều resource type khác như stylesheet, manifest ... Bạn có thể kiểm tra danh sách đầy đủ tại đây
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType

- Trường hợp không cần tài nguyên từ các website chuyên phục vụ quảng cáo, tracking

```js
  const blocked_domains = [
      'googlesyndication.com',
      'adservice.google.com',
  ];
  
  page.on('request', request => {
      const url = request.url()
      if (blocked_domains.some(domain => url.includes(domain))) {
          request.abort();
      } else {
          request.continue();
      }
  });
```


## 4. Take screenshot thông minh

Trường hợp cần chụp ảnh màn hình (take screenshot), có 1 vài điều bạn có thể làm để tối ưu

- Chụp ảnh màn hình ngay khi có thể (càng sớm càng tốt)
- Lưu trữ ảnh ở định dạng jpg thay vì png

```js
await page.screenshot({
//  	path: 'image.png',
	path: 'image.jpg', // định dạng JPG sẽ nhẹ hơn nhiều so với png
})
```

## Kết luận
Bằng các kỹ thuật trên, bạn sẽ tối ưu được thời gian và nguồn lực cần thiết cho việc scraping. 
Theo như thử nghiệm cá nhân của mình, trong điều kiện network yếu, các kỹ thuật này có thể giúp bạn giảm thiểu tới 50% thời gian sử dụng khi scraping.

Chúc các bạn tối ưu thành công !