Bảo mật ứng dụng là một trong những khía cạnh quan trọng nhất của phát triển phần mềm.
Người dùng ứng dụng luôn hy vọng rằng những thông tin của họ được bảo mật. 

Trong bài viết này, sẽ thảo luận về những lỗi mà các nhà phát triển hay mắc phải đối với bảo mật ứng dụng và cách để dễ dàng sửa chúng.

## Lưu trữ dữ liệu quan trọng ở những vị trí sai
Tôi đã nghiên cứu nhiều ứng dụng từ AppStore và rất nhiều trong số chúng đang mắc lỗi này, lưu trữ dữ liệu quan trọng ở những nơi không nên.
Nếu bạn đang lưu trữ dữ liệu quan trọng trong `UserDefaults`, thì bạn đang khá mạo hiểm với thông tin của ứng dụng.

`UserDefaults` được lưu trữ đơn giản dưới dạng tệp danh sách các thuộc tính được đặt trong thư mục `Preferences` của ứng dụng. Nó được lưu trong ứng dụng mà không bị mã hóa bởi bất kỳ hình thức nào.

Về cơ bản, bằng cách sử dụng ứng dụng trên mac của bên thứ ba như iMazed chẳng hạn, thậm chí không cần phải Jailbreak thiết bị, bạn có thể dễ dàng xem dữ liệu `UserDefaults` cho bất kỳ ứng dụng nào được tải xuống từ AppStore.

Các ứng dụng trên mac này được thiết kế đơn giản để cho phép bạn khám phá và quản lý các tệp ứng dụng có trên iPhone của bạn. Và bạn có thể dễ dàng khám phá `UserDefaults` của bất kỳ ứng dụng nào.

Lý do thúc đẩy tôi viết bài viết này là vì tôi phát hiện ra rằng rất nhiều ứng dụng mà tôi đã cài đặt từ AppStore lưu dữ liệu quan trọng trên `UserDefaults`.

Ví dụ như: Access Tokens, Active Renewable, subscription flags, số lượng coin có sẵn, v.v.
Tất cả dữ liệu này có thể dễ dàng truy xuất và thay đổi và gây thiệt hại cho các ứng dụng, từ việc sử dụng miễn phí các tính năng trả phí đến hack lớp network và nhiều hơn nữa.

## Cách làm đúng đắn
Bạn nên luôn luôn ghi nhớ một điều khi lưu dữ liệu trên ứng dụng iOS, `UserDefaults` chỉ được thiết kế để lưu một lượng nhỏ dữ liệu như các tùy chỉnh của người dùng trong ứng dụng, những thứ hoàn toàn không quan trọng.

Để lưu dữ liệu quan trọng trong ứng dụng, chúng tôi khuyên nên sử dụng các dịch vụ bảo mật do Apple cung cấp.

Keychain Services API giúp bạn giải quyết những vấn đề này bằng cách cung cấp cho ứng dụng cách lưu trữ một lượng nhỏ dữ liệu người dùng trong cơ sở dữ liệu được mã hóa, gọi là `Keychain`.

Trong `Keychain`, bạn có thể tự do lưu mật khẩu và các dữ liệu quan trọng khác của người dùng, chẳng hạn như thông tin thẻ tín dụng hoặc thậm chí các ghi chú nhạy cảm ngắn.

Bạn cũng có thể lưu trữ các mục như mật mã khóa và các Certificate, Trust Services.

![](https://images.viblo.asia/e172fcc3-e1f4-4dcb-af15-84428eb6b4f9.png)

## Keychain Services API

Dưới đây chúng tôi sẽ mô tả cách bạn có thể lưu mật khẩu của người dùng bên trong `Keychain`.

```
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

`kSecClass: kSecClassGenericPassword` chỉ ra rằng mục đó là mật khẩu, từ đó keychain service hiểu rằng dữ liệu yêu cầu mã hóa.
Sau đó, thêm mật khẩu mới vào keychain bằng cách gọi `SecItemAdd` với `query` đã tạo.
Lấy dữ liệu cũng tương tự:

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

Chúng tôi viết một bài kiểm tra đơn giản để đảm bảo rằng dữ liệu được lưu và truy xuất chính xác

```
func testPaswordRetrive() {
    let  password = "123456"
    let account = "User"
    keyChainService.save(password, for: account)
    XCTAssertEqual(keyChainService.retrivePassword(for: account), password)
}
```

Ngoài ra, có rất nhiều thư viện open source giúp việc sử dụng API Keychain đơn giản hơn. Một số trong số họ là `SAMKeychain` và `SwiftKeychainWrapper`.

## Mã hóa dữ liệu nhạy cảm

Việc tự thực hiện hash có thể rất phức tạp và quá mức cần thiết, vì vậy trong bài viết này, chúng tôi sẽ sử dụng sự trợ giúp của Thư viện mã hóa mã nguồn mở  `CryptoSwift`.

`CryptoSwift` là một bộ sưu tập ngày càng tăng các thuật toán mã hóa tiêu chuẩn và vô cùng an toàn được triển khai trong Swift.

Chúng ta hãy cố gắng lưu và lấy lại mật khẩu trên `keychain` bằng cách sử dụng các thuật toán được cung cấp bởi `CryptoSwift`.

```
func saveEncryptedPassword(_ password: String, for account: String) {
    let salt = Array("salty".utf8)
    let key = try! HKDF(password: Array(password.utf8), salt: salt, variant: .sha256).calculate().toHexString()
    keychainService.save(key, for: account)
}
```

Phương pháp này lấy một tài khoản và mật khẩu và lưu chuỗi đã xử lý trên Keychain thay vì chuỗi trực tiếp.

Chúng tôi tạo ra `salt` để khiến tin tặc khó khăn hơn khi tấn công ứng dụng.
Nếu chúng tôi chỉ hash mật khẩu của mình, tin tặc có thể có một danh sách các mật khẩu được sử dụng nhiều nhất và tạo hash của chúng, so sánh chúng với mật khẩu đã tạo. 
Sau đó có thể dễ dàng tìm thấy mật khẩu cho một tài khoản nhất định.
Bây giờ chúng tôi có thể xác thực với máy chủ bằng tài khoản và custom key thay vì mật khẩu trực tiếp.

```
authManager.login(key, user)
```

Tất nhiên, ứng dụng và máy chủ nên chia sẻ cùng một loại `salt`. Sau đó, sẽ phải so sánh các khóa giống nhau bằng cách sử dụng cùng một thuật toán để xác minh người dùng.
Bằng cách sử dụng phương pháp này, chúng tôi đưa bảo mật lên một tầm cao mới và khiến việc tấn công ứng dụng của chúng tôi trở thành một nhiệm vụ cực kỳ phức tạp.

## Tóm lại
Triển khai bảo mật cho các ứng dụng nên là một nhiệm vụ không bao giờ được bỏ qua.

Ban đầu, trong bài viết này, chúng tôi đã thảo luận các vấn đề có thể phát sinh từ việc lưu dữ liệu nhạy cảm vào `UserDefaults`,  lý do tại sao bạn phải lưu chúng trên `Keychain` để tránh các hacker dễ dàng xem chúng.

Trong phần thứ hai, chúng tôi đã nói nhiều hơn về việc đưa bảo mật lên cấp độ tiếp theo bằng cách mã hóa dữ liệu nhạy cảm trước khi lưu, sử dụng dữ liệu đã mã hóa để tương tác cùng server.

Cảm ơn bạn đã theo dõi bài viết này, mong nó bổ ích với tất cả các bạn.

Nguồn: medium.com