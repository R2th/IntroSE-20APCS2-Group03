Ở bài trước chúng ta đã tìm hiểu được về Locator và cách thức để có thể get được Locator như thế nào. 
Hôm nay mình sẽ giới thiệu đến các bạn những câu lệnh selenium cơ bản nhất để có thể thực hiện test được một scenario. 
## Khởi động & đóng trình duyệt
- Khởi tạo trình duyệt Chrome: 
Trước tiên phải download chromedriver về máy sau đó đưa path vào dòng lệnh bên dưới
```
System.setProperty("webdriver.chrome.driver", "C:\\chromedriver.exe");
WebDriver driver = new ChromeDriver();
```
- Khởi tạo trình duyệt Firefox. Với Firefox thì sẽ download geckodriver
```
System.setProperty("webdriver.gecko.driver", "C:\\geckodriver.exe");
WebDriver driver = new FirefoxDriver();
```
- Mở một trang web bất kì

`driver.get("url"); `

- Đóng cửa sổ hiện tại của trình duyệt

`driver.close();`

- Đóng hết cửa sổ đang mở và thoát trình duyệt

`driver.quit();`

## Thực hiện các action
- Click vào một web element.

`driver.findElement(By.id("btnLogin")).click();`

- Input dữ liệu

 `driver.findElement(By.name("username")).sendKeys("nguyen.thi.hang@framgia.com");`

## Thao tác với checkbox, radio 
- Sau khi get được Locator cho checkbox, radio và vì nó sẽ trả về 1 list nên ta sẽ khai báo nó như sau: 

`List<WebElement> cCheckbox = driver.findElements(By.id("checkbox"));`

- Click chọn vào ô  checkbox đầu tiên.

`cCheckbox.get(0).click();`

- Kiểm tra xem ô checkbox đầu tiên đã được chọn chưa ta sử dụng isSelected() 

`check = pCheckbox.get(0).isSelected();`

Nếu check trả về True tức là checkbox trên đã được chọn, False thì ngược lại. 

- Get giá trị của checkbox đầu tiên dựa vào thuộc tính value

 `getValue = tCheclbox.get(0).getAttribute("value");`

## Câu lệnh wait
Vì là automation nên việc chạy testcase rất nhanh, dẫn đến trường hợp sẽ báo lỗi khi mà trang web hay một web element  chưa được load xong. Vậy nên cần phải sử dụng một số lệnh Wait trong một thời gian nhất định nào đấy để chờ cho các web element được hiển thị. 

- Đợi trong vòng 20s trước khi báo lỗi vì không thể tìm thấy phần tử trên page.

`driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);`

- Đợi một element chỉ định trong vòng 20s, nếu sau 20s element đó không tìm thấy thì sẽ báo lỗi.

`new WebDriverWait(driver, 20).until(ExpectedConditions.visibilityOf(element));`

- Với 2 lệnh wait trên thì trong vòng 20s chỉ cần element xuất hiện thì chương trình sẽ chạy những câu lệnh tiếp theo mà không cần thiết phải chờ đủ 20s. 
Còn với `thread.Sleep(5000);` thì lại bắt buộc bạn phải chờ hết 5s thì mới chạy tiếp những câu lệnh khác
## Demo 
Cuối cùng là phần Demo tận dụng những câu lệnh trên để chạy case login vào Viblo. Nếu login thành công thì màn hình lúc này sẽ có button "CREATE POST". Vậy nên để check được case login thành công hay thất bại chỉ việc kiểm tra xem button "CREATE POST" có hiển thị hay không.

- Link demo: https://youtu.be/tQQIatZMZy4

- Code:
```
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

public class LoginViblo {
    public WebDriver driver;
    By openLogin = By.xpath("//i[@class='fa fa-sign-in']");
    By username = By.xpath("//input[@name='username']");
    By password = By.xpath("//input[@name='password']");
    By btnLogin = By.xpath("//span[text()='Sign In']");
    By createPost = By.xpath("//a[contains(text(),'Create Post')]");
    String link = "https://viblo.asia/";
    final int TIME_OUT = 20;
    final int WAIT_TIME = 20;

    @Test
    public void login() throws InterruptedException {
        openDriver();
        driver.findElement(openLogin).click();
        driver.findElement(username).sendKeys("nguyen.thi.hang@framgia.com");//Update username của bạn tại đây
        driver.findElement(password).sendKeys("H12345678");// Update pass của bạn tại đây
        driver.findElement(btnLogin).click();
        waitForControl(driver.findElement(createPost));
        if (driver.findElement(createPost).isDisplayed()){
            System.out.println("Đăng nhập thành công");
        }else{
            System.out.println("Đăng nhập thất bại");
        }
        closeDriver();
    }

    public void openDriver(){
        System.setProperty("webdriver.chrome.driver","C:\\chromedriver.exe");
        driver = new ChromeDriver();
        driver.get(link);
        waitForTimeOut();
        driver.manage().window().maximize();
    }
    public void closeDriver() throws InterruptedException{
        Thread.sleep(5000);
        driver.quit();
    }
    public void waitForTimeOut(){
        driver.manage().timeouts().implicitlyWait(TIME_OUT,TimeUnit.SECONDS);
    }
    public void waitForControl(WebElement controlName){
        new WebDriverWait(driver,WAIT_TIME).until(ExpectedConditions.visibilityOf(controlName));
    }
}
```