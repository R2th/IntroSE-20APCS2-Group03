Để tiếp nối phần 1 trong chuỗi bài về Kiểm thử tự động Selenium. Hôm nay chúng ta sẽ tìm hiểu 1 số hàm phức tạp hơn 1 chút. 
Để chuẩn bị cho bài viết này bạn nên đọc phần 1 tại đây: https://viblo.asia/p/kiem-thu-tu-dong-selenium-bai-toan-mo-dau-phan-1-63vKjzMxK2R
Bài hôm nay tôi sẽ demo trên một trang demo: https://selenium-training.herokuapp.com/ Hoặc bạn cũng có thể lấy 1 trang bất kỳ có chức năng login/ register để thực hành đều được nhé!
### 1. TextBox, Submit Button, sendkeys(), click()

**Bài toán**:  Hãy tự động hóa cho chức năng login trên trang web của bạn
Phân tích: Chức năng login sẽ thường có 1 ô textbox nhập username, 1 ô nhập password, và 1 button Submit
Đầu tiên là bạn phải tìm kiếm được phần tử của các items trên
Thực hiện F12 (hoặc inspect element) => lấy điểm đặc trưng của phần tử đó
![](https://images.viblo.asia/b4c2f24d-394a-4cd8-8976-01c0a33142a7.png)
![](https://images.viblo.asia/48212331-748b-4b37-97f0-ad9eabeadaaf.png)
![](https://images.viblo.asia/544678e4-3ab7-4d04-ae9f-ffb0cc51da01.png)
Đã tìm được phần tử cho từng items. Giờ code và chạy chương trình xem kết quả nào
```
package Package1;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Login {

	public static void main(String[] args) throws InterruptedException{
		System.setProperty("webdriver.chrome.driver",
				"C:\\Users\\pham.thi.thu.hang\\Documents\\Chrome driver\\chromedriver_win32\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();

		String url = "https://selenium-training.herokuapp.com/login";
		driver.get(url);

		// Lấy phần tử ô textbox username & truyền giá trị
		WebElement username = driver.findElement(By.name("session[email]"));
		username.sendKeys("phamhangmta94@gmail.com");

		// Lấy phần tử ô textbox password & truyền giá trị
		WebElement password = driver.findElement(By.name("session[password]"));
		password.sendKeys("12345678");

		// Submit button
		WebElement btnSubmit = driver.findElement(By.name("commit"));
		btnSubmit.submit();

		// Kiểm tra kết quả
		String expectResult = "Hằng | Ruby on Rails Tutorial Sample App";

		if (driver.getTitle().contentEquals(expectResult)) {
			System.out.print("Test Passed!");
		} else {
			System.out.print("Test Failed!");
		}

		driver.close();
	}
}
```

Kết quả như ảnh dưới, 
![](https://images.viblo.asia/39f3cf11-4ac4-42ad-8309-788f597b0cf6.gif)

Như trên bạn thấy tôi đã dùng hàm sendKeys() để truyền dữ liệu vào phần tử cần nhập và dùng hàm submit() để submit form Login
Vậy trong bài này ta sẽ lưu ý một số hàm thường dùng như sau:


| Element | Command | Mô tả |
| -------- | -------- | -------- |
| Input Box    | sendKeys()     | được sử dụng để truyền dữ liệu vào text boxes     |
| Input Box    | clear()     | xóa giá trị hiện tại của text boxes     |
| Links    | click()     | Nhấp vào liên kết để tải trang     |
| Submit Button    | submit()    | Submit form, submit button     |

### 2.  Select CheckBox, Radio Button và Image


Đối với items CheckBox, Radio Button và Image cũng tương tự như button. Tôi sẽ sử dụng hàm click() để chọn giá trị
- **Select CheckBox, Radio Button**

![](https://images.viblo.asia/4b49e852-3fdf-40bd-ad0c-df835b08ec47.png)

Khi code sẽ dùng hàm click() để chọn giá trị
```
WebElement radioButton = driver.findElement(By.name("session[remember_me]"));
radioButton.click();
```

- **Image**
Sử dụng hàm click() để đi đến link có trong ảnh
![](https://images.viblo.asia/be270561-b07f-4f3c-987b-433b707e4d42.png)
```
WebElement imageLink = driver.findElement(By.cssSelector("img[alt=\"Rails logo\"]"));
imageLink.click();
```

### 3. Select value from Dropdown

Để chọn giá trị trong ô Dropdown đầu tiên vẫn cần lấy phần tử của ô cần chọn
![](https://images.viblo.asia/87974edc-e760-41c7-84e7-403350de274a.png)
Để chọn được giá trị trong ô Dropdown đầu tiên ta phải import thêm thư viện
`import org.openqa.selenium.support.ui.Select;`
Sau đó khởi tạo 1 biến Select để chọn đến Dropdown đó
`Select language = new Select(driver.findElement(By.name("user[language]")));`
Cuối cùng là chọn giá trị cần chọn
`language.selectByVisibleText("English");`

Ngoài hàm selectByVisibleText ta có thể dùng 1 số hàm khác để lấy giá trị qua index, id, value... cụ thể như sau:


| Element| Command | Description |
| -------- | -------- | -------- |
| Drop-Down Box     | selectByVisibleText()/ deselectByVisibleText()     | lựa chọn/ bỏ chọn một option thông qua text hiển thị      |
|      | selectByValue()/ deselectByValue()     | lựa chọn / bỏ chọn một option theo giá trị của thuộc tính "value"     |
|      | selectByIndex()/ deselectByIndex()     | lựa chọn/ hủy bỏ một option theo thứ tự Index     |
|      | isMultiple()     | trả về giá trị TRUE nếu phần tử Dropdown cho phép nhiều option cùng một lúc; FAILSE nếu không thể chọn nhiều option 1 lúc     |
|      | deselectAll()     | Bỏ tất cả các tùy chọn đã chọn trước đó     |


Trên đây là cách truyền và chọn giá trị ở các items thường dùng. Trong quá trình thực hành bạn nên làm nhiều để thuần thục và nâng cáo skill hơn. Hy vọng bài viết này sẽ giúp ích được cho bạn đọc. Thân :) 

Tham khảo: 
https://www.guru99.com/accessing-forms-in-webdriver.html