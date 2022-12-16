Chắc hẳn chúng ta - những Android, iOS developer - không còn xa lạ gì với React Native, một SDK của Facebook dùng để phát triển các ứng dụng mobile cho cả 2 nền tảng Android và iOS. Và để đáp lại, Google đã cho ra mắt Flutter vào năm 2017.

Bài viết này sẽ giới thiệu về bộ SDK mới mẻ này, nhằm cho chúng ta cái nhìn tổng quan nhất.

## Flutter là gì?
Flutter là SDK dành cho thiết bị di động của Google để tạo ra các giao diện native chất lượng cao trên iOS và Android trong thời gian ngắn. Flutter làm việc với source code có sẵn, được sử dụng bởi các nhà phát triển và các tổ chức trên khắp thế giới, đồng thời nó open-source và miễn phí.

## Những đặc điểm của Flutter
### Phát triển ứng dụng nhanh chóng
Tính năng ***hot reload*** của Flutter giúp bạn nhanh chóng và dễ dàng thử nghiệm, xây dựng giao diện người dùng, thêm tính năng và sửa lỗi nhanh hơn. Trải nghiệm tải lại lần thứ hai, mà không làm mất trạng thái, trên emulator, simulator và device cho iOS và Android.
![](https://images.viblo.asia/f08a02bb-07ba-4459-a1d3-44531995173e.gif)

### UI đẹp và biểu cảm
Thỏa mãn người dùng của bạn với các widget built-in đẹp mắt của Flutter theo Material Design và Cupertino (iOS-flavor), các API chuyển động phong phú, scroll tự nhiên mượt mà và tự nhận thức được nền tảng.

![](https://images.viblo.asia/9768d9e8-fa45-462a-bc40-da764ec23f7b.png)![](https://images.viblo.asia/e6d9fbf3-99a7-4cc4-ad10-c60f6176caed.png)
![](https://images.viblo.asia/625a8e25-c8a7-4c90-a1bb-09637f7f5ce2.png)![](https://images.viblo.asia/5617cb31-8e97-4183-b97f-997c7bf17617.png)

### Framework hiện đại và reactive
Dễ dàng tạo giao diện người dùng của bạn với framework hiện đại, reactive của Flutter và tập hợp các platform, layout và widget phong phú. Giải quyết các thách thức giao diện người dùng khó khăn của bạn với các API mạnh mẽ và linh hoạt cho 2D, animation, gesture, hiệu ứng và hơn thế nữa.
```
class CounterState extends State<Counter> {
  int counter = 0;

  void increment() {
    // Tells the Flutter framework that state has changed,
    // so the framework can run build() and update the display.
    setState(() {
      counter++;
    });
  }

  Widget build(BuildContext context) {
    // This method is rerun every time setState is called.
    // The Flutter framework has been optimized to make rerunning
    // build methods fast, so that you can just rebuild anything that
    // needs updating rather than having to individually change
    // instances of widgets.
    return new Row(
      children: <Widget>[
        new RaisedButton(
          onPressed: increment,
          child: new Text('Increment'),
        ),
        new Text('Count: $counter'),
      ],
    );
  }
}
```
### Truy cập các tính năng và SDK native
Làm cho ứng dụng của bạn trở nên sống động với API của platform, SDK của bên thứ ba và native code. Flutter cho phép bạn sử dụng lại mã Java, Swift và ObjC hiện tại của mình và truy cập các tính năng và SDK native trên iOS và Android.

Việc truy cập các tính năng nền tảng thật dễ dàng. Đây là một đoạn code ví dụ:
```
Future<Null> getBatteryLevel() async {
  var batteryLevel = 'unknown';
  try {
    int result = await methodChannel.invokeMethod('getBatteryLevel');
    batteryLevel = 'Battery level: $result%';
  } on PlatformException {
    batteryLevel = 'Failed to get battery level.';
  }
  setState(() {
    _batteryLevel = batteryLevel;
  });
}
```
### Phát triển ứng dụng thống nhất
Flutter có các công cụ và thư viện để giúp bạn dễ dàng đưa ý tưởng của mình vào cuộc sống trên iOS và Android. Nếu bạn chưa có kinh nghiệm phát triển trên thiết bị di động, thì Flutter là một cách dễ dàng và nhanh chóng để xây dựng các ứng dụng di động tuyệt đẹp. Nếu bạn là một nhà phát triển iOS hoặc Android có kinh nghiệm, bạn có thể sử dụng Flutter cho các View của bạn và tận dụng nhiều code Java / Kotlin / ObjC / Swift hiện có của bạn.

| Build | Optimize | Deploy |
| -------- | -------- | -------- |
| **Beautiful app UIs** | **Test** | **Compile** |
| Rich 2D GPU-accelerated APIs | Unit testing | Native ARM code |
| Reactive framework | Integration testing | "Tree shaking" compiler |
| Animation/motion APIs | On-device testing | **Distribution** |
| Material Components and Cupertino widgets | **Debug** | Apple App Store
| **Fluid coding experience** | IDE debugger | Google Play Store |
| Sub-second, stateful hot reload | Web-based debugger |
| Refactor, code completion, etc. | Async/await aware |
| Dart language and core libs | Expression evaluator |
| Package manager | **Profile** |
| **Full-features apps** | Timeline |
| Interop with mobile OS APIs & SDKs | CPU and memory |
| Gradle: Java/Kotlin | In-app perf chart |
| Cocoapods: ObjC/Swift |

Tham khảo https://flutter.io/