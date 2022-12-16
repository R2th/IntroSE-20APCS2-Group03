Để triển khai Cucumber các bạn cần tạo ra 4 package để lưu trữ các tệp: 
* *Feature*: để chứa các test case viết bằng ngôn ngữ Gherkin.
* *Page objects*: để định nghĩa các phần tử trên web/app.
* *Step definition*: để chứ các script ứng với test case.
* *Test runner*: để chạy script.

![](https://images.viblo.asia/da768c6a-6ea7-473c-aaff-92fe2f26e741.png)

## 1.Ngữ cảnh

Kiểm thử với chức năng đăng nhập vào hệ thống thành công, sau khi đăng nhập thành công hiển thị thông báo: "WELCOME :)".

Link website: http://testing-ground.scraping.pro/login, 
username/password: admin/12345.

## 2. Viết scenario(kịch bản)

Định nghĩa các cú pháp cơ bản trong BDD:

Feature: Là một đoạn text mô tả ngắn gọn về chức năng thực hiện.

Background: Cho phép thêm một số ngữ cảnh cho tất cả các Scenario trong feature Có chứa một số bước được chạy trước mỗi Scenario Có thể hiểu đơn giản giống như điều kiện tiên quyết để thực hiện tất cả các Scenario trong feature Được khai báo sau từ khóa “Feature”.

*Scenario*: Từ khóa bắt đầu trước mỗi kịch bản, tiếp theo là tiêu đề của kịch bản sẽ thực hiện Mỗi kịch bản bao gồm một hoặc nhiều bước.

*Given*: Mô tả điều kiện tiên quyết để thực hiện 1 Scenario.

*When*: Mô tả các hành động chính (Steps) mà người dùng thực hiện.

*Then*: Mô tả kết quả đầu ra mong muốn của Scenario.

*And/ But*: Thay thế cho các từ khóa Given/ When/ Then để làm cho chương trình mạch lạc hơn.

Tạo 1 file có đuôi *.feature*( trong thư mục *Feature*) để chứa các scenario(kịch bản).

```
Feature:Front site - Login function
 
   Scenario: Login successfully with valid front account
     Given User navigates to Login page of front site
     When User enters valid account at front site
     And User enters valid password at front site
     And User clicks on Login button at front site
     Then User login successfully into front site
```

## 3.Tạo file test runner
Tạo file *LoginTestRunner*( trong thư mục *runner*), ở đây mình cho đường dẫn chạy ở file Login.feature.

```
 package runner;
 
 import cucumber.api.CucumberOptions;
 import cucumber.api.junit.Cucumber;
 import org.junit.runner.RunWith;
 
 @RunWith(Cucumber.class)
 @CucumberOptions(
         features = "src/test/Feature/Login.feature"
         , glue = {"stepDefinition"}
 )
 public class Login_TestRunner {
 }

```

***Trong đó***
*  *@RunWith*: là lớp chạy thử nghiệm để bắt đầu thực hiện các thử nghiệm.
*  *@CucumberOptions*: để đặt một số thuộc tính cho Cucumber test như: file future được chạy,  bỏ qua senario được đánh tag,...

## 4.Dựng page objects
Tạo file *LoginPage*( trong thư mục *pageOjects*) để chứa định danh các phần tử của trang đăng nhập.

```
package pageObjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPage {
    public static WebDriver driver;
    private static WebElement element;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public static WebElement ip_username() {
        element = driver.findElement(By.xpath("//input[@id='usr']"));
        return element;
    }

    public static WebElement ip_password() {
        element = driver.findElement(By.xpath("//input[@id='pwd']"));
        return element;
    }

    public static WebElement btn_login() {
        element = driver.findElement(By.xpath("//input[@type='submit']"));
        return element;
    }

    public static WebElement txt_successfully() {
        element = driver.findElement(By.xpath("//h3[@class='success']"));
        return element;
    }

}
```

## 5.Tạo phương thức để mở/đóng trình duyệt
Ví dụ dưới đây là tạo trình điều kiển trên Chrome, các bạn cũng có thể tạo trên bất kì trình duyệt nào được Selenium hỗ trợ.

Đầu tiên, các bạn phải tải ChromeDriver tại đây: https://chromedriver.chromium.org/downloads( version của chomedriver phải nhỏ hơn hoặc bằng version chrome cài đặt trên máy).

Tiếp đến, tạo file *BrowserFactory*

```
package utils;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.awt.*;
import java.util.concurrent.TimeUnit;

public class BrowserFactory {
    private static WebDriver currentDriver = null;

    //Get current web driver running
    public static WebDriver getCurrentDriver() {
        if (currentDriver == null) {
            currentDriver = BrowserFactory.createBrowser();
        }
        return currentDriver;
    }

    // create new browser
    public static WebDriver createBrowser() {
        WebDriver driver;
        driver = createChromeDriver();
        addAllBrowserSetup(driver);
        return driver;
    }

    //Add all browser setup
    private static void addAllBrowserSetup(WebDriver driver) {
        driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
        driver.manage().window().setPosition(new Point(0, 0));
        java.awt.Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        Dimension dim = new Dimension((int) screenSize.getWidth(), (int) screenSize.getHeight());
        driver.manage().window().setSize(dim);
    }

    private static WebDriver createChromeDriver() {
        System.setProperty("webdriver.chrome.driver", "src/main/config/chromedriver.exe");
        return new ChromeDriver();
    }

    // Close current browser
    public static void closeCurrentBrowser() {
        if (currentDriver != null) {
            currentDriver.quit();
        }
        currentDriver = null;
    }
}

```

Và file *Hooks* (tạo trong thư mục *Step definition*) cho phép chúng ta có thể thực các công việc nhất định tại một thời điểm thực thi các test case như trước khi bắt đầu một Scenario hay sau khi kết thúc một Scenario.

```
import cucumber.api.Scenario;
package stepDefinition;

import utils.BrowserFactory;
import cucumber.api.Scenario;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import org.apache.log4j.Logger;
import org.openqa.selenium.WebDriver;

import java.util.concurrent.TimeUnit;

public class Hooks{
    private static final Logger LOGGER = Logger.getLogger(Hooks.class);
    private static WebDriver driver;

    public static WebDriver getDriver() {
        return driver;
    }

    @Before
    public void BeforeScenario() {
        try {
            driver = BrowserFactory.getCurrentDriver();
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
        } catch (Exception ex) {
            LOGGER.error(ex.getMessage(), ex);
        }
    }

    @After
    public void AfterScenario(Scenario scenario) {
        BrowserFactory.closeCurrentBrowser();
    }

}
```

Và 1 file *TestBase*

```
package utils;

import org.openqa.selenium.WebDriver;
import stepDefinition.Hooks;

public class TestBase {
    public static WebDriver driver;
    public TestBase() {
        this.driver = Hooks.getDriver();
    }
}
```

**Lưu ý**: File *BrowserFactory* và *TestBase* phải để khác thư mục với file *Hooks*.

## 6.Viết script cho từng scenario

Tạo 1 file *LoginSteps*(trong thư mục *Step definition*).

```
package stepDefinition;

import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import org.junit.Assert;
import pageObjects.LoginPage;
import utils.TestBase;

public class LoginSteps extends TestBase {

public LoginSteps() {
}

LoginPage loginPage = new LoginPage(driver);

@Given("^User navigates to Login page of front site$")
public void userNavigatesToLoginPageOfFrontSite() {
    driver.get("http://testing-ground.scraping.pro/login");
}

@And("^User enters valid account at front site$")
public void userEntersValidAccountAtFrontSite() {
    loginPage.ip_username().sendKeys("admin");
}

@And("^User enters valid password at front site$")
public void userEntersValidPasswordAtFrontSite() {
    loginPage.ip_password().sendKeys("12345");
}

@And("^User clicks on Login button at front site$")
public void userClicksOnLoginButtonAtFrontSite() {
    loginPage.btn_login().click();
}

@Then("^User login successfully into front site$")
public void userLoginSuccessfullyIntoFrontSite() {
    String alertActual = loginPage.txt_successfully().getText();
    Assert.assertEquals("WELCOME :)", alertActual);
}
}
```

Và cuối cùng, các bạn vào file testRuner để chạy chức năng đăng nhập, khi chạy thành công sẽ hiển thị như hình dưới
![](https://images.viblo.asia/01ec5a58-6429-4163-8ffb-6be1d4c7dcbc.png)

(còn tiếp)