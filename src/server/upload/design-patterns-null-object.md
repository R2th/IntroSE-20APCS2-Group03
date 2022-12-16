Null Object được sử dụng để thay thế cho phép kiểm tra một giá trị `null` có thể xuất hiện.
Một `object` Null được tạo ra để đại diện cho trường hợp vô nghĩa của một `class` thực thể
và có thể được triển khai một số phương thức đáp ứng mặc định trong trường hợp dữ liệu 
truy vấn không khả dụng. Null Object được xếp vào nhóm các pattern Hành Vi.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/a7e11a2a-4cb9-4d9d-b9d3-8f14c9649b46.png)

Ở đây chúng ta có ví dụ mô tả về một đoạn xử lý yêu cầu đăng nhập từ người dùng.
Khi thông tin đăng nhập được gửi tới server, phần code `main` sẽ kết nối tới cơ sở dữ liệu
`database` để truy vấn tài khoản phù hợp. Nếu tập kết quả trả về sau khi truy vấn
bằng thông tin được cung cấp từ người dùng là một tập rỗng thì lệnh truy vấn sẽ trả
về một `NullUser` thay vì trả về giá trị `null`. Còn trong trường hợp có kết quả phù hợp
thì sẽ trả về một `RealUser` mô tả thực thể người dùng.

Bạn lưu ý là mặc dù `NullUser` cũng kế thừa từ `AbstractUser` giống như `RealUser`
nhưng không cần phải triển khai các phương thức với code đáp ứng tới tầng biểu thị. 
Phương thức quan trọng nhất là `isNull()` cần được chắc chắn triển khai trên cả 
`RealUser` và `NullUser` để sử dụng trong phép kiểm tra thay cho giá trị `null` 
có khả năng xuất hiện. Các phương thức còn lại của `NullUser` có thể trả về `null`, 
hoặc`throw Exception`, hoặc in thông báo ra `console` để phục vụ `debug` và chạy thử,
hoặc được triển khai với code đáp ứng mặc định phù hợp với ý định sử dụng trong kiến trúc
phần mềm của bạn.

### Bước 1

Tạo `AbstractUser` để mô tả thực thể người dùng và tạo ràng buộc triển khai `isNull()`
cho các class kế thừa.

`nullobject/AbstractUser.java`
```java
package nullobject;

public abstract class AbstractUser {
   protected String username;
   protected String password;

   public abstract String getUsername();
   public abstract void setUsername(String username) throws Exception;
   public abstract String getPassword();
   public abstract void setPassword(String password) throws Exception;

   public abstract boolean isNull();
}
```

### Bước 2

Tạo 2 class kế thừa `AbstractUser`:

- `RealUser` để mô tả thực thể người dùng
- `NullUser` để đại diện cho trường hợp kết quả truy vấn không khả dụng

`nullobject/RealUser.java`
```java
package nullobject;

public class RealUser
extends AbstractUser {
   public RealUser(
      String username,
      String password
   ) {
      try {
         setUsername(username);
         setPassword(password);
      }
      catch (Exception e) {
         e.printStackTrace();
      }
   } // RealUser()

   @Override
   public String getUsername() {
      return username;
   }

   @Override
   public void setUsername(String username) throws Exception {
      if (username == null || username.equalsIgnoreCase(""))
         throw new Exception("Tên người dùng không hợp lệ");
      else
         this.username = username;
   }

   @Override
   public String getPassword() {
      return password;
   }

   @Override
   public void setPassword(String password) throws Exception {
      if (password == null || password.equalsIgnoreCase(""))
         throw new Exception("Mật khẩu không hợp lệ");
      else
         this.password = password;
   }

   @Override
   public boolean isNull() {
      return false;
   }
} // class
```

`nullobject/NullUser.java`
```java
package nullobject;

public class NullUser
extends AbstractUser {
   @Override
   public String getUsername() {
      return null;
   }

   @Override
   public void setUsername(String username) throws Exception {
      throw new Exception("Phương thức chưa có code triển khai");
   }

   @Override
   public String getPassword() {
      return null;
   }

   @Override
   public void setPassword(String password) throws Exception {
      throw new Exception("Phương thức chưa có code triển khai");
   }

   @Override
   public boolean isNull() {
      return true;
   }
} // class
```

### Bước 3

Viết code `main` để mô tả tiến trình xử lý yêu cầu đăng nhập.

`PatternDemo.java`
```java
import nullobject.AbstractUser;
import nullobject.NullUser;
import nullobject.RealUser;

import java.util.ArrayList;
import java.util.List;

public class PatternDemo {
   private static List<AbstractUser> database = new ArrayList<AbstractUser>();

   public static void main(String[] args) {
      String inputUsername;
      String inputPassword;

      connectDatabase();

      //thử đăng nhập lần thứ nhất
      System.out.println("==============");
      inputUsername = "someone";
      inputPassword = "qwerty123456789";
      userLogin(inputUsername, inputPassword);

      //thử đăng nhập lần thứ hai
      System.out.println("==============");
      inputUsername = "semiarthanoi";
      inputPassword = "123456789";
      userLogin(inputUsername, inputPassword);
   }

   private static void connectDatabase() {
      AbstractUser viblo = new RealUser("viblo", "987654321");
      database.add(viblo);
      AbstractUser semiart = new RealUser("semiarthanoi", "123456789");
      database.add(semiart);
   }

   private static void userLogin(
      String username,
      String password
   ) {
      AbstractUser matched = queryUser(username, password);
      if (matched.isNull()) {
         System.out.println("Thông tin đăng nhập không chính xác.");
      }
      else {
         System.out.println("Đăng nhập thành công!");
         System.out.println("Tên tài khoản: " + matched.getUsername());
      }
   } // userLogin

   private static AbstractUser queryUser(
      String username,
      String password
   ) {
      List<AbstractUser> matchedUsers = database.stream()
            // filter lược bỏ những tài khoản không đúng với `username`
            // được cung cấp từ người dùng đang gửi yêu cầu đăng nhập
            .filter((user) -> user.getUsername().equals(username))
            // filter lược bỏ tiếp những tài khoản không đúng với `password`
            // được nhập vào bởi người dùng đang gửi yêu cầu đăng nhập
            .filter((user) -> user.getPassword().equals(password))
            // chuyển stream về lại giao diện List
            .toList();

      if (matchedUsers.isEmpty()) {
         // nếu tập kết quả rỗng thì trả về một `NullUser`
         return new NullUser();
      }
      else {
         // nếu có kết quả phù hợp thì trả về phần tử duy nhất
         return matchedUsers.get(0);
      }
   } // queryUser
} // class
```

### Bước 4

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
==============
Thông tin đăng nhập không chính xác.
==============
Đăng nhập thành công!
Tên tài khoản: semiarthanoi
```