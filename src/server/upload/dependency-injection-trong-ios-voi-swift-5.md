Dependency Injection là một kĩ thuật rộng có thể thực hiện bằng nhiều cách khác nhau. Trong bài viết này sẽ đi tìm hiểu về Dependency Injection và thực hiện các pattern thường xuyên được sử dụng.
## 1. Định nghĩa về Dependency Injection.
Dependency Injection là một kĩ thuật cho phép một class phụ thuộc vào một đối tuợng thay vì dự vào class để tạo các đối tượng đó. 

Một class sẽ phụ thuộc vào một interface và sẽ implementation bên ngoài class đó. Có 3 điều đáng chú ý ở đây: 
* Injector:  một instance của dependency và nới nó với một client.
* Dependency: là một object yêu cầu client để hoạt động chính xác. 
* Client: một object nơi sự phụ thuộc được thực hiện

Hãy thử thực hiện nó vào với Swift ở các phần tiếp theo.
## 2. Client patterns.
Có 4 cách để client có thể nhận được dependency:
* Initializer (khởi tạo)
* Property (thuộc tính)
* Interface
* Ambient context (môi trường)

### 2.1 Initializer Injection.
+ Mô tả: Tạo dependencies thông qua khởi tạo.
+ Thường sử dụng khi số lượng dependencies ít hoặc đối tượng bất biến.
+ Code mẫu:
```swift
protocol Dependency {
    func foo()
}

struct DependencyImplementation: Dependency {
    func foo() {
        // Does something
    }
}

class Client {
    let dependency: Dependency
    
    init(dependency: Dependency) {
        self.dependency = dependency
    }

    func foo() {
        dependency.foo()
    }
}

let client = Client(dependency: DependencyImplementation())
client.foo()
```
+ Ưu điểm: 
    + Tính đóng gói cao
    + Đảm bảo client luôn ở trạng thái hợp lệ
+ Nhược điểm:
    + Dependency không thể thay đổi sau đó.
    + Trở nên cồng kềnh với hơn 3 dependency 

### 2.2 Property Injection.
+ Mô tả: Tạo dependencies thông qua thuộc tính.
+ Thường sử dụng bạn cần thay đổi dependency sau khi khởi tạo. Ví dụ như Viewcontroller và NSManagedObject
+ Code mẫu:

```swift
protocol Dependency {
    func foo()
}

struct DependencyImplementation: Dependency {
    func foo() {
        // Does something
    }
}

class Client {
    var dependency: Dependency!
    
    func foo() {
        dependency.foo()
    }
}

let client = Client()
client.dependency = DependencyImplementation()
client.foo()
```
+ Ưu điểm: 
    + Cho phép sửa dependency sau khi khởi tạo
    + Code dễ đọc hơn
+ Nhược điểm:
    + Client sẽ bị sai nếu thiếu một vài dependency
    + Tính đóng gói yếu
    + Phải dùng thuộc tính optional
   
### 2.3 Interface Injection
+ Mô tả: được thực hiện thông qua phương thức setter hoặc thông qua parameter
+ Thường sử dụng khi nhiều client cần xử lí bởi một injector. Cho phép injector thực hiện các công việc đối với client
+ Code mẫu
``` swift
protocol Dependency {}

protocol HasDependency {
    func setDependency(_ dependency: Dependency)
}

protocol DoesSomething {
    func doSomething()
}

class Client: HasDependency, DoesSomething {
    private var dependency: Dependency!
    
    func setDependency(_ dependency: Dependency) {
        self.dependency = dependency
    }
    
    func doSomething() {
        // Does something with a dependency
    }
}

class Injector {
    typealias Client = HasDependency & DoesSomething
    private var clients: [Client] = []
    
    func inject(_ client: Client) {
        clients.append(client)
        client.setDependency(SomeDependency())
        // Dependency applies its policies over clients
        client.doSomething()
    }
    
    // Switch dependencies under certain conditions
    func switchToAnotherDependency() {
        clients.forEach { $0.setDependency(AnotherDependency()) }
    }
}

class SomeDependency: Dependency {}
class AnotherDependency: Dependency {}
```
Trong ví dụ trên `Injector` xử lý bất cứ client nào thoả mãn  `HasDependency` và `DoesSomething` protocol. Và  `Injector`  đã thực hiện `doSomething()`.
+ Ưu điểm: 
    + Cho phép set dependency sau.
    + Cho phép injector áp dụng một số cồng việc của client.
    + Injector có thể xử lý bất kì client nào thoả mãn protocol.
+ Nhược điểm:
    + Client trở thành phụ thuộc vào chính nó gây phức tạp về flow.

### 2.4 Ambient Context.
+ Mô tả:  dependency mang tính toàn cục thông qua protocol. Điều này cho phép substitute implementation nếu cần. 
+ Thường sử dụng khi cần tạo ra 1 dependency truy cập toàn cục.
+ Code mẫu:
 ``` swift
 protocol DateTimeProvider {
    var now: Date { get }
}

struct SystemDateTimeProvider: DateTimeProvider {
    var now: Date {
        return Date()
    }
}

class DateTime {
    static var provider: DateTimeProvider = SystemDateTimeProvider()
    
    static var now: Date {
        return provider.now
    }
}
  ```
 + Ưu điểm:
     + Dependency là toàn cục làm giảm sự phức tạp cho các client sử dụng nó.
 + Nhược điểm:
     + Tính đóng gói yếu
     + Yêu cầu thread safety
     + Cần heiuer được nó đang được dùng với client nào cần kiểm tra thủ công.

## 3. Dependency Injection Patterns
Có 3 patterns thường được sử dụng:

+ Factory
+ Service Locator
+ Dependency injection Container

### 3.1 Factory
Factory luôn thực hiện như Injector và kết nối client với dependency đó. Mục đích của factory là tách rời các  dependency từ các client.
``` swift
protocol Client {}

enum ClientFactory {
    
    static func make() -> Client {
        return ClientImplementation(dependency: DependencyImplementation())
    }
}

class ClientImplementation: Client {
    init(dependency: Dependency) {}
}

protocol Dependency { }
struct DependencyImplementation: Dependency {}
```
### 3.2 Dependency Injection Container
Một Container chứa một số loại trừu tượng phục vụ cho hàng loạt các chức năng:
+ Tạo phụ thuộc với client
+ Tạo object
+ Quản lý vòng đời của  object
+ Áp dụng Container service riêng với object

Container đặc biệt hữu ích khi bạn cần quản lý nhiều client với nhiều dependency.
```swift
final class Assembly {
    private let view = View()
    private let presenter = Presenter()
    private let interactor = Interactor()
    private let router = Router()
    
    var input: ModuleInput {
        return presenter
    }
    
    weak var output: ModuleOutput? {
        didSet {
            presenter.output = output
        }
    }
    
    init() {
        view.output = presenter
        interactor.output = presenter
        router.output = presenter

        presenter.view = view
        presenter.interactor = interactor
        presenter.router = router
    }
}

class View {
    weak var output: ViewOutput!
}

class Presenter {
    weak var view: ViewInput!
    weak var interactor: InteractorInput!
    weak var router: RouterInput!
    weak var output: ModuleOutput!
}

class Interactor {
    weak var output: InteractorOutput!
}

class Router {
    weak var output: RouterOutput!
}
```

### 3.3 Service Locator.
Nó được dùng để thay cho việc khởi tạo trực tiếp các dependency thì chúng ta cần sử dụng  Locator object - chịu trách nhiệm kiểm tra từng dependency. Locator cung cấp cách để đăng ký dependency và quản ký vòng đời của nó. Nó không khời tạo các dependency

```swift
protocol Locator {
    func resolve<T>() -> T?
}

final class LocatorImpl: Locator {
    private var services: [ObjectIdentifier: Any] = [:]
    
    func register<T>(_ service: T) {
        services[key(for: T.self)] = service
    }
    
    func resolve<T>() -> T? {
        return services[key(for: T.self)] as? T
    }

    private func key<T>(for type: T.Type) -> ObjectIdentifier {
        return ObjectIdentifier(T.self)
    }
}

class Client {
    private let locator: Locator
    
    init(locator: Locator) {
        self.locator = locator
    }
    
    func doSomething() {
        guard let service: Service = locator.resolve() else { return }
        // do something with service
    }
}

class Service {}
```

## 4. Tổng kết.
Dependency injection là một kỹ thuật hữu ích, nó giúp code clean và dễ bảo trì hơn. Nó cho phép tách rời việc khởi tạo đối tượng khỏi việc sử dụng nó và giảm thiểu kết nối giữa các thành phần.


##### Tham khảo: https://www.vadimbulavin.com/dependency-injection-in-swift/