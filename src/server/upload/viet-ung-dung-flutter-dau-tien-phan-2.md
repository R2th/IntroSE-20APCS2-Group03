## 5. Add icon vào list

* Thêm  _save Set vào RandomWordsState. Set này lưu trữ các cặp từ mà người dùng ưa thích. Set được ưu tiên cho List vì Set được triển khai đúng cách không cho phép các mục trùng lặp.

```dart
class RandomWordsState extends State<RandomWords> {
  final List<WordPair> _suggestions = <WordPair>[];
  final Set<WordPair> _saved = Set<WordPair>();   // Add this line.
  final TextStyle _biggerFont = TextStyle(fontSize: 18.0);
  ...
}
```

* Trong hàm _buildRow, thêm alreadySaved được lưu để đảm bảo rằng cặp từ chưa được thêm vào mục yêu thích.

```dart
Widget _buildRow(WordPair pair) {
  final bool alreadySaved = _saved.contains(pair);  // Add this line.
  ...
}
```

Trong _buildRow() bạn cũng sẽ thêm các biểu tượng hình trái tim vào các đối tượng ListTile để cho phép ưu tiên. Trong bước tiếp theo, bạn sẽ thêm khả năng tương tác với các biểu tượng trái tim.

```dart
Widget _buildRow(WordPair pair) {
  final bool alreadySaved = _saved.contains(pair);
  return ListTile(
    title: Text(
      pair.asPascalCase,
      style: _biggerFont,
    ),
    trailing: Icon(   // Add the lines from here... 
      alreadySaved ? Icons.favorite : Icons.favorite_border,
      color: alreadySaved ? Colors.red : null,
    ),                // ... to here.
  );
}
```

* Hot reload app, bây giờ bạn sẽ thấy trái tim mở trên mỗi hàng, nhưng chúng chưa tương tác.

<div align="center">
    
![](https://images.viblo.asia/831a7696-fd6d-4836-bcf2-7f801c4db77a.png)
![](https://images.viblo.asia/59472cba-5e3c-4fa2-b687-1cf30b075bd2.png)
  
</div>

## 6. Thêm tương tác

Trong bước này, bạn sẽ làm cho các biểu tượng trái tim có thể chạm được. Khi người dùng gõ một mục trong danh sách, chuyển sang trạng thái "ưa thích" của nó, việc ghép từ đó sẽ được thêm hoặc xóa khỏi một tập hợp các mục yêu thích đã lưu. Để làm điều này, bạn sẽ sửa đổi hàm _buildRow. Nếu một mục nhập từ đã được thêm vào mục yêu thích, chạm vào một lần nữa sẽ xóa mục đó khỏi mục yêu thích. Khi một ô đã được khai thác, hàm sẽ gọi setState() để thông báo cho khung mà trạng thái đã thay đổi.

* Thêm *onTap*

```dart
Widget _buildRow(WordPair pair) {
  final alreadySaved = _saved.contains(pair);
  return ListTile(
    title: Text(
      pair.asPascalCase,
      style: _biggerFont,
    ),
    trailing: Icon(
      alreadySaved ? Icons.favorite : Icons.favorite_border,
      color: alreadySaved ? Colors.red : null,
    ),
    onTap: () {      // Add 9 lines from here...
      setState(() {
        if (alreadySaved) {
          _saved.remove(pair);
        } else { 
          _saved.add(pair); 
        } 
      });
    },               // ... to here.
  );
}
```

Hot reload app,  bạn sẽ có thể nhấn vào bất kỳ ô nào để thích hoặc bỏ thích.

<div align="center">
    
![](https://images.viblo.asia/403e513d-4214-489c-a046-366ed9de8dfb.png)
![](https://images.viblo.asia/2bf0ae2a-6a75-451b-b6dc-5270f4ae9b05.png)
  
</div>

## 7. Điều hướng đến màn hình mới

Trong bước này, bạn sẽ thêm một trang mới (được gọi là route trong Flutter) hiển thị các mục yêu thích. Bạn sẽ học cách điều hướng giữa Home route và new route.

Trong Flutter, Bộ điều hướng quản lý một ngăn xếp chứa các route của ứng dụng. Push một route lên ngăn xếp của Bộ điều hướng, cập nhật màn hình cho tuyến đường đó. Bật một route từ ngăn xếp của Bộ điều hướng, trả lại màn hình cho route trước đó.

Tiếp theo, bạn sẽ thêm một biểu tượng danh sách vào AppBar trong phương thức xây dựng cho RandomWordsState. Khi người dùng nhấp vào biểu tượng danh sách, một route mới chứa các mục yêu thích đã lưu sẽ được đẩy đến Bộ điều hướng, hiển thị biểu tượng.

* Thêm biểu tượng và hành động tương ứng của nó vào phương thức xây dựng:

```dart
class RandomWordsState extends State<RandomWords> {
  ...
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Startup Name Generator'),
        actions: <Widget>[      // Add 3 lines from here...
          IconButton(icon: Icon(Icons.list), onPressed: _pushSaved),
        ],                      // ... to here.
      ),
      body: _buildSuggestions(),
    );
  }
  ...
}
```

* Thêm hàm _pushSaved() vào RandomWordsState class.

```dart
void _pushSaved() {}
```

* Hot reload app, icon list  xuất hiện trong thanh ứng dụng.

Tiếp theo, bạn sẽ route và push nó vào ngăn xếp của Bộ điều hướng. Hành động này thay đổi màn hình để hiển thị route mới. Nội dung cho trang mới được xây dựng trong thuộc tính builder  của MaterialPageRoute, trong một hàm ẩn danh.

Gọi Navigator.push, như hiển thị bên dưới, sẽ đẩy route đến ngăn xếp của Navigator.

```dart
void _pushSaved() {
  Navigator.of(context).push(
  );
}
```

Tiếp theo, bạn sẽ thêm MaterialPageRoute và builder của nó. Hiện tại, hãy thêm code tạo các hàng ListTile. Phương thức divideTiles() của ListTile thêm khoảng cách ngang giữa mỗi ListTile. Biến được chia giữ các hàng cuối cùng, được chuyển đổi thành một danh sách theo hàm: toList ).

```dart
void _pushSaved() {
  Navigator.of(context).push(
    MaterialPageRoute<void>(   // Add 20 lines from here...
      builder: (BuildContext context) {
        final Iterable<ListTile> tiles = _saved.map(
          (WordPair pair) {
            return ListTile(
              title: Text(
                pair.asPascalCase,
                style: _biggerFont,
              ),
            );
          },
        );
        final List<Widget> divided = ListTile
          .divideTiles(
            context: context,
            tiles: tiles,
          )
          .toList();
      },
    ),                       // ... to here.
  );
}
```

Builder property returns  Scaffold, chứa app bar cho route mới, được đặt tên là "Saved Suggestions". Body của route mới bao gồm một ListView chứa các hàng ListTiles; mỗi hàng được ngăn cách bởi một dải phân cách.

* Add horizontal dividers

```dart
void _pushSaved() {
  Navigator.of(context).push(
    MaterialPageRoute<void>(
      builder: (BuildContext context) {
        final Iterable<ListTile> tiles = _saved.map(
          (WordPair pair) {
            return ListTile(
              title: Text(
                pair.asPascalCase,
                style: _biggerFont,
              ),
            );
          },
        );
        final List<Widget> divided = ListTile
          .divideTiles(
            context: context,
            tiles: tiles,
          )
              .toList();

        return Scaffold(         // Add 6 lines from here...
          appBar: AppBar(
            title: Text('Saved Suggestions'),
          ),
          body: ListView(children: divided),
        );                       // ... to here.
      },
    ),
  );
}
```

Hot reload app:

<div align="center">
    
![](https://images.viblo.asia/a26a051d-60bf-461f-bf38-99424dbb4845.png)
![](https://images.viblo.asia/a9378fa1-83b7-4246-95f0-7ab515df63c3.png)
  
</div>
  
## 8. Thay đổi theme

Trong bước này, bạn sẽ sửa đổi theme của ứng dụng. Theme kiểm soát giao diện của ứng dụng của bạn. Bạn có thể sử dụng theme mặc định, phụ thuộc vào thiết bị vật lý hoặc trình giả lập hoặc tùy chỉnh theme tùy thích.

Bạn có thể dễ dàng thay đổi theme của ứng dụng bằng cách định cấu hình class ThemeData. Ứng dụng này hiện đang sử dụng theme mặc định, nhưng bạn sẽ thay đổi màu chính của ứng dụng thành màu trắng.

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Startup Name Generator',
      theme: ThemeData(          // Add the 3 lines from here... 
        primaryColor: Colors.white,
      ),                         // ... to here.
      home: RandomWords(),
    );
  }
}
```

Hot reload. GIờ tất cả background app đều màu trắng, kể cả appbar.

<div align="center">
    
![](https://images.viblo.asia/cd72a2ba-af10-4ece-979a-364721374805.png)
![](https://images.viblo.asia/5611ef9b-f9d3-44bb-9551-c9a987deb2b5.png)
  
</div>

Cảm ơn các bạn đã đọc bài của mình :D