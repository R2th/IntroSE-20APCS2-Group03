"Mọi thứ đều là Widget". Đây là một câu nói mà bạn thường gặp khi tìm hiểu về Flutter. 
 
 Team Flutter nói rằng “A widget is an immutable description of part of a user interface”. Khi bạn đọc source code của Flutter, bạn sẽ thấy định nghĩa sau về lớp Widget:
 
 ![](https://miro.medium.com/max/1996/0*eOwZhDfg8SXAb8tf)
 
 Annotation "@immutable" cho chúng ta thấy rằng mọi properties trong Widget phải là final. Do đó các thuộc tính trong mỗi instance Widget
không thể thay đổi. Tuy nhiên trong thực tế UI không phải là "bất biến" mà nó có thể thay đổi. Vậy Flutter quản lý trạng thái của UI, phản ứng lại những thay đổi thế nào? 

Flutter có 3 "trees": Widget tree, Element tree, RenderObject Tree. Chúng có những khái niệm khác nhau, nhưng kết hợp với nhau chúng sẽ tối ưu hoá hiệu suất rendering UI nhiều nhất có thể. Widget thì không xa lạ gì với bạn rồi, thế Element và RenderObject là gì?

# I. Element
> "An instantiation of a Widget at a particular location in the tree" - "Mô tả một Widget tại một vị trí cụ thể trên 'cây' "

Không giống như Widget, Element là "mutable". Có nghĩa là các properties của nó có thể được thay đổi mà không cần tạo 1 element mới. Nó quản lý việc cập nhật và thay đổi UI. Hoặc bạn có thể coi là nó quản lý vòng đời của các Widgets. Mỗi elment giữ một tham chiếu đến Widget và RenderObject
![](https://miro.medium.com/max/681/0*7dZXnap2ExHEwSBq)
# II. RenderObject
Thành phần chính chịu trách nghiệm vẽ lên UI của bạn
> RenderObject: handle size, layout, and painting

Khi Flutter vẽ UI của bạn, nó không dựa vào Widget tree, mà dựa vào RenderObject tree, nơi mà kiểm soát tất cả các size, layouts, và các logic để vẽ 1widget thực thụ. Do đó RenderOject rất  tốn kém để khởi tạo.
# III. Ví dụ cụ thể
**Để hình dung rõ hơn về 3 tree trên, chúng ta xem ví dụ đơn giản sau:**
```dart
class MyWidget extends StatelessWidget {
  const MyWidget();
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(),
      child: SomeText(text: "Hello"),
    );
  }
}

```

Trong thời điểm render, Flutter giọi hàm build() của widget có thể xuất hiện một vài widget mới, trong trường hợp chúng được lồng vào nhau:
![](https://images.viblo.asia/128146ce-84dd-49c6-a433-46be744a800b.png)

Một số box có màu xám thể hiện cho những widget không được thêm vào bởi bạn. Cùng với Widget tree, Flutter cũng xây dựng song song Element tree và Render tree. Chúng lần lượt được tạo bởi createElement() và createRenderObject() khi các widget được duyệt qua. Lưu ý: createElement luôn được gọi trên các widget nhưng createRenderObject chỉ được gọi trên các element có kiểu [RenderObjectElement](https://api.flutter.dev/flutter/widgets/RenderObjectElement-class.html). 
![](https://images.viblo.asia/21d31d3e-555a-4254-9991-3de05be3d377.png)

Ta sẽ đi vào phân tích các tree để biết Flutter thực sự hoạt động như thế nào.
* **Render tree** : Như đã trình bày ở trên, RenderObject chứa tất cả logic để render widget tương ứng và nó rất tốn kém khi create. Nó quản lý layout, constraints, hit testing và painting. Framework giữ chúng trong memory lâu nhất có thể, thay đổi giá trị properties bất cứ khi nào có cơ hội. Có nhiều loại render như:

    * RenderFlex
    * RenderParagraph
    * RenderBox...

Trong quá trình build, framework chỉ cập nhật hoặc tạo mới  RenderObject khi nó gặp một RenderObjectElement trong element tree.

* **Element tree**: Một element liên kết giữa Widget và RenderObject tương ứng của nó nên nó giữ các tham chiếu bên trong. Các elemetn được tối ưu cho việc so sánh các items và tìm kiếm các thay đổi, nhưng chúng không thực hiện việc render. Có 2 loại element:

+ComponentElement: Một element chứa các element khác. Nó liên kết với một widget mà chứa 1 widget khác : 
```dart
abstract class ComponentElement extends Element { ... }
```
+RenderObjectElement.: Một element tham gia vào các giai đoạn painting, layout, hit testing.
```dart
abstract class RenderObjectElement extends Element { ... }
```

Về cơ bản element tree là một loạt các ComponentElement và RenderObjectElement tuỳ thuộc vào widget mà chúng tham chiếu đến. Như trong ví dụ trên Container sẽ tạo ra 1 ComponentElement vì nó chứa widget khác bên trong.
      
* Widget tree : Nó được tạo thành từ các lớp extend  StatelessWidget hoặc StatefulWidget.  Chúng được chúng ta dùng để xây dựng UI và không tốn kém khi create (ít hơn nhiều so với RenderObject).

Bất cứ khi nào widget tree thay đổi (ví dụ như bởi một thư viện quản lý state), Flutter sẽ sử dụng element tree để so sánh giữa widget tree mới và render tree.  Element là "trung gian" giữa Widget và RenderObject được sử dụng để so sánh nhanh chóng và giữ cho các trees được cập nhật.

1. Một Widget được coi là "nhẹ" và nó được khởi tạo nhanh chóng nên việc rebuild thường xuyên hoàn toàn không phải là vấn đề.  Tất cả các widget đều là immutable và đó là lý do tại sao state của StatefulWidget được triển khai trong một lớp riêng biệt khác.  Bản thân một StatefulWidget là immutable nhưng state của nó lại mutable

```dart
class Example extends StatefulWidget {
  const Example();
  @override
  _ExampleState createState() => _ExampleState();
}

class _ExampleState extends State<Example> {
  @override
  Widget build(BuildContext context) {...}
}
```
2. RenderObject thì tương đối "expensive" và cần thời gian để khởi tạo vì vậy nó chỉ được tạo lại khi thực sự cần thiết.  Hầu hết các lần chúng chỉ cập nhật giá trị của các properties.

Ở mỗi lần rebuild, Flutter duyệt qua toàn bộ cây để tìm kiếm các thay đổi trên các widgets. Nếu type của widget thay đổi thì nó sẽ bị xoá và được thay thế bới widget mới (cùng với element và renderObject được liên kết với nó). Tất cả 3 subtree đều sẽ được recreate. Nếu widget có cùng type và chỉ một vài properties thay đổi, element sẽ không bị ảnh hưởng, renderObject thì sẽ được cập nhật, ví dụ:
```dart
Widget build(BuildContext context) {
  return Container(
    decoration: BoxDecoration(),
    child: SomeText(text: "Hello"),
  );
}

```
 Thay đổi text thành: 
```dart
Widget build(BuildContext context) {
  return Container(
    decoration: BoxDecoration(),
    child: SomeText(text: "Hello world!"),
  );
}

```

Khi rebuild, dựa và element tree, Flutter biết rằng type vẫn thế (SomeText) nhưng propety (text) thay đổi. Do đó renderObject chỉ cần cập nhật (cheap).
![](https://images.viblo.asia/c44dfad8-cdd7-4579-9bbc-decddd7e78e1.png)
Mọi thứ diễn ra rất nhanh vì RenderObject không cần recreated mà chỉ cần modified. Tuy nhiên nếu ta thay SomeText thành widget Text của Flutter:
```dart
Widget build(BuildContext context) {
  return Container(
    decoration: BoxDecoration(),
    child: Text("Hello world!"),
  );
}

```
Trong khi duyệt qua toàn bộ tree, một lần nữa framework nhận thấy sự thay đổi nhờ element tree.  Đặc biệt, lần này type của widget hoàn toàn khác nên cần phải xây dựng lại toàn bộ các subtree (widget, element, render![](https://images.viblo.asia/4d131985-846d-49c5-9643-34e8ff48006b.png)
).

Trong trường hợp này renderObject phải được recreate vì widget có type khác nên không thể tái sử dụng lại instance cũ.

> Note: Tham số BuildContext mà bạn thấy trong bất kỳ phương thức build () nào về cơ bản đại diện cho Element được liên kết với các widget.  Trong thực tế, các BuildContext object là các Element object.  Team Flutter đã tạo BuildContext để tránh tương tác trực tiếp với Element, Element sẽ được sử dụng bởi framework chứ không phải bởi chúng ta.

# IV. Tổng kết

* Render tree là tree thực sự vẽ lên các thành phần của UI.
* Widget tree được xây dựng bới chính chúng ta(developer).
* Element tree được duy trì bởi framework để quyết định xem đã đến lúc cập nhật hoặc tạo lại RenderObject hay chưa.

Tham khảo:

[flutter.dev](https://flutter.dev)

[Ebook Flutter Complete Reference của Giorgia]()