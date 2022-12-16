Chào các bạn như ở [bài trước](https://viblo.asia/p/tim-hieu-ve-animations-trong-flutter-OeVKBDRrlkW) mình đã giới thiệu qua về các classes và cách sử dụng trong bộ thư viện Animation Flutter. 

Hôm nay chúng ta sẽ cùng đi tìm hiểu một ví dụ với Animation và qua đó sẽ hiểu rõ hơn về : 
```
* AnimatedWidget
* Tweens
* AnimationController
* Transform
```

![](https://images.viblo.asia/16873573-ab9d-4951-af41-6b7e18cf6533.gif)
Phần ví dụ của mình sẽ bao gồm các classes : 

1. **BarLoadingScreen** extends **StatefulWidget**
2.  **_BarLoadingScreenState** extends **State<BarLoadingScreen>** with **TickerProviderStateMixin**
4. **Bar** extends **StatelessWidget**
5. **PivotBar** extends **AnimatedWidget**

### Bước 1 : Xây dựng layout item
Chúng ta sẽ đi viết base class cho Bar item (4 items). Mỗi item có 2 thuộc tính `marginLeft` và `marginRight`. 

Sử dụng class [**BoxDecoration**](https://docs.flutter.io/flutter/painting/BoxDecoration-class.html)  để vẽ một widget box
```dart
class Bar extends StatelessWidget {
  final double marginLeft;
  final double marginRight;

  const Bar({Key key, this.marginLeft, this.marginRight}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return new Container(
      width: 35.0,
      height: 15.0,
      margin: new EdgeInsets.only(left: marginLeft, right: marginRight),
      decoration: new BoxDecoration(
          color: const Color.fromRGBO(0, 0, 255, 1.0),
          borderRadius: new BorderRadius.circular(10.0),
          boxShadow: [
            new BoxShadow(
              color: Colors.black12,
              blurRadius: 8.0,
              spreadRadius: 1.0,
              offset: new Offset(1.0, 0.0),
            ),
            new BoxShadow(
              color: Colors.black26,
              blurRadius: 6.0,
              spreadRadius: 1.5,
              offset: new Offset(1.0, 0.0),
            ),
          ]),
    );
  }
}
```

### Bước 2: Xây dựng transform animation 

Bước tiếp theo là triển khai animation cho các item. 

Chúng ta xây dựng 4 items để tạo ra 8 animations, nhưng được transform theo 2 chiều:  xuôi và ngược chiều kim đồng hồ. 

Do đó chúng ta sẽ đi xây dựng **PivotBar** class để hiển thị animation cho từng Bar item. Nhiệm vụ chuyển đổi từ animation value sang transform tương ứng. 

Class **PivotBar** được extends từ **AnimationWidget**. 

Các thuộc tính trong PivotBar class  : 
``` dart
  final Animation<double> controller; 
  final FractionalOffset alignment;
  final List<Animation<double>> animations;
  final bool isClockwise;
  final double marginLeft;
  final double marginRight;
```
* `Animation<double> controller` ==> quản lý animation 
* `List<Animation<double>> animations`  ==> danh sách animations sẽ được sử dụng 
* `bool isClockwise` ==> cho biết chiều của animation (xuôi hay ngược theo chiều kim đồng hồ) 

Khởi tạo một PivotBar 
```dart
 PivotBar({
    Key key,
    this.alignment: FractionalOffset.centerRight,
    @required this.controller,
    @required this.animations,
    @required this.isClockwise,
    this.marginLeft = 15.0,
    this.marginRight = 0.0,
  }) : super(key: key, listenable: controller);
```

Tiếp theo chúng ta sẽ đi tạo transform từ animation, sử dụng hàm rotation : 
- Transform theo chiều kim đồng hồ 
```dart 
  Matrix4 clockwiseHalf(animation) =>
      new Matrix4.rotationZ((animation.value * math.pi * 2.0) * .5);
```

- Transform theo ngược chiều kim đồng hồ 
```dart
 Matrix4 counterClockwiseHalf(animation) =>
      new Matrix4.rotationZ(-(animation.value * math.pi * 2.0) * .5);
```
AnimatedWidget trong trường hợp này đang tạo animation cho một giá trị tương đối không được sử dụng. Đó là giá trị *transform* trên widget *transform*. Nó sẽ xoay một widget xung quanh một điểm được chỉ định. 

```dart
 @override
  Widget build(BuildContext context) {
    //Nói với widget cách xoay dựa trên vị trí của nó
    var transformOne;
    var transformTwo;
    if (isClockwise) {
      transformOne = clockwiseHalf(animations[0]);
      transformTwo = clockwiseHalf(animations[1]);
    } else {
      transformOne = counterClockwiseHalf(animations[0]);
      transformTwo = counterClockwiseHalf(animations[1]);
    }
    //Bọc widget Bar vào trong hai transforms và trả về Transform.
    return new Transform(
      transform: transformOne,
      alignment: alignment,
      child: new Transform(
        transform: transformTwo,
        alignment: alignment,
        child: new Bar(marginLeft: marginLeft, marginRight: marginRight),
      ),
    );
  }
}
```

### Bước 3 : Thêm Intervals vào Animation 
App sẽ được cấu thành từ 8 animations con, tương ứng 8 bước trong quá trình transform tạo thành một vòng khép kín. 

Flutter cung cấp một cách để tạo hiệu ứng animation chỉ xảy ra trong những khoảng thời gian nhất định, đó là dùng **Tween**.

Chúng ta sẽ phải tạo một khoảng **Interval**  cho từng bước trong số 8 bước. 
```dart
//Cho biết khung giá trị animation có thể thay đổi từ 0.0 -> 1.0 (second)
Tween<double> tween = new Tween<double>(begin: 0.0, end: 1.00);
//stepOne:  Interval là từ 0.0 => 0.125
  Animation<double> get stepOne => tween.animate(
        new CurvedAnimation(
          parent: _controller,
          curve: new Interval(
            0.0,
            0.125,
            curve: Curves.linear,
          ),
        ),
      );
  Animation<double> get stepTwo => tween.animate(
        //stepTwo:  Interval là từ 0.125 => 0.26
        new CurvedAnimation(
          parent: _controller,
          curve: new Interval(
            0.125,
            0.26,
            curve: Curves.linear,
          ),
        ),
      );
  Animation<double> get stepThree => tween.animate(
        //stepThree: Interval là từ 0.25 => 0.375
        new CurvedAnimation(
          parent: _controller,
          curve: new Interval(
            0.25,
            0.375,
            curve: Curves.linear,
          ),
        ),
      );
  Animation<double> get stepFour => tween.animate(
        //stepFour: Interval là từ 0.375 => 0.5
        new CurvedAnimation(
          parent: _controller,
          curve: new Interval(
            0.375,
            0.5,
            curve: Curves.linear,
          ),
        ),
      );
  Animation<double> get stepFive => tween.animate(
       //stepFive: Interval là từ 0.5 => 0.625
        new CurvedAnimation(
          parent: _controller,
          curve: new Interval(
            0.5,
            0.625,
            curve: Curves.linear,
          ),
        ),
      );
  Animation<double> get stepSix => tween.animate(
        //stepSix: Interval là từ 0.625 => 0.75
        new CurvedAnimation(
          parent: _controller,
          curve: new Interval(
            0.625,
            0.75,
            curve: Curves.linear,
          ),
        ),
      );
  Animation<double> get stepSeven => tween.animate(
        //stepSeven: Interval là từ 0.75 => 0.875
        new CurvedAnimation(
          parent: _controller,
          curve: new Interval(
            0.75,
            0.875,
            curve: Curves.linear,
          ),
        ),
      );
  Animation<double> get stepEight => tween.animate(
       //stepEight: Interval là từ 0.875 => 1.0
        new CurvedAnimation(
          parent: _controller,
          curve: new Interval(
            0.875,
            1.0,
            curve: Curves.linear,
          ),
        ),
      );
```

### Bước 4: Chuyển tiếp Animation 
Bước cuối cùng là chúng ta sẽ đi tạo 4 PivotBar và xét tương ứng các animations.  
```dart
Widget get forwardStaggeredAnimation {
    return new Center(
      child: new Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          new PivotBar(
          //Bar item đầu tiên sẽ tranform với animation values: stepOne và stepTwo. 
          //isClockwise: true ==> transform theo chiều kim đồng hồ 
            alignment: FractionalOffset.centerLeft,
            controller: _controller,
            animations: [
              stepOne,
              stepTwo,
            ],
            marginRight: 0.0,
            marginLeft: 0.0,
            isClockwise: true,
          ),
          new PivotBar(
          //Bar item thứ 2 sẽ tranform với animation values: stepThree và stepEight. 
          //isClockwise: false ==> transform theo ngược chiều kim đồng hồ
            controller: _controller,
            animations: [
              stepThree,
              stepEight,
            ],
            marginRight: 0.0,
            marginLeft: 0.0,
            isClockwise: false,
          ),
          new PivotBar(
           //Bar item thứ 3 sẽ tranform với animation values: stepFour và stepSeven. 
          //isClockwise: true ==> transform theo chiều kim đồng hồ
            controller: _controller,
            animations: [
              stepFour,
              stepSeven,
            ],
            marginRight: 0.0,
            marginLeft: 32.0,
            isClockwise: true,
          ),
          new PivotBar(
          //Bar item thứ 4 sẽ tranform với animation values: stepFive và stepSix. 
          //isClockwise: false ==> transform theo ngược chiều kim đồng hồ
            controller: _controller,
            animations: [
              stepFive,
              stepSix,
            ],
            marginRight: 0.0,
            marginLeft: 32.0,
            isClockwise: false,
          ),
        ],
      ),
    );
  }
```
Bài viết được viết lại sau khi mình hiểu từ [topic](https://flutterbyexample.com/step-two-animated-widget). 

Các bạn có thể vào [đây](https://github.com/vuvanhanh/flutter_animation_custom) để xem được code hoàn chỉnh nhé. 
Happy coding!