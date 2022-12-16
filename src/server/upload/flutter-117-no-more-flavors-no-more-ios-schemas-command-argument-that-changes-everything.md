Flutter 1.17 đã được phát hành và mang tới rất nhiều tính năng tuyệt vời. Bạn có thể đọc thêm [tại đây](https://medium.com/flutter/announcing-flutter-1-17-4182d8af7f8e).

Nó mang tới rất nhiều sự cải tiến về hiệu năng, widgets mới, và nhiều hơn thế nữa.
Nhưng bên cạnh tất cả, phiên bản này của Flutter cũng mang tới một tính năng tuy nhỏ nhưng rất hữu ích đó là: compile-time variables. Đúng vậy, bạn ko nghe nhầm đâu, bắt đầu từ Flutter 1.17 bạn có thể xây dựng ứng dụng Android và iOS với các giá trị được định nghĩa trước thời điểm compile cái có thể sử dụng trong tất cả các tầng của các ứng dụng Dart, iOS, Android.

**Cập nhật 28.05.2020**: Thêm vào các chú ý về các giới hạn của ***.xconfig** trong iOS.
**Cập nhật 05.08.2020**: Thêm vào mã nguồn mẫu cái tương thích với Flutter 1.20 một vài sự thay đổi trong Flutter 1.20 có thể xem [tại đây](https://medium.com/@tatsu.ukraine/what-you-should-know-before-you-upgrade-flutter-in-your-project-with-compile-time-variables-3ec3d2e9ba79).
**Cập nhật 19.05.2021**: Thêm mã nguồn mẫu cái tương thích với Flutter 2.2. Một vài sự thay đổi khác trong Flutter 2.2 có thể xem [tại đây](https://medium.com/@tatsu.ukraine/flutter-2-2-dart-defines-and-breaking-changes-here-we-go-again-ce40cfea74fd).

## Hãy tiếp cận một cách gần hơn.
Nếu bạn đang làm việc với Flutter Web, bạn có thể biết tham số **--dart-define** trong Flutter Tool. Một cách căn bản nó được sử dụng để kích hoạt Skia cho Flutter Web giống kiểu **--dart-define=FLUTTER_WEB_USE_SKIA=true**. Nhưng có thể bạn không biết đó là từ Flutter 1.17 bạn có thể truyền nhiều cặp giá trị key/value tuỳ biến này ở đây.

Ví dụ, nếu bạn chạy Flutter App với các tham số bên dưới:

```
flutter run --dart-define=SOME_VAR=SOME_VALUE --dart-define=OTHER_VAR=OTHER_VALUE
```

Thì bạn có thể lấy các giá trị này trong mã nguồn Dart như sau:

```
class EnvironmentConfig {
  static const SOME_VAR = String.fromEnvironment('SOME_VAR');
  static const OTHER_VAR = String.fromEnvironment('OTHER_VAR');
}
```

Và sử dụng lớp này cho việc cấu hình các môi trường cụ thể của mình trên toàn bộ project.

Điều này có nghĩa là giờ đây bạn có thể lấy các gói như **[environment_config](https://pub.dev/packages/environment_config)**.

**Note**: Nếu bạn không gói này thực hiện những gì, bạn có thể đọc bài viết này: [Configure your Flutter Environment in the Proper Way](https://medium.com/@tatsu.ukraine/configure-your-flutter-environment-in-the-proper-way-b81782c79726).

## Tôi có thể sử dụng những biến này trong mã nguồn native?
Câu trả lời ngắn gọn là có. Bạn có thể sử dụng những biến này trong native nhưng... Nó có cần một chút thủ thuật.

Nếu bạn muốn biết làm thế nào Flutter truyền **Dart Defines** vào các lớp navite, bạn có thể xem **[Flutter Tools Package](https://github.com/flutter/flutter/tree/master/packages/flutter_tools)**. Nó đối xử với Dart Defines theo một các khác nhẹ nhàng hơn cho mỗi nền tảng và chúng ta sẽ xem xét một số ví dụ mẫu cho các bản build Android và iOS.

Cũng như luôn ý thức rằng trong Flutter 1.20 và Flutter 2.2, Flutter Tool thay đổi cách thức cái cấu trúc Dart Defines được truyền vào các lớp native.

Để làm điều đó, chúng ta tạo một Flutter project cái định nghĩa Application Name và Application Suffix ID cho Android và iOS dựa trên các biến **Dart Defines**.
Nhánh **master** là tương thích với Flutter 2.2, **flutter-1.19**,... và các version về tới Flutter 1.17.

[Và đây là mã nguồn tham khảo](https://github.com/TatsuUkraine/flutter_define_example).

## Hãy khám phá ứng dụng này
Ứng dụng này làm việc với hai biến compile-time đó là **DEFINEEXAMPLE_APP_NAME** và **DEFINEEXAMPLE_APP_SUFFIX**. Chúng ta sẽ thêm vào một tiền tố cho mỗi giá trị compile-time chỉ để tránh việc nhầm lẫn các biến cái Flutter sử dụng. Trong ví dụ này chúng ta sử dụng **DEFINEEXAMPLE_***.

### Dart code
Ứng dụng là khá đơn giản. Nếu bạn mở file **main.dart** bạn sẽ thấy rằng nó định nghĩa **EnvironmentConfig class** và in ra các giá trị của nó.

```
class EnvironmentConfig {
  static const APP_NAME = String.fromEnvironment(
    'DEFINEEXAMPLE_APP_NAME',
    defaultValue: 'awesomeApp'
  );
  static const APP_SUFFIX = String.fromEnvironment(
      'DEFINEEXAMPLE_APP_SUFFIX'
  );
}
```

<div align="center"><img src="https://images.viblo.asia/999a41bb-7b83-42b8-b1f5-ca3e7aa75d00.png" alt="Cloud Messaging Getting Started." /></div><br />

Bạn có thể chú ý rằng chúng ta đã sử dụng **awesomeApp** như là một giá trị mặc định cho **DEFINEEXAMPLE_APP_NAME**. Chúng ta sẽ sử dụng giá trị mặc định này cho tất cả các tầng bao gồm cả native. Bởi vì với **APP_SUFFIX** chúng ta sẽ lấy một Application ID thực sự(**packageName**) trong FlutterBuilder Widget từ gói **package_info**. Và nếu **DEFINEEXAMPLE_APP_SUFFIX** đã được định nghĩa, bạn sẽ thấy Application ID trên màn hình của mình.

**Note**: Một chú ý quan trọng: Đảm bảo rằng bạn đang gán các biến môi trường của mình thành các trường **const**. Hiện tại, Flutter có một [issues](https://github.com/flutter/flutter/issues/55870) nếu non-const variable được sử dụng.

Khi bạn chạy ứng dụng này với câu lệnh như sau:

```
flutter run --dart-define=DEFINEEXAMPLE_APP_NAME=awesomeApp1 --dart-define=DEFINEEXAMPLE_APP_SUFFIX=.dev
```

Bạn sẽ thấy:

<div align="center"><img src="https://images.viblo.asia/7bfe186f-1d5c-41f8-b9bc-964e6dbdec5a.png" /></div><br />
Bạn có thể chú ý rằng nó trả ra **awesomeApp1**, cái đã được truyền vào như các tham số thay vì giá trị mặc định là **awesomeApp**. Và **com.example.defineexample.dev** nơi **.dev** được định nghĩa như là một hậu tố.

## Cấu hình Android
Ok, để truyền các biến compile-time cho Android chúng ta sẽ cần sử dụng Flavors

Đừng lo lắng! No Flavors, No Schemes cho iOS, không nhiều mục nhập, và không copy/paste.... Tốt! Ngoại trừ các giá trị mặc định cho các tầng khác nhau.

Do đó, đối với Android, Flutter Tool truyền tất cả **Dart Defines** như là một giá trị String đơn liên kết với một dấu phẩy. Trong Flutter 1.17, trong Gradle của bạn, bạn sẽ lất một giá trị String giống như:

```
DEFINEEXAMPLE_APP_NAME=awesomeApp1,DEFINEEXAMPLE_APP_SUFFIX=.dev
```

Trong Flutter 1.20 giá trị này sẽ như này:

```
DEFINEEXAMPLE_APP_NAME%3Dawesome1,DEFINEEXAMPLE_APP_SUFFIX%3D.dev
```

Và trong Flutter 2.2 mỗi biến sẽ được mã hoá với BASE64:

```
REVGSU5FRVhBTVBMRV9BUFBfTkFNRT1hd2Vzb21lMg==,REVGSU5FRVhBTVBMRV9BUFBfU1VGRklYPS5kZXY=
```

Bắt đầu từ Flutter 1.19 Flutter Tool mã hoá kí tự URI trước khi Dart Defines được truyền vào compiler, bao gồm cả dấu **=** cái là lý do tại sao kí hiệu này được thay thế **%3D** trong danh mục Dart Define.

Trong Flutter 2.2 URL được mã hoá thay vì chỉ thay thế kí tự bằng Base64.

Do đó chúng ta sẽ cần phân tích ít trước khi chúng ta có thể sử dụng mỗi cập key-value này. Toàn bộ mã nguồn Gradle có thể thấy [ở đây](https://github.com/TatsuUkraine/flutter_define_example/blob/master/android/app/build.gradle).
Flutter truyền Dart Defines vào các project properties với khoá **dart-defines**. Đối với Flutter 1.17 logic phân tích sẽ giống như thế này:

```
def dartEnvironmentVariables = [
    DEFINEEXAMPLE_APP_NAME: 'awesomeApp',
    DEFINEEXAMPLE_APP_SUFFIX: null
];
if (project.hasProperty('dart-defines')) {
    dartEnvironmentVariables = dartEnvironmentVariables + project.property('dart-defines')
        .split(',')
        .collectEntries { entry ->
            def pair = entry.split('=')
            [(pair.first()): pair.last()]
        }
}
```

Đầu tiên, nó định nghĩa các giá trị mặc định(dòng 14), rồi chuyển đổi một string từ **dart-defines** thành một Map và gộp kết quả với các giá trị mặc định.

Đối với Flutter 1.20 chúng ta sẽ phải giải mã thêm mỗi mục do đó chúng ta có thể tách một cách chính xác các cặp key-value(dòng 5):

```
if (project.hasProperty('dart-defines')) {
    dartEnvironmentVariables = dartEnvironmentVariables + project.property('dart-defines')
        .split(',')
        .collectEntries { entry ->
            def pair = URLDecoder.decode(entry).split('=')
            [(pair.first()): pair.last()]
        }
}
```

Và trong Flutter 2.2, thay vì sử dụng URL decode, chúng ta cần sử dụng Base64 để làm việc đó:

```
if (project.hasProperty('dart-defines')) {
    dartEnvironmentVariables = dartEnvironmentVariables + project.property('dart-defines')
            .split(',')
            .collectEntries { entry ->
                def pair = new String(entry.decodeBase64(), 'UTF-8').split('=')
                [(pair.first()): pair.last()]
            }
}
```

Bây giờ chúng ta có thể định nghĩa **resValue** và **applicationIdSuffix**.

<div align="center"><img src="https://images.viblo.asia/cadc88f3-16f5-47dc-a255-a765ddb0c6b0.png" /></div><br />
Sau khi chúng ta đã định nghĩa String resource nó có thể được sử dụng cho ví dụ trong **android/app/src/main/AndroidManifest.xml** của bạn nhằm chỉ rõ **Application Name**.

Nhưng về cơ bản bạn có thể sử dụng thiết lập này cho các giá trị ở bất cứ nơi đâu trong dự án.

Và bây giờ nếu bạn đưa mắt xem ứng dụng của mình trên thiết bị Android, bạn có thể thấy rằng tên ứng dụng đã được định nghĩa thành công.

<div align="center"><img src="https://images.viblo.asia/1a1b6095-7ec6-4d16-adbb-a02ff0830919.png" /></div><br />

Cũng như Package Name

<div align="center"><img src="https://images.viblo.asia/0c8ff6e5-5f8d-4db6-866c-6b0cefd1af71.png" /></div><br />

## Cấu hình iOS
Trong quá trình build iOS, Flutter Tool tạo một cặp files, bao gồm **Generated.xcconfig** và **flutter_export_environment.sh**. Chúng có thể được tìm thấy trong **ios/Flutter**. Những files đó mặc định được đặt trong gitignore, do đó Github project không chứa chúng. Nhưng sau khi build, bạn sẽ thấy **Dart Defines** trong những files này, nó được định nghĩa trong Flutter 1.17 như sau:

```
DART_DEFINES=DEFINEEXAMPLE_APP_NAME=awesomeApp1,DEFINEEXAMPLE_APP_SUFFIX=.dev
```

Với Flutter 1.20 chúng sẽ được định nghĩa với các giá trị được mã hoá giống như trong Gradle:

```
DART_DEFINES=DEFINEEXAMPLE_APP_NAME%3Dawesome1,DEFINEEXAMPLE_APP_SUFFIX%3D.dev
```

Trong Flutter 2.2, các giá trị này được mã hoá với Base64:

```
DART_DEFINES=REVGSU5FRVhBTVBMRV9BUFBfTkFNRT1hd2Vzb21lMg==,REVGSU5FRVhBTVBMRV9BUFBfU1VGRklYPS5kZXZ2
```

Bởi định dạng này không thể sử dụng trong plist, nhằm định nghĩa Application Name và Application ID Suffix, chúng ta cần định nghĩa các giá trị mới, dựa trên **Dart Defines**. Vậy hãy bắt đầu.

### Chú ý quan trọng về *.xcconfig trong Flutter 1.17
***xcconfig** của iOS có một số giới hạn khi nó trở thành các biến giá trị. Bạn có thể đọc về nó [ở đây](https://nshipster.com/xcconfig/#managing-constants-across-different-environments) hoặc Google cho một giải pháp phù hợp. Nhưng về cơ bản, nó xử lý tuần tự **//** như là một comment delimiter(phân định bình luận). Điều này có nghĩa là bạn không thể chỉ rõ **API_URL** ví dụ như **https://example.com** bởi vì mọi thứ sau **//** sẽ được bỏ qua. Ở cùng thời điểm, nếu bạn build ứng dụng của mình với tham số:

```
--dart-define=https://example.com
```

Flutter Tool sẽ tạo file **flutter_export_environment.sh** với hàng bên dưới:

```
...
export "DART_DEFINES=APP_URL=https://example.com"
```

Cũng như file **Generated.xcconfig** giống như bên dưới:

```
...
DART_DEFINES=APP_URL=https://example.com
```

Do đó trong bản build **Pre_Action** của bạn(bạn sẽ đọc về nó trong phần tiếp theo) bạn có thể thử khám phá một vòng về việc làm thế nào để lấy giá trị thực sự của **DART_DEFINES** nhằm cung cấp cách thưc truyền **API_URL** một cách chính xác mà bạn muốn.

Với Flutter 1.20 và 2.2 tình huống này là tương tự bởi vì chúng ta sẽ giải mã các giá trị trước khi truyền chúng, nhưng bởi vì Dart Defines sẽ được mã hoá(bao gồm cả **//**) nó sẽ là dễ dàng hơn để tìm được các thức làm thế nào bạn có thể truyền phân tách các items đó. Bởi vì giống với Flutter 1.17 bạn sẽ thực sự nhận được giá trị Dart Defines của mình do đó bạn không cần phải suy nghĩ làm thế nào để lấy các giá trị này khi đã được phân tách.

### 1. Tạo file Defineexample-defaults.xcconfig với các giá trị mặc định

```
DEFINEEXAMPLE_APP_NAME=awesomeApp

DEFINEEXAMPLE_APP_SUFFIX=
```

### 2. Thêm nó vào các cấu hình Debug và Release

Cũng như thêm config file cái chúng ta sẽ tạo với chỉ một vài giây:

```
#include "Generated.xcconfig"
#include "Defineexample-defaults.xcconfig"
#include "Defineexample.xcconfig"
```

Xem xét việc đặt **Defineexample.xcconfig** sau **Defineexample-default.xcconfig**, như vậy các giá trị từ câu lệnh chạy Flutter có thể ghi đè được các giá trị mặc định.

### 3. Chỉnh sửa file plist của bạn và định nghĩa bundle name từ đó

**DEFINEEXAMPLE_APP_NAME** và **DEFINEEXAMPLE_APP_SUFFIX**

<div align="center"><img src="https://images.viblo.asia/5c9250df-29a9-4a95-a4d2-548b360957c9.png" /></div><br />

Giờ đây là thời điểm tạo **Defineexample.xcconfig**. Để tạo nó chúng ta cần thêm **Pre-Build** acction vào iOS build.

### 4. Chỉnh sửa schema

<div align="center"><img src="https://images.viblo.asia/79726dff-13bd-45b8-9dd4-0556c2b8005a.png" /></div><br />

### 5. Thêm vào Pre-Action

<div align="center"><img src="https://images.viblo.asia/f1e6a599-b143-414f-a858-ebef14562573.png" /></div><br />

Với câu lệnh bên dưới nếu bạn sử dụng Flutter 1.17:

```
echo "$DART_DEFINES" | tr ',' '\n' > ${SRCROOT}/Flutter/Defineexample.xcconfig
```

Hoặc câu lệnh bên dưới nếu bạn sử dụng Flutter 1.20:

```
# Type a script or drag a script file from your workspace to insert its path.

function urldecode() { : "${*//+/ }"; echo "${_//%/\\x}"; }

IFS=',' read -r -a define_items <<< "$DART_DEFINES"


for index in "${!define_items[@]}"
do
    define_items[$index]=$(urldecode "${define_items[$index]}");
done

printf "%s\n" "${define_items[@]}"|grep '^DEFINEEXAMPLE_' > ${SRCROOT}/Flutter/Defineexample.xcconfig
```

Lời giải thích chính sác những gì mà bash script này thực hiện nếu muốn bạn có thể tìm thấy [ở đây](https://medium.com/@tatsu.ukraine/what-you-should-know-before-you-upgrade-flutter-in-your-project-with-compile-time-variables-3ec3d2e9ba79).

Và với Flutter 2.2 bạn muốn sử dụng base64 thay vì URL encode ở dòng thứ 3:

```
# Type a script or drag a script file from your workspace to insert its path.

function entry_decode() { echo "${*}" | base64 --decode; }

IFS=',' read -r -a define_items <<< "$DART_DEFINES"


for index in "${!define_items[@]}"
do
    define_items[$index]=$(entry_decode "${define_items[$index]}");
done

printf "%s\n" "${define_items[@]}"|grep '^DEFINEEXAMPLE_' > ${SRCROOT}/Flutter/Defineexample.xcconfig
```

Trong suốt quá trình build, câu lệnh này sẽ tạo ra file **Defineexample.xcconfig**:

```
DEFINEEXAMPLE_APP_NAME=awesomeApp1
DEFINEEXAMPLE_APP_SUFFIX=.dev
```

Bạn có thể chọn tên file khác ***.xcconfig** nếu bạn muốn. Chỉ cần đảm bảo rằng chúng ko bị chỉnh sửa bởi các đoạn scripts của Flutter Tool.

Cũng như luôn ý thức về các giới hạn của ***.xcconfig** nếu bạn cần loại bỏ **//** trong quá trình phân tách.

Khi ứng dụng được cài đặt lên thiết bị, bạn có thể thấy rằng nó có một tên, cái được định nghĩa trong quá trình build.

<div align="center"><img src="https://images.viblo.asia/f2b14aaa-da3b-4a9d-a335-88cd6f7a8af8.png" /></div><br />

Cũng như tên package:

<div align="center"><img src="https://images.viblo.asia/64048d38-5909-47ed-a791-360b28b061bb.png" /></div><br />

Tương tự với Android, giờ đây bạn có thể sử dụng bộ thiết lập giá trị này ở mọi nơi trong project của mình.

Điều đó thật là tuyệt vời! Project mẫu bạn có thể tìm thấy [tại đây](https://github.com/TatsuUkraine/flutter_define_example).
Project mẫu trên nhánh **master** có thể được build từ Flutter 1.17 tới phiên bản 2.2.

## Source
https://itnext.io/flutter-1-17-no-more-flavors-no-more-ios-schemas-command-argument-that-solves-everything-8b145ed4285d

## Reference

**[Stacekd State Management](https://github.com/DanhDue/stacked_state_mamagement)**.

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))