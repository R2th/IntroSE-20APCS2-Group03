![](https://images.viblo.asia/1289d4cc-7e84-4aa6-bce6-925b98dafe80.jpg)

## 1. Selenium là gì?
Selenium là một phần mềm mã nguồn mở hiện đang được sở hữu và phát triển bởi Google giúp việc thi hành các hành động trên trang web một cách tự động thông qua các Script điều khiển (có thể viết bằng rất nhiều các ngôn ngữ lập trình khác nhau như: Java, C#, Python, PHP, JavaScript v.v...). 

Khi sử dụng Selenium, chúng ta có thể thực hiện Script trên nhiều trình duyệt khác nhau qua đó tăng hiệu suất kiểm thử cũng như giảm chi phí khi thực hiện Manual.
## 2. Thành phần của Selenium
![](https://images.viblo.asia/6311aead-2436-4a80-8554-fce1c7bc93c7.jpg)
### 2.1. Selenium IDE

Là một Plugin được thiết kế để chạy riêng trên Firefox bởi một kỹ sư người Nhật tên là Shinaya Kasatani. Viết kịch bản Selenium IDE khá đơn giản (đơn giản nhất so với các thành phần còn lại) và đặc biệt Selenium IDE có khả năng Record (ghi lại) và Play (phát) lại những hoạt động từ người dùng. Dựa vào các kịch bản của Selenium IDE, người dùng cũng có thể dễ dàng chuyển đổi (Export) sang các kịch bản của Selenium Webdriver sử dụng các ngôn ngữ C#, Java.

### 2.2. Selenium Remote Control 

Được tạo ra bởi 1 kỹ sư phần mềm đến từ ThoughtWork tên là Paul Hammant. Đó là một máy chủ hoạt động như một HTTP Proxy  cho phép người sử dụng tạo các TestScript bằng các ngôn ngữ lập trình và thực hiện Script trên nhiều Browser.

### 2.3. Selenium Web Driver

Là công cụ được tạo ra bởi Simon Stewat vào năm 2006. Khác biệt hoàn toàn so với Selenium RC, Web Driver có thể giao tiếp trực tiếp với các trình duyệt Web và tương tác để thực hiện Automation.

### 2.4. Selenium Grid

Được phát triển bởi Patrick Lightbody mới mục đích ban đầu nhằm giảm thiểu thời gian thực hiện kiểm thử càng nhiều càng tốt. Nó có khả năng chụp ảnh các màn hình của trình duyệt trong các giai đoạn quan trọng, cũng như gửi các lệnh Selenium cho các máy khác nhau cùng thực hiện một lúc.

## 3. Chuẩn bị cho việc thực hành Selenium Webdriver cần những gì?
* Một máy tính đã cài sẵn môi trường phát triển Java (JRE, JDK) và một bộ IDE để soạn thảo code (Eclipse, Netbean v.v...)
* Cần phải biết cơ bản về Java (Lý thuyết lập trình hướng đối tượng, biến, toán tử, các cấu trúc điều kiện, cấu trúc lặp v.v...).
* Một TestFramework để tổ chức Script kiểm thử (TestNG, JUnit)
* Các Driver tương ứng với các trình duyệt (ChromeDriver, Firfox Driver v.v...).
* Thư viện Selenium Webdriver cho Java (Tải trên trang Seleniumhq.org).

Maven:
```
        <!-- https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java -->
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-java</artifactId>
			<version>3.11.0</version>
		</dependency>
```
Download thư viện
https://www.seleniumhq.org/download/

Note: Cần chú ý version Firefox and Selenium versions:
![](https://images.viblo.asia/b5717301-821d-406e-a315-6d42119dbe6d.png)

## 4. JAVA Code Example
### 4.1. Run selenium trên các browser khác nhau
### Browser Firefox
```
System.setProperty("webdriver.gecko.driver","/home/phan.van.hieu/selium/geckodriver");
WebDriver driver = new FirefoxDriver();
```

### Browser Chrome
```
System.setProperty("webdriver.chrome.driver","/home/phan.van.hieu/deploy/chromedriver");
WebDriver driver = new ChromeDriver();
```

### Browser IE
```
System.setProperty("webdriver.ie.driver","/home/phan.van.hieu/deploy/chromedriver");
InternetExplorerDriver driver = new InternetExplorerDriver();
```

### 4.2. sử dụng XPath
![](https://images.viblo.asia/924e3bad-880c-420a-a400-f7a322b15dff.png)
![](https://images.viblo.asia/294416ce-5d90-403d-8639-55f73ea14041.png)

### 4.3. sử dụng CSS Selector
![](https://images.viblo.asia/c8e4b94a-c10d-4e18-97dd-4088b1375c24.png)
![](https://images.viblo.asia/b7cc5fa5-ceba-4de3-bd1b-c9537f4b63c8.png)