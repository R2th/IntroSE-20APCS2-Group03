# Mở đầu
Cách đây khoảng mấy chục năm, có lẽ điều quan trọng nhất khi bạn code chỉ là sự hiệu quả và tối ưu. Khi đó RAM của máy tính còn được tính bằng byte thay vì gigabyte, tài nguyên hạn hẹp đến mức mỗi lúc máy tính chỉ có thể chạy một chương trình. Những ngày đó đã xa rồi.

Cùng với tốc độ phát triển nhanh chóng của phần cứng, tính hiệu quả tụt lại phía sau và nhường chỗ cho một yếu tố quan trọng hơn, viết code đẹp, dễ đọc và dễ hiểu. Điều này xuất phát từ thực tiễn là quy mô của các project trở nên lớn hơn, môi trường và requirement thay đổi nhanh chóng đòi hỏi code phải dễ dàng thay đổi và bảo trì. 

Trong bài viết này, mình sẽ giúp các bạn tìm hiểu nhanh về SOLID và xem nó có giúp được gì cho chúng ta nhé!
# Khái niệm
SOLID là năm nguyên lý cơ bản trong thiết kế phần mềm hướng đối tượng, giúp code trở nên dễ hiểu, linh động và dễ bảo trì hơn. Tác giả của SOLID là kỹ sư phần mềm nổi tiếng Robert C. Martin. Năm nguyên lý trong SOLID bao gồm:

![](https://images.viblo.asia/6dd0f99f-adb8-481e-aeaf-a0022e9844bb.png)
# Single responsibility principle
> A class should have only a single responsibility.

Nguyên lý này có thể hiểu là một class chỉ nên đảm nhận một và chỉ một trách nhiệm duy nhất. Hay nói theo một cách khác, chúng ta chỉ nên viết và sửa đổi một class bởi vì một lý do duy nhất mà thôi. Nguyên lý giúp code dễ quản lý và bảo trì hơn.

*Ví dụ*

Dưới đây là 1 class bao gồm các công việc liên quan thao tác CSDL:
```java
class DBHelper {

    public Connection openConnection() {};

    public void saveUser(User user) {};

    public List<Product> listProducts() {};

    public void closeConnection() {};

}
```
Chúng ta nên tách thành các class con như sau:
```java
class DBConnection {

    public Connection openConnection() {};
    
    public void closeConnection() {};
    
}

class UserHelper {
    public void saveUser(User user) {};
}

class ProductHelper {

    public List<Product> listProducts() {};

}
```
# Open/closed principle
> Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

Có thể thoải mái mở rộng 1 class, nhưng không được sửa đổi bên trong class đó 

Theo nguyên lý này, mỗi khi ta muốn thêm chức năng,.. cho chương trình, chúng ta nên viết class mới mở rộng class cũ ( bằng cách kế thừa class cũ) không nên sửa đổi class cũ.

*Ví dụ*

Sử dụng class RecyclerView.Adapter, lập trình viên có thể dễ dàng mở rộng class này và custom adapter mà không sửa đổi class RecyclerView.Adapter hiện có.
# Liskov substitution principle
> Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.

Nguyên lý này có thể hiểu là các đối tượng của class cha có thể được thay thế bởi các đối tượng của các class con mà không làm thay đổi tính đúng đắn của chương trình.

*Ví dụ*

Class Animal
```java
public class Animal {
    public void makeNoise() {
        System.out.println("I am making noise");
    }
}
```
Class Cat và Dog kế thừa từ Animal:
```java
public class Dog extends Animal {
    @Override
    public void makeNoise() {
        System.out.println("bow wow");
    }
}

public class Cat extends Animal {
    @Override
    public void makeNoise() {
        System.out.println("meow meow");
    }
}
```
Bất cứ nơi đâu sử dụng Animal đều có thể được thay thế bằng Dog và Cat 
# Interface segregation principle
> Many client-specific interfaces are better than one general-purpose interface.

Nguyên lý này có thể hiểu là thay vì viết một interface cho một mục đích chung chung, chúng ta nên tách thành nhiều interface nhỏ cho các mục đích riêng. Chúng ta không nên bắt buộc client phải implement các method mà client không cần đến.

Trong Android có nhiều cách xử lý sự kiện click: OnClickListener và OnLongClickListener.

Vậy tại sao cần đến 2 interfaces cho hành động nhấn 1 lần và nhấn giữ lâu. Tại sao không có cách viết như sau?
```java
public interface MyOnClickListener {
    void onClick(View v);
    boolean onLongClick(View v);
}
```
Vì nếu chúng ta sử dụng interface này thì người dùng sẽ phải implement cả sự kiện onLongClick ngay cả khi họ không quan tâm về việc nhấn giữ lâu. Vì vậy nên tách thành 2 interface giúp loại bỏ các phương thức không sử dụng đến. 
# Dependency inversion principle
> Depend on abstractions, not on concretions.

Nguyên lý này gồm có 2 ý nhỏ:
Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả hai nên phụ thuộc vào abstraction.
Abstraction không nên phụ thuộc vào detail. Detail nên phụ thuộc vào abstraction.

Trong Android, mô hình MVP, chúng ta cần giữ tham chiếu Presenter trong View. Và bây giờ nếu giữ lớp cụ thể hóa Presenter trong View có thể dẫn đến sự phụ thuộc. Nên hãy tạo interface chứa các phương thức thực thi của presenter và view.

*Ví dụ*

Chúng ta có 2 module cấp thấp BackendDev và FrontendDev và 1 module cấp cao Project sử dụng 2 module trên:
```java
class BackendDeveloper {
    private void codeJava() {};
}

class FrontendDeveloper {
    private void codeJS() {};
}

class Project {
    private BackendDeveloper backendDeveloper = new BackendDeveloper();
    private FrontendDeveloper frontendDeveloper = new FrontendDeveloper();

    public void build() {
        backendDeveloper.codeJava();
        frontendDeveloper.codeJS();
    }
}
```
Giả sử nếu sau này, dự án thay đổi công nghệ. Các backend developer không code Java nữa mà chuyển sang code C#. Các frontend developer không code JS thuần nữa mà nâng lên các JS framework. Rõ ràng chúng ta không những phải sửa code ở các module cấp thấp mà còn phải sửa code ở cả module cấp cao đang sử dụng các module cấp thấp đó. Điều này cho thấy module cấp cao đang phải phụ thuộc vào các module cấp thấp.

Lúc này, chúng ta sẽ bổ sung thêm một abstraction Developer để các module trên phụ thuộc vào:
```java
interface Developer {
    void develop();
}

class BackendDeveloper implements Developer {
    @Override
    public void develop() {
        codeJava();
    }

    private void codeJava() {};
}

class FrontendDeveloper implements Developer {
    @Override
    public void develop() {
        codeJS();
    }

    void codeJS() {};
}

class Project {
    private List<Developer> developers;

    public Project(List<Developer> developers) {
        this.developers = developers;
    }

    public void build() {
        developers.forEach(developer -> developer.develop());
    }
}
```

:point_right:Bài viết đến đây là hết rồi, nếu cảm thấy bài viết hữu ích :ok_hand:, có thể đăng nhập và like cho mình nhé :+1:. Nhớ folow để xem các các bài viết sắp tới của mình nhé. Thanks! :handshake:
# Tài liệu tham khảo
https://medium.com/mindorks/solid-principles-explained-with-examples-79d1ce114ace