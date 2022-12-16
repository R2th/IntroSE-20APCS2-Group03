Chắc hẳn tất cả lập trình viên chúng ra khi viết ra những dòng code đều mong muốn rằng những dòng code chúng ta viết ra có thể làm cho mọi người dễ dàng hiểu được và dễ bảo trì. Đặc biệt với dự án đặc thù khách hàng thay đổi yêu cầu liên tục thì việc này lại trở nên rất quan trọng. Chúng ta sẽ cùng tìm hiểu nguyên lý SOLID để có thể viết ra những dòng code dễ hiểu, dễ maintain. <br>
**SOLID** là tên viết tắt của 5 nguyên lý hợp thành lại bao gồm: <br>
**S** - Single Responsibility Principle <br>
**O** - Open/Closed Principle <br>
**L** - Liskov’s Substitution Principle <br>
**I** - Interface Segregation Principle <br>
**D** - Dependency Inversion Principle <br>
![](https://images.viblo.asia/adf206fe-0a7b-45d1-897d-794a8e8651f9.png)
# 1. Single Responsibility Principle
Nguyên lý đầu tiên, tương ứng với chữ S trong SOLID. Nội dung nguyên lý: <br>
```
Một class chỉ nên giữ 1 trách nhiệm duy nhất (Chỉ có thể sửa đổi class với 1 lý do duy nhất)
```
Một class có quá nhiều chức năng cũng sẽ trở nên cồng kềnh và phức tạp. Nếu requirement hay thay đổi, dẫn tới sự thay đổi code. Nếu một class có quá nhiều chức năng, quá cồng kềnh, việc thay đổi code sẽ rất khó khăn, mất nhiều thời gian, còn dễ gây ảnh hưởng tới các module đang hoạt động khác. <br>
Ví dụ: <br>
``` java
  public class Student {
  public string Name { get; set;}
  public int Age { get; set;}
  
  // Format class này dưới dạng text, html, json để in ra
  public string GetStudentInfoText() {
    return "Name: " + Name + ". Age: " + Age;
  }
  
  public string GetStudentInfoHTML() {
    return "<span>" + Name + " " + Age + "</span>";
  }
  
  public string GetStudentInfoJson() {
    return Json.Serialize(this);
  }
  
  // Lưu trữ xuống database, xuống file
  public void SaveToDatabase() {
    dbContext.Save(this);
  }
  
  public void SaveToFile() {
    Files.Save(this, "fileName.txt");
  }
}
```
Class Student có quá nhiều chức năng: chứa thông tin học sinh, format hiển thị thông tin, lưu trữ thông tin. Khi code lớn dần, thêm chức năng nhiều hơn, class Student sẽ bị phình to ra. Chưa kể, nếu như có thêm các class khác như Person, Teacher v…v, đoạn code hiển thị/lưu trữ thông tin sẽ nằm rải rác ở nhiều class dẫn đến khó sửa chữa và nâng cấp.<br>
Để giải quyết, ta chỉ cần tách ra làm nhiều class, mỗi class có một chức năng riêng. Khi cần nâng cấp, sửa chữa, sẽ diễn ra ở từng class, không ảnh hưởng tới các class còn lại. <br>
```java
  // Student bây giờ chỉ chứa thông tin
public class Student {
  public string Name { get; set;}
  public int Age { get; set;}
}

// Class này chỉ format thông tin hiển thị student
public class Formatter {
  public string FormatStudentText(Student std) {
    return "Name: " + std.Name + ". Age: " + std.Age;
  }
  
  public string FormatStudentHtml(Student std) {
    return "<span>" + std.Name + " " + std.Age + "</span>";
  }
  
  public string FormatStudentJson(Student std) {
    return Json.Serialize(std);
  }
}

// Class này chỉ lo việc lưu trữ
public class Store {
  public void SaveToDatabase(Student std) {
    dbContext.Save(std);
  }
  public void SaveToFile(Student std) {
    Files.Save(std, "fileName.txt");
  }
}
```

# 2. Open/Closed Principle
Nguyên lý thứ hai, tương ứng với chữ O trong SOLID. Nội dung nguyên lý: <br>
```
Có thể  mở rộng 1 class, nhưng không được sửa đổi bên trong class đó
```
Theo nguyên lý này, mỗi khi ta muốn thêm chức năng,.. cho chương trình, chúng ta nên viết class mới mở rộng class cũ ( bằng cách kế thừa hoặc sở hữu class cũ) không nên sửa đổi class cũ. <br>
Ví dụ: <br>
``` java
// class hình vuông
public class Square {
  public Point topLeft;
  public double side;
}

// class hình tam giác
public class Rectangle {
  public Point topLeft;
  public double height;
  public double width;
}

// class hình tròn
public class Circle {
  public Point center;
  public double radius;
}

// class Tính chu vi
public class Geometry {
  public final double PI = 3.141592653589793;
  public double area(Object shape) throws NoSuchShapeException
    {
      // Dùng if để kiểm tra hình và cho ra diện tích tương ứng
      if (shape instanceof Square) {
        Square s = (Square)shape;
        return s.side * s.side;
      }
      else if (shape instanceof Rectangle) {
        Rectangle r = (Rectangle)shape;
        return r.height * r.width;
      }
      else if (shape instanceof Circle) {
       Circle c = (Circle)shape;
       return PI * c.radius * c.radius;
      }
      throw new NoSuchShapeException();
  }
}
```
Dễ thấy nếu trong tương lại ta thêm nhiều class nữa, muốn tính diện tích của nó ta lại phải sửa class Geometry, viết thêm chừng đó hàm if nữa. Sau khi chỉnh sửa, ta phải compile và deploy lại class Geometry :(. <br> 
Sau khi chỉnh sửa lại như sau: <br>

```java
interface Shape {
  public double area();
}
public class Square implements Shape {
  private Point topLeft;
  private double side;
  public double area() {
  return side*side;
  }
}

public class Rectangle implements Shape {
  private Point topLeft;
  private double height;
  private double width;
  public double area() {
    return height * width; 
  }
}

public class Circle implements Shape {
  private Point center;
  private double radius;
  public final double PI = 3.141592653589793;
  public double area() {
    return PI * radius * radius;
  }
}
```
 Ta dùng một interface và chuyển hàm tính diện tích vào trong các hình, như vậy khi thêm một lớp mới ta chỉ cần thực thi trong lớp đó mà không ảnh hưởng đến các lớp khác. <br>
# 3. Liskov’s Substitution Principle
Nguyên lý thứ ba, tương ứng với chữ L trong SOLID. Nội dung nguyên lý: <br>
```
Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình
```
Một ví dụ đơn giản là class RecyclerView.Adapter trong android. Lập trình viên có thể dễ dàng extend class này và viết lớp adapter riêng của mình mà không cần phải thay đổi lớp RecyclerView.Adapter đã có sẵn. <br>
Ví dụ ta có một class animal <br>
``` java
public class Animal {
    public void makeNoise() {
        System.out.println("making some noise");
    }
}
// class Cat và Dog extend từ class animal
public class Dog extends Animal {
    @Override
    public void makeNoise() {
        System.out.println("gâu gâu");
    }
}

public class Cat extends Animal {
    @Override
    public void makeNoise() {
        System.out.println("meow meow");
    }
}
```
Nguyên lý chỉ ra ở đây chúng ta có thể thay thể những chỗ đã sử dụng class Animal bằng class Dog hoặc Cat mà không làm chết chương trình. Chúng ta không nên thực thi đoạn code ở lớp con mà khi thay thế lớp cha sẽ làm chết chương trình. Ví dụ <br>
``` java
class MuteCat extends Animal {
    @Override
    public void makeNoise() {
        throw new RuntimeException("I can't make noise");
    }
}
```
# 4. Interface Segregation Principle
Nguyên lý thứ tư, tương ứng với chữ I trong SOLID. Nội dung nguyên lý: <br>
```
Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với các mục đích khác nhau
```

Nguyên lý này khá dễ hiểu. Hãy tưởng tượng chúng ta có 1 interface lớn, khoảng 100 methods. Việc implements sẽ khá cực khổ, ngoài ra còn có thể dư thừa vì 1 class không cần dùng hết 100 method. Khi tách interface ra thành nhiều interface nhỏ, gồm các method liên quan tới nhau, việc implement và quản lý sẽ dễ hơn. <br>
Ví dụ trong android: <br>
```java
/**
 * interface được tạo ra bắt sự kiện khi người dùng click 
 */
public interface OnClickListener {
    /**
     * Called when a view has been clicked.
     *
     * @param v The view that was clicked.
     */
     void onClick(View v);
}
/**
 * interface được tạo ra khi người dùng click và giữ
 */
public interface OnLongClickListener {
    /**
     * Called when a view has been clicked and held.
     *
     * @param v The view that was clicked and held.
     *
     * @return true if the callback consumed the long click, false otherwise.
     */
    boolean onLongClick(View v);
}
```
Nếu chúng ta định nghĩa một interface gộp cả 2 <br>
``` java
public interface MyOnClickListener {
        void onClick(View v);
        boolean onLongClick(View v);
}
```
Khi implement interface này ta sẽ phải thêm những method không dùng đến vào, chưa kể khi thêm nhiều chức năng khác interface này sẽ phình to ra, nội dung của nguyên lý này chính là khuyên ta nên tách các interface cho các mục đích cụ thể, tránh việc gộp lại chúng thành 1 interface.

# 5. Dependency Inversion Principle
Nguyên lý cuối cùng, tương ứng với chữ D trong SOLID. Nội dung nguyên lý: <br>
```
1. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. 
   Cả 2 nên phụ thuộc vào abstraction.
2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại.
( Các class giao tiếp với nhau thông qua interface, 
không phải thông qua implementation.)
```
Ví dụ <br>
``` java
// khi chưa áp dụng nguyên lý
// Cart là module cấp cao
public class Cart {
    public void Checkout(int orderId, int userId) {
        // Database, Logger, EmailSender là module cấp thấp
        Database db = new Database();
        db.Save(orderId);
 
        Logger log = new Logger();
        log.LogInfo("Order has been checkout");
 
        EmailSender es = new EmailSender();
        es.SendEmail(userId);
    }
}
```

``` java
// Code sau khi áp dụng nguyên lý

public interface IDatabase { 
        void Save(int orderId);
}

public interface ILogger {
        void LogInfo(string info);
}

public interface IEmailSender {
        void SendEmail(int userId);
}
 
// Các Module implement các Interface
public class Logger implements ILogger {
    public void LogInfo(string info) {}
}

public class Database implements IDatabase {
    public void Save(int orderId) {}
}

public class EmailSender implements IEmailSender {
    public void SendEmail(int userId) {}
}

// Hàm checkout mới sẽ như sau
public void Checkout(int orderId, int userId) {
    // Nếu muốn thay đổi database, logger ta chỉ cần thay đổi code ở dưới các module này mà không ảnh hưởng đến hàm checkout
    //IDatabase db = new XMLDatabase(); 
    //IDatebase db = new SQLDatabase();
    IDatabase db = new Database();
    db.Save(orderId);
 
    ILogger log = new Logger();
    log.LogInfo("Order has been checkout");
 
    IEmailSender es = new EmailSender();
    es.SendEmail(userId);
}
```

# 6. Kết luận
Như vậy bài viết đã trình bày về 5 nguyên lý để tạo nên SOLID. Hi vọng đã giúp mọi người hiểu được các nguyên lý này để giúp code của mình trở nên "solid" và dễ bảo trì. Nếu có gì đóng góp hay thảo luận hãy để lại bình luận phía dưới, cảm ơn đã đọc :D (seeyou)
# Reference
https://medium.com/mindorks/solid-principles-explained-with-examples-79d1ce114ace <br>
https://hackernoon.com/solid-principles-simple-and-easy-explanation-f57d86c47a7f <br>
https://toidicodedao.com/2015/03/24/solid-la-gi-ap-dung-cac-nguyen-ly-solid-de-tro-thanh-lap-trinh-vien-code-cung/ <br>
https://stackify.com/solid-design-liskov-substitution-principle/