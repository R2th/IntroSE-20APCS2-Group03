## I. Selenium là gì?

Selenium là một công cụ mã nguồn mở để kiểm tra tự động các các ứng dụng web. Nó có khả năng hoạt động trên các trình duyệt và hệ điều hành khác nhau. Selenium là tập hợp các công cụ giúp người kiểm tra tự động hóa các ứng dụng dựa trên web hiệu quả hơn. Kiểm tra được thực hiện bằng công cụ Selenium thường được gọi là Selenium Testing.
-	Các kịch bản thử nghiệm có thể được viết bằng bất kỳ ngôn ngữ lập trình nào: Java, Python, C #, PHP, Ruby, Perl & .Net và Kotlin. 
-	Selenium có thể chạy trên nhiều HĐH như: Windows, Mac hoặc Linux.
-	Các thử nghiệm có thể được thực hiện bằng bất kỳ trình duyệt nào: Mozilla Firefox, Internet Explorer, Google Chrome, Safari hoặc Opera.
-	Selenium có thể được tích hợp tốt với các framework như TestNG & JUnit để quản lý các Testcase và report.
-	Selenium có thể được tích hợp với Maven, Jenkins & Docker để đạt được Thử nghiệm liên tục.

## II. Kotlin là gì?

- Kotlin là một ngôn ngữ lập trình kiểu tĩnh chạy trên máy ảo Java (JVM) và có thể được biên dịch sang mã nguồn javascript hay sử dụng cơ sở hạ tầng trình biên dịch LLVM. Nó được giới thiệu bởi JetBrains, nhà thiết kế chính thức của Java IDE thông minh nhất, có tên IntelliJ IDEA.
- Nó kết hợp lập trình hướng đối tượng và các tính năng chức năng vào nền tảng duy nhất, có nghĩa là nó có các khả năng hoạt động như java cũng như javascript.
- Không như nhiều người lầm tưởng, Kotlin có thể được dùng để phát triển mọi thứ như java chứ không chỉ để phát triển Android.

- Tại sao google công bố kotlin là chính thức thay vì ngôn ngữ riêng “GO Lang”?
    - Năm 2017, Google công bố kotlin là ngôn ngữ chính thức của Android vì các tính năng của kotlin.
    - Các tính năng của Kotlin:
        - Kotlin  tương thích hoàn toàn với Java.
        - Kotlin ngắn gọn hơn Java.
        - Kotlin an toàn hơn.
        - Kotlin đi kèm với một complier thong minh hơn và an toàn hơn.
        - Kotlin rất dễ để bảo trì
        - Kotlin được tạo ra để tang năng suất cho developer.
        - Kotlin hỗ trợ tốt hơn cho Funtional Programming.
        - Kotlin có null trong Type System.

## III. Cài đặt và sử dụng Kotlin

- Để có thể sử dụng Selenium và Kotlin bạn phải chắc chắn rằng máy của mình đã cài JDK.
    - Các bạn có thể download JDK tại https://www.oracle.com/technetwork/java/javase/downloads/index.html
- Các bạn chọn phiên bản phù hợp với hệ điều hanh của mình để cài vào máy sau đó set biến JAVA_HOME. 
- Sau đó các bạn download Selenium cho java tại địa chỉ
https://www.seleniumhq.org/download/

- Tiếp theo là cài đặt IDE để làm việc. Nếu bạn thích Eclipse thì các bạn có thể cài Plugin có tên gọi: Kotlin plugin for Eclipse. 
- Nếu các bạn muốn 1 IDE tốt hơn thì có thể download IntelliJ IDEA tại địa chỉ: https://www.jetbrains.com/idea/download/

- Các bạn lưu ý là IntelliJ IDEA sẽ có phiên bản trả phí và miễn phí. Các bạn có thể lựa chọn theo nhu cầu của mình.

## IV. TestScript đầu tiên với Kotlin và Selenium

- Để tạo 1 project mới trong IntelliJ IDEA các bạn làm như sau:
    - Chọn File -> New -> Project
    - Một cửa sổ hiện ra, các bạn chọn Kotlin -> Kotlin/JVM
    ![](https://images.viblo.asia/70130c9d-cab1-426e-be83-9af4b85f39a7.png)
    - Sau đó các bạn điền tên Project. Cuối cùng là bấm Finish.
    ![](https://images.viblo.asia/24663979-6b80-48b6-9fd5-48db6d465ab0.png)
 
- Để có thể sử dụng được Selenium thì các bạn phải add file Selenium.jar mà trước đó đã tải về vào Libaries.
- Các bạn Chọn File -> Project Structure -> Cửa sổ hiện ra chọn tiếp vào tab Libaries.
- Kế tiếp chọn dấu (+) ở góc trên màn hình rồi chọn Java và dẫn đến file thư viện Selenium.
![](https://images.viblo.asia/2d023461-2ead-4b11-a675-a8e4b3557591.png)

- Tiếp theo tạo mới một Kotlin File
![](https://images.viblo.asia/ac1176a3-85b9-4a00-b3b6-14aa29393d8d.png)
- Đặt tên File giống quy tắc đặt tên file Java.
![](https://images.viblo.asia/3181d61a-4766-4e19-975e-2bb9989846d7.png)

- Nội dung file như sau:
    ```

    import org.openqa.selenium.WebDriver
    import org.openqa.selenium.chrome.ChromeDriver
    import org.openqa.selenium.firefox.FirefoxDriver
    fun main(args: Array<String>) {
        println("Hello Kotin and Selenium")
        // Set Path
        System.setProperty("webdriver.chrome.driver","F:\\Kotlin\\chromedriver.exe")
        val driver:WebDriver = ChromeDriver()
        driver.get("https://howtomate.github.io")
    }

    ```
    - Kết quả sau khi chạy
    ![](https://images.viblo.asia/c8a709bb-5d26-4754-9ecf-217cfdc6bfa8.png)
    
##     V. Tài liệu tham khảo
   - Kotlin selenium Tutorial:  https://chercher.tech/kotlin-selenium/kotlin-selenium