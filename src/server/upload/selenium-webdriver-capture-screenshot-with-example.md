Xin chào các bạn ;)

Lại là mình đây, và đây là bài viết thứ 3 trong loạt bài hướng dẫn các bạn thực hành basic với Selenium Webdriver.
Sau hai bài trước các bạn thấy sao ạ, còn mình thì thấy Selenium Webdriver đúng thật là 1 tool hỗ trợ đắc lực cho cộng đồng QA đó :V
Với bài viết này mình sẽ hướng dẫn các bạn thực hành chụp ảnh màn hình của trang web và tự động lưu vào bất cứ chỗ nào trong máy tính của các bạn. Mình nghĩ việc mà tester muốn dev thừa nhận bug của mình đó chính là phải có "bằng chứng" rõ ràng. Bằng chứng thì có thể qua video, image,...Trước tiên, mình sẽ hướng dẫn các bạn thao tác với image nhé :heart_eyes: Rất đơn giản thôi, không khó đâu :hehe.
Nếu như các bạn từng dùng Selenium IDE chắc hẳn biết đến lệnh "captureEntirePageScreenshot" dùng để chụp ảnh màn hình. Vậy trong Selenium Webdriver thì nó dùng lệnh nào nhỉ?

Vẫn là thực hiện qua từng step một, nhưng mình sẽ chú thích ngay vào code nhé:

```
//Chỉ là package:v

package demoo;

// Cái đống thư viện này không thể thiếu được đâu nhé.
// Các bạn thấy thiếu thư viện gì thì search gg rồi download về mà add vào nhá hihi
// Code thì ít mà thư viện thì nhiều quá trời :sad

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

// Chuyên mục chính bắt đầu

public class Capture {
    public static void main(String[] args) {
    
        // Đoạn này thì bài 1 và 2 các bạn đã quá quen thuộc rồi,
        chỉ là gọi đến chromedriver trong máy để chạy.
        
		System.setProperty("webdriver.chrome.driver", "D:\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
        
        /*Hàm wait này tuy quen mà lạ nha. 
        Nếu mình bỏ câu lệnh này đi lập tức chương trình không run được đâu :v 
        Bởi vì code sẽ không kịp gọi các element trên web bởi vậy mình phải input cho nó 20s 
        để chờ gọi các element thì trang web mới hiện được.
        Tất nhiên không phải trang web nào cũng cần wait nhé :hugs: */
        
		WebDriverWait wait = new WebDriverWait(driver, 20);
        
        // Đây là trang mình demo, các bạn thích thì có thể chọn trang tùy ý nhé :muscle: 
        
		driver.get("http://dangkyhoc.vnu.edu.vn/dang-nhap");
        
        // Câu lệch này sẽ phóng to trang web ra toàn màn hình máy tính. 
        //Tương tự cũng có lệch thu gọn trang web nhé, 
        chính là nó: driver.manage().window().minimize() :v: 
        
		driver.manage().window().maximize();
        
        // Bây mớ đến nội dung chính của bài hôm nay hehe. 
       // Câu lệnh dưới cho phép các bạn chụp màn hình trang web đó. 
        //Phải học thuộc nhé, thuộc lòng =))
        // Thực ra nó là hai lệnh, nhưng mình đã thu gọn lại làm một
        //Chuyển đối tượng của driver sang TakeScreenshot: TakesScreenshot scrShot =((TakesScreenshot)driver);
        //Gọi phương thức getScreenshotAs để chụp ảnh:  File SrcFile=scrShot.getScreenshotAs(OutputType.FILE);
       
		File screenshotFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        
        //Đoạn try catch này để các bạn bắt sự kiện, rất quan trọng 
        
		try {
        //Copy file đến nơi cần lưu và đặt tên cho nó ^^
			FileUtils.copyFile(screenshotFile, new File("E:\\SoftwareTestingMaterial.png"));
		} catch (IOException e) {
		}
        
        // Đóng tab hiện tại
        
		driver.close();
        
        //Cũng là đóng, nhưng khác driver.close() :v Cái này là bạn có bật bao nhiêu tab nó cũng đóng hết 
        
		driver.quit();
	}
}
```

Thế là xong phần chính của bài rồi, dưới đây sẽ có một vài lưu ý nho nhỏ cho các bạn, cũng là lỗi hay gặp khi mình thực hiện với Selenium Webdriver. Chuyện là thế này trình duyệt Chrome của mình có setup tự động cập nhật version mới( Chắc mình sẽ tắt thôi). Thế là lúc mình run code nó báo đến mấy chục dòng lỗi, hoang mang quá

![](https://images.viblo.asia/265672c0-958b-4b52-9d63-b7bc90e1f773.png)

sau đó một lúc mình mới nhớ ra là không tương thích version với selenium và geckko rồi. Vậy là lại phải tải lại bản phù hợp rồi add lại.

Version chuẩn của nó là:

* Selenium: 3.14.0
* Google Chrome: 69.0.3497.100
* ChromeDriver: 2.42
* Mozilla Firefox: 62.0.3
* GeckoDriver: 0.22.0

Đây không nhầm là đời mới nhất đó hehe

Một lỗi rất củ chuối nữa, mình có nhắc qua trong source code đó, thiếu thư viện phải search mà import ngay nhé, không là không làm ăn được gì nữa đâu. Ví dụ mình thiếu thư viện để gọi lệnh copy ảnh các bạn ạ, add xong ok liền he:

![](https://images.viblo.asia/4f9c1ff1-239e-4d10-8921-a55d4a60bbf2.png)

Tiếp theo đó là lỗi không Run được script, gặp lỗi này thì đau đầu lắm đây:

![](https://images.viblo.asia/5e503305-ca00-4e40-a0ab-16394e5458b7.png)

Nó cứ báo thế thôi, mà code thì không báo lỗi lầm gì. Thực ra code của bạn đang sai tung tóe đó, chỉ là eclipse không báo thôi ahuhu. Các bạn vô tình bị dính lỗi này thì tham khảo video này nhé: https://www.youtube.com/watch?v=XbIyip3WtNw

Cuối cùng, không phải là lỗi mà là lưu ý cho các bạn về hai câu lệnh "tưởng giống nhau mà khác không tưởng" :v `driver.close();` và `driver.quit();`. Tham khảo sự khác nhau của nó ở link sau nhé: https://www.youtube.com/watch?v=DGb8lOEk20w

Như thường lệ và không thể thiếu sẽ là video demo của mình nhé https://www.youtube.com/watch?v=E82qTbCd5Ek

Hôm nay dừng tại đấy nhé, hẹn gặp lại các bạn ở bài sau chúng ta sẽ thực hành với link và table 

Thank u <3

À tý quên, nếu có lỗi gì cứ cmt mình sẽ rep các bác nhiệt tình nếu trong tầm với :v