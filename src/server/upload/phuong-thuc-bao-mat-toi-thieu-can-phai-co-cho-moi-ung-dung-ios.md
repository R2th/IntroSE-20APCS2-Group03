Bảo mật ứng dụng của bạn là một trong những khía cạnh quan trọng nhất của phát triển phần mềm.

Người dùng ứng dụng của chúng ta hy vọng rằng các thông tin của họ đang được giữ một cách riêng tư và an toàn.

Trong bài viết này, chúng ta sẽ thảo luận những sai lầm mà các nhà phát triển thực hiện đối với bảo mật ứng dụng và cách khắc phục chúng.

## Lưu trữ dữ liệu nhạy cảm ở sai vị trí
Tôi đã nghiên cứu nhiều ứng dụng từ AppStore và nhiều ứng dụng trong số đó đang thực hiện cùng một lỗi, lưu trữ dữ liệu nhạy cảm ở nơi chúng không thuộc về.

Nếu bạn đang lưu trữ những dữ liệu nhạy cảm đó trong *UserDefaults*, thì bạn đang mạo hiểm thông tin của người dùng.

*UserDefaults* được lưu trữ đơn giản như một tệp danh sách các thuộc tính nằm bên trong thư mục *Preferences* ở trong ứng dụng của bạn. Chúng được lưu trong ứng dụng của chúng ta mà không bị mã hóa dưới bất kì hình thức nào.

Về cơ bản, bằng cách sử dụng ứng dụng của bên thứ ba của hệ điều hành *macOS* ví dụ như *iMazing*, thậm chí không cần phải *Jailbreak* thiết bị của bạn, bạn có thể dễ dàng xem dữ liệu *UserDefaults* cho bất kỳ ứng dụng nào được tải xuống từ *AppStore*.

Các ứng dụng trên *macOS* này được thiết kế đơn giản để cho phép bạn khám phá và quản lý các tệp ứng dụng của bên thứ ba trên iPhone của bạn. Và bạn có thể dễ dàng khám phá *UserDefaults* của bất kỳ ứng dụng nào.

Lý do khiến tôi viết bài này là tôi đã phát hiện ra rằng rất nhiều ứng dụng mà tôi đã cài đặt từ AppStore đang lưu dữ liệu nhạy cảm của tôi vào *UserDefaults*.

Có thể lấy ví dụ như *Access Tokens*, Số lượng tiền trong game, v.v.

Tất cả các dữ liệu này có thể dễ dàng lấy ra và thay đổi qua đó gây thiệt hại cho các ứng dụng, từ việc sử dụng miễn phí các tính năng trả tiền để hack hệ thống và nhiều điều khác nữa.

## Cách đúng để làm điều đó
You can also store items like the  and  that you manage with Certificate, Key, and Trust Services.

Bạn nên luôn ghi nhớ một điều khi lưu dữ liệu trên ứng dụng iOS, *UserDefaults* được thiết kế chỉ để lưu trữ một lượng nhỏ dữ liệu như sở thích của người dùng, cài đặt đơn giản bên trong ứng dụng, những thứ hoàn toàn không nhạy cảm.

Để lưu các dữ liệu nhạy cảm của ứng dụng, chúng ta nên sử dụng các dịch vụ bảo mật do Apple cung cấp.

*Keychain API* giúp bạn giải quyết những vấn đề này bằng cách cung cấp cho ứng dụng của bạn một cách để lưu trữ lượng dữ liệu nhỏ của người dùng trong cơ sở dữ liệu được mã hóa có tên là *keychain*.

Trong *keychain*, bạn được tự do lưu mật khẩu và các bí mật khác mà người dùng quan tâm một cách rõ ràng, chẳng hạn như thông tin thẻ tín dụng hoặc thậm chí những dòng ghi chú nhạy cảm ngắn.

![](https://images.viblo.asia/a1809732-1acc-4108-b2d3-d5665c320ec1.png)

## Keychain Services API
Dưới đây mình sẽ mô tả cách bạn có thể lưu mật khẩu của người dùng của bạn bên trong *keychain*.

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

Ở trong dictionary mình có phần kSecClass: kSecClassGenericPassword cho biết mục đó là mật khẩu, từ đó *keychain api* hiểu rằng dữ liệu yêu cầu được mã hóa.

Sau đó, chúng ta thêm mật khẩu mới vào *keychain* bằng cách gọi *SecItemAdd* với truy vấn mà chúng ta vừa tạo.

Lấy dữ liệu tương tự:

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

Chúng ta có thể viết một unit test đơn giản để đảm bảo rằng dữ liệu được lưu và truy xuất chính xác

```
func testPaswordRetrive() {
    let  password = "123456"
    let account = "User"
    keyChainService.save(password, for: account)
    XCTAssertEqual(keyChainService.retrivePassword(for: account), password)
}
```

*Keychain API* có vẻ hơi phức tạp khi sử dụng lần đầu tiên nếu bạn phải lưu nhiều hơn một mật khẩu, mình khuyến khích bạn dùng *facade pattern* giúp bạn lưu và sửa đổi dữ liệu theo cách tốt nhất tùy thuộc vào trường hợp sử dụng ứng dụng của bạn.

Nếu bạn muốn biết thêm về *facade pattern* và cách tạo một wrappers đơn giản cho các hệ thống con phức tạp, thì [bài viết](https://medium.com/swift2go/simplifying-ios-code-by-using-design-patterns-e51e4bc7eaf5) này có thể giúp bạn rất nhiều.

Ngoài ra, có rất nhiều thư viện mã nguồn mở giúp việc sử dụng API Keychain đơn giản hơn. Một số trong số đó là [SAMKeychain](https://cocoapods.org/pods/SAMKeychain) và [SwiftKeychainWrapper](https://github.com/jrendel/SwiftKeychainWrapper).

## Lưu mật khẩu và thực hiện việc xác thực

Rất nhiều lần Nhà phát triển lưu mật khẩu chưa qua mã hoá trên ứng dụng để sử dụng lại hoặc gửi login request trực tiếp bằng tên người dùng và mật khẩu.

Nếu bạn đang lưu trữ mật khẩu trực tiếp trong *UserDefault* thì bạn nên biết bây giờ bạn có rất nhiều rủi ro từ thông tin được cung cấp trong phần đầu tiên của bài viết này.

Lưu mật khẩu vào *Keychain* đảm bảo an ninh ở mức độ tốt hơn nhưng sau đó, chúng ta luôn phải lưu mật khẩu và thông tin nhạy cảm khác vào khóa hoặc ở nơi khác bằng cách mã hóa chúng.

Giả sử kẻ tấn công có thể hack thông qua bảo mật *keychain* hoặc tấn công chúng ta thông qua qua network của chúng ta, từ đó kẻ đó có thể truy xuất trực tiếp mật khẩu của chúng ta dưới dạng văn bản thô.

Cách tiếp cận tốt hơn là lưu trữ mật khẩu và sử dụng chúng cho các yêu cầu đăng nhập dưới dạng băm được tạo cho mật khẩu này.

## Mã hóa dữ liệu nhạy cảm

Việc tự thực hiện việc băm có thể thực sự phức tạp và quá mức cần thiết, vì vậy trong bài viết này, chúng ta sẽ sử dụng sự trợ giúp của một thư viện mã nguồn mở của iOS *CryptoSwift*.

*CryptoSwift* là một bộ sưu tập các thuật toán mã hóa tiêu chuẩn và an toàn được thực hiện trong Swift và được cập nhật thường xuyên.

Hãy thử lưu và lấy lại mật khẩu trên *keychain* bằng cách sử dụng các thuật toán được cung cấp bởi *CryptoSwift*.

```
func saveEncryptedPassword(_ password: String, for account: String) {
    let salt = Array("salty".utf8)
    let key = try! HKDF(password: Array(password.utf8), salt: salt, variant: .sha256).calculate().toHexString()
    keychainService.save(key, for: account)
}
```

Phương thức này có một tài khoản và mật khẩu và lưu một chuỗi băm trên *Keychain* thay vì một chuỗi trực tiếp.

Chúng tôi tạo ra *salt* để làm cho việc tấn công trở nên khó khăn hơn.

Nếu chúng ta chỉ băm nhỏ mật khẩu của mình, hacker có thể có danh sách các mật khẩu được sử dụng nhiều nhất và tạo các hash của chúng và so sánh chúng với mật khẩu đã tạo của chúng ta. Và sau đó có thể dễ dàng tìm thấy mật khẩu của chúng ta cho một tài khoản nhất định.

Bây giờ chúng ta có thể xác thực với máy chủ bằng tài khoản của chúng ta và khóa thay vì mật khẩu trực tiếp.

```
authManager.login(key, user)
```

Dĩ nhiên ứng dụng và máy chủ nên chia sẻ cùng một *salt*. *Backend* sau đó sẽ phải so sánh các khóa tương tự được tạo bằng cách sử dụng cùng một thuật toán để xác minh người dùng.

Bằng cách sử dụng cách tiếp cận này, chúng ta đảm bảo được an toàn và khiến việc tấn công ứng dụng trở thành một nhiệm vụ rất phức tạp.

## Kết luận

Việc triển khai bảo mật cho các ứng dụng của phải là một nhiệm vụ bắt buộc.

Trong bài viết này, chúng ta đã thảo luận các vấn đề có thể phát sinh từ việc lưu dữ liệu nhạy cảm vào *UserDefaults*. Chúng ta đã thảo luận tại sao bạn phải lưu chúng trên *Keychain* để tránh kẻ tấn công dễ dàng xem chúng cũng như nói nhiều hơn về việc bảo mật cho cấp độ tiếp theo bằng cách lưu dữ liệu nhạy cảm bằng cách mã hóa và cũng thảo luận cách để giao tiếp với máy chủ khi chia sẻ dữ liệu nhạy cảm.

Bài viết tham khảo: https://medium.com/swift2go/application-security-musts-for-every-ios-app-dabf095b9c4f