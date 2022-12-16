Flutter cung cấp một số lượng lớn các widget để xây dựng giao diện nhưng bạn vẫn chưa thỏa mãn. Bạn muốn tạo ra 1 widget độc, lạ riêng mình mới có hãy đến với CustomPaint :grinning: Nó sẽ giúp bạn thực hiện điều hằng mong muốn.

CustomPaint cho phép ta truy cập vào low-level - graphics khi Flutter vẽ một widget. Nó cũng giống như việc custom view trên Androi hay IOS tuy nhiên sẽ đơn giản và trực quan hơn khi kết hợp với HotReload của Flutter.

Trong bài viết này mình sẽ giới thiệu các dùng CustomPaint để vẽ các hình đơn giản.
# CustomPaint
Khai báo dùng 1 CustomPaint
```dart
class MyPainter extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Lines'),
      ),
      body: CustomPaint(
        painter: ShapePainter(),
        child: Container(),
      ),
    );
  }
}
```
Một vài thuộc tính quan trọng của CustomPaint:

* **child**: Theo mặc định, canvas sẽ lấy kích thước của child, nếu nó được xác định.
* **painter** : 1 painter được vẽ trước khi child được vẽ.
* **foregroundPainter**: 1 painter được vẽ sau khi child được vẽ (đè lên trên child).
* **size**: Nếu child không được khai báo, thì kích thước của canvas phải được chỉ định.

Trong phạm vi bài viết này ta sẽ chỉ cần 2 thuộc tính **paint** và **child**. Trong đoạn code trên mình đã khai bảo child là **Container**, như bạn biết nếu không có child container sẽ chiếm toàn bộ không gian mà nó được phép có.

Bây giờ ta cần định nghĩa ShapePainter widget sẽ extends thừ lớp **CustomPainter**

# CustomPainter
 **CustomPainter** là một abtract class nên ShapePainter phải override lại hai method:
 
*  **paint**: phương thức này được gọi bất cứ khi nào object cần được vẽ lại.
*  **shouldRepaint**: Phương thức này được gọi khi một instance mới của class được cung cấp.

```dart
class ShapePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // TODO: implement paint
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    // TODO: implement shouldRepaint
    return null;
  }
}
```

Phương thức **paint** có hai tham số: canvas, size.
CustomPaint có child thì canvas sẽ có cùng size với child. Trong trường hợp này cavas sẽ có kích thước bằng toàn bộ màn hình - phần không gian của AppBar.
## Canvas Area

Trước khi ta vẽ bất cứ thứ gì lên canvas, ta cần phải hiểu được hệ thống tọa độ của nó. Canvas có hệ thống tọa độ như hình dưới đây:
![](https://images.viblo.asia/9c652fc9-60ad-4696-b237-0eaba0ae9f28.png)


Bạn có thể thấy rằng điểm gốc - origin (0, 0) nằm ở góc trên bên trái của canvas. Mọi nét vẽ đều sẽ liên qua đến điểm gốc - origin, nơi mà painter bắt đầu.

## Draw Line

Bây giờ, mình sẽ vẽ một đường ngang nằm ở giữa của màn hình (như thể nó đang chia màn hình thành hai nửa theo chiều dọc). 

Để vẽ được 1 đường thằng ta cần hai điểm, để khi nối hai điểm đó ta sẽ có được đường thẳng mong muốn.
![](https://images.viblo.asia/bd2865c9-fd70-4b3d-80d5-93267666c825.png)

```dart
// FOR PAINTING LINES
class ShapePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    var paint = Paint()
      ..color = Colors.teal
      ..strokeWidth = 5
      ..strokeCap = StrokeCap.round;

    Offset startingPoint = Offset(0, size.height / 2);
    Offset endingPoint = Offset(size.width, size.height / 2);

    canvas.drawLine(startingPoint, endingPoint, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false;
  }
}
```
Biến **paint** - 1 instance Paint,nó giống như một cây cọ vẽ và giúp chỉ định màu, nét vẽ, độ thanh của nét vẽ, v.v.

Hai biến Offset chỉ định tọa độ vị trí bắt đầu và kết thúc.

Phương thức drawLine được gọi trên canvas để vẽ một đường thẳng giữa hai vị trí Offset và biến paint cũng được chuyển cho phương thức này.

Phương thức shouldRepaint  return false bời vì không cần thiết phải vẽ lại đường thẳng.

* Cách khác để vẽ 1 đường thẳng là sử dụng **Path**
```dart
// FOR PAINTING LINES
class ShapePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    var paint = Paint()
      ..color = Colors.teal
      ..strokeWidth = 5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    var path = Path();
    path.moveTo(0, size.height / 2);
    path.lineTo(size.width, size.height / 2);
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false;
  }
}
```

Khi sử dụng Path, bạn sẽ cần chỉ định một thuộc tính khác cho biến paint, đó là style (ở đây là PaintingStyle.stroke).  Nếu bạn không chỉ định thuộc tính này, thì đường vẽ sẽ không hiển thị.

* moveTo: được sử dụng để thay đổi vị trí hiện tại của điểm thành tọa độ được chỉ định.
* lineTo: được sử dụng để vẽ một đường thẳng từ điểm hiện tại đến điểm được chỉ định trên canvas.
* drawPath: được gọi trên canvas để vẽ path lên màn hình


Code: https://dartpad.dev/0f1e8a36c2a716f2cb46ca853df54749?
## Draw Circle
Bạn có thể vẽ một hình  tròn đơn giản có tâm (size.width / 2, size.height / 2), tức là ở tâm Container, bằng cách gọi phương thức drawCircle của canvas hoặc bằng cách sử dụng Path.

![](https://images.viblo.asia/2401cb8e-5abe-454d-a83c-3e314412fb65.png)


* **drawCircle** 

```dart
// FOR PAINTING CIRCLES
class ShapePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    var paint = Paint()
      ..color = Colors.teal
      ..strokeWidth = 5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    Offset center = Offset(size.width / 2, size.height / 2);

    canvas.drawCircle(center, 100, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false;
  }
}
```
**drawCircle**  cần một Offset là tọa độ tâm đường tròn, bán kính đường tròn và paint
* **addOval() của Path**
```dart
// FOR PAINTING CIRCLES
class ShapePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    var paint = Paint()
      ..color = Colors.teal
      ..strokeWidth = 5
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    var path = Path();
    path.addOval(Rect.fromCircle(
      center: Offset(size.width / 2, size.height / 2),
      radius: 100,
    ));
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false;
  }
}
```
**path.addOval**:  phương pháp này được sử dụng ở đây để vẽ một hinhg tròn với tâm ở giữa màn hình và có bán kính = 100 pixel.


Code: https://dartpad.dev/8e49a84dd72a64971a377478f99a54ec?

To be continued...

Bài viết được tham khảo ở [đây](https://blog.codemagic.io/flutter-custom-painter/)