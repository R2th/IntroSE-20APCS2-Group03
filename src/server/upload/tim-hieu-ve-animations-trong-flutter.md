# Các khái niệm và class animation

## Animation
  Trong Flutter,  [Animation](https://docs.flutter.io/flutter/animation/Animation-class.html) là một lớp trừu tượng, chỉ có biết giá trị hiện tại và trạng thái của nó (isCompleted và isDismissed ). Một trong những loại animation được sử dụng phổ biến là Animation <double>.
    
  Một đối tượng Animation trong Flutter là tạo ra tuần tự các số được xen vào giữa hai giá trị trong một khoảng thời gian nhất định. Đầu ra của một đối tượng Animation có thể là tuyến tính, đường cong, hàm theo các bước hoặc bất kỳ ánh xạ nào khác mà bạn có thể nghĩ ra. Tùy thuộc vào cách đối tượng Animation được điều khiển, nó có thể chạy theo chiều ngược hoặc thậm chí chuyển hướng ở giữa.
  
  Animations cũng có thể tích hợp vào trong các đối tượng khác ngoài kiểu double, chúng ta còn có thể sử dụng với Animation<Color> hoặc Animation<Size>. Một đối tượng Animation cũng có trạng thái của nó. Trạng thái đó được biểu hiện qua gía trị  `.value` .
    
   Một đối tượng Animation không biết gì về các hàm **render** hoặc **build ()**.

## CurvedAnimation
Một CurvedAnimation miêu tả tiến trình động giống như một  đường cong phi tuyến tính.
Ví dụ 
![](https://images.viblo.asia/f57650a5-fc36-4f5e-99a3-ab9b29d7d8b2.gif)

Khởi tạo hay định nghĩa một curvedAnimation như sau: 
```dart
final CurvedAnimation curve =
    CurvedAnimation(parent: controller, curve: Curves.easeIn);
```

Bạn có thể tự tạo một Curve riêng cho mình dựa vào lớp [Curves](https://docs.flutter.io/flutter/animation/Curves-class.html) 

Ví dụ 
```dart
class ShakeCurve extends Curve {
  @override
  double transform(double t) {
    return math.sin(t * math.PI * 2);
  }
}
```

CurvedAnimation và AnimationController đều là kiểu Animation<double>, vì thế chúng ta có thể sử dụng thay thế cho nhau. CurvedAnimation sẽ chứa đối tượng nó đang thay đổi, bạn không cần một lớp con AnimationController để thực hiện một curve.

## AnimationController
AnimationController là một đối tượng Animation đặc biệt tạo ra một giá trị mới bất cứ khi nào phần cứng sẵn sàng cho một khung mới. Mặc định, AnimationContoder tạo tuyến tính các số từ 0,0 đến 1,0 trong một khoảng thời gian nhất định. 
Ví dụ sẽ tạo ra một AnimationController  
```dart
final AnimationController controller = AnimationController(
    duration: const Duration(milliseconds: 2000), vsync: this);
```
[AnimationController](https://docs.flutter.io/flutter/animation/AnimationController-class.html) hỗ trợ phương thức để điều khiển animation. 
* Điều khiển animation [forward](https://docs.flutter.io/flutter/animation/AnimationController/forward.html) hoặc [reverse](https://docs.flutter.io/flutter/animation/AnimationController/reverse.html), hoặc [stop](https://docs.flutter.io/flutter/animation/AnimationController/stop.html)
*  Đặt animation thành một [value](https://docs.flutter.io/flutter/animation/AnimationController/value.html) cụ thể. 
* Định nghĩa các giá trị [upperBound](https://docs.flutter.io/flutter/animation/AnimationController/upperBound.html) and [lowerBound](https://docs.flutter.io/flutter/animation/AnimationController/lowerBound.html) trong một animation.
* Tạo ra một  [fling](https://docs.flutter.io/flutter/animation/AnimationController/fling.html) animation với hiệu ứng sử dụng một mô phỏng vật lý.

Khi tạo AnimationController, bạn truyền cho nó một đối số vsync, ngăn animations tiêu tốn tài nguyên không cần thiết bên ngoài màn hình. Bạn có thể sử dụng đối tượng trạng thái của mình làm vsync bằng cách thêm SingleTickerProviderStateMixin vào định nghĩa lớp. 
Ví dụ 
```dart
class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
...
}
```

## Tween
Mặc định, đối tượng AnimationController có giá trị nằm trong khoảng từ 0,0 đến 1,0. Nếu bạn cần thay đổi khoảng giá trị khác hoặc một loại dữ liệu khác, bạn có thể sử dụng [Tween](https://docs.flutter.io/flutter/animation/Tween-class.html) .

Tween là một đối tượng không có trạng thái, chỉ có lưu giá trị `begin` và `end`. Công việc duy nhất của Tween là xác định ánh xạ từ phạm vi đầu vào sang phạm vi đầu ra. Phạm vi đầu vào thường là 0,0 đến 1,0. 

Ví dụ sau cho phép ta thay đổi giá trị của một Tween<double> nằm trong khoảng từ -200.0 tới 0.0  : 
    
```dart
final Tween doubleTween = Tween<double>(begin: -200.0, end: 0.0);
```
    
 Tween kế thừa từ Animatable<T>, chứ không phải từ Animation<T>. Một Animatable tương tự như Animation hỗ trợ nhiều kiểu khác ngoài **double**
    
 Ví dụ như  [ColorTween](https://docs.flutter.io/flutter/animation/ColorTween-class.html) 
 ```dart
 final Tween colorTween =
    ColorTween(begin: Colors.transparent, end: Colors.black54);
 ```
 [IntTween](https://docs.flutter.io/flutter/animation/IntTween-class.html)
 ```dart
 final Tween intTween = IntTween(begin: 0, end: 255);
 ```
 
 Một đối tượng Tween không lưu trữ bất kỳ trạng thái. Thay vào đó, nó cung cấp phương thức `evaluate(Animation<double> animation)` áp dụng chức năng ánh xạ cho giá trị hiện tại của animation. Giá trị hiện tại của đối tượng Animation có thể được tìm thấy trong phương thức `.value`. 
 
 
###  Tween.animate
Để sử dụng Tween, bạn cần gọi phương thức `animate()` và đặt vào một AnimationController. Phương thức này trả về  một **Animation**, chứ không phải Animatable

Ví dụ sau sẽ tạo ra các giá trị từ 0 -> 255 trong 500 ms cho một AnimationController
```dart
final AnimationController controller = AnimationController(
    duration: const Duration(milliseconds: 500), vsync: this);
Animation<int> alpha = IntTween(begin: 0, end: 255).animate(controller);
```

Hiển thị AnimationController, CurvedAnimation và Tween. 
```dart
final AnimationController controller = AnimationController(
    duration: const Duration(milliseconds: 500), vsync: this);
final Animation curve =
    CurvedAnimation(parent: controller, curve: Curves.easeOut);
Animation<int> alpha = IntTween(begin: 0, end: 255).animate(curve);

```

## Animation notifications
Một đối tượng Animation có thể có **Listeners** và **StatusListener**, được định nghĩa bằng `addListener ()` và `addStatusListener ()`. Một Listener được gọi bất cứ khi nào giá trị của animation thay đổi. Hành vi phổ biến nhất của Listener là gọi **setState ()**  khi ứng dụng rebuild. StatusListener được gọi khi một animation bắt đầu, kết thúc, di chuyển về phía trước hoặc di chuyển ngược lại, như được định nghĩa bởi AnimationStatus.

Chúng ta sử dụng `addListener` để lắng nghe thay đổi của một animation trong **StatefulWidget**
```dart
AnimationController controller = AnimationController(
        duration: const Duration(milliseconds: 2000), vsync: this);
  Animation<double> animation = Tween(begin: 0.0, end: 300.0).animate(controller)
      ..addListener(() {
        setState(() {
          // the state that has changed here is the animation object’s value
        });
      });
controller.forward();
```

Còn với **AnimatedWidget**, chúng ta cần phải sử dụng phương thức `addStatusListener` để lắng nghe thay đổi của một animation
```dart
AnimationController controller = AnimationController(
        duration: const Duration(milliseconds: 2000), vsync: this);
   Animation<double> animation = Tween(begin: 0.0, end: 300.0).animate(controller);
    animation.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        controller.reverse();
      } else if (status == AnimationStatus.dismissed) {
        controller.forward();
      }
    });
controller.forward();
```

## Summary 
* Animation object là core class trong thư viện animation của Flutter. 
* Animation object biết được trạng thái hiện tại của một animation (started, stopped, moving forward hoặc reverse), nhưng không biết gì về những gì xuất hiện trên màn hình.
* AnimationController quản lý Animation
* CurvedAnimation thể hiện tiến trình động giống như một  đường cong phi tuyến tính.
* Tween sử dụng để thay đổi khoảng giá trị hoặc một loại dữ liệu khác cho một animation. 
* Sử dụng Listeners và StatusListeners để theo dõi sự thay đổi trạng thái animation.

## Ví dụ 
Bạn có thể xem qua ví dụ dưới đây để hiểu thêm cách sử dụng các class : Animation, AnimationController, Tween

```dart
import 'package:flutter/animation.dart';
import 'package:flutter/material.dart';

class AnimatedLogo extends AnimatedWidget {
  // The Tweens are static because they don't change.
  static final _opacityTween = Tween<double>(begin: 0.1, end: 1.0);
  static final _sizeTween = Tween<double>(begin: 0.0, end: 300.0);

  AnimatedLogo({Key key, Animation<double> animation})
      : super(key: key, listenable: animation);

  Widget build(BuildContext context) {
    final Animation<double> animation = listenable;
    return Center(
      child: Opacity(
        opacity: _opacityTween.evaluate(animation),
        child: Container(
          margin: EdgeInsets.symmetric(vertical: 10.0),
          height: _sizeTween.evaluate(animation),
          width: _sizeTween.evaluate(animation),
          child: FlutterLogo(),
        ),
      ),
    );
  }
}

class LogoApp extends StatefulWidget {
  _LogoAppState createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> with TickerProviderStateMixin {
  AnimationController controller;
  Animation<double> animation;

  initState() {
    super.initState();
    controller = AnimationController(
        duration: const Duration(milliseconds: 2000), vsync: this);
    animation = CurvedAnimation(parent: controller, curve: Curves.easeIn);

    animation.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        controller.reverse();
      } else if (status == AnimationStatus.dismissed) {
        controller.forward();
      }
    });

    controller.forward();
  }

  Widget build(BuildContext context) {
    return AnimatedLogo(animation: animation);
  }

  dispose() {
    controller.dispose();
    super.dispose();
  }
}

void main() {
  runApp(LogoApp());
}
```

Bài viết được dịch và tham khảo từ  [Flutter Animations ](https://flutter.io/docs/development/ui/animations)