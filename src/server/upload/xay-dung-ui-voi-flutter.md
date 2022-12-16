**Những gì bạn sẽ học**
* Cơ chế bố trí của Flutter hoạt động như thế nào.
* Cách bố trí các widget theo chiều dọc và chiều ngang.
* Cách tạo bố cục Flutter.

Đây là một hướng dẫn để xây dựng bố cục trong Flutter. Bạn sẽ tạo bố cục cho ảnh chụp màn hình sau:
![](https://images.viblo.asia/31c99aea-7737-4cb5-ad2a-0283b3a8f3f8.jpg)

## Cách tiếp cận của Flutter để bố trí

**Những điểm chính**
* Widget là các lớp được sử dụng để xây dựng UI.
* Widget được sử dụng cho cả phần tử bố cục và giao diện người dùng.
* Soạn các widget đơn giản để xây dựng các widget phức tạp.

Cốt lõi của cơ chế bố trí của Flutter là các widget. Trong Flutter, hầu như mọi thứ đều là một widget - thậm chí cả các layout đều là các widget. Các hình ảnh, icon và văn bản mà bạn nhìn thấy trong ứng dụng Flutter đều là các widget. Nhưng kể cả những thứ bạn không thấy cũng là các widget, chẳng hạn như các hàng, cột và grid để sắp xếp, hạn chế và căn chỉnh các widget hiển thị.

Bạn tạo bố cục bằng cách soạn các widget để tạo các widget phức tạp hơn. Ví dụ: ảnh chụp màn hình ở bên trái hiển thị 3 icon có label bên dưới mỗi biểu tượng:

![](https://images.viblo.asia/c3351eae-b9a4-43ed-9cf2-0e1dd480fb8a.png)
![](https://images.viblo.asia/1077fc5f-c40c-42b1-ad93-64b618004228.png)

Ảnh chụp màn hình thứ hai hiển thị bố cục trực quan, hiển thị một hàng gồm 3 cột trong đó mỗi cột chứa một icon và một label.

> **Lưu ý**: Hầu hết các ảnh chụp màn hình trong hướng dẫn này được hiển thị với debugPaintSizeEnabled được đặt thành true để bạn có thể xem bố cục trực quan. Để biết thêm thông tin, hãy xem [Gỡ lỗi hình ảnh](https://flutter.io/docs/testing/debugging#visual-debugging) , một phần trong [Gỡ lỗi ứng dụng rung ](https://flutter.io/docs/testing/debugging).

Đây là một sơ đồ của cây widget cho giao diện người dùng này:

![](https://images.viblo.asia/fda287bf-1474-4ebf-a817-a6525238e52d.png)

Hầu hết đều giống như bạn đã hình dung ra, nhưng bạn có thể tự hỏi về Container (hiển thị màu hồng). Container là một widget cho phép bạn tùy chỉnh widget con của nó. Sử dụng Container khi bạn muốn thêm margin, padding, border hoặc background color, để đặt tên cho một số khả năng của nó.

Trong ví dụ này, mỗi widget văn bản được đặt trong một Container để thêm margin. Toàn bộ hàng cũng được đặt trong vùng chứa để thêm padding quanh hàng.

Phần còn lại của giao diện người dùng trong ví dụ này được kiểm soát bởi các thuộc tính. Đặt màu của Icon bằng thuộc tính color. Sử dụng thuộc tính style văn bản để đặt phông chữ, màu sắc, weight, v.v. Cột và hàng có các thuộc tính cho phép bạn chỉ định cách con của chúng được căn chỉnh theo chiều dọc hoặc chiều ngang và bao nhiêu không gian mà chúng sẽ chiếm.

## Bố trí một widget
**Những điểm chính**
* Ngay cả bản thân ứng dụng cũng là một widget.
* Thật dễ dàng để tạo một widget và thêm nó vào một widget layout.
* Để hiển thị widget trên thiết bị, hãy thêm widget bố cục vào widget ứng dụng.
* Dễ nhất là sử dụng Scaffold , một widget từ thư viện Material Components, cung cấp banner mặc định, màu nền và có API để thêm drawer, snack bar và bottom sheet.
* Nếu bạn thích, bạn có thể xây dựng một ứng dụng chỉ sử dụng các widget chuẩn từ thư viện widget.

Làm thế nào để bạn bố trí một widget trong Flutter? Phần này cho thấy cách tạo một widget đơn giản và hiển thị nó trên màn hình. Nó cũng hiển thị toàn bộ mã cho một ứng dụng Hello World đơn giản.

Trong Flutter, chỉ mất vài bước để đặt văn bản, icon hoặc hình ảnh trên màn hình.

1. Chọn một widget bố cục để giữ đối tượng. 
Chọn từ nhiều widget bố cục khác nhau dựa trên cách bạn muốn căn chỉnh hoặc hạn chế widget hiển thị, vì các đặc điểm này thường được chuyển vào widget con. Ví dụ này sử dụng Center để sắp xếp nội dung của nó theo cả chiều ngang và chiều dọc.

2. Tạo widget con để giữ đối tượng hiển thị. 

**Lưu ý**: Ứng dụng Flutter được viết bằng ngôn ngữ Dart . Nếu bạn biết Java hoặc các ngôn ngữ lập trình hướng đối tượng tương tự, Dart sẽ cảm thấy rất quen thuộc. Nếu không, bạn có thể thử [DartPad](https://www.dartlang.org/tools/dartpad) , một sân chơi Dart tương tác mà bạn có thể sử dụng từ bất kỳ trình duyệt nào. [Language Tour](https://www.dartlang.org/guides/language) cung cấp tổng quan về các tính năng của ngôn ngữ Dart.

Ví dụ: tạo tiện ích Văn bản:

```
Text('Hello World', style: TextStyle(fontSize: 32.0))
```

Tạo tiện ích Hình ảnh:

```
Image.asset('images/myPic.jpg', fit: BoxFit.cover)
```

Tạo tiện ích Icon:

```
Icon(Icons.star, color: Colors.red[500])
```

3. Thêm widget hiển thị vào widget bố cục. 
Tất cả các widget bố cục đều có thuộc tính child nếu chúng có một con (ví dụ: Center hoặc Container) hoặc thuộc tính children nếu chúng có danh sách widget con (ví dụ: Row, Column, ListView hoặc Stack).

Thêm widget Text vào widget Center:

```
Center(
  child: Text('Hello World', style: TextStyle(fontSize: 32.0))
```

4. Thêm widget bố cục vào trang. 
Một ứng dụng Flutter là, chính nó, một widget và hầu hết các widget đều có một phương thức build () . Khai báo widget trong phương thức build của ứng dụng sẽ hiển thị widget trên thiết bị.

Đối với ứng dụng Material, bạn có thể thêm widget con Center trực tiếp vào thuộc tính nội dung thành màn hình home.

```
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Text('Hello World', style: TextStyle(fontSize: 32.0)),
      ),
    );
  }
}
```

**Lưu ý**: Thư viện Material Components triển khai các widget theo [nguyên tắc Material Design ](https://material.io/guidelines/). Khi thiết kế giao diện người dùng, bạn chỉ có thể sử dụng các widget con từ [thư viện widget chuẩn](https://docs.flutter.io/flutter/widgets/widgets-library.html) hoặc bạn có thể sử dụng các widget con từ [Material Components](https://docs.flutter.io/flutter/material/material-library.html). Bạn có thể kết hợp các widget từ cả hai thư viện, bạn có thể tùy chỉnh các widget hiện có, hoặc bạn có thể xây dựng bộ widget tùy chỉnh của riêng bạn.

Đối với ứng dụng không phải Material, bạn có thể thêm widget con Center vào phương thức build() của ứng dụng:

```
// This app doesn't use any Material Components, such as Scaffold.
// Normally, an app that doesn't use Scaffold has a black background
// and the default text color is black. This app changes its background
// to white and its text color to dark grey to mimic a Material app.
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Colors.white),
      child: Center(
        child: Text('Hello World',
            textDirection: TextDirection.ltr,
            style: TextStyle(fontSize: 40.0, color: Colors.black87)),
      ),
    );
  }
}
```
Lưu ý rằng, theo mặc định, ứng dụng không phải Material không bao gồm màu AppBar, tiêu đề hoặc màu nền. Nếu bạn muốn các tính năng này trong ứng dụng không phải Material, bạn phải tự xây dựng chúng. Ứng dụng này thay đổi màu nền thành trắng và văn bản thành màu xám đậm để bắt chước ứng dụng Material.

Khi bạn chạy ứng dụng, bạn sẽ thấy:
![](https://images.viblo.asia/3297ad85-89f7-41d4-bdb7-cccd4178fee2.png)

Còn tiếp.....

Nguồn: https://flutter.io/docs/development/ui/layout#flutters-approach-to-layout