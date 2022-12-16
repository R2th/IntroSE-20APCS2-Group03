Như các bạn đã biết trên ứng dụng Flutter việc thiết kế giao diện chủ yếu là widgets và sắp xếp bố cục các widgets đó một các hợp lý. Trong bài viết này sẽ khám phá một vài widgets cơ bản được sử dụng để xây dựng bố cục trong ứng dụng Flutter.

## Layout trong Flutter

Layout trong Flutter bao gồm một hệ thống phân cấp các widget với các widget bên ngoài thường xử lý sự liên kết và cấu trúc trong khi các yếu tố bên trong thường là các yếu tố hiển thị trên chính trang đó, như các button và image, v.v.

``` dart
new Center(
  child: new Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      new Text(
        'You have pushed the button this many times:',
      ),
      new Text(
        '$_counter',
        style: Theme.of(context).textTheme.display1,
      ),
    ],
  ),
),
```

Trong ví dụ này, có ba widget: Center, Column và Text.

Center và Column xử lý cấu trúc và sắp xếp các thành phần bên trong chúng trong khi văn bản là thành phần duy nhất có thể nhìn thấy trực tiếp trong ứng dụng cho người dùng.

Một widget thường có các thuộc tính để thay đổi căn chỉnh, kiểu và thuộc tính.

Bây giờ chúng ta hãy đi sâu vào các vật dụng riêng lẻ và xem những gì họ làm.

Chúng tôi sẽ chia các widget thành hai loại:
1. Widgets phần tử hiển thị
2. Cấu trúc và căn chỉnh Widgets

## Widgets phần tử hiển thị
Đây là một vài Widgets thường được sử dụng

### 1. Text

Một widget văn bản chỉ cần giữ một số văn bản.

```dart
new Text(   
'Hello, World!',   
textAlign: TextAlign.center,     
style: new TextStyle(fontWeight: FontWeight.bold), 
)
```

Văn bản có thể được căn chỉnh bằng cách sử dụng thuộc tính textAlign. Thuộc tính kiểu cho phép tùy chỉnh văn bản bao gồm phông chữ, cỡ chữ, trọng lượng phông chữ, màu sắc, khoảng cách chữ và nhiều thứ khác.

###  2. Button 

Một widget Button cho phép người dùng thực hiện một số hành động khi nhấn. Flutter không có tiện ích trực tiếp "Button" , mà thay vào đó nó có các loại nút như FlatButton và RaisedButton.

```dart
new FlatButton(
  child: Text("Click here"),
  onPressed: () {
    // Do something here
  },
),
```

![](https://images.viblo.asia/89480802-de4a-493f-aa9e-ac55daea706b.png)
<p align="center">The FlatButton</p>

Thuộc tính onPressed cho phép một số hành động được thực hiện khi nhấp vào nút.

```dart
new RaisedButton(
  child: Text("Click here"),
  elevation: 5.0,
  onPressed: () {
    // Do something here
  },
),
```

![](https://images.viblo.asia/9662ab84-b176-472c-a66f-13f11e10f495.png)
<p align="center">The RaisedButton </p>

Thay đổi `elevation` của RaisedButton sẽ thay đổi mức độ nổi bật của nó.

### 3. Image

Tiện ích biểu tượng (icon) là một thùng chứa (container) cho một biểu tượng trong Flutter.

```dart
new Icon(
  Icons.add,
  size: 36.0,
)
```

Nó cũng chứa một thuộc tính kích thước để phóng to biểu tượng.

![](https://images.viblo.asia/36063add-410d-4236-8120-9d91c2347147.png)


## Cấu trúc và căn chỉnh Widgets

### 1. Column

Column là một widget sắp xếp tất cả các widget con của nó trong một ngăn xếp dọc. Nó có thể khoảng trống các widget theo thuộc tính `mainAxisAlocation` và `crossAxisAlocation`. Ở đây, trục chính `main axis` của đường trục chính là một trục dọc và trục chính của trục là một trục ngang.


```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Text("Element 1"),
    Text("Element 2"),
    Text("Element 3"),
  ],
),
```

Cột có 3 widget văn bản bên trong nó và `mainAxisAlocation` được đặt thành `center`. 

Đây, nó trông như thế nào:

![](https://images.viblo.asia/4b22c30f-97d6-41bb-abf6-a5cf3bf4270d.png)

Do `mainAxisAlocation` là trung tâm, nó tập trung tất cả các widget. Hãy để thử một cái gì đó khác `spaceBetween`

![](https://images.viblo.asia/47c72fdd-1312-447e-9b55-13b508b27334.png)

Bây giờ chúng cách nhau quá xa, hãy để thử dùng `spaceEvenly`.

![](https://images.viblo.asia/f20bc84f-91d2-46d0-a902-f2797952720a.png)

Để đặt nó ở giữa bên trái và bên phải của màn hình, bạn phải sử dụng `crossAxisAlocation`.


### 2. Row

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: <Widget>[
    Text("Element 1"),
    Text("Element 2"),
    Text("Element 3"),
  ],
),
```

Một hàng giống như một cột nhưng xây dựng một hàng vật dụng nằm ngang thay vì một cột. Sự khác biệt chính ở đây là trục chính là trục ngang chứ không phải trục dọc. Trục chéo là trục dọc.

![](https://images.viblo.asia/29b0c040-b478-4ee4-a0ee-3eb390adec3c.png)

### 3. Center

Một widget Trung tâm chỉ đơn giản là tập trung vào `child` bên trong nó. Tất cả các ví dụ trước bao gồm các hàng và cột nằm trong một widget `Center`. Nếu  không nằm trong `Center`, nó sẽ dịch chuyển sang trái. Dưới đây là một ví dụ:

![](https://images.viblo.asia/01a58fdc-cfe9-4ff3-a9bc-2595054dd867.png)

<p align="center">Column không có Center widget</p>

![](https://images.viblo.asia/f20bc84f-91d2-46d0-a902-f2797952720a.png)
<p align="center">Column có Center widget</p>

```dart
Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        Text("Element 1"),
        Text("Element 2"),
        Text("Element 3"),
      ],
    ),
  ),
```

Một widget trung tâm chỉ đơn giản là đưa một đứa trẻ và tập trung nó vào không gian có sẵn.

### 4. Padding

Không giống như trong phát triển Android thông thường nơi mọi chế độ xem có thuộc tính `padding` riêng, `padding` là một `widget` bao bọc các `widget` khác để cung cấp cho chúng phần `padding` theo tất cả hoặc các hướng được chỉ định. Điều này cung cấp cho widget văn bản một phần đệm 8.0 theo mọi hướng.

```dart
Padding(
  padding: const EdgeInsets.all(8.0),
  child: new Text(
    "Element 1",
  ),
),
```

Padding theo hướng cụ thể cũng được cho phép.

```dart
Padding(
  padding: EdgeInsets.fromLTRB(8.0, 0.0, 0.0, 0.0),
  child: new Text(
    "Element 1",
  ),
),
```

### 5. Scaffold

Widget Scaffold là một khung để thêm các yếu tố thiết kế `widget` phổ biến như `AppBars`, `Drawers`, `Floating Action Buttons`, `Bottom Navigation`, etc.

```dart
new Scaffold(
  appBar: new AppBar(
    title: new Text(widget.title),
  ),
  body: Center(
  ),
  floatingActionButton: FloatingActionButton(
      child:Icon(Icons.add),
      onPressed: () {
      }
  ),
)
```

![](https://images.viblo.asia/3e75b677-1c3d-402a-8443-597779f4b090.png)

### 6. Stack

Một Stack được sử dụng để chồng lấp các widget, giống như một nút trên gradient nền. Stack là một widget rất quan trọng và chúng ta sẽ đi sâu vào chi tiết hơn trong một bài viết trong tương lai.

Đây là những `widgets` cơ bản cần có để tạo ra một ứng dụng hoạt động tốt trong Flutter. Flutter cũng cho phép bạn tạo các widget của riêng mình nếu bạn cần thêm bất kỳ chức năng nào khác hoặc nếu bạn muốn sử dụng lại một số mẫu widget lặp lại.

Để biết danh sách đầy đủ các tiện ích Flutter, hãy truy cập liên kết [này](https://flutter.io/widgets/).

Thank for reading!

[Article source](https://medium.com/@dev.n/the-complete-flutter-series-article-2-basic-widgets-and-layout-in-flutter-92a4fbd4a3e1)