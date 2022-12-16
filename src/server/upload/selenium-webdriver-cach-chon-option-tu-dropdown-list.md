## 1. Introduce
Trong quá trình thực hiện test trên website thì người tester có nhiệm vụ phải check qua tất cả các phần tử như textbox, button, lable, checkbox....Có những phần tử check khá đơn giản chỉ cần quan sát hoặc thao tác chuột một cách dễ dàng. Tuy nhiên có một số phần tử thì lại check phức tạp hơn, đó chính là check việc chọn option trong dropdown list. Tại sao mình lại nói như vậy? Nếu những dropdownlist có ít option thì việc chọn không mất nhiều thời gian và không tốn công sức, nhưng nếu dropdownlist có nhiều option thì sao?

![](https://images.viblo.asia/9d99a484-03e5-48fb-b165-59cd9d8f8a81.png)

Ui thôi tên các nước thì toàn tiếng tây tiếng tàu, nhìn mãi để chọn mà chưa chắc chọn đã đúng vừa dài vừa nhiều :v 
Bạn sẽ phải căng mắt để nhìn đúng option mà mình muốn chọn, rồi với mỗi một case các bạn phải chọn lại một option để test hoặc để save một data nào đó, chưa kể khi thực hiện retest, thao tác này nghe có vẻ không hiệu quả cho lắm. Chính vì vậy, nếu bạn có thể làm một cách nào đó để hệ thống tự chọn option mà bạn muốn thì sao nhỉ :) Tuyệt phải không :slightly_smiling_face: 

Để làm điều này, mình sẽ sử dụng bộ công cụ và môi trường mà mình đã hướng dẫn các bạn cài đặt ở bài trước nhé. Nếu bạn nào chưa đọc bài đó thì có thể tham khảo ở link này: https://viblo.asia/p/selenium-webdriver-cai-dat-moi-truong-cho-selenium-webdriver-tren-eclipse-Do754jv4ZM6 (khá đầy đủ và chi tiết nhé).
Nội dung mà mình sắp trình bày sẽ hướng dẫn các bạn chọn được 1 option mong muốn qua từng bước một và kết thúc sẽ có video demo. Xem xong các bạn nhớ tự thực hành lại luôn nhé, như vậy sẽ thạo nhanh và nhớ lâu :blush: 
## 2. Guide
Trước tiên là nguyên liệu, trang web mà mình demo là: http://demo.guru99.com/test/newtours/register.php (với trang này bạn có thể thực hành xuyên suốt phần selenium basic đó hihi).

Phần quan trọng nè, mình sẽ chèn các câu lệnh kèm giải thích luôn nhé:

Step 1: Cần import 1 package "Select" bằng câu lệnh. Bước này rất quan trọng có thể làm trước hoặc làm sau, tuy nhiên nếu không làm sẽ bị lỗi:

`import org.openqa.selenium.support.ui.Select;` 

Step 2: Khai báo phần tử cho lớp Select, mình ví dụ là dropCountry (bạn thích tên là gì thì có thể đặt tên đó ^^):

`Select dropCountry = new Select(driver.findElement(By.name("country")));` 

và trỏ đến phần tử có name= country). Tại sao lại là country không phải thích thì đặt nhé, các bạn vào trang web F12 rồi tìm name của nó là được nha! Nếu vẫn thấy hoang mang ở bước này thì các bạn tham khảo video sau nhé: https://www.youtube.com/watch?v=4VBfxcng3SU (chú ý ở phút thứ 4 nha). Ngoài cách dùng By.name như phía trên của mình thì các bạn có thể dùng thêm rất nhiều WebElement commands khác nữa, ví dụ như: By.Id, By.className, By.tagName, By.cssSelector, vân vân và mây mây...^^

Step 3: Bây giờ các bạn sẽ chọn option mong muốn bằng phương thức selectByVisibleText nhé. 

`dropCountry.selectByVisibleText("BANGLADESH");` 

BANGLADESH là option mà mình chọn. Lần đầu truy cập vào trang web thì option mặc định là ALBANIA nhé. Vậy nếu chạy xong đoạn test script dưới đây mà option thay đổi là BANGLADESH thì tức là bạn đã thành công rồi đó.

Trong bước này nếu không muốn dùng phương thức selectByVisibleText có được không? Câu trả lời là có nhé, bạn có thể dùng các phương thức khác để select option như:
* SelectByValue(string arg0)_ Select theo thuộc tính value của thẻ <option>
* SelectByIndex(int arg0)_ Select theo thuộc tính index của thẻ <option>. Chú ý vị trí thứ nhất sẽ có index= 0.
Thực ra với 3 phương thức này thì mình nghĩ phương thức đầu tiên là trực quan và dễ làm nhất :rofl: 

Source code:

```
package demo1;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.By;

public class demoselenium {
	public static void main(String[] agrs) {
		System.setProperty("webdriver.chrome.driver", "D:\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		WebDriverWait wait = new WebDriverWait(driver, 20);
		driver.get("http://demo.guru99.com/test/newtours/register.php");
		driver.manage().window().maximize();
		Select dropCountry = new Select(driver.findElement(By.name("country")));
		dropCountry.selectByVisibleText("BANGLADESH");

	}

}
```

Khi chạy thì nhớ thay đổi đường dẫn đến file gecko đi nhé (lưu ở đâu thì trỏ đến đó, vì chúng ta đang chạy trên 2 máy khác nhau :v) và nếu báo lỗi thêm thư viện thì các bạn nhớ import vào nhé (chỉ việc kích vào lỗi thiếu thư viện rồi thêm thôi, cực kì đơn giản nên mình không đi cụ thể phần này nữa).
## 3. Demo
Đây là link video mình đã demo trên máy của mình, các bạn cùng quan sát thành quả nha: [https://youtu.be/5801Vr2j6XI](https://youtu.be/5801Vr2j6XI)

Vậy là từ giờ các bạn có thể để hệ thống tự chọn option theo format mà mình muốn rồi phải không, nếu thấy bài viết này của mình hay các bạn nhớ upvote cho mình nha <3.

Tham khảo: https://www.guru99.com/ :heart_eyes: 


Mỗi ngày học một ít, lâu dần sẽ thành nhiều. Bài viết này mình hướng dẫn các bạn những thao tác đơn giản khi xử lý với option trong dropdownlist như vậy, hẹn gặp lại ở bài viết sau, chúng ta sẽ làm việc với một element khác :kissing_heart: 

Có gì thắc mắc các bạn "còm men" ở dưới hoặc ở link youtube trên nhé :D

Nhớ upvote bài cho mình nếu thấy hay và bổ ích nha :v 

Cảm ơn cả nhà :smiley: