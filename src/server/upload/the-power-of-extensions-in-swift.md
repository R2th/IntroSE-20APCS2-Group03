- `Extension` cho phép chúng ta có thể add thêm `functionality` cho các `type` hay `protocol` có sẵn hay một số phần của thư viện `Apple SDK` có sẵn hoặc thậm chí là thành phần trong các `third party package` mà chúng ta sử dụng trong `project`.

- Tuy nhiên `extension` trong `Swift` có thể được sử dụng với nhiều cách linh hoạt và nâng cao hơn nhiều so với việc chỉ sử dụng để add thêm các `property` hay `method` cho các `external object`. Ở bài viết này chúng ta cùng nghiên cứu các cách sử dụng đó để có thể sử dụng trong các `project` sắp tới.

# 1/ Thêm các tính năng vào Type tồn tại sẵn:

- Bắt đầu từ đơn giản ta có cách sử dụng `extension` để thêm mới, tùy chỉnh các `API` cho các dạng `type` thành phần trong `Apple system` ví dụ như các `Apple standard library`. Ví dụ cụ thể như chúng ta cần làm việc trên một `app` mà `logic` xử lý yêu cầu chúng ta cần phải `access` vào các `element` trong các mảng khác nhau, để tránh việc luôn phải kiểm tra `index` của các `element` mà chúng ta `access` thì chúng ta có thể làm như sau:

```swift
extension Array {
    func element(at index: Int) -> Element? {
        guard index >= 0, index < count else {
            return nil
        }

        return self[index]
    }
}
```

- Rất đơn giản nhưng tiện lợi đúng không? Bây giờ chúng ta đã có thể sử dụng `method` trên ở bất kỳ `Array` nào trong `project`. Chưa dừng ở đó chúng ta còn có thể thực hiện những tùy chỉnh tốt hơn với việc sử dụng `extension` cho `protocol` `RandomAccessCollection`:

- `RandomAccessCollection` định nghĩa các yêu cầu mà `collection` cung cấp `random access` cho các `element`. Mở rộng `protocol` này chúng ta sẽ sử dụng `method` mới cho bất kì `collection` nào bao gồm cả `Array`:

```swift
extension RandomAccessCollection {
    func element(at index: Index) -> Element? {
        guard indices.contains(index) else {
            return nil
        }

        return self[index]
    }
}
```

- Chỉ với thay đổi trên, chúng ta bây giờ có thể sử dụng `method` mới cho các `type` như `Array`, `ArraySlice`, `Range`:

```swift
// Extracting an optional element from an Array
guard let fifthElement = array.element(at: 4) else {
    return
}

// Doing the same thing, but using an ArraySlice instead:
let slice = array[0..<3]

guard let secondElement = slice.element(at: 1) else {
    return
}

// We could also use our new method with types like Range:
guard let thirdValue = range.element(at: 2) else {
    return
}
```

- Việc sử dụng `extension` cho `protocol` mang lại cho chúng ta sự linh hoạt hơn trong việc sử dụng các `method` và `property` mà chúng ta thêm vào.

- Tuy nhiên không phải tất cả `extension` chúng ta thêm vào đều hướng tới mục đích chung trên. Trong một số trường hợp chúng ta cần thêm các `constraints` để các `extension` thêm cụ thể.

- Chúng ta cùng xem một ví dụ mà chúng thêm thêm `extension` để add `method` giúp chúng ta tính toán tổng giá tiền của các `products` với cách sử dụng `same type constraints` để đảm bảo `method` sẽ được chỉ được gọi khi `Sequence` `conform` type của `Product` value:

```swift
extension Sequence where Element == Product {
    func totalPrice() -> Int {
        reduce(0) { price, product in
            price + product.price
        }
    }
}
```

- Điều hữu dụng của `constraints` này là nó không chỉ tham chiếu và đảm bảo type cho protocol mà còn có thể sử dụng trong `closure` như sau:

```swift
extension Sequence where Element == () -> Void {
    func callAll() {
        forEach { closure in
            closure()
        }
    }
}
```

- Ở Swift 5.3, tính năng này còn được nâng cấp hơn cho phép chúng ta có thể sử dụng `constraints` này để cá nhân hóa cách khai báo `method` cho các type được sử dụng để bao đóng nó.

```swift
extension Sequence {
    func callAll<T>(with input: T) where Element == (T) -> Void {
        forEach { closure in
            closure(input)
        }
    }
}
```

- `Method` trên có thể trở nên hữu dụng khi chúng ta muốn truyền các `same value` cho các `closure` khác nhau như trong ví dụ các `order` sẽ `notify` cho tất cả `observer` thuộc `Observable` type có `value` thay đổi:

```swift
class Observable<Value> {
    var value: Value {
        didSet { observations.callAll(with: value) }
    }

    private var observations = [(Value) -> Void]()

    ...
}
```

# 2/ Tổ chức lại các API và cách tuân thủ Protocol:

- `Extension` thường được dùng trong việc tổ chức code trong `project`, đây là một tính năng mà chúng ta đã thực hiện nhiều trên `Objective-C`. Chúng ta sử dụng để nhóm các `API` có cùng chức năng mà nó cung cấp để dễ dàng cho việc tìm kiếm cũng như xếp tính năng.

- Trong `Swift` chúng ta sử dụng cùng một cách tiếp cận để xếp các `API` theo `access level`. Lấy ví dụ như `Publish`, chúng ta có một trình khởi tạo để `build` mỗi `website` mà trong đó `Section` dùng như type để các nhóm được gom vào phải tuân thủ theo như `public`, `internal`, `private`:

```swift
public struct Section<Site: Website>: Location {
    public let id: Site.SectionID
    public private(set) var items = [Item<Site>]()
    ...
}

public extension Section {
    func item(at path: Path) -> Item<Site>? {
        ...
    }
    
    func items(taggedWith tag: Tag) -> [Item<Site>] {
        ...
    }
    
    ...
}

internal extension Section {
    mutating func addItem(_ item: Item<Site>) {
        ...
    }
}

private extension Section {
    ...
    
    mutating func rebuildIndexes() {
        ...
    }
}
```

- Ngoài lợi ích trong việc tổ chức `code`, cách làm trên chúng ta còn không phải cấp cho `method` các `access level` mà mỗi `API` sẽ tự động được cung cấp các truy cập cần thiết.

- Cách triển khai trên hoàn toàn có thể áp dụng cho `protocol`, chúng ta có thể kèm theo điều kiện phù hợp cho từng `extension` chúng ta thêm, ví dụ như chúng ta tạo `ListViewController` `conform` `UITableViewDelegate` qua `extension`:

```swift
extension ListViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView,
                   didSelectRowAt indexPath: IndexPath) {
        let item = items[indexPath.item]
        showDetailViewController(for: item)
    }
    
    ...
}
```

- Ở đây chúng ta đơn giản tạo ra các điều kiện `wrapper type` để thỏa mãn `conform` cho `protocol` như `Equatable` và `Hashable` chỉ khi `Wrapped` cũng thỏa mãn type của các `protocol`:

```swift
// The compiler can still automatically generate the code required
// to conform to protocols like Equatable and Hashable even when
// adding those conformances through extensions:
extension NetworkResponse: Equatable where Wrapped: Equatable {}
extension NetworkResponse: Hashable where Wrapped: Hashable {}

// Most protocols will probably require us to write some form of
// bridging code ourselves, though. For example, here we make our
// network response use its wrapped type's description when it's
// being converted into a string, rather than defining its own:
extension NetworkResponse: CustomStringConvertible
    where Wrapped: CustomStringConvertible {

    var description: String {
        result.description
    }
}
```

# 3/ Chuyên môn hóa việc sử dụng generic:

- Ở điểm cuối cùng, chúng ta cùng xem cách `extension` có thể được sử dụng để chuyên môn hóa các `type` cũng như `protocol` chung cho từng trường hợp sử dụng thực thế:

- Như `Sequence` và `RandomAccessCollection` `protocol` mà chúng ta đã mở rộng để thuận tiện cho việc sử dụng như cách vài `Apple Framework` thường sử dụng `generic` để làm cho các `API` trờ nên an toàn và dễ mở rộng hơn. Trong `Combine` các `publisher` được `implement` để sử dụng `Publisher` `protocol` bao gồm các các `generic` type được định nghĩa để `Output` hay `Failure` được tạo ra khi các `Publisher` emit.

- Các `generic` type đó cho phép chúng ta triển khai hoàn chỉnh các `Combine` `operator` như việc sử dụng `Result` cho `value` được trả về từ `publisher emit`:

```swift
extension Publisher {
    func asResult() -> AnyPublisher<Result<Output, Failure>, Never> {
        self.map(Result.success)
            .catch { error in
                Just(.failure(error))
            }
            .eraseToAnyPublisher()
    }
}
```

- `Extension` trên cho phéo chúng ta triển khai `Combine` giống với `AsyncValue` với việc `Output` được `assign` trực tiếp cho `Result`:

```swift
class AsyncValue<Value: Decodable>: ObservableObject {
    @Published private(set) var result: Result<Value, Error>?
    private var cancellable: AnyCancellable?

    func load(from url: URL,
              using session: URLSession = .shared,
              decoder: JSONDecoder = .init()) {
        cancellable = session.dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Value.self, decoder: decoder)
            .asResult()
            .sink { [weak self] result in
                self?.result = result
            }
    }
}
```

- Cách làm trên với các `constraints` cho chúng ta tận dụng khả năng suy luận type mạng mẽ của `Swift` cũng như cách mà `SwiftUI` sử dụng các API để built các view hiển thị.

- Lấy ví dụ như việc chúng ta làm việc trên `IconView` được render với `icon` đã được xác định trước. Để tiện cho việc tạo `Button` bao gồm `icon` chúng ta có thể thêm `extension` mà sử dụng `type constraints` là `Label` để định nghĩa `content` mà `Button` đó được `render`:

```swift
extension Button where Label == IconView {
    init(icon: Icon, action: @escaping () -> Void) {
        self.init(action: action, label: {
            IconView(icon: icon)
        })
    }
}
```

- Và giờ khi chúng ta sử cụng `API` trên để tạo `instance` `Button` thì `complier` sẽ tự động thêm thông báo cho chúng ta muốn sử dụng `IconView` như sau:

```swift
struct ProductView: View {
    @ObservedObject var viewModel: ProductViewModel

    var body: some View {
        VStack {
            ...
            Button(icon: .shoppingCart) {
                viewModel.performPurchase()
            }
        }
    }
}
```