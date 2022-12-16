Chào các bạn :)

Sau khi theo dõi bài 3 các bạn đã biết cách capture screenshot chưa ạ? Nếu chưa thì hãy đọc lại bài 3 của mình ở link sau nhé: https://viblo.asia/p/selenium-webdriver-capture-screenshot-with-example-1Je5ExdYlnL  .Tiếp theo ở bài 4 này như lần trước mình có chia sẻ là mình sẽ hướng dẫn các bạn thao tác với access link. Tuy nhiên, mình sẽ gộp access link cùng với use chrome extension trong cùng một bài viết này, đấy là hai phần khá quan trọng và hầu như là luôn luôn có khi các bạn test web nhé :heart_eyes: 
## Access link
Đối với access link in selenium webdriver thì có rất nhiều loại khác nhau như sau:

* Exact Match

    Các bạn có thể hiểu Exact match truy cập một link theo một tên chính xác sử dụng phương thức `By.linkText ()`. Lưu ý nhỏ, nếu trên web của bạn mà tồn tại những đường link có tên giống nhau thì liệu hệ thống sẽ hoạt động như thế nào? Câu trả lời chính là nó sẽ chỉ mặc định truy cập vào liên kết được xuất hiện đầu tiên. 
Ví dụ như trong đoạn code HTML dưới đây thì script của bạn sẽ gọi đến link số 1.

    ![](https://images.viblo.asia/3597584f-188c-4e81-a19e-c6619605c356.png)

    Và phương thức access link của nó sẽ được viết là: ` driver.findElement(By.linkText("click here to view")).click();` 
    
    Các bạn đã hiểu phần này chưa ạ? Khá là dễ dàng <3

* Partial Match

    Còn với partial match được hiểu là tìm kiếm theo một phần tên của link đó, tức là thế nào. Chúng ta cũng có phương thức sử dụng riêng cho nó là `By.partialLinkText ()`. Lưu ý nhỏ là phương thức này cũng mặc định truy cập vào liên kết được xuất hiện đầu tiên trong trang web đó. 
    
    Quan sát đoạn HTML dưới đây:
    
     ![](https://images.viblo.asia/4caa3553-f84b-449e-bd3a-05cdbe2b3cd5.png)

    Phương thức access link của nó là ` driver.findElement(By.partialLinkText("view")).click();` và nó sẽ gọi đến link số 1 trong hình trên.

* Case- sensitivity

    Tiếp theo, đây là một trường hợp khá đặc biệt, kiểu như là link # LINK hehe
Chúng ta cũng có thể dùng phương thức  `By.partialLinkText ()` để phân biệt chữ hoa và chữ thường. Xét ví dụ:

![](https://images.viblo.asia/968fd613-9655-427c-9754-a23da93931ca.png)

   Ta dùng ` driver.findElement(By.partialLinkText("VIEW")).click();` để truy cập link 2.

* All Links

    Cái này thì sao nhỉ? Nó dùng để cho các bạn truy cập tất cả các liên kết hiện có của trang web, rất hữu ích đó nhỉ. Để làm điều này chúng ta dùng phương thức `By.tagName (“a”) ` nha :).
    
    `List<WebElement> linkOccurence = driver.findElements(By.tagName("a"));`.
    
    Câu lệnh trên sẽ trả về tất cả các phần tử web trong danh sách có tên thẻ là “a” nhé. 

* Links Outside and Inside a Block

    Như chúng ta biết rằng với sự ra đời của các tiêu chuẩn HTML5, bây giờ chúng ta có thể khai báo thẻ <a> bên trong cũng như bên ngoài các thẻ cấp khối như <div>, <p> hoặc <h1>. Chúng ta vẫn có thể truy cập các khối bên trong và khối liên kết bên ngoài bằng cách sử dụng phương thức `By.linkText ()`và`By.partialLinkText ()`.
Ví dụ:
    
     ![](https://images.viblo.asia/8a8dc520-a2f7-4d75-818f-5f63204648d7.png)
    
     Để access link chúng ta vẫn sử dụng: `driver.findElement(By.partialLinkText("Inside")).click();` và `driver.findElement(By.partialLinkText("Outside")).click();`
    
* Accessing Image Links

    Chúng ta không thể sử dụng phương thức By.linkText () hoặc By.PartialLinkText () để truy cập một liên kết hình ảnh. Vậy sẽ phải xử lý nó như thế nào đây? Phương thức có thể giải quyết vấn đề này là By.cssSelector () or By.xpath ().
Xét ví dụ:

![](https://images.viblo.asia/10b612e1-caeb-4ad6-9fdb-35b28973a7e0.png)

Ta sẽ command 

`driver.findElement(By.cssSelector("a[href='images/shim.gif']")).click(); ` or `driver.findElement(By.cssSelector("a[href*='shim.gif']")).click();` or
`
driver.findElement(By.Xpath("//img[@ src='images/shim.gif']")).click();
`


Nếu bạn nào có hứng thú thì có thể tìm hiểu thêm ở các website như: 
* https://www.guru99.com/accessing-links-tables-selenium-webdriver.html#2
* https://www.softwaretestingclass.com/how-to-access-links-tables-using-selenium-webdriver/
## Add chrome extension 
Đối với use chrome extension thì cũng khá dễ dàng để add.
Trong khi QA thực hiện test thì tần suất sử dụng extension khá nhiều, nào là để chụp ảnh, để quay video, để đo cỡ chữ, check API,....Web chrome hỗ trợ tối đa các extension để có thể làm điều đó, vậy tại sao chúng ta lại bỏ qua :v: Để add extension vào chrome chúng ta sẽ phải làm 2 steps sau.
* Step 1

    Download extension đó về máy
    Ví dụ mình sẽ practise với Momentum
    ![](https://images.viblo.asia/b8584e0b-99d9-4189-b231-4d4248f346f7.png)
    
* Step 2

    Copy đường dẫn URL của extension đó và paste vào link sau: https://robwu.nl/crxviewer/
    ![](https://images.viblo.asia/90c7b254-ebed-4107-9053-0905ee45f010.png)
    Chờ load xong rồi bạn download file CRX đó về lưu vào ổ nào đó trong máy tính (tùy ý).
    ![](https://images.viblo.asia/48bc810f-ec6d-49a4-b4bc-ad9133479793.png)
*    Step 3

 `ChromeOptions options = new ChromeOptions();
		options.addExtensions(new File("C:/Users/User/Downloads/fhbjgbiflinjbdggehcddcbncdddomop.crx"));`
    
 Note:  ` C:/Users/User/Downloads/fhbjgbiflinjbdggehcddcbncdddomop.crx` là nới bạn lưu file sau khi tải về ở step 2 nhé.
## Source code 
```
package demoo;

import java.io.File;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Extension2 {

	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "D:\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		 WebDriverWait wait = new WebDriverWait(driver, 20);

		ChromeOptions options = new ChromeOptions();
		options.addExtensions(new File("C:/Users/User/Downloads/fhbjgbiflinjbdggehcddcbncdddomop.crx"));
		driver = new ChromeDriver(options);
		String baseUrl = "http://demo.guru99.com/test/link.html";

		driver.get(baseUrl);
		driver.findElement(By.linkText("click here")).click();
		System.out.println("title of page is: " + driver.getTitle());
		driver.quit();
	}

}
```

## Demo
Link youtube:https://www.youtube.com/watch?v=HVc6xa-pb7g&feature=youtu.be

Tiếp tục theo dõi các bài viết của mình nha =))

See you again :)