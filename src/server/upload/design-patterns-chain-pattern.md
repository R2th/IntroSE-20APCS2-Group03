Giống như tên gọi, Chain giúp chúng ta tạo ra một chuỗi các object tiếp nhận yêu cầu. 
Mỗi một object trong Chain thường giữ tham chiếu nối tiếp tới một object khác.
Nếu một object không thể xử lý yêu cầu nhận được, nó sẽ gửi yêu cầu đó tới object tiếp theo.
Chain được xếp vào nhóm các pattern Hành Vi.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/634b8e18-c090-4435-86d8-7520d3b1a24a.png)

Ở đây chúng ta có một phần mềm tiện ích chuyên ghi nhật ký hệ thống. Đầu tiên chúng ta có
AbstractLogger với các mức độ thông báo. Sau đó chúng ta có 3 kiểu logger mở rộng AbstractLogger.
Mỗi logger sẽ kiểm tra mức độ của tin nhắn thông báo và so sánh với mức độ hoạt động của chính nó.
Nếu như mức độ cảnh báo phù hợp thì logger đó sẽ in thông báo ra màn hình,
hoặc nếu không thì sẽ chuyển tin nhắn thông báo đó tới logger tiếp theo.

`chainpattern/AbstractLogger.java`
```java
package chainpattern;

public abstract class AbstractLogger {
   public static int INFO  = 1;
   public static int DEBUG = 2;
   public static int ERROR = 3;

   protected int level;

   protected AbstractLogger nextLogger;

   public void setNextLogger(AbstractLogger nextLogger) {
      this.nextLogger = nextLogger;
   }

   public void logMessage(int level, String message) {
      if (this.level <= level) {
         write(message);
      }
      if (nextLogger != null) {
         nextLogger.logMessage(level, message);
      }
   }

   abstract protected void write(String message);
}
```

### Bước 2

Tạo các class logger.

`chainpattern/ConsoleLogger.java`
```java
package chainpattern;

public class ConsoleLogger
extends AbstractLogger {
   public ConsoleLogger(int level) {
      this.level = level;
   }

   @Override
   protected void write(String message) {
      System.out.println("Standard Console::Logger: " + message);
   }
}
```

`chainpattern/ErrorLogger.java`
```java
package chainpattern;

public class ErrorLogger
extends AbstractLogger {
   public ErrorLogger(int level) {
      this.level = level;
   }

   @Override
   protected void write(String message) {
      System.out.println("Error Console::Logger: " + message);
   }
}
```

`chainpattern/FileLogger.java`
```java
package chainpattern;

public class FileLogger
extends AbstractLogger {
   public FileLogger(int level) {
      this.level = level;
   }

   @Override
   protected void write(String message) {
      System.out.println("File Console::Logger: " + message);
   }
}
```

### Bước 3

Tạo chuỗi các logger và gắn mức thông báo cho các logger. Sử dụng chuỗi để in thông báo khi có yêu cầu.

`PatternDemo.java`
```java
import chainpattern.AbstractLogger;
import chainpattern.ConsoleLogger;
import chainpattern.ErrorLogger;
import chainpattern.FileLogger;

public class PatternDemo {
   public static void main(String[] args) {
      AbstractLogger loggerChain = getLoggers();

      loggerChain.logMessage(AbstractLogger.INFO, "This is an information.");
      loggerChain.logMessage(AbstractLogger.DEBUG, "This is an debug information.");
      loggerChain.logMessage(AbstractLogger.ERROR, "This is an error information.");
   }

   private static AbstractLogger getLoggers() {
      AbstractLogger errorLogger = new ErrorLogger(AbstractLogger.ERROR);
      AbstractLogger fileLogger = new FileLogger(AbstractLogger.DEBUG);
      AbstractLogger consoleLogger = new ConsoleLogger(AbstractLogger.INFO);

      errorLogger.setNextLogger(fileLogger);
      fileLogger.setNextLogger(consoleLogger);

      return errorLogger;
   }
}
```

### Bước 4

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
Standard Console::Logger: This is an information.
File Console::Logger: This is an debug information.
Standard Console::Logger: This is an debug information.
Error Console::Logger: This is an error information.
File Console::Logger: This is an error information.
Standard Console::Logger: This is an error information.
```