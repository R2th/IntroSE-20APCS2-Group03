Thông thường khi phát triển một ứng dụng ios có sử dụng đến các from nhập liệu, login... , bạn thường gặp phải một vấn đề khi thao tác với UITextField / UITextView thì bàn phím iPhone hiển thị lên và che hết các from UITextField / UITextView. Có nhiều cách để xử lý trường hợp này ta dùng thư viện IQKeyboardManager cho phép bạn giải quyết các vấn đề trên một cách dễ dàng không cần thêm UIScrollView hay xử lý gì autolayout . Để sử dụng IQKeyboardManager, bạn chỉ ném thư viện IQKeyboardManager vào project của bạn rồi làm theo hướng dẫn dưới đây.
![](https://images.viblo.asia/913e0ed6-30de-4f43-9eac-b3216f672f91.gif)
Cài đặt IQKeyboardManager:

    IQKeyboardManager (Objective-C): 
IQKeyboardManager thông qua CocoaPods, thêm dòng `pod 'IQKeyboardManager'` đối với "iOS 8"  `pod 'IQKeyboardManager', '3.3.7' # iOS7` vào Podfile https://cocoapods.org/

    IQKeyboardManager (Swift): Swift 4.2, 4.0, 3.2, 3.0 (Xcode 9)
thêm `pod 'IQKeyboardManagerSwift'` vào Podfile sau đó `install podfile` 
Mở project vào file AppDelegate.swift, thêm `import IQKeyboardManagerSwift`
```
import IQKeyboardManagerSwift

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {

      IQKeyboardManager.shared.enable = true

      return true
    }
}
```

```
        IQKeyboardManager.shared.enable = true   // kich hoat IQKeyboardManager
        IQKeyboardManager.shared.previousNextDisplayMode = IQPreviousNextDisplayMode.Default  // icon button previous/next/done tren toolbar
        IQKeyboardManager.shared.shouldShowToolbarPlaceholder = false // placeholder trong textField's
        IQKeyboardManager.shared.shouldResignOnTouchOutside = true  // tap ben ngoai ban phim se thoat khoi textField's
        IQKeyboardManager.shared.toolbarDoneBarButtonItemText = "OK"  // text button Done
        IQKeyboardManager.shared.enableDebugging = true  //  enableDebugging = true 
```
Kêt quả : 
![](https://images.viblo.asia/9fa9ab45-29d9-4a67-b71b-51ae1b0867b7.png)
![](https://images.viblo.asia/3b814527-d9f4-4e2f-bc45-b545eddadb6f.png)