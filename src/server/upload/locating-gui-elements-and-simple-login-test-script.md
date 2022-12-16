Trước tiên hãy nhìn vào giao diện này 1 chút nhé. 
![](https://images.viblo.asia/e3680e6e-5474-4508-b80f-c771cb6f8379.png)
1. Những phần khoanh vùng được gọi là gì? Nó là "element", thế "element" là gì? Nó liên quan gì đến việc viết testcript của bạn?
2. Giả sử bạn muốn viết được 1 test script để kiểm tra việc đăng nhập, bạn muốn tự động điền các thông tin ấy theo ý muốn thông qua testcript mà bạn viết, vậy bạn cần biết muốn đăng nhập được bạn phải điền thông tin "Email/ Số điện thoại", "Mật khẩu" và nhấn nút "Đăng Nhập". Những thông tin này, làm sao để lấy ra và viết thành 1 chương trình đăng nhập đơn giản?

Bài viết này mình sẽ cùng các bạn tìm hiểu và học từ những thứ cơ bản, hướng giải quyết cho 1 người mới bắt đầu tự học Selenium Webdriver nói riêng, Automation Testing nói chung đối với 1 chương trình đăng nhập cơ bản. Và bài viết này mình sử dụng trình duyệt Chrome.
## 1. Element
### 1.1 Element là gì?
Về cơ bản, nghĩa tiếng Việt của "element" là "thành phần", là một phần của thứ gì đó. Đối với một giao diện như hình trên, hay còn gọi là một trang HTML(Hyper Text Markup Language) thì element là tất cả những gì mà bạn nhìn thấy và nó tương ứng với các thẻ trên trang HTML đó.
Element là:
- Ô tìm kiếm xây dựng từ thẻ input 
- Dòng chữ "Danh mục" là nội dung của thẻ span
- Nút đăng ký là 1 thẻ button
- .....
### 1.2 Element Locator là gì?
Element Locator là định vị phần tử, là một phương thức để tìm một phần tử trên một trang.
Các loại định vị phần tử:
* *ID*: là một mã định danh cho một phần tử, được chỉ định bởi developer. Nó mang tính duy nhất, trên một trang HTML thì mỗi đối tượng chỉ có duy nhất một ID. Developer sẽ dùng ID cụ thể cho 1 đối tượng nào đó và CSS đối tượng đó(CSS hiểu đơn giản là làm đẹp hơn cho các đối tượng trên trang HTML)
* *Field name*: Mỗi trường input trên một form HTML thì đều có tên. Ví dụ như đối với form đăng nhập thì input field cho user name và password sẽ có tên riêng và ta có thể định vị thông qua tên.
* *Text*: là 1 định vị dùng để tìm kiếm những thành phần trên trang mà là dạng văn bản
* *XPath*: là một ngôn ngữ để duyệt qua cấu trúc của DOM (document object model) của trang web. Các trình định vị XPath rất mạnh mẽ và linh hoạt. Bất kỳ phần tử nào trên trang đều có thể được định vị thông qua một hoặc nhiều XPath.
* *CSS Selector*: tương tự như XPath, mạnh mẽ và linh hoạt nhưng không dựa trên cấu trúc của DOM.
### 1.3 Xác định Element Locator bằng cách nào?
Đầu tiên, bạn muốn biết phần tử nào trên trang HTML nằm ở đâu, nó là thẻ gì, có các thuộc tính gì, bạn cần sử dụng Inspect của trình duyệt Chrome.

Ví dụ, bạn muốn biết các thông tin về ô nhập liệu "Email/ Số điện thoại" trên trang đăng nhập của web Kidsplaza, trỏ chuột đến vùng nhập liệu đó, click chuột phải chọn Inspect
![](https://images.viblo.asia/bccd7680-916a-43ca-98ac-133d027510cd.png)
Tiếp theo bạn sẽ nhìn thấy ô nhập liệu cho trường này chính là 1 thẻ input, có id là "email"
![](https://images.viblo.asia/e29091f8-5ad8-4fd5-a2f7-7dbe84923c8c.png)
Như vậy, nếu bạn muốn định vị ô nhập liệu này trên trang HTML, bạn sẽ sử dụng định vị ID.

*Tóm lại, những kiến thức trên liên quan gì đến việc viết testscript cho chương trình đăng nhập tự động của bạn?*
Hiển nhiên, bạn muốn ô nhập liệu "Email/ Số điện thoại" được điền tự động nội dung mà bạn mong muốn thì bạn phải xác định được chính xác ô nhập liệu đó thông qua các loại định vị đã giới thiệu ở trên, sau đó sử dụng các phương thức của Selenium Webdriver để tiếp cận đối tượng đó và thực hiện hành động tự động điền nội dung mà bạn muốn. 

Giờ hãy vào chương trình luôn!
## 2. Chương trình đăng nhập đơn giản sử dụng Selenium Webdriver
Chương trình này của mình chỉ đơn giản là giúp bạn xác định được phần tử "Email/ Số điện thoại" và "Mật khẩu", điền nội dung cho 2 trường đó thông qua chương trình, sau đó nhấn nút "Đăng nhập" trên trang giao diện Đăng nhập của trang web Kidsplaza.

**Bước đầu tiên**: Định vị các phần tử
Tương tự với việc định vị ô nhập liệu "Email/ Số điện thoại" ở phần 1.3, ta xác định được ô nhập liệu "Mật khẩu" thông qua id = "password" và nút "Đăng nhập" thông qua id = "send2".

*Video minh họa*: https://trinhphuong1112-gmail.tinytake.com/sf/MjkxNDI1Ml84NzQzMDg3
### 2.1 Chương trình
```
package PackageTwo;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LocateGUIElement {
	private static WebDriver driver;
	
	public static void initializeWebDriver(){
		System.setProperty("webdriver.chrome.driver", 
				"E:\\Java udemy\\AUTOMATION TESTING\\chromedriver_win32\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.get("https://www.kidsplaza.vn/customer/account/login/");
	}
	
	public static void locateElementsByID(){
		WebElement inputEmail = driver.findElement(By.id("email"));
		inputEmail.sendKeys("phuong1112@gmail.com");
		
		WebElement inputPassword = driver.findElement(By.id("pass"));
		inputPassword.sendKeys("123456");
		
		WebElement buttonLogin = driver.findElement(By.id("send2"));
		buttonLogin.click();
		
	}
	
	public static void main(String[] args) {
		initializeWebDriver();
		locateElementsByID();
	}
}
```
### 2.2 Giải thích

**WebElement là gì?**
WebElement thể hiện một phần tử HTML vì thế WebElement có thể là text, link, radio button, checkbox, dropdown, thẻ input, button...

**Method findElement(By by) là gì?**
Là 1 phương thức trả về 1 WebElement, bạn có thể hiểu đơn giản là tìm phần tử trên trang.
"By by" ta có thể tìm phần tử thông qua các loại định vị như id, class name, name, CSS Selector, Xpath

![](https://images.viblo.asia/fe46b80b-adb8-4cba-b8f7-75b2793529f3.png)

**Method sendKeys(Charsequence c) là gì?**
Là 1 phương thức giúp giả lập điền thông tin vào 1 phần tử nào đó, phương thức này được sử dụng cho phần tử hay thẻ input hoặc textarea. 

**Method click() là gì?**
Là 1 phương thức giúp giả lập nhấp chuột vào 1 phần tử nào đó, phương thức này có thể được sử dụng cho các phần tử hay thẻ button, radio button, link,...


***Ta có thể viết gọn các đoạn code:***

`WebElement inputEmail = driver.findElement(By.id("email"));
		inputEmail.sendKeys("phuong1112@gmail.com");`
thành 
`driver.findElement(By.id("email")).sendKeys("phuong1112@gmail.com");`

và `WebElement inputPassword = driver.findElement(By.id("pass"));
		inputPassword.sendKeys("123456");`

thành 
`driver.findElement(By.id("pass")).sendKeys("123456");`

và `WebElement buttonLogin = driver.findElement(By.id("send2"));
		buttonLogin.click();`

thành 
`driver.findElement(By.id("send2")).click();`

**Chương trình:**
```
package PackageTwo;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LocateGUIElement {
	private static WebDriver driver;
	
	public static void initializeWebDriver(){
		System.setProperty("webdriver.chrome.driver", 
				"E:\\Java udemy\\AUTOMATION TESTING\\chromedriver_win32\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.get("https://www.kidsplaza.vn/customer/account/login/");
	}
	
	public static void locateElementsByID(){
		driver.findElement(By.id("email")).sendKeys("phuong1112@gmail.com");
		
		driver.findElement(By.id("pass")).sendKeys("123456");
		
		driver.findElement(By.id("send2")).click();
		
	}
	
	public static void main(String[] args) {
		initializeWebDriver();
		locateElementsByID();
	}
}

```

***Kết quả chương trình***: 
https://trinhphuong1112-gmail.tinytake.com/sf/MjkxNDI1NF84NzQzMDkw
***Tài liệu tham khảo:***
https://www.webperformance.com/load-testing-tools/blog/real-browser-manual/building-a-testcase/how-locate-element-the-page/
https://www.webperformance.com/load-testing-tools/blog/real-browser-manual/building-a-testcase/how-locate-element-the-page/type-element-locators/
http://toolsqa.com/selenium-webdriver/webelement-commands/