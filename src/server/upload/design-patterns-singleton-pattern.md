Singleton là một trong số những dạng thức triển khai đơn giản nhất của OOP và được xếp vào nhóm các dạng thức Khởi Tạo. Singleton giúp chúng ta đảm bảo chỉ có `01 object` đơn duy nhất của `01 class` đặc định được tạo ra trong suốt thời gian phần mềm hoạt động. `Class` này có cung cấp một phương thức để truy xuất `object` đơn nguyên này và không cho phép khởi tạo `object` mới tương tự ở bất kỳ nơi nào khác.

## Áp dụng triển khai

 ![sơ đồ các class](https://images.viblo.asia/734fb702-73c2-414a-a883-5cc2ce329fda.png)

- Chúng ta sẽ tạo ra `01 class` có tên là `Thing`. Bên trong `class` này sẽ có hàm khởi tạo được khóa `private` và một thuộc tính `static` để lưu tham chiếu của `object` duy nhất được tạo ra.
- `Thing` có cung cấp một phương thức `static` để chia sẻ tham chiếu tới `object` duy nhất cho phần code client sử dụng.
- Cuối cùng là `main` ở `PatternDemo` sẽ sử dụng `Thing` để hỏi truy xuất tới `object` duy nhất và hiển thị tin nhắn của `object` đó.

### Bước 1

Tạo `01 class singleton` có tên là `Thing`.

`singleton/Thing.java`
```java
package singleton;

public class Thing {
   private static final Thing instance = new Thing();

   private Thing() {
      // khóa `private` phương thức khởi tạo với `new` từ bên ngoài `class`
   }

   public static Thing getInstance() {
      return instance;
   }

   public void showMessage() {
      System.out.println("Tin nhắn từ `object` duy nhất của `Thing`!");
   }
}
```

### Bước 2

Truy xuất tới `object` duy nhất và hiển thị tin nhắn.

`PatternDemo.java`
```java
import singleton.Thing;

public class PatternDemo {
   public static void main(String[] args) {
      // Lỗi biên dịch vì phương thức khởi tạo không khả dụng
      // Thing only = new Thing();

      // Truy xuất object đơn nguyên duy nhất
      Thing only = Thing.getInstance();

      // Hiển thị tin nhắn
      only.showMessage();
   }
}
```

### Bước 3

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```
Tin nhắn từ `object` duy nhất của `Thing`!
```