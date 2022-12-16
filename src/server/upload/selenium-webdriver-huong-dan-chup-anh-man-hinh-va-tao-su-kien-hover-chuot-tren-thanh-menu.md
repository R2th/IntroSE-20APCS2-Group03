# 1. Hướng dẫn chụp ảnh màn hình
Chụp ảnh màn hình của một phần mềm ứng dụng web là rất dễ dàng trong selenium webdriver. Như chúng ta đã biết, điều này là rất cần thiết với một công cụ kiểm thử phần mềm tự động để chụp lại màn hình của các test case fail hoặc bất kỳ khi nào cần thiết trong quá trình thực thi test case. 

Trong Selenium WebDriver / Selenium 2, chúng ta chụp ảnh màn hình của một trang web theo cú pháp dưới đây:
`File screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);`

Sau đó, chúng ta phải lưu trữ nó vào trong local bằng cách sử dụng cú pháp được đưa ra dưới đây. Bạn có thể thay đổi/ cung cấp đường dẫn và tên file của mình:

`FileUtils.copyFile(screenshot, new File("D:\\screenshot.jpg"));`

Bây giờ chúng ta cần phải import các file header dưới đây để nhận được sự support của chụp ảnh màn hình trong webdriver.


```
import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
```

Copy phần method **@Test **của ví dụ chụp ảnh Webdriver dưới đây và replace nó bằng phần method **@Test** của ví dụ ở TRANG NÀY. Hãy nhớ import những file header ở bên trên vào eclipse test (Chú ý: method **@Test** đc đánh dấu hồng ở linked page)

```
@Test
 public void test () throws InterruptedException, IOException 
 { 
  //Capture entire page screenshot and then store it to destination drive
  File screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
  FileUtils.copyFile(screenshot, new File("D:\\screenshot.jpg"));
  System.out.print("Screenshot is captured and stored in your D: Drive");
 }
```


Bạn có thể đặt cú pháp trên dưới block catch để bắt lỗi khi chụp ảnh màn hình. 

# 2. Tạo sự kiện hover chuột trên Main Menu và click chuột trên Sub Menu
Selenium WebDriver là công cụ kiểm thử phần mêm hoàn toàn miễn phí và chúng tôi sử dụng nó cho mục đích kiểm thử hồi quy cho ứng dụng phần mềm web. Hoạt động hover chuột trên Main Menu hoặc bất kỳ yếu tố nào khác của trang web hoặc mô phỏng chuyển động của chuột trong webdriver không phải là nhiệm vụ rất khó khăn. Như bạn đã biết, chúng ta có thể thực hiện hầu hết các hoạt động và hoạt động trực tiếp trong công vụ kiểm thử phần mềm webdriver. Nhưng cũng có một số hành động mà chúng ta không thể thực hiện trực tiếp trong webdrive và để thực hiện chúng, chúng ta cần phải sử dụng một số cách khó khăn. Tạo sự kiện hover chuột là một trong số đó.

Để tạo một sự kiện hover chuột trong công cụ kiểm thử phần mềm webdriver, chúng ta có thể sử dụng phương thức "**moveToElement"** của người sử dụng tương tác liên tiếp để tạo ra phương thức API **"Actions"**. Có rất nhiều cấu trúc để hover chuột trên Main menu như dưới đây. Bạn có thể replace xpath một phần tử của bạn theo cú pháp cho trước.

```
Actions actions = new Actions(driver);
WebElement moveonmenu = driver.findElement(By.xpath("//div[@id='menu1']/div"));
actions.moveToElement(moveonmenu);
actions.perform();
```


Ví dụ trên sẽ chỉ di chuyển chuột vào phần tử được nhắm đến của phần mềm ứng dụng web. Nó sẽ không thực hiện hoạt động click. Để thực hiện hoạt động click trên sub menu, chúng ta cần sử dụng hoạt động **click()** trước khi thực hiện **perform()** như thể hiện trong ví dụ trên.

```
package junitreportpackage;



import java.io.IOException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class Mytesting {
 WebDriver driver = null;
 
 @Before
 public void beforetest() {
  System.setProperty("webdriver.gecko.driver", "D:\\Selenium Files\\geckodriver.exe");
  driver = new FirefoxDriver();
  driver.manage().window().maximize();
  driver.get("http://only-testing-blog.blogspot.in/p/mouse-hover.html");
 }
 
 @After
 public void aftertest() {
  driver.quit();
  
 }
 
 @Test
 public void test () throws InterruptedException, IOException 
 { 

  //Generate mouse hover event on main menu to click on sub menu
  Actions actions = new Actions(driver);
  WebElement moveonmenu = driver.findElement(By.xpath("//div[@id='menu1']/div"));
  actions.moveToElement(moveonmenu).moveToElement(driver.findElement(By.xpath("//div[@id='menu1choices']/a"))).click().perform();
  
  WebDriverWait wait = new WebDriverWait(driver, 15);
  wait.until(ExpectedConditions.titleContains("Google"));
 }
   
}
```

Nguồn tham khảo:
- http://www.software-testing-tutorials-automation.com/2014/02/selenium-webdriver-tutorial-to-capture.html

- http://www.software-testing-tutorials-automation.com/2014/02/selenium-webdriver-generating-mouse.html