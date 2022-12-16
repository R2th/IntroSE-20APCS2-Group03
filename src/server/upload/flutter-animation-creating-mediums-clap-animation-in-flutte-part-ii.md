Trong[ phần 1](https://viblo.asia/p/flutter-animation-creating-mediums-clap-animation-in-flutter-63vKj9md52R) mình đã giới thiệu với các bạn cơ bản về Animation trong Flutter.
Tiếp theo trong phần này mình sẽ hướng dẫn các bạn tiếp tục hoàn thành tìm hiểu về **Animation** để hoàn thành series về **Animation**.

# Score Widget Size Animation

Sau khi hoàn thành các phần trước thì tại phần này mình có khá nhiều ý tưởng để có thể thay đổi size của  Item khi click hoặc giữa chúng. 

Bắt đầu, mình sẽ update Enum **ScoreWidgetStatus**  thêm giá trị **VISIBLE** và thêm 1 controller để quản lý việc thay đổi size của item

```Dart
scoreSizeAnimationController = new AnimationController(vsync: this, duration: new Duration(milliseconds: 150));
    scoreSizeAnimationController.addStatusListener((status) {
      if(status == AnimationStatus.completed) {
        scoreSizeAnimationController.reverse();
      }
    });
    scoreSizeAnimationController.addListener((){
      setState(() {});
    });
```


**controller** này tạp ra các giá trị từ 0 đến 1 trong khoảng thời gian 150ms và khi Animation hoàn thành thì nó sẽ đảo ngược gái trị từ 1 về 0. Làm như vậy thì item sẽ có hiệu ứng to nhỏ  theo nhịp nhàng. Quay lại chỉnh sửa Func **increment**

```Dart
void increment(Timer t) {
    scoreSizeAnimationController.forward(from: 0.0);
    setState(() {
      _counter++;
    });
  }
```

Giờ chúng ta cần chỉnh sửa khi người dùng **Tap** hoặc **Hold** Item làm sao cho khi **Tap** thì kích thước thay đổi còn **Hold** thì kích thước của Item không thay đổi theo thời gian.
```Dart
void onTapDown(TapDownDetails tap) {
    // User pressed the button. This can be a tap or a hold.
    if (scoreOutETA != null) {
      scoreOutETA.cancel(); // We do not want the score to vanish!
    }
    if(_scoreWidgetStatus == ScoreWidgetStatus.BECOMING_INVISIBLE) {
      // We tapped down while the widget was flying up. Need to cancel that animation.
      scoreOutAnimationController.stop(canceled: true);
      _scoreWidgetStatus = ScoreWidgetStatus.VISIBLE;
    }
    else if (_scoreWidgetStatus == ScoreWidgetStatus.HIDDEN ) {
        _scoreWidgetStatus = ScoreWidgetStatus.BECOMING_VISIBLE;
        scoreInAnimationController.forward(from: 0.0);
    }
    increment(null); // Take care of tap
    holdTimer = new Timer.periodic(duration, increment); // Takes care of hold
  }
```


Cuối cùng ta sử dụng giá trị của **Controller** đó để điều kiển size của Item

```Dart
 Widget getScoreButton(){
 ...
 var extraSize = 0.0;
 ...
 switch(_scoreWidgetStatus)
 ...
 case ScoreWidgetStatus.VISIBLE:
        scorePosition = scoreInAnimationController.value * 100;
        scoreOpacity = scoreInAnimationController.value;
        extraSize = scoreSizeAnimationController.value * 10;
        break;
        
 ...
 return new Positioned(
        child: new Opacity(opacity: scoreOpacity, child: new Container(
            height: 50.0 + extraSize,
            width: 50.0  + extraSize,
            ...
 }
```

```Dart
 Widget getClapButton(){
 var extraSize = 0.0;
    if (_scoreWidgetStatus == ScoreWidgetStatus.VISIBLE || _scoreWidgetStatus == ScoreWidgetStatus.BECOMING_VISIBLE) {
      extraSize = scoreSizeAnimationController.value * 10;
    }
...
child: new Container(
          height: 60.0 + extraSize ,
          width: 60.0 + extraSize,
          ...
          
}
```

Bạn cần chỉnh sửa 2 Func  **getScoreButton** và **getClapButton** lấy giá trị của **Controller** và thay đổi kích thước **Widget** tùy theo ý thích của bạn :D D D.

# Sparkles animation

Bây giờ mình sẽ thêm 1 số "Image" để làm hiệu ứng lấp lánh khi thay đổi điểm số. Để làm như vậy mình cần chỉnh sửa và thêm 1 số Image vào Project và làm 1 số công việc sau.

- Mình sẽ thêm 5 ảnh ở 5 góc khác nhau của **Widget Score Button** để tạo thành 1 hình tròn.
- Tính toán các góc theo 1 hàm Ramdom để tạo ra các hiệu ứng khác nhau
- Cần thay đổi vị trí và độ mờ của ảnh theo thời gian.


Để làm các công việc trên, mình chỉ cần dựa trên các công thức góc đơn giản của **sin** và **cosine** để tính toán ra các tọa độ X và Y của image.

```Dart
var sparklesWidget =
        new Positioned(child: new Transform.rotate(
            angle: currentAngle - pi/2,
            child: new Opacity(opacity: sparklesOpacity,
                child : new Image.asset("images/sparkles.png", width: 14.0, height: 14.0, ))
          ),
          left:(sparkleRadius*cos(currentAngle)) + 20,
          top: (sparkleRadius* sin(currentAngle)) + 20 ,
      );
```

và giờ cần 1 vòng lặp để tạo ra 5 **widgets** khác nhau ở các góc khác nhau.

```Dart
for(int i = 0;i < 5; ++i) {
      var currentAngle = (firstAngle + ((2*pi)/5)*(i));
      var sparklesWidget = ...
      stackChildren.add(sparklesWidget);
    }
```

Và giờ gần như mọi chuẩn bị đã xong, chúng ta chỉ việc thêm 1 chút code vào Func **getScoreButton**.

```Dart
sparklesAnimationController = new AnimationController(vsync: this, duration: duration);
    sparklesAnimation = new CurvedAnimation(parent: sparklesAnimationController, curve: Curves.easeIn);
    sparklesAnimation.addListener((){
      setState(() { });
    });

 void increment(Timer t) {
    sparklesAnimationController.forward(from: 0.0);
     ...
    setState(() {
    ...
      _sparklesAngle = random.nextDouble() * (2*pi);
    });
     
Widget getScoreButton() {
    ...
    var firstAngle = _sparklesAngle;
    var sparkleRadius = (sparklesAnimationController.value * 50) ;
    var sparklesOpacity = (1 - sparklesAnimation.value);
    ...
} 
```

Trên đây là bài giới thiệu cơ bản về **animation** nhằm tạo ra 1 số hiệu ứng mượt mà Project. Các bạn có thể tham khảo toàn bộ [Source code tại đây](https://github.com/Kartik1607/FlutterUI/tree/master/MediumClapAnimation/medium_clap)

Link bài viết gốc: https://proandroiddev.com/flutter-animation-creating-mediums-clap-animation-in-flutter-3168f047421e