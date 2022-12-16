Tiếp tục chuỗi bài giới thiệu Appium, ở phần 3 này, chúng ta sẽ tiếp tục thao tác với một số item thường gặp Drop-down list, Set date time, Switch button, Handle alert dia-log.

> Tham khảo các phần trước của series:

[Appium Basic (P1) - Run First Android Automation Test](https://viblo.asia/p/appium-basic-p1-run-first-android-automation-test-oOVlYpkyZ8W)

[Appium Basic (P2) - Thao tác với Textbox, Check box, Radio button](https://viblo.asia/p/appium-basic-p2-thao-tac-voi-textbox-check-box-radio-button-gDVK2zWrKLj)

App để test vẫn là API Demos, bạn có thể lấy link download và code setup BeforeTest ở [Phần 2](https://viblo.asia/p/appium-basic-p2-thao-tac-voi-textbox-check-box-radio-button-gDVK2zWrKLj)

## 1. Drop-down list
Drop-down list là một trong nhưng item xuất hiện thường xuyên trên các ứng dụng web, cũng như mobile app. Ta cùng xét một số thao tác với Drop-down list.

Mở  Drop-down list từ API Demos app: **Home -> Views -> Controls -> 2. Dark Theme. -> Tap on Drop Down**.

**Chọn một option trong Drop-down list**

![](https://images.viblo.asia/9a5890ba-6c40-4800-965a-0a8af0dea79b.png)

Mở Drop-down list:
 `driver.findElement(By.id("android:id/text1")).click();`
  
 Chọn option "Mars" trong Drop-down list:
 `driver.findElement(By.name("Mars")).click(); `
 
**Lấy danh sách option của Drop-down list**

![](https://images.viblo.asia/3502b984-b971-4772-b432-9689195449c3.png)

Mở Drop-down list:
 `driver.findElement(By.id("android:id/text1")).click();`
 
Xác định vị trí các option của drop-down list, cho vào một danh sách:

 `List dropList = driver.findElements(By.id("android:id/text1"));`
 
Lần lượt lấy các option ra:

  ```
for(int i=0; i< dropList.size(); i++){
   MobileElement listItem = (MobileElement) dropList.get(i);   
   System.out.println(listItem.getText());
  } 
``` 

## 2. Set date time
Date time picker trong app Android có thể hiển thị trực tiếp trên màn hình hoặc hiển thị thông qua Dialog. Ta cùng xét ví dụ đơn giản về cách đặt Date time bằng Appium. Định dạng Date time có thể sẽ khác đi tùy vào app của bạn, nhưng về cơ bản thì phương thức set vẫn không thay đổi.

Mở  Drop-down list từ API Demos app: **Home -> Views -> Date Widgets -> 1. Dialog**.

```
@Test
 public void openDialog {
  // Scroll till element which contains "Views" text.
  driver.scrollTo("Views");
  // Click on Views.
  driver.findElement(By.name("Views")).click();
  // Scroll till element which contains "Date Widgets" text.
  driver.scrollTo("Date Widgets");
  // Click on element which contains "Date Widgets" text.
  driver.findElement(By.name("Date Widgets")).click();
  // Scroll till element which contains "1. Dialog" text.
  driver.scrollTo("1. Dialog");
  // Click on element which contains "1. Dialog" text.
  driver.findElement(By.name("1. Dialog")).click();
```  

![](https://images.viblo.asia/8b570a06-5b2a-49cc-9b6e-64c7578931f8.png)

![](https://images.viblo.asia/0243a931-160b-444d-bfc1-da2640280a3e.png)

**Set Date = 25 Aug 2009**
```
dateSet(){
 // Click on button which contains "change the date" text.
  driver.findElement(By.name("change the date")).click();
  //Set Date = 25.
  driver.findElement(By.xpath("//android.widget.NumberPicker[@index='0']")).sendKeys("25");
  //Set Month = Aug.
  driver.findElement(By.xpath("//android.widget.NumberPicker[@index='1']")).sendKeys("Aug");
  //Set Year = 2009.
  driver.findElement(By.xpath("//android.widget.NumberPicker[@index='2']")).sendKeys("2009");
  //Click on Done button.
  driver.findElement(By.id("android:id/button1")).click();
}
```

**Set time = 1:25 pm**
```
timeSet(){
 // Click on button which contains "change the time" text.
  driver.findElement(By.name("change the time")).click();
  //Set Hours = 1.
  driver.findElement(By.xpath("//android.widget.NumberPicker[@index='0']")).sendKeys("1");
  //Set Minutes = 25.
  driver.findElement(By.xpath("//android.widget.NumberPicker[@index='2']")).sendKeys("25");
  //Set pm.
  driver.findElement(By.xpath("//android.widget.NumberPicker[@index='1']")).sendKeys("pm");
  //Click on Done button.
  driver.findElement(By.id("android:id/button1")).click();
}
```

## 3. Switch button
Switch button có thể dễ dàng ON/OFF bằng thao tác click(). Tuy nhiên, ta cần kiểm tra status của Switch button là ON hay OFF để sau khi thao tác có được status mong muốn.

Mở màn hình Switches từ API Demos app: **App Home -> Views -> Switches**

```
public void openSwitches() throws InterruptedException {
  // Scroll till element which contains "Views" text If It Is not visible on screen.
  driver.scrollTo("Views");
  // Click on Views.
  driver.findElement(By.name("Views")).click();
  // Scroll till element which contains "Switches" text If It Is not visible on screen.
  driver.scrollTo("Switches");
  // Click on Switches.
  driver.findElement(By.name("Switches")).click();
  }
```

![](https://images.viblo.asia/fa836a48-b3dc-4808-8f5f-5ae07c9fad23.png)

Kiểm tra status hiện tại của Switch button:

```
  String switchStatus1 = driver.findElementById("io.appium.android.apis:id/monitored_switch").getText();
  System.out.println(switchStatus1);
```

ON Switch button:

```
  //If switchStatus1 = Monitored switch OFF, Execute inner code.
  if((switchStatus1.trim()).equals("Monitored switch OFF")){
   System.out.println("Doing Monitored switch ON");
   //Locate switch button element by name = Monitored switch OFF.
   MobileElement swt = (MobileElement) driver.findElementByName("Monitored switch OFF");
   //Tap on switch button "Monitored switch OFF" to make it ON.
   swt.tap(1, 1);
   System.out.println("Monitored switch is ON now.");
  }
```

OFF Switch button:

 ```
  //Get status of switch using it's text.
  String switchStatus2 = driver.findElementById("io.appium.android.apis:id/monitored_switch").getText();
  System.out.println(switchStatus2);
  //If switchStatus1 = Monitored switch ON, Execute inner code.
  if((switchStatus2.trim()).equals("Monitored switch ON")){
   System.out.println("Doing Monitored switch OFF");
   //Locate switch button element by name = Monitored switch ON.
   MobileElement swt = (MobileElement) driver.findElementByName("Monitored switch ON");
   //Tap on switch button "Monitored switch OFF" to make it OFF.
   swt.tap(1, 1);
   System.out.println("Monitored switch is OFF now.");
  }
```

## 4. Handle alert dia-log
Mở màn hình Alert Dialogs từ API Demos app: **Home -> App -> Alert Dialogs**
```
@Test
 public void openAlertDialogs() {
  // Scroll till element which contains "App" text.
  driver.scrollTo("App");
  // Click on App.
  driver.findElement(By.name("App")).click();
  // Scroll till element which contains "Alert Dialogs" text.
  driver.scrollTo("Alert Dialogs");
    // Click on Alert Dialogs.
  driver.findElement(By.name("Alert Dialogs")).click();
  // Click on "OK Cancel dialog with a message" button.
  driver.findElement(By.name("OK Cancel dialog with a message")).click();
  }
```

![](https://images.viblo.asia/b1c7317f-0f61-44ef-b60c-2903ade12f9d.png)

Get message từ Dialogs:
```
  String result = driver.findElementById("android:id/alertTitle").getText();
  System.out.println("Alert text Is -> " + result);
```
Click OK:
 ` driver.findElement(By.name("OK")).click();`
 
 Click Cancel: 
` driver.findElement(By.name("Cancel")).click();`

---Hết phần 3---

**Tài liệu tham khảo:**

http://www.software-testing-tutorials-automation.com/2015/10/appium-tutorials.html