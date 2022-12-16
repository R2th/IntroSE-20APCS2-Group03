Nguồn: [refactoring.guru](https://refactoring.guru/design-patterns/observer)
# Observer
**Tên gọi khác:** Event-Subscriber, Listener

## Ý Đồ
Observer là một behavioral design pattern (sau đây gọi tắt là DP) dùng để định nghĩa một cơ chế đăng ký (subscribe) nhằm thông báo (notify) cho nhiều đối tượng về các sự kiện xảy ra với đối tượng mà chúng đang quan sát (observe).

![](https://images.viblo.asia/55103393-8abd-4034-8c95-3f7fdbfe0cdb.png)

## Vấn đề
Tưởng tượng rằng bạn có hai loại đối tượng: `Khách hàng` và `Cửa hàng`. Khách hàng rất quan tâm đến một thương hiệu sản phẩm cụ thể (giả sử là một mẫu iPhone mới) chuẩn bị được bày bán tại cửa hàng.

Khách hàng có thể ghé thăm cửa hàng mỗi ngày để kiểm tra đã có sản phẩm chưa. Nhưng trong khi sản phẩm vẫn chưa được tung ra, hầu hết những chuyến đi tới cửa hàng này sẽ là vô nghĩa.

![](https://images.viblo.asia/2cd89671-b40c-4441-a5c2-9e7cf697596c.png)

Mặt khác, cửa hàng có thể gửi hàng tấn email (mà sẽ có khách hàng nghĩ là thư rác) cho tất cả khách hàng mỗi khi có sản phẩm mới. Điều này sẽ giúp một số khách hàng đỡ phải mất công đến cửa hàng vô số lần, tuy nhiên, đồng thời, điều này sẽ làm khó chịu những khách hàng khác không quan tâm đến sản phẩm mới.

Có vẻ như có một sự xung đột xảy ra ở đây. Hoặc là khách hàng lãng phí thời gian kiểm tra xem sản phẩm đã có hàng hay chưa, hoặc là cửa hàng lãng phí nguồn lực khi thông báo cho khách hàng không muốn nhận thông báo.

## Giải pháp
Đối tượng mà có một số trạng thái mà đối tượng khác quan tâm thường được gọi là *subject*, nhưng vì nó cũng sẽ thông báo cho các đối tượng khác về những thay đổi đối với trạng thái của nó, chúng tôi sẽ gọi nó là *publisher*. Tất cả các đối tượng khác muốn theo dõi các thay đổi đối với trạng thái của *publisher* được gọi là *subscribers*.

Observer DP gợi ý rằng chúng ta nên thêm cơ chế subscribe vào class publisher để các đối tượng riêng lẻ có thể subscribe hoặc hủy subscribe khỏi luồng sự kiện đến từ publisher đó. Nghe có vẻ phức tạp, nhưng thực tế sẽ đơn giản hơn bạn nghĩ đấy :) Trên thực tế, cơ chế này bao gồm 1) một mảng để lưu trữ danh sách các tham chiếu đến các đối tượng subscriber và 2) một số public method cho phép thêm và xóa subscriber.

![](https://images.viblo.asia/aeca1e4e-d86c-4f05-8777-b1c8c73c75fa.png)

Giờ đây, bất cứ khi nào một sự kiện quan trọng xảy ra với publisher, publisher sẽ chạy qua mảng subscriber và gọi phương thức thông báo cụ thể của các đối tượng ấy.

Các ứng dụng thực có thể có hàng chục class subscriber khác nhau quan tâm đến việc theo dõi các sự kiện của cùng một class publisher. Trong trường hợp này, chúng ta không nên couple publisher vào tất cả các class đó. Bên cạnh đó, chúng ta có thể thậm chí không biết trước về một số trong số những class đó nếu class publisher của chúng ta viết ra với mục đích được người khác sử dụng.

Đó là lý do tại sao điều quan trọng là tất cả các subscriber phải implement cùng một giao diện và publisher chỉ giao tiếp với các subscriber qua giao diện đó. Giao diện này nên khai báo phương thức thông báo cùng với một tập hợp các tham số mà publisher có thể sử dụng để chuyển một số dữ liệu theo ngữ cảnh cùng với thông báo.

![](https://images.viblo.asia/edcd1fc0-cde2-4973-9583-f739ec333ae8.png)

Nếu ứng dụng của bạn có nhiều loại publisher khác nhau và bạn muốn làm cho subscriber tương thích với tất cả các publisher, bạn có thể làm cho tất cả các publisher follow cùng một giao diện. Giao diện này chỉ cần mô tả một số phương pháp subscribe. Giao diện sẽ cho phép subscriber quan sát trạng thái của publisher mà không couple đến các class cụ thể của publisher.

## Ví von với thực tế
![](https://images.viblo.asia/702fe479-8b6f-407d-8e29-3e77d53692aa.png)

Nếu bạn subscribe một tờ báo hoặc tạp chí, bạn không cần phải đến cửa hàng để kiểm tra xem số tiếp theo đã có hay không. Thay vào đó, nhà xuất bản sẽ gửi các số báo mới trực tiếp đến hộp thư của bạn ngay sau khi xuất bản hoặc thậm chí trước.

Nhà xuất bản giữ danh sách những người đăng ký và biết họ quan tâm đến tạp chí nào. Người đăng ký có thể rời khỏi danh sách bất kỳ lúc nào khi họ không muốn nhà xuất bản gửi các số tạp chí mới cho họ nữa.

## Cấu trúc
![](https://images.viblo.asia/0b174717-587a-446f-aca5-aa1b079ee201.png)

1. Publisher bắn các sự kiện mà các đối tượng khác quan tâm. Những sự kiện này xảy ra khi publisher thay đổi trạng thái hoặc thực hiện một số hành vi. Publisher có cơ chế subscribe cho phép đối tượng ra/vào danh sách subscriber.

2. Khi một sự kiện mới xảy ra, publisher duyệt qua danh sách subscriber và gọi phương thức thông báo được khai báo trong giao diện subscriber của từng đối tượng subscriber.

3. Giao diện **Subscriber** khai báo giao diện thông báo. Trong hầu hết các trường hợp, nó bao gồm chỉ một phương thức là `update`. Phương thức có thể có một số tham số cho phép publisher pass một số chi tiết sự kiện cùng với sự kiện cập nhật.

4. Class **Subscriber** cụ thể thực hiện một số hành động để phản hồi lại các thông báo do publisher đưa ra. Tất cả các lớp này phải implement cùng một giao diện để publisher không phải couple với các class cụ thể.

5. Thông thường, subscriber cần một số thông tin theo ngữ cảnh để xử lý sự kiện cập nhật một cách chính xác. Vì lý do này, publisher thường chuyển một số dữ liệu ngữ cảnh làm param của phương thức thông báo. Publisher có thể pass chính nó như một param, cho phép subscriber trực tiếp fetch bất kỳ dữ liệu nào mà nó cần.

6. **Client** tạo các đối tượng publisher và subscriber riêng biệt và sau đó subscribe subscriber vào publisher để lắng nghe các cập nhật của publisher.

## Giả mã
Danh sách subscriber được biên dịch động: Các đối tượng có thể bắt đầu hoặc dừng nghe thông báo tại runtime, tùy thuộc vào hành vi mong muốn của ứng dụng của bạn.

Trong cách triển khai này, class editor không tự lưu danh sách subscribe. Nó ủy thác công việc này cho đối tượng helper đặc biệt dành riêng cho việc đó. Bạn có thể nâng cấp đối tượng đó để biến nó thành một event dispatcher tập trung, cho phép bất kỳ đối tượng nào hoạt động như một publisher.

Việc thêm subscriber mới vào chương trình không yêu cầu thay đổi đối với các lớp publisher hiện có, miễn là chúng hoạt động với tất cả subscriber thông qua cùng một giao diện.

```
// The base publisher class includes subscription management
// code and notification methods.
class EventManager is
    private field listeners: hash map of event types and listeners

    method subscribe(eventType, listener) is
        listeners.add(eventType, listener)

    method unsubscribe(eventType, listener) is
        listeners.remove(eventType, listener)

    method notify(eventType, data) is
        foreach (listener in listeners.of(eventType)) do
            listener.update(data)

// The concrete publisher contains real business logic that's
// interesting for some subscribers. We could derive this class
// from the base publisher, but that isn't always possible in
// real life because the concrete publisher might already be a
// subclass. In this case, you can patch the subscription logic
// in with composition, as we did here.
class Editor is
    public field events: EventManager
    private field file: File

    constructor Editor() is
        events = new EventManager()

    // Methods of business logic can notify subscribers about
    // changes.
    method openFile(path) is
        this.file = new File(path)
        events.notify("open", file.name)

    method saveFile() is
        file.write()
        events.notify("save", file.name)

    // ...


// Here's the subscriber interface. If your programming language
// supports functional types, you can replace the whole
// subscriber hierarchy with a set of functions.
interface EventListener is
    method update(filename)

// Concrete subscribers react to updates issued by the publisher
// they are attached to.
class LoggingListener implements EventListener is
    private field log: File
    private field message

    constructor LoggingListener(log_filename, message) is
        this.log = new File(log_filename)
        this.message = message

    method update(filename) is
        log.write(replace('%s',filename,message))

class EmailAlertsListener implements EventListener is
    private field email: string

    constructor EmailAlertsListener(email, message) is
        this.email = email
        this.message = message

    method update(filename) is
        system.email(email, replace('%s',filename,message))


// An application can configure publishers and subscribers at
// runtime.
class Application is
    method config() is
        editor = new Editor()

        logger = new LoggingListener(
            "/path/to/log.txt",
            "Someone has opened the file: %s")
        editor.events.subscribe("open", logger)

        emailAlerts = new EmailAlertsListener(
            "admin@example.com",
            "Someone has changed the file: %s")
        editor.events.subscribe("save", emailAlerts)
```

## Tính ứng dụng
*** Sử dụng mẫu Observer khi các thay đổi đối với trạng thái của một đối tượng có thể yêu cầu việc thay đổi các đối tượng khác và danh sách đối tượng trong thực tế không được biết trước hoặc có thể thay đổi động.**
Bạn thường có thể gặp vấn đề này khi làm việc với các class GUI. Ví dụ: Bạn đã tạo các class button custom và bạn muốn cho phép client kết nối một số code custom vào các button đó để code ấy kích hoạt bất cứ khi nào người dùng nhấn vào một button.
Observer DP cho phép bất kỳ đối tượng nào triển khai giao diện subscriber subscribe để nhận thông báo sự kiện từ đối tượng publisher. Bạn có thể thêm cơ chế subscribe vào các nút của mình, cho phép client kết nối code custom của họ thông qua các lớp subscriber custom.

*** Sử dụng DP này khi một số đối tượng trong ứng dụng của bạn phải quan sát những đối tượng khác, nhưng chỉ trong thời gian giới hạn hoặc trong các trường hợp cụ thể.
**
Danh sách subscribe là động, vì vậy subscriber có thể vào hoặc ra khỏi danh sách bất cứ khi nào nó cần.

## Cách implement
1. Quan sát business logic của bạn và cố gắng chia nó thành hai phần: chức năng cốt lõi, độc lập với mã khác -> phần này sẽ là publisher; phần còn lại sẽ biến thành tập các class subscriber.
2. Khai báo giao diện subscriber. Ở mức tối thiểu, nó phải khai báo một phương thức `update`.
3. Khai báo giao diện publisher và mô tả hai phương thức là thêm đối tượng subscriber và xóa đối tượng đó khỏi danh sách. Hãy nhớ rằng publisher chỉ được làm việc với subscriber qua giao diện subscriber.
4. Quyết định vị trí đặt danh sách subscribe thực tế và việc triển khai các phương thức subscribe. Thông thường, code này sẽ giống nhau đối với tất cả các loại publisher, do đó, vị trí rõ ràng để đặt nó là trong một lớp trừu tượng inherit trực tiếp từ giao diện publisher. Class publisher cụ thể extend class đó, kế thừa hành vi subscribe.
Tuy nhiên, nếu bạn đang áp dụng DP này cho hệ thống class hiện có, hãy xem xét cách tiếp cận dựa trên composition: đặt logic subscribe vào một đối tượng riêng biệt và khiến tất cả các publisher thực sử dụng nó.
5. Tạo các class publisher cụ thể. Mỗi khi có điều gì quan trọng xảy ra bên trong publisher, publisher sẽ phải thông báo cho tất cả những subscriber của mình.
6. Implement các phương thức thông báo cập nhật trong các lớp subscriber cụ thể. Hầu hết subscriber sẽ cần một số dữ liệu ngữ cảnh về sự kiện. Dữ liệu đó có thể được pass vào làm một param của phương thức thông báo.
Nhưng có một lựa chọn khác, đó là khi nhận được thông báo, subscriber có thể lấy bất kỳ dữ liệu nào trực tiếp từ thông báo. Trong trường hợp này, publisher phải tự pass chính nó thông qua qua phương thức update. Tùy chọn kém linh hoạt hơn là liên kết nhà xuất bản với subscriber vĩnh viễn thông qua phương thức khởi tạo.
7. Client phải tạo tất cả subscriber cần thiết và subscribe chúng với các publisher thích hợp.


## Ưu và nhược điểm
Ưu 1: Open/Closed Principle: Bạn có thể thêm các class subscriber mới mà không cần phải thay đổi code  của class publisher (và ngược lại nếu có giao diện publisher).
Ưu 2: Bạn có thể thiết lập quan hệ giữa các đối tượng tại runtime.
Nhược: Không kiểm soát được thứ tự subscriber nhận thông báo.

## Mối quan hệ với các DP khác
* Chain of Responsibility, Command, Mediator và Observer là các cách giải quyết khác nhau cho bài toán kết nối người gửi và người nhận yêu cầu:
        Chain of Responsibility chuyển một yêu cầu tuần tự dọc theo một chuỗi động gồm những người nhận tiềm năng cho đến khi một trong số chúng xử lý yêu cầu đó.
        Command thiết lập kết nối một chiều giữa người gửi và người nhận.
        Mediator loại bỏ các kết nối trực tiếp giữa người gửi và người nhận, buộc họ phải giao tiếp gián tiếp thông qua một đối tượng trung gian.
        Observer cho phép người nhận đăng ký động và hủy đăng ký nhận yêu cầu.
        
* Sự khác biệt giữa Mediator và Observer thường không lớn trong nhiều trường hợp. Trong hầu hết các trường hợp, bạn có thể implement một trong các DP này; nhưng đôi khi bạn có thể áp dụng đồng thời cả hai. Hãy xem cách chúng tôi làm điều đó.

Mục tiêu chính của Mediator là loại bỏ sự phụ thuộc lẫn nhau giữa một tập hợp các thành phần trong hệ thống. Thay vào đó, các thành phần này trở nên phụ thuộc vào một đối tượng trung gian duy nhất. Mục tiêu của Observer là thiết lập các kết nối động một chiều giữa các đối tượng, trong đó một số đối tượng hoạt động như cấp dưới của những đối tượng khác.

Có một cách triển khai phổ biến của Mediator mà dựa vào Observer. Đối tượng mediator đóng vai trò là publisher và các thành phần đóng vai trò là subscriber subscribe và hủy subscribe các sự kiện của mediator. Khi Mediator được implement theo cách này, nó có thể trông rất giống với Observer.

Khi bạn thấy khó hiểu, hãy nhớ rằng bạn có thể implement Mediator theo những cách khác. Ví dụ: bạn có thể liên kết vĩnh viễn tất cả các component với cùng một đối tượng Mediator. Việc triển khai này sẽ không giống với Observer nhưng vẫn sẽ là một phiên bản của Mediator.

Bây giờ hãy tưởng tượng một chương trình mà tất cả các component đã trở thành publisher, cho phép các kết nối động giữa nhau. Sẽ không có đối tượng mediator tập trung, chỉ có một nhóm observer phân tán.