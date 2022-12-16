# Appium là gì?
APPIUM là framework mã nguồn mở để kiểm thử UI cho các ứng dụng di động. Appium cho phép thử nghiệm ứng dụng native, hibrid và ứng dụng web, hỗ trợ test automation trên các thiết bị cũng như cả emulator hoặc simulator. Nó còn hỗ trợ kiểm thử cross-platform , tức là API đơn hoạt động cho kiểm thử Android và iOS.

APPIUM KHÔNG phụ thuộc vào hệ điều hành thiết bị di động. Bởi vì APPIUM có khung hoặc trình bao bọc dịch các lệnh Selenium WebSearch thành các lệnh UIAutomation (iOS) hoặc UIAutomator (Android) tùy thuộc vào loại thiết bị, hệ điều hành nào.

Appium hỗ trợ tất cả các ngôn ngữ có Selenium client librarie như- Java, Objective-C, JavaScript với node.js, PHP, Ruby, Python, C #, v.v.

Trong hướng dẫn này, chúng ta sẽ tìm hiểu về: 

* APPIUM hoạt động như thế nào?
* Điều kiện tiên quyết để sử dụng APPIUM
* Cài đặt máy tính để bàn Appium:
* Appian Inspector
* Đính kèm Trình giả lập Android với Appium
* Trường hợp kiểm tra APPIUM cho ứng dụng Android gốc (Máy tính)
* Hạn chế sử dụng APPI
* Các lỗi thường gặp và các bước khắc phục sự cố trong Appium

# APPIUM hoạt động như thế nào?

* Appium là một 'HTTP Server' được viết bằng nền tảng Node.js và điều khiển iOS và phiên Android sử dụng giao thức dây JSON của Webdo. Do đó, trước khi khởi chạy Máy chủ Appium, Node.js phải được cài đặt sẵn trên hệ thống.
* Khi Appium được tải xuống và cài đặt, thì máy chủ sẽ được thiết lập trên máy của chúng tôi hiển thị API REST.
* Nó nhận được kết nối và yêu cầu lệnh từ máy khách và thực hiện lệnh đó trên thiết bị di động (Android / iOS).
* Nó phản hồi lại với các phản hồi HTTP. Một lần nữa, để thực hiện yêu cầu này, nó sử dụng các khung tự động kiểm tra di động để điều khiển giao diện người dùng của các ứng dụng. Một khung như: -
* Apple Cụ cho iOS (Dụng cụ chỉ khả dụng trong Xcode 3.0 trở lên với OS X v10.5 trở lên)
* Google UIAutomator cho Android API cấp 16 trở lên
* Selendroid cho API Android cấp 15 trở xuống

# Điều kiện tiên quyết để sử dụng APPIUM

1. Cài đặt ANDROID SDK (Studio) 
2. Cài đặt JDK (Bộ phát triển Java)
3. Cài đặt Eclipse
4. Cài đặt TestNg cho Eclipse 
5. Cài đặt máy chủ Selenium 
6. Appium Client Library
7. APK App Info on Google Play
8. js (Không bắt buộc - Bất cứ khi nào máy chủ Appium được cài đặt, theo mặc định, nó đi kèm với "Node.exe" & NPM. Nó được bao gồm trong phiên bản hiện tại của Appium.)
9. Install Appium Desktop

Cài đặt  Appium Desktop:
Appium Studio là một ứng dụng GUI nguồn mở để cài đặt Máy chủ Appium. Nó đi kèm với tất cả các điều kiện tiên quyết để cài đặt và sử dụng Máy chủ Appium. Nó cũng có Thanh tra để nhận thông tin cơ bản trên Ứng dụng của bạn. Nó đi kèm với một Trình ghi để tạo mã soạn sẵn để tự động hóa các ứng dụng di động của bạn.

### Bước 1) 
Truy cập http://appium.io/ và nhấp vào Tải xuống Appium.

![](https://images.viblo.asia/788f0556-c069-4be1-b25c-1ce4cdd246f8.png)

### Bước 2) 
Đối với Windows, chọn tệp exe và tải xuống. Tệp khoảng 162 MB sẽ mất thời gian để tải xuống dựa trên tốc độ internet của bạn.

![](https://images.viblo.asia/fe049fe6-b5c8-4c3e-9a1a-c8e7d62d6021.png)

### Bước 3) 
Nhấp vào exe đã tải xuống.

![](https://images.viblo.asia/c0137cfa-1db4-481f-bf64-1eb93e40ec35.png)

### Bước 4) 
Trên máy Windows, không cần cài đặt Appium. Nó chạy trực tiếp từ exe. Khi bạn nhấp vào exe, bạn sẽ thấy hình ảnh sau đây trong vài phút.

![](https://images.viblo.asia/9e70d37c-e1a8-4d47-ad81-058947bd3306.gif)

Đối với Mac, bạn cần cài đặt dmg

### Bước 5) 
Tiếp theo bạn sẽ thấy Cửa sổ khởi động máy chủ. Nó điền vào tùy chọn máy chủ và cổng mặc định mà bạn có thể thay đổi. Nó cũng đề cập đến phiên bản của Appium đang được sử dụng.

![](https://images.viblo.asia/cb767d70-455a-419a-826c-cd8788bc3e54.png)

### Bước 6) 
Khi nhấp vào nút Máy chủ Bắt đầu, một máy chủ mới được khởi chạy trên máy chủ và cổng được chỉ định. Đầu ra nhật ký máy chủ được hiển thị.

![](https://images.viblo.asia/88672e40-556e-4d39-a65d-2a8da858da5e.png)

### Bước 7) 
Nhấp vào Cửa sổ Phiên mới .

![](https://images.viblo.asia/8195857b-6fd6-466b-8b4d-f488348e810e.png)

### Bước 8) 
Bạn có thể nhập Khả năng mong muốn và bắt đầu một phiên.

![](https://images.viblo.asia/3a59de6a-1dc8-4bb6-9e2c-27a13da9d012.png)

# Appian Inspector

Tương tự như công cụ ghi và phát lại Selenium IDE, Appium có 'Inspector' để ghi và phát lại. Nó ghi lại và phát hành vi ứng dụng gốc bằng cách kiểm tra DOM và tạo các tập lệnh thử nghiệm bằng bất kỳ ngôn ngữ nào bạn muốn. Tuy nhiên, hiện tại, không có hỗ trợ cho Thanh tra Appium cho Microsoft Windows. Trong Windows, nó khởi chạy Appium Server nhưng không kiểm tra các phần tử. Tuy nhiên, trình xem UIAutomator có thể được sử dụng như một tùy chọn để Kiểm tra các phần tử.

Các bước để bắt đầu với Appium Inspector trên máy Mac: -

### Bước 1) 
Tải xuống và khởi động máy chủ Appium của bạn với Địa chỉ IP mặc định 0.0.0.0 và cổng 4725.

Chọn tệp nguồn hoặc tệp .app từ cục bộ để kiểm tra.
Kiểm tra hộp kiểm 'Đường dẫn ứng dụng' để bật nút 'Chọn'.

### Bước 2) 
Bây giờ, bấm vào nút 'Chọn' sẽ cung cấp tùy chọn để duyệt và chọn tệp kiểm tra từ ổ đĩa cục bộ.

![](https://images.viblo.asia/1c167b25-b06c-4f4e-a8a0-a316e8581710.png)

### Bước 3) 
Khởi động Trình mô phỏng trên máy Mac.

### Bước 4)
Nhấp vào nút 'Khởi chạy' từ góc trên bên phải, cho phép biểu tượng màu xanh lam. Một lần nữa, nhấp vào biểu tượng màu xanh này, nó sẽ mở Trình kiểm tra và Trình mô phỏng Appium với một ứng dụng được chọn trước.


![](https://images.viblo.asia/719237f2-0628-4a39-afb6-d3644a192ae9.png)

### Bước 5) 
- Khởi chạy Trình kiểm tra Appium của bạn sẽ hiển thị phân cấp thành phần trong cấu trúc theo cột. Ngoài ra, người dùng có thể áp dụng các hành động bằng các nút như Tap, Swipe, v.v.

![](https://images.viblo.asia/2c613574-0338-4b49-b4e3-deac5c6a1783.png)

### Bước 6) 
Nhấp vào nút 'Dừng' để dừng ghi âm.

# Attach Android Emulator cho Appium

### Bước 1) 
Cài đặt SDK Android trong hệ thống của bạn.

Chuyển đến Bảng điều khiển >> Hệ thống và Bảo mật >> Hệ thống và từ bảng điều khiển bên trái, nhấp vào Settings Cài đặt hệ thống nâng cao '. Từ 'Thuộc tính hệ thống' bật lên, nhấp vào tab 'Nâng cao' và sau đó nhấp vào nút "Biến môi trường".

![](https://images.viblo.asia/6dcb0f1c-84c8-4c26-8144-3da19a4ad437.png)

### Bước 2) 
Bây giờ, từ 'Biến môi trường' bật lên, 'nhấp đúp chuột vào' Đường dẫn 'và đặt biến ANDROID_HOME trỏ đến thư mục SDK của bạn. Trong đường dẫn nối thêm toàn bộ đường dẫn thư mục SDK.

ví dụ: `C: \ Người dùng \ ABC \ Máy tính để bàn \ adt-bundled-windows-x86_64-20140321 \ sdk`

![](https://images.viblo.asia/46ba7608-5639-4adf-811a-667fb3af6c1a.png)

### Bước 3) 
Khởi động trình giả lập Android hoặc bất kỳ thiết bị Android nào gắn vào hệ thống của bạn (Đảm bảo bạn đã bật tùy chọn Gỡ lỗi Android trong thiết bị Android của mình. Để kiểm tra Tùy chọn gỡ lỗi. Đi đến Cài đặt thiết bị >> Tùy chọn nhà phát triển >> Kiểm tra "Tùy chọn gỡ lỗi" ).

### Bước 4) 
Mở Dấu nhắc lệnh và điều hướng đến thư mục \ platform-tools \ của SDK Android (Ví dụ: D: \ adt-bundle-windows-x86_64-20130514 \ sdk \ platform-tools).

### Bước 5) 
- Chạy lệnh 'adb thiết bị'. Bạn có thể thấy thiết bị được kết nối của mình được liệt kê trong cửa sổ Dấu nhắc Lệnh. (Trong CMD ghi '> thiết bị adb'- Lệnh này sẽ liệt kê các phiên bản trình giả lập được kết nối. Ví dụ: adb hès giả lập-5554 cài đặt <Vị trí của tệp .apk>)

![](https://images.viblo.asia/601c50fb-d2d4-4744-b436-17c704a0c2c7.png)

### Bước 6)
- Chạy lệnh 'adb start-server'. Nó sẽ khởi động máy chủ ADB sẽ được Appium sử dụng để gửi lệnh đến thiết bị Android của bạn.

### Bước 7) 
Bây giờ, điều hướng đến thư mục Appium trong hệ thống của bạn và bắt đầu Appium bằng cách nhấp vào tệp Appium.exe.

### Bước 8) 
Không thay đổi địa chỉ IP hoặc số cổng và nhấp vào nút 'Khởi chạy'. Bảng điều khiển Appium của bạn bắt đầu từ 127.0.0.1:4723 như hiển thị bên dưới.

![](https://images.viblo.asia/5f75f7c1-a12a-4bf9-8184-795b19c2cb32.png)

### Bước 9) 
Nhấp vào nút 'Bắt ​​đầu', máy chủ Appium bắt đầu chạy trên hệ thống của bạn.

Trường hợp kiểm tra APPIUM cho ứng dụng Android gốc (Máy tính)
### Bước 1) 
Tải xuống plugin nhật thực ADT hoặc tải xuống gói ADT riêng tại đây

### Bước 2) 
Mở Eclipse và tạo một dự án mới >> Gói >> Lớp

### Bước 3) 
Nhập thư viện Selenium và Testng bên trong dự án mới đó.

### Bước 4) 
Bây giờ Tạo Chương trình thử nghiệm nhỏ cho 'Calculator.app' để tổng hai số.

```
gói src_Appium; 
nhập java.net.MalformedURLException; 
nhập java.net.URL; 
nhập org.openqa.selenium.By; 
nhập org.openqa.selenium.WebDriver; 
nhập org.openqa.selenium.WebEuity; 
// nhập org.openqa.selenium.remote.CapabilityType; 
nhập org.openqa.selenium.remote.DesiredCapabilities; 
nhập org.openqa.selenium.remote.RemoteWebDriver; 
nhập org.testng.annotations. *; 


Máy tính lớp công khai { 
Trình điều khiển WebDriver; 

@B BeforeClass 
void void setUp () ném MalformedURLException { 
	// Thiết lập các khả năng mong muốn và chuyển gói hoạt động ứng dụng và gói ứng dụng Android cho Appium 
	DesiredCapabilities ability = new DesiredCapabilities ();
	ability.setCapability ("BROWSER_NAME", "Android"); 
	ability.setCapability ("VERSION", "4.4.2"); 
	ability.setCapability ("deviceName", "Trình giả lập"); 
	ability.setCapability ("platformName", "Android"); 
 
   
   ability.setCapability ("appPackage", "com.android.calculator2"); 
// Tên gói này của ứng dụng của bạn (bạn có thể lấy nó từ ứng dụng thông tin apk) 
	ability.setCapability ("appActivity", "com.android.calculator2.Calculator"); 
   trình điều khiển = new RemoteWebDriver (URL mới ("http://127.0.0.1:4723/wd / hub "), khả năng);

   // định vị Văn bản trên máy tính bằng cách sử dụng By.name () 
   WebEuity Two = driver.findEuity (By.name ("2")); 
   hai.click (); 
   WebEuity plus = driver.findEuity (By.name ("+")); 
   dấu cộng.click (); 
   WebEuity bốn = driver.findE bổ sung (By.name ("4")); 
   bốn.click (); 
   WebEuity bằngTo = driver.findE bổ sung (By.name ("=")); 
   bằngTo.click (); 
   // xác định vị trí hộp chỉnh sửa của máy tính bằng cách sử dụng By.tagName () 
   WebEuity results = driver.findEuity (By.tagName ("EditText")); 
	// Kiểm tra giá trị tính toán trên hộp chỉnh sửa
khẳng định kết quả.getText (). bằng ("6"): "Giá trị thực tế là:" + results.getText () + "không khớp với giá trị mong đợi: 6"; 

} 

@AfterClass 
công khai void void () { 
	// đóng trình điều khiển ứng 
	dụng.quito (); 
} 
}
```

# Những mặt hạn chế của APPI

Appium không hỗ trợ thử nghiệm Phiên bản Android thấp hơn 4.2
Hỗ trợ hạn chế để thử nghiệm ứng dụng lai. ví dụ: không thể kiểm tra hành động chuyển đổi của ứng dụng từ ứng dụng web sang nguồn gốc và ngược lại.
Không hỗ trợ để chạy Appium Inspector trên Microsoft Windows.

Nguồn: https://www.guru99.com/introduction-to-appium.html