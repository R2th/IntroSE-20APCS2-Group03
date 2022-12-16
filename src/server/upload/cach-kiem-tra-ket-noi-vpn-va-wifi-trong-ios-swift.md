> Do yêu cầu công việc nên chúng ta phải tìm cách kiểm tra xem người dùng có đang sử dụng kết nối VPN hoặc Wifi hay không. Bài viết này mình sẽ hướng dẫn các bạn cách kiểm tra các  vấn đề này. Trước tiên để giải thích vấn đề này chúng ta sẽ cùng tìm hiểu sơ qua một số lý thuyết nhé :grin:

### 1. VPN là gì?

VPN là viết tắt của **"Virtual Private Network"**  và như hầu hết chúng ta đã biết, chúng có thể phục vụ để đạt được nhiều mục tiêu khác nhau, chẳng hạn như:

* Truy cập giữa các mạng riêng từ xa
* Mã hóa dữ liệu
* Ẩn danh khi duyệt Internet.

Để đảm bảo an ninh, kết nối mạng riêng được thiết lập bằng [Tunneling Protocol](https://en.wikipedia.org/wiki/Tunneling_protocol) phân lớp được mã hóa.

Các **tunneling protocols** có thể được áp dụng phổ biến ví dụ như: 

1. **IPsec:** Ipsec sử dụng mã hóa, đóng gói một gói IP bên trong một gói IPsec. Việc khử đóng gói xảy ra ở cuối tunnel, nơi gói IP ban đầu được giải mã và chuyển tiếp đến đích dự kiến của nó

2. **Tun (or Utun)/Tap:** Phục vụ các mục đích tunneling tương tự, nhưng chúng hoạt động trên các lớp khác nhau của ngăn xếp mạng. Thông tin thêm [tại đây](https://en.wikipedia.org/wiki/TUN/TAP).

3. **PPP:**  Viết tắt của **“Point-to-Point Protocol.”**. PPP là một giao thức cho phép giao tiếp và truyền dữ liệu giữa hai điểm hoặc “nút”. Vì nó đóng gói các giao thức khác, nó có thể được sử dụng cho việc `data tunneling`  được định nghĩa [ở đây](https://techterms.com/definition/ppp).

Bây giờ chúng ta đã biết thêm một chút về chúng, chúng ta có cơ hội hiểu được liệu ứng dụng có khả năng sử dụng VPN hay không. Trên thực tế, có thể làm như vậy bằng cách dựa vào [CFNetworkCopySystemProxySettings](https://developer.apple.com/documentation/cfnetwork/1426754-cfnetworkcopysystemproxysettings) , cung cấp cho chúng ta danh sách các giao thức được chấp nhận.

Như đã nói, nếu chúng ta tìm thấy trong từ điển này một trong những giao thức được đề cập, chúng ta có thể giả định rằng một VPN có khả năng được sử dụng. Dưới đây là đoạn code để áp dụng chúng.

Chúng ta tiến hành tạo 1 struct có tên **VpnChecker**:

```
struct VpnChecker {

    private static let vpnProtocolsKeysIdentifiers = [
        "tap", "tun", "ppp", "ipsec", "utun", "ipsec0", "utun1", "utun2"
    ]

    static func isVpnActive() -> Bool {
        guard let cfDict = CFNetworkCopySystemProxySettings() else { return false }
        let nsDict = cfDict.takeRetainedValue() as NSDictionary
        guard let keys = nsDict["__SCOPED__"] as? NSDictionary,
            let allKeys = keys.allKeys as? [String] else { return false }

        // Checking for tunneling protocols in the keys
        for key in allKeys {
            for protocolId in vpnProtocolsKeysIdentifiers
                where key.starts(with: protocolId) {
                return true
            }
        }
        return false
    }
}
```

Giờ bạn đã có thể sử dụng hàm trên để check vpn như sau:

```
VpnChecker.isVpnActive()
```

Giải pháp này có hiệu quả không?

 Theo như mình test trên thiết bị thật cũng như simulator thì giải pháp đã hoạt động tốt. (Trong trường hợp của mình, ví dụ như từ khóa `ipsec` xuất hiện trong trường hợp vpn đang hoạt động).

Một lưu ý là chúng ta không biết liệu có những giao thức khác mà người dùng đang sử dụng mà chúng ta không đưa vào không, liệu có những giao thức mới sẽ được giới thiệu hay đơn giản là  apple sẽ thay đổi api của mình trong tương lai. Mặc dù vậy, trong trường hợp cụ thể này, mình đoán nó sẽ chỉ đơn giản là vấn đề về cú pháp.

### 2. Sử dụng Alamofire để kiểm tra kết nối Wifi

Đầu tiên để tích hợp [Alamofire](https://github.com/Alamofire/Alamofire) vào dự án Xcode của bạn bằng CocoaPods, hãy chỉ định nó trong `Podfile` của bạn:

```
pod 'Alamofire', '~> 5.4'
```

Khi đã chỉ định xong bạn chạy `pod install` để tích hợp vào Xcode sau đó vào lại project của mình để tiến hành sử dụng.

Bây giờ mình sẽ khởi tạo class **NetworkManager** sau đó `import Alamofire` và sử dụng như sau: 

```
import Alamofire

class NetworkManager {

//shared instance
static let shared = NetworkManager()

let reachabilityManager = Alamofire.NetworkReachabilityManager(host: "www.google.com")

func startNetworkReachabilityObserver() {

    reachabilityManager?.listener = { status in
        switch status {

            case .notReachable:
                print("The network is not reachable")

            case .unknown :
                print("It is unknown whether the network is reachable")

            case .reachable(.ethernetOrWiFi):
                print("The network is reachable over the WiFi connection")

            case .reachable(.wwan):
                print("The network is reachable over the WWAN connection")

            }
        }

        // start listening
        reachabilityManager?.startListening()
   }
}
```

Tiếp đến bạn vào **AppDelegate** sử dụng `Singleton` **NetworkManager** đã khởi tạo ở đoạn code trên để tiến hành kiểm tra wifi:

```
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        // add network reachability observer on app start
        NetworkManager.shared.startNetworkReachabilityObserver()

        return true
    }
}
```

Chạy app và ngắt kết nối wifi để kiểm tra thành quả của chúng ta :rofl:

### 3. Kết luận 
Trên đây mình đã giới thiệu cho bạn cách kiểm tra VPN và Wifi trong app.

Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn 😍.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃