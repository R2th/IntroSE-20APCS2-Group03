## 1. Giới thiệu
* Observer Pattern là một mẫu thiết kế thuộc nhóm Behavioral Pattern 
* Định nghĩa mối phụ thuộc một - nhiều giữa các đối tượng để khi mà một đối tượng có sự thay đổi trạng thái, tất cả các thành phần phụ thuộc của nó sẽ được thông báo và cập nhật một cách tự động.
* Một đối tượng có thể thông báo đến một số lượng không giới hạn các đối tượng khác
* Chúng giống như việc khi ta đăng ký hay nhấn chuông thông báo 1 kênh Youtube, thì khi kênh đó có video mới (thay đổi trạng thái), chúng sẽ gửi thông báo (một cách tự động) đến chúng ta.
## 2. Kiến trúc
![](https://images.viblo.asia/668f05e6-a74e-4919-96b2-2e92f6a316a5.png)

Các thành phần trong mô hình:
* **Publisher (subject)** là lớp cần lắng nghe. Khi có sự kiện, Publisher sẽ thông báo cho **Subscriber (observer)**
* Khi một sự kiện mới xảy ra, publisher xem qua danh sách đăng ký và gọi phương thức thông báo được khai báo trong subsrciber interface trên từng subscriber object.
* **Subscriber** là interface để Publisher báo cáo mỗi khi có sự kiện.
* Trong hầu hết các trường hợp, nó bao gồm một update method duy nhất. 
* **ConcreteSubscriber (SubscriberA,B...)** cài đặt cụ thể hành động lớp cần làm khi nhận sự kiện của Publisher.
* Thông thường, subscriber cần một số thông tin theo ngữ cảnh để xử lý bản cập nhật một cách chính xác. Vì lý do này, publisher thường chuyển một số dữ liệu ngữ cảnh làm đối số của phương thức thông báo. Publisher có thể chuyển chính nó làm đối số, cho phép subscriber tìm nạp trực tiếp bất kỳ dữ liệu bắt buộc nào
* **Client** là người sử dụng Observer.
Danh sách subscriber được biên dịch động: các đối tượng có thể bắt đầu hoặc dừng nghe thông báo trong thời gian chạy, tùy thuộc vào hành vi mong muốn của ứng dụng.
Trong cách triển khai này, lớp Editor không tự duy trì danh sách subscription. Nó ủy thác công việc này cho đối tượng trợ giúp đặc biệt dành riêng cho việc đó. 
Việc thêm Subscriber mới vào chương trình không yêu cầu thay đổi đối với các class Publisher hiện có, miễn là chúng hoạt động với tất cả subscriber thông qua cùng một giao diện.
## 4. Ưu & nhược điểm
#### Ưu điểm
* Đảm bảo nguyên tắc Open/Closed Principle (OCP): Cho phép thay đổi Subject và Observer một cách độc lập. Chúng ta có thể tái sử dụng các Subject mà không cần tái sử dụng các Observer và ngược lại. Nó cho phép thêm Observer mà không sửa đổi Subject hoặc Observer khác.
* Thiết lập mối quan hệ giữa các objects trong thời gian chạy.
* Sự thay đổi trạng thái ở 1 đối tượng có thể được thông báo đến các đối tượng khác mà không phải giữ chúng liên kết quá chặt chẽ.
* Không giới hạn số lượng Observer
#### Nhược điểm
* Unexpected update: Bởi vì các Observer không biết về sự hiện diện của nhau, nó có thể gây tốn nhiều chi phí của việc thay đổi Subject.
* Subscriber được thông báo theo thứ tự ngẫu nhiên.
## 5. Khi nào thì sử dụng 
Sử dụng Observer Patern khi chúng ta muốn:
* Sự thay đổi trạng thái ở 1 đối tượng cần được thông báo đến các đối tượng khác mà không phải giữ chúng liên kết quá chặt chẽ.
* Cần mở rộng dự án với ít sự thay đổi nhất.
* Khi abstraction có 2 khía cạnh, cái này phụ thuộc cái kia. Đóng gói các khía cạnh này trong các đối tượng khác nhau cho phép bạn thay đổi và tái sử dụng chúng độc lập.
* Khi thay đổi một đối tượng yêu cầu việc thay đổi đến các đối tượng khác, và bạn không biết số lượng đối tượng cần thay đổi.
* Khi một đối tượng thông báo các đối tượng khác mà không cần biết đối tượng đó là gì hay nói cách khác là tránh tightly coupled.
## 6. Source code minh họa với C#
Các bước xây dựng Observer: 
*  Xem qua logic của ứng dụng và chia nó thành hai phần: chức năng cốt lõi, độc lập với các code khác, sẽ đóng vai trò là publisher; phần còn lại sẽ là một tập hợp các lớp subscriber.
Khai báo subscriber interface. Ở mức tối thiểu, nó phải khai báo một phương thức cập nhật duy nhất.
* Khai báo subscriber interface. Ở mức tối thiểu, nó phải khai báo một phương thức cập nhật duy nhất.
```
    public interface IObserver
    {
        void Update(ISubject subject);
    }   
```
* Khai báo publisher interface và mô tả một cặp phương pháp để thêm đối tượng subscriber và xóa đối tượng đó khỏi danh sách. Hãy nhớ rằng publisher chỉ được làm việc với subscriber qua interface subscriber.
```
    public interface ISubject
    {
        void Attach(IObserver observer);

        void Detach(IObserver observer);

        void Notify();
    }   
```
* Quyết định nơi đặt danh sách subscriber và việc triển khai các phương thức subscribe. Thông thường, code này trông giống nhau đối với tất cả các loại publisher, vì vậy vị trí rõ ràng để đặt nó là trong một lớp trừu tượng được dẫn xuất trực tiếp từ interface publisher. Publisher cụ thể mở rộng lớp đó, kế thừa hành vi subscription.
* Tuy nhiên, nếu bạn đang áp dụng mẫu hệ thống lớp hiện có, hãy xem xét cách tiếp cận dựa trên composition: đặt logic subscribe vào một đối tượng riêng biệt và khiến tất cả các publisher thực sử dụng nó.
* Tạo các lớp publisher cụ thể. Mỗi khi có điều gì đó quan trọng xảy ra bên trong publisher, publisher phải thông báo cho tất cả những subscriber.
```
    public class Subject : ISubject
    {
        public int State { get; set; } = -0;

        private List<IObserver> _observers = new List<IObserver>();

        public void Attach(IObserver observer)
        {
            Console.WriteLine("Subject: Attached an observer.");
            this._observers.Add(observer);
        }

        public void Detach(IObserver observer)
        {
            this._observers.Remove(observer);
            Console.WriteLine("Subject: Detached an observer.");
        }

        public void Notify()
        {
            Console.WriteLine("Subject: Notifying observers...");

            foreach (var observer in _observers)
            {
                observer.Update(this);
            }
        }

        public void SomeBusinessLogic()
        {
            Console.WriteLine("\nSubject: I'm doing something important.");
            this.State = new Random().Next(0, 10);

            Thread.Sleep(15);

            Console.WriteLine("Subject: My state has just changed to: " + this.State);
            this.Notify();
        }
    } 
```
* Thực hiện các phương pháp thông báo cập nhật trong các lớp subscriber cụ thể. Hầu hết subscriber sẽ cần một số dữ liệu context data về sự kiện. Nó có thể được chuyển như một argument của phương thức thông báo. 
* Nhưng có một lựa chọn khác. Khi nhận được thông báo, subscriber có thể lấy bất kỳ dữ liệu nào trực tiếp từ thông báo. Trong trường hợp này, publisher phải tự chuyển qua phương thức cập nhật. Tùy chọn kém linh hoạt hơn là liên kết publisher với subscriber vĩnh viễn thông qua phương thức khởi tạo.
```
    class ConcreteObserverA : IObserver
    {
        public void Update(ISubject subject)
        {
            if ((subject as Subject).State < 3)
            {
                Console.WriteLine("ConcreteObserverA: Reacted to the event.");
            }
        }
    }

    class ConcreteObserverB : IObserver
    {
        public void Update(ISubject subject)
        {
            if ((subject as Subject).State == 0 || (subject as Subject).State >= 2)
            {
                Console.WriteLine("ConcreteObserverB: Reacted to the event.");
            }
        }
    }   
```
* Client phải tạo tất cả những subscriber cần thiết và subscribe chúng với các publisher phù hợp.
```
    class Program
    {
        static void Main(string[] args)
        {
            var subject = new Subject();
            var observerA = new ConcreteObserverA();
            subject.Attach(observerA);

            var observerB = new ConcreteObserverB();
            subject.Attach(observerB);

            subject.SomeBusinessLogic();
            subject.SomeBusinessLogic();

            subject.Detach(observerB);

            subject.SomeBusinessLogic();
        }
    }   
```
## 7. Design Pattern liên quan
Chain of Responsibility, Command, Mediator và Observer là các cách giải quyết khác nhau cho bài toán kết nối người gửi và người nhận yêu cầu:
* Chain of Responsibility chuyển một yêu cầu tuần tự dọc theo một chuỗi động gồm những người nhận tiềm năng cho đến khi một trong số chúng xử lý yêu cầu đó.
* Command thiết lập kết nối một chiều giữa người gửi và người nhận.
* Mediator loại bỏ các kết nối trực tiếp giữa người gửi và người nhận, buộc họ phải giao tiếp gián tiếp thông qua một đối tượng trung gian.
* Observer cho phép người nhận đăng ký động và hủy đăng ký nhận yêu cầu.

Sự khác biệt giữa Mediator và Observer thường không lớn trong nhiều trường hợp:
* Mục tiêu chính của Mediator là loại bỏ sự phụ thuộc lẫn nhau giữa một tập hợp các thành phần trong hệ thống. Thay vào đó, các thành phần này trở nên phụ thuộc vào một đối tượng trung gian duy nhất.
* Mục tiêu của Observer là thiết lập các kết nối động một chiều giữa các đối tượng, trong đó một số đối tượng hoạt động như cấp dưới của những đối tượng khác.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern