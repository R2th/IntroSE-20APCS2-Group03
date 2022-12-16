Việc thu thập và phân tích thông tin sử dụng hệ thống của người dùng là vô cùng quan trọng trong việc tiếp tục xây dựng, lặp lại và cải thiện sản phẩm. Tiếp thu việc người dùng sử dụng ứng dụng của bạn ở ngoài đời thực như thế nào có thể đôi khi khiến bạn ngạc nhiên và đưa việc phát triển đi hẳn sang một hướng khác hoặc thêm những chức năng mới.

Thực tế có nhiều cách để đưa việc phân tích trở nên quá khó khăn và cồng kềnh, nhưng trái ngược với nó cũng có những cách để làm việc phân tích một cách nhẹ nhàng, dễ dàng để tạo một hệ thống vừa cung cấp cho bạn biết được sản phẩm của bạn được sử dụng như thế mà cũng vừa đảm bảo việc bảo mật thông tin, dữ liệu và trải nghiệm của người dùng.

Tuy nhiên, việc tạo ra một một hệ thống phân tích chặt chẽ mà dễ sử dụng trong code khá là khó. 

## Yêu cầu
Trước khi phát triển bất cứ hệ thống nào thì việc đầu tiên chúng ta cần viết ra một danh sách các yêu cầu mà chúng ta cần làm và những thứ chúng ta sẽ sử dụng để làm.

Đối với hệ thống phân tích của chúng ta thì có 4 yêu cầu sau đây:

1.  Nó cần phải dễ dàng để ghi lại những sự kiện ở trong bất cứ view controller nào. Bạn chỉ cần duy nhất một dòng code cho việc ghi chú này.
2.  Hệ thống cần phải hỗ trộ những hệ thống con bên trong để phục vụ cho việc gửi sự kiện như là một dạng backend.
3.  Hệ thống cần phải dễ kiểm thử và xác nhận.
4.  Nó cần phải dễ dàng thêm, xoá hoặc thay đổi sự kiện và xảy lỗi compile mỗi khi có bản update mới.

## Các thành phần cơ bản
Còn một thứ trước khi mở Xcode và bắt đầu code, đó là những thành phần cơ bản cho việc phát triển phần phân tích trong ứng dụng.

***SINGLETONS***

Cách đơn giản và thông thường nhất để phát triển một hệ thống phân tích đó là sử dụng `singleton`. Nó rất là tiện nhưng cũng có thể làm cho ứng dụng trở nên khó test và maintain.

Việc ghi các sự kiện phân tích trong đa số trường hợp được cho là thuộc controller (hoặc ở tầng nào đó thể hiện phần logic nếu bạn không sử dụng MVC), và khi sử dụng `singleton`, nó rất dễ xảy ra việc leak memory ở trong tầng model hoặc view.

***STRINGS***

Việc sử dụng `string` luôn là cần thiết cho bất cứ hệ thống nào và đặc biệt là hệ thống phân tích vì nó là phần thông tin chính mà chúng ta cần thu thập. Bận cần phải làm cho nó thật sự là dễ thay đổi và tìm kiếm bất cứ `string` nào. Tuy nhiên, nó lại là một nguồn gốc chính của bug đối với việc code phân tích. Bởi vì nhiều khi chúng ta chỉ thay đổi một chỗ mà quên mất những chỗ còn lại. Nó thường làm cho những hệ thống như thế nào khó bảo dưỡng qua thời gian và dẫn đến rất nhiều sự kiện bị sai và làm phần dữ liệu trở nên thiếu chính xác.

***THIRD PARTY SDKS***

Cuối cùng đó là việc dùng những dịch vụ hoặc các SDK có sẵn để sử dụng cho việc phân tích. Nó có thể là một giải pháp để cho việc phát triển hệ thống phân tích nhanh hơn và dễ hơn. Nhưng bạn cần phải cẩn trọng trong việc chọn sử dụng SDK như thế nào cho đúng và phù hợp và hãy nghiên cứu trước nó sẽ thu thập những dữ liệu như thế nào để trách việc để lộ thông tin mật của người dùng.

Khi sử dụng SDK, chúng ta nên đặt một tầng ngăn cách giữa code của SDK và code của ta. Làm việc này sẽ giúp việc test trở nên dễ hơn và làm cho nó dễ dàng tương thích với nhiều giải pháp trong tương lai.

## Thiết kế

Đầu tiên chúng ta sẽ tạo ra một class để quản lý việc phân tích này, tên nó là `AnalyticsManager`. Class này sẽ tầng API cao nhất để ghi sự kiện và instance của class này sẽ đưa vào trong bất kỳ view controller nào muốn sử dụng. 

Nhưng class `AnalyticsManager` sẽ không làm bất cứ việc ghi chép nào. Thay vào đó nó sẽ dùng `AnalyticsEngine`, một protocol mà chúng ta sẽ sử dụng để phát triển cho nhiều mục đích, ví dụ như là để test, staging hoặc production. Nó cũng dễ dàng cho việc chuyển đổi giữa các SDK mà chúng ta sẽ sử dụng trong tương lai,

Cuối cùng chúng ta có một enum là `AnalyticsEvent`, sẽ chứa tất cả các sự kiện phân tích mà chúng ta hỗ trợ. Chúng ta sẽ dùng enum này thay cho string truyền thống để tránh việc các sự kiện bị sai lệch và làm cho việc refactor sau này dễ hơn.

## Coding

Bắt đầu từ phần gốc trước, đó là `AnalyticsEvent`. Chúng ta sẽ dùng một enum mà không có raw value, tạo một số sự kiện mà chúng ta muốn hỗ trợ. 

```swift
enum AnalyticsEvent {
    case loginScreenViewed
    case loginAttempted
    case loginFailed(reason: LoginFailureReason)
    case loginSucceeded
    case messageListViewed
    case messageSelected(index: Int)
    case messageDeleted(index: Int, read: Bool)
}
```

Có 2 chú ý trong đoạn code trên:

* Cho những sự kiện trên, chúng ta sẽ thêm metadata cho chúng, ví dụ như là `LoginFailureReason` cho sự kiện `loginFailed`. Điều này sẽ giúp cho chúng ta dễ dàng phân tích hơn.
* Khi thêm metadata vào, chúng ta sẽ dùng những thông tin vô danh, ví dụ như là index của message hoặc biến `Bool` nào đó để xem việc có đọc hay không. Tất nhiên chúng ta sẽ không thêm thông tin nhạy cảm vào phần này.

## Engine

Kế tiếp, đó là `AnalyticsEngine` protocol.

```swift
protocol AnalyticsEngine: class {
    func sendAnalyticsEvent(named name: String, metadata: [String : String])
}
```

Nhìn thấy thì khá dễ đúng không, nhưng bạn sẽ ngạc nhiên khi xem đoạn code ở trên. Nhưng tại sao lại dùng string mà lại không phải là enum mà chúng ta đã tạo ở trên ?

Chúng ta muốn những tầng trên sẽ gọi đến `AnalyticsEvent` theo cách type safe, chúng ta không muốn những tầng bên dưới biết được loại dữ liệu mà ta sẽ dùng. Nó sẽ giúp chúng ta dễ dàng tuỳ chỉnh hơn trong tương lai.

## Cài đặt Engine

Với cách cài đặt này, nó dễ dàng tạo ra nhiều loại engine khác nhau dựa vào `AnalyticsEngine` protocol. Ví dụ ở đây chúng ta sẽ sử dụng [CloudKit](https://developer.apple.com/documentation/cloudkit).
```swift
class CloudKitAnalyticsEngine: AnalyticsEngine {
    private let database: CKDatabase

    init(database: CKDatabase = CKContainer.default().publicCloudDatabase) {
        self.database = database
    }

    func sendAnalyticsEvent(named name: String, metadata: [String : String]) {
        let record = CKRecord(recordType: "AnalyticsEvent.\(name)")

        for (key, value) in metadata {
            record[key] = value as NSString
        }

        database.save(record) { _, _ in
            // We treat this as a fire-and-forget type operation
        }
    }
}
```
Hoặc chúng ta có thể dùng nhiều giải pháp tối tân hơn cho việc gửi dữ liệu đến phần backend của chúng ta, hoặc sử dụng những SDK khác ví dụ như là [Mixpanel](https://mixpanel.com/) hoặc [Logmatic](https://www.datadoghq.com/).

## Serialization

Trước khi đi đến phần tiếp theo, chúng ta hãy để ý xem làm thế nào để serialize một giá trị của `AnalyticsEvent` để chuẩn bị cho `AnalyticsEngine`.

Có 2 phần đó là `name` và `metadata` của event. Phần tên thì cực kỳ dễ về chúng ta sẽ sử dụng thư viện có sẵn đó là `String(describing:)`
```swift
extension AnalyticsEvent {
    var name: String {
        switch self {
        case .loginScreenViewed, .loginAttempted,
             .loginSucceeded, .messageListViewed:
            return String(describing: self)
        case .loginFailed:
            return "loginFailed"
        case .messageSelected:
            return "messageSelected"
        case .messageDeleted:
            return "messageDeleted"
        }
    }
}
```

Đối với `metadata`, chúng ta phải tự đưa một enum vào trong dictionary, hoặc tự động encoder. 
```swift
extension AnalyticsEvent {
    var metadata: [String : String] {
        switch self {
        case .loginScreenViewed, .loginAttempted,
             .loginSucceeded, .messageListViewed:
            return [:]
        case .loginFailed(let reason):
            return ["reason" : String(describing: reason)]
        case .messageSelected(let index):
            return ["index" : "\(index)"]
        case .messageDeleted(let index, let read):
            return ["index" : "\(index)", "read": "\(read)"]
        }
    }
}
```
## API

Chúng ta đã đến bước đưa các yếu tố kết hợp với nhau và ở đây là tạo ra `AnalyticsManager`. Cục quản lý này sẽ chứa đối tượng là `AnalyticsEngine`trong hàm khởi tạo và cho ta một API để ghi sự kiện.
```swift
class AnalyticsManager {
    private let engine: AnalyticsEngine

    init(engine: AnalyticsEngine) {
        self.engine = engine
    }

    func log(_ event: AnalyticsEvent) {
        engine.sendAnalyticsEvent(named: event.name, metadata: event.metadata)
    }
}
```
## Cách sử dụng

Hãy ứng dụng hệ thống phân tích của chúng ta vào trong `MessageListViewController`
```swift
class MessageListViewController: UIViewController {
    private let messages: MessageCollection
    private let analytics: AnalyticsManager

    init(messages: MessageCollection, analytics: AnalyticsManager) {
        self.messages = messages
        self.analytics = analytics
        super.init(nibName: nil, bundle: nil)
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        analytics.log(.messageListViewed)
    }

    private func deleteMessage(at index: Int) {
        let message = messages.delete(at: index)
        analytics.log(.messageDeleted(index: index, read: message.read))
    }
}
```
Như bạn đã thấy ở trên, chúng ta sẽ tạo ra một object `AnalyticsManager` vào trong view controller.

## Tổng kết
Vậy qua quá trình phát triển trên thì chúng ta đã làm được những gì đối với yêu cầu

* Chúng ta có thể dễ dàng đưa nó vào trong bất kỳ view controller nào. Bằng cách tạo ra `AnalyticsManager` và dùng đúng một dòng code để ghi sự kiện.
* Sử dụng nhiều kiểu thiết kế đối với `AnalyticsEngine` cho nhiều SDK.
* Vì `AnalyticsEngine` là protocol nên nó quá dễ để đưa vào test.
* Vì `AnalyticsEvent` là type safe enum, nó sẽ thêm vào một lớp bảo mật cho chúng ta và chúng ta có thể tối ưu hoá compiler để đảm bảo rằng việc cài đặt là chính xác.

Cảm ơn các bạn đã đọc bài viết này, chúc các bạn thành công.

REF: https://www.swiftbysundell.com/posts/building-an-enum-based-analytics-system-in-swift