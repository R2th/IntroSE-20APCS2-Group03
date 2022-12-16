## Tổng quan
Trong các ứng dụng thực tế, bạn thường sẽ phải lưu một số thông tin người dùng như họ tên, email, số điện thoại hay một số thông tin tài khoản khác sau khi đăng nhập để có thể sử dụng ở nhiều nơi trong App mà không cần thực hiện lời gọi API. Đây thường là những thông tin đơn giản, ít có sự thay đổi. Khi đó chúng ta sẽ dụng tới UserDefaults. UserDefault cũng có thể được dùng cho các ứng dụng cung cấp tính năng tự đăng nhập, hoặc lưu lại token để duy trì phiên.

Tuy nhiên, cơ chế của UserDefault chỉ đơn giản là ghi dữ liệu ra một dạng văn bản lưu trong thiết bị. Do đó tính bảo mật không cao vì có thể truy cập dễ dàng. Với những thông tin quan trọng, bạn nên tìm hiểu và sử dụng Keychain. Đây là một dạng thông tin được mã hoá trước khi lưu, nên độ an toàn cao hơn nhiều so với UserDefault. Tuy nhiên có một lưu ý là Keychain không bị xoá đi khi bạn gỡ ứng dụng. Do đó hãy đảm bảo bạn xoá những thông tin được lưu trong Keychain khi người dùng log out tài khoản hoặc khi ứng dụng bị xoá nếu không muốn ứng dụng bị lỗi khi người dùng cài lại ứng dụng.

Quay lại chủ đề chính, do tính chất của hướng đối tượng, chúng ta thường không truy cập hay thay đổi trực tiếp dữ liệu trong UserDefaults, mà sẽ tạo một Wrapper để cung cấp các phương thức đọc, ghi các dữ liệu này.
Giả sử chúng ta cần lưu trữ các thông tin cơ bản của người dùng sau khi đăng nhập như username, email, có phải khách đã đăng kí premium hay không, ... Với các phiên bản Swift trước 5.1, wrapper sẽ được viết như sau
```Swift
private struct Constants {
    static let isPremiumKey = "is_premium_key"
    static let usernameKey = "username_key"
}

struct AppData {
    static var isPremium: Bool {
        get {
            // Read from UserDefaults
            return UserDefaults.standard.bool(forKey: Constants.isPremiumKey)
        }
        set {
            // Save to UserDefaults
            UserDefaults.standard.set(newValue, forKey: Constants.isPremiumKey)
        }
    }
    
    static var username: String? {
        get {
            // Read from UserDefaults
            return UserDefaults.standard.string(forKey: Constants.usernameKey)
        }
        set {
            // Save to UserDefaults
            UserDefaults.standard.set(newValue, forKey: Constants.usernameKey)
        }
    }
}
```

Với khái niệm Property Wrapper được tích hợp từ Swift 5.1, chúng ta có thể viết lại Wrapper cho UserDefaults ngắn gọn như sau:
```Swift
struct AppData {
    @Storage(key: Constants.isPremiumKey, defaultValue: false)
    static var isPremium: Bool
    
    @Storage(key: Constants.usernameKey, defaultValue: "")
    static var username: String
}
```

## Property Wrapper là gì
Property có thể hiểu đơn giản là một cấu trúc dữ liệu ngăn chặn việc đọc, ghi trực tiếp dữ liệu. Thay vào đó, có thể custom lại các phương thức gián tiếp truy cập và ghi đè các dữ liệu này. 
Để định nghĩa một Property Wrapper, chúng ta sẽ sử dụng keyword @propertyWrapper. Phân tích một ví dụ đơn giản với thuộc tính có kiểu dữ liệu String, và mỗi lần thuộc tính được đọc hoặc ghi, sẽ log giá trị đó ra Console.

Đầu tiên, tạo ra một property wrapper có tên là Printable:
```Swift
@propertyWrapper
struct Printable {
    private var value: String = ""

    var wrappedValue: String {
        get {
            // Intercept read operation & print to console
            print("Get value: \(value)")
            return value
        }
        set {
            // Intercept write operation & print to console
            print("Set value: \(newValue)")
            value = newValue
        }
    }
}
```
Việc khai báo một property wrapper tương tự với Struct. Việc khai báo thuộc tính non-static wrappedValue là bắt buộc. Ở đây, việc đọc, ghi phải thông qua get, set của property wrapper và câu lệnh in ra được thêm vào mỗi hàm. 
Cách sử dụng Printable property wrapper vừa khai báo
```Swift
struct Product {
    @Printable static var name: String
}

Product.name = "Product 1" // Trigger set value
Product.name // Trigger get value
```
Sử dụng kí tự @ để khai báo thuộc tính được wrap bởi property wrapper. Chạy đoạn mã trên sẽ thấy log ở Console như sau: 
```
Set value: Product 1
Get value: Product 1
```

## UserDefaults Wrapper
Quay lại bài toán đã nêu ở phần tổng quát. Bây giờ chúng ta cần tạo ra một property wrapper để truy xuất dữ liệu từ UserDefaults, tương tự như Printable ở ví dụ trên
```Swift
import UIKit
@propertyWrapper
struct Storage {
    let key: String
    let defaultValue: String
    
    var wrappedValue: String {
        get {
            return UserDefaults.standard.string(forKey: key) ?? defaultValue
        }
        set {
            UserDefaults.standard.set(newValue, forKey: key)
        }
    }
}
```
 Ở đây tạo ra một property wrapper có tên là Storage với 1 thuộc tích là key và defaultValue. Key tương ứng với key sử dụng để truy xuất dữ liệu tương ứng, còn defaultValue là giá trị trả về trong trường hợp dữ liệu chưa tồn tại hoặc đọc ra bị lỗi. Việc khởi tạo thuộc tính bây giờ ngắn gọn hơn rất nhiều.
 ```Swift
 struct AppData {
    @Storage(key: Constants.usernameKey)
    static var username: String?
}
 ```
 
 Việc đọc và ghi dữ liệu cũng rất đơn giản
 ```Swift
 override func viewDidLoad() {
    super.viewDidLoad()
    AppData.username = "Bui Xuan Huy"
    print(AppData.username)
}
 ```
Tuy nhiên với cách viết như trên, Storage không thể sử dụng với các thuộc tính có kiểu dữ liệu khác String, cụ thể là isPreium như bài toán đã đưa ra. Do đó ta phải viết lại Property Wrapper này dưới dạng Generic

```Swift
@propertyWrapper
struct Storage<T> {
    private let key: String
    private let defaultValue: T

    init(key: String, defaultValue: T) {
        self.key = key
        self.defaultValue = defaultValue
    }

    var wrappedValue: T {
        get {
            // Read value from UserDefaults
            return UserDefaults.standard.object(forKey: key) as? T ?? defaultValue
        }
        set {
            // Set value to UserDefaults
            UserDefaults.standard.set(newValue, forKey: key)
        }
    }
}
```
Với cách viết Generic này, Storage có thể sử dụng với tất cả các kiểu dữ liệu cơ bản, áp dụng với isPreium tương tự như userName.
Trên thực tế, tuỳ vào bài toán cụ thể, có thể chúng ta không muốn sử dụng tới defaultValue, thay vào đó là để Optional để dễ dàng kiểm tra khi cần thiết. Khi đó, có thể viết lại Storage như sau

```Swift
@propertyWrapper
struct Storage<T> {
    let key: String

    var wrappedValue: T? {
        get {
            return UserDefaults.standard.object(forKey: key) as? T
        }
        set {
            UserDefaults.standard.set(newValue, forKey: key)
        }
    }
}
```

## Áp dụng với Custom Objects
Như đã đề cập ở trên, với cách viết này, UserDefaults Wrapper chỉ có thể hoạt động đúng với các kiểu dữ liệu cơ bản như String, Bool, Int, ... Trên thực tế chúng ta sẽ không lưu đơn lẻ từng thuộc tính như vậy, mà sẽ thường đóng gói thành một class hoặc struct và lưu cả object đó. Để giải quyết vấn đề này, chúng ta sẽ nâng cấp Storage lên một chút, bằng việc conform Codable protocol.
Dữ liệu đầu vào sẽ được encode về JSON và lưu dưới dạng data trong UserDefault. Khi đọc ra sẽ sử dụng JSONDecoder để parse về object mong muốn.
```Swift
@propertyWrapper
struct Storage<T: Codable> {
    private let key: String
    private let defaultValue: T

    init(key: String, defaultValue: T) {
        self.key = key
        self.defaultValue = defaultValue
    }

    var wrappedValue: T {
        get {
            guard let data = UserDefaults.standard.object(forKey: key) as? Data else {
                return defaultValue
            }
            let value = try? JSONDecoder().decode(T.self, from: data)
            return value ?? defaultValue
        }
        set {
            let data = try? JSONEncoder().encode(newValue)
            UserDefaults.standard.set(data, forKey: key)
        }
    }
}
```

Lưu ý: Struct hoặc Class phải được conform Codable Protocol
```Swift
struct AppData {
    @Storage(key: "user_key", defaultValue: User(username: "Xuan Huy", isPremium: true))
    static var user: User
}


struct User: Codable {
    var username: String
    var isPremium: Bool
}
```
Việc đọc, ghi dữ liệu User lúc này sẽ tương tự với các ví dụ trên.

```Swift
override func viewDidLoad() {
   super.viewDidLoad()
   let user = User(username: "Xuan Huy 1", isPremium: true)
   AppData.user = user
   print(AppData.user)
}
```

## Tổng kết
Với việc sử dụng property wrapper được giới thiệu từ Swift 5.1, chúng ta tiết kiệm được khá nhiều dòng code khi khởi tạo một UserDefaults Wrapper. Trên thực tế Storage đã tạo ở trên có thể sử dụng cho bất kì project nào. Hy vọng bạn sẽ sử dụng nó một cách hiệu quả  :+1:

## Nguồn tham khảo
https://medium.com/better-programming/create-the-perfect-userdefaults-wrapper-using-property-wrapper-42ca76005ac8