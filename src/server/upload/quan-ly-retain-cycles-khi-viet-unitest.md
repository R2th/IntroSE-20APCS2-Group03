Trong quá trình phát triển ứng dụng, chúng ta rất khó tránh khỏi việc tạo ra retain cycles kể cả với những lập trình viên giàu kinh nghiệm. Retain cycles không phải lúc nào cũng dễ dàng để phát hiện và có thể dẫn đến hàng giờ để debug. Tất nhiên có những công cụ tuyệt vời giúp chúng ta thực hiện debug dễ dàng hơn (như: memory graph debugger,...) nhưng quá trình debug vẫn khá là vất vả và mất thời gian.

Điều quan trọng để fix retain cycles là cần phát hiện ra chúng. Bài viết này sẽ trình bày một số đoạn code mà bạn có thể đưa vào unit test giúp việc phát hiện ra retain cycles dễ dàng hơn.

## Ý tưởng đơn giản

Một quy tắc khá đơn giản trong ARC: một đối tượng sẽ được giữ lại nếu vẫn còn ít nhất 1 tham chiếu mạnh đến nó.

```
class NoisyDeinit {
    deinit {
        print("I'm in deinit")
    }
}

var example: NoisyDeinit? = .init()

// Setting `example` (the only reference to the `NoisyDeinit` instance) to `nil`
// causes the instance to be deallocated and it's `deinit` will be invoked.
example = nil
```

Tương tự, chúng ta đều biết rằng một tham chiếu yếu (weak) đến một đối tượng sẽ không làm tăng retain count và đối tượng sẽ giải phóng khi tham chiếu mạnh cuối cùng kết thúc.

```
var example: NoisyDeinit? = .init()
weak var weakReference = example

assert(weakReference != nil)

// Setting `example` (the only reference to the `NoisyDeinit` instance) to `nil`
// also causes `weakReference` to be set to `nil`.
example = nil
assert(weakReference == nil)
```

Nắm được những điều cơ bản trên, chúng ta có thể viết unit tests theo cách mà chúng ta có cả tham chiếu mạnh và tham chiếu yếu đến đối tượng cần test. Sau khi hoàn thành sử dụng đối tượng, chúng ta sẽ set tham chiếu mạnh thành nil và xác minh rằng tham chiếu yếu cũng là nil. Nếu tham chiếu yếu không phải nil tại thời điểm này thì chúng ta cần tìm ra nguyên nhân khiến đối tượng tồn tại (đây có thể là 1 retain cycle).

Chúng ta hãy xem nó trông như thế nào. Đây là một unit test mà không cần kiểm tra cycle:

```
final class SampleTests: XCTestCase {    
    func testGreeting() {
        let sut = Greeter()
        XCTAssertEqual(sut.greet("Paul"), "Hello Paul")
    }
}
```

Để thêm bài test này cho một đối tượng, chúng ta làm như sau:

```
 1 final class SampleTests: XCTestCase {
 2     func testGreeting() {
 3         var sut: Greeter? = .init()
 4         weak var weakSut = sut
 5 
 6         XCTAssertEqual(sut?.greet("Paul"), "Hello Paul")
 7 
 8         sut = nil
 9         XCTAssertNil(weakSut)
10     }
11 }
```

1. Một biến weak var để giữ tham chiếu yếu đến đối tượng mà chúng ta đang cần kiểm tra vòng đời.
2. Set nil để loại bỏ tham chiếu mạnh (line 8)
3. Kiểm tra weakSut sẽ trở thành nil (line 9)

## Chúng ta có thể đơn giản hóa?

Thêm 3 dòng như trên cho mỗi đối tượng là một công việc khá tẻ nhạt và dễ bị lỗi. Ví dụ, bạn có thể vô tình quên bất kỳ một trong các bước này và xác thực sẽ không còn hoạt động.
Chúng ta có thể viết một vài helper functions mà chúng ta có thể thêm dưới dạng extension trên XCTestCase cho phép chúng ta chỉ cần thêm một dòng cho mỗi đối tượng mà chúng ta muốn test vòng đời.
Trước tiên, hãy thêm một function cho phép chúng ta xác thực rằng một đối tượng được giải phóng sau khi chúng ta thực thi một block mà caller cung cấp. Điều này sẽ hữu ích cho các tình huống trong đó bạn có một thuộc tính instance đang giữ đối tượng của bạn.

```
 1 extension XCTestCase {
 2     func assertNil(_ subject: AnyObject?, after: @escaping () -> Void, file: StaticString = #file, line: UInt = #line) {
 3         guard let value = subject else {
 4             return XCTFail("Argument must not be nil", file: file, line: line)
 5         }
 6 
 7         addTeardownBlock { [weak value] in
 8             after()
 9             XCTAssert(value == nil, "Expected subject to be nil after test! Retain cycle?", file: file, line: line)
10         }
11     }
12 }
```

Dòng 3-5 thực hiện một chút kiểm tra. Nếu đối tượng subject truyền vào nil thì sẽ trả ra thất bại.
Các dòng 7-9 là một closure được gọi sau khi test đã được chạy
Dòng 7 là nơi tham chiếu yếu đến đối tượng value
Dòng 8 là nơi chúng ta thực hiện closure after()
Dòng 9 là nơi chúng ta thực hiện xác nhận rằng tham chiếu yếu của chúng tôi không có

Khi sử dụng helper function, unit test của chúng ta trở thành:

```
final class SampleTests: XCTestCase {
    var sut: Greeter!

    override func setUp() {
        super.setUp()
        sut = Greeter()
        assertNil(sut, after: { self.sut = nil })
    }

    func testGreeting() {
        XCTAssertEqual(sut.greet("Paul"), "Hello Paul")
    }
}
```

Trong các trường hợp chúng ta không có thuộc tính instance giữ đối tượng của mình, chúng ta có thể viết một hàm đơn giản hơn:

```
extension XCTestCase {
    func assertNilAfterTest(_ subject: AnyObject?, file: StaticString = #file, line: UInt = #line) {
        assertNil(subject, after: {}, file: file, line: line)
    }
}
```

Đoạn code trên hoạt động vì nếu không có gì giữ đối tượng của chúng ta bên ngoài scope của test function, nó sẽ tự động được giải phóng bởi thực tế là tham chiếu mạnh duy nhất đã được giải phóng khi kết thúc scope. Điều này cho phép việc test thậm chí còn đơn giản hơn:

```
final class SampleTests: XCTestCase {
    func testGreeting() {
        let sut = Greeter()
        assertNilAfterTest(sut)
        XCTAssertEqual(sut.greet("Paul"), "Hello Paul")
    }
}
```

## Kết luận
Hai helper functions trên tạo nên một API đơn giản, hy vọng sẽ hữu ích trong việc giúp phát hiện retain cycle trước khi chúng trở thành một vấn đề thực sự. Đoạn code trên hy vọng đủ đơn giản để hiểu và không cần chỉnh sửa quá nhiều các bài test hiện có (no subclassing etc).

Hy vọng bài viết trên sẽ hữu ích với bạn, bài viết được dịch từ: https://paul-samuels.com/blog/2018/11/20/unit-testing-retain-cycles/