![](https://images.viblo.asia/c55d7f1e-9070-4397-9178-2ae5fbe42a88.PNG)

Có một lý do mà chúng tôi giữ các biến của chúng tôi riêng tư. Chúng tôi không muốn ai khác phụ thuộc vào họ. Chúng tôi muốn giữ sự tự do để thay đổi loại hình hoặc việc thực hiện của họ theo ý thích sử dụng của riêng họ. Tại sao, sau đó, nhiều lập trình viên tự động thêm "getters và setters" cho các đối tượng (objects) của họ, phơi bày các biến (variable) riêng tư của họ như thể chúng là công khai ?

# Data Abstraction
Hãy xem xét sự khác biệt giữa Listing 6-1 và Listing 6-2. Cả hai đều đại diện cho dữ liệu của một điểm trên mặt phẳng Cartesian. Nhưng một Listing phơi bày việc thực hiện và Listing kia hoàn toàn che giấu nó.
```
Listing 6-1
Concrete Point
public class Point {
    public double x;
    public double y;
}
```

```
Listing 6-2
Abstract Point
public interface Point {
    double getX();
    double getY();
    void setCartesian(double x, double y);
    double getR();
    double getTheta();
    void setPolar(double r, double theta);
}
```

Điều hay của Listing 6-2 là không có cách nào bạn có thể biết việc triển khai là ở tọa độ hình chữ nhật hay tọa độ cực. Nó có thể là không cái nào ! Tuy nhiên, interface vẫn không thể nhầm lẫn represent cho cấu trúc dữ liệu (data structure).
Nhưng nó đại diện không chỉ là một cấu trúc dữ liệu (data structure). Các phương pháp thực thi một chính sách truy cập. Bạn có thể đọc các tọa độ riêng lẻ một cách độc lập, nhưng bạn phải đặt các tọa độ lại với nhau hoạt động như một phương thức.
Listing 6-1, mặt khác, được triển khai rất rõ ràng trong các tọa độ hình chữ nhật và nó buộc chúng ta phải thao tác các tọa độ đó một cách độc lập. Điều này phơi bày việc thực hiện. Thật vậy, nó sẽ phơi bày việc thực hiện ngay cả khi các biến là riêng tư và chúng tôi đang sử dụng các getters và setters biến đơn.
Hiding implementation không chỉ là vấn đề đặt một lớp chức năng giữa các biến. Hiding implementation là về trừu tượng ! Một lớp không chỉ đơn giản là đẩy các biến của nó ra thông qua getters và setters. Thay vào đó, nó phơi bày các giao diện trừu tượng cho phép người dùng thao tác bản chất của dữ liệu mà không cần phải biết việc thực hiện.

Hãy xem xét Listing 6-3 và Listing 6-4. Cái đầu tiên sử dụng thuật ngữ cụ thể để truyền đạt mức nhiên liệu của một chiếc xe, trong khi cái thứ hai làm như vậy với sự trừu tượng của tỷ lệ phần trăm. Trong trường hợp Concrete Vehicle, bạn có thể khá chắc chắn các biến được sử dụng. Trong trường hợp Abstract Vehicle, bạn không có chút manh mối nào về hình thức của dữ liệu.

```
Listing 6-3
Concrete Vehicle
public interface Vehicle {
    double getFuelTankCapacityInGallons();
    double getGallonsOfGasoline();
}
```
```
Listing 6-4
Abstract Vehicle
public interface Vehicle {
    double getPercentFuelRemaining();
}
```

Trong cả hai trường hợp trên, tùy chọn thứ hai là thích hợp hơn. Chúng tôi không muốn tiết lộ chi tiết về dữ liệu của chúng tôi. Thay vào đó chúng tôi muốn thể hiện dữ liệu của chúng tôi trong các abtract terms. 

# Data/Object Anti-Symmetry
Hai ví dụ này cho thấy sự khác biệt giữa các objects và data structure. Các đối tượng (objects) ẩn dữ liệu của họ đằng sau trừu tượng và phơi bày các chức năng hoạt động trên dữ liệu đó. Cấu trúc dữ liệu (data structure) phơi bày dữ liệu của họ và không có chức năng có ý nghĩa. 
Lưu ý bản chất của hai định nghĩa. Họ là những đối lập ảo. Sự khác biệt này có vẻ tầm thường, nhưng nó có ý nghĩa sâu rộng.

Ví dụ, xem xét ví dụ về hình dạng thủ tục trong Listing 6-5. Lớp Geometry hoạt động trên ba lớp hình dạng. Các lớp hình dạng là các cấu trúc dữ liệu (data structure) đơn giản mà không có bất kỳ hành vi nào. Tất cả các hành vi là trong lớp Hình học.

```
Listing 6-5
Procedural Shape
public class Square {
    public Point topLeft;
    public double side;
}

public class Rectangle {
    public Point topLeft;
    public double height;
    public double width;
}

public class Circle {
    public Point center;
    public double radius;
}

public class Geometry {
    public final double PI = 3.141592653589793;
    public double area(Object shape) throws NoSuchShapeException
{
    if (shape instanceof Square) {
        Square s = (Square)shape;
        return s.side * s.side;
    } else if (shape instanceof Rectangle) {
        Rectangle r = (Rectangle)shape;
        return r.height * r.width;
    } else if (shape instanceof Circle) {
        Circle c = (Circle)shape;
        return PI * c.radius * c.radius;
    }
        throw new NoSuchShapeException();
    }
}
```
Các lập trình viên hướng đối tượng có thể nhăn mũi vì điều này và phàn nàn rằng đó là quy trình thủ tục và họ đã đúng. Nhưng người chế nhạo có thể không được đảm bảo chất lượng. Xem xét những gì sẽ xảy ra nếu một hàm *perimeter()* được thêm vào *Geometry*. Các shape classes sẽ không bị ảnh hưởng! Bất kỳ lớp nào khác phụ thuộc vào shape classes cũng sẽ không bị ảnh hưởng! Mặt khác, nếu tôi thêm một shape mới, tôi phải thay đổi tất cả các chức năng trong *Geometry* để đối phó với nó.

Bây giờ hãy xem xét giải pháp hướng đối tượng trong Listing 6-6. Ở đây phương thức area() là đa hình. Không có lớp *Geometry* là cần thiết. Vì vậy, nếu tôi thêm shape mới, không có chức năng hiện có nào bị ảnh hưởng, nhưng nếu tôi thêm chức năng mới, tất cả các shape phải được thay đổi !

```
Listing 6-6
Polymorphic Shapes
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

Một lần nữa, chúng ta thấy bản chất của hai định nghĩa này; chúng là những đối lập ảo! Điều này phơi bày sự phân đôi cơ bản giữa các đối tượng (objects) và cấu trúc dữ liệu (data structure):
* Procedural code (mã sử dụng cấu trúc dữ liệu) giúp dễ dàng thêm các chức năng mới mà không thay đổi cấu trúc dữ liệu hiện có. Mặt khác, mã OO giúp dễ dàng thêm các lớp mới mà không thay đổi các chức năng hiện có.
* Procedural code làm cho việc thêm cấu trúc dữ liệu mới trở nên khó khăn vì tất cả các chức năng phải thay đổi. Mã OO làm cho việc thêm các hàm mới trở nên khó khăn vì tất cả các lớp phải thay đổi

Vì vậy, những điều khó đối với OO là dễ dàng cho thủ tục và những điều khó đối với thủ tục là dễ dàng đối với OO!
Trong bất kỳ hệ thống phức tạp nào, sẽ có lúc chúng ta muốn thêm các kiểu dữ liệu mới thay vì các hàm mới. Đối với những trường hợp này, đối tượng và OO là thích hợp nhất. Mặt khác, cũng sẽ có lúc chúng tôi muốn thêm các chức năng mới. Trong trường hợp đó, Procedural code và data structure sẽ phù hợp hơn.

# The Law of Demeter
Có một heuristic nổi tiếng được gọi là Luật Demeter2 nói rằng một mô-đun không nên biết về phần bên trong của các đối tượng mà nó thao túng. Như chúng ta đã thấy trong phần trước, các đối tượng ẩn dữ liệu của họ và phơi bày các hoạt động. Điều này có nghĩa là một đối tượng không nên phơi bày cấu trúc bên trong của nó thông qua các bộ truy cập bởi vì làm như vậy là để lộ, thay vì che giấu, cấu trúc bên trong của nó. Chính xác hơn, Luật Demeter nói rằng một phương thức f của lớp C chỉ nên gọi các phương thức sau:
* C
* Một đối tượng được tạo bởi f
* Một đối tượng được truyền dưới dạng đối số cho f
* Một đối tượng được giữ trong một biến thể của C
The method should not invoke methods on objects that are returned by any of the allowed functions. In other words, talk to friends, not to strangers.

## Train Wrecks
Loại mã này thường được gọi là xác tàu hỏa vì nó trông giống như một loạt các toa tàu được ghép nối. Các chuỗi cuộc gọi như thế này thường được coi là kiểu cẩu thả và nên tránh. Thông thường tốt nhất là chia chúng ra như sau:
```
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
final String outputDir = scratchDir.getAbsolutePath();
```
Việc này có vi phạm Demeter hay không tùy thuộc vào việc ctxt hay không, Options và ScratchDir là các đối tượng hoặc cấu trúc dữ liệu. Nếu chúng là các đối tượng, thì cấu trúc bên trong của chúng nên được ẩn đi chứ không được phơi bày, và vì vậy kiến thức về bộ phận bên trong của chúng là một sự vi phạm rõ ràng về Luật của Demeter. Mặt khác, nếu ctxt, Tùy chọn và ScratchDir chỉ là các cấu trúc dữ liệu không có hành vi, thì chúng sẽ tự nhiên phơi bày cấu trúc bên trong của chúng và vì vậy Demeter không áp dụng.
Việc sử dụng các hàm accessor gây nhầm lẫn vấn đề. Nếu mã được viết như sau, thì có lẽ chúng tôi sẽ hỏi về vi phạm của Demeter
```
final String outputDir = ctxt.options.scratchDir.absolutePath;
```
Vấn đề này sẽ ít gây nhầm lẫn hơn nếu cấu trúc dữ liệu đơn giản chỉ có các biến công khai và không có chức năng, trong khi các đối tượng có các biến riêng tư và các hàm công khai. Tuy nhiên, có các khung và tiêu chuẩn yêu cầu rằng ngay cả các cấu trúc dữ liệu đơn giản cũng có bộ truy cập và bộ biến đổi.

## Hybrids
Sự nhầm lẫn này đôi khi dẫn đến các cấu trúc lai không may là một nửa đối tượng và một nửa cấu trúc dữ liệu. Chúng có các chức năng làm những việc quan trọng, và chúng cũng có các biến công khai hoặc các bộ truy cập và bộ biến đổi công khai, cho tất cả các ý định và mục đích, thực hiện các biến riêng tư công khai, thay đổi các hàm bên ngoài khác sử dụng các biến đó theo cách một chương trình thủ tục sẽ sử dụng cấu trúc dữ liệu.

Các giống lai này làm cho việc thêm các chức năng mới trở nên khó khăn nhưng cũng khiến việc thêm các cấu trúc dữ liệu mới trở nên khó khăn. Họ là tồi tệ nhất của cả hai thế giới. Tránh tạo ra chúng. Chúng là dấu hiệu cho thấy một thiết kế tồi mà các tác giả của chúng không chắc chắn về điều đó hay tệ hơn, không biết gì về việc liệu họ có cần bảo vệ khỏi các *function* hoặc *type*.

## Hiding Structure
Điều gì xảy ra nếu ctxt, Options và scratchDir là các đối tượng có hành vi thực sự? Sau đó, vì các đối tượng được cho là che giấu cấu trúc bên trong của chúng, chúng ta không thể điều hướng qua chúng. Làm thế nào sau đó chúng ta sẽ có được đường dẫn tuyệt đối của thư mục đầu?
```
ctxt.getAbsolutePathOfScratchDirectoryOption();
```
or 
```
ctx.getScratchDirectoryOption().getAbsolutePath()
```

Tùy chọn đầu tiên có thể dẫn đến sự bùng nổ của các phương thức trong đối tượng ctxt. Giả định thứ hai cho rằng getScratchDirectoryOption () trả về cấu trúc dữ liệu, không phải là một đối tượng. Không có lựa chọn nào cảm thấy tốt.
Nếu ctxt là một đối tượng, chúng ta nên bảo nó làm gì đó; chúng ta không nên hỏi nó về nội bộ của nó. Vậy tại sao chúng ta muốn đường dẫn tuyệt đối của thư mục đầu? Chúng ta sẽ làm gì với nó? Xem xét mã này từ (nhiều dòng xa hơn) trong cùng một mô-đun:
```
String outFile = outputDir + "/" + className.replace('.', '/') + ".class";
FileOutputStream fout = new FileOutputStream(outFile);
BufferedOutputStream bos = new BufferedOutputStream(fout);
```

Sự kết hợp của các mức độ chi tiết khác nhau là một chút rắc rối. Các dấu chấm, dấu gạch chéo, phần mở rộng tệp và các đối tượng Tệp không được trộn lẫn với nhau một cách bất cẩn và trộn lẫn với mã kèm theo. Tuy nhiên, bỏ qua điều đó, chúng tôi thấy rằng mục đích nhận được đường dẫn tuyệt đối của thư mục *scratch* là tạo một tệp *scratch* của một tên cụ thể.
So, what if we told the ctxt object to do this?
```
BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName);
```
Đó dường như là một điều hợp lý cho một đối tượng để làm! Điều này cho phép ctxt ẩn nội bộ của nó và ngăn chức năng hiện tại khỏi vi phạm Luật Demeter bằng cách điều hướng qua các đối tượng mà nó không nên biết.

# Data Transfer Objects
Dạng tinh túy của cấu trúc dữ liệu là một lớp có các biến công khai và không có hàm. Điều này đôi khi được gọi là một đối tượng truyền dữ liệu, hoặc DTO. DTO là các cấu trúc rất hữu ích, đặc biệt là khi giao tiếp với cơ sở dữ liệu hoặc phân tích thông điệp, và như thế. Chúng thường trở thành đầu tiên trong một loạt các giai đoạn dịch thuật chuyển đổi dữ liệu thô trong cơ sở dữ liệu thành các đối tượng trong mã ứng dụng.
Somewhat more common is the “bean” form shown in Listing 6-7. Beans have private variables manipulated by getters and setters. The quasi-encapsulation of beans seems to make some OO purists feel better but usually provides no other benefit.

```
Listing 6-7
address.java
public class Address {
    private String street;
    private String streetExtra;
    private String city;
    private String state;
    private String zip;
    public Address(String street, String streetExtra,
    String city, String state, String zip) {
        this.street = street;
        this.streetExtra = streetExtra;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
    
    public String getStreet() {
        return street;
    }

    public String getStreetExtra() {
        return streetExtra;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }
    public String getZip() {
        return zip;
    }
}
```
# Conclusion
Đối tượng phơi bày hành vi và ẩn dữ liệu. Điều này giúp dễ dàng thêm các loại đối tượng mới mà không thay đổi các hành vi hiện có. Nó cũng làm cho việc thêm các hành vi mới vào các đối tượng hiện có trở nên khó khăn. Cấu trúc dữ liệu (data structure) phơi bày dữ liệu và không có hành vi đáng kể. Điều này giúp dễ dàng thêm các hành vi mới vào các cấu trúc dữ liệu (data structure)  hiện có nhưng làm cho việc thêm cấu trúc dữ liệu (data structure) mới vào các chức năng hiện có trở nên khó khăn.

Trong bất kỳ hệ thống cụ thể nào, đôi khi chúng tôi sẽ muốn linh hoạt thêm các loại dữ liệu mới và vì vậy chúng tôi thích các đối tượng cho phần đó của hệ thống. Những lần khác, chúng tôi sẽ muốn linh hoạt để thêm các hành vi mới, và vì vậy trong phần đó của hệ thống, chúng tôi thích các loại dữ liệu và quy trình. Các nhà phát triển phần mềm giỏi hiểu những vấn đề này mà không ảnh hưởng và chọn cách tiếp cận tốt nhất cho công việc trong tay.