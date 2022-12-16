Trong bài trước chúng ta đã tìm hiểu về appium và cách  tạo một project cơ bản về appium ([link](https://viblo.asia/p/tim-hieu-ve-appium-va-cach-cai-dat-appium-QpmlegYrKrd)). Vậy làm sao để có thể thao tác trên các phần tử của web, app một cách tự động? Trong bài này chúng ta sẽ tìm hiểu về UIAutomatorViewer, một công cụ GUI dùng để lấy và kiểm tra các phần tử trong ứng dụng Android. Bây giờ chúng ta sẽ cùng tìm hiểu về UIAutomatorViewer.
### 1. UIAutomatorViewer là gì ?

UIAutomatorViewer là công cụ cung cấp GUI thuận tiện để phân tích các thành phần UI được hiển thị trên thiết bị Android. Bạn có thể sử dụng công cụ này để kiểm tra phân cấp bố cục và xem các thuộc tính của các thành phần hiển thị trên màn hình của thiết bị.

### 2. Cách sử dụng UIAutomatorViewer

   **Bước 1:** UIAutomatorViewer là một phần của trình quản lý Android SDK, vì vậy ta có thể bật UIAutomatorViewer bằng cách vào đường dẫn `c:\users\<username>\\AppData\Local\Android\Sdk\tools\bin` và chạy file `uiautomatorviewer.bat` 
    
   ![](https://images.viblo.asia/95545008-8011-4173-9e29-a856e4020afa.PNG)
    
  Hoặc dùng  command prompt và mở UIAutomatorViewer lên với câu lệnh: `uiautomatorviewer `
    
   ![](https://images.viblo.asia/16fd3251-cb5e-4f4c-937a-7ae569d002d3.PNG) 
    
    
 **Bước 2:**    Khởi chạy máy ảo android bằng trình quản lý máy ảo AVD Manager, trong bài này chúng ta sẽ thực hành với ứng dụng Caculator trên máy ảo Android, vì vậy ta sẽ bật ứng dụng Caculator lên sau khi khởi chạy máy ảo thành công.
     
 **Bước 3:** Trên giao diện UIAutomatorViewer, ấn chọn 'Device screenshot' để tải và chụp lại giao diện của ứng dụng Caculator.
    
![](https://images.viblo.asia/e1e3563e-5afd-46bc-a069-92e4cbc7cc29.PNG)
    
 **Bước 4:**  Sau khi tải xong, ứng dụng Caculator sẽ mở với giao diện như bên dưới:
    
![](https://images.viblo.asia/ca682750-a107-4471-91a9-ed506f4b28bf.PNG)
    
 Từ giao diện này, ta có thể dễ dàng lấy được các thuộc tính của từng  phần tử trên ứng dụng như `text, id, class, package,...`
 Bây giờ di chuột lên bất cứ điểm nào trên ảnh chụp màn hình thiết bị, bạn sẽ thấy một số thông tin được hiển thị bên phải công cụ.
 
 Sau đây chúng ta hãy cùng tìm hiểu xem UIAutomatorViewer hoạt động như thế nào nhé.
*  Đầu tiên khi bạn ấn chọn 'Device screenshot', thì UIAutomatorViewer sẽ ghi lại thông tin của tất cả các đối tượng trên màn hình ở dạng XML
*  Sau đó nó chụp ảnh màn hình của màn hình thiết bị ở dạng PNG
*  Cuối cùng khi hai điều trên được hoàn thành, nó sẽ hiển thị tất cả các thông tin lên trên UI.

Trên giao diện của UIAutomatorViewer, ta sẽ thấy có 3 phần chính như sau:

![](https://images.viblo.asia/72d7ba4d-b897-4c42-91e6-145e2d598ef6.png)

1.  Hiển thị ảnh chụp màn hình thiết bị. Đây là hình ảnh tương tác, vì vậy bạn có thể nhấp hoặc di con trỏ chuột lên bất kỳ yếu tố nào trên ảnh chụp màn hình.
2.  Hiển thị toàn bộ cấu trúc XML của màn hình, từ đây ta có thể thấy được loại của từng  phần tử là button, text,...và tên của nó, tọa độ nó.
3.  Hiển thị chi tiết thông tin của từng element, bất kỳ phần tử nào được chọn sẽ được hiển thị toàn bộ thông tin như text, id, class,...lên khung này.
    
### 3. Một số cách lấy element sử dụng UIAutomatorViewer.

Dưới đây là một số định danh quan trọng mà chúng ta thường sử dụng để xác định thành phần trên ứng dụng.

![](https://images.viblo.asia/831efb2b-eaed-440b-8a76-d73473b14cc1.PNG)

Sau đây là một số ví dụ về cách lấy phần tử sử dụng một trong các định danh trên
1. Tìm một phần tử sử dụng ID
```java 
driver.findElement(By.id("com.android.calculator2:id/op_add"));
```
2. Tìm một phần tử sử dụng Accessibility ID 
```java
driver.findElementByAccessibilityId("plus");
```
3. TÌm một phần tử sử dụng Class Name
```java
driver.findElements(By.className("android.widget.Button"));
```
4. Tìm một phần tử sử dụng XPath
```java
driver.findElement(By.xpath("//android.widget.Button[contains(@resource-id,'op_add')]"));

//OR

driver.findElement(By.xpath("//*[resource-id,'op_add']"));
```

### 4. Thực hành với ứng dụng đơn giản

Các bạn đọc đến đây cũng có nghĩa là chúng ta đã đi hết bài tìm hiểu về UIAutomatorViewer. Vậy chúng ta hãy cùng thực hành nội dung trong bài đọc với một ứng dụng đơn giản trên Caculator để hiểu thêm về bài đọc nhé.
Như ở bài trước, chúng ta đã khởi chạy được ứng dụng Caculator lên trên thiết bị thông qua appium server. Tiếp theo đó hôm nay chúng ta sẽ viết một đoạn code automation thực hiện 1 phép toán đơn trên ứng dụng Caculator áp dụng các cách xác định phần tử bên trên.

Bài toán: Thực hiện tính 2+3 và in kết quả ra màn hình

Các bạn theo dõi đoạn code sau:
```java 
package appiumtest;

import java.net.URL;

import org.openqa.selenium.By;
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
		cap.setCapability("deviceName", "Nexus5"); //tên devices
		cap.setCapability("uid", "emulator-5554"); //uid lấy từ commandline: "abd devices"
		cap.setCapability("platformName", "Android");
		cap.setCapability("platformVersion", "8.1.0"); //vào setting -> about phone -> android version
		cap.setCapability("appPackage", "com.android.calculator2"); //tên gói của ứng dụng, lấy trong bước 2 bên trên
		cap.setCapability("appActivity", "com.android.calculator2.Calculator"); //thông tin Launcher activity lấy trong bước 3
		
		URL url = new URL("http://127.0.0.1:4723/wd/hub"); //khởi tạo url để kết nối với máy chủ appium server
		driver = new AppiumDriver<MobileElement>(url, cap); //sẽ chạy Caculator app trên thiết bị Android sử dụng các cài đặt bên trên
		System.out.println("Syestem started.....");
		
        //xác định phần tử sử dụng XPath
		MobileElement two = driver.findElement(By.xpath("//android.widget.Button[contains(@resource-id,'digit_2')]")); 
		two.click();
        //xác định phần tử sử dụng AccessibilityId
		MobileElement plus = driver.findElementByAccessibilityId("plus");
		plus.click();
        //xác định phần tử sử dụng ID
		MobileElement three = driver.findElement(By.id("com.android.calculator2:id/digit_3"));
		three.click();
		MobileElement equals = driver.findElement(By.id("com.android.calculator2:id/eq"));
		equals.click();
		MobileElement result = driver.findElement(By.id("com.android.calculator2:id/result"));
        //In ra kết quả tính được
		System.out.println("Result: " + result.getText());
	}
}
```

Trên đây là toàn bộ đoạn code thực hiện phép toán tính tổng. Sau khi chạy chương trình ta có kết quả như sau:

![](https://images.viblo.asia/078fa89d-7a50-4246-9a08-e8a9e9211f9f.PNG)

Kết thúc bài đọc, mong rằng bài đọc có ích, giúp các bạn có thể bắt đầu sử dụng công cụ UIAutomatorViewer để thực hành tự động hóa trên thiết bị di động Android với Appium.

Nguồn tham khảo:

http://www.automationtestinghub.com/uiselector-android/
https://www.guru99.com/uiautomatorviewer-tutorial.html