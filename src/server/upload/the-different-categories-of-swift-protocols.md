Vvai trò chủ yếu của các protocol  (hoặc interfaces) là cho phép các khái niệm trừu tượng chung được xác định trên các triển khai cụ thể - một kỹ thuật thường được gọi là đa hình, vì nó cho phép chúng ta trao đổi (hoặc biến hình) các triển khai của mình mà không ảnh hưởng đến API công khai .

Mặc dù Swift cung cấp hỗ trợ đầy đủ cho loại đa hình dựa trên giao diện đó, các protocol cũng đóng vai trò lớn hơn nhiều trong thiết kế tổng thể của ngôn ngữ và thư viện chuẩn của nó - là một phần chính của chức năng mà Swift cung cấp thực sự được triển khai trực tiếp trên đầu trang của các protocol khác nhau.

Thiết kế protocol-oriented cũng cho phép chúng tôi sử dụng các protocol theo nhiều cách khác nhau trong code tất cả chúng có thể được chia thành bốn loại chính. Tuần này, hãy để Lướt qua các danh mục đó và hãy xem cách Apple sử dụng các giao thức trong frameworks của họ và cách chúng ta có thể xác định các protocol của riêng mình theo cách rất giống nhau.

### Enabling unified actions

Hãy bắt đầu bằng cách xem xét các protocol yêu cầu các loại phù hợp với chúng để có thể thực hiện các hành động nhất định. Ví dụ: thư viện tiêu chuẩn Giao thức Equatable được sử dụng để đánh dấu rằng một loại có thể thực hiện kiểm tra đẳng thức giữa hai trường hợp, trong khi giao thức Hashable được chấp nhận bởi các loại có thể được băm:

```
protocol Equatable {
    static func ==(lhs: Self, rhs: Self) -> Bool
}

protocol Hashable: Equatable {
    func hash(into hasher: inout Hasher)
}
```

Một lợi ích lớn của việc hai khả năng đó được xác định bằng cách sử dụng hệ thống loại (thay vì được mã hóa cứng vào trình biên dịch) là nó cho phép chúng ta viết mã chung bị ràng buộc với các giao thức đó, từ đó cho phép chúng ta sử dụng đầy đủ của những khả năng trong mã đó.

Ví dụ, ở đây, cách chúng ta có thể mở rộng Mảng bằng một phương thức cho phép chúng ta đếm tất cả các lần xuất hiện của một giá trị, với điều kiện là kiểu Phần tử của mảng phù hợp với Tương đương:
```
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

Nói chung, bất cứ khi nào chúng ta xác định các giao thức dựa trên hành động, thông thường nên làm cho các giao thức đó chung chung nhất có thể (giống như Equitable và Hashable), vì điều đó cho phép chúng vẫn tập trung vào chính các hành động, thay vì quá gắn bó với bất kỳ tên miền cụ thể.

Vì vậy, ví dụ, nếu chúng ta muốn thống nhất một số loại tải các đối tượng hoặc giá trị khác nhau, chúng ta có thể định nghĩa một giao thức có thể tải với một loại liên quan - sẽ cho phép mỗi loại tuân thủ khai báo loại kết quả mà nó tải:
```
protocol Loadable {
    associatedtype Result
    func load() throws -> Result
}
```

Tuy nhiên, không phải mọi giao thức đều định nghĩa các hành động (xét cho cùng, đây chỉ là danh mục đầu tiên trong số bốn giao thức). Ví dụ, trong khi tên của giao thức có thể lưu trong bộ nhớ cache sau đây có thể gợi ý rằng nó chứa các hành động để lưu vào bộ đệm, thì nó thực sự chỉ được sử dụng để cho phép nhiều loại khác nhau xác định các khóa bộ nhớ đệm của riêng chúng:
```
protocol Cachable: Codable {
    var cacheKey: String { get }
}
```

So sánh ở trên với giao thức Codable tích hợp mà Cachable thừa hưởng từ đó, nó xác định các hành động cho cả mã hóa và giải mã - và nó bắt đầu trở nên rõ ràng rằng chúng tôi đã kết thúc với một chút không khớp tên.

Rốt cuộc, không phải tất cả các giao thức đều cần sử dụng hậu tố có thể. Trong thực tế, việc buộc hậu tố đó vào bất kỳ danh từ cụ thể nào chỉ để xác định một giao thức cho nó có thể dẫn đến khá nhiều nhầm lẫn - như trong trường hợp này:


```
protocol Titleable {
    var title: String { get }
}
```

Điều mà có lẽ khó hiểu hơn nữa là khi sử dụng hậu tố có thể có thể đưa ra một tên có ý nghĩa hoàn toàn khác với những gì chúng ta dự định. Ví dụ, ở đây, chúng tôi đã xác định một giao thức với mục đích để nó hoạt động như một API cho các thùng chứa màu, nhưng tên của nó gợi ý rằng nó có thể được tô màu cho các loại mà chính chúng có thể được tô màu:

```
protocol Colorable {
    var foregroundColor: UIColor { get }
    var backgroundColor: UIColor { get }
}
```

Vậy làm thế nào chúng ta có thể cải thiện một số các giao thức này - cả về cách đặt tên, cũng như cách chúng có cấu trúc? Hãy bắt đầu bằng cách bước ra khỏi danh mục số một và khám phá một vài cách khác nhau để xác định các giao thức trong Swift.
### Defining requirements

Danh mục số hai dành cho các giao thức được sử dụng để xác định các yêu cầu chính thức cho một loại đối tượng hoặc API nhất định. Trong thư viện chuẩn, các giao thức như vậy được sử dụng để xác định ý nghĩa của những thứ như Collection, Numeric hoặc Sequence:
```
protocol Sequence {
    associatedtype Iterator: IteratorProtocol
    func makeIterator() -> Iterator
}
```

> Lưu ý rằng giao thức trên không được gọi là Sequencable, vì điều đó sẽ chỉ ra rằng nó về việc biến các đối tượng thành chuỗi, thay vì xác định các yêu cầu để trở thành một.

Định nghĩa trên của Sequence cho chúng ta biết rằng vai trò chính của bất kỳ chuỗi Swift nào (chẳng hạn như Array, Dictionary hoặc một cái gì đó giống như Range) là hoạt động như một nhà máy để tạo các vòng lặp - lần lượt được chính thức hóa thông qua các điều sau đây giao thức:

```
protocol IteratorProtocol {
    associatedtype Element
    mutating func next() -> Element?
}
```

Thay vào đó, giao thức trên có thể được gọi là Iterable, vì các trình lặp thực sự tự thực hiện mỗi hành động lặp. Tuy nhiên, cái tên IteratorProtocol có thể được chọn để làm cho nó phù hợp hơn với Sequence, vì chỉ cần đặt tên cho nó là Iterator sẽ gây ra xung đột với loại cùng tên.

Với hai giao thức trên, hãy để ngay bây giờ quay trở lại các giao thức có thể lưu và có thể tạo màu mà chúng ta đã xác định trước đó, để xem liệu chúng có thể được cải thiện hay không bằng cách chuyển đổi chúng thành các định nghĩa yêu cầu thay thế.

Hãy bắt đầu bằng cách đổi tên Colorable thành ColorProvider, điều này mang lại cho giao thức đó một ý nghĩa hoàn toàn mới - ngay cả khi các yêu cầu của nó vẫn giống hệt nhau. Nó không còn nghe giống như nó được sử dụng để xác định các đối tượng có thể được tô màu, mà thay vào đó, nó về việc cung cấp thông tin màu cho một số phần khác trong hệ thống của chúng tôi - đó chính xác là những gì chúng tôi dự định:

```
protocol ColorProvider {
    var foregroundColor: UIColor { get }
    var backgroundColor: UIColor { get }
}
```

Tương tự như vậy, lấy cảm hứng từ IteratorProtocol tích hợp, chúng ta có thể đổi tên Cachable thành một cái gì đó như thế này:

```
protocol CachingProtocol: Codable {
    var cacheKey: String { get }
}
```

Tuy nhiên, một cách tiếp cận thậm chí còn tốt hơn trong trường hợp này sẽ là tách rời khái niệm tạo khóa bộ đệm từ các loại thực sự được lưu vào bộ đệm - điều này sẽ cho phép chúng tôi giữ mã mô hình của chúng tôi khỏi các thuộc tính cụ thể của bộ đệm.

Một cách để làm điều đó là chuyển mã thế hệ khóa của chúng tôi thành các loại riêng biệt - sau đó chúng tôi có thể chính thức hóa các yêu cầu để sử dụng giao thức CacheKeyGenerator:

```
protocol CacheKeyGenerator {
    associatedtype Value: Codable
    func cacheKey(for value: Value) -> String
}
```

Một lựa chọn khác sẽ là mô hình hóa ở trên như một bao đóng thay vào đó, thường là một sự thay thế tuyệt vời cho các giao thức chỉ chứa một yêu cầu duy nhất.

### Type conversions

Tiếp theo, chúng ta hãy xem các giao thức được sử dụng để khai báo rằng một loại có thể chuyển đổi sang và từ các giá trị khác. Chúng tôi lại bắt đầu với một ví dụ từ thư viện chuẩn - CustomStringConvertible, có thể được sử dụng để cho phép bất kỳ loại nào được chuyển đổi thành chuỗi mô tả tùy chỉnh:

```
protocol CustomStringConvertible {
    var description: String { get }
}
```

> So sánh ở trên với những gì nó có thể giống nhưveve nếu nó được gọi là Mô tả thay thế. Nếu vậy, kỳ vọng có thể là nó có chứa một phương thức description () hoặc một cái gì đó tương tự.


Kiểu thiết kế đó đặc biệt hữu ích khi chúng tôi muốn có thể trích xuất một phần dữ liệu từ nhiều loại - hoàn toàn phù hợp với mục đích của giao thức Titleable (có tên kỳ lạ) của chúng tôi từ trước đó.

Thay vào đó, bằng cách đổi tên giao thức đó thành TitleConvertible, chúng tôi không chỉ giúp dễ hiểu hơn giao thức đó để làm gì, chúng tôi còn làm cho mã của chúng tôi phù hợp hơn với thư viện chuẩn - thường là một điều tốt:

```
protocol TitleConvertible {
    var title: String { get }
}
```

Các giao thức chuyển đổi loại cũng có thể sử dụng các phương thức, thay vì các thuộc tính, thường phù hợp hơn khi chúng tôi mong đợi các triển khai nhất định yêu cầu một số lượng tính toán hợp lý - ví dụ: khi làm việc với chuyển đổi hình ảnh:

```
protocol ImageConvertible {
    // Since rendering an image can be a somewhat expensive
    // operation (depending on the type being rendered), we're
    // defining our protocol requirement as a method, rather
    // than as a property:
    func makeImage() -> UIImage
}
```

Chúng ta cũng có thể sử dụng loại giao thức này để cho phép các loại nhất định được thể hiện theo các cách khác nhau - một kỹ thuật, trong số những thứ khác, được sử dụng để thực hiện tất cả các hỗ trợ tích hợp Swift Swift cho chữ - chẳng hạn như chuỗi và chuỗi ký tự. Ngay cả các bài tập không được thực hiện thông qua một giao thức, khá thú vị:
```
protocol ExpressibleByArrayLiteral {
    associatedtype ArrayLiteralElement
    init(arrayLiteral elements: ArrayLiteralElement...)
}

protocol ExpressibleByNilLiteral {
    init(nilLiteral: ())
}
```

Mặc dù có lẽ không phổ biến để xác định các giao thức riêng của chúng ta để kết nối các chữ thành một thể loại (trong thực tế, vì nó yêu cầu thay đổi trình biên dịch), chúng ta có thể sử dụng cùng một thiết kế bất cứ khi nào chúng ta muốn khai báo một giao thức để thể hiện một loại sử dụng một đại diện cấp thấp hơn.

Ví dụ, ở đây, cách thức chúng ta có thể xác định giao thức ExpressibleByUUID cho các loại định danh có thể được tạo bằng UUID raw:

```
protocol ExpressibleByUUID {
    init(uuid: UUID)
}
```

Một tùy chọn khác là sử dụng giao thức RawRepftimeable, đó là quyền hạn có các giá trị thô. Tuy nhiên, trong khi giao thức đó chắc chắn cũng là một loại chuyển đổi, thì trình khởi tạo của nó có sẵn - điều đó có nghĩa là nó thực sự chỉ hữu ích cho các chuyển đổi có điều kiện có khả năng dẫn đến con số không.
### Abstract interfaces

Một ví dụ thú vị về mẫu này có thể được tìm thấy trong framework Apple Metal Metal, đó là API lập trình đồ họa cấp thấp. Vì GPU có xu hướng thay đổi rất nhiều giữa các thiết bị và Metal nhằm mục đích cung cấp API hợp nhất để lập trình chống lại mọi loại phần cứng mà nó hỗ trợ, nên nó sử dụng một giao thức để xác định API của nó là giao diện trừu tượng - trông giống như sau:

```
protocol MTLDevice: NSObjectProtocol {
    var name: String { get }
    var registryID: UInt64 { get }
    ...
}
```

Khi sử dụng Metal, sau đó chúng ta có thể gọi hàm MTLCreateSystemDefaultDevice và hệ thống sẽ trả về việc thực hiện giao thức trên mà phù hợp với thiết bị mà chương trình của chúng tôi hiện đang chạy:

```
func MTLCreateSystemDefaultDevice() -> MTLDevice?
```

Trong mã riêng của chúng tôi, chúng tôi cũng có thể sử dụng cùng một mẫu chính xác bất cứ khi nào chúng tôi muốn hỗ trợ nhiều triển khai của cùng một giao diện. Ví dụ: chúng tôi có thể xác định giao thức NetworkEngine để tách rời cách chúng tôi thực hiện các cuộc gọi mạng từ bất kỳ phương tiện mạng cụ thể nào:

```
protocol NetworkEngine {
    func perform(
        _ request: NetworkRequest,
        then handler: @escaping (Result<Data, Error>) -> Void
    )
}
```

Với những điều đã nêu ở trên, chúng tôi hiện có thể tự do định nghĩa bao nhiêu triển khai mạng cơ bản mà chúng tôi cần - ví dụ: một ứng dụng dựa trên URLSession để sản xuất và một phiên bản giả định để thử nghiệm:

```
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
```

Kỹ thuật trên cũng có thể là một cách tuyệt vời để đóng gói các phụ thuộc của bên thứ ba để ngăn chặn chúng lây lan trên toàn bộ cơ sở mã của chúng tôi - điều này giúp dễ dàng thay thế hoặc loại bỏ các phụ thuộc đó trong tương lai.

### Conclusion

Việc triển khai các giao thức của Swift chắc chắn là một trong những khía cạnh thú vị nhất của ngôn ngữ và số cách mà chúng có thể được định nghĩa và sử dụng thực sự cho thấy mức độ mạnh mẽ của chúng - đặc biệt là khi chúng ta bắt đầu sử dụng đầy đủ các tính năng như các loại liên quan và mở rộng giao thức.

Cám ơn các bạn đã quan tâm tới bài viết, bài viết này được dịch theo[ bài viết cùng tên của tác giả John Sundell](https://www.swiftbysundell.com/articles/different-categories-of-swift-protocols/#conclusion).