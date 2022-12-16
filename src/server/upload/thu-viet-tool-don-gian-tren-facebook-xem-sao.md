## Giới Thiệu Chung
Hello xin chào mọi người, mình đã trở lại và Hôm nay mình xin chia sẽ đến các bạn cách để viết 1 tool đơn giản cho facebook mà lại vô cùng hiệu quả nhé :grinning: 

Ở bài viết trước mình đã giới thiệu về Headless Browser, Puppeteer và có 1 demo nho nhỏ là "cào" điểm từ trang web đào tạo tín chỉ của trường. Cảm thấy chưa thoả mãn lắm :joy: nên mình đã tiếp tục vọc vạch puppeteer và với lần quay trở lại này mình đã quyết định viết tool facebook bằng puppeteer thử xem sao.

## Bắt Đầu Làm Thôi Nào
### Lên Ý Tưởng
**Trào lưu #10YearChallenge** (hay thử thách 10 năm) đang rầm rộ trên các mạng xã hội hiện nay và được nhiều người dùng hưởng ứng, thậm chí là cả những người nổi tiếng cũng đang hưởng ứng trào lưu này.
**10 Years Challenge - Thử thách 10 năm là gì**, hay còn có các tên gọi khác như **#HowHardDidAgingHitYou** Challenge, **#Aging** Challenge và **#GlowUp** Challenge đang là trào lưu hot trên mạng xã hội Facebook hiện nay.

![](https://images.viblo.asia/2fb5f072-3a79-425c-b40c-f298f0a4c686.png)

Rất đơn giản, người chơi chỉ cần đăng ***hình ảnh được chụp cách đây 10 năm*** để xem mình đã thay đổi như thế nào theo thời gian, "dậy thì" thành công hay thất bại.

Để thực hiện thử thách 10 năm trên Facebook hoặc Instagram, tất cả những gì người dùng cần làm là chia sẻ hình ảnh của bản thân được chụp cách đây 10 năm và xem sau 10 năm chúng ta đã "dậy thì", thay đổi như thế nào kèm theo hashtag #10YearChallenge

**Lấy ví dụ**: Công ty Sun-asterisk muốn tổ chức riêng cho nhân viên trong công ty thực hiện thử thách này (hashtag: #10YearChallenge_Sun) , vậy làm cách nào để bằng 1 cú nhấp chuột duy nhất, ta có thể thu thập được những hình ảnh của toàn bộ nhân viên thực hiện thử thách này :D

![](https://images.viblo.asia/18d480b0-d235-466a-bc2f-9871c0730ca5.png)

### Cài Đặt Và Thiết Lập
**Khởi tạo ứng dụng với file package.json**

Trong thư mục gốc của ứng dụng của bạn và nhập `npm init` để khởi tạo ứng dụng của bạn với tệp **package.json**.

`npm init` 

Sau đó các bạn **cài đặt** module **puppeteer** để build tool nhé.
Để mà cài đặt puppeteer trước hết các bạn phải cài đặt **NodeJS** [tại đây](https://nodejs.org/en/download/).

`npm install puppeteer`

Sau khi cài đặt module xong các bạn tạo cho mình file **index.js** để mình code tool các thứ nào.

### Bắt Đầu Code Thôi Nào
Trong file index.js các bạn require thư viện vào nha:

`const puppeteer = require('puppeteer');`

Tiếp đến, chúng ta sẽ khởi tạo một browser sử dụng phương thức launch() và truy cập vào trang chủ facebook như sau:

```javascript
const puppeteer = require('puppeteer');
let fbUrl = 'https://fb.com';
(async () => {
  const browser = await puppeteer.launch({  // Một số setup giúp theo dõi được tiến trình, full screen...
      headless: false, 
      defaultViewport: null, 
      args: ['--start-fullscreen'] 
  });

  const page = await browser.newPage();
  await page.goto(fbUrl);
  .........
})();
```

**Login**

Facebook sẽ bắt buộc điền đầy đủ thông tin tài khoản để login vào hệ thống.

Chúng ta có thể login bằng cách sau:
```javascript
const login = async () => {
    await page.type('#email', YOUR_EMAIL)
    await page.type('#pass', YOUR_PASSWORD)
    await page.click('#u_0_b') // button submit mình inspect tìm được :))
    await page.waitForSelector('.mzan44vs')

    // Tới đây chúng ta đã login thành công vào hệ thống.
    // Theo đường dẫn để có thể tìm ra những bài post có hastag là 10yearschallenge_sun
    await page.goto('https://www.facebook.com/hashtag/10yearschallenge_sun')
    await page.waitFor(2000)
    await page.click('._6s5d') // Giả lập click chuột vào màn hình để tắt đi cái "notifications"
}
```

***(Màn hình lúc này)***

![](https://images.viblo.asia/895cf137-7d77-404e-a41c-c8e0e5903bb7.png)

Phần màu đỏ chiếm khá nhiều không gian nên chúng ta sẽ bỏ nó đi:
```javascript
const clear = async () => {
    await page.evaluate(async () => {
        document.querySelectorAll('div[role="banner"]')[0].style.display = 'none'
        document.querySelectorAll('.dsne8k7f')[0].style.display = 'none'
        document.querySelectorAll('.dsne8k7f')[1].style.display = 'none'
    })
}
```

**Thu thập DATA: ( bằng Screenshot của puppeteer )**

Để có thể cào dữ liệu của trang web các bạn cần gọi đến API page.evaluate. Là một API rất quan trọng cho phép chúng ta chạy script để lấy nội dung trả về.

![](https://images.viblo.asia/054ab10a-2802-4ec9-b34b-8d9b844d513c.png)

Bây giờ mình sẽ vào trang web để xem cấu trúc HTML của nó như thế nào nha. Để phân tích, bóc tách data dễ dàng nhé.
![](https://images.viblo.asia/1cb18598-65a8-4f8c-9b31-d48c3b593735.png)

Mình đã tìm được thẻ wrapper bọc ngoài tất cả các bài post có hashtag. ( ***div.aghb5jc5*** )

Thực hiện screenshot để chụp lại ảnh thôi nào.
```javascript
const screenshotFn = async () => {

    // Xác định vùng bao quanh element đang muốn chụp bao gồm: toạ độ (x, y) kích thước (w, h)
    const boundingBoxElement = await page.evaluate(async () => {

        // List bài post chính là danh sách children của wrapper aghb5jc5 như đã nói
        const listData = document.querySelectorAll('.aghb5jc5')[0].children
        if(window.i !== 0){
            listData[window.i-1].style.display = 'none'
        }

        // Đưa bài post cần lấy vào vị trí thuận lợi nhất để có thể screenshot.
        await listData[window.i].scrollIntoView()

        // Trả về vùng bao quanh
        const {x, y, width, height} = await listData[window.i++].getBoundingClientRect()
        return {x,y,width,height}
    })

    // Thực hiện screenshot sau khi đã có đầy đủ thông tin.
    await page.waitFor(1000)
    await page.screenshot({
        path: `picture_${i++}.png`,
        clip: {
            x: boundingBoxElement.x,
            y: 73, // Mình cố tình ẩn những element trước đó đi nên y luôn là 73 - vị trí đắc địa cho screenshot
            width: boundingBoxElement.width,
            height: boundingBoxElement.height,
        },
    });
}
```

Và đây là kết quả
![](https://images.viblo.asia/d0989333-bbf0-4190-bb07-915ead202511.png)

Demo lần này mình thực hiện lấy 10 bài post đầu tiên
Dưới đây là code hoàn chỉnh file index.js

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-fullscreen'] });
  const page = await browser.newPage();

  const login = async () => {
    await page.goto('http://fb.com')
    await page.type('#email', YOUR_EMAIL)
    await page.type('#pass', YOUR_PASSWORD)
    await page.click('#u_0_b')
    await page.waitForSelector('.mzan44vs')
    await page.goto('https://www.facebook.com/hashtag/10yearschallenge')
    await page.waitFor(2000)
    await page.click('._6s5d')
  }
  const clear = async () => {
    await page.evaluate(async () => {
      document.querySelectorAll('div[role="banner"]')[0].style.display = 'none'
      document.querySelectorAll('.dsne8k7f')[0].style.display = 'none'
      document.querySelectorAll('.dsne8k7f')[1].style.display = 'none'
      window.i = 0
    })
  }

  const screenshotFn = async () => {
    const boundingBoxElement = await page.evaluate(async () => {
      const listData = document.querySelectorAll('.aghb5jc5')[0].children
      if(window.i !== 0)
        listData[window.i-1].style.display = 'none'
      await listData[window.i].scrollIntoView()
      const {x, y, width, height} = await listData[window.i++].getBoundingClientRect()
      return {x,y,width,height}
    })

    await page.waitFor(1000)
    await page.screenshot({
      path: `picture_${i++}.png`,
      clip: {
        x: boundingBoxElement.x,
        y: 73,
        width: boundingBoxElement.width,
        height: boundingBoxElement.height,
      },
    });
  }

  await login()
  await clear()
  let i = 0
  for(let j=0; j<10; j++) {
    await screenshotFn()
  }
})();
```

Tiếp đến các bạn mở terminal trong VScode hoặc trong cửa sổ cmd các bạn gõ cho mình **node index.js**. Và để xem tiến trình từ login cho đến khi screenshot thành công nó như nào nhé :D

Thành quả:

![](https://images.viblo.asia/846f7125-8add-44b5-8b63-fca8e76984e7.png)

## Lời Kết
Vậy là chúng ta đã vừa build tool thành công rồi đấy :grinning: cũng đơn giản đúng không nào. Mình mong muốn sau bài viết này các bạn có thể biết và hiểu thêm về puppeteer, các bạn có thể mở rộng thêm ý tưởng mới. Và có thể tự tay mình làm những project không cần phải quá đặc biệt nhưng nó do chính bạn làm thì cũng coi như là thành quả trong quá trình bạn học được.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

Cảm ơn bạn đã ghé thăm :heart_eyes: