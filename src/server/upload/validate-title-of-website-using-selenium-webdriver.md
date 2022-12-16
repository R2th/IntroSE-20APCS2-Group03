Để tiếp tục chuỗi kiến thức tự học và tìm hiểu về Automation Testing nói chung và Selenium Webdriver nói riêng, bài viết này sẽ trình bày 1 chương trình thực hiện kiểm tra title của trang web có đúng như người dùng mong muốn hay không.

* *Ngôn ngữ lập trình: Java*

* *Công cụ lập trình: Eclipse Kepler*

## 1. Chương trình
```
package PackageOne;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class ValidateWebTitle {
	private static WebDriver webDriver;
	public static void initWebDriver(){
		
		System.setProperty("webdriver.gecko.driver",
				"E:\\Java udemy\\AUTOMATION TESTING\\geckodriver-v0.21.0-win64\\geckodriver.exe");
		
		webDriver = new FirefoxDriver();
		
		String url = "https://www.google.com/";
		webDriver.get(url);
		
	}
	
	public static boolean validateTitle(String expectedTitle){
		String actualTitle = webDriver.getTitle();
		if(actualTitle.contentEquals(expectedTitle)){
			return true;
		}
		else{
			return false;
		}
	}
	public static void main(String[] args) {
		initWebDriver();
		if(validateTitle("Google")){
			System.out.println("Testcase validate title is passed");
		}else{
			System.out.println("Testcase validate title is failed");
		}
	}
}

```
## 2. Giải thích các lệnh
```
package PackageOne;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class ValidateWebTitle {
	private static WebDriver webDriver;
	public static void initWebDriver(){
            //Sử dụng gecko driver để kết nối với FireFox(chỉ dành cho phiên bản Selenium 3.0 trở lên)
		System.setProperty("webdriver.gecko.driver",
				"E:\\Java udemy\\AUTOMATION TESTING\\geckodriver-v0.21.0-win64\\geckodriver.exe");
            
            //Hiểu đơn giản là mở trình duyệt Firefox
		webDriver = new FirefoxDriver();
		
		String url = "https://www.google.com/";
            /* Hàm get() trả về kết quả của tham số được truyền vào. 
              Ở đây tham số được truyền vào là link trang google */
		webDriver.get(url);
		
	}
	
        /*Hàm validateTitle dùng để đưa ra kết quả so sánh giá trị title thực tế của website với 
            giá trị title mà người dùng mong muốn hiển thị. Đầu vào là giá trị của title mà người dùng muốn trang web hiển thị*/
	public static boolean validateTitle(String expectedTitle){
            //Hàm getTitle() để trả về giá trị title của trang web đang kiểm thử
		String actualTitle = webDriver.getTitle();
		if(actualTitle.contentEquals(expectedTitle)){
			return true;
                //Nếu giá trị title thực tế của trang web giống với giá trị title mà người dùng mong muốn thì trả về giá trị true
		}
		else{
			return false;
                //Ngược lại, trả về giá trị false
		}
	}
	public static void main(String[] args) {
            //Gọi hàm initWebDriver() để mở trình duyệt Firefox và hiển thị trang google
		initWebDriver();
        
            //Giá trị title mong muốn của người dùng là "Google".
		if(validateTitle("Google")){
                //Nếu giá trị title của trang Google là "Google" thì hiển thị dòng thông báo phía dưới tại console
			System.out.println("Testcase validate title is passed");
		}else{
                //Nếu giá trị title của trang Google khác "Google" thì hiển thị dòng thông báo phía dưới tại console
			System.out.println("Testcase validate title is failed");
		}
	}
}

```
**Kết quả chạy chương trình**: https://drive.google.com/open?id=1TAaNjN0sPB07EMNuH9n-KGoLoDVpowZH
## 3. Nâng cao nội dung chương trình
Thay vì việc cố định đầu vào cho hàm get() của đối tượng webDriver là "https://www.google.com/" thì ta nên viết 1 hàm để người dùng có thể nhập nội dung trang web mà họ muốn mở trên trình duyệt Firefox(). Việc làm như vậy sẽ giúp chương trình thực hiện được với bất kỳ trang web nào, không cần sửa đổi source code.
Tương tự với việc phát triểu cho hàm validateTitle().

Trước tiên bổ sung Scanner sc = new Scanner(System.in) vào source code để thực hiện việc nhập giá trị từ bàn phím.

Ta có:

***Hàm getUrlName()***

Mục đích: Cho phép người dùng nhập url của trang web mà họ muốn mở bằng Firefox và trả về giá trị của url đó
```
public static String getUrlName(){
		System.out.println("Enter your url: ");
		String value = sc.nextLine();
		return value;
	}
```

***Hàm getExpectedTitle()***

Mục đích: Cho phép người dùng nhập giá trị title mà họ mong muốn trang web hiển thị và trả về giá trị của title đó
```
public static String getExpectedTitle(){
		System.out.println("Enter your expected title: ");
		String value = sc.nextLine();
		return value;
	}
	
```

***Tổng thể chương trình:***
```
package PackageOne;

import java.util.Scanner;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class ValidateWebTitle {
	private static WebDriver webDriver;
	private static Scanner sc = new Scanner(System.in);
	
	public static void initWebDriver(String url){
		
		System.setProperty("webdriver.gecko.driver",
				"E:\\Java udemy\\AUTOMATION TESTING\\geckodriver-v0.21.0-win64\\geckodriver.exe");
		
		webDriver = new FirefoxDriver();
		
		webDriver.get(url);
		
	}
	
	public static String getUrlName(){
		System.out.println("Enter your url: ");
		String value = sc.nextLine();
		return value;
	}
	
	public static String getExpectedTitle(){
		System.out.println("Enter your expected title: ");
		String value = sc.nextLine();
		return value;
	}
	
	public static boolean validateTitle(String expectedTitle){
		String actualTitle = webDriver.getTitle();
		if(actualTitle.contentEquals(expectedTitle)){
			return true;
		}
		else{
			return false;
		}
	}
	public static void main(String[] args) {
		String urlName = getUrlName();
		String expectedTitle = getExpectedTitle();
		initWebDriver(urlName);
		if(validateTitle(expectedTitle)){
			System.out.println("Testcase validate title is passed");
		}else{
			System.out.println("Testcase validate title is failed");
		}
	}
}
```
*Kết quả chạy chương trình:* https://drive.google.com/open?id=1FM3azUeTP3Do1s2i8zBxPUPDtCoiwVvg

Đối với chương trình trên, người dùng có thể thay đổi giá trị url, giá trị title mong muốn của trang web mà họ muốn kiểm tra. Chương trình trên có thể áp dụng cho việc kiểm tra title của bất kỳ trang web nào, chỉ cần người dùng nhập hợp lệ giá trị url và expectedTitle.

## 4. Chạy chương trình trên trình duyệt khác Firefox
Nếu bạn không thích sử dụng trình duyệt Firefox để chạy những testscript của bản thân thì sao? Nếu bạn thích sử dụng trình duyệt Chrome thì bạn phải làm sao? Với những trình duyệt khác như Safari, IE thì phải làm thế nào?

Đơn giản thôi, bạn cần:

* Chuẩn bị driver tương ứng cho trình duyệt mà bạn muốn chạy chương trình.
* Chỉnh sửa nội dung chương trình.
 
**Chuẩn bị driver**

Bạn muốn chạy chương trình mà bạn viết trên trình duyệt Chrome vì thế bạn cần download Chrome driver từ link này: https://sites.google.com/a/chromium.org/chromedriver/

Sau đó, giải nén ra thôi.

**Chỉnh sửa chương trình**

Bạn chỉ cần thay đổi nội dung của method System.setProperty("webdriver.chrome.driver", #Nơi chứa file chromedriver.exe). Dưới đây là ví dụ cho chương trình của mình:

`System.setProperty("webdriver.chrome.driver", "E:\\Java udemy\\AUTOMATION TESTING\\chromedriver_win32\\chromedriver.exe");`

Và khởi tạo webDriver = new ChromeDriver();

`webDriver = new ChromeDriver();`

*Tóm lại*: Bạn muốn chạy chương trình của mình trên trình duyệt nào chỉ cần có driver tương ứng cho trình duyệt đó và thay đổi thông tin phương thức setProperty() như trên và khỏi tạo đối tượng webDriver tương ứng với trình duyệt đó.

***Tài liệu tham khảo**:* https://www.guru99.com/first-webdriver-script.html

***Cảm ơn các bạn đã đọc và quan tâm bài viết của mình!***