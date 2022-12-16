# Mục đích của project
:boom: Project này sẽ hướng dẫn bạn distribute app sử dụng Firebase App Distribution và fastlane. 
<p align="center">
  <a href="https://console.firebase.google.com/u/0/"><img src="https://miro.medium.com/max/3200/1*ipwpqQrHz0Lkd_5setXQCQ.jpeg" width="150" align="center"/></a>
  <a href="https://fastlane.tools/"><img src="https://miro.medium.com/max/1031/1*txtcYocQEGtOFN33ZCTDbw.png" width="150" align="center"/></a>
</p>

## Firebase App Distribution via fastlane
# Công cụ và thành phần
## Firebase App Distribution
🔥 Firebase App Distribution giúp việc phân phối ứng dụng của bạn đến testers trở nên dễ dàng. Bằng cách đưa ứng dụng của bạn lên thiết bị của testers một cách nhanh chóng, bạn sẽ nhận được phản hồi sớm và thường xuyên. Và nếu bạn sử dụng Crashlytics trong ứng dụng của mình, bạn sẽ tự động nhận được các chỉ số về độ ổn định cho tất cả các bản build của app, để biết khi nào app sẵn sàng release. Vui lòng truy cập [Firebase App Distribution page](https://firebase.google.com/docs/app-distribution) để biết thêm chi tiết.

## fastlane
🚀 fastlane tự động build archive, deployment các bản development, release cho các ứng dụng iOS và Android của bạn. 🚀 fastlane xử lý tất cả các tác vụ tạo ảnh chụp màn hình (screenshots), code signing, và release app. Vui lòng truy cập [fastlane page](https://docs.fastlane.tools/) để biết thêm chi tiết.
# Các bước thực hiện
Phần này có 5 bước cần thực hiện. Bạn sẽ hiểu cách hoạt động của cả Firebase và iOS
## Firebase side
### Tạo mới Firebase project
1. Tại phần Firebase console, chọn Add project, sau đó chọn cũ hoặc thêm mới Project name.

![](https://images.viblo.asia/f9cbb9da-31e7-442a-a932-560a3af5005d.png)
2. Click Continue.
3. Click Create project.

### Đăng ký app sử dụng Firebase
Ở phần này, bạn sẽ biết làm thế nào đăng ký ứng dụng của bạn qua [Firebase Console](https://console.firebase.google.com/u/0/)

1. Chọn iOS icon tiếp tục cài đặt.

![](https://images.viblo.asia/89d8a368-d028-42e4-b112-1398a8bd542a.png)

2. Nhập các mục tuỳ chọn thông tin app, sau đó chọn **Register app** icon
* Nhập **iOS bundle ID** của app, có định dạng như mẫu **(com.company.appname).**
* Tuỳ chọn nhập **App nickname** biệt hiệu sẽ được sử dụng trong bảng Firebase Console để đại diện cho ứng dụng này. Biệt hiệu không hiển thị với người dùng.
* Tuỳ chọn nhập **App Store ID** của mình trong URL của ứng dụng. Trong ví dụ dưới đây, 123456789 là ID của [App Store.](https://apps.apple.com/us/app/yourapp/id123456789)

### Thêm file cấu hình Firebase
* Chọn Download **GoogleService-Info.plist**
* Kéo configuration file **.plist** vào thư mục XCode app, và save lại file.

![](https://images.viblo.asia/7c41c783-5ef6-4a3b-8421-01e67d13d011.png)

### Cài đặt Firebase SDKs
Google Service sử dụng [CocoaPods](https://cocoapods.org/) để cài đặt và quản lý dependencies. Cài đặt gói Firebase SDK theo hướng dẫn [Firebase side](https://firebase.google.com/docs/ios/setup#available-pods). Mở terminal và điều hướng đến thư mục Project-Xcode của app

1. Tạo pod file trong thư mục Xcode-Project:

   `pod init`
2. Mở và thêm dòng lệnh sau vào Podfile:

   `pod 'Firebase'`
3. Chạy lệnh `pod install` cài đặt dependencies firebase.
4. Để kết nối Firebase khi ứng dụng của bạn khởi động, hãy thêm mã khởi tạo bên dưới vào lớp AppDelegate chính của bạn, sau đó chọn **Next** icon.
   ```groovy
   import UIKit
   import Firebase

   @UIApplicationMain
   class AppDelegate: UIResponder, UIApplicationDelegate {

     var window: UIWindow?

     func application(_ application: UIApplication,
       didFinishLaunchingWithOptions launchOptions:
         [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
       FirebaseApp.configure()
       return true
     }
   }
   
4. Build app để kết nối đến Firebase Console, sau đó chọn **Continue to console** icon
## iOS side
### Cài đặt fastlane trên macOS
1. Cài đặt fastlane
   * RubyGems (macOS/Linux/Windows), chạy mã lệnh sau: 
   `sudo gem install fastlane -NV`
   * Homebrew (macOS), chạy mã lệnh sau:
   `brew install fastlane`
### Cài đặt fastlane lên App
1. Điều hướng terminal đến XCode-Project của app, ví dụ như mã lệnh dưới

   `cd /Volumes/Data/IT/iOS/FirebaseAppDistributionExample`
2. Chạy lệnh `fastlane init` để cài đặt và thiết lập các dependencies
   * Tham khảo thêm các tuỳ chọn cài đặt khác [tại đây](https://docs.fastlane.tools/getting-started/ios/setup/).
   * Chọn option **4** vì chúng ta không triển khai app lên Testflight hay AppStore

```groovy
1. 📸  Automate screenshots
2. 👩‍✈️  Automate beta distribution to TestFlight
3. 🚀  Automate App Store distribution
4. 🛠  Manual setup - manually setup your project to automate your tasks
?  4
```

3. Để thêm **App Distribution** vào cấu hình fastlane của bạn, hãy chạy lệnh sau từ thư mục gốc của dự án iOS:

   `fastlane add_plugin firebase_app_distribution`

4. Cài đăt xong các bạn, thư mục project bao gồm:

![](https://images.viblo.asia/40e8c928-a533-4dc9-a2c9-ef7ab70f1b15.png)

**Appfile** khai báo các thông tin liên quan tới việc build app và nó cũng sẽ tự động sinh ra một số trường nếu bạn chọn 1 trong số 3 option phía trên

**Fastfile** sẽ giao tiếp qua các đoạn script để cấu hình cho fastlane.

Để viết được script cho fastlane thì tốt nhất là bạn nên đọc qua [Fastlane Documentation](https://docs.fastlane.tools/) để hiểu cú pháp, nó rất là dễ và ít thôi nên bạn hãy xem qua nó để tránh việc mất thời gian để dò lỗi cú pháp.

Để mở **Fastfile** thì bạn có thể dùng vim, TextEdit.

### Xác thực với Firebase
1. Trước khi có thể sử dụng plugin Fastlane, bạn phải xác thực với dự án Firebase của mình. Có ba cách để đạt thực hiện điều này:
   * [Sign in to your Google Account via the plugin's login action](https://firebase.google.com/docs/app-distribution/ios/distribute-fastlane#google-acc-fastlane)
   * [Use Firebase service account credentials](https://firebase.google.com/docs/app-distribution/ios/distribute-fastlane#service-acc-fastlane)
   * [Sign in using the Firebase CLI](https://firebase.google.com/docs/app-distribution/ios/distribute-fastlane#cli-fastlane)
2. Chạy lệnh `fastlane run firebase_app_distribution_login`, chúng ta sẽ được đường link xác thực như hình ảnh sau :

```groovy
[23:05:25]: ---------------------------------------------
[23:05:25]: --- Step: firebase_app_distribution_login ---
[23:05:25]: ---------------------------------------------
[23:05:25]: Open the following address in your browser and sign in with your Google account:
[23:05:25]: https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=force&client_id=563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com&include_granted_scopes=true&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code&scope=https://www.googleapis.com/auth/cloud-platform
[23:05:25]: Enter the resulting code here:
```

3. Copy đường link và dán vào trình duyệt web (Safari, Chrome, IE), để lấy mã xác thực **paste** vào line `Enter the resulting code here:`, ví dụ như đoạn mã sau:

   `Enter the resulting code here: 4/4wH0fTw-lWD7g5VjX4Bot24Z8bUf9dg1XAhhLt1ZpERE4fT0FEC2n1c`
   
4. Kết quả cuối cùng sẽ thu được [firebase_cli_token](https://firebase.google.com/docs/app-distribution/ios/distribute-fastlane#google-acc-fastlane), sử dụng cấu hình Fastlane file sau này

```groovy
    [23:05:25]: Enter the resulting code here: 4/4wH0fTw-lWD7g5VjX4Bot24Z8bUf9dg1XAhhLt1ZpERE4fT0FEC2n1c
    [23:13:22]: Set the refresh token as the FIREBASE_TOKEN environment variable
    [23:13:22]: Refresh Token: 1//0eFiUnmw0hkpYCgYIARAAGA4SNwF-L9Ir0gcX5P_qPkX7PaWFEsMMzQR_vdtEt0vJanCluQ5C4Y21O1jkcagBNVWAfmHeQCxizR4
    [23:13:22]: Result: true
```

###  Cấu hình fastlane file để distribute application
1. fastlane đảm nhận việc build IPA ứng dụng của bạn với hướng dẫn sau:
   * Mở file Fastfile
   * Thêm đoạn mã như sau để fastlane build file IPA
   
   ```groovy
   default_platform(:ios)

   platform :ios do
     desc "Description of what the lane does"
     lane :distribution do
        build_app(scheme: "FirebaseAppDistributionExample",
                workspace: "FirebaseAppDistributionExample.xcworkspace",
                include_bitcode: true,
                export_method: "development")
                
        firebase_app_distribution(
                app: "1:386673329896:ios:b6f2e329f726dd9b7bab5d",
                firebase_cli_token: "1//0eFiUnmw0hkpYCgYIARAAGA4SNwF-L9Ir0gcX5P_qPkX7PaWFEsMMzQR_vdtEt0vJanCluQ5C4Y21O1jkcagBNVWAfmHeQCxizR4",
                testers: "example@gmail.com",
                release_notes: "Lots of amazing new features to test out!")
     end
   end
   ```
2. Mô tả options:
   * default_platform: Khai báo môi trường sử dụng là iOS hoặc Android
   * scheme: The project's scheme
   * workspace: Đường dẫn đến file làm việc
   * export_method: Phương thúc sử dụng để xuất ra file archive **(app-storre, ad-hoc, package, enterprise, development)**
   * app: Firebase App ID, có thể được tìm thấy trong **GoogleService-Info.plist**
   * firebase_cli_token: Refresh token tạo ra trong quá trình chạy plugin's login action
   * testers/testers_file: Địa chỉ email testers bạn muốn gửi link invite
   * releases_notes/release_notes_file: Thông tin bản build 
   
3. Bước cuối cùng là chạy lệnh lane, đây là bước cuối cùng. [Xem hướng dẫn](#Chạy-lệnh-lane)

## Firebase Console side
Chúng ta cần settings tester, group, invite link trên Firebase console để distribute app
### Thêm testers và group
1. Điều huớng đến phần **App Distribution** trong Firebase console.

![](https://images.viblo.asia/7061ab8a-2345-447a-a6d6-418c292cfbaf.png)

2. Điều huớng đến **Testers & Groups** để tạo testers hoặc groups sẽ nhận được bản cập nhật ứng dụng thông qua App Tester.

![](https://images.viblo.asia/e59ab57e-404d-4414-95ce-38f8d5ea5df4.png)

### Tạo link invite
1. Bạn có thể tạo liên kết invite cho phép testers đăng ký qua liên kết này

![](https://images.viblo.asia/a05672ca-2049-4dac-8944-312f43e8d24e.png)

### Distribute app đến testers
1. Thay vì bạn cung cấp IPA file thủ công, fastlane sẽ archive và upload files khi bạn [chạy mã lệnh](#Chạy-lệnh-lane)

![](https://images.viblo.asia/48fc1953-eade-4ce1-869c-4fb488ef0120.png)

Khi bạn expand bất kỳ bản build nào sẽ thấy các địa chỉ email đã được mời và release notes.

![](https://images.viblo.asia/df310265-f45d-4c18-9db7-7b567d119173.png)

2. Phần quan trọng nhất, khi upload bản build lên Firebase console, bạn cần thêm email testers:

![](https://images.viblo.asia/e96aa306-24c1-4fd2-999c-f4c3791a96a2.png)

Sau khi thêm testers, click **Next**.

3. Chọn **Distribute to N tester** icon.

![](https://images.viblo.asia/751a6dcb-7814-409a-a733-e7a90e66afe8.png)

4. Distribution thành công. Giờ hãy check lại lời mời trong email của bạn. Chi tiết tại [iOS Device side](#iOS-Device-side)

## iOS Device side
### Tải app thông qua email
1. Mở địa chỉ email đăng ký với Firebase console.
2. Đia chỉ email có giao diện như sau

![](https://images.viblo.asia/87d7391a-8f8e-4e57-9cf8-d85c766742b5.png)

3. Chọn **Get setup**, để tiến hành tải và cài đặt ứng bản build
4. 🎊 Yay! Vậy là bạn đã cài đặt được bản build lên thiết bị của bạn !
## Chạy lệnh lane
💥 Chạy lệnh sau bắt đầu tiến trình distribute ứng dụng 🎊

   `fastlane distribution`
   
🎊 Nếu tiến trình chạy thành công, thư mục Xcode-Project sẽ có thêm 2 file IPA và dSYM, như hình sau:

![](https://images.viblo.asia/debe9dca-9e22-4b59-8619-60c2ce2756ba.png)
   
   **...Và kết quả !**
   
   ```groovy
   [10:46:53]: Successfully exported and compressed dSYM file
   [10:46:53]: Successfully exported and signed the ipa file:
   [10:46:53]: /Volumes/Data/IT/iOS/FirebaseAppDistributionExample/FirebaseAppDistributionExample.ipa
   [10:46:53]: ---------------------------------------
   [10:46:53]: --- Step: firebase_app_distribution ---
   [10:46:53]: ---------------------------------------
   [10:46:53]: Authenticating with --firebase_cli_token parameter
   [10:46:53]: 🔐 Authenticated successfully.
   [10:46:56]: ⌛ Uploading the IPA.
   [10:47:02]: ✅ Uploaded the IPA.
   [10:47:03]: ✅ Posted release notes.
   [10:47:04]: ✅ Added testers/groups.
   [10:47:04]: 🎉 App Distribution upload finished successfully.
   [10:47:04]: ----------------------
   [10:47:04]: --- Step: chatwork ---
   [10:47:04]: ----------------------
   [10:47:04]: Successfully sent notification to ChatWork right now 📢

   +------+---------------------------+-------------+
   |                fastlane summary                |
   +------+---------------------------+-------------+
   | Step | Action                    | Time (in s) |
   +------+---------------------------+-------------+
   | 1    | default_platform          | 0           |
   | 2    | build_app                 | 141         |
   | 3    | firebase_app_distribution | 10          |
   | 4    | chatwork                  | 0           |
   +------+---------------------------+-------------+

   [10:47:04]: fastlane.tools finished successfully 🎉
   ```
   
## Plugins - Bonus*
### Chatwork
Tích hợp chatwork API với fastlane

1. API Token

Chọn **Account** -> **Integrations** -> **API Token** -> **Enter Password** -> **Display** icon

![](https://images.viblo.asia/c4b9e379-58ae-4391-9230-40df90c15f1c.png)

2. Group Chat

![](https://images.viblo.asia/00a99b58-daf3-486f-9049-a6ed760cd157.png)

3. Cấu hình **Fastfile**

```groovy
default_platform(:ios)

platform :ios do
  desc "Description of what the lane does"
  lane :distribution do
     build_app(...)
             
     firebase_app_distribution(...)
     
     chatwork(message: "App successfully released!",
             roomid: 123456,
             success: true,
             api_token: "ab173ca1b420a318ca78c37a319a0279se")
     
  end
end
```

4. [Mô tả options](https://docs.fastlane.tools/actions/chatwork/)

5. [Chạy mã lệnh](#Chạy-lệnh-lane)

**...Và kết quả !**

![](https://images.viblo.asia/2e062532-d74b-4b91-90a7-da01f18f6260.png)

## Tài liệu tham khảo

* [Firebase App Distribution Page](https://firebase.google.com/docs/app-distribution/ios/distribute-console)
* [Firebase App Distribution and Fastlane, too fast too furious!](https://medium.com/@ryanisnhp/firebase-app-distribution-and-fastlane-5303c17b4395)
* [Fastlane Page](https://fastlane.tools/)
* [Add Firebase to your iOS project](https://firebase.google.com/docs/ios/setup)
* [Increment version code plugin](https://github.com/Jems22/fastlane-plugin-increment_version_code)
* [Get version name plugin](https://github.com/Jems22/fastlane-plugin-get-version-name)
* [carbon.now.sh](https://carbon.now.sh/)

##  Tác giả

⭐  Gặp khó khăn trong quá trình thực hiện [Github](https://github.com/ducnm-1825/u3_coding_convention/tree/cicd_ios), liên hệ [nmduc251194@gmail.com](nmduc251194@gmail.com) để được giúp đỡ. 🤩