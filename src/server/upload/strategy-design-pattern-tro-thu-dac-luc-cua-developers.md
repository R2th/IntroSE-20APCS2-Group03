![](https://images.viblo.asia/2f439de5-da4c-4c24-9d57-f02cede94c30.png)

## 1. Giới thiệu
* Phân loại: Behavior Pattern
* Bí danh: Policy
* Mục đích: Định nghĩa một tập hợp các thuật toán giống nhau, encapsulate chúng và khiến chúng có thể thay thế cho nhau. Strategy làm cho phần thuật toán độc lập khỏi client sử dụng nó.
* Tần suất sử dụng: khá cao
## 2. Mục đích ra đời
![](https://images.viblo.asia/966ecd3a-44ee-4222-b225-19bb471fb5c2.png)

Giả sử chúng ta cần xây dựng một app giúp tìm đường đi trong thành phố. Ban đầu app chỉ giúp những người đi bộ tìm đường đi, chúng ta chỉ việc viết thuật toán này ở bất kỳ chỗ nào cần. Nhưng sau này khi yêu cầu tăng lên như phải hỗ trợ thêm việc tìm đường bằng xe hơi, xe đạp,.. Điều này dẫn đến phải thay đổi thuật toán ở những chỗ đã sử dụng, Điều này có thể khiến chương trình trở nên khó maintain và nhiều khi còn gây nên những bug trên những phần đang hoạt động tốt
![](https://images.viblo.asia/c3a7191c-aa30-4543-aa43-c95c469ae3f4.png)

Để giải quyết việc này, strategy pattern nói chúng ta cần tạo cho mỗi thuật toán một class riêng gọi là strategy. Phần code sử dụng thuật toán này sẽ thay thế phần hardwire code bằng reference tới strategy object. Phần code đó sẽ không cần biết chi tiết về loại strategy mà nó sử dụng, nó có thể sử dụng mọi strategy với phần interface mà strategy cung cấp

Như vậy phần thuật toán được tách biệt khỏi phần sử dụng, giờ chúng ta có thể chỉnh sửa thuật toán hoặc thêm thuật toán mới mà không cần chỉnh sửa phần code nào khác ngoài các bên trong strategy class tương ứng
![](https://images.viblo.asia/c56fe6d1-f336-46f6-96e0-739f13f15891.png)

## 3. Kiến trúc
![](https://images.viblo.asia/9e6ad788-fd88-4935-a53c-c15d161e7331.png)

Các thành phần trong mô hình:
* *Context:* Class sử dụng các strategy object và chỉ giao tiếp với các strategy object thông qua interface
* *Strategy:* Cung cấp một interface chung cho context giao tiếp với các strategy object
* *Concrete Strategy:* Implement các thuật toán khác nhau cho context sử dụng
* *Client:* Có trách nhiệm tạo ra các strategy object và truyền vào cho context sử dụng
## 4. Ưu & nhược điểm
#### Ưu điểm
* Có thể thay thế các thuật toán linh hoạt với nhau
* Tách biệt phần thuật toán khỏi phần sử dụng thuật toán
* Có thể thay thế việc kế thừa bằng việc encapsulate thuật toán
* Tăng tính open-closed: Khi thay đổi thuật toán hoặc khi thêm mới thuật toán, không cần thay đổi code phần context
#### Nhược điểm
* Không nên áp dụng nếu chỉ có một vài xử lý và hiếm khi thay đổi.
* Client phải nhận biết được sự khác biệt giữa các strategy.
## 5. Khi nào thì sử dụng 
* Muốn sử dụng các biến thể khác nhau của một xử lý trong một đối tượng và có thể chuyển đổi giữa các xử lý trong runtime.
* Khi có nhiều lớp tương đương chỉ khác cách chúng thực thi một vài hành vi.
* Khi muốn tách biệt business logic của một lớp khỏi implementation details của các xử lý.
* Khi lớp có toán tử điều kiện lớn chuyển đổi giữa các biến thể của cùng một xử lý.
## 6. Source code minh họa với C#
Bài toán: Khi xuất file thiết kế từ phần mềm Adobe illustrator chúng ta có rất nhiều định dạng file để lựa chọn. Dùng Strategy Pattern để cấu trúc những phương thức xuất định dạng file theo lựa chọn của người dùng.
#### Tạo Context
```
    public class ExportContext
    {
        private IExport Export;

        public ExportContext(IExport Export)
        {
            this.Export = Export;
        }
        public void SetStrategy(IExport Export)
        {
            this.Export = Export;
        }
        public void CreateArchive(string fileName)
        {
            Export.ExportFile(fileName);
        }
    }   
```
#### Tạo Strategy
```
    public interface IExport
    {
        void ExportFile(string fileName);
    }   
```
#### Tạo các Concrete Strategy
```
    public class ExportJPG : IExport
    {
        public void ExportFile(string fileName)
        {
            Console.WriteLine("Export file: '" + fileName
                 + ".JPG' successfully");
        }
    }
    
    public class ExportPDF : IExport
    {
        public void ExportFile(string fileName)
        {
            Console.WriteLine("Export file: '" + fileName
                 + ".PDF' successfully");
        }
    }
    
    public class ExportPNG : IExport
    {
        public void ExportFile(string fileName)
        {
            Console.WriteLine("Export file: '" + fileName
                 + ".PNG' successfully");
        }
    }
```
#### Tạo Client
```
    class Client
    {
        static void Main(string[] args)
        {
            ExportContext ctx = new ExportContext(new ExportPNG());
            ctx.CreateArchive("Mushroom");
            ctx.SetStrategy(new ExportJPG());
            ctx.CreateArchive("Mushroom");
            ctx.SetStrategy(new ExportPDF());
            ctx.CreateArchive("Mushroom");
            Console.Read();
        }
    }   
```
## 7. Design Pattern liên quan
* *Bridge:* Có chung cấu trúc, dựa trên composition (Giao phó trách nhiệm cho các đối tượng khác) tuy nhiên giải quyết các vấn đề khác nhau.
* *Command:* Khá giống nhau khi đều tham số hoá một đối tượng với một vài hành động tuy nhiên có intents khác nhau.
* *State:* Có thể coi như một extension của Strategy, đều dựa trên composition. Tuy nhiên State không hạn chế sự phụ thuộc giữa các concrete states.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern