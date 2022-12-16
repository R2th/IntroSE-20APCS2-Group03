![](https://images.viblo.asia/d6bebfc5-b8d7-4895-979a-a3c9eaabaffa.png)

## 1. Giới thiệu
* Mediator Pattern là một trong những Pattern thuộc nhóm hành vi (Behavior Pattern). Mediator có nghĩa là người trung gian. Pattern này nói rằng “Định nghĩa một đối tượng gói gọn cách một tập hợp các đối tượng tương tác. 
* Mediator thúc đẩy sự khớp nối lỏng lẻo (loose coupling) bằng cách ngăn không cho các đối tượng đề cập đến nhau một cách rõ ràng và nó cho phép bạn thay đổi sự tương tác của họ một cách độc lập”.
* Mediator Pattern tương tự như Adapter Pattern nhưng đó được sử dụng trong mục đích khác.
* Mediator Pattern hoạt động như một cầu nối.
## 2. Mục đích ra đời
### Problem
Giả sử bạn có một cái dialog để tạo và chỉnh sửa thông tin khách hàng. Nó gồm nhiều thành phần như text fields, buttons, checkboxes,…
![](https://images.viblo.asia/f5e4b4fc-ae42-4069-ac70-4728f0eb180a.png)

Một vài thành phần sẽ tương tác với vài thành phần khác. Ví dụ chọn checkbox "Có con" thì sẽ hiện ra text field bị ẩn để nhập vào số lượng con của người dùng.

Nếu triển khai những logic này trực tiếp vào từng thành phần, bạn sẽ làm cho các thành phần này khó tái sử dụng hơn.

![](https://images.viblo.asia/3c531ff2-ce5f-486c-ac83-33cef1f66446.png)

### Solution
Mediator đề xuất bạn nên ngừng tất cả các giao tiếp trực tiếp giữa các thành phần. 

![](https://images.viblo.asia/0b1e640c-014a-4f69-b59a-3992ded8dc4a.png)

Thay vào đó, các thành phần này sẽ giao tiếp gián tiếp với nhau bằng cách gọi một đối tượng Mediator đặc biệt để đối tượng này chuyển lời gọi đó đến các thành phần thích hợp giùm bạn.

Các thành phần lúc này sẽ chỉ phụ thuộc vào một lớp Mediator duy nhất thay vì phải kết nối với rất nhiều thành phần khác như ban đầu.

Thay đổi quan trọng nhất xảy ra đối với các thành phần trong form. Hãy xem xét submit button. Trước đây, mỗi lần người dùng nhấp vào button, nó phải xác thực các giá trị của tất cả các phần tử biểu mẫu riêng lẻ. Bây giờ công việc duy nhất của nó là thông báo cho dialog về cú nhấp chuột.

Khi nhận được thông báo này, dialog sẽ tự thực hiện việc xác thực hoặc chuyển nhiệm vụ cho các phần tử riêng lẻ. Do đó, thay vì bị ràng buộc với hàng tá phần tử biểu mẫu, button chỉ phụ thuộc vào lớp dialog.

Bạn cũng có thể làm cho sự phụ thuộc trở nên lỏng lẽo hơn bằng cách trích xuất interface chung cho tất cả các loại của các dialog.

![](https://images.viblo.asia/a706c40e-f1f5-4f9e-8a34-b7c850b15b90.png)

Interface sẽ khai báo phương thức thông báo, cái mà tất cả phần tử đều có thể sử dụng để thông báo đến dialog về những sự kiện xảy ra với chúng. Và như vậy, lúc này submit button có thể làm việc với tất cả dialog có triển khai interface này.

Bằng cách này, Mediator cho phép bạn đóng gói một mạng lưới phức tạp các mối liên hệ giữa nhiều đối tượng vào trong một đối tượng mediator duy nhất. Một lớp càng ít sự phụ thuộc thì càng dễ điều chỉnh, mở rộng hay tái sử dụng.

## 3. Kiến trúc
![](https://images.viblo.asia/23f8f7aa-6d2a-4958-acff-b32f61f34cd9.png)

Các thành phần trong mô hình:
* Các *Component* là các lớp khác nhau có chứa vài logic nghiệp vụ như Button, TextField,... Mỗi component đều có một tham chiếu đến một Mediator, được khai báo với kiểu là Mediator interface. Component không quan tâm đến các lớp thật sự của Mediator. Vì vậy, có thể tái sử dụng component ở các chương trình khác và chỉ việc liên kết nó với một mediator khác.
* *Mediator interface* khai báo các phương thức để giao tiếp với các component, thường chỉ bao gồm một phương thức thông báo duy nhất. Component có thể truyền bất kỳ ngữ cảnh nào làm các đối số của phương thức này, bao gồm cả các đối tượng của chúng, nhưng chỉ theo cách không xảy ra sự ghép nối nào giữa thành phần nhận và lớp gửi.
* *Concrete Mediator* đóng gói các mối quan hệ giữa các component khác nhau. Các Concrete mediator thường giữ các tham chiếu đến tất cả component mà chúng quản lý và thường thậm chí quản lý cả vòng đời.
* Các component không cần quan tâm đến các component khác. Nếu có điều gì xảy ra với component thì chúng chỉ cần thông báo đến mediator. Khi mediator nhận thông báo, nó có thể dễ dàng xác định nơi gửi (điều này có thể vừa đủ để quyết định xem component nào nên được kích hoạt).

![](https://images.viblo.asia/eafedd75-2e59-488f-8d24-2220bdfc47b0.png)

## 4. Ưu & nhược điểm
#### Ưu điểm
* Đảm bảo nguyên tắc Single Responsibility Principle (SRP): chúng ta có thể trích xuất sự liên lạc giữa các component khác nhau vào trong một nơi duy nhất, làm cho nó được bảo trì dễ dàng hơn.
* Đảm bảo nguyên tắc Open/Closed Principle (OCP): chúng ta có thể tạo ra các mediator mới mà không cần thay đổi các component.
* Giảm thiểu việc gắn kết giữa các component khác nhau trong một chương trình.
* Tái sử dụng các component đơn giản hơn.
* Đơn giản hóa cách giao tiếp giữa các đối tượng, Một Mediator sẽ thay thế mối quan hệ nhiều nhiều (many-to-many) giữa các component bằng quan hệ một-nhiều (one-to-many) giữa một mediator với các component.
* Quản lý tập trung, giúp làm rõ các component tương tác trong hệ thống như thế nào trong hệ thống
#### Nhược điểm
* Qua thời gian thì Mediator có thể trở thành God object.
## 5. Khi nào thì sử dụng 
* Sử dụng khi khó thay đổi một vài lớp vì chúng đã được kết nối chặt chẽ với rất nhiều lớp khác.
* Sử dụng khi không thể tái sử dụng một component ở các chương trình khác vì chúng quá phụ thuộc vào các component khác.
* Sử dụng khi cảm thấy mình đang tạo ra rất nhiều lớp con component chỉ để tái sử dụng một vài hành vi đơn giản ở các ngữ cảnh khác nhau.
* Sử dụng khi tập hợp các đối tượng giao tiếp theo những cách thức được xác định rõ ràng nhưng cách thức đó quá phức tạp. Sự phụ thuộc lẫn nhau giữa các đối tượng tạo ra kết quả là cách tổ chức không có cấu trúc và khó hiểu.
* Sử dụng khi cần tái sử dụng một đối tượng nhưng rất khó khăn vì nó tham chiếu và giao tiếp với nhiều đối tượng khác.
* Sử dụng khi điều chỉnh hành vi giữa các lớp một cách dễ dàng, không cần chỉnh sửa ở nhiều lớp.
* Thường được sử dụng trong các hệ thống truyền thông điệp (message-based system), chẳng hạn như hệ thống chat.
* Khi giao tiếp giữa các object trong hệ thống quá phức tạp, có quá nhiều quan hệ giữa các object trong hệ thống. Một điểm chung để kiểm soát hoặc giao tiếp là cần thiết.
## 6. Source code minh họa với C#
* Khai báo Mediator interface mô tả phương thức giao tiếp mong muốn giữa các mediator và các component khác nhau. Trong nhiều trường hợp thì một phương thức duy nhất cho việc nhận các thông báo từ các component là hiệu quả.
* Triển khai thực hiện lớp Concrete mediator. Lớp này sẽ được hưởng lợi từ việc lưu trữ các tham chiếu đến tất cả các component mà nó quản lý.
* Các component nên lưu trữ một tham chiếu đến đối tượng mediator. Kết nối thường được thiết lập ở hàm tạo của component, nơi mà đối tượng mediator được truyền vào như một tham số.
```
    public interface IMediator
    {
        void Notify(object sender, string ev);
    }

    class ConcreteMediator : IMediator
    {
        private Component1 _component1;

        private Component2 _component2;

        public ConcreteMediator(Component1 component1, Component2 component2)
        {
            this._component1 = component1;
            this._component1.SetMediator(this);
            this._component2 = component2;
            this._component2.SetMediator(this);
        }

        public void Notify(object sender, string ev)
        {
            if (ev == "A")
            {
                Console.WriteLine("Mediator reacts on A and triggers folowing operations:");
                this._component2.DoC();
            }
            if (ev == "D")
            {
                Console.WriteLine("Mediator reacts on D and triggers following operations:");
                this._component1.DoB();
                this._component2.DoC();
            }
        }
    }

    class BaseComponent
    {
        protected IMediator _mediator;

        public BaseComponent(IMediator mediator = null)
        {
            this._mediator = mediator;
        }

        public void SetMediator(IMediator mediator)
        {
            this._mediator = mediator;
        }
    }

    class Component1 : BaseComponent
    {
        public void DoA()
        {
            Console.WriteLine("Component 1 does A.");

            this._mediator.Notify(this, "A");
        }

        public void DoB()
        {
            Console.WriteLine("Component 1 does B.");

            this._mediator.Notify(this, "B");
        }
    }

    class Component2 : BaseComponent
    {
        public void DoC()
        {
            Console.WriteLine("Component 2 does C.");

            this._mediator.Notify(this, "C");
        }

        public void DoD()
        {
            Console.WriteLine("Component 2 does D.");

            this._mediator.Notify(this, "D");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Component1 component1 = new Component1();
            Component2 component2 = new Component2();
            new ConcreteMediator(component1, component2);

            Console.WriteLine("Client triggets operation A.");
            component1.DoA();

            Console.WriteLine();

            Console.WriteLine("Client triggers operation D.");
            component2.DoD();
        }
    }
```
## 7. Design Pattern liên quan
* **Chain of Responsibility, Command, Mediator và Observer** là các cách khác nhau để giải quyết vấn đề kết nối giữa các receiver và các sender. 
    - **Chain of Responsibility** truyền request tuần tự dọc theo một chuỗi động chứa các receiver tiềm năng cho đến khi có receiver thích hợp có thể giải quyết được.
Command thì tạo ra các kết  nối một chiều giữa các receiver và các sender.
    - **Mediator** loại bỏ các kết nối trực tiếp giữa các receiver và các sender rồi bắt buộc chúng phải giao tiếp không trực tiếp thông qua đối tượng mediator.
    - **Observer** cho phép các receiver chủ động trong việc subscribe và unsubscribe receiving requests.
    
* **Facade** và **Mediator** có các công việc giống nhau là đều cố gắng tổ chức sự hợp tác giữa nhiều lớp có gắn kết chặt chẽ với nhau. 
    - **Facade** thì định nghĩa một interface được đơn giản hóa đến các đối tượng của hệ thống con nhưng nó không tạo thêm các chức năng mới. Hệ thống con bản thân nó không quan tâm đến Facade. Các đối tượng trong hệ thống con có thể giao tiếp trực tiếp với nhau.
    - **Mediator** thì sẽ trung gian hóa sự giao tiếp giữa các component trong hệ thống. Component chỉ biết về đối tượng mediator và không giao tiếp trực tiếp với các component khác.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern