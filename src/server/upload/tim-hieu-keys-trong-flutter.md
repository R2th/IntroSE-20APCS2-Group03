![image.png](https://images.viblo.asia/8c069608-7200-415b-b3e4-2687fe51a801.png)

Trong bài viết này, chúng ta sẽ cùng nhau khám phá các Keys trong Flutter. Không những tìm hiểu công dụng của từng loại `Key`, chúng ta còn biết được khi nào, ở đâu và sử dụng loại nào là thích hợp để giải quyết các vấn đề cũng như nó đã tối ưu ứng dụng của chúng ta như thế nào.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/tim-hieu-keys-trong-flutter/)

## 1. Khi nào nên sử dụng Key

Về cơ bản, các bạn có thể dễ dàng nhận thấy được `Key` được sử dụng trong bất kỳ hàm dựng của mọi Widget. Tuy nhiên, bạn cũng hiếm khi sử dụng `Key` trong khi thực hiện lồng ghép các Widget lại với nhau để dựng layout (đoán thui :v). Các key duy trì State khi các Widget di chuyển trong Widget tree của ứng dụng Flutter. Dưới đây là một số ví dụ cụ thể:

```
class NewStatelessWidget extends StatelessWidget {
  const NewStatelessWidget({ Key? key }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      
    );
  }
}
```

```
class NewStatefulWidget extends StatefulWidget {
  const NewStatefulWidget({ Key? key }) : super(key: key);

  @override
  _NewStatefulWidgetState createState() => _NewStatefulWidgetState();
}

class _NewStatefulWidgetState extends State<NewStatefulWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      
    );
  }
}
```

```
ListTile(
  key: UniqueKey(),
  title: Text(
     text,
     style: textStyle ?? Theme.of(context).textTheme.bodyText2,
  ),
)
```

Xem video này: https://www.youtube.com/watch?v=kn0EOS-ZiIc

Dưới đây mình sẽ recap lại một tí về video trên (Lưu ý mình có thay đổi tên các class). Đầu tiên, chúng ta có 1 class StatefulWidget tên là `PositionedKey`. Ở phiên bản đầu tiên, hàm `initState()` nhận vào 2 Widget có cùng tên class là `StatelessColorful`. Đọc tên thôi cũng biết đây là StatelessWidget. Mục đích là hiển thị 2 ô có màu khác nhau trên màn hình trên cùng 1 dòng (nhìn ở dưới hàm build thì nó được bỏ vào 1 cái `Row`).

```
import 'package:flutter/material.dart';
import 'dart:math';
class PositionedKey extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => PositionedKeyState();
}
class PositionedKeyState extends State<PositionedKey> {
  List<Widget> tiles;
  
@override
  void initState() {
    super.initState();
    tiles = [
      StatelessColorful(),
      StatelessColorful(),
    ];
  }
@override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
            child: Center(
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: tiles))),
        floatingActionButton: FloatingActionButton(
            child: Icon(Icons.sentiment_very_satisfied), onPressed: swapTiles));
  }
  
  void swapTiles(){
  	setState(() {
      tiles.insert(1,tiles.removeAt(0));
    });
  }
```

Sau đó, khi ta nhấn vào `floatingActionButton`, hàm `onPressed` sẽ gọi đến function `swapTiles()` để hoán đổi vị trí của 2 ô và dĩ nhiên là nó work như chúng ta mong muốn.

Một điều lưu ý mà team Flutter có nói trong video đó là:

> Remember, if the entire widget subtree in your collection is stateless, keys aren't needed.

(Tạm dịch: `Key` sẽ không cần thiết nếu như các widget subtree là các StatelessWidget).

Bạn có thể tham khảo code khởi tạo class `StatelessColorful` như sau:

```
class StatelessColorful extends StatelessWidget {
  final Color color = UniqueColorGenaretor.getColor();
StatelessColorful({Key key}) : super(key: key);
@override
  Widget build(BuildContext context) => buildColorful(color);
}
```

Vậy trong trường hợp StatefulWidget thì sao? Chúng ta sẽ thay đổi class ở trong hàm `initState()` thành class `StatefulColorful`. Sau đó chúng ta nhấn vào `floatingActionButton`, hàm `onPressed` sẽ gọi đến function `swapTiles()` và bạn sẽ thấy một điều kỳ lạ xảy ra, đó là không có gì xảy ra hay thay đổi gì cả :))).

```
class StatefulColorful extends StatefulWidget {
  StatefulColorful({Key key}) : super(key: key);
@override
  State<StatefulWidget> createState() => StatefulColorfulState();
}
class StatefulColorfulState extends State<StatefulColorful> {
  Color color;
@override
  void initState() {
    super.initState();
    color = UniqueColorGenaretor.getColor();
  }
@override
  Widget build(BuildContext context) => buildColorful(color);
}
```

Khi ta chuyển sang sử dụng StatefulWidget thì lúc này biến color đã được lưu trữ ở trong State rồi, cho nên dù có nhấn bao nhiêu lần thì vẫn vậy, giống như crush của bạn trong State (lòng, trái tim, v.v) có chứa người khác rồi :v.

![image.png](https://images.viblo.asia/2d6b29dc-fc26-4f86-80f5-3d45fc81cc5f.png)

Ok tình hình có vẻ không khả thi với cách cũ, ta nên thay đổi cách tiếp cận mới để đạt được kết quả mới. Mọi vấn đề chỉ cần xác định đâu là KeyPoint để giải quyết, và lần này may mắn ta chỉ cần dùng `Key` là giải quyết được (nhớ tìm đâu là `Key` để mở khoá trái tim nàng nha mấy ông :v).

```
void initState() {
  super.initState();
  tiles = [
    StatefulColorfulTile(key: UniqueKey()),
    StatefulColorfulTile(key: UniqueKey()),
  ];
}
```

Sau khi thêm, bạn hãy chạy lại code (nhớ Restart App nhé), bạn sẽ thấy chúng đã hoán đổi vị trí với nhau. Vấn đề nằm ở chỗ khi bạn hoán đổi vị trí mà không có `Key`, Flutter không thể nào phân biệt được sự thay đổi mà update lại đúng reference.

![](https://images.viblo.asia/d51c6c29-f61a-42f7-b78a-f27e76dc69e4.gif)

## 2. Sử dụng Key ở đâu sao cho hợp lý:

Thông thường, nó phải được đặt trong Widget cấp cao (high-level) của cây Widget hiện tại. Trong ví dụ trên, ta bọc thêm `Padding` cho mỗi `StatefulColorful`. Sau đó ta nhấn lại thì thấy màu của hai ô đã thay đổi ngẫu nhiên trong khi chúng ta muốn nó phải cố định.

![image.png](https://images.viblo.asia/6b28f53b-83a7-4eee-b9f4-3050130d10eb.png)

## 3. Tổng hợp Key trong Flutter

* Value Key: Ví dụ bạn đang xây dựng ứng dụng ToDo App, mỗi `ToDo` item thường có một thuộc tính có giá trị là duy nhất hoặc hằng số để bạn phân biệt giữa các item `Todo` với nhau (thuộc tính đó thường là `id`). Trong trường hợp này, bạn nên sử dụng `ValueKey`. Nó sẽ giúp cho việc thêm, xoá, sửa 1 `ToDo` bất kỳ nhanh hơn, đặc biệt là với xoá.
* Object Key: Giả sử rằng mỗi Widget con lưu trữ một tổ hợp dữ liệu phức tạp, chẳng hạn như một ứng dụng lưu trữ sổ địa chỉ cho thông tin người dùng. Bất kỳ trường thông tin nào, chẳng hạn như tên hoặc ngày sinh, có thể giống với một người khác, nhưng mỗi một tập dữ liệu là duy nhất. Trong những trường hợp này, `ObjectKey` là phù hợp nhất.
* Unique Key: Nếu có nhiều widget có cùng loại hoặc nếu bạn cần đảm bảo rằng widget con không giống với các widget khác, bạn có thể sử dụng `UniqueKey`. Chúng ta đã sử dụng nó trong ví dụ của mình. `UniqueKey` Bởi vì chúng ta không lưu trữ một số thông tin khác về khối màu và chúng tôi không có ý tưởng tuyệt vời về màu sắc cho đến khi chúng ta lắp ráp widget (cho nó random color).
* GlobalKeys: có hai cách sử dụng:

* Chúng cho phép các Widget thay đổi parents của chúng ở bất kỳ vị trí nào trong ứng dụng mà không bị mất state hoặc chúng có thể được sử dụng để truy cập dữ liệu để lấy thông tin của một Widget bất kỳ.
* Trong trường hợp thứ hai, bạn có thể cần kiểm tra mật khẩu; tuy nhiên, bạn không muốn chia sẻ status data với các widget khác nhau trong cây và bạn có thể sử dụng `GlobalKey<FromState>`, nó nắm giữ `State` của `Form`.

    Sự thật mà nói, `GlobalKey` giống như một biến toàn cục. Có những cách khác tốt hơn để hoàn thành công việc của các key đó, chẳng hạn như inherited widget, Redux, or block pattern.

## Tóm lại:

Trong bài viết, tôi đã giải thích cấu trúc cơ bản của Keys In Flutter, bạn có thể sửa đổi code này theo sự lựa chọn của mình và đây là phần giới thiệu cơ bản về Keys In Flutter từ tôi và cách hoạt động của nó trong Flutter.

Bài viết được dịch và viết lại từ bài gốc: [Keys In Flutter](https://medium.com/flutterdevs/keys-in-flutter-104fc01db48f)