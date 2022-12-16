Ở bài viết trước, chúng ta đã cùng nhau tìm hiểu làm quen với kiến trúc và tính năng cơ bản của WebDriver. Mình không đi sâu vào phần cài đặt Selenium WebDriver, bạn có thể tham khảo cách cài đặt ở bài viết gốc này và tìm cách cài đặt phù hợp với máy tính của mình :
https://www.softwaretestinghelp.com/webdriver-eclipse-installation-selenium-tutorial-9/

Giả sử rằng bạn đã thiết lập hệ thống với tất cả các tiện ích và gói cần thiết, chúng ta sẽ đi sâu hơn vào việc triển khai tập lệnh kiểm thử WebDriver (đầu tiên) của mình trong bài viết này.

Đầu tiên sẽ tạo tập lệnh WebDriver. Sau đó phân tích chi tiết các lệnh WebDriver cơ bản thường được sử dụng. Đồng thời tìm hiểu về các chiến lược định vị các yếu tố/thành phần web (UI), cách viết chúng trong các kịch bản kiểm thử. Sau đó là tìm hiểu chi tiết các câu lệnh ```Get Commands```.

### Tạo tập lệnh (Script)

Để tạo tập lệnh, chúng ta sẽ sử dụng project "Learning_Selenium" được tạo trong hướng dẫn trước đó (Selenium WebDriver Tutorial #9) và “gmail.com” là ứng dụng được kiểm tra (AUT).

**Scenario/Kịch bản:**

* Khởi chạy trình duyệt và mở “Gmail.com”.
* Xác nhận tiêu đề của trang và in ra kết quả.
* Nhập tên người dùng và mật khẩu.
* Nhấp vào nút Đăng nhập.
* Đóng trình duyệt web.

**Bước 1:**  Tạo 1 java class mới có tên là “Gmail_Login” trong project “Learning_Selenium”.

**Bước 2:** Copy/paste các dòng code dưới đây vào “Gmail_Login.java” class vừa tạo (có thể bỏ những dòng lệnh comment đi).

```
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
 
public class Gmail_Login {
/**
* @param args
*/
       public static void main(String[] args) {
              
// khai báo biến và object (đối tượng)
              WebDriver driver = new FirefoxDriver();  // tạo mới object "driver" là 1 driver của Firefox
              String appUrl = "https://accounts.google.com"; // gắn value cho biến appUrl
              
// khởi chạy trình duyệt firefox và mở ứng dụng tương ứng với appUrl, ở đây là accounts.google.com
              driver.get(appUrl);
              
// maximize (mở rộng tối đa) cửa sổ trình duyệt
              driver.manage().window().maximize();
              
// khai báo và khởi tạo biến để lưu trữ tiêu đề dự kiến của trang web
              String expectedTitle = " Sign in - Google Accounts ";
              
// fetch (tìm) tiêu đề thực của trang web và lưu nó vào biến actualTitle
              String actualTitle = driver.getTitle();
              
// so sánh tiêu đề dự kiến (expected) với tiêu đề thực tế của trang và in kết quả
              if (expectedTitle.equals(actualTitle))
              {
                     System.out.println("Verification Successful - Hiển thị đúng tiêu đề trang.");
              }
             else
              {
                     System.out.println("Verification Failed - Hiển thị sai tiêu đề trang");
              }
 
// nhập giá trị username hợp lệ trong email textbox
              WebElement username = driver.findElement(By.id("Email"));
              username.clear();
              username.sendKeys("TestSelenium");
              
// nhập giá trị password hợp lệ trong password textbox
              WebElement password = driver.findElement(By.id("Passwd"));
              password.clear();
              password.sendKeys("password123");
              
// click button Đăng nhập
              WebElement SignInButton = driver.findElement(By.id("signIn"));
              SignInButton.click();
              
// đóng trình duyệt
              driver.close();
              System.out.println("Test script executed successfully.");
              
// kết thúc chương trình
              System.exit(0);
       }
}
```

Đoạn mã này tương ứng với kịch bản (5 bước) trình bày phía trên.

### Code Walkthrough / Mã giới thiệu

**Import Statements:**

```
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
```

Trước khi thực thi kịch bản, chúng ta cần import các gói trên:

```import org.openqa.selenium.WebDriver``` – Tham chiếu giao diện WebDriver được yêu cầu để khởi tạo trình duyệt web mới.

```import org.openqa.selenium.firefox.FirefoxDriver``` – Tham chiếu class của FirefoxDriver được yêu cầu để khởi tạo trình điều khiển cụ thể của Firefox trên phiên bản trình duyệt được khởi tạo bằng giao diện WebDriver.

```import org.openqa.selenium.WebElement``` – Tham chiếu đến WebElement class mà được yêu cầu để khởi tạo 1 thành phần web mới.

```import org.openqa.selenium.By``` – Tham chiếu đến By class mà loại định vị được gọi.

Đây chỉ là các gói cơ bản cho hầu hết tất cả các project, còn 1 số gói cho các chức năng phức tạp và đặc biệt hơn như thao tác excel, kết nối cơ sở dữ liệu, ghi nhật ký, xác nhận, v.v... Bạn có thể thêm chúng vào sau tùy theo nhu cầu sử dụng cụ thể.

**Khởi tạo đối tượng**

```
WebDriver driver = new FirefoxDriver();
```

Sử dụng command trên để tạo 1 biến tham chiếu cho giao diện WebDriver và khởi tạo nó bằng FirefoxDriver class. Cấu hình Firefox mặc định sẽ được khởi chạy, điều này có nghĩa là không có tiện ích mở rộng và plugin nào được tải với biến thể Firefox này, và nó chạy ở chế độ an toàn (safe mode).

**Khởi chạy Web browser**

```
driver.get(appUrl);
```

Phương thức ```get()``` được gọi trên biến thể WebDriver để khởi chạy biến thể trình duyệt web mới (biến thể ```driver``` được khởi tạo phía trên). Đường dẫn điều hướng được truyền dưới dạng tham số (appUrl) vào phương thức ```get()```, chuyển hướng biến thể trình duyệt web đã khởi chạy sang URL này (appUrl).

**Phóng to cực đại cửa sổ trình duyệt (Maximize Browser Window)**

```
driver.manage().window().maximize();
```

Phương thức ```maximize()``` được sử dụng để phóng to cực đại cửa sổ trình duyệt ngay sau khi trình duyệt web đã khởi chạy sang URL ứng dụng (appUrl).

**Fetch the page Title**

```
String actualTitle = driver.getTitle();
```

Phương thức ```getTitle()``` được sử dụng để tìm nạp tiêu đề của trang web hiện tại. Sau đó, load kết quả này vào một biến chuỗi actualTitle.

**So sánh 2 giá trị Expected và Actual:**

```
 if (expectedTitle.equals(actualTitle))
{
        System.out.println("Verification Successful - Hiển thị đúng tiêu đề trang.");
}
else
{
        System.out.println("Verification Failed - Hiển thị sai tiêu đề trang");
}
```

Đoạn mã trên sử dụng các câu lệnh điều kiện java để so sánh giữa giá trị thực và giá trị mong đợi. Dựa trên kết quả thu được, câu lệnh in tương ứng sẽ được thực thi.

**Khởi tạo phần tử web**

```
WebElement username = driver.findElement(By.id(“Email”));
```

Khởi tạo biến username là tham chiếu WebElement của textbox Email bằng cụm lệnh ```driver.findElement(By.id(“Email”))``` . Sau khi khởi tạo thành công, biến ```username``` có thể được sử dụng để tham chiếu (đại diện) textbox Email trên giao diện người dùng mỗi khi chúng ta muốn thực hiện một số hành động trên nó.

**Clear Command**

```
username.clear();
```

Lệnh ```clear()``` được sử dụng để xóa giá trị hiện có trong hộp văn bản nếu có. Nó cũng xóa cả placeholder mặc định.

**sendKeys Command**

```
username.sendKeys(“TestSelenium“);
```

Phương thức ```sendKeys()``` được sử dụng để nhập giá trị được chỉ định (trong dấu ngoặc đơn) vào hộp văn bản. Lưu ý rằng phương thức ```sendKeys()``` được gọi trên WebElement object - cái mà được khởi tạo với sự trợ giúp của thuộc tính phần tử (element property) tương ứng với phần tử trên UI. Trong ví dụ trên là nhập chuỗi "TestSelenium" vào bên trong hộp văn bản Email trên ứng dụng Gmail.

```sendKeys``` là một trong những lệnh được sử dụng phổ biến nhất trong các kịch bản WebDriver.

**Click Command**

```
SignInButton.click();
```

Giống như `sendKeys()`, `click()` là 1 lệnh phổ dụng rấ hay được sử dụng để tương tác với các thành phần web. Lệnh `click()` được sử dụng để thực hiện hành động nhấp vào phần tử web được chỉ định. Trong ví dụ trên là lệnh thực hiện hành động nhấp chuột vào SignInButton (nút Đăng nhập) của ứng dụng Gmail.

*Chú ý :*
* Khác với method `sendKeys()`, method `click()` không có tham số truyền vào.
* Đôi khi, việc click vào một yếu tố web có thể dẫn tới việc tải lại một trang mới hoàn toàn. Trong trường hợp này, để duy trì chương trình thì phương thức `click()` cần được mã hóa (code) theo cách chờ cho đến khi trang được tải.

**Đóng trình duyệt web**

```
driver.close();
```

Phương thức `close()` được sử dụng để đóng cửa sổ trình duyệt hiện tại.

**Kết thúc chương trình**

```
System.exit(0);
```

Phương thức `exit()` sẽ chấm dứt chương trình (force exit). Vì vậy hãy nhớ đóng tất cả các biến thể trình duyệt (driver.close() ....) trước khi kết thúc chương trình.

### Thực thi test / Test Execution

**Kịch bản kiểm thử hoặc đơn giản là chương trình java có thể được thực thi theo các cách dưới đây :**

**#1.** Nhấn vào button Run (icon mũi tên phải màu xanh ở trong thanh menu của Eclipse) , hình dưới đây :

![](https://images.viblo.asia/a228229d-4466-40d5-b983-e2eaee787d4f.jpg)

Lưu ý rằng chỉ có class (file .java) được chọn sẽ được thực thi.

**#2.** Nhấp chuột phải vào bất kỳ đâu bên trong editor của class/file_java, chọn option “Run As” -> “Java Application”.

**#3.** Một lối tắt khác để thực thi tập lệnh kiểm tra là – Nhấn tổ hợp phím `ctrl + F11`.

Vào cuối chu kỳ thực hiện, nếu thực thi tập lệnh thành công thì sẽ in ra thông báo “Test script executed successfully.” trong console.

### Định vị các thành phần web

Các thành phần web trong WebDriver có thể được định vị và kiểm tra (inspect) theo cách tương tự như của Selenium IDE. Selenium IDE và Firebug có thể được sử dụng để inspect thành phần web trên GUI. Rất khuyến khích sử dụng Selenium IDE để tìm các thành phần web. Khi thành phần web được tìm thấy thành công, sao chép và dán giá trị đích vào trong mã WebDriver. Các loại định vị và chiến lược định vị khá giống nhau ngoại trừ cú pháp và ứng dụng của chúng.

Trong WebDriver, các thành phần web được định vị với sự trợ giúp của các công cụ tìm kiếm động `(findElement(By.<<locatorType>>(“<<locator value>>”)))`

Ví dụ Sample Code:

`driver.findElement(By.id(“Email”));`

![](https://images.viblo.asia/04dd3435-b3bf-4ab8-a67c-bd14ef7021b2.jpg)

### Các loại định vị và cú pháp của nó

![](https://images.viblo.asia/2ab8c315-3551-4eb7-ae5f-f42eceefe707.png)

Bài dịch trên còn nhiều thiếu sót. Nếu bạn quan tâm có thể tham khảo bài viết gốc tại đây :
https://www.softwaretestinghelp.com/selenium-webdriver-tutorial-10/

Hẹn các bạn ở bài tiếp theo :)