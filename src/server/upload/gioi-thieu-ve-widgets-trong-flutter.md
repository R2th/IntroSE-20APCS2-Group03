Flutter widgets được dựng lên với framework hiện đại mà nguồn cảm hứng được lấy từ [React](https://reactjs.org/). Ý tưởng là chúng ta dựng UI bằng cách sử dụng widgets. Widgets mô tả view của chúng ta sẽ trông như thế nào  với cấu hình và trạng thái hiện tại của chúng ta. Khi mà trạng thái của widgets thay đổi, widget sẽ được tái tạo lại. 

Note : Nếu bạn muốn biết nhiều hơn về Flutter bạn có thể tìm hiểu thêm về [basic layout codelab](https://flutter.dev/docs/codelabs/layout-basics),[ building layouts](https://flutter.dev/docs/development/ui/layout) và [adding interactivity to your Flutter app](https://flutter.dev/docs/development/ui/interactive)

### Hello world

Một ứng dụng Flutter đơn giản  bằng cách gọi `runApp()` với 1 widget:
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}
```

`runApp()` lấy widget phía trên và lấy nó là root của widget tree. Trong ví dụ này, widget tree bao gồm 2 widgets , Center widget và con của nó là Text widget. Khi chạy ứng dụng lên bạn sẽ thấy `Hello, world! ` sẽ nằm giữa màn hình. Hướng của Text cần được chỉ định trong trường hợp này; Khi mà chúng ta sử dụng `MaterialApp` widget, nó sẽ xử lý giúp chúng ta.

Khi viết một ứng dụng, bạn thường tạo ra các widget mới mà là lớp của `StatelessWidget` hoặc `StatefulWidget` , việc chính của widgets là thực thi `build()`  

### Basic widgets
Flutter đi kèm với một số những widgets cơ bản , trong đó chúng ta hay thường dùng là:

**Text**

Giúp bạn tạo text theo các kiểu khác nhau  trong ứng dụng 

**Row, Column**

Widget này giúp tạo bố cục linh hoạt theo cả 2 chiều ngang (Row) và dọc (Column ).

**Stack**

 Thay vì được định hướng tuyến tính ( chiều ngang hay chiều dọc), Stack widget cho phép bạn đặt những widget khác lên trên nhau theo thứ tự được tạo. Bạn có thể sử dụng Positioned widget trên con của Stack để định vị cạnh của chúng so với Top, Right, Bottom hoặc Left của stack. Stack được đựa trên  mô hình bố trí  định vị của web.

**Container**

Container widget cho phép bạn tạo một vùng chứa hình chữ nhật. Container có thể được trang trí với `BoxDecoration` , như là background, border, shadow.  Container có margin, padding và các ràng buộc được áp dụng vào trong kích thức của nó. Ngoài ra, Container có thể chuyển đổi trong không gian 3 chiều bằng các sử dụng matrix.

Dưới đây là một widget đơn giản, được kết hợp những widget trên và những widget khác:

```dart
import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
  MyAppBar({this.title});

  // Fields in a Widget subclass are always marked "final".

  final Widget title;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56.0, // in logical pixels
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      decoration: BoxDecoration(color: Colors.blue[500]),
      // Row is a horizontal, linear layout.
      child: Row(
        // <Widget> is the type of items in the list.
        children: <Widget>[
          IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null, // null disables the button
          ),
          // Expanded expands its child to fill the available space.
          Expanded(
            child: title,
          ),
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
    );
  }
}

class MyScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Material is a conceptual piece of paper on which the UI appears.
    return Material(
      // Column is a vertical, linear layout.
      child: Column(
        children: <Widget>[
          MyAppBar(
            title: Text(
              'Example title',
              style: Theme.of(context).primaryTextTheme.headline6,
            ),
          ),
          Expanded(
            child: Center(
              child: Text('Hello, world!'),
            ),
          ),
        ],
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'My app', // used by the OS task switcher
    home: MyScaffold(),
  ));
}
```

Link : https://github.com/haiminhtran810/Soccer_Flutter/pull/4/files

Để chắc chắn rằng có ` uses-material-design: true` trong `pubspec.yaml` để bạn có thể sử dụng [Material icons.](https://material.io/resources/icons/)

```dart
flutter:
  uses-material-design: true
```

Có nhiều Material widget được thiết kế bên trong MaterialApp để sử dụng nó. Trước tiên chạy ứng dụng với MaterialApp.

MyAppBar widget tạo  Container  với height 56 device - indepent pixel với padding là 8 pixei cả trái và phải. Bên trong container, MyAppBar sử dụng Row layout để tổ chức thành phần con của nó. Ở giữa child là title widget nó được đánh dấu như là Expanded, Có nghĩa là nó mở rộng để lấp đầy bất kỳ không gian nào có sẵn còn lại mà những child khác đã sử dụng.

MyScaffold widget sắp xếp cách thành phần con thành dọc. Tại top của column khởi tạo MyAppBar, chuyền cho app bar Text widget để sử dụng title.  Chuyền widget như là argument tới widgets khác nhờ đó mà bạn có thể sử dụng lại cho nhiều trường hợp khác nhau.  Cuối cùng là MyScaffold sử dụng Expanded để làm đầy khoảng trống còn lại .


### Sử dụng Material Components

Flutter cung cấp một số những widget để giúp bạn dựng app theo Material Design. Material bắt đầu với Material widget . Navigator là nơi quản lý stack của widget được quản lý bởi cách chuỗi String, còn được biết là "routes". Navigator giúp ứng dụng của chúng ta chuyển màn một cách mềm mại. Chúng ta cùng thực hành nhé:
```dart

import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Flutter Tutorial',
    home: TutorialHome(),
  ));
}

class TutorialHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Scaffold is a layout for the major Material Components.
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.menu),
          tooltip: 'Navigation menu',
          onPressed: null,
        ),
        title: Text('Example title'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
      // body is the majority of the screen.
      body: Center(
        child: Text('Hello, world!'),
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Add', // used by assistive technologies
        child: Icon(Icons.add),
        onPressed: null,
      ),
    );
  }
}
```

Link : https://github.com/haiminhtran810/Soccer_Flutter/pull/5/files

Bây giờ code của chúng ta chuyền từ MyAppBar và MyScaffold thành AppBar và Scaffold widget. Như ví dụ trên App bar có shadow và title text  và có thêm cả floating action button.

Chúng ta để ý rằng, widget được chuyền như đối số tới widget khác. Scaffold widget lấy số lượng widget khác nhau, Mỗi widget được đặt nơi thích hợp trong Scafford. Tương tự thế, AppBar widget chuyền widget cho `leading` widget và `action` của title widget.

### Handling gestures

Như hầu hết các ứng dụng là hình thức user tương tác với hệ thống. Bước đầu tiên trong việc dựng một ứng dụng tương tác với user là xác định cử chỉ đâu vào của user. Chúng ta cùng xem ví dụ đơn giản dưới đây :

```dart
class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        print('MyButton was tapped!');
      },
      child: Container(
        height: 36.0,
        padding: const EdgeInsets.all(8.0),
        margin: const EdgeInsets.symmetric(horizontal: 8.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5.0),
          color: Colors.lightGreen[500],
        ),
        child: Center(
          child: Text('Engage'),
        ),
      ),
    );
  }
}
```

Link git : https://github.com/haiminhtran810/Soccer_Flutter/blob/branch_learn_flutter_basic/lib/main.dart

GestureDetector thì có view để hiện trực quan cho người dùng nhưng thay vào đó thì nó phát hiện cử chỉ của user. Khi user chạm vào Container, GestureDetector sẽ gọi `onTap()` callback, trong trường hợp này code sẽ in ra message trong console .

Có nhiều Widget sử dụng GestureDetector để cung cấp callback cho widget. Cho ví dụ, IconButton, RaisedButton, và FloatingActionButton widgets có `onPressed()` callback được kích hoạt khi user chạm vào widget.

### Thay đổi widget để đáp ứng với giá trị nhập

Từ đầu trang tới giờ thì các bạn đã thấy , mình toàn dùng StatelessWidget. StatelessWidget nhận những đối số từ parent của chúng mà chúng được lưu trong `final`. Khi nào widget gọi `build()`, nó sử dụng giá trị được lưu để lấy ra đối số mới cho các widgets mà được tạo ra. 

Để tạo những ứng dụng phức tạp hơn - ví dụ như là , phản ứng lại khi user nhập -  ứng dụng có những trạng thái khác nhau. Flutter sử dụng StatefulWidgets để thực hiện những ý tưởng đó. StatefulWidgets là widget đặc biệt và biết làm sao tạo ra các trạng thái. và sử dụng những trạng thái đó. Cùng xem ví dụ đơn giản sau, khi chúng ta sử dụng RaisedButton :

```dart
class Counter extends StatefulWidget {
  // This class is the configuration for the state. It holds the
  // values (in this case nothing) provided by the parent and used
  // by the build  method of the State. Fields in a Widget
  // subclass are always marked "final".

  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      // This call to setState tells the Flutter framework that
      // something has changed in this State, which causes it to rerun
      // the build method below so that the display can reflect the
      // updated values. If you change _counter without calling
      // setState(), then the build method won't be called again,
      // and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called,
    // for instance, as done by the _increment method above.
    // The Flutter framework has been optimized to make rerunning
    // build methods fast, so that you can just rebuild anything that
    // needs updating rather than having to individually change
    // instances of widgets.
    return Row(
      children: <Widget>[
        RaisedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
        Text('Count: $_counter'),
      ],
    );
  }
}
```

Nếu bạn để ý, Bạn có thể tự đặt câu hỏi là tại sao StatefulWidget và State lại là 2 đối tượng riêng biệt. Trong Flutter, có 2 kiểu đối tượng  có vòng đời khác nhau. Các Widget là đối tượng tạm thời, được sử dụng để dựng ứng dụng tại thời điểm hiện tại. State thì lại khác , nó sẽ lưu lại thông tin giữa những là gọi `build()`

Trong ví dụ phía trên, nhận giá trị đầu vào của User và sử dụng kết quả đó  trong `build()`. Trong những ứng dụng phức tạp hơn, các phần khác nhau của widgets được phân cấp  và chịu trách nhiệm riêng cho từng phần khác nhau. 

```dart
class CounterDisplay extends StatelessWidget {
  CounterDisplay({this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('Count: $count');
  }
}

class CounterIncrementor extends StatelessWidget {
  CounterIncrementor({this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: onPressed,
      child: Text('Increment'),
    );
  }
}

class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      ++_counter;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(children: <Widget>[
      CounterIncrementor(onPressed: _increment),
      CounterDisplay(count: _counter),
    ]);
  }
}
```

Link: https://github.com/haiminhtran810/Soccer_Flutter/blob/Change_widgets_in_response_to_input/lib/Counter.dart


Để ý hơn thì chúng ta tạo 2 stateless widget mới, phân tách rõ ràng hơn mối quan tâm về counter (CounterDisplay) và thay đổi counter (CounterIncrementor).

### Sử dụng tất cả cùng với nhau

Ví dụ dưới đây đầy đủ hơn khi chúng ta cùng gom những khái niệm cùng nhau : Giả thuyết chúng ta có 1 shop bầy ra những sẩn phẩm đa dạng để bán, và 1 giỏ hàng để chứa những sản phẩm định mua. 

```dart
class Product {
  const Product({this.name});
  final String name;
}

typedef void CartChangedCallback(Product product, bool inCart);

class ShoppingListItem extends StatelessWidget {
  ShoppingListItem({this.product, this.inCart, this.onCartChanged})
      : super(key: ObjectKey(product));

  final Product product;
  final bool inCart;
  final CartChangedCallback onCartChanged;

  Color _getColor(BuildContext context) {
    // The theme depends on the BuildContext because different parts
    // of the tree can have different themes.
    // The BuildContext indicates where the build is
    // taking place and therefore which theme to use.

    return inCart ? Colors.black54 : Theme.of(context).primaryColor;
  }

  TextStyle _getTextStyle(BuildContext context) {
    if (!inCart) return null;

    return TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () {
        onCartChanged(product, inCart);
      },
      leading: CircleAvatar(
        backgroundColor: _getColor(context),
        child: Text(product.name[0]),
      ),
      title: Text(product.name, style: _getTextStyle(context)),
    );
  }
}
```

`ShoppingListItem` widget để chung là stateless widget. Nó lưu giá trị và nhận giá trị và được khởi gán trong constructor và gán giá trị cho  biến dạng final , được sử dụng trong suốt thời gian build(). 

Khi user chạm vào list item , widget sẽ không điều chỉnh inCart  ngay lúc đó. Thay vì thế, Widget sẽ gọi `onCartChanged` đươc nhận từ cha của nó. Nó sẽ được lưu trong state cao hơn  trong tằng lớp trên của widget, Nó sẽ tồn tại trong thời gian  dài hơn. Trong trường hợp khác, State được lưu trong  widget được truyền cho `runApp()` sẽ tồn tại trong suốt vòng đời của ứng dụng.

Khi widget cha nhận onCartChanged, thì nó sẽ cập nhập giá trị ngay sau đó và ngay sau đó sẽ rebuild và tạo ShoppingListItem mới với inCart mới. Mặc dù tạo lại mới ShoppingListItem , hệ thống tạo lại là không quá tốn kém bởi vì framework đã so sánh với những giá trị trước đó.

```dart
class ShoppingList extends StatefulWidget {
  ShoppingList({Key key, this.products}) : super(key: key);

  final List<Product> products;

  // The framework calls createState the first time a widget
  // appears at a given location in the tree.
  // If the parent rebuilds and uses the same type of
  // widget (with the same key), the framework re-uses the State object
  // instead of creating a new State object.

  @override
  _ShoppingListState createState() => _ShoppingListState();
}

class _ShoppingListState extends State<ShoppingList> {
  Set<Product> _shoppingCart = Set<Product>();

  void _handleCartChanged(Product product, bool inCart) {
    setState(() {
      // When a user changes what's in the cart, you need to change
      // _shoppingCart inside a setState call to trigger a rebuild.
      // The framework then calls build, below,
      // which updates the visual appearance of the app.

      if (!inCart)
        _shoppingCart.add(product);
      else
        _shoppingCart.remove(product);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Shopping List'),
      ),
      body: ListView(
        padding: EdgeInsets.symmetric(vertical: 8.0),
        children: widget.products.map((Product product) {
          return ShoppingListItem(
            product: product,
            inCart: _shoppingCart.contains(product),
            onCartChanged: _handleCartChanged,
          );
        }).toList(),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'Shopping App',
    home: ShoppingList(
      products: <Product>[
        Product(name: 'Eggs'),
        Product(name: 'Flour'),
        Product(name: 'Chocolate chips'),
      ],
    ),
  ));
}
```

Link : https://github.com/haiminhtran810/Soccer_Flutter/pull/7/files

ShoppingList thừa kế từ StatefulWidget, có nghĩa là widget này lưu giá trị state thay đổi, Khi ShoppingList widget lần đầu được thêm vào tree, framework gọi createState() để tạo một bản mới của _ShoppingListState để liên kế . Khi widget cha tạo lại, thì widget cha sẽ khởi tạo lại ShoppingList. Nhưng framework tại sử dụng lại _ShoppingListState  thì đã thực sự trong tree khi mà createState được gọi lại.

### Cuối cùng

Đây là xong hết phần 1 ví dụ và lý thuyết cơ bản của mình về Flutter  Bài sau mình sẽ thực hành nhiều hơn nữa và có ứng dụng cụ thể hơn nữa cho các bạn. Có gì sai xót bạn comment bên dưới để mình sửa nhé. (h)(h)(h)

Link tham khảo : https://flutter.dev/docs/development/ui/widgets-intro

Git (Chú ý bạn vào nhánh branch_learn_flutter_basic để clone về nhé): https://github.com/haiminhtran810/Soccer_Flutter