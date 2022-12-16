### 1. Jenkins là gì?

Jenkins là một phần mềm tự động hoá, mã nguồn mở viết bằng Java. Jenkins giúp tự động hoá các quy trình trong phát triển phần mềm, hiện nay được gọi theo thuật ngữ "Tích hợp liên tục", còn được dùng đến trong việc "Phân phối liên tục". Jenkins là một phần mềm dạng server, chạy trên nền servlet với sự hỗ trợ của Apache Tomcat. Nó hỗ trợ hầu hết các phần mềm quản lý mã nguồn phổ biến hiện nay như Git, SVN,...Jenkins cũng hỗ trợ các mã lệnh của Shell và Windows Batch, đồng thời còn chạy được các mã lệnh của Apache Ant, Maven, Gradle,...

 ##### Lợi ích khi sử dụng Jenkins với Selenium
 - Sử dụng Selenium với Jenkins cho phép bạn chạy test mỗi khi phần mềm có thay đổi.
 - Bạn có thể đặt lịch để chạy test tự động ở những thời gian cụ thể.
 - Jenkins giúp lưu lại lịch sử và test report sau mỗi lần chạy.
 - Hỗ trợ maven để xây dựng và chạy một dự án tích hợp liên tục.

### 2. Maven là gì?
Maven là một công cụ quản lý và xây dựng dự án rất mạnh mẽ, chủ yếu dành cho các lập trình viên java, nhưng nó cũng có thể được dùng để xây dựng và quản lý các dự án dùng C#, Ruby,... Maven dùng khái niệm POM (Project Object Model) để mô tả thông tin dự án, thông tin cấu hình cho Maven như mô tả việc build project, các thành phần phụ thuộc, các module. Nó định nghĩa trước các target cho việc khai báo task, trình biên dịch, đóng gói và thứ tự hoạt động để mọi việc diễn ra tốt nhất.

##### Lợi ích khi sử dụng Maven với Selenium
- Maven được sử dụng để cấu trúc dự án, quản lý các thành phần phụ thuộc trong dự án.
- Sử dụng pom.xml để cấu hình các phụ thuộc cần thiết cho việc xây dựng và chạy mã thử nghiệm
- Maven tự động tải xuống các phụ thuộc cần thiết từ kho lưu trữ trong khi xây dựng dự án.
Bạn có thể tìm kiếm các phụ thuộc tại đây: https://mvnrepository.com/

### 3. Cài đặt Maven và tạo một Maven project

Trong bài tìm hiểu này, chúng ta sẽ sử dụng Eclipse để xây dựng một dự án kiểm thử sử dụng Selenium WebDriver với Maven. Sau đây chúng ta sẽ cùng tìm hiểu về cách cài đặt Maven trên Eclipse và tạo một Maven project.

Bước 1: Trong Eclipse, chọn  Help -> Install New Software -> sau đó nhập đường dẫn này http://download.eclipse.org/technology/m2e/releases/ vào Work with để thực hiện cài đặt Maven cho eclipse

![](https://images.viblo.asia/a72bee95-bcfa-4715-962b-d222f68cf2b0.png)

Bước 2: Sau khi cài đặt xong Maven, tiếp theo chúng ta sẽ tạo thử một Maven project như sau: Chọn tạo mới project -> chọn Maven Project

![](https://images.viblo.asia/35198c75-3e9e-4aa2-8e4d-618df4f36aef.png)

Chọn Create a simple project

![](https://images.viblo.asia/e1551320-30e5-4263-bb67-07ebd098862f.png)

 sau đó nhập Group Id và Artifact Id
 
![](https://images.viblo.asia/46f234f1-06ea-4bc3-b76c-339a4f00597a.png)

sau khi tạo xong, project sẽ có cấu trúc như sau:

![](https://images.viblo.asia/39407fba-c6dd-4dc3-aca0-509f70c074f8.png)

Bước 3: Thêm các phụ thuộc Selenium, Maven và Junit vào file pom.xml, sau đó maven sẽ tự động tải các phụ thuộc này về folder JRE System Library

```java
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>SeleniumWithJenkins</groupId>
	<artifactId>SeleniumWithJenkins</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<dependencies>
		<!-- https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java -->
		<dependency>
			<groupId>org.seleniumhq.selenium</groupId>
			<artifactId>selenium-java</artifactId>
			<version>3.141.59</version>
		</dependency>
		<!-- https://mvnrepository.com/artifact/io.github.bonigarcia/webdrivermanager -->
		<dependency>
			<groupId>io.github.bonigarcia</groupId>
			<artifactId>webdrivermanager</artifactId>
			<version>3.3.0</version>
		</dependency>
		<!-- https://mvnrepository.com/artifact/junit/junit -->
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>
		<!-- https://mvnrepository.com/artifact/org.testng/testng -->
		<dependency>
			<groupId>org.testng</groupId>
			<artifactId>testng</artifactId>
			<version>7.0.0</version>
			<scope>test</scope>
		</dependency>
	</dependencies>
	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.7.0</version>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
					<encoding>UTF-8</encoding>
				</configuration>
			</plugin>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-surefire-plugin</artifactId>
				<version>2.19.1</version>
			</plugin>
		</plugins>
	</build>
</project>
```

Bước 4: Sau khi đã tạo xong project và có đầy đủ dependencies, chúng ta hãy cùng tạo một thử nghiệm đơn giản với trang google.com như sau.

Trong project, tạo mới một class TestNG và thêm đoạn code như sau:
```java
package test;

import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

import org.testng.annotations.BeforeClass;

import static org.junit.Assert.assertTrue;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;

public class SimpleTest {

	public static WebDriver driver;

	@Test
	public void f() {
		// search một đoạn text
		driver.findElement(By.xpath("//*[@id='tsf']//div[2]/input")).sendKeys("viblo");
		driver.findElement(By.xpath("//*[@id='tsf']//div[2]/input")).sendKeys(Keys.ENTER);
		assertTrue(driver.getTitle().contains("viblo - Tìm với Google"));
	}

	@BeforeClass
	public void beforeClass() {
		WebDriverManager.chromedriver().setup();
		driver = new ChromeDriver();
		driver.get("https://www.google.com/");
	}

	@AfterClass
	public void afterClass() {
		driver.close();
		driver.quit();
	}
    
}

```

Bước 5: Sử dụng Maven để chạy test: Chuột phải vào project -> Run As -> Maven test
![](https://images.viblo.asia/cbe20956-667d-4cb5-a625-ac60de325ed7.png)

Kết quả sau khi chạy sẽ như sau:
![](https://images.viblo.asia/a8eb06ee-f352-4b4c-988d-c27bff554d32.png)

### 4. Cấu hình Jenkins và chạy test qua Jenkins

Các bạn có thể tải Jenkins tại đây:  http://jenkins-ci.org/ và cài đặt Jenkins lên máy bạn.

Sau khi cài đặt xong, chúng ta có thể mở Jenkins trên trình duyệt với đường dẫn: http://localhost:8080/. Sau đó login và chọn New Item để tạo một CI job

![](https://images.viblo.asia/1c367504-a9d9-48a8-9687-4d2c686af834.png)

Nhập tên job và chọn Maven Project 
![](https://images.viblo.asia/05c871e5-2337-4ac2-b656-b2b9b656ad91.png)

Sau khi tạo xong job, Jenkins sẽ đưa bạn tới trang cấu hình cho project này: http://localhost:8080/job/SeleniumWithJenkins/configure
Chúng ta sẽ tới phần Build và cấu hình như sau:
- Trong Root POM, chỉ tới đường dẫn file pom.xml trong project bên trên
- Trong Goals and options section, nhập "clean test"

![](https://images.viblo.asia/6dd45759-49d2-4c0b-b65e-fff40534388f.png)

Lưu lại cài đặt, vậy bây giờ chúng ta có thể chạy thử nghiệm dự án bên trên bằng cách chọn Build Now để build project. Maven sẽ build dự án và TestNG sẽ được sử dụng để chạy thử nghiệm.
![](https://images.viblo.asia/b26e94ff-51f5-4136-bd36-87f4c730bfe8.png)

Sau khi chạy build xong, Jenkins sẽ cung cấp cho chúng ta kết quả và lịch sử các lần build.
![](https://images.viblo.asia/6655eac8-c3b9-4946-a7dd-cba90dc6639b.png)

Chúng ta có thể xem kết quả đầy đủ của các lần chạy test bằng cách ấn vào các lần build được đánh số thứ tự, hoặc cũng có thể xem kết quả lần chạy cuối cùng bằng cách chọn "Latest Test Result", kết quả sẽ hiển thị đầy đủ như sau:

![](https://images.viblo.asia/bc1e8ab8-f184-45d7-8311-e8477e37a6fc.png)

##### Lên lịch để chạy tự động trên Jenkins
Jenkins hỗ trợ chúng ta có thể thiết lập thời gian để có thể chạy tự động các bản build dựa trên thời gian đã được thiết lập.
Ví dụ bạn muốn Jenkins kích hoạt chạy thử nghiệm dự án một cách tự động vào 22 giờ đêm hằng ngày, chúng ta có thể cài đặt như sau:
![](https://images.viblo.asia/67637ddd-1092-4911-b64c-c72cb3b25932.png)

Jenkins sử dụng biểu thức [cron](https://en.wikipedia.org/wiki/Cron#CRON_expression) để thiết lập thời gian và có các trường như sau:
- Minutes: số phút trong 1 giờ (0-59)
- Hours: số giờ trong 1 ngày (0-23)
- DayMonth: số ngày trong 1 tháng (1-31)
- Month: số tháng trong 1 năm (1-12)
- DayWeek: số ngày trong 1 tuần (0-7)

Ví dụ ta có thể đặt lịch chạy cứ 15p một lần như sau: H/15 * * * *
 
 Qua bài này, mong rằng các bạn sẽ biết được sơ qua về Jenkins, từ đó có thể phát triển thêm để sử dụng Jenkins trong dự án test của mình, giúp tối ưu hóa dự án và làm giảm thời gian thực hiện test.

Tài liệu tham khảo:

https://www.guru99.com/maven-jenkins-with-selenium-complete-tutorial.html
https://www.blazemeter.com/blog/how-to-setup-and-run-selenium-tests-in-jenkins-using-maven-and-junit/