Singleton pattern được sử dụng rất rộng rãi bởi các nhà phát triển ứng dụng trên toàn thế giới bởi sự thuận tiện của nó. Tuy nhiên trái ngược với sự nổi tiếng của nó, singleton bị đánh giá là một pattern nên hạn chế sử dụng. Để biết rõ hơn, chúng ta hãy cùng tìm hiểu về Singleton và làm cách nào để ứng dụng vào code Swift.

## Singleton là gì?

Khái niệm Singleton rất dễ hiểu:

>  Singleton Pattern là pattern đảm bảo rằng một lớp chỉ có một thể hiện (instance) duy nhất và trong đó cung cấp một cổng giao tiếp chung nhất để truy cập vào lớp đó.

Nếu bạn đã quen thuộc với nền tảng của Apple có thể bạn đã từng sử dụng singleton pattern:  
```
// Shared URL Session
let sharedURLSession = URLSession.shared

// Default File Manager
let defaultFileManager = FileManager.default

// Standard User Defaults
let standardUserDefaults = UserDefaults.standard

// Default Payment Queue
let defaultPaymentQueue = SKPaymentQueue.default()
```

Singleton pattern là một pattern vô cùng hữu dụng. Đôi khi bạn muốn chắc chắc chắn rằng chỉ có một instance của một đối tượng được khởi tạo và ứng dụng của bạn chỉ sự dụng instance đó .Đó là mục tiêu chính và duy nhất của singleton pattern.

## Có thể truy cập từ mọi nơi

Việc Singleton có thể được truy cập từ mọi nơi là lí do cho sự phổ biến rộng rãi của nó, tuy nhiên điều đó cũn dẫn đến nhiều hệ lụy không thể tránh khỏi. Rất nhiều các nhà phát triển phần mềm lạm dụng sự tiện lợi của singleton để có thể truy cập đến các object từ bất cứu đâu trong dự án của họ. Điều này nghe có vẻ rất thuận tiện cho họ, tuy nhiên sự thuận tiện này cũng đi kèm cái giá của nó. Việc có thể truy cập từ mọi nơi là con dao hai lưỡi: thuận tiện nhưng lại khó kiểm soát và quản lí. Đó là lí do vì sao các nhà phát triển ứng dụng có kinh nghiệm thường hạn chế sử dụng singleton pattern.

## Ứng dụng Singleton pattern

### Biến toàn cục (Global Variables) 

Phương pháp đơn giản nhất để ứng dụng singleton pattern là tạo ra biến toàn cục:

```
let sharedNetworkManager = NetworkManager(baseURL: API.baseURL)

class NetworkManager {

    // MARK: - Properties

    let baseURL: URL

    // Initialization

    init(baseURL: URL) {
        self.baseURL = baseURL
    }

}
```

Bằng cách khai báo biến toàn cục ,bất kì object nào cũng có thể truy cập đến biến toàn cục đó.
Ở trong Swift, biến toàn cục được khai báo một cách trì hoãn cho đến khi nó được gọi ra để sử dụng lần đầu tiên. Một điểm cộng nữa là ở swift việc khởi tạo được dựa trên hàm dispatch_once, điều này sẽ có ích khi bạn chỉ muốn khởi tạo object của mình một lần duy nhất.

Ngoài ra cũng có một số bất cập khi sử dụng biến toàn cục đó là rất khó hiểu và khó debug. Một điểm trừ nữa là khi khởi tạo class NetworkManager thì không thể khai báo là private.

### Biến Static và Private Initializer
Một vài năm trước đây Swift đã cho ra đời biến Static và access control cho ngôn ngữ. Điều này mở ra một cách mới mạch lạc rõ ràng hơn để ứng dụng singleton pattern trong swift:
```
class NetworkManager {

    // MARK: - Properties

    static let shared = NetworkManager(baseURL: API.baseURL)

    // MARK: -

    let baseURL: URL

    // Initialization

    private init(baseURL: URL) {
        self.baseURL = baseURL
    }

}
```

Việc truy cập đến Singleton sẽ rõ ràng và dễ hiểu hơn:
```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    print(NetworkManager.shared)
    return true
}
```
Một số thứ đã thay dổi từ đây, ví dụ như việc khai báo private thì class NetworkManager có thể khởi tạo instance cho riêng nó, hoặc như khi ta khai báo biến static shared thì biến này cho phép các object khác truy cập vào singleton object của class NetworkManager.

## Có nên sử dụng singleton

Việc sử dụng singleton bừa bãi có thể dẫn điến một vài hậu quả khôn lường. Singleton nên được sử dụng một cách cẩn thận. Mỗi khi nào bạn cần sử dụng đến singleton, hãy ngừng lại và suy nghĩ xem liệu có thể sử dụng một phương pháp khác hay không. Rất nhiều người lạm dụng singleton kể cả khi không cần thiết vì sự tiện lợi của nó, họ coi các biện toàn cục của họ là singleton. 

## Dependency Injection 

Trong trường hợp bạn muốn sử dụng singleton trong dự án của mình không có nghĩ là bạn phải truy cập nó từ mọi nơi, bạn có thẻ sử dụng Dependency Injection để truyền biến singleton từ object này sang object khác khi cần đến. Bằng cách sử dụng Dependency injection để truyền biến singleton ,toàn thể class của bạn có thể trông rõ ràng và mạch lạc hơn. Việc này rất có lợi khi bạn muốn sắp xếp lại hoặc debug trong class. 

Bài viết được lấy nguồn từ: https://cocoacasts.com/what-is-a-singleton-and-how-to-create-one-in-swift