1. Tại sao cần phải fake location:

Fake GPS trên điện thoại cho phép bạn tạo vị trí giả ở bất cứ nơi nào trên thế giới, tức là vị trí thật trên điện thoại sẽ bị ẩn đi và thay vào đó là một địa điểm mới do bạn lựa chọn. Bằng cách Fake GPS bạn có thể giả lập vị trí của mình để test phần mềm (ví dụ cần định vị giữa khách hàng và bên cung cấp dịch vụ).

Hiện tại có rất nhiều ứng dụng về fake location cho HĐH Android, nhưng với HĐH iOS thì hầu như toàn bộ đều bắt buộc phải Jailbreak máy. Nhưng Jailbreak - bẻ khóa chắc chắn có thể mang đến rủi ro. Các hạn chế của Apple không chỉ giới hạn những gì bạn có thể làm - chúng còn giúp bảo vệ người dùng chống lại tất cả các loại phần mềm nguy hiểm có thể hoạt động không đúng cách trên iPhone. Tải xuống các ứng dụng không an toàn trên iPhone bẻ khóa có thể sẽ "khuyến mãi" thêm cho bạn virus hoặc một số mối nguy hiểm tương tự.

Nên mình xin giới thiệu 1 cách fake location mà không cần phải jailbreak, đó là fake location (simulation location) trong Iphone bằng Xcode:

**Cách mô phỏng vị trí GPS**

**1.Sử dụng Xcode để tạo project mới**

Nội dung blank sẽ tốt nhất nên ta sử dụng Single View Application để tạo project mới

![](https://images.viblo.asia/4b43adda-c6a1-45a5-b517-662b49a4e367.png)

**2. Viết thêm xử lý Background vào trong file AppDelegate.swift**
```
import UIKit
import CoreData

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    var backgroundTaskID : UIBackgroundTaskIdentifier = 0

    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        return true
    }

    func applicationWillResignActive(application: UIApplication) {
        self.backgroundTaskID = application.beginBackgroundTaskWithExpirationHandler(){
            [weak self] in
            application.endBackgroundTask((self?.backgroundTaskID)!)
            self?.backgroundTaskID = UIBackgroundTaskInvalid
        }
    }
}
```

Ta cần share location trong app nhưng Simulate Location thì bị suspend trong app nên chúng ta cần viết thêm xử lý trong phần BackGround ở AppDelegate.swift
(Phần này các bạn có thể nhờ dev iOS để support)

**3. Sử dụng Device để chạy App**

Chọn device là Iphone , và thực hiện run App

![](https://images.viblo.asia/bf786485-0cda-4976-a992-9df520091c5c.png)

**4. Sử dụng Simulate Location**

Khi app đang running chúng ta chọn Debug -> Simulate Location và chọn để di chuyển đến một thành phố nào đó , ví dụ thử chọn đến London

![](https://images.viblo.asia/28e49e73-f934-4173-9fbe-93cd4632cc1e.png)

Sau đó với trạng thái này ta mở thử app Map ra và confirm location đã ở London

![](https://images.viblo.asia/a87aa23a-3ae3-4347-adc8-64c2b376be24.png)

5. Fake location tuỳ ý

Để fake location tuỳ ý chúng ta cần tạo file GPX với format XML và chỉ đưa thông tin Lat Long vào bên trong file MyLocation.gpx

```
<?xml version="1.0"?>
<gpx version="1.1">
    <wpt lat="35.6575811" lon="139.7009455" />
</gpx>
```

file này tôi đã fake thành vị trí của ga shibuya bên Nhật.
Sau đó chọn Debug > Simulate Location > Add GPX File to Project để chọn file GPX vừa rồi

![](https://images.viblo.asia/5f68bf0c-1fe2-4537-a215-19069744e6b6.png)

Và để confirm về vị trí mới từ file GPX chúng ta lại mở app Map ra confirm thêm lần nữa

![](https://images.viblo.asia/c587f893-12fd-45ee-a693-5159b37aa946.png)

Chúc các bạn thành công

Tham khảo tại: 

https://www.jetbrains.com/help/objc/simulate-location.html

https://medium.com/innocode-stories/tutorial-how-to-simulate-location-on-the-ios-device-e2be20fbd7f4

https://qiita.com/narikei/items/c20d95532130e8fcdeb7