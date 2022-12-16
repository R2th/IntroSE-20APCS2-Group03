# Lời tựa: 
Mặc dù hiện nay đã có nhiều flutter package hỗ trợ việc chia môi trường cho anh em sử dụng, nhưng Quokka vẫn muốn tự 
thân tự code và cấu hình. Các công cụ sinh ra để hỗ trợ năng suất của DEV, nhưng cũng đừng nên phụ thuộc vào nó quá đúng không nào?! 
# Bài viết: Sử dụng Flutter flavors để thiết lập môi trường DEV và LIVE - Phần 1 - Android
Nguồn: https://www.chwe.at/2020/10/flutter-flavors/
## Đặt vấn đề
Sẽ đến một lúc nào đó team của bạn sẽ nhận được một dự án có các yêu cầu tương tự như dưới đây:

* Ứng dụng có mục tiêu là nền tảng iOS và Android.
* Khách muốn triển khai các API URL khác nhau trên hai môi trường DEV và LIVE.
* Team DEV không thể tự ý thay đổi code giữa hai môi trường.
* Khách muốn cài đặt DEV app và LIVE app trên cùng một thiết bị cùng một lúc.

Cách tốt nhất để giải quyết các yêu cầu trên trong Flutter là sử dụng **flavors**. Bạn có thể tham khảo chúng trên trang Flutter docs hoặc theo dõi bài viết này để tự thiết lập môi trường cho mình.

Trước khi bắt đầu, hãy chắc chắn rằng bạn có XCode cài đặt trên Mac để thiết lập trên iOS và Android Studio để thiết lập trên Android. 
Bạn cũng cần cài đặt Flutter trên máy.
Quokka sử dụng Flutter v1.22.0 cho bài viết này.
## Khởi tạo dự án
Hãy tạo một project nho nhỏ để chạy code của chúng ta. Quokka sử dụng câu lệnh bên dưới để tạo (Bạn cũng có thể tạo project theo cách bình thường của bạn):
```
flutter create --project-name flutter_flavors.
```
Sau đó khởi chạy nó và đảm bảm rằng dự án hoạt động bình thường.
## Thêm cài đặt Flutter build cho các môi trường bằng Android Studio
*Quokka muốn có hai flavors là `dev` và `live`.*

Nếu bạn muốn chạy ứng dụng Flutter với flavor, bạn có thể sử dụng tham số `--flavor NAME` trong Flutter CLI. Hoặc để quá trình này diễn ra một cách tự động trong Android Studio, ta phải thay đổi các cài đặt:

* Tìm `main.dart` trong Android Studio ở thành công cụ phía trên cùng và chọn `Edit Configurations...`. Nó sẽ mở cửa số "Run/Debug Configurations".
* Thay đổi `Name:` thành `dev`
*  `Build flavor:` set thành `dev`
*  Đảm bảo rằng "**Share through VCS**" đã được tích.
*  Sao chép thiết lập dev (Cái icon ở phía trên bên trái của cửa sổ)
*  Tương tự `dev` ta thay `Name:` và `Build flavor:` thành `live`.
*  Đảm bảo rằng "Share through VCS" đã được tích.
*  Đóng cửa sổ. Lúc này "main.dart" ở thanh công cụ phía trên đã được thay thế bằng "dev".

**NOTE:** Các tên của Flavor không thể bắt đầu bằng giá trị "test" vì nó không được cho phép trong Android.
### Thêm thiết lập build vào Git
Nếu dùng git, khi bạn chọn "Share through VCS", Android Studio sẽ tạo ra các file trong thư mục `.idea/runConfigurations`, ta sẽ thêm các file này vào `.gitignore`:
```
git add .idea/runConfigurations/dev.xml -f
git add .idea/runConfigurations/live.xml -f
git commit -m 'Persist flutter build configurations'
```
## Cài đặt flavor cho Android
Để thực sự sử dụng các flavors khác nhau, chúng ta phải thiết lập chúng trong thư mục `lib` và trong mỗi nền tảng (android, ios...).
### Thêm method channel trong code Android
Khi ứng dụng khởi chạy, Flutter cần một cách nào đó để hỏi xem nền tảng gốc đã khởi chạy theo flavor nào. Để giao tiếp với native code, Flutter sử dụng `method channels`.

Truy cập vào `android/app/src/main/kotlin/com.example.flutter_flavors` và thay thế code như dưới đây. Điều này sẽ thiết lập method channel return về giá trị `BuildConfig.FLAVOR` (một giá trị built-in của Android).

```
import androidx.annotation.NonNull;
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import io.flutter.plugins.GeneratedPluginRegistrant

class MainActivity: FlutterActivity() {
    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        GeneratedPluginRegistrant.registerWith(flutterEngine);

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "flavor").setMethodCallHandler {
            call, result -> result.success(BuildConfig.FLAVOR)
        }
    }
}
```
### Thêm flavor-settings vào Android build config
Trong Android, giá trị flavor cụ thể của ứng dụng sẽ được lưu trong  `android/app/src/build.gradle` thông qua các key `android.flavorDimensions` và  `android.productFlavors`.
Quokka sẽ sử dụng các key đó để thiết lập `applicationId` và tên ứng dụng cụ thể cho từng môi trường. Điều này thực sự quan trọng bởi vì mục tiêu của khách hàng muốn là có thể cài đặt nhiều ứng dụng có môi trường khác nhau cùng một lúc.
`applicationId` là id của ứng dụng trong cửa hàng Google Play. Mỗi khi chúng ta xuất bản một ứng dụng lên Google Play, nó sẽ không thể thay đổi được.
Quokka sẽ sử dụng thiết lập các `applicationId`ứng với từng môi trường:
```
android {
    // ... all existing things like `sourceSets`, ...

    flavorDimensions "app"

    productFlavors {
        dev {
            dimension "app"
            applicationId "at.chwe.flutterflavors.dev"
            resValue "string", "app_name", "DEV Flutter Flavors"
        }
        live {
            dimension "app"
            applicationId "at.chwe.flutterflavors"
            resValue "string", "app_name", "Flutter Flavors"
        }
    }
}
```

### Sử dụng `app_name` trong `AndroidManifest.xml`
`applicationId` là unique key sẽ được sử dụng khi ứng dụng được khởi chạy với một flavor nhất định.

Tuy nhiên, Quokka sẽ cần thực hiện thêm một số việc để `app_name` có giá trị đúng ý muốn: Mở `android/app/src/main/AndroidManifest.xml` và thay ` <application android:label="flutter_flavors" />`  bằng `<application android:label="@string/app_name" />`.

**Note:** `flutter_flavors` là tên ứng dụng mặc định trong project của bạn.
### Chạy lại ứng dụng trên Android
Vì Quokka hiện đang sử dụng các id ứng dụng mới, để không bị nhầm lẫn, hãy gỡ ứng dụng đã được cài đặt trước đó ra.

Bây giờ, hãy khởi chạy ứng dụng trong Android Studio với cấu hình  “dev”.

Quokka đóng ứng dụng trong thiết bị và kiểm tra danh sách ứng dụng, tên ứng dụng của Quokka bây giờ sẽ hiển thị “DEV Flutter Flavors”!
![application](https://www.chwe.at/images/posts/2020/flutter_flavors_app_icons_on_android.png)

Dừng ứng dụng trong Android Studio, thay đổi cấu hình thành "live" và khởi chạy lại ứng dụng.

Bây giờ, Quooka đã có cả hai phiên bản ứng dụng được cài đặt trên thiết bị Android của mình!
Cấu hình Android của đã hoàn tất.
### Lấy giá trị flavor từ code Flutter
Như được mô tả trong yêu cầu từ đầu bài viết, dự án của team muốn có các API khác nhau cho mỗi môi trường, vì vậy Quokka cần một cách để lấy được giá trị flavor hiện tại của ứng dụng trong code Flutter.

Trước tiên, Quokka sẽ thêm một lớp `FlavorSettings` vào một file mới `lib/flavor_settings.dart`. File này sẽ chứa tất cả các cài đặt dành riêng cho flavor tương ứng mà chúng ta cần:

```
/// Contains the hard-coded settings per flavor.
class FlavorSettings {
  final String apiBaseUrl;
  // TODO Add any additional flavor-specific settings here.

  FlavorSettings.dev()
    : apiBaseUrl = 'https://dev.flutter-flavors.chwe.at';

  FlavorSettings.live()
    : apiBaseUrl = 'https://flutter-flavors.chwe.at';
}
```
Tiếp theo, Quokka sẽ gọi đoạn code trên từ file `main.dart`, nơi Quokka sẽ lấy giá trị flavor thông qua method channel đã được tạo từ nền tảng gốc và Quokka sẽ tạo-đối tượng tương ứng `FlavorSettings`. Quokka cũng cho hàm `main` thành bất đồng bộ.

Tiếp tục,  hãy thêm đoạn code phía dưới (trước dòng class MyApp extends `StatelessWidget {`) :
```
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'flavor_settings.dart';

Future<void> main() async {
  // NOTE: This is required for accessing the method channel before runApp().
  WidgetsFlutterBinding.ensureInitialized();

  final settings = await _getFlavorSettings();
  print('API URL ${settings.apiBaseUrl}');

  runApp(MyApp());
}

Future<FlavorSettings> _getFlavorSettings() async {
  String flavor = await const MethodChannel('flavor')
        .invokeMethod<String>('getFlavor');

  print('STARTED WITH FLAVOR $flavor');

  if (flavor == 'dev') {
    return FlavorSettings.dev();
  } else if (flavor == 'live') {
    return FlavorSettings.live();
  } else {
    throw Exception("Unknown flavor: $flavor");
  }
}

// ... class MyApp extends StatelessWidget {
```
Chạy ứng dụng với cấu hình `dev`  và xem đầu ra của console. Nó sẽ hiển thị các câu lệnh sau:
```
I/flutter ( 4458): STARTED WITH FLAVOR dev
I/flutter ( 4458): API URL https://dev.flutter-flavors.chwe.at
```
Chuyển sang  cấu hình `live` và chạy lại ứng dụng của bạn. Lần này, console sẽ hiển thị các câu lệnh sau:
```
I/flutter ( 4615): STARTED WITH FLAVOR live
I/flutter ( 4615): API URL https://flutter-flavors.chwe.at
```
Ngon! Bây giờ Quokka có thể truy cập flavor của ứng dụng hiện tại từ code Flutter và từ đó Quokka có thể có các cài đặt dành riêng cho các flavor tương ứng.

**Note:** Bạn có thể chuyển `FlavorSettings` instance xuống các widget của mình theo cách thủ công hoặc có thể sử dụng các cách tiêm phụ thuộc: ví dụ như `provider`, `get_it`..vân..vân... Hoặc nếu chưa hiểu cách tiêm phụ thuộc trong Flutter, bạn có thể tham khảo bài viết trước của Quokka nhé !
# Thu hoạch
Qua bài viết này, Quokka đã hiểu ra cách cấu hình và lấy giá trị FLAVOR từ Android thông qua Method Channel. Từ giá trị FLAVOR, bạn hoàn toàn có thể thiết lập các thông số cấu hình tương ứng với môi trường mà team bạn đã đặt ra.

Ở bài tiếp theo, Quokka sẽ hướng dẫn các bạn tự cấu hình môi trường build trên iOS, nhớ theo dõi nhé. Quokka cảm ơn ! <3
Ôm cái nào...

![hug](https://allthatsinteresting.com/wordpress/wp-content/uploads/2020/03/quokka-leaping-toward-the-camera.jpg)