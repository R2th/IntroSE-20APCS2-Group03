Để kết thúc chuỗi bài giới thiệu Appium, ở phần cuối mình sẽ giới thiệu các thao tác Drag&Drop, Set Star Rating Bar, LongPress Using TouchAction
> Tham khảo các phần trước của series:
> 
[Appium Basic (P1) - Run First Android Automation Test](https://viblo.asia/p/appium-basic-p1-run-first-android-automation-test-oOVlYpkyZ8W)

[Appium Basic (P2) - Thao tác với Textbox, Check box, Radio button](https://viblo.asia/p/appium-basic-p2-thao-tac-voi-textbox-check-box-radio-button-gDVK2zWrKLj)

[Appium Basic (P3) - Thao tác với Drop-down list, Set date time, Switch button, Handle alert dia-log](https://viblo.asia/p/appium-basic-p3-thao-tac-voi-drop-down-list-set-date-time-switch-button-handle-alert-dia-log-Do754bB0ZM6)

[Appium Basic (P4) - Scroll & swipe](https://viblo.asia/p/appium-basic-p4-scroll-swipe-07LKXm2JZV4)

# 1. Set Star Rating Bar
Star Rating Bar được dùng để đánh giá các sản phẩm, dịch vụ trong các ứng dụng di động. Bạn thường gặp các thanh đánh giá 3 sao hoặc 5 sao.

App để test vẫn là API Demos, bạn có thể lấy link download và code setup BeforeTest ở [Phần 2](https://viblo.asia/p/appium-basic-p2-thao-tac-voi-textbox-check-box-radio-button-gDVK2zWrKLj)

Thao tác:

* Set 1 sao trên thanh xếp hạng 3 sao 
* Set 4 sao trên thanh xếp hạng 5 sao

Mở Star Rating Bar từ API Demos app: Home -> Views -> Rating Bar.
![](https://images.viblo.asia/5ef327e6-a8e5-47e9-8921-9383b27096aa.png)

Về mặt tư tưởng, ta sẽ get độ dài của Star Rating Bar, sau đó tùy vào số sao muốn set mà tap vào điểm tương ứng.

VD: Star Rating Bar 3 sao có độ dài X. Muốn set 1 sao thì ta chọn tap vào điểm X*0.3

**Set 1 sao trên thanh xếp hạng 3 sao**

```
//Set 3 StarRatingbar = 1 star.
 @Test
 public void set3StarRatingbar(){  
  //Locate threeStarRatingbar.
  WebElement threeStarRatingbar = driver.findElement(By.id("io.appium.android.apis:id/ratingbar1"));
  //Get start point of threeStarRatingbar.
  int startX = threeStarRatingbar.getLocation().getX();
  System.out.println(startX);
  //Get end point of threeStarRatingbar.
  int endX = threeStarRatingbar.getSize().getWidth();
  System.out.println(endX);
  //Get vertical location of threeStarRatingbar.
  int yAxis = threeStarRatingbar.getLocation().getY();
  
  //Set threeStarRatingbar tap position to set Rating = 1 star.
  //You can use endX * 0.3 for 1 star, endX * 0.6 for 2 star, endX * 1 for 3 star.
  int tapAt = (int) (endX * 0.3);    
  //Set threeStarRatingbar to Rating = 1.0 using TouchAction class.
  TouchAction act=new TouchAction(driver);  
  act.press(tapAt,yAxis).release().perform();
 }

```
**Set 4 sao trên thanh xếp hạng 5 sao**
```
//Set 5 StarRatingbar = 4 star.
 @Test
 public void set5StarRatingbar(){  
  //Locate fiveStarRatingbar.
  WebElement fiveStarRatingbar = driver.findElement(By.id("io.appium.android.apis:id/ratingbar2"));
  //Get start point of fiveStarRatingbar.
  int startX = fiveStarRatingbar.getLocation().getX();
  System.out.println(startX);
  //Get end point of fiveStarRatingbar.
  int endX = fiveStarRatingbar.getSize().getWidth();
  System.out.println(endX);
  //Get vertical location of fiveStarRatingbar.
  int yAxis = fiveStarRatingbar.getLocation().getY();
  
  //Set fiveStarRatingbar tap position to set Rating = 4 star.
  //You can use endX * 0.2 for 1 star, endX * 0.4 for 2 star, endX * 0.6 for 3 star, endX * 0.8 for 4 star, endX * 1 for 5 star.
  int tapAt = (int) (endX * 0.8);  
  //Set fiveStarRatingbar to Rating = 4 star using TouchAction class.
  TouchAction act=new TouchAction(driver);  
  act.press(tapAt,yAxis).release().perform();
 }
```

# 2. LongPress Using TouchAction
Trong quá tình test, đôi khi bạn cần nhấn và giữ một item trong vài giây để có được kết quả gì đó (VD như hiển thị pop-up). Trường hợp này ta có thể sử dụng phương thức longPress của class TouchAction trong Appium.

Sử dụng Dialler app mặc định trên thiết bị Android để thực hiện thao tác nhấn giữ phím "0" để hiển thị kí tự "+".

![](https://images.viblo.asia/80ffdb50-9678-473e-afdc-9abfc3384066.png)

**Code setup BeforeTest**
```
package Android;

import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;

import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class DialPad {
 AndroidDriver driver;

 @BeforeTest
 public void setUp() throws Exception {
  DesiredCapabilities capabilities = new DesiredCapabilities();
  capabilities.setCapability("deviceName", "ZX1B32FFXF");
  capabilities.setCapability("browserName", "Android");
  capabilities.setCapability("platformVersion", "4.4.2");
  capabilities.setCapability("platformName", "Android");
  capabilities.setCapability("appPackage", "com.android.dialer");
  capabilities.setCapability("appActivity","com.android.dialer.DialtactsActivity");
  driver = new AndroidDriver(new URL("http://127.0.0.1:4723/wd/hub"),capabilities);
  driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
 }
```

**Long press phím "0"**
```
@Test
 public void dial() {
  //Click on dial pad button to open dialer pad.
  driver.findElementById("com.android.dialer:id/dialpad_button").click();
  //Create object of TouchAction class.
  TouchAction Action = new TouchAction(driver);
  //Create action chain using TouchAction class reference to perform long press action on button 0 of dialer pad.
  Action.longPress(driver.findElement(By.name("0"))).perform();
  //Get the result from dial text box.
  String result = driver.findElementById("com.android.dialer:id/digits").getText();
  //Compare actual and expected result using testng assertion.
  Assert.assertEquals(result, "+", "Actual value is : "+ result+ " did not match with expected value: +");  
 }
```
# 3. Drag And Drop
Thao tác kéo thả item từ nơi này sang nơi khác là một trong những thao tác phổ biến trên ứng dụng android. Giống như hành động Long press ở trên, ta vẫn dùng class TouchAction để thực hiện kéo thả.

Dowload và cài đặt Drag-Sort Demos app [tại đây](http://www.software-testing-tutorials-automation.com/2015/11/test-apps-to-use-in-appium-automation.html).

Thao tác thực hiện:
1. Mở Drag-Sort Demos app
2. Tap vào text "Basic usage playground"

![](https://images.viblo.asia/ec1311dc-96c6-43fe-a2f8-8792c5c27175.png)

3. Xác định vị trí phần tử thứ 3, kéo thả xuống vị trí thứ 6

![](https://images.viblo.asia/210bbe05-7b53-45db-b835-f9609ca9f20e.png)

Kết quả sau khi kéo thả

![](https://images.viblo.asia/571ab3c6-b63d-4f97-806e-ba731a277b5f.png)

**Code setup BeforeTest**

```
package Android;

import io.appium.java_client.MobileDriver;
import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class DragAndDropAction {
 
 //Object reference of AndroidDriver.
 AndroidDriver driver;

 @BeforeTest
 public void setUp() throws MalformedURLException {
  
  //Set Drag-Sort Demos app folder path. This statement will refer project's folder path.
  File classpathRoot = new File(System.getProperty("user.dir"));
  
  //Set folder name "Apps" where .apk file is stored.
  File appDir = new File(classpathRoot, "/Apps");
  
  //Set Drag-Sort Demos .apk file name.  
  File app = new File(appDir, "com.mobeta.android.demodslv-0.5.0-3_APKdot.com.apk");  
              
  // Created object of DesiredCapabilities class.
  DesiredCapabilities capabilities = new DesiredCapabilities();
  
  // Set android deviceName desired capability. Set your device name.
  capabilities.setCapability("deviceName", "ZX1B32FFXF");

  // Set BROWSER_NAME desired capability. It's Android in our case here.
  capabilities.setCapability("browserName", "Android");

  // Set android VERSION desired capability. Set your mobile device's OS version.
  capabilities.setCapability("platformVersion", "4.4.2");

  // Set android platformName desired capability. It's Android in our case here.
  capabilities.setCapability("platformName", "Android");
  
  //Set .apk file's path capabilities.
  capabilities.setCapability("app", app.getAbsolutePath());

  // Set app Package desired capability of Drag-Sort Demos app.
  capabilities.setCapability("appPackage", "com.mobeta.android.demodslv");

  // Set app Activity desired capability of Drag-Sort Demos app.
  capabilities.setCapability("appActivity", "com.mobeta.android.demodslv.Launcher");

  // Created object of AndroidDriver and set capabilities.
  // Set appium server address and port number in URL string.
  // It will launch Drag-Sort Demos app in emulator.
  driver = new AndroidDriver(new URL("http://127.0.0.1:4723/wd/hub"), capabilities);
  driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
 }
```

**Thực hiện kéo thả**
```
@Test
 public void dragDrop() {
  //Tap on Basic usage Playground.
  driver.findElementByName("Basic usage playground").click();

  //Locate 3rd element(Chick Corea) from list to drag.
  WebElement ele1 = (WebElement) driver.findElementsById("com.mobeta.android.demodslv:id/drag_handle").get(2);
  //Locate 6th element to drop dragged element.
  WebElement ele2 = (WebElement) driver.findElementsById("com.mobeta.android.demodslv:id/drag_handle").get(5);

  //Perform drag and drop operation using TouchAction class.
  //Created object of TouchAction class.
  TouchAction action = new TouchAction((MobileDriver) driver);
  
  System.out.println("It Is dragging element.");
  //It will hold tap on 3rd element and move to 6th position and then release tap.
  action.longPress(ele1).moveTo(ele2).release().perform();  
  System.out.println("Element has been droped at destination successfully.");
 }
```
---Hết---
> Tài liệu tham khảo: http://www.software-testing-tutorials-automation.com/2015/12/appium-step-by-step-tutorials-for.html