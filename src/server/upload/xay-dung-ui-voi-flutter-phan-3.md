## Những widget bố cục phổ biến
Flutter có một thư viện các widget bố cục phong phú, nhưng ở đây chỉ liệt kê một vài trong số những thứ được sử dụng phổ biến nhất. Mục đích là để giúp bạn bắt đầu càng nhanh càng tốt. Để biết thông tin về các widget có sẵn khác, hãy tham khảo [Tổng quan về Widget](https://flutter.io/docs/development/ui/widgets) hoặc sử dụng hộp Tìm kiếm trong tài liệu tham chiếu API . Ngoài ra, các trang widget trong tài liệu API thường đưa ra đề xuất về các widget tương tự có thể phù hợp hơn với nhu cầu của bạn.

Các widget sau đây thuộc hai loại: tiêu chuẩn từ thư viện Widget và chuyên dụng từ thư viện Material Components. Bất kỳ ứng dụng nào cũng có thể sử dụng thư viện widget nhưng chỉ ứng dụng Material mới có thể sử dụng thư viện Material Components.

### Widget tiêu chuẩn
* **Container** : Thêm padding, margin, border, màu nền hoặc các trang trí khác vào một widget.
* **GridView** : Đặt các widget con dưới dạng lưới có thể cuộn.
* **ListView** : Đặt các widget con như một danh sách có thể cuộn.
* **Stack** : Chồng đè một widget lên trên một cái khác.

### Material Components
* **Card** : Sắp xếp thông tin liên quan vào một hộp có các góc tròn và bóng đổ.
* **ListTile** : Sắp xếp tối đa 3 dòng văn bản và các biểu tượng ở đầu và đuôi tùy chọn, thành một hàng.

### Container
Nhiều bố cục sử dụng tự do các Container để tách các widget bằng padding hoặc để thêm borer hoặc margin. Bạn có thể thay đổi nền của thiết bị bằng cách đặt toàn bộ bố cục vào Container và thay đổi màu nền hoặc hình ảnh của thiết bị.

**Tóm tắt (Container)**
* Thêm padding, margin, border
* Thay đổi màu nền hoặc hình ảnh
* Chứa một widget con duy nhất, nhưng widget đó có thể là một Hàng, Cột hoặc thậm chí là gốc của cây widget

**Ví dụ (Container)**
Ngoài ví dụ dưới đây, nhiều ví dụ trong hướng dẫn này sử dụng Container. Bạn cũng có thể tìm thấy nhiều ví dụ về Container trong Thư viện Flutter .

![](https://images.viblo.asia/7aab5e6a-fb25-4206-b323-66da1e228f30.png)

Bố cục này bao gồm một cột gồm hai hàng, mỗi hàng chứa 2 hình ảnh. Mỗi hình ảnh sử dụng Container để thêm viền và viền màu xám. Cột chứa các hàng hình ảnh, sử dụng Container để thay đổi màu nền thành màu xám nhạt hơn.

```
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {

    var container = Container(
      decoration: BoxDecoration(
        color: Colors.black26,
      ),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(width: 10.0, color: Colors.black38),
                    borderRadius:
                        const BorderRadius.all(const Radius.circular(8.0)),
                  ),
                  margin: const EdgeInsets.all(4.0),
                  child: Image.asset('images/pic1.jpg'),
                ),
              ),
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(width: 10.0, color: Colors.black38),
                    borderRadius:
                        const BorderRadius.all(const Radius.circular(8.0)),
                  ),
                  margin: const EdgeInsets.all(4.0),
                  child: Image.asset('images/pic2.jpg'),
                ),
              ),
            ],
          ),
          // ...
          // See the definition for the second row on GitHub:
          // https://github.com/flutter/website/tree/master/src/_includes/code/layout/container/main.dart
        ],
      ),
    );
    //...
  }
}
```

### GridView
Sử dụng GridView để đặt các widget con như một danh sách hai chiều. GridView cung cấp hai danh sách được định nghĩa sẵn hoặc bạn có thể xây dựng GridView tùy chỉnh của riêng mình. Khi GridView phát hiện ra rằng nội dung của nó quá dài để vừa với hộp kết xuất, nó sẽ tự động cuộn.

**Tóm tắt (GridView)**
* Đặt các widget trong một lưới
* Phát hiện khi nội dung cột vượt quá hộp kết xuất và tự động cung cấp cuộn
* Xây dựng lưới tùy chỉnh của riêng bạn hoặc sử dụng một trong các lưới được cung cấp:
  * *GridView.count* cho phép bạn chỉ định số lượng cột
  * *GridView.extent* cho phép bạn chỉ định chiều rộng pixel tối đa của ô xếp
  
> Lưu ý: Khi hiển thị danh sách hai chiều trong đó điều quan trọng là hàng và cột mà một ô chiếm giữ, hãy sử dụng Table hoặc DataTable .

**Ví dụ (GridView)**

![](https://images.viblo.asia/a6887834-2d59-4b4c-8417-d09ddfba6688.png)

Sử dụng GridView.extent để tạo lưới với các ô rộng tối đa 150 pixel.

![](https://images.viblo.asia/412c2388-9425-4e2b-8d31-44b0c2166f64.png)

Sử dụng GridView.count để tạo lưới có 2 ô rộng ở chế độ dọc và 3 ô ở chế độ ngang. Các tiêu đề được tạo bằng cách đặt thuộc tính footer cho mỗi GridTile.

```
// The images are saved with names pic1.jpg, pic2.jpg...pic30.jpg.
// The List.generate constructor allows an easy way to create
// a list when objects have a predictable naming pattern.
List<Container> _buildGridTileList(int count) {

  return List<Container>.generate(
      count,
      (int index) =>
          Container(child: Image.asset('images/pic${index+1}.jpg')));
}

Widget buildGrid() {
  return GridView.extent(
      maxCrossAxisExtent: 150.0,
      padding: const EdgeInsets.all(4.0),
      mainAxisSpacing: 4.0,
      crossAxisSpacing: 4.0,
      children: _buildGridTileList(30));
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: buildGrid(),
      ),
    );
  }
}
```

### ListView
ListView , một tiện ích giống như Column, tự động cung cấp cuộn khi nội dung của nó quá dài cho hộp kết xuất của nó.

**Tóm tắt (ListView)**
* Một cột chuyên biệt để tổ chức một danh sách các hộp
* Có thể được đặt theo chiều ngang hoặc chiều dọc
* Phát hiện khi nội dung của nó không phù hợp và cung cấp cuộn
* Cấu hình ít hơn Column, nhưng dễ sử dụng hơn và hỗ trợ cuộn

**Ví dụ (ListView)**

![](https://images.viblo.asia/22172b17-13c4-4919-9721-07071681d323.png)

Sử dụng ListView để hiển thị danh sách các doanh nghiệp sử dụng *ListTiles*. Một Divider cách các nhà hát với các nhà hàng.

![](https://images.viblo.asia/ab25a2fe-e58f-4db3-882e-bc2962642b6a.png)

Sử dụng ListView để hiển thị Màu sắc từ bảng Thiết kế Vật liệu cho một họ màu cụ thể.

```
List<Widget> list = <Widget>[
  ListTile(
    title: Text('CineArts at the Empire',
        style: TextStyle(fontWeight: FontWeight.w500, fontSize: 20.0)),
    subtitle: Text('85 W Portal Ave'),
    leading: Icon(
      Icons.theaters,
      color: Colors.blue[500],
    ),
  ),
  ListTile(
    title: Text('The Castro Theater',
        style: TextStyle(fontWeight: FontWeight.w500, fontSize: 20.0)),
    subtitle: Text('429 Castro St'),
    leading: Icon(
      Icons.theaters,
      color: Colors.blue[500],
    ),
  ),
  // ...
  // See the rest of the column defined on GitHub:
  // https://github.com/flutter/website/tree/master/src/_includes/code/layout/listview/main.dart
];

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ...
      body: Center(
        child: ListView(
          children: list,
        ),
      ),
    );
  }
}
```

### Stack
Sử dụng Stack để sắp xếp các widget chồng lên một widget cơ sở (thường là một hình ảnh). Các widget có thể chồng lấp hoàn toàn hoặc một phần widget cơ sở.

**Tóm tắt (Stack)**
* Sử dụng cho các widget chồng lên một widget khác
* Widget đầu tiên trong danh sách widget con là widget cơ sở; những child tiếp theo được phủ lên trên child cơ sở đó
* Nội dung của Stack không thể cuộn
* Bạn có thể chọn để clip widget con vượt quá hộp kết xuất

**Ví dụ (Stack)**

![](https://images.viblo.asia/8e91513b-324b-49ec-89f2-8b8e6fd74e05.png)

Sử dụng Stack để phủ lên một Container (hiển thị Văn bản của nó trên nền đen mờ) trên đỉnh của Avatar. Stack offset văn bản bằng cách sử dụng thuộc tính alignment và Alignments.

![](https://images.viblo.asia/eccc49e0-f30b-4e5a-8198-eeaa2f6892e6.png)

Sử dụng Stack để chồng một gradient lên trên cùng của hình ảnh. Gradient đảm bảo rằng các biểu tượng của thanh công cụ tách biệt với hình ảnh.

```
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    var stack = Stack(
      alignment: const Alignment(0.6, 0.6),
      children: [
        CircleAvatar(
          backgroundImage: AssetImage('images/pic.jpg'),
          radius: 100.0,
        ),
        Container(
          decoration: BoxDecoration(
            color: Colors.black45,
          ),
          child: Text(
            'Mia B',
            style: TextStyle(
              fontSize: 20.0,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
    // ...
  }
}
```

### Card
Card, từ thư viện Material Components, chứa các thông tin liên quan và có thể được tạo từ hầu hết mọi widget, nhưng thường được sử dụng với *ListTile*. Card có một con duy nhất, nhưng con của nó có thể là một cột, hàng, list, grid hoặc các widget khác hỗ trợ nhiều con. Theo mặc định, Card thu nhỏ kích thước của nó thành 0 x 0 pixel. Bạn có thể sử dụng *SizedBox* để giới hạn kích thước của Card.

Trong Flutter, Card có các góc hơi tròn và bóng đổ, tạo hiệu ứng 3D. Thay đổi thuộc tính *elevation* của Card cho phép bạn kiểm soát hiệu ứng đổ bóng. Chẳng hạn, đặt độ cao thành 24.0, trực quan nâng Card lên khỏi bề mặt và làm cho bóng trở nên phân tán hơn. Để biết danh sách các giá trị độ cao được hỗ trợ, hãy xem [Độ cao và bóng](https://material.io/guidelines/material-design/elevation-shadows.html) trong hướng dẫn Material. Chỉ định giá trị không được hỗ trợ sẽ vô hiệu hóa hoàn toàn bóng đổ.

**Tóm tắt (Card)**
* Triển khai Card Material Components
* Được sử dụng để trình bày các thông tin liên quan
* Chấp nhận một child, nhưng child đó có thể là một Hàng, Cột hoặc widget khác chứa danh sách các con
* Hiển thị với các góc tròn và bóng đổ
* Nội dung của Card không thể cuộn
* Từ thư viện Material Components

**Ví dụ (Card)**

![](https://images.viblo.asia/4ae1a67a-d79a-489e-828c-d4e64e22ff8c.png)

Card chứa 3 *ListTiles* và có kích thước bằng cách gói nó bằng *SizedBox*. Divider phân tách *ListTiles* thứ nhất và thứ hai.

![](https://images.viblo.asia/fbd8f712-0603-481e-aae5-a8e8eac17f4b.png)

Card chứa hình ảnh, văn bản và nút

```
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    var card = SizedBox(
      height: 210.0,
      child: Card(
        child: Column(
          children: [
            ListTile(
              title: Text('1625 Main Street',
                  style: TextStyle(fontWeight: FontWeight.w500)),
              subtitle: Text('My City, CA 99984'),
              leading: Icon(
                Icons.restaurant_menu,
                color: Colors.blue[500],
              ),
            ),
            Divider(),
            ListTile(
              title: Text('(408) 555-1212',
                  style: TextStyle(fontWeight: FontWeight.w500)),
              leading: Icon(
                Icons.contact_phone,
                color: Colors.blue[500],
              ),
            ),
            ListTile(
              title: Text('costa@example.com'),
              leading: Icon(
                Icons.contact_mail,
                color: Colors.blue[500],
              ),
            ),
          ],
        ),
      ),
    );
  //...
}
```

### ListTile
Sử dụng ListTile, một widget chuyên dụng từ thư viện Material Components, để dễ dàng tạo một hàng chứa tối đa 3 dòng văn bản và các biểu tượng tùy chọn ở đầu và cuối hàng. ListTile được sử dụng phổ biến nhất trong Card hoặc ListView, nhưng có thể được sử dụng ở nơi khác.

**Tóm tắt (ListTile)**
* Một hàng chuyên biệt chứa tối đa 3 dòng văn bản và các biểu tượng tùy chọn
* Cấu hình ít hơn Row, nhưng dễ sử dụng hơn
* Từ thư viện Material Components

**Ví dụ (ListTile)**

![](https://images.viblo.asia/a0fd5f0f-d157-43b7-9272-143069553055.png)

Thẻ chứa 3 ListTiles. 
Mã Dart: Xem ví dụ về Card ở trên.

![](https://images.viblo.asia/580713af-93a5-4bec-9a8e-7afbdf82f8c6.png)

Sử dụng ListTile để liệt kê 3 loại nút thả xuống.