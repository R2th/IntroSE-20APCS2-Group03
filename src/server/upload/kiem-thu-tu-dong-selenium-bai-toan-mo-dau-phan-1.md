Chào bạn đọc, sau 1 thời gian dài bộn bề với công việc cũng như sự lười biếng của bản thân nên tôi đã không luyện tập được automation test thường xuyên. Bản thân cũng đã quên đi nhiều kiến thức cơ bản. Qua 1 chiến dịch thử thách bản thân quay trở lại, hôm nay tôi sẽ tìm hiểu lại về Automation test.
Bài viết này dành cho các bạn lần đầu tiếp xúc cũng như những bạn muốn đi theo con đường kiểm thử tự động. Mục đích chính là để bản thân trau dồi lại những kiến thức cơ bản để phục vụ cho công việc và tương lai sự nghiệp của tôi sau này. 
Bài viết của tôi có thể giống hoặc tương tự 1 số bài viết cùng chủ đề trên một số diễn đàn khác. Tuy nhiên tôi sẽ viết với ngôn ngữ gần gũi, dễ hiểu nhất, mong rằng bạn sẽ giúp phần nào đó trong quá trình tự tìm hiểu automation test của bản thân mình nhé.

## Đầu tiên là định nghĩa

**Kiểm thử tự động là gì**

Theo wikipedia thì
> Kiểm thử tự động là việc sử dụng phần mềm đặc biệt (tách biệt với phần mềm đang được kiểm thử) thực hiện các kịch bản test và so sánh kết quả thực tế với kết quả mong đợi. Kiểm thử tự động có thể tự động hóa 1 số nhiệm vụ lặp đi lặp lại nhưng cần thiết trong một quá trình kiểm thử đã được chính thức hóa, hay là các kiểm thử bổ sung nhưng sẽ khó thực hiện thủ công. Kiểm thử tự động rất quan trọng cho release và kiểm thử liên tục.
> 

**Selenium là gì**

SELENIUM là 1 framwork kiểm thử tự động mã nguồn mở miễn phí, được sử dụng để xác thực các ứng dụng web trên các trình duyệt và nền tảng khác nhau. Bạn có thể sử dụng nhiều ngôn ngữ lập trình như java, C#, Python... để tạo các kịch bản kiểm thử Selenium. Kiểm thử được thực hiện bằng công cụ Selenium thường được gọi là Selenium Testing 

Có nhiều loại kiểm thử tự động sử dụng Selenium, trong bài này tôi sẽ chỉ nói về Selenium WebDriver vì nó đơn giản và nó đủ dùng với tôi

**Chuẩn bị môi trường**

Hiện tại có rất nhiều trang hướng dẫn về cài đặt môi trường nên tôi sẽ không hướng dẫn lại nữa. Bạn có thể tham khảo trang này: https://www.guru99.com/installing-selenium-webdriver.html

### Thực hành

Khi môi trường đã xong xuôi, chúng ta cùng thử 1 số dòng code cơ bản nhé

**Bài toán 1**: Check xem title của trang web đã đúng với kết quả mong đợi chưa. Ta thử với trang youtube.com 
```
package Package1;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class MyClass {

	public static void main(String[] args) throws InterruptedException {
    // khai báo và khởi tạo đối tượng/ biến
		System.setProperty("webdriver.chrome.driver",
				"C:\\Users\\pham.thi.thu.hang\\Documents\\Chrome driver\\chromedriver_win32\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		String url = "https://www.youtube.com/";
		driver.get(url);

		String expectedTitle = "YouTube";
        // getTitle() hàm lấy title của trang web
		String actualTitle = driver.getTitle();

        // So sánh kết quả thực tế với mong đợi
		if (expectedTitle.contentEquals(actualTitle)) {
			System.out.print("Test Passed!");
		} else {
			System.out.print("Test Failed!");
		}
		driver.close();
	}

}

```

Run class trên và kết quả sẽ được như sau:
![](https://images.viblo.asia/527e9d2f-85bb-41d3-8f62-82e18439d1e5.png)


Ngoài kiểm tra title trang web, ta còn phải kiểm tra nhiều phần tử nằm bên trong trang web nữa. Vậy làm thế nào để lấy được từng phần tử trong trang web ta cùng đến với bài toán số 2.

**Bài toán 2**:  Thử tìm kiếm bài hát trên Youtube 

Có 2 vấn đề cần làm rõ

- Làm thế nào để biết được ô textbox tìm kiếm
- Làm thế nào để click vào button tìm kiếm ra kết quả

1. Để tìm kiếm 1 phần tử trong 1 trang web ta có rất nhiều cách


|  Variation | Mô tả | Ví dụ |
| -------- | -------- | -------- |
| By.className     | Tìm kiếm phần tử dựa trên giá trị của thuộc tính "class"| findElement(By.className("someClassName"))     |
| By.cssSelector | Tìm kiếm phần tử dựa trên công cụ CSS Selector bên dưới của trình điều khiển | findElement(By.cssSelector("input#email")) |
| By.id   | Tìm kiếm các phần tử dựa trên giá trị của thuộc tính "id"    | findElement(By.id("someId"))     |
| By.linkText  | Tìm kiếm các phần tử chính xác dựa trên linkText hiển thị | findElement(By.linkText("REGISTRATION"))     |
| By.name  | Tìm kiếm các phần tử dựa trên giá trị của thuộc tính "nam"| findElement(By.name("someName"))    |
| By.partialLinkText   | Định vị các thành phần có chứa partialLinkText     | findElement(By.partialLinkText("REG")) |
| By.tagName   | Định vị các thành phần dựa theo tên thẻ |  findElement(By.tagName("div"))|
| By.xpath   | Định vị các thành phần dựa theo đường dẫn Xpath  | /html[1]/body[1]/table[1]     |

2. Giải bài toán
- Để lấy phần tử là ô textbox tìm kiếm thực hiện di chuột vào phần thử cần lấy => F12 (hoặc chuột phải chọn Inspect element). Từ đây hãy lấy điểm đặc trưng của phần tử đó
Bạn có thể cài tool Chropath vào extension for Crhrome để lấy phần tử chính xác hơn (Tuy nhiên khi đã hiểu bản chất về việc lấy phần tử thì mới nên dùng tool bạn nhé)
- Ví dụ lấy phần tử chính xác thông qua tool Chropath
![](https://images.viblo.asia/8d030459-8f5b-4daf-ad67-5defaa602dc2.gif)

Để giải bài toán này mình sẽ dùng xpath để lấy phần tử
```
public class MyClass {

	public static void main(String[] args) throws InterruptedException {
		System.setProperty("webdriver.chrome.driver",
				"C:\\Users\\pham.thi.thu.hang\\Documents\\Chrome driver\\chromedriver_win32\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		String url = "https://www.youtube.com/";
		driver.get(url);

		// Tìm phần tử ô textbox
		WebElement textbox = driver.findElement(By.xpath("//input[@id='search']"));
		// Truyền giá trị cần tìm vào ô textbox
		textbox.sendKeys("How far I'll go");
		
		//Tìm và click vào button Tìm kiếm
		WebElement buttonSearch = driver.findElement(By.xpath("//button[@id='search-icon-legacy']"));
		buttonSearch.click();
		
	}

}
```
Kết quả nhận được khi Run class sẽ như sau:
![](https://images.viblo.asia/6ad02ecb-28d3-4f07-92a1-1fdf13e36801.gif)

Bài sau mình sẽ viết về bài toán thực tế hơn, khó hơn. Mong bạn đón đọc
Tài liệu tham khảo
https://www.guru99.com/selenium-tutorial.html