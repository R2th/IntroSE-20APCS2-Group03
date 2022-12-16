Xin chào 1 tỷ anh em của Viblo, trong bài viết lần này, để đổi gió một chút mình sẽ đổi gió nghịch nghợm một chút với Chrome headless browser để xuất một trang HTML ra thành file PDF. Nếu có ai lỡ vào đây và chưa từng nghe tới khái niệm Headless browser thì có thể tham khảo bài viết [PhantomJS là gì?](https://viblo.asia/p/phantomjs-la-gi-QpmleAW7lrd) của mình một chút để đọc qua về nó trong bài đấy nhé. Và sau đây là những thứ mình sẽ dùng trong bài viết này:
- Tạo service Node.js với Docker compose
- Puppeteer

## Tại sao?

Có thể nhiều người đọc tới đây đang thắc mắc:
- "Puppeteer là cái vẹo gì vậy?" hay một câu khác như
- "Tại sao lại export PDF bằng Node.js làm gì, dùng code PHP bình thường là được mà".
- "Tại sao lại dùng Puppeteer?"

Vâng các bạn, nếu các bạn đang băn khoăn một trong các có câu hỏi trên trước khi bắt đầu tiếp tục đọc nhiều hơn bài này thì mình xin phép trả lời chúng như sau. 

- Với Puppeteer, mình sẽ dành một phần mục bên dưới để giới thiệu tới các bạn chưa biết.
- Còn với lý do dùng Node.js, trong một số trường hợp, phiên bản PDF export của bạn được đối tác yêu cầu hiển thị preview trên nền web sau đó export ra pdf. Với nội dung trang có màu sắc, các style với CSS như: Gradient, Shadow, FlexBox... giống theo preview. Case này theo mình thì thất khó đạt được kỳ vọng như mong muốn khi phải tốn khá nhiều effort. Thâm chí,  xấu nhất là bạn còn không tạo các hiệu ứng đấy trong file PDF sau khi xuất. Lúc này, headless browser là thứ mình nghĩ đến để nghịch khi nó chính xác là một browser, nó hiểu các thể loại CSS, CSS3, JS :D Do đó, mình nghĩ là nó sẽ giải quyết được vấn đề khi gặp phải các yêu cầu củ chuối trên. Ngoài ra, file pdf cũng được phân trang tự động luôn. Chính xác vì muốn dùng Chrome headless browser nên, nó chạy bằng javascript nên mình sẽ sử dụng Node.js server để xử lý vụ này.
- Với băn khoăn cuối cùng, tại sao mình dùng Puppeteer, đơn giản chỉ là nó cung cấp một bộ API rất simple và mạnh mẽ để giao tiếp với Chrome headless browser trên node.js. :)

Bây giờ, mời 1000 anh em tiếp tục điểm qua về Puppeteer nhé.

## Puppeteer

Puppeteer là một thư viện Node.js được phát triển bởi Chrome Team. Nó cung cấp một bộ API để giúp bạn thiết lập thực hiện các thao tác tự động bằng cách điều khiển chrome headless browser hoặc thậm chỉ là điều khiển cả Chrome browser được cài trên máy bạn. Trong phần giới thiệu về Puppeteer, họ có nói bộ API này ở high-level, thông qua một sơ đồ kim tự tháp như sau, mời các bạn tham khảo:
![](https://images.viblo.asia/9211aae3-a068-4187-907c-c0530fe2e37c.png)

<p align="center">*Hình được cắt ra từ video*</p>

Do tập trung vào vấn đề trong bài nên mình cũng không tìm hiểu và giải thích về cái hình kim tự tháp này. Các bạn có thể xem video chứa hình trên để hiểu thêm về nó nhé. Link video ở cuối bài viết.

Tóm cái váy lại, Puppeteer cho chúng ta một bộ API thân thiện, để cài đặt các thao tác điều khiển headless browser nhé! :* Các thao tác điều khiển headless browser như mở browser, mở một tab cho trình duyệt, truy cập tới một trang, chụp màn hình, export pdf, tự động nhập nội dung, tự submit form cho UI Ingegration Test. Còn bây giờ, mời các bạn cùng tiếp tục sang phần chính đó là triển khai cài đặt.

## Cài đặt Puppeteer

Sử dụng Puppeteer, chúng ta không cần phải cấu hình gì cả. Đơn giản chỉ cần require nó vào thôi. Việc đọc code cũng rất dễ hiểu. Mô phỏng rất rõ ràng và chi tiếp các thao tác của chúng ta trên browser:

```javascript
const puppeteer = require('puppeteer')

const captureScreenshot = async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })

  const page = await browser.newPage()

  await page.goto('https://viblo.asia/organization-feature', { waitUntil: 'networkidle2' })
  await page.pdf({
    path: 'storage/viblo-asia.pdf',
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    }
  })

  await browser.close()
}


captureScreenshot()

```

Code cũng khá đơn giản và thực sự mình thấy rất dễ đọc khi mới bắt đầu. Trong đó:
- `puppeteer.launch` để chạy một browser lên
- `browser.newPage` để tạo một page mới (như là mở một tab mới cho trình duyệt vậy)
- `goto` để chỉ định thực hiện truy cập tới một trang web
- `pdf` để thực hiện in trang hiện tại ra file PDF. Cái này có một số options đi kèm giúp mình cho phép in màu trên website ra PDF, cho phép in ảnh ra PDF, thay đổi kích cỡ giấy trong file PDF như khổ A4, A3, A2..., bản in trên giấy chiều dọc hay ngang...

Những thuộc tính này các bạn có thể tham khảo thêm trong tài liệu API Reference của Puppeteer ở phần cuối của bài viết nhé.

## Cấu hình docker

Sử dụng docker, chúng ta có một image build cho Puppeteer đươc phát triển bởi Alek Zonder nên mình dùng luôn nhé. Image này được published [tại đây](https://hub.docker.com/r/alekzonder/puppeteer). Cách sử dụng rất đơn giản, chỉ cần mount code vào file `/app/index.js` trong container là nó sẽ được thực thi khi container start. Một lưu ý là nó không support ES6 nên nếu các bạn sử dụng import/export... thì nó không hiểu nhé. Cái bạn có thể cài thêm package `esm` để nó hiểu được các syntax đấy. Vuil lòng search thêm về package này trên NPM hoặc google nếu bạn cần.

File dock-compose.yml để tạo service node.js đơn giản như sau:
```yaml:docker-compose.yml
version: '3.5'

services:
  app:
    image: alekzonder/puppeteer
    volumes:
      - ./:/app
    working_dir: /app

```

Bây giờ, đơn giản bạn chỉ cần chạy service kia lên và xem kết quả.

```bash
docker-compose up -d
```

## References:
- https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagegotourl-options
- https://developers.google.com/web/tools/puppeteer/
- https://developers.google.com/web/updates/2017/04/headless-chrome#puppeteer
- https://developers.google.com/web/tools/puppeteer/get-started

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***