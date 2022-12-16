### Widget

Một widget là loại bộ điều khiển cơ bản trong Flutter Material. Có hai loại Widget cơ bản mà chúng ta có thể mở rộng các lớp của mình: StatefulWidget hoặc StatelessWidget.

#### Stateful

StatefulWidget là widget có giá trị động có thể thay đổi trong quá trình sử dụng. Nó có thể nhận một giá trị đầu vào trong hàm tạo hoặc tham chiếu đến các hàm. Bạn cần tạo hai lớp như:

```
class BasePage extends StatefulWidget {
  State<StatefulWidget> createState() {
    return _BasePageState();
  }
}

class _BasePageState extends State<BasePage> {
  int _value = 0;
  
  void _increment() {
    setState(() {
      _value++;
    });
  }
}
```

Khi bạn định cập nhật giá trị, bạn cần bao bọc nó trong hàm `setState (() {})`.

Nếu bạn muốn bắt chước `viewDidLoad` của iOS, bạn có thể sử dụng lệnh gọi này trong lớp State

```
@override
void initState() {
  super.initState()
  // add here what to do, e.g. fetch data from remote
}
```

Thay vào đó, nếu bạn muốn được kích hoạt khi cập nhật trạng thái:

```
@override
void didUpdateWidget(CurrentType oldWidget) {
  super.didUpdateWidget(oldWidget);
  // here you can check value of old widget status and compare vs current one
}
```

#### Stateless

StatelessWidget là các thành phần được kết xuất và giữ giá trị đó. Một lớp cha cần làm mới để cập nhật nội dung. Nó có thể nhận một giá trị từ hàm tạo.

### Model

Dart có một cách hay để tạo init là sử dụng cách tiếp cận như {this.param, this.param2}.

```
class New {
  final String element;
  final double number;
  
  New({ this.element, this.number });
}
```

Để có các thông số bắt buộc, bạn cần phải include flutter/material.dart để có thể chuyển đổi lớp của mình thành

```
class En {
  final String element;
  final double number;
  
  New({ @required this.element, @required this.number });
}
```

Nếu bạn wrap một tham số giữa [] thì tham số đó là tùy chọn thay thế.

#### Scope Model

Là một cách tốt để chia sẻ dữ liệu trong ứng dụng ở một nơi duy nhất, có thể truy cập vào thiết bị di động ở bất kỳ lớp nào khác. Scope model cung cấp cho bạn một cách để giữ trạng thái của model đã tạo ở trên. Vì vậy, khi scope_model đã được imported, bạn có thể tạo model như sau:

```
class EnModel extends Model {
}
```

Khi bạn làm việc với item thì tốt hơn nên tránh chuyển lại mảng mà bạn đang sử dụng để quản lý item, tốt hơn nên sử dụng bản sao của item đó. Vì vậy, chúng tôi phải sử dụng một getter.

```
class EnModel extends Model {
  List<String> _item = [];
  List<String> get item {
    List.from(_item);
  }; 
}
```

Để sau này sử dụng điều đó, trong widget build, bạn phải:

```
return ScopeModelDescendant<EnModel>(builder: (BuildContext context, Widget child, EnModel model){
  return _buildWidget(model.item);
},);
```

Mỗi lần build được gọi là dữ liệu được đọc lại từ trạng thái.

Chúng ta có thể buộc làm mới một hàm build bằng cách sử dụng `notifyListeners()`.

Nếu bạn có nhiều model, tốt hơn nên tạo một file main model như:

```
class MainModel extends Model with New, EnModel {}
```

Tập trung hóa Để tránh phải gọi điều này trong tất cả các lớp, chúng ta có thể dễ dàng bọc MaterialApp của mình trong `ScopeModel <EnModel>(child: MaterialApp[...], model: EnModel())`.

Vì vậy, tất cả các phần tử con của MaterialApp sẽ có quyền truy cập vào cấu trúc EnModel.

Để có quyền truy cập, bạn vẫn phải sử dụng ScopeModelDescendant để bọc Widget sẽ sử dụng như trên.

### UI

#### Icon & Splashpage

https://flutter.io/assets-and-images/#updating-the-launch-screen

#### Screen Size

```
Size(MediaQuery.of(context).size.width
```

#### Colors & Themes

Bạn có thể truy vấn màu bằng Colors.white. Mỗi màu có thêm một tham số `withOpacity()` bạn có thể sử dụng để đặt độ mờ.

Bạn có thể sử dụng màu chủ đề bằng Theme.of(context).accentColor

#### Styling

Bạn có thể thêm kiểu bổ sung (màu nền, các góc tròn, v.v.) vào widget bằng DecoratedBox.

```
DecorationBox(decoration: BoxDecoration());
```

### Layout

ListView hoạt động giống như một ngăn xếp tốt để đưa các phần tử vào cột. Nếu nó chỉ chứa một đối tượng, hãy sử dụng SingleChildScrollView.

Cột và Hàng đều ổn nhưng không hỗ trợ cuộn. Nếu bạn muốn widget trong một cột / hàng để chiếm nhiều không gian nhất có thể, hãy bọc nó ở trong Expanded. Flexible cũng có sẵn và bạn có thể cung cấp mức độ ưu tiên về weight mà widget sẽ có.

SizeBox là một widget có kích thước cố định, nó rất hữu ích, ví dụ: để thêm lề đơn giản giữa các widget.

Container là một hộp nơi bạn có thể thêm Tiện ích của mình và đặt một số thông số như lề, padding, màu, trang trí, v.v.

#### Size

MediaQuery là một công cụ mạnh mẽ để tạo giao diện người dùng thích ứng theo tính năng của thiết bị (ví dụ: kích thước màn hình, hướng).

```
MediaQuery.of(context)
```

### Navigation

#### Route to other page without back (eg android final)

```
Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (BuildContext context) => Class(
                          param: value,
                        ),
                  )),
```

#### Route to other page with back

```
Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (BuildContext context) => Class(
                          param: value,
                        ),
                  )),
```

#### Back (Basic)

```
Navigator.pop(context);
```

#### Back (Passing data)

```
Navigator.pop(context, back_value);
```

### Sidebar

#### Add left drawer

```
New Scaffold(drawer: 
	Drawer(child: 
		Column(children: <Widget>[ 
			AppBar(title: Text(‘Choose’), AutomaticallyImplyLeading: false ), 
			ListTile(
			leading: Icon(Icons.list),
			title: Text(’Some Text’), 
			onTap: () {} 
) ])
```

#### Add right drawer

```
New Scaffold(endDrawer:
```

### Tabs

Body of Scaffold cần có TabBarView để quản lý chuyển đổi giữa các nội dung tab. Số chiều dài bắt buộc phải giống nhau trong các mục trong tab TabBarView và TabBar.

#### Add drawer with tab on top like Android

```
DefaultTabController(length: 2, child: Scaffold( body: TabBarView(),  appBar: AppBar(bottom: TabBar(tabs: <Widget>[ Tab(icon:, text:) ])

```

#### Add drawer with tab on Botton like iOS
```
DefaultTabController(length: 2, child: Scaffold( body: TabBarView(), bottomNavigationBar:  TabBar(tabs: <Widget>[ Tab() ])
```

### Alert

```
showDialog(context: context, builder: (BuilderContext context) {
	return AlertDialog(
		title: Text(),
		content: Text(),
		actions: <Widget> [
			FlatButton(child: Text(), onPressed: () {
				Navigator.pop(context); // close the dialog
			})
		]
}
```

### Modal

```
showModalButtonSheet(context: context, builder: (BuilderContext context) {
	return Center(
		child: Text()
	);
}
```

Link: https://gist.github.com/matteocrippa/3a8b84c7b49c10bc070e58a66860e83f