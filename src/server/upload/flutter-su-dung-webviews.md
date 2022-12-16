# Giới thiệu
Việc hiển thị một Web view là điều rất phổ biến trong ứng dụng mobile, web view giúp tiết kiệm thời gian và công sức trong một số trường hợp nhất định thay vì làm theo kiểu native truyền thống. Trong flutter web view được triển khai thông qua **webview_flutter package**.  Package này là một thành phần nhỏ trong bộ plugins của flutter tại repo https://github.com/flutter/plugins
Trong bài này mục tiêu đơn giản là:
- Tạo một app cơ bản, với một màn hình chính có chứa một button để mở một URL đã chỉ định trước
- Tạo một widget có nhiệm vụ hiển thị nội dung trang web ở chế độ fullscreen
- Xử lý một số vấn đề khi làm việc với web view trong flutter

# Tiến hành
### Step 1: Tạo HomeScreen
Tạo một flutter project bằng command line nhưng thông thường : **flutter create flutter_demo_webviews**

Mở project vừa tạo tìm đến file main.dart và sửa đổi như sau
```
// main.dart
import 'package:flutter/material.dart';
import 'app.dart';
void main() => runApp(App());
```
Tạo file app.dart với các Material Design styling cơ bản. Đồng thời set home navigation route là Home screen

```
// app.dart
import 'package:flutter/material.dart';
import 'screens/home.dart';
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Web Views',
      theme: ThemeData(
          primarySwatch: Colors.blue,
          fontFamily: "Arial",
          textTheme: TextTheme(
              button: TextStyle(color: Colors.white, fontSize: 18.0),
              title: TextStyle(color: Colors.red))),
      home: Home(),
    );
  }
}
```

### Step 2: Tạo home.dart 
Màn hình home của chúng ta sẽ chỉ show 1 button có nhiệm vụ mở một URL đã được chỉ định sẵn. Trong ví dụ này chúng ta sẽ dùng  Material Design widgets button (FlatButton) để đơn giản hóa. Màn hình có thể chứa một vài widgets bạn không quen thuộc, nhưng bạn chỉ cần hiểu hàm **handleURLButtonPress** bên dưới chịu nhiệm vụ navigate đến web view được triển khai trong widget WebViewContainer 
```
// screens/home.dart
import 'package:flutter/material.dart';
import 'web_view_container.dart';
class Home extends StatelessWidget {
  final _links = ['https://google.com'];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
            child: SingleChildScrollView(
                child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: _links.map((link) => _urlButton(context, link)).toList(),
    ))));
  }
  Widget _urlButton(BuildContext context, String url) {
    return Container(
        padding: EdgeInsets.all(20.0),
        child: FlatButton(
          color: Theme.of(context).primaryColor,
          padding: const EdgeInsets.symmetric(horizontal: 50.0, vertical: 15.0),
          child: Text(url),
          onPressed: () => _handleURLButtonPress(context, url),
        ));
  }
  
   void _handleURLButtonPress(BuildContext context, String url) {
    Navigator.push(context,
        MaterialPageRoute(builder: (context) => WebViewContainer(url)));
  }
}
```
### Step 3: Tạo  WebViewContainer
WebView của chúng ta sẽ hiển thị full screen và được implement bởi một widget mới là WebViewContainer. Mỗi widget chính là một màn hình đơn giản
Thành phần quan trọng nhất của màn hình này là Webview widget, chỉ việc import webview_flutterpackage
```
WebView(
    key: _key,
    javascriptMode: JavascriptMode.unrestricted,
    initialUrl: _url)
```
 Đầu tiên, 'key' parameter cho phép Flutter widget tree dễ dàng refer đến widget này thông qua một unique key tạo qua Flutter's UniqueKey() method 
 
 Tiếp theo, javascriptMode chỉ đơn gianr là cho chép chúng ta kiểm soát lại những Javascript nào có thể chạy trong webview
 
 Cuối cùng,initialUrl là URL web page chúng ta muốn hiển thị trong webview
 
**Implement WebViewContainer**
```
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
class WebViewContainer extends StatefulWidget {
  final url;
  WebViewContainer(this.url);
  @override
  createState() => _WebViewContainerState(this.url);
}
class _WebViewContainerState extends State<WebViewContainer> {
  var _url;
  final _key = UniqueKey();
  _WebViewContainerState(this._url);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        body: Column(
          children: [
            Expanded(
                child: WebView(
                    key: _key,
                    javascriptMode: JavascriptMode.unrestricted,
                    initialUrl: _url))
          ],
        ));
  }
}
```

Điều quan trọng ở đây là bất kỳ Widget nào có chứa WebView widget đều phải sử dụng StatefulWidget. Nếu bạn sử dụng StatelessWidget, webview sẽ không load đúng cách

Ở thây chúng ta sẽ truyền tham số Url vào  Widget. Tham số này sẽ được sử dụng trong state của StatefulWidget

Có rất nhiều tính năng của WebView widget được cung cấp. Để xem chi tiết chỉ việc bấm Ctrl/Command + Click vào WebView widget để đọc source code

### Một điều nữa yêu cầu đối với các devices IOS
Để sử dụng WebView trong IOS. Nó yêu cầu phải thêm một Setting đặc biệt trong XCode project của bạn. Ở đây là file Info.plist. đây là file chứa các config của một XCode project. Hãy thêm các dòng sau vào thẻ <dict>
    
```
<dict>
    ...
    <key>io.flutter.embedded_views_preview</key>
    <string>YES</string>
    ...
```
Ví dụ:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>io.flutter.embedded_views_preview</key>
    <string>YES</string>
    <key>CFBundleDevelopmentRegion</key>
    <string>en</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    ...
```
### Nguồn tham khảo
https://blog.geekyants.com/webviews-in-flutter-87194714ce3d