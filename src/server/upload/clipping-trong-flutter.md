Trong đồ họa máy tính, hành động giới hạn kết xuất cho một khu vực cụ thể được gọi là `Clipping`. Một vùng clip được cung cấp cho `Canvas` nên công cụ kết xuất sẽ chỉ “vẽ” các pixel bên trong vùng đã xác định. Không có gì "được sơn" bên ngoài khu vực đó sẽ được hiển thị.

Là nhà phát triển, chúng ta sử dụng clipping để tạo giao diện người dùng tùy chỉnh tuyệt đẹp với các hiệu ứng đặc biệt. Như tiêu đề đã nói, ở đây chúng ta sẽ nói về cách thực hiện cắt - clipping trong **Flutter** và giúp bạn tạo giao diện hấp dẫn ngay lập tức.

# Bắt đầu

Hãy bắt đầu bằng cách tạo một ứng dụng đơn giản - vẽ một hình chữ nhật màu đỏ 200x200 ở chính giữa của `Scaffold`. Code của chúng ta sẽ trông như thế này:

```php
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(
      home: MyApp(),
    ));

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Container(
          color: Colors.red,
          width: 200.0,
          height: 200.0,
        ),
      ),
    );
  }
}
```

Kết quả khi chạy app, ta được màn hình như sau:

![](https://images.viblo.asia/74790e0d-bbeb-4592-ac87-d842ba5af30e.png)

# Custom Clipper

`CustomClipper` là class cơ sở để cắt trong Flutter và nó được sử dụng bởi 4 widget: `ClipRect`, `ClipRRect`, `ClipOval` và `ClipPath`. Mỗi widget này có một hành vi xác định, vì vậy nếu ta bao một `red container` trong một `ClipOval`, ta sẽ được một hình tròn như sau:

```php
      body: Center(
        child: ClipOval(
          child: Container(
            color: Colors.red,
            width: 200.0,
            height: 200.0,
          ),
        ),
      )
```

![](https://images.viblo.asia/ff9125d7-70cb-408d-994c-de501193e415.png)

Thay đổi chiều cao hoặc chiều rộng của `Container`, nó sẽ bắt đầu trở thành hình bầu dục. Điều này thật đơn giản khi bạn muốn tạo một hình bầu dục tùy chỉnh trên giao diện ứng dụng của bạn. Tất cả chỉ cần thay đổi `width` hoặc `height`, sau đó `Ctrl + S` để reload lại UI, bạn sẽ thấy màn hình ứng dụng phản ánh ngay những thay đổi trong code.

![](https://images.viblo.asia/c2fcb1db-6fbd-4ab8-bc90-6e657f8abff5.png)

![](https://images.viblo.asia/bf6c64c1-f2ad-4976-abcc-facd9b819ce9.png)

Bây giờ nếu bạn muốn tùy chỉnh kích thước và vị trí của clip thì sao? đó là những gì `CustomClipper` tạo ra. Hãy tạo một cái cho widget `ClipOval` của chúng ta:

```php
class CustomRect extends CustomClipper<Rect>{
  @override
  Rect getClip(Size size) {
    // TODO: implement getClip
    throw UnimplementedError();
  }

  @override
  bool shouldReclip(covariant CustomClipper<Rect> oldClipper) {
    // TODO: implement shouldReclip
    throw UnimplementedError();
  }
}
```

- Override lại hàm `getClip()` sẽ cung cấp cho ta kích thước của `RenderBox` được cắt và yêu cầu ta trả về một `Rect`. `Rect` này sẽ xác định kích thước và vị trí của clip. Hãy nhớ rằng **Mọi widget hiển thị đều có một RenderBox.** Vì vậy ta cần return lại như sau:

```php
  @override
  Rect getClip(Size size) {
    Rect rect = Rect.fromLTRB(0.0, 0.0, size.width, size.height);
    return rect;
  }
```

Điều này sẽ không thay đổi gì vì `Rect` ở đây giống như giới hạn của child widget.

![](https://images.viblo.asia/782f9d06-46a7-487b-bbfb-670b668f52c3.png)

Nhưng nếu bạn chỉ muốn hiển thị một nửa hình bầu dục? Chúng ta có thể làm điều đó dễ dàng bằng cách thay đổi điểm `left` của hình chữ nhật thành `-size.width` và nếu bạn muốn nhìn thấy nửa còn lại, chỉ cần thay đổi điểm bên phải thành `size.width * 2`.

![](https://images.viblo.asia/3436985b-0e1b-4f02-95ef-3f96366ea6af.png)

![](https://images.viblo.asia/e0ee19a4-c1d8-4e3a-bc28-c616515a2113.png)

Lưu ý: Khi kiểm tra, hãy đảm bảo rằng `shouldReclip` trả về `true`. Nếu không, hãy đặt nó một cách rõ ràng để Hot reload sẽ thay đổi đúng vùng clip.

# ClipRect

Được sử dụng để cắt một vùng hình chữ nhật ra khỏi một hình ảnh lớn hơn. Ví dụ, bạn có thể sử dụng `ClipRect` nếu bạn chỉ muốn hiển thị 1 vùng hình chữ nhật của cả một hình ảnh lớn.

![image.png](https://images.viblo.asia/2ebe7f98-27ce-4eef-b1d5-98d03112fb88.png)

```php
Container(
  child: Align(
    alignment: Alignment.bottomRight,
    heightFactor: 0.5,
    widthFactor: 0.5,
    child: Image.network("https://static.vinepair.com/wp-content/uploads/2017/03/darts-int.jpg"),
  ),
),
```

# ClipRRect

Nó tương tự với `ClipRect` với các góc bo tròn. Ta có thể cài đặt độ cong khác nhau cho mỗi góc, không cần thiết phải tạo 4 góc có cùng một bán kính. Trong ví dụ dưới đây, chỉ cần set giá trị cho 3 góc, ngoại trừ góc `bottom-left`

![image.png](https://images.viblo.asia/c8b3dc21-00bd-45bc-afc6-d55232dd1e3b.png)

```php
ClipRRect(
  borderRadius: BorderRadius.only(
    topLeft: Radius.circular(25.0),
    topRight: Radius.circular(25.0),
    bottomRight: Radius.circular(25.0),
  ),
  child: Align(
    alignment: Alignment.bottomRight,
    heightFactor: 0.5,
    widthFactor: 0.5,
    child: Image.network("https://static.vinepair.com/wp-content/uploads/2017/03/darts-int.jpg"),
  ),
)
```

# ClipPath

Sử dụng để cắt một khu vực tùy chỉnh bằng cách sử dụng `path`. Giả sử ta cần cắt một hình tam giác:

![](https://images.viblo.asia/c215f76a-c91d-43d1-8897-5d4a71c1c8a2.png)

## clipBehavior

Thuộc tính `clipBehavior` là mới và bạn sẽ thấy nó rất nhiều trong `Material Widgets` vì sự thay đổi đột ngột đã được thảo luận vài tháng trước. Với thay đổi này, các ứng dụng Flutter nhanh hơn 30%, nhưng một phần của thay đổi đột phá này là nó đã vô hiệu hóa lệnh gọi tự động đến saveLayer và làm lộ thuộc tính `clipBehavior`. Với nó, bạn có thể thiết lập cách cắt nội dung widget. Behavior mặc định cho hầu hết các widget là `Clip.none`.

### Clip.hardEdge

![image.png](https://images.viblo.asia/a7a9075c-7804-4415-ad5f-49bbc554c7c6.png)

### Clip.antiAlias

![image.png](https://images.viblo.asia/25133b71-ddf9-4bd7-8679-92724d255255.png)

Như bạn có thể thấy, không có sự khác biệt có thể nhận ra giữa `antiAliasWithSaveLayer` và `antiAlias`, nhưng có một sự khác biệt rõ ràng với `hardEdge`. Về mặt hiệu suất, có sự khác biệt lớn giữa chúng, nhanh nhất sẽ là `hardEdge` và `antiAliasWithSaveLayer` là chậm nhất.

# Rendering

Tất cả các widget cắt đều áp dụng vùng clip của chúng trong [`PaintingContext`](https://api.flutter.dev/flutter/rendering/PaintingContext-class.html) trong quá trình xây dựng cây Lớp. Mỗi lớp chúng tôi thêm vào cũng tăng thêm độ phức tạp khi GPU thu hút nội dung kết quả vào bộ đệm khung. Luôn luôn khuyến khích cắt giảm ở mức tối thiểu, vì điều này thêm bộ đệm stencil cho mỗi lớp vào GPU, điều này có thể làm tăng thêm chi phí về thời gian hiển thị. Tốt nhất là nên cắt bớt những gì được yêu cầu và chúng ta cần cẩn thận sử dụng nó một cách tiết kiệm trong các hoạt ảnh. Nếu bạn muốn biết thì hãy xem [Flutter’s Rendering Pipeline](https://www.youtube.com/watch?v=UUfXWzp0-DU&ab_channel=GoogleTechTalks) do Adam Barth trình bày vào năm 2016.

Hẹn gặp lại các bạn trong những bài chia sẻ tiếp theo.