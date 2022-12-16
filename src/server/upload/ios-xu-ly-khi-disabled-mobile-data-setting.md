Vì một lý do nào đó, một số lượng đáng kể người dùng vô hiệu hóa dữ liệu di động cho ứng dụng iOS của chúng ta. Đây không phải là vấn đề gì khi họ ở nhà và đặt xe thông qua ứng dụng bằng Wi-Fi, nhưng có thể nhanh chóng trở thành vấn đề lớn khi họ cố gắng đặt một chuyến xe nhanh nhất có thể để thực hiện một công việc gấp gáp nào đó trên đường phố - nơi mà điện thoại của họ không sẵn sàng kết nối Wi-fi. Tại thời điểm này, có rất ít khả năng họ nhớ rằng họ đã tắt cài đặt cho phép truy cập thông qua Dữ liệu di động (3G - 4G), do đó, thường dẫn đến một cuộc gọi đến Dịch vụ khách hàng - mà điều này có thể tránh được.

![](https://images.viblo.asia/c3bcc8d7-b607-4ee9-b43d-cd7d96e8818a.jpeg)

Nếu chúng ta không làm gì để nhắc nhở người dùng bật cài đặt Dữ liệu di động, các truy vấn của người dùng sẽ luôn thất bại khi không có Wi-Fi và họ sẽ thấy một lỗi mặc định, điều này sẽ không giúp họ hiểu được những đã gì sai. Tuy nhiên, công việc của chúng ta là cho phép người dùng biết họ có thể làm gì để khắc phục sự cố.

## iOS native implementation

Để cố gắng giải quyết vấn đề này, theo như các thử nghiệm của chúng tôi, iOS sẽ hiển thị cảnh báo khi tất cả các điều kiện này được đáp ứng:

* không thể truy cập mạng
* cài đặt dữ liệu di động bị vô hiệu hóa cho ứng dụng hiện tại
* giá trị cài đặt dữ liệu di động đã thay đổi kể từ lần mở ứng dụng cuối cùng

![](https://images.viblo.asia/d42f75d0-20be-44a0-8910-6d7946b72457.png)

UX của nó khá ổn, vì nó điều hướng người dùng đến đúng màn hình để cập nhật cài đặt chỉ bằng một cú chạm. Tuy nhiên xử lý mặc định này chưa bao gồm hết các trường hợp có thể xảy ra: nếu lần đầu tiên thành công với Wi-fi, sau đó mất Wi-fi và cài đặt dữ liệu di động bị tắt, người dùng sẽ không bao giờ thấy cảnh báo.

Vì chúng tôi nghĩ rằng nó không đủ, chúng tôi đã quyết định thực hiện lại cảnh báo này cho mỗi cuộc gọi mạng không thành công do cài đặt cụ thể này.

## Let’s code this

Chúng ta sẽ sử dụng CTCellularData (bắt đầu được hỗ trợ từ iOS 9). Kể từ iOS 9, Apple cung cấp CTCellularData một trình nghe để kiểm tra giá trị của chuyển đổi dữ liệu di động cho ứng dụng hiện tại.

Chúng ta cũng cần phải có khả năng kiểm tra kết nối hiện tại Reachability. Chúng tôi sử dụng Alamofire cho ứng dụng của mình, và nó đã hỗ trợ sẵn với NetworkReachabilityManager, nhưng bạn cũng có thể sử dụng một giải pháp khác như Reachability.swift hoặc thậm chí thêm lớp Apple SCNetworkReachability vào ứng dụng của bạn cho việc này.

### Lấy giá trị cài đặt dữ liệu di động hiện tại
Việc thực hiện lắng nghe để có được giá trị hiện tại khá đơn giản:

```
import CoreTelephony

//...

let cellularData = CTCellularData()
cellularData.cellularDataRestrictionDidUpdateNotifier = { (state) in
  print(state)
}
```

### Lấy trạng thái reachability
```
import Alamofire

// ...

let networkReachabilityManager = NetworkReachabilityManager()
networkReachabilityManager?.listener = { [weak self] state in
  print(state)
}    
networkReachabilityManager?.startListening()
```

### Dữ liệu sẵn có
Kiểm tra reachability có thể được thực hiện bất cứ lúc nào, nhưng không phải là ngay lập tức. Vì vậy, nếu bạn khởi tạo NetworkReachabilityManager và trực tiếp thử lấy trạng thái hiện tại, điều này có thể sẽ thất bại. Để tránh điều này và vì điều này không tiêu tốn nhiều bộ nhớ, chúng ta có thể có người quản lý riêng lưu trữ giá trị hiện tại bất cứ khi nào nó thay đổi:

```
import Alamofire

class ApiReachabilityManager {

  private var currentNetworkReachabilityState: NetworkReachabilityManager.NetworkReachabilityStatus = .unknown

  init() {
      let networkReachabilityManager = NetworkReachabilityManager()
      networkReachabilityManager?.listener = { [weak self] state in
        self?.currentNetworkReachabilityState = state
      }    
    networkReachabilityManager?.startListening()
  }
}
```

### Khi nào thực hiện kiểm tra
Chúng tôi khuyên bạn nên kiểm tra cả hai trạng thái, đặc biệt là reachability, chỉ khi xảy ra lỗi mạng. Bạn không nên kiểm tra reachability trước khi thực hiện cuộc gọi mạng để có khả năng tránh thực hiện cuộc gọi. Nếu có vấn đề với khả năng tiếp cận, điều này sẽ dẫn đến việc chặn tất cả các cuộc gọi mạng của ứng dụng của bạn. Alamofire nói trong tài liệu của họ:

> Do NOT use Reachability to determine if a network request should be sent. You should ALWAYS send it.

### Final implementation

Đây là trình quản lý singleton của chúng ta, bao gồm:

* 2 publics functions để:
* * bắt đầu nghe
* * kiểm tra trạng thái hiện tại
* 1 private function để present alert

```
import Foundation
import CoreTelephony
import Alamofire

class ApiReachabilityManager {
  static let shared = ApiReachabilityManager()
  
  private let networkReachabilityManager = NetworkReachabilityManager()
  private let cellularData = CTCellularData()
  
  private var currentNetworkReachabilityState: NetworkReachabilityManager.NetworkReachabilityStatus = .unknown
  private var currentCellularDataState: CTCellularDataRestrictedState = .restrictedStateUnknown
  
  func start() {
    cellularData.cellularDataRestrictionDidUpdateNotifier = { [weak self] (state) in
      self?.currentCellularDataState = state
    }
    
    networkReachabilityManager?.listener = { [weak self] state in
      self?.currentNetworkReachabilityState = state
    }
    
    networkReachabilityManager?.startListening()
  }
  
  func checkApiReachability(viewController: UIViewController?, completion: (_ restricted: Bool) -> Void) {
    let isRestricted = currentNetworkReachabilityState == .notReachable && currentCellularDataState == .restricted
    
    guard !isRestricted else {
      if let viewController = viewController {
        presentReachabilityAlert(on: viewController)
      }
      completion(true)
      return
    }
    
    completion(false)
  }
  
  private func presentReachabilityAlert(on viewController: UIViewController) {
    let alertController = UIAlertController(
      // TODO: replace YOUR-APP by your app's name
      title: "Mobile Data is Turned Off for \"YOUR-APP\"",
      message: "You can turn on mobile data for this app in Settings.",
      preferredStyle: .alert
    )
    if let settingsUrl = URL(string: UIApplication.openSettingsURLString), UIApplication.shared.canOpenURL(settingsUrl) {
      alertController.addAction(
        UIAlertAction(title: "Settings", style: .default, handler: { action in
            UIApplication.shared.open(settingsUrl)
        })
      )
    }
    
    let okAction = UIAlertAction(title: "OK", style: .default, handler: nil)
    alertController.addAction(okAction)
    alertController.preferredAction = okAction
    
    viewController.present(alertController, animated: true, completion: nil)
  }
}
```

Chúng ta cần bắt đầu lắng nghe tại một số điểm, chúng tôi đã chọn lắng nghe khi khởi chạy ứng dụng, trong AppDelegate vì ứng dụng của chúng tôi cần các cuộc gọi mạng trực tiếp:

```
ApiReachabilityManager.shared.start()
```

Sau đó, trong view controller của bạn, bạn chỉ cần gọi phương thức checkApiReachability trong trường hợp có lỗi:

```
func handleError(_ error: Error) {
  ApiReachabilityManager.shared.checkApiReachability(viewController: self) { (restricted) in
    if !restricted {
      // TODO: continue to handle error, there is no network-data issue
    }
    // No need to handle else case as alert has been presented if needed
  }
}
```

# Kết luận
Apple luôn cập nhật và cố gắng hỗ trợ chúng ta khi xảy ra vấn đề để tạo ra trải nghiệm tốt nhất cho người dùng, tuy nhiên, không phải lúc nào họ cũng có thể giúp chúng ta trong tất cả các trường hợp. Dưới góc nhìn là 1 người phát triển ứng dụng, chúng ta cần chủ động phát hiện và xử lý các vấn đề có thể lường trước đến từ thói quen hay thao tác từ phía người dùng để làm tăng trải nghiệm của họ một cách tốt nhất.

Hy vọng bài viết trên sẽ giúp các bạn hoàn thiện hơn UX cho ứng dụng của mình và tránh được những sự phàn nàn của người dùng từ những vấn đề có thể lường trước.

Bài viết được dịch từ: https://drivy.engineering/handle-disabled-mobile-data-setting-on-ios/