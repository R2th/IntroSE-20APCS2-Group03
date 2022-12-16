![](https://images.viblo.asia/d7e1b9d5-96c4-4d87-91c5-1caf216fe895.png)
Thường xuyên các ứng dụng di động cần kết nối internet để hoạt động đúng. Tuy nhiên, kết nối internet đôi lúc có thể bị mất. Trong những trường hợp như thế này, nhà phát triển phải đưa ra các cách để làm cho trải nghiệm người dùng đợi hoặc ít nhất, thông báo cho người dùng.

Trong bài viết này, chúng ta sẽ xem làm thế nào chúng ta có thể phát hiện các sự cố kết nối internet trong Swift và một số cách chúng ta có thể xử lý nó.

Đây là ứng dụng mẫu mà chúng tôi sẽ xây dựng và cách nó xử lý các tình huống kết nối internet khác nhau:

# Yêu cầu
Để bạn có thể theo dõi bài viết này, bạn sẽ cần các yêu cầu sau:

* Xcode được cài đặt trên máy của bạn.
* Kiến thức về ngôn ngữ lập trình Swift.
* Cocoapods được cài đặt trên máy của bạn.

Khi bạn có những yêu cầu trên, hãy để làm thôi 

# Chuẩn bị môi trường làm việc

Trước khi bắt đầu, chúng tôi sẽ tạo ra một playground. Đây là nơi chúng tôi sẽ viết tất cả các trường hợp sử dụng của chúng tôi và xử lý chúng.

Swift đi kèm phần mở rộng Reachability cho việc xử lý kết nối, nhưng chúng tôi sẽ sử dụng thư viện của bên thứ ba. Chúng tôi làm điều này bởi vì nó dễ dàng hơn và API có tính dễ hiểuhơn so với cái được tích hợp sẵn.
sẽ là 
Mở Xcode và thiết lập một dự án mới.

Project này sẽ là 1 playground đơn giản, mà chúng ta có thể thử nghiệm.

Để phát hiện khi kết nối ngoại tuyến, chúng tôi sẽ sử dụng [Reachability.swift***](https://github.com/ashleymills/Reachability.swift)  package . Nó để thay thế cho Reachability được viết lại trong Swift với closures.'

Mở terminal và chạy dòng command dưới:

`$ pod init`

Điều này sẽ tạo ra một Podfile mới nơi chúng ta có thể khai báo các phụ thuộc của Cocoapods. Mở Podfile và thay thế nội dung bằng mã dưới đây:

```
platform :ios, '9.0'
target 'project_name' do
    use_frameworks!
    pod 'ReachabilitySwift'
    pod 'Alamofire'
end
```

Bạn cần thay thế ** project_name ** bằng tên dự án của bạn.
**Lưu tệp và chạy lệnh bên dưới để cài đặt Pods vào dự án của bạn:**

`$ pod install`

Khi cài đặt hoàn thành, mở file `*.xworkspace ` ngay đầu project của bạn. Nó sẽ chạy Xcode

# Tạo Network Reachability Manager của chúng ta
Tạo lớp mới NetworkManager. Lớp này sẽ lưu trữ trạng tháo và làm đại diện đơn giản cho gói Reachability. Trong file này, sử dụng đoạn code phía dưới:

```
import Foundation
import Reachability
class NetworkManager: NSObject {
    var reachability: Reachability!
    static let sharedInstance: NetworkManager = { 
        return NetworkManager() 
    }()
    override init() {
        super.init()
        // Initialise reachability
        reachability = Reachability()!
        // Register an observer for the network status
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(networkStatusChanged(_:)),
            name: .reachabilityChanged,
            object: reachability
        )
        do {
            // Start the network status notifier
            try reachability.startNotifier()
        } catch {
            print("Unable to start notifier")
        }
    }

    @objc func networkStatusChanged(_ notification: Notification) {
        // Do something globally here!
    }

    static func stopNotifier() -> Void {
        do {
            // Stop the network status notifier
            try (NetworkManager.sharedInstance.reachability).startNotifier()
        } catch {
            print("Error stopping notifier")
        }
    }

    // Network is reachable
    static func isReachable(completed: @escaping (NetworkManager) -> Void) {
        if (NetworkManager.sharedInstance.reachability).connection != .none {
            completed(NetworkManager.sharedInstance)
        }
    }

    // Network is unreachable
    static func isUnreachable(completed: @escaping (NetworkManager) -> Void) {
        if (NetworkManager.sharedInstance.reachability).connection == .none {
            completed(NetworkManager.sharedInstance)
        }
    }

    // Network is reachable via WWAN/Cellular
    static func isReachableViaWWAN(completed: @escaping (NetworkManager) -> Void) {
        if (NetworkManager.sharedInstance.reachability).connection == .cellular {
            completed(NetworkManager.sharedInstance)
        }
    }

    // Network is reachable via WiFi
    static func isReachableViaWiFi(completed: @escaping (NetworkManager) -> Void) {
        if (NetworkManager.sharedInstance.reachability).connection == .wifi {
            completed(NetworkManager.sharedInstance)
        }
    }
]
```

Trong class trên,chúng ta sẽ định nghĩa 1 cặp các phương thức giúp chúng ta bắt đầu giám sát trạng thái mạng. Chúng ta có `shareInstance`, đây là 1 singleton và chúng ta có thể gọi nếu chúng ta không cần tạo nhiều đối tượng của lớp `NetworkManager`.

Trong phương thức `init`, chúng ta tạo 1 đối tượng của `Reachability` và đăng ký 1 thông báo sử dụng lớp `NotificationCenter`. Giờ, mỗi khi trạng thái mạng thay đổi, sẽ gọi ngược lại bởi `NotificationCenter` ( nó là `networkStatusChanged` ). Chúng ta có thể sử dụng điều này để làm một cái gì đó toàn cầu được kích hoạt khi mạng không thể truy cập được. 

Chúng ta định nghĩa nhưng hàm giúp hỗ trợ khác điều đó thường sẽ làm cho mã chạy, tùy thuộc vào trạng thái kết nối internet của chúng tôi, một cách dễ dàng. Chúng ta có `*isReachable*`, `*isUnreachable*`,` *isReachableViaWWAN*` and `*isReachableViaWiFi*`.

Việc sử dụng hỗ trợ sẽ trông như thế này

```
NetworkManager.isReachable { networkManagerInstance in
  print("Network is available")
}
NetworkManager.isUnreachable { networkManagerInstance in
  print("Network is Unavailable")
}
```

**Đây không phải sự kiện lắng nghe và chỉ chạy 1 lần. Đây là lắng nghe mạng thay đổi trong real-time, bạn sẽ cần sử dụng nó**
`NetworkManager.sharedInstance.reachability.whenReachable**`. Chúng tôi sẽ có 1 ví dụ ở phía dưới bài

Giờ chúng tôi đã có 1 lớp quản lý, hãy xem chúng tôi sử dụng trong ứng dụng như thế nào.

# Xử lý mạng khả dụng trong ứng dụng khởi chạy
Đôi khi, ứng dụng của bạn phụ thuộc rất nhiều vào kết nối internet và bạn cần phát hiện trạng thái khi khởi chạy. Hãy để xem cách chúng ta có thể xử lý việc này bằng cách sử dụng lớp NetworkManager.

Tạo một bộ điều khiển mới gọi là LaunchViewControll. Chúng tôi sẽ coi chế độ xem bộ điều khiển đầu tiên trên bảng phân cảnh là bộ điều khiển khởi chạy. Chúng tôi sẽ cố gắng phát hiện xem thiết bị của người dùng có trực tuyến hay không và nếu không, chúng tôi sẽ tạo một trang ngoại tuyến để xử lý việc này để người dùng hoàn toàn không truy cập vào ứng dụng.

Trong LaunchContoder, thay thế nội dung bằng mã sau:

```
import UIKit
class LaunchViewController: UIViewController {
    let network: NetworkManager = NetworkManager.sharedInstance
    override func viewDidLoad() {
        super.viewDidLoad()
        NetworkManager.isUnreachable { _ in
            self.showOfflinePage()
        }
    }
    private func showOfflinePage() -> Void {
        DispatchQueue.main.async {
            self.performSegue(
                withIdentifier: "NetworkUnavailable", 
                sender: self
            )
        }
    }
}
```

Trong lớp này, chúng tôi sử dụng phương thức `NetworkManager‘s * isUnreachable *` của chúng tôi để kích hoạt phương thức `showPackline` khi mạng không khả dụng. Hãy xem chúng tôi tạo ra viewcontroller mới có tên OfflineViewControll.

Mở tệp `Main.storyboard` và đặt lớp tùy chỉnh của chế độ xem đầu tiên thành `LaunchViewControll.`

Tiếp theo, tạo một bộ điều khiển xem mới trong storyboard. Đặt `OfflineViewContaptor` làm lớp tùy chỉnh cho new view controller mới này. Bây giờ hãy tạo một segue thủ công có tên `NetworkUnaAvailable` giữa bộ điều khiển khung nhìn mới và `LaunchViewContaptor`. Khi bạn hoàn thành, bạn nên có một cái gì đó tương tự như thế này:

Giờ hãy chạy ứng dụng. Tuy nhiên, xin lưu ý rằng trước khi bạn chạy ứng dụng, "máy phát triển" của bạn phải ngoại tuyến vì trình giả lập iOS sử dụng kết nối internet của máy. Khi bạn chạy ứng dụng, bạn sẽ nhận được trang ngoại tuyến mà chúng tôi đã tạo.

Bây giờ chúng ta hãy tạo một view controller hiển thị khi có kết nối.

# Handling Events When the Device Comes Online

Bây giờ chúng tôi đã tạo Offline View Controller và nó hoạt động khi thiết bị ngoại tuyến, hãy để chúng tôi xử lý những gì xảy ra khi thiết bị trực tuyến trở lại.

Tạo moiws 1 navigation view controller bên dưới  Offline View Controller. Chúng tôi sẽ tạo một bộ điều khiển hiển thị các bài đăng Reddit mới nhất. Tạo một lớp trình điều khiển khung nhìn mới có tên là `PostTableViewControll`. Bây giờ làm cho lớp này tùy chỉnh cho trình điều khiển chế độ xem được đính kèm với Navigation View Controller.

Bây giờ, hãy tạo một segue thủ công có tên `MainContoder` từ Navigation View Controller đến Launch View Controller và Offline View Controller. Bạn nên có một cái gì đó tương tự như thế này:

Giờ, mở lớp LaunchViewController và thêm đoạn sau bên dưới hàm `viewDidLoad` :

```
NetworkManager.isReachable { _ in
    self.showMainPage()
}
```

Và thêm phương thức dưới viewcontroller

```
private func showMainPage() -> Void {
    DispatchQueue.main.async {
        self.performSegue(
            withIdentifier: "MainController", 
            sender: self
        )
    }
}
```