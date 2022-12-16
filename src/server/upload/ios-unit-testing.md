Dưới đây là một vài thứ liên quan đến Unit Test trong dự án iOS.
## Enable Unit Tests in Xcode Project
1. Trong khi tạo một Dự án mới, hãy tick vào checkbox “**Include Unit Tests**”, “**Include UI Tests**”. Sau khi project được tạo, bạn có thể thấy một thư mục trong dự án có tên “ProjectName**Tests**” và XCode đã tạo một test class mặc định với một mẫu được tạo để bắt đầu làm việc. XCode tạo một Target mới cho ứng dụng của bạn. Ngoài ra, chúng ta có thể tạo một test class mới bằng cách mở một tệp mới (⌘ + N), lọc theo “test” và bạn có thể tìm thấy “**Unit Test Case Class**” và “**UI Test Case Class**”.
2. Đối với một project đã tạo sẵn mà không enable testing, bạn cũng có thể tạo mới cũng bằng cách tạo 1 tệp mới  (⌘ + N) và tìm kiếm “**Unit Testing Bundle**” và “**UI Testing Bundle**”.

## Default UnitTest class — Explained

```
class Test_DemoTests: XCTestCase {
    override func setupWithError() throws { ... }
    override func tearDownWithError() throws { ... }
    func testExample() throws { ... }
    func testPerformanceExample() throws { ... }
}
```
1. **override func setUpWithError() throws { }** — được gọi trước mỗi một method của test class. Do đó, bạn có thể tạo một instance mới của một class cho mọi phương thức của test class.
2. **override func tearDownWithError() throws {}** — Được gọi sau mỗi khi thực hiện một phương thức của test class. Do đó, bạn có thể release, loại bỏ instance được tạo ở phương thức trên. Điều này rất quan trọng để xóa sạch những object đã được khởi tạo trong quá trình chạy test.
3. **func testExample() throws {}** — ví dụ về một phương thức test. Đây là điểm khởi đầu để bạn có thể thay đổi hoặc tạo mới những phương thức khác để phục vụ cho việc kiểm thử của bạn.
4. **func testPerformanceExample() throws {}** — cho chúng ta thấy tổng thời gian của test class.

Dưới đây là ví dụ thứ tự thực hiện của các method

```
import XCTest
@testable import Test_Demo

class Test_DemoTests: XCTestCase {
    
    // 1
    override class func setUp() { ... }
    
    // 2 || 5
    override func setupWithError() throws { ... }
    
    // 8
    override class func tearDown() { ... }
    
    // 4 || 7
    override func tearDownWithError() throws { ... }
    
    // 3
    func testExample() throws { ... }
     
     // 6
     func testPerformanceExample() throws { ... }
}
```

## Run Unit Test in Xcode
Có nhiều cách để chạy UT trong xcode
1. Ấn vào nút hình kim cương trên phương thức test để chạy riêng 1 phương thức
2. Ấn vào nút hình kim cương trên class để chạy tất cả các phương thức test có trong class
3. Shortcut (⌘ + 6)
4. ⌘ + chọn nhiều test case -> chuột phải -> chọn chạy nhiều phương thức hoặc shortcut (Ctrl + alt + ⌘ + U).

***Lưu ý: Xcode sẽ chạy unit test dựa trên thứ tự alphabet của tên phương thức.***

## Unit Test

Kiểm thử đơn vị là một phương pháp nhỏ khép kín để kiểm tra một số chức năng. Ví dụ, trên trang đăng ký, chúng ta sẽ có chức năng kiểm tra xem mật khẩu đã cho có vượt qua chính sách mật khẩu hay không. Bây giờ, chúng tôi cần viết một phương pháp kiểm tra đơn vị sẽ kiểm tra chức năng xác thực mật khẩu của bạn với nhiều mật khẩu mẫu hơn sẽ bao gồm mật khẩu hợp lệ và không hợp lệ.

```
var isIdenticalPassword: Bool {
    return password == repeatedPassword
}

var isValidPassword: Bool {
    guard isIdenticalPassword else { return false }
    let predicate = NSPredicate(format: "SELF MATCHES %@", "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$")
    return predicate.evaluate(with: password)
}
```

Dưới đây là ví dụ về phương thức test cho trường hợp check mật khẩu hợp lệ ở trên

```
func test_PasswordValidation() throws {
    //Arrange
    model.password = "Mobility@123"
    model.repeatedPassword = "Mobility@123"
    
    //Act
    let isValidPassword = model.isValidPassword
    
    // Assert
    XCTAssertTrue(isValidPassword, "Password is not a valid one")
}
```

trong ví dụ trên, bạn có thể nhìn thấy cú pháp assert, vậy nó là gì?

## Test Assertions

Assertion sẽ kiểm tra các giá trị hoặc kết quả mong đợi trong các phương pháp thử nghiệm

Có nhiều loại assertion khác nhau
### 1. Boolean assertions
Nó sẽ kiểm thử một điều kiện và trả về kết quả là boolean
- **XCTAssert(_:_: file: line:)** — Kiểm tra điều kiện là đúng.
- **XCTAssertTrue(_:_: file: line:)** — Kiểm tra điều kiện là đúng.
- **XCTAssertFalse(_:_: file: line:)** — Kiểm tra điều kiện là sai.

Cùng xem với ví dụ trên
```
func test_PasswordValidation() throws {
    //Arrange
    model.password = "Mobility@123"
    model.repeatedPassword = "Mobility@123"
    
    //Act
    let isValidPassword = model.isValidPassword
    
    // Assert
    XCTAssertTrue(isValidPassword, "Password is not a valid one")
    XCTAssertFalse(isValidPassword, "Password is a valid one") // => XCTAssertFalse failed - Password is a valid one
    XCTAssert(isValidPassword, "Password is not a valid one")
}
```

### Nil , Non-Nil Assertions

Nó sẽ kiểm tra output của điều kiện kiểm thử là nil hay không
- **XCTAssertNil(_:_:file: line:)** — Asserts that a given expression is Nil.
- **XCTAssertNotNil(_:_: file: line:)** — Asserts that a given expression is NotNil
- **XCTUnwrap(_:_:file: line:)** — Asserts that a given expression is NotNil and it returns the unwrapped value.

```
func test_model_nil() {
    // let model = Model(attr1: "attr1", attr2: "attr2")
    
    XCTAssertNil(model, "Model is Not-Nil") // => Test case false because `model` is non-nil
    XCTAssertNotNil(model, "Model is Nil")
}
```

### Equality and Inequality Assertions

- **XCTAssertEqual(_:_:_: file: line:)** — Asserts that two values are equal.
- **XCTAssertNotEqual(_:_:_: file: line:)** — Asserts that two values are not equal.

```
func test_PasswordIdenticalCheck() {
     //Arrange
    model.password = "Mobility@123"
    model.repeatedPassword = "Mobility@123"
    
    // Assert
    XCTAssertEqual(model.password, model.repeatedPassword, "Password and RepeatedPassword is not identical")
    XCTAssertNotEqual(model.password, model.repeatedPassword, "Password and RepeatedPassword is identical") // => Test case failed!
}
```

### Comparable Value Assertions

- **XCTAssertGreaterThan(_:_:_: file: line:)** — biểu thức khẳng định rằng vế thứ nhất lớn hơn vế thứ 2
- **XCTAssertGreaterThanOrEqual(_:_:_: file: line:)** — biểu thức khẳng định rằng vế thứ nhất lớn hơn hoặc bằng vế thứ 2
- **XCTAssertLessThan(_:_:_: file: line:)** — biểu thức khẳng định rằng vế thứ nhất nhỏ hơn vế thứ 2
- **XCTAssertLessThanOrEqual(_:_:_: file: line:)** — biểu thức khẳng định rằng vế thứ nhất nhỏ hơn hoặc bằng vế thứ 2