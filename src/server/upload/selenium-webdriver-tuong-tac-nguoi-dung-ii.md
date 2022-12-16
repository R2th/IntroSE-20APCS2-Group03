Ở bài viết trước, chúng ta đã cùng tìm hiểu về các thao tác với  Text Box,  Radio Button, Drop Down. 

Bài viết này chúng ta sẽ cùng tìm hiểu thao tác với các đối tượng: check box, thao tác kéo thả, và các thao tác với bàn phím.

## I. Tương tác với checkbox trong Selenium
Chúng ta có thể chọn một checkbox bằng cách sử dụng phương thức 'click' và bỏ chọn bằng phương thức 'click'.
Xác định XPath bằng cách sử dụng ChroPath plugin trên trình duyệt Chrome. Ví dụ này sử dụng trang web http://www.calculator.net/mortgage-calculator.html

![](https://images.viblo.asia/6e0d3d96-6af2-4202-a07d-d9ab5e779b02.png)


```
package thao.automation;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
 
public class Checkbox {
    public static void main(String[] args) {
 
        System.setProperty("webdriver.chrome.driver", 
                "D:\\SeleniumWebdriver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
 
        // Open website
        driver.get("http://www.calculator.net/mortgage-calculator.html");
         
        // Maximize the browser
        driver.manage().window().maximize();
 
        // Click on Radio Button
        driver.findElement(By.id("caddoptional")).click();
        System.out.println("Is Selected: "
                + driver.findElement(By.id("caddoptional")).isSelected());
        System.out.println("Is Enabled: "
                + driver.findElement(By.id("caddoptional")).isEnabled());
        System.out.println("Is Displayed: "
                + driver.findElement(By.id("caddoptional")).isDisplayed());
         
        // Click on other Radio Button
        driver.findElement(By.id("caddoptional")).click();
        System.out.println("Is Selected "
                + driver.findElement(By.id("caddoptional")).isSelected());
 
        // Close the Browser.
        driver.close();
    }
}
```

Kết quả:

Is Selected: false
Is Enabled: true
Is Displayed: true
Is Selected true

## II. Kéo, thả trong Selenium
Chúng ta sẽ thực hiện thao tác kéo và thả trong Selenium bằng cách chọn một cây thư mục có sẵn trên http://www.keenthemes.com/preview/metronic/templates/admin/ui_tree.html. Trong ví dụ này, chúng ta sẽ kéo một phần tử 'Disable Node' từ thư mục 'Initial Open' sang thư mục 'Parent Node'.

![](https://images.viblo.asia/f9c79511-58db-405e-a2b3-912419bb05a5.png)

```
package thao.automation;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;
 
public class DropDrag {
    public static void main(String[] args) {
 
        System.setProperty("webdriver.chrome.driver", 
                "D:\\SeleniumWebdriver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
 
        // Open website
        driver.get("http://www.keenthemes.com/preview/metronic/templates"
                + "/admin/ui_tree.html");
         
        // Maximize the browser
        driver.manage().window().maximize();
         
        WebElement from = driver.findElement(By.xpath(".//a[@id='j3_7_anchor']"));
        WebElement to = driver.findElement(By.xpath(".//a[@id='j3_1_anchor']"));
         
        Actions builder = new Actions(driver);
        Action dragAndDrop = builder.clickAndHold(from)
                .moveToElement(to).release(to).build();
         
        dragAndDrop.perform();
        // driver.close();
    }
}
```

Kết quả:
![](https://images.viblo.asia/8b78ca57-7ce2-434d-8e3d-455ce51168db.png)

## III. Thao tác với bàn phím trong selenium
Chúng ta sẽ thực hiện thao tác với bàn phím trong Selenium bằng việc sử dụng phương thức WebElement.sendKeys() hoặc Actions.sendKeys(). Send keys để biểu diễn bàn phím trong trình duyệt. Các phím đặc biệt không phải là văn bản, được biểu thị bằng Khóa được nhận dạng như là một phần của chuỗi ký tự hoặc ký tự riêng lẻ.
Sau đây là ví dụ thực hiện thao tác với bàn phím trong Selenium để mở trang https://google.com, nhập từ khóa 'Son Tung MTP' rồi bấm phím Enter để thực hiện tìm kiếm.
### 1. Sử dụng phương thức Actions.sendKeys():
```
package thao.automation;
 
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
 
public class KeyBoardActionSendkeys {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", 
                "D:\\SeleniumWebdriver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
 
        // Open website
        driver.get("https://google.com");
 
        // Maximize the browser
        driver.manage().window().maximize();
         
        WebElement searchElement = driver.findElement(By.name("q"));
        searchElement.sendKeys("Son Tung MTP");
        Actions action = new Actions(driver);
        action.sendKeys(Keys.RETURN);
        action.perform();
    }
}
```
Kết quả:

![](https://images.viblo.asia/c0037800-cdf6-404a-9143-24c97eeba53d.PNG)

### 2. Sử dụng phương thức WebElement.sendKeys():
```
package thao.automation;
 
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
 
public class KeyBoardWebElementSendkeys {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", 
                "D:\\SeleniumWebdriver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
 
        // Open website
        driver.get("https://google.com");
 
        // Maximize the browser
        driver.manage().window().maximize();
         
        WebElement searchElement = driver.findElement(By.name("q"));
        searchElement.sendKeys("Son Tung MTP", Keys.RETURN);
    }
}
```
![](https://images.viblo.asia/c0037800-cdf6-404a-9143-24c97eeba53d.PNG)

Vậy là chúng ta đã cùng tìm hiểu cách thao tác với Checkbox, kéo thả, và sử dụng bàn phím trong Selenium.
Ở bài viết tiếp theo, chúng ta sẽ tìm hiểu về Page Object Model (POM) trong Selenium