Bài viết này chúng ta sẽ cùng nhau đi tìm hiểu những thành phần đơn giản cấu tạo bên trong Flutter project : 

- Image và assets 
- Strings và Localization 
- Dependencies 

## Image và assets trong Flutter
Với iOS, resources được đặt trong thư mục `Images.xcasset` hoặc các thư mục riêng biệt trong project. Còn với Flutter tất cả resources khai báo trong file `pubspec.yaml` bên dưới thành phần `assets`.
Ví dụ bạn có một file JSON đặt trong thư mục 'my-assets'. 
```
my-assets/data.json
```

Bạn sẽ cần khai báo asset này trong file `pubspec.yaml` :
```dart
assets:
 - my-assets/data.json
```

Khi truy cập file này, bạn có thể sử dụng class [AssetBundle](https://docs.flutter.io/flutter/services/AssetBundle-class.html)
```dart
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;

Future<String> loadAsset() async {
  return await rootBundle.loadString('my-assets/data.json');
}

```

Với images, Flutter cũng hỗ trợ hiển thị theo định dạng tương tự như iOS. Image assets phải có các kích thước 1.0x, 2.0x, 3.0x hay bất kì tỉ lệ nào khác. 

Asset được lưu trong trong bất kì thư mục nào mà chúng ta tạo trong project, miễn là bạn khai báo đường dẫn chính xác của asset đó trong file `pubspec.yaml`.

Ví dụ bạn cần thêm 1 image có tên "my_icon.png" có các kích thước 1.0x, 2.0x, 3.0x vào trong project của bạn. Đầu tiên bạn cần lưu image vào trong thư mục "images". Đặt image (1.0x) trong thư mục `images`, và các kích thước khác trong các thư mục con với tên thư mục là tỉ lệ của image đó.

```dart
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

Có vẻ việc thêm resources vào Flutter hơi vất vả >_< 

Tiếp theo bạn phải khai báo vào file `pubspec.yaml` :
```dart
assets:
 - images/my_icon.jpeg
```

Trong Flutter, để truy cập file image, chúng ta sử dụng class [AssetImage](https://docs.flutter.io/flutter/painting/AssetImage-class.html)
```dart
return AssetImage("images/a_dot_burr.jpeg");
```

Hoặc sử dụng [Image](https://docs.flutter.io/flutter/widgets/Image-class.html) widget 
```dart
@override
Widget build(BuildContext context) {
  return Image.asset("images/my_image.png");
}
```

Các bạn có thể tìm hiểu kĩ hơn về assets và Images trong Flutter trong document : [Adding Assets and Images in Flutter](https://flutter.io/assets-and-images/)


## Store strings and localization
Với iOS, chúng ta có file `Localizable.strings` để định nghĩa string và hỗ trợ localization. Trong Flutter, hiện tại không có một hệ thống hỗ trợ cho việc xử lý string. Cách tốt nhất hiện tại bạn có thể làm là khai báo các text là các trường tĩnh trong một last, sau đó truy xuất đến class này.
Ví dụ bạn khai báo text "Welcome To Flutter" vào trong class `Strings` 
```dart
class Strings {
  static String welcomeMessage = "Welcome To Flutter";
}
```

Và truy xuất text như sau: 

```dart
Text(Strings.welcomeMessage)
```

Mặc định, Flutter chỉ hỗ trợ ngôn ngữ English cho strings. Vậy để hỗ trợ đa ngôn ngữ trong 1 ứng dụng Flutter thì các giải quyết thế nào? 
Chúng ta sẽ cần sử dụng package [flutter_localizations](https://github.com/flutter/flutter/tree/master/packages/flutter_localizations) . Bạn cũng có thể cần phải thêm package [intl](https://pub.dartlang.org/packages/intl) của Dart để sử dụng i10n, chẳng hạn như định dạng ngày / giờ.

```dart
dependencies:
  # ...
  flutter_localizations:
    sdk: flutter
  intl: "^0.15.6"
```

Để sử dụng package `flutter_localizations`, chúng ta phải chỉ định 2 delegate  `localizationsDelegates` và `supportedLocales` trong app widget 
Ví dụ 
```dart
import 'package:flutter_localizations/flutter_localizations.dart';

MaterialApp(
 localizationsDelegates: [
   // Add app-specific localization delegate[s] here
   GlobalMaterialLocalizations.delegate,
   GlobalWidgetsLocalizations.delegate,
 ],
 supportedLocales: [
    const Locale('en', 'US'), // English
    const Locale('he', 'IL'), // Hebrew
    // ... other locales the app supports
  ],
  // ...
)
```

- `supportedLocales` xác định locale mà app hỗ trợ 
- `localizationsDelegates` xác định các localization delegate sẽ được sử dụng trong app. 

Trong ví dụ trên thiết kế app với `MaterialApp`, do đó sẽ sử dụng `GlobalWidgetsLocalizations` để localize cho các `base widgets` và `MaterialWidgetsLocalizations` để localize cho các `Material widgets`. 
Nếu app của bạn thiết kế là `WidgetsApp` thì bạn chỉ cần sử dụng `MaterialWidgetsLocalizations`

Hiểu rõ hơn về localize trong Flutter, bạn có thể tìm hiểu thêm trong topic [Internationalizing Flutter Apps](https://flutter.io/tutorials/internationalization/)

## Dependencies in Flutter
Theo dõi ví dụ phía trên, bạn thấy việc thêm package `flutter_localizations` được đưa vào trong `dependencies`.

Bạn có thể hiểu đơn giản `dependencies` trong Flutter tương tự như `Podfile` của Cocoapods trong iOS.
Flutter sử dụng hệ thống của Dart và trình quản lý gói [Pub](https://pub.dartlang.org/flutter/packages/) để xử lý các `dependencies`. 

Để hiểu rõ hơn về cách sử dụng Package trong Flutter, bạn có thể tìm hiểu thêm trong topic [Using Packages](https://flutter.io/using-packages/)