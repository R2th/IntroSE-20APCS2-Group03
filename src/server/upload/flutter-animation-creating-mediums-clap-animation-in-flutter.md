Trong bài viết này mình sẽ giới thiệu với các bạn Animation và 1 số khái niệm cơ bản về Animation  trong Flutter.  Các vấn đề "Code base Flutter" mình sẽ không đề nhiều trong bài viết.

# Getting Started

Khởi tạo project Flutter cơ bản, các bạn sẽ có 1 Float Button và 1 Text để hiển thị mỗi khi bạn bấm vào Float  button.

```Dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      ...
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  ...
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        ...
      ),
      floatingActionButton: new FloatingActionButton(
       ...
      ),
    );
  }
}
```

ở đây chúng ta sẽ sửa nhanh giao diện của Button trước khi thêm phần Animation sau.
- Thay đổi "icon"  và "background" Button
- Khi ấn và giữ Button thì biến "_counter" sẽ tiếp tục tăng

```Dart
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  final duration = new Duration(milliseconds: 300);
  Timer timer;


  initState() {
    super.initState();
  }

  dispose() {
   super.dispose();
  }

  void increment(Timer t) {
    setState(() {
      _counter++;
    });
  }

  void onTapDown(TapDownDetails tap) {
    // User pressed the button. This can be a tap or a hold.
    increment(null); // Take care of tap
    timer = new Timer.periodic(duration, increment); // Takes care of hold
  }

  void onTapUp(TapUpDetails tap) {
    // User removed his finger from button.
    timer.cancel();
  }

  Widget getScoreButton() {

    return new Positioned(
        child: new Opacity(opacity: 1.0, child: new Container(
            height: 50.0 ,
            width: 50.0 ,
            decoration: new ShapeDecoration(
              shape: new CircleBorder(
                  side: BorderSide.none
              ),
              color: Colors.pink,
            ),
            child: new Center(child:
            new Text("+" + _counter.toString(),
              style: new TextStyle(color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 15.0),))
        )),
        bottom: 100.0
    );
  }

  Widget getClapButton() {
    // Using custom gesture detector because we want to keep increasing the claps
    // when user holds the button.
    return new GestureDetector(
        onTapUp: onTapUp,
        onTapDown: onTapDown,
        child: new Container(
          height: 60.0 ,
          width: 60.0 ,
          padding: new EdgeInsets.all(10.0),
          decoration: new BoxDecoration(
              border: new Border.all(color: Colors.pink, width: 1.0),
              borderRadius: new BorderRadius.circular(50.0),
              color: Colors.white,
              boxShadow: [
                new BoxShadow(color: Colors.pink, blurRadius: 8.0)
              ]
          ),
          child: new ImageIcon(
              new AssetImage("images/clap.png"), color: Colors.pink,
              size: 40.0),
        )
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              'You have pushed the button this many times:',
            ),
            new Text(
              '$_counter',
              style: Theme
                  .of(context)
                  .textTheme
                  .display1,
            ),
          ],
        ),
      ),
      floatingActionButton: new Padding(
          padding: new EdgeInsets.only(right: 20.0),
          child: new Stack(
            alignment: FractionalOffset.center,
            overflow: Overflow.visible,
            children: <Widget>[
              getScoreButton(),
              getClapButton(),
            ],
          )
      ),
    );
  }
}
```

Nhìn vào sản phẩm cuối cùng chúng ta muốn.
![](https://images.viblo.asia/d6a6dafa-fef5-445c-9419-f15bf523900b.jpg)
Thì bây giờ mình cần làm 3 công việc sau.
- Thay đổi kích thước của "widgets"
- Thay đổi "background" của "widgets" khi mình ấn và giữ Button
- Thêm 1 vài hiệu ứng nhỏ để Animation được sinh động hơn

Và giờ chúng ta sẽ đi giải quyết từng vấn đề một. Nhưng trước hết các bạn cần tìm hiểu 1 số khải niệm của bản về Aninmation trong Flutter.

# Khái niệm Animation trong Flutter
## AnimationController
"Animation" thực chất là chúng ta thay đổi 1 số thuộc tính của "widgets" theo thời gian hiển thị.
Hãy nhìn vào "widgets" hiển thị điểm, chúng ta cần thay đổi các giá trị "position" và "opacity" theo khoảng thời gian.

```Dart
new Positioned(
        child: new Opacity(opacity: 1.0, 
          child: new Container(
            ...
          )),
        bottom: 100.0
    );
```

VD: khoảng thời gian mình muốn Animation thực hiện là 150ms. 
![](https://images.viblo.asia/7ea9bccf-fe29-4778-be80-534c9310a60e.png)
Hãy nhìn biểu đồ. Giá trị của "position" sẽ thay đổi theo thời gian cho đến khi kết thúc Animation. Ở đây chúng ta sẽ sử dụng `component Animation Controller`


```Dart
animationController = new AnimationController(duration: new Duration(milliseconds: 150), vsync: this);
```

Nhìn vào `component` này bạn có thể thấy là mình muốn thực hiện Animation trong khoảng thời gian 150ms, thế vậy còn `vsync` là gì.

Màn hình của thiết bị sẽ được "refresh" sau 1 khoảng thời gian nhất định, thường là vài "milliseconds". Các màn hình điện thoại bây giờ có tần số quét khá là khác nhau nhưng thường màn hình phổ thông sẽ có tần số 60Hz (tương đương với màn hình sẽ thay đổi 60 lần trong 1s) nếu chúng ta thay đổi hiệu ứng không đúng thời gian mà màn hình thay hình ảnh mới tới mắt người dùng thì hiện tượng "xé hình" có thể sảy ra, trên màn hình sẽ hiển thị hình ảnh bị vỡ hoặc không đồng nhất. Và thuộc tính `vsync: this` sẽ giúp giải quyết vấn đề này. Nó sẽ đồng bộ thời gian thay đổi Animaition với tốc độ "refresh" của màn hình.


Các giá trị trong "Controller" sẽ thay đổi từ 0.0 -> 1.0 trong 150ms. 

```Dart
animationController.addListener(() {
      print(animationController.value);
    });
animationController.forward(from: 0.0);

/* OUTPUT
I/flutter ( 1913): 0.0
I/flutter ( 1913): 0.0
I/flutter ( 1913): 0.22297333333333333
I/flutter ( 1913): 0.3344533333333333
I/flutter ( 1913): 0.4459333333333334
I/flutter ( 1913): 0.5574133333333334
I/flutter ( 1913): 0.6688933333333335
I/flutter ( 1913): 0.7803666666666668
I/flutter ( 1913): 0.8918466666666668
I/flutter ( 1913): 1.0
*/
```
## Curved Animation
Làm thế nào chúng ta có thể biến các con số kia thành giá trị các hiệu ứng mà chúng ta mong muốn. Đến đây bạn sẽ cần biết thêm về **Curved Animation**

```Dart
bounceInAnimation = new CurvedAnimation(parent: animationController, curve: Curves.bounceIn);
    bounceInAnimation.addListener(() {
      print(bounceInAnimation.value);
    });

/*OUTPUT
I/flutter ( 5221): 0.0
I/flutter ( 5221): 0.0
I/flutter ( 5221): 0.24945376519722218
I/flutter ( 5221): 0.16975716286388898
I/flutter ( 5221): 0.17177866222222238
I/flutter ( 5221): 0.6359024059750003
I/flutter ( 5221): 0.9119433941222221
I/flutter ( 5221): 1.0
*/
```

Mình khởi tạo `Curved animation` với cài đặt **parent**  là "animationController". `animationController`  cung cấp các giá trị theo thời gian để `Curved animation` dựa vào các giá trị thời gian đó đưa ra các giá trị tham số  cho Animation thông qua **curve: Curves.bounceIn**. Bạn có thể tìm hiểu thêm [**Flutter curves** ở đây](https://api.flutter.dev/flutter/animation/Curves-class.html)


## Tween Class

Các giá trị **AnimationController** trả về là từ 0.0 -> 1.0 vậy hỏi có cách nào mà chúng ta có thể biến các giá trị kia thành giá trị mà ta muốn nhận thành 0.0 -> 100.0 không. 
Để làm điều này có 2 cách
- Cách 1 đơn giản nhất là bạn nhân giá trị ban đầu đó với 100 (*100) để nhận được giá trị bạn mong muốn.
- Cách 2 sử dụng 1 **Class** biến đổi theo giá trị đầu vào thành giá trị đầu ra mà ta mong muốn.

Với cách 2 thì đây là lúc chúng ta sử dụng đến **Tween Class**
```Dart
tweenAnimation = new Tween(begin: 0.0, end: 100.0).animate(animationController);
    tweenAnimation.addListener(() {
      print(tweenAnimation.value);
    });

/* Output 
I/flutter ( 2639): 0.0
I/flutter ( 2639): 0.0
I/flutter ( 2639): 33.452000000000005
I/flutter ( 2639): 44.602000000000004
I/flutter ( 2639): 55.75133333333334
I/flutter ( 2639): 66.90133333333334
I/flutter ( 2639): 78.05133333333333
I/flutter ( 2639): 89.20066666666668
I/flutter ( 2639): 100.0
*/
```

**Tween Class** nhận 2 tham số `begin: 0.0, end: 100.0` và 1 `animationController`.  **Tween Class** sẽ dựa vào thời gian và sự thay đổi giá trị trong `animationController` để trả ra các giá trị trong khoảng `begin` và `end`. Các giá trị `begin: 0.0, end: 100.0` bạn có thể thay đổi tùy ý, có thể từ **0 -> 100** hoặc từ **100->0**.

Vậy các các **Animation** cơ bản để sử dụng trong Project Demo mình đã giới thiệu xong, giờ là lúc chúng ta sẽ áp dụng các **Animation** này để thực hiện ý đồ mong muốn.


# Score Widget Position Animation
Đầu tiên với hiệu ứng khi mà người dùng chạm tay xuống màn hình.

```Dart
initState() {
    super.initState();
    scoreInAnimationController = new AnimationController(duration: new Duration(milliseconds: 150), vsync: this);
    scoreInAnimationController.addListener((){
      setState(() {}); // Calls render function
    });
  }

void onTapDown(TapDownDetails tap) {
    scoreInAnimationController.forward(from: 0.0);
    ...    
}
Widget getScoreButton() {
    var scorePosition = scoreInAnimationController.value * 100;
    var scoreOpacity = scoreInAnimationController.value;
    return new Positioned(
        child: new Opacity(opacity: scoreOpacity, 
                           child: new Container(...)
                          ),
        bottom: scorePosition
    );
  }
```

Nhìn vào đoạn code trên. Chúng ta hình dung được là "Widget Score" sẽ được di chuyển từ dưới lên trên khi người dùng chạm tay vào "Float Button". 

Nhưng có 1 vấn đề ở đây, nếu người dùng cứ click liên tục thì sẽ Animation của "Widget Score" sẽ được thực hiện nhiều lần, và có nhiều "Widget Score" được hiện ra và điều đó là điều chúng ta không mong muốn. Để giải quyết vấn đề này, chúng ta cần thêm 1 biến hay class để quản lý trạng thái của người dùng khi click xuống màn hình.

```Dart
enum ScoreWidgetStatus {
  HIDDEN,
  BECOMING_VISIBLE,
  BECOMING_INVISIBLE
}
```

Sau đó mình sẽ tạo ra thêm 1 **AnimationController**,  **AnimationController** này sẽ thực hiện thay đổi vị trí của "Widget Score"  từ 100->150. Mình sẽ thêm "status listener" để bắt được khi nào **Animation** kết thúc.

```Dart
scoreOutAnimationController = new AnimationController(vsync: this, duration: duration);
    scoreOutPositionAnimation = new Tween(begin: 100.0, end: 150.0).animate(
      new CurvedAnimation(parent: scoreOutAnimationController, curve: Curves.easeOut)
    );
    scoreOutPositionAnimation.addListener((){
      setState(() {});
    });
    scoreOutAnimationController.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        _scoreWidgetStatus = ScoreWidgetStatus.HIDDEN;
      }
    });
```

Khi người dùng nhấc tay lên khỏi màn hình trong sự kiện `onTapUp`, sau 300ms mình sẽ thực hiện `scoreOutAnimationController`

```Dart
void onTapUp(TapUpDetails tap) {
    // User removed his finger from button.
    scoreOutETA = new Timer(duration, () {
      scoreOutAnimationController.forward(from: 0.0);
      _scoreWidgetStatus = ScoreWidgetStatus.BECOMING_INVISIBLE;
    });
    holdTimer.cancel();
  }
```

Và chúng ta sẽ sửa lại sự kiện `onTapDown` 1 chút.
```Dart
void onTapDown(TapDownDetails tap) {
    // User pressed the button. This can be a tap or a hold.
    if (scoreOutETA != null) scoreOutETA.cancel(); // We do not want the score to vanish!
    if (_scoreWidgetStatus == ScoreWidgetStatus.HIDDEN) {
      scoreInAnimationController.forward(from: 0.0);
      _scoreWidgetStatus = ScoreWidgetStatus.BECOMING_VISIBLE;
    }
    increment(null); // Take care of tap
    holdTimer = new Timer.periodic(duration, increment); // Takes care of hold
  }
```

quay lại với `getScoreButton` bây giờ mình sẽ dựa vào `_scoreWidgetStatus` để có thể lựa chọn **AnimationController** sao cho phù hợp.

```Dart
Widget getScoreButton() {
    var scorePosition = 0.0;
    var scoreOpacity = 0.0;
    switch(_scoreWidgetStatus) {
      case ScoreWidgetStatus.HIDDEN:
        break;
      case ScoreWidgetStatus.BECOMING_VISIBLE :
        scorePosition = scoreInAnimationController.value * 100;
        scoreOpacity = scoreInAnimationController.value;
        break;
      case ScoreWidgetStatus.BECOMING_INVISIBLE:
        scorePosition = scoreOutPositionAnimation.value;
        scoreOpacity = 1.0 - scoreOutAnimationController.value;
    }
  return ...
}
```

Như vậy là đã xong cơ bản, các bạn có thể Run project để xem thành quả ban đầu là như thế nào rồi đấy.
Trong phần sau, mình sẽ giới thiệu với các bạn thêm về cách thay đổi size và thêm các Animation nhỏ để làm cho Project được sinh động hơn.