Selenium WebDriver là công cụ được sử dụng thường xuyên nhất trong số tất cả các công cụ có sẵn trong bộ công cụ Selenium. 
Do đó điều quan trọng là phải hiểu cách sử dụng Selenium để tương tác với các ứng dụng web.
Trong phần này, chúng ta cùng tìm hiểu cách tương tác với các đối tượng GUI bằng cách sử dụng Selenium webDriver.

Chúng ta cần tương tác với ứng dụng bằng cách sử dụng một số hành động cơ bản hoặc thậm chí một số hành động người dùng nâng cao bằng cách tạo các hàm do người dùng định nghĩa mà không có lệnh nào được xác định trước.

Dưới đây là các loại hành động khác nhau:

1. Tương tác Text Box
2. Tương tác Radio Button
3. Tương tác Drop Down
4. Tương tác CheckBox
5. Kéo và thả trong Selenium 
6, Thao tác với bàn phím
7. Thao tác chuột
8. Chọn nhiều hạng mục 

Ở bài viết này, chúng ta tìm hiểu về tương tác với các đối tượng: Textbox, Radio Button, Dropdown. 
Các đối tượng còn lại chúng ta sẽ cùng tìm hiểu trong những bài viết tiếp theo nhé :)

## I. Tương tác với Textbox
Chúng ta có thể nhập giá trị vào một text box bằng cách sử dụng phương thức WebDriver.sendkeys(). 
Tương tự, chúng ta cũng có thể lấy nội dung từ một text box bằng cách sử dụng lệnh WebElement.getAttribute("value"). Hãy xem ví dụ sau.

Xác định XPath bằng cách sử dụng tiện tích 'ChroPath'  trên trình duyệt Chrome hoặc Firefox. 
Ví dụ này sử dụng trang web https://www.facebook.com/ 

![](https://images.viblo.asia/3abd9244-f0c1-4960-b59a-839e65f94069.PNG)


```
package thao.automation;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
 
public class TextBox {
    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", 
                "D:\\SeleniumWebdriver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
         
        // open page
        driver.get("https://www.facebook.com/");
         
        // Maximize the browser
        driver.manage().window().maximize();
         
        // Enter value ngthao2911@gmail.com in the email field
        driver.findElement(By.id("email")).sendKeys("ngthao2911@gmail.com");
         
        Thread.sleep(5000);
         
        // Get the text box from the application
        String result = driver.findElement(By.id("email")).getAttribute("value");
         
        // Print a Log In message to the screen
        System.out.println(" The Result is " + result);
         
        // Close the Browser.
        driver.close();
    }
}
```
 Kết quả nhận được sẽ là: The Result is ngthao2911@gmail.com
 
##  II. Tương tác với Radio button
Chúng ta có thể chọn một tùy chọn radio button bằng cách sử dụng phương thức 'click' và bỏ chọn bằng phương thức 'click'.
Ví dụ này vẫn sử dụng trang web https://www.facebook.com/ 

![](https://images.viblo.asia/20c1bf8b-1c96-41a3-806e-6c892fb79672.PNG)


```
package thao.automation;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
 
public class RadioButton {
    public static void main(String[] args) throws InterruptedException {
 
        System.setProperty("webdriver.chrome.driver", 
                "D:\\SeleniumWebdriver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
 
        // Open website
        driver.navigate().to("https://www.facebook.com/");
         
        // Maximize the browser
        driver.manage().window().maximize();
 
        // Click on Radio Button
        driver.findElement(By.id("u_0_6")).click();
        System.out.println("Is Selected: "
                + driver.findElement(By.id("u_0_6")).isSelected());
        System.out.println("Is Enabled: "
                + driver.findElement(By.id("u_0_6")).isEnabled());
        System.out.println("Is Displayed: "
                + driver.findElement(By.id("u_0_6")).isDisplayed());
         
        // Click on other Radio Button
        driver.findElement(By.id("u_0_6")).click();
        System.out.println("Is Selected "
                + driver.findElement(By.id("u_0_7")).isSelected());
 
        // Close the Browser.
        driver.close();
    }
}
```
Kết quả sẽ là: 
Is Selected: true
Is Enabled: true
Is Displayed: true
Is Selected false

## III. Tương tác với Dropdown
Chúng ta có thể chọn một tùy chọn bằng cách sử dụng phương thức 'selectByVisibleText' hoặc 'selectByIndex' hoặc 'selectByValue'
Ví dụ này vẫn sử dụng trang web https://www.facebook.com/

![](https://images.viblo.asia/b19ef1de-f423-4205-ae81-7186bd5d9231.PNG)


```
package thao.automation;
 
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
 
public class DropDownList {
    public static void main(String[] args) {
 
        System.setProperty("webdriver.chrome.driver", 
                "D:\\SeleniumWebdriver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
 
        // Open website
        driver.get("https://www.facebook.com/");
         
        // Maximize the browser
        driver.manage().window().maximize();
 
        //Selecting an item from Drop Down list Box
        Select dropdown = new Select(driver.findElement(By.id("day")));
        dropdown.selectByVisibleText("29");
         
        /* ban cung co the su dung cac phuong thuc sau:
         * dropdown.selectByIndex(1)
         * dropdown.selectByValue("29");
         */
         
        System.out.println("Is Selected: "
                + driver.findElement(By.id("day")).isSelected());
        System.out.println("Is Enabled: "
                + driver.findElement(By.id("day")).isEnabled());
        System.out.println("Is Displayed: "
                + driver.findElement(By.id("day")).isDisplayed());
 
        // Close the Browser.
        driver.close();
    }
}
```
Kết quả sẽ là: 
Is Selected: false
Is Enabled: true
Is Displayed: true

Vậy là chúng ta đã tìm hiểu cơ bản về cách tương tác với các đối tượng: Textbox, Radio Button, Dropdown
Ở bài viết tiếp theo chúng ta sẽ cùng tìm hiểu về : Tương tác với CheckBox, Kéo và thả trong Selenium, Thao tác với bàn phím