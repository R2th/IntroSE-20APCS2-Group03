**Overview**
1. Gói thư viện của selenium (libraries)
2. Import các thư viện selenium vào dự án
3. Driver của các trình duyệt (Chrome, Firefox, MSEdge)
4. Viết đoạn code mở trang web Google

Sau đầy là chi tiết của từng bước:

**1. Gói thư viện của selenium (libraries)**

* ĐI tới website: https://www.selenium.dev/downloads/, kéo xuống vào download gói thư viện như hình
![image.png](https://images.viblo.asia/b2578a45-2718-42c0-98a4-c6a22d20fd92.png)

* Giải nén và chúng ta chỉ import những file jar được khung đỏ như hình

![image.png](https://images.viblo.asia/dc5ab970-49b6-4a70-b99e-ca889ec9f99a.png)

**2. Import các thư viện selenium vào dự án**

* Để import, chọn **File > Project Structure > Libraries** và l như hình
![image.png](https://images.viblo.asia/70f80c4b-2e27-4650-8bac-e21b04623c00.png)

**3. Driver của các trình duyệt (Chrome, Firefox, MSEdge)**
Để tương tác với các trình duyệt cần phải có những driver. Chúng ta có thể download dễ dàng từng cái theo tên sau: chromedriver (Chrome browser), geckodriver (Firefox browser), msedgedriver (Microsoft Edge browser).
Hướng dẫn download cho Chrome, các trình duyệt khác cũng làm tương tự

![image.png](https://images.viblo.asia/ed009adc-0f0e-4489-849d-8a787e5c2943.png)

 Sau khi download về bạn có thể lưu trữ ở một nơi dễ chỉ đến bởi đường dẫn, vd: D:\BrowserDriver\chromedriver.exe
 
 **4. Viết đoạn code mở trang web Google**
 
 Viết một đoạn code như hình, sau đó chạy như  một chương trình Java bình thường, bạn sẽ thấy một trình duyệt bật lên và tự động đi đến trang Google (như vậy là thành công rồi).
 
 ![image.png](https://images.viblo.asia/a4a597ef-268e-465d-8d26-209882a216f3.png)
 

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
public class Main {
    public static void main(String[] args) {
	// write your code here
        System.out.println("Hello Selenium.");
        System.setProperty("webdriver.chrome.driver", "D:/Selenium/BrowsersDriver/chromedriver_win32_92/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com/");
    }
}
```