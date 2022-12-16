![](https://images.viblo.asia/02b7617f-8ba2-4890-8ae3-c70110fa73ef.png)

## 1. Giới thiệu
* State Pattern là một mẫu thiết kế thuộc nhóm Behavioral Pattern – những mẫu thiết kế xác định các mẫu giao tiếp chung giữa các object. Từ đó các mẫu này tăng tính linh hoạt trong việc thực hiện việc giao tiếp giữa các object.
* State Pattern là một mẫu thiết kế hành vi cho phép một object thay đổi hành vi của nó khi trạng thái bên trong của nó thay đổi. 
* Nó là một trong những mẫu thiết kế của Gang of Four.
* Tần suất sử dụng: trung bình
## 2. Mục đích ra đời
### Problem
![](https://images.viblo.asia/11c95ce4-736f-4fa6-89ae-8d2843091493.png)

Trong thực tế, có rất nhiều thứ tại bất kỳ thời điểm nào cũng có một số trạng thái hữu hạn khác nhau, và chúng có thể chuyển từ trạng thái này sang trạng thái khác. Trong các trạng thái khác nhau đó, chúng có những đặc tính và hành vi khác nhau, 

Bạn cũng có thể áp dụng cách tiếp cận này cho các object. Ta có một class Document. Và class Document có thể ở một trong ba State (trạng thái):Draft, Moderation, Published.
 
Publish method của class Document hoạt động hơi khác nhau ở mỗi State:
* Trong Draft, chuyển Document sang trạng thái Moderation.
* Trong Moderation, chuyển Document sang trạng thái  Public
* Trong Published, không thực hiện điều gì nữa.
![](https://images.viblo.asia/9626db2c-deec-405c-af73-a0b47eb77cb0.png)

Để diễn tả sự thay đổi hành vi và chức năng này, ta có thể sử dụng if-then hoặc switch-case. Tuy nhiên, khi các hành vi và chức năng thay đổi quá nhiều, ta sẽ cần tốn rất nhiều công sức để cài đặt hết trường hợp hành vi thay đổi. 

Điểm yếu lớn nhất của State Machine dựa trên các điều kiện tự bộc lộ khi chúng ta bắt đầu thêm nhiều State và các state-dependent behavior vào lớp Document.

Project càng lớn thì càng gặp nhiều trở ngại, khó khăn trong việc dự đoán tất cả các trạng thái và quá trình chuyển đổi trong giai đoạn phát triển

Ví dụ:
* Hãy xem xét một lớp TCPConnection đại diện cho một kết nối mạng. Đối tượng kết nối TCPConnection có thể ở một trong một số trạng thái khác nhau: Established, Listening, Closed. Khi một đối tượng TCPConnection nhận được yêu cầu từ các đối tượng khác, nó sẽ thực hiện hành vi khác nhau tùy thuộc vào trạng thái hiện tại của nó.
* Kết quả đạt được của một Open request phụ thuộc vào việc kết nối ở trạng thái Closed hay Established. State pattern mô tả cách TCPConnection thể hiện hành vi khác nhau tùy vào mỗi trạng thái.
* Ý tưởng chính trong mẫu này là giới thiệu một lớp trừu tượng gọi là TCPState để đại diện cho các trạng thái của kết nối mạng. Lớp TCPState khai báo một interface chung cho tất cả các lớp thể hiện các trạng thái hoạt động khác nhau. Các lớp con của TCPState sẽ được cài đặt những hành vi cụ thể.
* Lớp TCPEstablished và TCPClosed sẽ triển khai hành động cụ thể cho trạng thái Established và Closed của TCPConnection
![](https://images.viblo.asia/df1e4b3a-0de2-489e-a1b6-7f5f491203b6.gif)
### Solution
State pattern cho rằng nên tạo các class mới cho tất cả các trạng thái có thể có của một object và trích xuất tất cả các hành vi dành riêng cho trạng thái vào các class đó.

Thay vì tự thực hiện tất cả các hành vi, đối tượng ban đầu, được gọi là ngữ cảnh, lưu trữ một tham chiếu đến một trong các đối tượng trạng thái đại diện cho trạng thái hiện tại của nó và ủy quyền tất cả các công việc liên quan đến trạng thái cho đối tượng đó. 
![](https://images.viblo.asia/94f5d487-8cc2-4ba0-9c2f-beb243426afd.png)

Để chuyển context sang state khác, hãy thay thế state object hoạt động bằng một object khác đại diện cho state mới đó. Điều này chỉ có thể thực hiện được nếu tất cả các state class tuân theo cùng một interface và context hoạt động với các object này thông qua interface đó.
## 3. Kiến trúc
![](https://images.viblo.asia/dacc64a4-ecc1-4094-b625-764e08c78a49.png)

Các thành phần trong mô hình:
* *Context:* Là lớp có nhiều trạng thái, hành vi lớp sẽ bị thay đổi bởi trạng thái. Được sử dụng bởi Client. Client không truy cập trực tiếp đến State của Object. Lớp Context này chứa thông tin của ConcreteState object, cho hành vi nào tương ứng với trạng thái nào hiện đang được thực hiện
* *State Interface:* Là interface hoặc abstract class xác định các đặc tính cơ bản của tất cả ConcreteState Object. Chúng sẽ được sử dụng bởi đối tượng Context để truy cập chức năng có thể thay đổi.
* *Concrete States:* Là lớp cụ thể của state ứng với từng trạng thái của context 
* Cả Context và ConcreteState đều có thể thiết lập trạng thái tiếp theo của ngữ cảnh và thực hiện chuyển đổi trạng thái thực tế bằng cách thay thế đối tượng trạng thái được liên kết với ngữ cảnh.

![](https://images.viblo.asia/57b59923-d4f6-4428-899e-190515b8d37a.png)

Trong ví dụ này, State Pattern cho phép các control của media player hoạt động khác nhau, tùy thuộc vào trạng thái phát lại hiện tại.

Main object của player luôn được liên kết với một state object thực hiện hầu hết công việc cho player. Một số hành động thay thế current state object của player bằng object khác, điều này thay đổi cách player phản ứng với các tương tác của user.
## 4. Ưu & nhược điểm
#### Ưu điểm
* *Đảm bảo nguyên tắc Single Responsibility (SRP):* Tách biệt mỗi State tương ứng với 1 class riêng biệt.
* *Đảm bảo nguyên tắc Open/Closed Principle (OCP):* chúng ta có thể thêm một State mới mà không ảnh hưởng đến State khác hay Context hiện có.
* Giữ hành vi cụ thể tương ứng với mỗi State (trạng thái).
* Giúp chuyển State một cách rõ ràng.
* Loại bỏ các câu lệnh xét trường hợp (If, Switch case) giúp đơn giản code của context
#### Nhược điểm
* Việc sử dụng state pattern có thể quá mức cần thiết nếu state machine chỉ có một vài trạng thái hoặc hiếm khi thay đổi có thể dẫn đến việc tăng độ phức tạp của code
## 5. Khi nào thì sử dụng 
* Sử dụng State pattern khi bạn có một object hoạt động khác nhau tùy thuộc vào trạng thái hiện tại của nó, số lượng trạng thái là rất lớn và code của trạng thái cụ thể thường xuyên thay đổi.
* Sử dụng State pattern khi bạn có một lớp với nhiều các điều kiện lớn làm thay đổi cách class hoạt động theo các giá trị hiện tại của các trường của class.
* Sử dụng State Pattern khi bạn có nhiều code trùng lặp qua các trạng thái và chuyển đổi tương tự của State Pattern dựa trên điều kiện.
* Thay đổi hành vi object dựa trên trạng thái object
* Thay thế việc sử dụng rất nhiều điều kiện thay đổi cách lớp hành động dựa trên các giá trị của lớp
## 6. Source code minh họa với C#
* Quyết định class nào sẽ được coi như là context. Nó có thể là 1 class đã có sẵn và đã có code phụ thuộc với state; hoặc 1 class mới, nếu code cho riêng state cụ thể đã được phân tán khắp nhiều class.
* Khai báo state interface. Mặc dù nó bao gồm tất cả methods khai báo trong context, chỉ nhắm vào những cái nào bao gồm hành vi cho state cụ thể.
* Với mỗi state thật sự, tạo 1 class trích dẫn từ state interface. Sau đó với mỗi methods của context, trích ra tất cả code liên quan đến state đó vào class vừa tạo.
* Trong context class, tạo 1 trường reference của state interface type và 1 public setter cho phép override giá trị của field đó.
* Xem qua các method của context lần nữa và thay thế những điều kiện state trống bằng những hàm gọi đến methods tương ứng của state object.
* Để đổi state của context, tạo 1 instance của 1 trong các state class và truyền nó vào context. Ta có thể làm điều này bên trong context, hoặc trong các states, hoặc trong client code. Dù nó được thực hiện ở đâu, class trở nên phụ thuộc vào state object cụ thể. 

```
    class Context
    {
        private State _state = null;

        public Context(State state)
        {
            this.TransitionTo(state);
        }

        public void TransitionTo(State state)
        {
            Console.WriteLine($"Context: Transition to {state.GetType().Name}.");
            this._state = state;
            this._state.SetContext(this);
        }

        public void Request1()
        {
            this._state.Handle1();
        }

        public void Request2()
        {
            this._state.Handle2();
        }
    }

    abstract class State
    {
        protected Context _context;

        public void SetContext(Context context)
        {
            this._context = context;
        }

        public abstract void Handle1();

        public abstract void Handle2();
    }

    class ConcreteStateA : State
    {
        public override void Handle1()
        {
            Console.WriteLine("ConcreteStateA handles request1.");
            Console.WriteLine("ConcreteStateA wants to change the state of the context.");
            this._context.TransitionTo(new ConcreteStateB());
        }

        public override void Handle2()
        {
            Console.WriteLine("ConcreteStateA handles request2.");
        }
    }

    class ConcreteStateB : State
    {
        public override void Handle1()
        {
            Console.Write("ConcreteStateB handles request1.");
        }

        public override void Handle2()
        {
            Console.WriteLine("ConcreteStateB handles request2.");
            Console.WriteLine("ConcreteStateB wants to change the state of the context.");
            this._context.TransitionTo(new ConcreteStateA());
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var context = new Context(new ConcreteStateA());
            context.Request1();
            context.Request2();
        }
    }   
```
## 7. Design Pattern liên quan
* Bridge, State, Strategy có cấu trúc rất giống nhau. Tất cả các pattern này đều dựa trên bố cục, giao công việc nào đó cho các object khác. Tuy nhiên, chúng đều giải quyết các vấn đề khác nhau.
* State có thể được coi là một phần mở rộng của Strategy. Cả hai Pattern đều dựa trên thành phần: chúng thay đổi hành vi của ngữ cảnh bằng cách ủy quyền một số công việc cho các object trợ giúp. 
* Gần giống strategy, chuyển đổi các chiến lược thông qua các phương thức được định nghĩa trong interface. State không hạn chế sự phụ thuộc giữa các trạng thái cụ thể, cho phép chúng thay đổi trạng thái của ngữ cảnh theo ý muốn.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern