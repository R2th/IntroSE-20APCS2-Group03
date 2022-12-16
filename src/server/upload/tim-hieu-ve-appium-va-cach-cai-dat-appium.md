### 1. Appium là gì
### 
Appium là một công cụ mã nguồn mở được sử dụng để kiểm thử tự động các ứng dụng dạng native app, mobile web app và hybrid app trên nền tảng iOS và Android.

Các ứng dụng native app là những ứng dụng được viết bằng iOS SDK, Android SDK hoặc Windows SDK. Các ứng dụng mobile web app là những ứng dụng web được truy cập bằng trình duyệt trên thuyết bị di động (ví dụ như truy cập qua Safari trên iOS hoặc Chrome trên Android). Ứng dụng hybrid app là ứng dụng được xây dựng bao quanh bởi một webview, cho phép người dùng có thể tương tác với nội dung web thông qua app.

![](https://images.viblo.asia/edb0f336-887d-4689-9f40-900f3d1c295c.jpg)

Điều quan trọng là Appium hỗ trợ đa nền tảng, cho phép bạn sử dụng cùng một API để viết kiểm thử tự động cho các nền tảng khác nhau (iOS, Android, Windows)

Appium hỗ trợ tất cả các ngôn ngữ có thư viện Selenium client như: Java, Objective-C, JavaScript với node.js, PHP, Ruby, Python,..

### 2. Appium hoạt động như thế nào?

Khi chúng ta thực thi các lệnh, một yêu cầu HTTP ở dạng JSON sẽ được gửi tới máy chủ Appium, sau đó máy chủ Appium gửi lệnh tới UIAutomator (với Android) hoặc Instruments (với iOS). Và sau đó các framework này sẽ thực thi lệnh trên các thiết bị Android, iOS và trả về kết quả.
- UIAutomator là một framwork của Android hỗ trợ chạy các test case trực tiếp bằng Junit trên thiết bị từ dòng lệnh
- Instruments được sử dụng để thực hiện nhiều hoạt động như lập hồ sơ, điều khiển và build ứng dụng iOS, nhưng nó cũng được sử dụng để hỗ trợ chúng ta có thể viết một số lệnh trong javascript sử dụng API UIAutomation để tương tác với  App.

![](https://images.viblo.asia/709e6bbb-74da-4090-acbe-a05a3e093570.jpg)

### 3. Các phần mềm cài đặt để tạo project Appium

- Cài đặt Android SDK (Studio)[[Link]](https://developer.android.com/studio#downloads)
- Cài đặt JDK (Java Development Kit) [[Link]](https://www.oracle.com/technetwork/java/jdk8-downloads-2133151.html)
- Cài đặt Eclipse [[Link]](https://www.eclipse.org/downloads/)
-  Cài đặt TestNG [[Link]](https://www.ecanarys.com/Blogs/ArticleID/169/How-to-Install-TestNG-framework-Step-by-Step-installation-process)
- Cài đặt Appium Desktop [[Link]](https://github.com/appium/appium-desktop/releases)

### 4. Cài đặt máy ảo

Bạn có thể tạo một máy ảo từ phần mềm Android Studio theo các bước sau:

- Bước 1: Mở configuration -> chọn AVD Manager

![](https://images.viblo.asia/8770fb20-a31a-44cc-a5c0-176432dd960b.png)

- Bước 2: Chọn tạo máy ảo

![](https://images.viblo.asia/0f2f240f-2ea3-4d8f-97ee-a92ce5a37513.PNG)

- Bước 3: Chọn thiết bị và version Android cần tải

![](https://images.viblo.asia/74707e0d-b06a-4d0e-9699-d945a5383f17.PNG)

- Bước 4: Cài đặt cấu hình cho máy ảo

![](https://images.viblo.asia/0910c1a8-7ca6-4b9a-98e7-d74049d78f05.PNG)

- Bước 5: Sau khi thực hiện xong các bước trên, ta sẽ có một máy ảo như hình dưới. Sau đó chúng ta cần bật chế độ Debug Developer trong setting.

  ![](https://images.viblo.asia/8e12394f-bf66-43b4-84ec-2aef14f8ff57.PNG)
  
- Bước 6: Để kiểm tra xem máy ảo đã thực sự được kết nối với máy tính chưa, mở command line và chạy lệnh sau:

![](https://images.viblo.asia/94de6bfb-6580-40a4-bb14-c4710c017565.png)
 
### 5. Tạo một dự án đơn giản

Sau khi cài đặt xong tất cả các phần mềm, bây giờ chúng ta sẽ thực hành tạo một dự án đơn giản với Caculator

1.  Tạo một project Maven trong Eclipse

![](https://images.viblo.asia/c14b5081-3be1-4bbb-aeac-46e4e5752e42.PNG)

![](https://images.viblo.asia/30ecbbce-501c-474a-b70a-97aef57df338.PNG)

2.  Mở file pom.xml trong project vừa tạo, thêm thư viện Selenium java và Appium java client vào phụ thuộc . Bạn có thể tìm các phiên bản của thư viện tại đây:
 - Selenium java: https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java
 - Appium java client: https://mvnrepository.com/artifact/io.appium/java-client

Sau khi có phiên bản của các thư viện, file pom.xml sẽ được thư viện vào như sau:
 
![](https://images.viblo.asia/b4a7c5fc-7e86-4719-bcb7-c91a60d39963.PNG)

3. Lấy thông tin của ứng dụng.

Để lấy thông tin của ứng dụng, các bạn cài 1 ứng dụng khác trên Google Play để có thể xem được thông tin của các ứng dụng khác. Ví dụ các bạn có thể cài App Info trên Google Play, sau khi cài xong chúng ta thực hiện theo những bước sau để lấy thông tin của ứng dụng:

- Bước 1: Chọn ứng dụng cần lấy thông tin
![](https://images.viblo.asia/6c552ac4-797f-45fb-860d-8a6b1aece57c.png)

- Bước 2: Lấy tên gói của ứng dụng
![](https://images.viblo.asia/6673f0b4-fe62-4eb4-9da6-56e4b065d4f3.png)
- Bước 3: Lấy thông tin của appActivity
![](https://images.viblo.asia/d5625b41-4706-418f-88b5-b313ce22cc4f.png)

4.  Bật Appium server

Chúng ta bật appium server lên, chuyển sang Advanced tab và đổi Server Address thành  “127.0.0.1”, sau đó ấn Start server và chờ appium server được chạy. Nếu bạn sử dụng thiết bị thật để chạy kiểm thử tự động thì ta có thể giữ nguyên cài đặt ban đầu, không cần thay đổi địa chỉ server.

![](https://images.viblo.asia/2cbdf187-fb6d-4305-9072-95c060c9e409.PNG)

5. Tạo một class đơn giản tên Caculator trong thư mục scr/java

Sau khi có thông tin ứng dụng, tạo một class đơn giản thử nghiệm với Caculator như sau:

```java
package appiumtest;

import java.net.URL;
import org.openqa.selenium.remote.DesiredCapabilities;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileElement;

public class Caculator {
	
	static AppiumDriver<MobileElement> driver;
	
	public static void main(String[] args) {
		try {
			openCaculator();
		} catch (Exception e) {
			System.out.println(e.getCause());
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}
	
	public static void openCaculator() throws Exception {
		DesiredCapabilities cap = new DesiredCapabilities();
		cap.setCapability("devicesName", "Galazy J5"); //tên devices
		cap.setCapability("uid", "4de4eef1"); //uid lấy từ commandline: "abd devices"
		cap.setCapability("platformName", "Android");
		cap.setCapability("platformVersion", "6.0.1"); //vào setting -> about phone -> android version
		cap.setCapability("appPackage", "com.sec.android.app.popupcalculator"); //tên gói của ứng dụng, lấy trong bước 2 bên trên
		cap.setCapability("appActivity", "com.sec.android.app.popupcaculator.Calculator"); //thông tin Launcher activity lấy trong bước 3
		
		URL url = new URL("http://127.0.0.1:4723/wd/hub"); //khởi tạo url để kết nối với máy chủ appium server
		driver = new AppiumDriver<MobileElement>(url, cap); //sẽ chạy Caculator app trên thiết bị Android sử dụng các cài đặt bên trên
		System.out.println("Syestem started.....");
	}
}
```

Sau cùng, chạy kiểm thử trên thiết bị Android đã cài đặt bên trên, ta chọn Run As -> Java Application

![](https://images.viblo.asia/bee3ae16-b759-425a-91ba-116beac47547.PNG)

Trên đây là toàn bộ các bước cần thiết để có thể tạo một ứng dụng tự động hóa với Appium, mong rằng các bạn đã cài đặt, cấu hình và chạy mã tự động hóa trên di động thành công.

Các bài viết tham khảo:

https://www.guru99.com/introduction-to-appium.html

https://www.swtestacademy.com/appium-tutorial/

http://appium.io/docs/en/about-appium/intro/?lang=en