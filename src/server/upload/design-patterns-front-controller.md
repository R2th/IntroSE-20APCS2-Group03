Front Controller được sử dụng để cung cấp một trung tâm xử lý yêu cầu, nơi mà tất cả các yêu cầu sẽ được tiếp nhận và phản hồi bởi 1 object duy nhất. Object này có thể thực hiện xác thực đăng nhập/ghi nhật ký/theo dõi yêu cầu và chuyển yêu cầu tới các object xử ký khác ở cấp thấp hơn. Sau đây là các thành phần của pattern:

- Front Controller - Object tiếp nhận tất cả các yêu cầu được gửi tới ứng dụng (web hoặc desktop).
- Dispatcher - Object này sẽ hỗ trợ Front Controller chuyển yêu cầu tới các object xử lý ở cấp thấp hơn.
- View - Object mô tả giao diện người dùng, nơi mà yêu cầu được tạo ra và gửi tới Front Controller.

## Áp dụng triển khai

![](https://images.viblo.asia/ddcb6b71-11b5-4b0a-a5d6-5c8b92dab9d8.png)

Chúng ta sẽ tạo ra một `FrontController` để nhận tất cả các yêu cầu `request` từ các `View`, sau đó nhờ `Dispatcher` chuyển tới các `Controller` tương ứng với các yêu cầu cần xử lý.

### Bước 1

Tạo `FrontController` và `Dispatcher`.

`frontcontroller/FrontController.java`
```java
package frontcontroller;

public class FrontController {
   private static final FrontController instance = new FrontController();

   private final Dispatcher dispatcher = new Dispatcher();

   public static FrontController getInstance() {
      return instance;
   };

   private boolean isAuthenticUser() {
      System.out.println("User is authenticated successfully.");
      return true;
   }

   public void trackRequest(String request) {
      System.out.println("Page requested: " + request);
   }

   public void dispatchRequest(String request) {
      trackRequest(request);

      if (! isAuthenticUser())
         { /* do nothing */ }
      else
         dispatcher.dispatch(request);
   }
}
```

`frontcontroller/Dispatcher.java`
```java
package frontcontroller;

import frontcontroller.controller.*;

public class Dispatcher {
   private Controller homeController = new HomeController(),
                      studentController = new StudentController(),
                      notfoundController = new NotfoundController(),
                      logoutController = new LogoutController();

   public void dispatch(String request) {
      if ("home".equalsIgnoreCase(request))
         homeController.process(request);
      else if ("student".equalsIgnoreCase(request))
         studentController.process(request);
      else if ("logout".equalsIgnoreCase(request))
         logoutController.process(request);
      else
         notfoundController.process(request);
   }
}
```

### Bước 2

Tạo interface `Controller`.

`frontcontroller/controller/Controller.java`
```java
package frontcontroller.controller;

public interface Controller {
   void process(String request);
}
```

Và các class triển khai xử lý các yêu cầu cụ thể.

`frontcontroller/controller/HomeController.java`
```java
package frontcontroller.controller;

import frontcontroller.view.HomeView;

public class HomeController
implements Controller {
   private HomeView view = new HomeView();

   @Override
   public void process(String request) {
      view.show();
   }
}
```

`frontcontroller/controller/StudentController.java`
```java
package frontcontroller.controller;

import frontcontroller.view.StudentView;

public class StudentController
implements Controller {
   private StudentView view = new StudentView();

   @Override
   public void process(String request) {
      view.show();
   }
}
```

`frontcontroller/controller/NotfoundController.java`
```java
package frontcontroller.controller;

import frontcontroller.view.NotfoundView;
import frontcontroller.view.View;

public class NotfoundController
implements Controller {
   private View notfoundView = new NotfoundView();

   @Override
   public void process(String request) {
      notfoundView.show();
   }
}
```

`frontcontroller/controller/LogoutController.java`
```java
package frontcontroller.controller;

import frontcontroller.view.LogoutView;

public class LogoutController
implements Controller {
   private LogoutView exitView = new LogoutView();

   @Override
   public void process(String request) {
      exitView.show();
   }
}
```

###  Bước 3

Tạo interface `View`.

`frontcontroller/view/View.java`
```java
package frontcontroller.view;

public interface View {
   void show();
}
```

Và các class triển khai.

`frontcontroller/view/HomeView.java`
```java
package frontcontroller.view;

import frontcontroller.FrontController;

import java.util.Scanner;

public class HomeView
implements View {
   @Override
   public void show() {
      System.out.println("=== Trang chủ");
      System.out.print(
         "Bạn đang ở trang chủ.\n" +
         "Hãy nhập trang mà bạn muốn di chuyển tới ( home | student | logout ): "
      );
      Scanner scanner = new Scanner(System.in);
      String request = scanner.nextLine();
      FrontController.getInstance().dispatchRequest(request);
   }
}
```

`frontcontroller/view/StudentView.java`
```java
package frontcontroller.view;

import frontcontroller.FrontController;

import java.util.Scanner;

public class StudentView
implements View {
   private FrontController controller = FrontController.getInstance();

   @Override
   public void show() {
      System.out.println("=== Thông tin sinh viên");
      System.out.print(
         "Bạn đang ở trang hiển thị thông tin sinh viên.\n" +
         "Hãy nhập trang mà bạn muốn di chuyển tới ( home | student | logout ): "
      );
      Scanner scanner = new Scanner(System.in);
      String request = scanner.nextLine();
      FrontController.getInstance().dispatchRequest(request);
   }
}
```

`frontcontroller/view/NotfoundView.java`
```java
package frontcontroller.view;

import frontcontroller.FrontController;

public class NotfoundView
implements View {
   @Override
   public void show() {
      System.out.println("=== Trang hiển thị tạm");
      System.out.println(
         "Trang hiển thị mà bạn yêu cầu không tồn tại.\n" +
         "Đang điều hướng trở lại trang chủ."
      );
      FrontController.getInstance().dispatchRequest("home");
   }
}
```

`frontcontroller/view/LogoutView.java`
```java
package frontcontroller.view;

public class LogoutView
implements View {
   @Override
   public void show() {
      System.out.println("=== Đăng xuất");
      System.out.println("Tài khoản của bạn đã được đăng xuất.");
      System.exit(0);
   }
}
```

### Bước 4

Chạy thử chương trình.

`PatternDemo.java`
```java
import frontcontroller.FrontController;

public class PatternDemo {
   public static void main(String[] args) {
      FrontController.getInstance().dispatchRequest("home");
   }
}
```

### Bước 5

Tương tác ở `console` và kiểm chứng kết quả hoạt động của pattern.

`console`
```java
Page requested: home
User is authenticated successfully.
=== Trang chủ
Bạn đang ở trang chủ.
Hãy nhập trang mà bạn muốn di chuyển tới ( home | student | logout ): student
Page requested: student
User is authenticated successfully.
=== Thông tin sinh viên
Bạn đang ở trang hiển thị thông tin sinh viên.
Hãy nhập trang mà bạn muốn di chuyển tới ( home | student | logout ): about
Page requested: about
User is authenticated successfully.
=== Trang hiển thị tạm
Trang hiển thị mà bạn yêu cầu không tồn tại.
Đang điều hướng trở lại trang chủ.
Page requested: home
User is authenticated successfully.
=== Trang chủ
Bạn đang ở trang chủ.
Hãy nhập trang mà bạn muốn di chuyển tới ( home | student | logout ): logout
Page requested: logout
User is authenticated successfully.
=== Đăng xuất
Tài khoản của bạn đã được đăng xuất.
```