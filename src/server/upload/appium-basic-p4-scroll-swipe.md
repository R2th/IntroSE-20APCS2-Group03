Tiếp tục chuỗi bài giới thiệu Appium, ở phần này ta sẽ thực hiện thao tác Scroll & swipe

> Tham khảo các phần trước của series:
> 
[Appium Basic (P1) - Run First Android Automation Test](https://viblo.asia/p/appium-basic-p1-run-first-android-automation-test-oOVlYpkyZ8W)

[Appium Basic (P2) - Thao tác với Textbox, Check box, Radio button](https://viblo.asia/p/appium-basic-p2-thao-tac-voi-textbox-check-box-radio-button-gDVK2zWrKLj)

[Appium Basic (P3) - Thao tác với Drop-down list, Set date time, Switch button, Handle alert dia-log](https://viblo.asia/p/appium-basic-p3-thao-tac-voi-drop-down-list-set-date-time-switch-button-handle-alert-dia-log-Do754bB0ZM6)

# 1. Swipe
Dowload và cài đặt SwipeListView Demo App [tại đây](http://www.software-testing-tutorials-automation.com/2015/11/test-apps-to-use-in-appium-automation.html).

Thực hiện các thao tác:
1. Mở SwipeListView Demo App
2. Chọn "Don't show this message again", click OK

![](https://images.viblo.asia/2656c961-80bf-4ae0-9094-228bf932402c.png)

**Code setup BeforeTest cho SwipeListView Demo App:**
```
package Android;

import io.appium.java_client.android.AndroidDriver;

import java.net.URL;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class driverSwipe {
 AndroidDriver driver;
 Dimension size;
 @BeforeTest
 public void setUp() throws Exception {
  DesiredCapabilities capabilities = new DesiredCapabilities();
  capabilities.setCapability("deviceName", "ZX1B32FFXF");
  capabilities.setCapability("browserName", "Android");
  capabilities.setCapability("platformVersion", "4.4.2");
  capabilities.setCapability("platformName", "Android");
  capabilities.setCapability("appPackage", "com.fortysevendeg.android.swipelistview");
  capabilities.setCapability("appActivity","com.fortysevendeg.android.swipelistview.sample.activities.SwipeListViewExampleActivity");
  driver = new AndroidDriver(new URL("http://127.0.0.1:4723/wd/hub"),capabilities);
  driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
  WebDriverWait wait = new WebDriverWait(driver, 300);
  wait.until(ExpectedConditions.elementToBeClickable(By.className("android.widget.RelativeLayout")));
 }
```

### Swipe ngang
Thực hiện swipe từ trái qua phải hoặc ngược lại

![](https://images.viblo.asia/10fd13ce-be71-496a-bcd8-9372e8dfc067.png)

Swipe từ phải qua trái (và ngược lại), từ tọa độ *startX* đến *endX*, với tọa độ *y* không đổi

```
public void swipingHorizontal() throws InterruptedException {
  //Get the size of screen.
  size = driver.manage().window().getSize();
  System.out.println(size);
  
  //Find swipe start and end point from screen's with and height.
  //Find startx point which is at right side of screen.
  int startx = (int) (size.width * 0.70);
  //Find endx point which is at left side of screen.
  int endx = (int) (size.width * 0.30);
  //Find vertical point where you wants to swipe. It is in middle of screen height.
  int y = size.height / 2;
  System.out.println("startx = " + startx + " ,endx = " + endx + " , y = " + y);

  //Swipe from Right to Left.
  driver.swipe(startx, starty, endx, y, 3000);
  Thread.sleep(2000);

  //Swipe from Left to Right.
  driver.swipe(endx, y, startx, y, 3000);
  Thread.sleep(2000);
 }
```

### Swipe dọc

Thực hiện swipe từ trên xuống dưới hoặc ngược lại

![](https://images.viblo.asia/0256c342-4aba-439e-92ed-60282fc84834.png)

Swipe từ phải qua trái (và ngược lại), từ tọa độ *startY* đến *endY*, với tọa độ *x* không đổi

```
public void swipingVertical() throws InterruptedException {
  //Get the size of screen.
  size = driver.manage().window().getSize();
  System.out.println(size);
   
  //Find swipe start and end point from screen's with and height.
  //Find starty point which is at bottom side of screen.
  int starty = (int) (size.height * 0.80);
  //Find endy point which is at top side of screen.
  int endy = (int) (size.height * 0.20);
  //Find horizontal point where you wants to swipe. It is in middle of screen width.
  int x = size.width / 2;
  System.out.println("starty = " + starty + " ,endy = " + endy + " , x = " + x);

  //Swipe from Bottom to Top.
  driver.swipe(x, starty, x, endy, 3000);
  Thread.sleep(2000);
  //Swipe from Top to Bottom.
  driver.swipe(x, endy, x, starty, 3000);
  Thread.sleep(2000);
 }
```




# 2. Scroll
App để test vẫn là API Demos, bạn có thể lấy link download và code setup BeforeTest ở [Phần 2](https://viblo.asia/p/appium-basic-p2-thao-tac-voi-textbox-check-box-radio-button-gDVK2zWrKLj)
### Scroll dọc
Thao tác cần thực hiện:
1. Mở API Demos app
2. Chọn Views
3. Tại màn hình này, scroll đến khi tìm được item có text là "Tabs"
4. Nhấn vào item  "Tabs" ở bước 3.

![](https://images.viblo.asia/6400bc2f-bce7-4f67-bb0e-6c192052b99f.png)

Ta dùng phương thức **scrollTo(String text)** để cuộn cho đến khi tìm được item có text tương ứng.

```
@Test
 public void ScrollToText() throws InterruptedException {
  //Scroll till element which contains "Views" text If It Is not visible on screen.
  driver.scrollTo("Views");
  // Click on Views/.
  driver.findElement(By.name("Views")).click();
  System.out.println("Scrolling has been started to find text -> Tabs.");
  // Scroll till element which contains Tabs text.
  driver.scrollTo("Tabs");
  System.out.println("Tabs text has been found and now clicking on It.");
  // Click on Tabs.
  driver.findElement(By.name("Tabs")).click();
 }
```
### Scroll ngang

Thao tác cần thực hiện:
1. Mở API Demos app
2. Chọn Views-> Tabs -> 5. Scrollable
3. Tại màn hình này, scroll ngang để tìm "Tab 11" 
4. Nhấn vào item  "Tab 11" ở bước 3.

![](https://images.viblo.asia/966cc691-7f0a-4b01-bd8f-deb6f3878a1b.png)

Ta dùng phương thức Swipe từ phải qua trái, từ tọa độ *startX* đến *endX*, với tọa độ *YCoordinates* không đổi

**Get tọa độ giữa lưới tab (*YCoordinates*):**

1. Capture screenshot màn hình **5. Scrollable** bằng app Uiautomatorviewer
2. Di chuyển chuột vào giữa lưới tab
3. Lây tọa độ Y theo ảnh dưới đây (*YCoordinates* = 150)

![](https://images.viblo.asia/5c94da3e-550c-4bd7-984f-989032ced870.png)

**Get tọa độ *startX* và *endX*:**

  ```
  size = driver.manage().window().getSize();  
  
  //Find swipe start and end point from screen's with and height.
  //Find startx point which is at right side of screen.
  int startx = (int) (size.width * 0.70);
  //Find endx point which is at left side of screen.
  int endx = (int) (size.width * 0.30);
```
Tọa độ X ở trên tương ứng với case scroll từ phải qua trái, nếu muốn scroll ngược lại, ta đổi *startX* vs *endX* cho nhau.

**Thực hiện scroll ngang với tọa độ X, Y đã get. Hàm ScrollTabs():**

```
  //Swipe tabs from Right to Left.
  driver.swipe(startx, YCoordinates, endx, YCoordinates, 3000);  
 }
```

**Lặp lại thao tác scroll ngang, cho đến khi tìm được "Tab 11":**

```
  //Used for loop to scroll tabs until Tab 11 displayed.
  for(int i=0; i<=10; i++){
   //Set implicit wait to 2 seconds for fast horizontal scrolling.
   driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);   
   if(driver.findElements(By.name("Tab 11")).size()!= 0){
    //If Tab 11 Is displayed then click on It.
    System.out.println("Tab 11 has been found and now clicking on It.");
    driver.findElement(By.name("Tab 11")).click();
    break;
   }else{
    //If Tab 11 Is not displayed then scroll tabs from right to left direction by calling ScrollTabs() method.
    ScrollTabs();
   }
```

---Hết phần 4---
> Tài liệu tham khảo:
http://www.software-testing-tutorials-automation.com/2015/10/appium-tutorials-part-2.html