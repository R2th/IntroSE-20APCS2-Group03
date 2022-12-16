Trong bài viết trước mình đã giới thiệu tới các bạn về Abstract Factory pattern, các bạn quan tâm có thể theo dõi lại [tại đây](https://viblo.asia/p/abstract-factory-pattern-mot-cai-nhin-tom-luoc-va-cach-su-dung-no-Do75427LZM6). Để tiếp tục về chủ đề design pattern trong bài viết này mình sẽ trình bày những khái niệm, ưu nhược điểm và các sử dụng của một creational design pattern khác đó là Factory Method.

# Khái niệm
Factory Method là một design pattern cung cấp một giao diện (interface) để tạo đối tượng trong class cha nhưng cho phép class con của nó ghi đè để tạo đối tượng theo những kiểu khác nhau của bài toán.

Hoặc nói một cách dê hiểu hơn:
Factory method là một design pattern của lập trình hướng đối tượng trong thiết kế phần mềm, nhằm giải quyết vấn đề tạo một đối tượng mà không cần thiết chỉ ra class nào sẽ được tạo. Factory Method giải quyết vấn đề này bằng cách định nghĩa một phương thức cho việc tạo đối tượng, và các class con thừa kế có thể ghi đè để chỉ rõ đối tượng nào sẽ được tạo.

# Bối cảnh
Giả sử bạn có một ứng dụng về vận tải (logictics), ban đầu ứng dụng ra đời chỉ phục vụ cho việc vận chuyển hàng hóa với phương tiện là xe tải (**Truck**). Sau một thời gian có nhiều khách hàng biết đến và có một công ty về vận tải hành khách đề nghị hợp tác, với phương tiện là xe **Bus**. Nhưng với thiết kế ban đầu của ứng dụng chỉ phục vụ cho hàng hóa, dẫn đến code của chương trình gắn chặt với phương tiện là xe tải. Do đó, để phục vụ cho khách hàng mới bạn cần sửa đổi lại code cũ để có thể đáp ứng cho họ. Sẽ thế nào khi ngày càng có nhiều khách hàng khác với các phương tiện khác nhau ? Đó thật sự là vấn đề lớn đối với ứng dụng của bạn.

# Giải pháp
Factory Method đưa ra một cách để thay thế việc khởi tạo đối tượng trong constructor bởi từ khóa ```new``` object bằng việc gọi một phương thức đặc biệt gọi là factory. Với cách này các đối tượng vẫn được tạo bởi từ khóa ```new``` nhưng nó được gọi ở factory method. Đối tượng trả về từ method này sẽ là các sản phẩm tương ứng theo yêu cầu.

![](https://images.viblo.asia/9d7608cf-b8fd-4bcf-8127-a7f43bd542ac.jpg)
<div align="center">Cách thức tạo object trong Factory Method</div>

###
Thoạt nhìn, có vẻ thay đổi này là vô nghĩa, đơn thuần chỉ là chuyển từ việc khởi tạo object từ constructor sang một factory method. Tuy nhiên, khi xem xét kỹ chúng ta có thể thấy tại một class con đều có thể ghi đè phương thức tạo object, điều này giúp chúng ta có thể tạo ra các từng loại object với từng nhu cầu, nó giúp dễ dàng thêm các object (trong ví dụ của bài toán là phương tiện vận chuyển) về sau mà không cần thay đổi code hiện tại.

Ở đây có một lưu ý là class con chỉ có thể trả về các sản phẩm khác nhau khi chúng cùng triển khai một base class hoặc interface chung. Factory method sẽ trả về kiểu base class hoặc interface này. Ví dụ, với bài toán vận tải nêu ở đầu bài viết, bạn cần có một interface ```Transportor``` trong đó có một factory method có kiểu trả về là ```ICar``` tất cả các class con như ```Truck```, ```Bus``` sẽ được tạo ra với kiểu là ```ICar``` này. Hình bên dưới minh họa cho điều này:

![](https://images.viblo.asia/a0f1549c-5e7a-4a84-bcae-12d11a9ea0bf.jpg)

# Cấu trúc
Để triển khai đúng theo Factory Method pattern bạn cần thiết kết chương trình theo mô hình sau:
![](https://images.viblo.asia/e6d2f8e4-7c9f-41e8-8062-844112194602.png)
<div align="center">Nguồn: https://refactoring.guru/design-patterns/factory-method</div>

Trong đó:
- **Product**:  Là interface mà có đặc tính phổ biến nhất để tạo các sản phẩm trong class con. Ví dụ với bài toán đề cập nó là ```ICar```.
- **Concrete Products**: Là các sản phẩm cụ thể sau khi được tạo thông qua factory method
- **Creator**: Đây sẽ là nơi tạo ra factory method. Điểm quan trọng ở đây đó là kiểu trả về của factory method phải là kiểu **Product**. Bạn có thể khai báo factory method với kiểu ```abstract``` như vậy các class con có thể ghi đè nó.

# Ứng dụng
-  Sử dụng Factory Method khi bạn không biết trước kiểu và các phụ thuộc của object mà code sẽ làm việc với nó.
-  Sử dụng Factory Method khi bạn muốn cung cấp cho người dùng thư viện hoặc framework của bạn một cách để mở rộng các thành phần sẵn có bên trong nó.
-  Sử dụng Factory Method khi bạn muốn tiết kiệm tài nguyên hệ thống bằng việc tái sử dụng các object đã có thay vì xây dựng lại mỗi lần có thêm sản phẩm mới.

# Ưu nhược điểm
### Ưu điểm
- Tránh việc gắn chặt việc tạo sản phẩm với bất kỳ một loại sản phẩm cụ thể nào.
- **Single Responsibility Principle**: Bạn có thể chuyển code tạo sản phẩm đến một nơi trong chương trình, làm cho việc maintain dễ dàng hơn.
- **Open/Closed Principle**: Như những mô tả ở trên, chúng ta có thể dễ dàng thêm một kiểu sản phẩm mới mà không làm ảnh hưởng đến code hiện tại.

### Nhược điểm
- Code sẽ trở nên phức tạp khi có quá nhiều class con để triển khai pattern

# Cách thức triển khai
Để dễ hiểu hơn, tôi sẽ thử triển khai pattern này trong code C# với bài toán vận tải ở trên:

**Tạo interface mà tất cả các phương tiện điều triển khai**:

Ở đây chỉ có một phương thức là ```CreateVehicle```
```csharp
using System;

public interface ICar
{
    string CreateVehicle();
}
```

**Tạo base class**:

Trong đó base class ```Transportor```  triển khai interface ```ICar``` và có một factory method ```CreateCar```

```csharp
using System;

public abstract class Transportor: ICar
{
    public abstract ICar CreateCar();

    public string CreateVehicle()
    {
        var car = CreateCar();

        var result = string.Format("Transportor: The '{0}' has been created", car.CreateVehicle());

        return result;
    }
}
```

**Tạo các ConcreteProduct:**
Cụ thể ở đây là hai kiểu trả về của phương tiện là ```BusObj``` và ```TruckObj```. Chúng đề kế triển khai một kiểu chung là ```ICar```
```csharp
using System;

public class BusObj: ICar
{
    public string CreateVehicle()
    {
        return this.ToString();
    }
}
```

```csharp
using System;

public class TruckObj: ICar
{
    public string CreateVehicle()
    {
        return this.ToString();
    }
}
```

**Tạo các ConcreteCreatorProduct:**

Tôi tạo 2 Creator cho 2 loại phương tiện là ```BusCreator``` và ```TruckCreator``` kế thừa base class ```Transportor```

```csharp
using System;

public class BusCreator: Transportor
{
    public override ICar CreateCar()
    {
        return new BusObj();
    }
}
```

```csharp
using System;

public class TruckCreator: Transportor
{
    public override ICar CreateCar()
    {
        return new TruckObj();
    }
}
```

**Chương trình chạy:**
```csharp
using System;

namespace factory_demo
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello transportation app !");

            var truck = new Truck();
            Console.WriteLine("{0}", truck.CreateVehicle());

            var bus = new Bus();
            Console.WriteLine("{0}", bus.CreateVehicle());
        }
    }
}
```
Tất cả đã hoàn thành, không quá phức tạp phải không ?

**Kết quả chạy chương trình:**

![](https://images.viblo.asia/1225fe1a-0477-4f29-8583-c31edb17258f.jpg)

Tham khảo bản code đầy đủ: https://github.com/quanghiepth86/factory-method-csharp-demo

# Thảo luận
Trên đây tôi đã trình bài những khái niệm tóm lược về Factory Method. Qua đó chúng ta có thể biết được vấn đề đặt ra và giải pháp, cấu trúc cũng như ưu nhược điểm của pattern này. Đây cũng là một design pattern rất phổ biến được áp dụng trong ngôn ngữ lập trình hướng đối tượng. Hy vọng bài viết sẽ đem lại những điều bổ ích cho các bạn. Cảm ơn các bạn đẽ xem bài viết.

**Nguồn tham khảo:**

https://refactoring.guru/design-patterns/factory-method