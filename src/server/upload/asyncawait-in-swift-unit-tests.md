Asynchronous code là điều cần thiết để cung cấp trải nghiệm người dùng tốt hơn, nhưng đôi khi bất đồng bộ thực sự phức tạp để viết, debug, và đặc biệt là test. Vì test mặc định được thực hiện đồng bộ, chúng ta thường phải chỉnh sửa code của mình hoặc viết những testcase phức tạp hơn để test asynchronous function calls và operations. Trong bài viết này, chúng ta sẽ tìm hiểu cách thực hiện Asynchronous tests.
## Testing asynchronous code
Chúng ta sẽ bắt đầu bằng tìm hiểu chính xác vì sao asynchronous code lại khó khăn để test. Ở đây chúng ta đã triển khai một kiểu AsyncOperation đơn giản với closure và thực hiện nó một cách không đồng bộ trên một dispatch queue, và sau đó chuyển kết quả đến completion handler:
```swift
struct AsyncOperation<Value> {
    let queue: DispatchQueue = .main
    let closure: () -> Value

    func perform(then handler: @escaping (Value) -> Void) {
        queue.async {
            let value = self.closure()
            handler(value)
        }
    }
}
```
Để test đoạn code trên, chúng ta có thể mock DispatchQueue để làm cho nó luôn thực hiện đồng bộ - Đó là cách tiếp cận tốt cho nhiều trường hợp nhưng lại không đúng trong trường hợp bất đồng bộ trên. Thay vào đó, chúng ta sẽ sử dụng expectation  - cho phép chúng tôi đợi cho đến khi hoạt động không đồng bộ của chúng ta kết thúc bằng cách hoàn thành expectation như một phần của trình xử lý completion handler, như sau:
```swift
class AsyncOperationTests: XCTestCase {
    func testPerformingOperation() {
        // Given
        let operation = AsyncOperation { "Hello, world!" }
        let expectation = self.expectation(description: #function)
        var result: String?

        // When
        operation.perform { value in
            result = value
            expectation.fulfill()
        }

        // Then
        waitForExpectations(timeout: 10)
        XCTAssertEqual(result, "Hello, world!")
    }
}
```
Tiếp theo Chúng ta có thể refactor testing code trên đơn giản hơn rất nhiều bằng cách inplement async/await.
## Async/await
Async/await đã trở thành một cách ngày càng phổ biến để xử lý code không đồng bộ bằng một số ngôn ngữ khác - bao gồm C # và JavaScript. Thay vì phải tiếp tục xử lý các completion handler, async/await về cơ bản cho phép chúng ta đánh dấu các hàm không đồng bộ của chúng ta là async, sau đó chúng tôi có thể chờ sử dụng keyword await.
Mặc dù Swift chưa hỗ trợ async / await, nhưng nếu nó được thêm vào, nó có thể trông giống như sau:
```swift
async func loadImage(from url: URL) -> UIImage? {
    let data = await loadData(from: url)
    let image = await data?.decodeAsImage()
    return image
}
```
Như bạn có thể thấy ở trên, lợi ích chính của async / await là nó cho phép chúng ta viết code không đồng bộ như thể nó đồng bộ, vì trình biên dịch sẽ tự động tổng hợp code cần thiết để xử lý chờ đợi các hoạt động không đồng bộ của chúng ta.

Mặc dù chúng tôi không thể thêm keywords mới vào Swift một cách đơn giản, nhưng có một cách để đạt được kết quả tương tự trong test code của chúng ta, đó là sử dụng expectations.
Những gì chúng ta sẽ làm là thêm một phương thức gọi là await to XCTestCase, có một hàm sử dụng completion handler làm đối số. Sau đó chúng ta sẽ thực hiện expectation  tương tự như trước, bằng cách gọi hàm được truyền và sử dụng một expectation để đợi cho completion handler của nó được gọi, như sau:
```swift
extension XCTestCase {
    func await<T>(_ function: (@escaping (T) -> Void) -> Void) throws -> T {
        let expectation = self.expectation(description: "Async call")
        var result: T?

        function() { value in
            result = value
            expectation.fulfill()
        }

        waitForExpectations(timeout: 10)

        guard let unwrappedResult = result else {
            throw AwaitError()
        }

        return unwrappedResult
    }
}
```
Với những điều trên, chúng tôi có thể giảm thiểu độ phức tạp của AsyncOperation test, bây giờ chỉ yêu cầu chúng ta tạo ra operation và sau đó chuyển phương thức thực hiện của nó sang API chờ mới - như sau:
```swift
class AsyncOperationTests: XCTestCase {
    func testPerformingOperation() throws {
        let operation = AsyncOperation { "Hello, world!" }
        let result = try await(operation.perform)
        XCTAssertEqual(result, "Hello, world!")
    }
}
```
## Additional complexity
Phương thức await ở trên của chúng ta hoạt động tốt miễn là hàm bất đồng bộ của chúng ta không chấp nhận bất kỳ đối số nào ngoài một completion handler. Tuy nhiên, nhiều khi không phải như vậy, chẳng hạn như trong thử nghiệm này - nơi chúng ta đang xác minh rằng `ImageResizer` thay đổi kích thước chính xác của một hình ảnh nhất định, điều này yêu cầu một đối số `factor` bổ sung được chuyển đến phương thức `resize` bất đồng bộ:
```swift
class ImageResizerTests: XCTestCase {
    func testResizingImage() {
        // Given
        let originalSize = CGSize(width: 200, height: 100)
        let resizer = ImageResizer(image: .stub(withSize: originalSize))
        let expectation = self.expectation(description: #function)
        var resizedImage: UIImage?

        // When (here we need to pass a factor as an additional argument)
        resizer.resize(byFactor: 5) { image in
            resizedImage = image
            expectation.fulfill()
        }

        // Then
        waitForExpectations(timeout: 10)
        XCTAssertEqual(resizedImage?.size, CGSize(width: 1000, height: 500))
    }
}
```
Mặc dù chúng ta sẽ không thể sử dụng phiên bản `await` trước đó để viết thử nghiệm ở trên (vì chúng ta cần truyền một hệ số để `resize`), nhưng tin tốt là chúng ta có thể dễ dàng thêm một overload chấp nhận một đối số bổ sung bên cạnh completion handler - như thế này:
```swift
extension XCTestCase {
    // We'll add a typealias for our closure types, to make our
    // new method signature a bit easier to read.
    typealias Function<T> = (T) -> Void

    func await<A, R>(_ function: @escaping Function<(A, Function<R>)>,
                     calledWith argument: A) throws -> R {
        return try await { handler in
            function((argument, handler))
        }
    }
}
```
Với những điều trên, chúng tôi hiện có thể xử lý `ImageResizer` test giống như `AsyncOperation` test của chúng ta trước đây, đồng thời giảm đáng kể độ dài và độ phức tạp của nó bằng cách sử dụng `await` overload mới của chúng ta:
```swift
class ImageResizerTests: XCTestCase {
    func testResizingImage() throws {
        let originalSize = CGSize(width: 200, height: 100)
        let resizer = ImageResizer(image: .stub(withSize: originalSize))

        let resizedImage = try await(resizer.resize, calledWith: 5)
        XCTAssertEqual(resizedImage.size, CGSize(width: 1000, height: 500))
    }
}
```
Nhược điểm lớn duy nhất của cách tiếp cận trên là chúng ta sẽ phải tiếp tục thêm các overload bổ sung của `async` cho mọi kết hợp mới của các đối số và completion handlers mà chúng ta gặp phải. Trong khi overloads  mới khá dễ tạo, chúng ta có thể phải duy trì khá nhiều mã bổ sung. Nó chắc chắn vẫn có giá trị, nhưng hãy xem liệu chúng ta có thể đưa mọi thứ đi xa hơn một chút không?
##  Awaiting the future
Khi sử dụng Futures & Promises, mỗi asynchronous call sẽ trả về `Future`, sau đó có thể quan sát thấy `Future` để chờ đợi kết quả của nó. Vì Future luôn có cùng một layout, bất kể signature của hàm đã tạo ra nó là gì, chúng ta có thể dễ dàng thêm chỉ một await overload duy nhất để hỗ trợ tất cả các `Future`-based asynchronous APIs.
Overload mới của chúng ta lấy một `Future <T> `thay vì một hàm và thực hiện nhiều công việc giống như trước đây - tạo ra một kỳ vọng và sử dụng nó để chờ đợi kết quả của tương lai, như thế này:
```swift
extension XCTestCase {
    func await<T>(_ future: Future<T>) throws -> T {
        let expectation = self.expectation(description: "Async call")
        var result: Result<T>?

        future.observe { asyncResult in
            result = asyncResult
            expectation.fulfill()
        }

        waitForExpectations(timeout: 10)

        switch result {
        case nil:
            throw AwaitError()
        case .value(let value)?:
            return value
        case .error(let error)?:
            throw error
        }
    }
}
```
Với những điều trên, bây giờ chúng ta có thể dễ dàng hỗ trợ bất kỳ loại hàm bất đồng bộ nào (bất kể số lượng đối số mà chúng chấp nhận), miễn là chúng trả về `Future` thay vì sử dụng completion handler. Nếu chúng ta sửa đổi `ImageResizer` của mình từ trước để làm điều đó, chúng ta có thể sử dụng cùng một test code đơn giản, nhưng không cần phải thêm overloads bổ sung của `await`:
```swift
class ImageResizerTests: XCTestCase {
    func testResizingImage() throws {
        let originalSize = CGSize(width: 200, height: 100)
        let resizer = ImageResizer(image: .stub(withSize: originalSize))

        let resizedImage = try await(resizer.resize(byFactor: 5))
        XCTAssertEqual(resizedImage.size, CGSize(width: 1000, height: 500))
    }
}
```

Reference: https://www.swiftbysundell.com/articles/asyncawait-in-swift-unit-tests/