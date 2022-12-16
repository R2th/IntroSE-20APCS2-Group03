# I. Giới thiệu:

-----


**Adapter** là một **Design Pattern** thuộc nhóm **Structural**. Nó cho phép các đối tượng có cấu trúc khác nhau, không tương thích với nhau có thể làm việc chung được với nhau. Nó đóng vai trò như một khớp lắp ghép giúp chúng ta có thể lắp ghép các mảnh ghép không cùng loại vào với nhau. Cấu trúc của **Adapter Pattern** gồm các thành phần chính như sau:

![](https://images.viblo.asia/d7411319-1d32-41b1-916f-bd2286eb1c21.png)
- **Object** using **Adapter**: là đối tượng adopt `NewProtocol` và sử dụng protocol.
- **NewProtocol**: là protocol được dùng để khai báo các giao thức sẽ được sử dụng trong Adapter Pattern.
- **Legacy Object**: là đối tượng cần sử dụng Adapter Pattern để giúp nó có thể tương thích được với những phần còn lại.
- **Adapter**: là thành phần đóng vai trò là bộ chuyển đổi, giúp cho đối tượng sử dụng và đối tượng được sử dụng tuy không tương thích với nhau nhưng vẫn có thể làm việc được với nhau.

# II. Cách thức hoạt động:

-----


**Adapter Pattern** sẽ đứng giữa hai đối tượng không tương thích với nhau để giúp chúng có thể làm việc được với nhau. Nó đóng vai trò như cầu nối giúp cho hai đối tượng có thể làm việc được. Ví dụ đơn giản, nếu như chúng ta muốn cho ô tô chạy được trên đường ray tàu hỏa thì chúng ta cần phải có một cỗ máy trung gian đóng vai trò là **adapter** dành riêng cho ô tô để giúp nó có thể di chuyển trên đường ray tàu.

![](https://images.viblo.asia/46820a8d-2bf9-4ff0-b522-08013c7fac73.png)

# III. Adapter Pattern được sử dụng khi nào?

-----


**Adapter Pattern** được sử dụng khi có các **Class**, **Module** nào đó không tương thích với các **Class**, **Module** hiện tại trong source code và chúng lại** không thể sửa đổi** được (ví dụ như các thư viện, framework,...) nhưng chúng ta lại cần phải sử dụng chúng với nhau. Chúng ta có thể sử dụng các `extension` trong **Swift** hoặc tự tạo các **class Adapter** để tích hợp các phần lại với nhau khi chúng ta cần.

# IV. Ví dụ:

-----


Để hiểu rõ hơn về **Adapter Pattern**, chúng ta sẽ cùng tìm hiểu một ví dụ sau:

Hãy lấy một ví dụ, đó là ứng dụng của chúng ta sử dụng "Login with Google", sau khi login chúng ta sẽ cần lấy thông tin của **User** và **Token**. Tuy nhiên, đối tượng `GoogleUser` mà SDK của Google cung cấp và đối tượng `User` trong project của chúng ta sử dụng lại đang được định nghĩa khác nhau (tức là không tương thích với nhau), khi đó chúng ta có thể sử dụng **Adapter Pattern** để có thể **Google SDK** tích hợp trong project của mình.

Giả sử **Google SDK** sẽ có các lớp và phương thức như sau, các lớp này do bên **Google SDK** cung cấp nên chúng ta sẽ **không thể can thiệp** để sửa đổi chúng:
```swift
// Third-Party Classes

public struct GoogleUser {
    public var email: String
    public var password: String
    public var token: String
}

public class GoogleAuthenticator {
    
    public  func login(email: String,
                       password: String,
                       completion: @escaping (GoogleUser?, Error?) -> Void) {
        
        // Make networking calls, which return a `Token`
        let token = "special-token-value"
        
        let user = GoogleUser(email: email, password: password, token: token)
        completion(user, nil)
    }
}
```

Các đối tượng trong project của chúng ta sẽ bao gồm:
```swift
// Your project's objects

public struct User {
    public let email: String
    public let password: String
}

public struct Token {
    public let value: String
}
```

Tiếp theo, chúng ta sẽ định nghĩa **protocol** để khai báo các giao thức sẽ được sử dụng trong **Adapter**.
```swift
// AuthenticationService
public protocol AuthenticationService {
    
    func login(email: String,
               password: String,
               success: @escaping (User, Token) -> Void,
               failure: @escaping (Error?) -> Void)
}
```

Tạo **Adapter** là bộ chuyển đổi sau khi **request** thành công và nhận được **response** từ **Google SDK**. **Adapter** sẽ đóng vai trò biến đổi đối tượng `GoogleUser` của **Google SDK** thành đối tượng `User` trong project của chúng ta để có thể sử dụng được nó.
```swift
public class GoogleAuthenticatorAdapter: AuthenticationService {
    
    private var authenticator = GoogleAuthenticator()
    
    public func login(email: String,
                      password: String,
                      success: @escaping (User, Token) -> Void,
                      failure: @escaping (Error?) -> Void) {
        
        authenticator.login(email: email, password: password) { (googleUser, error) in
            guard let googleUser = googleUser else {
                failure(error)
                return
            }
            
            let user = User(email: googleUser.email, password: googleUser.password)
            let token = Token(value: googleUser.token)
            success(user, token)
        }
    }
}
```

Sử dụng **Adapter**:
```swift
var authService: AuthenticationService = GoogleAuthenticatorAdapter()

let successCallBack: (User, Token) -> Void = { user, token in
    print("Auth succeeded: \(user.email), \(token.value)")
}

let failureCallBack: (Error?) -> Void = { error in
    if let error = error {
        print("Auth failed with error: \(error)")
    } else {
        print("Auth failed with error: no error given")
    }
}

authService.login(email: "user@example.com",
                  password: "password",
                  success: successCallBack,
                  failure: failureCallBack)
```

Kết quả nhận được:
```swift
Auth succeeded: user@example.com, special-token-value
```

# V. Tài liệu tham khảo:

-----


- Design Pattern by Tutorials - Raywenderlich
- Adapter Pattern by [refactoring.guru](https://refactoring.guru/design-patterns/adapter)