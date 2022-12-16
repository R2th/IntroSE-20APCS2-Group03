Đối với một lập trình viên, thì chúng ta chắc chắn đã làm việc với mô hình MVC. Đó là mô hình được sử dụng rất rộng rãi, MVC có rất nhiều ưu điểm để chúng ta phải sử dụng. Ngoài mô hình MVC thì còn có nhiều mô hình khác nữa, và chúng được nằm trong `Design Pattern`. Trong bài viết này, mình cùng các bạn tìm hiểu về `Design Pattern` và một mô hình `Design Pattern` đó là `Transfer Object Pattern`. Bắt đầu nào :D 

![](https://images.viblo.asia/c92d26c2-480e-46d9-8735-5303d83e354a.jpg)
# Design Pattern
## Design Pattern là gì ?
`Design pattern` hay còn gọi là mẫu thiết kế. Trong công nghệ phần mềm, một mẫu thiết kế (Design Pattern) là một giải pháp lặp lại chung cho một vấn đề thường xảy ra trong thiết kế phần mềm. Các mẫu thiết kế là giải pháp cho các vấn đề chung nhà phát triển phần mềm phải đối mặt trong quá trình phát triển phần mềm. Những giải pháp này là có được bằng cách thử nghiệm và lỗi bởi nhiều nhà phát triển phần mềm trong một khoảng thời gian đáng kể. 
## Sử dụng Design Pattern
- Nền tảng chung cho các nhà phát triển: 
  <br>
  Các mẫu thiết kế cung cấp một thuật ngữ tiêu chuẩn và kịch bản cụ thể
- Best practices:
<br>
  Các mẫu thiết kế đã được phát triển trong một thời gian dài và chúng cung cấp
giải pháp tốt nhất cho các vấn đề nhất định phải đối mặt trong quá trình phát triển phần mềm. Việc học tập những mẫu này giúp các nhà phát triển chưa có kinh nghiệm học thiết kế phần mềm một cách dễ dàng và cách nhanh chóng.  
## Các loại Design Pattern
### Nhóm mẫu tạo dựng
- Mục đích của mẫu nhóm này nhằm giải quyết công việc thường xuyên là tạo ra các
đối tượng.
<br>
- Các mẫu sẽ tạo ra một cơ chế đơn giản, thống nhất khi tạo các thể hiện của đối
tượng.
<br>
- Cho phép đóng gói các chi tiết về các lớp nào được khởi tạo và cách các thể hiện
này được tạo ra
<br>
- Nhóm này gồm các mẫu thiết kế sau đây: Abstract Factory, Factory Method,
Builder, Prototype, và Singleton
### Nhóm mẫu cấu trúc
- Nhóm này chủ yếu giải quyết vấn đề một đối tượng ủy thác trách nhiệm cho những
đối tượng khác. Điều này dẫn đến kiến trúc phân tầng của các thành phần với độ
kết nối thấp.
- Tạo điều kiện giao tiếp giữa các đối tượng khi một đối tượng không thể truy nhập
đối tượng khác theo cách thông thường hay khi một đối tượng không thể sử dụng
được do giao diện không tương thích.
- Cung cấp các cách để cấu trúc một đối tượng với quan hệ hợp thành được tạo ra
đầy đủ. Nhóm này liên quan tới các quan hệ cấu trúc giữa các thể hiện, bằng cách
sử dụng các quan hệ kế thừa, li n kết, phụ thuộc. Để xem thông tin về mẫu này phải
dựa vào biểu đồ lớp của mẫu
- Nhóm này gồm các mẫu sau đây: Adapter, Bridge, Composite, Decorator, Façade,
Proxy và Flyweight.
### Nhóm mẫu hành vi
- Nhóm mẫu thiết kế này li n quan đến các quan hệ gán trách nhiệm để cung cấp các
chức năng giữa các đối tượng trong hệ thống.
- Mô tả cơ chế giao tiếp giữa các đối tượng và xác định cơ chế chọn các thuật toán
khác nhau bởi các đối tượng khác nhau tại thời gian chạy.
- Nhóm này gồm có một số mẫu sau đây: Interpreter, Template Method, Chain of
Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy
và Visitor
### Nhóm mẫu J2EE
- Các mẫu J2EE quan tâm đến việc cung cấp các giải pháp liên quan đến Java EE. Những mô hình này được chấp nhận rộng rãi bởi các khuôn khổ và dự án khác
- Nhóm này gồm có một số mẫu sau đây: MVC, Business Delegate, Composite Entity, Data Access Object, Front Controller, Intercepting Filter, Service Locator, Transfer Object
# Transfer Object Pattern
## Transfer Object Pattern là gì ?
- Transfer Object Pattern sử dụng khi chúng ta muốn truyền dữ liệu với nhiều thuộc tính trong một lần bắn từ máy khách đến máy chủ. Transfer Object cũng được biết như là một value object.
- Transfer Object là một lớp POJO đơn giản có các phương thức getter / setter và được serializable để nó có thể được truyền qua mạng. Nó không có bất kỳ hành vi nào. 
- Lớp nghiệp vụ phía máy chủ thường lấy dữ liệu từ cơ sở dữ liệu và điền vào POJO và gửi nó cho khách hàng hoặc chuyển nó theo giá trị. Đối với client, chuyển đối tượng là chỉ đọc. Client có thể tạo đối tượng chuyển của riêng mình và chuyển nó đến máy chủ để cập nhật giá trị trong cơ sở dữ liệu trong một lần bắn. 
- Sau đây là các thực thể của loại này mẫu thiết kế:
  + Business Object: Business Service đẩy Transfer Object với data.
  + Transfer Object: POJO đơn giản chỉ có các phương thức để đặt / nhận thuộc tính.
  + Client: mỗi client request hoặc gửi Transfer Object tới Business Object
##  Triển khai 
Chúng ta sẽ tạo StudentBO làm `Business Object`, Student là `Transfer Object` đại diện cho các thực thể của chúng ta. TransferObjectPotypeDemo, lớp demo của chúng ta, hoạt động như một `client` ở đây và sẽ sử dụng StudentBO và Student để thể hiện Transfer Object Pattern
![](https://images.viblo.asia/e17730f3-bb62-4f67-abf6-ebe4cc5012b3.jpg)
- Tạo `Transfer Object`:
<br>
`StudentVO.java:`
```java
public class StudentVO {
    private String name;
    private int rollNo;
    
    StudentVO(String name, int rollNo){
        this.name = name;
        this.rollNo = rollNo;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getRollNo() {
        return rollNo;
    }
    
    public void setRollNo(int rollNo) {
        this.rollNo = rollNo;
    }
}
```
- Tạo `Business Object`:
<br>
`StudentBO.java:`
```java
import java.util.ArrayList;
import java.util.List;

public class StudentBO {
    //Danh sách để lưu trữ student
    List<StudentVO> students;
    public StudentBO(){
        students = new ArrayList<StudentVO>();
        StudentVO student1 = new StudentVO("Robert",0);
        StudentVO student2 = new StudentVO("John",1);
        students.add(student1);
        students.add(student2);
    }
    
    public void deleteStudent(StudentVO student) {
        students.remove(student.getRollNo());
        System.out.println("Student: Roll No " + student.getRollNo() +", deleted from database");
    }
    
    //Lấy danh sách student từ CSDL
    public List<StudentVO> getAllStudents() {
        return students;
    }
    
    public StudentVO getStudent(int rollNo) {
        return students.get(rollNo);
    }
    
    public void updateStudent(StudentVO student) {
        students.get(student.getRollNo()).setName(student.getName());
        System.out.println("Student: Roll No " + student.getRollNo() +", updated in the database");
    }
}
```
- Sử dụng StudentBO để thể hiện `Transfer Object Pattern`:
<br>
`TransferObjectPatternDemo.java:`
```java
public class TransferObjectPatternDemo {
    public static void main(String[] args) {
        StudentBO studentBusinessObject = new StudentBO();
        //in ra tất cả các student
        for (StudentVO student : studentBusinessObject.getAllStudents()) {
            System.out.println("Student: [RollNo : "
            +student.getRollNo()+", Name : "+student.getName()+" ]");
        }
        //cập nhật student
        StudentVO student = studentBusinessObject.getAllStudents().get(0);
        student.setName("Michael");
        studentBusinessObject.updateStudent(student);
        //lấy student
        student = studentBusinessObject.getStudent(0);
        System.out.println("Student: [RollNo : "
        +student.getRollNo()+", Name : "+student.getName()+" ]");
    }
}
```
- Kết quả:
```
Student: [RollNo : 0, Name : Robert ]
Student: [RollNo : 1, Name : John ]
Student: Roll No 0, updated in the database
Student: [RollNo : 0, Name : Michael ]
```
# Lời kết
Trong bài viết này, mình cùng với các bạn đã tìm hiểu về Design Pattern và một mẫu thiết kế đó là Transfer Object Pattern. Qua bài viết hy vọng các bạn có thể hiểu thêm về Design Pattern cũng như Transfer Object Pattern. Cảm ơn các bạn đã theo dõi bài viết :D
# Tài liệu tham khảo
- https://www.tutorialspoint.com/design_pattern/transfer_object_pattern.htm