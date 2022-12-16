# Lời mở đầu
Màn làm quen cô nàng FLutter ở [Phần 1](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM) đã gieo rắc vào đầu chúng ta quá nhiều điều bí ẩn về nàng Flutter. Vậy mới thú vị và xứng đáng để chúng ta bỏ công tìm hiểu và chinh phục. Trong số những bí ẩn đó, phải kể đến là `StatelessWidget`, `Key`, `BuildContext`. 
```dart
// trích lại 1 phần code trong phần 1
class ColumnWidget extends StatelessWidget {
  const ColumnWidget({Key key,}) : super(key: key); // Key là gì?

  @override
  Widget build(BuildContext context) { // BuildContext là gì?
  ...........................
```

StatelessWidget thì đã được làm sáng tỏ trong phần 2:  [StatefulWidget vs StatelessWidget. Khi nào thì cần sử dụng cái nào?](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-2-statefulwidget-vs-statelesswidget-khi-nao-thi-can-su-dung-cai-nao-ORNZq12rZ0n). Bây giờ, chúng ta sẽ tiếp tục tìm hiểu về `BuildContext`.
# 1. Tình huống
Giả sử chúng ta đang đối mặt với 1 yêu cầu thế này: Làm cái app có 1 màn hình, ở giữa màn hình có cái button. Click vào button đó sẽ show snackbar nội dung: *"Không thể truy cập bài viết này vì thấy hay mà không vote"*. Okay, app khá đơn giản. Trước khi bắt tay vào làm, chúng ta cần biết cách show 1 snackbar trong Flutter. Google phát ra cái doc hướng dẫn ngay: https://flutter.dev/docs/cookbook/design/snackbars#2-display-a-snackbar 
```dart
final snackBar = SnackBar(content: Text('Tui là SnackBar')); // tạo ra widget SnackBar, sử dụng thuộc tính `content`
// Find the Scaffold in the widget tree and use it to show a SnackBar. // Khoan quan tâm đến comment này
Scaffold.of(context).showSnackBar(snackBar); // một hàm static để show widget SnackBar trên
```
Ngay từ phần 1, mình đã nói rằng chúng ta sẽ dành phần lớn thời gian vào việc code Widget. Chính vì vậy mà việc am hiểu các Widget và các property đi kèm với mỗi Widget sẽ giúp bạn code Flutter rất nhanh. Nếu như việc xem hơn cả 100 cái Widget trong Flutter sẽ khiến bạn dễ quên và dễ confuse vì có nhiều Widget na ná như nhau thì đây cũng là một cách học Widget và property - cách học tới đâu hay tới đó =)). Sau mỗi lần đọc được đoạn code Widget gì, property gì hay ho thì note lại, dần dần theo thời gian sẽ trở thành master thôi :D

Còn đây là code của app trên, dăm ba cái code Flutter, toàn là Widget easy á mà. Mấy widget này đã được mình [giới thiệu ở phần 1](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM#_6-gioi-thieu-mot-vai-widget-6) hết rồi :D
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FlatButton(
          child: Text('show snackbar'),
          color: Colors.pink,
          onPressed: () {
            // xử lý show snackbar khi click
            final snackBar = SnackBar(content: Text('Không thể truy cập bài viết này vì thấy hay mà không vote'));
            Scaffold.of(context).showSnackBar(snackBar);
          },
        ),
      ),
    );
  }
}
```

Khi build app lên ta nhận được giao diện thế này.

![](https://images.viblo.asia/ca5abe08-5036-47f1-b9fd-5b3d5b72c938.PNG)

Khi click vào button màu hường kia thì snackbar ko thấy đâu mà chỉ cái cái lỗi đỏ lè trên console với nội dung:
```dart
Scaffold.of() called with a context that does not contain a Scaffold.
```

Tạm dịch: hàm `Scaffold.of()` được gọi với một cái `context`, mà cái `context` này nó không chứa widget `Scaffold` nào cả.

Để điều tra nguyên nhân gây ra lỗi. Tất nhiên việc đầu tiên là phải click vào bên trong hàm  `Scaffold.of(context)` xem. Bên trong nó có nói công dụng của hàm này là: *"Mi truyền vào cho ta một biến `context`, ta sẽ giúp mi tìm trong những widget cha của mi, người cha mà có type là Scaffold và gần mi nhất"*. 

Ái chà, căng à nha. Rúc cột thì `context` là cái gì mà nó gây ra cái lỗi trên vậy. Đây, có ngay đây :D
# 2. BuildContext là gì
`BuildContext` được Flutter trao cho đôi mắt thiên lý nhãn. Với đôi mắt thần thánh này, nó sẽ biết widget này được đặt ở vị trí nào trên widget tree. Hay nói cách khác, một BuildContext như là một tham chiếu (reference) đến cái vị trí của widget (widget's location) trong widget tree. Như chúng ta đã biết ở bài trước, mỗi loại widget đều có hàm `build()`, mỗi hàm `build` đều nhận 1 `BuildContext` làm argument. Như vậy mỗi Widget đều có 1 `BuildContext` đại diện cho vị trí của chính Widget đó trên widget tree.

À nói đến đây thì ta đủ hiểu rồi. Nguyên nhân là do ta truyền sai context (tức là ta truyền sai vị trí để hàm `Scaffold.of()` bắt đầu tìm kiếm). Do ta truyền vào `context` của `MyHomePage`, nên hàm `Scaffold.of` sẽ đi tìm từ vị trí `MyHomePage` tìm lên trên các widget cha để xem có widget nào là `Scaffold` không. Tất nhiên là không có thằng nào rồi, vì `MyHomePage` chỉ có 2 widget cha là `MyApp` và `MaterialApp`, 2 thằng này đâu phải `Scaffold`. 
```dart
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) { // thủ phạm chính là context của MyHomePage trong hàm build của MyHomePage
  ....
  
     Scaffold.of(context).showSnackBar(snackBar); // truyền sai context rồi
```

Triệu lời giải thích cũng không bằng 1 tấm ảnh màn đối thoại giữa cha con chúng nó. Màn đối thoại bắt đầu bởi người con `FlatButton`.

![](https://images.viblo.asia/5d96e00c-110d-40e8-aa6a-d2fb339c4416.png)

# 3. Fix bug
Tất nhiên, bug do truyền sai `context` thì cách fix sẽ là truyền đúng `context` vào hàm `Scaffold.of` rồi :D

Rất đơn giản, chỉ cần [extract thằng FlatButton ra class riêng](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM#_72-extract-ra-class-widget-rieng-9) đặt tên là `MyButtonWidget` để sử dụng cái `context` của `MyButtonWidget` trong chính hàm `build` của nó. Vậy cái `context` của `MyButtonWidget` chính là cái ta cần, vì từ `context` đó, `Scaffold.of` sẽ tìm thấy được widget cha `Scaffold` gần nhất.
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold( // Scaffold đang là cha của MyButtonWidget
      body: Center(
        child: MyButtonWidget(),
      ),
    );
  }
}

class MyButtonWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) { // từ context của MyButtonWidget sẽ tìm được widget Scaffold cha gần nhất
    return FlatButton(
      child: Text('show snackbar'),
      color: Colors.pink,
      onPressed: () {
        final snackBar = SnackBar(content: Text('Lỗi không thể truy cập bài viết này vì thấy hay mà không vote'));
        Scaffold.of(context).showSnackBar(snackBar); // truyền vào context của MyButtonWidget
      },
    );
  }
}
```

Tèn tén ten, SnackBar đã được show :D

![](https://images.viblo.asia/fda7cbbc-da64-4327-8b10-97d586c788ba.gif)

Ơ thế tui không thích extract widget `FlatButton` mà extract widget `Center` ra class riêng thì có fix được bug không. Tất nhiên là được rồi. Dễ hiểu mà, khi extract widget `Center` ra class riêng đặt tên là `MyCenterWidget` thì lúc này `Scaffold.of(context)` sẽ sử dụng `context` của `MyCenterWidget` mà `MyCenterWidget` vẫn là con của widget `Scaffold` nên nó sẽ tìm thấy widget `Scaffold` cha gần nó nhất :D

Ơ thế nếu extract widget `Scaffold` ra class riêng là `MyScaffoldWidget` rồi sử dụng context của `MyScaffoldWidget` cũng fix được bug luôn hả. Theo các bạn nghĩ có fix được không. Xem như đây là thử thách nhỏ dành cho các bạn. Mình sẽ trả lời thầm kín ở phần comment của bài viết này nhé :D.

Thế giờ tui không thích extract widget ra class riêng thì fix được không. Sao lại không, thoải mái luôn. Khi đó có một widget gọi là `Builder` sẽ support chúng ta. Cụ thể chúng ta sẽ sử dụng widget Builder để wrap widget FlatButton hoặc wrap widget Center lại.
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Builder( // widget Builder wrap widget FlatButton
           // sử dụng thuộc tính builder
           // truyền vào 1 biến hàm có type: Widget Function(BuildContext context)
          builder: (context) => FlatButton(
            child: Text('show snackbar'),
            color: Colors.pink,
            onPressed: () {
              final snackBar = SnackBar(content: Text('Lỗi không thể truy cập bài viết này vì thấy hay mà không vote'));
              Scaffold.of(context).showSnackBar(snackBar);
            },
          ),
        ),
      ),
    );
  }
}
```

Cũng thêm 1 thử thách nhỏ nữa là nếu tui sử dụng widget `Builder` wrap widget `Scaffold` lại thì có fix được bug không?. Câu trả lời ở phần comment lun nhé :D
# 4. Ở một bài toán khác
Okay, xử xong ví dụ trên rồi, giờ ta đến ví dụ khác về `BuildContext` nhé.

Ngay khi bạn tạo mới 1 project Flutter, Flutter sẽ code sẵn cho chúng ta 1 app là Counter đúng không?. Trong đống code này, ở widget `MaterialApp` có sử dụng 1 property là `theme` truyền vào một `ThemeData`.

![](https://images.viblo.asia/5bf728f1-46c9-49e9-8d8a-866dc15f54c8.PNG)

Mục đích chính để sử dụng `theme` là **tạo ra 1 style chung và share cái style đó đến các widget khắp widget tree**. Tức là trong ví dụ trên thằng widget ông tổ là `MaterialApp` tạo ra 1 style có màu chủ đạo là màu xanh blue. Và nó có cách để chia sẻ màu xanh blue này đến các widget con, cháu, chắt sử dụng luôn. Cứ như vậy cả app sẽ sử dụng 1 tông màu đồng nhất. Tránh màu mè hoa lá cành, mỗi màn hình mỗi màu. So beautiful!

Bây giờ, bạn hãy tạo 1 project Flutter mới rồi run app Counter đi, bạn sẽ thấy tông màu chủ đạo là màu xanh blue. Tiếp đến bạn thử replace code `theme` đó bằng:
```dart
theme: ThemeData(
     primaryColor: Colors.pink, // sử dụng màu hồng thay cho màu xanh blue
)
```

Và trong widget `FloatingActionButton` có sẵn trong app Counter, bạn thêm 1 property `backgroundColor: Theme.of(context).primaryColor,` để set màu background cho `button dấu +`. Từ từ rồi mình sẽ giải thích hàm `Theme.of(context)` nhá, cứ thêm vào trước đã :D
```dart 
floatingActionButton: FloatingActionButton(
        backgroundColor: Theme.of(context).primaryColor, // thêm dòng code này vào
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
)
```

Run app lên, bạn sẽ thấy `button dấu +` có màu hồng. 

![](https://images.viblo.asia/815b4828-6fd2-4552-b62c-0cc8524d56f1.PNG)

Okay bây giờ bạn thử sửa lại màu sắc trong `theme`:
```dart
theme: ThemeData(
     primaryColor: Colors.green, // sửa màu hồng thành màu xanh lá cây
)
```

Click vào hot reload hoặc run lại, bạn sẽ thấy `button dấu +` có màu xanh lá cây. Nếu bây giờ bạn sửa lại trong `ThemeData` là `primaryColor: Colors.red` thì `button dấu +` sẽ có màu đỏ :D

Wow, thì ra thằng `MaterialApp` nó giữ cái data là `theme` truyền vào biến `ThemeData`. Trong biến `ThemeData` nó định nghĩa ra các màu sắc chủ đạo sử dụng trong app bằng các data như `primaryColor`. Và các widget con hay cháu chắt chút chít muốn nhận cái data `primaryColor` này thì sử dụng hàm `Theme.of(context)` truyền cái `context` vào. Hàm `Theme.of` sẽ từ vị trí `context` đó tìm lên các widget cha, widget cha nào có `ThemeData` gần nhất, nó sẽ sử dụng cái theme đó của cha nó. Đó là ý tưởng share theme từ widget cha đến các widget con, cháu trong widget tree. Triệu lời giải thích cũng không bằng tấm hình dưới đây :D

![](https://images.viblo.asia/d7e995ca-a83a-4596-8101-73221ec6e05c.PNG)

Hàm `Theme.of` truyền `context` vào, từ cái vị trí context đó, nó sẽ tìm đến widget cha gần nhất có khai báo `theme`. Thằng `widget ông tổ` trên cùng đó có khai báo `theme` và sử dụng màu blue nhưng do nó ở xa hơn thằng `widget ông nội` có xanh lá cây ở giữa, cũng có khai báo `theme` nên cuối cùng thằng `widget con` nó quyết định sử dụng của thằng cha gần nó nhất chính là màu xanh lá cây của `widget ông nội`.

Ở một góc nhìn khác, thì thằng `widget ông nội` đã truyền data `màu xanh green` thẳng trực tiếp xuống `widget con` luôn, chứ không cần sử dụng constructor truyền qua `widget cha`, rồi từ `widget cha` mới truyền tới `widget con` giống như [kỹ thuật truyền data được mình giới thiệu trong phần 2](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-2-statefulwidget-vs-statelesswidget-khi-nao-thi-can-su-dung-cai-nao-ORNZq12rZ0n#_4-statelesswidget-4) nữa. Amazing!
# 5. Và nhiều bài toán nữa
Hey, chẳng phải trong [đoạn kết ở phần 2](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-2-statefulwidget-vs-statelesswidget-khi-nao-thi-can-su-dung-cai-nao-ORNZq12rZ0n#_ket-thuc-mo-7), chúng ta đã tự đặt ra câu hỏi: 

*"Nếu cái Widget Tree, nó rất là sâu thì khi ta muốn truyền data từ Widget ông tổ xuống tận cháu, chắt, chút, chít phải tạo sử dụng constructor từ ông tổ xuống ông cố, rồi xuống tiếp ông nội, xuống tiếp bố, xuống tiếp con, ... Sao phải cực thế, trong khi ta muốn truyền thẳng từ ông tổ xuống cháu, chắt luôn. Có cách nào không?"*. 

Nghe có vẻ giống ví dụ về `Theme` ở trên nhỉ, thằng widget cháu nhận được `Theme` trực tiếp từ widget ông nội mà ông nội ko cần phải truyền từ ông nội → ba → con → cháu.

Thẳng thắng đi, chắc chắn cách giải sẽ giống bài toán `Theme` ở trên, nó sẽ sử dụng ý tưởng của `BuildContext`. Ý tưởng này được support bởi 1 loại Widget nữa là `InheritedWidget`, chúng sẽ giúp chúng ta giải quyết bài toán quản lý state trong 1 cây Widget khá là đẹp và gọn. Ngoài ra, ý tưởng của `BuildContext` còn sử dụng trong việc di chuyển giữa các màn hình nữa (navigation). Những nội dung cực kỳ hấp dẫn này mình sẽ chia sẻ ở những bài tiếp theo nhé :D.
# Lời kết
Đây mới chỉ là lần lột trần nàng Flutter đầu tiên, những lần sau sẽ cố gắng lột hết rồi mới dám lâm trận các bạn ạ =)). Thật sự viết lý thuyết và code demo từng chút nhỏ vậy cũng không phê lắm, muốn lâm trận bằng dự án thiết thực luôn cơ. Mình cũng đấu tranh dữ lắm giữa lột tiếp hay lâm trận luôn, nhưng có câu: *"Ta vung kiếm 1 bài nhưng mài kiếm mười mấy bài - Tư Mã Ý"*. Cứ mài kiếm cho bén vào, đảm bảo nàng sẽ đổ ngay trong lần vung kiếm đầu tiên =)). Kiên trì ắt sẽ có thiên hạ :D

*Lại cứ phải note nhẹ: Click follow để nhận thông báo khi có bài viết mới nhé =))*

Đọc tiếp phần 4: [Phần 4: Lột trần InheritedWidget](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-4-lot-tran-inheritedwidget-3P0lPDbmlox)

Tham khảo: Flutter in Action của tác giả Eric Windmill