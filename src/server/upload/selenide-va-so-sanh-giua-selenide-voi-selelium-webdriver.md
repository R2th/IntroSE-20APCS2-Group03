Bài trước mình đã giới thiệu đến các bạn về cách xây dựng một chương trình kiểm thử tự động chạy với Java, Cucumber và Selelium Webdriver. Chắc một số bạn đọc sẽ thấy một số bước cấu hình khá dài dòng và mất thời gian.

Trong bài viết này, mình sẽ giới thiệu cho các bạn một framework dành cho automation test viết trên nền của Selelium Webdriver, sẽ giải quyết hết các vấn đề về mặt cấu hình cũng như viết test nhanh và hiệu quả hơn, tập trung chủ yếu vào testcase chứ không phải mất thời gian tìm hiểu mấy thứ rườm rà nữa :))

Nói miên man thế đủ rồi, mình đi vào chủ đề chính đây. Framework mình muốn giới thiệu với các bạn là Selenide (https://selenide.org/) . Framework này cũng có thể kết hợp khá tốt với Cucumber, để xây dựng hệ thống test auto của bạn một cách chuyên nghiệp.

### I. Selenide là gì?

Selenide (đọc là “Sê lê nai” nhé :))) là một framework automation test được cung cấp bởi Selelium Webdriver, mang lại những ưu điểm sau:

Code ngắn hơn: thay vì phải viết code dài ngoằng ngoẵng trong Selenium WebDriver, với Selenide code của bạn sẽ rất tối ưu và dễ nhìn.

Hỗ trợ Ajax: thay vì phải viết các câu lệnh để xử lý việc chờ Ajax thực hiện xong mới thực hiện tiếp, Selenide đã thực hiện luôn cho bạn rồi.

Hàm query element cung cấp cho bạn đủ các tùy chọn select theo text, class, ID, name,...

Cấu hình đơn giản: so với Selelium WebDriver muốn cài cắm gì là phải cấu hình cả đống, thì với Selenide bạn chỉ cần 1 2 dòng code

Viết đến đây bạn nào cũng muốn dùng thằng Selenide thay vì dùng Selenium WebDriver rồi đúng không?

Phải nói là sau khi chuyển đổi sang thằng Selenide này, code mình ngắn hơn hẳn, mình chỉ cần tập trung vào các testcase chính thôi.
## 
## II. So sánh giữa Selenide với Selelium WebDriver

Dưới đây là một số các so sánh giữa code của Selenide với Selelium WebDriver

Khởi tạo một trình duyệt: 

**Selenium WebDriver:**
```
DesiredCapabilities desiredCapabilities = DesiredCapabilities.htmlUnit();
desiredCapabilities.setCapability(HtmlUnitDriver.INVALIDSELECTIONERROR, true);
desiredCapabilities.setCapability(HtmlUnitDriver.INVALIDXPATHERROR, false);
desiredCapabilities.setJavascriptEnabled(true);
WebDriver driver = new HtmlUnitDriver(desiredCapabilities);
```
Selenide:
```
open("/my-application/login");
// And run tests with option -Dbrowser=htmlunit (or "chrome" or "ie", default value is "firefox")

```

Tắt trình duyệt sau khi test xong

**Selenium WebDriver:**
```
if (driver != null) {
    driver.close();
}
```
Selenide:

`// Do not care! Selenide closes the browser automatically.`
Với Selenide Bạn không cần phải thao tác trực tiếp với Selenium WebDriver. WebDriver sẽ được tự động tạo / xóa trong quá trình bắt đầu / kết thúc kiểm tra.

**Tìm dom element**

Selenium WebDriver:
`WebElement customer = driver.findElement(By.id("customerContainer"));`
Selenide:
`WebElement customer = $("#customerContainer"); `

hoặc 1  sự lựa chọn dài hơn 

`WebElement customer = $(By.id("customerContainer"));`


**Kiểm tra element có chứa text chính xác không**

Selenium WebDriver:
`assertEquals("Customer profile", driver.findElement(By.id("customerContainer")).getText());`
Selenide:
`$("#customerContainer").shouldHave(text("Customer profile"));`

**Ajax support**

Selenium WebDriver (OMG!):
```
FluentWait<By> fluentWait = new FluentWait<By>(By.tagName("TEXTAREA"));
fluentWait.pollingEvery(100, TimeUnit.MILLISECONDS);
fluentWait.withTimeout(1000, TimeUnit.MILLISECONDS);
fluentWait.until(new Predicate<By>() {
    public boolean apply(By by) {
        try {
            return browser.findElement(by).isDisplayed();
        } catch (NoSuchElementException ex) {
            return false;
        }
    }
});
assertEquals("John", browser.findElement(By.tagName("TEXTAREA")).getAttribute("value"));
```
Selenide:
`$("TEXTAREA").shouldHave(value("John"));`

Lệnh này tự động đợi cho đến khi phần tử hiển thị và nhận được giá trị mong đợi.
Thời gian chờ mặc định là 4 giây và nó có thể định cấu hình.

**Kiểm tra element có chứa css class chính xác không**

 Selenium WebDriver:
`assertTrue(driver.findElement(By.id("customerContainer")).getAttribute("class").indexOf("errorField") > -1);`

Selenide:

`$("#customerContainer").shouldHave(cssClass("errorField"));`

    
**Kiểm tra element có chứa text match với biểu thức chính quy**

   Selenium WebDriver:
`No way (except XPath)`

Selenide:
```
WebElement customer = $(byText("Customer profile")); 
    
```
    
**Kiểm tra element không tồn tại**

Selenium WebDriver:
```
try {
    WebElement element = driver.findElement(By.id("customerContainer"));
    fail("Element should not exist: " + element);
}
```
catch (WebDriverException itsOk) {}
Selenide:
`$("#customerContainer").shouldNot(exist);`
    
**Tìm phần tử con trong phần tử cha**
Selenium WebDriver:

```
WebElement parent = driver.findElement(By.id("customerContainer"));
WebElement element = parent.findElement(By.className("user_name"));
```
Selenide:

`$("#customerContainer").find(".user_name");`
    
**Tìm phần tử con thứ N**

Selenium WebDriver:
```

WebElement element = driver.findElements(By.tagName("li")).get(5);
```
Selenide:

```
$("li", 5);
Click “OK” trong alert dialog
```
Selenium WebDriver:

```
try {
  Alert alert = checkAlertMessage(expectedConfirmationText);
  alert.accept();
} catch (UnsupportedOperationException alertIsNotSupportedInHtmlUnit) {
  return;
}
Thread.sleep(200); // sometimes it will fail
```
    
Selenide:

`confirm("Are you sure to delete your profile?");`
or

`dismiss("Are you sure to delete your profile?");`

**Debug Element**

Selenium WebDriver:

```
WebElement element = driver.findElement(By.id("customerContainer"));
System.out.println("tag: " + element.getTag());
System.out.println("text: " + element.getText());
System.out.println("id: " + element.getAttribute("id"));
System.out.println("name: " + element.getAttribute("name"));
System.out.println("class: " + element.getAttribute("class"));
System.out.println("value: " + element.getAttribute("value"));
System.out.println("visible: " + element.isDisplayed());
// etc. 
```
    
Selenide:

```
System.out.println($("#customerContainer"));
// output looks like this: "<option value=livemail.ru checked=true selected:true>@livemail.ru</option>"
```
**Chụp màn hình**

Selenium WebDriver:

```
if (driver instanceof TakesScreenshot) {
  File scrFile = ((TakesScreenshot) webdriver).getScreenshotAs(OutputType.FILE);
  File targetFile = new File("c:\temp\" + fileName + ".png");
  FileUtils.copyFile(scrFile, targetFile);
}
```
Selenide:

`takeScreenShot("my-test-case");`


Đối với người dùng JUnit, nó thậm chí còn đơn giản hơn:

```
public class MyTest {
  @Rule // automatically takes screenshot of every failed test
  public ScreenShooter makeScreenshotOnFailure = ScreenShooter.failedTests();
}
```
**Chọn radio button**

elenium WebDriver:
```
    for (WebElement radio : driver.findElements(By.name("sex"))) {
      if ("woman".equals(radio.getAttribute("value"))) {
        radio.click();
      }
    }
    throw new NoSuchElementException("'sex' radio field has no value 'woman'");
```

  `  selectRadio(By.name("sex"), "woman");`

**Selenium WebDriver:**

```
for (WebElement radio : driver.findElements(By.name("sex"))) {
  if ("woman".equals(radio.getAttribute("value"))) {
    radio.click();
  }
}
throw new NoSuchElementException("'sex' radio field has no value 'woman'");
```
Selenide:

`selectRadio(By.name("sex"), "woman");`
Reload page

Selenium WebDriver:

`webdriver.navigate().to(webdriver.getCurrentUrl());`
Selenide:

`refresh();`
**Lấy url hiện tại của page, title, source**
    
```
Selenium WebDriver:
webdriver.getCurrentUrl();
webdriver.getTitle();
webdriver.getPageSource();
```
Selenide:

```
url();
title();
source();
```


### III. Tổng kết
Trên đây là một số kinh nghiệm của mình khi làm việc với Selenium WebDriver và quá trình chuyển đổi sang Selenide. Bài viết chỉ mang tính đóng góp ý kiến cá nhân, mong các cao nhân có vô tình ghé qua đọc được thì bớt gạch đá cho mình nhé :))