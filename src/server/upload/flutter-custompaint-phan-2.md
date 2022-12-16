Ở phần trước ta đã tìm hiều các vẽ những nét thẳng tròn đơn giản. Nhưng bạn muốn hơn thế nữa, muốn vẽ các đường cong uốn lượn hay chỉ một phần của đường tròn... Thì bài này là dành cho điều đó.
Lớp Path ngoài việc vẽ các đường thẳng như được giới thiệu trong bài trước, nó còn cung cấp những hàm đặc biệt giúp ta vẽ các đường cong.
# Vẽ đường cong

### quadraticBezierTo

![](https://images.viblo.asia/885d5c7a-b76f-4907-83f1-2451f45c84d5.gif)

quadraticBezierTo là hàm vẽ 1 [đường cong Bezier](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) bậc 2.

Ví dụ sau ta vẽ 1 đường cong Bezier từ 3 điểm **(0, height/2)** *(trung điểm của cạnh trái)*  **(width / 2,height)** *(trung điểm của cạnh dưới - điểm kiểm soát)* **(width, height/2)** *(trung điểm của cạnh phải)*

```dart
  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()
      ..color = Colors.red
      ..style = PaintingStyle.stroke
      ..strokeWidth = 8.0;

    Path path = Path();
    path.moveTo(0, size.height / 2);
    path.quadraticBezierTo(size.width / 2, size.height, size.width, size.height / 2);
    canvas.drawPath(path, paint);
  }
```
Bạn có thể chạy thử code ở đây [Run](https://dartpad.dev/8720bbe532bac610c683770c6daa9dd3)

![](https://images.viblo.asia/1a74d1ec-e5b2-4784-8809-4b44b0b35c17.png)


### cubicTo
![](https://images.viblo.asia/5720dc31-7eb4-408c-a5ef-a63ad312c094.gif)

 Là hàm vẽ 1 đường cong Bezier bậc 3. Không giống như quadraticBezierTo, cubicTo có tới 2 điểm kiểm soát . Do đó bạn có thể tính toán chọn điểm kiểm soát để có thể tạo được 1 đường lượn sóng.
 ```dart
  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()
      ..color = Colors.red
      ..style = PaintingStyle.stroke
      ..strokeWidth = 8.0;
    
    Path path = Path();
    path.cubicTo(size.width / 4, 3 * size.height / 4, 3 * size.width / 4, size.height / 4, size.width, size.height);
    canvas.drawPath(path, paint);
  }
```
[Run](https://dartpad.dev/0ae15ba9f8a3a23457c89d4c48bdb366)


  ![](https://images.viblo.asia/3436457f-dc3d-4995-950a-789eaa5c684b.PNG)
 ![](https://images.viblo.asia/eff01723-25c9-47a4-905f-94a49ab2b4b6.png)
 
###  conicTo
conicTo về cơ bản cũng hoạt động giống như  quadraticBeizerTo với sự khác biệt duy nhất là biến trọng số.  Nếu trọng số lớn hơn 1, hình được vẽ là hyperbol.  Nếu trọng số là 1 thì hình được vẽ là hình parabol và nếu nó nhỏ hơn 1, hình được vẽ sẽ là hình elip.
```dart
  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()
      ..color = Colors.red
      ..style = PaintingStyle.stroke
      ..strokeWidth = 8.0;

    Path path = Path();
    path.conicTo(size.width / 4, 3 * size.height / 4, size.width, size.height, 20);
    canvas.drawPath(path, paint);
  }
```
[Run](https://dartpad.dev/95857600fc38731e08a9a562815c7c8c)

![](https://images.viblo.asia/c2ed8972-5c0a-4ca2-812e-201aa59a0de6.png)

### arcTo
arcTo là hàm vẽ 1 phần hình oval từ góc bắt đầu đến góc kết thúc (đo bằng radian)

```dart
  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()
      ..color = Colors.red
      ..style = PaintingStyle.stroke
      ..strokeWidth = 8.0;

    // Method to convert degree to radians
    num degToRad(num deg) => deg * (Math.pi / 180.0);

    Path path = Path();
    path.arcTo(Rect.fromLTWH(size.width / 2, size.height / 2, size.width / 4, size.height / 4), degToRad(0), degToRad(90), true);
    canvas.drawPath(path, paint);
  }
```
![](https://images.viblo.asia/7554105f-6aaa-414e-b4bb-d66dd64ebdd1.png)
[Run](https://dartpad.dev/660105afcb315aafbcdf223cc8839aef?)
## Các fuction khác
### addRect

```dart
  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()
      ..color = Colors.red
      ..style = PaintingStyle.stroke
      ..strokeWidth = 8.0;

    Path path = Path();
    // Adds a rectangle
    path.addRect(Rect.fromLTWH(size.width / 2, size.height / 2, size.width / 4, size.height / 4));
    canvas.drawPath(path, paint);
  }
```
![](https://images.viblo.asia/abd827f0-3139-48b2-b5da-89b154ab09bd.png)

### addRRect
Hình chữ nhật với các góc được bo tròn
```dart
  @override
  void paint(Canvas canvas, Size size) {
    Paint paint = Paint()
      ..color = Colors.red
      ..style = PaintingStyle.stroke
      ..strokeWidth = 8.0;

    Path path = Path();
    path.addRRect(
      RRect.fromRectAndRadius(Rect.fromLTWH(size.width / 2, size.height / 2, size.width / 4, size.height / 4), Radius.circular(16))
    );
    canvas.drawPath(path, paint);
  }
```
![](https://images.viblo.asia/ac6a065d-61cf-455d-9c35-47aaa5887101.png)

Cảm ơn các bạn đã theo dõi bài viết !!

[Nguồn](https://medium.com/flutter-community/paths-in-flutter-a-visual-guide-6c906464dcd0)