Sau khi đã xây dựng được UI ở các phần trước, chúng ta sẽ thêm tương tác vào ứng dụng của chúng ta để nhận tương tác của người dùng và phản hồi lại? Trong hướng dẫn này, bạn sẽ thêm tính tương tác vào một ứng dụng, cụ thể, bạn sẽ sửa đổi một icon để làm cho nó có thể click được bằng cách tạo một widget trạng thái tùy chỉnh quản lý hai widget không có trạng thái.

Giả sử ta đã xây dựng được một màn hình như ảnh sau.
![](https://images.viblo.asia/3dec05f0-e182-4b5c-a731-3dc7baa961b0.jpg)

Khi ứng dụng lần đầu tiên được mở, ngôi sao được fill màu đỏ, cho thấy hồ này trước đây đã được ưa chuộng. Con số bên cạnh ngôi sao cho thấy 41 người đã thích hồ này. Sau khi hoàn thành hướng dẫn này, chạm vào ngôi sao sẽ loại bỏ trạng thái ưa thích của nó, thay thế ngôi sao bằng một icon không được fill màu và giảm số lượng. Chạm một lần nữa sẽ yêu thích hồ, fill màu cho ngôi sao và tăng số lượng.

![](https://images.viblo.asia/c7c77b21-0d6c-40d7-8e2c-0f40afea3ef5.png)
Widget tùy chỉnh bạn sẽ tạo

Để thực hiện điều này, bạn sẽ tạo một widget tùy chỉnh duy nhất bao gồm cả ngôi sao và số đếm, chính là các widget con. Vì việc chạm vào ngôi sao sẽ thay đổi trạng thái cho cả hai widget, vì vậy cùng một widget sẽ quản lý cả hai.

## Quản lý trạng thái của Widget

**Vấn đề ở đây là gì?**
* Có nhiều cách tiếp cận khác nhau để quản lý trạng thái.
* Bạn, là người thiết kế widget, chọn cách tiếp cận để sử dụng.
* Nếu còn đang nghi ngờ, hãy bắt đầu bằng cách quản lý trạng thái trong widget cha.

Ai quản lý trạng thái của widget? Tự bản thân các widget? Các widget cha? Cả hai? Một đối tượng khác? Câu trả lời phụ thuộc vao nhiều thứ. Có một số cách hợp lệ để làm cho widget của bạn tương tác. Bạn, với tư cách là người thiết kế widget, đưa ra quyết định dựa trên cách bạn mong đợi widget của mình được sử dụng. Dưới đây là những cách phổ biến nhất để quản lý trạng thái:

* Các widget quản lý trạng thái riêng của nó
* Widget cha quản lý trạng thái của widget con
* Cách tiếp cận kết hợp

Làm thế nào để bạn quyết định sử dụng phương pháp nào? Các nguyên tắc sau sẽ giúp bạn quyết định:

* Nếu trạng thái được đề cập là dữ liệu người dùng, ví dụ: trạng thái checked/unchecked của CheckBox hoặc vị trí của Slider, thì trạng thái được quản lý tốt nhất bởi widget cha.

* Nếu trạng thái trong câu hỏi chỉ mang tính thẩm mỹ, ví dụ như một hình ảnh động, thì trạng thái được quản lý tốt nhất bởi chính widget đó.

Nếu còn đang nghi ngờ, hãy bắt đầu bằng cách quản lý trạng thái trong widget cha.

Ta hãy xem các ví dụ về các cách quản lý trạng thái khác nhau bằng cách tạo ba ví dụ đơn giản: TapboxA, TapboxB và TapboxC. Tất cả các ví dụ đều hoạt động tương tự nhau, mỗi nhóm tạo ra một container, khi tap, bật giữa một hộp màu xanh lá cây hoặc màu xám. Boolean *_active* xác định màu: xanh lục với trạng thái active hoặc xám đối với không active.

![](https://images.viblo.asia/cf73b37d-fb79-49ff-a86e-a1b64e6c4444.png)![](https://images.viblo.asia/b2907f7f-1ad7-4d67-b32b-9cd8bce57016.png)

Các ví dụ này sử dụng GestureDetector để ghi lại hoạt động trên Container.

### Các widget quản lý trạng thái riêng của nó
Đôi khi hợp lý nhất đối với các widget là quản lý trạng thái của nó trong nội bộ. Ví dụ, ListView tự động cuộn khi nội dung của nó vượt quá hộp kết xuất. Hầu hết các developer sử dụng ListView không muốn quản lý hành vi cuộn của ListView, vì vậy chính ListView quản lý cuộn của nó.

Lớp _TapboxAState :

* Quản lý trạng thái cho TapboxA .
* Xác định boolean *_active* xác định màu hiện tại của hộp.
* Xác định hàm *handleTap()* , cập nhật *active* khi hộp được gõ và gọi hàm *setState()* để cập nhật giao diện người dùng.
* Thực hiện tất cả các hành vi tương tác cho các widget.
```
// TapboxA manages its own state.

//------------------------- TapboxA ----------------------------------

class TapboxA extends StatefulWidget {
  TapboxA({Key key}) : super(key: key);

  @override
  _TapboxAState createState() => _TapboxAState();
}

class _TapboxAState extends State<TapboxA> {
  bool _active = false;

  void _handleTap() {
    setState(() {
      _active = !_active;
    });
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        child: Center(
          child: Text(
            _active ? 'Active' : 'Inactive',
            style: TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color: _active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
      ),
    );
  }
}

//------------------------- MyApp ----------------------------------

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Flutter Demo'),
        ),
        body: Center(
          child: TapboxA(),
        ),
      ),
    );
  }
}
```

### Các widget cha quản lý trạng thái của widget con
Thông thường, hợp lý nhất là widget cha quản lý trạng thái và cho biết widget con của nó khi nào cần cập nhật. Ví dụ: IconButton cho phép bạn coi biểu tượng là nút có thể tap được. IconButton là một widget phi trạng thái bởi vì Flutter đã quyết định rằng widget cha cần biết liệu nút đó đã được tap vào hay chưa, để nó có thể thực hiện hành động thích hợp.

Trong ví dụ sau, TapboxB xuất trạng thái của nó sang widget cha thông qua một callback. Vì TapboxB không quản lý bất kỳ trạng thái nào, nên nó subclass từ StatlessWidget.

```
// ParentWidget manages the state for TapboxB.

//------------------------ ParentWidget --------------------------------

class ParentWidget extends StatefulWidget {
  @override
  _ParentWidgetState createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: TapboxB(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

//------------------------- TapboxB ----------------------------------

class TapboxB extends StatelessWidget {
  TapboxB({Key key, this.active: false, @required this.onChanged})
      : super(key: key);

  final bool active;
  final ValueChanged<bool> onChanged;

  void _handleTap() {
    onChanged(!active);
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        child: Center(
          child: Text(
            active ? 'Active' : 'Inactive',
            style: TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color: active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
      ),
    );
  }
}
```
> Mẹo: Khi tạo API, hãy cân nhắc sử dụng chú thích *@required* cho bất kỳ tham số nào mà mã của bạn dựa vào. Để sử dụng *@required* , hãy import thư viện 'package:flutter/foundation.dart' ; 

### Cách tiếp cận kết hợp
Đối với một số widget, cách tiếp cận kết hợp là hợp lý nhất. Trong trường hợp này, widget trạng thái quản lý một số trạng thái và widget cha quản lý các khía cạnh khác của trạng thái.

Trong ví dụ TapboxC , khi tap xuống, một đường viền màu xanh đậm xuất hiện xung quanh hộp. Khi nhả ra, đường viền biến mất và màu của hộp thay đổi. TapboxC xuất trạng thái *active* của nó sang cha nhưng quản lý trạng thái *highlight* của nó trong nội bộ. Ví dụ này có hai đối tượng ParentWidgetState và TapboxCState .

Đối tượng _ParentWidgetState :

* Quản lý trạng thái _active .
* Thực hiện *handleTapboxChanged()* , phương thức được gọi khi hộp được gõ.
* Gọi *setState()* để cập nhật giao diện người dùng khi người dùng tap xuống và trạng thái *active* thay đổi.

Đối tượng _TapboxCState :

* Quản lý trạng thái _highlight .
* GestureDetector lắng nghe tất cả các sự kiện tap. Khi người dùng tap xuống, nó sẽ thêm phần tô sáng (được thực hiện dưới dạng viền màu xanh đậm). Khi người dùng thả tay ra, nó sẽ loại bỏ phần tô sáng.
* Gọi *setState()* để cập nhật giao diện người dùng khi tap xuống, tap lên hoặc hủy tap và trạng thái *highlight* thay đổi.
* Trong một sự kiện tap, chuyển thay đổi trạng thái đó sang widget gốc để thực hiện hành động thích hợp bằng cách sử dụng thuộc tính của widget .

```
//---------------------------- ParentWidget ----------------------------

class ParentWidget extends StatefulWidget {
  @override
  _ParentWidgetState createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: TapboxC(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

//----------------------------- TapboxC ------------------------------

class TapboxC extends StatefulWidget {
  TapboxC({Key key, this.active: false, @required this.onChanged})
      : super(key: key);

  final bool active;
  final ValueChanged<bool> onChanged;

  _TapboxCState createState() => _TapboxCState();
}

class _TapboxCState extends State<TapboxC> {
  bool _highlight = false;

  void _handleTapDown(TapDownDetails details) {
    setState(() {
      _highlight = true;
    });
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTapCancel() {
    setState(() {
      _highlight = false;
    });
  }

  void _handleTap() {
    widget.onChanged(!widget.active);
  }

  Widget build(BuildContext context) {
    // This example adds a green border on tap down.
    // On tap up, the square changes to the opposite state.
    return GestureDetector(
      onTapDown: _handleTapDown, // Handle the tap events in the order that
      onTapUp: _handleTapUp, // they occur: down, up, tap, cancel
      onTap: _handleTap,
      onTapCancel: _handleTapCancel,
      child: Container(
        child: Center(
          child: Text(widget.active ? 'Active' : 'Inactive',
              style: TextStyle(fontSize: 32.0, color: Colors.white)),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color:
              widget.active ? Colors.lightGreen[700] : Colors.grey[600],
          border: _highlight
              ? Border.all(
                  color: Colors.teal[700],
                  width: 10.0,
                )
              : null,
        ),
      ),
    );
  }
}
```

Nguồn (https://flutter.io/docs/development/ui/interactive#managing-state)
Còn tiếp....