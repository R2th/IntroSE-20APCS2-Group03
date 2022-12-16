Nói sơ qua Codable, Codable là một API, được giới thiệu trong swift 4, cho phép chúng ta tận dụng compiler tạo ra nhiều code dùng để encode và decode dữ liệu đến/ từ kiểu serialized như JSON.<br>

Codable là sự kết hợp của 2 protocols: Encodable và Decoable. Bằng việc conform mấy protocols này khi khai báo kiểu, compiler sẽ tự động tổng hợp code được yêu cầu để encoding/ decoding một thực thể của kiểu đó... ví dụ:
```
struct User: Codable {
    var name: String
    var age: Int
}
```

Giờ chúng ta có thể encode thực thể user thành JSON Data bằng việc sử dụng JSONEncoder:
```
do {
    let user = User(name: "John", age: 31)
    let encoder = JSONEncoder()
    let data = try encoder.encode(user)
} catch {
    print("Whoops, an error occured: \(error)")
}
```

Để decode trở lại thành thực thể User, chúng ta sử dụng JSONDecoder
```
let decoder = JSONDecoder()
let secondUser = try decoder.decode(User.self, from: data)
```

**Ví dụ: Gán các giá trị khác nhau vào cùng một thuộc tính**
<br>
Giả sử ta có app gửi một yêu cầu để lấy thông tin header dùng để hiển thị trên màn hình:<br>
```
struct HeaderInformation: Decodable {
    let title: String
    let imageUrl: String
    var textColor: UIColor {
        return .black
    }
}
```
Nếu chúng ta muốn textColor mỗi màn hình mỗi khác ví dụ: header ở màn hình Home thì có text màu xanh, còn ở màn hình Profile màu đỏ...<br>
Thì sẽ có nhiều cách để thực hiện nhưng với Codable thì nó cho phép ta cung cấp context tới JSONDecoder/JSONEncoder thông qua thuộc tính userInfo:
```
open var userInfo: [CodingUserInfoKey : Any]
```
CodingUserInfoKey là một String enum RawRepresentable, vì thế ta có thể thêm bất kể dữ liệu vào userInfo. Và khi xong thì các giá trị cùng userInfo sẽ có thể được truy cập như một phần của thực thể Decoder/Encoder:
```
struct HeaderInformation: Decodable {
    let title: String
    let imageUrl: String
    let textColor: UIColor

    static var textColorUserInfoKey: CodingUserInfoKey {
        return CodingUserInfoKey(rawValue: "textColor")!
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        title = try container.decode(String.self, forKey: .title)
        imageUrl = try container.decode(String.self, forKey: .imageUrl)

        textColor = decoder.userInfo[Self.textColorUserInfoKey] as? UIColor ?? .black
    }
}
```
Để chạy ta chỉ cần điền userInfo dictionary trước khi decode dữ liệu.
```
let decoder = JSONDecoder()

decoder.userInfo[HeaderInformation.textColorUserInfoKey] = UIColor.red

let headerInfo = decoder.decode(HeaderInformation.self, from: data)
```

CodingUserInfoKey yêu cầu force - unwrapping bởi vì nó là RawRepresentable, nhưng sẽ ko trả về kết quả bị crash. Ta tạo thêm extension nhận param là một kiểu String như sau:
```
extension Decoder {
    func getContext(forKey key: String) -> Any? {
        let infoKey = CodingUserInfoKey(rawValue: key)!
        return userInfo[infoKey]
    }
}

extension JSONDecoder {
    func set(context: Any?, forKey key: String) {
        let infoKey = CodingUserInfoKey(rawValue: key)!
        userInfo[infoKey] = context
    }
}
```

Bây giờ ta có thể sử dụng kiểu CodingKeys riêng như key của userInfo:
```
let key = HeaderInformation.CodingKeys.textColor.stringValue
decoder.set(context: UIColor.red, forKey: key)
//
textColor = decoder.getContext(forKey: CodingKeys.textColor.stringValue)
```

reference: https://swiftrocks.com/swift-codable-decodingencoding-with-context.html