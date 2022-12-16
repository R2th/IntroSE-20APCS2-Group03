# Lời nói đầu
Như chúng ta đã biết, bảo mật là một trong những khía cạnh quan trọng nhất trong phát triển phần mềm. Và khi người dùng sử dụng ứng dụng, đồng nghĩa với việc họ đang đặt trọn niềm tin cũng như sự kì vọng của mình vào các lập trình viên, rằng dữ liệu của họ luôn được đảm bảo riêng tư. 

Để không phụ niềm tin và sự kì vọng ấy, chúng ta nên có một cách thức nào đấy để làm cho dữ liệu của mình ít nhất không thể an toàn tuyệt đối, thì chí ít cũng phải để cho những phần tử phá hoại phải mất công động não, lao tâm khổ tứ một chút. ;)

May mắn thay, cho người dùng và cũng cho các lập trình viên, trong bài viết nay tôi sẽ đề cập đến sai lầm thường gặp trong việc bảo mật dữ liệu trong ứng dụng và một số cách để khắc phục điều này.

# Sai lầm thứ nhất: Lưu dữ liệu nhạy cảm "nhầm" chỗ

Là một người làm app, và cũng clone app khá nhiều - thỉnh thoảng tôi thường dạo quanh Apple Store ngắm nghía một vài app và nhận ra rằng: Có rất nhiều ứng dụng đã và đang lặp đi lặp lại một lỗi rất phổ biến đó là lưu trữ dữ liệu nhạy cảm không đúng nơi đúng chỗ - lưu dữ liệu ngay tại UserDefault.

UserDefault là một nơi cực kì tiện mà các lập trình viên iOS thường sử dụng để lưu dữ liệu, tuy nhiên thực chất nó chỉ là một tệp chứa danh sách các thuộc tính dưới dạng key-value được đặt trong thư mục Preferences của ứng dụng. Và đương nhiên là nó không được mã hóa dưới bất kì hình thức nào. 

Về cơ bản bằng cách sử dụng một vài ứng dụng bất kì của bên thứ 3 là ta có thể dễ dàng xem được dữ liệu bên trong UserDefault của bất kì ứng dụng nào tải về từ Apple Store mà không cần phải JailBreak thiết bị - một ví dụ đó là ứng dụng [iMazing](https://imazing.com)

Lý do tôi viết bài này vì nhận ra rằng có rất nhiều ứng dụng đã và đang mắc phải sai lầm này, một số dữ liệu nhạy cảm được lưu trong UserDefault có thể bao gồm: access token, renewable subscription flag, số coin/tiền trong tài khoản (app/game), trạng thái đã mua một số vật phẩm (yes/no),...

Tất cả các dữ liệu này có thể bị truy cập, bị thay đổi bất cứ lúc nào và gây ra thiệt hại cho ứng dụng, bằng việc sử dụng một cách miễn phí các tính năng được trả phí hoặc nhiều hơn thế nữa.

## Giải pháp:

Chúng ta phải luôn ghi nhớ rằng UserDefault được thiết kế chỉ để lưu một vài dữ liệu đơn giản vô thưởng vô phạt kiểu như: có nên hiển thị màn tutorial không hay sở thích của người dùng là gì, nên hiển thị màn hình nào lần đầu khởi động app,..

Để lưu trữ các dữ liệu nhạy cảm, đòi hỏi tính bảo mật cao chúng ta nên sử dụng các phương thức mà Apple recommend mà KeyChain là một ví dụ. KeyChain giúp chúng ta giải quyết vấn đề này bằng cách cung cấp cho ta một cách để lưu trữ một lượng dữ liệu nhỏ trong cơ sở dữ liệu được mã hóa của hệ thống được gọi là keychain.

![](https://images.viblo.asia/4f3e8d2a-997d-43ca-8f4b-a65500c1af58.png)

## Keychain Services API

Dưới đây là cách mà chúng ta lưu mật khẩu của người dùng trong Keychain:

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

Với keyword `kSecClassGenericPassword` hệ thống sẽ  hiểu rằng đây là dữ liệu kiểu mật khẩu và tiến hành mã hóa. Sau đó chúng ta sử dụng `SecItemAdd()` để lưu dữ liệu vào Keychain với query đã tạo ở bước trước đó.

Cách lấy mật khẩu ra rất đơn giản:

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

Chúng ta có thể viết một đoạn code test nho nhỏ để kiểm tra việc lưu vào và lấy ra có đúng như ý muốn hay không như sau:

```
func testPaswordRetrive() {
    let  password = "123456"
    let account = "User"
    keyChainService.save(password, for: account)
    XCTAssertEqual(keyChainService.retrivePassword(for: account), password)
}
```

Nếu bạn thấy việc sử dụng Keychain hơi phức tạp thì có rất nhiều mã nguồn mở trên Gihub sẵn sáng giúp bạn giải quyết vấn đề này, trong đó có [SAMKeychain](https://github.com/soffes/samkeychain) và [SwiftKeychainWrapper](https://github.com/jrendel/SwiftKeychainWrapper)

# Sai lầm thứ hai: Lưu mật khẩu và xác thực

Một sai lầm nữa thường được lặp đi lặp lại đó là việc lập tình viên lưu lại mật khẩu trong app dưới dạng mật khẩu gốc hoặc tiến hành request API bằng username và mật khẩu gốc.

Nếu bạn đang lưu mật khẩu bằng Keychain tuy có tốt hơn việc lưu trong UserDefault một chút nhưng lời khuyên là luôn phải lưu chúng lại dưới dãng đã được mã hóa bước đầu. 

Giả sử cho dù hacker có hack thành công vào Keychain hoặc bắt được gói tin chúng ta gửi đi khi login thì dữ liệu mà chúng nhận được cũng là dữ liệu đã bị mã hóa.

Một cách đơn giản cho việc mã hóa bước đầu dữ liệu là tiến hành lưu chúng lại dưới dạng dữ liệu băm (hash).

## Mã hóa dữ liệu nhạy cảm:
Chúng ta có thể sử dụng một mã nguồn mở có tên [CryptoSwift](https://cryptoswift.io/) để băm các dữ liệu mà chúng ta cho là nhạy cảm cần được mã hóa. Cách sử dụng rất là đơn giản:

```
func saveEncryptedPassword(_ password: String, for account: String) {
    let salt = Array("salty".utf8)
    let key = try! HKDF(password: Array(password.utf8), salt: salt, variant: .sha256).calculate().toHexString()
    keychainService.save(key, for: account)
}
```

Phương thức trên nhận chuỗi username và password và lưu chúng vào keychain dưới dạng một chuỗi mã hash thay vì lưu trực tiếp dữ liệu thô. Có thể hiểu như sau:
`salt`: là một chuỗi duy nhất dùng để trộn vào chuỗi password
`.sha256` là phương thức băm
`HKDF` là [hàm dẫn xuất](https://en.wikipedia.org/wiki/Key_derivation_function) dựa trên  [hash-based message authentication code](https://en.wikipedia.org/wiki/HMAC)

`salt` đơn giản là để hacker gặp khó khăn hơn trong việc giải mã dữ liệu. Vì nếu không có salt, với một máy tính cấu hình mạnh và một bộ dữ liệu lớn chứa các mật khẩu thường dùng, hacker có thể ngược từ mã hash ra mật khẩu. 

Bây giờ chúng ta có thể tiến hành request lên server với key đã được mã hóa như sau:

```
authManager.login(key, user)
```

Tất nhiên là phía client và server phải dùng cùng một mã `salt` và phương thức băm để có thể giải mã ra dữ liệu đồng nhất. 

Bằng cách áp dụng phương pháp này, chúng ta đã đưa ứng dụng của mình lên một tầm cao mới của sự bảo mật, tuy không thể đảm bảo 100% là ứng dụng sẽ không thể bị hack, nhưng cũng đã làm cho việc hack ứng dụng khó khăn hơn rất nhiều.

# Kết

Việc triển khai bảo mật cho ứng dụng là việc không thể bỏ qua, nhất là với lập trình viên, những người luôn đề cao đạo đức nghề nghiệp kèm theo lời thề hypocrat, à quên, hypocrat là lời thề của bác sĩ, trình viên làm gì có lời thề gì, với cả bác sĩ họ có lời thề hẳn hoi mà còn ... nữa là chúng ta =))

Trong khuôn khổ hai ngày lương, à lại nhầm, trong khuôn khổ của bài viết này, tôi đã đề cập một cách ngắn gọn về hai vấn đề bảo mật mà các lập trình viên iOS hay mắc phải và các giải pháp cho vấn đề này. Hy vọng đã phần nào giúp các bạn có cái nhìn thẳng thắn hơn trong việc giữ gìn tính bảo mật cho thông tin user.

Nếu các bạn có bất kỳ ý kiến/ comment/ góp ý nào đừng ngại để lại comment/like bên dưới bài viết, đây là niềm động lực to lớn cho những người viết bài chúng tôi, khi mà áp lực hai ngày lương luôn đè nặng trong tâm trí đôi khi khiến các bài viết mất đi cái tâm và sự chỉnh chu - thứ mà một bài viết không thể thiếu.

Nói thêm một chút, trong bài viết trước (là [bài này)](https://viblo.asia/p/lam-the-nao-de-yeu-cau-truy-cap-cameraphotonotification-trong-app-ios-mot-cach-hop-ly-RQqKLANMZ7z) hình như tôi có đề cập đến việc sẽ có một bài viết nói thêm về việc áp dụng tính năng thử nghiệm trên một nhóm user nhất định, hãy để lại ý kiến của mình để tôi biết liệu bạn có quan tâm đến vấn đề này hay không cũng như để tăng tương tác. 

Thân ái và chúc các bạn có một ngày vui vẻ.