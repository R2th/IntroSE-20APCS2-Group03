Xin chào các bạn, chắc hẳn ít nhiều khi làm các dự án các bạn đều đã làm các ứng dụng hỗ trợ đa ngôn ngữ. Ví dụ mình làm ứng dụng cho khách hàng Nhật nên thông thường ứng dụng sẽ hỗ trợ ngôn ngữ Nhật, Anh... Việc thiết lập các ứng dụng có thể hỗ trợ hiển thị ngôn ngữ theo ngôn ngữ của thiết bị khá đơn giản. Nếu như bạn nào chưa biết thì có thể tham khảm bài viết trước đây của mình về [Ứng dụng đa ngôn ngữ](https://viblo.asia/p/ung-dung-da-ngon-ngu-07LKXNmDlV4) . 
Vậy đã khi nào bạn gặp trường hợp khách hàng muốn rằng user có thể chọn ngôn ngữ họ muốn mà không phụ thuộc vào ngôn ngữ của device hay không? Nếu đây là vấn đề bạn đang quan tâm, thì bài viết này là dành cho bạn ^^.
Gần đây mình có thử tìm hiểu cách thức làm thì mình thấy nó khá đơn giản nên mình muốn chia sẻ thông qua bài viết này.
### Chuẩn bị
Đầu tiên thì chúng ta cần thiết lập sẵn cho project hỗ trợ đa ngôn ngữ như trong bài viết mình đã nói ở trên ( [Ứng dụng đa ngôn ngữ](https://viblo.asia/p/ung-dung-da-ngon-ngu-07LKXNmDlV4) ).
> Localization is the process of translating your app into multiple languages.
### Bắt đầu
Ở bài viết này mình sẽ chỉ cấu hình project của mình hỗ trợ ngôn ngữ tiếng Anh và tiếng Việt. Sau khi đã config project xong, mình sẽ có 2 file đó là:
![](https://images.viblo.asia/0a4ad77b-5a58-475c-9559-e9b67e587c35.png)
Nội dung 2 file thì mình sẽ define như sau:
```
Localizable.strings (ENGLISH)
"Home" = "Home";
```
```
Localizable.strings (VIETNAMESE)
"Home" = "Trang chu";
```
----
Tiếp theo, project hiện tại của mình sẽ có flow như sau: Mở app lên sẽ vào 1 màn hình có tên là SplashVC. Sau khi xử lý delay tại màn hình SplashVC 3s thì mình sẽ cho di chuyển vào màn hình có chứa TabBar bao gôm 4 tab con. Và dưới đây là giao diện của project này:
![](https://images.viblo.asia/984101fe-6b3f-48e8-9795-3b0522603769.png)

Như hình trên, mình có tạo ra 2 button tượng trưng cho action khi user chọn một ngôn ngữ mà họ muốn sử dụng trên app.

----
### Thiết lập ngôn ngữ hiển thị.
Theo tài liệu của Apple mà mình tìm hiểu được
> In general, you should not change the iOS system language (via use of the AppleLanguages pref key) from within your application. This goes against the basic iOS user model for switching languages in the Settings app, and also uses a preference key that is not documented, meaning that at some point in the future, the key name could change, which would break your application.
Và trong code thực tế, app của mình có hỗ trợ đó là tiếng Anh và tiếng Việt. Với tiếng Anh mình sẽ lưu value là : en , còn tiếng Việt sẽ là: vi
```
UserDefaults.standard.set("vi", forKey: "AppleLanguage")
or
UserDefaults.standard.set("en", forKey: "AppleLanguage")
```
Sau khi lưu lại value cho key "AppleLanguage" chắc các bạn đang tự hỏi là như vậy đã được chưa? Như thế này là chúng ta đã đi được 40% rồi.
Tiếp theo sau khi lưu lại thì chúng ta sẽ cần sử dụng NSLocalizedString để lấy ra được ngôn ngữ tương ứng trong file Localizable đã tạo ra trước đó tương ứng với ngôn ngữ mà chúng ta vừa chọn.
> If you want to switch languages in your application, you can do so via manually loading resource files in your bundle.
> You can use NSBundle:pathForResource:ofType:inDirectory:forLocalization: for this purpose, but keep in mind that your application would be responsible for all loading of localized data.
Ở đây mình viết ra 1 extension:
```
extension String {
    var localized: String {
        guard let currentLanguages = UserDefaults.standard.string(forKey: "AppleLanguage"), let bundlePath = Bundle.main.path(forResource: currentLanguages, ofType: "lproj"), let bundle = Bundle(path: bundlePath) else {
            return NSLocalizedString(self, comment: "")
        }
        return NSLocalizedString(self, tableName: nil, bundle: bundle, comment: "")
    }
}
```
Tiếp theo, tại màn hình Home lúc này, mình sử dụng như sau:
```
//trong viewDidLoad
lbHome.text = Constant.Text.home.localized //key đã define trong file strings
```
### Kết thúc
Sau khi đã hoàn thành các bước trên, các bạn chỉ cần xử lý trong action của người dùng lưu lại ngôn ngữ mà người dùng chọn
```
  @IBAction func btnVietnamese(_ sender: Any) {
        UserDefaults.standard.set("vi", forKey: "AppleLanguage")
    }
    
    @IBAction func btnEnglish(_ sender: Any) {
        UserDefaults.standard.set("en", forKey: "AppleLanguage")
    }
```
*** Lưu ý rằng bạn cần phải khởi động lại app thì mới có thể nhìn thấy ngôn ngữ được thay đổi bởi vì hệ thống yêu cầu app cần phải được khởi tạo lần đầu. Tuy nhiên ở đây mình thấy rằng có thể change root về màn hình đầu tiên của app là có thể update lại language mà không cần người dùng tắt app đi. Ví dụ dưới đây:
```
  @IBAction func btnVietnamese(_ sender: Any) {
        UserDefaults.standard.set("vi", forKey: "AppleLanguage")
        let tutorial = SplashVC.getViewControllerFromStoryboard(Storyboard.Main.name)
        self.view.window?.rootViewController = tutorial
    }
    
    @IBAction func btnEnglish(_ sender: Any) {
        UserDefaults.standard.set("en", forKey: "AppleLanguage")
        let tutorial = SplashVC.getViewControllerFromStoryboard(Storyboard.Main.name)
        self.view.window?.rootViewController = tutorial
    }
```
Kết qủa:
![](https://images.viblo.asia/cf8d204f-45aa-48a6-9da5-d3602d65f264.gif)