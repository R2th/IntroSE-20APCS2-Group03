# Giới thiệu
Bảo mật thông tin là một tác vụ hết sức quan trọng trong quá trình phát triển ứng dụng.
Người dùng luôn muốn những dữ liệu cá nhân của mình được quản lý và bảo vệ.
Trong bài viết này sẽ đề cập tới các lỗi thường gặp trong bảo mật thông tin và các cách đơn giản để khắc phục

# Lưu trữ thông tin cá nhân ở sai chỗ
Đây là một lỗi thường gặp khi ta lưu thông tin cá nhân ở sai chỗ.

Thông thường mọi người thường sẽ lưu các thông tin cá nhân vào trong **UserDefaults**.
UserDefaults đơn thuần là một file **property list** được lưu trữ trong thư mục **Preferences** của ứng dụng, và hoàn toàn không được mã hóa.

Về cơ bản, ta hoàn toàn có thể sử dụng các ứng dụng của hãng thứ 3 như iMazing, mà không cần phải Jailbreak thiết bị vẫn có thể đọc thông tin trong **UserDefaults**

# Lưu thông tin đúng chỗ
Như đã đề cập ở trên, UserDefaults được thiết kế nhằm mục địch để lưu trữ dữ liệu với kích thước nhỏ và không nhạy cảm như  thông tin cấu hình của người dùng trong ứng dụng.

Để lưu trữ các thông tin nhạy cảm như thông tin người dùng, thông tin tài khoản, ta nên sử dụng các công cụ Bảo mật của Apple.

Trong bài viết này ta sẽ sử dụng Keychains service API để lưu trữ các thông tin nhạy cảm, mã hóa dữ liệu và lưu trữ trong cơ sở dữ liệu. Ta hoàn toàn có thể sử dụng Keychain để lưu trữ các thông tin như thông tin thẻ ngân hàng, thông tin các nhân...

Chúng ta cũng có thể dùng Keychains để lưu trữ  các khóa mã hóa, các chứng chỉ số được quản lý với Certificate, Key và Trust Services.
![](https://images.viblo.asia/d287d1da-5f01-4304-af04-f973471f6b37.png)

# Keychain Service API
Đoạn code dưới đây mô tả các bước để lưu trữ mật khẩu sử dụng Keychain
```swift
class KeychainService {
    func save(_ password: String, for account: String) {
        let password = password.data(using: String.Encoding.utf8)!
        let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                    kSecAttrAccount as String: account,
                                    kSecValueData as String: password]
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else { return print("save error")
    }
}
```

Từ khóa **kSecClass:kSecClassGenericPassword** chỉ ra rằng thông tin lưu trữ là một mật khẩu, và cần phải mã hóa khi lưu trữ

Ta sẽ thêm item mới vào Keychain bằng cách gọi hàm **SecItemAdd **

Và để lấy dữ liệu đã lưu trữ ta có thể dùng đoạn code sau:
```
func retrivePassword(for account: String) -> String? {
    let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                kSecAttrAccount as String: account,
                                kSecMatchLimit as String: kSecMatchLimitOne,
                                kSecReturnData as String: kCFBooleanTrue]

    var retrivedData: AnyObject? = nil
    let _ = SecItemCopyMatching(query as CFDictionary, &retrivedData)

    guard let data = retrivedData as? Data else {return nil}
    return String(data: data, encoding: String.Encoding.utf8)
}
```

Để đảm bảo dữ liệu khi lưu trữ và lấy ra là chính xác, ta có thể kiểm tra bằng đoạn chương trình dưới đây
```swift
func testPaswordRetrive() {
    let  password = "123456"
    let account = "User"
    keyChainService.save(password, for: account)
    XCTAssertEqual(keyChainService.retrivePassword(for: account), password)
}
```

Việc sử dụng Keychain API sẽ khá phức tạp khi ta sử dụng các kiểu lưu trữ khác mà không phải là Password. Ta có thể dùng các thư viện như **SAMKeychain** và **SwiftKeychainWrapper** để việc sử dụng KeyChain được dễ dàng hơn.

# Lưu trữ mật khẩu và xử lý xác thực người dùng.
Đối với các ứng dụng có yêu cầu đăng nhập, xác thực người dùng khi sử dụng, ta cần phải sử dụng mật khẩu để thực hiện quá trình xác thực.

Như đã đề cập ở các mục trên, mật khẩu của ứng dụng đã được lưu trữ bằng Keychain, nhưng ta vẫn có nguy cơ để lộ mật khẩu này khi hacker bẻ khóa thành công Key chain hoặc tấn công mạng (như tấn công **man - in - middle**).

Để tránh nguy cơ này, ta nên xây dựng một quy tắc mã hóa dữ liệu riêng thông qua các phương pháp mã khóa đã có sẵn, và sử dụng phương thức này để mã hóa các dữ liệu nhạy cảm trước khi lưu trữ trong keychain, hoặc gửi qua giao thức mạng.

# Mã hóa các dữ liệu mật
Ta có thể xây dựng các quy tắc mã hóa riêng thông qua các phương thức mã hóa sẵn có.
Để tiện cho việc sử dụng các phương pháp mã hóa sẵn có, ta có thể sử dụng thư viện CryptoSwift.

Ví dụ như đoạn code dưới đây sẽ băm mật khẩu, sau đó lưu trữ trong Keychain thay vì lưu trữ trực tiếp mật khẩu gốc.
```swift
func saveEncryptedPassword(_ password: String, for account: String) {
    let salt = Array("salty".utf8)
    let key = try! HKDF(password: Array(password.utf8), salt: salt, variant: .sha256).calculate().toHexString()
    keychainService.save(key, for: account)
}
```

Giải thích rõ hơn về đoạn code trên:
- Salt: là chuỗi dùng để mã hóa, nó sẽ khiến cho hacker khó khăn hơn khi tìm cách giải mã.
- sha256: sử dụng phương thức băm SHA-2
- HKDF là hàm băm dữ trên phương thức thức HMAC.

# Nguồn tham khảo
- Nguồn tham khảo: https://medium.com/swift2go/application-security-musts-for-every-ios-app-dabf095b9c4f