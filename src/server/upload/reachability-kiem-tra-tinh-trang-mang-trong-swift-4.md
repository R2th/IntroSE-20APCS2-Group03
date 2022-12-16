## Giới thiệu
**Network Reachability** ở đây hiểu nôm na là trạng thái mái kết nối mạng của device. Chúng ta có thể sử dụng để xác định rằng device đang  online hay offline, thậm chí là đang dùng mạng wifi hay gói dữ liệu data từ nhà mạng.

Có rất nhiều cách để kiểm tra việc này trong Swift và cũng có khá nhiều framework được viết ra để hổ trợ.

Trong bài viết này, mình muốn chia sẻ với các bạn một framework khá hữu dụng và được rất nhiều người ưa thích để kiểm tra Network Reachability và thêm vài cách khác. Nếu có vài framework hay chức năng nào hay hơn, đừng ngần ngại liên hệ với mình để mình học hỏi thêm nhé.

Đây nhé:
[**Reachability.swift**](https://github.com/ashleymills/Reachability.swift)

Framework này khá đơn giản và dễ dùng đấy. Nó hổ trợ cã CocoaPods và Carthage nữa.

## CocoaPods:

1. Chắc chắn là CocoaPods đã được [cài đặt](https://guides.cocoapods.org/using/getting-started.html#getting-started) nhé 
2. Update dòng code dưới vào pod file của bạn 
```
use_frameworks!
pod 'ReachabilitySwift'
```
3. Chạy pod install
4. Trong project bạn có thể dùng dễ dàng bằng cách: `import Reachability `

## Carthage:
Carthate là một decentralized dependency manager (Hệ thống quản lý phụ thuộc phi tập trung :v thường thì mình hay đọc bằng tiếng anh cơ). Để cài đặt Reachability.swift với Carthage thì:

Cài đặt Carthage thông qua [Homebrew](https://brew.sh/)
```
$ brew update
$ brew install carthage
```

1. Thêm `github "ashleymills/Reachability.swift"` vào Cartfile.
2. Chạy terminal với dòng lệnh: `carthage update`
3. Kéo thả `Reachability.framework` từ thư mục `Carthage/Build/iOS/` vào `Linked Frameworks and Libraries` section trong Xcode project ở mục `General` 
4. Thêm `$(SRCROOT)/Carthage/Build/iOS/Reachability.framework` vào Input Files của Run Script Phase cho Carthage.
5.  Trong project bạn có thể dùng dễ dàng bằng cách: `import Reachability `

## Dùng bằng cách nào??
Reachability.swift sử dụng closures và notifications để báo cho chúng ta biết về trạng thái kết nối.
### 1. Ví dụ về Closures
```
//declare this property where it won't go out of scope relative to your listener
let reachability = Reachability()!

reachability.whenReachable = { reachability in
    if reachability.connection == .wifi {
        print("Reachable via WiFi")
    } else {
        print("Reachable via Cellular")
    }
}
reachability.whenUnreachable = { _ in
    print("Not reachable")
}

do {
    try reachability.startNotifier()
} catch {
    print("Unable to start notifier")
}
```

Để ngừng việc lắng nghe tới reachability thì ta dùng dòng code
```
reachability.stopNotifier()
```
**NOTE**: Toàn bộ closures được chạy trên main queue

### 2. Ví dụ về notification 
```
//declare this property where it won't go out of scope relative to your listener
let reachability = Reachability()!

//declare this inside of viewWillAppear

     NotificationCenter.default.addObserver(self, selector: #selector(reachabilityChanged(note:)), name: .reachabilityChanged, object: reachability)
    do{
      try reachability.startNotifier()
    }catch{
      print("could not start reachability notifier")
    }
```
 Khai báo hàm selector
```
@objc func reachabilityChanged(note: Notification) {

  let reachability = note.object as! Reachability

  switch reachability.connection {
  case .wifi:
      print("Reachable via WiFi")
  case .cellular:
      print("Reachable via Cellular")
  case .none:
    print("Network not reachable")
  }
}
```

Khi không dùng nữa bạn có thể khai báo:
```
reachability.stopNotifier()
NotificationCenter.default.removeObserver(self, name: .reachabilityChanged, object: reachability)
```

**NOTE**: Toàn bộ notification được chạy trên main queue


-----

![](https://images.viblo.asia/c9b78b60-615e-44ee-8524-173c19623058.png)
## Alamofire NetworkReachabilityManager
Bạn cũng có thể tạo 1 custom class ví dụ như là NetworkState.swift và sử dụng Alomafire NetworkReachabilityManager class để kiểm tra tình trạng kết nối nữa đấy:
```
import Foundation
import Alamofire
class NetworkState {
    class func isConnected() ->Bool {
        return NetworkReachabilityManager()!.isReachable
    }
}
```

Cách dùng:
```
if NetworkState.isConnected() {
        print("Internet is available.")
        // ...
 }
```

## SCNetworkReachability
Chúng ta có thể sử dụng các interface(protocol trong Swift) của [SCNetworkReachability
](https://developer.apple.com/documentation/systemconfiguration/scnetworkreachability-g7d) được cung cấp bởi framework **SystemConfiguration**. Dùng nó để đọc ra các thông số về network cã đồng bộ lẫn không đồng bộ (both synchronously and asynchronously)

Để sử dụng interface này bạn có thể xem bài viết [Network Reachability with Swift](https://marcosantadev.com/network-reachability-swift/) hoặc vào git này [gist](https://gist.github.com/saeed-rz/d9827b312915e0dc145497532e514470) được viết bởi tác gỉa và chạy ngon trên swift 4

-----
Cám ơn các bạn đã theo dõi. Rất mong sự góp ý của các bạn về bài dịch nếu có sai sót
Link tham khảo của mình ở đây: [Check Network Reachability in Swift 4](https://medium.com/@saeedrz/check-network-reachability-in-swift-4-c129491bbdd5)