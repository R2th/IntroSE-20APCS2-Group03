# Giới thiệu
Cũng như các dự án IOS, Android khác trong quá trình phát triển dự án Flutter bạn cũng phải chuyển đội qua lại giữa các môi trường develop, staging, production để làm việc. Trong bài viết mình xin trình bày cách cấu hình và build trên các môi trường khác nhau bằng cách sử dụng thư viện [flutter_congfig](https://pub.dev/packages/flutter_config) với 2 IDE là Android Studio và Xcode.

# Cài đặt
Tạo một ứng dụng Flutter bằng Android Studio có tên flutter_config. 

Đầu tiên bạn cần thêm dòng sau vào file pubspec.yaml:
```dart
dependencies:
  flutter_config: 1.0.5
```
Sau đó để mở terminal chạy lệnh sau để flutter tải thư viện trên về: 
```
 flutter pub get
```
# Sử dụng
Với 3 môi trường develop, staging, production ta tạo 3 file môi trường tương ứng ( trong thư mục gốc của ứng dụng):

![](https://images.viblo.asia/ad15521b-d011-454c-9714-2a2f321e7aa3.png)

> develop: `.env`
> 
> staging: `.env.staging`
> 
>production: `.env.production`
 
Chứa các thông tin cho từng môi trường, ví dụ `.env`:
```
APP_NAME=[DEV]
APP_ID=com.dev.flutterconfig
VER_CODE=1
VER_NAME=1.0.0
```

Tải tất cả các biến môi trường  trong `main.dart`:
```dart
import 'package:flutter/material.dart';
import 'package:flutter_config/flutter_config.dart';

main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await FlutterConfig.loadEnvVariables();

  return runApp(MyApp());
}
```
Sau đó bạn có thể truy cập các biến môi trường ở bất cứ đâu, bằng cách:
```dart
FlutterConfig.get("APP_NAME")
```

ví dụ:
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(FlutterConfig.get("APP_NAME")),
        ),
      ),
    );
  }
}
```
# Cài đặt build cho IOS
Mở file `flutter_config/ios/Runner.xcodeproj` bằng X-code: 

![](https://images.viblo.asia/214625b3-d949-416d-9ace-807180384f22.png)


1. Trong Runner/Flutter thêm dòng sau vào cả hai file Debug.xcconfig và Release.xcconfig:

```c
#include? "tmp.xcconfig"
```
bạn cũng nên thêm vào gitignore dòng sau:
```
**/ios/Flutter/tmp.xcconfig
```
2. Trong menu của Xcode chọn Product > Scheme > Edit Scheme

![](https://images.viblo.asia/780f8ece-fd91-4a7d-8fbc-06c704f7e8d2.png)

Chọn Build -> Pre-actions, và add thêm 2 "New Run Script Action", theo đoạn code sau:

![](https://images.viblo.asia/cd8ea82e-f711-4710-95b7-8abe51335078.png)


```
echo ".env" > ${SRCROOT}/.envfile
```

```
${SRCROOT}/.symlinks/plugins/flutter_config/ios/Classes/BuildXCConfig.rb ${SRCROOT}/ ${SRCROOT}/Flutter/tmp.xcconfig
```
Trong `Provide build settings from` chọn `Runner`.

3. Click chọn "Duplicate Scheme", nhập tên cho Scheme - develop

![](https://images.viblo.asia/f52eaca7-e2ca-43bc-acef-7f398163d5a1.png)

Làm như trên để tạo ra 3 scheme cho 3 môi trường develop, staging, production. Lưu ý: Thay đổi ".env" thành tên file môi trường của bạn, vd:  *echo ".env"* .., *echo ".env.staging" ...*, *echo ".env.production" ..*

![](https://images.viblo.asia/54b97ba7-e704-4956-a869-727e1b7f63bd.png)
Trong hình trên là .env.staging cho scheme staging

4. Quay lại Flutter trên AndroidStudio. Thay đổi Build flavor trong flutter:

![](https://images.viblo.asia/cdbe2f35-7112-424f-a075-5ff194e2d41c.png) 
![](https://images.viblo.asia/57d493c2-6717-48d8-a2f2-3e69f7962965.png)

Chạy thử ứng dụng bạn sẽ được flutter báo lỗi sau: 

![](https://images.viblo.asia/45cd83dc-d8b7-4067-97b1-3857d40b0e32.png)

Tạo các build configuration như hướng dẫn trên.

![](https://images.viblo.asia/9e800a78-d64b-4191-8454-f3f09c041fff.png)

Chạy lại ứng dụng, lần này thì chạy ngon rồi :grinning:. 

![](https://images.viblo.asia/411efd70-635c-480e-b88b-b2a3543050f5.png)

Bạn có thể thay đổi Build flavor thành develop, staging và xem sự thay đổi.

5. Thay đổi Bundle Identifier và Bundle name theo từng môi trường.

Như các bạn thấy thì thông tin trong app đã thay đổi, tuy nhiên tên app chưa thay đổi theo từng môi trường. Phần sau là hướng dẫn đổi tên app và bundle id theo môi trường được chọn. Bạn có thể bỏ qua phần này nếu thấy không cần thiết.

Chỉnh sửa thông tìn trong TAGETS Runner

**Trong tab Build Settings**
* Packaging -> Product Bundle Identifier: ${APP_ID}

![](https://images.viblo.asia/e0ab0d48-1bed-455f-bf0d-e5e6ce575222.png)

* User-Defined, thay đổi giá trị của:
    *   APP_ID : ${APP_ID} 
    *   APP_NAME: ${APP_NAME}
    *   FLUTTER_BUILD_NAME: ${VER_NAME}
    *   FLUTTER_BUILD_NUMBER: ${VER_CODE}

![](https://images.viblo.asia/5bdc8192-202a-4090-a622-ca93c44c8898.png)

Nếu thành công thì các giá trị các biến trên trong file env sẽ được điền vào như trong ảnh.

**Trong tab Info**

Đổi value của Bundle Identifier và Bundle name thay đổi lần lượt  thành ${APP_ID} và   ${APP_NAME}

![](https://images.viblo.asia/4288f360-a72f-42b3-94b5-d61ff7048588.png)

**Trong tab General**

*  Identity, thay đổi :
    *  Bundle Identifier: ${APP_ID} 
    *  Version: ${VER_NAME}
    *  Build: ${VER_CODE}

![](https://images.viblo.asia/126f74d1-24a8-491f-831e-889805cdf4ff.png)

Nếu có lỗi, hoặc các giá trị của các biến trên không load được bạn kiểm tra lại các trường ở các tab trên, và điền lại.

Bạn chạy lại ứng dụng trên từng môi trường thì sẽ được 3 ứng dụng với tên và bundle id khác nhau.
![](https://images.viblo.asia/bc3c7abc-c10b-455c-89ba-5972b7249750.png)

# Cài đặt build cho Android
1. Chỉnh sửa trong ***build.gradle***

Mở file build.gradle (../android/app/build.gradle)

![](https://images.viblo.asia/49d74649-3144-4a33-9637-97dcd79e4ee6.png)

**Thêm đoạn sau :**
```
project.ext.envConfigFiles = [
        staging           : ".env.staging",
        production        : ".env.production",
        anothercustombuild: ".env",
]
apply from: project(':flutter_config').projectDir.getPath() + "/dotenv.gradle"
```
![](https://images.viblo.asia/c3f84e7e-08a8-498e-930a-f372560b7c31.png)

Thêm flavor cho 3 môi trường trên.

```
android {
...
   flavorDimensions "environment"
    productFlavors {
        develop {
            dimension "environment"
        }
        staging {
            dimension "environment"
        }
        production {
            dimension "environment"
        }
    }
}
```

Lấy các biến trong file môi trường bằng `project.env.get("ten_bien")`,  ví dụ:
```
    defaultConfig {
        applicationId project.env.get("APP_ID")
        versionCode project.env.get("VER_CODE").toInteger()
        versionName project.env.get("VER_NAME")
    }
```

Do applicationId lấy theo từng mổi trường, khác với package nane được khai báo trong AndroidManifest, bạn cần thêm dòng sau:

```
defaultConfig {
    ...
    resValue "string", "build_config_package", "YOUR_PACKAGE_NAME_IN_ANDROIDMANIFEST.XML"
}
```

2. Sửa file ***AndroidManifest.xml***

Mở file AndroidManifest.xml (../android/app/src/main/AndroidManifest.xml).
Thay đổi giá trị của **android:label** :
```
android:label="@string/APP_NAME"
```

Tương tự như IOS, khi chạy ở các môi trường khác nhau ta được 3 ứng dụng khác nhau:

![](https://images.viblo.asia/b99f487d-8cd3-436d-8845-0154420115f5.png)

Nếu muốn bạn có thể xem ứng dụng ví dụ trên ở [đây](https://github.com/trantan97/flutter_config)

Thank for reading !!

Note cho Andoroid: nếu bạn build release thì file BuildConfig được generate ra bởi fullutter_config có thể bị xoá đi. Thêm dòng sau vào file proguard-rules.pro để giữ lại:
```
-keep class [your_android_package_name].BuildConfig { *; }
```