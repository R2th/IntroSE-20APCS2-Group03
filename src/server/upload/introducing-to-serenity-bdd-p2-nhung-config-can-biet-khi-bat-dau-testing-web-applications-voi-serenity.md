Serenity BDD cung cấp khả năng tích hợp tuyệt vời với Selenium, cho phép bạn tránh xa khỏi những config phức tạp mà bạn thường cần xử lý khi làm web automation test. Đặc biệt, Serenity quản lý luôn driver cho bạn (vì vậy bạn không cần loay hoay với việc tạo driver và close driver mỗi khi thực hiện test). Serenity cũng có thể được định cấu hình để tự động chụp ảnh màn hình trong suốt các bài test, tạo tài liệu phong phú về cách mỗi bài test diễn ra. Khi bạn viết automation test scenario của mình một cách trôi chảy, dễ đọc, những ảnh chụp màn hình này sẽ trở thành một phần của "tài liệu sống" cho ứng dụng của bạn một cách rõ ràng, trực quan nhất.

# Selenium versions
Các phiên bản Serenity được gắn liền với các phiên bản Selenium và phiên bản mới nhất của Serenity hầu như luôn sử dụng phiên bản mới nhất của WebDriver. Vì lý do này, thường sẽ dễ dàng hơn khi chúng ta chỉ cần sử dụng dependencies **serenity-core**  và để Serenity sử dụng Selenium trong phần core của nó.


# A simple Selenium web test
Serenity làm giảm số lượng code bạn cần viết và maintain khi bạn viết automation test cho web. Ví dụ, nó đảm nhận việc tạo các phiên bản WebDriver và đóng, mở trình duyệt cho bạn. Sau đây là một đoạn test script Selenium rất đơn giản bằng cách sử dụng Serenity:

WhenManagingUsers.java
```
@RunWith(SerenityRunner.class)                                              (1)
public class WhenWritingWebTestsInSerenity {

    @Managed                                                            (2)
    WebDriver driver;

    @Test
    public void shouldInstantiateAWebDriverInstanceForAWebTest() {
        driver.get("http://www.google.com");                                (3)

        driver.findElement(By.name("q")).sendKeys("firefly", Keys.ENTER);

        new WebDriverWait(driver,5).until(titleContains("firefly - Google"));

        assertThat(driver.getTitle()).contains("firefly - Google");
    }                                                                      (4)
}
```

**(1)** Để được hưởng lợi từ việc tích hợp Serenity WebDriver, bạn cần run test với Serenity Runner
**(2)** Sử dụng annotation **@Managed** để khai báo một phiên bản WebDriver được quản lý bởi Serenity
**(3)** Serenity sẽ tạo webdriver và mở trình duyệt trong lần đầu tiên bạn sử dụng phiên bản do Serenity quản lý
**(4)** Khi kết thúc bài test, Serenity sẽ đóng trình duyệt và tắt driver một cách tự dộng

Đoạn script trên chỉ là một ví dụ rất đơn giản và sẽ ít khi được áp dụng trong một dự án thực tế. Tuy nhiên, trong các chương tiếp theo, chúng ta sẽ thấy cách sử dụng các patern như Page Object và Screen Play để làm cho test script và code của bạn dễ maintain hơn khi số lượng code ngày một nhiều lên. Nhưng trong bài này, chúng ta sẽ chỉ tập trung vào configure WebDriver.

# Configuring the driver
Rất hiếm khi cần tạo một phiên bản WebDriver trong Serenity - trong hầu hết các trường hợp, bạn có thể thực hiện tất cả các cấu hình bạn cần bằng cách sử dụng thuộc tính hệ thống Serenity.

## The webdriver.driver property
Thuộc tính cơ bản nhất là *webdriver.driver*. Điều này cho Serenity biết nên sử dụng trình duyệt nào. Bạn có thể cấu hình điều này ở rất nhiều nơi khi sử dụng Serenity, đây cũng là một điều tuyệt vời nữa mà Serenity mang lại

**1)** Sử dụng serenity.properties file

Bạn có thể thêm thuộc tính *webdriver.driver* vào *serenity.properties* file của mình trong thư mục gốc của dự án, ví dụ:

```
webdriver.driver=chrome
```

**2)** Bạn cũng có thể tạo ra một file *serenity.conf* sử dụng notation Typesafe Config và để trong classpath của bạn (ví dụ: trong src/test/resources).

```
webdriver {
    driver=chrome
}
```

**3)** Sử dụng command line : Bạn cũng có thể ghi đè trình điều khiển được chỉ định trong file properties bằng lệnh trong Maven như sau

```
`mvn clean verify -Dwebdriver.driver = firefox`
```

**4)** Sử dụng annotation @Managed: Nếu bạn luôn cần chạy thử nghiệm với một trình duyệt cụ thể và bạn đang sử dụng JUnit, bạn có thể sử dụng browser tùy chọn trong @Managed, ví dụ:
```

@Managed(driver = "firefox")
WebDriver driver;
```

Một lưu ý nữa khi sử dụng annotation là các annotation sẽ được ưu tiên hơn khi được truyền trực tiếp vào scenario, ví dụ :

```
@driver:chrome
Feature: Completing todos

  In order to make me feel a sense of accomplishment
  As a forgetful person
  I want to be to view all of things I have completed

  Scenario: Mark a task as completed in Cucumber
    Given that Jane has a todo list containing Buy some milk, Walk the dog
    When she completes the task called 'Walk the dog'
    And she filters her list to show only Completed tasks
    Then her todo list should contain Walk the dog
```

# Configuring Drivers
Nhưng để chay được những bài test trên những trình duyệt đã được config trước đó , bạn phải cung cấp cho nó những file binary tương ứng của từng trình duyệt. Những file này là dành riêng cho từng trình duyệt khác nhau

```
Firefox               https://github.com/mozilla/geckodriver/releases

Chrome                http://chromedriver.chromium.org

Internet Explorer     https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver
```
Tương tự như việc config các browser muốn chạy, chúng ta cũng có thể config driver để  chạy cho từng trình duyệt bằng nhiều cách và ở nhiều nơi khác nhau

**1)** Config ở file `serenity.properties` 
```

webdriver.gecko.driver=/path/to/my/geckodriver
```

**2)** Config ở file `serenity.conf`
```

drivers {
  windows {
    webdriver.chrome.driver = src/test/resources/webdriver/windows/chromedriver.exe
  }
  mac {
    webdriver.chrome.driver = src/test/resources/webdriver/mac/chromedriver
  }
  linux {
    webdriver.chrome.driver = src/test/resources/webdriver/linux/chromedriver
  }
}
```

**3)** Hoặc chúng ta cũng có thể config bằng cách lưu tất cả config driver vào một file trong thư mục dự án của bạn

```
src/test/resources
└── webdriver
    ├── linux
    │   ├── chromedriver
    │   └── geckodriver
    ├── mac
    │   ├── chromedriver
    │   └── geckkodriver
    └── windows
        ├── chromedriver.exe
        └── geckodriver.exe
```

# Other useful Webdriver configuration options
### Restart the browser each scenario or feature

Thông thường, mỗi test case hoặc test scenario nên độc lập. Do đó, Serenity bắt đầu một browser session cho mỗi trường hợp theo mặc định. Tuy nhiên, có một số trường hợp, vì lý do hiệu suất, bạn có thể muốn chạy tất cả các test scenario hoặc test case trong một tính năng hoặc test suite duy nhất với cùng một browser. Trong trường hợp này, bạn có trách nhiệm đảm bảo rằng trình duyệt ở trạng thái chính xác khi bắt đầu mỗi tình huống.

Các `serenity.restart.browser.for.each` cho phép bạn tinh chỉnh khi trình duyệt sẽ được khởi động lại. Các giá trị có thể là:

* scenario
* story or feature
* never

### Pausing between each step

Đôi khi, vì nhiều lý do khác nhau, bạn có thể phải chạy test chậm hơn bình thường. Bạn có thể sử dụng `serenity.step.delay` property cho việc này. Đây là thời gian tính bằng mili giây (0 theo mặc định) mà Serenity sẽ tạm dừng giữa mỗi bước.

### General Driver capabilities

Bạn có thể thêm các capabilities  tùy ý vào trình duyệt bằng cách sử dụng thuộc tính `serenity.driver.capabilities`, như được hiển thị bên dưới

```
serenity.driver.capabilities="browserName:iphone; deviceName:iPad Retina; version:9.2"
```

### Automatic WebDriver management

Serenity sử dụng công cụ [WebDriverManager](https://github.com/bonigarcia/webdrivermanager) để quản lý webdriver tự đọng. Download webdriver tự động có thể được kích hoạt bằng cách sử dụng thuộc tính `webdriver.autodownload=true`

Trên đây là toàn bộ những cài đặt chính mà bạn cần phải lưu ý khi muốn bắt đầu automate Web Application with Serenity, hy vọng bài viết này sẽ có ích với các bạn. Hẹn gặp lại ở nhưng bài viết tiếp theo

  
  
  
 Nguồn : https://serenity-bdd.github.io/theserenitybook/latest/web-testing-in-serenity.html