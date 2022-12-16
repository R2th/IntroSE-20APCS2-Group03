Cách chúng ta control flow trong app có ảnh hưởng rất lớn đến tốc độ cũng như khả năng debug. Swift cung cấp nhiều công cụ để định nghĩa control flow như if, else, while và optional type. Trong bài viết này, chúng ta sẽ sử dụng cơ chế throwing và handling error để giúp quản lý control flow dễ dàng hơn.
## Optional hay không Optional
Optional là một đặc tính quan trọng của Swift giúp thể hiện một model data có dữ liệu hay không. Hãy lấy ví dụ với một hàm load ảnh từ bundle của app, tint và resize ảnh này. Vì mỗi quá trình đều trả về một optional image, ta phải sử dụng một vài guard statement như sau:
```
func loadImage(named name: String,
               tintedWith color: UIColor,
               resizedTo size: CGSize) -> UIImage? {
    guard let baseImage = UIImage(named: name) else {
        return nil
    }

    guard let tintedImage = tint(baseImage, with: color) else {
        return nil
    }

    return resize(tintedImage, to: size)
}
```
Vấn đề với đoạn code trên đó chính là ta bắt buộc phải sử dụng unrwap cho mỗi quá trình đồng thời cũng không thể hiện được nguyên nhân xảy ra lỗi.
Ta hãy refactor đoạn code trên bằng cách sử dụng throwing error.
```
enum ImageError: Error {
    case missing
    case failedToCreateContext
    case failedToRenderImage
    ...
}
```
Ta sẽ throw lỗi mỗi khi giá trị trả về là nil :
```
private func loadImage(named name: String) throws -> UIImage {
    guard let image = UIImage(named: name) else {
        throw ImageError.missing
    }

    return image
}

func loadImage(named name: String,
               tintedWith color: UIColor,
               resizedTo size: CGSize) throws -> UIImage {
    var image = try loadImage(named: name)
    image = try tint(image, with: color)
    return try resize(image, to: size)
}
```
Như vậy mỗi khi giá trị ảnh trả về la nil ta sẽ đồng thơi cũng biết được nguyên nhân gây lỗi là gì. Tuy nhiên không phải lúc nào chúng ta cũng cần handling tất cả các error, ta cũng không muón phải sử dụng do, try, catch ở mọi nơi trong code. Để khắc phục điều này ta có thể sử dụng try? khi gọi một function có throwing error. Như vậy ta có thể vừa có thể sử dụng optional vừa sử dụng được sức mạnh của throw error
```
let optionalImage = try? loadImage(
    named: "Decoration",
    tintedWith: .brandColor,
    resizedTo: decorationSize
)
```
## Validating input
Hãy cùng xem tiếp một ví dụ về sử dụng error trong control flow để thực hiện input validation. Swift không phải lúc nào cũng đảm bảo được function của chúng ta sẽ có một valid input, đôi khi chỉ kiểm tra được điều này ở runtime. Ở ví dụ sau, chúng ta sẽ validate khi người dùng tạo một account mới. Trước hết, ta sẽ sử dụng câu lệnh guard để validate và trả về lỗi trong các trường hợp cụ thể như sau:

```
func signUpIfPossible(with credentials: Credentials) {
    guard credentials.username.count >= 3 else {
        errorLabel.text = "Username must contain min 3 characters"
        return
    }

    guard credentials.password.count >= 7 else {
        errorLabel.text = "Password must contain min 7 characters"
        return
    }

    // Additional validation
    ...

    service.signUp(with: credentials) { result in
        ...
    }
}
```
Vấn đề ở đoạn code trên chính là đang gắn validation logic với code UI. Ta hãy decouple validation code và UI Code bằng Validator như sau
```
struct Validator<Value> {
    let closure: (Value) throws -> Void
}

struct ValidationError: LocalizedError {
    let message: String
    var errorDescription: String? { return message }
}

func validate(
    _ condition: @autoclosure () -> Bool,
    errorMessage messageExpression: @autoclosure () -> String
) throws {
    guard condition() else {
        let message = messageExpression()
        throw ValidationError(message: message)
    }
}
```
Bây giờ chúng ta sẽ implement tất cả validation logic như sau:
```
extension Validator where Value == String {
    static var password: Validator {
        return Validator { string in
            try validate(
                string.count >= 7,
                errorMessage: "Password must contain min 7 characters"
            )

            try validate(
                string.lowercased() != string,
                errorMessage: "Password must contain an uppercased character"
            )

            try validate(
                string.uppercased() != string,
                errorMessage: "Password must contain a lowercased character"
            )
        }
    }
}
func validate<T>(_ value: T,
                 using validator: Validator<T>) throws {
    try validator.closure(value)
}

```
Với tất cả các logic trên hãy cùng update validation code như sau :
```
unc signUpIfPossible(with credentials: Credentials) throws {
    try validate(credentials.username, using: .username)
    try validate(credentials.password, using: .password)

    service.signUp(with: credentials) { result in
        ...
    }
}
```
## Throwing tests
Một ích lợi khác của việc cấu trúc code theo những error có thể gặp đó là sẽ làm đơn giản cho quá trình test code. Ví dụ, ở đây ta sẽ có thể dễ dàng thêm các function test cho validation logic như sau:
```
class PasswordValidatorTests: XCTestCase {
    func testLengthRequirement() throws {
        XCTAssertThrowsError(try validate("aBc", using: .password))
        try validate("aBcDeFg", using: .password)
    }

    func testUppercasedCharacterRequirement() throws {
        XCTAssertThrowsError(try validate("abcdefg", using: .password))
        try validate("Abcdefg", using: .password)
    }
}
```
Với việc XCTest hỗ trợ throw thì để verify trường hợp thành công chúng ta chỉ cần gọi hàm validate sử dụng try, nếu function không throw thì hàm test sẽ pass.
## Conclusion
Cho dù có rất nhiều cách khác nhau để cấu trúc control flow với Swif, thì sử dụng error và throwing function là một phương án mang lại rất nhiều ích lợi
## Reference
Bài viết này được dịch từ https://www.swiftbysundell.com/posts/using-errors-as-control-flow-in-swift