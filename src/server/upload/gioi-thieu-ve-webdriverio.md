## 1.  WebDriverIO là gì ?
WebDriverIO là một tiện ích kiểm thử với mã nguồn mở sử dụng ngôn ngữ  NodeJS
- Nó giúp bạn viết các bài kiểm tra test bằng javascripts trong framework TDD hoặc BDD
- Về cơ bản, nó sẽ gửi các yêu cầu đến máy chủ Selenium thông qua Giao thức WebDriver và xử lý phản hồi của nó.
- Các yêu cầu này được bao bọc trong các lệnh hữu ích và có thể được sử dụng để kiểm tra một số khía cạnh của trang web của bạn theo cách tự động.

 Hay
 
 WebdriverIO là một triển khai tùy chỉnh cho API webdriver W3C của selenium. Nó được viết bằng Javascript và được đóng gói thành ‘npm’ và chạy trên Node.js.
 
##  2. Tại sao bạn nên cân nhắc sử dụng WebdriverIO thay vì Selenium WebDriver?

1. Thân thiện với Front-end

Không giống như hầu hết các framework tự động hóa các trình duyệt hiện có, WebDriverIO được viết hoàn toàn bằng JavaScript. Ngay cả việc cài đặt Selenium cũng được thực hiện thông qua một mô-đun NPM (Sẽ được giải thích trong các phiên sắp tới).
 
 2. Sử dụng các điểm mạnh của Selenium

WebdriverIO sử dụng các lợi ích của Selenium, giúp đơn giản hóa việc chạy các bài test trong tất cả các loại trình duyệt.
Selenium, là một nền tảng cực kỳ mạnh mẽ và dẫn đầu ngành về việc chạy 
tự động hóa trình duyệt và WebdriverIO hơn cả Selenium.

3. Dễ sử dụng

Các lệnh sử dụng trong các bài kiểm tra WebDriverIO rất rõ ràng, ngắn gọn và tất cả đều theo ý nghĩa thông thường.

WebDriverIO không bắt bạn viết code để kết nối hai phần với nhau 
ví dụ:  
Nếu bạn muốn click vào 1 button bằng lệnh Selenium thông thường thì bạn sẽ sử dụng 2 lệnh : một là lấy phần tử và hai là click vào phần tử đó

```
driver.findElement(webdriver.By.id('Submit')).click();
```

Thay vào đó WebDriverIO đơn giản chỉ cần viết một lệnh click và đưa phần tử vào lệnh

```
user.click('#Submit'))
```

## 3. Điều kiện tiên quyết cần thiết để học WebDriverIO là gì?

Bạn nên hiểu rõ về Selenium (Không bắt buộc) và JavaScript (sẽ được giải thích trong các phiên sắp tới) và chúng ta sẽ thực hiện một chút công việc trên dòng lệnh. Là điều kiện tiên quyết để phát triển thử nghiệm WebdriverIO, bạn cần phải cài đặt các công cụ sau trên máy của mình:

1. Node.js
2. npm
3. Web-browser (In our case, Firefox)

## 4. Những loại ứng dụng nào mà WebDriverIO có thể và không thể automate?

WebDriverIO có thể tự động hóa cả ứng dụng web và native mobile app

## 5. Các trình duyệt khác nhau đều được hỗ trợ bởi WebDriverIO?

1. Edge
2. Chrome
3. Firefox
4. Safari
5. PhantomJs

## 6. Các Framework testing khác nhau được WebDriverIO hỗ trợ là gì?

1.  Jasmine
2.  Mocha
3. Cucumber

Trên đây là bài giới thiệu qua về WebdriverIO, hẹn các bạn sang bài sau mình sẽ đi sâu về cài đặt và chạy thử nhé !