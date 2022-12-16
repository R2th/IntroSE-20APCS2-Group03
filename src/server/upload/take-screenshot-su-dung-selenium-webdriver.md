### 1/ Mục đích:
Evidence là một khái niệm rất quen thuộc trong lĩnh vực kiểm thử. Trong kiểm thử thủ công hay kể cả kiểm thử tự động, việc lấy evidence cũng vô cùng quan trọng, nó là bằng chứng xác minh những kết quả test trong testcase hoặc là trong các Bug ticket. Một cách để lấy evidence mà mọi người hay thực hiện đó là thực hiện capture hình ảnh kết quả test trên màn hình. Vậy trong kiểm thử tự động, khi thực hiện những testcase tự động thì làm như thế nào để có thể capture được hình ảnh kết quả test. Qua bài này, mình sẽ hướng dẫn các bạn cách take screen shot sử dụng Selenium WebDriver

### 2/ Xây dựng class TakeSnapShot:
Ở phần này, mình sẽ tạo 1 class có tên là `TakeSnapShot`,  class này sẽ chứ một phương thức đó là `takeSnapShot(WebDriver webdriver, String fileWithPath)` với 2 tham số như trên.

**Step1:** import các thư viện liên quan:
```
import org.apache.commons.io.FileUtils; // FileUtils thực hiện các chức năng đọc, ghi, copy, so sánh file 
import org.openqa.selenium.OutputType; // Thực hiện capture screenshot và lưu trữ tại nơi chỉ định
import org.openqa.selenium.TakesScreenshot; // Thực hiện capture screenshot và lưu trữ tại nơi chỉ định
```

**Step2:**  Chuyển đối tượng WebDriver sang TakeScreenshot

`TakesScreenshot scrShot = ((TakesScreenshot) webdriver);`

<br>

**Step3:** Sử dụng phương thức `getScreenshotAs` để có thể capture screenshot và tạo file image:

`File SrcFile=scrShot.getScreenshotAs(OutputType.FILE);`

<br>

**Step4:** Chuyển file image đã được capture vào thư mục chúng ta chỉ định:

`File DestFile = new File(fileWithPath);` // Instance đối tượng `DestFile`

`FileUtils.copyFile(SrcFile, DestFile);` // Chuyển file image từ `SrcFile` sang `DestFile`

<br>

Các bạn có thể tham khảo full đoạn code dưới đây:

![](https://images.viblo.asia/0bdaf636-b650-4e10-a814-4f9f390bde62.png)

### 3/ Thực hiện capture screen shot trong các testcase:

Mình có 1 testcase như ở hình dưới:

![](https://images.viblo.asia/cdb673df-54a8-42f1-8d3f-6c652b80240e.png)

Mình sẽ thực hiện việc capture screenshot cho 3 step ở trong testcase:
 + Go to Login Page
 + Doing Login action with valid User name and password
 + Verify Result

Bằng cách gọi lại phương thức `takeSnapShot()` để thực hiện việc capture image:

![](https://images.viblo.asia/589fe51c-4f86-4011-8376-5c3862871e81.png)

Như vậy image ở của 3 step trên sẽ được lưu ở thư mục chỉ định trong hình: `/home/vudn/Desktop/ScreenShot/image_file_name.png`

Sau khi chạy testcase trên sẽ được kết quả như dưới:

![](https://images.viblo.asia/138f47bc-65a5-48fb-ad10-6acc65d92461.png)

outputtest01.png:
![](https://images.viblo.asia/e3e73706-93fa-43df-9cd7-d218dd464558.png)

outputtest02.png:
![](https://images.viblo.asia/a4f8b136-8b1b-4c30-b37c-dfd6f2ec272d.png)

outputtest03.png:
![](https://images.viblo.asia/e9a0a90c-249b-4965-b59e-5ca830afecf7.png)

### 4/ Kết luận:
Mình đã giới thiệu với các bạn cách sử dụng Selenium WebDriver để có thể capture image cho các test case tự động. Ngoài ra còn có các plugin khác hỗ trợ cho việc này. Các bạn có thể tìm hiểu thêm ở trên các diễn đàn về Selenium.

Tham khảo:

1/ http://www.seleniumeasy.com/selenium-tutorials/take-screenshot-with-selenium-webdriver

2/ https://www.guru99.com/take-screenshot-selenium-webdriver.html

Cảm ơn các bạn đã quan tâm bài viết của mình.