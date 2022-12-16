Để tiếp tục cho series tự học Selenium qua ví dụ, hôm nay chúng ta sẽ thực hiện làm quen với các thao tác bằng chuột và bàn phím

# Handling Keyboard & Mouse Events

Trong thực tế, đôi khi chúng ta cần phải sử dụng những chức năng của chuột, hoặc bàn phím để có thể thực hiện thao tác mà testcase yêu cầu một cách chính xác nhất. Rất may là Selenium hỗ trợ chúng ta một bộ thư viện API riêng, chuyên biệt để xử lý tình huống này – Thư viện Actions và Action class.


Dưới đây sẽ là những method được cung cấp bởi Action class được sử dụng thường xuyên nhất để xử lý với chuột và bàn phím trong Selenium 

![](https://images.viblo.asia/7b2240d6-d8ac-465a-af0d-0dcd45f27bdd.png)


Trong phần ví dụ đầu tiên, mình sẽ giới thiệu đến các bạn một trong những việc mà chúng ta làm rất thường xuyên. Đó là, vào trang Google.com , nhập text và bạn muốn search và click vào link đầu tiên khi kết quả search hiện ra.


Để giải quyết cho bài toán trên thì mình có phần code sau đây :


```
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.Actions;

public class demoHandlingKeyboard {

	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub
		
		//Create Properties and Setting gecko driver path for Firefox
		String exePath = "D:\\geckodriver-v0.19.0-win64\\geckodriver.exe";
		System.setProperty("webdriver.gecko.driver", exePath);
		WebDriver driver = new FirefoxDriver();
		
		//Create baseUrl and launch browser
		String baseUrl = "http://google.com";
		driver.get(baseUrl);
		
		//Initial Actions class
		Actions action = new Actions(driver);
		
		//Input search text you want and search using method provided by Actions class
		action.sendKeys(driver.findElement(By.id("lst-ib")), "Truong An").sendKeys(Keys.ENTER).build().perform();
			
		Thread.sleep(1200);
		
		//Print text of Firstlink in google result and click on this link
		WebElement firstLink = driver.findElement(By.xpath(".//*[@id='rso']/div[1]/div/div/div/div[1]/a[1]/h3"));
		System.out.println(firstLink.getText());
		action.click(firstLink).build().perform();

	}
}
```

Các bạn có thể sử dụng code của mình để tham khảo và thực hiện những ví dụ tương tự về các xử lý cho chuột và bàn phím. Để dễ dàng hơn, sau đây sẽ là những điểm quan trọng nhất khi sử dụng Actions class

**Step 1:** Muốn sử dụng được Actions hoặc Action class, đầu tiên chúng ta phải import thư viện của nó 

```
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.interactions.Action;
```

Sự khác nhau giữa Action và Actions class là Actions class cho phép chúng ta thực hiện nhiều action cùng một lúc với chuột và bàn phím, trong khi đó Action chỉ hỗ trợ chúng ta thực hiện một action duy nhất

**Step 2:** Khởi tạo một object cho Actions class

```
Actions action = new Actions(driver);
```

**Step 3:** Khởi tạo những action bằng Action Object đã tạo trước đó

```
//Input search text you want and search using method provided by Actions class
action.sendKeys(driver.findElement(By.id("lst-ib")), "Truong An").sendKeys(Keys.ENTER).build().perform();
```

Trong trường hợp ví dụ trên, chúng ta sẽ sử dụng method **sendKeys()** vì chúng ta chỉ đơn giản là nhập text và click ENTER. **Build()** phải luôn là phương thức cuối cùng được sử dụng để tất cả các hành động được liệt kê sẽ được biên dịch thành một bước duy nhất.

**Step 4:** Sử dụng phương thức **perform()** để thực hiện đối tượng Action mà chúng ta đã thiết kế ở Step 3.

```
action.click(firstLink).build().perform();
```

# Building a Series of Multiple Actions
Ngoài ra, các bạn còn có thể xây dựng một loạt các hành động sử dụng chuột và bàn phím bằng cách sử dụng Action và Actions class. Chỉ cần nhớ sau một loạt các hành động đó, chúng ta phải dùng method **build()** để kết nối chúng thành một chuỗi hành động.

Mình sẽ cung cấp thêm cho các bạn một bài ví dụ nữa về chuỗi những hành động sử dụng chuột và bàn phím.
Ở đây mình sẽ truy cập vào trang http://demo.guru99.com/test/newtours/register.php để đăng kí một account nhưng sẽ không sử dụng theo cách thông thường là tìm từng phần tử rồi **sendKey()** mà mình sẽ thực hiện hoàn toàn với actions class bằng cách tìm ra phần tử đầu tiên sau đó sử dụng button TAB để chuyển qua phần tử tiếp theo và sendKey

Các bạn có thể tham khảo code của mình dưới đây :

```
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;

public class Mouse_Keyboard_Ex2 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		String exePath = "D:\\automationtest\\chromedriver_win32 (1)\\chromedriver.exe";
		System.setProperty("webdriver.chrome.driver",exePath);
		WebDriver driver = new ChromeDriver();
		
		//Set baseUrl and launch browser
		String baseUrl = "http://demo.guru99.com/test/newtours/register.php";
		driver.get(baseUrl);
		
		// set input value
				String firstName = "NguyenDuc";
				String lastName = "Truong An";
				String phone = "09235123432";
				String email = "anndt1105@gmail.com";
				String address = "666 Nguyen Hoang";
				String city = "Da Nang";
				String state = "Da Nang";
				String postalCode = "010101";
				String userName = "anndt1105";
				String password = "12345678";
				String cfmpassword = "12345678";
		
		//find and set value for elements
				Actions action = new Actions(driver);
				action.sendKeys(driver.findElement(By.name("firstName")),firstName).sendKeys(Keys.TAB).perform();
				action.sendKeys(lastName).sendKeys(Keys.TAB).perform();
				action.sendKeys(phone).sendKeys(Keys.TAB).perform();
				action.sendKeys(email).sendKeys(Keys.TAB).perform();
				action.sendKeys(address).sendKeys(Keys.TAB).perform();
				action.sendKeys(city).sendKeys(Keys.TAB).perform();
				action.sendKeys(state).sendKeys(Keys.TAB).perform();
				action.sendKeys(postalCode).perform();
				
				Select countryElement = new Select(driver.findElement(By.name("country")));
				countryElement.selectByValue("VIETNAM");
				
				action.sendKeys(driver.findElement(By.name("email")),userName).sendKeys(Keys.TAB).perform();
				action.sendKeys(password).sendKeys(Keys.TAB).perform();
				action.sendKeys(cfmpassword).sendKeys(Keys.ENTER).perform();
				
				WebElement signInLink = driver.findElement(By.linkText("sign-in"));
				action.click(signInLink).build().perform();
				
				action.sendKeys(driver.findElement(By.name("userName")),userName).sendKeys(Keys.TAB).perform();;
				action.sendKeys(password).sendKeys(Keys.ENTER).perform();	
		
	}
}
```

Chúc các bạn thành công và sớm làm chủ được Chuột và Bàn phím trong Selenium cũng như Action và Actions class

Nguồn tham khảo: https://www.guru99.com/keyboard-mouse-events-files-webdriver.html