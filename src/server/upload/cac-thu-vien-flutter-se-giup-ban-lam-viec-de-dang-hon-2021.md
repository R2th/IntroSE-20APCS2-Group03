![](https://images.viblo.asia/67aaef3d-d3a2-4418-8c2d-ba4b1a26e1b4.png)

Trong máy tính, thư viện là một tập hợp các tài nguyên ít thay đổi hoặc các chương trình con được sử dụng trong các chương trình máy tính.

Chúng có thể bao gồm thiết lập dữ liệu, tài liệu, các hỗ trợ, codes viết sẵn và chương trình con, classes, giá trị hoặc các định nghĩa kiểu dữ liệu ([Wikipedia](https://en.wikipedia.org/wiki/Library_(computing))).

Dưới đây là danh sách một số thư viện Flutter mà mọi developer nên biết. Hãy cùng nhau tìm hiểu nhé.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/mot-so-thu-vien-flutter-se-giup-ban-lam-viec-de-dang-hon-2021/)

### mvc_pattern

Viết Flutter code rõ ràng (clean) và có thể bảo trì (maintain) là rất quan trọng cho các dự án của bạn. Thư viện này cung cấp mô hình MVC theo cách kết hợp phần lớn framework của Flutter.

### View

```
class _MyHomePageState extends State<MyHomePage> {

  final Controller _con = Controller.con;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              widget.title,
            ),
            Text(
              '${_con.counter}',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(
              _con.incrementCounter
          );
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

### Controller

```
class Controller extends ControllerMVC {
  /// Singleton Factory
  factory Controller() {
    if (_this == null) _this = Controller._();
    return _this;
  }
  static Controller _this;

  Controller._();

  static Controller get con => _this;

  int get counter => _counter;
  int _counter = 0;
  void incrementCounter() => _counter++;
}
```

### Model

```
class Model {
  static int get counter => _counter;
  static int _counter = 0;
  static int _incrementCounter() => ++_counter;
}
```

Để xem tài liệu, hãy bấm [vào đây](https://pub.dev/packages/mvc_pattern).

### hive

Hive là một cơ sở dữ liệu key-value nhẹ và nhanh chóng được viết bằng Dart thuần túy. Nó hoàn toàn phù hợp nếu bạn cần một kho dữ liệu nhẹ cho ứng dụng của mình. Sau khi thêm các dependency bắt buộc và khởi tạo Hive, bạn có thể sử dụng Hive trong dự án của mình.

```
var box = Hive.box('myBox');

box.put('name', 'David');

var name = box.get('name');

print('Name: $name');
```

Để xem tài liệu, hãy bấm [vào đây](https://pub.dev/packages/hive).

### url_launcher

Đây là một Flutter plugin để khởi chạy một URL trên mobile app. Hỗ trợ iOS, Android, web, Windows, macOS và Linux.

Ví dụ

```
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(Scaffold(
    body: Center(
      child: RaisedButton(
        onPressed: _launchURL,
        child: Text('Show Flutter homepage'),
      ),
    ),
  ));
}

_launchURL() async {
  const url = 'https://flutter.dev';
  if (await canLaunch(url)) {
    await launch(url);
  } else {
    throw 'Could not launch $url';
  }
}
```

Để xem tài liệu, hãy bấm [vào đây](https://pub.dev/packages/url_launcher).

### flushbar

Cá nhân tôi thích sử dụng package này để hiển thị thông báo thành công hoặc lỗi cho người dùng trong ứng dụng của tôi. Các package này đã hoạt động tốt bằng cách cung cấp một giao diện có thể tùy chỉnh để thông báo cho người dùng.

![](https://images.viblo.asia/13f18644-b43b-419c-93bd-fd951c5f84a0.gif)

```
class YourAwesomeApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'YourAwesomeApp',
      home: Scaffold(
        Container(
          child: Center(
            child: MaterialButton(
              onPressed: (){
                Flushbar(
                  title:  "Hey Ninja",
                  message:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                  duration:  Duration(seconds: 3),              
                )..show(context);
              },
            ),
          ),
        ),
      ),
    );
  }
}
```

Để xem tài liệu, hãy bấm [vào đây](https://pub.dev/packages/flushbar).

### dio

Dio là một ứng dụng HTTP client mạnh mẽ cho Dart, hỗ trợ Interceptors, Global configuration, FormData, Request Cancel, File download, Timeout, v.v.

```
import 'package:dio/dio.dart';
void getHttp() async {
  try {
    Response response = await Dio().get("http://www.google.com");
    print(response);
  } catch (e) {
    print(e);
  }
}
```

Để xem tài liệu, hãy nhấn [vào đây](https://pub.dev/packages/dio).

### Onesignal_flutter

[OneSignal](https://onesignal.com/) là một dịch vụ push notification miễn phí cho các ứng dụng di động. SDK này giúp bạn dễ dàng tích hợp các ứng dụng Flutter iOS và / hoặc Android của mình với OneSignal.

Thư viện này là flutter package để tích hợp OneSignal vào ứng dụng của bạn. Để tích hợp OneSignal vào ứng dụng của bạn, hãy xem [Setup Guide](https://documentation.onesignal.com/docs/flutter-sdk-setup) để cài đặt vào app của bạn.

Để xem tài liệu, hãy bấm[ vào đây](https://pub.dev/packages/onesignal_flutter).

### pull_to_refresh

![](https://images.viblo.asia/685c39c2-c319-472a-8d12-797bd6c68748.png)

Đây là một package được cung cấp cho thành phần Flutter nâng cao để drop-down refresh và pull up load. Packgage hỗ trợ cho cả Android và iOS.

Tính năng của package này bao gồm

* Refresh pull up load và pull down
* Nó gần như phù hợp với tất cả các tiện ích Scroll, như GridView, ListView…
* Cung cấp cài đặt global và thuộc tính mặc định
* Cung cấp một số chỉ số phổ biến nhất
* Hỗ trợ ScrollPhysics mặc định của Android và iOS, khoảng cách overScroll có thể được kiểm soát, hoạt ảnh lò xo tùy chỉnh, giảm xóc, tốc độ.
* Refresh theo chiều ngang và dọc, cũng hỗ trợ ScrollView đảo ngược (bốn hướng)
* Cung cấp nhiều refreshStyle: Behind, Follow, Unfollow, Front, và nhiều style khác
* Hỗ trợ refresh two-level, triển khai giống như TaoBao two-level, Wechat two-level
* Liên kết đặt ở nơi khác, giống như hiệu ứng làm mới Wechat FriendCircle

Để xem tài liệu, hãy bấm [vào đây](https://pub.dev/packages/pull_to_refresh).

### path_provider

Đây là một Flutter plugin để tìm các vị trí thường được sử dụng trên hệ thống tập tin hệ thống (filesystem). Hỗ trợ iOS, Android, Linux và MacOS. Không phải tất cả các method đều được hỗ trợ trên tất cả các nền tảng.

```
Directory tempDir = await getTemporaryDirectory();
String tempPath = tempDir.path;

Directory appDocDir = await getApplicationDocumentsDirectory();
String appDocPath = appDocDir.path;
google_fonts
```

Để xem tài liệu, hãy bấm [vào đây](https://pub.dev/packages/path_provider).

### cache_network_image

Đây là một thư viện Flutter để hiển thị hình ảnh từ internet và giữ chúng trong thư mục bộ nhớ cache.

```
CachedNetworkImage(
   imageUrl: "http://via.placeholder.com/350x150",
   placeholder: (context, url) => CircularProgressIndicator(),
   errorWidget: (context, url, error) => Icon(Icons.error),
),
```

Để xem tài liệu, hãy bấm [vào đây](https://pub.dev/packages/cached_network_image).

### font_awesome_flutter

Đây là một flutter package được xây dựng dựa trên Font Awesome Icon pack có sẵn.

Dựa trên Font Awesome 5.15.1. Bao gồm tất cả các icon miễn phí:

* Regular
* Solid
* Brands

```
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class MyWidget extends StatelessWidget {
  Widget build(BuildContext context) {
    return IconButton(
      icon: FaIcon(FontAwesomeIcons.gamepad), 
      onPressed: () { print("Pressed"); }
     );
  }
}
```

Để xem tài liệu, hãy bấm [vào đây](https://pub.dev/packages/font_awesome_flutter).

### submit_button

Đây là một nút có animation Flutter hoàn toàn có thể tùy chỉnh cho các biểu mẫu và trang đăng nhập/đăng ký. Được viết bằng Dart.

```
class _MyHomePageState extends State<MyHomePage> {
       bool _loading = false;

       void _submit() {
           setState(() {
           _loading = true;
           });

           Future.delayed(Duration(milliseconds: 5000), () {
           setState(() {
               _loading = false;
           });
           });
       }

       @override
       Widget build(BuildContext context) {
           return Scaffold(
           appBar: AppBar(
               title: Text(widget.title),
           ),
           body: Center(
               child: Column(
               children: [
               SubmitButton(
                   isLoading: _loading,
                   spinnerColor: Colors.green,
                   backgroundColor: Colors.red,
                   button: FlatButton(onPressed: _submit,
                   child: Text("Submit")
                  ),
               ),
               ],
           )),
           );
       }
   }
```

Để xem tài liệu, hãy nhấn [vào đây](https://pub.dev/packages/submit_button).

### flutter_screenutil

Đây là một Flutter plugin để điều chỉnh kích thước màn hình và phông chữ. Để giao diện người dùng của bạn hiển thị bố cục hợp lý trên các kích thước màn hình khác nhau.

```
Container(
   width: ScreenUtil().setWidth(50),
   height:ScreenUtil().setHeight(200),
)
```

Để xem tài liệu, hãy nhấn [vào đây](https://pub.dev/packages/flutter_screenutil).

Bài viết được dịch từ [bài viết gốc](https://efikas.medium.com/some-flutter-libraries-that-will-make-your-life-easier-in-2021-591a8bd73159).