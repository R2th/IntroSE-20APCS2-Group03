Xin chào mọi người, đây cũng là bài đầu tiên mình viết ở Viblo. Mình cũng là người mới với automation test, tập tành viết và chia sẻ những gì mình học được. Có gì sai sót mong nhận được góp ý từ mọi người rất nhiều!

Trong bài viết này mình hướng tới là người lần đầu tiên viết kịch bản automation test với selenium. Mong là cảm thấy bài viết hữu ích :D 
## Ý tưởng kịch bản
Chúng ta sẽ bắt đầu với 1 kịch bản đơn giản về search từ khóa ở google

- Bước 1: Mở trình duyệt google.com
- Bước 2: Search từ khóa "banh trang tron" 
- Bước 3: Tắt trình duyệt


## Môi trường
Trước khi viết kịch bản đầu tiên cho automation test tool với selenium bạn cần cài đặt

- JDK 11
- IDE Java (trong bài viết mình sử dụng Intelli J IDEA)
- Maven (trong bài viết mình sử dụng Apache Maven 3.8.1)
## Bắt đầu tạo project đầu tiên
Tạo project automation test với selenium đầu tiên
![](https://images.viblo.asia/9c400ea4-3da0-4449-a9dc-1e0345c7610f.png)


Chọn Maven, chọn project SDK là phiên bản mà bạn vừa tải
![image.png](https://images.viblo.asia/1b796643-487b-4a86-bbbc-9dcbe271b1b4.png)

Để khởi tạo project maven bạn cần điền một số thông số sau:
- Name: tên của project
- Location: vị trí lưu project của bạn
- Artifact Coordinates:
- GroudId: thường là viết ngược tên miền của các tổ chức ví dụ: tên miền của selenium là selenium.org thì groupId sẽ là org.selenium
- ArtifactId: tên project ở trong công ty, artifactId có thể trùng nhau nếu như có groupId khác nhau. Bởi vì, nhiều công ty có thể làm chung cùng 1 project

**Cấu trúc điển hình của project Maven sẽ gồm những mục như sau trong đó:**
- Root: chưa file pom.xml và các thứ mục con khác. 
- File pom.xml (POM: Project Object Model) chứa khai báo của các dependency cho một project.
-  src/main/java: đây thường là phần để các developer viết code phát triển dự án
- src/test/java: đây là thư mục chứa các file test java như JUnit, Selenium,…
- src/test/resources: chứa các resources cần thiết cho việc test. Ví dụ như: driver

![image.png](https://images.viblo.asia/fe7ad7d4-8219-4a07-818e-50e45b943732.png)

Selenium hỗ trợ chiều loại browser, trong bài này mình sẽ sử dụng Chrome browser nên mình sẽ download chromedriver (Link: ChromeDriver – WebDriver for Chrome – Downloads (chromium.org) )

![image.png](https://images.viblo.asia/1a01c720-0f98-4d2e-8e4f-00a780426f24.png)

Hiện tại, ChromeDriver đang có 3 bản current release. Trước khi download, bạn cần kiểm tra lại phiên bản Chrome mà máy mình đang dùng để download driver đúng phiên bản. Nếu down sai phiên bản sẽ không chạy được.

Sau khi down về bạn hãy giải nén.  Tạo thư mục resources để lưu chromedriver.exe bạn vừa tải. Sau đó hãy copy chromedriver.exe bạn vừa mới tải ở trước vào thư mục này.


Sau đó chúng ta sẽ tạo một java class ở phần folder test

![image.png](https://images.viblo.asia/92fb7ef3-06b2-4abf-adb7-6fc3f81c95e2.png)

Trước tiên, bạn cần phải thêm dependence vào project maven bạn vừa tạo.

Bạn thêm phần dependency này vào trong file pom.xml

```
<dependencies>
   <dependency>
       <groupId>org.seleniumhq.selenium</groupId>
       <artifactId>selenium-java</artifactId>
       <version>3.141.59</version>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>org.seleniumhq.selenium</groupId>
       <artifactId>selenium-api</artifactId>
       <version>3.141.59</version>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>junit</groupId>
       <artifactId>junit</artifactId>
       <version>4.13.2</version>
       <scope>test</scope>
   </dependency>
</dependencies>
```

## Viết kịch bản đầu tiên với Selenium tool
Sau đó bắt đầu viết những dòng test đầu tiên ở class FirstSeleniumTest đã tạo trước đó.

```
public class FirstSeleniumTest {

    @Test
    public  void firstTest() {

        // Cho hệ thống biết đường dẫn để tìm chromedriver.exe
        System.setProperty("webdriver.chrome.driver", "resources/chromedriver.exe");

        // Tạo webdriver mới cho ChromeDriver
        WebDriver driver = new ChromeDriver();

        //Bật trình duyệt
        driver.navigate().to("http://www.google.com/");

        // Click vào khung search và điền giá trị 
        driver.findElement(By.name("q")).sendKeys("banh trang tron");

        // Click vào nút search
        driver.findElement(By.name("btnK")).click();

        // Tắt trình duyệt
        driver.quit();

    }

}
```

Sau đó hãy chạy thử chương trình mà bạn vừa tạo.

Khi chạy xong, code sẽ tự động chạy lần lượt các câu lệnh mà bạn đã viết, bật trình duyệt mà bạn trỏ tới, như bài viết là mở trình duyệt google và search từ khóa “banh trang tron” sau đó tắt trình duyệt.



Vậy là đã hoàn thành xong kịch bản test đơn giản đầu tiên trong automation test với selenium tool.

Xem thêm các bài viết của mình về automation tại: [Blog GirlsCanCode](https://girlscancode.blog/)

Link bài viết liên quan: [Tổng quan về Selenium tool cho người mới bắt đầu](https://girlscancode.blog/tong-quan-ve-selenium-cho-nguoi-moi-bat-dau/)