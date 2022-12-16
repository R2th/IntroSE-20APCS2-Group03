# Lời mở đầu
Trong đoạn kết của phần 1, mình còn nợ các bạn một lời giải thích về `Key` trong Flutter và ở bài này các bạn cho mình chây ỳ nợ tiếp nhé :v. Vì bài này liên quan đến việc giải thích về `Key` nên để hiểu được bài `Key`, ta cần phải tìm hiểu đôi chút về cách Flutter hoạt động.

# 1. Widget chỉ là bản thiết kế
Chúng ta là dev Flutter với công việc chính là code nên các Widget tree để tạo ra những App Flutter siêu đẹp. Từng cái `Text` là `Widget`, `Padding` cũng là `Widget`, nói chung *"Mọi thứ trong Flutter đều là Widget"*. Well, đó là câu nói nổi tiếng trong Document của Flutter chứ không phải mình chém :D. Và câu nói này không hoàn toàn là sự thật, nó chỉ là bề nổi của tảng băng chìm mà thôi. Sự thật đến tận hôm nay mới được bật mí: **Widget chính là một bản vẽ, một bản thiết kế** như bản thiết kế *"siêu xe"* trong hình dưới đây. Flutter sẽ dựa vào bản thiết kế này và render ra cái hình ảnh UI hiển thị lên màn hình. Từng cái `Text` chúng ta đọc, từng cái `Button` để chúng ta click, cái `Icon`, cái `Logo` được hiển thị trên màn hình đó không phải là `Widget` mà chính xác là nó được dựng lên một bản thiết kế gọi là `Widget`. 

![](https://images.viblo.asia/d2b920ab-917d-4f1d-93ba-f4ca807ec8c7.jpg)

Well, `Widget` chỉ là một bản thiết kế lên những mảnh nhỏ UI như `Text`, `Image`. Từ thiết kế đó mà Flutter render ra sản phẩm thật, chính là những mảnh UI mà chúng ta nhìn thấy trên app. Bây giờ chúng ta sẽ đi tìm hiểu những mảnh UI thật đó qua 2 class trong Flutter là `Element` và `RenderObject`. 
# 2. Element và RenderObject là gì
Ở [bài 1](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM#_5-than-the-nang-la-mot-widget-tree-5), chúng ta đã biết `Widget` chỉ đơn giản là **Dart class** do Flutter thiết kế sẵn cho chúng ta như class `Text`, `Column`, `Image`, ... hoặc do chúng ta định nghĩa ra như class `SofaWidget`.

Còn đây là khái niệm liên quan đến `Element`:
>`Element` represents a specific instance of a `Widget` in a given location of the tree hierarchy - Flutter documentation

Tạm dịch:
>`Element` đại diện cho một `instance` của một `Widget` tại một vị trí cụ thể trên hệ thống cây.

Nghe nó giống khái niệm về `class` và `instance` trong lập trình hướng đối tượng vậy. Cũng có thể hiểu như vậy :D. Nếu như nói `Widget` là một bản thiết kế của một mảnh UI, thì `Element` đại diện cho cái thành phẩm, tức là một mảnh UI thật sự được sản xuất từ bản thiết kế đó và mảnh UI này được gắn vào một vị trí cụ thể trên hệ thống cây.

![](https://images.viblo.asia/ef9555df-14a5-44a5-bf4d-746829d4c772.JPG)

Trong cái quá trình tạo ra mảnh UI thật để hiển thị trên màn hình có sự đóng góp của `RenderObject` - nhân vật chịu trách nhiệm căn chỉnh kích thước, sắp xếp vị trí trên 1 layout và vẽ, tô màu cho cái mảnh UI đó. Vì vậy, có thể nói gọn lại cả 3 khái niệm `Widget`, `Element` và `RenderObject` như sau:
>`Widget` chỉ là một bản thiết kế cho các mảnh UI hiển thị trên màn hình, `Element` là đại diện cho cái mảnh UI đó ở một vị trí nào đó trên cây và `RenderObject` đóng góp vào tô vẽ, căn chỉnh cho cái mảnh UI đó.

![](https://images.viblo.asia/aa121e28-ccd0-4835-9f1b-15dc50aec922.jpg)

Hai cái dấu mũi tên từ `FooElement` trỏ đến `FooWidget` và `RenderFoo` trong ảnh đó chính là reference. Mỗi `Element` sẽ nắm giữ reference của `Widget` và `RenderObject` và quản lý cả App. Bây giờ chúng ta sẽ tìm hiểu mối quan hệ này giữa 3 đứa nó: `Element` & `Widget` & `RenderObject`
# 3. Quan hệ giữa Widget, Element và RenderObject
Vì nội dung nhiều lý thuyết nên mình đã cố gắng tách chúng ra thành 2 chặng hành trình tìm hiểu. Mỗi chặng chỉ tìm hiểu ở mức vừa đủ để hiểu được [bài tiếp theo](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-6-key-la-gi-co-mo-khoa-trai-tim-nang-duoc-khong-ORNZqk4q50n). Nào cùng bắt đầu chặng 1.
## Chặng 1: Mối quan hệ giữa Element, Widget, State
Bắt đầu chặng 1, để biết được Flutter đã sử dụng bản thiết kế Widget Tree do chúng ta thiết kế để render ra App như thế nào thì trước tiên hãy cùng mình tìm hiểu điều gì đã xảy ra khi ta chạy hàm `runApp()` bên trong hàm `main()`.

Trong hàm `runApp` chúng ta truyền vào nguyên một Widget Tree với `MyApp` là root Widget đúng ko nào. Flutter sẽ walk down cái Tree đó, từ root Widget đến hết cây. Từng Widget trên cây sẽ gọi hàm `createElement()` để tạo ra từng `Element`. Quá trình từ một `Widget` tạo ra một `Element` này người ta gọi là `inflation`. Và cứ inflate từng `Widget` như thế, một *Widget Tree* sẽ tạo được một *Element Tree*. `StatelessWidget` sẽ tạo ra `StatelessElement` và `StatefulWidget` sẽ tạo ra `StatefulElement`.

![](https://images.viblo.asia/4a7f35e0-7c2c-41f1-91d2-1e98ca3de392.jpg)

Cái mũi tên nét đứt đó là reference mình đã nói ở trên đấy. Bây giờ mình sẽ giải thích. Vào xem code của class `StatefulElement` và `StatelessElement` xem nó được hình thành thế nào là biết ngay á mà :D
### Khám phá class StatelessElement
```javascript:dart
class StatelessElement extends ComponentElement {
    StatelessElement(StatelessWidget widget) : super(widget); // 1

    // hàm build
    Widget build() => widget.build(this); // 2
}

// StatelessElement extends ComponentElement extends Element
class Element {
    Element(this.widget);

    Widget widget;
}
```
Khám phá được gì từ 2 dòng code được mình đánh dấu 1 và 2 đó:
1. Constructor của class `StatelessElement` nhận một `StatelessWidget` là tham số. Như vậy, một `StatelessElement` sẽ giữ tham chiếu của `StatelessWidget` qua biến `widget`. Biến `widget` ở bên trong class cha của nó là class `Element` ấy.
2. Hàm `build` trong class `StatelessWidget` mà chúng ta đã biết ở những bài trước là do chính `StatelessElement` gọi

Như vậy, code đã chứng minh được: `StatelessElement` nắm giữ một reference của `StatelessWidget` qua biến `widget`. Giờ chúng ta vào bên trong class `StatefulElement` khám phá tiếp xem nhé:
### Khám phá class StatefulElement
```rust:dart
class StatefulElement extends ComponentElement {
  StatefulElement(StatefulWidget widget) : super(widget) { // 1
    state = widget.createState(); // 2
    state.widget = widget; // 3
  }

  // hàm build
  Widget build() => state.build(this); // 4

  State<StatefulWidget> state;
}
```

4 dòng code được mình đánh dấu 1, 2, 3 và 4 đó đã nói lên được những gì:
1. Cũng tương tự như `StatelessElement`, constuctor của `StatefulElement` cũng nhận một là `StatefulWidget` là tham số. Như vậy một `StatefulElement` sẽ giữ tham chiếu của `StatefulWidget` qua biến `widget`
2. Hàm `createState` trong class `StatefulWidget` kìa, thấy quen không. Thì ra thằng `StatefulElement` đã bảo `StatefulWidget` làm giúp nó một việc: *"Hey, StatefulWidget, chú gọi hàm `createState` để tạo ra một `State` object rồi để anh giữ một tham chiếu đến `State` object đó thông qua biến `state` được ko"* . Và `StatefulWidget` đã nghe lời và làm theo :D.
3. Hóa ra trong bài 2, mình nói thằng `State` object có một tham chiếu của thằng `StatefulWidget` qua biến `widget` là nhờ dòng code sử dụng lệnh gán này đây các bạn. 
4. Hàm `build` trong class `State` là do `StatefulElement` gọi. 

Kết thúc chặng khám phá code thứ nhất. Tất cả những phân tích rườm rà ở trên được đúc kết quả một tấm ảnh. Và thật sự, chặng 1 mình chỉ muốn các bạn thấy được quan hệ giữa *Widget Tree* Và *Element Tree* và các *State object* qua như tấm ảnh này đây. Các mũi tên đó là reference đó. Như vậy, `StatefulElement` có reference của `StatefulWidget` và `State`, còn `StatelessElement` thì có reference của `StatelessWidget` :D

![](https://images.viblo.asia/23ae8fb8-6078-402d-b73d-7205dd454fee.png)

Chặng 1 chỉ cần hiểu được cái ảnh này là đủ :D. Nào chúng ta cùng tiếp tục chặng 2.
## Chặng 2: Quan hệ giữa Widget, Element và RenderObject
Nếu để ý, bạn sẽ thấy 2 class `StatelessElement` và `StatefulElement` được mình trích ra ở trên đều kế thừa `ComponentElement`. Trong Flutter, class `Element` có 2 class con quan trọng là `ComponentElement` và `RenderObjectElement`.
* `RenderObjectElement`: mỗi `RenderObjectElement` khi được gắn lên *Element Tree* sẽ nhờ `widget` mà nó đang nắm giữ gọi hàm `createRenderObject()` để tạo ra object `renderObject` và nó sẽ nắm giữ tham chiếu của `renderObject` này luôn.
* `ComponentElement` giống như là một tổ hợp (compose) nhiều `Element`, nó có khả năng tạo ra những `RenderObject` một cách gián tiếp thông qua việc tạo ra những `RenderObjectElement` hoặc những `ComponentElement` khác.

Bài viết này mình sẽ không đi sâu vào các class đó. Chặng 2 này mình muốn chúng ta tạm hiểu một cách ngắn gọn: 

>Thằng `Element` nào cũng tạo ra một hoặc nhiều `RenderObject` để vẽ UI, không tạo trực tiếp thì cũng tạo gián tiếp. Như vậy một *Element Tree* cũng sẽ tạo được một *Render Tree* và chúng ta có đến 3 cái cây là: *Widget Tree*, *Element Tree* và *Render Tree*. 

Như vậy, ở chặng 1 ta đã biết `Element` có tham chiếu của `Widget` và `State`, chặng 2 ta còn biết thêm `Element` có tham chiếu của `RenderObject`. Vậy thì không còn nghi ngờ gì nữa, `Element` là thằng quản lý cây. Tất cả quan hệ được thể hiện qua một tấm ảnh sau:

![](https://images.viblo.asia/a06b13be-e218-4aeb-ac29-0d1d11fcffcf.png)

Mình mới vừa trả lời xong 3 dấu hỏi trong cái ảnh ở mục 2, thì bây giờ lại mọc lên 3 dấu hỏi mới. Chúng khẳng định là: 

>Trong khi các `Widget` liên tục bị rebuild, tức là bị destroy rồi build lại thì các `Element` chỉ tạo ra đúng 1 lần và nó chỉ **được update** chứ nó rất hiếm khi phải bị đập đi xây lại `Element` mới. 

Thật sự đúng là như vậy đó các bạn. Đó là ý đồ của Flutter để giữ cho App Flutter luôn có performance tốt. Chúng ta đã biết, `Widget` là bản thiết kế, một nơi cung cấp thông tin về size, màu sắc, .... Và ẩn sâu bên trong, Flutter đã sử dụng `Element` để ra lệnh `RenderObject` dựa vào bản thiết kế đó để vẽ nó bằng rất nhiều hàm như `paint`, `performLayout`, ... Các thuật toán render hay khởi tạo một `RenderObject` được Flutter viết rất phức tạp, phức tạp hơn rất nhiều so với những `Widget` chúng ta code. Vậy nên tốt nhất là nên giữ các object `RenderObject` trong bộ nhớ càng lâu càng tốt chứ không nên destroy chúng rồi sau phải tạo lại vì chúng khá tốn kém khi khởi tạo lại. Nói cách khác, `RenderObject` và `Element` rất là đắt giá, đắt hơn nhiều `Widget` nên Flutter mới để cho `Widget` bị rebuild liên tục còn `Element` và `RenderObject` thì hạn chế bị rebuild, hạn chế đập đi xây lại, chúng chỉ nên được update mà thôi.

1. Như thế nào là **Element được update**?. 
3. Khi nào thì `Element` được update, khi nào thì `Element` bị rebuild?

Đây là 2 câu hỏi lớn trong bài. Cũng là mục đích chính để mình viết bài này. Và để trả lời được 2 câu hỏi này, ta sẽ cần phải tìm hiểu: *Mỗi lần rebuild tree, Fluter thực sự đã làm những gì?*
# 4. Nàng Flutter đã làm gì mỗi lần rebuild
Mỗi lần Widget bị rebuild, tức là có một `Widget` mới thay cho `Widget` cũ, `Element` sẽ so sánh thằng `Widget` mới đó với thằng cũ xem cái bản hiện tại có khác gì bản thiết kế mới hay không rồi đưa một quyết định quan trọng. 

Cụ thể, `Element` sẽ xem xét cái *Widget Type*, nếu nó thấy `Widget` cũ và mới có cùng *Type* (ví dụ như cái `Widget` cũ là `Text`, cái `Widget` mới cũng là `Text`) thì `Element` đó sẽ không bị rebuild mà  `Element` đó chỉ **update bản thân nó** bằng cách **cho biến `widget` vốn đang trỏ đến Widget cũ, chuyển sang trỏ đến cái Widget mới**, rồi `renderObject` tiếp tục công việc đọc các thông số trong bản thiết kế mới và vẽ lại thôi. Quả là thông minh, nhờ thế mà UI được update mà không cần phải tái tạo lại `Element` và `RenderObject` vốn rất tốn kém mỗi lần khởi tạo mới. Triệu lời giải thích cũng không thể bằng tấm ảnh dưới đây:

![](https://images.viblo.asia/afeb60e1-5798-4051-a8c5-e1aec2c9841a.png)

Cái ảnh đã nói lên tất cả. Bạn đã hiểu *Mỗi lần rebuild thì Element được update* là như thế nào chưa. Nhìn hình cũng thấy Widget cũ mà `Element` đang trỏ tới là `Text('Trip A')` bị đập đi và biến `widget` trong `Element` chuyển sang trỏ đến `Widget` mới là `Text('Trip B')`. Như vậy: `Element` và `State` được update, chứ không phải rebuild. `Widget` mới bị rebuild, vì nó bị đập đi cái cũ, tạo ra cái mới thay thế. 

Sau khi so sánh xong 1 `Widget` tại vị trí đó, `Element` sẽ tiếp tục chạy xuống `Widget` kế tiếp trên tree để tiếp tục công việc so sánh. Nếu quá trình so sánh gặp trường hợp Widget cũ và Widget mới khác *Widget Type* thì sẽ rất căng. Tại vị trí đó, thằng `Widget` mới đó sẽ gọi lại hàm `createElement` để tạo `Element` mới và các `RenderObject` mới cũng được tạo ra. Cứ như thế, sub `Element Tree` kéo theo sub `Render Tree` bị rebuild, dẫn đến performance của app sẽ rất kém. Vì vậy nên tránh các trường hợp thế này nhá :D

Code demo thử phát biết ngay nó tạo lại `Element` thế nào. Sử dụng code của app Counter nhưng sửa lại code 1 tí và có đặt log vào để quan sát: khi `_counter` là số chẵn sẽ hiển thị 1 `Column`, ngược lại `_counter` là số lẻ sẽ hiển thị 1 `Row`:
```python:dart
Center(child: _counter % 2 == 0? Column() : Row())
```

Full source code để vào xem log và run app trải nghiệm: https://dartpad.dev/e2553214e383480d0af1e2c15c809588

Xem log ta sẽ thấy, mới run app tức là first build thì từng `Widget` gọi hàm `createElement`. Nhưng khi click 1 lần, 2 lần để rebuild `MyHomePage`. Ta sẽ thấy `MyText` gọi lại hàm `createElement` như này:
```markdown
MyText createElement
```

![](https://images.viblo.asia/1d5d61cc-54cc-4a4d-a62d-3f29828cf25f.gif)

Như vậy, mình xin túm lại một câu chốt trả lời cho câu: *Khi nào thì `Element` được update, khi nào thì `Element` bị rebuild*:

> Mỗi lần rebuild, Flutter walk down the Element Tree, từng Element sẽ so sánh Widget cũ (cái mà nó đang nắm giữ trong biến `widget`) và Widget mới. Nếu nó thấy Widget cũ và Widget mới có **cùng Widget Type** nó sẽ **update** biến widget trỏ đến `Widget` mới đó. Ngược lại, tức là **khác Widget Type**, nó sẽ bị **rebuild**.

Và đó cũng là mục đích chính của bài viết này. Chỉ cần hiểu được câu chốt này thì sẽ dễ dàng hiểu được khái niệm về `Key` trong [bài tiếp theo](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-6-key-la-gi-co-mo-khoa-trai-tim-nang-duoc-khong-ORNZqk4q50n).
# Kết bài
Thật ra qúa trình so sánh ở trên, `Element` ngoài so sánh `Widget Type`, nó còn so sánh thêm một yếu tố nữa đó là `Key`. Đó cũng là lý do mình cần phải viết bài này một cách căn bản nhất có thể. Những nội dung trong bài chỉ vừa đủ để hiểu được những lý thuyết về `Key` chứ không đi quá sâu vào việc Flutter render hình ảnh như thế nào. Nếu các bạn tò mò có thể tự tìm hiểu bằng các link tham khảo bên dưới nhé :D

Xuất hiện từ [bài 1](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-1-lam-quen-co-nang-flutter-4dbZNJOvZYM#_ket-thuc-mo-10), đến giờ nhân vật `Key` mới chịu come out trong bài viết tiếp theo. Hy vọng các bạn cùng đón đọc.

![](https://images.viblo.asia/05e8829b-3847-4b87-81b3-a6da1f0fe8e0.gif)

Đọc tiếp phần 6: [Key là gì, có mở khóa trái tim nàng được không?](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-6-key-la-gi-co-mo-khoa-trai-tim-nang-duoc-khong-ORNZqk4q50n)

Đọc tiếp phần 7: [Lột trần trụi GlobalKey](https://viblo.asia/p/hoc-flutter-tu-co-ban-den-nang-cao-phan-7-lot-tran-trui-globalkey-bJzKmPxk59N)

Tham khảo: 

https://medium.com/flutter-community/the-layer-cake-widgets-elements-renderobjects-7644c3142401

https://www.didierboelens.com/2019/09/flutter-internals/?fbclid=IwAR1s-dcp-SffTC_LxDDg4oXos3N_Y8-ZFI4sLKJ40n7RuzU4CIJW1Xp58Bc

https://medium.com/flutter-community/flutter-what-are-widgets-renderobjects-and-elements-630a57d05208

https://www.youtube.com/watch?v=996ZgFRENMs&ab_channel=Flutter

https://flutter.dev/docs/resources/architectural-overview#build-from-widget-to-element

Flutter Recipes của tác giả Fu Cheng

Beginning Flutter của tác giả Marco L. Napoli