Xin chào các bạn, hôm nay chúng ta sẽ tìm hiểu về Combine framework. Combine là một framework mới được Apple giới thiệu ở WWDC 2019. Một framework cung cấp khai báo Swift API cho việc xử lý dữ liệu theo thời gian. Bài viết do mình tự tìm hiểu và viết theo cách hiểu. Nếu có gì sai sót mong được sự nhận xét từ mọi người. Thanks for reading.
# Publisher
Tại trái tim của Combine là Publisher protocol. Protocol này định nghĩa các các yêu câu cho type để có thể truyền một chuỗi các value theo thời gian đến một hoặc nhiều subcribers. Hay 1 publisher sẽ publish hoặc phát ra sự kiện kèm theo value.

Nếu bạn đã từng dev trên nên tảng Apple trước kia, bạn có thể nghĩa Publisher giống với NotificationCenter. Sự thật thì bây giờ NotificationCenter có một method có tên `publisher(for:object:)` nó cung cấp một type `Publisher` có thể phát ra notification.

Bây giờ hãy thử xem publisher hoạt động ra sao:
```Swift
// 1
let myNotification = Notification.Name("MyNotification") 
// 2
let publisher = NotificationCenter.default
                                                                               .publisher(for: myNotification, object: nil)
let center = NotificationCenter.default
// 3
let observer = center.addObserver(forName: myNotification, object: nil, queue: nil) { notification in
        print("Notification recived!")
}
// 4
center.post(name: myNotification, object: nil)
// 5
center.removeObserver(observer)
```
Trong đoạn code này:

1. Tạo một notification name
2. Truy cập NotificationCenter với default center sao đó gọi method `publisher(for:object:)` và gán return value cho một local constant
Bạn có thể thấy `publisher(for:object:)` sẽ trả về một Publisher nó phát ra một sự kiện khi default notification center phát ra notification.

Vậy, điểm gì khác của publisher khi mà NotificationCenter đã có khả năng phát ra notification mà không cần đến publisher. Bạn có thể nghĩ type của method như là một cầu nối từ cũ sang mới - một cách để kết hợp với các API hiện có của NotificationCenter.

Một publisher phát ra 2 loại event:
- Value - cũng gọi là element
- Một completion event

Một Publisher có thể phát ra 0 hoặc nhiều value nhưng chỉ có 1 completion event với giá trị hoàn thành bình thường hoặc lỗi. Một publisher phát ra completion event thì nó sẽ hoàn thành và không phát ra bất kỳ event nào nữa.

3. Tạo observer để lắng nghe notification với tên bạn đạ tạo trước đó.
4. Gửi một notification với tên đó.
5. Gỡ observer khỏi Notification Center.

Chạy dưới background bạn sẽ thấy:
```
Notification received!
```
# Subscriber
Subscriber là một protocol define một type để có thể nhận làm input từ publisher. Hãy thử đoạn code sau:
```Swift
let myNotification = Notification.Name("MyNotification")
let publisher = NotificationCenter.default.publisher(for: myNotification, object: nil)
let center = NotificationCenter.default
```
Nếu bạn post một notification ngay bây giờ thì publisher sẽ không thể phát nó. => Điều quan trọng cần ghi nhớ: Publisher chỉ có thể phát ra khi nó có ít nhất một subscriber
## Subscribing với sink( \_:\_: )
Tiếp tục với ví dụ trước, thêm đoạn code bên dưới đây vào.
```Swift
let subscription = publisher
     .sink { _ in
         print("Notification received from a publisher!")
 }
```
Với đoạn code này bạn tạo một subscription bằng cách gọi `sink` ở publiser. Option-click vào `sink` bạn sẽ thấy rằng đơn giản là sink cung cấp một cách để đính kèm một subscriber với closures để xử lý output từ publisher. Ở trong ví dụ này bạn bạn bỏ qua closure này thay vào đó bạn chỉ in ra message chỉ ra rằng bạn đã nhận được notification.

`Sink` sẽ tiếp tục nhận value từ publisher gửi tới. Toán tử `sink` cung cấp 2 closure: 1 cái để nhận và xử lý completion event và 1 cái để xử lý value nhận được.

Hãy thêm một ví dụ nữa:
```Swift
// 1
 let just = Just("Hello world!")

 // 2
 _ = just
     .sink(
         receiveCompletion: {
             print("Received completion", $0)
         },
         receiveValue: {
             print("Received value", $0)
         })
```
Ở trên bạn đã:
1. Tạo một publisher sữ dụng `Just` cho phép bạn tạo một publisher với kiểu primitive value.
2. Tạo một subscription cho publisher và in message mỗi khi nhận được event.

Chạy dưới background bạn sẽ thấy:
```
Received value Hello world!
Received completion finished
```
Option-click vào `Just` bạn sẽ thấy nó là một Publisher phát ra output cho mỗi subscriber một lần sau đó kết thúc. 
Thử thêm 1 subscriber nữa bên dưới ví dụ xem:
```Swift
_ = just
     .sink(
     receiveCompletion: {
             print("Received completion (another)", $0)
     },
     receiveValue: {
         print("Received value (another)", $0)
     })
```
Chạy thử và thấy:
```
Received value (another) Hello world!
Received completion (another) finished
```
## Subscribing with assign( to\: on\: )
Ngoài `sink` ta có thêm `assign(to:on:)` cho phép bạn gán value nhận được vào một KOV-compliant property của object.
Hảy thử xem cách hoạt động:
```Swift
class SomeObject {
    var value: String = "" {
        didSet {
            print(value)
        }
    }
}
// 2
let object = SomeObject()
// 3
let publisher = ["Hello", "world!"].publisher
// 4
_ = publisher.assign(to: \.value, on: object)
```
1. Define một class với một property có `didSet` property observer sẽ in ra new value
2. Tạo một instance của class
3. Tạo một publisher từ một mảng của chuỗi
4. Subscribe tới publisher. Gán mỗi value nhận được vào value property của object.

Khi chạy ta sẽ được:
```
Hello
world!
```
# Cancellable
Khi một subscriber đã hoàn thành và không cần nhận value từ publisher nữa, là lúc huỷ bỏ subscription để giải phóng bộ nhớ và dừng các hoạt động tương ứng như việc gọi network.

Subscription return một instance của `AnyCancellable` giống như một "cancellation token" -  giúp cho có thể huỷ bỏ subscription khi bạn đã hoàn thành nó.

`AnyCancellable` thì tuân theo `Cancellable` protocol -  cái mà yêu cầu method `cancel()` sẽ chính xác theo mục đích.

Hoàn thành ví dụ về Subscriber bên trên bằng cách thêm đoạn code sau:
```Swift
// 1
center.post(name: myNotification, object: nil)
// 2
subscription.cancel()
```
1. Giống với ví dụ bên trên: gửi một notification
2. Huỷ bỏ subscription bằng cách gọi `cancel()` bởi vì `Subscription` protocol kế thừa từ `Cancellable`.

Chạy dưới background sẽ thấy:
```
Notification received from a publisher!
```
Nếu bạn không gọi `cancel()` thì nó sẽ tiếp tục cho đến khi publisher complete, hoặc cho đến khi normal memory managament deinitialized subscription. Đến lúc đó thì subscription mới được huỷ bỏ.

Lưu ý: nếu bạn không lưu trữ một subscription trong các dự án, subscription đó sẽ hủy ngay khi luồng chương trình thoát khỏi phạm vi mà nó được tạo!

# Hiểu chuyện gì đã xảy ra.
![](https://images.viblo.asia/482d7118-0b47-434f-8712-49352b018dcd.png)
Theo như UML diagram thì ta thấy:
1. Subscriber subscribe tới publisher
2. Publisher tạo subscription và đưa nó cho subscriber
3. Subscriber yêu cầu value
4. Publisher gửi value
5. Publisher gửi một complete

Hãy xem Publisher protocol và một trong những extension quan trọng nhất của nó:
```Swift
public protocol Publisher {
     // 1
     associatedtype Output
     // 2
     associatedtype Failure : Error
     // 4
     func receive<S>(subscriber: S)
         where S: Subscriber,
         Self.Failure == S.Failure,
         Self.Output == S.Input
}
extension Publisher {
     // 3
     public func subscribe<S>(_ subscriber: S)
         where S : Subscriber,
         Self.Failure == S.Failure,
         Self.Output == S.Input
}
```
1. Type của value mà Publisher có thể cung cấp
2. Type của error mà Publisher có thể cung cấp hoặc Never nếu đảm bảo publisher không xảy ra error
3. Một subscriber gọi `subscribe(_:)` trên publisher để đính kèm nó
4. Thực hiện `subscribe(_:)` sẽ gọi `recive(subscriber:)` để kèm subscriber với publisher tạo ra một subscrition

associated types là publisher interface rằng 1 subscriber phải phù hợp để tạo subscription.
Bây giờ hãy xem Subscriber protocol:
```
public protocol Subscriber: CustomCombineIdentifierConvertible {
     // 1
     associatedtype Input
     // 2
     associatedtype Failure: Error
     // 3
     func receive(subscription: Subscription)
     // 4
     func receive(_ input: Self.Input) -> Subscribers.Demand
     // 5
     func receive(completion: Subscribers.Completion<Self.Failure>)
}
```
1. Type của value mà subscriber có thể nhận
2. Type của error mà subscriber có thể nhận hoặc Never nếu đảm bảo subscriber nhận error
3. Publisher gọi `receive(subscription:)` trên subscriber để cho nó một subscription
4. Publisher gọi `receive(_:)` trên subscriber để gửi một value mới rằng nó mới publish.
5. Publisher gọi `recieve(complete:)` trên subscriber để nói rằng nó đã hoàn thành cung cấp value, hoặc ở trường hợp bình thường hoặc ở trường hợp error.

Sự kết nối giữa publisher và subscriber là subscription. Tiếp theo là `Subscription` protocol:
```Swift
public protocol Subscription: Cancellable,
CustomCombineIdentifierConvertible {
     func request(_ demand: Subscribers.Demand)
}
```
Subscriber gọi `request(_:)` để chỉ ra rằng nó sẽ nhận nhiều giá trị, cho tới 1 giá trị max hoặc không giới hạn.
**Note:** Khái niệm về subscriber sẽ nhận bao nhiêu value được gọi là **backpressure management**. Không có nó, hoặc một số cách xử lý khác, một subscriber có thể bị ngập trong nhiều value từ publisher hơn mức có thể xử lý và điều này có thể dẫn đến các vấn đề.

Trong `Subscriber` nói rằng `receive(_:)` sẽ return một `Demand`. Mặc dù số lượng giá trị max mà subscriber sẽ nhận, được chỉ định khi bắt đầu gọi `subscription.request(_:)` trong `receive(_:)`, nhưng bạn cũng có thể điều chỉnh giá trị max này mỗi khi nhận được value mới.

**Note:** Điều chỉnh `max` trong `Subscriber.receive(_:)` là có thể. Giá trị `max` mới sẽ được thêm vào giá trị `max` hiện tại. Gí trị `max` mới phải là dương nếu không sẽ trả ra `fatalError`. Nó nghĩa là bạn chỉ có thể tăng `max` chứ không thể giảm `max`.
# Tạo một custom subscriber
Bây giờ là thời gian cho việc thực hành những gì bạn mới học.
```Swift
// 1
 let publisher = (1...6).publisher

 // 2
 final class IntSubscriber: Subscriber {
     // 3
     typealias Input = Int
     typealias Failure = Never
     // 4
     func receive(subscription: Subscription) {
         subscription.request(.max(3))
     }

     // 5
     func receive(_ input: Int) -> Subscribers.Demand {
         print("Received value", input)
         return .none
     }

     // 6
     func receive(completion: Subscribers.Completion<Never>) {
         print("Received completion", completion)
     }
 }
```
Những gì bạn làm phía trên là:
1. Tạo một publisher của integers
2. Định nghĩa một custom subscriber ở đây là `IntSubscriber`
3. Thực hiện các type alias cụ thể để biết subscriber có thể nhận integer là đầu vào và `Never` nhận error.
4. Thực hiện require method, bắt đầu với `receive(subscription:)` -  cái mà được gọi bởi publisher. Và trong method này gọi `.request(_:)` trên một subscription cụ thể để subscriber biết rằng có thể nhận 3 value trên subscription này.
5. In ra value mỗi khi nhận được và return `.none` ý nói rằng subscriber k điều chỉnh `Demand` (`.none` bằng với `.max(0)`)
6. In ra completion event

Để publisher có thể publish thì nó cần một subscriber. Thêm đoạn code sau vào bên dưới ví dụ trên:
```Swift
let subscriber = IntSubscriber()
publisher.subscribe(subscriber)
```
Ở đây bạn tạo một subscriber tuân thủ theo Output và Failure type của publisher. Sau đó bạn nói với publisher rằng bạn subscribe nó.

Chạy dưới background bạn sẽ thấy:
```
Received value 1
Received value 2
Received value 3
```
Bạn không nhận được completion event. Bởi vì publisher có số lượng value hữu hạn. Cụ thể là `.max(3)`.

Trong custome subscriber `receive(_:)` thử đổi `.none` thành `.unlimited` giống thế này:
```
func receive(_ input: Int) -> Subscribers.Demand {
     print("Received value", input)
     return .unlimited
}
```
Chạy dưới background. Bạn sẽ thấy tất cả giá trị đã được nhận và có completion event:
```
Received value 1
Received value 2
Received value 3
Received value 4
Received value 5
Received value 6
Received completion finished
```
Thử đổi `.unlimited` thành `.max(1)` thì bạn cũng nhận được kết quả giống với `.unlimited` bởi vì mỗi lần bạn nhận được event bạn sẽ tăng giá trị `max` lên 1.

Đổi `.max(1)` thành `.none` như cũ và thay:
```
let publisher = (1...6).publisher
```
thành:
```
let publisher = ["A", "B", "C", "D", "E", "F"].publisher
```
Chạy dưới background bạn sẽ nhận được error rằng `subscribe` method yêu cầu `String` nhưng nhận được `IntSubscriber.Input`. Bạn gặp phải lỗi này vì `Output` và `Failure` type của publisher phải đúng với `Input` và `Failure` của một subscriber để có thể tạo ra một subscription.

Thay đổi lại như ban đầu để đoạn ví dụ có thể chạy được.
# Future
Giống như bạn có thể dùng `Just` để tạo publisher phát ra chỉ một value và sau đó là complete. Một `Future` có thể được sử dụng để tạo ra một asynchronously cung cấp chỉ một value và sau đó complete:
```
func futureIncrement(
     integer: Int,
     afterDelay delay: TimeInterval) -> Future<Int, Never> {
 }
```
Ở đây bạn tạo một hàm return kiểu `Int` và `Never` nghĩa là nó sẽ phát ra integer và không bao giờ có error.

Bạn cũng thêm một `Subscriptions` set trong đó bạn sẽ lưu trữ các subscription trong `Future`. Đối với các long-running asynchronous việc không lưu các subscription sẽ dẫn đến việc subscription sẽ bị huỷ bỏ ngay khi ra khỏi scope hiện tại. 

Tiếp theo hãy thêm đoạn code để định nghĩa một `Future`:
```
Future<Int, Never> { promise in
     DispatchQueue.global().asyncAfter(deadline: .now() + delay) {
         promise(.success(integer + 1))
     }
}
```
Đoạn code trên định nghĩa một `Future`. Điều này giúp bạn có thể sử dụng value bằng cách gọi hàm để tăng integer sau delay.

`Future` là một publisher rằng cuối cùng nó sẽ cung cấp 1 value và kết thúc, hoặc nó sẽ fail. Nó thực hiện điều này bằng cách gọi một closure khi có sẵn một giá trị hoặc lỗi và việc closure đó được gọi là một `Promise`. Command-click vào `Future` và `Jump to Definition` bạn sẽ thấy:
```
final public class Future<Output, Failure> : Publisher
     where Failure: Error {
         public typealias Promise = (Result<Output, Failure>) -> Void
         ...
    }
```
`Promise` là một type alias để cho một closure có thể nhận một `Result` bao gồm một value được publish bởi `Future` hoặc một error.

Tiếp theo hãy thêm đoạn code sau để định nghĩa `futureIncrement`:
```
// 1
let future = futureIncrement(integer: 1, afterDelay: 3)
// 2
future
     .sink(receiveCompletion: { print($0) },
         receiveValue: { print($0) })
     .store(in: &subscriptions)
```
1. Tạo một future bằng cách sữ dụng hàm bạn đã tạo ra từ trước, chỉ định tăng integer truyền vào sau mỗi 3 giây.
2. Subscribe và in value nhận được và completion event. Và lưu kết quả subscription vào một `subscriptions` set.

Chạy dưới background:
```
2
finished
```
Thêm một subscription thứ 2 vào `Future`:
```
future
 .sink(receiveCompletion: { print("Second", $0) },
     receiveValue: { print("Second", $0) })
 .store(in: &subscriptions)
```
Trước khi chạy dưới background hãy thêm câu lệnh sau ngay trước `DispatchQueue` block trong hàm `futureIncrement`:
```
print("Original")
```
Chạy dưới background. Sau một độ trễ được chỉ định, subscription thứ 2 cũng nhận một value tương tự. `Future` không thực hiện lại `Promise` thay vào đó nó share hoặc lặp lại output.
```
Original
2
finished
Second 2
Second finished
```
Ngoài ra, `Original` được in ngay trước khi subscription xảy ra. Điều này xảy ra bởi vì một `Future` thực thi ngay khi nó được tạo ra. Nó không yêu cầu một subscriber như các publisher thông thường.

Trong một vài ví dụ gần đây, bạn đã làm việc với các pbulisher có số lượng value hữu hạn để publish, và nó được publish liên tục và đồng bộ.

Ví dụ về Notification Center mà bạn đã bắt đầu là một ví dụ về Publisher có thể tiếp tục publish các value vô thời hạn và không đồng bộ, được cung cấp:
1. Người gửi thông báo cơ bản phát ra thông báo.
2. Subscribers thông báo được chỉ định

Hãy nhận xét toàn bộ ví dụ `Future`, `Future` sẽ được gọi mỗi khi bạn chạy - nếu không, đầu ra bị trì hoãn của nó sẽ được in sau (ví dụ cuối cùng).
# Subject
Bạn đã học được làm sao để làm việc với publisher và subscriber, và biết cách tạo một custom subscriber. Bây giờ bạn sẽ học cách tạo một custom publisher. Đầu tiên là `subject`.

`Subject` như một cầu nối trung gian cho phép các non-Combine gửi các giá trị đến Combine subscribers. Thêm ví dụ sau:
```Swift
// 1
 enum MyError: Error {
     case test
 }

 // 2
 final class StringSubscriber: Subscriber {
     typealias Input = String
     typealias Failure = MyError

     func receive(subscription: Subscription) {
         subscription.request(.max(2))
     }

     func receive(_ input: String) -> Subscribers.Demand {
         print("Received value", input)
         // 3
         return input == "World" ? .max(1) : .none
     }

     func receive(completion: Subscribers.Completion<MyError>) {
         print("Received completion", completion)
     }
 }
 // 4
 let subscriber = StringSubscriber()
```
1. Định nghĩa một custom error type
2. Định nghĩa một custom subscriber rằng nó sẽ nhận `String` và `MyError`.
3. Điều chỉnh demand trên value nhận được
4. Tạo một instance của custom subscriber.

Return `.max(1)` trong `receive(_:)` khi input là `World` thì kết quả của `max` sẽ là 3.

Thêm đoạn code sau:
```Swift
// 5
let subject = PassthroughSubject<String, MyError>()
// 6
subject.subscribe(subscriber)
// 7
let subscription = subject
     .sink(
         receiveCompletion: { completion in
             print("Received completion (sink)", completion)
         },
         receiveValue: { value in
             print("Received value (sink)", value)
         }
     )
```
5. Tạo một instance của `PassthroughSubject` gồm `String` và error mà bạn tự định nghĩa.
6. Subscriber subscribe vào subject.
7. Tạo một subscription khác bằng `sink`.

`Passthrough` subject cho phép bạn publish new value vào demand. Nó sẽ truyền value và completion event. Giống với bất kỳ publisher bạn phải định nghĩa type của value và error có thể phát ra trước. `Subscriber` phải phù hợp với type để có thể subscribe tới passthrough subject.

Bây giờ bạn có thể tạo một passthrough subject có thể gửi value. Hãy thử gửi 1 vài value:
```Swift
subject.send("Hello")
subject.send("World")
```
Chạy dưới background ta thấy:
```
Received value Hello
Received value (sink) Hello
Received value World
Received value (sink) World
```
Mỗi subscriber nhận được value giống với những gì nó publish.

Thêm đoạn code sau:
```Swift
// 8
subscription.cancel()
// 9
subject.send("Still there?")
```
8. Huỷ bỏ subscription thứ 2.
9. Gửi 1 value khác 

Chạy dưới background đúng như mong đợi, chỉ có một subscriber nhận được value. Vì trước đó bạn đã cancel subscription thứ 2.
```
Received value Hello
Received value (sink) Hello
Received value World
Received value (sink) World
Received value Still there?
```
Thêm tiếp đoạn code sau:
```Swift
subject.send(completion: .finished)
subject.send("How about another one?")
```
Chạy dưới background thì subscription thứ 2 không nhận được `"How about another one?"`. Bởi vì subject trước đã gửi một completion event. Subscriber thứ 2 đã nhận được nhưng subscriber thứ nhất thì chưa bởi vì nó k còn subscribe nữa:
```
Received value Hello
Received value (sink) Hello
Received value World
Received value (sink) World
Received value Still there?
Received completion finished
```
Thêm dòng sau ngay bên trước dòng gửi completion event.
```Swift
subject.send(completion: .failure(MyError.test))
```
Chạy background thấy:
```
Received value Hello
Received value (sink) Hello
Received value World
Received value (sink) World
Received value Still there?
Received completion failure(...MyError.test)
```
Error nhận được bởi subscriber đầu tiên nhưng completion event thì được gửi sau. Chứng minh rằng publisher chỉ gửi 1 completion event bình thường hoặc error.

Truyền value với `PassthroughSubject` là một cách để kết nối imperative code với Combine.