# Lời mở đầu
Ở [bài 6](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-6-key-la-gi-co-mo-khoa-trai-tim-nang-duoc-khong-ORNZqk4q50n), chúng ta đã tìm hiểu xong khái niệm `Key` là gì và ta cũng biết class `Key` có 2 sub class là `LocalKey` và `GlobalKey`. Mình đã tập trung nói rất nhiều về `LocalKey`, đồng thời cũng có tiết lộ nhiều thông tin về `GlobalKey`. Nhưng nó vẫn còn ít, vậy nên bài này ta sẽ tìm hiểu nó nhiều hơn. Để xem nó có thể làm được gì.
# 1. GlobalKey là gì và làm được gì
Nếu như ví cái App như là nước Việt Nam, thì `GlobalKey` giống như giấy căn cước (giấy CMND). Điều đó có nghĩa là, một `GlobalKey` là một key duy nhất trên toàn App. Nhờ cái giấy căn cước này, mà ta có thể tìm ra chính cái `Element` đó trên cái app. Nhờ đó mà ta có thể truy cập vào `Element` đó để lấy các thông tin nó đang quản lý như `State` và `Widget`

Thật vậy, một khi `Widget` nào đó được khai báo `GlobalKey`. Từ cái key đó, ta hoàn toàn có thể get được tham chiếu của chính `Widget` đó qua biến `currentWidget` và thậm chí get được cả `State` của `Widget` đó (nếu là `StatefulWidget`) qua biến `currentState` ở bất kỳ vị trí nào trong cây.

Để dễ hiểu hơn và có thể biết được `GlobalKey` có thể làm được gì, chúng ta sẽ đi đến code demo. Còn nhớ ở [bài 3](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-3-lot-tran-co-nang-flutter-buildcontext-la-gi-bWrZnmdbKxw#_1-tinh-huong-1) có một tình huống mình cần tìm cái widget `Scaffold` để show `SnackBar` nhưng không thể tìm được. Vì `Scaffold` chỉ là một người vô danh trên cái Widget Tree đó, không có giấy căn cước thì sao tìm ra nó được. Cuối cùng, buộc phải chèn thêm widget `Builder` hoặc phải extract ra các widget nhỏ hơn thì mới fix được bug. Lần này, kinh nghiệm mình nhiều rồi, mình sẽ fix con bug đó mà không cần phải khổ sở vậy nữa. Đơn giản lắm, chỉ với 2 bước:

**Bước 1**: Tạo ra và trao cho cái `Scaffold` đó một cái giấy căn cước, chính là `GlobalKey`. Vì `Scaffold` là một `StatefulWidget` nên nó cũng có `State` chính là class `ScaffoldState`
```dart
final scaffoldKey = GlobalKey<ScaffoldState>(); // tạo ra GlobalKey
Scaffold(key: scaffoldKey) // trao cho Scaffold
```

**Bước 2**: Sử dụng `GlobalKey` là biến `scaffoldKey` đó để tìm ra `Scaffold` đó và bắt nó show SnackBar cho mình. Hàm `showSnackBar` thuộc class `ScaffoldState` nên cần get được `State` của `Scaffold` qua biến `currentState`
```dart
scaffoldKey.currentState.showSnackBar(snackBar); // hàm showSnackBar thuộc class ScaffoldState
```

Như vậy, chúng ta đã fix được bug chỉ với 3 dòng code đơn giản được mình note trong full source code dưới đây:
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
  final scaffoldKey = GlobalKey<ScaffoldState>(); // <=== dòng này

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: scaffoldKey, // <=== dòng này
      body: Center(
        child: FlatButton(
          child: Text('show snackbar'),
          color: Colors.pink,
          onPressed: () {
            final snackBar = SnackBar(content: Text('Không thể truy cập bài viết này vì thấy hay mà không vote'));
            scaffoldKey.currentState.showSnackBar(snackBar); // <=== dòng này
          },
        ),
      ),
    );
  }
}
```

![](https://images.viblo.asia/fda7cbbc-da64-4327-8b10-97d586c788ba.gif)
# 2. Ứng dụng của GlobalKey vào quản lý Form
Ta sẽ đi tìm hiểu thêm ứng dụng của `GlobalKey` nhé. Qua ví dụ này, mình muốn giới thiệu thêm vài Widget nữa là `Form`, `TextFormField`. `TextFormField` nó cũng như `TextField`, cũng là một Widget để user nhập text vào. Để tránh lạc trôi chủ đề chính của chúng ta là `GlobalKey`, mình sẽ giải thích sự khác nhau giữa `TextFormField` và `TextField` trong một bài viết khác :D. Còn widget `Form` nó như cái group, cái tập hợp gồm một hoặc nhiều `TextFormField` để validate, save. Cụ thể thế nào thì phải có code demo mới dễ hình dung :D.

Ví dụ mình muốn đưa ra ở đây là một cái App có 1 cái `Form`, trong `Form` có 2 cái `TextFormField`, một cái để nhập tên, một cái nhập tuổi của user. Có một button, click vào button đó sẽ thực hiện validate. Nếu validate thất bại sẽ báo lỗi, nếu validate thành công sẽ log ra thông tin user đó :D

![](https://images.viblo.asia/8afcbfce-c7f1-4976-82f6-ebba7002c5f1.gif)

Mình sẽ đưa full source code trước rồi sẽ giải thích chi tiết ở dưới: https://dartpad.dev/87dcd9ce3fbd79008f6fcc67201e41dc

Đơn giản lắm chỉ với 4 bước:

**Bước 1**: Code widget Form để tạo ra layout

Đây là code của 1 cái `Form` bên trong hàm `build` của class `_MyHomePageState`. 4 hàm `validateTen`, `saveTen`, `validateTuoi` và `saveTuoi` chút nữa mình code sau nhé :D
```dart
class _MyHomePageState extends State<MyHomePage> {
@override
  Widget build(BuildContext context) {
  ......
    Form(
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration( // decoration là thuộc tính trang trí cho TextField cũng như TextFormField
              hintText: 'Vui lòng nhập tên',
              labelText: 'Tên',
            ),
            validator: validateTen,  // truyền vào một hàm được đặt tên là validateTen
            onSaved: saveTen, // truyền vào một hàm được đặt tên là saveTen
          ),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'Vui lòng nhập đúng tuổi',
              labelText: 'Tuổi',
            ),
            validator: validateTuoi, // truyền vào một hàm được đặt tên là validateTuoi
            onSaved: saveTuoi, // truyền vào một hàm được đặt tên là saveTuoi
          ),
        ],
      ),
    )
......
```

Hình ảnh cái Form được Flutter render ra:

![](https://images.viblo.asia/c27c7dc9-73fa-40b4-b661-43138aa44955.PNG)

**Bước 2**: Code các hàm validate của từng `TextFormField` như `validateTen`, `validateTuoi`

Chúng ta sẽ validate `tên` thì không được trống, `tuổi` không được dưới 18. Các hàm validate tuân thủ một nguyên tắc là: truyền vào một `String` là giá trị mà user đã nhập vào và trả về một `String` là nội dung của lỗi nếu validate bị thất bại. Điều đó đồng nghĩa với việc, nếu `String` trả về là `null` thì đồng nghĩa với việc validate đã thành công, nếu khác null thì `String` đó cũng chính là nội dung lỗi do validate thất bại.
```dart
String validateTen(String inputName) {
    if (inputName.isEmpty) {
      // String khác null, đồng nghĩa với validate lỗi, đây cũng chính là nội dung lỗi
      return 'Tên không được trống';
    } else {
      // String trả về là null, đồng nghĩa với validate thành công
      return null;
    }
}

// tương tự valdate tuổi cũng thế
String validateTuoi(String inputAge) {
    try {
      if (int.tryParse(inputAge) < 18) { // hàm tryParse giúp convert kiểu String sang int
        // nếu user nhập vào một số < 18 thì báo lỗi này
        return 'Phim cấm trẻ em dưới 18 tuổi';
      } else {
        return null; // validate thành công
      }
    } catch (e) {
      // nếu user nhập vào không phải là một số thì báo lỗi này
      return 'Bạn nhập kiểu gì để nó lỗi vậy. Nhớ nhập số nha';
    }
}
```

**Bước 3**: Code các hàm lưu giá trị được nhập bởi user khi validate thành công

Ta sẽ code hàm `saveTen`, `saveTuoi` để khi validate thành công ta sẽ gọi hàm `save` để lưu các thông tin chuẩn mà user vừa nhập vào biến `user` để phục vụ cho việc login vào app hay bla, bla gì với cái biến `user` đấy.

Trước tiên, ta sẽ cần phải tạo model `User` có 2 thuộc tính là `name` và `age`
```dart
class User {
  User({this.name, this.age});

  String name;
  int age;
}
```
Sau đó tạo ra một biến `user` trong class `_MyHomePageState`
```dart
class _MyHomePageState extends State<MyHomePage> {
  User user = User();
```
Sau đó, code các hàm save bên trong class `_MyHomePageState` luôn
```dart
void saveTen(String inputName) {
    user.name = inputName; // lưu tên vào biến user
}

void saveTuoi(String inputAge) {
    user.age = int.tryParse(inputAge); // lưu tuổi vào biến user
}
```

**Bước 4**: Thực hiện validate và trả về kết quả mong muốn khi user click button submit

Bước cuối cùng, ta sẽ code hàm `submitForm`. Khi user click button submit ta sẽ gọi hàm này. Trong hàm này ta sẽ thực hiện `validate`, nếu thành công sẽ log ra tên và tuổi của `user`, nếu thất bại ta sẽ log ra lỗi: *Validate thất bại. Vui lòng thử lại*. 

Để thực hiện validate, ta cần gọi hàm `validate` của class `FormState` (`Form` cũng là một `StatefulWidget` và `FormState` là `State` của widget `Form`). Nhưng làm sao truy cập được `Form` để mà gọi hàm `validate`. Đó là lúc chúng ta cần sử dụng `GlobalKey`.

Tạo `GlobalKey` và truyền vào `Form` trong class `_MyHomePageState`:
```dart
final formStateKey = GlobalKey<FormState>();
Form(key: formStateKey); // truyền vào Form
```

Tiếp theo, chúng ta sẽ sử dụng cái `formStateKey` đó để gọi hàm `validate` khi click vào button
```dart
void submitForm() {
    // Khi form gọi hàm validate thì tất cả các TextFormField sẽ gọi hàm validate. 
    // Đó là sức mạnh và lý do cần sử dụng widget Form
    if (formStateKey.currentState.validate()) { // hàm validate trả về true là thành công, false là thất bại
      print('Trước khi save: Tên: ${user.name} và tuổi: ${user.age}');
      formStateKey.currentState.save(); // khi form gọi hàm save thì tất cả các TextFormField sẽ gọi hàm save
      print('Sau khi save: Tên: ${user.name} và tuổi: ${user.age}'); // log ra kiểm tra form lưu thành công không
    } else {
      print('Validate thất bại. Vui lòng thử lại');
    }
}
```

That's all, nói thì có vẻ dài dòng nhưng làm thì dễ òm, không tin cứ vào đọc link full source code ở trên ngẫm lại code, xem log và trải nghiệm app :D
# 3. Sức mạnh của GlobalKey
Còn nhớ [ở bài 6](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-6-key-la-gi-co-mo-khoa-trai-tim-nang-duoc-khong-ORNZqk4q50n#_4-tiep-tuc-voc-de-co-them-kinh-nghiem-4), chúng ta đã có một câu kết về mục đích sử dụng `Key` là:
>Sử dụng Key để bảo tồn, để giữ lại cái State khi các Widget bị di chuyển tùm lum chỗ quanh cái Widget Tree.

Cũng trong bài đó, mình có đưa ra một source code fix bug bằng `GlobalKey` thay vì đưa `LocalKey` từ widget `Tile` lên widget `Padding`.

Source code cũ fix bằng `LocalKey`: https://dartpad.dev/4c8d09712a94f4dca3ef8d89e04603f1

Source code cũ fix bằng `GlobalKey`: https://dartpad.dev/cfb2daf331a52de69aad5b055105e24f

Bài toán đó có vẻ tầm thường quá, vì sử dụng `LocalKey` cũng có thể fix được. Bây giờ mình sẽ quậy, cũng là bài toán swap 2 widget `Tile` nhưng nâng tầm độ khó lên bằng cách thiết kế Widget Tree sao cho 2 widget `Tile` ở xa nhau thế này.

![](https://images.viblo.asia/db899664-5792-441e-abec-d4d48779ba3c.PNG)

![](https://images.viblo.asia/663fb632-a769-4ee0-a279-b3163736db9e.gif)

Full source code giải bài toán quậy ở trên bằng `GlobalKey`: https://dartpad.dev/048ef55a8dd4b719ca3c8594fb9255cd

*"Bài toán quậy"* này mà giải bằng `LocalKey` có mà xanh mặt =)). Qua đó, bạn đã thấy sức mạnh của `GlobalKey` chưa, vì nó là Global nên dù cho Widget nắm giữ nó có bị di chuyển đi đâu trên Widget Tree thì Flutter vẫn sẽ tìm ra nó để thực hiện ghép nối với `Element`. Vì vậy, `GlobalKey` thừa sức đảm bảo câu: *Widget di chuyển đi đâu, State di chuyển theo đó* hay *State được bảo tồn, được giữ lại khi Widget bị di chuyển tùm lum chỗ quanh cái Widget Tree*
# 4. GlobalKey là con dao hai lưỡi
Không thể phủ nhận sức mạnh của `GlobalKey`. Một khi bạn hiểu nó và tận dụng sức mạnh của nó, bạn hoàn toàn có thể sử dụng `GlobalKey` để làm những điều vi diệu, làm được những điều khó tin như việc truyền data lên, truyền data xuống, truyền data đến bất cứ đâu hay việc di chuyển cái widget đi khắp nơi, kể cả là di chuyển sang một màn hình mới cũng được luôn. Giống như ví dụ này, mình sẽ đưa cái `State` của `Counter` đi du lịch vòng quanh App:

![](https://images.viblo.asia/e33a8c49-dbdf-45bd-bbc1-61def1a1c854.gif)

Full source code: https://dartpad.dev/b44a4a697ff134a7abc4dcac82b847db . Mấy kỹ thuật di chuyển màn hình (Navigation) trong code này, sẽ được mình viết trong bài sau, cho nợ nhé :D

Nhìn vi diệu lắm phải không. Nhưng đọc code mà xem, khá là loạn, vì vậy đó không hẵn là ưu điểm, đó có thể là một khuyết điểm vì nó đi ngược lại các pattern để *quản lý State trong ứng dụng Flutter* được chính Flutter recommend trong [link này](https://flutter.dev/docs/development/data-and-backend/state-mgmt/options). Mình sẽ viết về mấy thứ vũ khí lợi hại này sau, cho nợ tiếp nhé :satisfied:

Một trong những lý do khiến `GlobalKey` không được recommend để quản lý State là nó có thể làm loạn cái cấu trúc cây khiến source code khó đọc, khó bảo trì và dễ sinh bug. Bằng chứng là mối quan hệ cha-con sẽ thành mối quan hệ 2 chiều (cha-con cũng có thể bị lật lại thành con-cha) hoặc mối quan hệ bạn bè như trong ảnh =))

![](https://images.viblo.asia/7425cef3-0d0e-4e23-a1f5-37eb09966c65.PNG)

Ơ thế không sử dụng `GlobalKey` thì fix *"bài toán quậy"* ở trên bằng niềm tin à. Được chứ, thậm chí là rất nhiều cách là mấy cách được Flutter recommend ở trên đó. Ở đây, mình sẽ sử dụng một trong các cách được Flutter recommend là Bloc Pattern *(qua source code này, mình chỉ muốn truyền thông điệp là "Sẽ có cách đừng lo" chứ bài này mình sẽ không nói về Bloc Pattern hay provider hay cả đống phương pháp quản lý State hay ho được Flutter ở trên mình sẽ giới thiệu lần lượt ở những bài khác)* :

*Full source code fix bằng Bloc Pattern thay vì sử dụng `GlobalKey`*: https://dartpad.dev/c7ff86099ae883e28a7696d006dc47fb

Thực tế, hầu hết bài toán đều có giải pháp thay thế việc sử dụng `GlobalKey`. Ngay cả bài toán validate form ở trên, chúng ta cũng có thể thực hiện mà không cần thiết phải sử dụng `GlobalKey` cơ mà. Bằng cách sử dụng hàm `Form.of(context)`. Nó sẽ giúp chúng ta tìm thằng `FormState` gần vị trí `context` nhất để ta gọi các hàm `validate` và hàm `save`. Chỉ cần sửa lại hàm `submitForm` cho phép truyền vào một `BuildContext`.
```dart
void submitForm(BuildContext context) {
    if (Form.of(context).validate()) { // sử dụng Form.of(context) để get được FormState gần vị trí context nhất
      print('Trước khi save: Tên: ${user.name} và tuổi: ${user.age}');
      Form.of(context).save(); // sử dụng Form.of(context) để get được FormState gần vị trí context nhất
      print('Sau khi save: Tên: ${user.name} và tuổi: ${user.age}');
    } else {
      print('Validate thất bại. Vui lòng thử lại');
    }
}
```
Sau đó, ta sẽ tạo ra widget `Builder` là con của widget `Form`. Khi đó ta cần phải di chuyển widget `FlatButton` vào làm con của widget `Builder` thì mới sử dụng `context` do `Builder` cung cấp được. Cây Widget sẽ thay đổi thành thế này.
```
Form
    Builder
        Column
            TextFormField
            TextFormField
            FlatButton
```

Full source code: https://dartpad.dev/4ce79d886252ece70655ca160ef508e8

Chốt lại là: `GlobalKey` đúng là hay thật đó nhưng không nên lạm dụng. Lời khuyên là hãy sử dụng `GlobalKey` ít nhất có thể. Trường hợp nào sử dụng được `LocalKey` thì hãy sử dụng `LocalKey`. Nó cũng giống như trong lập trình, biến nào sử dụng local được thì nên sử dụng local, tuyệt đối không nên khai báo global vì nó dễ sinh bug. Tương tự biến nào khai báo `private` được thì nên để `private`. 
# 5. Luật của GlobalKey
Ở bài trước, nếu `LocalKey` yêu cầu: 
>Không được phép tồn tại 2 Widget trùng một LocalKey nếu 2 Widget đó cùng 1 Widget cha. 

Thì ở bài này, `GlobalKey` yêu cầu: 
>Không được phép tồn tại 2 Widget sử dụng chung một GlobalKey trên phạm vi toàn app.

```dart
final globalKey = GlobalKey<_TileState>();
........
Row(
  key: globalKey, // Row và Padding mặc dù ở 2 level khác nhau nhưng dùng chung 1 GlobalKey vẫn sẽ bị lỗi
  children: [
      Padding(
            key: globalKey, // lỗi: Multiple widgets used the same GlobalKey
            ........           
```

Cứ như là đọc một cái gì hiển nhiên vậy. Đã là CMND của nước Việt Nam thì sao có thể có 2 thằng sử dụng chung 1 cái CMND được =)). Đó cũng là lý do, nếu như chúng ta ví cái App như nước Việt Nam thì thằng có tên `Local` (CMND trong 1 tỉnh thuộc nước Việt Nam - ra ngoài tỉnh đó vẫn có thể trùng số CMND) và thằng có tên `Global` (CMND trong cả nước Việt Nam - cả nước không có ai trùng ai) :v
# Kết luận
Mới trả hết nợ từ bài 1 xong, mọi bí ẩn xuất hiện trong đoạn kết của bài 1 đã được mình lột trần hết rồi nhé. Bây giờ lại mọc lên một đống nợ mới về **Widget Lifecycle** (mấy cái thuật ngữ như *deactivate*, *dispose* trong [bài 6](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-6-key-la-gi-co-mo-khoa-trai-tim-nang-duoc-khong-ORNZqk4q50n#_3-su-dung-key-de-fix-bug-3)) và **Navigation**, **Bloc Pattern**, **Provider** (xuất hiện trong bài này) =))

Nhưng mà không sao cả, mình sẽ tiếp tục trả cho hết nợ. Mình sẽ cho đi hết. *Nếu thấy những bài viết của mình có giá trị thì up vote cho những bài viết của mình nhá =))*

![](https://images.viblo.asia/e6f03399-11e6-4881-869a-b5da85929a0d.gif)