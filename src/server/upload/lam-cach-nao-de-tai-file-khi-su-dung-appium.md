Chúng ta thường gặp các tình huống phải tải lên một tệp / hình ảnh trong khi test một ứng dụng. Có nhiều cách để tải lên một tệp mà chúng ta đã thấy bằng cách sử dụng Selenium như sử dụng sendkey () hoặc sử dụng JavaScript () hoặc Robot Class.

Không có cách nào như Selenium SendKeys () hoặc các tùy chọn javascript hoạt động để tải lên tệp trong ứng dụng di động bằng Appium. 

Chúng ta thực sự phải làm mọi thứ thông qua giao diện người dùng - như chúng ta làm theo cách thủ công như nhấp vào nút tải lên, mở lựa chọn hình ảnh, chọn hình ảnh, v.v.

Điều duy nhất mà Appium có thể hỗ trợ là tải tệp lên thiết bị, vì vậy, thiết bị của bạn chỉ có thể được làm sạch và điền trong quá trình test automation bằng phương pháp pushFile. Chúng ta sẽ thảo luận dưới đây về điều này với ví dụ.

Khi gắng tải lên bằng sendKeys () với đường dẫn tệp từ chính thiết bị, webdriver sẽ đưa ra ngoại lệ bên dưới:

```
org.openqa.selenium.WebDriverException: An unknown server-side error occurred while processing the command. Original error: unknown error: path is not absolute: /sdcard/download/test.pdf 
```

Trong bài này chúng ta sẽ thảo luận về cách để upload/attach file từ thiết bị mobile đế ứng dụng web

Khi tự động tải lên tệp, sau khi nhấp vào nút 'Tải lên', nó sẽ nhắc bạn với một hộp thoại nằm ngoài phạm vi của web Appium. Giống như Selenium, Trong Appium cũng vậy, chúng ta không thể thực hiện các hành động khi chế độ xem được thay đổi từ web 'Chrome' thành ứng dụng 'NATIVE'.

Để thực hiện các thao tác, chúng ta phải chuyển context(ngữ cảnh) từ Web view sang Native view để đính kèm tệp bằng Appium. Trước tiên, chúng ta hãy thử tìm hiểu 'Cách chuyển từ Chrome sang Native app' bằng cách sử dụng Appium."

Một trong những nguyên tắc cốt lõi của Appium là bạn không cần phải thay đổi ứng dụng của mình để kiểm tra nó. Phù hợp với phương pháp đó, bạn có thể kiểm tra các ứng dụng lai (Hyprid app) giống như cách bạn có thể làm với Selenium dành cho ứng dụng web".

Để cho Appium biết bạn muốn tự động hóa các khía cạnh gốc của ứng dụng hay chế độ web views, chúng ta phải đặt 'context' được tự động hóa.

Cú pháp :  để chuyển sang native view app

```
driver.context("NATIVE_APP");
```

Cú pháp :  để chuyển sang Chrome browser context

```
driver.context("CHROMIUM");
```
 
 Ví dụ :
 
**Bước 1**: Open URL

**Bước 2:** Click on upload button

**Bước 3:** Switch to Context (NATIVE_APP)

**Bước 4:** Push file from your locale machine to device

**Bước 5:** Click on 'Allow' - permission

![](https://images.viblo.asia/7b6125b8-68e1-4799-a660-30bd50e1400f.png)

**Bước 6:** Click on files

![](https://images.viblo.asia/222dc230-c8e6-4e3b-aa15-e89424d75ff1.png)

**Bước 7:**  chọn file để upload 

![](https://images.viblo.asia/970cb8a1-8488-4d1b-bfd4-336871ac3f47.png)

**Bước 8:** Chuyển sang context cũ (CHROMIUM)

**Bước 9:** Click on Upload button on browser

**Bước 10:**  So sánh để validate file/image đã tải thành công  sử dụng Appium


```
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.By;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Set;

public class AppiumTest {

    AndroidDriver driver;
    WebDriverWait wait;
    String AppURL = "http://cgi-lib.berkeley.edu/ex/fup.html";

    @BeforeTest
    public void setup() throws MalformedURLException {

        // Create an object for Desired Capabilities
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "Android");
        capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "10.0");
        capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "Pixel");
        capabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "UIAutomator2");
        capabilities.setCapability(MobileCapabilityType.BROWSER_NAME, "Chrome");

        // Initialize the driver object with the URL to Appium Server and
        // passing the capabilities
        driver = new AndroidDriver(new URL("http://127.0.0.1:4723/wd/hub"), capabilities);
        wait = new WebDriverWait(driver, 5);
        driver.setFileDetector(new LocalFileDetector());
    }

    @Test
    public void testSearchAppium() throws IOException {

        //Navigate to app url
        driver.get(AppURL);

        //Click on upload button
        By uploadBtn = By.name("upfile");
        wait.until(ExpectedConditions.visibilityOfElementLocated(uploadBtn));
        driver.findElement(uploadBtn).click();

        //Push file to device
        driver.pushFile("/sdcard/download/test.pdf", new File("C:\\Users\\HarryDev\\Downloads\\cmp_html_page_size.pdf"));

       //Switch to Native_App
        Set<String> contextNames = driver.getContextHandles();
        for (String strContextName : contextNames) {
            if (strContextName.contains("NATIVE_APP")) {
                driver.context("NATIVE_APP");
                break;
            }
        }

        //Click on 'Allow' - permission
        By elementView = By.id("com.android.permissioncontroller:id/permission_allow_button");
        wait.until(ExpectedConditions.visibilityOfElementLocated(elementView));
        driver.findElement(elementView).click();

        //Click on files
        By eleFile = By.xpath("//*[@text="Files"]");
        wait.until(ExpectedConditions.visibilityOfElementLocated(eleFile));
        driver.findElement(eleFile).click();

        //select pdf file from downloads (location of pdf file)
        By eleDoc = By.id("com.android.documentsui:id/thumbnail");
        wait.until(ExpectedConditions.visibilityOfElementLocated(eleDoc));
        driver.findElement(eleDoc).click();

        //Switch to Chrome browser
        Set<String> contextNames1 = driver.getContextHandles();
        for (String strContextName : contextNames1) {
            if (strContextName.contains("CHROMIUM")) {
                driver.context("CHROMIUM");
                break;
            }
        }

        //Click on submit button
        WebElement btnElement = driver.findElement(By.cssSelector("input[type=submit]"));
        wait.until(ExpectedConditions.visibilityOf(btnElement));
        btnElement.click();

        //Add a simple assertion
        By nextPageHeader = By.cssSelector("h1");
        wait.until(ExpectedConditions.visibilityOfElementLocated(nextPageHeader));
        Assert.assertTrue(driver.findElement(nextPageHeader).getText().equals("File Upload Results"));

    }

    @AfterTest
    public void tearDown() {
        if(driver !=null)
            driver.quit();
    }

}
```
 
 Tham khảo :  
 
 https://www.seleniumeasy.com/appium-tutorials/upload-file-using-appium-on-device