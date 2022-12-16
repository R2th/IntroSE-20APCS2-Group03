Trước tiên hãy bảo đảm rằng bạn đã biết về [declarative UI programming](https://flutter.dev/docs/development/data-and-backend/state-mgmt/declarative) và sự khác biệt giữa [ephemeral và app state](https://flutter.dev/docs/development/data-and-backend/state-mgmt/ephemeral-vs-app), nếu đã tìm hiểu qua những điều nói trên thì bạn đã sẵn sàng tìm hiểu về ứng dụng đơn giản quản lý state.

Trên trang này, chúng tôi sẽ sử dụng package **provider**. Nếu bạn chưa quen với Flutter và bạn không có lý do chính đáng để chọn một cách tiếp cận khác (Redux, Rx, hooks, v.v.), đây có lẽ là cách bạn nên bắt đầu. Package **provider** rất dễ hiểu và không sử dụng quá nhiều dòng code. Nó cũng sử dụng các khái niệm có thể áp dụng trong mọi cách tiếp cận khác.

Tuy vậy, nếu bạn có kiến thức nền tảng vững chắc về quản lý state từ các reactive framework khác, bạn có thể tìm thấy các package và hướng dẫn được liệt kê tại [đây](https://flutter.dev/docs/development/data-and-backend/state-mgmt/options).

# Ví dụ mình hoạ
Để minh họa, hãy xem xét ứng dụng đơn giản sau.

Ứng dụng có hai màn hình riêng biệt: danh mục và giỏ hàng (được đại diện bởi các widget **MyCatalog** và **MyCart**, tương ứng). Nó có thể là một ứng dụng mua sắm, nhưng bạn có thể tưởng tượng cấu trúc tương tự trong một ứng dụng mạng xã hội đơn giản (thay thế danh mục cho “wall” và giỏ hàng cho “favorites”).

Màn hình danh mục bao gồm thanh AppBar tuỳ chỉnh (**MyAppBar**) và dạng xem cuộn của danh sách các mục (**MyListItems**).

{@embed: https://www.youtube.com/watch?v=19gIgsUm6DY}

Đây là ứng dụng được hình dung dưới dạng widget tree.
![](https://images.viblo.asia/9171661f-40f9-4fbb-9993-ae1f657b3b3f.png)
Vì vậy, chúng ta có ít nhất 5 lớp con của **Widget**. Nhiều trong số chúng cần quyền truy cập vào state “thuộc về” ở nơi khác. Ví dụ: mỗi **MyListItem** cần có khả năng thêm chính nó vào giỏ hàng. Nó cũng có thể muốn xem liệu mặt hàng được hiển thị hiện đã có trong giỏ hàng hay chưa.

Điều này đưa chúng ta đến câu hỏi đầu tiên: chúng ta nên đặt state hiện tại của giỏ hàng ở đâu?
# Đưa state lên
Trong Flutter, bạn nên giữ state ở trên các widget sử dụng nó.

Tại sao? Trong các framework như Flutter, nếu bạn muốn thay đổi UI, bạn phải rebuild nó. Không có cách nào dễ dàng để có **MyCart.updateWith(somethingNew)**. Nói cách khác, thật khó để thay đổi một cách ngụ ý một widget từ bên ngoài, bằng cách gọi một phương thức trên đó. Và ngay cả khi bạn có thể làm cho điều này thành công, bạn sẽ chiến đấu với framework thay vì để nó giúp bạn.
```dart
// BAD: DO NOT DO THIS
void myTapHandler() {
  var cartWidget = somehowGetMyCartWidget();
  cartWidget.updateWith(item);
}
```
Ngay cả khi code trên hoạt động, bạn sẽ phải xử lý những điều sau trong widget **MyCart**:
```dart
// BAD: DO NOT DO THIS
Widget build(BuildContext context) {
  return SomeWidget(
    // The initial state of the cart.
  );
}

void updateWith(Item item) {
  // Somehow you need to change the UI from here.
}
```
Bạn sẽ cần phải xem xét state hiện tại của UI và áp dụng dữ liệu mới cho nó. Thật khó để tránh lỗi theo cách này.

Trong Flutter, bạn tạo một widget mới mỗi khi nội dung của nó thay đổi.Thay vì **MyCart.updateWith(somethingNew)** (một method call), bạn sử dụng **MyCart(contents)** (một constructor). Vì bạn chỉ có thể tạo các widget con mới trong các phương pháp tạo của cha mẹ của chúng, nếu bạn muốn thay đổi **contents**, nó cần phải ở chế độ cha mẹ của **MyCart** trở lên.
```dart
// GOOD
void myTapHandler(BuildContext context) {
  var cartModel = somehowGetMyCartModel(context);
  cartModel.add(item);
}
```
Bây giờ **MyCart** chỉ có một đường code để build bất kỳ phiên bản UI nào.
```dart
// GOOD
Widget build(BuildContext context) {
  var cartModel = somehowGetMyCartModel(context);
  return SomeWidget(
    // Just construct the UI once, using the current state of the cart.
    // ···
  );
}
```
Trong ví dụ của chúng tôi, **contents** cần phải tồn tại trong **MyApp**. Bất cứ khi nào nó thay đổi, nó sẽ build lại **MyCart** từ bên trên (sẽ nói thêm về điều đó sau này). Do đó, **MyCart** không cần phải lo lắng về lifecycle — nó chỉ khai báo những gì sẽ hiển thị cho bất kỳ **contents** nhất định nào. Khi điều đó thay đổi, widget **MyCart** cũ sẽ biến mất và được thay thế hoàn toàn bằng widget mới.
![](https://images.viblo.asia/3447a456-f781-44bb-86da-0f92d22c6680.png)

Đây là ý của chúng tôi khi nói rằng widget là bất biến. Chúng không thay đổi — chúng được thay thế.

Bây giờ chúng ta đã biết nơi đặt state của giỏ hàng, hãy xem cách truy cập vào nó.
# Truy cập state
Khi người dùng nhấp vào một trong các mặt hàng trong danh mục, mặt hàng đó sẽ được thêm vào giỏ hàng. Nhưng vì giỏ hàng nằm trên **MyListItem**, làm cách nào để làm điều đó?

Một tùy chọn đơn giản là cung cấp một lệnh callback mà **MyListItem** có thể gọi khi nó được nhấp vào. Các hàm của Dart là các đối tượng class đầu tiên, vì vậy bạn có thể chuyển chúng theo bất kỳ cách nào bạn muốn. Vì vậy, bên trong **MyCatalog**, bạn có thể xác định những điều sau:
```dart
@override
Widget build(BuildContext context) {
  return SomeWidget(
    // Construct the widget, passing it a reference to the method above.
    MyListItem(myTapCallback),
  );
}

void myTapCallback(Item item) {
  print('user tapped on $item');
}
```
Điều này hoạt động ổn, nhưng đối với một state ứng dụng mà bạn cần sửa đổi từ nhiều nơi khác nhau, bạn sẽ phải chuyển qua nhiều lần callback — điều này sẽ cũ đi khá nhanh.

May mắn thay, Flutter có các cơ chế để các widget cung cấp dữ liệu và dịch vụ cho con cháu của chúng (nói cách khác, không chỉ con cái của chúng mà bất kỳ widget nào bên dưới chúng). Như bạn mong đợi từ Flutter, khắp nơi *"Everything is a Widget"*, những cơ chế này chỉ là những loại widget đặc biệt — **InheritedWidget**, **InheritedNotifier**, **InheritedModel**, v.v. Chúng tôi sẽ không đề cập đến những điều đó ở đây, vì chúng hơi thấp so với những gì chúng tôi đang cố gắng thực hiện.

Thay vào đó, chúng tôi sẽ sử dụng một package hoạt động với các widget cấp thấp nhưng dễ sử dụng. Nó được gọi là **provider**.

Trước khi làm việc với **provider**, đừng quên thêm package đó vào **pubspec.yaml** của bạn.
```yaml
name: my_name
description: Blah blah blah.

# ...

dependencies:
  flutter:
    sdk: flutter

  provider: ^6.0.0

dev_dependencies:
  # ...
```
Bây giờ bạn có thể **import 'package:provider/provider.dart';** và bắt đầu build.

Với **provider**, bạn không cần phải lo lắng về các callback hoặc **InheritedWidgets**. Nhưng bạn cần hiểu 3 khái niệm:

* ChangeNotifier
* ChangeNotifierProvider
* Consumer
# ChangeNotifier
**ChangeNotifier** là một class đơn giản có trong Flutter SDK cung cấp thông báo thay đổi cho người nghe của nó. Nói cách khác, nếu thứ gì đó là **ChangeNotifier**, bạn có thể đăng ký các thay đổi của nó. (Đây là một dạng Observable, dành cho những người quen thuộc với thuật ngữ này.)

Trong **provider**, **ChangeNotifier** là một cách để đóng gói state ứng dụng của bạn. Đối với các ứng dụng rất đơn giản, bạn có thể sử dụng với một **ChangeNotifier** duy nhất. Trong những ứng dụng phức tạp, bạn sẽ có một số model và do đó có một số **ChangeNotifier**. (Bạn hoàn toàn không cần sử dụng **ChangeNotifier** với **provider**, nhưng đây là một class dễ làm việc.)

Trong ví dụ về ứng dụng mua sắm của chúng tôi, chúng tôi muốn quản lý state của giỏ hàng trong **ChangeNotifier**. Chúng tôi tạo một class mới để extends nó, như sau:
```dart
class CartModel extends ChangeNotifier {
  /// Internal, private state of the cart.
  final List<Item> _items = [];

  /// An unmodifiable view of the items in the cart.
  UnmodifiableListView<Item> get items => UnmodifiableListView(_items);

  /// The current total price of all items (assuming all items cost $42).
  int get totalPrice => _items.length * 42;

  /// Adds [item] to cart. This and [removeAll] are the only ways to modify the
  /// cart from the outside.
  void add(Item item) {
    _items.add(item);
    // This call tells the widgets that are listening to this model to rebuild.
    notifyListeners();
  }

  /// Removes all items from the cart.
  void removeAll() {
    _items.clear();
    // This call tells the widgets that are listening to this model to rebuild.
    notifyListeners();
  }
}
```
Code duy nhất dành riêng cho **ChangeNotifier** là lệnh gọi tới **notificationListists()**. Gọi phương thức này bất kỳ khi nào model thay đổi theo cách có thể thay đổi UI ứng dụng của bạn. Mọi thứ khác trong **CartModel** là chính model và business logic của nó.

**ChangeNotifier** là một phần của **flutter:foundation** và không phụ thuộc vào bất kỳ class cấp cao hơn nào trong Flutter. Nó có thể dễ dàng kiểm tra (bạn thậm chí không cần phải sử dụng [widget testing](https://flutter.dev/docs/testing#widget-tests) con cho nó).

Ví dụ: đây là một bài kiểm tra đơn vị đơn giản của **CartModel**:
```dart
test('adding item increases total cost', () {
  final cart = CartModel();
  final startingPrice = cart.totalPrice;
  cart.addListener(() {
    expect(cart.totalPrice, greaterThan(startingPrice));
  });
  cart.add(Item('Dash'));
});
```
# ChangeNotifierProvider
**ChangeNotifierProvider** là widget cung cấp một phiên bản của **ChangeNotifier** cho con cháu của nó. Nó đến từ package **provider**.

Chúng tôi đã biết nơi đặt **ChangeNotifierProvider**: phía trên các widget cần truy cập nó. Trong trường hợp của **CartModel**, điều đó có nghĩa là ở đâu đó trên cả **MyCart** và **MyCatalog**.

Bạn không muốn đặt **ChangeNotifierProvider** cao hơn mức cần thiết (vì bạn không muốn làm vi phạm phạm vi). Nhưng trong trường hợp của chúng tôi, widget duy nhất nằm trên cả **MyCart** và **MyCatalog** là **MyApp**.
```dart
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CartModel(),
      child: const MyApp(),
    ),
  );
}
```
Lưu ý rằng chúng tôi đang xác định một builder tạo ra một phiên bản mới của **CartModel**. **ChangeNotifierProvider** đủ thông minh để không build lại **CartModel** trừ khi thực sự cần thiết. Nó cũng tự động gọi **dispose()** trên **CartModel** khi phiên bản không còn cần thiết nữa.

Nếu bạn muốn cung cấp nhiều hơn một class, bạn có thể sử dụng **MultiProvider**:
```dart
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => CartModel()),
        Provider(create: (context) => SomeOtherClass()),
      ],
      child: const MyApp(),
    ),
  );
}
```
# Consumer
Bây giờ **CartModel** đã được cung cấp cho các widget trong ứng dụng của chúng tôi thông qua khai báo **ChangeNotifierProvider** ở trên cùng, chúng tôi có thể bắt đầu sử dụng nó.

Điều này được thực hiện thông qua widget **Consumer**.
```dart
return Consumer<CartModel>(
  builder: (context, cart, child) {
    return Text("Total price: ${cart.totalPrice}");
  },
);
```
Chúng ta phải chỉ định loại model mà chúng ta muốn truy cập. Trong trường hợp này, chúng tôi muốn **CartModel**, vì vậy ta viết **Consumer <CartModel>**. Nếu bạn không chỉ model chung (**<CartModel>**), package **provider** sẽ không thể giúp bạn. **provider** dựa trên các loại và không có loại, nó sẽ không biết bạn muốn gì.

Đối số bắt buộc duy nhất của widget **Consumer** là builder. Builder là một hàm được gọi bất cứ khi nào **ChangeNotifier** thay đổi. (Nói cách khác, khi bạn gọi **notifyListeners()** trong model của mình, tất cả các phương thức builder của tất cả các widget **Consumer** tương ứng sẽ được gọi.)

Builder được gọi với ba đối số. Đầu tiên là **context**, mà bạn cũng nhận được trong mọi build method.

Đối số thứ hai của hàm builder là phiên bản của **ChangeNotifier**. Đó là những gì chúng tôi đã yêu cầu ngay từ đầu. Bạn có thể sử dụng dữ liệu trong model để xác định UI sẽ trông như thế nào tại bất kỳ điểm nhất định nào.

Đối số thứ ba là **child**, đối số này ở đó để tối ưu hóa. Nếu bạn có một widget subtree trong **Consumer**  không thay đổi khi model thay đổi, bạn có thể tạo nó một lần và lấy nó thông qua builder.
```dart
return Consumer<CartModel>(
  builder: (context, cart, child) => Stack(
    children: [
      // Use SomeExpensiveWidget here, without rebuilding every time.
      if (child != null) child,
      Text("Total price: ${cart.totalPrice}"),
    ],
  ),
  // Build the expensive widget here.
  child: const SomeExpensiveWidget(),
);
```
Cách tốt nhất là đặt các **Consumer widget** của bạn càng sâu trong widget tree càng tốt. Bạn không muốn build lại các phần lớn của UI chỉ vì một số chi tiết ở đâu đó đã thay đổi.
```dart
// DON'T DO THIS
return Consumer<CartModel>(
  builder: (context, cart, child) {
    return HumongousWidget(
      // ...
      child: AnotherMonstrousWidget(
        // ...
        child: Text('Total price: ${cart.totalPrice}'),
      ),
    );
  },
);
```
Thay thế:
```dart
// DO THIS
return HumongousWidget(
  // ...
  child: AnotherMonstrousWidget(
    // ...
    child: Consumer<CartModel>(
      builder: (context, cart, child) {
        return Text('Total price: ${cart.totalPrice}');
      },
    ),
  ),
);
```
# Provider.of
Đôi khi, bạn không thực sự cần dữ liệu trong model để thay đổi giao diện người dùng nhưng bạn vẫn cần truy cập nó. Ví dụ: nút **ClearCart** muốn cho phép người dùng xóa mọi thứ khỏi giỏ hàng. Nó không cần hiển thị nội dung của giỏ hàng, nó chỉ cần gọi phương thức **clear()**.

Chúng tôi có thể sử dụng **Consumer <CartModel>** cho việc này, nhưng điều đó sẽ lãng phí. Chúng tôi sẽ yêu cầu framework rebuild lại một widget không cần phải rebuild.

Đối với trường hợp sử dụng này, chúng ta có thể sử dụng **Provider.of**, với tham số **listen** được đặt thành **false**.
```
Provider.of<CartModel>(context, listen: false).removeAll();
```
Sử dụng dòng trên trong một phương pháp build sẽ không khiến widget con này build lại khi **notifyListeners** được gọi.
# Để tất cả chúng cùng với nhau
Bạn có thể [xem ví dụ](https://github.com/flutter/samples/tree/master/provider_shopper) được đề cập trong bài viết này. Nếu bạn muốn thứ gì đó đơn giản hơn, hãy xem ứng dụng Counter đơn giản trông như thế nào khi được [build với provider](https://github.com/flutter/samples/tree/master/provider_counter).

Bằng cách làm theo các bài viết này, bạn đã cải thiện đáng kể khả năng tạo các ứng dụng dựa trên state của mình. Hãy thử tự mình build một ứng dụng với **provider** để thành thạo những kỹ năng này.
### Nguồn tham khảo:
https://flutter.dev/docs/development/data-and-backend/state-mgmt/simple

https://pub.dev/packages/provider