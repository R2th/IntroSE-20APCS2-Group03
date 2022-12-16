Một headless browser là chương trình mô phỏng một trình duyệt mà không có giao diện người dùng,
Chương trình hoạt động của headless browser giống như bất cứ các trình duyệt khác, nhưng không hiển thị UI.
 
Trên thị trường có khá nhiều loại headless browser, nhưng phổ biến nhất là:

1.  Chrome
2.  Firefox
3. HTMLUnit driver
4. PhantomJS
5. SlimerJS
6. TrifleJS

# Headless testing là gì ?
Việc thực hiện kiểm thử giao diện web mà không mở giao diện người dùng lên được gọi là headless browser testing. Headless browser thực hiện giống như các trình duyệt thông thường khác, các tester hoàn toàn có thể điều khiển trên những trang web được tải trong headless browser, chỉ có điều khác biệt là bạn sẽ không nhìn thấy giao diện đồ họa người dùng.
# Khi nào thì nên sử dụng headless testing?
Chúng ta có thể sử dụng headless testing khi đã hoàn thành việc kiểm thử trên các trình duyệt khác và khi muốn chạy những trường hợp kiểm thử hồi quy trong các phiên bản phát hành sau đó và với việc tích hợp liên tục.
 
Bạn không có sự lựa chọn nào khác khi sử dụng headless testing khi máy test của bạn không có một giao diện người dùng nào hoặc ví dụ nếu bạn muốn chạy trên unix.
 
Bạn cũng nên sử dụng headless browser khi những bộ test được thực hiện song song vì những trình duyệt dựa trên giao diện người dùng thì tiêu tốn rất nhiều bộ nhớ và tài nguyên. Vì vậy headless browser có thể được sử dụng để kiểm tra hiệu năng của phía server.
 
Khi dev đẩy những đoạn mã của tính năng mới lên, chúng ta có thể kiểm tra smoke test ngay khi có thể bởi vì nếu có bất cứ vấn đề nào thì chúng ta có thể revert lại đoạn mã đó.
# Một số nhược điểm của headless testing
Headless browser không phải là một ý tưởng tốt, nó có thể giúp bạn kiểm thử nhưng không giống như một người dùng thực sự sẽ nhìn thấy và chúng che giấu nhiều vấn đề mà chỉ có trình duyệt thực sự gặp phải, Sẽ rất khó debug để tìm những lỗi không nhất quán vì trang load quá nhanh

Trên trình duyệt thông thường, các chức năng được thực hiện trước người dùng và do đó có thể tương tác trực tiếp vì vậy người dùng có thể dễ dàng tìm được các lỗi ở mọi nơi và có thể debug nếu có vấn đề nào đó xảy ra.

Các mã code cho headless browser sẽ luôn không hoạt động khi chuyển sang htmlunit , chuyển đổi giữa chromeDriver và firefoxDriver thường khá nhất quán về tỉ lệ thành công với cùng đoạn mã đó nhưng chuyển sang Htmlunit thì có thể sẽ thất bại.
 Headless browser không đại diện cho người dùng thực sự cũng như là không có người dùng nào sử dụng ứng dụng của bạn mà không có giao diện, và nó không thể báo cáo những lỗi liên quan đến các hình ảnh.

Headless browser không nhanh bằng trình duyệt thông thường bời vì hầu hết thời gian để tải trang dựa vào tốc độ mạng, html, javaScript, images and CSS, nó chỉ không tải màu cho màn hình mà thôi.

Việc quản lý và chụp ảnh màn hình khá là khó đối với headless browser 
# Headless browser automation trong selenium Webdriver
Chúng ta có thể thực hiện automate với headless browser 
Dưới đây là những trình duyệt chúng ta sẽ automate trong bài này
- Chrome
- Firefox
- HtmlUnit browser
- PhantomJS

## 1. Headless chrome trong selenium 
Headless chrome được hỗ trợ bởi chrome version 59 +, chrome 59+ được kết hợp với những tính năng sẵn có mới nhất trên Chromium và Blink 
Với Selenium chúng ta có thể hoàn thành được một headless chrome browser bằng việc sử dụng org.openqa.selenium.chrome.ChromeOptions class 

Và nó sẵn có trên Mac và Linux since Chrome 59, Windows support came in Chrome 60.
Step để tạo headless chrome
Đặt đường dẫn Chrome driver server sử dụng  System.setProperty
```
System.setProperty("webdriver.chrome.driver", "C:/Users/user/project/chromedriver.exe");
```
 Tạo một đối tượng cho ChromeOptions thuộc package org.openqa.selenium.chrome.ChromeOptions: 
 
 `ChromeOptions options = new ChromeOptions ();`
 
Tạo một method setHeadless từ đối tượng ChromeOptions, đặt parameter = true. Method này sẽ tạo ra một trình duyệt chrome mà không có giao diện người dùng, chính là cái headless Chrome browser mà ta cần:
```
// set chrome as Headless
options.setHeadless(true);
```

Ta cũng có thể sử dụng method addArguments có sẵn trong đối tượng ChromeOption để tạo một headless chrome browser, ở đây ta cần thêm giá trị của parameter là “—headless” để khởi tạo trình duyệt không có UI với cú pháp như sau:
```
options.addArguments("--headless");
```

Bây giờ hãy tạo một đối tượng cho ChromeDriver nhưng đừng quên truyền vào đó option bên trên vào hàm khởi tạo ChromeDriver. Sử dụng class Option chúng ta có thể thiết lập các tính năng theo yêu cầu cho một trình duyệt (như Chrome hay Firefox)
WebDriver driver = new ChromeDriver(options);

## Headless browser firefox trong selenium
Với headless Firefox browser ta cũng thực hiện các tương tự các bước như khởi tạo một headless Chrome browser tóm tắt nhanh các cú pháp như sau:

```
//set driver server exe path
System.setProperty("webdriver.gecko.driver", 
                            "C:/Users/user/Pictures/geckodriver.exe"); 
 //Khởi tạo đối tượng options thuộc FirefoxOptions:
FirefoxOptions options = new FirefoxOptions(); 

//Tạo trình duyệt headless với method setHeadless với parameter = true: 
options.setHeadless(true); 

//khởi tạo trình Web Driver
WebDriver driver = new FirefoxDriver(options);

```

## HtmlUnitDriver in Selenium :
HtmlUnitDriver là một trình duyệt headless được tích hợp sẵn trong Selenium webdriver, HtmlUnitDriver nằm trong package: org.openqa.selenium.htmlunit
Khác với Headless Firefox, Chrome, với HtmlUnitDriver chúng ta chỉ cần tạo một đối tượng của class để tạo một headless browser đó.
Cú pháp chỉ đơn giản như thế này:
```
HtmlUnitDriver driver = new HtmlUnitDriver();
driver.get("https://www.google.com");
```

## PhantomJS Headless browser
Dưới đây là đoạn code mà mình đã sử dụng để khởi tạo một trình duyệt PhantomJS. Tuy nhiên theo mình đọc được đâu đó thì chúng ta nên chuyển sang sử dụng Google chrome hơn là PhantomJS, vì tốc độ và độ ổn định được đánh giá tốt hơn so với PhantomJS.

```
File file = new File("C:/Program Files/phantomjs-2.1.1-windows/phantomjs-2.1.1-windows/bin/phantomjs.exe");
System.setProperty("phantomjs.binary.path", file.getAbsolutePath());
WebDriver browser = new PhantomJSDriver();
```

## Dùng Headless browser nào nhanh hơn?
Headless browser nhanh hơn trình duyệt UI nhưng tôi vẫn muốn kiểm tra xem trình duyệt nào nhanh hơn 
Hãy thực hiện test case được tạo ở bên trong headless browser, headless firefox, HtmlUnit browser để so sánh tốc độ thực hiện

Tham khảo bài viết : https://chercher.tech/java/headless-browsers-selenium-webdriver#headless