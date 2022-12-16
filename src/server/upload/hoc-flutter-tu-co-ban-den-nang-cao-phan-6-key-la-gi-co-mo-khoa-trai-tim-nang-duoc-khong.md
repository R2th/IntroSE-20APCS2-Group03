# Lời mở đầu
Ở [bài 5](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-5-co-nang-flutter-hoat-dong-nhu-the-nao-3Q75w1G7ZWb), chúng ta đã biết được cách Flutter first build và rebuild như thế nào. Nhưng bài đó nặng lý thuyết và ít code demo quá. Bài này mình sẽ sử dụng code để giải thích lại lý thuyết ở bài trước: *"Điều gì đã xảy ra khi Flutter rebuild"*. Cùng một bài toán, mình sẽ sử dụng 2 cách giải, một cách sử dụng `StatelessWidget`, một cách sử dụng `StatefulWidget`. 
# 1. Bài toán và cách giải sử dụng StatelessWidget
Thực hiện thí nghiệm làm ra cái app như thế này. Cụ thể là trên màn hình có 1 cái `Row` và một `FloatingActionButton`, trong cái `Row` có 2 ô vuông, mỗi ô vuông sẽ có 1 màu sắc. Khi click button sẽ hoán đổi vị trí của 2 ô vuông này trong `Row`.

![](https://images.viblo.asia/72848982-e337-4a29-b46d-c38a37f8b1b2.gif)

Ta chỉ cần 2 bước để làm được app trên. Bước đầu tiên, mình sẽ tạo ra cái ô vuông đó bằng cách tạo một `StatelessWidget` đặt tên là `Tile` (viên gạch). Mỗi object `Tile` sẽ có một màu random color không thể thay đổi.
```dart
class Tile extends StatelessWidget {
  final Color color = generateRandomColor(); // mỗi object sẽ có 1 random Color không thể thay đổi

  @override
  Widget build(BuildContext context) {
    // tạm hiểu Container như cái thùng có màu sắc, kích thước => khá giống viên gạch =))
    return Container(
      color: color,
      width: 100,
      height: 100,
    );
  }
}

// hàm tạo ra một Color bất kỳ
Color generateRandomColor() {
  // biến random sẽ giúp ta tạo ra 1 số ngẫu nhiên
  final Random random = Random();
  
  // Màu sắc được tạo nên từ RGB, là một số ngẫu nhiên từ 0 -> 255 và opacity = 1
  return Color.fromRGBO(random.nextInt(255), random.nextInt(255), random.nextInt(255), 1);
}
```

Bước thứ 2, tạo ra một `List` đặt tên là `listTile` lưu trữ 2 Widget `Tile` đó và khi click button thì thực hiện swap 2 ô vuông đó và gọi hàm `setState` để rebuild `MyHomePage`.
```dart
class _MyHomePageState extends State<MyHomePage> {
  var listTile = <Widget>[Tile(), Tile()]; // tạo 1 list lưu trữ 2 Widget

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Row(
          children: listTile, // Row nhận một list Widget nên mình truyền listTile vào
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: swapTwoTileWidget, // thực hiện hoán đổi vị trí 2 Widget trong listTile
        child: Icon(Icons.swap_horiz),
      ),
    );
  }

  // hàm thực hiện hoán đổi 2 Widget trong listTile
  void swapTwoTileWidget() {
    setState(() {
      listTile.insert(1, listTile.removeAt(0)); // (*)
    });
  }
}
```
(\*): Logic hàm *swap* chỗ này có thể gây khó hiểu nên mình đã giải thích vào link full source code. Bạn nào thấy khó hiểu có thể kéo xuống dưới cùng để xem giải thích hàm này. *Full source code*: https://dartpad.dev/e2d5c47433c324ca52222c369426e1e6

Okay, giờ mình sẽ giải thích quá trình rebuild để swap 2 ô vuông bằng cái [lý thuyết được học trong bài 5](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-5-co-nang-flutter-hoat-dong-nhu-the-nao-3Q75w1G7ZWb#_4-nang-flutter-da-lam-gi-moi-lan-rebuild-4) bằng 1 tấm ảnh gif.

![](https://images.viblo.asia/0f51beff-f37b-48d1-9eac-ab32c5b69328.gif)

Đầu tiên lúc first build thì widget `Row` có 2 `StatelessWidget` đều có kiểu là `Tile`, một cái màu xanh blue (đặt tên là *Widget blue*), một cái màu đỏ (đặt tên là *Widget red*). Từ 2 Widget đó, nó sẽ tạo ra 2 `Element`. Một thằng *Element blue* đang trỏ đến *Widget blue*, `Element` còn lại đặt tên là *Element red* đang trỏ đến *Widget red* 

Tiếp theo, khi swap 2 widget `Tile` và thực hiện rebuild: Flutter sẽ *walk down Element tree*, từng `Element` sẽ kiểm tra cái *Widget Type* của Widget cũ và Widget mới có giống nhau hay không?. Bắt đầu từ thằng *Element blue*, nó thấy thằng cũ là *Widget blue*, được đổi thành *Widget red* nên nó nói rằng: *"2 thằng này cùng Widget Type là `Tile` nên ta sẽ chuyển con trỏ từ Widget blue sang Widget red"*. Tiếp tục, đến *Element red* cũng so sánh như vậy nên cũng chuyển sang trỏ đến widget mới là *Widget blue*. Tóm lại cả 2 `Element` đều thay đổi, trỏ đến widget mới nên UI được update.

Mình vừa giải thích [lý thuyết của phần 5](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-5-co-nang-flutter-hoat-dong-nhu-the-nao-3Q75w1G7ZWb#_4-nang-flutter-da-lam-gi-moi-lan-rebuild-4) bằng một app demo rồi đấy. Giờ thử vọc vạch, convert cái class `Tile` từ `StatelessWidget` sang `StatefulWidget` rồi chạy lại thử xem sao. 
# 2. Đổi sang StatefulWidget và vọc tiếp
Để convert nhanh một `StatelessWidget` sang `StatefulWidget` trong Android Studio, bạn có thể đưa trỏ chuột đến dòng code `class Tile extends StatelessWidget`, press `Alt + Enter` chọn `Convert to StatefulWidget`

![](https://images.viblo.asia/95ee0ba7-976f-42d6-9338-0f59e1c4ea38.png)

Link full source code sau khi convert `Tile` sang `StatefulWidget`: https://dartpad.dev/4bbc60e7992962d3e9ce1f3395831f10 . Thử vào link này click buton xem sao nhé =))

Oh My Godness!, click button nhưng 2 cái ô vuông không chịu swap cho nhau :scream:. Chuyện gì đã xảy ra, bình tĩnh xem xét lại lý thuyết trong [bài 5](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-5-co-nang-flutter-hoat-dong-nhu-the-nao-3Q75w1G7ZWb#_4-nang-flutter-da-lam-gi-moi-lan-rebuild-4). 

Chúng đã biết được trong bài 5, nếu `Tile` là `StatefulWidget` thì `Element` sẽ quản lý cả `State` qua biến `_state` và quản lý Widget qua biến `widget` như thế này:

![](https://images.viblo.asia/dc9d7931-5307-4a04-806c-13381e0a2e3e.PNG)

Tương tự ví dụ sử dụng `StatelessWidget` ở trên, khi rebuild, Flutter cũng sẽ *walk down Element tree* và so sánh, nó cũng thấy 2 widget cũ và 2 widget mới vẫn cùng 1 *Widget Type* là `Tile`. Kết quả, *Element blue* trỏ đến *Widget red* và *Element red* trỏ đến *Widget blue*. Nhưng nó chỉ thay đổi tham chiếu của biến `widget` chứ có thay đổi tham chiếu của biến `_state` đâu. Điều này dẫn đến: *Element blue* có biến `widget` trỏ đến *Widget red* nhưng `_state` vẫn trỏ đến *State blue*. *Element red* cũng thế, biến `widget` trỏ đến *Widget blue* nhưng `_state` vẫn đang trỏ đến *State red*. Trong khi `State` lại chứa data về màu sắc của widget `Tile` nên dù cho `Widget` có bị swap thì màu sắc vẫn không đổi :D. Đó là nguyên nhân gây ra bug. Bởi vậy, từ đầu bài, à không, phải là từ [bài 2](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-2-statefulwidget-vs-statelesswidget-khi-nao-thi-can-su-dung-cai-nao-ORNZq12rZ0n#5-khi-nao-thuc-su-can-su-dung-statefulwidget-5), mình đã khuyên các bạn không nên sử dụng `StatefulWidget` bừa bãi mà :D

![](https://images.viblo.asia/5eb8d95c-749b-49f2-8c55-d1cc71f197c6.gif)

Đã gọi là vọc thì kiểu gì chả ra bug. Giờ fix làm sao nà =)). 
# 3. Sử dụng Key để fix bug
Đơn giản lắm, ở class `Tile`, tạo ra constructor cho phép truyền `Key` vào
```dart
Tile({Key key}) : super(key: key);
```
Giờ ta sẽ tạo ra một key bằng class `UniqueKey` rồi khởi tạo đối tượng `Tile` với `key` là một `UniqueKey`. `UniqueKey` là gì, mình sẽ giải thích ở dưới.
```dart
var listTile = <Widget>[Tile(key: UniqueKey()), Tile(key: UniqueKey())]; // UniqueKey() tạo ra 1 key
```

Full source code fix được bug: https://dartpad.dev/cbcf93cfd5655c514af90e87010be7c3

Vậy `Key` là gì?

Đây là định nghĩa về `Key`:
>A Key is an identifier for Widgets, Elements

Tạm dịch:
> `Key` là một định danh dùng để xác định danh tính cho các `Widget`, `Element`

Nói một cách dễ hiểu hơn. Bình thường, nếu không có key thì `Element` và `Widget` chỉ là những kẻ vô danh. Có key rồi, nó giống như có một cái chứng minh nhân dân vậy, nó được xác định danh tính rõ ràng nhờ giá trị bên trong `Key`. Nhờ có danh tính rõ ràng mà Flutter sẽ dựa vào danh tính đó để tìm kiếm. Tìm kiếm thế nào thì mời bạn xem tiếp sẽ rõ.

Bên trong một object `Key` có lưu trữ 1 giá trị, giá trị tạm hiểu như số CMND ấy :v. `UniqueKey` đó bên trong có giá trị gì thì mình cũng sẽ giải thích ở dưới. Giờ chỉ cần bạn tạm hiểu là giá trị giữa các `UniqueKey` không thể bị trùng lặp (giống như số CMND cũng có trùng lặp đâu :D). Giá trị này được dùng để so sánh. Và một điều mình dấu kín trong bài 5, đến giờ mới bật mí là: 
>Nếu `Widget` được khai báo `Key` thì `Element` không chỉ so sánh `Widget Type` mà còn so sánh cả `Key` của widget cũ mà nó đang giữ tham chiếu và widget mới nữa. 

Cụ thể sẽ có 3 tình huống xảy ra trong quá trình so sánh:
* Nếu cả *Widget Type* và *Key* đều giống nhau thì nó sẽ chỉ update bản thân nó bằng cách cho biến `widget` trỏ đến Widget mới.  
* Nếu cùng *Widget Type* nhưng *Key* khác nhau thì `Element` đó sẽ bị **deactivate**. 
* Nếu *Widget Type* khác nhau thì `Element` đó sẽ bị **dispose** 

Hai thuật ngữ **dispose** và **deactivate** khá lạ lẫm, nếu bạn nào đã học về *StatefulWidget Lifecycle* thì đã thấy nó rồi. **Element bị dispose** chính là bị destroy vĩnh viễn ra khỏi *Element Tree*, giống như ở bài 5 mình nói là `Element` bị rebuild là bị đập đi xây lại đó. **Dispose** tương đương với đập đi, đập chết nó luôn =)). Còn **Element bị Deactivate** tức là tạm thời nó bị gỡ khỏi *Element Tree* thôi, nó vẫn có thể được di chuyển đến vị trí khác và được gắn lại vào cây ở vị trí mới nào đó. 

Giờ mình sẽ giải thích vì sao sử dụng `Key` lại fix được bug nhé: 

Đầu tiên, trước khi chúng ta gọi hàm swap thì ta có 2 widget theo thứ tự: *Widget blue* có key là `1` và *Widget red* có key là `2`. Lúc này, biến `widget` bên trong *Element blue* đang trỏ đến *Widget blue* nên biến này cũng đang giữ key là `1`, tương tự biến `widget` bên trong *Element red* cũng sẽ giữ key là `2`. 

Tiếp theo, sau khi chúng ta gọi hàm swap, cả *Element blue* và *Element red* đều thấy mặc dù *Widget blue* và *Widget red* có *Type* giống nhau nhưng giá trị trong *Key* khác nhau nên cả 2 Element đó bị *deactivate*, tức là nó bị tạm remove khỏi *Element Tree* chứ nó chưa chết nhé. Xem hình là rõ ngay, key số `2` được so sánh với key số `1` nên nó là khác nhau :D

![](https://images.viblo.asia/66d86774-c236-4656-b7f8-be1a7285886b.jpg)

Tiếp theo khi `Element` đang ở trạng thái *deactivate*: 
* Nếu `Element` đó tìm thấy được Widget mới nào có Key trùng với Key mà nó đang nắm giữ (chính xác là Key mà biến `widget` của `Element` đó đang nắm giữ) thì biến `widget` của `Element` đó sẽ được trỏ trở lại Widget mới đó và được gắn vào lại *Element Tree*. Quá trình Flutter cố gắng tìm `Widget` có key tương ứng để `Element` đang bị *deactivate* trỏ đến, được gọi là *matching up widget to elements* (tạm dịch: quá trình ghép nối Widget với Element). 
* Nếu tìm không thấy Widget mới nào có cùng key, `Element` đó sẽ thật sự bị *dispose*, tức là bị gỡ vĩnh viễn khỏi *Element Tree*.

![](https://images.viblo.asia/ac590f8d-fe40-4b3e-a87c-23b97b8f14bb.jpg)

Kết quả sau cuộc tìm kiếm trên, 2 thằng `Element` đều đã tìm được Widget mới tương ứng và hai thằng `Element` đó đổi chỗ ngồi cho nhau, 2 `Element` được swap thì tất nhiên 2 `State` tương ứng cũng được swap theo. Và cuối cùng ta có kết quả như hình. Nhờ thế mà UI được update đúng State, chúng ta đã fix được bug :D

![](https://images.viblo.asia/c333dc8e-62a0-46c7-8be1-225e8a3f695a.PNG)

Đây là tấm ảnh gif thể hiện bức tranh toàn cảnh từ lúc 2 `Widget` bị swap đến lúc 2 `Element` và `State` bị swap theo:

![](https://images.viblo.asia/4a9f6c2f-8ee2-46c9-992f-a9f15cc960ec.gif)

Qua 2 ví dụ, một ví dụ sử dụng `StatelessWidget`, một ví dụ sử dụng `StatefulWidget`, bạn có thể thấy rằng `Key` thật sự hữu ích trong bài toán thay đổi vị trí các `StatefulWidget` trong một List Widget như `Row`, `Column`.
# 4. Tiếp tục vọc để có thêm kinh nghiệm
Có câu: *"Thà để những giọt mồ hôi rơi trên trang Viblo. Còn hơn là đổ lệ trong lúc làm dự án"*. Free mà mắc gì không vọc tiếp để lấy thêm kinh nghiệm nhỉ :D. Lần này vọc mạnh tay hơn. Thay vì để `listTile` là một List chứa 2 widget `Tile`, thì ta wrap mỗi widget `Tile` trong `listTile` với widget `Padding`. Thằng `Padding` không có key, thằng `Tile` thì vẫn có key như này:
```dart
var listTile = <Widget>[
    Padding(
      padding: const EdgeInsets.all(8.0),
      child: Tile(key: UniqueKey()),
    ),
    Padding(
      padding: const EdgeInsets.all(8.0),
      child: Tile(key: UniqueKey()),
    )
];
```

Full source code: https://dartpad.dev/461b113ecb6b5c930146a7225fef44e1

Oh my God!. Mỗi lần click là 2 cái ô vuông đổi sang một màu khác luôn =)). Cái quái gì đang xảy ra vậy, càng vọc là ra bug càng khủng =)).

Bình tĩnh xem xét lại, tại sao lại generate ra một màu mới. Sinh ra một màu mới thì chắc chắn `StatefulWidget` là `Tile` đã gọi lại hàm `createState` bởi vì hàm `generateRandomColor()` được mình sử dụng trong class `_TileState`. Nó sẽ không gọi lại hàm này trừ khi có một object `_TileState` được sinh mới thay cho object `_TileState` cũ. Không còn nghi ngờ gì nữa cả *State red* và *State blue* đều bị tạo lại vì thế cả *Element red* và *Element blue* cũng phải bị tạo lại.

Nhưng tại sao `Element` lại bị dispose để tạo lại cái mới?. Các bạn còn nhớ ở trên mình nói nếu thuật toán *matching element và widget* mà xảy ra: *Khi `Element` đó đang bị deactivate, nếu tìm không thấy `Widget` mới nào có cùng key, `Element` đó sẽ thật sự bị dispose, tức là bị gỡ vĩnh viễn khỏi Element Tree*. Lần vọc này đã vô tình rơi vào trường hợp này đấy các bạn. Lý do là vì cái `UniqueKey` mà mình sử dụng là một loại *Local Key*. 

>Nếu sử dụng *Local Key*, thì quá trình *matching up widget to elements* chỉ diễn ra trong cùng một level cụ thể trên hệ thống Tree

Nghe khó hiểu quá nhỉ, thôi thì dùng hình minh họa lại cái ví dụ trước và ví dụ lần này cho nó dễ hiểu.

![](https://images.viblo.asia/9b42f015-03d5-4590-80aa-950b57b086f1.PNG)

*Nói thêm*: Nếu sử dụng `GlobalKey` thì vùng tìm kiếm sẽ trên toàn app (toàn Widget Tree) luôn. Tức là bug này hoàn toàn có thể được fix bằng `GlobalKey` như source code này: https://dartpad.dev/cfb2daf331a52de69aad5b055105e24f . Nhưng mình chỉ nói thêm 1 chút để các bạn thấy được sự khác nhau giữa `LocalKey` và `GlobalKey`. Từ đó dễ hình dung `LocalKey` là thế nào, tại sao nó lại được đặt tên là `Local` và `Global`. Bài tiếp theo sẽ nói nhiều hơn về `GlobalKey` nhé :D

Well, nhìn ảnh trên, các bạn có thể hiểu vì sao thuật toán *ghép nối Element và Widget* không thể tìm thấy `Widget` có key phù hợp để ghép đôi với `Element` rồi nhỉ. `Element` đang bị deactivate mà không có `Widget` mới để ghép đôi thì nó sẽ bị phá hủy và có thằng `Element` khác được tạo ra với một `State` mới thay thế chúng, như trong ảnh gif dưới này là *State orange*

![](https://images.viblo.asia/56a21201-0b60-4e7a-a167-3da5879fbf82.gif)

Từ lý thuyết trên, tự rút ra cho mình một cái tip là `LocalKey` chỉ nên được đặt ở các `Widget` là top level, level cao nhất trong list `children` của một `Row` hoặc một `Column`. Một `Row`, nó có nhiều đứa con có cùng một level, Flutter sẽ tìm trong mấy đứa con cùng level đó.

![](https://images.viblo.asia/ad7d22a6-3bad-4f56-96a6-19976578a6e0.png)

Biết được nguyên nhân gây ra bug rồi thì việc fix bug là chuyện nhỏ. Nào chúng ta cùng đưa tiễn bug lên đường :sunglasses:

Cực kỳ đơn giản, chỉ cần để cái `UniqueKey` đó lên cho thằng `Padding` nắm giữ vì 2 thằng `Padding` này đang là top `children` của `Row`. Bug được fix ngay á mà. Dăm ba con bug sao làm khó được anh :sunglasses:

```dart
var listTile = <Widget>[
    Padding(
      key: UniqueKey(), // đưa key từ Tile lên Padding
      padding: const EdgeInsets.all(8.0),
      child: Tile(),
    ),
    Padding(
      key: UniqueKey(), // đưa key từ Tile lên Padding
      padding: const EdgeInsets.all(8.0),
      child: Tile(),
    )
  ];
```

*Full source code*: https://dartpad.dev/4c8d09712a94f4dca3ef8d89e04603f1

Qua các ví dụ trên, mình xin note lại những ý chính trong bài:
* Nếu cả *Widget Type* và *Key* đều giống nhau thì nó sẽ chỉ update bản thân nó bằng cách cho biến `widget` trỏ đến Widget mới.  
* Nếu cùng *Widget Type* nhưng *Key* khác nhau thì `Element` đó sẽ bị *deactivate*. 
* Nếu *Widget Type* khác nhau thì `Element` đó sẽ bị *dispose*, một `Element` và một `State` mới được tạo ra thay thế
* `Element` bị `deactivate` là tạm bị gỡ ra khỏi cây, vẫn có khả năng nó được gắn lại vào cây. Còn `dispose` là bị gỡ ra khỏi cây vĩnh viễn, chỉ còn cách tạo ra cái `Element` mới thay thế
* Khi `Element` bị *deactivate*, Flutter sẽ thực hiện quá trình *matching up widget to elements*. Nếu Flutter mà nói *"no key matching found"* (không tìm thấy key nào phù hợp) thì `Element` cũng sẽ bị *dispose*. Nếu tìm thấy key phù hợp, `Element` đó sẽ cho biến `widget` của `Element` trỏ tới Widget mới đó và vì thế nó được gắn lại vào *Element Tree*.
# 5. Các loại LocalKey
Class `Key` nó có 2 subclass là `LocalKey` và `GlobalKey`. `GlobalKey` mình đã giới thiệu sơ ở trên rồi, mình sẽ nói nhiều hơn về `GlobalKey` ở bài sau. Bài lần này, mình chỉ tập trung nói về `LocalKey`.

Ngoài `UniqueKey` là một loại `LocalKey`, còn có các `LocalKey` khác như `ValueKey`, `ObjectKey`. Hai loại key này nó cho phép mình truyền giá trị mà mình mong muốn vào. Ví dụ thế này: `ValueKey('tui muốn giá trị của key này là 113')`, `ObjectKey('abc')`. Nhưng phải cực kỳ cẩn thận với 2 loại key này. Bởi vì:

>Tất cả Widget được khai báo `Key` mà có cùng một Widget cha thì các Key đó đều phải đôi một khác nhau

Tức là không có cái Key nào được phép trùng với Key khác trong phạm vi cùng một Widget cha. Nếu bạn vi phạm, Flutter sẽ ném một lỗi: 
`Exception: Duplicate keys found`. Cái này không cần nói cũng biết, nếu trong ví dụ trên, 2 Widget `Tile` có cùng 1 key thì 1 `Element` nó match được với 2 `Widget` luôn à, điều đó là vô lý. Chính vì vậy, Flutter không thể để điều vô lý đó xảy ra.

Bạn thử sử dụng code trên để replace `UniqueKey()` thành `ValueKey(113)` như thế này là biết ngay.
```dart
var listTile = <Widget>[
    Padding(
      key: ValueKey(113), // Thử dùng ValueKey thay cho UniqueKey
      padding: const EdgeInsets.all(8.0),
      child: Tile(),
    ),
    Padding(
      key: ValueKey(113), // dùng 2 ValueKey có giá trị giống nhau là 113
      padding: const EdgeInsets.all(8.0),
      child: Tile(),
    )
  ];
```

Giá trị của `Key` là cái mà ngay từ đầu mình ví von như là số CMND ấy. Thực ra, cách ví von này nó không được đúng lắm. Vì nếu bạn sử dụng `LocalKey`, thì 2 `Widget` không cùng một cha vẫn có thể khai báo được 2 `LocalKey` trùng nhau nhé. Như ví dụ sau đây thì hoàn toàn hợp lệ:
```dart
var listTile = <Widget>[
    Padding(
      key: ValueKey(113), // Một key đặt ở Padding
      padding: const EdgeInsets.all(8.0),
      child: Tile(key: ValueKey(113)), // một key có giá trị giống y như key ở trên, đặt ở Tile
    ),
    Padding(
      padding: const EdgeInsets.all(8.0),
      child: Tile(),
    )
  ];
```

Cách ví von này sẽ đúng đối với `GlobalKey`. Thật sự nếu như ví cả cái App như cả nước Việt Nam, thì một `GlobalKey` giống như một giấy Chứng minh nhân dân. Vì giá trị của một `GlobalKey` là duy nhất trên toàn app. Có nghĩa là không có thằng `GlobalKey` nào trùng thằng nào trên toàn cái app luôn. Mình đã để lộ hàng `GlobalKey` hơi bị nhiều rồi nên chắc không cần đọc bài tiếp theo vẫn có thể hiểu nhỉ :D

Vậy `ValueKey` và `ObjectKey` có gì khác nhau. Sự khác nhau ở đây là `ValueKey` nó so sánh giá trị, hai `ValueKey` có cùng giá trị (ví dụ như cùng giá trị `113` ở trên) thì được gọi là trùng nhau, còn `ObjectKey` thì truyền vào một `Object` và nó sẽ so sánh địa chỉ của `Object` chứ không phải chỉ so sánh giá trị. Nói ngắn gọn lại thì `ValueKey` sử dụng [so sánh ==](https://api.dart.dev/stable/2.9.2/dart-core/Object/operator_equals.html), còn `ObjectKey` sử dụng [so sánh identical](https://api.dart.dev/be/148224/dart-core/identical.html)

*Note: Nếu bạn chưa phân biệt được so sánh == và so sánh identical trong ngôn ngữ Dart thì mình cũng sẽ giải thích trong phần comment của bài viết này*

Well, chúng ta đã hiểu về `ValueKey` và `ObjectKey` rồi. Còn đây là định nghĩa về `UniqueKey` mà đã được mình sử dụng từ đầu bài:
>A key that is only equal to itself.

Đúng như cái tên của nó, đã là `UniqueKey` thì không bao giờ có thằng thứ 2 trùng với nó trên cuộc đời này.

Vậy, chắc chắn sẽ có bạn thắc mắc, tại sao không phan đại `UniqueKey` mọi lúc mọi nơi luôn đi cho nó khỏe, đỡ bị `Exception: Duplicate keys found`. Flutter đâu có ngu đi tạo ra tùm lum loại Key như vậy, mình sẽ dẫn chứng một trường hợp không nên dùng `UniqueKey`.

Ví dụ: mình có một cái `Column` có 2 cái `TextField` (`TextField` đơn giản là một widget để user nhập text) và một cái `FloatingActionButton`, khi click button, mình sẽ rebuild. Dưới đây là hai source code, một cái mình sử dụng `ValueKey`, một cái sử dụng `UniqueKey` cho bài toán này.

Sử dụng `ValueKey`: https://dartpad.dev/578c4ebe4b477ff98da38b66c27c8cb1

Sử dụng `UniqueKey`: https://dartpad.dev/428bae12a2ece6cc541fd8de324daa50

![](https://images.viblo.asia/b181c407-90ca-475b-a725-2eefb438e422.gif)

Kết quả, trong cả 2 source code, 2 cái `TextField` đều bị rebuild do hàm `setState` nhưng nếu sử dụng `UniqueKey` thì mỗi lần click button là `TextField` bị clear hết text, còn sử dụng `ValueKey` thì không bị clear. 

Giải thích:

* Trong ví dụ `UniqueKey`: Mỗi lần rebuild, một `UniqueKey` mới được tạo ra và cái `UniqueKey` này chắc chắn không bao giờ trùng với cái cũ trước đó. Như vậy nó rơi vào trường hợp cùng *Widget Type* nhưng khác *Key* nên `Element` này bị `dispose`. Vì thế một `Element` mới và một `State` mới được tạo lên dẫn đến text bị clear hết.
*  Trong ví dụ `ValueKey` thì `Element` nó thấy widget cũ và widget mới đều trùng *Widget Type* (cùng là type `TextField`) và trùng cả *Key* (`TextField` ở trên trước khi rebuild có *key = 1*, sau khi rebuild cũng có *key = 1*, tương tự `TextField` ở dưới có *key = 2*, sau khi rebuild cũng có *key = 2*) nên cả 2 *Element TextField trên và dưới*, nó chỉ cập nhật lại biến `widget` trỏ đến Widget mới chứ nó không bị *deactivate* hay bị *dispose*. Vì thế `State` của cả 2 `Element` này được bảo toàn.

Well, từ đầu bài khi bạn convert widget `Tile` sang `StatefulWidget`, bạn đổi vị trí của 2 `StatefulWidget` đó và bị bug. Chính `Key` đã cứu bạn bằng cách cho 2 *State red*, *State blue* đổi vị trí theo. Nói tóm lại, Key đã giúp mình đảm bảo: *"Widget di chuyển đi đâu, State di chuyển theo đó"*. Tương tự, lần này nếu bạn vào class `TextField` để xem, bạn cũng sẽ thấy nó là một `StatefulWidget`, tức là nó cũng có `State`. Thực chất cái text mà mình gõ `abc` kia được lưu trữ trong `State` của `TextField`. Tuy lần này, bài toán không có yêu cầu hoán đổi giữa 2 `TextField`, nhưng nó vẫn đảm bảo được câu: *"Widget ở đâu, State ở đó"*

Đó cũng mục đính chính để sử dụng `Key`:

> Sử dụng `Key` để bảo tồn, để giữ lại cái `State` khi các Widget bị di chuyển tùm lum chỗ quanh cái Widget Tree.

Hay nói cách khác, `Widget` di chuyển đi đâu, `State` di chuyển theo đó.

Có 2 câu hỏi cho bạn. Mình sẽ trả lời ở phần comment nhé.
* Câu 1: nếu trong ví dụ lần này, mình không sử dụng `ValueKey`, cũng không sử dụng `UniqueKey`, nói chung là không sử dụng Key thì kết quả sẽ như thế nào, *Element TextField* có bị *deactivate* hay bị *dispose* không?.
* Câu 2: tại sao ngay từ đầu trong cái source này https://dartpad.dev/cbcf93cfd5655c514af90e87010be7c3 , mình sử dụng `UniqueKey` nhưng `State` của widget `Tile` vẫn được giữ như cũ. Bằng chứng là màu sắc của `Tile` nó nó không bị reset thành 1 màu mới. Còn trong ví dụ lần này thì một `State` mới của `TextField` đã được tạo ra.
# Kết thúc
Vì bài này dài quá rồi nên đành phải hẹn các bạn ở bài viết tiếp theo nhé :heart_eyes:. Mặc dù hành trình 6 bài chưa đủ để mở khóa trái tim nàng Flutter nhưng hành trình đó đủ để mở rộng cánh cửa để chúng ta dễ dàng bước sâu vào thế giới Flutter.

Mời các bạn, đọc tiếp phần 7 để có thêm góc nhìn về `GlobalKey` và sẽ dễ hiểu bài 6 về `LocalKey` này hơn :D: [Phần 7: Lột trần trụi GlobalKey](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-7-lot-tran-trui-globalkey-bJzKmPxk59N)

Tham khảo: 

https://medium.com/@ayushpguptaapg/using-keys-in-flutter-1c5fb586b2a5

https://medium.com/flutter/keys-what-are-they-good-for-13cb51742e7d

https://www.youtube.com/watch?v=kn0EOS-ZiIc&feature=emb_logo&ab_channel=GoogleDevelopers