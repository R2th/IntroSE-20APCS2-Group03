Bạn muốn mở tab mới trong cùng một trình duyệt đang chạy ? thay vì mở trình duyệt mới bạn có thể sử dụng các cách dưới đây để mở 1 tab mới trong cùng 1 trình duyệt

## Cách 1. Cách này mình hay dùng

```
driver.findElement(By.cssSelector("body")).sendKeys(Keys.CONTROL +"t");  
```

Sau khi bạn đã mở một tab mới rồi bạn phải switch sang tab mới để có thể làm việc trên tab mới mở đó

```
ArrayList<String> tabs = new ArrayList<String> (driver.getWindowHandles());
driver.switchTo().window(tabs.get(0))
```

## Cách 2. Sử dụng javascripts

```
((JavascriptExecutor) driver).executeScript
                   ("window.open('http://google.com/','_blank');");
```

Muốn mở đến đường dẫn nào thì bạn chỉ cần thay đường link trên bằng 1 đường dẫn tương ứng khác là được. Nhưng mà cái này sẽ gặp vấn đề khi chạy với trình duyệt IE – IE nó sẽ hiện một dòng hỏi bạn là có muốn mở tab khác hay không, nên là sẽ không tiện nếu như mà dùng cách này với IE.

## Cách 3. Sử dụng class Action

```
WebElement link = driver.findElement(By.linkText("Installing Apache JMeter in Windows XP"));
Actions act = new Actions(driver);
act.contextClick(link).sendKeys(Keys.ARROW_DOWN).
                       sendKeys(Keys.ARROW_DOWN).
                       sendKeys(Keys.ENTER).build().perform();
```

## Cách 4: Sử dụng Robot class để mở

Như chúng ta đều đã nghe nói đến Robot class trong Selenium rồi, đơn giản dễ hiểu thì robot được sử dụng để giả lập các sự kiện liên quan đến thao tác trên bàn phím, hay các thao tác click của chuột, nên là với trường hợp này ở đây, ta có thể tưởng tượng như đang làm bằng tay và giả lập cho code của chúng ta cũng sẽ làm như vậy nhờ Robot. Đầu tiên nhấn Control + t để mở tab mới, sau khi tab mới được mở ra thì ta sẽ chuyển focus chuột vào tab mới này và mở link mới ở tab đó thôi.

```
//Launch the first URL
driver.get("http://www.google.com");
 
//Use robot class to press Ctrl+t keys 	
Robot robot = new Robot();                      	
robot.keyPress(KeyEvent.VK_CONTROL);
robot.keyPress(KeyEvent.VK_T);
robot.keyRelease(KeyEvent.VK_CONTROL);
robot.keyRelease(KeyEvent.VK_T);
 
//Switch focus to new tab
ArrayList<String> tabs = new ArrayList<String> (driver.getWindowHandles());
driver.switchTo().window(tabs.get(1));
 
//Launch URL in the new tab
driver.get("http://google.com");
```

 

Nguồn tham khảo : 
https://artoftesting.com/open-a-new-tab-in-selenium-webdriver-java

https://www.testingexcellence.com/open-new-tab-browser-using-selenium-webdriver-java/