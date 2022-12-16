# 1. Bài viết này dành cho
- Mới làm quen với Flutter
- Muốn tạo 1 Splash screen cho app của mình 

Để các bạn tiện theo dõi, đây là [source code](https://github.com/hientranea/PlayingWithFlutter/tree/tip/splash_screen) của bài viết :D 

# 2. Splash screen
Splash screen thường là màn hình xuất hiện đầu tiên khi mở app. Màn hình này thường chỉ chứa branding logo của ứng dựng. Thông thường, các bạn muốn add splash screen vào app vào 2 mục đích sau:
- Để **làm đẹp** cho app :D. Thật ra còn có tác dụng gợi nhớ cho người dùng **Branding logo** của app, để cho ứng dụng bạn dễ dàng nhận biết hơn. Đối với trường hợp này, thời gian splash screen xuất hiện thường chỉ vài trăm ms, vì nếu xuất hiện quá lâu lại phản tác dụng mà Splash screem mang lại. Không người dùng nào lại muốn chờ đến vài giây để có thể vào ứng dụng. 
- Để tận dụng thời gian chạy các task nặng khi app lần đầu được khởi động. Thời gian app khởi động là thời gian có nhiều task cần phải xử lý nhất: load storage, authenticate tài khoản, check update, load config,... Nếu bạn tận dụng được đúng cách splash screen, bạn có thể **tăng tốc app và cải thiện UX** của app rất nhiều.

![Ví dụ về Splash screen](https://raw.githubusercontent.com/hientranea/PlayingWithFlutter/tip/splash_screen/flutter_splash_screen/gif/vapor_splash.gif) 

# 3. Show me the code 
## 3.1 Default splash screen Flutter
Thật ra, khi vừa khởi tạo project, Flutter đã hỗ trợ một màn hình splash screen, nhưng khá nhiều bạn sẽ không biết điều đó :D. Dưới đây mình sẽ hướng dẫn cách tạo màn hình splash screen đơn giản gồm logo của app ở chính giữa màn hình.
### Android platform
*Mình sẽ nói về platform này đầu tiên vì mình thích Android :D*

Bạn có để ý là khi vừa mở app, sẽ có một màn hình trắng hiện lên, sau đó mới tới app của bạn. Đó không phải là app load chậm hay bị đơ, thật ra đó là splash screen mặc định của Flutter, chỉ có điều nó ... màu trắng. Để thay đổi nó, bạn vào đường dẫn `[root_project\android\app\src\main\res`. Ở đây có 2 chỗ cần chú ý:
- `mipmap-[xyz]`: Đây là nơi để bạn đặt logo bạn muốn xuất hiện trên splash screen. Tùy theo độ phân giải màn hình mà bạn sẽ đặt các logo có kích thước tăng dần vào các thư mục `mipmap-mdpi`, `mipmap-hdpi`, `mipmap-xhdpi`, `mipmap-xxhdpi`, `mipmap-xxxhdpi` để tránh bị vỡ trên các kích thước màn hình khác nhau. Do không thuộc phạm vi bài viết này nên mình chỉ tóm tắt sơ lại cách mapping độ phân giải màn hình vào các folder này:
 
 |[Density](https://en.wikipedia.org/wiki/Pixel_density)| 1                | 1.5 | 2 | 3 | 4 |
 |--------|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
 | Folder | mdpi| hdpi| xhdpi| xxhdpi| xxxxhdpi |
 
 - `drawable\launch_background.xml`: Đây chính là file tạo ra cái màn hình màu trắng lúc nãy mình nói. Chỉ cần sửa lại một chút là bạn đã có được splash screen. Ở đây mình dùng lại luôn logo của Flutter.Bạn có thể tùy chỉnh file này theo ý mình bằng native code.
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Modify this file to customize your launch splash screen -->
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@android:color/white" />
    <item>
        <bitmap
            android:gravity="center"
            android:src="@mipmap/ic_launcher" />
    </item>
</layer-list>
```
Và đây là kết quả
![Default splash screen Android](https://raw.githubusercontent.com/hientranea/PlayingWithFlutter/tip/splash_screen/flutter_splash_screen/gif/auto_splash_screen.gif)

> Bạn cũng có thể bỏ splash screen mặc định này bằng cách vào file `style.xml` và bỏ dòng 
> ```xml
> <item name="android:windowBackground">@drawable/launch_background</item>
> ```
### IOS platform
Đối với IOS, việc này đơn giản hơn nữa, thật ra ở IOS, Flutter đang show 1 transparent image nên bạn không thấy nó :D. Chỉ cần vào `[root_project]\ios\Runner\Assets.xcassets\LaunchImage.imageset` và thay các hình `LaunchImage.png` tương tư như đã làm ở Android

## 3.2 Custom Splash screen
Đây là phần chính của bài viết này :D. Thay vì chỉ làm Splash screen cho đẹp, bạn có thể tận dùng thời gian ấy để chạy 1 số background task. Mình tổ chức code theo kiến trúc MVP. Để các bạn thoải mái theo dõi, link source code mình đã để đầu bài viết. Dưới đây là flow chart mình sẽ cài đặt theo

![Flow](https://raw.githubusercontent.com/hientranea/PlayingWithFlutter/tip/splash_screen/flutter_splash_screen/gif/flow_splash_screen.png)

**Phần UI**

Ở file `main.dart`, nơi sẽ được gọi đầu tiên khi ứng dụng được chạy, ta thay đổi trang được load đầu tiên thành màn hình Splash screen 

```dart
// main.dart
void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      onGenerateRoute: initialSlideRoutes,
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SplashScreen(), //Display splash screen when start app 
    );
  }
}
```

Ở màn hình splash screen, mình tạo nhanh một màn hình gồm gradient background và 1 logo ở giữa màn hình 
```dart
//splash_screen.dart
//...
@override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      decoration: new BoxDecoration(
        gradient: new LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          stops: [0.1, 0.9],
          colors: [
            Color(0xFFFC5C7D),
            Color(0xFF6A82FB),
          ],
        ),
      ),
      padding: EdgeInsets.symmetric(horizontal: 90.0),
      child: Image.asset(
        Constants.ic_logo,
        fit: BoxFit.scaleDown,
      ),
    );
  }
//...
```
**Phần Logic**

Phần này sẻ xử lý ở presenter, nơi các bạn có thể chạy các background tash ở đây. Trong ví dụ này, mình sẽ cho main thread delay 2 giây , sau đó kiểm tra nếu user đã từng login thì navigate thẳng đến trang home, ngược lại sẽ navigate đến trang Login. Ở đây, mình dùng thêm 1 thư viện [SharedPreferences](https://pub.dartlang.org/packages/shared_preferences) để có thể lưu các biến shared preferences ở native platform.
> Để add thêm thư viện, bạn chỉ cần lại file `pubspec.yaml` như sau 
> ```yml
> //...
> dev_dependencies:
>   flutter_test:
>     sdk: flutter
>   shared_preferences: ^0.4.2
> //...
> ```

```dart
//splash_screen_presenter.dart
//...
void fetchSomething() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final _isHaveData = prefs.getString(Constants.sp_have_data) ?? "";

    //TODO Call API from server and do sth
    await new Future.delayed(const Duration(seconds: 2));

    if (_isHaveData.isEmpty) {
      await prefs.setString(Constants.sp_have_data, "just login");
      view.goToNextScreen(true);
    } else {
      view.goToNextScreen(false);
    }
  }
//...
```
và hàm goToNextScreen sẽ được implement ở `splash_screen.dart` như bên dưới. Mình dùng `pushReplacementNamed` để thay thể view đang hiển thị hiện tại thành một view mới. Nếu bạn chỉ dùng `pushNamed`, flutter sẽ mở lên 1 màn hình mới đè lên màn hình cũ của bạn (tương tự như backstack trong Android)
```dart
  void goToNextScreen(bool shouldLogin) {
    if (shouldLogin) {
      Navigator.pushReplacementNamed(context, Constants.login_screen);
    } else {
      Navigator.pushReplacementNamed(context, Constants.main_screen);
    }
  }
```

Và đây là kết quả :D

![](https://raw.githubusercontent.com/hientranea/PlayingWithFlutter/tip/splash_screen/flutter_splash_screen/gif/custom_splash_screen.gif)