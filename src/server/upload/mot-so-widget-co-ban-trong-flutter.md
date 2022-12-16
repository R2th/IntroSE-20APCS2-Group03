Bài viết này mình sẽ giới thiệu với mọi người một số widget cơ bản trong flutter nhé . Ở bài viết sau mình sẽ demo các loại widget này và các thuộc tính hay sử dụng của nó mọi người 
nhớ đón xem nhé .
Trong một ứng dụng thì giao diện là một phần không thể thiếu đúng được đúng không nào.

Đầu tiên xin mời các bạn xem qua một ví dụ sau đây :
```
import 'package:flutter/material.dart';

void main() {
  runApp(
    const Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
```
- Phía trên là một chương trình đơn giản để mình lấy làm ví dụ cho các bạn về hoạt động của một chương trình trong flutter nó sẽ chạy như thế nào nhé. Trong ví dụ trên thì hàm runApp () lấy Widget đã cho và làm cho nó trở thành gốc của cây widget. Cây widget này thì chứa hai widget con là Center và widget con của nó Text. Khi bạn chạy chương trình thì sẽ thấy nội dung trong text sẽ hiện giữa màn hình.
## 1. Text 
-  Là một widget được sử dụng để hiển thị văn bản.
```
     Text(
      "Text content",
      textAlign: TextAlign.center,
      maxLines: 2,
      style: TextStyle(
          color: Colors.red, fontSize: 12, fontWeight: FontWeight.bold),
    )
```
- Trong đó text có một số nhưỡng thuộc tính hay sử dụng sau :
- textAlign : Căn chỉnh text theo chiều ngang
- maxLines: Số lượng dòng tối đa
- style : TextStyle() bao gồm các thuộc tính để set style như là color,fontSize....

## 2. RichText 
-  Là một widget mở rộng của Text giúp hiển thị text với nhiều style khác nhau . Văn bản khi cần set nhiều thuộc tính ta sử dụng TextSpan để set các thuộc tính cần thiết cho từng đoạn văn bản đó.
```
 RichText(
  text: TextSpan(
    text: 'Hello ',
    style: DefaultTextStyle.of(context).style,
    children: const <TextSpan>[
      TextSpan(text: 'bold', style: TextStyle(fontWeight: FontWeight.bold)),
      TextSpan(text: ' world!'),
    ],
  ),
)
```
## 3. Button
-  Widget này thì thường bao gồm một image hoặc text hoặc có thể bao gồm cả hai . Khi người dùng chạm vào nó, nó sẽ kích hoạt sự kiện nhấp chuột và thực hiện hành động thích hợp. Flutter có nhiều loại nút khác nhau. Các loại nút này được sử dụng cho các mục đích khác nhau. Ở đây chúng ta có một số loại button cơ bản sau :
1.     Flat Button
2.     Raised Button
3.     Floating Button
4.     Drop Down Button
5.     Icon Button
6.     PopupMenu Button
## 4. Column
-  Là một widget chứa một mảng các item widget con và bố trí các item con theo thứ tự hàng dọc và không scroll được .
```
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  mainAxisSize: MainAxisSize.min,
  children: <Widget>[
    const Text('We move under cover and we move as one'),
    const Text('Through the night, we have one shot to live another day'),
    const Text('We cannot let a stray gunshot give us away'),
    const Text('We will fight up close, seize the moment and stay in it'),
    const Text('It’s either that or meet the business end of a bayonet'),
    const Text('The code word is ‘Rochambeau,’ dig me?'),
    Text('Rochambeau!', style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 2.0)),
  ],
)
```
## 5. Row 
-  Là một widget chứa một mảng các item widget con và bố trí các item con theo thứ tự hàng ngang và không scroll được. 
```
Row(
  children: const <Widget>[
    Expanded(
      child: Text('Deliver features faster', textAlign: TextAlign.center),
    ),
    Expanded(
      child: Text('Craft beautiful UIs', textAlign: TextAlign.center),
    ),
    Expanded(
      child: FittedBox(
        fit: BoxFit.contain, // otherwise the logo will be tiny
        child: FlutterLogo(),
      ),
    ),
  ],
)
```
## 6. Stack
- Thay vì được định hướng tuyến tính (theo chiều ngang hoặc chiều dọc), Stack widget cho phép bạn đặt các tiện ích chồng lên nhau theo thứ tự . 
- Lớp này hữu ích nếu bạn muốn chồng lên một số phần tử con theo cách đơn giản, 
chẳng hạn như có một số văn bản và hình ảnh, được phủ lên bằng một gradient và một nút gắn ở phía dưới.
```
Stack(
  children: <Widget>[
    Container(
      width: 100,
      height: 100,
      color: Colors.red,
    ),
    Container(
      width: 90,
      height: 90,
      color: Colors.green,
    ),
    Container(
      width: 80,
      height: 80,
      color: Colors.blue,
    ),
  ],
)
```
## 7. Constrainer
-  Là một vùng chứa cho phép bạn bố trí phần tử con ở trong nó. Một vùng chứa có thể được trang trí bằng BoxDecoration, chẳng hạn như nền, đường viền hoặc bóng. Một vùng chứa cũng có thể có lề, phần đệm và các ràng buộc được áp dụng cho kích thước của nó. Ngoài ra, một Container có thể được biến đổi trong không gian ba chiều bằng cách sử dụng ma trận.
```
Container(
  constraints: BoxConstraints.expand(
    height: Theme.of(context).textTheme.headline4!.fontSize! * 1.1 + 200.0,
  ),
  padding: const EdgeInsets.all(8.0),
  color: Colors.blue[600],
  alignment: Alignment.center,
  child: Text('Hello World',
    style: Theme.of(context)
        .textTheme
        .headline4!
        .copyWith(color: Colors.white)),
  transform: Matrix4.rotationZ(0.1),
)
```
8. Tài liệu tham khảo:
- https://flutter.dev/docs/development/ui/widgets-intro