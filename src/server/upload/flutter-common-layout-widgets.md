Bài tìm hiểu và dịch này là phần cuối trong bài [Building Layouts in Flutter](https://flutter.io/tutorials/layout/).

Flutter hỗ trợ bộ thư viện phong phú cho việc layout widget. Tuy nhiên cũng như các ngôn ngữ native khác, đơn giản chúng ta chỉ cần tìm hiểu một vài thư viện hay được sử dụng cũng là khá ok để có thể viết được một ứng dựng với Flutter.

Có thể chia các bộ thư viện (library) hỗ trợ cho layout widgets làm 2 loại : 
- Các widgets cơ bản bạn có thể tìm thấy trong [widgets library](https://docs.flutter.io/flutter/widgets/widgets-library.html)
- Các widgets đặc biệt nằm trong [material library](https://docs.flutter.io/flutter/material/material-library.html)

Có một lưu ý với các bạn đó là bất kì các ứng dụng đều có thể sử dụng **widgets library**, nhưng chỉ có ứng dụng **Material** là có thể sử dụng **material library**

Trong bài viết hôm nay chúng ta sẽ cùng tìm hiểu về 1 số **Standard widgets** và **Material Components** sau: 

**Standard widgets**
* **Container** : Thêm `padding`, `margins`, `borders`, `background color`, hoặc các `decorations` tới widget.
* **GridView** : dùng để layout cho một `scrollable grid` .
* **ListView** : dùng để layout cho một `scrollable list`.
* **Stack** : Hiển thị một widget lên phía trên một widget khác.

**Material Components**
* **Card** : Sắp xếp thông tin liên quan vào trong cùng một box có `rounded corners` và `shadow`.
* **ListTile** : Hiển thị thông tin cố định như một Row với text (tối đa 3 dòng văn bản) và option `leading` hoặc `trailing` icon . 

Chúng ta sẽ cùng đi sâu tìm hiểu từng loại widget.

# Standard widgets
## Container

**Containers** được sử dụng để phân chia bố cục các widgets với `padding` hoặc là thêm `borders` hay `margins`. Bạn có thể thay đổi `device’s background` bằng việc đặt toàn bộ nội dụng hiển thị vào một **Container** và thay đổi `background color` hoặc `image`. 


**Container summary:**
* Thêm padding, margins, borders
* Thay đổi được background color hoặc image
* Chỉ chứa một widget con duy nhất, nhưng widget con này có thể là một Row, Column, thậm chí là root của một cây widget.

![](https://images.viblo.asia/bb126941-a08b-46e8-8cef-cabc763b5541.png)

Ok, để hiểu rõ hơn, chúng ta sẽ xem qua ví dụ sau. 

![](https://images.viblo.asia/11ba350a-28dd-4edf-aece-0292c311f878.png)

Như ví dụ này chúng ra có 4 images với thiết kế 1 Column, 2 Rows. 
- Mỗi Row sẽ hiển thị 2 images. Mỗi một image sẽ là 1 **Container** được `rounded grey` border và xét margins. 
- Column chứa tất cả images sử dụng 1 **Container** để thay đổi background color : `lighter grey`

Các bạn cùng xem qua code triển khai layout với việc sử dụng **Container** nhé.  
```dart
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    var container = Container( // main Container
      decoration: BoxDecoration(
        color: Colors.black26,
      ),
      child: Column(
        children: [
          Row( // Hàng số 1 
            children: [
              Expanded(
                child: Container( // Container image 1 
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
                child: Container( // Container image 2
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
          Row( //Hàng số 2 
            children: [
              Expanded(
                child: Container( // Container image 3
                  decoration: BoxDecoration(
                    border: Border.all(width: 10.0, color: Colors.black38),
                    borderRadius:
                        const BorderRadius.all(const Radius.circular(8.0)),
                  ),
                  margin: const EdgeInsets.all(4.0),
                  child: Image.asset('images/pic3.jpg'),
                ),
              ),
              Expanded(
                child: Container( // Container image 4
                  decoration: BoxDecoration(
                    border: Border.all(width: 10.0, color: Colors.black38),
                    borderRadius:
                        const BorderRadius.all(const Radius.circular(8.0)),
                  ),
                  margin: const EdgeInsets.all(4.0),
                  child: Image.asset('images/pic4.jpg'),
                ),
              ),
            ],
          ),
        ],
      ),
    );

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: container,
      ),
    );
  }
}
```

Dart code: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/container/main.dart)

Images: [images](https://github.com/flutter/website/tree/master/_includes/code/layout/container/images)

Pubspec: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/container/pubspec.yaml)

Đây chỉ là 1 ví dụ nhỏ về việc sử dụng **Container** trong layout Flutter. Để tìm được nhiều ví dụ khác, các bạn có thể tham khảo tại [Flutter Gallery](https://github.com/flutter/flutter/tree/master/examples/flutter_gallery).

## GridView
Với ví dụ với việc sử dụng **Container** cho việc hiển thị 4 images, vậy nếu bài toán bây giờ bạn cần hiển thị với layout như vậy, nhưng số lượng images là nhiều hơn thì sao? Flutter sẽ hỗ trợ để chúng ta có thể xây dựng layout với việc sử dụng **GridView**
[GridView](https://docs.flutter.io/flutter/widgets/GridView-class.html) được sử dụng để đặt các widgets dưới dạng danh sách **grid**. **GridView** cung cấp hai danh sách được tạo sẵn hoặc bạn có thể tạo tùy chỉnh của riêng mình. **GridView** sẽ tự động cuộn khi nội dung hiển thị vượt quá khung hiển thị.

**GridView summary:**

* Sử dụng để làm các content có nội dung hiển thị dạng grid
* Phát hiện khi nội dung màn hình hiển thị thì tự động cho phép cuộn.
* Bạn có thể xây dựng custom grid cho bạn, ví dụ bạn có thể thay đổi các thông số:
    GridView.count : Số lượng columns
    GridView.extent : Kích thước width lớn nhất tính theo pixel của item 

Chúng ta sẽ cùng nhau tìm hiểu 2 ví dụ về cách sử dụng **GridView.count** và **GridView.extent**

Một ví dụ nhỏ với việc sử dụng **GridView.extent** để hiển thị các item trong GridView có kích thước maximum là 150 pixels. 

Code triển khai đơn giản như sau : 
```dart
// The images are saved with names pic1.jpg, pic2.jpg...pic30.jpg.
// The List.generate constructor allows an easy way to create
// a list when objects have a predictable naming pattern.
List<Container> _buildGridTileList(int count) {

  //generate list images
  return List<Container>.generate(
      count,
      (int index) =>
          Container(child: Image.asset('images/pic${index+1}.jpg')));
}

Widget buildGrid() {
  return GridView.extent(// custom extent 
      maxCrossAxisExtent: 150.0, // maximum pixel width of a item
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

Bạn có thể sử dụng full sourcode và resources : 

Dart code: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/grid/main.dart)

Images: [images](https://github.com/flutter/website/tree/master/_includes/code/layout/grid/images)

Pubspec: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/grid/pubspec.yaml)

Kết quả :

![](https://images.viblo.asia/f531bf86-1435-4164-ae4a-8591c631b072.png)


Có thể thấy ở đây chung ta chỉ giới hạn kích thước 1 item trong Grid, vì thế có bao nhiêu item trong 1 hàng sẽ tuỳ thuộc vào kích thước device (width). Vậy nếu muốn cố định số item trong 1 hàng thì sao, tương ứng có bao nhiêu cột trong Gridview? Bạn sẽ cần sử dụng `GridView.count`

Như ví dụ hiện tại chúng ta muốn hiển thị grid với 4 cột thì chúng ta sẽ chỉnh sửa code trong `buildGrid()` như sau : 

```dart
Widget buildGrid() {
  return GridView.count(
      crossAxisCount: 4,
      padding: const EdgeInsets.all(4.0),
      mainAxisSpacing: 4.0,
      crossAxisSpacing: 4.0,
      children: _buildGridTileList(30));
}
```

Và kết quả hiển thị: 

![](https://images.viblo.asia/0e6ce2de-5b8c-497a-9741-b90cba7586c9.png)


## ListView
[ListView](https://docs.flutter.io/flutter/widgets/ListView-class.htmlhttps://docs.flutter.io/flutter/widgets/ListView-class.html) tương đồng như Column widget, nhưng khác biệt là tự động cung cấp cuộn khi nội dung của nó quá dài đối với hộp hiển thị của nó. 

Chúng ta sẽ đi qua ví dụ nhỏ sau hiển thị danh sách các hạng mục kinh doanh (rạp hát và nhà hàng), mỗi item con sẽ xây dựng với class [ListTile](https://docs.flutter.io/flutter/material/ListTile-class.html). Và có đường chia giữa các rạp hát và nhà hàng  
![](https://images.viblo.asia/366aabc7-38e5-4090-bf37-84148b5e1ed7.png)

Phân tích source code xây dựng ListView cho ví dụ này chút :
```dart
List<Widget> list = <Widget>[ 
  ListTile( // Mỗi item con là một ListTile
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
  // ... tương tự với các item con khác 
];

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ...
      body: Center(
        child: ListView( // Sử dụng ListView để hiển thị 
          children: list,
        ),
      ),
    );
  }
}
```

Đầy đủ source code của ví dụ sử dụng ListView các bạn có thể xem ở đây :

Dart code: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/listview/main.dart)

Icons: [Icons class](https://docs.flutter.io/flutter/material/Icons-class.html)

Pubspec: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/listview/pubspec.yaml)


## Stack
Chúng ta sẽ sử dụng [Stack](https://docs.flutter.io/flutter/widgets/Stack-class.html) trong trường hợp muốn sắp xếp các widgets mà bố cục muốn hiển thị 1 số widget lên trên các widget khác. Ví dụ như hiển thị text lên phía trên 1 tấm hình chẳng hạn.

**Stack summary:**
* Sử dụng cho các widgets muốn đặt lên trên một widget con khác
* Widget đầu trong danh sách widget con sẽ là base widget, và các widget còn lại khi hiển thị sẽ nằm trên base widget. 
* Stack thì không thể scroll được 
* Bạn có thể lựa chọn cắt bỏ widget con nào mà vượt quá khung hiển thị. 

Chúng ta sẽ cùng xem qua 1 số ví dụ về sử dụng Stack

![](https://images.viblo.asia/10d3fd6b-c22a-42fe-9913-056fb7574c92.png)

Sử dụng Stack để chồng lên một Container (hiển thị văn bản trên một nền đen mờ) nằm bên trên của một **CircleAvatar**. Stack sẽ sắp xếp vị trí văn bản bằng cách sử dụng thuộc tính `alignment` và `Alignments`.
```dart
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    var stack = Stack( // chúng ta sử dụng Stack 
      alignment: const Alignment(0.6, 0.6),
      children: [ // với layout chứa các thành phần con 
        CircleAvatar( // một avatar là first child, vì thể nó sẽ là base widget trong Stack
          backgroundImage: AssetImage('images/pic.jpg'),
          radius: 100.0,
        ),
        Container( // và Container để hiểnt thị Text 
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

Dart code: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/stack/main.dart)

Image: [images](https://github.com/flutter/website/tree/master/_includes/code/layout/stack/images)

Pubspec: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/stack/pubspec.yaml)


# Material Components
## Card
**Card summary:**
* Là một [Material Design card](https://material.io/design/components/cards.html#)
* Được sử dụng để trình bày cho phần nội dung cố định có liên quan tới nhau. 
* Là một single child trong Flutter, nhưng child này có thể là một Row, Column, hoặc là widget con khác chứa trong danh sách children. 
* Hiển thị với `rounded corners` và `drop shadow`
* Không thể scroll nếu nội dung vượt quá khung hiển thị 
* Là một component trong Material Components library

Chúng ta sẽ đi xem qua ví dụ nhỏ sau để hiểu hơn về cách layout với Card 

![](https://images.viblo.asia/61745425-8ba5-461d-be84-b3070c3ba5f4.png)

Layout này có chứa 3 thông tin khác nhau (địa chỉ, số điện thoại và email), được đặt trong kích thước cố định  [SizedBox](https://docs.flutter.io/flutter/widgets/SizedBox-class.html). Có 1 đường kẻ (**Divider**) phân chia giữa thông tin địa chỉ và số điện thoại .

Phân tích code một chút nhé: 

```dart
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    var card = SizedBox(
      height: 210.0,
      child: Card( // cả 3 thông tin sẽ hiển thị trong 1 card 
        child: Column( // hiển thị theo Column 
          children: [// và là 1 list children: 3 ListTiles và 1 Divider
            ListTile( // mỗi một thông tin sẽ là một ListTile
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

Dart code: [main.dart](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/card/main.dart)

Icons: [Icons class](https://docs.flutter.io/flutter/material/Icons-class.html)

Pubspec: [pubspec.yaml](https://raw.githubusercontent.com/flutter/website/master/_includes/code/layout/card/pubspec.yaml)


## ListTile

Từ các vị dụ trên chúng ta đã sử dụng component **ListTile**, đây là row widget đặc biệt trong thư viện **Material Components**. Để tạo một hàng có một text với tối đa 3 dòng văn bản và một `optional icon`. ListTile thường được sử dụng trong Card hoặc ListView, nhưng cũng có thể sử dụng ở nhiều chỗ khác nữa. 

Để sử dụng 1 ListTile, đơn giản bạn chỉ cần sử dụng code sau 
```dart
ListTile(
     title: Text('text'),
     leading: Icon(
             Icons.contact_mail,
             color: Colors.blue[500],
           ),
   ),
```