Hôm nay mình xin giới thiệu đến các bạn cách để chụp được full hết màn hình web khi đang sử dụng automation test. 

Cách thức hoạt động của nó như sau: Khi màn hình web được load ra nó sẽ được set SCROLL_TIMEOUT đươc tính bằng millisecond. Đây là thời gian đợi ở mỗi lần scroll dừng lại trong quá trình scroll trình duyệt cuộn từ trên xuống dưới, lúc này hàm takeScreenshot sẽ thực hiện chụp lại màn hình tương ứng với mỗi lần scroll và nó sẽ ghép lại thành một hình hoàn chỉnh. 


```
 public void screenshoot(String name) throws IOException{

        Screenshot hxScreenshot = new AShot().shootingStrategy(ShootingStrategies.viewportPasting(SCROLL_TIMEOUT)).takeScreenshot(driver);
        //Thu muc chua hinh anh
        ImageIO.write(hxScreenshot.getImage(),"JPG",new File("C:\\SCREENSHOOT\\" + name + ".jpg"));

    }
    
```
Bạn hãy copy hàm trên cho vào đoạn code của mình. Đến step nào bạn muốn chụp màn hình thì ở bước đó bạn chỉ cần gọi lại hàm trên và truyền cho nó tham số 'name'. Name này là tên mà bạn muốn đặt cho image đó. 

Và hãy nhớ import thư viện Ashot để có thể chạy được các câu lệnh trên. 

* Dưới đây là một đoạn script đơn giản mình thực hiện chạy login trên trang Viblo. Hàm screenshoot được sử dụng khi vào trang home và sau khi thực hiện thao tác login

```
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;
import ru.yandex.qatools.ashot.AShot;
import ru.yandex.qatools.ashot.Screenshot;
import ru.yandex.qatools.ashot.shooting.ShootingStrategies;


import javax.imageio.ImageIO;

public class ScreenShoot {
    public WebDriver driver;
    By openLogin = By.xpath("//i[@class='fa fa-sign-in']");
    By username = By.xpath("//input[@name='username']");
    By password = By.xpath("//input[@name='password']");
    By btnLogin = By.xpath("//span[text()='Sign In']");
    By createPost = By.xpath("//a[contains(text(),'Create Post')]");
    String link = "https://viblo.asia/";
    final int TIME_OUT = 20;
    final int WAIT_TIME = 20;
    final int SCROLL_TIMEOUT = 30;

    @Test
    public void login() throws Exception {
        openDriver();
        screenshoot("home");
        driver.findElement(openLogin).click();
        driver.findElement(username).sendKeys("nguyen.thi.hang@framgia.com");//Update username của bạn tại đây
        driver.findElement(password).sendKeys("H12345678");// Update pass của bạn tại đây
        waitForControl(driver.findElement(btnLogin));
        driver.findElement(btnLogin).click();
        waitForControl(driver.findElement(createPost));
        if (driver.findElement(createPost).isDisplayed()){
            System.out.println("Đăng nhập thành công");
            screenshoot("loginsuccess");
        }else{
            System.out.println("Đăng nhập thất bại");
            screenshoot("loginfail");
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
    public void screenshoot(String name) throws IOException{

        Screenshot hxScreenshot = new AShot().shootingStrategy(ShootingStrategies.viewportPasting(SCROLL_TIMEOUT)).takeScreenshot(driver);
        //Thu muc chua hinh anh
        ImageIO.write(hxScreenshot.getImage(),"JPG",new File("C:\\SCREENSHOOT\\" + name + ".jpg"));

    }
}
```
* Link demo: https://www.youtube.com/watch?v=KhZlhic-9ow

Hình ảnh sau khi được chụp tại màn hình Home:

![](https://images.viblo.asia/8d143a93-7ca9-43c5-b74f-c2725ee54b56.jpg)

 Và màn hình sau khi login thành công:
 

![](https://images.viblo.asia/a0f0f46e-0e8d-4ee5-a97c-80424d4a55cf.jpg)