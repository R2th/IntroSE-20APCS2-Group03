Vấn đề về bảo mật thông tin luôn là khía cạnh quan trọng đối với lập trình phần mềm. Người dùng luôn có mong muốn những thông tin cá nhân, nhạy cảm được bảo mật. Bài viết này sẽ giúp bạn tránh gặp phải một lỗi rất hay gặp về bảo mật những thông tin đó và cách fix chúng.

![](https://images.viblo.asia/43f4a29d-cadb-49a0-93f7-82a5497e7549.jpg)
## UserDefaults không phải là nơi lưu trữ những thông tin nhạy cảm, cần được bảo mật

Đầu tiên những thông tin nhạy cảm là gì? Chúng là những thông tin cá nhân của người dùng, những thông tin về giao dịch, các key hay access tokens, ... Những thông tin này lộ ra có thể ảnh hưởng đến người dùng, cũng như chúng ta (như những thông tin về subscription, ...). Còn về `UserDefaults`, thì chúng là một nơi rất dễ để lưu trữ và lấy thông tin ra và có lẽ vì sự tiện dụng này nên chúng ta nhiều khi lưu những thông tin nhạy cảm vào đây. 
Vậy tại sao nó lại nguy hiểm? Bởi vì chưa cần đến jailbreak, các ứng dụng bên thứ ba cũng có thể cho phép đọc những dữ liệu trong `UserDefaults` một cách dễ dàng

## Keychain services API

![](https://images.viblo.asia/b539d237-e534-4da9-a3dc-e415b996ded3.png)

Vậy khi phát triển chúng ta nên lưu trữ những thông tin nhạy cảm này ở đâu mới đúng? Những dữ liệu lưu trong UserDefaults là những dữ liệu rời rạc, nhỏ, ... để lưu trữ chúng được bảo mật hơn thì Apple có cung cấp cho chúng ta Security services. Keychain services API sẽ giúp chúng ta giải quyết những vấn đề này bằng cách lưu trữ các data này ở trong một `encrypted database` được gọi là Keychain. 

![](https://images.viblo.asia/1bc052eb-4841-4157-8b11-3b7ec5f3c4ad.png)

Dưới đây là một đoạn code sample dùng để lưu trữ mật khẩu vào bên trong `Keychain`
```
func save(_ password: String, for account: String) {
        let password = password.data(using: String.Encoding.utf8)!
        let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                    kSecAttrAccount as String: account,
                                    kSecValueData as String: password]
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else { return print("save error")
    }
```
Keychain service cung cấp một số thuộc tính đặc biệt để chỉ ra những class phù hợp để lưu trữ chúng. `kSecClassGenericPassword` là một trong số đó, keychain services sẽ hiểu rằng items này là password và cần được mã hoá.
`SecItemAdd(_:_:)` là một function cho phép chúng ta thêm một hay nhiều item vào keychain.

Việc lấy lại data cũng giống như việc lưu trữ nó vào vậy. Thay vì dùng `SecItemAdd(_:_:)` chúng ta sẽ dùng `SecItemCopyMatching(_:_:)`, function này sẽ trả về một hoặc nhiều keychain item mà phù hợp với search query. Ngoài ra nó còn copy thuộc tính của những keychain items này.
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

Khá là rắc rối khi lần đầu làm việc với Keychain API, nhưng cũng không cần bối rối lắm nếu bạn chưa quen. Ngoài ra cũng có nhiều thư viện giúp chúng ta sử dụng Keychain API đơn giản hơn.

## Mã hoá thông tin

Ngoài password ra thì cũng có rất nhiều thông tin cần được mã hoá và việc mã hoá bằng tay khá là phức tạp. Chúng ta có thể sử dụng thư viện để hỗ trợ việc này, một trong số đó là [CryptoSwift](https://cryptoswift.io/).

Đây là một đoạn code để lưu password được mã hoá bằng crypto.
```
func saveEncryptedPassword(_ password: String, for account: String) {
    let salt = Array("salty".utf8)
    let key = try! HKDF(password: Array(password.utf8), salt: salt, variant: .sha256).calculate().toHexString()
    keychainService.save(key, for: account)
}
```

## Kết luận
Qua bài viết, mong các bạn có thể tránh việc lưu lại các thông tin nhạy cảm đó dưới `UserDefaults` và cách để lưu trữ an toàn hơn với Keychain cũng như cách mã hoá. 

**References: ** https://medium.com/swift2go/application-security-musts-for-every-ios-app-dabf095b9c4f