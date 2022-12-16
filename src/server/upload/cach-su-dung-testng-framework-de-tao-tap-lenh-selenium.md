TestNG là một testing framework - nó cải tiến những hạn chế của một testing framework phổ biến khác gọi là JUnit. TestNG (Next Generation) có nghĩa là "Thế hệ kế tiếp".  Hầu hết người dùng Selenium sử dụng nó nhiều hơn Junit vì lợi ích của nó. Có rất nhiều tính năng của TestNG, nhưng chúng ta sẽ chỉ tập trung vào những thứ quan trọng nhất mà chúng ta có thể sử dụng trong Selenium.

**Các tính năng của TestNG**

* Hỗ trợ cho các chú thích
* Hỗ trợ tham số
* Phương pháp thực hiện trước mà không yêu cầu phải tạo các bộ kiểm tra
* Hỗ trợ kiểm tra dữ liệu bằng cách sử dụng Dataproviders
* Cho phép người dùng thiết lập các ưu tiên thực hiện cho các phương pháp thử
* Dễ dàng hỗ trợ tích hợp với các công cụ và plug-in khác nhau như công cụ xây dựng (Ant, Maven vv), Môi trường phát triển tích hợp (Eclipse).
* Tạo báo cáo hiệu quả bằng ReportNG

**TestNG so với JUnit**

* Có nhiều ưu điểm khác nhau làm cho TestNG vượt trội so với JUnit. Một số trong số đó là:
* Chú thích dễ hiểu
* Các mẫu thực thi có thể được thiết lập
* Thực hiện kiểm thử song song
* Có thể đặt các phụ thuộc cho trường hợp thử nghiệm


Chú thích được đặt trước bởi một biểu tượng "@" trong cả hai TestNG và JUnit.

**Cài đặt TestNG trong Eclipse**

**Bước 1:**  Mở Eclipse IDE -> Chọn Help -> Chọn “Eclipse Marketplace..”

![](https://images.viblo.asia/6702d515-a8ca-444b-9d15-65a449803eb9.jpg)

**Bước 2:**  Nhập "TestNG" ở ô search textbox và click "Go" button 

![](https://images.viblo.asia/0d11334e-8afb-4c6a-902f-ac820b51c6bd.jpg)

**Bước 3:**  Sau khi click "Go",  các kết quả khớp với chuỗi tìm kiếm sẽ được hiển thị -> Click "Install" button để cài đặt TestNG.

![](https://images.viblo.asia/620ae97e-5d9e-41be-b933-e9a6b4c3e07a.jpg)

**Bước 4:**  Click "Confirm" button

![](https://images.viblo.asia/01d7b6a5-0595-4f30-840a-fd435bef8e76.jpg)

**Bước 5:**   Lúc này quá trình download diễn ra, và TestNG sẽ được cài đặt sau đó

![](https://images.viblo.asia/3d881b58-8189-4e33-aa27-d8a908fc8901.jpg)


**Tạo TestNG project**

**Bước 1:**  Click File -> Click New -> Chọn Java Project

![](https://images.viblo.asia/f0a0da71-a70f-4ea4-a473-ac215f529a16.jpg)

**Bước 2:**  Tạo tên project là "DemoTestNG" -> Click "Next" button -> Click "Finish" button như vậy Java project được tạo xong

![](https://images.viblo.asia/8389932c-eb80-4571-8a34-5e5b94493a8a.jpg)

**Bước 3:**  Bước tiếp theo là cấu hình thư viện TestNG vào dự án Java mới được tạo. Click “Libraries” tab bên dưới Configure Build.  Click " Add library”

![](https://images.viblo.asia/1e465b70-aac4-4b89-b730-41542ee926d8.jpg)

**Bước 4:**  Dialog để chọn thư viện được configured hiển thị. Clicl " TestNG"  -> Click "Next" button -> Click "FInish" button

![](https://images.viblo.asia/87eeb470-2537-4273-a188-712709e58751.jpg)

TestNG đã được add vào Java project.

![](https://images.viblo.asia/53b2de91-5ceb-4b54-8ef0-50c9809b823e.jpg)


**Tạo TestNG class**

**Bước 1:**  Expand the “DemoTestNG” project và truy cập và "src" folder. Nhấp chuột phải vào "src" và navigate đến New -> Other

![](https://images.viblo.asia/e5f412c5-9d1b-452c-90d2-5960f654243e.jpg)

**Bước 2:**  Expand TestNG option và chọn  “TestNG” class -> click  “Next” button.

![](https://images.viblo.asia/a5d4d4dc-9357-46be-b156-8908d85832cc.jpg)

**Scenario:**

* Khởi chạy trình duyệt và mở  “gmail.com”.
* Xác nhận tiêu đề của trang 
* Nhập tên người dùng và mật khẩu.
* Clcik vào nút Đăng nhập.
* Đóng trình duyệt web.

**Code:**

```
1
package TestNG;
2
import org.openqa.selenium.By;
3
import org.openqa.selenium.WebDriver;
4
import org.openqa.selenium.WebElement;
5
import org.openqa.selenium.firefox.FirefoxDriver;
6
import org.testng.Assert;
7
import org.testng.annotations.Test;
8
 
9
public class DemoTestNG {
10
       public WebDriver driver = new FirefoxDriver();
11
       String appUrl = "https://accounts.google.com";
12
 
13
@Test
14
public void gmailLogin() {
15
             // launch the firefox browser and open the application url
16
              driver.get("https://gmail.com");
17
              
18
// maximize the browser window
19
              driver.manage().window().maximize();
20
              
21
// declare and initialize the variable to store the expected title of the webpage.
22
              String expectedTitle = " Sign in - Google Accounts ";
23
              
24
// fetch the title of the web page and save it into a string variable
25
              String actualTitle = driver.getTitle();
26
              Assert.assertEquals(expectedTitle,actualTitle);
27
              
28
// enter a valid username in the email textbox
29
              WebElement username = driver.findElement(By.id("Email"));
30
              username.clear();
31
              username.sendKeys("TestSelenium");
32
 
33
// enter a valid password in the password textbox
34
              WebElement password = driver.findElement(By.id("Passwd"));
35
              password.clear();
36
              password.sendKeys("password123");
37
              
38
// click on the Sign in button
39
              WebElement SignInButton = driver.findElement(By.id("signIn"));
40
              SignInButton.click();
41
              
42
// close the web browser
43
              driver.close();
44
}
45
}
```

**Thực hiện the TestNG script**

Click chuột phải vào class, chọn "Run As" và click vào "TestNG Test".

![](https://images.viblo.asia/dd0555a7-9c31-47f9-921a-db3453f8f437.jpg)

Kết quả TestNG được hiển thị thành hai cửa sổ:
*  Console window
*  TestNG Result Window

![](https://images.viblo.asia/1b315d98-4302-42db-87df-51008cbf5815.jpg)

![](https://images.viblo.asia/c6680533-e1db-4f35-92a5-ffea4071e6e0.jpg)

**HTML Reports**

**Bước 1:**  Click chuột phải vào project -> chọn "Refresh"

**Bước 2:**  Một thư mục có tên là “test-output” được tạo ra trong "src" folder.  Expand  “test-output” folder và mở “emailable-report.html” file bằng Eclipse browser. 

![](https://images.viblo.asia/156ba83c-fccd-4a69-ba1b-2636dee5f7e4.jpg)

![](https://images.viblo.asia/1c337195-f119-4bdf-b650-17849b1ddf25.jpg)

**Bước 3:**  HTML report hiển thị như hình ảnh dưới đây

![](https://images.viblo.asia/02c54625-d236-4a9d-a92d-bc4710cea4d4.jpg)


Trên đây là chia sẻ của mình về cách sử dụng TestNG Framework để tạo tập lệnh Selenium. Cám ơn các bạn đã đọc, rất mong bài viết của mình có thể giúp đỡ phần nào những vướng mắc của các bạn!
 
 Link tham khảo:   https://techblog.vn/tim-hieu-ve-testng-framework-phan-1