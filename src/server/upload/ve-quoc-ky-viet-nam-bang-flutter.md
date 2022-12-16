# Vấn đề
*"Mình học Toán để làm gì vậy anh. Anh làm IT lâu rồi có bao giờ cần sử dụng đến sin cos tan không?"*. Thằng em mình đang học lớp 12 hỏi :scream:. Biết trả lời nó sao bây giờ. Thú thật, mình cũng ngu toán lắm, suy nghĩ mãi mới nghĩ ra cái đề bài dễ dễ một tí mà mình đã học trong môn đồ họa máy tính để demo cho nó xem. Đề bài cực kỳ quen thuộc trong môn đồ họa máy tính đó là: Vẽ Quốc kỳ Việt Nam bằng Flutter.

![](https://images.viblo.asia/33f5a603-dd52-4bee-a08a-23bb316961c1.PNG)

Bao giờ cũng thế, để có thể vẽ được một hình phức tạp, chúng ta nên bắt đầu từ những việc nhỏ nhất, vẽ một hình đơn giản nhất. 
# 1. Vẽ một hình đơn giản trong Flutter
Để vẽ một *Đường Tròn* đơn giản trong Flutter. Ta sử dụng Widget `CustomPaint` và `CustomPainter` rất đơn giản chỉ với 2 bước:

**Bước 1**: Tạo một `CustomPainter`

Tạo 1 class đặt tên là `MyCustomPainter` kế thừa class `CustomPainter`, nó sẽ bắt bạn override lại 2 hàm `paint` và `shouldRepaint` trả về kiểu `bool`
```dart
class MyCustomPainter extends CustomPainter {
  MyCustomPainter({this.banKinh});

  // bán kính đường tròn
  final double banKinh;

  @override
  void paint(Canvas canvas, Size size) {
    // tọa độ tâm đường tròn cũng chính là tâm của Widget (size.width / 2, size.height / 2)
    final toaDoTamDuongTron = Offset(size.width / 2, size.height / 2);

    // paint: giống như chọn style cho cái hình mình vẽ: nó màu gì,...
    final paint = Paint()
      ..color = Colors.pink // vẽ màu hồng
      ..style = PaintingStyle.stroke // chỉ vẽ viền
      ..strokeWidth = 2; // độ dày viền bằng 2
    
    // vẽ đường tròn
    canvas.drawCircle(toaDoTamDuongTron, banKinh, paint);
  }

  @override
  bool shouldRepaint(MyCustomPainter oldDelegate) {
    return banKinh != oldDelegate.banKinh; // nếu bán kính truyền vào bị thay đổi thì mới cho vẽ lại.
  }
}
```
1. `Canvas` là cái bảng vẽ trắng tinh để chúng ta vẽ đủ thứ trên đời vào đó. Class `Canvas` này cung cấp cho chúng ta các hàm để vẽ. Như ở ví dụ trên mình sử dụng hàm `drawCircle` của nó để vẽ đường tròn đó.
2. `Size` là kích thước của Widget mình định vẽ ra. Ví dụ: `Size(300.0, 200.0)` thì Widget có `width = 300.0` và `height = 200.0`.
3. `Paint` như một stylist, tạo nên style cho bản vẽ như vẽ màu gì, độ dày nét vẽ, bla bla
4. Hàm `shouldRepaint` giúp chúng ta quyết định có nên vẽ lại cái CustomView này hay không. Khi nó vẽ lại nó sẽ chạy lại hàm `paint`. Nếu return `true` thì nó sẽ vẽ lại, return `false` thì không vẽ lại
5. `Offset` truyền vào hoành độ x, tung độ y. Một object `Offset` đại diện cho một điểm trong hệ tọa độ Descartes (Đề - Các) mà các bạn đã học trong Toán ấy. Ngoài ra, nó còn có thể đại diện cho tọa độ của một `vector` trong Toán.
6. Khác với hệ tọa độ Đề - Các mà chúng ta được học khi xưa, hệ tọa độ trong Flutter nó quy ước chiều dương của trục tung là hướng xuống và gốc tọa độ mình đặt tên là điểm *A (0, 0)* sẽ được quy ước ở vị trí đó. Từ điểm *A (0, 0)* đó, ta dễ dàng suy ra 3 điểm còn lại là *B (size.width, 0)*, *C (size.width, size.height)* và *D (0, size.height)*. Đây là 4 điểm cực kỳ quan trọng giúp chúng ta xác định được tọa độ của các điểm, các hình cần vẽ trong canvas :D

![](https://images.viblo.asia/ebe457e5-405e-4888-b75a-cc30f987199f.jpg)

**Bước 2**: Tạo ra widget `CustomPaint` truyền `MyCustomPainter` vừa tạo vào.

```dart
class MyCircleWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: MyCustomPainter(banKinh: 100),
      size: Size(300, 300),
    );
  }
}
```
Widget `CustomPaint` có 3 property quan trọng là:

1.  `painter`: truyền vào một `CustomPainter` như đã tạo ở trên
2.  `child`: truyền vào một Widget con của Widget `CustomPaint` này
3. `size`: Khi truyền object `Size` vào param `size` thì object `MyCustomPainter` sẽ nhận được trong hàm `void paint(Canvas canvas, Size size)`. Chú ý là nếu Widget `CustomPaint` này có `child` thì cái object `Size` này trở nên vô nghĩa vì Flutter sẽ sử dụng size của Widget `child` thay cho object `Size` được chúng ta truyền vào biến `size`.

Full source code: https://dartpad.dev/0605bed20c6410a25f5d91120c865d1c

Bonus thêm cái hình, cái hình này đủ giải thích được đống lý thuyết trên :D

![](https://images.viblo.asia/86443fc7-f31e-4794-b420-710405fe44b1.png)

Chỉ với 2 class `CustomPaint` và `CustomPainter`, chúng ta đã vẽ được một custom shape. Thật dễ dàng đúng không nào. Nếu tém tém lại thì triệu lời nói ở trên chỉ gói gọn trong bức cái này mà thôi. Nhớ được cái này là cân được tất :D

![](https://images.viblo.asia/b78f6ed6-9591-41f4-bb97-c07ab2eb56f4.JPG)

Để vẽ một hình phức tạp hơn, ta cần sử dụng đến `Path`. Bây giờ ta sẽ đi tìm hiểu `Path` qua bài toán chính của chúng ta hôm nay: Vẽ Quốc kỳ Việt Nam :vietnam:
# 2. Vẽ Quốc kỳ Việt Nam
Kiếm trên Wiki, được cái ảnh tỷ lệ chuẩn của lá cờ Việt Nam

![](https://images.viblo.asia/49d4d484-5b24-4d3b-b67d-4aa440423136.png)

Okay, vậy đề bài là: chiều dài lá cờ là *3a*, chiều rộng là *2a*, bán kính đường tròn ngoại tiếp của ngôi sao vàng là *3a / 5* (tức là bằng 1 / 5 chiều dài). Bắt đầu thôi :)

Việc cần làm trước tiên là tạo một `CustomPainter` và khai báo các biến như `width`, `height` và `r` (bán kính) trong hàm `paint`
```dart
class VietNamFlagPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final double width = size.width; // chiều rộng của lá cờ
    final double height = 2 * width / 3; // chiều cao của lá cờ bằng 2 / 3 chiều rộng
    final double r = width / 5; // bán kính đường tròn ngoại tiếp ngôi sao
  }
  
  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return true;
  }
}    
```

Tiếp theo, ta sẽ cần vẽ cái lá cờ đỏ. Tạo một `redPaint` và dùng hàm `drawRect` để vẽ hình chữ nhật màu đỏ. Hàm `drawRect` cần truyền vào một object `Rect` (hình chữ nhật). Để tạo một object `Rect` ta sử dụng hàm `Rect.fromLTRB(double left, double top, double right, double bottom)`. Trong đó `left`, `top`, `right`, `bottom` là khoảng cách tính từ trục hoành hay trục tung như thế này:

![](https://images.viblo.asia/e3e64166-02dd-4508-877f-226b36e561de.jpg)

```dart
final Paint redPaint = Paint() // tạo paint màu đỏ để vẽ cờ đỏ
      ..color = Colors.red
      ..style = PaintingStyle.fill; // tô màu hết cả shape
      
// vẽ hình chữ nhật full cái Widget CustomPaint luôn
canvas.drawRect(Rect.fromLTRB(0, 0, width, height), redPaint);
```

Tiếp theo, để vẽ được ngôi sao, ta cần tìm tọa độ của 5 đỉnh A, B, C, D, E. Tí nữa sẽ biết vì sao cần tìm tọa độ :D

Mặc dù hệ tọa độ trong Flutter nó khác hệ tọa độ Đề - các chút nhưng mình cứ gắn hệ trục tọa độ Đề - các quen thuộc, tức là gốc tọa độ là điểm `O (0, 0)` và chiều dương của trục tung hướng lên để nó quen thuộc với Toán mình từng học hơn, giải nó nhanh và dễ hơn :D. Tí nữa mình sẽ sử dụng các phép dời hình để đưa về hệ tọa độ Flutter sau.

![](https://images.viblo.asia/a7a166c1-842e-4220-b54a-74b2e1602106.JPG)

Ta có: OA = OB = OC = OD = OE = r nên ta tìm được ngay tọa độ điểm $A (0, r)$

5 điểm A, B, C, D, E tạo ra 5 dây cung bằng nhau nên tạo ra 5 góc ở tâm bằng nhau. Vì vậy ta có thể tính được  $\widehat{AOB} = 360° /  5 = 72°$. Từ đó ta tính được $|x_B|$ = FB = OB * sin(72°) và $|y_B|$ = OF = OB * cos(72°). Vì điểm B nằm ở góc phần tư thứ nhất (chiều dương Ox và chiều dương Oy) nên tọa độ điểm $B (r * sin(72°), r * cos(72°))$ 

Vì điểm E đối xứng với điểm B qua Oy nên ta tìm được luôn tọa độ điểm $E (-x_B, y_B)$

Chỉ với 1 vài tính toán đơn giản ta đã tìm được tọa độ của 3 điểm A, B và E. Bây giờ ta tiếp tục đi tìm tọa độ của điểm C và D:

![](https://images.viblo.asia/10afe4e9-c30b-491b-9d12-802429e8470f.PNG)

Kẻ OG vuông góc với CD => OG vừa là đường cao vừa là tia phân giác của $\widehat{COD}$ => $\widehat{COG}$ = 72° / 2 = 36°. Từ đó ta tính được $|x_C|$ = GC = OC * sin(36°)  và $|y_C|$ = OG = OC * cos(36°). Vì điểm C nằm ở góc phần tư thứ IV (chiều dương Ox, chiều âm Oy) nên tọa độ điểm $C (r * sin(36°), -r * cos(36°))$

Vì điểm D đối xứng với điểm C qua Oy nên ta tìm được tọa độ điểm $D (-x_C, y_C)$

Well, vậy là đã tìm được tọa độ của 5 điểm. Giờ đưa chúng vào code thôi :D. Vì hàm `sin`, `cos` trong thư viện `dart:math` của Dart sử dụng đơn vị radian nên trước tiên ta cần viết một extension function cho phép chuyển đổi đơn vị độ sang đơn vị radian.
```dart
import 'dart:math'; // cần phải import thư viện dart:math

extension NumberUtil on num {
  num toRadian() {
    return this * pi / 180;
  }
}
```
Giờ thì tạo ra 5 object `Offset` đại diện cho 5 điểm A, B, C, D, E thôi :D. Chú ý là lúc nảy ta tính toán sử dụng hệ tọa độ có chiều dương của trục tung hướng lên còn hệ tọa độ trong Flutter có chiều dương trục tung hướng xuống nên trong code ta cần lấy các điểm đối xứng với A, B, C, D, E qua trục Ox theo công thức: $xFlutter = xCalculate$ và $y Flutter = -y Calculate$ trong đó $xCalculate$ và $yCalculate$ là tọa độ mình vừa tính toán tìm được lúc nảy còn $xFlutter$ và $yFlutter$ là tọa độ mình viết code trong Flutter.
```dart
final pointA = Offset(0, -r); // vì lúc nảy mình tính được tọa độ A (0, r)
// Tọa độ B tính toán được là B (r * sin(72°), r * cos(72°)) nên trong code là
final pointB = Offset(r * sin(72.toRadian()), -r * cos(72.toRadian()));
// Tọa độ C tính toán được là C (r * sin(36°), -r * cos(36°)) nên trong code là
final pointC = Offset(r * sin(36.toRadian()), r * cos(36.toRadian()));
final pointD = Offset(-pointC.dx, pointC.dy); // đối xứng với C qua trục tung
final pointE = Offset(-pointB.dx, pointB.dy); // đối xứng với B qua trục tung
```

Chúng ta thường vẽ ngôi sao bằng cách nối từ A → C, từ C → E, từ E → B, từ B → D và D nối về lại A đúng không nào :D

`Path` sẽ giúp chúng ta làm việc đó.
```dart
final Path path = Path()
      ..moveTo(pointA.dx, pointA.dy) // đưa ngòi bút đến điểm A
      ..lineTo(pointC.dx, pointC.dy) // vẽ 1 line từ A đến C
      ..lineTo(pointE.dx, pointE.dy) // vẽ 1 line từ C đến E
      ..lineTo(pointB.dx, pointB.dy) // vẽ 1 line từ E đến B
      ..lineTo(pointD.dx, pointD.dy) // vẽ 1 line từ B đến D
      ..close(); // vẽ 1 line từ D đến A tạo thành 1 hình khép kín
```

Ban đầu `Path` sẽ bắt đầu ở điểm `M (0, 0)` như trong hình dưới. Hàm `moveTo(xA, yA)`, `lineTo(xC, yC)` đều truyền vào hoành độ và tung độ của một điểm nhưng khác nhau ở chỗ hàm `moveTo` chỉ di chuyển cây bút từ điểm hiện tại đến điểm được truyền vào (là điểm A) chứ không nối 2 điểm đó lại với nhau còn `lineTo` là thực hiện nối 2 điểm đó với nhau. Như trong hình `lineTo(xC, yC)` sẽ nối điểm hiện tại của cây bút là A với điểm C. 

![](https://images.viblo.asia/3c681988-840b-4ec6-8043-074431ca0750.png)

`Canvas` có hàm `drawPath` để vẽ một `Path` bất kỳ, miễn ta tìm được tọa độ các điểm trên `Path` nó đều vẽ được :D. Vẽ thôi.
```dart
final Paint yellowPaint = Paint() // tạo paint màu vàng để vẽ sao vàng
      ..color = Colors.yellow
      ..style = PaintingStyle.fill;
      
canvas.drawPath(path, yellowPaint); // vẽ ngôi sao vàng theo path
```

Yeah, giờ run app lên ta sẽ nhận được hình ảnh thế này =))

![](https://images.viblo.asia/a018c8d5-d565-44f4-b512-a09366f2af32.PNG)

Quên mất, lúc nảy ta tính là giả định tâm ngôi sao trùng với gốc tọa độ `O (0, 0)`, còn thực tế tâm của ngôi sao phải là điểm `I (width / 2, height / 2)`. Ta cần thực hiện phép tịnh tiến theo vectơ $\overrightarrow{OI}$ bằng hàm `shift`:
```dart
// toạ độ tính toán của tâm ngôi sao
final pointO = Offset(0, 0);

// toạ độ thật của tâm ngôi sao
final pointI = Offset(width / 2, height / 2);

// vector tịnh tiến OI
final translationVector = pointI - pointO;

// thực hiện phép tịnh tiến cả Path bằng hàm shift
final realPath = path.shift(translationVector);

// vẽ realPath
canvas.drawPath(realPath, yellowPaint);
```

![](https://images.viblo.asia/65f33780-5a34-487a-b4fd-bde462c984eb.PNG)

Đây là thành quả:

![](https://images.viblo.asia/d0b85498-fd1f-4459-844f-9fe0e7cd1942.PNG)

Full source code: https://dartpad.dev/9f75935302a6e4fb20073cbc3ae95507
# Kết luận
Well, lý thuyết của bộ môn *"Draw custom shape"* trong Flutter chỉ có nhiêu đó thôi. Để có thể vẽ được các hình phức tạp theo yêu cầu của dự án thì quan trọng nhất vẫn là tư duy của chúng ta vận dụng vào các dòng code bên trong hàm `paint(Canvas canvas, Size size)` của `CustomPainter`. Bài tiếp theo có thể mình sẽ nâng level vẽ một hình khó hơn, thiết thực, gần gũi với dự án thực tế hơn để lập trình Flutter trở nên bớt nhàm chán. Hẹn các bạn vào bài tiếp theo nhé. Nếu thấy những chia sẻ của mình có giá trị thì click up vote ủng hộ mình nhé. Cảm ơn các bạn :D