> Các loại optional trong Swift thì có giá trị hoặc không có giá trị và có một số cách để test các optional bằng cách sử dụng framework **XCTest**. Các API như **XCTUnwrap** được thiết kế để unwrap optional và trả ra thông báo lỗi nếu việc unwrap không thành công. Tuy nhiên, nó có thể dễ dàng dẫn đến việc viết nhiều unwrap trước khi đánh giá kết quả thực tế mà bạn muốn test.

### 1. Sử dụng XCTUnwrap để  unwrap các optional

XCTUnwrap là một phương thức có sẵn trong framework XCTest để unwrap các optional trong unit test. Bất cứ khi nào một unwrap không thành công vì thiếu giá trị, nó sẽ trả ra một lỗi và unit test thất bại. Một ví dụ như sau:

```
func testOptional() throws {
    let optionalValue: Int? = 10
    let unwrappedValue = try XCTUnwrap(optionalValue)
    XCTAssertEqual(unwrappedValue, 10)
}
```

Trong ví dụ này, giá trị optional được đặt thành 10 và sẽ dẫn đến kết quả test thành công. Tuy nhiên, nếu giá trị optional là nil, unit test sẽ không thành công với thông báo lỗi như sau:

![](https://images.viblo.asia/a6979bcf-8481-4ca6-9604-c32d975991ea.png)

XCTUnwrap là một lựa chọn tuyệt vời nếu bạn muốn test thất bại sớm nếu một giá trị không tồn tại. Chúng ta có thể đã bỏ qua việc unwrap bằng cách đối ứng trực tiếp với giá trị optional:

```
func testOptionalWithoutUnwrap() throws {
    let optionalValue: Int? = nil
    XCTAssertEqual(optionalValue, 10)
}
```

Việc này sẽ hoạt động tốt nếu bạn chỉ phải khẳng định một giá trị. Tuy nhiên, nếu bạn **assert** cho các thuộc tính trên một optional instance, bạn có thể kết thúc với nhiều thông báo **assert** không thành công chỉ vì instance đó là nil:

![](https://images.viblo.asia/f4fceb79-3805-4a2b-8cfc-b06a902ee5c6.png)

Trong trường hợp đó, tốt hơn hết là bạn nên unwrap instance của mình bằng **XCTUnwrap** và tiếp tục đánh giá nếu bạn biết instance đó tồn tại:

```
func testPersonValues() throws {
    let optionalPerson: Person? = nil
    let unwrappedPerson = try XCTUnwrap(optionalPerson)
    XCTAssertEqual(unwrappedPerson.name, "Antoine")
    XCTAssertEqual(unwrappedPerson.age, 30)
}
```


Trong trường hợp này, unit test sẽ trực tiếp thất bại ngay khi nó gặp giá trị nil cho instance `Person`.


### 2. Tạo các phương thức assertion tùy chỉnh để test với các optional

Một vấn đề khác mà chúng ta thường gặp khi test các optional là **XCTAssertTrue** hoặc **XCTAssertFalse** không hoạt động với các optional:

![](https://images.viblo.asia/46e0469b-8636-4f46-9414-7d564d69ab15.png)


Đề xuất thậm chí còn làm cho nó tồi tệ hơn, vì việc kiểm tra `!= nil` không có nghĩa là giá trị **boolean** là `true`.

Một giải pháp phổ biến là viết một trong các assertion sau:

```
XCTAssertTrue(optionalBool == true)
XCTAssert(optionalBool == true) 
```

Câu đầu tiên có một câu lệnh true trùng lặp, trong khi câu thứ hai thì tên của nó ít mô tả hơn.

### 3. Tạo các phương thức assert tiêu chuẩn toàn cục 

Giải pháp là chúng ta có thể viết phương thức toàn cục của riêng mình để xử lý đối ứng optional assertion:

```
/// Allows asserting for optionals to be `true`.
 /// - Parameters:
 ///   - expression: The expression to assert on.
 ///   - message: An optional message to throw once comparing fails.
 ///   - file: The file in which the assertion takes place.
 ///   - line: The line on which the assertion takes place.
 public func XCTAssertTrue(_ expression: @autoclosure () throws -> Bool?, _ message: @autoclosure () -> String = "", file: StaticString = #file, line: UInt = #line) {
     guard let value = try? expression() else {
         XCTFail("Unwrapping of expected boolean failed", file: file, line: line)
         return
     }
     XCTAssertTrue(value as Bool, message(), file: file, line: line)
 }

 /// Allows asserting for optionals to be `false`.
 /// - Parameters:
 ///   - expression: The expression to assert on.
 ///   - message: An optional message to throw once comparing fails.
 ///   - file: The file in which the assertion takes place.
 ///   - line: The line on which the assertion takes place.
 public func XCTAssertFalse(_ expression: @autoclosure () throws -> Bool?, _ message: @autoclosure () -> String = "", file: StaticString = #file, line: UInt = #line) {
     guard let value = try? expression() else {
         XCTFail("Unwrapping of expected boolean failed", file: file, line: line)
         return
     }
     XCTAssertFalse(value as Bool, message(), file: file, line: line)
 } 
```

Điều này thật tuyệt vời vì nó cho phép chúng ta có thể viết các unit test từ trước trở nên dễ dàng và flexible hơn như sau:

![](https://images.viblo.asia/6f105774-a467-4f59-8fbf-743d2855c82d.png)

Việc này cải thiện khả năng viết code của chúng ta và kết quả là một thông báo lỗi trả ra ngay khi việc unwrap không thành công.

### 4. Kết luận 

Có nhiều cách để test các optional bằng cách sử dụng các API **XCTest** tiêu chuẩn, nhưng chúng không phải lúc nào cũng khiến code trở nên dễ hiểu. Bằng cách sử dụng phương thức toàn cục, chúng ta có thể sử dụng **XCTAssertTrue** và **XCTAssertFalse** tiêu chuẩn bằng cách sử dụng các optional để viết các unit test.

Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn 😍.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃