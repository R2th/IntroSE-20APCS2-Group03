## Introduction
Đây là bài viết đầu tiên trong chuỗi bài viết về kĩ thuật callbacks trong [Cocoa](https://en.wikipedia.org/wiki/Cocoa_(API)), so sánh và chuẩn hoá chúng. Nếu bạn quen thuộc với các khái niệm **delegation**, **NotificationCenter**, và **Key-Value Observing**, bạn có thể bỏ qua phần giới thiệu về chúng và đi thằng vào điểm mạnh, yếu của chúng.

**[Callbacks, Part 2: Closure, Target-Action, and Responder Chain](https://nalexn.github.io/callbacks-part-2-closure-target-action-responder-chain/)**
**[Callbacks, Part 3: Promise, Event, and Stream (Functional Reactive Programming)](https://nalexn.github.io/callbacks-part-3-promise-event-stream/)**

## Delegate
**Delegate** là loại phổ biến nhất về sự kết nối không chặt chẽ giữa các thực thể trong Cocoa, cách thức này có thể được sử dụng trong các ngôn ngữ và nền tảng khác bởi vì đây là design pattern cơ bản mang tên [delegation design pattern](https://en.wikipedia.org/wiki/Delegation_pattern).

Ý tưởng là rất đơn giản - thay vì tương tác với một đối tượng thông qua các API thực tế của nó chúng ta có thể thay thế bằng cách bỏ qua chi tiết về loại chính xác chúng ta đang giao tiếp với nó và sử dụng **protocol** với một thiết lập con của danh sách các phương thức cái chúng ta cần. Chúng ta định nghĩa **protocol** của chính mình và danh sách duy nhất các phương thức đó chugns ta sẽ gọi ở đối tượng đích của mình. Một đối tượng thực tế sẽ cần triển khai **protocol** này, và có thể là các phương thức khác - nhưng chúng ta không biết về nó - điều đó thật là tuyệt vời. Đó chính là cách chúng ta [giảm thiểu sự dàng buộc](https://en.wikipedia.org/wiki/Loose_coupling).

Hãy xem một ví dụ. Giả sử chúng ta có một tiệm Pizzeria, với một người làm pizza(Pizzaiolo), và một khách hàng người đặt hàng pizza. Người làm pizza(Pizzaiolo) không nên biết chi tiết chính xác khách hàng là ai, điều quan trọng nhất đối với họ là khả năng mua pizza của khách hàng. Dưới đây là cách thức làm thế nào chúng ta xử lý vấn đề này với **delegate** trong Swift:

```
// The protocol the Pizzaiolo is using for "calling back" to customer
protocol PizzaTaker {
  func take(pizza: Pizza)
}

class Pizzaiolo {
  // We store a reference to a PizzaTaker rather than to a Customer
  var pizzaTaker: PizzaTaker?

  // The method a customer can call to ask Pizzaiolo to make a pizza
  func makePizza() {
    ...
    // As soon as the pizza is ready the `onPizzaIsReady` function is called
  }

  private func onPizzaIsReady(pizza: Pizza) {
    // Pizzaiolo provides the pizza to a PizzaTaker
    pizzaTaker?.take(pizza: pizza)
  }
}

// Class Customer implements the protocol PizzaTaker - the only requirement
// which allows him to get a pizza from Pizzaiolo
class Customer: PizzaTaker {

  // Some details related to Customer class which Pizzaiolo should not know about
  var name: String
  var dateOfBirth: Date

  // Implementation of the PizzaTaker protocol
  func take(pizza: Pizza) {
    // yummy!
  }
}
```

### Advantages of using delegate
* Giảm thiểu sự ràng buộc. Dĩ nhiên, với delegate pattern, chúng ta phải tương tác với những đối tượng được tách ra khỏi những cái khác mà không cần biết chính xác chúng là gì. Chúng ta có thể dễ dàng triển khải protocol **PizzaTaker** trong các lớp khác ví dụ như **Dumpster** và nó hoàn toàn có thể đẩy tất cả pizza vào thùng rác thay vì bị ăn mà Pizzaiolo(Người làm pizza) không hề biết.
* IDE(Như là XCode) có khả năng kiểm tra tính đúng đắn của kết nối bằng các phân tích tĩnh. Đây là một lợi thế tuyệt vời vì các kết nối giữa các objects có thể bị phá vỡ khi bạn tái cấu trúc một số thứ, và IDE sẽ chỉ bạn vấn đề ngay trước khi bạn thử build lại project của mình.
* Có khả năng lấy một giá trị khác **void** từ lời gọi của **delegate**. Không giống như nhiều kĩ thuật callbacks khác, với delegate, bạn không chỉ dùng để thông báo mà còn có thể yêu cầu cả dữ liệu. Trong Cocoa, bạn có thể thường xuyên thấy các **DataSource** protocols, cái chính xác được dùng cho mục đích này.
* Tốc độ. Bởi vì lời gọi một phương thức của một delegate không khác gì một lời gọi trực tiếp của một tính năng, với **delegate** bạn có thể đạt được hiệu năng tốt nhất một cách tuyệt đối so với các kĩ thuật callbacks khác, cái phải mất thời gian phân phối các lời gọi một cách phức tạp hơn.

### Disadvantages of using delegate
* Đối tượng nhận duy nhất. Ngay cả với ví dụ Pizzeria bên trên, **pizzaiolo** đơn giản không thể phục vụ nhiều pizzas cùng một lúc cho nhiều hơn một **customer**, và hơn nữa **customer** khác đến trong khi pizza của **customer** trước đó đang được làm, mọi thứ sẽ trở nên rối: **customer** mới sẽ **override** ghi đè **pizzaTaker** tham chiếu tới **pizzaiolo** thành chính nó vf **customer** trước đó sẽ không bao giờ nhận được pizza của mình! Một dịch vụ thật đáng sợ...
* Quá trình phân tách có liên quan mật thiết tới business logic(giảm thiểu ràng buộc). Bởi vì tất cả các phương thức trả về phải được triển khai thành các functions riêng biệt bên trong đối tượng nhận do đó chúng ta không thể sử dụng các phương thức bất đồng bộ và nhận tường tác cũng như phản hồi cho các tương tác lồng nhau bên trong mỗi cái. Do đó, thỉnh thoảng sẽ rất khó để tìm được nguyên nhân về điều kiện mà một callback được gọi.
* Kiến trúc cồng kềnh. Để sử dụng **delegate** chúng ta cần thực hiện rõ ràng một số bước:
    * Định nghĩa protocol mới.
    * Định nghĩa weak properties cho delegate đó.
    * Triển khai protocol trong đối tượng mục tiêu.
    * Gán tham chiếu tới delegate.
    * [Obj-C] kiểm tra nếu delegate có thể xử lý thông điệp với **respondsToSelecctor:**
* Thúc đẩy sự xuất hiện của **[Massive View Controller](https://www.smashingmagazine.com/2016/05/better-architecture-for-ios-apps-model-view-controller-pattern/)**. Vì sự phổ biến của mô hình này trong Cocoa các lớp của bạn có thể nhanh chóng trở thành các delegates nêu bạn không phân tách nó ra.

## Notification Center
**NotificationCenter** hay **NSNotificationCenter** đối với Objective-C alf một lớp trong Cocoa cái chung cấp các tính năng **[publish - subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)**, và như bạn có thể đoán dựa vào tên của nó, nó dành cho các **Notifications**. Các Notifications gửi các thông diệp thông qua các đối tượng của lớp **Notification**, cái có thể mang theo một payload tuỳ chọn, nhưng thường chỉ được sử dụng cho mục đích thông báo. Bản thân **NotificationCenter** là một data bus, nó không gửi các thông điệp của riêng nó, chỉ khi ai đó yêu cần nó gửi tới một cái nào khác. Mục đich chính của mô hình này là để **sender** và **recipients**(Có thể có nhiều) không giao tiếp trực tiếp với nhau, giống như là mô hình **delegate**. Thay vào đó, chúng giao tiếp với nhau thông qua **NotificationCenter** - **sender** gọi phương thức **postNotification** của **NotificationCenter** nhằm gửi đi thông điệp, trong khi các đối tượng nhận tham gia vào quá trình này để nhận các thông báo bằng các gọi **addObserver** của **NotificationCenter**. Chúng có thể từ chối tham gia sau đó với **removeObserver**. Chú ý quan trọng đó là **NotificationCenter** không lưu các thông báo cho các đối tượng theo dõi trong tương lai - Chỉ các đối tượng theo dõi hiện tại nhận được các thông báo.

**NotificationCenter** cũng cung cấp một điểm truy cập toàn cục **defaultCenter**, tuy nhiên, lớp này khôgn được triển khai như là một đối tượng Singleton hoàn toàn - Bạn có thể tạo các thể hiện của NotificationCenter cho riêng mình.

Quá trình triển khai tương tự cho trường hợp Pizzeria:

```
// First step is to declare new notification type - to be identified by sender and recipients
extension NSNotification.Name {
  static let PizzaReadiness = NSNotification.Name(rawValue: "pizza_is_ready")
}

class Pizzaiolo {

  func makePizza() {
    ...
  }
  
  private func onPizzaIsReady(pizza: Pizza) {
    // Pizzaiolo notifies all interested parties that the pizza is ready:
    NotificationCenter.default.post(name: NSNotification.Name.PizzaReadiness, object: self, userInfo: ["pizza_object" : pizza])
  }
}

class Customer {
  
  // If a customer wants to get a pizza he needs to register as an observer at NotificationCenter
  func startListeningWhenPizzaIsReady() {
    // A customer subscribes for all notifications of type NSNotification.Name.PizzaReadiness
    NotificationCenter.default.addObserver(self, selector: #selector(pizzaIsReady(notification:)), name: NSNotification.Name.PizzaReadiness, object: nil)
  }
  
  // The customer should opt-out of notifications when he's not interested in them anymore
  func stopListeningWhenPizzaIsReady() {
    NotificationCenter.default.removeObserver(self, name: NSNotification.Name.PizzaReadiness, object: nil)
  }
  
  dynamic func pizzaIsReady(notification: Notification) {
    if let pizza = notification.userInfo?["pizza_object"] as? Pizza {
      // Got the pizza!
    }
  }
}
```

### Advantages of using NotificationCenter
* Nhiều đối tượng nhận. **NotificationCenter** cung cấp một cách minh bạch một **Notification** cho tất cả các đối tượng theo dõi(Subscribers), có thể có một, một ngàn, hoặc không có bất cứ đối tượng nào - Lớp này sẽ chăm sóc việc giao thông điệp cho bạn. Điều này cũng không đáng chú ý - **sender** có thể không biết có bao nhiêu subscribers mà nó có. Không thể nói như thế là tốt hay không, nó chỉ là cách mà công cụ này được thiết kế.
* Giảm thiểu sự ràng buộc. Khi sử dụng **NotificationCenter** điều duy nhất mà cặp **sender** và **receivers** kết hợp với nhau là tên của notification chúng sử dụng cho các cuộc hội thoại của mình. Nếu bạn gửi đi cùng một payload trong notification của mình, các bên sẽ cần có một cơ chế đóng gói/giải mã dữ liệu.
* Có khả năng truy cập toàn cục. Khi bạn không cần(hoặc không quan tâm) tới **dependency injection** cho mã nguồn của mình, phương thức kiểu singleton là **defaultCenter** cho phép bạn kết nối hai đối tượng bất kì với nhau một cách dễ dàng.

### Disadvantages of using NotificationCenter
* Khả năng truy cập toàn cục. Đúng. Đây cũng là bất lợi. Bất cứ thứ gì có thể truy cập toàn cùng sẽ phá vỡ khả năng kiểm thử mã nguồn của bạn cũng như **singleton** là một mô hình thiết kế được nhiều người chỉ ra là một mô hình chống lại điều này.
* Không thể thực hiện gỡ rối(debug) từng bước. Cách thức duy nhất bạn có thể debug cho **NotificationCenter** là bằng các đặt các breakpoints.
* Luồng kiểm soát không rõ ràng. Nếu bạn đang cố gắng hiểu về business logic của ứng dụng và xem xét vị trí mà một **Notification** được gửi đi - Cách duy nhất để tiếp tục quá trình khám phá của mình là tìm tất cả các đối tượng nhận bằng tay với một ***text search*** trong toàn bộ project - bởi vì chúng có thể nằm ở bất cứ nơi đâu.
* Quá trình truyền dữ liệu dễ gặp lỗi bởi vì quá trình đóng gói/bóc tách dữ liệu với một **Dictionary/NSDictionary**. Ngay cả khi sử dụng type-safe của Swift, trình biên dịch không thể kiểm tra loại cũng như cấu trúc của **Dictionary**.
* Các đối tượng nhận cần bỏ theo dõi(unsubscribe) khi chúng được thu hồi hoặc ứng dụng có thể bị crash. Đòi hỏi này được loại bỏ chỉ với iOS 8, nhưng nó sẽ là cơn ác mộng đối với các nhà phát triển trong nhiều năm.
* **sender** không thể nhận một kết quả trả về khác void, ngược lại với **delegate** và **closure**.
* Các thư viện bên thứ ba có thể tin tưởng vào các notifications giống nhau như là sự tương tác lẫn nhau cũng như mã nguồn của bạn. Ví dụ tuyệt vời là **NSManagedObjectContextDidSaveNotification** của **CoreData** framework - mỗi bên sẽ xử lý chính xác thông điều này hoặc ứng dụng có thể bị crash.
* Không có sự kiểm soát đối với những đối tượng đủ điều kiện nhận thông báo một cách cụ thể. Một Junior Developer trong nhóm của bạn có thể đến và gửi một system notification kiểu như **UIApplicationWillEnterForegroundNotification** nhằm vá một lỗi kì quái trong mã nguồn của cậu ta, và toàn bộ hệ thống có thể bị hỏng. Hài hước phải không?
* Khi bị lạm dụng, **NotificationCenter** có thể biến project của bạn thành một địa ngục bởi vì các vấn đề trên.

## Key Value Observing(KVO)
Có một [bài viết riêng](https://nalexn.github.io/kvo-guide-for-key-value-observing/) về KVO trong Swift 5 và Objectvie-C.
**KVO** là một mô hình lắng nghe truyền thông được xây dựng sẵn trong bất cứ **NSObject**. Với các **KVO** observers có thể được thông báo về bất cứ thay đổi của các giá trị **property**. Nó chính là lợi thế của Objective-C runtime đối với quá trình gửi đi các notifications một các tự động, và để có được điều đó cho các lớp Swift, bạn cần chọn tham gia **Objective-C dynamism** bằng cách kế thừa **NSObject** và đánh dấu **var** bạn sẽ lắng nghe với **dynamic** modifier. Các đối tượng lắng nghe cũng nên là con của
**NSObject** bởi vì nó được thực thi bởi các KVO API.

Mã nguồn mẫu cho **Key-Value Observing** là một giá trị đặc trưng của lớp **ObservedClass**:

```
class ObservedClass : NSObject {
  @objc dynamic var value: CGFloat = 0
}

class Observer {
  var kvoToken: NSKeyValueObservation?
    
  func observe(object: ObservedClass) {
    kvoToken = object.observe(\.value, options: .new) { (object, change) in
      guard let value = change.new else { return }
        print("New value is: \(value)")
      }
    }
    
  deinit {
    kvoToken?.invalidate()
  }
}
```

### Advantages of using KVO
* Mô hình lắng nghe được triển khai trong một vài dòng code. Thông thường bạn sẽ cần triển khai nó cho chính bản thân mình, nhưng trong **Cocoa** bạn có tính năng tiêu chuẩn này trong mọi **NSObject**.
* Nhiều đối tượng lắng nghe - Không giới hạn về số lượng đối tượng đăng kí theo dõi.
* Không cần thay đổi mã nguồn của lớp cho quá trình lắng nghe.
* Như đã đề cập ở trước bạn có thể lắng nghe các đối tượng của bất cứ lớp nào(bao gồm những cái trong hệ thống frameworks, trừ những mà nguồn mà chúng ta không thể truy cập để sửa đổi).
* Ràng buộc rất thấp - Các bên lắng nghe không biết về cái nó đang lắng nghe, những thứ mà bên lắng nghe biết được ràng buộc bởi tên của thuộc tính có **@property**.
* Thông điệp có thể được cấu hình để truyền nhận không chỉ giá trị gần nhất của đối tượng được theo dõi **@property** mà cả các giá trị trước đó.

### Disadvantages of using KVO
* Một trong những điều tệ nhất của Cocoa. Điểm này có thể bị phá vỡ thành nhiều mảnh - điều đó thật tồi tệ([KVO Considered Harmful](https://khanlou.com/2013/12/kvo-considered-harmful/)). Điều tốt cho chúng ta là có những cách triển khai thay thế tốt hơn([PMKVObserver](https://github.com/postmates/PMKVObserver), [KVOController ](https://github.com/facebookarchive/KVOController)) cho **KVO**.
* **keyPath** đã sử dụng cho quá trình theo dõi một string, và nó không thể được xác minh. May mắn là có một giải pháp trong Swift(**#keyPath** trực tiếp), nhưng trong Objective-C, nếu các bên lắng nghe thay đổi tên của **@property** - Không có bất cứ cảnh báo nào của trình biên dịch về điều đó, do đó ứng dụng sẽ bị crash trong quá trình thực thi.
* Mỗi đối tượng lắng nghe phải bỏ theo dõi(unsubscribe) một các rõ ràng trong **deinit** - Nếu không crash là không thể tránh khỏi.
* Chúng ta phải gọi **super** trong quá trình triển khai phương thức **observeValueForKeyPath** của callback nhằm đảm bảo chúng ta không phá vỡ quá trình triển khai này trong lớp cha.
* Hiệu năng tương đối chậm. Ngay cả khi được tối ưu quá trình biên dịch về khoảng **0 giây**, đối với **Objective-C** một thông điệp **KVO** chậm hơn 30 lần so với việc gọi phương thức trực tiếp, đối với **Swift** nó là 200 lần. Điểm chuẩn so sánh hiệu năng bạn có thể tìm thấy trong [project này](https://github.com/nalexn/PerformanceTestTools).

## Source
### https://nalexn.github.io/callbacks-part-1-delegation-notificationcenter-kvo/
## Reference
#### [1. Guide to KVO in Swift 5 with code examples](https://nalexn.github.io/kvo-guide-for-key-value-observing/)
#### [2. KVO Considered Harmful](https://khanlou.com/2013/12/kvo-considered-harmful/)
#### [3. Callbacks trong ứng dụng iOS, Phần 2: Closure, Target-Action, and Responder chain](https://viblo.asia/p/callbacks-trong-ung-dung-ios-phan-2-closure-target-action-and-responder-chain-3P0lPJanKox#_reference-11)
## VIII. P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))