# Selenium là gì ? 
Selenium là một bộ kiểm tra tự động (mã nguồn mở) miễn phí dành cho các ứng dụng web trên nhiều trình duyệt và nền tảng khác nhau .Chủ yếu được sử dụng để tự động hóa việc kiểm tra các ứng dụng web, tuy nhiên nhưng không giới hạn ở điều đó.
Selenium được hỗ trợ bởi tất cả các nhà cung cấp trình duyệt lớn như chrome, firefox, ie, safari... để biến Selenium trở thành phần của trình duyệt. Nó cũng là công nghệ cốt lõi của vô số các công cụ, API và framework tự động hóa. 

> Selenium is not just one tool or API but it composes many tools.

Selenium không phải là một công cụ đơn lẻ, mà là một tập hợp các công cụ phần mềm khác nhau với các cách tiếp cận khác nhau để hỗ trợ tự động hóa kiểm tra hệ thống của bạn. Với Selenium, bạn có thể viết testscript bằng các ngôn ngữ lập trình khác nhau như Java, PHP, C#, Ruby, Python...

### Selenium bao gồm những gì 

#### 1. Selenium IDE

- Selenium IDE được cung cấp dưới dạng tiện ích bổ sung cho Google Chrome và Firefox và nó có thể tự động ghi lại các hoạt động của trình duyệt theo một testcase nào đó.

#### 2.  Selenium RC (Selenium Remote Control)

- Là bộ công cụ cho phép nhận các test script từ Selenium IDE. Nó cho phép chỉnh sửa, cải tiến linh động bằng ngôn ngữ lập trình khác nhau.

- Hiện tại Selenium RC và WebDriver đã được tích hợp vào thành một.

#### 3.  WebDriver

- Selenium WebDriver là framework cho phép bạn chạy các bài kiểm tra trong trình duyệt của mình nó cho phép bạn chọn ngôn ngữ lập trình của mình và tạo các tập lệnh thử nghiệm
<img title='image.png' alt='image' src='/attachments/cc55fc19-5e87-4584-8331-022d541154e7' width="1786" data-meta='{"width":1786,"height":988}'>

#### 4.  Selenium Grid

- Là một trong số các bộ testing tool của Selenium, nó cho phép chúng ta có thể chạy nhiều các kịch bản test trên nhiều máy, nhiều hệ điều hành và nhiều trình duyệt khác nhau trong cùng một lúc.

# Ứng dụng selenium

### Cài đặt thư viện Selenium

Selenium được support bởi nhiều ngôn ngữ nên mỗi ngôn ngữ chúng ta sẽ có cách cài đặt khác nhau. 

- javascript: có thể được thực hiện bằng npm
```
npm install selenium-webdriver
```
- ruby: có thể được thực hiện bằng gem
```
gem install selenium-webdriver
```
- python: có thể được thực hiện bằng pip
```
pip install selenium
```

### Cách thực hiện kiểm tra giao diện người dùng với Selenium trong JavaScript (Node js)

1. Chuẩn bị 
    - Tạo một folder lưu trữ code và chạy dòng lệnh dưới đây. example: my-project
        ```
            $ npm init
        ```
    - Chúng ta sẽ cài đặt các package: selenium-webdriver,  chromedriver, mocha
      ```
          $ npm install -D selenium-webdriver mocha chromedriver
       ``` 
2. Viết một bài test mẫu 
    - Dưới đây có 2 testcase 
        - Kiểm tra tiêu đề trang đăng ký được hiển thị là "Đăng nhập vào Viblo"
        - Kiểm tra việc nhấp vào button "tạo tài khoản" để di chuyển đến màn hình tạo tài khoản.
    ```javascript
    const { Builder, By, until } = require("selenium-webdriver");
    const assert = require("assert");

    let driver;

    describe("viblo login", () => {
      before(() => {
        driver = new Builder().forBrowser("chrome").build();
      });

      after(() => {
        return driver.quit();
      });

      it("exits sign in button", async () => {
        await driver.get("https://accounts.viblo.asia/login");

        await driver.wait(until.elementLocated(By.css("h5")), 5000);
        assert.equal(
          await driver.findElement(By.css("h5")).getText(),
          "Đăng nhập vào Viblo"
        );
      });

      it("redirect to sign up page", async () => {
        await driver.get("https://accounts.viblo.asia/login");
        await driver.findElement(By.xpath('//a[@href="/register"]')).click();

        await driver.wait(until.elementLocated(By.css("h1.card-title")), 5000);
        assert.equal(
          await driver.findElement(By.css("h1.card-title")).getText(),
          "Đăng ký tài khoản cho Viblo"
        );  
      });
    });


3. Chuẩn bị chạy code 
- Thêm tập lệnh npm vào package.json để chạy thử với mocha.

```javascript
    ----
      "scripts": {  "test": "mocha viblo-login.js --timeout 0"},
    ----
```

4. Chạy thử

```
$ npm run test
> my-project@1.0.0 test
> mocha viblo-login.js --timeout 0



  SeleniumChromeTest
    ✔ exits sign in button (1832ms)
    ✔ redirect to sign up page (315ms)


  2 passing (2s)
```

#### Tài liệu tham khảo 

https://www.selenium.dev/documentation/