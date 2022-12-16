Bài viết trước mình đã giới thiệu qua về Element, các loại Element Locator và 1 testscript login đơn giản với việc định vị phần tử sử dụng ID_ [Link](https://viblo.asia/p/locating-gui-elements-and-simple-login-test-script-Az45bxVNZxY~)

Ở bài viết này, mình sẽ tìm hiểu về CSS Selector trong phạm vi những gì liên quan đến việc sử dụng nó với Selenium Webdriver và thực hành nó vào testscript login của mình. Những kiến thức mình viết, nếu có sai sót ở đâu, mong nhận được sự góp ý từ các bạn.

*Note: bất kỳ nội dung nào biểu thị $ nghĩa là chỉ có 1 dấu đô la mà thôi, mình thấy viblo đang hiển thị 2 dấu đô la trong khi mình chỉ viết 1 dấu đô la.*
## 1. CSS Selector
### 1.1 CSS Selector là gì?
CSS Selector là 1 loại định vị phần tử( Element locator). 
### 1.2 CSS Selector dùng khi nào?
CSS Selector được dùng khi một Automation tester muốn xác định 1 phần tử trên trang HTML mà họ muốn tác động tới phần tử ấy. Ví dụ khi bạn viết một testscript login với giao diện như hình dưới.
![](https://images.viblo.asia/01a8f5af-8ccd-4330-947b-72ddda729fc3.png)
Bạn muốn xác định phần tử "Emai/ Số điện thoại" trên giao diện đăng nhập ở trên, bạn có thể sử dụng CSS Selector.
### 1.3 CSS Selector tại sao dùng?
Vẫn là giao diện đó
![](https://images.viblo.asia/01a8f5af-8ccd-4330-947b-72ddda729fc3.png)
Nếu như bạn muốn kiểm tra dòng "BẠN ĐÃ CÓ TÀI KHOẢN" có đúng với nội dung mà bạn mong muốn hiển thị tại vị trí đó hay không thì bạn cần định vị được dòng chữ đó, tiếp đến là dùng các method của Selenium Webdriver để tiếp cận nó và thực hiện công việc bạn muốn. Để định vị được dòng chữ đó, bạn sẽ xác định bạn định vị theo loại định vị nào: ID, class name, name ...

Trước tiên, chọn chuột phải vào dòng chữ và chọn Inspect. Bạn sẽ thấy dòng chữ đó đơn giản chỉ là nội dung bên trong thẻ h3 và nó không có id hay class name để bạn xác định.
![](https://images.viblo.asia/b98ec48a-2b30-4ea8-b69b-23fb4f0c0626.png)
Lúc này, CSS Selector là một lựa chọn tốt để định vị phần tử đó.
Như vậy, đối với những phần tử bạn không thể định vị qua ID, class name, link,... bạn có thể sử dụng CSS Selector hoặc nếu bạn thích, bạn có thể sử dụng CSS Selector bất kỳ tình huống nào.
### 1.4 CSS Selector dùng như thế nào?
***Các loại CSS Selector***
1. Tag and ID
2. Tag and Class
3. Tag and Attribute
4. Tag, Class, and Attribute
5. Sub-String Matches
    * Starts With (^)
    * Ends With ($)
    * Contains (*)
6. Child Elements
    * Direct Child
    * Sub-child
    * nth-child

***Cách dùng CSS Selector***

1. CSS tag và ID `css=tag#id`
* tag: tên thẻ    
* id: id được đặt cho thẻ
![](https://images.viblo.asia/23484cf7-9bb4-4fef-b497-d499fc01c2b4.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("input#email"));
```
2. Tag and Class  `css=tag.class`
* tag: tên thẻ    
* class: class được đặt cho thẻ
![](https://images.viblo.asia/b008ce97-7601-4e07-8242-4a79fd4da9d5.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("input.input-text form-control required-entry validate-email-phoneprefix"));
```
3. Tag and Attribute
`css=tag[attribute=value]`
* tag: tên thẻ    
* attribute: thuộc tính
* value: giá trị của thuộc tính
![](https://images.viblo.asia/30cf06da-2bc4-4a11-ba34-45db01249fa5.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("input[name=login[username]"));
```
4. Tag, Class, and Attribute
`css=tag.class[attribute=value]`
* tag: tên thẻ    
* class: class được đặt cho thẻ
* attribute: thuộc tính
* value: giá trị của thuộc tính
![](https://images.viblo.asia/12ca6829-ba60-44c2-9843-cf61d37a1c41.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("input.input-text form-control required-entry validate-email-phoneprefix[name=login[username]"));
```
5. Sub-String Matches

   5.1 Starts With (^)    
`css=tag[attribute^=ký tự đầu của chuỗi]`
* tag: tên thẻ    
* attribute: thuộc tính
* ^=: bắt đầu với giá trị nào đó
![](https://images.viblo.asia/4a582785-2271-4a5e-9faf-030c4f66cfc1.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("input[id^='ema']"));
```
    
   5.2 Ends With ($)
    
`css=tag[attribute$=ký tự kết thúc của chuỗi]`
* tag: tên thẻ    
* attribute: thuộc tính
* $=: kết thúc với giá trị nào đó
![](https://images.viblo.asia/4a582785-2271-4a5e-9faf-030c4f66cfc1.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("input[id$='ail']"));
```
   5.3 Contains (*)
     
`css=tag[attribute*=ký tự bất kỳ của chuỗi]`
* tag: tên thẻ    
* attribute: thuộc tính
* *=: chứa ký tự nào đó
![](https://images.viblo.asia/4a582785-2271-4a5e-9faf-030c4f66cfc1.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("input[id*='ai']"));
```
6. Child Elements

6.1 Direct Child
    
`Cú pháp: parentLocator > childLocator`
* parentLocator: định vị của thẻ cha
* childLocator: định vị của thẻ con ngay dưới 1 bậc
![](https://images.viblo.asia/735c0a96-a10c-4287-9573-25c594224308.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("div.input-box>input"));
```
6.2 Sub-child
    
`Cú pháp: parentLocator childLocator`
* parentLocator: định vị của thẻ cha
* childLocator: định vị của thẻ con ngay dưới 1 bậc hoặc thẻ con của con
![](https://images.viblo.asia/c1fde759-b9b6-440c-b69f-a54e4c3a551f.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("ul.form-list div"));
```
6.3 nth-child
    
`Cú pháp: parentLocator child:nth-of-type(?)`
* parentLocator: định vị của thẻ cha
* child: thẻ con
* ?: số thứ tự của thẻ con(khi so các thẻ con cùng cha với nhau)
![](https://images.viblo.asia/c1fde759-b9b6-440c-b69f-a54e4c3a551f.png)
Chương trình tương ứng
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("ul.form-list li:nth-of-type(2)"));
//lấy thẻ con li có số thứ tự là 2
```
`Cú pháp: parentLocator child:last:child` là để lấy thẻ con cuối cùng(khi so với các thẻ con cùng cha với nhau).

***Cách lấy CSS Selector đơn giản***

Bạn click chuột phải tại đối tượng mà bạn muốn định vị, chọn Inspect
![](https://images.viblo.asia/ca09f464-64a1-47f4-b06a-b84c27e5c8d9.png)
Sau đó click chuột phải tại vùng khoanh màu( chính là đối tượng mà bạn muốn định vị) rồi chọn Copy, sau đó chọn Copy Selector
![](https://images.viblo.asia/edeb8e78-0d3e-4019-89b1-4e2de867224d.png)
Dán vào đoạn code của bạn là xong.
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.cssSelector("#email"));
```
Đối với cách thực hiện này, bạn không cần phải hiểu nội dung về CSS Selector mà mình trình bày ở trên, chỉ cần paste vào code rồi run là được. Tuy nhiên, cá nhân mình thấy nên học để hiểu.
## 2. Testscript login dùng CSS Selector
**Bước chuẩn bị:**

Chương trình của mình sẽ viết 1 test case nhập đủ thông tin email và mật khẩu sau đó click button Đăng nhập và kết quả là đăng nhập fail do mình chưa hề có tài khoản nào trên trang web Kidsplaza.

Bạn cần lấy được CSS Selector cho các nội dung "Email/Số điện thoại", "Mật khẩu", "Đăng nhập" và đoạn text "Tên đăng nhập hoặc mật khẩu không đúng." cho trường hợp đăng nhập không thành công

Và đây là kết quả khi mình lấy CSS Selector cho:

* Ô nhập liệu "Email/ Số điện thoại" --> `#email`
* Ô nhập liệu "Mật khẩu" --> `#pass`
* Nút "Đăng nhập" --> `#send2`
* Dòng "Tên đăng nhập hoặc mật khẩu không đúng." --> `#content > div.row > div > ul > li > ul > li > span`
### 2.1 Chương trình
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
	
	public static void loginFail(){
		driver.findElement(By.cssSelector("input#email")).sendKeys("phuong1112@gmail.com");
		
        driver.findElement(By.cssSelector("input#pass")).sendKeys("123456");
		
        driver.findElement(By.cssSelector("button#send2")).click();
		
        String actualTextFail = driver.findElement(By.cssSelector("#content > div.row > div > ul > li > ul > li > span")).getText();
		String expectedTextFail = "Tên đăng nhập hoặc mật khẩu không đúng.";
		
        if(actualTextFail.contentEquals(expectedTextFail)){
			System.out.println("Login fail");
		}
		else{
			System.out.println("Login pass");
		}
	}
	
	public static void main(String[] args) {
		initializeWebDriver();
		loginFail();
	}
}
```
### 2.2 Giải thích
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
	
	public static void loginFail(){
		// Lấy ra ô nhập liệu "Email/ Số điện thoại" và tự động điền nội dung "phuong1112@gmai.com" vào ô nhập liệu đó
		driver.findElement(By.cssSelector("#email")).sendKeys("phuong1112@gmail.com");
		
		// Lấy ra ô nhập liệu "Mật khẩu" và tự động điền nội dung "123456" vào ô nhập liệu đó
		driver.findElement(By.cssSelector("#pass")).sendKeys("123456");
		
		// Lấy ra button "Đăng nhập" và tự động click vào button đó
		driver.findElement(By.cssSelector("#send2")).click();
		
		//Định vị dòng text hiển thị khi đăng nhập fail, sau đó lấy ra giá tri của dòng đó. 
		//getText() trả về kết quả là 1 String
		String actualTextFail = driver.findElement(By.cssSelector("#content > div.row > div > ul > li > ul > li > span")).getText();
		String expectedTextFail = "Tên đăng nhập hoặc mật khẩu không đúng.";
		
		if(actualTextFail.contentEquals(expectedTextFail)){
			System.out.println("Login fail");
			//Nếu dòng text hiển thị sau khi đăng nhập fail là "Tên đăng nhập hoặc mật khẩu không đúng." thì in ra màn hình console "Login fail"
		}
		else{
			System.out.println("Login pass");
			//ngược lại
		}
	}
	
	public static void main(String[] args) {
		initializeWebDriver();
		loginFail();
	}
}
```
***Kết quả chương trình:***
https://trinhphuong1112-gmail.tinytake.com/sf/MjkxODM1MV84NzU0MzEw
***Tài liệu tham khảo:***
https://www.softwaretestingmaterial.com/css-selector-selenium-webdriver-tutorial/