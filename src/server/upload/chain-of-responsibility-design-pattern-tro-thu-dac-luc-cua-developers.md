![](https://images.viblo.asia/a948e984-0e03-4368-834b-73e0ee912520.png)

## 1. Giới thiệu
* Chain of Responsibility là một mẫu thiết kế thuộc nhóm hành vi (Behavioral Pattern). 
* Mục đích: cho phép một đối tượng gửi một yêu cầu nhưng không biết đối tượng nào sẽ nhận và xử lý nó. Điều này được thực hiện bằng cách kết nối các đối tượng nhận yêu cầu thành một chuỗi (chain) và gửi yêu cầu theo chuỗi đó cho đến khi có một đối tượng xử lý nó.
* Chain of Responsibility Pattern hoạt động như một danh sách liên kết (Linked list) với việc đệ quy duyệt qua các phần tử (recursive traversal).

![](https://images.viblo.asia/a60c6ef1-5b57-4819-933f-eaae7e4aac42.png)

* Khắc phục việc ghép cặp giữa bộ gửi và bộ nhận thông điệp; các đối tượng nhận thông điệp được kết nối thành một chuỗi và thông điệp được chuyển dọc theo chuỗi này đến khi gặp được đối tượng xử lý nó. 
* Tách rời nơi gửi yêu cầu khỏi nơi xử lý yêu cầu
* Cho nhiều object cố xử lý yêu cầu một cách tuần tự. Nếu 1 object không xử lý được yêu cầu, object sau sẽ xử lý.
## 2. Mục đích ra đời
### Problem
Giả sử bạn làm việc với một hệ thống đặt hàng online. Bạn muốn hạn chế quyền truy cập vào hệ thống, chỉ cho user đã đăng nhập tạo các đơn đặt hàng. Mặt khác những user có quyền admin sẽ được toàn quyền truy cập vào các đơn đặt hàng.
![](https://images.viblo.asia/3adf5542-1cb3-4f82-8a43-344ebe0dacf4.png)

Sau 1 hồi lên kế hoạch, bạn nhận ra những giai đoạn kiểm tra (như kiểm tra user đã đăng nhập, user có quyền admin) cần phải thực hiện tuần tự. Ví dụ nếu việc kiểm tra user đăng nhập bị thất bại thì chúng ta ko có lí do gì để kiểm tra tiếp tục các điều kiện khác. 

Một hồi sau mình thêm chức năng cache để skip nếu yêu cầu giống nhau, kiểm tra Password có đúng format hay không... Mỗi khi thêm 1 chức năng hàm kiểm tra ngày càng phức tạp, cho đến khi 1 ngày bạn refactor code.

![](https://images.viblo.asia/a7aac3d6-1c9a-478c-9005-99a2511c9efc.png)

### Solution
Chuyển từng hành vi thành những đối tượng cụ thể gọi là handlers. Mỗi kiểm tra sẽ extract thành 1 hàm duy nhất. Yêu cầu sẽ được truyền dọc theo các hàm này. Tất cả tạo nên 1 chuỗi liên kết, cho đến khi yêu cầu được xử lý, đến hết mắt xích cuối.

![](https://images.viblo.asia/991ac94c-8208-4058-a223-81b8b7c75c4c.png)

Một ví dụ khác trong lập trình windows forms. Các control trên một form chứa đựng nhau tạo ra một chuỗi object. Giả sử bạn click vào một nút bấm, sự kiện “click” sẽ chạy ngược chuỗi object từ Button tới Window (cấp cao nhất) để tìm đến đúng control có khả năng xử lý nó.

![](https://images.viblo.asia/88f3ba25-83a6-4e7d-9fe2-5b332df4ccec.png)

Mẫu này gắn liền với nhiều hệ thống xử lý yêu cầu. Ví dụ tổng đài hay bất kì quy trình làm việc nào cũng sẽ đi theo tư tưởng của Chain of Responsibility. Có lỗi thì sẽ chọn đưa cho người có liên quan tiếp theo hoặc chấm dứt yêu cầu tại điểm đó.

![](https://images.viblo.asia/355a0c30-da59-4664-b6f4-493ec7dd77c1.png)

## 3. Kiến trúc
![](https://images.viblo.asia/14d4152d-b88a-4b44-a088-6d5ef6a54585.png)

Các thành phần trong mô hình:
* **Client**: tạo ra các yêu cầu và yêu cầu đó sẽ được gửi đến các đối tượng tiếp nhận.
* **ConcreteHandler**: xử lý yêu cầu. Có thể truy cập đối tượng successor (thuộc class Handler). Nếu đối tượng ConcreateHandler không thể xử lý được yêu cầu, nó sẽ gởi lời yêu cầu cho successor của nó.
* **Handler**: định nghĩa 1 interface để xử lý các yêu cầu. Gán giá trị cho đối tượng successor (không bắt buộc).
* **BaseHandler**: lớp trừu tượng không bắt buộc. Có thể cài đặt các hàm chung cho Chain of Responsibility  ở đây.

Collaborations
* Client gọi hàm handle của Handler đầu Chain , truyền vào nội dung yêu cầu / tham số yêu cầu.
* Handler đầu tiên xác định yêu cầu có xử lý được không. Nếu không xử lý được, handler gọi handler tiếp theo (nếu có).
## 4. Ưu & nhược điểm
#### Ưu điểm
* Giảm kết nối (loose coupling): Thay vì một đối tượng có khả năng xử lý yêu cầu chứa tham chiếu đến tất cả các đối tượng khác, nó chỉ cần một tham chiếu đến đối tượng tiếp theo. Tránh sự liên kết trực tiếp giữa đối tượng gửi yêu cầu (sender) và các đối tượng nhận yêu cầu (receivers).
* Tăng tính linh hoạt : đảm bảo Open/Closed Principle
* Phân chia trách nhiệm cho các đối tượng: đảm bảo Single Responsibility Principle
* Có khả năng thay đổi dây chuyền (chain) trong thời gian chạy.
#### Nhược điểm
* Một số yêu cầu có thể không được xử lý: Trường hợp tất cả Handler đều không xử lý
## 5. Khi nào thì sử dụng 
Dưới đây chúng ta có thể liệt kê một số trường hợp mà khi gặp sẽ phải cân nhắc sử dụng Chain of Responsibility pattern:
* Có nhiều hơn một đối tượng có khả thực xử lý một yêu cầu trong khi đối tượng cụ thể nào xử lý yêu cầu đó lại phụ thuộc vào ngữ cảnh sử dụng.
* Muốn gửi yêu cầu đến một trong số vài đối tượng nhưng không xác định đối tượng cụ thể nào sẽ xử lý yêu cầu đó.
* Khi cần phải thực thi các trình xử lý theo một thứ tự nhất định..
* Khi một tập hợp các đối tượng xử lý có thể thay đổi động: tập hợp các đối tượng có khả năng xử lý yêu cầu có thể không biết trước, có thể thêm bớt hay thay đổi thứ tự sau này.
## 6. Source code minh họa với C#
#### Xác định interface của handler
Quan trọng nhất là hàm Handle. Có thể truyền các biến cần thiết để xử lý yêu cầu. Nếu các biến quá dài, có thể đóng gói chúng thành 1 struct / class. Ngoài ra, có thể thêm các hàm quản lý như SetHandler, …
```
    interface IHandler
    {
        IHandler Successor { get; set; }

        void RequestOrder(int amount);
    }
```
#### Cài đặt BaseHandler
Để tránh lặp code, một số hàm boilerplate như SetHandler, CallNextHandler, ... có thể cài đặt ở lớp abstract class BaseHandler. Ngoài ra, có thể cài đặt default behaviour cho hàm Handle và các hàm khác nếu muốn. Ngoài ra, tùy nhu cầu sửa Chain, có thể cho biến NextHandler  thay đổi được hoặc không.
```
    class MiniStorage : IHandler
    {
        public IHandler Successor { get; set; }

        public void RequestOrder(int amount)
        {
            if (amount < 10)
            {
                Console.WriteLine($"Mini storage: I can handle less than 10 quantity. DONE!");
            }
            else
            {
                Console.WriteLine($"Mini storage: I received the request but I can not handle more than 10 quantity. Passed to Medium storage");
                Successor?.RequestOrder(amount);
            }
        }
    }

    class MediumStorage : IHandler
    {
        public IHandler Successor { get; set; }

        public void RequestOrder(int amount)
        {
            if (amount < 50)
            {
                Console.WriteLine($"Medium storage: I can handle less than 50 quantity. DONE!");
            }
            else
            {
                Console.WriteLine($"Medium storage: I received the request but I can not handle more than 50 quantity. Passed to Big storage");
                Successor?.RequestOrder(amount);
            }
        }
    }

    class BigStorage : IHandler
    {
        public IHandler Successor { get; set; }

        public void RequestOrder(int amount)
        {
            if (amount < 100)
            {
                Console.WriteLine($"Big handler: I can handle less than 100 quantity. DONE!");
            }
            else
            {
                Console.WriteLine($"Big storage: I received the request but I can not handle more than 100 quantity. Passed to Fatory");
                Successor?.RequestOrder(amount);
            }
        }
    }

    class FactoryHandler : IHandler
    {
        public IHandler Successor { get; set; }

        public void RequestOrder(int amount)
        {
            Console.WriteLine($"Factory: I received the request. You will receice product from us");

        }
    }
```
#### Xây dựng / sử dụng Chain of Responsibility
Client có thể nhận một Chain hoặc tạo mới một Chain. Có thể tạo Factory để xây Chain dựa trên các setting ngoài. 
Khi sử dụng, cần chú ý:
* Chain có thể có 1 phần tử thôi.
* Một số yêu cầu có thể không tới được cuối Chain.
* Một số yêu cầu có thể tới cuối Chain không được xử lý.
* Yêu cầu có thể bị xử lý hoặc chặn bởi bất kì Handler nào trong Chain.
```
    class ChainOfHandlers
    {
        readonly IHandler _mini = new MiniStorage();
        readonly IHandler _medium = new MediumStorage();
        readonly IHandler _big = new BigStorage();
        readonly IHandler _factory = new FactoryHandler();

        public ChainOfHandlers()
        {
            _mini.Successor = _medium;
            _medium.Successor = _big;
            _big.Successor = _factory;
        }

        public void Handle(int amount)
        {
            _mini.RequestOrder(amount);
        }
    }
```
#### Sử dụng tại Client
```
    class Program
    {
        static void Main(string[] args)
        {
            var chain = new ChainOfHandlers();
            Console.WriteLine("Enter quantity: ");
            int amount = Convert.ToInt32(Console.ReadLine());
            chain.Handle(amount);
        }
    }
```
#### Cân nhắc kết hợp với pattern khác
Composite
Thường thấy khi cài đặt UI những thứ như SetFocus, ... Có thể dùng để nhận yêu cầu từ con và truyền yêu cầu lên cha cho đến khi có thành phần nào đó chấp nhận xử lý.
Command
Các yêu cầu có thể dưới dạng command, cho nhiều Handler có cơ hội tiếp nhận và xử lý command. Hoặc ngược lại, các Handler có thể là command, và yêu cầu là một context object được truyền đi để Handler xử lý.
## 7. Design Pattern liên quan
* **Chain of Responsibility** thường được sử dụng kết hợp với **Composite**. Trong trường hợp này, khi một thành phần lá nhận được một yêu cầu, nó có thể chuyển nó qua chuỗi của tất cả các thành phần cha xuống gốc của cây đối tượng.
* Các trình xử lý trong **Chain of Responsibility** có thể được thực hiện dưới dạng **Command**. Trong trường hợp này, ta có thể thực thi nhiều thao tác khác nhau trên cùng một đối tượng ngữ cảnh, được thể hiện bằng một yêu cầu.
* **Chain of Responsibility** và **Decorator** có cấu trúc lớp rất giống nhau. Cả hai mẫu đều dựa vào thành phần đệ quy để truyền việc thực thi qua một loạt các đối tượng. Tuy nhiên, có một số khác biệt quan trọng. Các trình xử lý **Chain of Responsibility** có thể thực hiện các hoạt động tùy ý độc lập với nhau. Chúng cũng có thể ngừng chuyển yêu cầu vào bất kỳ lúc nào. Mặt khác, các trình **Decorator** khác nhau có thể mở rộng hành vi của đối tượng trong khi vẫn giữ cho nó nhất quán với giao diện cơ sở. Ngoài ra, Decorator không được phép phá vỡ quy trình của yêu cầu.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern