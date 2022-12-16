Bài viết lần này, mình và các bạn sẽ cùng tìm hiểu tiếp các cách xác định phần tử bằng XPath và cách sử dụng chúng. Ngoài ra, bài viết này mình cũng sẽ viết chương trình login với trang web Kidsplaza sử dụng Xpath trong việc xác định đối tượng UI.

**2.9 Text()**

*Cú pháp*: `//*[@text()='value']`

Bạn có thể xác định bất kỳ thẻ nào chứa nội dung text mà bạn muốn.
![](https://images.viblo.asia/0bb5fb80-76ff-488f-8eb6-652f3f4a2019.png)
*Chương trình tương ứng*:
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//*[@text='KHÁCH HÀNG MỚI']"));
```
Kết quả trả về sẽ là thẻ h3

**2.10 Last()**

*Cú pháp*: `(//input[@type()='value'])[last()]`

Cho phép định vị thẻ input cuối cùng trên một trang HTML và phải có kiểu input là giá trị mà người dùng mong muốn.

Value ở đây có thể là: text, password, submit, radio, checkbox, button,các kiểu input mà HTML5 thêm vào( color, date, datetime, datetime-local, email, month, week, number, range, search, tel, time, url).
![](https://images.viblo.asia/8f40be50-2619-485e-ac5d-dcc4d9ec24d6.png)
*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("(//input[@type='text'])[last()]"));
```

**2.11 Position()**

*Cú pháp*: `(//input[@type='value'])[position()=number]` hoặc `(//input[@type='value'])[number]`

Cho phép định vị thẻ input thứ bao nhiêu trên một trang HTML và có kiểu input là giá trị mà người dùng mong muốn.

Value ở đây có thể là: text, password, submit, radio, checkbox, button,các kiểu input mà HTML5 thêm vào( color, date, datetime, datetime-local, email, month, week, number, range, search, tel, time, url).
![](https://images.viblo.asia/cd25ad1c-9bf5-4e05-a7d9-683f5903cb3a.png)
*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("(//input[@type='text'])[4]"));
//hoặc
// driver.findElement(By.xpath("(//input[@type='text'])[position()=4]"));
```
Kết quả trả về thẻ input "Địa chỉ email".

**2.12 Index()**

Cho phép định vị thẻ theo index của thẻ.

*Cú pháp*: `//<tag name>[number]`
![](https://images.viblo.asia/e3102abe-88e1-45fa-bf9b-a04b9431a154.png)
*Chương trình tương ứng*

```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("(//section//section//div//div//div[2]"));
```

**2.13 Following xpath axes**

*Cú pháp*: `//<tag name>[@attribute=value]/following::<tag name>`

Cho phép định vị các thẻ sau thẻ hiện tại.

Ví dụ thẻ div được tính là thẻ hiện tại, tìm thẻ input sau nó.
![](https://images.viblo.asia/6d1bba6f-7ac9-4a2d-bac3-f192517f4879.png)
*Chương trình tương ứng*

```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//div[@class='input-box']/following::input[@type='password']"));
```
**2.14 Preceding xpath axes**

*Cú pháp*: `//<tag name>[@attribute=value]//preceding::<tag name>`

Cho phép định vị các thẻ trước thẻ hiện tại.

Ví dụ thẻ input là thẻ hiện tại, tìm thẻ div trước nó
![](https://images.viblo.asia/6d1bba6f-7ac9-4a2d-bac3-f192517f4879.png)
Chương trình tương ứng

```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//input[@id='pass']//precending::div[@class='input-box']"));
```
## 3. Testscript đăng nhập
**Bước chuẩn bị:**

Chương trình của mình sẽ viết 1 test case đăng nhập thành công. Mình nhập đủ và đúng thông tin email và mật khẩu sau đó click button Đăng nhập trên trang đăng ký của Kidsplaza.

Bạn cần lấy được Xpath cho các nội dung "Email/Số điện thoại", "Mật khẩu", "Đăng nhập" và đoạn text "Trịnh Thi Phương _" cho trường hợp đăng nhập thành công

Và đây là kết quả khi mình lấy Xpath cho:

Ô nhập liệu "Email/ Số điện thoại" --> `//*[@id='email']`

Ô nhập liệu "Mật khẩu" --> `//*[@id='pass']`

Nút "Đăng nhập" --> `//*[@id='send2']`

Dòng "Trịnh Thi Phương _" --> `//*[text()='Trịnh Thi Phương _']`

### 3.1 Chương trình
```
package PackageTwo;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LocatingUIElementXPath_Login {
	private static WebDriver driver;
	
	public static void initializeWebDriver(){
		System.setProperty("webdriver.chrome.driver", "E:\\Java udemy\\AUTOMATION TESTING\\chromedriver_win32\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.get("https://www.kidsplaza.vn/customer/account/login/");
		
		driver.findElement(By.xpath("//*[@id='location_dialog_container']/div/div/div/ul/li[1]/a")).click();
	}
	
	public static void loginSuccessfully(){
		driver.findElement(By.xpath("//*[@id='email']")).sendKeys("trinhphuong1112@gmail.com");;
		driver.findElement(By.xpath("//*[@id='pass']")).sendKeys("p0969232046");;
		driver.findElement(By.xpath("//*[@id='send2']")).click();
		
		WebElement customerName = driver.findElement(By.xpath("//*[text()='Trịnh Thi Phương _']"));
		if(customerName != null){
			System.out.println("Login successfully");
		}
		else{
			System.out.println("Login failed");
		}
		
	}
	
	public static void main(String[] args) {
		initializeWebDriver();
		loginSuccessfully();
	}
}
```
### 3.2 Giải thích chương trình
```
package PackageTwo;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LocatingUIElementXPath_Login {
	private static WebDriver driver;
	
	public static void initializeWebDriver(){
		System.setProperty("webdriver.chrome.driver", "E:\\Java udemy\\AUTOMATION TESTING\\chromedriver_win32\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.get("https://www.kidsplaza.vn/customer/account/login/");
		
		//Xác định nút nội dung khu vực hiện lên khi vào trang đăng nhập và click vào nút đó
		driver.findElement(By.xpath("//*[@id='location_dialog_container']/div/div/div/ul/li[1]/a")).click();
	}
	
	public static void loginSuccessfully(){
		//Xác định ô nhập liệu "Email/ Số điện thoại" và tự động điền nội dung trinhphuong1112@gmai.com
		driver.findElement(By.xpath("//*[@id='email']")).sendKeys("trinhphuong1112@gmail.com");
		
		//Xác định ô nhập liệu "Mật khẩu" và tự động điền nội dung p0969232046
		driver.findElement(By.xpath("//*[@id='pass']")).sendKeys("p0969232046");
		
		//Xác định nút "Đăng nhập" và click vào nút đó
		driver.findElement(By.xpath("//*[@id='send2']")).click();
		
		//Xác định dòng text tên tài khoản khi đăng nhập thành công
		WebElement customerName = driver.findElement(By.xpath("//*[text()='Trịnh Thi Phương _']"));
		
		if(customerName != null){
			System.out.println("Login successfully");
			//Nếu xuất hiện bất kỳ dòng thông tin nào có nội dung "Trịnh Thi Phương _" 
			//thì đăng nhập thành công và in ra console "Login successfully"
		}
		else{
			System.out.println("Login failed");
			//Ngược lại
		}
		
	}
	
	public static void main(String[] args) {
		initializeWebDriver();
		loginSuccessfully();
	}
}

```
***Kết quả:***
https://trinhphuong1112-gmail.tinytake.com/sf/MjkyNjcyMF84NzgyMDg2

***Tài liệu tham khảo:***

https://www.softwaretestingmaterial.com/dynamic-xpath-in-selenium/

Cảm ơn các bạn đã theo dõi bài viết của mình.
[Link các bài viết trên blogger của mình.](https://learnseleniumwithkoong.blogspot.com/)