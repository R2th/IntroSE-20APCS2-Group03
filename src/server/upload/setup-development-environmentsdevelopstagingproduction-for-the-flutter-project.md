## I. Introduction.
Trong quá trình phát triển ứng dụng di động, việc phải thiết lập các môi trường phát triển khác nhau(Develop/Staging/Production) nhằm phân tách sản phẩm, tránh việc ảnh hưởng giữa tới các công đoạn trong quá trình phát triển(develop/testing/maintain) là một việc làm cần thiết.

Đặc biệt đối với một Flutter Project, phạm vi ảnh hưởng sẽ là rất lớn khi cover cùng một lúc cho 2 môi trường, thậm chí có thể là 3(cả Web). Chính vì vậy việc phân tách rõ ràng các môi trường phát triển ngay từ đầu là một công việc cần được ưu tiên.

Trong từng giai đoạn phát triển, kiểm thử, bàn giao sản phẩm phần mềm và tuỳ vào quy trình, cách thức tổ chức development team mà chúng ta cần từ hai cho đến ba môi trường khác nhau nhằm đảm bảo output(sản phẩm đầu ra) được ổn định, không gây ảnh hưởng tới nhau làm mất thời gian xử lý các conflicts, impacts,... từ đó tăng cường chất lượng của sản phẩm mình làm ra.
Các môi trường này có thể là Develop(Sử dụng cho dev team), Staging(Sử dụng cho quá trình kiểm thử: Integration Testing, User Acceptance Testing,...), Production(Sử dụng cho quá trình maintain sản phẩm đã được release). Tất nhiên với một dự án lớn thì việc cần có nhiều hơn các môi trường này là hoàn toàn có thể, tuy nhiên với mục đích giữ cho bài viết không trở nên phức tạp(Keep Simple) cũng như sử dụng tối ưu những gì sẵn có từ một dự án Flutter thì mình sẽ chỉ hướng dẫn các bạn tạo ba môi trường trên. Các bạn cũng hoàn toàn có thể chuyển đổi linh hoạt giữa ba môi trường này trong quá trình phát triển nhằm tối ưu hoá quy trình.

Không giải thích lòng vòng nữa, ngay bây giờ mình sẽ trình bày một cách ngắn gọn nhưng là đủ để các bạn có thể thiết lập một Flutter Project cho mình đủ đáp ứng được nhưng yêu cần trên.

## II. Flutter Command Arguments.
Đây là công cụ giúp các bạn có thể thiết lập các biến môi trường cái có thể được sử dụng trong toàn bộ project(Cả về phía Flutter cũng như phía native(Android, iOS)).
Chi tiết về cách thiết lập và sử dụng các bạn có thể xem thêm [ở đây](https://viblo.asia/p/flutter-117-no-more-flavors-no-more-ios-schemas-command-argument-that-changes-everything-3P0lPB7gKox).

Trong phần cấu hình này, mình sẽ chỉ thiết lập thử 3 biến môi trường thường được sử dụng nhất(Cái nhằm phân biệt các môi trường) đó là:
1. **APP_NAME**: Tên ứng dụng, cái giúp cho developers, testers,... dễ dàng nhận biết được ứng dụng đang sử dụng thuộc môi trường nào.
2. **APP_SUFFIX**: Hậu tố cho ApplicationID/BundleID cái cần thiết để có thể cài đặt cùng lúc các ứng dụng khác nhau trên cùng một thiết bị cũng như là cái được sử dụng để tích hợp vào các hệ thống khác như Firebase, AWS, hoặc SalesForce Marketing Cloud,....
3. **BASE_URL**: Domain trỏ vào backend services.

Ngoài ra, các bạn hoàn toàn có thể tạo thêm các tham số khác nếu muốn.

Từ những tham số trên, mình cũng sẽ hướng dẫn qua để các bạn có thể tích hợp app với Firebase theo các môi trường tương ứng.

### 1. Tạo EnvironmentConfig phía Flutter.
Mình sẽ không hướng dẫn các bạn tạo một Flutter Project nữa vì điều đó sẽ làm tăng đang kể thời lượng viết cũng như đọc bài. Do đó nếu chưa tự tạo được Flutter Project cho mình thì các bạn hãy Google để biết cách làm trước đã nhé. :) Ở đây mình chỉ nêu các bước chi tiết cần thiết phù hợp với mục đích của bài viết là phân tách các môi trường phát triển khác nhau thôi nhé.

Mình tạo một project mới có tên: **Stacked State Management** cái sử dụng một template xây dựng theo kiến trúc MVVM, để biết thêm các bạn có thể tìm đọc [ở đây](https://viblo.asia/p/new-setup-for-flutter-stacked-state-management-ByEZkejA5Q0).
* **Project Name**: Stacked State Management.
* **Organization**: com.danhdue

=> Kết quả là chúng ta sẽ được Application ID chúng cho Android là: **com.danhdue.stacked_state_mamagement** và Bundle ID chung cho iOS sẽ là: **com.danhdue.stackedStateMamagement**.

Bước đầu tiên cho phần cấu hình chung phía Flutter sau khi đã tạo xong Flutter Project cho mình sẽ là tạo lớp **EnvironmentConfig**. Lớp này sẽ chứa các biến toàn cục nhằm thiết lập các thành phần môi trường như: Tên app, hậu tố cho Application Id/Bundle ID, đường dẫn tới các services phía backend, vân vân và mây mây,....

Nội dung của lớp này như sau:

```
class EnvironmentConfig {
  static const APP_NAME = String.fromEnvironment('DART_DEFINES_APP_NAME', defaultValue: "Karate");
  static const APP_SUFFIX = String.fromEnvironment('DART_DEFINES_APP_SUFFIX');
  static const BASE_URL = String.fromEnvironment('DART_DEFINES_APP_SUFFIX',
      defaultValue: "https://dev.danhdue.com/");
}
```

Lớp này các bạn có thể đặt trong file **main.dart**, hoặc có thể đặt trong file **[app.dart](https://raw.githubusercontent.com/DanhDue/stacked_state_mamagement/develop/lib/app/app.dart)** là file cấu hình cho toàn bộ ứng dụng giống như mình.

```
import 'package:stacked/stacked_annotations.dart';
import 'package:stacked_services/stacked_services.dart';
import 'package:stacked_state_mamagement/data/remote/api_service.dart';
import 'package:stacked_state_mamagement/services/counter_service.dart';
import 'package:stacked_state_mamagement/ui/views/home/home_view.dart';
import 'package:stacked_state_mamagement/ui/views/login/login_view.dart';
import 'package:stacked_state_mamagement/ui/views/onboard/onboard_view.dart';
import 'package:stacked_state_mamagement/ui/views/splash/splash_view.dart';

class EnvironmentConfig {
  static const APP_NAME = String.fromEnvironment('DART_DEFINES_APP_NAME', defaultValue: "Karate");
  static const APP_SUFFIX = String.fromEnvironment('DART_DEFINES_APP_SUFFIX');
  static const BASE_URL = String.fromEnvironment('DART_DEFINES_APP_SUFFIX',
      defaultValue: "https://dev.danhdue.com/");
}

@StackedApp(routes: [
  MaterialRoute(page: SplashView, initial: true),
  MaterialRoute(page: LoginView),
  MaterialRoute(page: OnboardView),
], dependencies: [
  LazySingleton(classType: NavigationService),
  LazySingleton(classType: ApiService)
])
class AppConfigurations {}
```

Note: Đảm bảo rằng bạn khai báo biến môi trường của mình là một hằng số(**const**). Ngoài ra các bạn cũng nên đặt thêm tiền tố(Ví dụ **DART_DEFINES_**) để dễ dàng nhận biết rằng đây là các biến toàn cục.

Cách làm này có điểm yếu là các bạn sẽ phải truyền rất nhiều tham số vào câu lệnh run/build của mình nếu như số lượng biến toàn cục này tăng lên. Tuy nhiên đây là điểm yếu của nền tảng rồi nên chúng ta chỉ có thể tìm cách tối ưu + tự động hóa các hoạt động lặp đi lặp lại này thôi. Làm như thế nào thì mình sẽ trình bày ở phần cấu hình riêng cho các nền tảng sau.

### 2. Run/Build
Để thay đổi các biến môi trường này, chúng ta sẽ phải truyền chúng vào câu lệnh như những tham số giống bên dưới:

```
fvm flutter build appbundle --dart-define=DART_DEFINES_APP_NAME="SSM(Dev)" --dart-define=DART_DEFINES_APP_SUFFIX=.dev  --debug
```

Tương tự với việc run app:

```
fvm flutter run --dart-define=DART_DEFINES_APP_NAME="SSM(Dev)" --dart-define=DART_DEFINES_APP_SUFFIX=.dev  --debug
```

Câu lệnh trên chắc đã quen thuộc với các bạn rồi đúng không? Ở đây mình chỉ dùng thêm Flutter Version Management nhằm quản lý Flutter version cho từng project. Nếu chưa biết các bạn có thể tìm hiểu thêm ở đây.

Nhìn câu lệnh trên thì các bạn cũng đoán ra đây là build Android App Bundle với các tham số truyền vào nhằm ghi đè(override) các biến toàn cục chúng ta đã thiết lập từ trước.

```
--dart-define=DART_DEFINES_APP_NAME="SSM(Dev)" --dart-define=DART_DEFINES_APP_SUFFIX=.dev
```

Ở đây chúng ta thiết lập tên app là: SSM(Dev) với hậu tố **(Dev)** để user biết được đây chính là app được cấu hình cho môi trường develop. Ngoài ra hậu tố **.dev** là cần thiết cái giúp chúng ta tạo ra được các application id khác nhau để có thể cài đặt app trên cùng một thiết bị. Nó cũng được sử dụng là các application id khác nhau để tích hợp vào các hệ thống khác. Cụ thể ở đây là Firebase.

Trong project này mình cũng sẽ sử dụng các hậu tố **(Stg)** và **.stg** cho tên và application id cho môi trường Staging cũng như **(prd)** và **.prd** cho tên và application id cho môi trường production.

## III. Setup Firebase Projects.
Trong Firebase Consolse của mình các bạn tạo 3 projects tương ứng với 3 môi trường(Develop/Staging/Production). Việc phân tách này là cần thiết. Tránh việc dữ liệu nào đó trong quá trình phát triển bị lẫn lộn, làm ảnh hưởng, sai lệch dữ liệu thật trên bản release(Production).

Quá trình tạo từng projects thì tương đối đơn giản. Bài viết này mình giả định là các bạn có thể tự tạo được các Firebase Projects cũng như biết tích hợp sẵn các app Android/iOS vào project tương ứng.

Mình chỉ chú ý rằng:

**com.danhdue.stacked_state_mamagement.dev** sẽ là **Application Id** cho Android Application và **com.danhdue.stackedStateMamagement.dev** sẽ là Bundle ID cho iOs Application khi các bạn tích hợp app vào Firebase project ứng với môi trường **Develop**.
**com.danhdue.stacked_state_mamagement.stg** sẽ là **Application Id** cho Android Application và **com.danhdue.stackedStateMamagement.stg** sẽ là Bundle ID cho iOs Application khi các bạn tích hợp app vào Firebase project ứng với môi trường **Staging**.
**com.danhdue.stacked_state_mamagement.prd** sẽ là **Application Id** cho Android Application và **com.danhdue.stackedStateMamagement.prd** sẽ là Bundle ID cho iOs Application khi các bạn tích hợp app vào Firebase project ứng với môi trường **Production**.

Các tên này sẽ sử dụng chung package name/bundle id. Chỉ thêm vào hậu tố chỉ định cho các môi trường thôi, và nó là tương đối quen thuộc nếu như các bạn đã từng phát  triển ứng dụng Android, hoặc iOS rồi đúng không.

Cũng như phần đầu mình đề cập, để giữ cho các làm đơn giản, dễ thực hiện nhất, ở đây mình sẽ không tạo ra nhiều flavors/schemas vì càng tạo nhiều sẽ càng mất thời gian cấu hình + phân định các môi trường. Vì thế mình sẽ chỉ sự dụng 3 build types sẵn có mà bất cứ một Flutter Project nào cũng được thiết lập mặc định đó là: **debug**, **profile**, và **release**. Chắc chỉ có **profile** build type có vẻ không thân thuộc với các bạn thôi đúng không nào?
Build Type này về lý thuyết vẫn chỉ là một bản build debug cơ mà nó được sử dụng nhằm phân tích hiệu năng, chính vì thế chúng ta hoàn toàn có thể sử dụng nó cho môi trường Staging của mình.
Chi tiết về các Build Types khác nhau các bạn có thể xem thêm ở [bài viết này](https://docs.flutter.dev/testing/build-modes).

Đó chính là những gì cần thiết cho quá trình thiết lập chung. Tiếp theo sẽ là phần chi tiết cấu hình cho từng nền tảng phía native(Android/iOS).

## IV. Setup Android Project.
Ở phần này, chúng ta sẽ lấy các biến toàn cục đã được cấu hình ở phía Flutter và tích hợp vào các bản build tương ứng ở phía Android native.

### 1. Parse properties from the Flutter command arguments.
Việc đầu tiên chúng ta cần thực hiện đó là phân tách các thuộc tính(biến toàn cục) cái đã được thiết lập từ trước phía Flutter, rồi gán các giá trị này vào những nơi tương ứng(ApplicationID/BundleID) và Application Name.

Để làm được việc này trong file **android/app/build.gradle** chúng ta thêm vào đoạn mã nguồn bên dưới:

```
def dartEnvironmentVariables = [
        DART_DEFINES_APP_NAME: 'FFitYou',
        DART_DEFINES_APP_SUFFIX: null,
        DART_DEFINES_BASE_URL: 'https://dev.danhdue.com/',
]
if (project.hasProperty('dart-defines')) {
    dartEnvironmentVariables = dartEnvironmentVariables + project.property('dart-defines')
            .split(',')
            .collectEntries { entry ->
                def pair = new String(entry.decodeBase64(), 'UTF-8').split('=')
                [(pair.first()): pair.last()]
            }
}
```

Đoạn mã nguồn này về cơ bản là thiết lập 3 biến tương ứng với 3 biến đã định nghĩa trước, rồi ghi đè bằng các giá trị là kết quả sau quá trình phân tách các biến trong Command Arguments gọi là **dart-defines**.

Từ Flutter 2.2 trở đi, các giá trị này được Flutter compiler mã hoá bằng base64 chính vì thế chúng ta có bước decodeBase64 cho string nhận được từ dart-define. Cụ thể các bạn có thể xem lại bài dịch cũ của mình [ở đây](https://viblo.asia/p/flutter-117-no-more-flavors-no-more-ios-schemas-command-argument-that-changes-everything-3P0lPB7gKox).

Sau khi đã lấy được các biến toàn cục trên, chúng ta sẽ gán vào các vị trí tương ứng nhằm thay đổi **applicationId** và **app_name**. Trong phần **defaultConfig** của file **android/app/build.gradle** chúng ta thêm vào **applicationIdSuffix** và **resValue** dạng **String** với tên **app_name** như bên dưới:

```
    defaultConfig {
        applicationId "com.danhdue.stacked_state_mamagement"
        applicationIdSuffix dartEnvironmentVariables.DART_DEFINES_APP_SUFFIX
        minSdkVersion 19
        targetSdkVersion 32
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
        multiDexEnabled true
        resValue "string", "app_name", dartEnvironmentVariables.DART_DEFINES_APP_NAME
    }
```

Trong file **android/app/src/main/AndroidManifest.xml** chúng ta sửa tên của ứng dụng bằng cách thay: **android:label="stacked state management"** bằng **android:label="@string/app_name"**

Như vậy là chúng ta đã lấy được các biến toàn cục là các dart-defines từ phía Flutter và gán vào Android Native App của mình. Tiếp theo chúng ta sẽ cần cấu hình một chút các build type để tích hợp vào các môi trường phía Firebase.

### 2. Setup build types.
Đầu tiên chúng ta sẽ cần thêm dòng sau và bên dưới **defaultConfig** nhằm chỉ rõ resources cho từng bản build của Android:

```
flavorDimensions "app"
```

Tiếp theo chúng ta cần cấu hình **signingConfigs** cho các build types và thêm nó vào các build types tương ứng.

```
signingConfigs {
    debug {
        storeFile file("../debug.keystore")
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    profile {
        storeFile file("../debug.keystore")
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        storeFile file("../ssm.keystore")
        storePassword 'SSMSample@123'
        keyAlias 'SSMSample'
        keyPassword 'SSMSample@123'
    }
}

buildTypes {
    debug {
        signingConfig signingConfigs.debug
        // Enables code shrinking, obfuscation, and optimization for only
        // your project's release build type.
        minifyEnabled false

        // Enables resource shrinking, which is performed by the
        // Android Gradle plugin.
        shrinkResources false

    }
    profile {
        signingConfig signingConfigs.debug
        minifyEnabled false
        shrinkResources false
    }
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        shrinkResources true
    }
}
```

Đối với các bạn đã từng phát triển ứng dụng Android thì đoạn này khá là quen thuộc vì nó chỉ là cấu hình **signingConfigs** rồi set vào các build types, ngoài ra chỉ là một vài thuộc tính **minifyEnabled**, **shrinkResources**,... là cái cấu hình cho việc tối ưu hoá các bản build như thu gọn code, mã hoá, vân vân và mây mây,....
Chi tiết các bạn có thể xem thêm phần hướng dẫn deploy Flutter App [ở đây](https://docs.flutter.dev/deployment/android).

Tiếp theo sẽ là việc tích hợp với project Firebase tạo từ trước.

Với môi trường dev bây giờ bạn sẽ có ApplicationId: **com.danhdue.stacked_state_mamagement.dev** và SHA1 tương ứng với **debug.keystore** mà các bạn thêm vào.
Sau khi tích hợp với Firebase Project bạn sẽ có file **google-services.json**. Việc còn lại chỉ là thêm nó vào thư mục: **android/app/src/debug**

Tương tự bạn sẽ tích hợp Android Project này với các projects tương ứng trên Firebase Projects của bạn. Kết quả cuối cùng là bạn sẽ thêm đủ các file **google-services.json** vào các build types tương ứng như sau:

<div align="center"><img src="https://images.viblo.asia/d0c0e047-f60f-4767-a0b2-d32240e5dd62.png" /></div><br />

Như vậy là chúng ta đã tích hợp được các bản build theo môi trường từ Android Native của mình với từng Project Firebase tương ứng. Tiếp theo sẽ là việc tạo các build configs cho Android Studio hoặc VSCode để đơn giản hoá việc truyền dart-defines arguments vào các bản build.

## V. Setup iOS Project.
### 1. Parse properties from the Flutter command arguments.
Trong quá trinh build, Flutter DevTools sẽ tạo ra một cặp file **Generated.xcconfig** và **flutter_export_environment.sh** đây là hai files chưa thông tin về **dart-defines** được mã hoá dưới dạng base64.
Công việc của chúng ta cũng giống với Android sẽ là định nghĩa các biến toàn cục tương ứng với các biến định nghĩa bởi **dart-defines** rồi phân tích các giá trị này và ghi đè vào các giá trị mặc định nếu có.

**Create SSM-defaults.xcconfig file with default values**
```
DART_DEFINES_APP_NAME=SSM(Dev)
DART_DEFINES_APP_SUFFIX=
```

**Add to the Debug and Release configurations**
```
#include? "Pods/Target Support Files/Pods-Runner/Pods-Runner.release.xcconfig"
#include "Generated.xcconfig"
#include "SSM-defaults.xcconfig"
#include "SSM.xcconfig"
```

**Note**:
1. File **SSM.xcconfig** là file được sinh ra sau khi chúng ta thêm **pre-actions** cho build settings. Mình sẽ trình bày phần này ngay sau đây.
2. Xem xét việc đặt **SSM.xcconfig** sau **SSM-default.xcconfig**, như vậy các giá trị từ câu lệnh chạy Flutter có thể ghi đè được các giá trị mặc định.

**Thêm vào pre build action**
Mở iOS project bằng XCode. Chọn build schema => **Edit Schema**.

<div align="center"><img src="https://images.viblo.asia/6559e409-2974-4619-b51c-412a2607befe.png" /></div><br />

Chọn **Build** => **Pre-actions** và thêm vào **run script** với nội dung bên dưới:

<div align="center"><img src="https://images.viblo.asia/52ab0718-59ef-4dd7-9f35-9e1e7edf2636.png" /></div><br />

Nội dung của script:

```
# Type a script or drag a script file from your workspace to insert its path.

function entry_decode() { echo "${*}" | base64 --decode; }

IFS=',' read -r -a define_items <<< "$DART_DEFINES"


for index in "${!define_items[@]}"
do
    define_items[$index]=$(entry_decode "${define_items[$index]}");
done

printf "%s\n" "${define_items[@]}"|grep '^DART_DEFINES_' > ${SRCROOT}/Flutter/SSM.xcconfig
```

**Note**: Các bạn có thể thay tên file ***.xcconfig** theo ý muốn của mình đồng thời phải chọn **provide build settings from** là project name của mình. Ở đây là **Runner**.

**Setup the Bundle Name and the Bundle Identifier**

Cuối bước này là chúng ta sẽ thiết lập Bundle Name và Bundle Identifier cho ứng dụng iOS bằng giá trị lấy được từ **dart-defines**.

Gán Bundle Name thành: **\$(DART_DEFINES_APP_NAME)** và Bundle Identifier thành: **\$(PRODUCT_BUNDLE_IDENTIFIER)\$(DART_DEFINES_APP_SUFFIX)**.

<div align="center"><img src="https://images.viblo.asia/61ed72bf-b642-410c-8417-de0fb2e3c684.png" /></div><br />

### 2. Setup build types.
**Configuring different bundle ids for each configuration.**
Trong phần thiết lập **Build Settings** tìm **Product bundle identifier** và sửa bundle ids theo các build type giống như bên dưới:

<div align="center"><img src="https://images.viblo.asia/263b0b3c-e102-4519-afc9-546112614f09.png" /></div><br />

Thêm vào bundle id mặc định các hậu tố: **.dev** cho môi trường **Debug**, **.stg** cho môi trường **Staging** và **.prd** cho môi trường **Production**.

Tiếp theo là chỉnh sửa build types trong **Podfile** như sau:

```
# Uncomment this line to define a global platform for your project
platform :ios, '10.0'

# CocoaPods analytics sends network stats synchronously affecting flutter build latency.
ENV['COCOAPODS_DISABLE_STATS'] = 'true'

project 'Runner', {
  'Debug' => :debug,
  'Profile' => :debug,
  'Release' => :release,
}
...
```

Đồng bộ **IPHONEOS_DEPLOYMENT_TARGET** như sau:

```
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
       config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '10.0'
    end
    flutter_additional_ios_build_settings(target)
  end
end
```

**Adding different GoogleService-Info.plist for different configurations.**
Đầu tiên chúng ta cần tích hợp iOS App vào các Firebase Projects tương ứng với các môi trường đồng thời tải về các file **GoogleService-Info.plist**.
Sau đó thêm hậu tố vào các file này tương ứng với các môi trường.

<div align="center"><img src="https://images.viblo.asia/9988a7f7-36c1-4cdc-a77d-34589db69849.png" /></div><br />

Tạo thư mục **Firebase** theo đường dẫn **ios/Runner/Firebase** và copy/paste các **plist** files đã tải + đổi tên trên vào.

Tiếp theo, chúng ta sẽ phải định nghĩa một biến môi trường trong XCode cái giữ tên file **GoogleService-Info.plist** cho từng môi trường là **GOOGLE_SERVICE_INFO_PLIST_NAME**.

Trong **Build Settings** nhấn **add new conditional or user-defined build setting** rồi chọn **Add User-Defined Setting**

<div align="center"><img src="https://images.viblo.asia/04684c3c-7580-40b1-84e2-98d8b960de3c.png" /></div><br />

Thêm vào biến **GOOGLE_SERVICE_INFO_PLIST_NAME** với các giá trị:
* **GoogleService-Info.dev.plist** cho **Debug** build type tương ứng với môi trường Develop.
* **GoogleService-Info.stg.plist** cho **Profile** build type tương ứng với môi trường Staging.
* **GoogleService-Info.prod.plist** cho **Release** build type tương ứng với môi trường Production.

Cuối cùng là thêm vào script để copy và đổi lại tên các files **GoogleService-Info.plist** vào thư mục build của ứng dụng.
Trong **Build Phases** click vào **add a new build phase** và chọn **New Run Script Phase**.

<div align="center"><img src="https://images.viblo.asia/47be2614-6e0d-4e3d-b50c-bd1f30551b07.png" /></div><br />

Double click vào nó và đổi tên thành **Copy Google Service Plist** rồi thêm toàn bộ đoạn mã sau vào phần script:

```
# Type a script or drag a script file from your workspace to insert its path.
GOOGLE_SERVICE_INFO_PLIST_FROM="${PROJECT_DIR}/Runner/Firebase/${GOOGLE_SERVICE_INFO_PLIST_NAME}"

BUILD_APP_DIR="${BUILT_PRODUCTS_DIR}/${FULL_PRODUCT_NAME}"

GOOGLE_SERVICE_INFO_PLIST_TO="${BUILD_APP_DIR}/GoogleService-Info.plist"

cp "${GOOGLE_SERVICE_INFO_PLIST_FROM}" "${GOOGLE_SERVICE_INFO_PLIST_TO}"
```

## VI. Create build configurations for each environments.
Như đã đề cập lúc đầu, việc phải truyền các dart-defines vào các câu lệnh run/build sẽ làm cho các câu lệnh trở lên phức tạp, khó khăn trong việc trigger các bản build.

Tuy nhiên cả Android Studio và VSCode đều cho phép bạn cấu hình build configurations một cách dễ dàng. Cụ thể như sau:

1. Đối với **Android Studio** bạn bấm vào **Edit Configurations** trên thanh toolbar:

<div align="center"><img src="https://images.viblo.asia/d83e89bc-bb69-491b-b6a1-f5bc4c4089d2.png" /></div><br />

Rồi đặt tên cũng như thêm vào **Additional run args** như bên dưới:

<div align="center"><img src="https://images.viblo.asia/75b4d783-97e4-4004-8c3f-83d00270ebd2.png" /></div><br />

Lúc này build name và additional run args tương ứng cho các môi trường sẽ là:

* **Develop**: **SSM(Dev)** và **--dart-define=DART_DEFINES_APP_NAME="SSM(Dev)" --dart-define=DART_DEFINES_APP_SUFFIX=.dev --dart-define=DART_DEFINES_BASE_URL="https://dev.danhdue.com/"**
* **Staging**: **SSM(Stag)** và **--dart-define=DART_DEFINES_APP_NAME="SSM(Stg)" --dart-define=DART_DEFINES_APP_SUFFIX=.stg --dart-define=DART_DEFINES_BASE_URL="https://stg.danhdue.com/" --profile**
* **Production**: **SSM(Prod)** và **--dart-define=DART_DEFINES_APP_NAME="SSM" --dart-define=DART_DEFINES_BASE_URL="https://danhdue.com/" --release**

Để share các cấu hình này cho các thành viên trong nhóm bạn chỉ cần tick vào Store as project file => Điều này sẽ sinh ra một thư mục **.run** trong project của chúng ta. Đẩy lên git và tất cả các thành viên trong team sẽ có chung các build configurations này.

<div align="center"><img src="https://images.viblo.asia/04cd6bc3-9836-4276-8df8-6f02a8918e61.png" /></div><br />

2. Đối với VSCode:
Nếu bạn mở project bằng VSCode, ở toolbar phía bên trái, chọn mục build/run và thêm vào cấu hình bằng cách bấm vào biết tượng settings:

<div align="center"><img src="https://images.viblo.asia/f9d8d828-6f81-4adf-a345-e246ae168c95.png" /></div><br />

Khi đó một file **launch.json** sẽ được sinh ra trong thư mục **.vscode**. Việc cấu hình là cũng khá giống cho Android:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "SSM(Dev)",
            "request": "launch",
            "type": "dart",
            "program": "lib/main.dart",
            "args": [
                "--dart-define", "DART_DEFINES_APP_NAME=SSM(Dev)",
                "--dart-define", "DART_DEFINES_APP_SUFFIX=.dev",
                "--dart-define", "DART_DEFINES_BASE_URL=https://dev.danhdue.com/",
            ]
        },
        {
            "name": "SSM(Stg)",
            "request": "launch",
            "type": "dart",
            "program": "lib/main.dart",
            "args": [
                "--dart-define", "DART_DEFINES_APP_NAME=SSM(Stg)",
                "--dart-define", "DART_DEFINES_APP_SUFFIX=.stg",
                "--dart-define", "DART_DEFINES_BASE_URL=https://stg.danhdue.com/",
                "--profile",
            ]
        },
        {
            "name": "SSM(Prod)",
            "request": "launch",
            "type": "dart",
            "program": "lib/main.dart",
            "args": [
                "--dart-define", "DART_DEFINES_APP_NAME=SSM",
                "--dart-define", "DART_DEFINES_BASE_URL=https://danhdue.com/",
                "--release",
            ]
        }
    ]
}
```

Upload thư mục này lên repo chung của dự án là các thành viên trong team sử dụng VSCode của bạn cũng có thể sử dụng được cấu hình build tương ứng này. (dance)(dance)(dance)

Đến đây, chúng ta đã hoàn thành việc cấu hình môi trường cho một dự án Flutter. Click chọn bản build trên Android Studio/VSCode chọn run và tận hưởng thành quả. (dance)(dance)(dance)

## VII. Conclusion
Như vậy là chúng ta đã hoàn thành xong việc cấu hình các môi trường phát triển cho một dự án Flutter một cách đơn giản nhất.
Việc tạo ra thêm nhiều môi trường hơn sẽ yêu cầu chúng ta hoặc định nghĩa thêm build type, hoặc thêm vào các flavor/schema tương ứng.
Đây cũng là các bước cần thiết trước khi tiến hành tự động hoá một số phần trong vòng đời phát triển ứng dụng bằng cách tích hợp thêm CI/CD. Một phần thú vị khác nữa.
Tuy nhiên do thời lượng và kiến thức dành cho chủ đề này đã khá lớn nên hẹn các bạn trong các bài viết tiếp theo.

{>;} Happy Coding!

## VIII. Reference.
#### 1. [No more Flavors, no more Schemas. Command argument that changes everything](https://viblo.asia/p/flutter-117-no-more-flavors-no-more-ios-schemas-command-argument-that-changes-everything-3P0lPB7gKox).
#### 2. [Flutter Version Management](https://fvm.app/).
#### 3. [Flutter's build modes](https://docs.flutter.dev/testing/build-modes).
#### 4. [Build and release an Android app](https://docs.flutter.dev/deployment/android).
#### 5. [New Setup for Flutter Stacked State Management ](https://viblo.asia/p/new-setup-for-flutter-stacked-state-management-ByEZkejA5Q0).

## IX. Source Code
Toàn bộ mã nguồn của bài hướng dẫn các bạn có thể tìm thấy ở đây:
#### [Stacked State Management Sample](https://github.com/DanhDue/stacked_state_mamagement).