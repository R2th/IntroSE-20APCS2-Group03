# Lời mở đầu
Ở [bài trước](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM), chúng ta đã dừng lại ở một [kết thúc mở](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM#_ket-thuc-mo-10). Từ đó mọc lên trong đầu ta biết bao nhiêu câu hỏi: `State` là gì?, `StatefulWidget` là gì?, `StatelessWidget` là gì?, hàm `build` trong `StatelessWidget` đó là gì. Okay, hôm nay ta sẽ đi tìm câu trả lời thỏa mãn sự tò mò đó. Bắt đầu với hàm `build` nhé :D
# 1. Data của Widget
Ở bài trước, chúng ta đã hình dung được `Widget` là gì, Widget là những cái `Text`, những cái `Button`. Bản thân mỗi Widget, nó sẽ mang trong mình những **thông tin** để có thể hiển thị trên UI. Và trong lập trình thì **thông tin** sẽ được hình thành từ **data** mà data thì được lưu trữ trong các biến (variable) hoặc hằng (constant). Ví dụ widget `Text` thì có những thông tin nào nhỉ, tất nhiên là một biến `text` kiểu `String` để lưu trữ cái text rồi, bên cạnh đó chắc chắn cũng sẽ có những biến kiểu như `textColor` lưu trữ thông tin về màu sắc của text, `fontSize` thể hiện cho kích thước font chữ, bla, bla.

Chúng ta cũng được biết trong bài trước, `Widget` đơn giản là những `class`. Ví dụ: `class Text`. À ra là như vậy, nếu liên kết những yếu tố này lại ta có thể hình dung một **class Widget** có những **property** lưu trữ và thể hiện những thông tin của Widget như thế này:
```dart
class Text { // Widget chỉ là class
    String text; // các property lưu trữ thông tin của widget
    Color textColor; // thông tin về màu sắc của text
    int fontSize; // thông tin về kích cỡ của font
}
```

Well, *thông tin* là những gì user nhìn thấy và đọc được trên màn hình. Dưới góc độ lập trình viên thì ta hay sử dụng từ `Data` hơn. Vì vậy, từ bây giờ trở đi mình sẽ dùng từ `Data` của Widget. Các bạn sẽ hiểu là từ những `Data` này tạo nên *thông tin* của Widget nhé.
# 2. Hàm build
Bạn có biết công thức toán học quen thuộc `y = f(x)`. Đó là một hàm số, khi ta có giá trị của `x`, dựa vào một function `f` ta sẽ tính được giá trị `y`. Bất cứ khi nào `x` thay đổi thì cũng cho ta một giá trị mới của `y` đúng ko. Flutter cũng tương tự như vậy, nó sử dụng công thức là:

>UI = f(Data)

Khi Data của Widget thay đổi, UI sẽ được update theo công thức hàm `f`. 

![](https://images.viblo.asia/dbb90133-834b-4575-95a4-593e6828cdc2.gif)

Các bạn thấy khi mình click vào button màu xanh đó thì UI được thay đổi hiển thị con số khác đúng ko. Con số 0, 1, 2, 3, ... đó chính là `Data` của Widget. `Data` đó được lưu trữ trong một biến có kiểu `int`. Khi `Data` thay đổi nó sẽ thay đổi UI theo công thức hàm `f`. 

Công thức hàm `f` ở đây chính là hàm `build` trong `StatelessWidget` trong [đoạn kết của bài 1](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM#_ket-thuc-mo-10)
```dart
class CounterTextWidget extends StatelessWidget {
  int counter; // Data của widget được lưu trữ trong property có kiểu int

  @override
  Widget build(BuildContext context) { // function f chính là hàm build này
    // hàm build là một công thức, nhận Data từ biến counter
    // mỗi lần biến counter thay đổi từ 0 lên 1, 2, 3, 4,... thì ta sẽ hiển thị 1 UI khác
    return Text('Tui là widget Text. Data của tui hiện tại là $counter');
  }
}
```

Như vậy, chúng ta đã hình dung được `Data` của Widget và hàm `build` và mối quan hệ `UI = build(Data)`. Đây chính là nguyên tắc hoạt động của Flutter. Chúng ta sẽ đi đến định nghĩa kế tiếp về `State`.
# 3. State là gì
Giả sử như bây giờ, bạn tự tạo ra một cái Widget là cột đèn giao thông đi. Cột đèn giao thông sẽ có những *thông tin* nào nhỉ: 
1. Chiều cao của cái cột được lưu trữ trong một biến có kiểu `int`. Thông tin này không bao giờ thay đổi. Ví dụ cái cột đèn giao thông ban đầu cao 3m, thì 10 năm sau cũng sẽ cao 3m chứ nó không thể tự cao lên theo năm tháng được. Nếu nó bị lùn đi thì có chăng nó bị đập phá (Widget die) =))
2. Màu sắc đang hiển thị trên đèn kiểu `Color`, lúc đang hiển thị màu đỏ, lúc thì đèn vàng bật, lúc thì đèn xanh. Đây là một thông tin có thể thay đổi, cứ 1 vài giây hay vài chục giây thì nó thay đổi một lần. Nếu mà màu đèn nó không thay đổi thì có chăng là đèn bị hư (Widget die) =))

Như vậy cái class được mình đặt tên là `TrafficLightWidget` này có 2 property là `height` (chiều cao của cột đèn giao thông) và `currentLight` (màu đèn hiện tại). Biến `height` có 1 giá trị *mãi mãi không thay đổi* nên sẽ khai báo `final height`, biến `currentLight` *có thể thay đổi được* bằng cách gán lại giá trị mới nên khai báo `var currentLight` hoặc `Color currentLight`.

```dart
class TrafficLightWidget {
  final height = 3; // height này cố định ko thay đổi nên để final
  Color currentLight = Colors.red; // màu đèn sẽ thay đổi từ đỏ, vàng, xanh
}
```
Như vậy, có thể phân chia data của Widget thành 2 loại: Thông tin có thể thay đổi và thông tin không thể thay đổi.

Còn đây là định nghĩa đơn giản, ngắn gọn nhất về `State`:

> **State là thông tin thể hiện trên Widget mà có thể thay đổi trong suốt thời gian sống sót trên đời của Widget**

Trong cái widget cột đèn giao thông đó thì cái data `currentLight` đó chính là state vì nó thay đổi được. Khi nó thay đổi thì widget `TrafficLightWidget` phải build lại giao diện khác. Ví dụ `currentLight = Colors.red` thì widget hiển thị đèn đỏ. Khi `currentLight` thay đổi thành  `currentLight = Colors.green` thì widget phải build lại để hiển thị đèn xanh. Còn cái `height` chỉ là data bình thường, không phải là state vì nó luôn không đổi, cái cột đèn sẽ mãi mãi cao 3 mét.

![](https://images.viblo.asia/424c3771-f862-42b7-9c02-b43c1dbda6c4.gif)

Các data có thể thay đổi được này, được quản lý trong một class có tên là [State](https://api.flutter.dev/flutter/widgets/State-class.html) tách biệt với class `Widget` giống như thế này:
```dart
class TrafficLightWidget {
    final height = 3; // height này cố định ko thay đổi nên để final
}

// State được quản lý trong class riêng này
class State {
    Color currentLight = TrafficLightColor.red; // màu đèn sẽ thay đổi từ đỏ, vàng, xanh
}
```

Vì sao cần có sự tách biệt này, đọc hết [bài 5](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-5-co-nang-flutter-hoat-dong-nhu-the-nao-3Q75w1G7ZWb) các bạn sẽ rõ. Giải thích ra dài dòng lắm, bây giờ chỉ tạm hiểu là Flutter tuân thủ một nguyên tắc trong lập trình là: *"mỗi class mỗi trách nhiệm" ([Single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle))*

Okay, mình đã hiểu có Data, có công thức là hàm `build` thì mình sẽ xây được UI. Khi Data thay đổi, hàm `build` sẽ được gọi lại để update UI (chúng ta gọi đây là rebuild Widget). Có 2 loại widget là `StatefulWidget` và `StatelessWidget`, loại nào cũng có hàm `build` nhưng cách chúng gọi hàm `build` để update UI là khác nhau:

1. Một là: `StatefulWidget`, bản thân Widget này sẽ chủ động update UI.
1. Hai là: `StatelessWidget`, bản thân Widget này sẽ thụ động update UI, hay nói cách khác là bị Widget khác ép phải update UI.

Như thế nào là chủ động, như thế nào là bị ép. Chúng ta sẽ đến với cách đầu tiên, chủ động update UI sử dụng `StatefulWidget`.
# 4. StatefulWidget
Khi đã hiểu khái niệm về `State` rồi thì `StatefulWidget` là chỉ đơn giản là một Widget mà **CÓ State** tức là nó có data có thể thay đổi được. Khi state thay đổi, nó sẽ gọi lại hàm `build` để rebuild widget. Nhờ đó mà UI thay đổi.

Đây là cấu tạo của một `StatefulWidget`:

```dart
class TrafficLightWidget extends StatefulWidget { // 1
  final height = 3; // mọi data trong class Widget phải immutable
  // data nào mutable xin mời qua class khác, là class State bên dưới :D

  // khi StatefulWidget được khởi tạo nó sẽ gọi hàm createState để tạo 1 object State
  @override
  State<StatefulWidget> createState() {
    return TrafficLightState();
  }
}

// khi object Widget gọi hàm createState thì object State ra đời
class TrafficLightState extends State<TrafficLightWidget> { // 2
  var currentLight = 'đỏ';

  // hàm build
  @override
  Widget build(BuildContext context) {
    return Text('Đèn cao ${widget.height} mét và đèn đang có màu $currentLight'); // 3
  }
}
```

Cấu tạo của `StatefulWidget` có gì:
1. Một class là `TrafficLightWidget` kế thừa `StatefulWidget`. Mình gọi class này là class Widget. Trong class Widget, mọi data phải khai báo immutable. Mấy thằng data mà mutable thì đẩy qua class `State` quản lý như ở mục trên mình đã nói.
2. Một class là `TrafficLightState` kế thừa class `State`. Class này dùng để quản lý các `State` của `StatefulWidget` đó. Trong class này override lại hàm `build()`. Hàm `build` này trả về một `Widget`, nó giúp Flutter biết phải vẽ widget `TrafficLightWidget` như thế nào trên screen. Nói chung hàm `build` này công dụng giống y chang hàm `build` trong `StatelessWidget` đã được giới thiệu ở trên. Như vậy một `StatefulWidget` cần tới 2 class là: class Widget và class State.
5. Trong class `State` có một biến là `widget`, nhờ biến này ta có thể get data từ class `Widget`. Như trong VD trên mình đã get được biến `height` của class `TrafficLightWidget` hết sức đơn giản, chỉ cần gọi `widget.height`. Đây là cách giao tiếp giữa 2 class `Widget` và `State`

Vậy làm thế nào để nói Flutter biết nó cần update UI?. Bên trong class `State` có hàm `setState`. Hàm `setState` cho phép bạn set lại giá trị `state` mới (VD set state sang màu vàng, màu xanh). Sau đó nó sẽ gọi lại hàm `build` để rebuild lại `StatefulWidget` đó bao gồm cả subwidgets lun. Vâng đúng vậy, nó vẽ lại từ widget đó đến hết subtree của widget đó luôn. Cụ thể thế nào thì đến phần `StatelessWidget` bạn sẽ rõ nhé :D
```dart
setState(() { // sử dụng hàm setState để set state mới và ra lệnh rebuild Widget
     currentLight = 'vàng'; // state đã thay đổi từ 'đỏ' sang 'vàng'.
}); // hàm setState đã gọi lại hàm build để build lại UI mới rồi đó!
```

Tóm lại, ban đầu khi khởi tạo `StatefulWidget`, hàm `build` đã được gọi một lần đầu tiên, và nó nhận `default state ` để update UI: `UI = build(default state)`. Mỗi lần chúng ta gọi hàm `setState` thì nó sẽ gọi lại hàm `build` để update UI mới: `UI = build(new state)`

Well, mọi lý thuyết chỉ là màu xám nếu không có thực hành. Giờ ta sẽ code demo cái App Counter ở mục 1 xem. Thật ra ứng dụng Counter này lúc tạo mới project, Flutter đã code sẵn rồi, mình chỉ xóa bớt code cho nó dễ hiểu hơn thôi. Có giải thích code trong code lun nhé :D

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHomePage(),
    );
  }
}

// Đây là một StatefulWidget
class MyHomePage extends StatefulWidget {
  @override
  MyHomePageState createState() => MyHomePageState();
}

// Đây là class State của StatefulWidget MyHomePage
class MyHomePageState extends State<MyHomePage> {
  int counter = 0; // Data của Widget

  @override
  Widget build(BuildContext context) { // hàm build
    return Scaffold(
      body: Center(
        // data là biến counter được truyền vào hàm build - công thức UI = build(Data)
        child: Text('Tui là widget Text. Data của tui hiện tại là: $counter')
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () { // khi click button màu xanh blue
          setState(() { // ta sẽ gọi hàm setState
            counter++; // để gán lại giá trị mới cho biến counter
            // bên trong hàm setState này sẽ tự động gọi lại hàm build nên UI được update (rebuild)
          });
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
```

Đây là thành quả:

![](https://images.viblo.asia/dbb90133-834b-4575-95a4-593e6828cdc2.gif)

Ví dụ trên của mình cũng tương tự như ví dụ App Counter mà khi tạo 1 project, Flutter đã code sẵn cho bạn. Bạn thử khám phá xem code App Counter đó hoạt động thế nào nhé :D

![](https://images.viblo.asia/7c4eface-3b64-484b-ae6d-c2c7ba4f67dc.PNG)

Như vậy, mình vừa trình bày xong một trong 2 cách để update UI khi data thay đổi. Sử dụng `StatefulWidget`, chúng ta có thể chủ động update UI bằng hàm `setState`

Bây giờ, chúng ta tiếp tục với cách 2, Widget bị ép phải update UI, ta sẽ sử dụng `StatelessWidget`.
# 5. StatelessWidget
Bây giờ thử [extract widget Text trong ví dụ trên ra một class khác](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM#_72-extract-ra-class-widget-rieng-9) đặt tên là `MyText`. Sau khi extract thì `MyText` sẽ là một `StatelessWidget` như thế này.
```dart
// Extract widget Text ra được 1 StatelessWidget
class MyText extends StatelessWidget {
  // constructor để nhận data từ widget cha
  MyText({this.counter});

  // data nhận được qua constructor là không thể thay đổi (bất biến)
  final int counter;

  @override
  Widget build(BuildContext context) {
    // data nhận được sẽ update UI
    return Text('Tui là widget Text. Data của tui hiện tại là: $counter');
  }
}
```

Well, nếu `StatefulWidget` là widget mà CÓ State thì `StatelessWidget` đơn giản là một Widget **KHÔNG CÓ State**. Tức là nó chỉ có data không thể thay đổi (data bất biến như final data, const, ...). Như trong code trên thì nó chỉ có 1 data không thể thay đổi là `final int counter`. 

Thật ra mình dùng từ **chỉ có data bất biến** ở đây không đúng lắm. Vì bạn ko thích khai báo `final` mà thích khai báo `var` để data đó có thể thay đổi thì cũng được luôn nhé. Nhưng data đó vô dụng thôi, data đó có thay đổi cũng vô ích thôi vì bản thân `StatelessWidget` không có hàm `setState` để nói widget chủ động rebuild lại UI đâu. Nó chỉ biết nhận data từ Widget ngoài truyền vào constructor của nó rồi nhận lấy data đó để show lên UI mà thôi. Đó gọi là thụ động update vì data của `StatelessWidget` không thể tự update được mà được thằng khác tryền qua constructor như thế này:
```dart
class MyHomePageState extends State<MyHomePage> {
  int counter = 0; // Data của Widget

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        // MyText là một StatelessWidget, nó nhận data trong biến counter qua constructor
        child: MyText(counter: counter), 
      ),
```

*Full source code trong link này*: https://dartpad.dev/6a9c0a13992f47226ea04920d2945d19

Kết quả y hệt code demo trong phần `StatefulWidget`.

![](https://images.viblo.asia/dbb90133-834b-4575-95a4-593e6828cdc2.gif)

Giải thích đoạn code trong link full source code: 
1. Kỹ thuật sử dụng constructor để **truyền data từ widget cha xuống widget con** người ta gọi là *Passing state down*. `StatelessWidget` nhận được `State` của `StatefulWidget` thông qua constructor.
2. Bạn có thấy rằng, khi widget `MyHomePage` là một `StatefulWidget`, khi nó `setState` mới mà thằng widget con của nó là `MyText` được rebuild lại để update UI mới. Đúng như trong phần `StatefulWidget` mình đã nói là nó sẽ rebuild cả sub widgets.
3. Lý do mình vẫn giữ `MyHomePage` là `StatefulWidget` trong đoạn code trên là vì như mình đã nói `StatelessWidget` bản chất ko thể tự thay đổi UI mà bị widget cha ép phải thay đổi hay nói cách khác là update UI một cách thụ động. Nếu trong app chỉ toàn `StatelessWidget`, toàn do bị ép, vậy thì ai là người ép. Trong ví dụ này thì `StatefulWidget` là người ép nên cần phải giữ lại ít nhất 1 `StatefulWidget` ở trên top như vậy. Nếu `MyHomePage` trong đoạn code trên cũng là một `StatelessWidget`, thì app này ko có bất kỳ một `StatefulWidget` nào nên ko sử dụng được hàm `setState`. Vì vậy, khi đó app này sẽ không thể nào thay đổi được UI và biến `counter` sẽ mãi mãi hiển thị là 0 trên màn hình.

Túm cái quần lại là: 

>`StatefulWidget` là Widget có `State`, còn `StatelessWidget` là widget không có `State`. Vì `StatefulWidget` có `State` nên data trong `StatefulWidget` có thể thay đổi được và nó có thể chủ động update UI bằng hàm `setState`. Còn data trong `StatelessWidget` không thể thay đổi được nên nó muốn update được UI thì phải nhờ thằng cha (có thể là một `StatefulWidget` nào đó) có khả năng thay đổi data giúp nó rồi truyền data xuống lại cho nó thông qua constructor.

Chính vì, `StatelessWidget` không có `State`, còn `StatefulWidget` thì đã có 1 class khác quản lý `State` rồi nên: 
>Mọi data trong cả class `StatelessWidget` và `StatefulWidget` đều phải khai báo immutable nhé

Well, trong ví dụ trên nếu `MyText` không phải là một `StatelessWidget` mà là một `StatefulWidget` thì nó có hoạt động đúng không. Đúng chứ sao lại không!. `StatefulWidget` nó cũng có constructor vậy nên nó cũng biết nhận data từ Widget cha chứ :D

Check this link này để kiểm tra khi `MyText` là một `StatefulWidget`: https://dartpad.dev/dcebc401809ad860721768d03aa0937b

Có thể bạn sẽ thắc mắc rằng, đã có `StatefulWidget` đầy sức mạnh, có thể cân luôn mọi tính năng của `StatelessWidget`, thì cần gì `StatelessWidget` nữa. Sao không chỉ sử dụng `StatefulWidget` hết cho khỏe, đỡ phải suy nghĩ khi nào thì dùng cái nào. Câu hỏi này cũng tương tự như là hỏi: Tại sao lại cần `ImmutableList` trong khi `MutableList` có thể làm được tất cả mọi thao tác về `List`. Thứ nhất khi một thứ gì đó như data chẳng hạn mà bạn chỉ muốn nó read-only thì **tuyệt đối đừng sử dụng mutable** vì nó rất dễ sinh bug, nhiều khi mình code làm cho cái data đó thay đổi lúc nào ko hay dẫn đến bug. Thứ 2, bạn thấy code của `StatefulWidget` khá là rắc rối so với `StatelessWidget`, phải tạo tới 2 class, nói cách khác nếu tạo nhiều `StatefulWidget` sẽ có nhiều boilerplate code. Điều này sẽ làm ứng dụng của bạn khó đọc code hơn rất nhiều. Tóm lại, **hãy cố gắng sử dụng StatelessWidget hết mức có thể** - các đồng nghiệp của bạn sẽ rất biết ơn bạn =)). Sau đây là một cái tip giúp bạn ghi điểm với các đồng nghiệp :D
# 6. Khi nào thực sự cần sử dụng StatefulWidget
Đây là sơ đồ khối quyết định 1 data có phải là 1 state trong Widget hay không. Nếu không phải là state thì tất nhiên Widget đó nên là `StatelessWidget` rồi.

![](https://images.viblo.asia/bba861c0-b9de-4338-bae4-d6d89247e994.png)

Giờ mình đi từng ô hình thoi được mình đánh số từ 1 đến 5 đó để giải thích vì sao nó không phải là state nha:
1. Data đó không thay đổi tất nhiên không phải state rồi. Quá rõ ràng, không cần giải thích
2. Trong ví dụ trong phần StatelessWidget cũng thể hiện rõ điều này. Chắc chắn đó là StatelessWidget và data đó là do widget cha truyền xuống mà thôi. Ko phải state
3. State là biến số được truyền vào hàm build để update lại UI. Đằng này biến này không cần thể hiện trên UI nên nó không phải state. Chỉ là một biến private var dùng để tính toán.
4. Nếu chỉ hiển thị đúng 1 lần như mấy cái Icon, Logo thì cần gì sử dụng State. Sử dụng StatelessWidget nhé.
5. Nếu nó là kết quả của một phép tính, ví dụ màn hình hiển thị 2 TextField cho phép nhập 2 số a và b, tính tổng và show kết quả lên Screen thì `a` và `b` là state còn cái tổng kia thậm chí không cần tạo biến làm gì cho phí bộ nhớ, hàm `build` sẽ nhận 2 state là `a` và `b` rồi tính tổng luôn trong đó show kết quả lên là được rồi :D

Bạn vẫn còn cảm thấy khó hiểu lắm đúng không :D. Hãy hình dung khuôn mặt bạn là cái màn hình hiển thị UI của app nhé. Khuôn mặt thì có khi nào bất biến không nhỉ. KHÔNG, nếu có bất biến thì chắc là lúc ngủm củ tỏi rồi. Khuôn mặt phải có TRẠNG THÁI (`State`) như: cười, giận giữ, nghiêm túc, ngủ..., khi trạng thái thay đổi thì sẽ `build` ra những giao diện khuôn mặt khác nhau. Như vậy khuôn mặt là một `root Widget` mà vì nó có `State` nên nó là `StatefulWidget`. Lúc mới mở app lên, khuôn mặt phải có trạng thái default (`default State`) đúng không, chứ ko lẽ khuôn mặt hiển thị trắng xóa như *Slenderman* =)). Bên trong có những `child Widget` như mắt, mũi, miệng,... Bên trong Widget Mắt có những data: màu mắt (ko phải là state vì nó bất biến), trạng thái nhắm mắt hay mở mắt (biến có kiểu bool có thể thay đổi được). Như vậy Widget Mắt cũng có `State`, nhưng nó không nên là `StatefulWidget` nữa, vì thằng cha của nó là Widget Khuôn Mặt đã là `StatefulWidget` rồi. Vậy Widget Mắt nên là `StatelessWidget` và Widget Khuôn Mặt là widget cha của nó sẽ truyền biến bool này cho nó để ép nó update UI. 
# 7. Tổng kết lại kiến thức
Đây là những kiến thức quan trọng trong bài, mình sẽ tổng kết ngắn gọn lại như sau:

1. Scene = f(Data) trong đó `f` là hàm `build` có trong mỗi `StatelessWidget` hay `StatefulWidget`. Flutter hoạt động theo công thức đó: Khi thay đổi Data thì UI sẽ được update. 
2. `State` chính là Mutable data của widget nên `State` là data của Widget mà có thể thay đổi được.
3. `StatefulWidget` là widget có `State`, còn `StatelessWidget` là widget không có `State`. 
4. `StatefulWidget` có thể chủ động update UI bằng cách gọi hàm `setState`. 
5. Data trong `StatelessWidget` không thể thay đổi được nên nó muốn update được UI thì phải nhờ thằng cha là một `StatefulWidget` nào đó có khả năng thay đổi data giúp nó rồi truyền data xuống cho nó thông qua constructor.
6. Mọi data trong class `StatefulWidget` và `StatelessWidget` đều phải là immutable
9. Hãy sử dụng `StatelessWidget` hết mức có thể - các đồng nghiệp sẽ yêu mến bạn.
# Kết thúc mở
Bây giờ, các bạn có thắc mắc rằng: nếu cái Widget Tree kia nó rất là sâu thì khi ta muốn truyền data từ Widget ông tổ xuống tận cháu, chắt, chút, chít phải tạo sử dụng constructor từ ông tổ xuống ông cố, rồi xuống tiếp ông nội, xuống tiếp bố, xuống tiếp con, ... Sao phải cực thế, trong khi ta muốn truyền thẳng từ ông tổ xuống cháu, chắt luôn. Có cách nào không?. Có đó, câu trả lời đã có trong [phần 3](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-3-lot-tran-co-nang-flutter-buildcontext-la-gi-bWrZnmdbKxw) và [phần 4](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-4-lot-tran-inheritedwidget-3P0lPDbmlox) :D

*Lại cứ phải note nhẹ: Click follow để nhận thông báo khi có bài viết mới nhé =))*

Đọc tiếp phần 3: [Lột trần cô nàng Flutter, BuildContext là gì](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-3-lot-tran-co-nang-flutter-buildcontext-la-gi-bWrZnmdbKxw)

Đọc tiếp phần 4: [Phần 4: Lột trần InheritedWidget](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-4-lot-tran-inheritedwidget-3P0lPDbmlox)

Nguồn tham khảo: Beginning App Development with Flutter: Create Cross-Platform Mobile Apps của tác giả Rap Payne