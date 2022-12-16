- Vai trò chủ yếu của  `protocol` /`interface` là cho phép các  `abstraction` chung được xác định trên các triển khai cụ thể . Một kỹ thuật được gọi là `polymorphism` cho phép chúng ta `swap` / `morph` implement của mình mà không ảnh hưởng đến API được công khai.

- Mặc dù `Swift` đã hỗ trợ đầy đủ cho `polymorphism` dựa trên `interface` nhưng  các `protocol`  vẫn đóng vai trò lớn trong thiết kế tổng thể của `language` và `lib`  như một phần chức năng chính mà Swift triển khai trực tiếp phía trên các protocol khác.

- Thiết kế `protocol-oriented design` cho phép chúng ta sử dụng các `protocol` theo nhiều cách khác nhau trong `source code` . Chúng ta cùng lướt qua các cách đó và cả hai hãy xem cách Apple sử dụng các `protocol` của họ.

## 1/ Enabling unified actions:

- Bắt đầu bằng cách xem các `protocol` yêu cầu các `type` phù hợp  để có thể thực hiện các `action` cụ thể. Ví dụ: `protocol Equatable` được sử dụng để đánh dấu rằng một `type` có thể thực hiện kiểm tra đẳng thức giữa hai trường hợp, trong khi `protocol Hashable` được chấp nhận bởi các `type` có thể được `hashed`:

```swift
protocol Equatable {
    static func ==(lhs: Self, rhs: Self) -> Bool
}

protocol Hashable: Equatable {
    func hash(into hasher: inout Hasher)
}
```

- Lợi ích lớn của  hai khả năng đó được cụ thể hóa bằng cách sử dụng hệ thống  (thay vì được mã hóa  vào trình biên dịch) là nó cho phép chúng ta viết `code` chung  ràng buộc với các `protocol`  từ đó cho phép chúng ta sử dụng đầy đủ của những khả năng trong `code` đó.

- Cách thức chúng ta có thể mở rộng `Array` bằng một `method` giúp chúng ta đếm tất cả các lần xuất hiện của một `value`  với điều kiện là kiểu `Element` mảng phù hợp với `Equatable`:

```swift
extension Array where Element: Equatable {
    func numberOfOccurences(of value: Element) -> Int {
        reduce(into: 0) { count, element in
            // We can check whether two values are equal here
            // since we have a guarantee that they both conform
            // to the Equatable protocol:
            if element == value {
                count += 1
            }
        }
    }
}
```

- Bất cứ khi nào xác định  `protocol` dựa trên các `action` chúng ta  nên làm cho các `protocol` đó chung chung nhất có thể (giống như `Equitable` và `Hashable`) vì  chúng vẫn tập trung vào chính các hành động  thay vì ràng buộc với tên `domain` cụ thể.

- VD: Nếu chúng ta muốn thống nhất một số loại tải các đối tượng hoặc giá trị khác nhau, chúng ta có thể định nghĩa một `protocol`có thể tải với một loại liên quan - sẽ cho phép mỗi loại tuân thủ khai báo loại kết quả mà nó tải:

```swift
protocol Loadable {
    associatedtype Result
    func load() throws -> Result
}
```

Tuy nhiên không phải mọi `protocol` đều định nghĩa các `action` . Trong khi tên của `protocol`:

```swift
protocol Cachable: Codable {
    var cacheKey: String { get }
}
```

- So sánh  `protocol Codable` và  `Cachable `ta  xác định các hành động cho cả `encode` và `decode`  .

- Không phải tất cả các `protocol` đều cần sử dụng `suffix`. Việc ràng buộc `suffix`  vào bất kỳ danh từ cụ thể nào chỉ để xác định  `protocol` có thể dẫn đến khá nhiều nhầm lẫn:

```swift
protocol Titleable {
    var title: String { get }
}
```

- Khó hiểu hơn nữa là khi sử dụng `suffix` có thể  tạo ra một tên có ý nghĩa hoàn toàn khácmong muốn. Ví dụ, chúng ta đã định nghĩa một `protocol` với mục đích  hoạt động như một `API` cho các `color container` nhưng tên lại gợi ý rằng nó có thể được tô màu cho các `type` mà chính chúng có thể được tô màu:

```swift
protocol Colorable {
    var foregroundColor: UIColor { get }
    var backgroundColor: UIColor { get }
}
```

- Chúng ta có thể cải thiện một số các `protocol` này cả về cách đặt tên cũng như cách chúng có cấu trúc. Bằng cách bước ra khỏi mục một và xem một vài cách khác nhau để xác định các `protocol` trong `Swift`.

## 2/ Defining requirements: 

- Mục số hai dành cho các `protocol` được sử dụng để xác định các yêu cầu chính thức cho một `type` đối tượng hoặc `API` nhất định. Trong `standard library`, các `protocol` được sử dụng để xác định ý nghĩa của `Collection`, `Numberic` hoặc `Sequence`:

```swift
protocol Sequence {
    associatedtype Iterator: IteratorProtocol
    func makeIterator() -> Iterator
}
```

- Định nghĩa trên của `Sequence` cho chúng ta biết rằng vai trò chính của bất kỳ  Swift  `sequence` nào (chẳng hạn như `Array`, `Dictionary` hoặc `Range`)  hoạt động như `factory` để tạo các vòng lặpđược chính thức hóa thông qua các điều sau đây `protocol`:

```swift
protocol IteratorProtocol {
    associatedtype Element
    mutating func next() -> Element?
}
```

- Với hai `protocol` trên hãy  quay trở lại các `protocol` có thể lưu và có thể tạo màu mà chúng ta đã xác định trước đó, để xem liệu chúng có thể được cải thiện hay không bằng cách chuyển đổi chúng thành các định nghĩa yêu cầu thay thế.

```swift
protocol ColorProvider {
    var foregroundColor: UIColor { get }
    var backgroundColor: UIColor { get }
}
```

- Tương tự như vậy, chúng ta có thể đổi tên `Cachabl` thành:

```swift
protocol CachingProtocol: Codable {
    var cacheKey: String { get }
}
```

- Hãy cùng chuyển mã tạo khóa của chúng ta thành các loại riêng biệt - sau đó chúng ta có thể chính thức hóa các yêu cầu để sử dụng `protocol CacheKeyGenerator`:

```swift
protocol CacheKeyGenerator {
    associatedtype Value: Codable
    func cacheKey(for value: Value) -> String
}
```

## 3/ Type conversions:

- Chúng ta hãy xem các `protocol` được sử dụng để khai báo rằng một loại có thể chuyển đổi sang và từ các `value` khác. Chúng ta lại bắt đầu với một ví dụ từ `standard library`  là `CustomStringConvertible` được sử dụng để cho phép bất kỳ loại nào được chuyển đổi thành `string` mô tả:

```swift
protocol CustomStringConvertible {
    var description: String { get }
}
```

- Kiểu viết  đó đặc biệt hữu ích khi chúng ta  có thể trích xuất một phần `dât` từ nhiều `type`  hoàn toàn phù hợp với mục đích của `protocol` `Titleable`.

- Bằng cách đổi tên `protocol` đó thành `TitleConvertible` chúng  không chỉ dễ hiểu hơn mà còn làm cho `code` của chúng ta phù hợp hơn với `standard library`:

```swift
protocol TitleConvertible {
    var title: String { get }
}
```

- Các `protocol` chuyển đổi `type` cũng có thể sử dụng các `method`  thay vì các `property`. Điều này thường phù hợp hơn khi chúng ta  muốn  triển khai các  yêu cầu  tính toán hợp lý :

```swift
protocol ImageConvertible {
    // Since rendering an image can be a somewhat expensive
    // operation (depending on the type being rendered), we're
    // defining our protocol requirement as a method, rather
    // than as a property:
    func makeImage() -> UIImage
}
```

- Chúng ta cũng có thể sử dụng loại `protocol` này để cho phép các `type` nhất định  theo các cách khác nhau:

```swift
protocol ExpressibleByArrayLiteral {
    associatedtype ArrayLiteralElement
    init(arrayLiteral elements: ArrayLiteralElement...)
}

protocol ExpressibleByNilLiteral {
    init(nilLiteral: ())
}
```

- Ví dụ: Cách thức chúng ta có thể xác định `protocol`` ExpressibleByUUID` cho các loại định danh có thể được tạo bằng`UUID` :

```swift
protocol ExpressibleByUUID {
    init(uuid: UUID)
}
```

## 4/ Abstract interfaces:

- Cuối cùng hãy để  xem có lẽ cách sử dụng `protocol` phổ biến nhất trong `code` của bên thứ ba  để xác định`abstract` để giao tiếp với nhiều `type` cơ bản.

- Một ví dụ có thể được tìm thấy trong  `Apple Metal framework`  đó là `API` lập trình đồ họa `low level`. Vì GPU thay đổi rất nhiều giữa các thiết bị và `Metal` nhằm mục đích cung cấp `API ` phù hợp  mọi loại phần cứng mà nó hỗ trợ, nên nó sử dụng một`protocol`  để xác định `API` :

```swift
protocol MTLDevice: NSObjectProtocol {
    var name: String { get }
    var registryID: UInt64 { get }
    ...
}
```

- Khi sử dụng `Metal` chúng ta có thể gọi hàm `MTLCreateSystemDefaultDevice` và hệ thống sẽ trả về việc thực hiện `protocol`  phù hợp với thiết bị mà `code` của chúng ta hiện đang chạy:

```swift
func MTLCreateSystemDefaultDevice() -> MTLDevice?
```

- Ví dụ: chúng ta có thể xác định `protocol` `NetworkEngine` để tách rời cách chúng ta thực hiện các `network call` từ bất kỳ phương tiện `network` nào:

```swift
protocol NetworkEngine {
    func perform(
        _ request: NetworkRequest,
        then handler: @escaping (Result<Data, Error>) -> Void
    )
}
```

- Chúng ta hiện có thể tự do định nghĩa số lượng  triển khai `network` cơ bản mà chúng ta cần - ví dụ: một ứng dụng dựa trên `URLSession` để sản xuất và một phiên bản giả định để thử nghiệm:

```swift
extension URLSession: NetworkEngine {
    func perform(
        _ request: NetworkRequest,
        then handler: @escaping (Result<Data, Error>) -> Void
    ) {
        ...
    }
}

struct MockNetworkEngine: NetworkEngine {
    var result: Result<Data, Error>

    func perform(
        _ request: NetworkRequest,
        then handler: @escaping (Result<Data, Error>) -> Void
    ) {
        handler(result)
    }
}
````