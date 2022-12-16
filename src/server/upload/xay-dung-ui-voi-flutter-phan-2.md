Tiếp theo phần trước

## Bố trí nhiều widget theo chiều dọc và chiều ngang
Một trong những mẫu bố cục phổ biến nhất là sắp xếp các widget theo chiều dọc hoặc chiều ngang. Bạn có thể sử dụng widget Row để sắp xếp các widget theo chiều ngang và Column để sắp xếp các widget theo chiều dọc.

Vấn đề ở đây là gì?
* Row và Column là hai trong số các mẫu bố cục được sử dụng phổ biến nhất.
* Row và Column nhận một danh sách các widget con.
* Một widget con có thể tự nó là một Row, Column hoặc các widget phức tạp khác.
* Bạn có thể chỉ định cách Row và Column căn chỉnh con của nó, cả theo chiều dọc và chiều ngang.
* Bạn có thể kéo dài hoặc hạn chế các widget con cụ thể.
* Bạn có thể chỉ định cách các widget con sử dụng không gian có sẵn của Row và Column.

Để tạo một Row hoặc Column trong Flutter, bạn thêm danh sách các widget con vào widget Row hoặc Column . Đổi lại, mỗi child có thể tự nó là một Row hoặc Column, v.v. Ví dụ sau đây cho thấy cách có thể lồng các Row hoặc Column bên trong các Row hoặc Column.

Bố cục này được tổ chức như một Row. Row chứa hai con: một Column bên trái và một Image bên phải:
![](https://images.viblo.asia/f276749e-522f-4e44-b72e-7f35ae24036c.png)

Cột bên trái lồng các Row và Column.
![](https://images.viblo.asia/22220531-8b7c-4b1a-9771-52f58ef8b7a7.png)

> Lưu ý: Row và Column là các widget cơ bản cho bố cục ngang và dọc, các widget cấp thấp này cho phép tùy chỉnh tối đa. Flutter cũng cung cấp các widget chuyên dụng, cấp cao hơn có thể đủ cho nhu cầu của bạn. Ví dụ: thay vì Row, bạn có thể thích ListTile , một widget dễ sử dụng với các thuộc tính cho các biểu tượng ở đầu và cuối hàng, xen giữa là tối đa 3 dòng văn bản. Thay vì Column, bạn có thể thích ListView , bố cục giống như cột tự động cuộn nếu nội dung của nó quá dài để phù hợp với không gian có sẵn. Ta sẽ xem thêm về các widget bố trí phổ biến ở phần sau.

> Từ giờ ta sẽ gọi Row là Hàng và Column là Cột cho nó "thuần Việt"

### Sắp xếp các widget
Bạn kiểm soát cách một hàng hoặc cột sắp xếp các phần tử con của nó bằng cách sử dụng các thuộc tính *mainAxisAlignment* và *crossAxisAlignment* . Đối với một hàng, trục chính chạy theo chiều ngang và trục chéo chạy dọc. Đối với một cột, trục chính chạy theo chiều dọc và trục chéo chạy theo chiều ngang.

![](https://images.viblo.asia/cb94ef99-6d0a-46a7-a64f-1101098d2df4.png)

Các lớp *MainAxisAlignment* và *CrossAxisAlignment* cung cấp nhiều hằng số để kiểm soát căn chỉnh.

> Lưu ý: Khi bạn thêm hình ảnh vào dự án của mình, bạn cần cập nhật tệp pubspec để truy cập chúng. Ví dụ này sử dụng *Image.asset* để hiển thị hình ảnh. Để biết thêm thông tin, hãy xem tệp pubspec.yaml của ví dụ này hoặc [Thêm Assets và Hình ảnh trong Flutter](https://flutter.io/docs/development/ui/assets-and-images) . Bạn không cần phải làm điều này nếu bạn đang dùng ảnh từ remote server bằng *Image.network*.

Trong ví dụ sau, mỗi hình ảnh có chiều rộng 100 pixel. Không gian render (trong trường hợp này là toàn bộ màn hình) rộng hơn 300 pixel, do đó, đặt căn chỉnh trục chính thành *spaceEvenly*. Chia đều vùng không gian ngang tự do giữa, trước và sau mỗi hình ảnh.
![](https://images.viblo.asia/428fa66b-1554-47f9-a0ab-2a443a6685d8.png)
```
appBar: AppBar(
  title: Text(widget.title),
),
body: Center(
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      Image.asset('images/pic1.jpg'),
```

Các cột hoạt động tương tự như các hàng.
![](https://images.viblo.asia/04936e61-73db-4347-b179-101fe51cf9ed.png)
```
appBar: AppBar(
  title: Text(widget.title),
),
body: Center(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      Image.asset('images/pic1.jpg'),
```
> Lưu ý: Khi bố cục quá lớn để fit với thiết bị, một dải màu đỏ xuất hiện dọc theo cạnh bị ảnh hưởng. Ví dụ: hàng trong ảnh chụp màn hình sau quá rộng so với màn hình của thiết bị:
> ![](https://images.viblo.asia/5941dd32-97dd-4839-93c1-6019c5cc40a3.png)

> Các widget có thể được điều chỉnh kích thước để vừa trong một hàng hoặc cột bằng cách sử dụng widget *Expanded*, được mô tả trong phần sau.

### Điều chỉnh kích thước của widget
Có lẽ bạn muốn một widget chiếm không gian gấp đôi so với anh chị em của nó. Bạn có thể đặt con của một hàng hoặc cột trong một widget *Expanded* để kiểm soát kích thước của widget dọc theo trục chính. Widget *Expanded* có thuộc tính *flex* , số nguyên xác định hệ số *flex* cho widget. Hệ số flex mặc định cho widget *Expanded* là 1.

Ví dụ: để tạo một hàng gồm ba widget trong đó cái ở giữa rộng gấp đôi so với hai cái kia, hãy đặt hệ số flex trên widget giữa thành 2:
![](https://images.viblo.asia/4b0ea65f-cd7e-4eb8-82b9-676032432f45.png)
```
appBar: AppBar(
  title: Text(widget.title),
),
body: Center(
  child: Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      Expanded(
        child: Image.asset('images/pic1.jpg'),
      ),
      Expanded(
        flex: 2,
        child: Image.asset('images/pic2.jpg'),
      ),
      Expanded(
```

Để sửa ví dụ trong phần trước có hàng 3 hình ảnh quá rộng so với độ rộng của nó và dẫn đến dải màu đỏ, hãy bọc từng widget bằng một Expand. Theo mặc định, mỗi widget có hệ số flex là 1, gán một phần ba hàng cho mỗi cái.
![](https://images.viblo.asia/c5fd063a-0eb0-4431-847c-9e44c0871cb7.png)
```
appBar: AppBar(
  title: Text(widget.title),
),
body: Center(
  child: Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      Expanded(
        child: Image.asset('images/pic1.jpg'),
      ),
      Expanded(
        child: Image.asset('images/pic2.jpg'),
      ),
      Expanded(
```
> Đối với Android, ta có thể thấy cách sắp xếp của Row và Column chính là LinearLayout, và Expand với thuộc tính flex chính là weight. Như vậy, việc bố trí layout theo kiểu này trong Flutter có vẻ phức tạp hơn Android (vì phải thêm 1 bộ "đệm" Expand cho mỗi con của Row hoặc Column)

### Đóng gói widget
Theo mặc định, một hàng hoặc cột sẽ chiếm nhiều không gian dọc theo trục chính của nó nhiều nhất có thể, nhưng nếu bạn muốn đóng gói các con của chúng lại gần nhau, hãy đặt *mainAxisSize* của nó thành *MainAxisSize.min*. Ví dụ sau sử dụng thuộc tính này để đóng gói các biểu tượng ngôi sao lại với nhau.
![](https://images.viblo.asia/f672cfe6-190a-41e9-b602-fd36ea986b0c.png)
```
class _MyHomePageState extends State<MyHomePage> {
    @override
    Widget build(BuildContext context) {
      var packedRow = Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.star, color: Colors.green[500]),
          Icon(Icons.star, color: Colors.green[500]),
          Icon(Icons.star, color: Colors.green[500]),
          Icon(Icons.star, color: Colors.black),
          Icon(Icons.star, color: Colors.black),
        ],
      );

    // ...
  }
```

### Các hàng và cột lồng nhau
Layout framework cho phép bạn lồng các hàng và cột bên trong các hàng và cột sâu tùy ý. Hãy xem mã cho phần được phác thảo của bố cục sau:
![](https://images.viblo.asia/e1040c55-0b79-47f2-9c17-67df6c6e463e.png)

Phần được phác thảo được thực hiện như hai hàng. Hàng xếp hạng chứa năm sao và số lượng đánh giá. Hàng biểu tượng chứa ba cột biểu tượng và văn bản.

Cây layout cho hàng xếp hạng:
![](https://images.viblo.asia/114c8c7f-dba0-4492-adef-26f736ee1e48.png)

Biến ratings tạo một hàng chứa một hàng nhỏ hơn gồm các biểu tượng 5 sao và văn bản:
```
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    //...

    var ratings = Container(
      padding: EdgeInsets.all(20.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.star, color: Colors.black),
              Icon(Icons.star, color: Colors.black),
              Icon(Icons.star, color: Colors.black),
              Icon(Icons.star, color: Colors.black),
              Icon(Icons.star, color: Colors.black),
            ],
          ),
          Text(
            '170 Reviews',
            style: TextStyle(
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

> Mẹo: Để giảm thiểu sự nhầm lẫn trực quan có thể xảy ra do mã bố cục được lồng rất nhiều, hãy triển khai các phần của giao diện người dùng trong các biến và hàm.

Hàng biểu tượng, bên dưới hàng xếp hạng, chứa 3 cột; mỗi cột chứa một biểu tượng và hai dòng văn bản, như bạn có thể thấy trong cây widget của nó:
![](https://images.viblo.asia/d80d3839-5df6-4c44-afa1-9c96a606ad8b.png)

Biến iconList xác định hàng biểu tượng:
```
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    // ...

    var descTextStyle = TextStyle(
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
      child: Container(
        padding: EdgeInsets.all(20.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Column(
              children: [
                Icon(Icons.kitchen, color: Colors.green[500]),
                Text('PREP:'),
                Text('25 min'),
              ],
            ),
            Column(
              children: [
                Icon(Icons.timer, color: Colors.green[500]),
                Text('COOK:'),
                Text('1 hr'),
              ],
            ),
            Column(
              children: [
                Icon(Icons.restaurant, color: Colors.green[500]),
                Text('FEEDS:'),
                Text('4-6'),
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
Biến *leftColumn* chứa các hàng xếp hạng và biểu tượng, cũng như tiêu đề và văn bản mô tả:
```
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    //...

    var leftColumn = Container(
      padding: EdgeInsets.fromLTRB(20.0, 30.0, 20.0, 20.0),
      child: Column(
        children: [
          titleText,
          subTitle,
          ratings,
          iconList,
        ],
      ),
    );
    //...
  }
}
```
Cột bên trái được đặt trong Container để giới hạn chiều rộng của nó. Cuối cùng, UI được xây dựng với toàn bộ hàng (chứa cột bên trái và hình ảnh) bên trong một Card.

Hình ảnh Pavlova là từ [Pixabay](https://pixabay.com/en/photos/?q=pavlova&image_type=&cat=&min_width=&min_height=) và có sẵn theo giấy phép Creative Commons. Bạn có thể nhúng hình ảnh từ mạng bằng Image.network nhưng, ví dụ này, hình ảnh được lưu vào thư mục hình ảnh trong dự án, được thêm vào tệp pubspec và được truy cập bằng Images.asset .
```
body: Center(
  child: Container(
    margin: EdgeInsets.fromLTRB(0.0, 40.0, 0.0, 30.0),
    height: 600.0,
    child: Card(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 440.0,
            child: leftColumn,
          ),
          mainImage,
        ],
      ),
    ),
  ),
),
```

> Mẹo: Ví dụ Pavlova chạy tốt nhất theo chiều ngang trên thiết bị rộng, chẳng hạn như máy tính bảng. Nếu bạn đang chạy ví dụ này trong trình giả lập iOS, bạn có thể chọn một thiết bị khác bằng menu **Hardware > Device** . Trong ví dụ này, chúng tôi khuyên dùng iPad Pro. Bạn có thể thay đổi hướng của nó sang chế độ nằm ngang bằng **Hardware > Rotate** . Bạn cũng có thể thay đổi kích thước của cửa sổ giả lập (không thay đổi số lượng pixel logic) bằng **Window> Scale**.