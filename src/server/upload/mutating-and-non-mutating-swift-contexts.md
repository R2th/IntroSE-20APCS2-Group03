Một trong những cách mà Swift giúp chúng ta viết code mạnh mẽ hơn là thông qua khái niệm về các value types, giới hạn cách state đó có thể được chia sẻ qua các API boundaries. Đó là bởi vì, khi sử dụng các value types, tất cả các mutations  (theo mặc định) chỉ được thực hiện cho các  local copies của các values mà chúng ta đang làm việc và các API thực sự thực hiện các mutations phải được marked là `mutating`.
Trong bài viết này, hãy khám phá từ khóa đó, cũng như từ khóa `nonmutating` của nó và loại khả năng mà các tính năng ngôn ngữ đó cung cấp.
## What can a mutating function do?
Về cơ bản, một hàm được đánh dấu là `mutating` có thể thay đổi bất kỳ thuộc tính nào trong values bao quanh của nó. Từ “values” thực sự quan trọng ở đây, vì khái niệm về structured mutations của Swift chỉ áp dụng cho các value types, không áp dụng cho các loại tham chiếu như classes và actors.
Ví dụ: method `cancel` của `Meeting` type sau đây là mutating, vì nó sửa đổi `state` và `reminderDate` properties:
```
struct Meeting {
    var name: String
    var state: MeetingState
    var reminderDate: Date?
    ...

    mutating func cancel(withMessage message: String) {
        state = .cancelled(message: message)
        reminderDate = nil
    }
}
```
Bên cạnh việc sửa đổi các thuộc tính, các mutating contexts cũng có thể gán một giá trị hoàn toàn mới cho `Self`, điều này có thể thực sự hữu ích khi thêm một mutating method vào một enum (không thể chứa stored instance properties nào). Ví dụ: ở đây, chúng ta đang tạo một API để giúp dễ dàng append một `Operation` này vào một `Operation` khác:
```
enum Operation {
    case add(Item)
    case remove(Item)
    case update(Item)
    case group([Operation])
}

extension Operation {
    mutating func append(_ operation: Operation) {
        self = .group([self, operation])
    }
}
```
Kỹ thuật trên cũng hoạt động đối với các value types khác, chẳng hạn như structs, có thể thực sự hữu ích nếu chúng ta muốn set lại một giá trị về default set of properties của nó hoặc nếu chúng ta muốn thay đổi một giá trị phức tạp hơn - ví dụ như thế này:
```
struct Canvas {
    var backgroundColor: Color?
    var foregroundColor: Color?
    var shapes = [Shape]()
    var images = [Image]()

    mutating func reset() {
        self = Canvas()
    }
}
```
Thực tế là chúng ta có thể gán một giá trị hoàn toàn mới cho `self` trong một mutating function thoạt đầu có vẻ hơi kỳ lạ, nhưng chúng ta phải nhớ rằng cấu trúc Swift thực sự chỉ là các giá trị - vì vậy cũng giống như cách chúng ta có thể thay thế một giá trị `Int` bằng cách gán một giá trị mới cho nó, chúng ta cũng có thể làm điều tương tự với bất kỳ struct (hoặc enum) nào khác.
## Mutating protocol requirements
Mặc dù khái niệm tách biệt các mutating và non-mutating APIs là thứ duy nhất đối với các value types, chúng ta vẫn có thể biến một `mutating` function trở thành một phần của protocol - ngay cả khi protocol đó có thể được chấp nhận bởi một reference type, chẳng hạn như một class. Các class có thể đơn giản bỏ qua từ khóa `mutating` khi tuân theo một protocol như vậy, vì chúng vốn có thể thay đổi.
Tuy nhiên, sẽ rất thú vị nếu chúng ta mở rộng protocol với việc implement một default mutating function, sau đó chúng ta có thể triển khai những thứ như `reset` API ở trên mà không thực sự biết loại giá trị nào mà chúng tôi đang đặt lại - như thế này:
```
protocol Resettable {
    init()
    mutating func reset()
}

extension Resettable {
    mutating func reset() {
        self = Self()
    }
}

struct Canvas: Resettable {
    var backgroundColor: Color?
    var foregroundColor: Color?
    var shapes = [Shape]()
    var images = [Image]()
}
```
## Performing mutations within initializers
Mặc dù các function luôn cần được đánh dấu rõ ràng là thay đổi bất cứ khi nào chúng ta muốn sửa đổi internal state của value type (cho dù đó là thuộc tính hay toàn bộ giá trị), initializers luôn thay đổi theo mặc định. Điều đó có nghĩa là, bên cạnh việc gán các giá trị ban đầu cho type properties, trình khởi tạo cũng có thể gọi các mutating method để thực hiện công việc của nó (miễn là `self` đã được khởi tạo hoàn toàn trước đó).
Ví dụ: `ProductGroup` sau đây gọi `add` method của riêng nó để thêm tất cả các product đã được chuyển vào trình khởi tạo của nó - điều này giúp chúng tôi có thể sử dụng một đường dẫn mã duy nhất cho logic đó, bất kể nó đang được chạy như một phần của quá trình khởi tạo hay không:
```
struct ProductGroup {
    var name: String
    private(set) var products = [Product]()
    private(set) var totalPrice = 0
    
    init(name: String, products: [Product]) {
        self.name = name
        products.forEach { add($0) }
    }

    mutating func add(_ product: Product) {
        products.append(product)
        totalPrice += product.price
    }
}
```
## Non-mutating properties
Cho đến nay, tất cả các ví dụ mà chúng ta đã xem xét đều là về các mutable contexts, nhưng Swift cũng cung cấp một cách để đánh dấu một số contexts nhất định là *non-mutating* một cách rõ ràng. Trong khi các trường hợp sử dụng, để làm như vậy chắc chắn bị hạn chế hơn so với việc chọn tham gia vào các mutations, nhưng nó vẫn có thể là một công cụ hữu ích trong một số tình huống nhất định.
Ví dụ: hãy xem SwiftUI view đơn giản này, chế độ này làm tăng `@State` - một value property mỗi khi nhấn vào button:
```
struct Counter: View {
    @State private var value = 0

    var body: some View {
        VStack {
            Text(String(value)).font(.largeTitle)
            Button("Increment") {
                value += 1
            }
        }
    }
}
```
Bây giờ, nếu chúng ta xem ở trên không chỉ là một SwiftUI view mà còn là một cấu trúc Swift tiêu chuẩn thì việc biên dịch mã của chúng ta thực sự khá kỳ lạ. Tại sao chúng ta có thể thay đổi thuộc tính giá trị của mình như vậy, trong một closure, mà không được gọi trong synchronous, mutable contextngữ cảnh đồng bộ, có thể thay đổi?
Bí ẩn tiếp tục dày lên nếu sau đó chúng ta xem xét khai báo của `State` [property wrapper](https://www.swiftbysundell.com/articles/property-wrappers-in-swift/), cũng là một struct, giống như view của chúng ta:
```
@frozen @propertyWrapper public struct State<Value>: DynamicProperty {
    ...
}
```
Vậy tại sao một struct-based property wrapper, được sử dụng trong struct-based view, lại có thể thực sự bị thay đổi trong non-mutating context? Câu trả lời nằm trong khai báo của `State` wrapper’s `wrappedValue`, đã được đánh dấu bằng từ khóa `nonmutating`:
```
public var wrappedValue: Value { get nonmutating set }
```
Mặc dù điều này trong chừng mực chúng ta có thể điều tra mà không cần quyền truy cập vào mã nguồn của SwiftUI, `State` rất có thể sử dụng một số hình thức lưu trữ dựa trên tham chiếu, do đó khiến nó có thể chọn không tham gia đột biến giá trị tiêu chuẩn của Swift (sử dụng từ khóa `nonmutating`) - vì bản thân `State` wrapper không thực sự bị thay đổi khi chúng ta gán một giá trị thuộc tính mới.
Nếu chúng ta muốn, đây là một khả năng mà chúng tôi cũng có thể thêm vào một số loại của riêng mình. Để chứng minh, `PersistedFlag` wrapper sau đây lưu trữ giá trị `Bool` cơ bản của nó bằng cách sử dụng `UserDefaults`, có nghĩa là khi chúng ta chỉ định một giá trị mới cho nó (thông qua thuộc tính `wrapValue`), chúng ta cũng không thực sự thực hiện bất kỳ đột biến dựa trên giá trị nào ở đây. Vì vậy, thuộc tính đó có thể được đánh dấu là `nonmutating`, điều này mang lại cho `PersistedFlag` các khả năng đột biến tương tự như `State`:
```
@propertyWrapper struct PersistedFlag {
    var wrappedValue: Bool {
        get {
            defaults.bool(forKey: key)
        }
        nonmutating set {
            defaults.setValue(newValue, forKey: key)
        }
    }

    var key: String
    private let defaults = UserDefaults.standard
}
```
Vì vậy, cũng giống như các `@State`-marked properties, bất kỳ thuộc tính nào mà chúng tôi đánh dấu bằng `@PersistedFlag` giờ đây có thể được ghi vào ngay cả trong các non-mutating contexts, chẳng hạn như trong các [escaping closures](https://www.swiftbysundell.com/basics/closures/). Tuy nhiên, điều rất quan trọng cần lưu ý là loại từ khóa `nonmutating` cho phép chúng ta phá vỡ các khía cạnh chính trong ngữ nghĩa giá trị của Swift, vì vậy nó chắc chắn là thứ chỉ nên được sử dụng trong các tình huống rất cụ thể.

Hy vọng bài viết sẽ có ích với các bạn.