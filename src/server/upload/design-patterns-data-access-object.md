Data Access Object, hay DAO, được sử dụng để phân tách lớp xử lý dữ liệu bậc thấp khỏi các lớp xử lý logic hoạt động bậc cao của phần mềm. Dưới đây là các thành phần của DAO.

- Một interface DAO - để tạo giao diện các thao tác hay các tác vụ tính toán sẽ thực hiện trên các object dữ liệu.
- Một class triển khai DAO - để truy vấn dữ liệu từ một nguồn nào đó như database/xml hoặc một cơ chế lưu trữ nào đó khác.
- Model Object hay Value Object - là object mô tả thực thể dữ liệu.

## Áp dụng triển khai

![](https://images.viblo.asia/99916f15-a3f5-489e-a3cc-c00c0b2d20ad.png)

- Chúng ta sẽ tạo một class `Student` làm Value Object.
- StudentDAO là một abstract để giao tiếp với code client bên ngoài.
- Và ImplementDAO để triển khai StudentDAO.

### Bước 1

Tạo class `Student`.

`daopattern/Student.java`
```java
package daopattern;

public class Student {
   private int roll;
   private String name;

   public Student() {
      roll = 0;
      name = "";
   }

   public Student(int roll, String name) {
      this.roll = roll;
      this.name = name;
   }

   public static Student clone(Student std) {
      return new Student(std.getRoll(), std.getName());
   }

   public int getRoll() {
      return roll;
   }

   public String getName() {
      return name;
   }

   public Student setName(String name) {
      this.name = name;
      return this;
   }
}
```

### Bước 2

Tạo abstract `StudentDAO`.

`daopattern/StudentDAO.java`
```java
package daopattern;

import java.util.List;

public abstract class StudentDAO {
   protected List<Student> studentList;

   public static StudentDAO createInstance() {
      return new ImplementDAO();
   }

   public abstract List<Student> getAllStudents();
   public abstract Student getStudent(int roll);
   public abstract StudentDAO addStudent(Student std);
   public abstract StudentDAO updateStudent(Student std);
   public abstract StudentDAO deleteStudent(Student std);
}
```

### Bước 3

Tạo class `ImplementDAO` triển khai các phương thức giao tiếp của `StudentDAO`.

`daopattern/ImplementDAO.java`
```java
package daopattern;

import java.util.ArrayList;
import java.util.List;

class ImplementDAO
extends StudentDAO {
   public ImplementDAO() {
      connectDatabase();
   }

   @Override
   public List<Student> getAllStudents() {
      return studentList
         .stream()
         .map((std) -> Student.clone(std))
         .toList();
   }

   @Override
   public Student getStudent(int roll) {
      return studentList
         .stream()
         .filter((std) -> std.getRoll() == roll)
         .toList()
         .get(0);
   }

   @Override
   public StudentDAO addStudent(Student std) {
      studentList.add(std);
      return this;
   }

   @Override
   public StudentDAO updateStudent(Student std) {
      studentList.get(std.getRoll()).setName(std.getName());
      return this;
   }

   @Override
   public StudentDAO deleteStudent(Student std) {
      studentList.remove(std.getRoll());
      return this;
   }

   private StudentDAO connectDatabase() {
      studentList = new ArrayList<Student>();

      Student std1 = new Student(0, "John");
      studentList.add(std1);

      Student std2 = new Student(1, "Micheal");
      studentList.add(std2);

      return this;
   }
}
```

### Bước 4

Sử dụng `StudentDAO` để thử hoạt động của pattern.

`PatternDemo.java`
```java
import daopattern.Student;
import daopattern.StudentDAO;

import java.util.List;

public class PatternDemo {
   public static void main(String[] args) {
      StudentDAO stdDAO = StudentDAO.createInstance();

      System.out.println("=== Print all student:");
      printStudentList(stdDAO.getAllStudents());

      System.out.println("=== Update first student");
      Student firstStd = stdDAO.getStudent(0);

      System.out.println("Current:");
      printStudent(firstStd);

      firstStd.setName("Kei");

      System.out.println("To:");
      printStudent(firstStd);

      stdDAO.updateStudent(firstStd);

      System.out.println("=== Print all student:");
      printStudentList(stdDAO.getAllStudents());
   }

   public static void printStudentList(List<Student> stdList) {
      stdList.stream().forEach((std) -> printStudent(std));
   }

   public static void printStudent(Student std) {
      System.out.println("Roll: " + std.getRoll() + ", Name: " + std.getName());
   }
}
```

### Bước 5

Kiểm chứng lại kết quả được in ra ở `console`.

`console`
```java
=== Print all student:
Roll: 0, Name: John
Roll: 1, Name: Micheal
=== Update first student
Current:
Roll: 0, Name: John
To:
Roll: 0, Name: Kei
=== Print all student:
Roll: 0, Name: Kei
Roll: 1, Name: Micheal
```