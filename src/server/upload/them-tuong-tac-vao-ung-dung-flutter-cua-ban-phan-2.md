Ở phần trước, ta có đề cập đến Stateful và Stateless widgets. Vậy chúng là gì? Ta sẽ cùng tìm hiểu ở phần này

## Stateful và stateless widgets
Một widget có thể có trạng thái hoặc không. Nếu một widget có thể thay đổi, ví dụ như khi người dùng tương tác với nó, thì đó là có trạng thái.

Một widget không trạng thái không bao giờ thay đổi. Icon , IconButton và Text là những ví dụ về các widget không trạng thái. Các widget phi trạng thái extends từ *StatelessWidget*.

Một widget có trạng thái là động: ví dụ, nó có thể thay đổi giao diện của nó để đáp ứng với các sự kiện được kích hoạt bởi tương tác của người dùng hoặc khi nhận được dữ liệu. Checkbox, Radio, Slider, InkWell , Form và TextField là những ví dụ về các widget có trạng thái. Các widget này extends StatefulWidget .

Trạng thái của widget được lưu trữ trong một đối tượng *State*, tách biệt trạng thái của widget khỏi sự xuất hiện của nó. Trạng thái bao gồm các giá trị có thể thay đổi, như giá trị hiện tại của Slider hoặc liệu Checkbox có được chọn hay không. Khi trạng thái của widget thay đổi, đối tượng trạng thái gọi *setState()* , báo cho framework vẽ lại widget.

## Tạo một widget trạng thái

Vấn đề ở đây là gì?
> Một widget trạng thái được triển khai bởi hai lớp: một lớp con của *StatefulWidget* và một lớp con của *State* .
> Lớp trạng thái chứa trạng thái có thể thay đổi của widget và phương thức *build()* của widget.
> Khi trạng thái của widget thay đổi, đối tượng trạng thái gọi *setState()* , báo cho framework vẽ lại widget.

Trong phần này, bạn sẽ tạo một widget trạng thái tùy chỉnh. Bạn sẽ thay thế hai widget không trạng thái, icon ngôi sao màu đỏ và số đếm bên cạnh nó bằng một widget trạng thái tùy chỉnh duy nhất quản lý một Row với hai widget con: IconButton và Text .

Việc triển khai một widget trạng thái tùy chỉnh yêu cầu tạo hai lớp:

* Một lớp con của StatefulWidget xác định widget.
* Một lớp con của State chứa trạng thái cho widget đó và xác định phương thức build() của widget.
Phần này cho bạn thấy cách xây dựng một widget trạng thái, được gọi là FavoriteWidget , cho ứng dụng Lake. Sau khi thiết lập, bước đầu tiên của bạn là chọn cách quản lý trạng thái cho FavoriteWidget .

### Bước 1: Quyết định đối tượng nào quản lý trạng thái của widget
Trạng thái của một widget có thể được quản lý theo nhiều cách, nhưng trong ví dụ của chúng ta, là chính widget đó, FavoriteWidget , sẽ quản lý trạng thái của chính nó. Trong ví dụ này, chuyển đổi ngôi sao là một hành động biệt lập không ảnh hưởng đến widget cha hoặc phần còn lại của giao diện người dùng, vì vậy widget có thể xử lý trạng thái bên trong.

### Bước 2: Subclass StatefulWidget
Lớp FavoriteWidget quản lý trạng thái của chính nó, vì vậy nó override *createState()* để tạo một đối tượng State . Framework gọi createState() khi nó muốn xây dựng widget. Trong ví dụ này, createState() trả về một thể hiện của *_FavoriteWidgetState* , mà bạn sẽ triển khai trong bước tiếp theo.

```
class FavoriteWidget extends StatefulWidget {
  @override
  _FavoriteWidgetState createState() => _FavoriteWidgetState();
}
```
> Lưu ý: Member hoặc lớp bắt đầu bằng dấu gạch dưới ( _ ) là private. Để biết thêm thông tin, hãy xem [Thư viện và khả năng hiển thị](https://www.dartlang.org/guides/language/language-tour#libraries-and-visibility).

### Bước 3: Subclass State
Lớp *_FavoriteWidgetState* lưu trữ dữ liệu có thể thay đổi trong suốt vòng đời của widget. Khi ứng dụng hiển thị lần đầu, giao diện người dùng sẽ hiển thị một ngôi sao màu đỏ đặc, cho biết rằng hồ có trạng thái yêu thích trực tuyến, cùng với 41 lượt thích. Các giá trị này được lưu trữ trong các trường *_isFavorited* và *_favoriteCount* :

```
class _FavoriteWidgetState extends State<FavoriteWidget> {
  bool _isFavorited = true;
  int _favoriteCount = 41;
  // ···
}
```
Lớp này cũng định nghĩa một phương thức *build()* , tạo ra một *Row* chứa *IconButton* và *Text* màu đỏ. Bạn sử dụng *IconButton* (thay vì *Icon*) vì nó có thuộc tính *onPressed* xác định callback (*_toggleFavorite* ) để xử lý tap. Bạn sẽ xác định callback tiếp theo.

```
class _FavoriteWidgetState extends State<FavoriteWidget> {
  // ···
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: EdgeInsets.all(0),
          child: IconButton(
            icon: (_isFavorited ? Icon(Icons.star) : Icon(Icons.star_border)),
            color: Colors.red[500],
            onPressed: _toggleFavorite,
          ),
        ),
        SizedBox(
          width: 18,
          child: Container(
            child: Text('$_favoriteCount'),
          ),
        ),
      ],
    );
  }
}
```
> Mẹo: Việc đặt *Text* trong *SizedBox* và đặt độ rộng của nó sẽ ngăn chặn một *bước nhảy*, khi nội dung text thay đổi giữa các giá trị 40 và 41 - một *bước nhảy* sẽ xảy ra vì các giá trị đó có độ rộng khác nhau.

Phương thức *_toggleFavorite()* , được gọi khi nhấn *IconButton* , gọi *setState()* . Việc gọi *setState()* là rất quan trọng, bởi vì điều này cho framework biết rằng trạng thái của widget đã thay đổi và widget sẽ được vẽ lại. Đối số hàm để setState() bật tắt giao diện người dùng giữa hai trạng thái này:

```
void _toggleFavorite() {
  setState(() {
    if (_isFavorited) {
      _favoriteCount -= 1;
      _isFavorited = false;
    } else {
      _favoriteCount += 1;
      _isFavorited = true;
    }
  });
}
```

### Bước 4: Cắm widget trạng thái vào cây widget
Thêm widget trạng thái tùy chỉnh của bạn vào cây widget trong phương thức build() của ứng dụng. Đầu tiên, xác định vị trí mã tạo Icon và Text và xóa nó. Trong cùng một vị trí, tạo tiện ích trạng thái:

```
layout / lake / {step6 → tương tác} /lib/main.dart
@@ -10,2 +5,2 @@
10 5	   class MyApp extends StatelessWidget {
11 6	   @override
@@ -38,11 +33,7 @@
38 33	   ],
39 34	   ),
40 35	   ),
41	 -  Icon(
36	 +  FavoriteWidget(),
42	 -    Icons.star,
43	 -    color: Colors.red[500],
44	 -  ),
45	 -  Text('41'),
46 37	   ],
47 38	   ),
48 39	   );
@@ -117,3 +108,3 @@
117 108	   );
118 109	   }
119 110	   }
```

Vậy là xong! Khi bạn hot reload lại ứng dụng, biểu tượng ngôi sao sẽ phản hồi với các tap.

Nguồn (https://flutter.dev/docs/development/ui/interactive#stateful-and-stateless-widgets)