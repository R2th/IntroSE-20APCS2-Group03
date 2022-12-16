![image.png](https://images.viblo.asia/2011097c-ebce-4ce3-82ab-ec84bb7c36a9.png)

**Stateful** vs **Stateless Widget**

Trong bài viết này, chúng ta sẽ tìm hiểu chi tiết về các state trong **Flutter**: bao gồm **Stateful** và **Stateless widget**.

## State trong Flutter là gì?

Mình chắc chắn rằng bạn đã gặp nhiều định nghĩa về **state** trên internet trước đây và thành thật mà nói tất cả chúng dường như hơi phức tạp để hiểu vì các định nghĩa đó khá sách vở. Thực sự là bản thân mình cũng đã từng như thế.

Vì thế mình sẽ cố gắng để giải thích nó đơn giản hết sức có thể về State trong Flutter:

> State là một số dữ liệu hoặc thông tin được ứng dụng của bạn sử dụng. Nó có thể kích hoạt quá trình **rebuild** giao diện người dùng hoặc các phần nhất định của giao diện người dùng dựa trên dữ liệu đã thay đổi.

Về cơ bản, **Flutter** lưu giữ snapshot của widget hiện đang được hiển thị và nếu bất kỳ dữ liệu nào bên trong widget đó thay đổi thì dữ liệu snapshot trước đó và dữ liệu hiện tại sẽ được so sánh và **widget** liên quan sẽ được **rebuild**!

Về lý thuyết State là vậy. Sau đây, mình sẽ sử dụng state trong một app ví dụ thực tế. Hãy xem xét ví dụ về ứng dụng mặc định mà Flutter cung cấp cho chúng ta khi chúng ta khởi tạo dự án mới.

![image.png](https://images.viblo.asia/6b2cdb73-f536-4dc1-b2cc-03f77def3a40.png)

Bạn có thể thấy rằng khi nhấn **Floating Action Button**, số đếm hiển thị trong **Text Widget** phản ánh thay đổi. Bạn có thể thắc mắc điều này xảy ra như thế nào? Vì vậy chúng ta hãy nghiên cứu thêm.

* Giá trị ban đầu của biến counter là `0`, do đó `0` được hiển thị ngay từ lúc đầu.
* Ngay sau khi nút được nhấn, một hàm được gắn vào phương thức `onClick(){...}` của nút làm tăng giá trị của bộ đếm lên `1`. Vì vậy, giá trị tăng `1` trên mỗi lần nhấn nút.
* Ngay sau khi giá trị của các biến đếm thay đổi, nó sẽ phát hiện ra những thay đổi này, do đó sẽ kích hoạt phương thức `build(){...}` của widget mà đếm biến hoạt động.
* Khi phương thức `build(){...}` được kích hoạt, một bản build hoàn chỉnh của tất cả các child/nested widgets bên trong widget đó sẽ được rebuild với dữ liệu mới.
* Do đó, chúng ta thấy dữ liệu được cập nhật trong thời gian thực. Đây là cách hoạt động của **state** trong **Flutter**.

Trong trường hợp bạn đang thắc mắc về cách **rebuild** giao diện người dùng hoàn chỉnh hiệu quả như thế nào, hãy yên tâm vì **Flutter** khá hiệu quả và thông minh trong việc phát hiện các **widget** cần **rebuild** và chỉ **rebuild** chúng.

### App-Wide State

Các giá trị nếu người dùng được xác thực, một số dữ liệu được tìm nạp từ backend/server có thể được coi là app-wide state. Các loại dữ liệu này kiểm soát tổng thể cả ứng dụng.

### Widget state

**Widget state** có thể được coi là một cái gì đó giống như:

* Vòng quay loading hiển thị khi dữ liệu đang được tìm kiếm từ backend/server.
* Giá trị input vào của người dùng hiện tại hoặc số lần người dùng đã nhấn vào nút trong trường hợp ứng dụng mẫu của chúng ta.

Widget states có thể và sẽ thay đổi thường xuyên nhất trong mọi trường hợp.

Bây giờ chúng ta đã hiểu rõ về những gì state làm và cách các widget được rebuild, chúng ta hãy tiếp tục tìm hiểu về các **Stateless widget** và **Stateful widget**.

## Stateless Widgets

Như tên của nó, tất cả các widget không thể/sẽ không tự rebuild ngay cả khi dữ liệu hoặc các biến bên trong chúng thay đổi. Một stateless widget điển hình trông như thế này:

```
import 'package:flutter/material.dart';

class DummyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      // your nested widgets and children
      child: ...
    );
  }
}
```

Vì vậy, bất kỳ widget nào kế thừa `StatelessWidget` class từ material package được coi là một stateless widget bởi Flutter. Các widget này sẽ không thay đổi khi người dùng tương tác với chúng, ngay cả khi dữ liệu bên trong chúng thay đổi. Nó chỉ quan tâm đến việc hiển thị một số dữ liệu nhất định với một style nhất định.

* Các widget này chỉ được tạo một lần duy nhất, tức là khi chúng được hiển thị trên màn hình, chúng sẽ không thay đổi cho đến khi và trừ khi dữ liệu bên ngoài (Widget cha) cung cấp cho chúng thay đổi.
* Phương thức xây dựng của các widget này chỉ có thể được kích hoạt nếu widget cha của các widget này được rebuild hoặc dữ liệu được cung cấp cho chúng bên ngoài thông qua các thay đổi về hàm dựng (constructor) của chúng.
* Hãy xem xét trường hợp một stateful widget là parent của một stateless widget. Nếu phương thức build(){...} của stateful widget gốc được kích hoạt bằng cách nào đó thì child stateless widget cũng được rebuild.
* Stateless widget sẽ rebuild nếu dữ liệu bên ngoài chúng thay đổi nếu **Provider** được đính kèm với stateless widget và widget đó là consumer hoặc active listener đối với provider. Ngay sau khi các giá trị của provider thay đổi, stateless widget sẽ rebuild.
* Một số ví dụ về stateless widgets là `Text()`, `Column()`, `Row()`, v.v.

Bây giờ, sẽ đến các **stateful widget**.

## Stateful Widgets

Tất cả các widget kế thừa `StatefulWidget` class được coi là các stateful widget. Các widget này sẽ kích hoạt các phương thức build của chúng ngay khi dữ liệu bên trong chúng thay đổi hoặc dữ liệu bên ngoài được cung cấp cho chúng thông qua các thay đổi về hàm dựng của chúng. Trong cả hai trường hợp, phương thức `build(){...}` của các widget này được kích hoạt. Hãy xem nhanh một ví dụ về **stateful widget:**

```
class DummyWidget extends StatefulWidget {
  @override
  _DummyWidgetState createState() => _DummyWidgetState();
}

class _DummyWidgetState extends State<DummyWidget> {
  bool _isGreen = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _isGreen ? Colors.green : Colors.red,
      appBar: AppBar(
        title: Text('Your First App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            FlatButton(
              onPressed: () {
                setState(() {
                  _isGreen = !_isGreen;
                });
              },
              child: Text(_isGreen ? 'TURN RED' : 'TURN GREEN'),
            ),
          ],
        ),
      ),
    );
  }
}
```

Ví dụ trên là từ bài viết trước của mình. Chúng ta có thể thấy rõ rằng có rất nhiều thứ đang diễn ra ở **stateful widget** so với **stateless widget**.

### Điều gì tạo nên một Stateful Widget?

Các stateful widget không chỉ là một class mà là sự kết hợp của hai class.

```
class DummyWidget extends StatefulWidget {
  @override
  _DummyWidgetState createState() => _DummyWidgetState();
}
```

Class thứ nhất kế thừa `StatefulWidget` và override phương thức `createState()`. Phương thức `createState()` được khai báo bởi `tatefulWidget` class.

> Chúng ta sử dụng tường minh phương thức `@override` để cho Flutter biết rằng chúng ta đang trả về một đối tượng mới dựa trên class thứ hai và chúng ta có thể kết nối cả hai class này.

Class thứ hai bao gồm tất cả logic liên quan đến widget state.

```
class _DummyWidgetState extends State<DummyWidget> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        // rest of the code
    );
  }
}	
```

Trong class này được đặt tên là` _<widget_name>State` trong đó `_` xác định rằng nó là private và tên widget bắt buộc để cho biết widget's state mà nó sẽ nắm giữ.

`State` là một class được import từ `material package`. Vì vậy, chúng ta cung cấp cho nó tên của widget để cho phép người dùng biết widget's state mà chúng ta muốn liên kết với nó.

> Ở class đầu tiên có thể được tạo lại ngay khi dữ liệu bên ngoài được cung cấp thông qua phương thức khởi tạo thay đổi. Nhưng vì chúng ta cần giữ lại state bên trong của widget khi việc rebuild do thay đổi từ Widget cha. Do đó, chúng ta cần hai class, một cái để kích hoạt build, nhận vào các dữ liệu từ bên ngoài và một cái để kích hoạt rebuild cho chính bản thân nó.

### `setState(){...}` method

Trong ví dụ trên, chúng ta đang sử dụng phương thức `setState(){...}` được thực thi sau khi người dùng nhấn `FlatButton`. Hàm này được cung cấp bởi `State class` mà chúng ta kế thừa từ material package.

Chúng ta bọc tất cả logic/code bên trong hàm này để thay đổi dữ liệu. Dữ liệu nội bộ này lại đang được sử dụng cho hàm build của widget. Vì vậy, ngay khi dữ liệu này thay đổi, hàm build sẽ được kích hoạt.

## Kết

Đó là những kiến thức chuyên sâu về cách các **stateless** và **stateful** widget hoạt động. Mình hy vọng rằng bây giờ bạn đã hiểu rõ ràng hơn nhiều về cách thức hoạt động của những thứ này. Trong hầu hết các ứng dụng, chúng ta sử dụng các stateless widget thường xuyên hơn so với các stateful widget bởi vì trong hầu hết các trường hợp, tất cả những gì chúng ta quan tâm là hiển thị dữ liệu mà thôi.

Nhưng đôi khi chúng ta cũng sử dụng **stateful** widgets để phục vụ cho việc cập nhật, thay đổi từ trong chính bản thân Widget này. Trong đó có thể là: thay đổi trạng thái khi người dùng tương tác hoặc nhận các sự kiện khác trong ứng dụng.

> Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/flutter-co-ban-state-trong-flutter/

Bài viết được lược dịch từ [Shashank Biplav](https://shashankbiplav.me/flutter-basics-understanding-state).