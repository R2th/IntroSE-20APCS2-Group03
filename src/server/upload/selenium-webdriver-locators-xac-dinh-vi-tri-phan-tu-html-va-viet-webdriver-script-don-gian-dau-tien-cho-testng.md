# Selenium WebDriver Locators - xác định vị trí phần tử HTML
Khi muốn định vị các phần tử trong Selenium WebDriver, chúng ta phải thực hiện với sự trợ giúp của các phương thức findElement() và findElements() được cung cấp bởi lớp WebDriver và WebElement.

- findElement(): trả về một đối tượng WebElement dựa trên một tiêu chí tìm kiếm cụ thể hoặc ném một ngoại lệ nếu nó không tìm thấy bất kỳ phần tử nào phù hợp với tiêu chí tìm kiếm.

- findElements(): trả về một danh sách các WebElements khớp với các tiêu chí tìm kiếm. Nếu không tìm thấy phần tử nào, nó sẽ trả về một danh sách trống.

Bảng sau liệt kê tất cả cú pháp Java để định vị các phần tử trong Selenium WebDriver



| Phương thức | Cú pháp | Mô tả |
| -------- | -------- | -------- |
| Theo ID     | driver.findElement(By.id (<element ID>))	    | Định vị một phần tử bằng thuộc tính ID     |
| Theo Name     | 	driver.findElement(By.name (<element name>))	    | Định vị một phần tử bằng cách sử dụng thuộc tính Name     |
| Theo class name	     | driver.findElement(By.className (<element class>))	    | Định vị một phần tử bằng thuộc tính Class     |
| Bằng văn bản liên kết	     | driver.findElement(By.linkText (<linktext>))	    | Tìm liên kết bằng văn bản liên kết     |
| Bằng văn bản liên kết một phần	     | driver.findElement(By.partialLinkText (<linktext>)))	    | Định vị liên kết bằng văn bản một phần của liên kết     |
| Theo CSS	     | driver.findElement(By.cssSelector (<css selector>))	    | Định vị một phần tử bằng cách sử dụng bộ chọn CSS     |
| Theo XPath	     | driver.findElement(By.xpath (<xpath>))	    | Định vị một phần tử bằng cách sử dụng truy vấn XPath     |
    

Bây giờ chúng ta hãy hiểu cách sử dụng thực tế của mỗi phương pháp định vị, áp dụng trên trang https://facebook.com và https://www.freeformatter.com/.
    
## 1. Theo ID 
Ở đây một đối tượng được truy cập với sự trợ giúp của các ID. Trong trường hợp này, nó là ID của hộp văn bản. Giá trị được nhập vào hộp văn bản bằng cách sử dụng phương thức sendkeys với sự trợ giúp của ID.
    
    driver.findElement(By.id("email")).sendKeys("thaodp@gmail.com");

   ![](https://images.viblo.asia/3216a4ae-5749-4ca1-b598-d9a9f90a4583.png)

    
## 2. Theo Name
Ở đây một đối tượng được truy cập với sự trợ giúp của các ID. Trong trường hợp này, nó là name của hộp văn bản. Giá trị được nhập vào hộp văn bản bằng cách sử dụng phương thức sendkeys với sự trợ giúp của name.
    
    driver.findElement(By.name("email")).sendKeys("thaodp@gmail.com");
    
![](https://images.viblo.asia/5030bab1-17d1-4982-8c75-a5aa7fbbfb7e.png)

    
## 3. Theo class name
Ở đây một đối tượng được truy cập với sự giúp đỡ của Class Names. Trong trường hợp này, nó là tên lớp của WebElement. Giá trị có thể được truy cập với sự trợ giúp của phương thức gettext.
    
    List<WebElement> byclass = driver.findElements(By.className("inputtext")));
    
![](https://images.viblo.asia/23260e40-91f5-4b12-96b4-58e36044486a.png)

    
## 4. Theo tag name
Tên thẻ DOM của phần tử có thể được sử dụng để định vị phần tử cụ thể đó trong WebDriver. Nó rất dễ dàng để xử lý các bảng với sự trợ giúp của phương thức này. Hãy xem mã sau đây.
    
```
WebElement table = driver.findElement(By.id("content"));
List<WebElement> row = table.findElements(By.tagName("tr"));
int rowcount = row.size();
```
    
## 5. Bằng văn bản liên kết
Phương pháp này giúp xác định phần tử liên kết với văn bản hiển thị phù hợp.

    driver.findElement(By.linkText("JSON Formatter")).click();

![](https://images.viblo.asia/508ecc02-7e37-4bbd-86da-6329db4c9021.png)

    
## 6. Bằng văn bản liên kết một phần
Phương pháp này giúp định vị phần tử liên kết với văn bản có thể nhìn thấy một phần phù hợp.

    List<WebElement> listLinks = driver.findElements(By.partialLinkText("XPath"));
    
![](https://images.viblo.asia/7212a4e5-ae4a-4c81-9cda-9d86514554c6.png)


## 7. Theo CSS
CSS được sử dụng như một phương thức để xác định webobject, tuy nhiên KHÔNG phải tất cả các trình duyệt đều hỗ trợ nhận dạng CSS.
    
    WebElement loginButton = driver.findElement(By.cssSelector("input.login"));
    
## 8. XPath
XPath là viết tắt của ngôn ngữ đường dẫn XML. Nó là một ngôn ngữ truy vấn để chọn các node từ một tài liệu XML. XPath dựa trên biểu diễn cây của các tài liệu XML và cung cấp khả năng điều hướng xung quanh cây bằng cách chọn các node bằng cách sử dụng nhiều tiêu chí khác nhau. Đây là một sự lựa chọn phổ biến vì tính linh động của nó.

Bạn có thể sử dụng ChroPath plugin trên trình duyệt Firefox hoặc Chrome để xác định chuỗi XPath cho các phần tử HTML.

```
driver.findElement(By.xpath("//a[@href='/json-formatter.html']" + "[contains(text(),'JSON Formatter')]")).click();
```

![](https://images.viblo.asia/9dbbd851-01b1-4d72-b2ec-5f4a8a2ae000.png)

    
# Viết Webdriver script đơn giản đầu tiên cho testNG
    
Khi học Selenium Webdriver sẽ chẳng mấy xa lạ với các kiểu viết test này. Mình cũng bắt đầu hướng dẫn viết script đơn giản, nhưng thay vì hướng dẫn đi vào xử lý từng cái Element trên trang web như Alert, selectbox, iframe… thì mình sẽ hướng dẫn trực tiếp vào các testcase vào giải thích từng phần của code.


Đây là code mà chúng ta có:

```
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.Test;

public class LoginTest {

	@Test
	public void loginByAdmin() {
		WebDriver driver = new FirefoxDriver();
		driver.get("http://localhost/wp/wp-login.php");
		driver.findElement(By.id("user_login")).sendKeys("thaodp");
		driver.findElement(By.id("user_pass")).sendKeys("123456789");
		driver.findElement(By.id("wp-submit")).click();
	}
}
```

## Phần 1: đây là những thư viện cần thiết
    
```
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.Test;
```

Khi viết code nếu IDE báo lỗi code thì có thể là do bạn add thiếu thư viện. 
    
Có thể bấm Ctrl + Shift + O để eclipse tự động add thêm thư viện còn thiếu. Hoặc đưa chuột vào chỗ báo lỗi ấn nút F2 để hiện thị lên các suggest fix lỗi đó, nếu thiếu thư viện thì nó sẽ gợi ý add thêm thư viện thiếu.

## Phần 2: Annotation thông báo cho TestNG đây là method test
    
`@Test`

Nếu không có cái annotation này thì TestNG sẽ không run test

## Phần 3: khởi tạo 1 object
    
`WebDriver driver = new FirefoxDriver();`

Vì WebDriver là 1 interface nên khi khởi tạo ta phải tạo new Object của 1 class đã implement cái Interface WebDriver, trong trường hợp này là FirefoxDriver. 

driver ở trên chỉ là đặt tên, chúng ta có thể đặt tên khác cũng được. ví dụ:

`WebDriver instance = new FirefoxDriver();`


## Phần 4: Mở URL của trang login
    
`driver.get("http://localhost/wp/wp-login.php");`

Object driver trên sử dụng được rất nhiều các method khác nhau để điều khiển browser

## Phần 5: Điền thông tin và click vào button submit
    
```
driver.findElement(By.id("user_login")).sendKeys("thaodp");
driver.findElement(By.id("user_pass")).sendKeys("123456789");
driver.findElement(By.id("wp-submit")).click();
```

Trong đó, sendKeys() và click() là method của interface WebElement.

Chạy thử

Sau khi run bạn sẽ nhận được kết quả màu xanh từ result của TestNG.
    
Tham khảo:
    
https://viettuts.vn/
    
https://giangtester.com