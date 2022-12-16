Bài viết này mình nghiên cứu và dịch từ trang [Flutter.io](https://flutter.io/tutorials/layout/) nên một số hình ảnh và từ ngữ chuyên ngành mình xin phép được sử dụng như trang nguồn nhé.  
Mục tiêu là mình hiểu như thế nào sẽ truyền tải lại như vậy thôi :) ( Flutter beginner)
```
Chúng ta sẽ học được gì qua bài viết này :
* Cơ chế layout của Flutter hoạt động như thế nào..
* Cách layout các widget theo chiều dọc và chiều ngang.
* Cách xây dựng layout một ứng dụng Flutter
```

Trong bài viết này, chúng ta sẽ cùng nhau đi xây dựng layouts cho một màn hình có thiết kế như sau:

![](https://images.viblo.asia/a3660490-8a58-472b-8d2c-7aa440e878a9.jpg)

Chúng ta sẽ đi qua các bước để giải thích cách tiếp cận layout và hiển thị một widget trên màn hình. Sau đó chúng ta sẽ bàn luận kĩ hơn về việc làm sao để đặt các widgets theo chiều ngang và dọc

##  Xây dựng một layout

### Bước 0: Thiết lập
Đầu tiên :
* Đảm bảo bạn đã thiết lập [môi trường](https://flutter.io/get-started/install/) làm việc với Flutter.
* [Bạn đã tạo một project Flutter cơ bản](https://flutter.io/get-started/test-drive/#create-app).
 
 Tiếp theo bạn thêm các resources (images) vào trong project :
   *  Tạo một thư mục **images** ở đầu dự án.
    *  Thêm image [**lake.jpg**](https://github.com/flutter/website/blob/master/_includes/code/layout/lakes/images/lake.jpg).
    *  Cập nhật tệp [**pubspec.yaml**](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/lakes/pubspec.yaml) để bao gồm thẻ **assets**. Điều này làm cho hình ảnh có thể dùng cho mã của bạn.

### Bước 1: Sơ đồ cho layout
Bước đầu tiên là chúng ta phải chia nhỏ ra được ra thành phần cơ bản cần layout :

* Xác định các hàng và cột.
* Layout có bao gồm dạng grid không?
* Có chứa các yếu tố chồng chéo không?
* UI có cần các tab không?
* Lưu ý các khu vực yêu cầu căn chỉnh, khoảng cách hoặc đường viền.

Đầu tiên, xác định các thành phần trong layout. Trong ví dụ này, sẽ có bốn thành phần được sắp xếp thành một cột: một hình ảnh, hai hàng (phần title và button) và một khối văn bản.


![](https://images.viblo.asia/6c503b0f-bb21-45e9-8564-00a02cf04eed.png)

Sơ đồ chi tiết mỗi hàng:
Hàng đầu tiên, được gọi là phần Title, có 3 thành phần con: một cột văn bản, một biểu tượng ngôi sao và số. 
Thành phần con đầu tiên dạng cột chứa 2 dòng văn bản. Phần này chiếm rất nhiều không gian, vì vậy nó phải được bao bọc trong một widget **Expanded**. 

![](https://images.viblo.asia/b5adfd58-7b84-4942-b64a-74200442e8e3.png)

Hàng thứ hai, được gọi là phần Button, cũng có 3 thành phần con: mỗi thành phần con là một cột có chứa một Icon và Text.

![](https://images.viblo.asia/9bf6c1b8-01bb-4871-93a8-481031a7097f.png)

Ok vậy là chúng ta đã có được sơ đồ tổng layout cho màn hình này, bước tiếp theo chúng ta sẽ đi layout cho từng thành phần. 

### Bước 2: Triển khai title row

Đầu tiên, bạn sẽ xây dựng cột bên trái trong phần tiêu đề. Đặt Column vào bên trong một Expanded widget sẽ kéo dài cột để có thể sử dụng tất cả không gian trống còn lại trong hàng. 
Xét thuộc tính **crossAxisAlignment** thành **CrossAxisAlignment.start** để đặt cột này vào vị trí đầu hàng.

Đặt thành phần con đầu tiên (là 1 text) bên trong một **Container** cho phép thêm padding. Sau đó hiển thị thành phần con này bên trong một **Text**
Thành phần con thứ 2 cũng là 1 **Text**, được đặt trong cùng **Column** và hiển thị với màu xám.

Hai mục cuối cùng trong phần tiêu đề là biểu tượng ngôi sao, màu đỏ sơn và văn bản “41”. Đặt toàn bộ hàng này vào trong một **Container** và khoảng cách với mỗi cạnh là 32 pixel.

Triển khai code cho phần này như sau :
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Widget titleSection = new Container(
      padding: const EdgeInsets.all(32.0),
      child: new Row(
        children: [
          new Expanded(
            child: new Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                new Container(
                  padding: const EdgeInsets.only(bottom: 8.0),
                  child: new Text(
                    'Oeschinen Lake Campground',
                    style: new TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                new Text(
                  'Kandersteg, Switzerland',
                  style: new TextStyle(
                    color: Colors.grey[500],
                  ),
                ),
              ],
            ),
          ),
          new Icon(
            Icons.star,
            color: Colors.red[500],
          ),
          new Text('41'),
        ],
      ),
    );
  //...
}
```


### Bước 3: Triển khai button row 

Phần các nút (call, router, share) sẽ chứa 3 Columns cùng sử dụng chung 1 layout - 1 icon trên 1 text. Các Column trong row này được đặt cách đều nhau, icon và text sẽ được tô màu `primaryColor`

Vì 3 button đều có chung 1 layout, do đó chúng ta có thể viết một phương thức `buildButtonColumn()` truyền vào một icon và text, và sẽ trả về a Column với các widgets đã được to màu theo **primaryColor**

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //...

    Column buildButtonColumn(IconData icon, String label) {
      Color color = Theme.of(context).primaryColor;

      return new Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          new Icon(icon, color: color),
          new Container(
            margin: const EdgeInsets.only(top: 8.0),
            child: new Text(
              label,
              style: new TextStyle(
                fontSize: 12.0,
                fontWeight: FontWeight.w400,
                color: color,
              ),
            ),
          ),
        ],
      );
    }
  //...
}
```

Sau khi có được phương thức `buildButtonColumn()`, chúng ta sẽ đi xây dựng **Container** chứa 3 button này
Chúng ta cần căn chỉnh các Column theo trục chính bằng cách sử dụng **MainAxisAlignment.spaceEvenly** để sắp xếp không gian trống đồng đều trước, giữa và sau mỗi cột.

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //...

    Widget buttonSection = new Container(
      child: new Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          buildButtonColumn(Icons.call, 'CALL'),
          buildButtonColumn(Icons.near_me, 'ROUTE'),
          buildButtonColumn(Icons.share, 'SHARE'),
        ],
      ),
    );
  //...
}

```
 
 Bạn có thể tìm hiểu thêm về  [MainAxisAlignment ](https://docs.flutter.io/flutter/rendering/MainAxisAlignment-class.html)

### Bước 4: Triển khai phần văn bản
Tiếp đến chúng tra sẽ triển khai phần văn bản khá dài phía dưới cùng. Đặt văn bản vào trong một **Container** và xét padding cho tất cả các cạnh là 32pixel. Thuộc tính `softWrap` cho biết văn bản có nên ngắt dòng mềm hay không, chẳng hạn như dấu chấm hoặc dấu phẩy. 

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //...

    Widget textSection = new Container(
      padding: const EdgeInsets.all(32.0),
      child: new Text(
        '''
Lake Oeschinen lies at the foot of the Blüemlisalp in the Bernese Alps. Situated 1,578 meters above sea level, it is one of the larger Alpine Lakes. A gondola ride from Kandersteg, followed by a half-hour walk through pastures and pine forest, leads you to the lake, which warms to 20 degrees Celsius in the summer. Activities enjoyed here include rowing, and riding the summer toboggan run.
        ''',
        softWrap: true,
      ),
    );
  //...
}
```

### Bước 5: Triển khải phần hình ảnh
Đây là thành phần cuối cùng chúng ta cần layout. 
Trong bước đầu tiên (Step 0) chúng ta đã download hình ảnh [này]((https://images.unsplash.com/photo-1471115853179-bb1d604434e0?dpr=1&auto=format&fit=crop&w=767&h=583&q=80&cs=tinysrgb&crop=)) về và lưu vào thư mục **images** dưới dạng **asset** trong project  
Do đó, bạn sẽ sử dụng `Image.asset` để hiển thị hình lên như sau :
```dart
body: new ListView(
  children: [
    new Image.asset(
      'images/lake.jpg',
      height: 240.0,
      fit: BoxFit.cover,
    ),
    // ...
  ],
)
```
`BoxFit.cover` sẽ cho hệ thống biết rằng cần hiển thị hình ảnh nhỏ nhất có thể nhưng vẫn sẽ bao phủ toàn bộ box.
Bạn có thể tìm hiểu nhiều hơn về BoxFit ở [đây](https://docs.flutter.io/flutter/painting/BoxFit-class.html)


### Bước 6: Đặt tất cả lại với nhau

Tới đây bạn sẽ cần đặt các thành phần (titleSection, buttonSection, textSection, image) mà bạn vừa triển khai lại với nhau. 
Chúng ta sẽ sử dụng một **ListView** để chứa các thành phần con thay vì dùng **Column**, bởi vì **ListView** sẽ tự động cuộn khi chạy ứng dụng trên một thiết bị có màn hình nhỏ so với phần layout cần hiển thị.

```dart
//...
body: new ListView(
  children: [
    new Image.asset(
      'images/lake.jpg',
      width: 600.0,
      height: 240.0,
      fit: BoxFit.cover,
    ),
    titleSection,
    buttonSection,
    textSection,
  ],
),
//...
```


Bây giờ hot reload bạn sẽ thấy app bạn hiển thị layout giống như hình ảnh yêu cầu. 
![](https://images.viblo.asia/e7c0df12-dda6-4f2a-bd42-b06896c85b43.png)

Ok! Như vậy qua bài viết này chắc hẳn các bạn sẽ nắm thêm 1 chút kiến thức về cách layout trong Flutter.
Các bạn có thể lấy [source code](https://github.com/vuvanhanh/flutter_learning_layouts/tree/master/flutter_layout_example) ví dụ nhé.