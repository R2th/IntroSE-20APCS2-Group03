Tiếp tục series về automation test hôm nay mình sẽ giới thiệu 1 cách kết hợp mới

### Cucumber là gì ?
Cucumber là quả dưa chuột .... ưm :thinking: cũng đúng thôi !

Nhưng về khía cạnh kiểm thử phần mềm nó lại có 1 định nghĩa khác là 1 tên gọi hết sức kỹ thuật chứ không dễ ăn như dưa chuột đâu nhé :smiley_cat: 
![](https://image.freepik.com/free-vector/fresh-cucumber-vegetable-isolated-icon_24877-19506.jpg)

Cucumber là tên gọi 1 phương pháp kiểm thử hỗ trợ Behavior Driven Development (BDD). Nó giải thích hành vi của ứng dụng tương tự như những câu tiếng Anh có ý nghĩa đơn giản bằng cách sử dụng một ngữ pháp đơn giản được xác định bởi một ngôn ngữ gọi là Gherkin

### Tại sao phải sử dụng Cucumber?

Một số lý do sau nên dùng Cucumber:
- Selenium và Cucumber là 2 công nghệ phổ biến
- Hầu hết các dự án sử dụng Selenium để kiểm thử chức năng, họ muốn tích hợp Cucumber vì Cucumber dễ đọc và dễ hiểu luồng ứng dụng hơn.
- Cucumber dựa trên phát triển hướng hành vi đóng vai trò là cầu nối giữa 
*      Software Engineer và Business Analyst.
*     Manual Tester và Automation Tester.
*     Manual Tester và Developers.

### Cài đặt và sử dụng
**1. Cài đặt**

- Download thư viện Selenium jar files tại https://www.selenium.dev/downloads/
![](https://images.viblo.asia/5049d548-4439-4952-a5cb-77dda2e7faec.png)

- Download thư viện Cucumber jar files tại https://mvnrepository.com/search?q=Cucumber

Đầu tiên search với từ khóa "Cucumber Core" và click vào kết quả tìm kiểm như hình dưới

![](https://images.viblo.asia/cf228391-b97e-4653-a740-b277df037940.png)

Chọn download version 1.2.2
![](https://images.viblo.asia/4bab3f3b-abb2-45d5-ab3e-a7797ee39673.png)
Click download với đuôi jar
![](https://images.viblo.asia/29cd5b91-8b28-407e-a223-52de807ab38b.png)

**2. Automation test sử dụng Cucumber với Selenium**

- B1: Đầu tiên tạo 1 project mới bằng cách: File -> New -> Java Project. Đặt tên cho Project của bạn
![](https://images.viblo.asia/4559a631-66d4-4955-a288-133dc66d6144.png)
- B2: Import các thư viện bạn vừa download ở trên vào Project qua đường dẫn
Chuột phải vào Project -> Propeties -> Java Build Path -> chọn tab Libraties -> Add External JARs 
add tất cả các thư viện bạn đã down ở trên
![](https://images.viblo.asia/b5baac4c-40f9-4509-bf4c-b27712d673ea.png)

- B3: Tạo 1 forder cho dự án là nơi để lưu các feature. Đặt tên là Feature để dễ nhận biết
![](https://images.viblo.asia/9462dadf-ca73-44ec-b46b-4fd5d635e3ba.png)

- B4: Tạo 1 package có tên là stepDefinition mục đích là để chứa các class viết code chính, 1 package là nơi chứa class để Run

Việc phân ra các package và folder như trên là để dự án automation trở nên rõ ràng hơn. Team member của bạn vào xem cũng dễ hiểu hơn

Xong phần lý thuyết + cài đặt hẳn bạn đã nhàm chán, giờ mình thử 1 bài tập cho khí thế nhé

**Bài tập 1:** Kiểm tra button Login của trang https://selenium-training.herokuapp.com/

Bước 1: Viết script sử dụng ngôn ngữ Gherkin trong class feature
```
Feature: Check function Login

Scenario: Verification of Login button

Given Open the Chrome and launch the application			

When Enter the Username and Password			

Then Login successfully
```
Về ý nghĩa các từ khóa, cũng như cách sử dụng ngôn ngữ Gherkin mời bạn đọc tham khảo ở bài viết https://viblo.asia/p/cucumber-co-ban-ngon-ngu-gherkin-jamoG8ndRz8P

Bài viết này mình sẽ chỉ tập trung vào sự kết hợp giữa cucumber và Selenium thôi nhé 

Bước 2: Tạo class TestRunner trong package TestRunner
```
package TestRunner;
import org.junit.runner.RunWith;		
import cucumber.api.CucumberOptions;		
import cucumber.api.junit.Cucumber;		

@RunWith(Cucumber.class)				
@CucumberOptions(features="Features",glue={"StepDefinition"})

public class TestRunner {

}
```

Bước 3: Tạo class Login trong package Step Definition
```
package StepDefinition;

import cucumber.api.java.en.Given;		
import cucumber.api.java.en.Then;		
import cucumber.api.java.en.When;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;


public class Login {
	
	WebDriver driver;
	
	@Given("^Open the Chrome and launch the application$")				
    public void open_the_Chrome_and_launch_the_application() throws Throwable							
    {		
		System.setProperty("webdriver.chrome.driver",
				"C:\\Users\\pham.thi.thu.hang\\Documents\\Chrome driver 83\\chromedriver_win32\\chromedriver.exe");
		driver = new ChromeDriver();

		String url = "https://selenium-training.herokuapp.com/login";
		driver.get(url);					
    }		
		
    @When("^Enter the Username and Password$")					
    public void enter_the_Username_and_Password() throws Throwable 							
    {		
    	driver.findElement(By.name("session[email]")).sendKeys("phamhangmta94@gmail.com");		
		driver.findElement(By.name("session[password]")).sendKeys("12345678");
		driver.findElement(By.name("commit")).submit();
    	
    }		

    @Then("^Login successfully$")					
    public void Login_successfully() throws Throwable 							
    {    		
    		String expectTitle ="Hằng | Ruby on Rails Tutorial Sample App";
    		String actualTitle = driver.getTitle();
    		
    		if (expectTitle.contentEquals(actualTitle)) {
    			System.out.print("Test Passed!");
    		} else {
    			System.out.print("Test Failed!");
    		}
    }
}

```

Kết quả thu được khi Run sẽ được kết quả như sau:
![](https://images.viblo.asia/184b6207-540f-421d-841a-ac93d5e6b89c.gif)

Bài viết sau mình sẽ demo thêm 1 số bài toàn phức tạp hơn. Mong bạn đón đọc


Tham khảo: https://www.guru99.com/using-cucumber-selenium.html#1