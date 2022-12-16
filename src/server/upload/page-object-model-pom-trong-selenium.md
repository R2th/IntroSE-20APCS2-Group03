Page Object Model (POM) là mô hình đối tượng trang trong Selenium.
Chúng ta sẽ cùng tìm hiểu các nội dung:
- Tại sao nên sử dụng Page Object Model (POM)?
- Page Object Model (POM) là gì?
- Ưu điểm của Page Object Model (POM)
- Ví dụ Page Object Model (POM) trong Selenium

## 1. Tại sao nên sử dụng Page Object Model (POM)?
Các yêu cầu viết kịch bản test trong Selenium WebDriver KHÔNG phải là một nhiệm vụ khó khăn. Chúng ta chỉ cần tìm các phần tử và thực hiện các thao tác trên nó.
Hãy xem xét kịch bản đơn giản sau để đăng nhập vào một trang web.

```
package thaonguyen.selenium;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
 
import junit.framework.Assert;
 
public class loginFacebook {
    public void login() {
        WebDriver driver = new ChromeDriver();
        // Open website
        driver.get("https://www.facebook.com/");
        // Maximize the browser
        driver.manage().window().maximize();
        // find user and fill it
        driver.findElement(By.id("email")).sendKeys("nguyenthao@gmail.com");
        // find user and fill it
        driver.findElement(By.id("pass")).sendKeys("12345678");
        // click login button
        driver.findElement(By.id("u_0_2")).click();
    }
}
```
Như trong ví dụ trên, tất cả những gì chúng ta đang làm là tìm kiếm các phần tử và điền giá trị cho những phần tử đó.
Đây là một kịch bản nhỏ, dễ dàng bảo trì. Nhưng khi số lượng dòng code tăng lện mọi thứ trở nên khó khăn.
Vấn đề chính với việc bảo trì tập lệnh là nếu 10 tập lệnh khác nhau đang sử dụng cùng một phần tử của một trang, với bất kỳ thay đổi nào trong phần tử đó, bạn cần phải thay đổi tất cả 10 tập lệnh. Đây là thời gian và dễ bị lỗi.

Một cách tiếp cận tốt hơn để bảo trì tập lệnh là tạo một lớp riêng biệt và định nghĩa các phần tử phần tử của trang web trong đó. Lớp này có thể được tái sử dụng trong tất cả các kịch bản kiểm thử sử dụng phần tử đó. Trong tương lai, nếu có sự thay đổi trong phần tử web, chúng ta cần thực hiện thay đổi chỉ trong một lớp mà không phải 10 tập lệnh khác nhau.

Cách tiếp cận này được gọi là mô hình đối tượng trang (POM). Nó giúp làm cho code dễ đọc hơn, có thể bảo trì và sử dụng lại được.

## 2. Page Object Model (POM) là gì?
- Page Object Model (POM) là một mẫu thiết kế để tạo kho lưu trữ đối tượng - Object Repository cho các phần tử giao diện web.
- Theo mô hình này, đối với mỗi trang web trong ứng dụng, sẽ có lớp trang tương ứng.
- Lớp trang này sẽ chứa các WebElements của trang web đó và cũng chứa các phương thức thực hiện các thao tác trên các WebElements đó.
- Tên của các phương thức này nên được đưa ra theo nhiệm vụ mà chúng đang thực hiện, nghĩa là nếu trình nạp đang chờ cổng thanh toán hiển thị, tên phương thức POM có thể là waitForPaymentScreenDisplay().
## 3. Ưu điểm của Page Object Model (POM)
- Các hoạt động trong giao diện người dùng được tách biệt. Khái niệm này làm cho code của chúng ta sạch hơn và dễ hiểu hơn, dễ bảo trì hơn.
- Lợi ích thứ hai là kho lưu trữ đối tượng độc lập với các trường hợp kiểm thử, vì vậy chúng ta có thể sử dụng cùng một kho lưu trữ đối tượng cho một mục đích khác với các công cụ khác nhau. Ví dụ, chúng ta có thể tích hợp POM với TestNG/JUnit để kiểm tra chức năng và cùng lúc với JBehave/Cucumber để kiểm tra chấp nhận.
- Code ít hơn và được tối ưu hóa vì các phương thức trang có thể tái sử dụng trong các lớp POM.
- Chúng ta có định nghĩa tên phương thức tương ứng với một hoạt động cụ thể, ví dụ hành động truy cập vào trang chủ, tên phương thức giống như 'gotoHomePage()'.
## 4. Ví dụ Page Object Model (POM) trong Selenium
Ví dụ này sử dụng Page Object Model (POM) trong Selenium để login trang https://www.facebook.com, sau đó kiểm tra xem user đã được login thành công hay không.
Các bước thực hiện:

Bước 1: Truy cập trang web https://www.facebook.com.

Bước 2: Login vào trang https://www.facebook.com.

Bước 3: Xác minh đang nhập thành công.

Chúng ta sẽ xử lý 2 trang sau:
Trang đăng nhập.
Trang chủ (sau khi đăng nhập).
Vì có thể xảy ra ngoại lệ khi chúng ta cố gắng tìm một phần tử KHÔNG tồn tại trên trang web bằng phương thức WebDriver.findElement(), có thể nó sẽ làm gián đoạn chương trình. Do vậy chúng ta nên tạo ra một hàm để kiểm tra xem phần tử web đã được hiển thị hay chưa như sau:

File: Utils.java

```
package thaonguyen.selenium;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
 
public class Utils {
     
    public static boolean waitForElementDisplay (WebDriver driver, By by, 
            int waitInSecond) {
        for (int i = 0 ; i < waitInSecond / 2 + 1; i++) {
            try {
                if (driver.findElement(by).isDisplayed()) {
                    return true;
                }
                Thread.sleep(2 * 1000);
            } catch (Exception e) {
                System.out.println("waiting element for display...");
            }
        }
        return false;
    }
}
```
File: FacebookLogin.java


```
package thaonguyen.selenium;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
 
public class FacebookLogin {
    private WebDriver driver;
    private By byEmail = By.id("email");
    private By byPassword = By.id("pass");
    private By byBtnLogin = By.id("u_0_2");
     
    public FacebookLogin(WebDriver driver) {
        this.driver = driver;
    }
     
    public FacebookHomePage login(String email, String password) {
        // enter email
        driver.findElement(byEmail).sendKeys(email);
        // enter password
        driver.findElement(byPassword).sendKeys(password);
        // click login button
        driver.findElement(byBtnLogin).click();
        // return home page
        return new FacebookHomePage(driver);
    }
}
```
File: FacebookHomePage.java

```
package thaonguyen.selenium;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
 
public class FacebookHomePage {
    private WebDriver driver;
    private By byUserNavigation = By.id("userNavigationLabel");
     
    public FacebookHomePage(WebDriver driver) {
        this.driver = driver;
    }
     
    public boolean isDisplayed() {
        if (Utils.waitForElementDisplay(driver, byUserNavigation, 10)) {
            return true;
        } else {
            return false;
        }
    }
}
```
File: TestLoginFacebook.java

```
package thaonguyen.selenium;
 
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
 
public class TestLoginFacebook {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", 
                "D:\\SeleniumWebdriver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        // Open website
        driver.get("https://www.facebook.com");
        // Maximize the browser
        driver.manage().window().maximize();
        // Login facebook
        FacebookLogin facebookLogin = new FacebookLogin(driver);
        FacebookHomePage homePage = facebookLogin.login("nguyenthao@gmail.com", 
                "12345678");
        if (homePage.isDisplayed()) {
            System.out.println("Login Successfully!");
        } else {
            System.out.println("Login Fail!");
        }
        // Quit driver
        driver.quit();
    }
}
```
Kết quả:

waiting element for display...

waiting element for display...

waiting element for display...

waiting element for display...

waiting element for display...

waiting element for display...

Login Fail!