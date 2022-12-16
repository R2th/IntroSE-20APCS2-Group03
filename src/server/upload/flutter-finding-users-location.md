Flutter là một framework từ Google cho phép bạn sử dụng ngôn ngữ Dart để viết các ứng dụng đa nền tảng. Điều này có nghĩa là ứng dụng của bạn sẽ chạy trên cả thiết bị iOS và Android.

Nếu bạn đang xây dựng một ứng dụng bản đồ thì việc tìm kiếm vị trí hiện tại của người dùng là một phần không thể thiếu trong ứng dụng của bạn. May mắn thay, Flutter làm cho nó siêu đơn giản bằng cách sử dụng gói **Geolocator**.
Bước đầu tiên là cài đặt gói **Geolocator** bằng cách thêm nó vào tệp pubspec.yaml như dưới đây:

```java
environment:
  sdk: ">=2.1.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter

  # The following adds the Cupertino Icons font to your application.
  # Use with the CupertinoIcons class for iOS style icons.
  cupertino_icons: ^0.1.2
  geolocator: ^5.1.5
```

Nếu bạn đang sử dụng VS Code thì chỉ cần lưu file tải xuống các package. Nếu bạn đang sử dụng một số trình soạn thảo khác thì hãy chạy lệnh sau từ command line terminal:
```
flutter packages get
```

Bây giờ, bạn đã cài đặt gói **Geolocator**, và hãy cùng tìm hiểu xem cách sử dụng nó như thế nào nhé.
Ví dụ, mình sẽ có 1 màn hình có các widget rất cơ bản, chứa FlatButton và Text giống như dưới đây:

```java
@override
  Widget build(BuildContext context) {

    return MaterialApp(
      title: "Hello Location", 
      home: Scaffold(
        body: Center(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
              Text(""), 
              FlatButton(
                child: Text("Find Current Location",style: TextStyle(color: Colors.white)), 
                color: Colors.green, 
                onPressed: () {
                  _displayCurrentLocation();
                },
              )
          ]),
        )
      )
    );
    
  }
```

Tiếp theo, implement phương thức (function)  _displayCurrentLocation.

```java
void _displayCurrentLocation() async {

    final _location  = await Geolocator().getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    
  }
```

Tuy nhiên, rất tiếc là nó sẽ không hoạt động trên bất kỳ thiết bị hoặc trình giả lập (simulator) nào vì chúng ta sẽ phải cần thiết lập quyền **permissions**.
Đối với Android, hãy mở tệp gradle.properIES trong thư mục Android và thêm các dòng sau:

```
android.useAndroidX=true
android.enableJetifier=true
```

Ngoài ra, hãy đảm bảo rằng compileSDKVersion được set thành 28 hoặc cao hơn trong tệp android / app / build.gradle.

```
android {
 compileSdkVersion 28

 ...
}
```

Cuối cùng, cập nhật tệp AndroidManifest.xml có trong android / app / src / main với các  **permissions** sau:
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

Tiếp theo, config cho iOS.
Mở vị trí tệp info.plist trong thư mục ios / Runner và thêm các mục sau:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs access to location when open.</string>
```

Vậy là xong, bây giờ chúng ta sẽ thử nó bằng cách chạy ứng dụng lên và click vào button. Khi bạn nhấp vào button, ứng dụng sẽ yêu cầu bạn cho phép sử dụng vị trí của bạn. Khi bạn đã cấp vị trí, nó sẽ tìm vị trí hiện tại của bạn và hiển thị tọa độ trên console.
Để hiển thị tọa độ trên giao diện người dùng, chúng ta sẽ cần update widget  của từ ***stateless to stateful***. Cách implement như sau:
```java
oid main() => runApp(App());

class App extends StatefulWidget {
  @override 
  _AppState createState() => _AppState(); 
}

class _AppState extends State<App> {

  Position _location = Position(latitude: 0.0, longitude: 0.0); 

  void _displayCurrentLocation() async {

    final location = await Geolocator().getCurrentPosition(desiredAccuracy: LocationAccuracy.high);

    setState(() {
      _location = location; 
    });

  }

  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      title: "Hello Location", 
      home: Scaffold(
        body: Center(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
              Text("${_location.latitude}, ${_location.longitude}"), 
```

Và bây giờ, khi bạn chạy ứng dụng, bạn có thể nhấp vào button "Find Current Location" để hiển thị tọa độ hiện tại trên màn hình như trong ảnh chụp màn hình bên dưới:

![](https://images.viblo.asia/4ea00222-1aa0-47fb-abe3-6a1f14bb805d.png)

Cám ơn các bạn đã đọc bài viết. Thanks u

Tài liệu tham khảo:
- https://pub.dev/packages/geolocator
- https://pub.dev/packages/location
- https://medium.com/flutter-community/finding-users-location-in-flutter-831d40f49c08