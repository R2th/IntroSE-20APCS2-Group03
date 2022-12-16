TestNG là 1 framework test - quản lý việc tạo test suite / test case, trình tự run test và report sau khi run test xong. TestNG được xây dựng từ cảm hứng của 2 Framework dòng xUnit là JUnit (Java) và NUnit (C#) (NG là viết tắt của từ Next Generation). TestNG có thể sử dụng được cho Unit, Integration, và End-to-end testing. Nó được phát triển bởi Cedric Beust. TestNG gọi là Next Generation vì nó có 1 vài điểm vượt trội hơn so với JUnit.

Mặc dù là một framework đơn giản và dễ sử dụng, nhưng JUnit cũng có những hạn chế riêng của nó ; và TestNG được sinh ra để khắc phục những hạn chế này.
TestNG là một framework mã nguồn mở được phân phối bởi Apache Software License và có sẵn để tải xuống (free). Nó cung cấp định dạng kết quả hiệu quả nhất có thể, nói cách khác, nó có thể được chia sẻ với các bên liên quan để có 1 cái nhìn đại cương về tình trạng của sản phẩm/ ứng dụng nhằm loại bỏ nhược điểm của WebDriver khi tạo các báo cáo kiểm thử. TestNG có 1 cơ chế xử lý các ngoại lệ sẵn có cho phép chương trình chạy mà không bị ngừng bất ngờ. 

Cả TestNG và JUnit đều thuộc 1 họ Unit framework, trong đó Test NG là phiên bản mở rộng của JUnit và được sử dụng rộng rãi hơn trong kỷ nguyên kiểm thử hiện đại.

### Các tính năng của TestNG

* Hỗ trợ chú thích
* Hỗ trợ tham số hóa
* Phương pháp thực hiện nâng cao không yêu cầu tạo bộ test suite
* Hỗ trợ kiểm thử Data Driven Testing bằng Data provider (bộ cung cấp Data)
* Cho phép người dùng đặt mức độ ưu tiên thực hiện cho các phương thức thử nghiệm
* Hỗ trợ môi trường an toàn tránh các rủi ro khi thực hiện đa luồng (multiple thread)
* Sẵn sàng hỗ trợ tích hợp với các công cụ và trình cắm (plug-in) khác nhau, ví dụ như các công cụ build (Ant, Maven, v.v.), Môi trường phát triển tích hợp (Eclipse).
* Thuận tiện cho người dùng với các phương tiện tạo báo cáo hiệu quả bằng cách sử dụng ReportNG

**So sánh TestNG và JUnit**

Có nhiều lợi thế khác nhau giúp TestNG vượt trội hơn JUnit. Một số trong số đó là:

* Các chú thích nâng cao và dễ dàng sử dụng
* Có thể thiết lập các pattern thực thi
* Có thể thực thi đồng thời các kịch bản test
* Có thể thiết lập các kịch bản test phụ thuộc

Trong cả TestNG và JUnit, các chú thích đều đi sau tiền tố "@" . Dưới đây là cách cài đặt và thực thi TestNG.

### Cài đặt TestNG trong Eclipse

**Bước 1:** Mở eclipse IDE -> Click vào option Help của menu -> Chọn “Eclipse Marketplace..” :

![](https://images.viblo.asia/5618f735-09ae-4c24-b65d-b0bcd859f98f.jpg)

**Bước 2:** Nhập keyword “TestNG” vào ô search textbox và click button “Go” :

![](https://images.viblo.asia/9f2e4b2f-59f9-499f-8acf-230bb7b536a1.jpg)

**Bước 3:** Sau khi user clicks button “Go” , các kết quả khớp với từ khóa tìm kiếm sẽ được hiển thị . Hãy chọn bản TestNG tương ứng và click button "Install" để bắt đầu cài đặt:

![](https://images.viblo.asia/0a423c3d-4f68-44d9-9c02-80d347445a09.jpg)

**Bước 4:** Trong quá trình cài đặt sẽ hiển thị confirm popup, click button "Confirm" trên popup này để tiếp tục quá trình cài đặt :

![](https://images.viblo.asia/f8106362-cc6e-44b2-a2c3-c8a7565dfe19.jpg)

**Bước 5:**  Trong bước tiếp theo, ứng dụng sẽ nhắc bạn chấp nhận giấy phép và sau đó nhấp vào nút "Finish" .

**Bước 6:** Việc cài đặt được bắt đầu ngay lúc này và hiển thị tiến trình như sau:

![](https://images.viblo.asia/e72b7b91-334e-49b5-b5fe-f73dedca39e9.jpg)

Sau khi cài đặt xong nên khởi động lại Eclipse để phản ánh những thay đổi đã thực hiện.

Khi khởi động lại, người dùng có thể xác minh cài đặt TestNG bằng cách điều hướng đến “Preferences” (Ưu tiên) từ tùy chọn “Window” trên thanh menu. Tham khảo hình dưới đây:

![](https://images.viblo.asia/b593b341-69d7-40d4-8e58-92b218874d12.jpg)

![](https://images.viblo.asia/9507b485-cf0c-49bc-a99f-edbc65f78cd0.jpg)

### Tạo TestNG project mẫu

**Bước 1:** Click File  ->  New -> Chọn Java Project:

![](https://images.viblo.asia/e12f4761-c3ab-409e-a98e-0fc17197a79c.jpg)

**Bước 2:** Nhập tên project với tên là "Demo TestNG" -> button Next -> button Finish, và dự án Java của bạn đã sẵn sàng.

![](https://images.viblo.asia/0bad5762-973c-4ec4-96fd-884ac9e0226f.jpg)

**Bước 3:** Bước tiếp theo là cấu hình thư viện TestNG cho project java vừa tạo. Click tap “Libraries” của mục Configure Build Path. Click button “Add library” :

![](https://images.viblo.asia/1560af28-9070-4f95-a0bc-5c9c44106a1a.jpg)

**Bước 4:** Người dùng sẽ bị lệ thuộc vào hộp thoại quảng bá để chọn thư viện cấu hình. Chọn TestNG và click và button "Next" như thể hiện ở hình bên dưới. Ở quá trình kết thúc, click button “Finish”

![](https://images.viblo.asia/0975cab4-c07f-4210-bd4f-bccf9ced25b2.jpg)

OK, vậy là TestNG đã được thêm vào dự án Java và các thư viện cần thiết có thể được tìm thấy trong gói khi mở rộng cây sơ đồ :

![](https://images.viblo.asia/f6c6599a-0ded-4cc7-bf81-0447159effe4.jpg)

Bạn có thể add thêm bất kỳ thư viện nào bạn muốn theo cách trên.

### Tạo TestNG class

**Bước 1 :** Mở rộng mục “DemoTestNG” project -> click chuột phải vào “src” folder ->  "New" -> "Other" :

![](https://images.viblo.asia/6835319c-9433-42ff-88fa-2b24ea2a791e.jpg)

**Bước 2 :** Mở rộng mục "TestNG" và chọn option “TestNG class" và click nút “Next” :

![](https://images.viblo.asia/ee676d60-a8a1-4577-b293-77aa04546dd7.jpg)

Cung cấp các thông tin cần thiết như ảnh dưới đây. Chỉ định thư mục Nguồn (Source folder), tên gói (Package name) và tên lớp (Class name) và nhấp vào nút "Finish" :

![](https://images.viblo.asia/4a037560-3aac-4711-af21-2cf2365d0222.jpg)

Lớp TestNG được đề cập ở trên sẽ được tạo bằng lược đồ mặc định :

![](https://images.viblo.asia/f550445c-f78c-4db7-b197-227dd61037ec.jpg)

Đã có nền tảng cơ bản cho tập lệnh kiểm tra TestNG, bây giờ chúng ta sẽ thêm các mã kiểm tra thực tế theo kịch bản dưới đây.

**Scenario:**

* Khởi chạy trình duyệt và mở trang gmail.com.
* Xác nhận tiêu đề của trang và in kết quả xác minh.
* Nhập tên người dùng và mật khẩu.
* Nhấp vào nút Đăng nhập.
* Đóng trình duyệt web.

**Code:**

```
package TestNG;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;
import org.testng.annotations.Test;
 
public class DemoTestNG {
       public WebDriver driver = new FirefoxDriver();
       String appUrl = "https://accounts.google.com";
 
@Test
public void gmailLogin() {
             // launch the firefox browser and open the application url
              driver.get("https://gmail.com");
              
// maximize the browser window
              driver.manage().window().maximize();
              
// declare and initialize the variable to store the expected title of the webpage.
              String expectedTitle = " Sign in - Google Accounts ";
              
// fetch the title of the web page and save it into a string variable
              String actualTitle = driver.getTitle();
              Assert.assertEquals(expectedTitle,actualTitle);
              
// enter a valid username in the email textbox
              WebElement username = driver.findElement(By.id("Email"));
              username.clear();
              username.sendKeys("TestSelenium");
 
// enter a valid password in the password textbox
              WebElement password = driver.findElement(By.id("Passwd"));
              password.clear();
              password.sendKeys("password123");
              
// click on the Sign in button
              WebElement SignInButton = driver.findElement(By.id("signIn"));
              SignInButton.click();
              
// close the web browser
              driver.close();
}
}
```

**Giải thích mã code liên quan đến TestNG**

* @Test là một trong những chú thích TestNG (**TestNG annotation**). Chú thích này cho phép trình thực thi chương trình biết rằng phương thức được chú thích là @Test là một phương thức thử nghiệm. Để có thể sử dụng các chú thích TestNG khác nhau, chúng ta cần import gói annotation : `import org.testng.annotations.*`
* Không cần hàm `main ()` trong khi tạo tập lệnh thử nghiệm bằng TestNG. Việc thực hiện chương trình được thực hiện trên cơ sở các chú thích.
* Trong statement, chúng ta sử dụng lớp Assert khi so sánh giá trị mong đợi và giá trị thực. Lớp Assert được sử dụng để thực hiện các lệnh xác minh khác nhau. Để có thể sử dụng các assertion khác nhau, chúng ta bắt buộc phải import gói assert : `import org.testng.Assert`

### Thực thi kịch bản test TestNG 

Kịch bản kiểm thử TestNG có thể được thực thi theo cách sau:

=> Nhấp chuột phải vào bất cứ nơi nào trong lớp thuộc trình soạn thảo hoặc lớp java trong cây sơ đồ của gói, chọn option "Run As" -> “TestNG Test” :

![](https://images.viblo.asia/616044eb-c50d-40e1-a0db-6cd3dc6a35f5.jpg)

Kết quả TestNG được hiển thị thành hai cửa sổ:

* Cửa sổ điều khiển
* Cửa sổ kết quả TestNG

![](https://images.viblo.asia/6970ad40-7491-4a23-95a4-dae21e46b1a9.jpg)

![](https://images.viblo.asia/cc571e7d-11b2-4a95-9f3f-a54e0cea746e.jpg)

### HTML Reports

TestNG đi kèm với khả năng tuyệt vời trong việc tạo các báo cáo HTML dễ đọc và dễ hiểu cho người dùng để thực hiện kiểm tra. Các báo cáo này có thể xem được trong bất kỳ trình duyệt nào và nó cũng có thể được xem bằng trình duyệt build trong Eclipse.

**Các bước để tạo file HTML report**

**Bước 1:** Thực thi lớp TestNG mới được tạo. Refresh dự án có chứa lớp TestNG bằng cách nhấp chuột phải vào dự án và chọn option "Refresh".

**Bước 2:** Một thư mục có tên là “test-output” sẽ được tạo trong dự án ở cấp độ thư mục của "src". Mở rộng thư mục “test-output” -> chọn file “emailable-report.html” và mở file này trên trình duyệt Eclipse. Tệp HTML này chính là kết quả của việc thực thi kịch bản test trên (lớp TestNG).

![](https://images.viblo.asia/c8efaeb7-3829-43ca-8516-f3478354fb75.jpg)

![](https://images.viblo.asia/e264e606-ec26-4801-ac15-48325c351ea3.jpg)

**Bước 3:** Báo cáo HTML sẽ được mở trong môi trường eclipse như dưới đây :

![](https://images.viblo.asia/72ffc778-a773-44a4-ae0b-247f5b0e6533.jpg)

### Cài đặt độ ưu tiên trong TestNG

```
package TestNG;
import org.testng.annotations.*;
public class SettingPriority {
 
@Test(priority=0) //độ ưu tiên đầu tiên -> chạy method1() đầu tiên
public void method1() {
 }
 
@Test(priority=1)
public void method2() {
 }
 
@Test(priority=2)
public void method3() {
 }
}
```

Đoạn mã set độ ưu tiên sẽ được đặt trong annotation `@Test` , với cú pháp @Test(priority={expected_order}) (expected_order : 0 .... N , số càng nhỏ thì độ ưu tiên càng lớn). Trong ví dụ trên thì trình tự thực hiện sẽ là :
* Method1
* Method2
* Method3

**Annotations** : Các annotation của TestNG cũng giống với JUnit, bạn có thể vào đây để xem lại list các Annotation hay dùng : https://viblo.asia/p/gioi-thieu-ve-nen-tang-junit-framework-va-cach-su-dung-no-trong-selenium-script-selenium-tutorial-11-Eb85on48l2G

Bài trên có thể còn có sai sót, nếu bạn quan tâm có thể tham khảo bài viết gốc tại đây :
https://www.softwaretestinghelp.com/testng-framework-selenium-tutorial-12/