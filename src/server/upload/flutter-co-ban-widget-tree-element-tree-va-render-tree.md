![image.png](https://images.viblo.asia/c8fd46de-e02d-421d-a669-0ccec385b3f7.png)

Sau khi đọc bài viết trước của tôi trong loạt bài này, có lẽ bạn sẽ thắc mắc rằng thực sự làm thế nào để rebuild các widget. Mỗi widget đều có hàm build riêng và chúng được gọi thường xuyên! Trong suốt quá trình rebuild này cho tới khi hoàn tất, chúng ta tiêu tốn bao nhiêu phần trăm hiệu suất?

Để có thể trả lời tất cả những điều này, chúng ta cần hiểu về **Element Tree**, **Widget Tree** và **Render Tree.** Cùng với những điều này, chúng ta cũng cần hiểu cách **Flutter** thực thi phương thức `build(){...}`, cách nó rebuild và thay đổi thông tin trên màn hình.

> Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/flutter-co-ban-widget-tree-element-tree-render-tree/

## Những gì thực sự đã xảy ra

**Flutter** không vẽ lại hay tạo lại toàn bộ giao diện người dùng mỗi khi ta phương thức `build(){...}` được gọi. Chúng ta sẽ thảo luận chi tiết hơn về vấn đề này.‌‌

* Flutter cố gắng đáp ứng để ứng dụng chạy ở **60 FPS** (Frames Per Second). Vì vậy, nó cập nhật màn hình **60** lần mỗi giây. Có nghĩa là màn hình được Flutter repaint lại 60 lần mỗi giây. Điều này khác dễ hiểu vì tất cả các ứng dụng và trò chơi chạy ở tốc độ **60 FPS** trở lên theo mặc định.‌‌‌‌
* Điều này sẽ chỉ trở nên kém hiệu quả nếu Flutter cứ phải tính toán lại toàn bộ bố cục 60 lần mỗi giây!‌‌
* Nếu Flutter vẽ thứ gì đó lên màn hình lần đầu tiên, nó cần tính toán ra vị trí, màu sắc, văn bản, v.v. của mọi phần tử trên màn hình. Tóm lại, trong lần kết xuất giao diện đầu tiên, Flutter cần chỉnh sửa từng điểm ảnh trên màn hình.‌‌
* Đối với các lần sửa/vẽ tiếp theo, để làm mới giao diện người dùng nếu không có gì thay đổi thì Flutter sẽ lấy thông tin cũ mà nó đã có từ trước đó và vẽ thông tin đó lên màn hình siêu nhanh và rất hiệu quả.‌‌
* Từ đó, tốc độ vẽ lại không phải là vấn đề, sẽ chỉ là vấn đề nếu Flutter phải tính toán lại mọi thứ trên màn hình với mỗi lần làm mới mà thôi.
* Đây là những gì chúng ta sẽ thảo luận chi tiết ở bài viết này: liệu Flutter có tính toán lại mọi thứ mỗi khi phương thức `build(){...}` được gọi hay không?!‌‌

![image.png](https://images.viblo.asia/ecca6e2f-4793-4941-ad34-89409e65ced5.png)

## Widget Tree‌‌

* **Widget Tree** chỉ đơn giản là tất cả các Widget mà bạn đang dùng để xây dựng ứng dụng, tức là code mà bạn viết sẽ tạo nên widget tree.‌‌
* Nó hoàn toàn do bạn kiểm soát. Bạn khai báo các widget lồng ghép chúng lại với nhau để tạo nên bố cục mong muốn.‌‌
* Cái Tree này được xây dựng bởi Flutter khi call phương thức `build(){...}` từ code của chúng ta, chúng chỉ là một loạt các cài đặt cấu hình mà Flutter sẽ xử lý.‌‌
* Nó không chỉ đơn giản xuất hiện ra trên màn hình rồi thôi. Thay vào đó, nó sẽ cho Flutter biết những gì sẽ vẽ lên màn hình ở lần tiếp theo. Widget tree được rebuild rất thường xuyên.‌‌

## Element Tree‌‌

* **Element Tree** liên kết vào **Widget Tree**, là thông tin được thiết lập với các đối tượng/phần tử thực sự được hiển thị. Nó rất hiếm khi rebuild.‌‌
* **Element Tree** được quản lý theo một cách khác và sẽ không rebuild khi phương thức `build(){...}` được gọi. ‌‌
* Ở mỗi Widget trong Widget Tree, Flutter sẽ tự động tạo một element cho nó. Nó được thực hiện ngay khi Flutter xử lý Widget ở lần đầu tiên.‌‌
* Ở đây chúng ta có thể nói rằng một element là một đối tượng được quản lý trong bộ nhớ bởi **Flutter**, nó có liên quan đến Widget trong **Widget Tree**.‌‌
* Element chỉ giữ một tham chiếu tới Widget (trong Widget Tree) đang giữ các thông số giao diện đầu cuối .‌‌‌‌

> Khi Flutter nhìn thấy stateful widget, nó sẽ tạo element và sau đó cũng gọi phương thức `createState()` để tạo một state object mới dựa trên state class.‌‌
> 
> Do đó, **state** là một đối tượng độc lập trong một **Stateful Widget** được kết nối với cả hai là element trong **Element Tree** và Widget trong **Widget Tree**.‌‌

## Render Tree‌‌

* **Render Tree** đại diện của các element/đối tượng thực sự được hiển thị trên màn hình.‌‌
* **Render Tree** cũng không rebuild thường xuyên!‌‌
* **Element Tree** cũng được liên kết với **Render Tree**. Element trong Element Tree trỏ đến **render object** mà chúng ta thực sự thấy trên màn hình.‌‌
* Bất cứ khi nào Flutter thấy một element chưa được render trước đó thì nó sẽ tham chiếu đến Widget trong Widget Tree để thiết lập, sau đó tạo một element trong element tree.‌‌
* Flutter cũng có một **layout phase**, giai đoạn mà nó tính toán và lấy không gian diện tích có sẵn trên màn hình, chiều, kích thước, hướng, v.v.‌‌
* Nó cũng có một phase khác để thiết lập các listeners với các Widget để chúng ta có thể thao tác các sự kiện, v.v.‌‌

> Một cách đơn giản, chúng ta có thể thấy rằng phần tử chưa được render thì sẽ được render ra màn hình. **Element** (trong element tree) sau đó có có một con trỏ đến **Render Object** (trong Render Tree) trên màn hình. Nó cũng có một con trỏ tới **Widget** (trong Widget Tree) mang theo các thông tin cấu hình cho phần tử này.

## Cách Flutter thực thi phương thức build(){...}‌‌

Phương thức `build(){...}` được Flutter gọi bất cứ khi nào state thay đổi. Về cơ bản, có hai kích hoạt quan trọng có thể dẫn đến việc rebuild.‌‌

* Một là khi phương thức `setState(){...}` được gọi trong một **Stateful Widget**. Việc call `setState(){...}` khi được gọi tự động sẽ dẫn đến phương thức `build(){...}` được gọi ngay sau đó.‌‌
* Thứ hai, bất cứ khi nào **MediaQuery** hoặc lệnh `Theme.of(...)` được gọi, bàn phím ảo xuất hiện hoặc biến mất, v.v. Bất cứ khi nào dữ liệu của những thứ này thay đổi, nó sẽ tự động kích hoạt phương thức `build(){...}`.‌‌

Chính xác là việc call `setState(){...}` sẽ đánh dấu phần tử tương ứng là `dirty`. Đối với lần render tiếp theo, diễn ra 60 lần mỗi giây, Flutter sau đó sẽ xem xét đến các thông tin thiết lập mới được tạo bởi phương thức build(){...} và sau đó cập nhật màn hình.‌‌

Tất cả các Widget lồng vào nhau bên trong Widget được đánh dấu là dirty sẽ được tạo các đối tượng mới widget/dart cho chúng. Do đó, một **Widget Tree** mới sẽ được tạo ra tương ứng các phiên bản mới của tất cả các Widget này.‌‌

> Widget Tree mới được tạo vì Widget Tree là bất biến, tức là bạn không thể thay đổi thuộc tính của một Widget hiện có mà chỉ có thể ghi đè lên nó bằng một cái mới. Phương pháp này được Flutter thực thi rất nhiều do nó có thể phát hiện các thay đổi hiệu quả hơn khi một đối tượng thay đổi.‌‌

## Ví dụ‌‌

Chúng ta có một Stateful Widget được hiển thị trên màn hình. Nó có một Child Widget lồng vào một văn bản (Text Widget). Text widget là một Stateless Widget và hiển thị văn bản trên màn hình dựa trên state của parent widget của nó.‌‌

```
import 'package:flutter/material.dart';

class TestWidget extends StatefulWidget {
  @override
  _TestWidgetState createState() => _TestWidgetState();
}

class _TestWidgetState extends State<TestWidget> {
  var state = true;
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.green,
      child: GestureDetector(
          onTap: () {
            setState(() {
              state = !state;
            });
          },
          child: Text(state ? 'True' : 'False')),
    );
  }
}
```

Bạn có thể thấy rằng ngay khi state thay đổi, văn bản hiển thị sẽ chuyển từ `True` sang `False` và ngược lại. `GestureDetector` là parent của Text Widget. Vì là parent của nó, GestureDetector xử lý sự thay đổi state bằng cách call phương thức `setState () {...}`.‌‌

Ngay sau khi Text Widget được nhấn vào thì parent nó sẽ xử lý setState, tức là **TestWidget** được đánh dấu là **dirty**. Một **Widget Tree** mới được hình thành khi build method được gọi bởi **Flutter**.‌‌

Sau đó, thông tin Widget Tree mới được so sánh với nội dung thực tế đang được hiển thị trên màn hình. Flutter phát hiện rằng màu vùng chứa không thay đổi và chỉ văn bản bên trong Text Widget được thay đổi. Vì vậy, Render Tree sẽ không hoàn toàn hiển thị lại nội dung mà chỉ hiển thị văn bản bên trong Text Widget mà thôi.‌‌

Đây là lý do tại sao **Flutter** làm việc rất hiệu quả. Element Tree không cần rebuild khi phương thức `build(){...}` được call. Chỉ **Widget Tree** được rebuild và sau đó **Element Tree** chỉ cập nhật tham chiếu của nó trỏ đến Widget Tree mới. Sau đó, nó sẽ kiểm tra xem thông tin mới của các Widget hiện có hay không. Nếu đúng như vậy thì nó sẽ chuyển thông tin vào các **Render Object** để các thay đổi có thể được vẽ trên màn hình.‌‌

Nếu bạn muốn đọc thêm về logic render thì mình nghĩ bạn nên xem [bài viết](https://flutter.dev/docs/resources/inside-flutter) này từ các tài liệu chính thức của Flutter.‌‌

## Chú thích nhanh‌‌

Một số Widget sẽ không bao giờ thay đổi ngay cả khi rebuild Widget Tree nên bạn có thể tối ưu hóa quá trình build hơn. Bạn có thể sử dụng từ khóa `const` phía trước chúng để cho Flutter biết rằng Widget nè sẽ không bao giờ thay đổi, do đó làm cho Flutter bỏ qua việc rebuild hoàn toàn widget đó. Ví dụ:

```
Padding(
        padding: const EdgeInsets.all(8.0),
        child: GestureDetector(
            onTap: () {
              setState(() {
                state = !state;
              });
            },
            child: Text(state ? 'True' : 'False')),
      ),
```

Ở trên, chúng ta chỉ định `const` bỏ qua việc rebuild **Padding Widget**. Ngoài ra, bạn có thể tối ưu hóa quy trình xây dựng bằng cách tách các widget lớn hơn thành các widget nhỏ hơn một cách cẩn thận.‌‌

## Kết

Bài viết này đã cung cấp và đi sâu hơn vào đặc tính của Flutter. Mình hy vọng bây giờ bạn đã có thể hiểu rõ hơn về những gì xảy ra đằng sau quá trình rebuild Widget. Mong là bạn sẽ thích bài viết này.‌‌

Bài viết được lược dịch từ [Shashank Biplav](https://shashankbiplav.me/flutter-basics-how-flutter-renders-the-contents-on-the-screen).