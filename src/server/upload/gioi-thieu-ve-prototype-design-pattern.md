## Ý đồ
Prototype là một creational design pattern cho phép bạn sao chép các object hiện có mà không làm cho code của bạn phụ thuộc vào các class của chúng.

![](https://images.viblo.asia/33b02913-e76f-476a-bf41-11adca0c777a.png)


## Vấn đề
Giả sử bạn có một object và bạn muốn tạo một bản sao của nó. Bạn sẽ làm điều này như thế nào? Đầu tiên, bạn phải tạo một object mới của cùng một class. Sau đó, bạn phải sao chép giá trị của tất cả các trường từ object gốc sang object mới.

OK, đến đây là bạn nghĩ vấn đề đã được giải quyết đúng không? Nhưng thực ra có một vấn đề, là không phải tất cả các object đều có thể được sao chép theo cách đó vì một số trường của object có thể là private và không thể nhìn thấy từ bên ngoài object.

![](https://images.viblo.asia/46b8dd86-e579-4965-ac31-0e7b9d63eea0.png)

*Không phải lúc nào chúng ta cũng có thể sao chép một object "từ bên ngoài"*

Có một vấn đề nữa với phương pháp tiếp cận trực tiếp vừa kể trên. Vì bạn phải biết class của object để tạo bản sao, code của bạn sẽ phụ thuộc vào class đó. Nếu bạn OK với việc bị phụ thuộc đó, thì lại còn một vấn đề khác nữa. Đôi khi bạn chỉ biết interface mà object implement, nhưng không biết class cụ thể của nó, ví dụ, khi một tham số trong một phương thức chấp nhận bất kỳ object nào implement một interface nào đó.

## Giải pháp
Design pattern Prototype ủy thác quá trình nhân bản cho các object thực tế là đối tượng của việc nhân bản. Design pattern khai báo một interface chung cho tất cả các object hỗ trợ nhân bản. Interface này cho phép bạn sao chép một object mà không cần couple code của bạn với class của object đó. Thông thường, một interface như vậy chỉ chứa một phương thức `clone` duy nhất.

Việc triển khai phương thức `clone` là rất giống nhau trong tất cả các class. Phương thức này tạo một object của class hiện tại và chuyển tất cả các giá trị trường của object cũ sang một object mới. Bạn thậm chí có thể sao chép các trường riêng tư vì hầu hết các ngôn ngữ lập trình đều cho phép các object truy cập các trường private của các object khác thuộc cùng một class.

Một object hỗ trợ nhân bản được gọi là một *prototype*. Khi các object của bạn có hàng chục trường và hàng trăm cách các trường đó phối kết hợp, thì việc nhân bản chúng có thể là một giải pháp thay thế cho subclassing.

![](https://images.viblo.asia/afd88b74-2016-4bdd-baa4-fe0025358b52.png)

*Prototype được tạo sẵn có thể là lựa chọn thay thế cho subclassing*

Cách hoạt động của design pattern này như sau: Bạn tạo một tập hợp các object, được định cấu hình theo nhiều cách khác nhau. Khi bạn cần một object giống như object bạn đã định cấu hình, bạn chỉ cần sao chép một prototype thay vì xây dựng một object mới từ đầu.

## Ví dụ trong thế giới thực
Trong thế giới thực, prototype được sử dụng để thực hiện các thử nghiệm trước khi bắt đầu sản xuất hàng loạt một sản phẩm. Tuy nhiên, trong trường hợp này, các prototype không tham gia vào bất kỳ quá trình sản xuất thực tế nào, thay vào đó đóng vai trò thụ động.

![](https://images.viblo.asia/1e96f706-1473-4db0-b461-2f56bd9e22c0.png)

*Sự phân chia tế bào*

Vì các prototypes trong công nghiệp không thực sự tự sao chép, một ví dụ gần hơn với Design pattern này là quá trình phân bào giảm nhiễm. Sau khi nguyên phân, một cặp tế bào giống hệt nhau được hình thành. Tế bào gốc hoạt động như một prototype và có vai trò chủ động trong việc tạo ra bản sao.

## Cấu trúc
**Implementation cơ bản**
![](https://images.viblo.asia/ee4a67a3-cd10-4916-b5aa-8f96a4626ca0.png)

1. Interface **Prototype** khai báo các phương pháp nhân bản. Trong hầu hết các trường hợp, người ta chỉ khai báo một phương pháp `clone` duy nhất.

2. Class **Concrete Prototype** implement phương thức nhân bản. Ngoài việc sao chép dữ liệu của object gốc sang bản sao, phương pháp này cũng có thể xử lý một số trường hợp biên của quá trình sao chép liên quan đến việc sao chép các Object được liên kết, gỡ rối các recursive dependencie, v.v.

3. **Client** có thể tạo một bản sao của bất kỳ object nào, miễn là object đó implment Interface prototype.


## Giả mã
Trong ví dụ này, Prototype design pattern cho phép chúng ta tạo các bản sao chính xác của các object hình dạng mà không cần couple code với các class của chúng.

![](https://images.viblo.asia/0e1b12d1-85fb-4a7a-8e75-57242d27e94e.png)

*Nhân bản một tập hợp các object thuộc một class hierarchy.*

Tất cả các class hình dạng cùng implement một interface. Interface này cung cấp một phương pháp nhân bản. Một class con có thể gọi phương thức sao chép của class cha trước khi sao chép các giá trị các trường của chính nó vào object kết quả.

```
// Base prototype.
abstract class Shape is
    field X: int
    field Y: int
    field color: string

    // A regular constructor.
    constructor Shape() is
        // ...

    // The prototype constructor. A fresh object is initialized
    // with values from the existing object.
    constructor Shape(source: Shape) is
        this()
        this.X = source.X
        this.Y = source.Y
        this.color = source.color

    // The clone operation returns one of the Shape subclasses.
    abstract method clone():Shape


// Concrete prototype. The cloning method creates a new object
// and passes it to the constructor. Until the constructor is
// finished, it has a reference to a fresh clone. Therefore,
// nobody has access to a partly-built clone. This keeps the
// cloning result consistent.
class Rectangle extends Shape is
    field width: int
    field height: int

    constructor Rectangle(source: Rectangle) is
        // A parent constructor call is needed to copy private
        // fields defined in the parent class.
        super(source)
        this.width = source.width
        this.height = source.height

    method clone():Shape is
        return new Rectangle(this)


class Circle extends Shape is
    field radius: int

    constructor Circle(source: Circle) is
        super(source)
        this.radius = source.radius

    method clone():Shape is
        return new Circle(this)


// Somewhere in the client code.
class Application is
    field shapes: array of Shape

    constructor Application() is
        Circle circle = new Circle()
        circle.X = 10
        circle.Y = 10
        circle.radius = 20
        shapes.add(circle)

        Circle anotherCircle = circle.clone()
        shapes.add(anotherCircle)
        // The `anotherCircle` variable contains an exact copy
        // of the `circle` object.

        Rectangle rectangle = new Rectangle()
        rectangle.width = 10
        rectangle.height = 20
        shapes.add(rectangle)

    method businessLogic() is
        // Prototype rocks because it lets you produce a copy of
        // an object without knowing anything about its type.
        Array shapesCopy = new Array of Shapes.

        // For instance, we don't know the exact elements in the
        // shapes array. All we know is that they are all
        // shapes. But thanks to polymorphism, when we call the
        // `clone` method on a shape the program checks its real
        // class and runs the appropriate clone method defined
        // in that class. That's why we get proper clones
        // instead of a set of simple Shape objects.
        foreach (s in shapes) do
            shapesCopy.add(s.clone())

        // The `shapesCopy` array contains exact copies of the
        // `shape` array's children.
```


## Tính ứng dụng
**1. Sử dụng design pattern prototype khi bạn không muốn code bị phụ thuộc vào các concrete class của object cụ thể mà bạn cần sao chép.**
Điều này xảy ra rất nhiều khi code của bạn hoạt động với các object được pass từ code của bên thứ 3 thông qua interface. Bạn không biết class cụ thể của những object này, nên bạn có muốn phụ thuộc cũng không thể.

Design pattern prototype cung cấp cho code client một interface chung để bạn có thể làm việc với tất cả các object hỗ trợ nhân bản. Interface này làm cho code client độc lập với các class cụ thể của các object mà nó sao chép.

**2. Sử dụng pattern này khi bạn muốn giảm số lượng các class con chỉ khác nhau về cách khởi tạo. Ai đó có thể đã tạo ra các class con này để có thể tạo các object với một cấu hình cụ thể.**

Design pattern prototype cho phép bạn sử dụng một tập hợp các object được tạo sẵn, được cấu hình theo nhiều cách khác nhau, để làm prototype.

Thay vì khởi tạo một class con phù hợp với một số cấu hình, client có thể chỉ cần tìm kiếm một prototype thích hợp và sao chép nó.

## Cách triển khai
1. Tạo interface prototype và khai báo phương thức `clone` trong đó. Hoặc chỉ cần thêm phương thức vào tất cả các class của class hierarchy nếu có.

2. Một class prototype phải xác định phương thức khởi tạo thay thế nhận một object của class đó làm argument. Hàm tạo phải sao chép giá trị của tất cả các trường được định nghĩa trong class từ object được truyền vào instance mới được tạo. Nếu bạn đang thay đổi một class con, bạn phải gọi hàm tạo cha để cho phép class cha xử lý việc sao chép các trường riêng tư của nó.

Nếu ngôn ngữ lập trình bạn dùng không hỗ trợ method overloading, bạn có thể định nghĩa một phương pháp đặc biệt để sao chép dữ liệu object. Constructor là nơi thích hợp để làm điều này vì nó cung cấp object kết quả ngay sau khi bạn gọi operator `new`.

3. Phương thức nhân bản thường chỉ bao gồm một dòng: chạy `new` với phiên bản constructor dùng để tạo prototype. Lưu ý rằng mọi class phải override rõ ràng phương thức nhân bản và sử dụng tên class của chính nó khi gọi `new`. Nếu không, phương thức nhân bản có thể tạo ra một object của class cha.


## Ưu nhược điểm
✔Có thể sao chép các object mà không cần couple với các class cụ thể của chúng.

✔Không cần lặp đi lặp lại mã khởi tạo 

✔Bạn có thể tạo các object phức tạp một cách thuận tiện hơn.

✔Là một giải pháp thay thế cho kế thừa khi phải xử lý các cài đặt trước cấu hình cho các object phức tạp.

✖Sao chép các object phức tạp có phụ thuộc vòng có thể rất khó.


## Mối quan hệ với các mẫu khác
* Nhiều thiết kế bắt đầu bằng cách sử dụng Factory Method (ít phức tạp hơn và có thể tùy chỉnh nhiều hơn thông qua các class con) và phát triển theo hướng Abstract Factory, Prototype hoặc Builder (linh hoạt hơn nhưng phức tạp hơn).

* Các class Abstract Factory thường dựa trên một tập hợp các Abstract Factory, nhưng bạn cũng có thể sử dụng Prototype để soạn các phương thức trên các class này.

* Prototype có thể hữu ích khi bạn cần lưu các bản sao của Command vào lịch sử.

* Các thiết kế sử dụng nhiều Composite và Decorator thường có thể được bổ trợ từ việc sử dụng Prototype. Áp dụng mẫu cho phép bạn sao chép các cấu trúc phức tạp thay vì xây dựng lại chúng từ đầu.

* Prototype không dựa trên tính kế thừa, vì vậy nó không có nhược điểm của kế thừa. Mặt khác, Prototype yêu cầu khởi tạo object nhân bản phức tạp. Factory Method dựa trên kế thừa nhưng không yêu cầu bước khởi tạo.

* Đôi khi Prototype có thể là một giải pháp thay thế đơn giản hơn cho Memento. Điều này hoạt động nếu object hoặc trạng thái mà bạn muốn lưu trữ trong lịch sử khá đơn giản và không có liên kết đến tài nguyên bên ngoài hoặc các liên kết dễ thiết lập lại.

* Abstract Factories, Builders và Prototypes đều có thể implement như Singleton.