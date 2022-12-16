# Khái niệm
**Abstract factory** là một pattern dành cho thiết kế hướng đối tượng trong phần mềm, nó cung cấp một một lớp giao diện có chức năng tạo ra các đối tượng liên quan mà không chỉ ra những lớp cụ thể nào ở thời điểm thiết kế. Nó được xếp vào loại design pattern creational design.

![](https://images.viblo.asia/f6dae825-92ba-4e94-a298-0e9c536c3d6c.png)
<div align="center"><b>Nguồn: refactoring.guru</b></div>

# Bối cảnh
Giả sử chúng ta có một nhà máy sản xuất thời trang với nhiều phân xưởng. Cái thì phụ trách sản xuất giày, cái sản xuất váy, cái thì sản xuất mũ,..Yêu cầu đặt ra là chúng ta cần tạo ra nhà máy sao cho nó đáp ứng được hầu hết các thay đổi thị hiếu người dùng và thị trường, như mùa hè thì sản xuất mẫu A, mùa đông lại sản xuất mẫu B cho từng dòng sản phẩm giày, váy, quần áo...Với điều kiện là không phải đầu tư thêm máy móc và nhân công hay sắp xếp lại bộ máy nhân sự vì rất tốn kém và mất nhiều thời gian. Điều này cũng tượng tự như việc thiết kế hệ thống phần mềm, ở bài viết này tôi giả sử phần mềm này là một nhà máy sản xuất thời trang như vậy.

Với yêu cầu đặt ra như vậy chúng ta cần một cách để tạo ra các dòng sản phẩm một cách riêng biệt. Ví dụ mùa hè thì có giày mùa hè, váy mùa hè và mua đông lại có giày và váy của mùa đông.

# Giải pháp
- Điều đầu tiên **Abstract Factory** pattern đề suất khai báo một cách rõ rằng interfaces cho mỗi loại product riêng biệt cho từng dòng product (Ví dụ: giãy, váy, áo, mũ,...). Tiếp theo, bạn cần làm tất cả biến thể của product theo các interfaces. Ví dụ, tất cả các biến thể của giày (shoe) sẽ implement ```Ishoe``` interface, các biến thể của váy sẽ implement ```IDress``` interface,..Các bạn có thể hình dung như hình bên dưới:

![](https://images.viblo.asia/510761d7-b4a2-4d4c-a798-974aa9e128d7.png)


- Tiếp đến bạn khai báo ```Abstract Factory```, một interface với một danh sách các phương thức để tạo tất cả các product thuộc cùng dòng product (dòng ở đây được hiểu là các mẫu mùa hè, mùa đông)

![](https://images.viblo.asia/9191706c-bc89-4e42-b614-6f7a20a82d60.png)

Bây giờ, làm thế nào với các biến thể product ? Với mỗi loại biến thể của dòng product, chúng ta tạo ra một factory class tách biệt dựa trên ```AbstractFactory``` interface. Một factory class là một class mà trả về product của một loại riêng biệt. Ví dụ ```SummerFashion``` sẽ chỉ tạo ra các đối tượng ```SummerShoe```, ```SummerDress```, vân vân..

# Cấu trúc
![](https://images.viblo.asia/ed8f7ae4-e0d6-484c-9bb4-8e8b15520a16.png)
<div align="center"><b>Nguồn: refactoring.guru</b></div>

- **Abstract Products**: Khai báo các interfaces cho các loại riêng biệt nhưng các product có liên quan sẽ tạo thành một dòng product.
- **Concrete Products**: Là các implement khác nhau của abstract product, được nhóm lại bởi các biến thể. Mỗi abstract product (```Shoe```, ```Dress```) phải được implement trong tất cả các biến thể (Summer, Winter).
- **Abstract Factory**: Interface khai báo một tập các phương thức cho việc tạo mỗi abstract product
- **Concrete Factories**:  Implement các phương thức tạo product của abstract factory. Mỗi concrete factory có trách nhiệm đến một biến thể của product và chỉ tạo các product của biến thể này.
- **Client**: Mặc dù concrete factories tạo ra concrete products, kiểu trả về của các phương thức tạo product phải trả về abstract products tương ứng. Với cách này client code sử dụng một factory không được kết hợp với một biến thể của product mà nó nhận về một factory. Client có thể làm việc với bất kì concrete factory nào (biến thể product), miễn là nó giao tiếp với objects của chúng thông qua abstract interfaces.

# Ứng dụng
- Sử dụng **Abstract Factory** khi code của bạn cần làm việc với các biến thể của các product liên quan, nhưng không muốn phụ thuộc vào concrete class của những product đó (Chúng có thể không được biết trước hoặc đơn giản là bạn muốn mở rộng trong tương lai).

Abstract Factory cung cấp cho bạn một interface cho việc tạo các objects từ mỗi class của dòng product. Miễn là code của bạn tạo objects thông qua interface này, bạn không phải lo lắng về việc tạo sai biến thể của product (sai ở đây có nghĩa là nó không khớp với bất kì product nào đã được tạo trong ứng dụng của bạn).

- Xem xét dùng **Abtract Factory** khi bạn có một class với một tập các **Factory Method**.
- Trong một chương trình được thiết kế tốt thì mỗi một class có trách nhiệm chỉ cho một việc. Khi một class giải quyết nhiều kiểu products, nó nên tách các factory method thành một factory class hay nói cách khách là sử dụng **Abstract Factory**

# Ưu nhược điểm
#### Ưu điểm:
- Bạn có thể đảm bảo rằng products mà bạn nhận từ factory tương thích với những cái khác.
- Bạn tránh được việc gắn chặt giữa một concrete products và client code.
- **Single Responsibility Principle**. Bạn có thể tách code tạo product tới một nơi, giúp code dễ dàng để hỗ trợ
- **Open/Closed Principle**. Dễ dàng để thêm biến thể sản phẩm mới mà không làm ảnh ảnh hưởng đến code cũ

#### Nhược điểm:
- Code có thể trở nên phức tạp hơn mức cần thiết nếu như có nhiều interfaces và classes được thêm vào.

# Cách implement
- Ánh xạ một ma trận của các loại product và các biến thể của những product này.
- Khai báo abstract product interfaces cho tất cả các loại products. Tiếp theo tạo tất cả concrete product class để implement những interfaces này.
- Khai báo abstract factory interface với một tập các creation methods cho tất cả abstract products.
- Implement một tập các concrete factory classes, một class cho mỗi biến thể product.
- Tạo code khởi tạo factory một nơi nào đó trong ứng dụng. Nó nên khởi tạo một trong những concrete factory classes, phụ thuộc trên cấu hình ứng dụng hoặc môi trường hiện tại. Truyền đối tượng factory này đến tất cả class nơi mà xây dựng product.
- Quết qua code và tìm tất cả chỗ gọi trực tiếp đến product constructor. Thay thế chúng với creation method phù hợp cho đối tượng factory.

### Demo với code C#

**Tạo các product Interfaces, trong đó với từng product đều có 2 methods ```GetName()``` và ```GetModel()```**
```csharp
public interface IDress
{
    string GetName();

    string GetModel();
}
```

```csharp
public interface IShoe
{
    string GetName();

    string GetModel();
}
```

**Tạo ```Abtract Factory``` class, trong đó các method để tạo ra các dòng product khác nhau**
```csharp
public interface IFashion
{
    IShoe CreateShoe();

    IDress CreateDress();
}
```

**Tạo ra các biến thể của Product (concrete product) implement product interface:**
```csharp
public class SummerDress: IDress
{
    public string GetName()
    {
        return "Summber dress";
    }

    public string GetModel()
    {
        return "This is summer dress";
    }
}
```
```csharp
public class SummerShoe: IShoe
{
    public string GetName()
    {
        return "Summer shoe";
    }

    public string GetModel()
    {
        return "This is summer shoe";
    }
}
```
```csharp
public class WinterDress: IDress
{
    public string GetName()
    {
        return "Winter dress";
    }

    public string GetModel()
    {
        return "This is winter dress";
    }
}
```
```csharp
public class WinterShoe: IShoe
{
    public string GetName()
    {
        return "Winter shoe";
    }

    public string GetModel()
    {
        return "This is winter shoe";
    }
}
```

**Tạo biến thể của từng dòng product:**
```csharp
public class SummerFashion: IFashion
{
    public IShoe CreateShoe()
    {
        return new SummerShoe();
    }

    public IDress CreateDress()
    {
        return new SummerDress();
    }
}
```

```csharp
public class WinterFashion: IFashion
{
    public IShoe CreateShoe()
    {
        return new WinterShoe();
    }

    public IDress CreateDress()
    {
        return new WinterDress();
    }
}
```

**Implemnt client code:**
```csharp
public class Client
{
    public void ClientMethod(IFashion factory)
    {
        var shoe = factory.CreateShoe();
        var dress = factory.CreateDress();

        Console.WriteLine(shoe.GetModel());
        Console.WriteLine(shoe.GetName());

        Console.WriteLine(dress.GetModel());
        Console.WriteLine(dress.GetName());

        Console.WriteLine("**********");
    }
}
```

**Thực thi ở chương trình main:**
```csharp
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Abstract factory demo:");
        Console.WriteLine("**********");

        var client = new Client();

        client.ClientMethod(new SummerFashion());

        client.ClientMethod(new WinterFashion());
    }
}
```

**Kết quả chạy chương trình**:

![](https://images.viblo.asia/dab4abaa-f434-4420-b008-dcedb8312032.png)

Link code demo đầy đủ: https://github.com/quanghiepth86/abstract-factory-csharp-demo

# Thảo luận
Bài viết này tôi đã giới thiệu tóm lược cơ bản về Abtract Factory pattern, những ưu nhược điểm và cách sử dụng nó. Tôi nghĩ rằng đây là một pattern được sử dụng khá rộng rãi cho những ứng dụng hướng đối tượng. Hy vọng bài viết sẽ giúp ích cho các bạn khi áp dụng vào thực tế. Cảm ơn các bạn đã theo dõi bài viết.

**Nguồn tham khảo:**
https://refactoring.guru/design-patterns/abstract-factory