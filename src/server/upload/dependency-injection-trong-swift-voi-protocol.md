- Có rất nhiều thư viện của bên thứ ba cung cấp Dependency Injection cho các ứng dụng Swift. 

- Swift có một hệ thống kiểu mạnh mẽ cho phép chúng ta tạo ra các kỹ thuật type-safe Dependency Injection một cách dễ dàng. Hôm nay mình sẽ nói về việc tạo Dependency Injection trong Swift với sức mạnh của protocol .

## 1. Protocol Composition

- Như mình đã nói, Protocol một tính năng mà mình yêu thích nhất trong Swift, đặc biệt là Protocol Composition, nó cho chúng ta cơ hội để kết hợp nhiều Giao thức với nhau trong một kiểu. 
- Hãy cùng mình xem xét việc thực thi pattern Service Locator trong Swift và cách chúng ta có thể cải thiện nó bằng cách sử dụng Protocol Composition.

```
protocol HasUserDefaults {
    var userDefaults: UserDefaults { get }
}

protocol HasUrlSession {
    var session: URLSession { get }
}

protocol HasHealthStore {
    var store: HKHealthStore { get }
}

struct Dependencies: HasUserDefaults, HasUrlSession, HasHealthStore {
    let userDefaults: UserDefaults
    let session: URLSession
    let store: HKHealthStore

    init(
        userDefaults: UserDefaults = .standard,
        session: URLSession = .shared,
        store: HKHealthStore = .init()
    ) {
        self.userDefaults = userDefaults
        self.session = session
        self.store = store
    }
}
```
- Ở đây chúng ta có một loạt các giao thức mô tả các phụ thuộc. Cấu trúc phụ thuộc chứa tất cả các phụ thuộc của chúng ta trong ứng dụng. Nói chung, chúng ta có thể tạo và lưu trữ cá thể cấu trúc phụ thuộc của chúng ta trong AppDelegate or root [Coordinator/FlowController](https://mecid.github.io/2019/02/20/navigation-with-flow-controllers/). Bây giờ, hãy nhìn về việc sử dụng container dependency của chúng ta.
```
class ViewController: UIViewController {
    typealias Dependencies = HasUserDefaults & HasUrlSession

    private let userDefaults: UserDefaults
    private let session: URLSession

    init(dependencies: Dependencies) {
        userDefaults = dependencies.userDefaults
        session = dependencies.session
        super.init(nibName: nil, bundle: nil)
    }
}
```
- Ở đây chúng ta có ViewController mô tả các phụ thuộc của nó thông qua Typealias và Protocol Composition .  Trong phương thức init, chúng ta dễ dàng trích xuất các phụ thuộc của mình vào các biến . Tất cả những gì chúng ta cần là phiên bản chuyển của Dependencies struct to ViewController và ViewController sẽ chỉ có thể truy cập được xác định trong các phụ thuộc typealias. 

- Lần tới khi ViewController của bạn sẽ cần một phụ thuộc khác, tất cả những gì bạn cần làm là thêm nó vào typealias và trích xuất nó vào biến. Bạn không cần phải thay đổi việc tạo ViewController, vì bạn đã thông qua tất cả các phụ thuộc.
```
extension Dependencies {
    static var mocked: Dependencies {
        return Dependencies(
            userDefaults: UserDefaults(suiteName: #file),
            session: MockedUrlSession(),
            store: MockedHealthStore()
        )
    }
}
```
Ví dụ trên cho thấy cách chúng ta có thể tạo phiên bản phụ thuộc giả định để sử dụng nó cho Unit-Testing 

## 2. Abstract Factory

- Một tùy chọn khác cho Dependency Injection là pattern Abstract Factory. 
- Tôi thích sử dụng nó để trích xuất việc tạo các đối tượng phức tạp như ViewControllers và các phụ thuộc của nó. Chúng ta hãy xem phiên bản Swift của Abstract Factory bằng cách sử dụng Protocols và Extensions .

```
protocol DependencyFactory {
    func makeHealthService() -> HealthService
    func makeSettingsSevice() -> SettingsService
}

struct Dependencies {
    private let healthStore: HKHealthStore
    private let userDefaults: UserDefaults

    init(
        healthStore: HKHealthStore = .init(),
        userDefaults: UserDefaults = .standard
    ) {
        self.healthStore = healthStore
        self.userDefaults = userDefaults
    }
}

extension Dependencies: DependencyFactory {
    func makeHealthService() -> HealthService {
        return HealthService(store: healthStore)
    }

    func makeSettingsSevice() -> SettingsService {
        return Settings(defaults: userDefaults)
    }
}
```

Ở đây chúng ta có protocol DependencyFactory mô tả các phương thức factory cho mọi phụ thuộc trong ứng dụng của chúng ta. Chúng ta cũng có struct Dependencies nhỏ lưu trữ các dependencies cấp thấp. Bằng cách sử dụng extension, chúng ta thêm DependencyFactory protocol phù hợp vào struct Dependencies. Bây giờ, hãy nhìn về ViewControllerFactory, mô tả quá trình tạo ViewController.
```
protocol ViewControllerFactory {
    func makeCalendarViewController() -> CalendarViewController
    func makeDayViewController() -> DayViewController
    func makeSettingsViewController() -> SettingsViewController
}

extension Dependencies: ViewControllerFactory {
    func makeCalendarViewController() -> CalendarViewController {
        return CalendarViewController(
            healthService: makeHealthService()
        )
    }

    func makeDayViewController() -> DayViewController {
        return DayViewController(
            healthService: makeHealthService(),
            settingsService: makeSettingsSevice()
        )
    }

    func makeSettingsViewController() -> SettingsViewController {
        return SettingsViewController(
            settingsService: makeSettingsSevice()
        )
    }
}
```

Chúng ta sử dụng ViewControllerFactory để tạo mọi ViewController trong ứng dụng của chúng ta, đối với các ứng dụng phức tạp hơn, chúng ta có thể có nhiều factories ViewController hơn dựa trên flow người dùng. Ở đây chúng ta cũng sử dụng extension để thêm sự phù hợp giao thức với Dependencies struct. Đã đến lúc xem làm thế nào chúng ta có thể sử dụng factories trong khi sử dụng Coordinators or FlowControllers.
```
protocol FlowControllerDelegate {
    func startSettings()
}

class FlowController: UIViewController {
    private let factory: ViewControllerFactory
    init(factory: ViewControllerFactory) {
        self.factory = factory
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        add(factory.makeCalendarViewController())
    }
}

extension FlowController: FlowControllerDelegate {
    func startSettings() {
        show(factory.makeSettingsViewController(), sender: self)
    }
}
```
Chúng ta có thể tạo một thể hiện của struct Dependencies trong AppDelegate và chuyển nó tới FlowController chính trong ứng dụng. Bằng cách trích xuất việc tạo ViewControllers vào factories, chúng ta giữ cho FlowControllers của chúng ta nhỏ lại và chỉ chịu trách nhiệm kiểm soát flow người dùng.

# Phần kết luận
Hôm nay chúng ta đã thảo luận về hai kỹ thuật  Dependency Injection. Cả hai đều sử dụng các tính năng ngôn ngữ Swift mà không có bất kỳ sự phụ thuộc nào của bên thứ ba. Chỉ cần nhìn vào chúng và chọn cái nào sẽ làm việc tốt hơn cho bạn.

Thanks for watching <3 !