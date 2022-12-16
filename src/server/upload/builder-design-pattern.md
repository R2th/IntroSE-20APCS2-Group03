Trong công nghệ phần mềm, một mẫu thiết kế *design pattern* là một giải pháp tổng thể cho các vấn đề chung trong thiết kế phần mềm, giúp thiết kế của chúng ta linh hoạt, dễ dàng thay đổi và bảo trì hơn. 

Ở trong bài ngày hôm nay, mình xin giới thiệu với các bạn một loại *design pattern*, đó là **Builder Pattern**.

## Builder Pattern là gì? 
Tất nhiên rồi **Builder Pattern** là một trong những design pattern, nhưng cụ thể **Builder pattern** là một trong những *Creational pattern* - những mẫu thiếu kế cho việc khởi tạo đối tượng của lớp.

Hơn nữa, **Builder pattern** được tạo ra để xây dựng một đôi tượng phức tạp bằng cách sử dụng các đối tượng đơn giản và sử dụng tiếp cận từng bước, việc xây dựng các đối tượng đôc lập với các đối tượng khác.

## Builder Pattern giải quyết vấn đề gì?

Tất cả chúng ta đều biết, ở ngôn ngữ Java, trong mỗi lớp đều có những hàm *constructor* và nếu chúng không được khai báo thì trình biên dịch sẽ tự động xây dựng một hàm *constructor* mặc định cho lớp ấy. 

Khi chúng ta xây dựng, chúng ta cũng thể tùy ý lựa chọn những tham số truyền vào cho *constructor* miễn là nó hữu ích cho chúng ta.

Như vậy, vấn đề đặt ra ở đây khi một đối tượng của chúng ta có thể được khởi tạo với rất nhiều những tham số truyền vào và có thể một vài trong số đó không nhất thiết phải truyền vào trong lúc khởi tạo(có thể có hoặc không). 

```Java
     public Student(String id, String firstName, String lastName, String dayOfBirth, String currentClass, String address,
                   String phone) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dayOfBirth = dayOfBirth;
        this.currentClass = currentClass;
        this.address = address;
        this.phone = phone;
     }
```

Không sao cả, chúng ta có thể dễ dàng giải quyết bằng cách truyền những giá trị *null* vào tham số trong hàm *constructor* hoặc là nạp chồng nhiều hàm *constructor* khác với những tham số tùy ý. Khi đó lớp của chúng ta sẽ trông như này:

```Java
    public Student(String id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Student(String id, String currentClass, String address, String phone) {
        this.id = id;
        this.currentClass = currentClass;
        this.address = address;
        this.phone = phone;
    }
```
Cách này ban đầu nghe có vẻ ổn nhưng sẽ có những nhược điểm như sau: 
* Phải tạo rất nhiều hàm constructor trong những trường hợp khác nhau 
* Khó khăn trong việc xác định thứ tự của những tham số truyền vào 

Vấn đề này lại sinh ra vấn đề khác, vậy liệu **Builder Pattern** sẽ giải quyết vấn đề này như thế nào? Chúng ta cùng xem cấu tạo của **Builder Pattern** nhé!

## Cấu tạo Builder Pattern như nào?
Đây là biểu đồ lớp khi chúng ta thiết kế Builder Pattern 
![](https://images.viblo.asia/5bbe2638-a212-4d14-adc3-36a037c27dd9.jpg)

Chúng ta có thể thấy, Builder Pattern sẽ gồm có 4 thành phần chính: 
* *Product* : đại diện cho đối tượng cần tạo, đối tượng này phức tạp, có nhiều thuộc tính.
* *Builder* : là abstract class hoặc interface khai báo phương thức tạo đối tượng.
* *ConcreteBuilder* : kế thừa Builder và cài đặt chi tiết cách tạo ra đối tượng. Nó sẽ xác định và nắm giữ các thể hiện mà nó tạo ra, đồng thời nó cũng cung cấp phương thức để trả các các thể hiện mà nó đã tạo ra trước đó.
* *Director*: là nơi sẽ gọi tới Builder để tạo ra đối tượng.

## Cài đặt Builder Pattern 
Bây giờ chúng ta cùng nhau cài đặt *Builder Pattern* nhé

Như mình đã nói ở trên, chúng ta sẽ có 4 thành phần chính: *Product, Builder, ConcreteBuilder, Director*. 

Mình sẽ thiết kế thành phần *Product* trước, để hình dung ra được đầu ra của chúng ta là gì, trong ví dụ của mình, đại diện cho thành phần *Product* là lớp *Student*

Rất đơn giản thôi, lớp này chúng ta sẽ khai báo những thuộc tính của *Student*, ở đây mình chỉ viết thêm những phương thức *getter* vì không cần có nhu cầu gán giá trị qua những hàm *setter* 

```Java 
// Product 
public class Student {
    private String id;
    private String firstName;
    private String lastName;
    private String dayOfBirth;
    private String currentClass;
    private String phone;

    public Student(String id, String firstName, String lastName, String dayOfBirth, String currentClass, String phone) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dayOfBirth = dayOfBirth;
        this.currentClass = currentClass;
        this.phone = phone;
    }
}

```

Tiếp theo chúng ta cùng thiết kế thành phần *Builder*, định nghĩa những phương thức của *Builder* 

```Java 
// Builder 
public interface StudentBuilder {

    StudentBuilder setId(String id);

    StudentBuilder setFirstName(String firstName);

    StudentBuilder setLastName(String lastName);

    StudentBuilder setDayOfBirth(String dayOfBirth);

    StudentBuilder setCurrentClass(String currentClass);

    StudentBuilder setPhone(String phone);

    Student build();
}
```

Sau khi định nghĩa được những phương thức của *Builder* rồi, ta cùng viết thành phần *ConcreteBuilder* kế thừa từ *Builder* 

```Java 
// ConcreteBuilder
public class StudentConcreteBuilder implements StudentBuilder {

    private String id;
    private String firstName;
    private String lastName;
    private String dayOfBirth;
    private String currentClass;
    private String phone;

    @Override
    public StudentBuilder setId(String id) {
        this.id = id;
        return this;
    }

    @Override
    public StudentBuilder setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    @Override
    public StudentBuilder setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    @Override
    public StudentBuilder setDayOfBirth(String dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
        return this;
    }

    @Override
    public StudentBuilder setCurrentClass(String currentClass) {
        this.currentClass = currentClass;
        return this;
    }

    @Override
    public StudentBuilder setPhone(String phone) {
        this.phone = phone;
        return this;
    }

    @Override
    public Student build() {
        return new Student(id, firstName, lastName, dayOfBirth, currentClass, phone);
    }
}
```

Như vậy là chúng ta đã thiết kế xong 3 thành phần rồi, còn thành phần cuối cùng là *Director* chính là nơi chúng ta gọi ra *Builder* để khởi tạo đối tượng, ví dụ này mình sẽ khởi tạo đối tượng trong hàm *main() *

```Java
public static void main(String[] args) {

        StudentBuilder studentBuilder = new StudentConcreteBuilder()
                .setFirstName("Tran")
                .setLastName("Quang Huy");

        System.out.println(studentBuilder.build());
    }
```
Tài liệu tham khảo 
O'REIILY Head First Design Patterns: A Brain-Friendly Guide