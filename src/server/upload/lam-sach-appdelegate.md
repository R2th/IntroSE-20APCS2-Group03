Bài viết được dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại https://medium.com/swlh/clean-appdelegate-53dbf5e3dc1.

Làm cách nào bạn có thể chắc chắn rằng **AppDelegate** của bạn tuân theo nguyên lý đơn nhiệm (*single responsibility principle*)

![](https://images.viblo.asia/2c7d5431-9248-452d-9c62-6570689bfb93.png)

Thông thường **AppDelegate** sẽ phải đảm nhiệm rất nhiều nhiệm vụ như báo cáo khi ứng dụng bị lỗi crash, phân tích, thiết lập *CoreData stack*, thông báo...
Điều này làm cho **AppDelegate** vi phạm nguyên lý đơn nhiệm, nó phải quản lý quá nhiều thứ.
Những trách nhiệm trên được  trộn với nhau và đặt vào một lớp lớn **AppDelegate**. Thậm chí chia nhỏ trách nhiệm thành nhỏ hơn chỉ là trải các trách nhiệm xung quanh mà thôi.
Để tránh việc này, chúng ta có thể sử dụng một cách, mà trong đó các hành vi của một lớp service được đóng gói bằng cách sử dụng các giao diện.

### Điều kiện tiên quyết
Các kiến thức cơ bản về việc xây dụng ứng dụng iOS.

### Thuật ngữ
**AppDelegate**: là đối tượng gốc của Ứng dụng iOS, hoạt động cùng với **UIApplication** để quản lý việc các tương tác với hệ thống.

### Code
Trong **AppDelegate**, chúng ta có thể cho các *service* mà ứng dụng sử dụng vào một mảng.
```
var services: [UIApplicationDelegate] = [
    PersistenceService(),
    AnalyticsService(),
    CrashReporterService() 
]
```
Chúng sẽ được gọi trong hàm *didFinishLaunchingWithOptions* như sau:
```
for service in self.services {
    let _ = service.application? (application, didFinishLaunchingWithOptions: launchOptions)
}
    return true
}
```
Vì các service: **PersistenceService, AnalyticsService, CrashReporterService** sẽ phải kế thừa giao thức *UIApplicationDelegate*, nên thông thường chúng ta sẽ cần phải thực hiện một loạt các hàm để tuân thủ giao thức *NSObjectProtocol* vì *UIApplicationDelegate* kế thừa giao thức *NSObjectProtocol*. 

Tuy nhiên cách dễ nhất để thực hiện việc này là hãy cho các service này kế thừa *NSObject*.

Dưới đây là lớp **AnalyticsService**
```
class AnalyticsService: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        #if ALPHA
        //register with one id
        #else
        //Register with another one
        #endif
        //Analytics manager starttracking
        return true
    }
}
```
Lớp **CrashReporterService**
```
class CrashReporterService: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        return true
    }
}
```
Và lớp **PersistenceService**
```
class PersistenceService: NSObject, UIApplicationDelegate {
    func applicationDidEnterBackground(_ application: UIApplication) {
        print (“Persistence”)
    }
}
```
Các bạn có thể tham khảo source code đầy đủ tại [đây](https://github.com/stevencurtis/CleanAppDelegate?source=post_page-----53dbf5e3dc1----------------------)