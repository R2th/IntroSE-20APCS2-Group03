# Lời mở đầu
Trong đoạn kết của [phần 2](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-2-statefulwidget-vs-statelesswidget-khi-nao-thi-can-su-dung-cai-nao-ORNZq12rZ0n#_ket-thuc-mo-7), chúng ta đã đối mặt với 1 bài toán: *Làm thế nào để truyền data từ một widget cha nào đó xuống thẳng widget chắt mà không phải sử dụng constructor để truyền xuống từ từ từng widget một*. Và trong [phần 3](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-3-lot-tran-co-nang-flutter-buildcontext-la-gi-bWrZnmdbKxw#_5-va-nhieu-bai-toan-nua-5) thì cách giải bài toán này đã được hé lộ. Đó là sử dụng `BuildContext` kết hợp với `InheritedWidget`. `BuildContext` đã được giải thích trong phần 3. Bây giờ chúng ta sẽ tìm hiểu `InheritedWidget`
# 1. Dựng lại hiện trường
Như thế nào là truyền data xuống từng widget một?. Đơn giản là từ một widget ông muốn truyền data xuống widget cháu. Ta phải truyền sang tay từng người một, từ ông → ba → con → cháu. 

Trong [mục 4. StatelessWidget của phần 2](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-2-statefulwidget-vs-statelesswidget-khi-nao-thi-can-su-dung-cai-nao-ORNZq12rZ0n#_4-statelesswidget-4) mình đã giới thiệu kỹ thuật truyền data từ widget cha xuống widget con thông qua constructor như thế nào. Bây giờ ta sẽ sử dụng lại code trong [mục 4. StatelessWidget của phần 2](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-2-statefulwidget-vs-statelesswidget-khi-nao-thi-can-su-dung-cai-nao-ORNZq12rZ0n#_4-statelesswidget-4)

Mình trích code cũ ra link DartPad để các bạn có thể vào run app và trải nghiệm app mà chúng ta sẽ chạy xuyên suốt bài viết này. Link DartPad: https://dartpad.dev/6a9c0a13992f47226ea04920d2945d19

Còn dưới đây là code sau khi đã giả vờ tạo độ sâu cho widget tree bằng cách [extract widget Center ra 1 class](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM#_72-extract-ra-class-widget-rieng-9) đặt tên là `MyCenterWidget`. Vì sao phải giả vờ tạo độ sâu cho widget tree :v. Bởi vì mình muốn mô phỏng lại hiện trường vụ án rằng chúng ta phải vất vả thế nào mới có thể truyền data từ `MyHomePage` xuống `MyText`. Widget `MyHomePage` muốn truyền data là `counter` xuống widget `MyText` để update UI nhưng lại phải truyền qua widget `MyCenterWidget` trước rồi mới đến được tay widget `MyText`. 
```markdown:dart
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

class MyHomePage extends StatefulWidget {
  @override
  MyHomePageState createState() => MyHomePageState();
}

class MyHomePageState extends State<MyHomePage> {
  int counter = 0; // đây là data sẽ được truyền xuống widget con

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // truyền data `counter` từ widget MyHomePage xuống MyCenterWidget
      body: MyCenterWidget(counter: counter),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            counter++;
          });
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

class MyCenterWidget extends StatelessWidget {
  const MyCenterWidget({Key key, @required this.counter,}) : super(key: key);

  // data này vô nghĩa vì đúng bản chất thì MyCenterWidget ko cần nó
  final int counter;

  @override
  Widget build(BuildContext context) {
    return Center(
       // tiếp tục truyền data từ widget MyCenterWidget xuống MyText
      child: MyText(counter: counter),
    );
  }
}

class MyText extends StatelessWidget {
  const MyText({Key key, @required this.counter}) : super(key: key);

  // chỉ có MyText mới thật sự cần data này
  final int counter;

  @override
  Widget build(BuildContext context) {
    return Text('Tui là widget Text. Data của tui hiện tại là: $counter');
  }
}
```

Đọc comment mình chú thích trong code cũng có thể hiểu. Phương pháp truyền qua từng widget một thế này có 3 nhược điểm rõ là:
1. Chúng ta phải truyền dữ liệu qua các constructor của tất cả các widget trong cây widget đó. May mắn là trong ví dụ này cây Widget của mình chưa sâu chứ nếu nó đủ sâu thế này: MyHomePage truyền xuống MyCenterWidget → WidgetA → WidgetB → WidgetC → WidgetD → MyText thì chúng ta code to tay luôn.
2. Dù cho chúng ta có chấp nhận hy sinh to tay một chút, ráng tạo hết chừng đó constructor, truyền widget qua từng constructor một thì có một điều ko thể chấp nhận được là widget `MyCenterWidget` có data là `counter` mà chẳng để làm gì cả, chỉ để truyền xuống, điều này thật vô nghĩa.
3. Và cuối cùng, quan trọng nhất là khi `MyHomePage` gọi hàm `setState`, nó sẽ rebuild lại sub widget tree, tức là cả `MyCenterWidget` và `MyText` đều được rebuild. Đây là 1 sự lãng phí vì ta chỉ cần widget `MyText` được rebuild để update lại Text mà thôi.

Vậy làm thế nào để khắc phục được 3 nhược điểm trên. Có một loại Widget có thể giúp ta làm điều đó là `InheritedWidget`
# 2. InheritedWidget
InheritedWidget là một nơi lưu trữ data và cung cấp data cho widget con trong widget tree. Tất cả widget con của `InheritedWidget` đều có thể truy cập vào `InheritedWidget` để lấy data. Tức là từ vị trí `InheritedWidget`, bạn không cần thiết phải truyền data xuống từng 1 widget con một nữa mà Widget con ở bất kỳ vị trí nào trên widget tree muốn lấy data từ `InheritedWidget`, sẽ giơ cao cánh tay chộp lấy data mà nó muốn từ InheritedWidget luôn. Nghe quen ko, nếu bạn nào đã đọc phần 3 thì bài toán này giống hệt [bài toán về Theme trong phần 3](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-3-lot-tran-co-nang-flutter-buildcontext-la-gi-bWrZnmdbKxw#_4-o-mot-bai-toan-khac-4) - thằng `widget con` đã nhận được data Theme từ `widget ông nội` mà không cần qua trung gian là `widget cha`.

![](https://images.viblo.asia/98e3c9de-5655-4e5a-9311-b7bee943a4d6.PNG)

Well, tất nhiên nếu bạn chưa đọc phần 3 cũng không sao cả :D. Giờ ta sẽ code và giải thích lại từ đầu chỉ với 2 bước đơn giản:

**Bước 1**: Tạo một InheritedWidget bằng cách kế thừa class `InheritedWidget`, nó sẽ bắt ta override lại hàm `updateShouldNotify` trả về kiểu bool (tí nữa mình sẽ giải thích hàm này sau). Tất nhiên trong này sẽ cần define ra data để mấy thằng widget con muốn lấy thì với tay trực tiếp vào widget này mà lấy :D. Đồng thời tạo 1 hàm static là `of` cho truyền `context` của widget con vào. Dựa vào `context` (tức vị trí của widget con), hàm `of` sẽ đi tìm thấy thằng widget cha có type là `MyInheritedWidget`. Như vậy widget con muốn truy cập vào InheritedWidget để lấy data thì gọi hàm `MyInheritedWidget.of(context)`. Thấy giống hàm `Theme.of(context)` trong [phần 3](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-3-lot-tran-co-nang-flutter-buildcontext-la-gi-bWrZnmdbKxw#_1-tinh-huong-1) chưa. Vì bản chất `Theme` là `InheritedWidget` mà :D

Đây là cách tạo `InheritedWidget`, giải thích code ở dưới :D
```rust:dart
class MyInheritedWidget extends InheritedWidget {
  // 1
  MyInheritedWidget({Widget child, this.myData}) : super(child: child);

  // 2
  final int myData;

  // 3
  @override
  bool updateShouldNotify(MyInheritedWidget oldWidget) {
    return false;
  }

  // 4
  static MyInheritedWidget of(BuildContext context){
    // 5
    return context.dependOnInheritedWidgetOfExactType<MyInheritedWidget>();
  }
}
```

Giải thích code:
1. Là constructor của `MyInheritedWidget`, constructor này nhận ít nhất 2 param: thứ nhất là `child` chính là những widget con của nó - những widget mà sau này sẽ giơ cao cánh tay lên chộp lấy data từ nó đó :D. Thứ 2 là `myData` chính là data mà nó sẽ chia sẻ đến cho các widget con của nó đó.
2. InheritedWidget cũng là Widget nên cũng tuân thủ nguyên tắc giống StatefulWidget và StatelessWidget, tức là mọi data trong class Widget đều phải immutable nên mình phải khai báo `final`. Ở đây bạn muốn khai báo bao nhiêu data cũng được, trong ví dụ này, mình chỉ sử dụng 1 data đặt tên là `myData`.
3. Mình sẽ giải thích hàm `updateShouldNotify` này sau. Tạm thời `return false` đã nha :D
4. Hàm `of` là một hàm static, hàm này truyền vào một `BuildContext`, sẽ giúp các widget truy cập trực tiếp vào `MyInheritedWidget` để lấy data bằng cách gọi `MyInheritedWidget.of(context)`. Thấy ý tưởng giống hàm `Theme.of(context)` chưa nào :D.
5. Hàm `dependOnInheritedWidgetOfExactType` truyền vào Widget type. Nó sẽ giúp ta get được Widget cha gần vị trí context nhất theo cái Type mình truyền vào. Trong code này, mình truyền vào type là `MyInheritedWidget` nên nó sẽ tìm widget cha có type là `MyInheritedWidget` mà gần vị trí `context` nhất

**Bước 2**: Đặt widget `MyInheritedWidget` ở vị trí cha của widget `MyText` và `MyCenterWidget`. Khi đó ta được quyền xóa luôn constructor và data của kẻ trung gian `MyCenterWidget` và thậm chí cả constructor của `MyText` cũng không cần thiết nữa :D
```markdown:dart
class MyHomePageState extends State<MyHomePage> {
  int counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // khởi tạo MyInheritedWidget tại vị trí cha của cả MyCenterWidget và MyText
      body: MyInheritedWidget(
        child: MyCenterWidget(), // child là sub tree từ MyCenterWidget xuống
        myData: counter, // data cần chia sẻ cho mấy widget child chính là counter
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            counter++;
          });
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

// thoải mái xóa hết constructor và data trong MyCenterWidget
class MyCenterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: MyText(),
    );
  }
}

// thậm chí xóa luôn constructor và data khai báo trong MyText
class MyText extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Nhờ hàm MyInheritedWidget.of ta sẽ get được data
    // Bởi vì hàm of là hàm static nên ta có thể gọi ở bất cứ widget con nào ta muốn
    final counter = MyInheritedWidget.of(context).myData;

    // get được data thì update UI thôi :D
    return Text('Tui là widget Text. Data của tui hiện tại là: $counter');
  }
}
```

Tèn tén ten, chúng ta đã truyền thẳng data từ widget ông nội xuống con thành công. Dựa trên ý tưởng của `BuildContext`, hàm `of` và `InheritedWidget`. Thằng con MyText và các thằng con khác nếu có chỉ cần gọi `MyInheritedWidget.of(context).myData` là lấy được data thôi :D

*Full source code*: https://dartpad.dev/56043f1dca4ee088783ab9c744b31c3f

![](https://images.viblo.asia/dbb90133-834b-4575-95a4-593e6828cdc2.gif)

Tóm lại thằng `InheritedWidget` nó giống như **một nơi lưu trữ data và cung cấp data cho cả widget tree** (Data Holder & Data Provider), thằng widget nào muốn lấy thì có thể truy cập trực tiếp vào nó mà lấy data. Vì vậy `InheritedWidget` nên được đặt ở 1 trong 2 vị trí sau:
1. **App-scoped**: Vị trí root của App, cho tất cả widget trong toàn App đều truy cập được, giống như cách `Theme` đang làm, hoặc nếu bạn biết widget `MediaQuery` thì nó cũng là App-scoped InheritedWidget.
2. **Page-scoped**: Vị trí root của Page, Page ở đây đại diện cho 1 màn hình ấy, 1 App có thể có nhiều màn hình (nhiều Page). Như trong đoạn code ví dụ ở trên thì widget `MyInheritedWidget` của mình là một Page-scoped InheritedWidget.

Việc lựa chọn 1 trong 2 scope trên sẽ tùy thuộc vào bài toán của bạn. Ví dụ data của bạn là những App config thì bạn nên đặt nó trong App-scoped InheritedWidget, còn nếu bạn chỉ muốn share những data đó cho các widget trong cùng màn hình thì chọn Page-scoped InheritedWidget.

Đoạn code trên, mình nợ các bạn một lời giải thích về hàm `updateShouldNotify` đúng ko nào. Nhưng trước khi mình giải thích hàm này, cho mình xin thú tội với các bạn.
# 3. Lời thú tội ngọt ngào
Đoạn code trên về InheritedWidget chỉ giải quyết được 2 nhược điểm 1 và 2 trong tổng 3 nhược điểm mà mình đã đưa ra từ đầu bài. Điều đó có nghĩa là khi bạn click `button dấu +`, `MyHomePage` sẽ gọi hàm `setState` và nó sẽ rebuild lại cả cây sub widgets, trong đó có cả `MyText` và `MyCenterWidget`. Oh no, điều chúng ta cần là làm thế nào để widget `MyCenterWidget` ko được rebuild, vì nó ko cần phải rebuild, chỉ `MyText` mới cần rebuild. Thay cho lời xin lỗi, mình sẽ chỉ ra cách fix bằng cách: **Không để cho StatefulWidget được phép rebuild cả sub widget tree nữa**. Có 3 cách để làm được điều đó:
1. Sử dụng `const` widgets
2. Cache Widget trong State field (tức là tạo 1 data có type là Widget trong class State của StatefulWidget)
3. Widget được truyền vào StatefulWidget cha như một argument và ta có thể tái sử dụng

Well, cách 3 là cách phổ biến nhất để fix bài toán này nên mình sẽ chọn cách 3 để fix trong bài này. Cụ thể chi tiết của cả 3 cách này mình sẽ dành riêng ra 1 bài để nói về performance của App chứ nói luôn ở đây thì tập này sẽ dài như tập phim cô dâu 8 tuổi. 

Okay, cách 3 là cách phổ biến và đọc xong cũng thấy khá khó hiểu đúng ko. Cách 3 nó có 2 vế nên mình sẽ chia ra 2 bước, mỗi bước thực hiện 1 vế cụ thể là: bước 1: *Widget được truyền vào StatefulWidget cha như một argument* và bước 2: *tái sử dụng* .

**Bước 1**: Widget được truyền vào StatefulWidget cha như một argument

Trong `MyHomePage` tạo ra 1 data  đặt tên là `myChild`, có kiểu Widget dùng để cache cái sub widgets tree của `MyHomePage`
```java:dart
class MyHomePage extends StatefulWidget {
  MyHomePage({this.myChild}); // thêm dòng này

  final Widget myChild; // thêm dòng này

  @override
  MyHomePageState createState() => MyHomePageState();
}
```

Khi đó ta cần sửa lại code cũ là `MyHomePage()` thành `MyHomePage(myChild: MyCenterWidget())`. Như vậy `MyCenterWidget` là sub tree của `MyHomePage`
```swift:dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // trong constructor của MyHomePage truyền thêm param myChild
      home: MyHomePage(myChild: MyCenterWidget()),
    );
  }
}
```

Mình đã làm xong bước: *Widget được truyền vào StatefulWidget cha như một argument*. Bây giờ đến bước 2: *tái sử dụng*

**Bước 2**: Tái sử dụng

Cụ thể trong `MyInheritedWidget` lúc này nó đang thuộc class `MyHomePageState`. Mình sẽ lấy lại nguyên cái subtree của MyHomePage bằng `widget.myChild` và gắn nó vào `child` của `MyInheritedWidget`

```markdown:dart
class MyHomePageState extends State<MyHomePage> {
  int counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: MyInheritedWidget(
        myData: counter,
        child: widget.myChild, // sửa lại dòng code này, sử dụng `widget.child` thay vì tạo mới `MyCenterWidget()`
        // `widget` chính reference của MyHomePage widget ấy. (*)
        // vì vậy widget.myChild tương đương với subtree của MyHomePage, chính là từ MyCenterWidget đến hết cây
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            counter++;
          });
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
```

(*): Trong class `State` có một biến là `widget`, nhờ biến này ta có thể get data từ class `Widget`. Mình đã nói trong [phần 2 mục 3. StatefulWidget](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-2-statefulwidget-vs-statelesswidget-khi-nao-thi-can-su-dung-cai-nao-ORNZq12rZ0n#_3-statefulwidget-3)

Okay, bây giờ thử đặt vài cái log vào các hàm `build` của `MyCenterWidget` và `MyText` để kiểm chứng xem `MyCenterWidget` và `MyText` có còn bị rebuild khi `MyHomePage` gọi hàm `setState` nữa ko.

Full source code có đặt 3 dòng log: https://dartpad.dev/6d2a5c56f3480227214a69b762feb06d 

Giờ thử run lên lại rồi quan sát log nhé :D. Sau khi run lên thì ta có log:
```markdown
I/flutter ( 7573): 1. hàm build được gọi do hàm setState được gọi
I/flutter ( 7573): 2. log build MyCenterWidget
I/flutter ( 7573): 3. log build MyText với counter = 0
```

Chuẩn rồi, vì đây là lần build đầu tiên. Code nó sẽ khởi tạo mới từ `MyApp` đến xuống hết `MyText`. Thử click vào `button dấu + ` 1 lần rồi 2 lần xem:
```sql
I/flutter ( 7573): 1. hàm build được gọi do hàm setState được gọi
I/flutter ( 7573): 1. hàm build được gọi do hàm setState được gọi
```

Ta có thể thấy mấy cái log trong hàm `build` của `MyCenterWidget` và `MyText` không được print nữa. Tức là `MyCenterWidget` và `MyText` đã không được rebuild nữa. Chúng ta đã cache thành công :D. Nhưng vẫn khó hiểu đúng ko :D. Này nhé:

Khi ta click vào `button dấu +`, `MyHomePage` sẽ gọi hàm `setState`. Vì thế hàm `build` của `MyHomePageState` được chạy lại. Khi hàm `build` chạy lại thì một object `Scaffold` mới sẽ được sinh ra, một `MyInheritedWidget` mới cũng được sinh ra nhưng biến `counter` và `widget.myChild` được tái sử dụng lại không phải sinh mới. Lúc này giá trị của `widget.myChild` đang là `MyCenterWidget` ấy nên có thể nói `MyCenterWidget` và subtree của nó bao gồm cả `MyText` được tái sử dụng. Còn trong code cũ, code lỗi trong mục 2 ấy, mình sử dụng `MyInheritedWidget(child: MyCenterWidget())` thì rõ ràng khi `MyInheritedWidget` được rebuild thì `MyCenterWidget` cũng được sinh mới bằng constructor và kéo theo `MyText` cũng được sinh mới bằng constructor.

Khoan, chúng ta chơi cache lại thế này thì khi ta click vào `button dấu +`, log trong hàm `build` của `MyCenterWidget` và `MyText` không được print ra. Vì vậy chúng ta có click nát cái máy thì `MyText` cũng không update UI. Bạn thử click trong trang DartPad xem là thấy :D. Sinh ra bug khủng rồi =)). Á cái thằng này, mài bảo ta rằng sẽ chuộc lỗi bằng cách chỉ ta cách fix, ai dè fix bug nhỏ sinh ra bug khủng lun hả. Lôi đầu nó ra chém!

Khoooang, Tại hạ xin khai sự thật ạ: "Bệ hạ nghĩ kĩ xem, Flutter đâu có ngu như vậy, nó cung cấp hàm `updateShouldNotify` để chúng ta sử dụng `MyInheritedWidget` điều khiển `child` của nó". Đây chính là hàm mà thần nợ bệ hạ 1 lời giải thích từ đầu, là hàm mà khi chúng ta kế thừa `InheritedWidget` nó sẽ bắt override ấy. Trong đống child của `MyInheritedWidget`, chúng ta muốn thằng nào update, thằng đó sẽ update, chúng ta muốn thằng nào ko được update, nó sẽ ko được update: *"Phụ sử tử build, tử bất build bắt bug"*. Thế có toẹt vời không bệ hạ =))
# 4. Giải thích hàm updateShouldNotify
Khi hàm `updateShouldNotify` `return true` thì một khi `InheritedWidget` rebuild, nó cũng bắt các widget con đang phụ thuộc vào nó, hay nói cách khác là widget con đang sử dụng data của nó phải rebuild. Widget con phụ thuộc tức là widget con đang sử dụng data của nó bằng hàm `MyInheritedWidget.of` ấy. Ngược lại, nếu hàm `updateShouldNotify` `return false` thì nó sẽ không rebuild mấy thằng con. Như vậy ta có cái quyền quyết định khi `InheritedWidget` thì có rebuild các widget đang phụ thuộc vào nó không. 

Hàm `updateShouldNotify` **được gọi sau khi InheritedWidget rebuild** và truyền vào 1 argument là `InheritedWidget trước khi rebuild`. Ta có thể dựa vào data của `InheritedWidget` trước khi rebuild và sau khi rebuild, nếu có sự thay đổi sẽ quyết định rebuild các widget con phụ thuộc nó. Còn nếu data không đổi thì tất nhiên UI cũng không đổi rồi, bắt thằng con rebuild làm gì, hao tổn công sức. 

Như vậy chúng ta chỉ cần sửa lại code trong hàm `updateShouldNotify` vốn đang `return false` thành thế này đây :D

```markdown:dart
@override
  bool updateShouldNotify(MyInheritedWidget oldWidget) {
    return myData != oldWidget.myData; // nếu data thay đổi thì return true để rebuild các widget con phụ thuộc
  }
```

Giải thích lại logic của app nhé, đầu tiên khi run app lên, `MyInheritedWidget` được build lần đầu tiên, lúc này data của nó là biến `counter` đang có giá trị là `0`. Sau khi mình click vào `button dấu +` thì gọi hàm `setState` với biến `counter = 1`, tất nhiên StatefulWidget sẽ rebuild lại cả cây sub widgets của nó bao gồm cả `MyInheritedWidget` nhưng ngoại trừ `MyCenterWidget` và `MyText` không được rebuild vì mình đã cache lại trong code ở trên rồi đấy. Sau khi `MyInheritedWidget` rebuild, nó lập tức gọi hàm `updateShouldNotify` để kiểm tra xem có cần thiết rebuild mấy widget con phụ thuộc vào nó không. Ở đây chỉ có 1 thằng widget đang phụ thuộc vào nó là `MyText`. Lúc ban đầu, trước khi rebuild data của `MyInheritedWidget` đang là `counter = 0`, còn giờ data của nó sau khi rebuild là `counter = 1`. Theo code của mình, vì `0  != 1` nên nó sẽ rebuild lại thằng con phụ thuộc vào data của nó là widget `MyText`. That's all :D

Well, cuối cùng ta cũng có full source code chuẩn nhất bài: https://dartpad.dev/24f051bdc00ba718860f00e67f794356

Kiểm chứng bằng cách xem log. Khi run app:
```markdown
I/flutter ( 7761): 1. hàm build được gọi do hàm setState được gọi
I/flutter ( 7761): 2. log build MyCenterWidget
I/flutter ( 7761): 3. log build MyCenterWidget với counter = 0
```

Khi click vào `button dấu +`
```markdown
I/flutter ( 7761): 1. hàm build được gọi do hàm setState được gọi
I/flutter ( 7761): 3. log build MyText với counter = 1
```

`MyCenterWidget` - kẻ trung gian không được rebuild nữa rồi. Còn `MyText` của chúng ta đã được rebuild. Chuẩn của ló :D. Như vậy mình đã khắc phục được luôn nhược điểm thứ 3 bằng cách chỉ rebuild những widget cần được rebuild.

Bây giờ, mình có một thử thách nho nhỏ cho các bạn. Nếu ở hàm `updateShouldNotify` mình ko code `return myData != oldWidget.myData;` mà code là `return myData % 2 == 1;` (check `myData` có phải là số lẻ không), thì kết quả sẽ như thế nào nhỉ :D. Nếu như bạn tò mò thì thử vọc vạch xem sao nhé. Mình sẽ trả lời ở phần comment :D
# Kết luận
Tại sao cần phải biết `InheritedWidget` và cách nó hoạt động. Vì đây là nền tảng, là gốc gác, là một phương pháp quản lý state low-level. Nhờ đó mà chúng ta có thể học lên các phương pháp quản lý state level cao hơn như `provider`, `bloc`

*Click follow để nhận thông báo khi có bài viết mới nhé 500 anh em cây khế :D*

Đọc tiếp phần 5: [Cô nàng Flutter hoạt động như thế nào?](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-5-co-nang-flutter-hoat-dong-nhu-the-nao-3Q75w1G7ZWb)

Tham khảo: Flutter in Action của tác giả Eric Windmill

https://medium.com/@mehmetf_71205/inheriting-widgets-b7ac56dbbeb1