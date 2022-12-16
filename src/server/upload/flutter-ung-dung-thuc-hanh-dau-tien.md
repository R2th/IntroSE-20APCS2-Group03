Flutter là SDK di động của Google để tạo các giao diện gốc chất lượng cao trên iOS và Android trong thời gian nhanh. Flutter hoạt động với source có sẵn, được sử dụng bởi các nhà phát triển và tổ chức trên toàn thế giới và là mã nguồn mở và miễn phí.

Chúng ta sẽ bắt đầu với một ứng dụng di động đơn giản đó là tạo ra một danh sách vô hạn các tên được đề xuất cho một công ty khởi nghiệp. Khi kết thúc codelab này, người dùng có thể chọn và bỏ chọn tên, lưu tên. Nhấn vào biểu tượng danh sách ở phía trên bên phải của thanh ứng dụng thì nó sẽ điều hướng đến một trang mới (được gọi là một route) chỉ liệt kê các tên đã được ưa thích.

![](https://images.viblo.asia/79634e13-53b8-4c26-a3da-e8a96a9e9335.gif)
# 1. Import thư viện
File dùng để import thêm các libs ngoài có tên là **pubspec.yaml** , mở file này ra và thêm đoạn code để import library như sau: 

```java
dependencies:
  flutter:
    sdk: flutter

  # The following adds the Cupertino Icons font to your application.
  # Use with the CupertinoIcons class for iOS style icons.
  cupertino_icons: ^0.1.2
  english_words: ^3.1.0 // thu vien can them
  
```

Ở đây mình dùng ** English Words**, cái này có tác dụng tạo ra các cặp từ tiếng anh ngẫu nhiên. Sau khi thêm libs thì nhấn chọn Packages get ở góc trên bên phải để pull package này về project. Khi chạy xong nó sẽ hiển thị như sau: 

![](https://images.viblo.asia/20b79760-3f0b-4e5e-841a-2a12eb8cd78b.png)

# 2. Các components được sử dụng trong code
Để chuẩn bị cho ví dụ này, thì mình cùng tìm hiểu một số component sau: 

* **StatelessWidget** and **StatefullWidget**: xem thêm tại đây: https://viblo.asia/p/flutter-gioi-thieu-ve-statelesswidget-va-statefullwidget-maGK7kQDKj2

* **MaterialApp** : Một ứng dụng mà sử dụng material design. Đây là một widget tiện lợi mà nó gói lại nhiều widget được yêu cầu cho ứng dụng material design. 
các thuộc tính thường sử dụng: 
```java
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Startup Name Generator',
      theme: ThemeData(
        primaryColor: Colors.white,
      ),
      home: RandomWords(),
    );
  }
}
```
Giải thích một chút: 
- *debugShowCheckedModeBanner*: cái này dùng để xóa cái nhãn debug trên màn hình ứng dụng, mình thường để là false.
- *title*: title của ứng dụng.
- *theme*: set theme cho ứng dụng.
- *home*: bạn muốn nó điều hướng tới class nào ngay khi run app thì cho vào đây, ở đây mình để class RandomWords().

Tham khảo thêm tại đây: https://api.flutter.dev/flutter/material/MaterialApp-class.html

*  **ListView**:  để hiển thị danh sách item có thể cuộn lên xuống. Nó tương tự như Listview, RecyclerView trong android. Hoặc table view trong IOS
```java
Widget _buildSuggestions() {
    return ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: itemCount,
        itemBuilder: (context, i) {
          if (i.isOdd) return Divider();
          final index = i ~/ 2;
          if (index >= _suggestions.length) {
            _suggestions.addAll(generateWordPairs().take(10));
          }
          return _buildRow(_suggestions[index]);
        });
  }
```

Ở đây dùng Listview.builder(), có các thuộc tính thường sử dụng như sau: 

- *padding*: giãn cách giữa nội dung item so với lề trong.
- *itemCount*: số lượng item, có thể không set thuộc tính này nếu list là vô hạn.
- *itemBuilder*: cái này có tác dụng xây dựng từng item tại vị trí position.

Tham khảo thêm: https://medium.com/flutter-community/flutter-listview-and-scrollphysics-a-detailed-look-7f0912df2754

* **ListTile**:  giúp xây dựng từng item cho ListView: 

```java
Widget _buildRow(WordPair pair) {
    final bool alreadySaved = _saved.contains(pair);
    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
      subtitle: Text('sub Tile'),
      leading : Icon(Icons.favorite),
      trailing: Icon(
        alreadySaved ? Icons.favorite : Icons.favorite_border,
        color: alreadySaved ? Colors.red : null,
      ),
      onTap: () {
        setState(() {
          if (alreadySaved) {
            _saved.remove(pair);
          } else {
            _saved.add(pair);
          }
        });
      },
    );
  }
```


Các thuộc tính dùng trong này: 
- *title*: text này đóng vai trò là title của ListTile.
- *subtitle*: phần chữ nhỏ hơn của title, nó hiển thị ngay dưới title.
- *leading*: cái này để chèn thêm image hoặc icon phía start của ListTle.
- *trailing*: cái này để chèn thêm image hoặc icon phía end của ListTle.
- *onTap*: bắt sự kiện click cho ListTile đó.

Tham khảo thêm: https://medium.com/@studymongolian/a-complete-guide-to-flutters-listtile-597a20a3d449

* **Scaffold**: Cái này có tất cả mọi thứ để xây dựng một ứng dụng cơ bản. Ở đây mình dùng AppBar và Body: 

```java
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Startup Name Generator'),
        actions: <Widget>[
          IconButton(icon: Icon(Icons.list), onPressed: _pushSaved),
        ],
      ),
      body: _buildSuggestions(),
    );
  }
```

- *appBar*: thiết kế trên thanh appBar, gồm title và action.
- *body*: phần bên dưới của appBar sẽ có gì thì viết ở đây.

Tham khảo thêm: https://proandroiddev.com/flutter-material-design-using-scaffold-appbar-body-bottom-navigation-floating-action-f84d71e68c76
# 3. Code demo

Code trong file main.dart như sau: 

```java
import 'package:english_words/english_words.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Startup Name Generator',
      theme: ThemeData(
        primaryColor: Colors.white,
      ),
      home: RandomWords(),
    );
  }
}

class RandomwordsState extends State<RandomWords> {
  final List<WordPair> _suggestions = <WordPair>[];
  final Set<WordPair> _saved = Set<WordPair>();
  final TextStyle _biggerFont = const TextStyle(fontSize: 18.0);

  Widget _buildSuggestions() {
    return ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemBuilder: (context, position) {
          if (position.isOdd) return Divider();
          final index = position ~/ 2;
          if (index >= _suggestions.length) {
            _suggestions.addAll(generateWordPairs().take(10));
          }
          return _buildRow(_suggestions[index]);
        });
  }

  Widget _buildRow(WordPair pair) {
    final bool alreadySaved = _saved.contains(pair);
    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
      subtitle: Text('sub Tile'),
      leading : Icon(Icons.favorite),
      trailing: Icon(
        alreadySaved ? Icons.favorite : Icons.favorite_border,
        color: alreadySaved ? Colors.red : null,
      ),
      onTap: () {
        setState(() {
          if (alreadySaved) {
            _saved.remove(pair);
          } else {
            _saved.add(pair);
          }
        });
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Startup Name Generator'),
        actions: <Widget>[
          IconButton(icon: Icon(Icons.list), onPressed: _pushSaved),
        ],
      ),
      body: _buildSuggestions(),
    );
  }

  void _pushSaved() {
    Navigator.of(context)
        .push(MaterialPageRoute<void>(builder: (BuildContext context) {
      final Iterable<ListTile> tiles = _saved.map((WordPair pair) {
        return ListTile(
          title: Text(
            pair.asPascalCase,
            style: _biggerFont,
          ),
        );
      });

      final List<Widget> divided =
          ListTile.divideTiles(tiles: tiles, context: context).toList();

      return Scaffold(
        appBar: AppBar(
          title: Text('Saved Suggestion'),
        ),
        body: ListView(
          children: divided,
        ),
      );
    }));
  }
}

class RandomWords extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new RandomwordsState();
}

```

Kết quả: 

![](https://images.viblo.asia/2f7d9070-0b37-434a-b413-5a190c318ce9.png)

Cảm ơn mọi người đã theo dõi, chúc mọi người code vui vẻ :D

# 4. Tài liệu tham khảo:

https://codelabs.developers.google.com/codelabs/first-flutter-app-pt2/#8