Trong bài viết này, chúng ta sẽ cùng tìm hiểu về Adapter Design Pattern qua cấu trúc, cánh triển khai, ví dụ, ưu điểm nhược điểm và ứng dụng của nó. Soạn doc để thuyết trình mấy ngày mà mà chỉ nói có 5ph thôi thì uổng =)) thôi thì tiện thể share cho mọi người luôn. Bài đầu nên không tránh khỏi sai sót, rất mong nhận được góp ý từ mọi người.
![](https://images.viblo.asia/cae50776-9bba-460a-a944-cf58af50d922.jpg)

# 1. Tổng quan
## 1.1. Phân loại
Adapter là 1 design pattern thuộc nhóm Structural Pattern. Structural Pattern bao gồm những pattern cung cấp các phương pháp để lắp ráp các đối tượng và lớp thành những cấu trúc phức tạp hơn, đồng thời giữ cấu trúc này linh hoạt và hiệu quả.
![](https://images.viblo.asia/014b035e-b78b-45b4-bfee-f91daa78fe40.png)

## 1.2. Giới thiệu
Adapter Pattern theo định nghĩa của GOF:
> The Adapter Pattern converts the interface of a class into another interface the clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interface.

Nếu bạn đã từng nghe qua về Decorator Pattern, thì cả Adapter và Decorator đều sử dụng phương thức 'gói' (wrap) object, nhưng Decorator Pattern gói object để gán thêm trách nhiệm cho nó, còn Adapter Pattern gói object để biến hóa interface ban đầu thành interface client cần sử dụng.
## 1.3. Tóm tắt
Ý tưởng chính của Adapter Pattern:
* Adapter pattern chuyển đổi interface của một class thành interface mà client yêu cầu.
* Adapter ở giữa gắn kết các lớp làm việc với nhau dù cho có những interface không tương thích với nhau.
# 2. Vấn đề
Trong cuộc sống, ta thường thấy adapter xuất hiện dưới dạng một thiết bị kết nối giữa các phích cắm và ổ điện khác loại:
![](https://images.viblo.asia/8e1f3f90-febf-4779-ad34-a624f5bb5945.png)

Adapter trong lập trình hướng đối tượng cũng có chức năng tương tự như thế giới thực: Nó nhận 1 interface và thích ứng để trở thành 1 interface client cần sử dụng.
## 2.1. Bài toán
Một trong những tình huống phải dùng đến adapter pattern là khi bạn tích hợp một thư viện bên ngoài vào chương trình và muốn chỉnh sửa interface của nó cho hợp với chương trình của mình. Tưởng tượng bạn đang thiết kế một phần mềm hỗ trợ vẽ đồ thị và giải toán - một ứng dụng không mấy xa lạ và đã có sẵn nhiều thư viện trên internet.
![](https://images.viblo.asia/fc841f26-8560-4c2a-9ac1-b75fc5414106.png)

Trong tình huống này bạn lấy trên mạng 1 thư viện thực hiện chức năng vẽ tọa độ 1 điểm trên đồ thị. Nhưng khổ nỗi thư viện đó chỉ hỗ trợ biểu diễn điểm bằng... tọa độ cực. (*Giải Tích flashback*: tọa độ cực là một cách khác để biểu diễn một điểm, thay vì sử dụng tung độ hoành độ như hệ trục tọa độ Descartes, thì một điểm ở hệ trục tọa độ cực được xác định bằng độ dài tia gốc r và góc quay φ theo chiều ngược chiều kim đồng hồ)

![](https://images.viblo.asia/6894ad63-fbad-4bcb-927c-321ff6389143.png)

Bạn biết rằng client sẽ quen thuộc với cách biểu diễn điểm theo cách hay dùng hơn, nhưng vẫn quá lười để tìm kiếm một thư viện khác và việc sửa code bên trong thư viện là điều không thể. Bài toán đặt ra là: **làm sao để đáp ứng nhu cầu của client, tức là nhận tham số đầu vào cho hàm vẽ là tung độ và hoành độ, mà vẫn sử dụng thư viện chỉ hỗ trợ tọa độ cực.**
## 2.2. Giải pháp
Để làm được chuyện đó, bạn tạo ra một class đặc biệt, gọi là adapter, là thằng trung gian giúp thư viện trên mạng hiểu được yêu cầu của client. Tạm gọi phương thức vẽ điểm là Point(), lớp của thư viện là PolarGraph, interface của client là Graph, và PolarGraphAdapter là lớp adapter đảm nhận việc chuyển đổi. Ta có sơ đồ sau: 
![](https://images.viblo.asia/1a546503-8216-4e7a-a8a5-4547b6adc3c2.png)

Nhờ lớp PolarGraphAdapter, client có thể an toàn gọi hàm point nhận tham số đầu vào là trục tung trục hoành. Khi nhận được yêu cầu, PolarGraphAdapter dịch từ x, y sang r và φ, sau đó gọi phương thức Point ở PolarGraph với 2 tham số đầu vào vừa tính được. Kết quả là client cứ tưởng được graph interface xử lý nhưng class thật sự xử lý vẫn là PolarGraph. Và class trung gian điều hướng chính là adapter.
# 3. Cấu trúc
## 3.1. Sơ đồ lớp
Đã đến lúc show sơ đồ lớp chính thức của Adapter Pattern:
![](https://images.viblo.asia/39e7fa51-a0c4-4fe8-bc3e-a7ae434461c3.png)

## 3.2. Thành phần
1. Client làm việc trực tiếp qua Target interface.
2. Adapter implement Target interface đó.
3. Adapter dịch yêu cầu của client thành những yêu cầu cụ thể mà Adaptee hiểu.
4.  Adaptee (gọi tạm tiếng Việt là class thích ứng, có nhiệm vụ thích ứng với client) là class sẽ đáp ứng yêu cầu của client nhưng hiểu theo cách mà adapter truyền lại. Những class này thường chứa những dịch vụ hữu dụng mà nhiều class khác cần dùng tới, thường là những legacy class (những class ở phiên bản trước, được thay thế thành class phiên bản cao cấp hơn), những class bên thứ ba hoặc có nhiều dependencies.
# 4. Triển khai
## 4.1. Các bước triển khai
![](https://images.viblo.asia/f02b4ad4-8b23-485a-a02d-355e23e3e30e.png)

1. Client gửi yêu cầu ở interface.
2. Tạo một lớp adapter để triển khai client interface đó.
3. Lớp adapter giữ reference đến adaptee (cách phổ biến là truyền nó vào tham số của constructor của adapter).
4. Adapter lần lượt triển khai các methods của client interface, làm những công việc như chuyển đổi data trước khi điều hướng các trách nhiệm cho lớp adaptee thực sự xử lý.
5. Client nhận được kết quả họ muốn và không biết có một adapter ở giữa gắn kết 2 bên. Ta có thể thay đổi hoặc mở rộng adapter mà không ảnh hưởng đến code của client.
## 4.2. Code mẫu
Code mẫu C# cho ví dụ về ứng dụng vẽ đồ thị được nói ở trên:
```csharp
using System;

namespace Adapter
{
    public interface IGraph
    {
        void Point(double x, double y);
    } 
    
    class PolarGraph
    {
        public void Point(double r, double t)
        {
            Console.WriteLine("Polar Coordinate Point: P(" + r + ", " + t + ")");
        }
    }
    //Adapter triển khai interface mà client sử dụng.
    class PolarGraphAdapter : IGraph 
    {
        private readonly PolarGraph polarGraph;
        public PolarGraphAdapter(PolarGraph polarGraph)
        {
            //Lấy reference đến object cần phải thích ứng.
            this.polarGraph = polarGraph; 
        }
		
        //Implement method Point của interface.
        public void Point(double x, double y)
        {
			//Nhận tung độ và hoành độ x và y, xử lý thành độ dài và góc quay r, t
            double r = Math.Sqrt(x * x + y * y);
            double t = Math.Atan2(y, x);
			//Gọi method Point từ object polarGraph. 
            polarGraph.Point(r, t);
        }   
    }
    
    class Program
    {
        static void Main(string[] args)
        {
            PolarGraph polarGraph = new PolarGraph();
            IGraph graph = new PolarGraphAdapter(polarGraph);
            graph.Point(3, 4);
            //Output: Polar Coordinate Point: P(5, 0.9272952180016122)
        }
    }
}
```
# 5. Đánh giá
## 5.1. Ưu điểm
Adapter pattern thỏa mãn nhiều quy tắc của lập trình hướng đối tượng và phát triển phần mềm hiệu quả:
* Cho phép nhiều đối tượng interface khác nhau giao tiếp với nhau.
* Phân tách việc chuyển đổi interface với business logic chính của chương trình.
* Cách tiếp cận này có thêm một ưu điểm là ta có thể sử dụng adapter với các class con của adaptee. (Liskov substitution principle).
* Làm việc với adapter class thay vì sửa đổi bên trong adaptee class đã có sẵn, thuận tiện cho việc mở rộng (Open/closed principle).
* Client tiếp cận thông qua interface, thay vì implementation (Software design principle).
## 5.2. Nhược điểm
* Tất cả yêu đầu phải được chuyển tiếp thông qua adapter, làm tăng thêm một ít chi phí
* Độ phức tạp của code nhìn chung tăng lên vì phải thêm interface và lớp.
* Vì không phải lúc nào ta cũng có thể thích nghi các method của các interface khác nhau với nhau, nên exception có thể xảy ra. Vấn đề này có thể tránh được nếu client cẩn thận hơn và adapter có tài liệu hướng dẫn rõ ràng.
## 5.3. Pattern liên quan
* Adapter giúp các class hoạt động sau khi nó đã được thiết kế, bridge giúp chúng hoạt động trước khi được thiết kế.
* Adapter cung cấp 1 interface khác, proxy cung cấp cùng 1 loại interface, decorator cung cấp 1 interface phức tạp hơn.
* Facade định nghĩa 1 interface mới, adapter sử dụng lại 1 interface.
## 5.4. So sánh
### 5.4.1. Object Adapter và Class Adapter
Có 2 loại Adapter, Object adapter và Class adapter. Vừa rồi là Object Adapter. Object Adapter sử dụng composition để truyền yêu cầu đến Adaptee, còn Class Adapter kế thừa lớp Target và lớp Adaptee.
Object Adapter:
![](https://images.viblo.asia/dd808ad6-ee91-466f-9d2e-f58fb2598092.png)

Class Adapter:
![](https://images.viblo.asia/cb448c18-f8f0-4556-bb85-509efe6af5cc.png)

Lưu ý: Vì Class Adapter yêu cầu đa kế thừa nên **không** thể triển khai bằng Java.

*Vậy khi nào thì sử dụng loại Adapter nào?*

Vì sử dụng composition, Object Adapter có thể adapt cả lớp cha và các lớp con của nó, đồng thời cũng linh hoạt hơn theo quy tắc composition over inheritance của lập trình hướng đối tượng. Class Adapter không làm được vì là lớp kế thừa, tuy nhiên, nó có điểm mạnh của kế thừa ví dụ như có thể override method của Adaptee nếu nó cần.
# 6. Ứng dụng trong thực tế
Adapter được ứng dụng rộng rãi trong nhiều trường hợp, ta thường thấy Adapter xuất hiện trong những tình huống cần nâng cấp hệ thống cũ và có nhiều class cũ nhưng vẫn chứa method quan trọng, làm cho hệ thống hiệu quả hơn thông qua việc làm các component giao tiếp với nhau dù không liên quan đến nhau.
## 6.1. Sử dụng Enumerator như một Iterator trong Java
![](https://images.viblo.asia/12b7ac62-7058-4e4e-9ea4-53a59e37aa26.png)

Ở Java, enumerator và iterator đều là những  con trỏ để duyệt và truy cập phần tử của 1 collection như Vector, Stack, Hashtable,.... Enumerator xuất hiện ở JDK 1.0 và Iterator được ra mắt ở JDK 1.2.
Enumerator cung cấp 2 phương thức hasMoreElement() và nextElement() để kiểm tra sự tồn tại và lấy phần tử tiếp theo trong collection. Tuy nhiên, nó không hỗ trợ các method để thay đổi cấu trúc của collection, và Iterator xuất hiện như là phiên bản cải tiến của enumerator, với các phương thức hasNext(), next() và remove().

Điều này dẫn đến tình huống đôi khi chúng ta vẫn gặp code sử dụng enumerator interface, nhưng ta chỉ muốn sử dụng iterator. Đó là lúc những lập trình viên thiết kế iterator phải sử dụng tới Adapter: chuyển hóa những method của iterator thành những enumerator method tương ứng.
![](https://images.viblo.asia/815af70a-5e42-4cc9-a66c-9ef5d7742d8c.png)

Lưu ý rằng, adapter chuyển từ hasNext(), next() sang hasMoreElements() và nextElement() là có thể, nhưng vì enumeration vốn không hỗ trợ remove() nên adapter cũng phải bó tay, không thể triển khai một hàm remove() đủ chức năng ở trong class adapter được. Lúc này, ta có thể chọn phương án throw exception để báo cho client.   

Peace.
# Nguồn tham khảo
1. Erich Gamma, John Vlissides, Richard Helm, Ralph Johnson - Design Patterns: Elements of Reusable Object-Oriented Software
2. Alexander Shvets (refactoring.guru) - Dive Into Design Patterns
3. Elisabeth Freeman, Kathy Sierra - Head First Design Patterns