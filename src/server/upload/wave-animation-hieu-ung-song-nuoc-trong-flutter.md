# Lời đầu

UI/UX đóng một vai trò vô cùng quan trọng trong việc góp phần tạo nên sự thành công cho một ứng dụng. Dựa trên một sự thật là con người luôn luôn khao khát những cái đẹp. Một ứng dụng có UI đẹp sẽ khiến người dùng cảm thấy thoải mái khi sử dụng hơn, từ đó họ có thiện cảm hơn, chiếm ưu thế hơn trong long người dùng. UI và UX phải luôn là hai yếu tố không thể tách rời nhau trong một sản phẩm front-end. Ngoài các thành phần như: bố cục (layout), phối màu (color), tỷ lệ, hình ảnh, font chữ… Thì các hiệu ứng cũng là một trong những yêu tố then chốt để tạo nên một sản phẩm perfect. Animation (hiệu ứng chuyển động) có tác dụng làm cho ứng dụng trở nên sống động hơn, các chuyển đổi giữa các component trở nên mượt mà hơn, trông tự nhiên hơn.

Có rất nhiều cách để có thể implement một hiệu ứng chuyển động (Animation) vào trong ứng dụng của bạn. Chúng ta có ảnh gif, lottie (thirds part), video, … và chúng ta hoàn toàn có thể sử dụng code để tạo ra những hiệu ứng đó. Trong một số trường hợp đặc biệt chúng ta chỉ có thể sử dụng code để tạo ra animation mà k thể thay thế bằng cách khác như các hiệu ứng chuyển components, màn hình trong ứng dụng. Bên cạnh đó thì nếu animtation của bạn là một cái gì đó phức tạp như chuyển động chạy của một con người chẳng hạn, bạn có thể sử dụng file design sẵn sẽ tiết kiệm được nhiều nổ lực hơn.

# Lý thuyết

Trong bài viết hôm nay chúng ta sẽ sử dụng Flutter một framework xây dựng ứng dụng mobile cho cả android và ios. Trong flutter có hai loại animation mà bạn cần quan tâm:

·        Implicit Animations: là những Animation components được cung cấp sẵn bạn chỉ cần tích hợp vào widget của bạn (mì ăn liền), tác dụng của nó là implement nhanh, và app dụng với các animation đơn giản.

·        Explicit Animation: là loại animation bạn có thể control được mọi thứ từ duration, begin, end, cuvers…

Animation thực chất là một chuỗi các hình ảnh được sắp xếp theo một tuần tự nào đó trong một khoảng thời gian (duration). Animation chính xác là sự thay đổi từ trạng thái A: begin đến trạng thái B: end trong khoảng thời gian: Duration và curvers có nghĩa là nếu như bạn move một điểm từ vị trí A -> B theo một đường thẳng tốc độ không đổi thì chuyển động đó nhìn rất fake. Nhưng nếu bạn thay đổi vận tốc đó thành chậm dần đều hoặc tăng dần đều, nhìn nó trông sẽ thật hơn. Curvers là một hàm số nào đó chuyển một đồ thị đường thẳng thành một đường cong. Đường cong đó phụ thuộc vào đồ thị hàm số bạn implement.

Một số curves phổ biến trong Flutter: https://api.flutter.dev/flutter/animation/Curves-class.html
Ở bài post này chúng ta sẽ không đề cập tới Implicit Animations và chỉ tập trung vào Explicit Animations.

Explicit Animations trong Flutter có 3 yếu tố chính như sau:

```
AnimationController controller = AnimationController(duration: const Duration(milliseconds: 500), vsync: this);
final Animation<double> curve = CurvedAnimation(parent: controller, curve: Curves.easeOut);
Animation<int> alpha = IntTween(begin: 0, end: 255).animate(curve);
```
·        AnimationController: nhiệm vụ của nó là điều khiển animation

·        Animation: lớp output giá trị animate

·        CurvedAnimation: thiết lập hàm curvers sử dụng

·        Tween: Tạo ra một Animation với giá trị bắt đầu và giá trị kết thúc, nhận vào một AnimationController hoặc một CurvedAnimation


# Triển Khai

Ý tưởng hôm nay sẽ là một wave animation dùng để trang thái UI của bạn. Nó giúp chúng ta củng cố được các kiến thức liên quan tới implement một explicit animation trong Flutter.
![](https://images.viblo.asia/19605fc4-7d05-4e02-93e6-4518342599ad.png)

Nhắc đến wave (sóng) chúng ta nghĩ ngay tới đồ thị của sin hoặc cos, cái này quá quen thuộc với chúng ta ở thời cấp 3 và đại học.
Ý tưởng tạo ra wave animation là tạo ra những làn sóng chuyển động đan xen nhau, mỗi bàn có một tốc độ chuyển động một biên độ và một màu sắc khác nhau. Để tạo ra được một làn sóng có hình sin như trên, chúng ta sử dung CustomPaint trong Flutter để vẽ.
Chúng ta cần truyền vào số đỉnh sóng chúng ta muốn, bên độ sóng và màu sắc mỗi sóng. Ở đây để tăng tính thẩm mỹ, chúng ta sẽ sử dụng gradient nên cần truyền vào ít nhất 2 màu.
![](https://images.viblo.asia/a7331137-5cf7-4d2a-8592-2b6c8081b63f.png)

Như ví dụ hình trên chúng ta mong muốn có 2 đỉnh sóng, biên độ giao động sóng là A.
Ww: là nửa bước sóng nhìn vào mô hình trên chúng ta có thể dễ dàng nhận ra
n = 2: số lượng đỉnh sóng mong muốn
ww = width / (n * 2 - 1) với: n * 2 – 1 là số lượng nửa bước sóng, width là chiều rộng của toàn bộ sóng.
Chúng ta sẽ tiếp hành duyệt qua từng điểm xanh, đỏ ở trên hình số vòng lặp sẽ là:

loopcount = (4 * n - 1)
Mỗi điểm xanh là 1 điểm dừng để chuyển tiếp một đường gợn cong khác.

Điểm chấm đổ phụ thuộc vào biên độ của chúng là định trên hay dưới tương ứng với giá trị âm hay dương của biên độ A.

```
class WavePainter extends CustomPainter {
 List<Color> colors;
 int amount;
 double pick;
 Size? realSize;
 WavePainter({required this.colors, this.amount = 4, this.pick = 30, this.realSize});
 @override
 void paint(Canvas canvas, Size size) {
   size = realSize ?? size;
   var paint = Paint()
     ..shader = LinearGradient(
       begin: Alignment.topCenter,
       end: Alignment.bottomCenter,
       colors: colors,
     ).createShader(Rect.fromPoints(
       Offset.zero,
       Offset(size.width, size.height),
     ));
   var ww = size.width / (amount * 2 - 1);
   var path = Path();
   var hh = true;

   // path.lineTo(0, 0);
   for (var i = 1; i <= (4 * amount - 2); i++) {
     if (i % 2 == 0) {
       path.lineTo(i * ww / 2, 0);
       path.lineTo(i * ww / 2, 0);
     } else {
       if (hh) {
         path.quadraticBezierTo(i * (ww / 2), pick, (i + 1) * ww / 2, 0);
         hh = false;
       } else {
         path.quadraticBezierTo(i * (ww / 2), -pick, (i + 1) * ww / 2, 0);
         hh = true;
       }
     }
   }
   path.lineTo(size.width, 0);
   path.lineTo(size.width, size.height);
   path.lineTo(0, size.height);
   path.close();
   canvas.drawPath(path, paint);
 }

 @override
 bool shouldRepaint(CustomPainter oldDelegate) {
   return false;
 }
}
```

Sau khi đã tiến hành xây dựng xong các làn sóng, chúng ta sẽ xếp chúng vào một stack để tạo ra các lớp sóng chồng lên nhau và bắt đầu implement animation cho các lớp sóng đó.
Chúng ta khai báo các lớp animation cho widget waveanim như sau:

```
class _WavesAnimState extends State<WavesAnim> with TickerProviderStateMixin {
 late Animation<double> animation;
 late AnimationController animationController;

 @override
 void initState() {
   super.initState();
   animationController = AnimationController(
       vsync: this, duration: const Duration(milliseconds: 6500));
       final Animation<double> curve = CurvedAnimation(parent: animationController, curve: Curves.easeInOutSine, reverseCurve: Curves.easeInOutSine);
   animation = Tween<double>(begin: 0, end: 1).animate(curve);
   animationController.addListener(() {
     setState(() {});
   });
   animationController.repeat(reverse: true, period: const Duration(milliseconds: 6500));
 }
```

Ở hàm build:

```
@override
  Widget build(BuildContext context) {
    var width = -MediaQuery.of(context).size.width;
    return SizedBox(
      height: 500,
      width: 1000,
      child: Stack(
        alignment: Alignment.bottomCenter,
        children: [
           Transform.translate(
            offset: Offset(animation.value * 5 * width, 0),
            child: Container(
              height: 300,
              width: 1000,
              child: CustomPaint(
                painter: WavePainter(
                  realSize: Size(-width * 12, 200),
                  colors: [
                    Colors.pink,
                    Colors.purple,
                  ],
                  pick: 20,
                  amount: 8,
                ),
              ),
            ),
          ),
          Transform.translate(
            offset: Offset(animation.value * 10 * width, 0),
            child: Container(
              height: 250,
              width: -width * 6,
              child: CustomPaint(
                painter: WavePainter(
                  realSize: Size(-width * 20, 200),
                  colors: [
                    Colors.red,
                    Colors.pink,
                  ],
                  pick: 30,
                  amount: 10,
                ),
              ),
            ),
          ),
```


Sử dụng hàm Transform.translate() để bi chuyển các làn sóng theo phương ngang qua lại.
Chúng ta đã có một hiệu ứng sóng nước khá là cool.


Kết quả
![](https://images.viblo.asia/80246ad8-f724-4ffa-b169-037bac18b0a3.gif)

Nhìn kết quả có vẻ cũng rất ok. Cảm ơn các bạn đã bớt chút thời gian đọc hết bài post này, mong muốn thông qua bài viết này các bạn có thể tham khảo thêm được một vài điều nho nhỏ.
Thanks for reading this post!!!