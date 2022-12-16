![](https://images.viblo.asia/be918d6e-b34f-48cd-bbf1-3a42b6c63857.png)

## 1. Giới thiệu
* Visitor là một mẫu thiết kế thuộc nhóm Behavior Pattern 
* Visitor còn được biết đến như là Double dispatch 
* Cho phép định nghĩa các operation trên một tập hợp các đối tượng không đồng nhất về kiểu mà không làm thay đổi định nghĩa về lớp của các đối tượng đó.
* Cho phép tách các thuật toán khỏi các đối tượng mà chúng hoạt động.
* Giúp phục hồi lại kiểu dữ liệu bị mất (thay vì dùng instanceof).
## 2. Mục đích ra đời
### Problem
Ví dụ ta đang xây dựng ứng dụng vẽ bản đồ, mỗi địa điểm là một node, mỗi node là một đối tượng của các lớp khác nhau tương ứng với các loại công trình (nhà, công ty, công viên,...). Nhiệm vụ ở đây là xuất cả bản đồ thành file xml.
![](https://images.viblo.asia/3a48670a-0fbb-485d-9a59-7c0e8490d680.png)
Thoạt nhìn công việc có vẻ rõ ràng, ta sẽ xuất từng node riêng biệt thành từng file xml lẻ, rồi nối tất cả lại thành một file xml lớn bằng cách thêm phương thức xuất file vào từng lớp node, duyệt qua và thực thi phương thức này của từng node. 

Tuy nhiên, việc định nghĩa phương thức xuất file trong mỗi lớp làm tăng độ phức tạp không mong muốn cho lớp và dễ gây ra lỗi. Không những thế, khi phát triển thêm một cách xuất file có định dạng khác ta lại phải tiếp tục sửa code bên trong lớp một lần nữa.
![](https://images.viblo.asia/f990619a-c0b7-47c6-8065-409aa8951e43.png)
Mẫu Visistor sẽ hỗ trợ giải quyết vấn đề này bằng cách đặt hành vi mới vào một lớp riêng biệt được gọi là visitor, thay vì cố gắng tích hợp nó vào các lớp hiện có. Đối tượng muốn thực hiện hành vi sẽ được truyền vào một trong các phương thức của visitor dưới dạng đối số, cung cấp cho phương thức này quyền truy cập vào tất cả dữ liệu cần thiết có trong đối tượng
### Solution
Mẫu Visitor đề xuất ta đặt hành vi phát sinh đó vào một lớp riêng biệt gọi là visitor, thay vì đưa nó vào lớp có sẵn. Đối tượng ban đầu sẽ được truyền vào một trong các phương thức của visitor, cung cấp cho phương thức đó các thông tin cần thiết để thực hiện hành động mong muốn.

Visitor lường trước được vấn đề đó, nên nó thường đi kèm với một kỹ thuật được gọi là Double Dispatch. Double dispatch giúp ta thực thi phương thức với đúng đối tượng mà không cần phải xét điều kiện. Thay vì để client lựa chọn nên dùng phương thức nào cho đối tượng nào, giờ ta để trách nhiệm đó cho chính đối tượng xử lý.

Vì một đối tượng luôn biết nó thuộc lớp nào, nó sẽ tự chọn một phương thức đúng của visitor. Có thể nói, nó "accept" một visitor và nói cho visitor phương thức nào nên được thực thi.
![](https://images.viblo.asia/47916353-726d-4c00-b600-cd3ff005ab73.png)

## 3. Kiến trúc
![](https://images.viblo.asia/42ed7600-5a71-4ff2-ab73-ee986731c498.png)

* Visitor interface khai báo một tập hợp các phương thức thăm có thể lấy các phần tử cụ thể của cấu trúc đối tượng làm đối số. Các phương thức này có thể trùng tên nếu chương trình được viết bằng ngôn ngữ có hỗ trợ nạp chồng, nhưng kiểu tham số của chúng phải khác nhau.
* Mỗi Concrete Visitor triển khai một số phiên bản của các hành vi giống nhau, được điều chỉnh cho các lớp phần tử cụ thể khác nhau.
* Element interface khai báo một phương thức để "chấp nhận" các visitor. Phương thức này phải có một tham số được khai báo với kiểu là visitor interface.
* Mỗi Concrete Element phải triển khai thực hiện phương thức chấp nhận. Mục đích của phương thức này là chuyển hướng cuộc gọi đến phương thức của visitor thích hợp tương ứng với lớp phần tử hiện tại. Cần biết rằng ngay cả khi một lớp phần tử cơ sở triển khai phương thức này, tất cả các lớp con vẫn phải ghi đè phương thức này trong các lớp của chính chúng và gọi phương thức thích hợp trên đối tượng visitor.
* Client thường đại diện cho một tập hợp hoặc một số đối tượng phức tạp khác (ví dụ, một cây Composite). Thông thường, các client không biết tất cả các lớp phần tử cụ thể vì chúng làm việc với các đối tượng từ tập hợp đó thông qua một số interface trừu tượng.

![](https://images.viblo.asia/dd590d23-b784-4a92-a394-91a3e9631a98.png)

## 4. Ưu & nhược điểm
#### Ưu điểm
* *Open/Closed Principle:* có thể giới thiệu một hành vi mới có thể hoạt động với các đối tượng của các lớp khác nhau mà không cần thay đổi các lớp này.
* *Single Responsibility Principle:* có thể chuyển nhiều phiên bản của cùng một hành vi vào cùng một lớp.
* Một đối tượng visitor có thể tích lũy một số thông tin hữu ích khi làm việc với nhiều đối tượng khác nhau. Điều này có thể giúp ích khi ta muốn duyệt qua một số cấu trúc đối tượng phức tạp, chẳng hạn như cây đối tượng và áp dụng visitor cho từng đối tượng của cấu trúc này.
#### Nhược điểm
* Cần cập nhật tất cả visitor mỗi khi một lớp được thêm vào hoặc xóa khỏi hệ thống phân cấp phần tử.
* Các visitor có thể thiếu quyền truy cập cần thiết vào các trường riêng tư và phương thức của các phần tử mà họ phải làm việc với.
## 5. Khi nào thì sử dụng 
Visitor được sử dụng khi:
* Sử dụng khi cần thực hiện thao tác trên tất cả các phần tử của cấu trúc đối tượng phức tạp.
* Sử dụng để làm sạch logic nghiệp vụ của các hành vi phụ trợ.
* Sử dụng khi một hành vi chỉ có ý nghĩa trong một số lớp của hệ thống phân cấp lớp, nhưng không có ý nghĩa trong các lớp khác.
## 6. Source code minh họa với C#
* Khai báo visitor interface với một tập hợp các phương thức "truy cập", một phương thức cho mỗi lớp phần tử cụ thể tồn tại trong chương trình. 
* Khai báo element interface. Nếu đang làm việc với hệ thống phân cấp lớp phần tử hiện có, hãy thêm phương thức trừu tượng "accept" vào lớp cơ sở của hệ thống phân cấp. Phương thức này phải chấp nhận một đối tượng visitor làm đối số. 
* Triển khai các phương thức chấp nhận trong tất cả các lớp phần tử cụ thể. Các phương thức này chỉ phải chuyển hướng cuộc gọi đến một phương thức thăm trên đối tượng visitor phù hợp với lớp của phần tử hiện tại. 
* Các lớp phần tử chỉ nên hoạt động với visitor thông qua visitor interface. Tuy nhiên, visitor phải biết tất cả các lớp phần tử cụ thể, được tham chiếu như các kiểu tham số của các phương thức truy cập. 
* Đối với mỗi hành vi không thể được triển khai bên trong phân cấp phần tử, hãy tạo một lớp concrete visitor mới và triển khai tất cả các phương thức truy cập. Ta có thể gặp phải tình huống trong đó visitor sẽ cần quyền truy cập vào một số thành viên riêng tư của lớp phần tử. Trong trường hợp này, có thể đặt các trường hoặc phương thức này ở chế độ công khai, vi phạm tính đóng gói của phần tử hoặc lồng lớp visitor vào lớp phần tử. Điều sau chỉ có thể thực hiện được nếu bạn may mắn làm việc với một ngôn ngữ lập trình hỗ trợ các lớp lồng nhau. 
* Client phải tạo các đối tượng visitor và chuyển chúng vào các phần tử thông qua các phương thức "chấp nhận"
```
    public interface IComponent
    {
        void Accept(IVisitor visitor);
    }

    public class ConcreteComponentA : IComponent
    {
        public void Accept(IVisitor visitor)
        {
            visitor.VisitConcreteComponentA(this);
        }

        public string ExclusiveMethodOfConcreteComponentA()
        {
            return "A";
        }
    }

    public class ConcreteComponentB : IComponent
    {
        public void Accept(IVisitor visitor)
        {
            visitor.VisitConcreteComponentB(this);
        }

        public string SpecialMethodOfConcreteComponentB()
        {
            return "B";
        }
    }

    public interface IVisitor
    {
        void VisitConcreteComponentA(ConcreteComponentA element);

        void VisitConcreteComponentB(ConcreteComponentB element);
    }

    class ConcreteVisitor1 : IVisitor
    {
        public void VisitConcreteComponentA(ConcreteComponentA element)
        {
            Console.WriteLine(element.ExclusiveMethodOfConcreteComponentA() + " + ConcreteVisitor1");
        }

        public void VisitConcreteComponentB(ConcreteComponentB element)
        {
            Console.WriteLine(element.SpecialMethodOfConcreteComponentB() + " + ConcreteVisitor1");
        }
    }

    class ConcreteVisitor2 : IVisitor
    {
        public void VisitConcreteComponentA(ConcreteComponentA element)
        {
            Console.WriteLine(element.ExclusiveMethodOfConcreteComponentA() + " + ConcreteVisitor2");
        }

        public void VisitConcreteComponentB(ConcreteComponentB element)
        {
            Console.WriteLine(element.SpecialMethodOfConcreteComponentB() + " + ConcreteVisitor2");
        }
    }

    public class Client
    {
        public static void ClientCode(List<IComponent> components, IVisitor visitor)
        {
            foreach (var component in components)
            {
                component.Accept(visitor);
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            List<IComponent> components = new List<IComponent>
            {
                new ConcreteComponentA(),
                new ConcreteComponentB()
            };

            Console.WriteLine("The client code works with all visitors via the base Visitor interface:");
            var visitor1 = new ConcreteVisitor1();
            Client.ClientCode(components, visitor1);

            Console.WriteLine();

            Console.WriteLine("It allows the same client code to work with different types of visitors:");
            var visitor2 = new ConcreteVisitor2();
            Client.ClientCode(components, visitor2);
        }
    }   
```
## 7. Design Pattern liên quan
* Có thể xem Visitor là một phiên bản hiệu quả của Command. Các đối tượng của nó có thể thực thi các operation trên các đối tượng khác nhau của các lớp khác nhau.
* Có thể sử dụng Visitor để thực hiện một thao tác trên toàn bộ cây Composite.
* Có thể sử dụng Visitor cùng với Iterator để duyệt qua một cấu trúc dữ liệu phức tạp và thực hiện một số thao tác trên các phần tử của nó, ngay cả khi tất cả chúng đều có các lớp khác nhau.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern