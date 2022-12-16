Để có thể thực thi được những tập lệnh selenium webdriver mà chúng ta tạo ra trên những trình duyệt như chrome, firefox hay IE, ... Chúng ta phải tải xuống các file binary / .exe như Chromedriver.exe và geckodriver.exe

Và chúng ta cũng cần đặt đường dẫn của các file này trong tập lệnh của mình như bên dưới hoặc vị trí của nó sẽ được thêm vào classpath để selenium webdriver có thể hiểu được và thực thi. Dưới đây là một vài ví dụ để khởi chạy các trình duyệt như Chrome , Firefox và Edge

For chrome browser :

`System.setProperty("webdriver.chrome.driver", "/absolute/path/to/binary/chromedriver");`

For firefox browser :

`System.setProperty("webdriver.gecko.driver", "/absolute/path/to/binary/geckodriver");`

Nếu đường dẫn không được xác định hoặc nếu chúng ta cung cấp đường dẫn sai, bạn sẽ thấy Exception như dưới đây:

`Error: The path to the driver executable must be set by the webdriver.chrome.driver system property`

Việc tải và quản lý thủ công các drivers này cho mỗi trình duyệt trên mỗi hệ điều hành là rất mất thời gian và công sức. Chúng ta cũng phải kiểm tra khi phiên bản mới của drivers được phát hành cũng như phiên bản trình duyệt mới được phát hành. Chúng ta phải kiểm tra tính tương thích cho tất cả các tệp thực thi trước khi add vào classpath để thực thi. Tất cả những công việc này quả là rất đau đớn và dễ xảy ra thiếu sót nếu chúng ta thực hiện nó một cách thủ công

**Vậy tại sao chúng ta không thử nghĩ đến việc tải xuống tất cả các trình điều khiển một cách tự động ???**

[WebDriverManager](https://github.com/bonigarcia/webdrivermanager) by Boni Garcia sẽ giúp chúng ta thực hiện điều này. WebDriverManager giúp tải xuống binanries / executables một cách tự động. Nó hỗ trợ các trình duyệt như Chrome, Firefox, Opera, PhantomJS, Microsoft Edge hoặc Internet Explorer.

Chúng ta chỉ cần thêm dependency của nó thông qua Maven hoặc Gradle để tải xuống tất cả các executable drivers. Nó sẽ CHỈ tải xuống nếu chúng không có trên bộ đệm WebDriverManager (~ / .m2 / repository / webdriver by default). Điều này giúp chúng ta không tải quá nhiều driver dư thừa

Trong Maven project, chúng ta cần thêm dependency sau vào pom.xml:

```
<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>3.0.0</version>
    <scope>test</scope>
</dependency>
```

Dành cho Gradle project:

```
dependencies {
    testCompile("io.github.bonigarcia:webdrivermanager:3.0.0")
}
```

**Làm cách nào để sử dụng WebDriverManager để khởi chạy trình duyệt Chrome / Firefox trong Selenium WebDriver?**

Chúng ta hãy xem ví dụ dưới đây để khởi chạy trình duyệt chrome:

```
package com.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class ExampleTest {

	private WebDriver driver;
	
	@BeforeClass
	public void setUp() {
		WebDriverManager.chromedriver().setup();
		driver = new ChromeDriver();
	}
	
	@Test
	public void Seleniumtest1() {
		System.out.println("In test 1");
		driver.get("http://google.com");
		String expectedPageTitle = "Google";
		Assert.assertTrue(driver.getTitle().contains(expectedPageTitle), "Test Failed");
	}
	
	@Test
	public void Seleniumtest2() {
		System.out.println("In test 2");
	}
	
	@Test
	public void Seleniumtest3() {
		System.out.println("In test 3");
	}

	@AfterClass
	public void tearDown() {
		if(driver!=null)
			driver.quit();
	}
}
```

Khi sử dụng WebDriverManager, nó sẽ mặc định tải xuống phiên bản mới nhất của driver binary theo từng trình duyệt. Vi vậy nếu bạn muốn sử dụng một phiên bản trình duyệt cụ thể, chúng ta có thể làm điều đó bằng cách sử dụng 
`WebDriverManager.chromedriver().version("2.40").setup();`

Bạn có thể buộc WebDriverManager tải xuống các phiên bản cụ thể bằng cách thay đổi giá trị của các biến trong webdrivermanager.properies cho` wdm.chromeDriverVersion`,`wdm.operaDriverVersion`, `wdm.internetExplorerDriverVersion`, or `wdm.edgeDriverVersion` cho phiên bản cụ thể mà bạn muốn.

Ví dụ:
```
-Dwdm.chromeDriverVersion=2.32
-Dwdm.geckoDriverVersion=0.21.0
-Dwdm.internetExplorerVersion=3.6
```

Hy vọng bài viết này sẽ giúp các bạn vượt qua được những đau khổ khi phải tải và config những driver thực thi cho những trình duyệt khác nhau một cách thủ công. Chúc bạn thành công với WebDriverManager

Nguồn tham khảo : https://www.seleniumeasy.com