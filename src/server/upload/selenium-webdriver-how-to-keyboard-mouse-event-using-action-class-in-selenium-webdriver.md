Xin chào các bạn.

Chắc hẳn nếu đã có thời gian tìm hiểu về Selenium thì các bạn sẽ thấy có rất nhiều vấn đề liên quan. Học tất cả một lúc thì khó và nhanh nản nhưng nếu học từ từ lần lượt thì các bạn sẽ mê nó đấy :v kaka. Vì thực ra học Selenium không khó, không cần nhiều tư duy code, thuật toán (không phải hoàn toàn không có nha) :laughing: .

Muốn thực hành tốt với Selenium các bạn chỉ cần thành thạo các câu lệnh của nó, và biết sắp xếp nó đúng tuần tự. Ví dụ như các bạn muốn login facebook thì bước đầu tiên phải là Go to URL `driver.get("http://www.facebook.com/");` sau đó mới import data, chứ không thể làm ngược lại được. Phải không nào :heart_eyes: .

Như ở trên tiêu đề mình có ghi  Keyboard & Mouse Event using Action Class, vậy các bạn cần phải học gì ở topic này? Cùng đọc và thực hành nhá.

Dưới đây là các phương thức được sử dụng phổ biến nhất trong sự kiện chuột và bàn phím.
## Phương thức

| Method |  Description | 
| -------- | -------- |
| clickAndHold()     |Nhấp chuột và không thả ở vị trí chuột hiện tại   | 
| contextClick()    | Nhấp chuột tại vị trí chuột hiện tại    |
| doubleClick()    | Nhấp đúp chuột tại vị trí chuột hiện tại     |
| dragAndDrop(source, target)     | Nhấp chuột và kéo phần tử từ source đến target     |
| dragAndDropBy(source, x-offset, y-offset)   | Một phương thức thực hiện nhấp và giữ tại vị trí của phần tử nguồn, di chuyển theo một độ lệch đã cho, sau đó nhả chuột.   |
| keyDown(modifier_key)     | Thực hiện  bấm phím bổ trợ, không thả phím bổ trợ. Các tương tác tiếp theo có thể nó được giữ    |
| keyUp(modifier _key)     | Thực hiện dùng phím bổ trợ sau khi tập trung vào một phần tử.   |
| moveByOffset(x-offset, y-offset)    | Di chuyển chuột từ vị trí hiện tại của nó (hoặc 0,0) theo độ lệch đã cho.    |
| moveToElement(toElement) | Di chuyển chuột đến giữa phần tử |
| release() | Thả nút chuột trái ở vị trí chuột hiện tại |
| sendKeys(onElement, charsequence) | Input giá trị cho phần tử. |

Tham khảo thêm các action ở link sau: https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/interactions/Actions.html


Lý thuyết đã xong giờ đến ví dụ nhé
Các bạn sẽ truy cập vào trang web http://www.facebook.com/. Thực hiện click chuột vào trường Email và nhập chuỗi String " lucky" có sử dụng phím Shift để convert sang chuỗi "LUCKY ". Sau đó, highlight chuỗi vừa nhập và nhấp chuột tại vị trí chuột hiện tại. Cuối cùng là đóng trình duyệt.

Bắt đầu nào :smiley: 
## Hướng dẫn
Nội dung code chính là 

```
package demoo;

import java.awt.Desktop.Action;
import java.io.File;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
// Thư viện này các bạn search gg tải về và add vào project này nhé. Đây là thư viện chính để chạy action của bài này.
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Keyboard {
    // Đoạn này đã được học ở những bài trước
	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "D:\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		// Go to URL
		driver.get("http://www.facebook.com/");

		// Maximize Window
		driver.manage().window().maximize();

		// Get Element Email
		WebElement userName = driver.findElement(By.id("email"));

		// Khởi tạo một đối tượng Actions mới.
		Actions ref = new Actions (driver);
        // Di chuyển chuột đến phần tử userName và clicl chuột.
		ref.moveToElement(userName).click();
        // Nhấn phím Shift và truyền vào chuỗi lucky.
		ref.keyDown(userName, Keys.SHIFT).sendKeys(userName, "lucky");
        // Highlight chuỗi vừa nhập và click chuột tại chính phần tử userName đó.
		ref.keyUp(userName, Keys.SHIFT).doubleClick(userName).contextClick();
        // Phương thức 'build ()' được sử dụng để biên dịch tất cả các danh sách các hành động thành một bước để thực hiện. Sử dụng phương thức perform () khi thực hiện đối tượng Action mà chúng ta đã thiết kế ở trên.
		ref.build().perform();
		// Closing current driver window
		driver.close();
	}
}
```

Có một chút lưu ý về sự khác nhau giữa `build().perform();` và `perform();` các bạn đọc thêm ở link sau để hiểu nhé: https://stackoverflow.com/questions/29071144/wbdriver-actions-build-perform/42530893

Đến giờ xem demo rồi =))

Link Youtube: https://www.youtube.com/watch?v=nALwrUSBvCo&feature=youtu.be

## Tổng kết
 Vậy là sau bài này các bạn đã biết thao tác với chuột và bàn phím trong Selenium rồi phải không ạ? Nhớ học thuộc cái đống "Còm men" bên trên các bạn nhá. Hê hê, nói vậy thôi nghĩ nó easy thì sẽ easy. Hẹn gặp lại ở bài sau, nhớ upvote cho mình nha các bạn.