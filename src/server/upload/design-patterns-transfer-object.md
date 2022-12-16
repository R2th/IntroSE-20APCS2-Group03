Transfer Object (đối tượng chuyển nhượng) được sử dụng khi chúng ta muốn truyền dữ liệu với nhiều thuộc tính từ `client` tới `server`. Transfer Object còn được biết đến với một cái tên khác là Value Object (đối tượng lưu trữ các giá trị). Transfer Object là một class POJO đơn giản với các phương thức getter/setter và có thể được chuẩn hóa để truyền qua mạng kết nối. Các object này không có chứa bất kỳ phương thức nào khác. Các class xử lý logic ở `server` thường truy vấn dữ liệu từ database và tạo ra các POJO để chuyển tới `client`. Đối với `client` thì các Transfer Object là các object `read-only` không thể được ghi đè dữ liệu đang chứa. Code `client` có thể tự tạo ra các Transfer Object và truyền tới `server` để cập nhật dữ liệu trong database. Sau đây là các thành phần của pattern:

- Transfer Object - POJO đơn giản với các phương thức getter/setter.
- Business Object - đối tượng xử lý logic của `server` sẽ tạo ra các Transfer Object và chuyển cho `client`.
- Client - object gửi yêu cầu và chuyển các Transfer Object tới Business Object.

## Áp dụng triển khai

![](https://images.viblo.asia/f6618ebf-3448-4c42-8a9d-efb109fdc25f.png)

`server`
- Chúng ta sẽ tạo một class `BusinessObject` để đóng vai trò mô phỏng xử lý yêu cầu ở `server`.
- Một interface `StudentS` cho Transfer Object tạo ra bởi `server` chuyển cho `client.
- Một class triển khai `StudentS`.

`client`
- Một class `Client` đóng vai trò mô phỏng tương tác người dùng gửi yêu cầu tới `server`
- Một interface `StudentC` cho Transfer Object tạo ra bởi `server` chuyển cho `client.
- Một class triển khai `StudentC`.

### Bước 1

Tạo 2 interface `StudentS` và `StudentC`.

`server/StudentS.java`
```java
package server;

public interface StudentS {
   int getRoll();
   String getName();
}
```

`client/StudentC.java`
```java
package client;

public interface StudentC {
   int getRoll();
   String getName();
}
```

## Bước 2

Tạo 2 class Transfer Object triển khai `StudentS` và `StudentC`.

`server/Student.java`
```java
package server;

class Student
implements StudentS {
   private int roll;
   private String name;

   Student(
      int roll,
      String name
   ) {
      this.roll = roll;
      this.name = name;
   }

   @Override
   public int getRoll() {
      return roll;
   }
   
   @Override
   public String getName() {
      return name;
   }
} // class
```

`client/Student.java`
```java
package client;

class Student
implements StudentC {
   private int roll;
   private String name;

   public Student(
      int roll,
      String name
   ) {
      this.roll = roll;
      this.name = name;
   }

   @Override
   public int getRoll() {
      return roll;
   }

   @Override
   public String getName() {
      return name;
   }
} // class
```

## Bước 3

Tạo class `BusinessObject`.

`server/BusinessObject.java`
```java
package server;

import client.StudentC;

import java.util.ArrayList;
import java.util.List;

public class BusinessObject {
   private List<StudentS> database;

   public BusinessObject() {
      connectDatabase();
   }

   public static StudentS cloneStudent(StudentS stds) {
      return new Student(stds.getRoll(), stds.getName());
   }

   private void connectDatabase() {
      database = new ArrayList<StudentS>();

      StudentS john = new Student(0, "John");
      database.add(john);

      StudentS micheal = new Student(1, "Micheal");
      database.add(micheal);
   }

   public List<StudentS> getAllStudents() {
      return database
         .stream()
         .map((stds) -> BusinessObject.cloneStudent(stds))
         .toList();
   }

   public StudentS getStudent(int roll) {
      return database.get(roll);
   }

   public void updateStudent(StudentC stdc) {
      StudentS updated = new Student(stdc.getRoll(), stdc.getName());
      database.remove(stdc.getRoll());
      database.add(updated);
      System.out.println("Student [ Roll : " + updated.getRoll() + " ] " + "updated in database");
   }
} // class
```

## Bước 4

Tạo class `Client` mô tả các yêu cầu.

`client/Client.java`
```java
package client;

import server.BusinessObject;
import server.StudentS;

import java.util.List;

public class Client {
   private BusinessObject service;

   public void setService(BusinessObject business) {
      this.service = business;
   }

   public void mockupRequest() {
      requestAndPrintAllStudents();
      requestAndUpdateFirstStudent();
      requestAndPrintAllStudents();
   }

   private void requestAndPrintAllStudents() {
      System.out.println("=== Request & Print All Students");
      List<StudentS> studentList = service.getAllStudents();
      studentList.forEach((std) -> printStudentInfo(std.getRoll(), std.getName()));
   }

   private void requestAndUpdateFirstStudent() {
      System.out.println("=== Request & Update First Student");
      StudentS firstStd = service.getStudent(0);
      StudentC updated = new Student(firstStd.getRoll(), "Kei");
      service.updateStudent(updated);
   }

   private void printStudentInfo(int roll, String name) {
      System.out.println("Student [ Roll : " + roll + ", Name : " + name + " ]");
   }
}
```

## Bước 5

Chạy thử hoạt động của pattern.

`PatternDemo.java`
```java
import client.Client;
import server.BusinessObject;

public class PatternDemo {
   public static void main(String[] args) {
      BusinessObject business = new BusinessObject();
      Client client = new Client();
      client.setService(business);
      client.mockupRequest();
   }
} // class
```

## Bước 6

Kiểm chứng lại kết quả được in ra tại `console`.

`console`
```java
=== Request & Print All Students
Student [ Roll : 0, Name : John ]
Student [ Roll : 1, Name : Micheal ]
=== Request & Update First Student
Student [ Roll : 0 ] updated in database
=== Request & Print All Students
Student [ Roll : 1, Name : Micheal ]
Student [ Roll : 0, Name : Kei ]
```