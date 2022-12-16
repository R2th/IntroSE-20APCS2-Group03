# 1. Giới thiệu Repro
## 1.1. Repro là gì?
- Repro là 1 dịch vụ marketing kỹ thuật số, cung cấp nhiều phương pháp và cách thức để đạt được mục tiêu marketing. Có hệ thống customer service mạnh mẽ, có hỗ trợ backup data marketing

- Repro là 1 công cụ phân tích dữ liệu để phục vụ cho mục đích marketing. Có thể giải quyết các vấn đề kỹ thuật trong marketing một cách hiệu quả và toàn diện, chẳng hạn như thu hút người dùng, khám phá các vấn đề về ứng dụng và web, cải thiện và duy trì tỷ lệ thanh toán.

## 1.2. Các chức năng chính của Repro
### 1.2.1. Analystic
- Phân tích định lượng: repro giúp bạn xác định được các vấn đề của app thông qua 4 phương thức phân tích định lượng
- Phân tích định tính: repro có thể giúp bạn xác định được các vấn đề của app thông các phương thức khác như: video record, in app message ...

### 1.2.2. Marketing
- In-app marketing: Repro cung cấp các công cụ in app marketing giúp thay đổi charging rate dựa theo kết quả analystic
- Advertisment: với các data từ analystic bạn có thể tạo những quảng cáo nhắm đến nhóm người dùng mục tiêu

Giới thiệu sơ sơ thế thôi, cùng xem làm thế nào để tích hợp Repro SDK vào iOS project nhé

# 2. Get Started
## 2.1. Sign Up 
Trước tiên bạn cần phải đăng ký 1 tài khoản của Repro đã nhé: https://app.repro.io/suppliers/sign_up

## 2.2. Install Repro SDK
Cách 1: Dùng cocoapods. Để install Repro bằng cocoapods bạn cần phải thêm đoạn code sau vào podfile:
```
target 'YOUR-PROJECT-NAME' do
        pod "Repro"
end
```
Sau đó chạy command line: `$ pod install`

Cách 2: Thêm framework bằng tay :D :
- Download framework mới nhất: https://github.com/reproio/repro-ios-sdk/releases
- Add **Repro.embeddedframework** vào Project của bạn: **Targets -> Build Phases -> Link Binary With Libraries**
![](https://images.viblo.asia/f1c9c426-231f-4428-b666-d7c69818a983.png)
- Sau đó thêm các framework sau:
* AVFoundation.framework
* CoreMedia.framework
* CoreTelephony.framework
* MobileCoreServices.framework
* Security.framework
* SystemConfiguration.framework
* libz.tbd
![](https://images.viblo.asia/07fbed13-a59c-455a-8a7d-cfcc1916f805.png)

## 2.3. Setup
Ở file *AppDelegate.swift* và hàm *application:didFinishLaunchingWithOptions:*  bạn cần thêm code như sau:

```
import Repro

...

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    ...

    // Setup Repro You can find the YOUR_APP_TOKEN at SDK Token in SETTINGS > APP SETTINGS on the management screen.
    Repro.setup("YOUR_APP_TOKEN")

    // Call the following methods to use Repro's features; they can be called in any desirable place within the app.

    // Start Recording: nếu app của bạn có sử dụng chức năng screen record thì mới start thôi nhé.
    Repro.startRecording()

    ...
}
```

Như vậy là bạn đã hoàn tất quá trình cài đặt Repro SDK rồi.


## 2.4. Track event

Nhắm đến đúng mục tiêu nhóm người dùng là rất quan trọng để có thể thực hiện phân tích dữ liệu hoặc marketing một cách hiệu quả. Bằng cách theo dõi hành vi của người dùng dưới dạng các event, bạn sẽ có thể chọn đúng nhóm người dùng theo mục đích của bạn từ Dashboard của Repro.

Ví dụ về nhóm người dùng nhắm mục tiêu với các sự kiện:

[* Tạo 1 campain hoặc xem các video đã ghi của một nhóm người dùng cụ thể từ các phân tích](https://docs.repro.io/en/dashboard/analytics/target-from-analytics.html)

[* Lọc các video đã ghi từ danh sách tất các videos](https://docs.repro.io/en/dashboard/movie/screen-recording.html)

[* Chỉ định nhóm người dùng mục tiêu cho campain bằng các bộ lọc Events và User Profiles](https://docs.repro.io/en/dashboard/campaign/target.html)

Nếu bạn không biết chính xác những sự kiện sẽ theo dõi trong ứng dụng của mình, thì bạn nên bắt đầu theo dõi Event cho tất cả các màn hình khi hiển thị.

Ví dụ:
```
class MainViewController: UIViewController {

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        Repro.track("MainViewController", properties: nil)

        ...
    }
   
}
```


## 2.5. Set User ID

Các kết quả phân tích sẽ được Repro được tổng hợp cho mỗi người dùng. Bằng cách đặt User ID, bạn có được những lợi thế dưới đây:

* Xác định cùng một người dùng trên nhiều thiết bị
* Xác định người dùng mục tiêu trong ứng dụng từ danh sách [recorded videos](https://docs.repro.io/en/dashboard/movie/screen-recording.html) hoặc [Testers Managament](https://docs.repro.io/en/dashboard/campaign/testers-management.html) và dùng cho các tính năng khác
* Nhắm mục tiêu cho các campain chính xác hơn

Xin vui lòng xem tại [đây](https://docs.repro.io/en/dev/sdk/user-id.html) để biết thêm chi tiết.

## 2.6. Các tính năng khác

Các tính này nó đi hơi sâu về các tính năng của repro nên mình sẽ không trực tiếp giới thiệu trong bài viết, nhưng những bạn quan tâm có thể và đây để xem thông tin chi tiết nhé ;)

* [Session Lifecycle](https://docs.repro.io/en/dev/sdk/session.html)
* [Event Tracking](https://docs.repro.io/en/dev/sdk/tracking.html)
* [Recording](https://docs.repro.io/en/dev/sdk/recording.html)
* [Masking](https://docs.repro.io/en/dev/sdk/masking.html)
* [User ID](https://docs.repro.io/en/dev/sdk/user-id.html)
* [Device ID](https://docs.repro.io/en/dev/sdk/device-id.html)
* [User Profile](https://docs.repro.io/en/dev/sdk/user-profile.html)
* [WebView](https://docs.repro.io/en/dev/sdk/webview.html)
* [In-App Message](https://docs.repro.io/en/dev/sdk/in-app-message.html)
* [Push Notification](https://docs.repro.io/en/dev/sdk/push-notification/index.html)
* [Integrate Adjust](https://docs.repro.io/en/dev/sdk/integrate-adjust.html)
* [Integrate AppsFlyer](https://docs.repro.io/en/dev/sdk/integrate-appsflyer.html)

# Kết luận
Qua bài viết hi vọng các bạn có cái nhìn bao quát về các tính năng của Repro từ đó xem xét xem có nên thêm Repro vào Project của mình không.


Tài liệu tham khảo:
- Repro: https://repro.io/jp/
- Repro Get Started: iOS: https://docs.repro.io/en/dev/sdk/getstarted/ios.html#ios