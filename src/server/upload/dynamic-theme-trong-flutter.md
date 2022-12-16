Có rất nhiều cách áp dụng dynamic theme trong Flutter. Vì Provider đang được khá nhiều người sử dụng nên chúng ta hãy cùng thử tạo ứng dụng và thiết lập dynamic theme sử dụng Provider nhé.

## Cài đặt

Tạo ứng dụng counter mặc định của Flutter: `flutter create counter`

Mình có tách `MyHomePage` và `_MyHomePageState` ra một file riêng là `lib/home.dart` để  rõ ràng hơn và tránh việc khó theo dõi.

Sau đó chúng ta thêm thư viện [provider](https://pub.dev/packages/provider) vào `pubspec.yaml`

```yaml:pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^0.1.3
  provider: ^4.0.5 # Thêm thư viện provider

dev_dependencies:
  flutter_test:
    sdk: flutter
```

## Khởi tạo

Tạo file tên `themes.dart`, file này sẽ chứa các theme và các class liên quan đến theme.
Đầu tiên ta sẽ tạo ra 1 enum chứa tên của các theme trong class thay vì sử dụng string để tránh các lỗi lặt vặt do sai chính tả hoặc không báo lỗi nếu như chúng ta đổi tên theme nhưng lại quên không đổi ở đâu đó trong app.
Ở đây mình muốn app có 2 theme là light và dark
```dart:lib/themes.dart
enum AppThemeKeys { light, dark }
```

Sau khi xong, chúng ta sẽ tạo một `Map` chứa các thuộc tính của các theme có trong app. Mình muốn các AppBar, Button trong light theme sẽ có màu xanh nước biển, còn dark theme sẽ  là màu xanh lá cây. Thuộc tính brightness sẽ giúp mình tự động chuyển một số màu từ light sang dark để phù hợp với theme (ví dụ như ở light theme thì màu chữ là màu đen xám, màu background là màu trắng, khi qua dark theme thì màu chữ sẽ là màu trắng, màu background là màu đen xám). Bạn có thể đọc thêm về brightness tại [đây](https://api.flutter.dev/flutter/material/ThemeData/brightness.html)
```dart:lib/themes.dart
final Map<AppThemeKeys, ThemeData> _themes = {
  AppThemeKeys.light: ThemeData(
    primaryColor: Colors.blue,
    accentColor: Colors.blue,
    brightness: Brightness.light,
  ),
  AppThemeKeys.dark: ThemeData(
    primaryColor: Colors.green,
    accentColor: Colors.green,
    brightness: Brightness.dark,
  ),
};
```

Tiếp theo đó chúng ta sẽ tạo class `AppTheme` kế thừa `ChangeNotifier`, class này sẽ chính là class điều khiển trạng thái theme của app chúng ta. Bạn có thể đọc thêm về ChangeNotifier để nắm rõ hơn cách nó hoạt động
```dart:lib/themes.dart
class AppTheme extends ChangeNotifier {
  // Method này sẽ giúp chúng ta lấy AppTheme ra một cách dễ dàng hơn, thay vì
  // Provider.of<AppTheme>(context)
  // chúng ta chỉ cần
  // AppTheme.of(context)
  static AppTheme of(BuildContext context, {bool listen = false}) =>
      Provider.of<AppTheme>(context, listen: listen);

  // Đây sẽ là state chính của class, chứa tên của theme, mặc định mình set là light
  AppThemeKeys _themeKey = AppThemeKeys.light;

  // Mình tạo thêm 2 cái getter này để dễ sử dụng hơn
  // currentTheme sẽ là theme hiện tại (là ThemeData không phải tên theme nữa)
  // currentThemeKey là tên theme hiện tại (mình không public _themeKey bởi vì 
  // mình không muốn chỉnh sửa trực tiếp vào biến mà qua các setter vì còn cần notifyListeners() nữa)
  ThemeData get currentTheme => _themes[_themeKey];
  AppThemeKeys get currentThemeKey => _themeKey;

  // Đổi theme sang một theme khác 
  void setTheme(AppThemeKeys themeKey) {
    _themeKey = themeKey;
    notifyListeners();
  }

  // Ở đây mình chỉ có 2 theme nên mình sẽ tạo thêm 1 method để demo dễ hơn. Method này sẽ switch giữa
  // light theme và dark theme
  void switchTheme() {
    if (_themeKey == AppThemeKeys.dark) {
      _themeKey = AppThemeKeys.light;
    } else {
      _themeKey = AppThemeKeys.dark;
    }
    notifyListeners();
  }
}
```

Vậy là xong phần chính rồi. Tiếp sau đây sẽ là sử dụng vào app counter mặc định của Flutter

## Áp dụng
Mở file `main.dart`, tại hàm `main()` chúng ta sẽ cần bọc cả App trong `ChangeNotifierProvider` và truyền một instance của `AppTheme` mình vừa tạo vào thuộc tính `create`
```dart:lib/main.dart
// Trước
void main() {
  runApp(MyApp());
}

// Sau
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AppTheme(),
      child: MyApp(),
    )
  );
}
```

Giờ đây các widget con sẽ có thể lấy được instance kia bằng cách sử dụng `Provider.of<AppTheme>(context)` hoặc `AppTheme.of(context)`
Vậy nên chúng ta sẽ sử dụng luôn tại class `MyApp` vì trong đó có sử dụng `MaterialApp`, nơi chúng ta có thể đổi theme.
Chúng ta sẽ đổi thuộc tính `theme` từ giá trị hiện tại qua `AppTheme.of(context, listen: true).currentTheme`
```dart:lib/main.dart
// Trước
return MaterialApp(
  ...
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  ...
);

// Sau
return MaterialApp(
  ...
  theme: AppTheme.of(context, listen: true).currentTheme,
  ...
);
```
Chúng ta thêm thuộc tính listen: true vì chúng ta muốn update lại view mỗi khi state của `AppTheme` thay đổi.
Vậy là khi state của `AppTheme` thay đổi, theme của chúng ta cũng thay đổi theo.
Chúng ta cần đổi theme khi bấm vào một button nào đó trong view, vậy trước tiên chúng ta cần lấy instance của `AppTheme` tương tự như trên. 

Tại `_MyHomePageState` tạo một biến để chứa AppTheme và khởi tạo nó trong `didChangeDependencies`
```dart:lib/home.dart
class _MyHomePageState extends State<MyHomePage> {
    AppTheme _theme;

    @override
    void didChangeDependencies() {
      if (_theme == null) {
        _theme = AppTheme.of(context);
      }

      super.didChangeDependencies();
    }
    
    ...
}
```

Sau đó mình kéo xuống đoạn khai báo AppBar và thêm một button bên phải của AppBar để đổi theme. Tại hàm onPressed của button mình gọi đến hàm `switchTheme()` của `AppTheme` để đổi qua lại giữa 2 theme. Mình sử dụng `?.` để đề phòng trường hợp `_theme` null
```dart:lib/home.dart
 ...
  appBar: AppBar(
    title: Text(widget.title),
    actions: [
      IconButton(
        icon: Icon(Icons.flip, color: Colors.white),
        onPressed: _theme?.switchTheme,
      ),
    ],
  ),
  ...
```

Vậy là xong. Và đây là thành quả:
![](https://images.viblo.asia/6452fd89-b899-4a9b-9fea-d9f45f341414.gif)