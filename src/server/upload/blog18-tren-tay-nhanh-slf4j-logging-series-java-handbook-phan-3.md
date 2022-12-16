![image.png](https://images.viblo.asia/7b89d60b-d1f0-4994-8b82-e74569d1b370.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Hôm nay mình sẽ lướt qua nhanh chóng một số thứ đơn giản nhất về **SLF4j**.

**Ghi log** là một phần rất quan trọng trong lập trình. Nó sẽ giúp một lập trình viên biết được vị trí ứng dụng bị lỗi. Bài viết này sẽ giúp bạn **ghi log** bằng SLF4j.

Định nghĩa
----------

**Logging [Facade](https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html#facade-pattern)** [](https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html#facade-pattern)đơn giản cho Java (SLF4J) đóng vai trò như một **[Facade](https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html#facade-pattern)** đơn giản hoặc **[Abtraction](https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html#abstract-factory-pattern)** cho các framework logging khác nhau, chẳng hạn như java.util.logging, logback và log4j. SLF4J cho phép người dùng framework logging những gì mình muốn tại thời điểm _triển khai_.

(Về các **Pattern** như **[Facade](https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html#facade-pattern)** hay **[Abtraction](https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html#abstract-factory-pattern),** **_[Factory](https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html#factory-method-pattern)_** mình cũng đã có bài viết cụ thể về vấn đề này bạn có thể tham khảo để biết thêm một số [Design Pattern cơ bản mà dev nào cũng nên biết](https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html))

Cách sử dụng SLF4j.
-------------------

Yêu cầu
-------

Để sử dụng SLF4j, chúng ta cần thêm ba phụ thuộc vào tệp pom.xml.

*   _slf4j-api.jar_
*   _logback-core.jar_
*   _logback-classic.jar_

Làm thế nào để Logging?
-----------------------

Chúng ta cần tạo một **instance** của **Logger** được truy xuất bằng cách gọi hàm **_getLogger_** tĩnh từ lớp **_Logger[Factory](https://tuan200tokyo.blogspot.com/2022/10/blog10-gioi-thieu-ve-javascript-design.html#factory-method-pattern)_**.

Cú pháp:

`Logger logger = LoggerFactory.getLogger ("className");`

_ClassName_ là tên của lớp mà việc logging được thêm vào. _ClassName_ này trở thành tên của trình **logging**.

Bây giờ sử dụng **instance** này, chúng ta có thể ghi **log**.

Ví dụ:

`logger.debug ("Hello world.");`

Trong ví dụ trên, hàm **debug** được sử dụng để ghi lại thông tin. Có nhiều hàm khác nhau có thể được sử dụng để ghi lại thông tin. Mọi hàm đều có ý nghĩa và có thể được hiển thị theo các **level** khác nhau được đặt trong tệp _logback.xml_.

Các hàm logging khác:

*   trace()
*   debug()
*   info()
*   warn()
*   error()

DONE :D

Kiến trúc của Logback
---------------------

Logback được chia thành ba mô-đun thường được gọi là logback-core, logback-classic và logback-access. Logback được xây dựng dựa trên ba lớp chính tức là Logger, Appender và Layout. Lớp Logger là một phần của mô-đun logback-classic. Appender và Layout là một phần của logback-core.

**Cấu hình trong logback**

Như đã đề cập trong tài liệu chính thức, khi logback tự cấu hình và nó sẽ thực hiện theo các bước dưới đây.

1.  Logback cố gắng tìm một tệp có tên _logback-test.xml_ trong classpath.
2.  Nếu không tìm thấy tệp nào như vậy, logback sẽ cố gắng tìm tệp có tên _logback.groovy_ trong classpath.
3.  Nếu không tìm thấy tệp nào như vậy, nó sẽ test tệp _logback.xml_ trong classpath.
4.  Nếu không tìm thấy tệp nào như vậy, service-provider (được giới thiệu trong JDK 1.6) sẽ được sử dụng để giải quyết việc triển khai giao diện `com.qos.logback.classic.spi.Configurator` bằng cách tra cứu tệp META-INF\\services\\ch.qos.logback.classic.spi.Configurator trong classpath. Nội dung của nó nên chỉ định tên lớp đủ điều kiện của việc triển khai `Configurator` như mong muốn.
5.  Nếu không có cách nào ở trên thành công, logback sẽ tự động cấu hình bằng cách sử dụng `[BasicConfigurator](https://logback.qos.ch/xref/ch/qos/logback/classic/BasicConfigurator.html)` nó sẽ ghi log và chuyển hướng đến **console** (Mặc định là **console**).

**Appender Tag**

Appender là một **component** có nhiệm vụ ghi các sự kiện **logging**. Trong thẻ appender, chúng ta có thẻ **encoder**, trong đó chúng ta chỉ định định dạng của thông báo logging trong thẻ mẫu. Có hai loại appender là _console_ và _file_. Appender có hai tên thuộc tính và lớp xác định đó là trình _file appender_ hay _console appender_. Chúng ta sẽ sử dụng thẻ **encoder** trong khi xác định các phần phụ như được cung cấp bên dưới. Về cơ bản, nó được sử dụng để chuyển đổi **event** ghi **log** thành _byte array_ và _ghi log_ trên outputStream.

**Console Appender**

Nhìn tên thôi là biết nó sẽ ghi **log** lên **console**.

```xml
<configuration>
  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <!-- encoders are assigned the type
         ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
    <encoder>
      <pattern>%-4relative [%thread] %-5level %logger{35} - %msg %n</pattern>
    </encoder>
  </appender>

  <root level="DEBUG">
    <appender-ref ref="STDOUT" />
  </root>
</configuration>
```

Thuộc tính **name** của **appender** là **_STDOUT_** đại diện cho _appender_ là _console appender_. Trong thuộc tính class, chúng ta chỉ định lớp của _console appender_. **File Appender** nó sẽ **ghi log** vào tệp. Nếu _appender_ là _file appender_, thì nó có thẻ _file_ có đường dẫn đến nơi lưu trữ tệp **logging**.

```xml
<configuration>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>testFile.log</file>
        <!-- encoders are assigned the type
            ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
        <encoder>
            <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
        </encoder>
    </appender>
        
    <root level="DEBUG">
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

**Tham khảo Tài liệu**

chính thức của SL4J.

**Roudup**

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog18-tren-tay-nhanh-slf4j-logging.html