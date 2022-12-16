XCTest là thư viện kiểm thử (Unit testing framework) của Apple để lập trình viên kiểm thử lại ứng dụng của mình. Trong XCTest Framework hỗ trợ rất nhiều hàm khác nhau để hỗ trợ cho việc test, thường có dạng **XCTAssertXxx()**. Các hàm này so sánh (check) giá trị mong đợi với giá trị đầu ra trong test method. Nếu giá trị đầu ra match với giá trị mong đợi, test sẽ pass; ngược lại, test sẽ fail và raise 1 message lỗi.

Các hàm Test được kiệt kê theo thể loại như sau:

## 1. Boolean Assertions
Dùng để check 1 test condition là true hoặc false. Gồm các hàm sau:

|Assertion|Description|
| --- | --- |
|XCTAssert(expression, message)| nếu expression là true thì test pass, ngược lại sẽ raise message.|
|XCTAssertTrue(expression, message)| nếu expression là true thì test pass, ngược lại sẽ raise message.|
|XCTAssertFalse(expression, message)| nếu expression là false thì test pass, ngược lại sẽ raise message.|

Ví dụ:
```
func checkEnable(str: String) -> Bool {
    return str.count > 2
}
```

```
func testAssertTrue() {
    let validStr = "test"
    let enable = viewModel.checkEnable(str: validStr)
    XCTAssert(enable, "enable is false")
    XCTAssertTrue(enable, "enable is false")
}
```

```
func testAssertFalse() {
    let inValidStr = ""
    let enable = viewModel.checkEnable(str: inValidStr)
    XCTAssertFalse(enable, "enable is true")
}
```
## 2. Nil và Non-nil Assertions
Dùng để check 1 test condition là nil hoặc non-nil. Gồm các hàm sau:

|Assertion|Description|
| --- | --- |
|XCTAssertNil (expression, message)| nếu expression là nil thì test pass, nếu expression not nil thì sẽ raise mesage.|
|XCTAssertNotNil(expression, message)| nếu expression là not nill thì test pass, nếu expression là nil thì sẽ raise message.|

Ví dụ:
```
func testAssertNil() {
    XCTAssertNil(nil, "Should be not nil")
}
```
```
func testAssertNotNil() {
    XCTAssertNotNil(LoginViewModel(), "Should be nil")
}
```

## 3. Equality và Inequality Assertions
Dùng để check 2 giá trị bằng nhau hoặc không bằng nhau. Gồm các hàm sau:

|Assertion|Description|
| --- | --- |
|XCTAssertEqual(expression1, expression2, message)| nếu expression1 bằng expression2 thì test pass, ngược lại sẽ raise message.|
|XCTAssertNotEqual(expression1, expression2, message)| nếu expression1 không bằng expression2 thì test pass, ngược lại sẽ raise message.|

Ví dụ:
```
func testAssertEqual() {
    let a = 1
    let b = 1
    XCTAssertEqual(a, b, "a == b is wrong")
}
```
```
func testAssertNotEqual() {
    let a = 1
    let b = 2
    XCTAssertNotEqual(a, b, "a != b is wrong")
}
```

## 4. Comparable value Assertions
Dùng để so sánh 2 giá trị để xác định 1 giá trị lớn hơn hoặc nhỏ hơn giá trị kia. Gồm các hàm sau:

|Assertion|Description|
| --- | --- |
|XCTAssertGreaterThan(expression1, expression2, message)| nếu expression1 lớn hơn expression2 thì test pass, ngược lại sẽ raise message.|
|XCTAssertGreaterThanOrEqual(expression1, expression2, message)| nếu expression1 lớn hơn hoặc bằng expression2 thì test pass, ngược lại sẽ raise message.|
|XCTAssertLessThanOrEqual(expression1, expression2, message)| nếu expression1 nhỏ hơn hoặc bằng expression2 thì test pass, ngược lại sẽ raise message.|
|XCTAssertLessThan(expression1, expression2, message)| nếu expression1 nhỏ hơn expression2 thì test pass, ngược lại sẽ raise message.|

Ví dụ:
```
func testComparableAssert() {
    XCTAssertGreaterThan(2, 1, "2 <= 1 is wrong")
    XCTAssertGreaterThanOrEqual(2, 1, "2 < 1 is wrong")
    XCTAssertLessThanOrEqual(1, 2, "1 > 2 is wrong")
    XCTAssertLessThan(1, 2, "1 >= 2 is wrong")
}
```

## 5. NSException Assertions
Kiểm tra xem hàm có ném 1 exception (hoặc không) không. Gồm các hàm sau:

|Assertion|Description|
| --- | --- |
|XCTAssertThrowsError(expression, message, errorHandler: (Error) -> Void)| nếu expression ném 1 ngoại lệ (exception) thì test pass, ngược lại test fail. Nếu muốn check xem lỗi được ném thì sử dụng tham số errorHandler| 
|XCTAssertNoThrow(expression, message)|nếu expression không ném 1 ngoại lên thì test pass, nếu ném 1 ngoại lệ thị test fail và raise message.|

Ví dụ:
```
enum ErrorType: Error {
    case someExpectedError
    case someUnexpectedError
}

func functionThatThrows() throws {
    throw ErrorType.someExpectedError
}
    
func testExceptionAssert() {
    XCTAssertThrowsError(try functionThatThrows(), "Not thow exception") { (error) in
        XCTAssertEqual(error as? ErrorType, ErrorType.someExpectedError)
    }
}
```

## 6. Failing Unconditionally
Tạo ra một failure ngay lập tức và vô điều kiện.
Ví dụ:

```
XCTFail("abc")
```