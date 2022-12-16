## I. Tại sao Selenium WebDriver không đủ?

### 1. Tổng quan

- Selenium WebDriver là một công cụ tuyệt vời, nhưng nó không phải là một công cụ để thử nghiệm. Nó là một công cụ để thao tác trình duyệt.
- Và Selenide là một công cụ để thử nghiệm tự động (được xây dựng dựa trên Selenium WebDriver).
    + Có một vài thử viện kiểm thử hữu ích cho Selenium Webdriver. Nhưng dường như nó không giải quyết được các vấn để chính của kiểm thử UI. Cụ thể, sự không ổn định của các thử nghiệm được biết đến do dynamic content, JavaScript, Ajax, thời gian chờ, ... 
    + Selenide đã được tạo để giải quyết các vấn đề này.

### 2. Selenide mang đến những ưu điểm vượt trội hơn Selenium Webdriver

- Trước hết, Selenide làm cho các thử nghiệm của bạn ổn định bằng cách giải quyết (gần như) tất cả các vấn đề về Ajax / thời gian.
- Selenide cung cấp API ngắn gọn để sử dụng Selenium WebDriver trong các thử nghiệm UI:
    - Smart waiting
    - Transparent WebDriver
    - Convenience methods
    - Ajax support
    - Automated screenshots

**2.1. Transparent WebDriver**

- Bạn không cần phải thao tác trực tiếp với WebDriver. Selenide sẽ tự động khởi động và tắt trình duyệt bất cứ khi nào nó cần.

**2.2. Convenience methods**

- Selenide cung cấp API súc tích cho việc kiểm tra của bạn ngắn hơn và dễ đọc hơn. 
- Selenide cung cấp các phương thức thuận tiện để thao tác với textfield, radiobutton, selectbox, tìm kiếm các phần tử bằng văn bản, v.v.

    ```
    @Test
    public void canFillComplexForm() {
      open("/client/registration");
      $(By.name("user.name")).val("johny");
      $(By.name("user.gender")).selectRadio("male");
      $("#user.preferredLayout").selectOption("plain");
      $("#user.securityQuestion").selectOptionByText("What is my first car?");
    }
    ```

**2.3. Ajax support**

- Khi kiểm thử các ứng dụng Ajax, chúng ta thường cần đợi cho đến khi một số phần tử thay đổi trạng thái. Selenide có các phương thức tích hợp để chờ đợi.
- Bất kỳ phương pháp nào sau đây sẽ đợi cho đến khi sự kiện được mô tả xảy ra. Thời gian chờ mặc định là 4 giây.

    ```
     $("#topic").should(appear);
     $("#topic").shouldBe(visible);

     $("#topic").should(disappear);
     $("h1").shouldHave(text("Hello"));
     $(".message").shouldNotHave(text("Wait for loading..."));
     $(".password").shouldNotHave(cssClass("errorField"));

     $(".error").should(disappear);
    ```

**2.4. Automated screenshots**

- Khi thử nghiệm của bạn thất bại, Selenide sẽ tự động chụp ảnh màn hình. Bạn không cần phải làm bất cứ điều gì cho nó.

## II. Screenshots

### 1. Selenide có thể chụp ảnh màn hình không?

- Có, Selenide tự động chụp ảnh màn hình cho mỗi lần thử nghiệm thất bại. Điều này rất hữu ích để phân tích lỗi.
- Thư mục lưu trữ ảnh chụp màn hình mặc định của Selenide là `build/reports/tests`

### 2. Tôi có thể thay đổi thư mục lưu trữ ảnh chụp màn hình mặc định của Selenide bằng một thư mục khác không?

- Có. Bạn có thể sử dụng thuộc tính `-Dselenide.reportsFolder=test-result/reports` để thiết lập bất kỳ thư mục nào để lưu trữ ảnh chụp màn hình.
- Ví dụ `-Dselenide.reports=test-result/reports`
- Hoặc bạn có thể thiết lập thư mục này trực tiếp từ mã của bạn 

    ```
    Configuration.reportsFolder = "test-result/reports";
    ```

### 3. Hỗ trợ JUnit và TestNG

- Đối với JUnit và TestNG, có một hỗ trợ đặc biệt để chụp ảnh màn hình cho các thử nghiệm thành công.

**3.1. JUnit 4**

- Chụp ảnh màn hình cho các kiểm thử thất bại

    ```
    import com.codeborne.selenide.junit.ScreenShooter;

    public class MyTest {
      @Rule
      public ScreenShooter makeScreenshotOnFailure = ScreenShooter.failedTests();

      // ...
    }
    ```

    => Thật ra bạn không cần phải làm điều này vì vì Selenide tự động làm điều đó.
    
 - Nhưng nếu bạn muốn tự động chụp ảnh màn hình của mọi bài kiểm tra (thậm chí đã thành công), hãy sử dụng lệnh sau:

    ```
    @Rule
    public ScreenShooter makeScreenshotOnFailure = ScreenShooter.failedTests().succeededTests();
    ```

**3.2. TestNG**

```
import com.codeborne.selenide.testng.ScreenShooter;

@Listeners({ ScreenShooter.class})
public class MyTest {
  // ...
}
```

- Để tự động chụp ảnh màn hình của mọi bài kiểm tra (thậm chí đã thành công), hãy sử dụng lệnh sau:

```
ScreenShooter.captureSuccessfulTests = true;
```

**3.3. JUnit 5**

- Cách sử dụng trong java

    ```
    @ExtendWith({ScreenShooterExtension.class})
      public class MyTest {
        // ...
      }
    ```

- Cách sử dụng trong Java (có tùy chỉnh):

    ```
    public class MyTest {
        @RegisterExtension
        static ScreenShooterExtension screenshotEmAll = new ScreenShooterExtension(true);
      }
    ```

- Cách sử dụng trong Kotlin:

    ```
    @ExtendWith(ScreenShooterExtension::class)
      class MyTest {
        // ...
      }
    ```

- Cách sử dụng trong Kotlin (có tùy chỉnh):

    ```
    class MyTest {
        companion object {
          @JvmField
          @RegisterExtension
          val screenshotEmAll: ScreenShooterExtension = ScreenShooterExtension(true);
        }
      }
    ```

- Bất cứ lúc nào bạn muốn

    Ngoài ra, bạn có thể chụp ảnh màn hình bất cứ lúc nào với một dòng mã:

    ```
    import static com.codeborne.selenide.Selenide.screenshot;

    screenshot("my_file_name");
    ```

    => Selenide sẽ tạo hai tệp: my_file_name.png và my_file_name.html

## III. Page Objects - it’s simple!

- Trong thế giới QA, có một page objects là rất phổ biến. Điều đó có nghĩa là với mỗi trang bạn tạo một lớp riêng - page object. Lớp này nên triển khai logic làm việc với các phần tử trang khác nhau.
- Điều đó sẽ giúp việc tránh trùng lặp các vị trí cuả các phần tử trong một page object.
- Selenide cho phép bạn viết các page object ngắn gọn và dễ đọc hơn.

    ```
    public class GoogleSearchPage {
      public GoogleResultsPage search(String query) {
        $(By.name("q")).setValue(query).pressEnter();
        return page(GoogleResultsPage.class);
      }
    }

    public class GoogleResultsPage {
      public ElementsCollection results() {
        return $$("#ires li.g");
      }
    }
    ```

- Như bạn thấy, không có PageFactory, không có initElements và các garbage khác như thế. Đối tượng trang của bạn chỉ chứa logic của bạn.
- Cách thao tác với page object sẽ đơn giản như sau

    ```
      GoogleSearchPage searchPage = open("/login", GoogleSearchPage.class);
      GoogleResultsPage resultsPage = searchPage.search("selenide");
      resultsPage.results().shouldHave(size(10));
      resultsPage.results().get(0).shouldHave(text("Selenide: Concise UI Tests in Java"));
    ```


## IV. Nguồn tham khảo

- [Selenide and Selenium comparison](https://selenide.org/documentation/selenide-vs-selenium.html)
- [Screenshots](https://selenide.org/documentation/screenshots.html)
- [Page Objects](https://selenide.org/documentation/page-objects.html)