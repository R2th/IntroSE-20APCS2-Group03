Tiếp tục trong quá trình tìm hiểu về Flutter. Hôm nay mình sẽ cùng các bạn tìm hiểu về cách layout cho nhiều widgets theo chiều ngang và dọc trong Flutter nhé.

Ok! Let's go. 

Nguồn bài viết ở [đây](https://flutter.io/tutorials/layout/) nhé mọi người. Cho các bạn tiện theo dõi :) 

Bạn có thể sử dụng **Row** để sắp xếp các widget con theo chiều ngang và **Column** để sắp xếp widget con theo chiều dọc.

 ```
 Điểm chính ở đây là gì?
* Row và Column là hai trong số các mẫu thiết kế được sử dụng phổ biến nhất.
* Mỗi Row và Clumn đều có một danh sách các widget con.
* Một widget con có thể là một Row, Column hoặc widget phức tạp khác.
* Bạn có thể chỉ định Row hoặc Column căn chỉnh con của nó, cả theo chiều dọc và chiều ngang.
* Bạn có thể nới rộng hoặc giới hạn hạn các widget con cụ thể.
* Bạn có thể chỉ định cách widget con sử dụng không gian có sẵn của Row hoặc Column.
```

Nội dung hôm nay chúng ra sẽ tìm hiểu : 
* Aligning widgets
* Sizing widgets
* Packing widgets
* Nesting rows and columns

Để tạo một hàng hoặc cột trong Flutter, bạn cần thêm một danh sách các widget con vào trong một Row hoặc Column widget. Và từng widget con có thể là một Row hoặc Column. 
Ví dụ sau đây cho thấy cách có thể lồng các hàng hoặc cột bên trong các hàng hoặc cột.

Thiết kế này được sắp xếp thành một Hàng. Hàng có hai con: một cột ở bên trái và một hình ảnh ở bên phải. 

![](https://images.viblo.asia/9d854e44-e31a-4d33-b5b0-b90252db4fae.png)


Bạn có thể thấy cột con bên trái lồng các hàng và cột bên trong. 

![](https://images.viblo.asia/73a5cdd5-ba4f-44bf-9a66-45a170303e87.png)

**Note** : **Row** và **Column** là các widget nguyên thủy cơ bản cho bố cục ngang và dọc — các tiện ích con cấp thấp này cho phép tùy chỉnh tối đa. Flutter cũng cung cấp các tiện ích chuyên dụng, cấp cao hơn có thể đủ cho nhu cầu của bạn. 
Ví dụ: thay vì **Row**, bạn có thể sử dụng **ListTile**, một tiện ích dễ sử dụng với các thuộc tính cho các biểu tượng đầu và cuối, và tối đa 3 dòng văn bản. 
Thay vì **Cột**, bạn có thể thích **ListView**, bố cục giống như cột tự động cuộn nếu nội dung của nó quá dài để vừa với không gian có sẵn. 

## Aligning widgets

Bạn sẽ kiểm soát các hàng hoặc cột căn chỉnh con của nó bằng cách sử dụng thuộc tính `mainAxisAlignment` và `crossAxisAlignment`. Đối với một hàng, trục chính chạy theo chiều ngang và trục chéo chạy dọc. Đối với một cột, trục chính chạy theo chiều dọc và trục chéo chạy theo chiều ngang.

| Row | Column |
| - | - |
|  ![](https://images.viblo.asia/725df1cf-9b85-4ac6-be90-b295f0ea6e6a.png) | ![](https://images.viblo.asia/6c7bb682-6c59-44aa-ae23-78b646e5a69f.png) |
              

Các lớp [MainAxisAlignment](https://docs.flutter.io/flutter/rendering/MainAxisAlignment-class.html) và [CrossAxisAlignment](https://docs.flutter.io/flutter/rendering/CrossAxisAlignment-class.html) cung cấp rất nhiều các hằng số để điều chỉnh căn chỉnh. Các bạn có thể tìm hiểu nhiều hơn. 

Để hiểu rõ hơn về cách thực hiện **Aligning** cho các widget chúng ta cùng làm với ví dụ trên Row và Column. 

Trong ví dụ sau, chúng ta có 3 images (cùng kích thước 100 pixels) và được đặt chung với nhau theo chiều ngang trong một box có kích thước lớn hơn 300 pixels .
Do đó, chúng ta cần sử dụng **Row** và thiết lập `mainAxisAlignment` với thuộc tính **spaceEvenly**. Thuộc tính này sẽ chia không gian giữa, trước và sau sao cho  đồng đều giữa các hình ảnh. 

Code triển khai như sau: 
``` dart
appBar: new AppBar(
  title: new Text(widget.title),
),
body: new Center(
  child: new Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      new Image.asset('images/pic1.jpg'),
```

Đây là toàn bộ resource và code của ví dụ này. Các bạn có thể sử dụng để run và xem kết quả. 

**Dart code**: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row/main.dart)

**Images**: [images](https://github.com/flutter/website/tree/master/_includes/code/layout/row/images)

**Pubspec**: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row/pubspec.yaml)

![](https://images.viblo.asia/fa88d805-f265-4587-9a06-ec088f195bea.png)


Đối với **Column** thì cách triển khai cũng tương tự, khi chúng ta muốn sắp xếp 3 hình ảnh này theo chiều dọc. 
Sự khác biệt chỉ là bạn sử dụng `new Column` thay vì `new Row`

```dart 
appBar: new AppBar(
  title: new Text(widget.title),
),
body: new Center(
  child: new Column(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      new Image.asset('images/pic1.jpg'),
```

 **Dart code**: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/column/main.dart)

**Images**: [images](https://github.com/flutter/website/tree/master/_includes/code/layout/column/images) 

**Pubspec**: [pubspec.yaml]() 

![](https://images.viblo.asia/d60ddf81-0ed8-490d-9191-30eb800c9738.png) 


## Sizing widgets
Từ ví dụ hiển thị 3 hình ảnh, bây giờ bạn làm sao để thay đổi kích thước của hình ảnh thứ 2 lớn gấp đôi ( cả về chiều rộng và chiều dài) so với 2 hình ảnh còn lại? 

Bạn có thể đặt từng đối tượng con ( hình ảnh) vào trong một [Expanded](https://docs.flutter.io/flutter/widgets/Expanded-class.html) widget và thay đổi kích thước của nó theo trục chính (main axis). 

Expanded widget có một thuộc tính 'flex' , là một số nguyên xác định hệ số flex cho một widget. Gía trị mặc định là 1 .
Qua trở lại bài toán thay đổi kích thước của hình ảnh thứ 2 sao cho gấp đôi 2 hình ảnh còn lại, chúng ta sẽ đặt giá trị flex = 2

```dart 
appBar: new AppBar(
  title: new Text(widget.title),
),
body: new Center(
  child: new Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      new Expanded(
        child: new Image.asset('images/pic1.jpg'),
      ),
      new Expanded(
        flex: 2,
        child: new Image.asset('images/pic2.jpg'),
      ),
      new Expanded(
```

**Dart code**: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row-expanded/main.dart)

**Images**: [images](https://github.com/flutter/website/tree/master/_includes/code/layout/row-expanded/images)

**Pubspec**: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row-expanded/pubspec.yaml)

![](https://images.viblo.asia/cff9ea14-7dc4-4544-8c7c-f8dbee879fd1.png)

Tiếp theo để hiển thị 3 hình ảnh với kích thước bằng nhau và giới hạn trong kích thước box. Chúng ta sử dụng thuộc tính 'CrossAxisAlignment.center' và 'Expanded' với flex giá trị default là 1. 

```dart
appBar: new AppBar(
  title: new Text(widget.title),
),
body: new Center(
  child: new Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      new Expanded(
        child: new Image.asset('images/pic1.jpg'),
      ),
      new Expanded(
        child: new Image.asset('images/pic2.jpg'),
      ),
      new Expanded(
```

**Dart code**: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row-expanded-2/main.dart)

**Images**: [images](https://github.com/flutter/website/tree/master/_includes/code/layout/row-expanded-2/images)

**Pubspec**: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/row-expanded-2/pubspec.yaml)

![](https://images.viblo.asia/25977d50-be72-4449-ac68-edc87855663f.png)

## Packing widgets
Theo mặc định, một hàng hoặc cột chiếm nhiều không gian nhất có thể theo trục chính của nó , nhưng nếu bạn muốn xếp các thành phần con lại gần với nhau, hãy đặt `mainAxisSize` thành `MainAxisSize.min`. Ví dụ sau sử dụng thuộc tính này để xếp các biểu tượng ngôi sao với nhau.

```dart
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    var packedRow = new Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        new Icon(Icons.star, color: Colors.green[500]),
        new Icon(Icons.star, color: Colors.green[500]),
        new Icon(Icons.star, color: Colors.green[500]),
        new Icon(Icons.star, color: Colors.black),
        new Icon(Icons.star, color: Colors.black),
      ],
    );

  // ...
}
```

**Dart code**: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/packed/main.dart)

**Icons**: [Icons class](https://docs.flutter.io/flutter/material/Icons-class.html)

**Pubspec**: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/packed/pubspec.yaml)

![](https://images.viblo.asia/9513df6a-caa7-4719-9b40-d1f1964af319.png)

## Nesting rows and columns

Layout framework của Flutter cho phép bạn lồng các hàng và cột  bên trong hàng và cột sâu như bạn cần. 
Chúng ta sẽ cũng đi triển khai một ví dụ layout (phần được khoanh màu đỏ) có screenshots như sau : 

![](https://images.viblo.asia/2dde8b80-0f32-497e-bfff-e0dd79a9b1af.png)

Ta có thể thấy phần được khoanh đỏ được thực hiện với 2 hàng. Hàng đầu tiên chứa các thành phần gồm:  5 ngôi sao và số lượng người đánh giá. Hàng icons chứa 3 cột icons và text .

Cây widget cho phần Rating stars sẽ như sau : 

![](https://images.viblo.asia/f3185851-67b8-4f39-a835-f3d36e6b1cc1.png)

Triển khai code sẽ như sau : 
```dart
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    //...

    var ratings = new Container(
      padding: new EdgeInsets.all(20.0),
      child: new Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          new Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              new Icon(Icons.star, color: Colors.black),
              new Icon(Icons.star, color: Colors.black),
              new Icon(Icons.star, color: Colors.black),
              new Icon(Icons.star, color: Colors.black),
              new Icon(Icons.star, color: Colors.black),
            ],
          ),
          new Text(
            '170 Reviews',
            style: new TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.w800,
              fontFamily: 'Roboto',
              letterSpacing: 0.5,
              fontSize: 20.0,
            ),
          ),
        ],
      ),
    );
    //...
  }
}
```

Tiếp đến **Row** icons bên dưới phần rating : Bao gồm 3 **Column**, mỗi **Column** chứa một icon và 2 dòng text. 
Cây thiết kế cho layout phần này sẽ như sau : 

![](https://images.viblo.asia/7aac7c8c-0d9d-40df-b8d0-1ccacf0ef823.png)

Triển khai code cho thiết kế icons 
```dart
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    // ...

    var descTextStyle = new TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w800,
      fontFamily: 'Roboto',
      letterSpacing: 0.5,
      fontSize: 18.0,
      height: 2.0,
    );

    // DefaultTextStyle.merge allows you to create a default text
    // style that is inherited by its child and all subsequent children.
    var iconList = DefaultTextStyle.merge(
      style: descTextStyle,
      child: new Container(
        padding: new EdgeInsets.all(20.0),
        child: new Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            new Column(
              children: [
                new Icon(Icons.kitchen, color: Colors.green[500]),
                new Text('PREP:'),
                new Text('25 min'),
              ],
            ),
            new Column(
              children: [
                new Icon(Icons.timer, color: Colors.green[500]),
                new Text('COOK:'),
                new Text('1 hr'),
              ],
            ),
            new Column(
              children: [
                new Icon(Icons.restaurant, color: Colors.green[500]),
                new Text('FEEDS:'),
                new Text('4-6'),
              ],
            ),
          ],
        ),
      ),
    );
    // ...
  }
}
```

Như vậy chúng ta đã layout xong phần được khoanh màu đỏ. 
Toàn bộ source code các bạn có thể tìm hiểu thêm ở đây :

**Dart code**: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/pavlova/main.dart)

**Images**: [images](https://github.com/flutter/website/tree/master/_includes/code/layout/pavlova/images)

**Pubspec**: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/pavlova/pubspec.yaml)