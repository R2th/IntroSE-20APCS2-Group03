Singleton như vũ khí toàn năng mà hiệu quả và sự đảm bảo của dữ liệu trong runtime.

![](https://images.viblo.asia/28c15a19-ca6e-4b93-b8d3-22fb35f8b6c0.png)


Ví dụ mỗi chúng ta là Lớp Singleton. Bạn là duy nhất và chỉ tồn tại một. Điều này có nghĩa là, nếu tôi nói cho bạn một bí mật, bạn sẽ trả lại chính xác cho tôi khi tôi hỏi bạn . Bài viết này được chia thành hai phần. Đầu tiên, chúng ta sẽ xem xét cách tạo và sử dụng Lớp Singleton trong Swift, và thứ hai, chúng ta sẽ xem xét một số trường hợp sử dụng và kịch bản, nơi chúng ta sử dụng Lớp Singleton.

### Khởi tạo lớp Singleton
``` swift
class ManagerYou {
    public static let shared = ManagerYou()
}
``` 
Đó là cách dễ dàng để thiết lập một lớp singleton trong Swift. Hãy thêm thông số đầu tiên của chúng tôi vào đó nhé:
``` swift
class ManagerYou {
    public static let shared = ManagerYou()
    public var coolValue = "test"
}
``` 

Bây giờ hãy thử truy cập singleton từ ứng dụng của chúng ta và lấy và thay đổi "bài kiểm tra".

``` swift
ManagerYou.shared.coolValue             // get the "test"
ManagerYou.shared.coolValue = "tested"  // change "test" to "tested"
``` 

Thật đơn giản để tạo và sử dụng Singleton. Giờ chúng ta hãy cùng tìm hiểu các usecase của nó nhé:

### Usecase #1: UserManager
Với mọi dự án tôi đã làm, luôn có nhu cầu lưu trữ một số dữ liệu người dùng (điều này không có nghĩa là nó được đồng bộ hóa với máy chủ). Singleton này chứa thông tin về người dùng và thiết bị, thông tin mà tôi có thể cần để truy cập từ các vị trí khác nhau bên trong ứng dụng.

### Usecase #2: KeyManager
Đây là việc quản lý yêu thích của tôi cho đến nay. Trong trình quản lý này, tôi duy trì và lưu trữ bất kỳ khóa nào tôi cần để chạy ứng dụng. Trong trường hợp này, tôi sẽ show code ví dụ . Thứ nhất, tôi phân biệt khóa giữa khóa bình thường và khóa bí mật. Các khóa thông thường được lưu trữ trong UserDefaults (lưu trữ văn bản thuần túy). Các khóa bí mật được lưu trữ trong Apple Keychain. Thư viện mà tôi thường xuyên sử dụng để đơn giản hóa việc lưu trữ và truy xuất các khóa AppleKeychain là:

``` swift
import Foundation
import KeychainAccess

class KeyManager {
    static let shared = KeyManager()

    private let keychain = Keychain(service: "com.airlibi.appName")

    public var isSignedInGoogle: Bool {
        get {
            return UserDefaults.init().bool(forKey: "isSignedInGoogle")
        }
        set(boolean) {
            UserDefaults.init().setValue(boolean, forKey: "isSignedInGoogle")
        }
    }

    public var userIdentifier: String {
        get {
            do {
                return try keychain.get("userIdentifier") ?? ""
            } catch let error {
                print("error: \(error)")
            }

            return ""
        }
        set(value) {
            do {
                try keychain.set(value, key: "userIdentifier")
            } catch let error {
                print("error: \(error)")
            }
        }
    }
    
    public static func superBlast() {
        if let identifier = Bundle.main.bundleIdentifier {
            UserDefaults.standard.removePersistentDomain(forName: identifier)
            UserDefaults.standard.synchronize()
        }
        
        do {
            try keychain.removeAll()
        } catch let error {
            print("error: \(error)")
        }
    }
}
``` 

Giải thích code:

1. Định nghĩa Singleton
2. Khởi tạo riêng của keychain
3. Thuộc tính tính toán trả về giá trị của UserDefaults
4. Thuộc tính tính toán trả về giá trị của Keychain
5. Một chức năng để hủy tất cả các giá trị UserDefaults và Keychain (được gọi khi đăng xuất).

### Usecase #3: The DataManager
Trường hợp sử dụng cuối cùng mà tôi muốn trình bày là trình quản lý dữ liệu. Tôi sử dụng điều này để duy trì dữ liệu mà tôi đồng bộ hóa hoặc lấy từ API dữ liệu. Trình quản lý này được gọi từ Splash Screen để tải dữ liệu một lần. Ví dụ: người quản lý dữ liệu có thể duy trì thông tin ứng dụng (màu sắc, kích thước phông chữ, biểu ngữ đặc biệt). Trình quản lý dữ liệu này sẽ có cấu trúc sau:

``` swift
AppDataManager:
   - fetchData(completion) // load app settings from server and wait   
                           // until finished
   - reloadData(completion) // in case we want to reload the data
   - appSetting: AppSetting // a value that is mapped to an Entity   
   ```
Sau đó, bạn có thể truy cập thông tin trực tiếp từ entity:

``` swift
AppDataManager.shared.appSetting.mainColor //#ffffff
``` 

Tôi hy vọng bạn đã hiểu rõ hơn về sức mạnh của Lớp Singleton trong Swift và sẽ có thể sử dụng và tích hợp chúng trong các dự án tương lai của bạn.